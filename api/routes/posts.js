import express from "express";
import {
  addPost,
  getPost,
  getPosts,
  getUserPosts,
} from "../controllers/posts.js";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/images/posts");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  return res.status(200).json(file.filename);
});

router.get("/", getPosts);
router.get("/:id", getPost);
router.get("/user/:id", getUserPosts);
router.post("/", addPost);

export default router;
