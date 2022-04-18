import type { NextPage } from "next";
import { Chatbox, Navbar, Sidebar } from "../src/components";

const Home: NextPage = () => {
  return (
    <>
      <Navbar />
      <div className='flex'>
        <Sidebar />
        <Chatbox />
      </div>
    </>
  );
};

export default Home;
