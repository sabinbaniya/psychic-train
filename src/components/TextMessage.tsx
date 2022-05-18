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
    const msgArr = msg.split(" ");

    const linksArr = msgArr.map((st) => {
      if (regex.test(st)) {
        return st;
      } else {
        return false;
      }
    });

    return (
      <p
        className={`px-4 py-2 text-left rounded-full inline-block ${
          author === user?.uid
            ? "bg-gradient-to-tl from-gray-100 to-gray-300 text-black"
            : "bg-gradient-to-tl from-gray-700 to-black text-white"
        }`}>
        {msgArr.map((st) => {
          if (regex.test(st)) {
            return (
              <a
                href={st}
                className={`underline`}
                target='_blank'
                rel='noreferrer'>
                {" " + st + " "}
              </a>
            );
          } else {
            return <span>{" " + st + " "}</span>;
          }
        })}
      </p>
    );
  } else {
    return (
      <p
        className={` px-4 py-2 text-left rounded-full inline-block ${
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
