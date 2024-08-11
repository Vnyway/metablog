import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/globalContext";

const TopSection = ({ latestPost }) => {
  const { darkTheme, formattedDate } = useContext(GlobalContext);
  return (
    latestPost && (
      <section className="container mx-auto relative h-[300px] md:h-[435px] lg:h-[650px]">
        <div
          className="h-[200px] md:h-[400px] lg:h-[600px] rounded-[12px]"
          style={{
            backgroundImage: `url(${
              latestPost.postImg
                ? latestPost.postImg
                : "/images/posts/post1.svg"
            })`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}>
          <div
            style={{ transition: "all ease-in-out .3s" }}
            className={`absolute bottom-0 left-[10%] w-[80%] md:w-[60%] lg:w-[40%] p-[20px] md:p-[40px] rounded-[12px] ${
              darkTheme
                ? "bg-[#181A2A] text-[#FFFFFF]"
                : "bg-[#FFFFFF] text-[#181A2A]"
            } shadow-lg flex flex-col items-start gap-[10px] md:gap-[24px]`}>
            <Link
              to={`/?cat=${latestPost.cat}`}
              className="px-[10px] py-[4px] bg-category rounded-[6px] text-white font-medium text-[14px]">
              {latestPost.cat}
            </Link>
            <Link to={`/singlePost/${latestPost.id}`}>
              <h1 className="font-semibold text-[28px] md:text-[36px]">
                {latestPost.title}
              </h1>
            </Link>
            <Link to={`/blogger/${latestPost.uid}`}>
              <div className="flex flex-col md:flex-row gap-[10px] md:gap-[24px] md:items-center text-paragraph font-medium text-[16px]">
                <div className="flex gap-[10px] items-center">
                  <img
                    src={
                      latestPost.userImg
                        ? latestPost.userImg
                        : "/images/bloggers/default.svg"
                    }
                    alt="user"
                    className="size-[36px] rounded-full"
                  />
                  <span>{latestPost.username}</span>
                </div>
                <span>{formattedDate(latestPost.date)}</span>
              </div>
            </Link>
          </div>
        </div>
      </section>
    )
  );
};

export default TopSection;
