import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/globalContext";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { motion } from "framer-motion";

const Category = ({ id, cat, category, setCategory, darkTheme }) => (
  <div
    style={{ transition: "all ease-in-out .3s" }}
    key={id}
    className={`flex gap-[7px] items-center text-[20px] cursor-pointer ${
      darkTheme ? "text-[#FFFFFF]" : "text-[#181A2A]"
    }`}
    onClick={() => setCategory(id)}>
    <button className={`size-[20px]   `}>
      <div
        style={{ transition: "all ease-in-out .3s" }}
        className={`${
          id === category
            ? "bg-[#4B6BFB]"
            : darkTheme
            ? "bg-[#181A2A]"
            : "bg-[#FFFFFF]"
        } size-[20px] shrink-0 border-[2px] flex justify-center items-center rounded-[4px] border-category`}>
        <svg
          className={id === category ? "block" : "hidden"}
          width="10"
          height="8"
          viewBox="0 0 10 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M9.82771 0.195262C10.0574 0.455612 10.0574 0.877722 9.82771 1.13807L3.94536 7.80474C3.71564 8.06509 3.34319 8.06509 3.11347 7.80474L0.17229 4.4714C-0.05743 4.21105 -0.05743 3.78894 0.17229 3.5286C0.40201 3.26825 0.77446 3.26825 1.00418 3.5286L3.52941 6.39052L8.99582 0.195262C9.22554 -0.0650874 9.59799 -0.0650874 9.82771 0.195262Z"
            fill={darkTheme ? "#181A2A" : "#FFFFFF"}
          />
        </svg>
      </div>
    </button>
    <span>{cat}</span>
  </div>
);

const Write = () => {
  const { darkTheme, dateToPost, categories } = useContext(GlobalContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState(0);

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/posts/upload", formData);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();

    try {
      await axios.post("/posts", {
        title,
        desc,
        cid: category,
        img: file ? `/images/posts/${imgUrl}` : "",
        date: dateToPost(Date.now()),
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main
      style={{ transition: "all ease-in-out .3s" }}
      className={`${darkTheme ? "bg-[#181A2A]" : ""}`}>
      <section className="container mx-auto py-[40px] flex flex-col gap-[30px]">
        <h1
          style={{ transition: "all ease-in-out .3s" }}
          className={`${
            darkTheme ? "text-[#FFFFFF]" : "text-[#181A2A]"
          } font-semibold text-[36px] leading-[40px]`}>
          Write Your Own Post
        </h1>
        <div className="flex flex-col w-full gap-[2%]">
          <div className="w-full">
            <input
              type="text"
              placeholder="Title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ transition: "all ease-in-out .3s" }}
              className={`${
                darkTheme
                  ? "bg-[#181A2A] border-[#CCC]"
                  : "bg-[#FFFFFF] border-[#DCDDDF]"
              } border-[1px]  h-[48px] w-full px-[16px] py-[12px] font-normal text-[16px] text-paragraph leading-[24px] outline-none mb-[8px]`}
            />
            <div className="h-[600px] mb-[80px]">
              <ReactQuill
                className="h-[100%] border-none font-normal text-paragraph"
                theme="snow"
                value={desc}
                onChange={setDesc}
              />
            </div>
          </div>
          <div className="w-full grid grid-cols-5">
            <div className="col-span-3 grid grid-cols-3 gap-[20px]">
              {categories.map((element) => (
                <Category
                  darkTheme={darkTheme}
                  category={category}
                  setCategory={setCategory}
                  cat={element.cat}
                  id={element.id}
                />
              ))}
            </div>
            <div className="flex justify-start items-center">
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <motion.label
                initial="initial"
                whileHover="hover"
                className="flex gap-[5px] items-center cursor-pointer font-normal text-[16px] text-heading leading-[24px]"
                htmlFor="file">
                <motion.span
                  variants={{
                    initial: { color: "#696A75" },
                    hover: { color: darkTheme ? "#FFFFFF" : "#181A2A" },
                  }}
                  style={{ transition: "all ease-out .3s" }}
                  className={`text-center font-normal text-[20px]`}>
                  Upload Image
                </motion.span>

                <motion.svg
                  variants={{
                    initial: { fill: "#696A75" },
                    hover: { fill: darkTheme ? "#FFFFFF" : "#181A2A" },
                  }}
                  style={{ transition: "all ease-out .3s" }}
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="40px"
                  height="40px"
                  viewBox="0 0 836.699 836.699">
                  <g>
                    <g>
                      <path
                        d="M648.4,228.05h-66.6c-4.5,0-8.9,1.8-12.102,5l0,0c-3.199,3.2-5,7.5-5,12.1v54.1c0,4.5,1.801,8.9,5,12.101
			c3.201,3.199,7.602,5,12.102,5l66.6-0.2c55.4,0,100.199,44.899,100.199,100.2v2.899c0,55.4-44.9,100.201-100.199,100.201H397.1
			v-146c0-4.5-1.8-8.9-5-12.1l0,0c-3.2-3.2-7.5-5-12.1-5h-54c-4.5,0-8.9,1.8-12.101,5l0,0c-3.2,3.199-5,7.5-5,12.1v214.2
			c0,11,9,20,20,20h319.401c50.299,0,97.6-19.6,133.199-55.199s55.199-82.9,55.199-133.201v-2.899
			c0-50.301-19.6-97.601-55.199-133.2C746,247.65,698.699,228.05,648.4,228.05z"
                      />
                      <path
                        d="M255,520.351L188.4,520.55c-55.4,0-100.2-44.9-100.2-100.199v-2.901c0-55.4,44.9-100.2,100.2-100.2h251.2v146.101
			c0,4.5,1.801,8.898,5,12.1l0,0c3.201,3.199,7.5,5,12.1,5h54c4.5,0,8.9-1.801,12.102-5l0,0c3.199-3.201,5-7.5,5-12.1V249.05
			c0-11-9-20-20-20H188.4c-50.3,0-97.6,19.6-133.2,55.2C19.6,319.75,0,367.049,0,417.35v2.899c0,50.301,19.6,97.602,55.2,133.201
			s82.9,55.199,133.2,55.199H255c4.5,0,8.899-1.799,12.1-5l0,0c3.2-3.199,5-7.5,5-12.1v-54.1c0-4.5-1.8-8.9-5-12.1
			C263.8,522.149,259.5,520.351,255,520.351z"
                      />
                    </g>
                  </g>
                </motion.svg>
              </motion.label>
            </div>
            <div className="flex justify-end items-center">
              <button
                onClick={handleClick}
                style={{ transition: "all ease-out .3s" }}
                className={`px-[20px] py-[12px] rounded-[6px] border-[1px] border-[#4B6BFB] bg-[#4B6BFB] ${
                  darkTheme ? "hover:bg-[#181A2A]" : "hover:bg-[#FFFFFF]"
                } text-[#FFFFFF] hover:text-[#4B6BFB] font-medium text-[20px]`}>
                Add Your Post
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Write;
