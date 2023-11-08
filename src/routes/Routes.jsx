import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/Home";
// import AddBook from "../pages/addBook/AddBook";
import AddBookByHookForm from "../pages/addBook/AddBookByHookForm";
import AllBook from "../pages/allBook/AllBook";
import BorrowedBooks from "../pages/borrowedBooks/BorrowedBooks";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import PrivateRoute from "./PrivateRoute";
import BookDetails from "../components/bookDetails/BookDetails";
import Category from "../pages/category/Category";
import UpdateBook from "../pages/updateBook/UpdateBook";
import Error from "../components/error/Error";
import Admin from "../pages/admin/Admin";
import BookSample from "../components/bookSample/BookSample";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "addBook",
        element: (
          <PrivateRoute>
            {/* <AddBook /> */}
            <AddBookByHookForm />
          </PrivateRoute>
        ),
      },
      {
        path: "allBook",
        element: (
          <PrivateRoute>
            <AllBook />
          </PrivateRoute>
        ),
      },
      {
        path: "borrowedBooks",
        element: (
          <PrivateRoute>
            <BorrowedBooks />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/bookDetails/:bookId",
        element: (
          <PrivateRoute>
            <BookDetails />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/bookDetails/${params.bookId}`),
      },
      {
        path: "/books/:category",
        element: (
          <PrivateRoute>
            <Category />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/books/${params.category}`),
      },
      {
        path: "/book/update/:bookId",
        element: (
          <PrivateRoute>
            <UpdateBook />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/bookDetails/${params.bookId}`),
      },
      {
        path: "/book/sample/:bookId",
        element: <BookSample />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/bookDetails/${params.bookId}`),
      },
    ],
  },
  {
    path: "/admin",
    element: <Admin />,
  },
]);

export default routes;
