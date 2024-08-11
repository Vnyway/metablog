import { db } from "../db.js";
import dotenv from "dotenv";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../s3clientBloggers.js";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

dotenv.config();

const bucketName = process.env.BUCKET_NAME;

export const getComments = (req, res) => {
  const { postId } = req.params;
  const q =
    "SELECT u.img AS userImg, `username`, `status`, `comment`, c.date AS date FROM comments c JOIN users u ON c.uid = u.id WHERE pid = ?";
  db.query(q, [postId], async (err, data) => {
    if (err) return res.status(500).json(err);
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

export const addComment = (req, res) => {
  const q = "INSERT INTO comments(`comment`, `pid`, `uid`, `date`) VALUES (?)";
  const values = [req.body.comment, req.body.pid, req.body.uid, req.body.date];
  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
