import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Chatbox, Sidebar } from "../src/components";

interface IUserInfo {
  name: string;
  status: string;
}

const Home: NextPage = () => {
  const [selectedUser, setSelectedUser] = useState("");
  const [userInfo, setUserInfo] = useState<IUserInfo | undefined>(undefined);
  const [windowWidth, setWindowWidth] = useState(0);

  const checkSize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    if (windowWidth === 0) {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", checkSize);
    return () => {
      window.removeEventListener("resize", checkSize);
    };
  });

  return (
    <>
      <Head>
        <title>Chat | Start Messaging</title>
      </Head>
      <div className='flex'>
        {windowWidth < 640 ? (
          selectedUser.length > 0 ? (
            <Chatbox selectedUser={selectedUser} />
          ) : (
            <Sidebar
              setSelectedUser={setSelectedUser}
              setUserInfo={setUserInfo}
              classes='basis-full max-w-none'
            />
          )
        ) : (
          <>
            <Sidebar
              setSelectedUser={setSelectedUser}
              setUserInfo={setUserInfo}
              classes='basis-1/3'
            />
            <Chatbox />
          </>
        )}
      </div>
    </>
  );
};

export default Home;
