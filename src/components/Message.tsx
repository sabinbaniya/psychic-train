import { LegacyRef } from "react";

interface props {
  author: string;
  author_name: string;
  msg: string;
  createdAt: string;
  firstMessageRef?: LegacyRef<HTMLDivElement>;
  user: {
    uid: string;
    uname: string;
  } | null;
}

const Message = ({
  author,
  author_name,
  msg,
  createdAt,
  firstMessageRef,
  user,
}: props) => {
  return (
    <div
      key={Math.random()}
      ref={firstMessageRef}
      className={`w-11/12 mx-auto my-4  ${
        author === user?.uid ? "text-right" : "text-left"
      }`}>
      <p
        className={`text-sm text-gray-500 px-2 ${
          author === user?.uid ? "hidden" : "block"
        }`}>
        {author_name}
      </p>
      <p
        className={` px-4 py-2 text-center rounded-full inline-block ${
          author === user?.uid
            ? "bg-gradient-to-tl from-gray-100 to-gray-300 text-black"
            : "bg-gradient-to-tl from-gray-700 to-black text-white"
        }`}>
        {msg}
      </p>
      <p className={`text-gray-500 text-xs px-2 pt-2`}>
        {new Date(createdAt).toLocaleString().split(",")[0] ===
        new Date().toLocaleString().split(",")[0]
          ? new Date(createdAt).toLocaleString().split(" ")[1]
          : new Date(createdAt).toLocaleString()}
      </p>
    </div>
  );
};

export default Message;
