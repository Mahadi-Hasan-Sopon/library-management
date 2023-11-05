import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 2000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
