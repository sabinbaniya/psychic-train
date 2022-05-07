import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../Layout";
import SelectedUserProvider from "../context/SelectedUserContext";
import UserInfoProvider from "../context/UserInfoContext";
import FriendListContextProvider from "../context/FriendListContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
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
