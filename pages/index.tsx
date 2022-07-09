import type { GetServerSidePropsContext, NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Chatbox, Sidebar } from "../src/components";
import { decode } from "jsonwebtoken";
import clientPromise from "../lib/db";

const Home: NextPage = () => {
  const [windowWidth, setWindowWidth] = useState(0);

  const checkSize = () => {
    setWindowWidth(window.innerWidth);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <Sidebar classes='basis-full max-w-none' />
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

export default Home;
