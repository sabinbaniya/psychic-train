import {
  useState,
  createContext,
  ReactChild,
  Dispatch,
  SetStateAction,
} from "react";

interface ISelectedUserContext {
  selectedUser: string;
  setSelectedUser: Dispatch<SetStateAction<string>>;
}

export const SelectedUserContext = createContext<ISelectedUserContext>({
  selectedUser: "",
  setSelectedUser: () => {},
});

const SelectedUserProvider = ({ children }: { children: ReactChild }) => {
  const [selectedUser, setSelectedUser] = useState("");

  return (
    <SelectedUserContext.Provider value={{ selectedUser, setSelectedUser }}>
      {children}
    </SelectedUserContext.Provider>
  );
};

export default SelectedUserProvider;
