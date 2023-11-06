import axios from "axios";

const getAllBook = async () => {
  try {
    const result = await apiSecure.get("/allBook");
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const getBooksIdByEmail = async (email) => {
  try {
    const result = await apiSecure.get(`/borrowedBooks?email=${email}`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const getBorrowedBooksById = async (ids) => {
  // console.log(ids);
  try {
    const result = await apiSecure.post("/allBorrowedBooksId", { ids });
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const getCategories = async () => {
  try {
    const categories = await axios.get("http://localhost:5000/categories");
    return categories.data;
  } catch (error) {
    console.log(error);
  }
};

const getBestSellingBooks = async () => {
  try {
    const result = await axios.get("http://localhost:5000/bestSellers");
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export {
  getAllBook,
  getBooksIdByEmail,
  getBorrowedBooksById,
  getCategories,
  getBestSellingBooks,
};

const apiSecure = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
