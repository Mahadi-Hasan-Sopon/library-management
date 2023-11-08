import { useQuery } from "@tanstack/react-query";
import useApi from "../../api/Api";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../utils/LoadingSpinner";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/footer/Footer";

const BorrowedBooks = () => {
  const { user } = useAuth();
  const api = useApi();

  const booksId = useQuery({
    queryKey: ["booksId"],
    queryFn: () => api.getBooksIdByEmail(user.email),
  });

  const ids = booksId.data && booksId?.data.map((book) => book.bookId);

  const borrowedBooksList = useQuery({
    queryKey: ["borrowedBooks", ids],
    queryFn: () => api.getBorrowedBooksById(ids),
    enabled: !!ids?.length,
  });

  const [allBorrowedBook, setAllBorrowedBook] = useState(
    borrowedBooksList.data || []
  );

  useEffect(() => {
    setAllBorrowedBook(borrowedBooksList.data);
  }, [borrowedBooksList.data]);

  if (borrowedBooksList.isLoading && booksId.isLoading) {
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

  const handleReturnClick = (id, quantity) => {
    console.log("id: ", id, "quantity: ", quantity);
    try {
      axios
        .delete(
          `https://encyclopaedia-server.vercel.app/allBook?email=${user?.email}&bookId=${id}`
        )
        .then((res) => {
          console.log(res.data);
          if (res.data.deletedCount > 0) {
            axios
              .patch(
                `https://encyclopaedia-server.vercel.app/allBook/update/${id}`,
                {
                  quantity: parseInt(quantity) + 1,
                }
              )
              .then((res) => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                  const updatedAllBorrowedBook = borrowedBooksList.data.filter(
                    (book) => book._id !== id
                  );
                  setAllBorrowedBook(updatedAllBorrowedBook);
                  toast.success("Book returned Successfully. Keep Reading!");
                }
              })
              .catch((err) => {
                console.log(err);
                toast.error(err?.message);
              });
          }
        })
        .catch((err) => {
          toast.error(err?.message);
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="py-10 md:py-20">
      {allBorrowedBook?.length ? (
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-10">
          Borrowed Books List
        </h1>
      ) : (
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-10">
          <span className="block mb-4">Not Borrowed yet!</span>
          Visit{" "}
          <Link
            className="border rounded px-3 py-1 mx-2 text-lg border-gray-500"
            to={"/allBook"}
          >
            All Book
          </Link>{" "}
          Route to Borrow.
        </h1>
      )}
      <div className="borrowedBooks grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {borrowedBooksList?.data?.length &&
          allBorrowedBook?.map((book) => (
            <div
              key={book._id}
              className="flex flex-col bg-base-100 shadow-xl rounded-lg"
            >
              <figure>
                <img
                  className="w-full h-96"
                  src={book.image.cover}
                  alt="Shoes"
                />
              </figure>
              <div className="flex flex-col flex-grow py-3 px-1">
                <div className="flex flex-col space-y-2">
                  <h2 className="card-title">{book.title}</h2>
                  <p className="text-lg font-medium">
                    Category: {book.category}
                  </p>
                  <div className="text-base font-medium">
                    Borrowed Date: {getBorrowedDate(book._id)}
                  </div>
                  <div className="text-base font-medium">
                    Return Date: {getReturnDate(book._id)}
                  </div>
                </div>
                <div className="flex-grow mb-4"></div>
                <button
                  onClick={() => handleReturnClick(book._id, book?.quantity)}
                  className="block w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base sm:w-auto px-6 md:px-10 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 dark:disabled:bg-gray-600 disabled:bg-gray-500 disabled:text-gray-400"
                >
                  Return
                </button>
              </div>
            </div>
          ))}
      </div>

      <Footer />
    </div>
  );
};

export default BorrowedBooks;

const formatDate = (bookDate) => {
  const date = new Date(bookDate);
  const day = date.getDate();
  const month = date.getMonth() + 1; // Month is zero-based, so we add 1
  const year = date.getFullYear();
  return `${day <= 9 ? `0${day}` : day}-${
    month <= 9 ? `0${month}` : month
  }-${year}`;
};
