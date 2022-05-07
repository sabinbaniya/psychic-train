const TextMessage = ({
  msg,
  author,
  user,
}: {
  msg: string;
  author: string;
  user: { uid: string } | null;
}) => {
  if (msg.startsWith("https://") || msg.startsWith("www.")) {
    return (
      <a
        href={msg}
        target='_blank'
        className={` px-4 py-2 text-center rounded-full underline inline-block ${
          author === user?.uid
            ? "bg-gradient-to-tl from-gray-100 to-gray-300 text-black"
            : "bg-gradient-to-tl from-gray-700 to-black text-white"
        }`}>
        {msg}
      </a>
    );
  } else {
    return (
      <p
        className={` px-4 py-2 text-center rounded-full inline-block ${
          author === user?.uid
            ? "bg-gradient-to-tl from-gray-100 to-gray-300 text-black"
            : "bg-gradient-to-tl from-gray-700 to-black text-white"
        }`}>
        {msg}
      </p>
    );
  }
};

export default TextMessage;
