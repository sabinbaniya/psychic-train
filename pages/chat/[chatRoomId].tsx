import Head from "next/head";
import {
  FormEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { io } from "socket.io-client";
import axiosInstance from "../../axios/axiosInstance";
import { parse, serialize } from "cookie";
import { Sidebar } from "../../src/components";
import { SelectedUserContext } from "../../context/SelectedUserContext";
import { UserInfoContext } from "../../context/UserInfoContext";
import Message from "../../src/components/Message";
import { GetServerSideProps } from "next";

interface IMessage {
  author: string;
  _id: string;
  author_name: string;
  msg: string;
  chatRoomId: string;
  createdAt: string;
}

interface IUser {
  uid: string;
  uname: string;
}

interface props {
  messageProps: IMessage[];
}

const socket = io("http://localhost:5000");

export const getServerSideProps: GetServerSideProps = async (context) => {
  let messageProps: IMessage[] | null = null;
  const cookie = serialize("access", context.req.cookies.access);
  try {
    const res = await axiosInstance.get(
      `/api/chat/getAllMessages/${context?.params?.chatRoomId}?skip=0`,
      {
        headers: {
          cookie,
        },
      }
    );

    messageProps = res.data.messages.messageId.reverse();
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      messageProps,
    },
  };
};

const Chatbox = ({ messageProps }: props) => {
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [user, setUser] = useState<IUser | null>(null);
  const [skip, setSkip] = useState(0);
  const [messagesRemaining, setMessagesRemaining] = useState<boolean>(false);

  const [messages, setMessages] = useState<IMessage[]>(messageProps);

  const { selectedUser, setSelectedUser } = useContext(SelectedUserContext);

  const [windowWidth, setWindowWidth] = useState(0);

  const observer = useRef<IntersectionObserver>();
  const firstMessageRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && messagesRemaining) {
          setSkip((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, messagesRemaining]
  );

  const latestMessage = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const { uid, uname } = parse(document.cookie);
    setUser({
      uid,
      uname,
    });
  }, []);

  useEffect(() => {
    let user = window.location.href.split("/")[4];
    setSelectedUser(user);
  }, []);

  useEffect(() => {
    setSelectedUser(window.location.pathname.split("/")[2]);
  }, []);

  useEffect(() => {
    setMessages(messageProps);
    scroller();
  }, [messageProps]);

  useEffect(() => {
    setLoading(true);
    const getMessages = async () => {
      try {
        if (!selectedUser) return;
        const res = await axiosInstance.get(
          `/api/chat/getAllMessages/${selectedUser}?skip=${skip}`
        );
        setMessagesRemaining(res.data.messages.messageId.length !== 0);
        if (skip === 0) {
          return;
        }

        if (messages[0]?.author !== "" && skip !== 0) {
          return setMessages((messages) => [
            ...res.data.messages.messageId.reverse(),
            ...messages,
          ]);
        }

        return setMessages(res.data.messages.messageId.reverse());
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, [skip, selectedUser]);

  useEffect(() => {
    const chatRoomId = window.location.pathname.split("/")[2];
    socket.emit("join_room", chatRoomId);
  }, []);

  const scroller = () => {
    latestMessage.current?.scrollIntoView({
      behavior: "smooth",
      inline: "end",
    });
  };

  useEffect(() => {
    socket.on("get_message", (data) => {
      console.log("get message");
      setMessages((prev) => [...prev, data]);
    });
    scroller();
  }, [socket]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const chatRoomId = window.location.pathname.split("/")[2];

    if (msg === "") return;
    const messageObj = {
      msg,
      chatRoomId,
      author: user?.uid,
      author_name: user?.uname,
    };

    socket.emit("send_message", messageObj);

    setMsg("");
  };

  const setSizefn = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    if (windowWidth === 0) {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", setSizefn);
    return () => {
      window.removeEventListener("resize", setSizefn);
    };
  });

  return (
    <div className='bg-gray-300 h-[90vh] w-full overflow-y-auto'>
      <Head>
        <title>Chat</title>
      </Head>
      <div className='flex sm:flex-row flex-col'>
        {windowWidth < 640 ? (
          selectedUser.length > 0 ? (
            <>
              <div className='h-[84vh] overflow-y-scroll' id='chatbox'>
                {messages[0]?.author !== "" ? (
                  messages.map((message, index) => {
                    if (index === 0) {
                      return (
                        <Message
                          key={message._id}
                          {...message}
                          user={user}
                          firstMessageRef={firstMessageRef}
                        />
                      );
                    }

                    return (
                      <Message key={message._id} {...message} user={user} />
                    );
                  })
                ) : (
                  <p className='text-center pt-[75vh] text-gray-600 font-light text-lg'>
                    No conversations yet.
                  </p>
                )}
              </div>
              <div
                ref={latestMessage}
                onLoad={scroller}
                className='bg-black h-4 w-full'></div>
              <form className='h-[6vh] flex' onSubmit={handleSubmit}>
                <input
                  type='text'
                  name='text'
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  className='w-full px-4 border-0 outline-none'
                  autoComplete='off'
                  placeholder='Start typing...'
                />
                <input
                  type='submit'
                  value='>'
                  className='w-20 cursor-pointer bg-black text-white font-bold'
                />
              </form>
            </>
          ) : (
            <Sidebar classes='basis-full max-w-none' setSkip={setSkip} />
          )
        ) : (
          <>
            <Sidebar setSkip={setSkip} classes='basis-1/3 max-w-sm ' />
            <div className='basis-full'>
              <div className='h-[84vh] w-full overflow-y-scroll' id='chatbox'>
                {messages[0]?.author !== "" ? (
                  messages.map((message, index) => {
                    if (index === 0) {
                      return (
                        <Message
                          key={message._id}
                          {...message}
                          user={user}
                          firstMessageRef={firstMessageRef}
                        />
                      );
                    }

                    return (
                      <Message key={message._id} {...message} user={user} />
                    );
                  })
                ) : (
                  <p className='text-center pt-[75vh] text-gray-600 font-light text-lg'>
                    No conversations yet.
                  </p>
                )}
                <div ref={latestMessage} className='bg-black h-4 w-full'></div>
              </div>
              <form className='h-[6vh] flex' onSubmit={handleSubmit}>
                <input
                  type='text'
                  name='text'
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  className='w-full px-4 border-0 outline-none'
                  autoComplete='off'
                  placeholder='Start typing...'
                />
                <input
                  type='submit'
                  value='>'
                  className='w-20 cursor-pointer bg-black text-white font-bold'
                />
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Chatbox;
