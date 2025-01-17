import React, { useContext, useState } from "react";
import { GlobalContext } from "../../context/globalContext";
import { Link } from "react-router-dom";
import axios from "axios";
import { links } from "./Header";

const Footer = () => {
  const { darkTheme, validateEmail, categories } = useContext(GlobalContext);

  const [input, setInput] = useState({
    email: "",
  });

  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setInput({ [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateEmail(input.email)) {
      setMessage(
        await axios.post(
          "https://node-deploy-metablog-395f0c4983e3.herokuapp.com/api/subscribers/add",
          input
        )
      );
    } else {
      setMessage({ data: "Incorrect email!" });
    }
  };

  return (
    <footer
      style={{ transition: "all ease-in-out .3s" }}
      className={`${
        darkTheme
          ? "bg-[#141624] border-[#242535]"
          : "bg-[#E8E8EA] border-[#E8E8EA]"
      } border-t-[1px]`}>
      <div className="container mx-auto pt-[64px] flex flex-col gap-[64px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[6%]">
          <div className="flex flex-col gap-[24px]">
            <div className="flex flex-col gap-[12px]">
              <h3
                style={{ transition: "all ease-in-out .3s" }}
                className={`font-semibold text-[18px] leading-[28px] ${
                  darkTheme ? "text-[#FFFFFF]" : "text-[#181A2A]"
                }`}>
                About
              </h3>
              <p className="font-normal text-[16px] text-customGray">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam
              </p>
            </div>
            <div className="flex flex-col gap-[4px]">
              <p>
                <span
                  style={{ transition: "all ease-in-out .3s" }}
                  className={`font-semibold text-[16px] ${
                    darkTheme ? "text-[#FFFFFF]" : "text-[#181A2A]"
                  } leading-[24px]`}>
                  Email:{" "}
                </span>
                <span className="font-normal text-[16px] text-customGray leading-[24px]">
                  info@jstemplate.net
                </span>
              </p>
              <p>
                <span
                  style={{ transition: "all ease-in-out .3s" }}
                  className={`font-semibold text-[16px] ${
                    darkTheme ? "text-[#FFFFFF]" : "text-[#181A2A]"
                  } leading-[24px]`}>
                  Phone:{" "}
                </span>
                <span className="font-normal text-[16px] text-customGray leading-[24px]">
                  880 123 456 789
                </span>
              </p>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col gap-[12px]">
              <h3
                style={{ transition: "all ease-in-out .3s" }}
                className={`font-semibold text-[18px] leading-[28px] ${
                  darkTheme ? "text-[#FFFFFF]" : "text-[#181A2A]"
                }`}>
                Quick Link
              </h3>
              <ul className="flex flex-col font-normal text-[16px] leading-[24px] gap-[5px]">
                {links.map((link) => (
                  <li key={link.id}>
                    <Link
                      to={link.path}
                      style={{ transition: "all ease-out .3s" }}
                      className={`text-[#696A75] ${
                        darkTheme
                          ? "hover:text-[#FFFFFF]"
                          : "hover:text-[#181A2A]"
                      }`}>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-[12px]">
              <h3
                style={{ transition: "all ease-in-out .3s" }}
                className={`font-semibold text-[18px] leading-[28px] ${
                  darkTheme ? "text-[#FFFFFF]" : "text-[#181A2A]"
                }`}>
                Category
              </h3>
              <ul className="flex flex-col font-normal text-[16px] leading-[24px] gap-[5px]">
                {categories.map((category) => (
                  <li key={category.id}>
                    <Link
                      to={`/?cat=${category.cat}`}
                      style={{ transition: "all ease-out .3s" }}
                      className={`text-[#696A75] ${
                        darkTheme
                          ? "hover:text-[#FFFFFF]"
                          : "hover:text-[#181A2A]"
                      }`}>
                      {category.cat}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <form
            style={{ transition: "all ease-in-out .3s" }}
            className={`flex flex-col mb-[80px] md:mb-0 p-[32px] rounded-[12px] ${
              darkTheme ? "bg-[#242535]" : "bg-[#FFFFFF]"
            }`}>
            <h3
              style={{ transition: "all ease-in-out .3s" }}
              className={`text-center font-semibold text-[18px] leading-[28px] ${
                darkTheme ? "text-[#FFFFFF]" : "text-heading"
              } pb-[8px] `}>
              Weekly Newsletter
            </h3>
            <p className="text-center font-normal text-[16px] text-customGray leading-[24px] pb-[30px]">
              Get blog articles and offers via email
            </p>
            <input
              type="text"
              placeholder="Your Email"
              name="email"
              onChange={handleChange}
              style={{ transition: "all ease-in-out .3s" }}
              className={`${
                darkTheme
                  ? "bg-[#181A2A] border-[#3B3C4A]"
                  : "bg-[#FFFFFF] border-[#DCDDDF]"
              } border-[1px]  h-[48px] w-full px-[16px] py-[12px] font-normal text-[16px] text-paragraph leading-[24px] outline-category mb-[8px]`}
            />
            {message && (
              <p
                className={`${
                  message.data === "User already exixts!" ||
                  message.data === "Incorrect email!"
                    ? "text-red-600"
                    : "text-green-600"
                } text-center pb-[10px]`}>
                {message.data}
              </p>
            )}
            <button
              onClick={handleSubmit}
              style={{ transition: "all ease-out .3s" }}
              className={`px-[20px] py-[12px] rounded-[6px] border-[1px] border-[#4B6BFB] bg-[#4B6BFB] ${
                darkTheme ? "hover:bg-[#242535]" : "hover:bg-[#FFFFFF]"
              } text-[#FFFFFF] hover:text-[#4B6BFB] font-medium text-[16px] leading-[24px]`}>
              Subscribe
            </button>
          </form>
        </div>
        <div
          className={`md:h-[118px] py-[30px] md:py-0 border-t-[1px] ${
            darkTheme ? "border-[#242535]" : "border-[#DCDDDF]"
          }  flex flex-col gap-[20px] md:gap-0 md:flex-row md:justify-between md:items-center`}>
          <div className="flex items-center gap-[10px]">
            <img
              src={`/images/layout/logo-img-${
                darkTheme ? "dark" : "light"
              }.svg`}
              alt="logo"
            />
            <div
              className={`${darkTheme ? "text-[#FFFFFF]" : "text-[#181A2A]"}`}>
              <h4 className="text-[20px] leading-[28px] ">
                <span className="font-normal ">Meta</span>
                <span className="font-bold">Blog</span>
              </h4>
              <span className="font-light text-[16px]">
                © JS Template 2023. All Rights Reserved.
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
