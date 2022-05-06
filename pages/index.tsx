import type { NextPage } from "next";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { SelectedUserContext } from "../context/SelectedUserContext";
import { UserInfoContext } from "../context/UserInfoContext";
import { Chatbox, Sidebar } from "../src/components";

const Home: NextPage = () => {
  const { selectedUser, setSelectedUser } = useContext(SelectedUserContext);
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
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
            <Sidebar classes='basis-full max-w-none' />
          )
        ) : (
          <>
            <Sidebar classes='basis-1/3' />
            <Chatbox />
          </>
        )}
      </div>
    </>
  );
};

export default Home;
