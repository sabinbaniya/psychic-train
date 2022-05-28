import { decode } from "jsonwebtoken";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { GetServerSidePropsContext } from "next/types";
import { useEffect, useState } from "react";
import { BiMessageDetail } from "react-icons/bi";
import axiosInstance from "../axios/axiosInstance";
interface IUserInfo {
  avatarUrl: string;
  createdAt: string;
  email: string;
  friends: [
    {
      avatarUrl: string;
      email: string;
      joinedAt: string;
      name: string;
      chatRoomId: string;
      messageCollectionId: string;
      userId: string;
      _id: string;
    }
  ];
  isEmailVerified: boolean;
  name: string;
  onlineStatus: boolean;
  _id: string;
}

const Profile = () => {
  const [userInfo, setUserInfo] = useState<IUserInfo | null>(null);
  useEffect(() => {
    const fetcher = async () => {
      try {
        const res = await axiosInstance.get("/api/user/getProfileInfo");
        setUserInfo(res.data);
      } catch (error) {}
    };
    fetcher();
  }, []);
  return (
    <>
      <Head>
        <title>Profile | Chat App</title>
      </Head>
      <h1 className='text-center text-2xl text-gray-600 my-4 font-bold'>
        Profile
      </h1>
      <div>
        {userInfo && (
          <>
            <div className='shadow-md max-w-4xl flex items-center justify-between mx-auto rounded-md overflow-hidden p-8'>
              <div>
                <Image
                  src={userInfo.avatarUrl}
                  alt=''
                  height='100%'
                  width='100%'></Image>
              </div>
              <div className='text-gray-600'>
                <p>Name: {userInfo.name}</p>
                <p>Email: {userInfo.email}</p>
                {/* <p>
                  Verified Email:{" "}
                  {userInfo.isEmailVerified ? "verified" : "not verified"}
                </p> */}
                {/* <p>
                  {" "}
                  Online Status: {userInfo.onlineStatus ? "online" : "offline"}
                </p> */}
                <p>
                  Joined Date:{" "}
                  {new Date(userInfo.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <p className='text-center text-xl font-bold my-4'>Friends</p>
            <div className=''>
              <div className=' mx-auto flex flex-wrap  items-center justify-center'>
                {userInfo.friends.map((friend) => {
                  return (
                    <div
                      key={friend._id}
                      className='bg-gray-50 shadow-sm mx-4 text-center w-72 h-56 p-4 m-4 rounded-lg'>
                      <div>
                        <Image
                          src={friend.avatarUrl}
                          alt=''
                          className='rounded-full'
                          height='50'
                          width='50'></Image>
                        <p>{friend.name}</p>
                        <p>{friend.email}</p>
                        <p>
                          Joined Date:{" "}
                          {new Date(friend.joinedAt).toDateString()}
                        </p>
                        <Link href={`/chat/${friend.chatRoomId}`} passHref>
                          <p className='bg-blue-400 cursor-pointer flex justify-between items-center px-8 py-2 my-4 text-white font-bold text-lg rounded-full'>
                            <span>Chat Now</span>
                            <BiMessageDetail />
                          </p>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    if (!context.req.cookies.access) {
      throw new Error("No JWT");
    }
    decode(context.req.cookies.access);
    return {
      props: {},
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
};

export default Profile;
