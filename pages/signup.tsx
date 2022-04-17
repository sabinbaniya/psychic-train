import Head from "next/head";
import { SyntheticEvent } from "react";
import { useForm } from "react-hook-form";

const signup = () => {
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
      cPassword: "",
    },
  });

  const submit = () => {
    reset();
    console.log(watch());
  };

  return (
    <>
      <Head>
        <title>Chat App | Sign Up</title>
      </Head>
      <div className='min-h-screen grid place-items-center '>
        <div className='w-11/12 mx-auto'>
          <h1 className='font-bold text-2xl text-center'>
            Signup | Create a new Account
          </h1>
          <form
            className='my-12 max-w-md mx-auto'
            onSubmit={handleSubmit(submit)}>
            <div className='form_div '>
              <label htmlFor='name' className='font-medium text-gray-900'>
                Name
              </label>
              <input
                type='text'
                {...register("name", { required: "Please enter your name" })}
                id='name'
                autoComplete='off'
                className='form_input'
              />
              {errors.name && (
                <p className='form_error'>{errors.name.message}</p>
              )}
            </div>
            <div className='form_div'>
              <label htmlFor='email' className='font-medium text-gray-900'>
                Email
              </label>
              <input
                type='text'
                {...register("email", {
                  required: "Please enter your email",
                  pattern:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                })}
                id='email'
                autoComplete='off'
                className='form_input'
              />
              {errors.email && (
                <p className='form_error'>
                  {errors.email.type === "required"
                    ? errors.email.message
                    : "Please provide a valid email"}
                </p>
              )}
            </div>
            <div className='form_div'>
              <label htmlFor='password' className='font-medium text-gray-900'>
                Password
              </label>
              <input
                type='text'
                {...register("password", {
                  required: "Please enter your password",
                })}
                id='password'
                autoComplete='off'
                className='form_input'
              />
              {errors.password && (
                <p className='form_error'>{errors.password.message}</p>
              )}
            </div>
            <div className='flex flex-col'>
              <label
                htmlFor=' my-4 space-y-1confirmPassword '
                className='font-medium text-gray-900'>
                Confirm Password
              </label>
              <input
                type='text'
                {...register("cPassword", {
                  required: "Please re-enter your password",
                })}
                id='confirmPassword'
                autoComplete='off'
                className='form_input'
              />
              {errors.cPassword && (
                <p className='form_error'>{errors.cPassword.message}</p>
              )}
            </div>
            <div className='grid place-items-center'>
              <input
                type='submit'
                value='Sign Up'
                className='my-4 px-4 py-2 rounded-md bg-gradient-to-bl from-blue-400 hover:from-blue-300  to-blue-600 hover:to-blue-500 text-white font-bold tracking-wider cursor-pointer'
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default signup;
