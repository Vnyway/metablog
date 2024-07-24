import express from "express";
import { addSubscriber } from "../controllers/subscribers.js";

const router = express.Router();

router.post("/add", addSubscriber);

export default router;
