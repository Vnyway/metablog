import express from "express";
import dotenv from "dotenv";
import postsRoutes from "./routes/posts.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/posts", postsRoutes);

app.listen(8800, () => {
  console.log("connected");
});