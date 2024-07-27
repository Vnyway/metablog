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

export const logout = (req, res) => {
  res
    .clearCookie("user_id", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been logged out");
};

export const register = (req, res) => {
  const q = "SELECT * FROM users WHERE email = ? OR username = ?";

  db.query(q, [req.body.email, req.body.username], (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(409).json("User already exists");

    const q =
      "INSERT INTO users(`username`, `status`, `email`, `desc`, `img`, `password`) VALUES (?)";
    const values = [
      req.body.username,
      req.body.status,
      req.body.email,
      req.body.desc,
      req.body.img,
      req.body.password,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json("User has been created");
    });
  });
};
