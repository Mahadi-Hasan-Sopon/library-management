import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeContextProvider";
import toast from "react-hot-toast";
import { AuthContext } from "../../contexts/AuthContextProvider";

function Admin() {
  const { toggleTheme, checked } = useContext(ThemeContext);
  const { loginUserWithEmail } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const handleAdminLogin = async (data) => {
    // console.log(data);

    const user = { email: data.email, password: data.password };
    const toastId = toast.loading("Logging in ...");
    try {
      const response = await fetch("http://localhost:5000/admin", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const isValidUser = await response.json();
      console.log(isValidUser);
      if (isValidUser?.role === "user") {
        throw new Error("Invalid Login Credentials.");
      }

      loginUserWithEmail(data.email, data.password)
        .then((res) => {
          console.log(res.user);
          toast.success("Login successful", { id: toastId });
          navigate(location?.state ? location.state : "/");
        })
        .catch((err) => toast.error(err?.message, { id: toastId }));
    } catch (error) {
      toast.error(error?.message, { id: toastId });
      console.log(error);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-8">
      <div className="toggle-div fixed top-1/2 transform -translate-y-1/2 left-0 lg:left-auto lg:-ms-6 ms-0.5 mt-6 md:mt-16 ps-px -rotate-90 z-20 bg-red-200">
        <div className="flex justify-center items-center gap-2 absolute">
          <span className="text-sm">Toggle</span>
          <input
            type="checkbox"
            className="toggle"
            onChange={toggleTheme}
            checked={checked}
          />
          <span className="text-sm">Theme</span>
        </div>
      </div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-20 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                Hello Admin !
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleSubmit(handleAdminLogin)}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    {...register("email", { required: "Email is Required." })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="admin@gmail.com"
                  />
                  {errors.email && (
                    <p className="my-1 text-red-500 font-medium text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    name="password"
                    type="password"
                    {...register("password", {
                      required: "Password is Required, idiot!",
                    })}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  {errors.password && (
                    <p className="my-1 text-red-500 font-medium text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-slate-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-slate-600 dark:ring-offset-gray-800"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium text-slate-600 hover:underline dark:text-slate-500"
                  >
                    Forgot password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-slate-600 hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-base px-5 py-2.5 text-center dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800"
                >
                  Sign in
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400 flex gap-2 items-center">
                  <span>Not an admin?</span>
                  <Link
                    to="/register"
                    className="font-medium text-slate-700 text-base hover:bg-slate-700 hover:text-white  
                    dark:text-slate-200 
                    dark:hover:bg-slate-800
                    dark:hover:text-white border-2 rounded-full px-4 py-1"
                  >
                    Sign up
                  </Link>
                  <span> as user</span>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Admin;
