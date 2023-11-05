import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { FcReading } from "react-icons/fc";

const Navbar = () => {
  const { user, LogOutUser, isLoading } = useAuth();

  if (isLoading) return;

  const handleLogOut = () => {
    try {
      const id = toast.loading("Logging Out User..");
      LogOutUser().then(toast.success("User Logged Out.", { id: id }));
    } catch (error) {
      toast.error(error?.message);
    }
  };

  return (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/addBook"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          Add Book
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/allBook"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          All Book
        </NavLink>
      </li>
      <li>
        <NavLink
          to={`/borrowedBooks`}
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          Borrowed Books
        </NavLink>
      </li>
      <li>
        {user ? (
          <div className="flex gap-3 justify-center items-center flex-col-reverse lg:flex-row mt-2 lg:mt-auto">
            <div>
              <button
                onClick={handleLogOut}
                className="text-white bg-orange-700 hover:bg-orange-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full px-4 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              >
                SignOut
              </button>
            </div>
            <div className="avatar flex flex-col items-center">
              {user?.photoURL ? (
                <img
                  className="w-10 h-10 rounded-full border"
                  src={user.photoURL}
                  alt=""
                />
              ) : (
                <FcReading className="text-4xl lg:text-3xl" />
              )}

              <p className="text-lg font-bold">
                {user?.displayName ? user.displayName : "User"}
              </p>
            </div>
          </div>
        ) : (
          <NavLink
            to="/login"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            Login
          </NavLink>
        )}
      </li>
    </>
  );
};

export default Navbar;
