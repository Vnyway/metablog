import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/globalContext";

const Posts = ({ shownPosts, author }) => {
  const { darkTheme, formattedDate } = useContext(GlobalContext);

  return (
    <section>
      <div className="container mx-auto flex flex-col py-[80px]">
        <h4
          style={{ transition: "all ease-in-out .3s" }}
          className={`font-bold text-[24px] leading-[28px] mb-[32px] ${
            darkTheme ? "text-[#FFFFFF]" : "text-[#181A2A]"
          }  `}>
          {author ? `${author}'s posts` : "Latest Posts"}
        </h4>
        <div className="grid grid-cols-3 gap-[20px]">
          {shownPosts.map((post) => (
            <div
              style={{ transition: "all ease-in-out .3s" }}
              key={post.id}
              className={`${
                darkTheme ? "bg-[#181A2A] border-[#242535]" : "border-[#E8E8EA]"
              } rounded-[12px] border-[1px] p-[16px] flex flex-col gap-[16px] items-start hover:shadow-lg`}>
              <img src={post.postImg} alt={`post${post.id}`} />
              <Link
                to={`/?cat=${post.cat}`}
                className={`bg-category bg-opacity-10 rounded-[6px] px-[10px] py-[4px] text-category`}>
                {post.cat}
              </Link>
              <Link to={`/singlePost/${post.id}`}>
                <h3
                  style={{ transition: "all ease-in-out .3s" }}
                  className={`${
                    darkTheme ? "text-[#FFFFFF]" : "text-[#181A2A]"
                  } font-semibold text-[24px] leading-[28px] line-clamp-2 h-[62px]`}>
                  {post.title}
                </h3>
              </Link>
              <Link to={`/blogger/${post.uid}`}>
                <div className="flex gap-[20px] items-center text-customGray">
                  <div className="flex items-center gap-[12px]">
                    <img
                      src={
                        post.userImg
                          ? post.userImg
                          : "/images/bloggers/default.svg"
                      }
                      alt={post.username}
                    />
                    <span>{post.username}</span>
                  </div>
                  <span>{formattedDate(post.date)}</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Posts;
