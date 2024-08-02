import React, { useContext } from "react";
import { GlobalContext } from "../../context/globalContext";

const UserInfo = ({ img, username, status, desc }) => {
  const { darkTheme } = useContext(GlobalContext);
  console.log(img);
  return (
    <section className="container mx-auto">
      <div
        style={{ transition: "all ease-in-out .3s" }}
        className={`p-[48px] rounded-[12px] ${
          darkTheme ? "bg-[#242535]" : "bg-[#F6F6F7]"
        } flex justify-center items-center`}>
        <div className="flex flex-col items-center gap-[14px] md:gap-[24px] w-full md:w-[50%]">
          <div className="flex items-center gap-[10px] md:gap-[16px]">
            <img
              src={img ? img : "/images/bloggers/default.svg"}
              alt={username}
              className="size-[40px] md:size-[64px]"
            />
            <div className="flex flex-col">
              <h4
                style={{ transition: "all ease-in-out .3s" }}
                className={`font-medium text-[18px] md:text-[20px] ${
                  darkTheme ? "text-[#FFFFFF]" : "text-[#181A2A]"
                }`}>
                {username}
              </h4>
              <span className="font-normal text-[12px] md:text-[14px] text-customGray leading-[20px]">
                {status}
              </span>
            </div>
          </div>
          <p
            style={{ transition: "all ease-in-out .3s" }}
            className={`text-center font-normal text-[18px] ${
              darkTheme ? "text-[#BABABF]" : "text-[#3B3C4A ]"
            } leading-[26px]`}>
            {desc}
          </p>
        </div>
      </div>
    </section>
  );
};

export default UserInfo;
