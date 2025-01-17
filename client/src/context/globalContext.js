import { createContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState(false);

  const [search, setSearch] = useState("");

  const categories = [
    { id: 1, cat: "Lifestyle" },
    { id: 2, cat: "Technology" },
    { id: 3, cat: "Travel" },
    { id: 4, cat: "Business" },
    { id: 5, cat: "Economy" },
    { id: 6, cat: "Sports" },
  ];

  const extensions = [".png", ".jpg", ".svg", ".gif"];

  const checkImgUrl = (filename) => {
    return extensions.some((ext) => filename.endsWith(ext));
  };

  const formattedDate = (dateStr) => {
    const date = new Date(dateStr);
    const dateOptions = { year: "numeric", month: "long", day: "numeric" };
    return new Intl.DateTimeFormat("en-US", dateOptions).format(date);
  };

  const dateToPost = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user") || null)
  );

  const login = async (inputs) => {
    const res = await axios.post(
      "https://node-deploy-metablog-395f0c4983e3.herokuapp.com/api/auth/login",
      inputs
    );
    const { token, ...userData } = res.data;
    setCurrentUser(userData);
    Cookies.set("access_token", token, {
      sameSite: "none",
      secure: true,
      crossSite: true,
    });
  };

  const logout = () => {
    Cookies.remove("access_token");
    setCurrentUser(null);
  };

  useEffect(() => {
    sessionStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <GlobalContext.Provider
      value={{
        categories,
        darkTheme,
        setDarkTheme,
        search,
        setSearch,
        formattedDate,
        dateToPost,
        validateEmail,
        currentUser,
        login,
        logout,
        checkImgUrl,
      }}>
      {children}
    </GlobalContext.Provider>
  );
};
