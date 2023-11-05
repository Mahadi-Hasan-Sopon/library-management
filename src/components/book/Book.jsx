import PropTypes from "prop-types";

const Book = ({ book }) => {
  const { title, image, author, category } = book || {};
  return (
    <div>
      <div className="card card-compact w-96 bg-base-100 shadow-xl">
        <figure>
          <img src={image?.cover} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title} </h2>
          <p className="text-lg font-medium">Category: {category} </p>
          <p className="text-base font-medium">Author: {author} </p>
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
