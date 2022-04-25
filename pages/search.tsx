import { SyntheticEvent, useState } from "react";
import axiosInstance from "../axios/axiosInstance";

interface ISearchList {
  name: string;
  avatarUrl: string;
  joinedAt: Date;
  userId: string;
}

const search = () => {
  const [searchList, setSearchList] = useState<ISearchList | null>(null);
  const [query, setQuery] = useState("");
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const res = await axiosInstance.post(
      "/api/chat/search",
      JSON.stringify({ email: query })
    );

    setSearchList(res.data.user);
  };

  const handleClick = async () => {
    const res = await axiosInstance.post(
      "/api/chat/add",
      JSON.stringify({
        user: searchList?.userId,
      })
    );

    console.log(res);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='query'
          autoComplete='off'
          id='query'
          onChange={(e) => setQuery(e.target.value)}
        />
        <input type='submit' value='Search' className='cursor-pointer' />
      </form>
      <div>
        <h1>Results</h1>
        <div>
          {searchList && (
            <>
              <div>
                <p>{searchList.name}</p>
                <p>{searchList.avatarUrl}</p>
                <p>{JSON.stringify(new Date(searchList.joinedAt))}</p>
                <button onClick={handleClick}>Add Friend</button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default search;
