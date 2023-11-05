import { useQuery } from "@tanstack/react-query";
import { getBooksByEmail } from "../../api/Api";
import useAuth from "../../hooks/useAuth";

const BorrowedBooks = () => {
  const { user } = useAuth();

  const booksId = useQuery({
    queryKey: ["booksId"],
    queryFn: () => getBooksByEmail(user.email),
  });

  console.log(booksId?.data);

  return <div>Borrowed Books List</div>;
};

export default BorrowedBooks;
