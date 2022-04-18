import Image from "next/image";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const Navbar = () => {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <nav className='shadow-sm h-[10vh] w-screen relative'>
      <div className='w-11/12 mx-auto flex justify-between items-center h-full'>
        <Image
          src='/avatar.png'
          height='50px'
          width='50px'
          className='rounded-full'></Image>
        <p className='font-medium text-lg md:text-xl'>Start Messaging</p>
        <div
          className='flex justify-between items-center space-x-2 cursor-pointer relative'
          onClick={() => setShowSettings((prev) => !prev)}>
          <p className='hidden sm:block font-medium text-md'>Settings</p>
          <BsThreeDotsVertical />
          <div
            className={`absolute right-4 top-14 w-36 text-center shadow-md rounded-md bg-white ${
              showSettings ? "inline-block" : "hidden"
            }`}>
            <a className='hover:bg-gray-200 block cursor-pointer px-4 py-1 mt-2'>
              profile
            </a>
            <a className='hover:bg-gray-200 block cursor-pointer px-4 py-1'>
              options
            </a>
            <a className='hover:bg-gray-200 block cursor-pointer px-4 py-1'>
              more settings
            </a>
            <a className='hover:bg-gray-200 block cursor-pointer px-4 py-1 mb-2'>
              logout
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
