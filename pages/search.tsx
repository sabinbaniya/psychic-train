import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../axios/axiosInstance";

interface ISearchList {
  name: string;
  avatarUrl: string;
  joinedAt: string;
  userId: string;
}

const search = () => {
  const [searchList, setSearchList] = useState<ISearchList | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { query: "" } });
  const formSubmit = async () => {
    console.log("first");
    const query = watch("query");
    try {
      reset();
      const res = await axiosInstance.post(
        "/api/chat/search",
        JSON.stringify({ email: query })
      );

      setSearchList(res.data.user);
    } catch (e) {
      console.log(e);
    }
  };

  const handleClick = async () => {
    try {
      const res = await axiosInstance.post(
        "/api/chat/add",
        JSON.stringify({
          user: searchList?.userId,
        })
      );

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className='h-[80vh] w-full my-8'>
        <form
          onSubmit={handleSubmit(formSubmit)}
          className='flex relative items-center justify-between px-12'>
          <div className=' mx-auto'>
            <input
              type='text'
              {...register("query", {
                required: "Please provide a valid email",
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Please provide a valid email",
                },
              })}
              autoComplete='off'
              id='query'
              className='ring-2 px-4 rounded-l-md w-96 h-9 focus:outline-0'
              placeholder='jhon@chatapp.com'
            />
            <input
              type='submit'
              value='Search'
              className='cursor-pointer rounded-r-md px-4 py-2 bg-blue-500 text-white text-bold '
            />
          </div>
          {errors.query && (
            <p className='text-red-500 absolute top-10 text-sm font-bold left-1/2 -translate-x-1/2'>
              {errors.query.message}
            </p>
          )}
        </form>
        <div>
          <h1 className='font-bold text-xl text-center my-8'>User</h1>
          <div>
            {searchList && (
              <>
                <div className='rounded-md shadow-md p-4 h-48 w-64 mx-auto'>
                  <div className='flex items-center my-4'>
                    <Image
                      className='rounded-full'
                      src={searchList.avatarUrl}
                      height={64}
                      width={64}
                    />
                    <p className='ml-4 font-bold text-lg'>{searchList.name}</p>
                  </div>
                  <p className='text-gray-600'>
                    <span>Joined at: </span>
                    {new Date(searchList.joinedAt).toDateString()}
                  </p>
                  <button
                    onClick={handleClick}
                    className='px-4 py-2 rounded-md bg-gradient-to-br from-blue-400 to-indigo-500 hover:from-blue-500 hover:to-indigo-600 text-white my-2 w-full font-bold'>
                    Add Friend
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default search;
