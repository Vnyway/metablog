import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/globalContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { darkTheme, login } = useContext(GlobalContext);
  const [err, setErr] = useState(null);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
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
          Login
        </h1>
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
        <div className="text-center font-normal text-[16px] text-customGray leading-[24px] pb-[8px] group">
          <Link to="/register">
            Do not have account?
            <span
              style={{ transition: "all ease-out .3s" }}
              className="group-hover:text-[#FFFFFF] cursor-pointer">
              {" "}
              Register
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
          Login
        </button>
      </form>
    </main>
  );
};

export default Login;
