import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { Chatbox, Navbar, Sidebar } from "../src/components";

const Home: NextPage = () => {
  const [selectedUser, setSelectedUser] = useState("");
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
      <Navbar />
      <div className='flex'>
        {selectedUser.length > 0 ? (
          <Chatbox selectedUser={selectedUser} />
        ) : (
          <Sidebar setSelectedUser={setSelectedUser} />
        )}
      </div>
    </>
  );
};

export default Home;
