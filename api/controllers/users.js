import { db } from "../db.js";

export const getUserData = (req, res) => {
  const { id } = req.params;
  const q =
    "SELECT `username`, `img`, `status`, `desc` FROM users WHERE id = ?";
  db.query(q, [id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
