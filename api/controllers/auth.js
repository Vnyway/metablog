import { db } from "../db.js";

export const login = (req, res) => {
  const q = "SELECT * FROM users WHERE email = ?";
  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(503).json(err);
    if (!data.length) return res.status(404).json("User doesn't exist");
    if (data[0].password !== req.body.password)
      return res.status(400).json("Wrong username or password");
    const { password, ...other } = data[0];
    res
      .cookie("user_id", data[0].id, { httpOnly: true })
      .status(200)
      .json(other);
  });
};
