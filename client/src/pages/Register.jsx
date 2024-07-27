import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/globalContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

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
      const res = await axios.post(
        "http://localhost:8800/api/upload",
        formData
      );
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
        await axios.post("http://localhost:8800/api/auth/register", {
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
        <label
          className="flex gap-[5px] justify-center items-center cursor-pointer font-normal text-[16px] text-heading leading-[24px]"
          htmlFor="file">
          <span
            style={{ transition: "all ease-out .3s" }}
            className={`text-center font-normal text-[16px] text-customGray leading-[24px] pb-[8px] ${
              darkTheme ? "hover:text-[#FFFFFF]" : "hover:text-[#181A2A]"
            }`}>
            Upload Image
          </span>
          <img
            src="/images/general/add-file.svg"
            alt="upload"
            className="size-[20px]"
          />
        </label>
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
