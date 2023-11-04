/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
export const ThemeContext = createContext("null");

const ThemeContextProvider = ({ children }) => {
  const [checked, setChecked] = useState(false);
  const toggleTheme = () => {
    const html = document.documentElement;
    html.classList.toggle("dark");
    if (html.getAttribute("data-theme") === "dark") {
      html.setAttribute("data-theme", "light");
    } else {
      html.setAttribute("data-theme", "dark");
    }
    setChecked(!checked);
  };

  const themeInfo = { checked, toggleTheme };

  return (
    <ThemeContext.Provider value={themeInfo}>{children}</ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
