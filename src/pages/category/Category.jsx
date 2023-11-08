import { useLoaderData } from "react-router-dom";
import Book from "../../components/book/Book";
import { useEffect } from "react";
import Footer from "../../components/footer/Footer";

const Category = () => {
  const books = useLoaderData();

  useEffect(() => {
    window.scroll({ top: 0 });
  }, []);

  return (
    <div>
      <h1 className="text-3xl md:text-5xl font-bold text-center mt-10">
        {books[0]?.category}
      </h1>
      <div className="books grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-20">
        {books?.map((book) => (
          <Book key={book._id} book={book} categoryValue={false} />
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Category;
