import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { listItemLight, listItemDark } from "../../styles/styles";
import { GlobalContext } from "../../context/globalContext";
import { motion } from "framer-motion";
import BurgerMenu from "./BurgerMenu";

export const links = [
  { id: 1, name: "Home", path: "/" },
  { id: 2, name: "Blog", path: "/blog" },
  { id: 3, name: "Single Post", path: "/singlePost" },
  { id: 4, name: "Pages", path: "/pages" },
  { id: 5, name: "Contact", path: "/contact" },
];

const Header = () => {
  const { darkTheme, setDarkTheme, setSearch } = useContext(GlobalContext);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <header
      style={{ transition: "all ease-in-out .3s" }}
      className={`${darkTheme ? "bg-[#181A2A]" : ""}`}>
      <div className="container mx-auto h-[100px] flex justify-between items-center">
        <Link
          style={{ transition: "all ease-out .3s" }}
          to="/"
          className="w-[158px] hover:scale-105 outline-none">
          <img
            src={`/images/layout/logo-${darkTheme ? "dark" : "light"}.svg`}
            alt="logo"
          />
        </Link>
        <nav className="hidden lg:flex items-center">
          <ul className="flex items-center gap-[30px]">
            {links.map((link) => (
              <li key={link.id}>
                <Link
                  style={{ transition: "all ease-out .3s" }}
                  to={link.path}
                  className={darkTheme ? listItemDark : listItemLight}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-[20px]">
          <div
            style={{ transition: "all ease-in-out .3s" }}
            className={`w-[166px] h-[36px] ${
              darkTheme ? "bg-[#242535]" : "bg-[#F4F4F5] "
            } hidden md:flex items-center`}>
            <input
              type="text"
              onChange={handleChange}
              className="w-[80%] bg-inherit outline-none pl-[10px]"
            />
            <button className="w-[20%] flex items-center justify-center">
              <img src="/images/layout/search.svg" alt="search" />
            </button>
          </div>
          <button
            style={{ transition: "all ease-out .3s" }}
            onClick={() => setDarkTheme((prev) => !prev)}
            className={`h-[28px] w-[48px] rounded-[100px] relative px-[3px] ${
              darkTheme ? "bg-[#4B6BFB]" : "bg-[#E8E8EA]"
            }`}>
            <div
              style={{ transition: "all ease-in-out .3s" }}
              className={`absolute top-[50%] translate-y-[-50%] ${
                darkTheme ? "left-[23px]" : "left-[2px]"
              } size-[24px] rounded-full flex justify-center items-center bg-white`}>
              <img src="/images/layout/sunny.svg" alt="toggle-theme" />
            </div>
          </button>
          <button className="pl-[15px] relative lg:hidden">
            <BurgerMenu />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
