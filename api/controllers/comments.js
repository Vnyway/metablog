import { db } from "../db.js";

export const getComments = (req, res) => {
  const { postId } = req.params;
  const q =
    "SELECT u.img AS userImg, `username`, `status`, `comment`, c.date AS date FROM comments c JOIN users u ON c.uid = u.id WHERE pid = ?";
  db.query(q, [postId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const addComment = (req, res) => {
  const q = "INSERT INTO comments(`comment`, `pid`, `uid`, `date`) VALUES (?)";
  const values = [req.body.comment, req.body.pid, req.body.uid, req.body.date];
  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
