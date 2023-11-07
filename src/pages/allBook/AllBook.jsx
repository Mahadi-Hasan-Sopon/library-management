import { useQuery } from "@tanstack/react-query";
import { getAllBook } from "../../api/Api";
import LoadingSpinner from "../../utils/LoadingSpinner";
import Book from "../../components/book/Book";
import { useEffect, useState } from "react";

const AllBook = () => {
  const {
    data: allBook,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["allBook"],
    queryFn: getAllBook,
  });

  const [displayBooks, setDisplayBooks] = useState(allBook);

  useEffect(() => {
    setDisplayBooks(allBook);
  }, [allBook]);


  const handleFilterChange = (e) => {
    const value = e.target.value;
    if (value === "quantity") {
      const updatedBooks = allBook.filter((book) => book.quantity > 0);
      setDisplayBooks(updatedBooks);
    } else {
      setDisplayBooks(allBook);
    }
  };

  // TODO: Add a 404 page (not found page)

  // TODO: Use JWT token for doing the CRUD operations in the "All Books" and `Add Book` routes

  /***
   * FIXME: 
   * 
   * 1. You can add a "librarian" role to a specific email/password registered user. By using that
        account, the user can navigate the "All Books" route, and perform all the adding or updating
        operations. But a normal user, not having a "librarian" role, can't do these operations. If you can
        do this, please, provide the email and password of the account which has the "librarian" role in
        the README.md file.
   * 2. Use Axios interceptors for handling network requests.
   * 3. Use Swiper JS for banner and slider.
   * 4. Use the React Hook Form for handling any form.
   * 5. Use ReactToPDF or any relevant package to make the PDF version of the "Read" page of a book.
   * 
   */

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="my-10">
      {isError && error?.message}
      <div className="filter flex justify-end mb-2">
        <div>
          <select
            onChange={handleFilterChange}
            name="filter"
            id="filter"
            className="bg-slate-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option defaultValue="" value="">
              Filter by
            </option>
            <option value="quantity">Stock / Quantity</option>
          </select>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayBooks?.map((book) => (
          <Book book={book} key={book._id} />
        ))}
      </div>
    </div>
  );
};

export default AllBook;
