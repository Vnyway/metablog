import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/globalContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const { darkTheme } = useContext(GlobalContext);
  const [err, setErr] = useState(null);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    username: "",
    status: "",
    desc: "",
    password: "",
  });
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/api/auth/register", inputs);
      navigate("/login");
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
        <h1 className="text-center font-semibold text-[26px]">Register</h1>
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
        <input
          type="text"
          placeholder="Your Username"
          name="username"
          onChange={handleChange}
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
          onChange={handleChange}
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
          onChange={handleChange}
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
          onChange={handleChange}
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
          Upload Image
          <img
            src="/images/general/add-file.svg"
            alt="upload"
            className="size-[20px]"
          />
        </label>
        <div className="flex justify-center gap-[5px]">
          <Link to="/login">
            Already have account?
            <span> Login</span>
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
