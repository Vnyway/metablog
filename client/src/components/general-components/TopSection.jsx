import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/globalContext";

const TopSection = ({ latestPost }) => {
  const { darkTheme, formattedDate } = useContext(GlobalContext);
  return (
    latestPost && (
      <section className="container mx-auto relative h-[650px]">
        <div
          className="h-[600px] rounded-[12px]"
          style={{
            backgroundImage: `url(${latestPost.postImg})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}>
          <div
            style={{ transition: "all ease-in-out .3s" }}
            className={`absolute bottom-0 left-[10%] w-[598px] p-[40px] rounded-[12px] ${
              darkTheme
                ? "bg-[#181A2A] text-[#FFFFFF]"
                : "bg-[#FFFFFF] text-[#181A2A]"
            } shadow-lg flex flex-col items-start gap-[24px]`}>
            <Link
              to="/"
              className="px-[10px] py-[4px] bg-category rounded-[6px] text-white font-medium text-[14px]">
              {latestPost.cat}
            </Link>
            <Link to="/">
              <h1 className="font-semibold text-[36px] leading-[40px]">
                {latestPost.title}
              </h1>
            </Link>
            <div className="flex gap-[20px] items-center text-paragraph font-medium text-[16px]">
              <img src={latestPost.userImg} alt="user" />
              <span>{latestPost.username}</span>
              <span>{formattedDate(latestPost.date)}</span>
            </div>
          </div>
        </div>
      </section>
    )
  );
};

export default TopSection;
