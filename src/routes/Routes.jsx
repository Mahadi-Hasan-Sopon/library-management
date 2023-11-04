import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/Home";
import AddBook from "../pages/addBook/AddBook";
import AllBook from "../pages/allBook/AllBook";
import BorrowedBooks from "../pages/borrowedBooks/BorrowedBooks";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "addBook",
        element: <AddBook />,
      },
      {
        path: "allBook",
        element: <AllBook />,
      },
      {
        path: "borrowedBooks",
        element: <BorrowedBooks />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default routes;
