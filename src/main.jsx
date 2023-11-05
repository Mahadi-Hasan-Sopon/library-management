import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/Routes.jsx";
import ThemeContextProvider from "./contexts/ThemeContextProvider.jsx";
import AuthContextProvider from "./contexts/AuthContextProvider.jsx";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <AuthContextProvider>
        <RouterProvider router={routes} />
        <Toaster />
      </AuthContextProvider>
    </ThemeContextProvider>
  </React.StrictMode>
);
