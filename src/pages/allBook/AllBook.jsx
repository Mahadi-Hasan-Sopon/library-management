import { useQuery } from "@tanstack/react-query";
import { getAllBook } from "../../api/Api";

const AllBook = () => {
  const allBook = useQuery({
    queryKey: ["allBook"],
    queryFn: getAllBook,
    initialData: [],
  });

  console.log(allBook.data);

  return <div> {""} </div>;
};

export default AllBook;
