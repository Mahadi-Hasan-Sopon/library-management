import { QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router-dom";

const UpdateBook = () => {
  const book = useLoaderData();
  const navigate = useNavigate();
  const queryClient = new QueryClient();

  useEffect(() => {
    window.scroll({ top: 50 });
  }, []);

  const handleUpdateClick = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const title = form.title.value;
    const author = form.author.value;
    const category = form.category.value;
    const quantity = form.quantity.value;
    const rate = form.ratting.value;
    const cover = form.image.value;

    if (rate > 5 || rate < 0) {
      return toast.error("Rating must be between 0 to 5");
    }

    if (!Number(rate)) {
      return toast.error(`Rating ${rate} - is not a number`);
    }

    const updatedBook = {
      title,
      author,
      category,
      quantity: parseInt(quantity),
      rating: { rate: parseFloat(rate) },
      image: { cover: cover },
    };

    try {
      const toastId = toast.loading("Updating Book...");
      axios
        .patch(
          `https://encyclopaedia-server.vercel.app/allBook/update/${book._id}`,
          updatedBook,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log(res.data);
          if (res.data.modifiedCount > 0) {
            toast.success("Book Updated Successfully.", { id: toastId });
            queryClient.invalidateQueries({ queryKey: ["allBook"] });
          }

          if (
            res.data.acknowledged &&
            res.data.modifiedCount == 0 &&
            res.data.matchedCount
          ) {
            toast("Book Already Updated!.", { id: toastId });
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error(err?.message);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="py-10">
      <h1 className="text-3xl font-bold text-slate-700 dark:text-slate-500 text-center mb-10">
        Update Book Details
      </h1>
      <form
        onSubmit={handleUpdateClick}
        className="bg-slate-100 dark:bg-base-200 py-4 md:py-10 px-4 md:px-10 rounded"
      >
        <div className="grid md:grid-cols-2 md:gap-6 items-center">
          <div className="relative z-0 w-full mb-6 group">
            <input
              name="title"
              type="text"
              id="title"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              defaultValue={book.title}
            />
            <label
              htmlFor="title"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-6"
            >
              Book Name
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              name="author"
              type="text"
              id="author"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
              defaultValue={book?.author}
            />
            <label
              htmlFor="author"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-6"
            >
              Author name
            </label>
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6 items-center">
          <div className="relative z-0 w-full mb-6 group">
            <label
              htmlFor="category"
              className="block peer-focus:font-medium text-sm text-gray-500 dark:text-gray-400 peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 scale-75 origin-[0] mb-2"
            >
              Category
            </label>
            <select
              name="category"
              id="category"
              className="bg-slate-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              defaultValue={book?.category}
            >
              <option defaultValue="">Choose a category</option>
              <option value="Fiction">Fiction</option>
              <option value="Dystopian">Dystopian</option>
              <option value="Romance">Romance</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Science & Math">Science & Math</option>
              <option value="History">History</option>
              <option value="Programming">Programming</option>
            </select>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <div className="flex justify-between gap-6 w-full">
              <div className="quantity flex-1">
                <input
                  name="quantity"
                  type="text"
                  id="quantity"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=""
                  defaultValue={book.quantity}
                />
                <label
                  htmlFor="quantity"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-6"
                >
                  Quantity
                </label>
              </div>
              <div className="ratting flex-1 relative">
                <input
                  name="ratting"
                  type="text"
                  id="ratting"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=""
                  defaultValue={book?.rating?.rate}
                />
                <label
                  htmlFor="ratting"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-6"
                >
                  Ratting{" "}
                  <span className="text-sm ms-2 text-orange-500">
                    {"(max 5)"}
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="grid items-center mt-2">
          <div className="relative z-0 w-full mb-6 group">
            <input
              name="image"
              type="text"
              id="image"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              defaultValue={book?.image?.cover}
            />
            <label
              htmlFor="image"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-6"
            >
              Cover Photo Url
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Update Book
        </button>
      </form>
      <div className="flex w-full justify-center">
        <button
          onClick={() => navigate(-1)}
          className="btn btn-outline px-7 border-gray-700 border-2 dark:border-gray-500 hover:border-gray-700 hover:text-slate-100 dark:hover:text-gray-700 dark:hover:font-bold normal-case"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default UpdateBook;
