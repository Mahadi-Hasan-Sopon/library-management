import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContextProvider";

//https:// encyclopaedia-server.vercel.app

export const apiSecure = axios.create({
  baseURL: "https://encyclopaedia-server.vercel.app",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const useApi = () => {
  const { user, LogOutUser } = useContext(AuthContext);

  if (user) {
    apiSecure.interceptors.response.use(
      (res) => {
        return res;
      },
      (error) => {
        console.log("error in interceptor", error.response);
        if (error.response.status === 401 || error.response.status === 403) {
          LogOutUser()
            .then(() => console.log("User SignOut Successfully."))
            .catch((err) => console.error(err));
        }
      }
    );
  }

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
    try {
      const result = await apiSecure.post("/allBorrowedBooksId", { ids });
      return result.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getIsBorrowedBook = async (id, email) => {
    try {
      const result = await apiSecure.get(`/borrowedBooks/${id}?email=${email}`);
      return result.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = async () => {
    try {
      const categories = await axios.get(
        "https://encyclopaedia-server.vercel.app/categories"
      );
      return categories.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getBestSellingBooks = async () => {
    try {
      const result = await axios.get(
        "https://encyclopaedia-server.vercel.app/bestSellers"
      );
      return result.data;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getAllBook,
    getBooksIdByEmail,
    getBorrowedBooksById,
    getCategories,
    getBestSellingBooks,
    getIsBorrowedBook,
  };
};

export default useApi;

// apiSecure.interceptors.response.use(
//   (res) => {
//     return res;
//   },
//   (error) => {
//     console.log("error in interceptor", error.response);
//     if (error.response.status === 401 || error.response.status === 403) {
//       // console.log("logOut the user");
//       auth
//         .signOut()
//         .then(() => console.log("User SignOut Successfully"))
//         .catch((err) => console.log(err));
//     }
//   }
// );

// const getAllBook = async () => {
//   try {
//     const result = await apiSecure.get("/allBook");
//     return result.data;
//   } catch (error) {
//     console.log(error);
//   }
// };

// const getBooksIdByEmail = async (email) => {
//   try {
//     const result = await apiSecure.get(`/borrowedBooks?email=${email}`);
//     return result.data;
//   } catch (error) {
//     console.log(error);
//   }
// };

// const getBorrowedBooksById = async (ids) => {
//   // console.log(ids);
//   try {
//     const result = await apiSecure.post("/allBorrowedBooksId", { ids });
//     return result.data;
//   } catch (error) {
//     console.log(error);
//   }
// };

// const getIsBorrowedBook = async (id, email) => {
//   try {
//     const result = await apiSecure.get(`/borrowedBooks/${id}?email=${email}`);
//     return result.data;
//   } catch (error) {
//     console.log(error);
//   }
// };

// const getCategories = async () => {
//   try {
//     const categories = await axios.get("https://encyclopaedia-server.vercel.app/categories");
//     return categories.data;
//   } catch (error) {
//     console.log(error);
//   }
// };

// const getBestSellingBooks = async () => {
//   try {
//     const result = await axios.get("https://encyclopaedia-server.vercel.app/bestSellers");
//     return result.data;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export {
//   getAllBook,
//   getBooksIdByEmail,
//   getBorrowedBooksById,
//   getCategories,
//   getBestSellingBooks,
//   getIsBorrowedBook,
// };
