import { useQuery } from "@tanstack/react-query";
import { getBooksIdByEmail, getBorrowedBooksById } from "../../api/Api";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../utils/LoadingSpinner";

const BorrowedBooks = () => {
  const { user } = useAuth();

  const booksId = useQuery({
    queryKey: ["booksId"],
    queryFn: () => getBooksIdByEmail(user.email),
  });

  const ids = booksId.data && booksId?.data.map((book) => book.bookId);

  const borrowedBooksList = useQuery({
    queryKey: ["borrowedBooks", ids],
    queryFn: () => getBorrowedBooksById(ids),
    enabled: !!ids?.length,
  });

  if (
    booksId.isLoading ||
    booksId.isPending ||
    borrowedBooksList.isPending ||
    borrowedBooksList.isLoading
  ) {
    return <LoadingSpinner />;
  }

  const getReturnDate = (id) => {
    // console.log("id from book", id);
    const specificBook = booksId?.data.find((book) => book.bookId === id);
    // console.log(specificBook?.returnDate);
    return formatDate(specificBook?.returnDate);
  };

  const getBorrowedDate = (id) => {
    // console.log("id from book", id);
    const specificBook = booksId?.data.find((book) => book.bookId === id);
    // console.log(specificBook?.returnDate);
    return formatDate(specificBook?.createdAt);
  };

  return (
    <div className="py-10 md:py-20">
      <h1 className="text-2xl md:text-3xl font-bold text-center">
        Borrowed Books List
      </h1>
      <div className="borrowedBooks grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {borrowedBooksList?.data.map((book) => (
          <div
            key={book._id}
            className="flex flex-col bg-base-100 shadow-xl rounded-lg"
          >
            <figure>
              <img className="w-full h-96" src={book.image.cover} alt="Shoes" />
            </figure>
            <div className="flex flex-col flex-grow py-3 px-1">
              <div className="flex flex-col space-y-2">
                <h2 className="card-title">{book.title}</h2>
                <p className="text-lg font-medium">Category: {book.category}</p>
                <div className="text-base font-medium">
                  Borrowed Date: {getBorrowedDate(book._id)}
                </div>
                <div className="text-base font-medium">
                  Return Date: {getReturnDate(book._id)}
                </div>
              </div>
              <div className="flex-grow mb-4"></div>
              <button className="block w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base sm:w-auto px-6 md:px-10 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 dark:disabled:bg-gray-600 disabled:bg-gray-500 disabled:text-gray-400">
                Return
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BorrowedBooks;

const formatDate = (bookDate) => {
  const date = new Date(bookDate);
  const day = date.getDate();
  const month = date.getMonth() + 1; // Month is zero-based, so we add 1
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};
