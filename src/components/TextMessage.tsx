interface props {
  msg: string;
  author: string;
  user: { uid: string } | null;
}

const TextMessage = ({ msg, author, user }: props) => {
  const regex = new RegExp(
    "((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)"
  );

  if (regex.test(msg)) {
    return (
      <a
        href={msg}
        rel='noreferrer'
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
