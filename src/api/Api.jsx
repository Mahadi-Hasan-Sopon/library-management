import axios from "axios";

const getAllBook = async () => {
  try {
    const result = await apiSecure.get("/allBook");
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export { getAllBook };

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
