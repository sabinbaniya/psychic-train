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

  const socket = io("http://localhost:5000");

  useEffect(() => {
    const { uid } = parse(document.cookie);
    socket.emit("set_online", { status: true, userId: uid });
  }, []);

  function disconnect() {
    const { uid } = parse(document.cookie);
    socket.emit("set_online", { status: false, userId: uid });
  }

  // function disconnected() {
  //   socket.on("disconnect", (data) => {
  //     console.log(data, "disconnected");
  //   });
  // }

  useEffect(() => {
    window.addEventListener("beforeunload", disconnect);

    return () => {
      window.addEventListener("beforeunload", disconnect);
    };
  });

  // useEffect(() => {
  //   window.addEventListener("beforeunload", disconnected);

  //   return () => {
  //     window.addEventListener("beforeunload", disconnected);
  //   };
  // });

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
