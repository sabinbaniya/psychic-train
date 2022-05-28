import { decode } from "jsonwebtoken";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next/types";
import { useContext, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import axiosInstance from "../../axios/axiosInstance";
import { UserInfoContext } from "../../context/UserInfoContext";

const Navbar = () => {
  const [showSettings, setShowSettings] = useState(false);
  const router = useRouter();
  const { userInfo } = useContext(UserInfoContext);

  const handleLogout = async () => {
    try {
      document.cookie = "uname=null; expires=-1; path=/; domain=localhost";
      document.cookie = "uid=null; expires=-1; path=/; domain=localhost";
      await axiosInstance.get("/api/auth/logout");
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav
      className='shadow-sm h-[10vh] w-screen relative'
      style={{ userSelect: "none" }}>
      <div
        className={`${
          showSettings ? "w-screen h-screen" : "w-0 h-0"
        } absolute top-0 left-0 z-40`}
        onClick={() => setShowSettings(false)}></div>
      <div className='w-11/12 mx-auto flex justify-between items-center h-full'>
        <Image
          src='/avatar.png'
          alt=''
          height='50px'
          width='50px'
          className='rounded-full'></Image>
        <div className='text-center'>
          {userInfo.name !== "" && router.asPath.includes("/chat/") ? (
            <>
              <p className='font-medium text-lg md:text-xl'>{userInfo.name}</p>
              {/* <p className='font-light text-gray-500'>{userInfo.status}</p> */}
            </>
          ) : (
            <Link href={"/"}>Start Messaging</Link>
          )}
        </div>
        <div
          className='flex justify-between items-center space-x-2 cursor-pointer relative'
          onClick={() => setShowSettings((prev) => !prev)}>
          <p className='hidden sm:block font-medium text-md'>More</p>
          <BsThreeDotsVertical />
          <div
            className={`absolute z-50 right-4 top-14 w-36 text-center shadow-md rounded-md bg-white ${
              showSettings ? "inline-block" : "hidden"
            }`}>
            <Link href='/profile'>
              <a className='hover:bg-gray-200 block cursor-pointer px-4 py-1 mt-2'>
                profile
              </a>
            </Link>

            <Link href='/search'>
              <a className='hover:bg-gray-200 block cursor-pointer px-4 py-1 mt-2'>
                search people
              </a>
            </Link>
            <Link href='/'>
              <a className='hover:bg-gray-200 block cursor-pointer px-4 py-1 mt-2'>
                start chatting
              </a>
            </Link>
            <a className='text-gray-400 block cursor-not-allowed px-4 py-1'>
              options
            </a>
            <a className='text-gray-400 block cursor-not-allowed px-4 py-1'>
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
