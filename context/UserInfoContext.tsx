import {
  ReactChild,
  useState,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";

interface IUserInfoContext {
  userInfo: IUserInfo;
  setUserInfo: Dispatch<SetStateAction<IUserInfo>>;
}

interface IUserInfo {
  name: string;
  status: string;
}

export const UserInfoContext = createContext<IUserInfoContext>({
  userInfo: {} as IUserInfo,
  setUserInfo: () => {},
});

const UserInfoProvider = ({ children }: { children: ReactChild }) => {
  const [userInfo, setUserInfo] = useState<IUserInfo>({
    name: "",
    status: "",
  });

  return (
    <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserInfoContext.Provider>
  );
};

export default UserInfoProvider;
