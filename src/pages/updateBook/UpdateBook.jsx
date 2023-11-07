import { useLoaderData } from "react-router-dom";

const UpdateBook = () => {
  const book = useLoaderData();
  console.log(book);

  return <div>UpdateBook {book.title} </div>;
};

export default UpdateBook;
