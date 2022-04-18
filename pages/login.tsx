import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import axiosInstance from "../axios/axiosInstance";

const login = () => {
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

  const submit = async () => {
    const data = {
      email: watch("email"),
      password: watch("password"),
    };

    reset();

    try {
      const res = await axiosInstance.post(
        "/api/auth/login",
        JSON.stringify(data)
      );

      if (res.status === 200) {
        return router.push("/");
      }
    } catch (error) {}
  };

  return (
    <>
      <Head>
        <title>Chat App | Sign Up</title>
      </Head>
      <div className='min-h-screen grid place-items-center '>
        <div className='w-11/12 mx-auto'>
          <h1 className='font-bold text-2xl text-center'>
            Login | Login to your Account
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
            <div className='grid place-items-center'>
              <input
                type='submit'
                value='Log In'
                className='my-4 px-4 py-2 rounded-md bg-gradient-to-bl from-blue-400 hover:from-blue-300  to-blue-600 hover:to-blue-500 text-white font-bold tracking-wider cursor-pointer'
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default login;
