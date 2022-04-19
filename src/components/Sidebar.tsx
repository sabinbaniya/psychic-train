import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

interface IUserInfo {
  name: string;
  status: string;
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

  return (
    <div className='basis-1/3 max-w-xs bg-gray-100 h-[90vh] w-full overflow-y-auto'>
      <form className='w-full h-12 grid place-items-center'>
        <input
          autoComplete='off'
          type='text'
          name='user'
          id='user'
          placeholder='Search'
          className='border-2 border-gray-400 outline-gray-500 rounded-full h-8 px-2 w-10/12 mx-auto'
        />
      </form>
      <div
        className='flex h-20 border-b-2 space-x-4 w-11/12 mx-auto space-y-1 items-center cursor-pointer'
        onClick={() => handleClick("232134354325346a")}>
        <div className=''>
          <Image
            src='/avatar.png'
            height='40px'
            width='40px'
            className='rounded-full bg-green-100'></Image>
        </div>
        <div>
          <p>Jhon Doe</p>
          <p className='text-gray-500'>Hey! Welcome</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
