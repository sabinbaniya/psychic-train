import Image from "next/image";
import { useRouter } from "next/router";
import { parse } from "cookie";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import axiosInstance from "../../axios/axiosInstance";
import { friendListContext } from "../../context/FriendListContext";
import { SelectedUserContext } from "../../context/SelectedUserContext";
import { UserInfoContext } from "../../context/UserInfoContext";

interface IUserInfo {
  name: string;
  status: string;
}

interface IFriendsList {
  chatRoomId: string;
  friend: {
    userId: string;
    name: string;
    email: string;
    avatarUrl: string;
    onlineStatus: boolean;
  };
}
interface props {
  setUserInfo?: Dispatch<SetStateAction<IUserInfo | undefined>>;
  classes?: string;
  setSkip?: Dispatch<SetStateAction<number>>;
  setChatRoomId?: Dispatch<SetStateAction<string>>;
}

interface handleClickProps {
  userId: string;
  name: string;
  onlineStatus: string;
  chatRoomId: string;
}

const Sidebar = ({ classes, setSkip, setChatRoomId }: props) => {
  const { setUserInfo } = useContext(UserInfoContext);
  const { selectedUser, setSelectedUser } = useContext(SelectedUserContext);
  const [loading, setLoading] = useState(false);
  const { friendsList, setFriendsList } = useContext(friendListContext);

  const [mainFriendsList, setMainFriendsList] =
    useState<IFriendsList[]>(friendsList);

  const router = useRouter();

  const [onHomepage, setOnHomepage] = useState(false);

  const handleClick = ({
    name,
    onlineStatus,
    chatRoomId,
  }: handleClickProps) => {
    if (setSkip) {
      setSkip(0);
    }
    if (setChatRoomId) {
      setChatRoomId(chatRoomId);
    }
    setSelectedUser(chatRoomId);
    setUserInfo({ name, status: onlineStatus });
    return router.push(
      process.env.NEXT_PUBLIC_HOST_URL + "/chat/" + chatRoomId
    );
  };

  useEffect(() => {
    setOnHomepage(router.asPath === "/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (arg: string) => {
    if (arg === "") {
      return setFriendsList(mainFriendsList);
    }

    const list = mainFriendsList?.filter((friend) => {
      return friend.friend.name.toLowerCase().startsWith(arg);
    });

    if (list.length === 0) {
      return setFriendsList([
        {
          chatRoomId: "",
          friend: {
            avatarUrl: "",
            email: "",
            name: "",
            onlineStatus: false,
            userId: "",
          },
        },
      ]);
    }
    setFriendsList(list);
  };

  useEffect(() => {
    if (friendsList[0]?.chatRoomId === "") {
      setLoading(true);
      const fetchUsers = async () => {
        try {
          const res = await axiosInstance.get("/api/chat/getAllFriends");
          setLoading(false);
          setMainFriendsList(res.data);
          setFriendsList(res.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`bg-gray-100 h-[90vh] w-full overflow-y-auto ${classes}`}>
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
          className='border-2 border-gray-400 outline-gray-500 rounded-full h-8 px-4 w-10/12 mx-auto'
        />
      </form>
      <div>
        {loading ? (
          <p className='sm:text-lg py-8 text-center'>Loading...</p>
        ) : friendsList[0]?.chatRoomId !== "" && friendsList.length !== 0 ? (
          friendsList.map((friend) => (
            <div
              className={`flex overflow-x-hidden h-20 border-b-2 space-x-4 px-4 pr-0 space-y-1 items-center cursor-pointer ${
                selectedUser === friend.chatRoomId && !onHomepage
                  ? "after:w-5 after:h-5 after:bg-gray-300 after:absolute after:rotate-45 relative after:-right-3"
                  : ""
              }`}
              onClick={() =>
                handleClick({
                  userId: friend.friend.userId,
                  name: friend.friend.name,
                  onlineStatus: friend.friend.onlineStatus
                    ? "online"
                    : "offline",
                  chatRoomId: friend.chatRoomId,
                })
              }
              key={friend.friend.userId}>
              <div className=''>
                <Image
                  alt=''
                  src={friend.friend.avatarUrl}
                  height='40px'
                  width='40px'
                  className='rounded-full bg-green-100'></Image>
              </div>
              <div>
                <p>{friend.friend.name}</p>
                <p className='text-gray-400 text-sm'>
                  {friend.friend.onlineStatus ? "online" : "offline"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div>
            <p className='px-6 py-4 text-gray-600'>
              <span className='text-gray-800 font-medium md:text-lg'>
                No friends found.
              </span>
              <br />
              <br />
              Go on <span className='underline'>More</span> {">"}{" "}
              <span className='underline'>Search People</span> & Search for
              friends to add
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
