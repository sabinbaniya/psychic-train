import { SyntheticEvent, useEffect, useState } from "react";

interface props {
  selectedUser?: string;
}

interface IMessage {
  message: string;
  author: string;
  time: string;
}

const Chatbox = ({ selectedUser }: props) => {
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<IMessage[] | undefined>();

  const loggedInUser = "Lucas";

  useEffect(() => {
    // fetch user info from db and set the state
    setMessages([
      {
        message: "Hi",
        author: "Jhon Doe",
        time: "4/19/2022, 9:39 PM",
      },
      {
        message: "Hello",
        author: "Lucas",
        time: "4/19/2022, 9:40 PM",
      },
      {
        message: "How are you?",
        author: "Jhon Doe",
        time: "4/19/2022, 9:42 PM",
      },
      {
        message: "I'm good how are you?",
        author: "Lucas",
        time: "4/19/2022, 9:46 PM",
      },
      {
        message: "And where have you been?",
        author: "Lucas",
        time: "4/19/2022, 9:46 PM",
      },
      {
        message: "I'm good as well, I have been a bit busy lately. ",
        author: "Jhon Doe",
        time: "4/19/2022, 10:50 PM",
      },
    ]);
  }, []);

  const handleSubmit = (e: SyntheticEvent) => {
    // handle sending messages
    e.preventDefault();
  };

  if (!selectedUser) {
    return (
      <div className='bg-gray-300 h-[90vh] w-full overflow-y-auto grid place-items-center'>
        <h1>Select a friend and start messaging...</h1>
      </div>
    );
  }

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
          id='text'
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
