import express from "express";
import {
  addPost,
  getPost,
  getPosts,
  getUserPosts,
} from "../controllers/posts.js";
import multer from "multer";
import dotenv from "dotenv";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Posts } from "../s3clientPosts.js";

dotenv.config();

const bucketName = process.env.BUCKET_NAME1;

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), async (req, res) => {
  const imgName = Date.now().toString();

  const params = {
    Bucket: bucketName,
    Key: imgName,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  };
  const command = new PutObjectCommand(params);

  await s3Posts.send(command);
  return res.status(200).json(imgName);
});

router.get("/", getPosts);
router.get("/:id", getPost);
router.get("/user/:id", getUserPosts);
router.post("/", addPost);

export default router;
