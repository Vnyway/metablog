import React, { useContext } from "react";
import { GlobalContext } from "../../context/globalContext";

const UserInfo = ({ img, username, status, desc }) => {
  const { darkTheme } = useContext(GlobalContext);
  return (
    <section
      style={{ transition: "all ease-in-out .3s" }}
      className={`container mx-auto p-[48px] rounded-[12px] ${
        darkTheme ? "bg-[#242535]" : "bg-[#F6F6F7]"
      }  flex justify-center items-center`}>
      <div className="flex flex-col items-center gap-[24px] w-[50%]">
        <div className="flex items-center gap-[16px]">
          <img src={img} alt={username} className="size-[64px]" />
          <div className="flex flex-col">
            <h4
              style={{ transition: "all ease-in-out .3s" }}
              className={`font-medium text-[20px] ${
                darkTheme ? "text-[#FFFFFF]" : "text-[#181A2A]"
              } leading-[28px]`}>
              {username}
            </h4>
            <span className="font-normal text-[14px] text-customGray leading-[20px]">
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
    </section>
  );
};

export default UserInfo;
