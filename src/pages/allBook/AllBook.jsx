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
