import Link from "next/link";

const verify = () => {
  return (
    <>
      <div className='flex items-center justify-center h-screen'>
        <div className='text-center'>
          <h3 className='font-medium text-2xl'>Check your email inbox </h3>
          <h3 className='my-8'>
            We have sent you a mail with verification link for the account you
            signed up for.
          </h3>
          <p className='text-gray-600'>
            Can't find the email? Also try checking your spam folder
          </p>
          <p className='my-8 text-gray-500'>
            Already verified? Try{" "}
            <Link href='/login'>
              <a className='underline'>Logging In</a>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default verify;
