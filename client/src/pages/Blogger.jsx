import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../context/globalContext";
import UserInfo from "../components/general-components/UserInfo";
import Posts from "../components/general-components/Posts";

const Blogger = () => {
  const { darkTheme, search } = useContext(GlobalContext);
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [shownPosts, setShownPosts] = useState([]);
  useEffect(() => {
    const getUserPosts = async () => {
      try {
        const res = await axios.get(`/posts/user/${id}`);
        setPosts(res.data);
      } catch (error) {
        console.log(error);
        setPosts(null);
      }
    };
    getUserPosts();
  }, [id]);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await axios.get(`/users/${id}`);
        setUserData(res.data[0]);
      } catch (error) {
        console.log(error);
        setUserData([]);
      }
    };
    getUserData();
  }, [id]);

  useEffect(() => {
    if (search.trim() !== "") {
      setShownPosts(
        posts.filter(
          (post) =>
            post.title.toLowerCase().includes(search.toLowerCase()) ||
            post.cat.toLowerCase().includes(search.toLowerCase()) ||
            post.username.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setShownPosts(posts);
    }
  }, [search, posts]);

  return (
    <main
      style={{ transition: "all ease-in-out .3s" }}
      className={`${darkTheme ? "bg-[#181A2A]" : ""} py-[30px]`}>
      {userData && (
        <UserInfo
          img={userData.img}
          username={userData.username}
          status={userData.status}
          desc={userData.desc}
        />
      )}
      {shownPosts && userData && (
        <Posts shownPosts={shownPosts} author={userData.username} />
      )}
    </main>
  );
};

export default Blogger;
