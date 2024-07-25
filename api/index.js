import express from "express";
import dotenv from "dotenv";
import postsRoutes from "./routes/posts.js";
import usersRoutes from "./routes/users.js";
import subscribersRoutes from "./routes/subscribers.js";
import commentsRoutes from "./routes/comments.js";
import authRoutes from "./routes/auth.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/posts", postsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/subscribers", subscribersRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/api/auth", authRoutes);

app.listen(8800, () => {
  console.log("connected");
});
