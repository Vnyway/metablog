import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState(false);

  const [search, setSearch] = useState("");

  const formattedDate = (dateStr) => {
    const date = new Date(dateStr);
    const dateOptions = { year: "numeric", month: "long", day: "numeric" };
    return new Intl.DateTimeFormat("en-US", dateOptions).format(date);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user") || null)
  );

  const login = async (inputs) => {
    const res = await axios.post(
      "http://localhost:8800/api/auth/login",
      inputs
    );
    setCurrentUser(res.data);
  };

  const logout = async () => {
    await axios.post("http://localhost:8800/api/auth/logout");
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <GlobalContext.Provider
      value={{
        darkTheme,
        setDarkTheme,
        search,
        setSearch,
        formattedDate,
        validateEmail,
        currentUser,
        login,
        logout,
      }}>
      {children}
    </GlobalContext.Provider>
  );
};
