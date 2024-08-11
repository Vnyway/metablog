import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../s3clientBloggers.js";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

dotenv.config();

const bucketName = process.env.BUCKET_NAME;

export const login = (req, res) => {
  const q = "SELECT * FROM users WHERE email = ?";
  db.query(q, [req.body.email], async (err, data) => {
    if (err) return res.status(503).json(err);
    if (!data.length) return res.status(404).json("User doesn't exist");

    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!isPasswordCorrect)
      return res.status(400).json("Wrong username or password");

    if (data[0].img) {
      const getObjectParams = {
        Bucket: bucketName,
        Key: data[0].img,
      };

      const command = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
      data[0].img = url;
    }

    const token = jwt.sign({ id: data[0].id }, process.env.JWT_KEY);
    const { password, ...other } = data[0];
    res.status(200).json({ ...other, token });
  });
};

export const register = (req, res) => {
  const q = "SELECT * FROM users WHERE email = ? OR username = ?";

  db.query(q, [req.body.email, req.body.username], (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(409).json("User already exists");

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const q =
      "INSERT INTO users(`username`, `status`, `email`, `desc`, `img`, `password`) VALUES (?)";
    const values = [
      req.body.username,
      req.body.status,
      req.body.email,
      req.body.desc,
      req.body.img,
      hash,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json("User has been created");
    });
  });
};
