import { db } from "../db.js";
import dotenv from "dotenv";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../s3clientBloggers.js";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

dotenv.config();

const bucketName = process.env.BUCKET_NAME;

export const getUserData = (req, res) => {
  const { id } = req.params;
  const q =
    "SELECT `username`, `img`, `status`, `desc` FROM users WHERE id = ?";
  db.query(q, [id], async (err, data) => {
    if (err) return res.status(500).json(err);
    if (data[0].img) {
      const getObjectParams = {
        Bucket: bucketName,
        Key: data[0].img,
      };
      const command = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
      data[0].img = url;
    }
    return res.status(200).json(data);
  });
};
