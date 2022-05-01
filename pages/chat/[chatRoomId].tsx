import { useRouter } from "next/router";
import { FormEvent, SyntheticEvent, useEffect, useState } from "react";
import { io } from "socket.io-client";
import axiosInstance from "../../axios/axiosInstance";

interface IMessage {
  message: string;
  author: string;
  time: string;
}

const socket = io("http://localhost:5000");

const Chatbox = () => {
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<IMessage[] | undefined>();

  const loggedInUser = "Lucas";

  useEffect(() => {
    const chatRoomId = window.location.pathname.split("/")[2];

    const getMessages = async () => {
      try {
        const res = await axiosInstance.get(
          "/api/chat/getAllMessages/" + chatRoomId
        );
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };

    getMessages();
  }, []);

  useEffect(() => {
    const chatRoomId = window.location.pathname.split("/")[2];

    socket.emit("join_room", chatRoomId);
  }, []);

  useEffect(() => {
    console.log("first");
    socket.on("get_message", (data) => {
      console.log(data);
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
    };

    socket.emit("send_message", messageObj);
    (document.getElementById("msg") as HTMLFormElement).value = "";
  };

  return (
    <div className='bg-gray-300 h-[90vh] w-full overflow-y-auto'>
      <div className='h-[84vh] overflow-y-auto'>
        {messages ? (
          messages.map((message) => {
            return (
              <div
                key={Math.random()}
                className={`w-11/12 mx-auto my-4  ${
                  message.author === loggedInUser ? "text-right" : "text-left"
                }`}>
                <p
                  className={`text-sm text-gray-500 px-2 ${
                    message.author === loggedInUser ? "hidden" : "block"
                  }`}>
                  {message.author}
                </p>
                <p
                  className={` px-4 py-2 text-center rounded-full inline-block ${
                    message.author === loggedInUser
                      ? "bg-gradient-to-tl from-gray-100 to-gray-300 text-black"
                      : "bg-gradient-to-tl from-gray-700 to-black text-white"
                  }`}>
                  {message.message}
                </p>
                <p className={`text-gray-500 text-xs px-2 pt-2`}>
                  {message.time.split(",")[0] ===
                  new Date().toLocaleString().split(",")[0]
                    ? message.time.split(",")[1]
                    : message.time}
                  <br />
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
