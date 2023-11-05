import useAxiosSecure from "../hooks/useAxiosSecure";
const Api = () => {
  const axiosSecure = useAxiosSecure();

  const getAllBook = async () => {
    axiosSecure
      .get("/allBook")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  return { getAllBook };
};

export default Api;
