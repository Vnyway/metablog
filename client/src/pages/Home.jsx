import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/globalContext";
import TopSection from "../components/general-components/TopSection";
import Posts from "../components/general-components/Posts";
import axios from "axios";

const Home = () => {
  const { darkTheme, search } = useContext(GlobalContext);
  const [posts, setPosts] = useState([]);
  const [shownPosts, setShownPosts] = useState([]);
  const [latestPost, setLatestPost] = useState({});
  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/posts");
        setPosts(res.data);
        setShownPosts(res.data);

        if (res.data.length > 0) {
          const latest = res.data.reduce((latest, post) => {
            return new Date(post.date) > new Date(latest.date) ? post : latest;
          }, res.data[0]);
          setLatestPost(latest);
        } else {
          setLatestPost({});
        }
      } catch (error) {
        console.log(error);
        setPosts([]);
        setShownPosts([]);
        setLatestPost({});
      }
    };
    getPosts();
  }, []);

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
      className={`${darkTheme ? "bg-[#181A2A]" : ""}`}>
      <TopSection latestPost={latestPost} />
      <Posts shownPosts={shownPosts} />
    </main>
  );
};

export default Home;
