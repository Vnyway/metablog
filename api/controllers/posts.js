import { db } from "../db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../s3clientBloggers.js";
import { s3Posts } from "../s3clientPosts.js";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

dotenv.config();

const bucketName = process.env.BUCKET_NAME;
const bucketName1 = process.env.BUCKET_NAME1;

export const getPosts = (req, res) => {
  const q = req.query.cat
    ? "SELECT p.id, p.uid, `username`, `title`, p.img AS postImg, u.img AS userImg, `date`, c.cat AS cat FROM posts p JOIN users u ON p.uid = u.id JOIN categories c ON p.cid = c.id WHERE c.cat = ?"
    : "SELECT p.id, p.uid, `username`, `title`, p.img AS postImg, u.img AS userImg, `date`, c.cat AS cat FROM posts p JOIN users u ON p.uid = u.id JOIN categories c ON p.cid = c.id";
  db.query(q, [req.query.cat], async (err, data) => {
    if (err) return res.status(500).json(err);
    for (const element of data) {
      if (element.postImg) {
        const getObjectParams = {
          Bucket: bucketName1,
          Key: element.postImg,
        };
        const command = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3Posts, command, { expiresIn: 3600 });
        element.postImg = url;
      }
    }
    for (const element of data) {
      if (element.userImg) {
        const getObjectParams = {
          Bucket: bucketName,
          Key: element.userImg,
        };
        const command = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
        element.userImg = url;
      }
    }
    return res.status(200).json(data);
  });
};

export const getPost = (req, res) => {
  const { id } = req.params;
  const q =
    "SELECT p.id, u.id AS userId, `username`, `title`, p.desc, p.img AS postImg, u.img AS userImg, `date`, c.cat AS cat FROM posts p JOIN users u ON p.uid = u.id JOIN categories c ON p.cid = c.id WHERE p.id = (?)";
  db.query(q, [id], async (err, data) => {
    if (err) return res.status(500).json(err);
    if (data[0].postImg) {
      const getObjectParams = {
        Bucket: bucketName1,
        Key: data[0].postImg,
      };
      const command = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(s3Posts, command, { expiresIn: 3600 });
      data[0].postImg = url;
    }
    if (data[0].userImg) {
      const getObjectParams = {
        Bucket: bucketName,
        Key: data[0].userImg,
      };
      const command = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
      data[0].userImg = url;
    }
    return res.status(200).json(data);
  });
};

export const getUserPosts = (req, res) => {
  const { id } = req.params;
  const q =
    "SELECT p.id, p.uid, `username`, `title`, p.img AS postImg, u.img AS userImg, `date`, c.cat AS cat FROM posts p JOIN users u ON p.uid = u.id JOIN categories c ON p.cid = c.id WHERE p.uid = ?";
  db.query(q, [id], async (err, data) => {
    if (err) return res.status(500).json(err);
    for (const element of data) {
      if (element.postImg) {
        const getObjectParams = {
          Bucket: bucketName1,
          Key: element.postImg,
        };
        const command = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3Posts, command, { expiresIn: 3600 });
        element.postImg = url;
      }
    }
    for (const element of data) {
      if (element.userImg) {
        const getObjectParams = {
          Bucket: bucketName,
          Key: element.userImg,
        };
        const command = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
        element.userImg = url;
      }
    }
    return res.status(200).json(data);
  });
};

export const addPost = (req, res) => {
  const token = req.body.access_token;
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

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been added successfully");
    });
  });
};
