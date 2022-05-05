import Head from "next/head";
import {
  FormEvent,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { io } from "socket.io-client";
import axiosInstance from "../../axios/axiosInstance";
import { parse } from "cookie";

interface IMessage {
  author: string;
  author_name: string;
  msg: string;
  chatRoomId: string;
  createdAt: string;
}

interface IUser {
  uid: string;
  uname: string;
}

const socket = io("http://localhost:5000");

const Chatbox = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [user, setUser] = useState<IUser | null>(null);
  const [skip, setSkip] = useState(0);
  const [messagesRemaining, setMessagesRemaining] = useState<boolean>(false);

  const [messages, setMessages] = useState<IMessage[]>([
    { author: "", author_name: "", msg: "", chatRoomId: "", createdAt: "" },
  ]);

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

  useEffect(() => {
    const { uid, uname } = parse(document.cookie);
    setUser({
      uid,
      uname,
    });
  }, []);

  useEffect(() => {
    const chatRoomId = window.location.pathname.split("/")[2];
    setLoading(true);
    const getMessages = async () => {
      try {
        const res = await axiosInstance.get(
          `/api/chat/getAllMessages/${chatRoomId}?skip=${skip}`
        );

        setMessagesRemaining(res.data.messages.messageId.length !== 0);

        if (messages[0].author !== "") {
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
  }, [skip]);

  useEffect(() => {
    const chatRoomId = window.location.pathname.split("/")[2];
    socket.emit("join_room", chatRoomId);
  }, []);

  function scroller() {
    const scrollHeightx =
      (document.getElementById("chatbox") as HTMLElement).scrollHeight + 50;
    (document.getElementById("chatbox") as HTMLElement).scrollTo({
      top: scrollHeightx,
      left: 0,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    const chatbox = document.getElementById("chatbox");
    if (chatbox) {
      setTimeout(() => {
        scroller();
      }, 500);
    }
  });

  useEffect(() => {
    socket.on("get_message", (data) => {
      setMessages((prev) => [...prev, data]);
      setTimeout(() => {
        scroller();
      }, 200);
    });
  }, [socket]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const chatRoomId = window.location.pathname.split("/")[2];

    const msg = (document.getElementById("msg") as HTMLFormElement).value;
    if (msg === "") return;
    const messageObj = {
      msg,
      chatRoomId,
      author: user?.uid,
      author_name: user?.uname,
    };

    socket.emit("send_message", messageObj);

    (document.getElementById("msg") as HTMLFormElement).value = "";
  };

  return (
    <div className='bg-gray-300 h-[90vh] w-full overflow-y-auto'>
      <Head>
        <title>Chat</title>
      </Head>
      <div className='h-[84vh] overflow-y-scroll' id='chatbox'>
        {messages[0]?.author !== "" ? (
          messages.map((message, index) => {
            if (index === 0) {
              return (
                <div
                  key={Math.random()}
                  ref={firstMessageRef}
                  className={`w-11/12 mx-auto my-4  ${
                    message.author === user?.uid ? "text-right" : "text-left"
                  }`}>
                  <p
                    className={`text-sm text-gray-500 px-2 ${
                      message.author === user?.uid ? "hidden" : "block"
                    }`}>
                    {message.author_name}
                  </p>
                  <p
                    className={` px-4 py-2 text-center rounded-full inline-block ${
                      message.author === user?.uid
                        ? "bg-gradient-to-tl from-gray-100 to-gray-300 text-black"
                        : "bg-gradient-to-tl from-gray-700 to-black text-white"
                    }`}>
                    {message.msg}
                  </p>
                  <p className={`text-gray-500 text-xs px-2 pt-2`}>
                    {new Date(message.createdAt)
                      .toLocaleString()
                      .split(",")[0] ===
                    new Date().toLocaleString().split(",")[0]
                      ? new Date(message.createdAt)
                          .toLocaleString()
                          .split(" ")[1]
                      : new Date(message.createdAt).toLocaleString()}
                  </p>
                </div>
              );
            }

            return (
              <div
                key={Math.random()}
                className={`w-11/12 mx-auto my-4  ${
                  message.author === user?.uid ? "text-right" : "text-left"
                }`}>
                <p
                  className={`text-sm text-gray-500 px-2 ${
                    message.author === user?.uid ? "hidden" : "block"
                  }`}>
                  {message.author_name}
                </p>
                <p
                  className={` px-4 py-2 text-center rounded-full inline-block ${
                    message.author === user?.uid
                      ? "bg-gradient-to-tl from-gray-100 to-gray-300 text-black"
                      : "bg-gradient-to-tl from-gray-700 to-black text-white"
                  }`}>
                  {message.msg}
                </p>
                <p className={`text-gray-500 text-xs px-2 pt-2`}>
                  {new Date(message.createdAt)
                    .toLocaleString()
                    .split(",")[0] === new Date().toLocaleString().split(",")[0]
                    ? new Date(message.createdAt).toLocaleString().split(" ")[1]
                    : new Date(message.createdAt).toLocaleString()}
                </p>
              </div>
            );
          })
        ) : (
          <p className='text-center pt-[75vh] text-gray-600 font-light text-lg'>
            No conversations yet.
          </p>
        )}
      </div>
      <form className='h-[6vh] flex' onSubmit={handleSubmit}>
        <input
          type='text'
          name='text'
          id='msg'
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
  );
};

export default Chatbox;
