import {
  createContext,
  Dispatch,
  ReactChild,
  SetStateAction,
  useContext,
  useState,
} from "react";

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

interface IFriendsListContext {
  friendsList: IFriendsList[];
  setFriendsList: Dispatch<SetStateAction<IFriendsList[]>>;
}

export const friendListContext = createContext<IFriendsListContext>({
  friendsList: [] as IFriendsList[],
  setFriendsList: () => {},
});

const FriendListContextProvider = ({ children }: { children: ReactChild }) => {
  const [friendsList, setFriendsList] = useState<IFriendsList[]>([
    {
      chatRoomId: "",
      friend: {
        userId: "",
        name: "",
        email: "",
        avatarUrl: "",
        onlineStatus: false,
      },
    },
  ]);

  return (
    <friendListContext.Provider value={{ friendsList, setFriendsList }}>
      {children}
    </friendListContext.Provider>
  );
};

export default FriendListContextProvider;
