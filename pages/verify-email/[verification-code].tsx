import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import axiosInstance from "../../axios/axiosInstance";

const verifyEmail = () => {
  const [verified, setVerified] = useState<boolean | null>(null);
  useEffect(() => {
    const verificationCode = window.location.pathname.split("/")[2];

    const sendVerificationRequest = async () => {
      try {
        const res = await axiosInstance.post("/api/auth/verifyemail", {
          verificationCode,
        });

        if (res.status === 200) {
          return setVerified(true);
        }
        return setVerified(false);
      } catch (error) {
        setVerified(false);
        console.log(error);
      }
    };

    sendVerificationRequest();
  }, []);

  if (verified === null) {
    return (
      <>
        <Head>
          <title>Verify Email | Chat App</title>
        </Head>
        <main className='flex justify-center items-center h-screen'>
          <div>
            <h3 className='text-center mb-8 font-bold text-2xl'>
              Verifying Your Email
            </h3>
            <div>
              <p>Please wait...</p>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Verify Email | Chat App</title>
      </Head>
      <main className='flex justify-center items-center h-screen'>
        <div>
          <h3 className='text-center mb-8 font-bold text-2xl'>
            Verify Your Email
          </h3>
          {verified ? (
            <div className='my-12'>
              <h3 className='my-4 text-center text-xl text-gray-700 font-bold'>
                Your Email has been verified successfully!
              </h3>
              <p className='my-4 text-lg text-center '>You can log in now</p>
              <div className='flex justify-center items-center'>
                <Link href={"/login"}>
                  <a className='px-4 py-2 rounded-lg bg-blue-500 text-white font-semibold '>
                    Login
                  </a>
                </Link>
              </div>
            </div>
          ) : (
            <div className='my-12'>
              <h3 className='my-4 text-center text-xl text-gray-700 font-bold'>
                Your Email couldn't be verified.
              </h3>
              <p className='my-4 text-lg text-center '>
                Please try again later or try signing up once again
              </p>
              <div className='flex justify-center items-center'>
                <Link href={"/signup"}>
                  <a className='px-4 py-2 rounded-lg bg-blue-500 text-white font-semibold '>
                    Sign Up
                  </a>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default verifyEmail;
