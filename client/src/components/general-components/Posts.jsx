import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/globalContext";

const Posts = ({ shownPosts }) => {
  const { darkTheme, formattedDate } = useContext(GlobalContext);

  return (
    <section>
      <div className="container mx-auto flex flex-col py-[80px]">
        <h4
          style={{ transition: "all ease-in-out .3s" }}
          className={`font-bold text-[24px] leading-[28px] mb-[32px] ${
            darkTheme ? "text-[#FFFFFF]" : "text-[#181A2A]"
          }  `}>
          Latest Posts
        </h4>
        <div className="grid grid-cols-3 gap-[20px]">
          {shownPosts.map((post) => (
            <div
              style={{ transition: "all ease-in-out .3s" }}
              className={`${
                darkTheme ? "bg-[#181A2A]" : ""
              } rounded-[12px] border-[1px] border-[#E8E8EA] p-[16px] flex flex-col gap-[16px] items-start hover:shadow-lg`}>
              <img src={post.postImg} alt={`post${post.id}`} />
              <Link
                to="/"
                className={`bg-category bg-opacity-10 rounded-[6px] px-[10px] py-[4px] text-category`}>
                {post.cat}
              </Link>
              <h3
                style={{ transition: "all ease-in-out .3s" }}
                className={`${
                  darkTheme ? "text-[#FFFFFF]" : "text-[##181A2A]"
                } font-semibold text-[24px] leading-[28px] line-clamp-2 h-[62px]`}>
                {post.title}
              </h3>
              <div className="flex gap-[20px] items-center text-customGray">
                <div className="flex items-center gap-[12px]">
                  <img src={post.userImg} alt={post.username} />
                  <span>{post.username}</span>
                </div>
                <span>{formattedDate(post.date)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Posts;
