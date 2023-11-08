import { useLoaderData } from "react-router-dom";

const BookSample = () => {
  const bookDetails = useLoaderData();
  console.log(bookDetails);
  return (
    <div className="flex flex-col justify-center items-center gap-4 my-10">
      <h1 className="text-4xl font-bold">{bookDetails?.title} </h1>
      <h3 className="text-2xl font-bold">{bookDetails?.author} </h3>
      <h5 className="text-xl">{bookDetails?.short_description} </h5>
      <div className="w-full text-center flex justify-center items-center">
        {bookDetails?.image?.page_demo ? (
          <img src={bookDetails.image?.page_demo} alt="" />
        ) : (
          <h1 className="text-4xl font-bold text-red-400">
            Sample Coming Soon
          </h1>
        )}
      </div>
    </div>
  );
};

export default BookSample;
