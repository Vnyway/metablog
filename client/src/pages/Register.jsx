import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/globalContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const Register = () => {
  const { darkTheme, validateEmail } = useContext(GlobalContext);
  const [err, setErr] = useState(null);
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState("");
  const [desc, setDesc] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      console.log(formData);
      const res = await axios.post("/auth/upload", formData);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();
    try {
      if (validateEmail(email)) {
        await axios.post("/auth/register", {
          email,
          username,
          status,
          desc,
          password,
          img: file ? `/images/bloggers/${imgUrl}` : "",
        });
        navigate("/login");
      } else {
        setErr("Email is invalid!");
      }
    } catch (err) {
      setErr(err.response.data);
    }
  };
  return (
    <main
      style={{ transition: "all ease-in-out .3s" }}
      className={`${darkTheme ? "bg-[#181A2A]" : ""} flex justify-center`}>
      <form
        style={{ transition: "all ease-in-out .3s" }}
        className={`flex flex-col gap-[20px] w-[450px] my-[80px] p-[32px] rounded-[12px] shadow-md ${
          darkTheme ? "bg-[#242535]" : "bg-[#FFFFFF]"
        }`}>
        <h1
          style={{ transition: "all ease-in-out .3s" }}
          className={`text-center font-semibold text-[26px] ${
            darkTheme ? "text-[#FFFFFF]" : "text-[#181A2A]"
          }`}>
          Register
        </h1>
        <input
          type="text"
          placeholder="Your Email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          style={{ transition: "all ease-in-out .3s" }}
          className={`${
            darkTheme
              ? "bg-[#181A2A] border-[#3B3C4A]"
              : "bg-[#FFFFFF] border-[#DCDDDF]"
          } border-[1px]  h-[48px] w-full px-[16px] py-[12px] font-normal text-[16px] text-paragraph leading-[24px] outline-category mb-[8px]`}
        />
        <input
          type="text"
          placeholder="Your Username"
          name="username"
          onChange={(e) => setUsername(e.target.value)}
          style={{ transition: "all ease-in-out .3s" }}
          className={`${
            darkTheme
              ? "bg-[#181A2A] border-[#3B3C4A]"
              : "bg-[#FFFFFF] border-[#DCDDDF]"
          } border-[1px]  h-[48px] w-full px-[16px] py-[12px] font-normal text-[16px] text-paragraph leading-[24px] outline-category mb-[8px]`}
        />
        <input
          type="text"
          placeholder="Your Status"
          name="status"
          onChange={(e) => setStatus(e.target.value)}
          style={{ transition: "all ease-in-out .3s" }}
          className={`${
            darkTheme
              ? "bg-[#181A2A] border-[#3B3C4A]"
              : "bg-[#FFFFFF] border-[#DCDDDF]"
          } border-[1px]  h-[48px] w-full px-[16px] py-[12px] font-normal text-[16px] text-paragraph leading-[24px] outline-category mb-[8px]`}
        />
        <input
          type="text"
          placeholder="Your Interests"
          name="desc"
          onChange={(e) => setDesc(e.target.value)}
          style={{ transition: "all ease-in-out .3s" }}
          className={`${
            darkTheme
              ? "bg-[#181A2A] border-[#3B3C4A]"
              : "bg-[#FFFFFF] border-[#DCDDDF]"
          } border-[1px]  h-[48px] w-full px-[16px] py-[12px] font-normal text-[16px] text-paragraph leading-[24px] outline-category mb-[8px]`}
        />
        <input
          type="password"
          placeholder="Your Password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          style={{ transition: "all ease-in-out .3s" }}
          className={`${
            darkTheme
              ? "bg-[#181A2A] border-[#3B3C4A]"
              : "bg-[#FFFFFF] border-[#DCDDDF]"
          } border-[1px]  h-[48px] w-full px-[16px] py-[12px] font-normal text-[16px] text-paragraph leading-[24px] outline-category mb-[8px]`}
        />
        <input
          style={{ display: "none" }}
          type="file"
          id="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <motion.label
          initial="initial"
          whileHover="hover"
          className="flex gap-[5px] justify-center items-center cursor-pointer font-normal text-[16px] text-heading leading-[24px]"
          htmlFor="file">
          <motion.span
            variants={{
              initial: { color: "#696A75" },
              hover: { color: darkTheme ? "#FFFFFF" : "#181A2A" },
            }}
            style={{ transition: "all ease-out .3s" }}
            className={`text-center font-normal text-[16px] leading-[24px] pb-[8px]`}>
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
            width="30px"
            height="30px"
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
        <div className="text-center font-normal text-[16px] text-customGray leading-[24px] pb-[8px] group">
          <Link to="/login">
            Already have account?
            <span
              style={{ transition: "all ease-out .3s" }}
              className={`${
                darkTheme
                  ? "group-hover:text-[#FFFFFF]"
                  : "group-hover:text-[#181A2A]"
              } cursor-pointer`}>
              {" "}
              Login
            </span>
          </Link>
        </div>
        {err && <p className="text-center text-red-600">{err}</p>}
        <button
          onClick={handleSubmit}
          style={{ transition: "all ease-out .3s" }}
          className={`px-[20px] py-[12px] rounded-[6px] border-[1px] border-[#4B6BFB] bg-[#4B6BFB] ${
            darkTheme ? "hover:bg-[#242535]" : "hover:bg-[#FFFFFF]"
          } text-[#FFFFFF] hover:text-[#4B6BFB] font-medium text-[16px] leading-[24px]`}>
          Register
        </button>
      </form>
    </main>
  );
};

export default Register;
