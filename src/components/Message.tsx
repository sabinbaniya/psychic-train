import { LegacyRef } from "react";
import TextMessage from "./TextMessage";

interface props {
  _id: string;
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
  _id,
  author_name,
  msg,
  createdAt,
  firstMessageRef,
  user,
}: props) => {
  const textMessageProps = {
    msg,
    author,
    user,
  };

  return (
    <div
      ref={firstMessageRef}
      className={`w-11/12 mx-auto my-4 ${
        author === user?.uid ? "text-right" : "text-left"
      }`}>
      <p
        className={`text-sm text-gray-500 px-2 ${
          author === user?.uid ? "hidden" : "block"
        }`}>
        {author_name}
      </p>
      <TextMessage {...textMessageProps} />
      <p className={`text-gray-500 text-xs px-2 pt-2`}>
        {new Date(createdAt).toLocaleString().split(",")[0] ===
        new Date().toLocaleString().split(",")[0]
          ? new Date(createdAt).toLocaleString().split(" ")[1].split(":")[0] +
            ":" +
            new Date(createdAt).toLocaleString().split(" ")[1].split(":")[1] +
            " " +
            new Date(createdAt).toLocaleString().split(" ")[2]
          : new Date(createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default Message;
