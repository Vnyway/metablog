import { db } from "../db.js";

export const addSubscriber = (req, res) => {
  const q = "SELECT * FROM subscribers WHERE id = ?";
  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(503).json(err);
    if (data.length) return res.status(409).json("You are subscribed");

    const q = "INSERT INTO subscribers(`email`) VALUES (?)";
    db.query(q, [req.body.email], (err, data) => {
      if (err) return res.status(503).json(err);
      return res.status(200).json("User has been added successfully!");
    });
  });
};
