import { SyntheticEvent, useEffect, useState } from "react";

interface props {
  selectedUser?: string;
}

const Chatbox = ({ selectedUser }: props) => {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState("");

  useEffect(() => {
    // fetch user info from db and set the state
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
      <div className='h-[84vh]'>
        Show old messages
        <h1>{selectedUser}</h1>
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
