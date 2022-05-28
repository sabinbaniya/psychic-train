import { AxiosError } from "axios";
import { decode } from "jsonwebtoken";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next/types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import axiosInstance from "../axios/axiosInstance";

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorFromServer, setErrorFromServer] = useState("");

  const submit = async () => {
    setLoading(true);
    const data = {
      email: watch("email"),
      password: watch("password"),
    };

    try {
      const res = await axiosInstance.post(
        "/api/auth/login",
        JSON.stringify(data)
      );

      if (res.status === 200) {
        return router.push("/");
      }
    } catch (error) {
      const err = error as AxiosError;
      if (err.response) {
        if (
          err.response.status === 401 &&
          err.response.data.msg === "Invalid Credentials"
        ) {
          return setErrorFromServer("Invalid Credentials");
        }

        if (
          err.response.status === 401 &&
          err.response.data.msg === "User hasn't verified email."
        ) {
          return setErrorFromServer(
            "Please verify your email before signing in"
          );
        }

        if (err.response.status === 500) {
          return setErrorFromServer(
            "Internal Server Error ! Please try again later :)"
          );
        }
      }

      setErrorFromServer(
        "Network Error! Please try again later or contact support"
      );
    } finally {
      reset();

      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Chat App | Log In</title>
      </Head>
      <div className='min-h-screen grid place-items-center '>
        <div className='w-11/12 mx-auto'>
          <h1 className='font-bold text-2xl text-center'>
            Login | Or Create a account{" "}
            <Link href='/signup'>
              <a className='underline underline-offset-2 '>here</a>
            </Link>
          </h1>
          <form
            className='my-12 max-w-md mx-auto'
            onSubmit={handleSubmit(submit)}>
            <div className='form_div'>
              <label htmlFor='email' className='font-medium text-gray-900'>
                Email
              </label>
              <input
                type='text'
                {...register("email", {
                  required: "Please enter your email",
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Please provide a valid email",
                  },
                })}
                id='email'
                autoComplete='off'
                className='form_input'
              />
              {errors.email && (
                <p className='form_error'>{errors.email.message}</p>
              )}
            </div>
            <div className='form_div '>
              <label htmlFor='password' className='font-medium text-gray-900'>
                Password
              </label>
              <div className='w-full relative'>
                <input
                  type={`${showPassword ? "text" : "password"}`}
                  {...register("password", {
                    required: "Please enter your password",
                    minLength: {
                      value: 6,
                      message: "Password can't be shorter than 6 characters",
                    },
                    maxLength: {
                      value: 20,
                      message: "Password can't be longer than 20 characters",
                    },
                  })}
                  id='password'
                  autoComplete='off'
                  className='form_input'
                />
                {showPassword ? (
                  <AiOutlineEyeInvisible
                    className='cursor-pointer absolute bottom-2 right-2'
                    onClick={() => setShowPassword((prev) => !prev)}
                  />
                ) : (
                  <AiOutlineEye
                    className='cursor-pointer absolute bottom-2 right-2'
                    onClick={() => setShowPassword((prev) => !prev)}
                  />
                )}
              </div>

              {errors.password && (
                <p className='form_error'>{errors.password.message}</p>
              )}
            </div>
            <span className='text-red-400 text-md font-bold'>
              {errorFromServer.length !== 0 && errorFromServer}
            </span>

            <div className='grid place-items-center'>
              {loading ? (
                <button
                  type='submit'
                  className='my-4 flex items-center justify-center px-8  rounded-md bg-gradient-to-bl from-blue-300 to-blue-500 text-white font-bold tracking-wider cursor-not-allowed'>
                  <Image
                    src='/loader.gif'
                    alt=''
                    height='40px'
                    width='40px'></Image>
                </button>
              ) : (
                <input
                  type='submit'
                  value='Log In'
                  className='my-4 px-4 py-2 rounded-md bg-gradient-to-bl from-blue-400 hover:from-blue-300  to-blue-600 hover:to-blue-500 text-white font-bold tracking-wider cursor-pointer'
                />
              )}
            </div>
          </form>
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

export default Login;
