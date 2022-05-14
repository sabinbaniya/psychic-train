import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../axios/axiosInstance";
import { FaUserFriends } from "react-icons/fa";
import { AiOutlineUserAdd } from "react-icons/ai";

interface ISearchList {
  name: string;
  avatarUrl: string;
  joinedAt: string;
  userId: string;
  areAlreadyFriends: boolean;
}

const Search = () => {
  const [searchList, setSearchList] = useState<ISearchList | null>(null);
  const [alreadyFriends, setAlreadyFriends] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { query: "" } });
  const formSubmit = async () => {
    const query = watch("query");
    try {
      reset();
      const res = await axiosInstance.post(
        "/api/chat/search",
        JSON.stringify({ email: query })
      );

      setAlreadyFriends(res.data.user.areAlreadyFriends);
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
      setAlreadyFriends(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>Search Users | Chat App</title>
      </Head>
      <div className='h-[80vh] w-full my-8'>
        <form
          onSubmit={handleSubmit(formSubmit)}
          className='flex relative items-center justify-between px-12'>
          <div
            className='flex w-full mx-auto border-2 border-blue-500 rounded-md max-w-md'
            style={{ boxSizing: "border-box" }}>
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
              className='basis-2/3 focus:outline-none pl-4 h-10 rounded-l-md'
              placeholder='jhon@chatapp.com'
            />
            <button
              type='submit'
              className='basis-1/3 ring-2 bg-blue-500 ring-blue-500 h-10 rounded-r-md font-medium cursor-pointer text-white text-lg'>
              Search
            </button>
          </div>
          {errors.query && (
            <p className='form_error absolute top-14 text-sm font-bold left-1/2 -translate-x-1/2'>
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
                    className={`px-4 py-2 flex items-center justify-around rounded-md bg-gradient-to-br text-white my-2 w-full font-bold ${
                      alreadyFriends
                        ? "from-gray-400 to-stone-500 cursor-default"
                        : "from-blue-400 to-indigo-500 hover:from-blue-500 hover:to-indigo-600"
                    }`}>
                    {alreadyFriends ? "Friends" : "Add Friend"}
                    {alreadyFriends ? <FaUserFriends /> : <AiOutlineUserAdd />}
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

export default Search;
