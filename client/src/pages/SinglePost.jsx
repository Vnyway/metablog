import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { GlobalContext } from "../context/globalContext";
import { Link } from "react-router-dom";

const SinglePost = () => {
  const { id } = useParams();
  const { darkTheme, getText, formattedDate } = useContext(GlobalContext);
  const [post, setPost] = useState(null);
  useEffect(() => {
    console.log("gay");
    const getPost = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/posts/${id}`);
        setPost(res.data[0]);
        // if (post !== null) {
        //   document.getElementById("text").innerHTML = post.desc;
        // }
      } catch (error) {
        console.log(error);
        setPost(null);
      }
    };
    getPost();
  }, [id]);

  return (
    <main
      style={{ transition: "all ease-in-out .3s" }}
      className={`${darkTheme ? "bg-[#181A2A]" : ""}`}>
      {post && (
        <div className="container mx-auto py-[30px] flex flex-col items-start gap-[32px]">
          <div className="flex flex-col items-start gap-[20px]">
            <Link
              to={`/?cat=${post.cat}`}
              className="px-[12px] py-[6px] bg-category rounded-[6px] text-white font-medium text-[14px]">
              {post.cat}
            </Link>
            <h1
              style={{ transition: "all ease-in-out .3s" }}
              className={`${
                darkTheme ? "text-[#FFFFFF]" : "text-[##181A2A]"
              } font-semibold text-[36px] leading-[40px]`}>
              {post.title}
            </h1>
            <div className="flex gap-[20px] items-center text-customGray">
              <div className="flex items-center gap-[12px]">
                <img src={post.userImg} alt={post.username} />
                <span>{post.username}</span>
              </div>
              <span>{formattedDate(post.date)}</span>
            </div>
          </div>
          <img src={post.postImg} alt={post.title} className="w-full" />
          <div
            id="text"
            className="flex flex-col items-start gap-[32px] font-normal text-[20px] text-lists leading-[32px]"></div>
        </div>
      )}
    </main>
  );
};

export default SinglePost;
