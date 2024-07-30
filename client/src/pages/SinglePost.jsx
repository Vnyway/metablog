import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { GlobalContext } from "../context/globalContext";
import { Link } from "react-router-dom";
import DOMpurify from "dompurify";

const SinglePost = () => {
  const { id } = useParams();
  const { darkTheme, formattedDate, currentUser } = useContext(GlobalContext);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(`/posts/${id}`);
        setPost(res.data[0]);
      } catch (error) {
        console.log(error);
        setPost(null);
      }
    };
    getPost();
  }, [id]);

  const getComments = async () => {
    try {
      const res = await axios.get(`/comments/${id}`);
      setComments(res.data);
    } catch (error) {
      console.log(error);
      setComments([]);
    }
  };

  useEffect(() => {
    getComments();
  }, [id]);

  const handleChange = (e) => {
    e.preventDefault();
    setNewComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/comments/add", {
        comment: newComment,
        pid: Number(id),
        uid: currentUser.id,
        date: new Date().toISOString().split("T")[0],
      });
      getComments();
    } catch (error) {
      console.log(error);
    }
  };

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
            style={{ transition: "all ease-in-out .3s" }}
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            className={`${
              darkTheme
                ? "description-dark text-[#BABABF]"
                : "description text-[#3B3C4A]"
            } flex flex-col items-start gap-[32px] font-normal text-[20px] leading-[32px]`}></div>
          <div className="flex flex-col gap-[20px]">
            <h3
              style={{ transition: "all ease-in-out .3s" }}
              className={`${
                darkTheme ? "text-[#FFFFFF]" : "text-[#181A2A]"
              } font-semibold text-[24px] `}>
              Comments
            </h3>
            {comments.length > 0 &&
              comments.map((comment) => (
                <div className="flex flex-col gap-[10px]">
                  <div className="flex items-center gap-[12px]">
                    <img
                      src={
                        comment.userImg
                          ? comment.userImg
                          : "/images/bloggers/default.svg"
                      }
                      alt={comment.username}
                      className="size-[45px]"
                    />
                    <div className="flex flex-col">
                      <h4
                        className={`font-medium text-[20px] ${
                          darkTheme ? "text-[#FFFFFF]" : "text-[#181A2A]"
                        }`}>
                        {comment.username}
                      </h4>
                      <span className="font-normal text-[14px] text-customGray">
                        {formattedDate(comment.date)}
                      </span>
                    </div>
                  </div>
                  <p
                    className={`pl-[57px] font-normal text-[18px] ${
                      darkTheme ? "text-[#BABABF] " : "text-[#3B3C4A]"
                    }`}>
                    {comment.comment}
                  </p>
                </div>
              ))}
            {currentUser && (
              <form className="flex items-center gap-[20px]">
                <img
                  src={
                    currentUser.img
                      ? currentUser.img
                      : "/images/bloggers/default.svg"
                  }
                  alt={currentUser.username}
                  className="size-[36px] rounded-full "
                />
                <input
                  type="text"
                  placeholder="Type Your Comment"
                  name="comment"
                  onChange={handleChange}
                  style={{ transition: "all ease-in-out .3s" }}
                  className={`${
                    darkTheme
                      ? "bg-[#181A2A] border-[#3B3C4A]"
                      : "bg-[#FFFFFF] border-[#DCDDDF]"
                  } border-b-[1px] h-[32px] w-[300px] px-[5px] py-[8px] font-normal text-[16px] text-paragraph leading-[24px] outline-none mb-[8px]`}
                />
                <button
                  onClick={handleSubmit}
                  style={{ transition: "all ease-out .3s" }}
                  className={`px-[30px] py-[5px] rounded-[6px] border-[1px] border-[#4B6BFB] bg-[#4B6BFB] ${
                    darkTheme ? "hover:bg-[#242535]" : "hover:bg-[#FFFFFF]"
                  } text-[#FFFFFF] hover:text-[#4B6BFB] font-medium text-[16px] leading-[24px]`}>
                  Add Comment
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default SinglePost;
