import PropTypes from "prop-types";
import Rating from "react-rating";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";

const Book = ({ book, categoryValue }) => {
  const { _id, title, image, author, category, rating } = book || {};
  return (
    <div className="flex flex-col bg-base-100 shadow-xl rounded-lg">
      <figure>
        <img
          className="w-full h-96"
          src={
            image?.cover ? image.cover : "https://i.ibb.co/Z2qKCVc/image.png"
          }
          alt={title}
        />
      </figure>
      <div className="flex flex-col flex-grow py-3 px-1">
        <div className="flex flex-col space-y-2">
          <h2 className="card-title">{title} </h2>
          {categoryValue !== false ? (
            <p className="text-lg font-medium">Category: {category} </p>
          ) : (
            ""
          )}
          <p className="text-base font-medium">Author: {author} </p>
          <div className="ratting">
            <Rating
              initialRating={rating?.rate}
              readonly
              emptySymbol={<AiFillStar className="text-2xl text-orange-200" />}
              fullSymbol={<AiFillStar className="text-2xl text-orange-600" />}
              fractions={5}
            />
          </div>
        </div>
        <div className="flex-grow"></div>
        <div className="flex justify-between gap-4">
          <Link
            to={`/book/update/${_id}`}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base sm:w-auto px-6 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 dark:disabled:bg-gray-600 disabled:bg-gray-500 disabled:text-gray-400"
          >
            Update
          </Link>
          <Link
            to={`/bookDetails/${_id}`}
            className="btn btn-outline border-gray-700 border-2 dark:border-gray-500 hover:border-gray-700 hover:text-slate-100 dark:hover:text-gray-700 dark:hover:font-bold normal-case"
          >
            See Details
          </Link>
        </div>
      </div>
    </div>
  );
};

Book.propTypes = {
  book: PropTypes.object.isRequired,
  categoryValue: PropTypes.bool,
};

export default Book;
