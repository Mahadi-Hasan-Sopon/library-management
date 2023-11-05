import PropTypes from "prop-types";
import Rating from "react-rating";
import { AiFillStar } from "react-icons/ai";

const Book = ({ book }) => {
  const { title, image, author, category, rating } = book || {};
  return (
    <div>
      <div className="flex flex-col bg-base-200 shadow-xl rounded">
        <figure>
          <img className="w-full h-96" src={image?.cover} alt={title} />
        </figure>
        <div className="flex flex-col py-3">
          <h2 className="card-title">{title} </h2>
          <p className="text-lg font-medium">Category: {category} </p>
          <p className="text-base font-medium">Author: {author} </p>
          <div className="ratting">
            <Rating
              initialRating={rating?.rate}
              readonly
              emptySymbol={<AiFillStar className="text-2xl text-white" />}
              fullSymbol={<AiFillStar className="text-2xl text-orange-600" />}
              fractions={5}
            />
          </div>
          <div className="flex-1"></div>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">See Details</button>
          </div>
        </div>
      </div>
    </div>
  );
};

Book.propTypes = {
  book: PropTypes.object.isRequired,
};

export default Book;
