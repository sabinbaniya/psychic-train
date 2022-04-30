import Image from "next/image";
import {
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import axiosInstance from "../../axios/axiosInstance";

interface IUserInfo {
  name: string;
  status: string;
}

interface IFriendsList {
  userId: string;
  name: string;
  email: string;
  avatarUrl: string;
  onlineStatus: boolean;
}
interface props {
  setSelectedUser: (arg: string) => void;
  setUserInfo: Dispatch<SetStateAction<IUserInfo | undefined>>;
}

const Sidebar = ({ setSelectedUser, setUserInfo }: props) => {
  const handleClick = (userId: string) => {
    setSelectedUser(userId);
    setUserInfo({ name: "Jhon Doe", status: "online" });
  };

  const handleChange = (arg: string) => {
    if (arg === "") {
      return setFriendsList(mainFriendsList);
    }

    const list = friendsList?.filter((friend) => {
      return friend.name.startsWith(arg);
    });
    setFriendsList(list);
  };

  const [friendsList, setFriendsList] = useState<IFriendsList[] | undefined>(
    undefined
  );

  const [mainFriendsList, setMainFriendsList] = useState<
    IFriendsList[] | undefined
  >(undefined);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axiosInstance.get("/api/chat/getAllFriends");
      setMainFriendsList(res.data);
      setFriendsList(res.data);
    };

    fetchUsers();
  }, []);

  return (
    <div className='basis-1/3 max-w-xs bg-gray-100 h-[90vh] w-full overflow-y-auto'>
      <form
        className='w-full h-12 grid place-items-center border-bottom-1'
        onSubmit={(e) => e.preventDefault()}>
        <input
          autoComplete='off'
          onChange={(e) => handleChange(e.target.value)}
          type='text'
          name='query'
          id='user'
          placeholder='Search'
          className='border-2 border-gray-400 outline-gray-500 rounded-full h-8 px-2 w-10/12 mx-auto'
        />
      </form>
      <div>
        {friendsList &&
          friendsList.map((friend) => (
            <div
              className='flex h-20 border-b-2 space-x-4 w-11/12 mx-auto space-y-1 items-center cursor-pointer'
              onClick={() => handleClick("232134354325346a")}
              key={friend.userId}>
              <div className=''>
                <Image
                  src={friend.avatarUrl}
                  height='40px'
                  width='40px'
                  className='rounded-full bg-green-100'></Image>
              </div>
              <div>
                <p>{friend.name}</p>
                <p className='text-gray-500'>{friend.onlineStatus}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Sidebar;
