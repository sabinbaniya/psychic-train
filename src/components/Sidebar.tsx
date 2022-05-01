import Image from "next/image";
import { useRouter } from "next/router";
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
  chatRoomId: string;
  _doc: {
    userId: string;
    name: string;
    email: string;
    avatarUrl: string;
    onlineStatus: boolean;
  };
}
interface props {
  setSelectedUser: (arg: string) => void;
  setUserInfo: Dispatch<SetStateAction<IUserInfo | undefined>>;
  classes?: string;
}

interface handleClickProps {
  userId: string;
  name: string;
  onlineStatus: string;
  chatRoomId: string;
}

const Sidebar = ({ setSelectedUser, setUserInfo, classes }: props) => {
  const router = useRouter();
  const handleClick = ({
    userId,
    name,
    onlineStatus,
    chatRoomId,
  }: handleClickProps) => {
    setSelectedUser(userId);
    setUserInfo({ name, status: onlineStatus });
    return router.push("./chat/" + chatRoomId);
  };

  const handleChange = (arg: string) => {
    if (arg === "") {
      return setFriendsList(mainFriendsList);
    }

    const list = friendsList?.filter((friend) => {
      return friend._doc.name.startsWith(arg);
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
      console.log(res.data);
      setMainFriendsList(res.data);
      setFriendsList(res.data);
    };

    fetchUsers();
  }, []);

  return (
    <div
      className={`max-w-xs bg-gray-100 h-[90vh] w-full overflow-y-auto ${classes}`}>
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
              onClick={() =>
                handleClick({
                  userId: friend._doc.userId,
                  name: friend._doc.name,
                  onlineStatus: friend._doc.onlineStatus ? "online" : "offline",
                  chatRoomId: friend.chatRoomId,
                })
              }
              key={friend._doc.userId}>
              <div className=''>
                <Image
                  src={friend._doc.avatarUrl}
                  height='40px'
                  width='40px'
                  className='rounded-full bg-green-100'></Image>
              </div>
              <div>
                <p>{friend._doc.name}</p>
                <p className='text-gray-500'>{friend._doc.onlineStatus}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Sidebar;
