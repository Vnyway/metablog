import { db } from "../db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const getPosts = (req, res) => {
  const q = req.query.cat
    ? "SELECT p.id, p.uid, `username`, `title`, p.img AS postImg, u.img AS userImg, `date`, c.cat AS cat FROM posts p JOIN users u ON p.uid = u.id JOIN categories c ON p.cid = c.id WHERE c.cat = ?"
    : "SELECT p.id, p.uid, `username`, `title`, p.img AS postImg, u.img AS userImg, `date`, c.cat AS cat FROM posts p JOIN users u ON p.uid = u.id JOIN categories c ON p.cid = c.id";
  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const getPost = (req, res) => {
  const { id } = req.params;
  const q =
    "SELECT p.id, `username`, `title`, p.desc, p.img AS postImg, u.img AS userImg, `date`, c.cat AS cat FROM posts p JOIN users u ON p.uid = u.id JOIN categories c ON p.cid = c.id WHERE p.id = (?)";
  db.query(q, [id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const getUserPosts = (req, res) => {
  const { id } = req.params;
  const q =
    "SELECT p.id, p.uid, `username`, `title`, p.img AS postImg, u.img AS userImg, `date`, c.cat AS cat FROM posts p JOIN users u ON p.uid = u.id JOIN categories c ON p.cid = c.id WHERE p.uid = ?";
  db.query(q, [id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const addPost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authentificated");
  jwt.verify(token, process.env.JWT_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");
    const q =
      "INSERT INTO posts (`title`, `desc`, `img`, `date`, `cid`, `uid`) VALUES (?)";
    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.date,
      req.body.cid,
      userInfo.id,
    ];

    console.log(values);

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been created");
    });
  });
};
