import { AiFillStar } from "react-icons/ai";
import Rating from "react-rating";
import { useLoaderData } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const BookDetails = () => {
  const book = useLoaderData();
  const { user } = useAuth();

  const [name, setName] = useState(user.displayName || "");
  const [email, setEmail] = useState(user.email || "");
  const [returnDate, setReturnDate] = useState("");

  const {
    _id,
    image,
    title,
    rating,
    author,
    ISBN,
    category,
    description,
    short_description,
    publication_year,
    quantity,
  } = book;

  const handleBorrowClick = () => {
    const borrowedInformation = { bookId: _id, name, email, returnDate };

    if (!returnDate) {
      toast.error("Please Provide Return Date and try again");
      return;
    }
    if (!name) {
      return toast.error("Please Enter Your Name");
    }
    if (!email) {
      return toast.error("Please Provide Email");
    }

    try {
      axios
        .post(`http://localhost:5000/borrowed`, borrowedInformation, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.acknowledged && res.data.insertedId) {
            axios
              .patch(`http://localhost:5000/allBook/${_id}`, {
                quantity: parseInt(quantity) - 1,
              })
              .then((res) => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                  toast.success("Book borrowed Successfully. Keep Reading!");
                }
              })
              .catch((err) => {
                console.log(err);
                toast.error(err?.message);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid sm:grid-cols-3 sm:gap-10 py-10 md:py-20 overflow-hidden">
      <div className="left w-full h-full">
        <img
          className="w-full h-full max-h-[75%] sm:max-h-[90%]"
          src={
            image?.cover ? image.cover : "https://i.ibb.co/Z2qKCVc/image.png"
          }
          alt=""
        />
        <div className="ratting flex flex-col items-center gap-4 justify-center pt-6">
          <Rating
            initialRating={rating?.rate}
            readonly
            emptySymbol={<AiFillStar className="text-2xl text-orange-200" />}
            fullSymbol={<AiFillStar className="text-2xl text-orange-600" />}
            fractions={5}
          />
          <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base sm:w-auto px-5 md:px-8 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Read Sample
          </button>
        </div>
      </div>
      <div className="right sm:col-span-2 space-y-2.5 mt-4">
        <p className="text-lg text-slate-600 dark:text-slate-400 font-semibold">
          <span className="font-medium text-base text-slate-500 dark:text-slate-400">
            Category:
          </span>{" "}
          {category}
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-200">
          {title}
        </h2>
        <p className="text-lg font-semibold text-slate-600 dark:text-slate-400">
          <span className="font-medium text-base text-slate-500 dark:text-slate-400">
            By -{" "}
          </span>
          {author}
        </p>
        <p className="text-lg font-semibold text-slate-600 dark:text-slate-400">
          <span className="font-medium text-base text-slate-500 dark:text-slate-400">
            ISBN:{" "}
          </span>
          {ISBN}
        </p>
        <p className="text-lg font-semibold text-slate-600 dark:text-slate-400">
          <span className="font-medium text-base text-slate-500 dark:text-slate-400">
            Published In:{" "}
          </span>
          {publication_year}
        </p>
        <p className="text-base font-semibold text-slate-500 dark:text-slate-400">
          <span className="font-medium text-lg text-slate-600 dark:text-slate-400">
            Plot:{" "}
          </span>
          {short_description}
        </p>
        <div className="qty-and-borrow flex items-center gap-6">
          <p className="text-base font-semibold text-slate-600 dark:text-slate-400">
            <span className="font-medium text-lg text-slate-500 dark:text-slate-400">
              Quantity:{" "}
            </span>
            {quantity?.toFixed(2)}
          </p>
          <button
            disabled={quantity < 1 ? true : false}
            onClick={() => document.getElementById("borrow_modal").showModal()}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base sm:w-auto px-6 md:px-10 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 dark:disabled:bg-gray-600 disabled:bg-gray-500 disabled:text-gray-400"
          >
            Borrow
          </button>
        </div>
        <div className="divider py-6"></div>
        <p className="text-base font-semibold text-slate-500 dark:text-slate-400">
          <span className="font-bold text-xl text-slate-700 dark:text-slate-300 block mb-3">
            Description:
          </span>
          {description}
        </p>
      </div>
      <div className="modal-container">
        <dialog id="borrow_modal" className="modal">
          <div className="modal-box">
            <form method="dialog">
              <div className="inputs space-y-6">
                <div className="name">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your Name
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                      </svg>
                    </span>
                    <input
                      name="name"
                      type="text"
                      id="name"
                      className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Bonnie Green"
                      value={user?.displayName}
                      onBlur={(e) => setName(e.target.value)}
                      readOnly={user.displayName ? true : false}
                    />
                  </div>
                </div>
                <div className="email">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 16"
                      >
                        <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                        <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                      </svg>
                    </div>
                    <input
                      name="email"
                      value={user?.email}
                      onBlur={(e) => setEmail(e.target.value)}
                      readOnly={user.email ? true : false}
                      type="email"
                      id="email"
                      placeholder="name@flowbite.com"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="date">
                  <label
                    htmlFor="return-date"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Return Date:
                  </label>
                  <input
                    name="return-date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    type="date"
                    id="return-date"
                    autoFocus
                    className="text-base font-medium py-2 px-4 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="actions mt-6 flex justify-between items-center">
                <button className="btn btn-error text-gray-100 px-6 py-2.5">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={quantity < 1 ? true : false}
                  onClick={handleBorrowClick}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base sm:w-auto px-6 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 dark:disabled:bg-gray-600 disabled:bg-gray-500 disabled:text-gray-400"
                >
                  Borrow
                </button>
              </div>
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-0">
                ✕
              </button>
            </form>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default BookDetails;
