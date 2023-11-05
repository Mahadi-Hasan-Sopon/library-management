import axios from "axios";

const getAllBook = async () => {
  try {
    const result = await apiSecure.get("/allBook");
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const getBooksByEmail = async (email) => {
  try {
    const result = await apiSecure.get(`/allBook?email=${email}`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export { getAllBook, getBooksByEmail };

// const api = axios.create({
//   baseURL: "http://localhost:5000",
//   headers: { "Content-Type": "application/json" },
// });

const apiSecure = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
