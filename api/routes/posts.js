import express from "express";
import { getPost, getPosts, getUserPosts } from "../controllers/posts.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.get("/user/:id", getUserPosts);

export default router;
