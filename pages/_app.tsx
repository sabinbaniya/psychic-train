import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../Layout";
import SelectedUserProvider from "../context/SelectedUserContext";
import UserInfoProvider from "../context/UserInfoContext";
import FriendListContextProvider from "../context/FriendListContext";
import { useRouter } from "next/router";
import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  if (router.asPath === "/signup" || router.asPath === "/login") {
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
      <Layout>
        <SelectedUserProvider>
          <UserInfoProvider>
            <FriendListContextProvider>
              <Component {...pageProps} />
            </FriendListContextProvider>
          </UserInfoProvider>
        </SelectedUserProvider>
      </Layout>
    </>
  );
}

export default MyApp;
