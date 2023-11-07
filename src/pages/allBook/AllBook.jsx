import { useQuery } from "@tanstack/react-query";
import { getAllBook } from "../../api/Api";
import LoadingSpinner from "../../utils/LoadingSpinner";
import Book from "../../components/book/Book";

const AllBook = () => {
  const {
    data: allBook,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["allBook"],
    queryFn: getAllBook,
    refetchOnWindowFocus: false,
    staleTime: 5000 * 60,
  });

  // TODO: There will also be a Filter button. By clicking this button, only available books (Quantity > 0) will be shown.

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
    <div>
      {isError && error?.message}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-20">
        {allBook?.map((book) => (
          <Book book={book} key={book._id} />
        ))}
      </div>
    </div>
  );
};

export default AllBook;
