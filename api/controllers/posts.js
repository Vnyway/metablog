import { db } from "../db.js";

export const getPosts = (req, res) => {
  const q =
    "SELECT p.id, `username`, `title`, `desc`, p.img AS postImg, u.img AS userImg, `date`, c.cat AS cat FROM posts p JOIN users u ON p.uid = u.id JOIN categories c ON p.cid = c.id";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
