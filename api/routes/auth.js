import express from "express";
import { login, register } from "../controllers/auth.js";
import multer from "multer";
import dotenv from "dotenv";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../s3clientBloggers.js";

dotenv.config();

const bucketName = process.env.BUCKET_NAME;

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

  await s3.send(command);

  return res.status(200).json(imgName);
});

router.post("/login", login);
router.post("/register", register);

export default router;
