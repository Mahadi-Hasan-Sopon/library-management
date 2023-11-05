import axios from "axios";


const getAllBook = async () => {
  try {
    const books = await axios.get();
    return books.data;
  } catch (error) {
    console.log(error);
  }
};

export { getAllBook };
