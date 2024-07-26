import express from "express";
import { addComment, getComments } from "../controllers/comments.js";

const router = express.Router();

router.get("/:postId", getComments);
router.post("/add", addComment);

export default router;
