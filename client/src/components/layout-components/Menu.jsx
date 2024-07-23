import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { links } from "./Header";
import { GlobalContext } from "../../context/globalContext";
import { burgerItemLight, burderItemDark } from "../../styles/styles";

const Menu = () => {
  const { darkTheme } = useContext(GlobalContext);
  return (
    <>
      <nav
        className={`${
          darkTheme ? "bg-[#181A2A]" : "bg-[#FFFFFF]"
        }  container ml-auto fixed z-30 top-0 left-0 bottom-0 w-[70%] md:w-[400px] pt-[30px] shadow-lg translate-x-[-100%]`}>
        <ul className="mt-0 flex flex-col items-start gap-[30px]">
          <li>
            <Link to="/">
              <img
                src={`/images/layout/logo-${darkTheme ? "dark" : "light"}.svg`}
                alt="logo"
              />
            </Link>
          </li>
          {links.map((link) => (
            <li key={link.id}>
              <Link
                style={{ transition: "all ease-out .3s" }}
                to={link.path}
                className={darkTheme ? burderItemDark : burgerItemLight}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="shadw"></div>
    </>
  );
};

export default Menu;