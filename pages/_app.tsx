import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../Layout";
import SelectedUserProvider from "../context/SelectedUserContext";
import UserInfoProvider from "../context/UserInfoContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Layout>
        <SelectedUserProvider>
          <UserInfoProvider>
            <Component {...pageProps} />
          </UserInfoProvider>
        </SelectedUserProvider>
      </Layout>
    </>
  );
}

export default MyApp;
