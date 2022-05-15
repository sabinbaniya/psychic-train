import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../Layout";
import SelectedUserProvider from "../context/SelectedUserContext";
import UserInfoProvider from "../context/UserInfoContext";
import FriendListContextProvider from "../context/FriendListContext";
import { useRouter } from "next/router";
import NextNProgress from "nextjs-progressbar";
import { io } from "socket.io-client";
import { useEffect } from "react";
import { parse } from "cookie";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  // const URL = process.env.NEXT_PUBLIC_URL as string;

  // const socket = io(URL);

  // useEffect(() => {
  //   const { uid } = parse(document.cookie);
  //   socket.emit("set_online", { status: true, userId: uid });

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // useEffect(() => {
  //   window.addEventListener("unload", disconnect);

  //   return () => window.addEventListener("unload", disconnect);
  // });

  // function disconnect() {
  //   console.log("disconnect ran");
  //   const { uid } = parse(document.cookie);
  //   socket.emit("set_online", { status: false, userId: uid });
  // }

  if (
    router.asPath === "/signup" ||
    router.asPath === "/login" ||
    router.asPath === "/verify" ||
    router.asPath.startsWith("/verify-email")
  ) {
    return (
      <>
        <NextNProgress color='#3b83f6' />
        <Component {...pageProps} />
      </>
    );
  }

  return (
    <>
      <NextNProgress color='#3b83f6' />
      <SelectedUserProvider>
        <UserInfoProvider>
          <FriendListContextProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </FriendListContextProvider>
        </UserInfoProvider>
      </SelectedUserProvider>
    </>
  );
}

export default MyApp;
