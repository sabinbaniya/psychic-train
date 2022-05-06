import {Dispatch, SetStateAction, useContext, useState } from "react"

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
    setFriendsList: Dispatch<SetStateAction<IFriendsList[]>>
}

const FriendListContext = useContext<IFriendsListContext>({
  friendsList: [{
        chatRoomId: "string",
        friend: {
            userId: "string",
            name: "string",
            email: "string",
            avatarUrl: "string",
            onlineStatus: false,
        },
  }]
  setFriendsList: () => {},
});

const FriendListContextProvider = () => {
    const [friendsList, setFriendsList] = useState<IFriendsList[] | undefined>(
      undefined
    );

    const [mainFriendsList, setMainFriendsList] = useState<
      IFriendsList[] | undefined
    >(undefined);


}