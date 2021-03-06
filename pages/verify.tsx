import { decode } from "jsonwebtoken";
import Head from "next/head";
import Link from "next/link";
import { GetServerSidePropsContext } from "next/types";

const Verify = () => {
  return (
    <>
      <Head>
        <title>Verify Email | Chat App</title>
      </Head>
      <div className='flex items-center justify-center h-screen'>
        <div className='text-center px-4'>
          <h3 className='font-medium text-2xl'>Check your email inbox </h3>
          <h3 className='my-8'>
            We have sent you a mail with verification link for the account you
            signed up for.
          </h3>
          <p className='text-gray-600'>
            Can{"'"}t find the email? Also try checking your spam folder
          </p>
          <p className='my-8 text-gray-500'>
            Already verified? Try
            <Link href='/login'>
              <a className='underline'>Logging In</a>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    if (!context.req.cookies.access) {
      return {
        props: {},
      };
    }
    decode(context.req.cookies.access);
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};

export default Verify;
