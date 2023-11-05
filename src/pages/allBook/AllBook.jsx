import { useQuery } from "@tanstack/react-query";
import Api from "../../api/Api";

const AllBook = () => {
  const { getAllBook } = Api;
  const { data } = useQuery({
    queryKey: ["allBook"],
    queryFn: getAllBook,
  });

  console.log(data);

  return <div></div>;
};

export default AllBook;
