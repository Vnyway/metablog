import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState(false);
  const [search, setSearch] = useState("");
  const formattedDate = (dateStr) => {
    const date = new Date(dateStr);
    const dateOptions = { year: "numeric", month: "long", day: "numeric" };
    return new Intl.DateTimeFormat("en-US", dateOptions).format(date);
  };

  return (
    <GlobalContext.Provider
      value={{ darkTheme, setDarkTheme, search, setSearch, formattedDate }}>
      {children}
    </GlobalContext.Provider>
  );
};