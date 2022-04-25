import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import axiosInstance from "../../axios/axiosInstance";

interface props {
  userInfo?: {
    name: string;
    status: string;
  };
}

const Navbar = ({ userInfo }: props) => {
  const [showSettings, setShowSettings] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axiosInstance.get("/api/auth/logout");
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className='shadow-sm h-[10vh] w-screen relative'>
      <div className='w-11/12 mx-auto flex justify-between items-center h-full'>
        <Image
          src='/avatar.png'
          height='50px'
          width='50px'
          className='rounded-full'></Image>
        <div className='text-center'>
          {userInfo ? (
            <>
              <p className='font-medium text-lg md:text-xl'>{userInfo.name}</p>
              <p className='font-light text-gray-500'>{userInfo.status}</p>
            </>
          ) : (
            <p>Start Messaging</p>
          )}
        </div>
        <div
          className='flex justify-between items-center space-x-2 cursor-pointer relative'
          onClick={() => setShowSettings((prev) => !prev)}>
          <p className='hidden sm:block font-medium text-md'>More</p>
          <BsThreeDotsVertical />
          <div
            className={`absolute right-4 top-14 w-36 text-center shadow-md rounded-md bg-white ${
              showSettings ? "inline-block" : "hidden"
            }`}>
            <a className='hover:bg-gray-200 block cursor-pointer px-4 py-1 mt-2'>
              profile
            </a>
            <Link href='/search'>
              <a className='hover:bg-gray-200 block cursor-pointer px-4 py-1 mt-2'>
                search people
              </a>
            </Link>
            <a className='hover:bg-gray-200 block cursor-pointer px-4 py-1'>
              options
            </a>
            <a className='hover:bg-gray-200 block cursor-pointer px-4 py-1'>
              more settings
            </a>
            <a
              className='hover:bg-gray-200 block cursor-pointer px-4 py-1 mb-2'
              onClick={handleLogout}>
              logout
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
