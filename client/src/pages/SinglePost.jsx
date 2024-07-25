import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { GlobalContext } from "../context/globalContext";
import { Link } from "react-router-dom";
import DOMpurify from "dompurify";

const SinglePost = () => {
  const { id } = useParams();
  const { darkTheme, formattedDate } = useContext(GlobalContext);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/posts/${id}`);
        setPost(res.data[0]);
      } catch (error) {
        console.log(error);
        setPost(null);
      }
    };
    getPost();
  }, [id]);

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/comments/${id}`);
        setComments(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
        setComments([]);
      }
    };
    getComments();
  }, [id]);

  let sanitizedContent;

  if (post) {
    sanitizedContent = DOMpurify.sanitize(post.desc);
  }

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
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            className="description flex flex-col items-start gap-[32px] font-normal text-[20px] text-lists leading-[32px]"></div>
          <div className="flex flex-col gap-[20px]">
            <h3 className="font-semibold text-[24px] text-heading">Comments</h3>
            {comments.length > 0 &&
              comments.map((comment) => (
                <div className="flex flex-col gap-[20px]">
                  <div className="flex items-center gap-[12px]">
                    <img
                      src={comment.userImg}
                      alt={comment.username}
                      className="size-[45px]"
                    />
                    <div className="flex flex-col">
                      <h4 className="font-medium text-[20px] text-heading">
                        {comment.username}
                      </h4>
                      <span className="font-normal text-[14px] text-customGray">
                        {formattedDate(comment.date)}
                      </span>
                    </div>
                  </div>
                  <p className="pl-[57px] font-normal text-[18px]">
                    {comment.comment}
                  </p>
                </div>
              ))}
          </div>
        </div>
      )}
    </main>
  );
};

export default SinglePost;
