import express from "express";
import { getUserData } from "../controllers/users.js";

const router = express.Router();

router.get("/:id", getUserData);

export default router;
