import { QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Footer from "../../components/footer/Footer";
import useAuth from "../../hooks/useAuth";

const AddBook = () => {
  const queryClient = new QueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user } = useAuth();

  const handleAddBookClick = (data) => {
    const {
      title,
      author,
      category,
      quantity,
      rate,
      short_description,
      description,
      cover,
      page_demo,
    } = data;
    const image = { cover: cover, page_demo: page_demo };
    const rating = { rate: parseInt(rate), count: 1 };

    const formatedBook = {
      title,
      author,
      category,
      image,
      rating,
      quantity: quantity ? parseInt(quantity) : 1,
      short_description,
      description,
    };
    const toastId = toast.loading("Adding new Book....");
    try {
      axios
        .post(
          `http://localhost:5000/allBook?email=${user?.email}`,
          formatedBook,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log(res.data);
          if (res.data.insertedId) {
            toast.success("New Book Added Successfully.", { id: toastId });
            queryClient.invalidateQueries({ queryKey: ["allBook"] });
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response?.data.message, { id: toastId });
        });
    } catch (error) {
      console.log(error);
      toast.error(error?.message, { id: toastId });
    }
  };

  return (
    <div className="py-10">
      <form
        onSubmit={handleSubmit(handleAddBookClick)}
        className="bg-slate-100 dark:bg-base-200 py-4 md:py-10 px-4 md:px-10 rounded"
      >
        <h1 className="text-3xl font-bold text-slate-700 dark:text-slate-500 text-center mb-6">
          Add New Book
        </h1>
        <div className="grid md:grid-cols-2 md:gap-6 items-center">
          <div className="relative z-0 w-full mb-6 group">
            <input
              name="title"
              type="text"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              {...register("title", { required: "title is required" })}
            />
            {errors.title && (
              <p role="alert" className="text-red-500 text-sm">
                {errors.title.message}
              </p>
            )}
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
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              {...register("author", { required: "author name is required" })}
            />
            {errors.author && (
              <p role="alert" className="text-red-500 text-sm">
                {errors.author.message}
              </p>
            )}
            <label
              htmlFor="author"
              className="peer-focus:font-medium absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-6"
            >
              Author name
            </label>
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6 items-center">
          <div className="relative z-0 w-full mb-6 group">
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-400"
            >
              Category
            </label>
            {errors.category && (
              <p role="alert" className="text-red-500 text-sm">
                {errors.category.message}
              </p>
            )}
            <select
              name="category"
              {...register("category", {
                required: "Please select a Category",
              })}
              className="bg-slate-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Choose a category</option>
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
                  {...register("quantity")}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=""
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
                  name="rate"
                  type="text"
                  {...register("rate")}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=""
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
        <div className="grid md:grid-cols-2 md:gap-6 items-center">
          <div className="relative z-0 w-full mb-6 group">
            <input
              name="cover"
              type="text"
              {...register("cover")}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="cover"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-6"
            >
              Cover Photo Url
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              name="page_demo"
              type="text"
              {...register("page_demo")}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="page_demo"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-6"
            >
              Page Demo Photo Url
            </label>
          </div>
        </div>
        <div className="grid">
          <div className="relative z-0 w-full mb-6 group">
            <input
              name="short_description"
              type="text"
              {...register("short_description")}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="short_description"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-6"
            >
              Short Description
            </label>
          </div>
        </div>
        <div className="grid">
          <div className="relative z-0 w-full mb-6 group">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-400"
            >
              Description
            </label>
            <textarea
              name="description"
              {...register("description")}
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Book Description..."
            ></textarea>
          </div>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add New Book
        </button>
      </form>
      <Footer />
    </div>
  );
};

export default AddBook;
