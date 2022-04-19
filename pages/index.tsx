import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { Chatbox, Navbar, Sidebar } from "../src/components";

interface IUserInfo {
  name: string;
  status: string;
}

const Home: NextPage = () => {
  const [selectedUser, setSelectedUser] = useState("");
  const [userInfo, setUserInfo] = useState<IUserInfo | undefined>(undefined);
  // const [windowWidth, setWindowWidth] = useState(0);

  // useEffect(() => {
  //   document.addEventListener("resize", () =>
  //     setWindowWidth(window.innerWidth)
  //   );
  //   console.log(windowWidth);
  //   return;
  // });

  return (
    <>
      <Navbar userInfo={userInfo} />
      <div className='flex'>
        {selectedUser.length > 0 ? (
          <Chatbox selectedUser={selectedUser} />
        ) : (
          <Sidebar
            setSelectedUser={setSelectedUser}
            setUserInfo={setUserInfo}
          />
        )}
      </div>
    </>
  );
};

export default Home;
