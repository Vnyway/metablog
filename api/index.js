import express from "express";
import dotenv from "dotenv";
import postsRoutes from "./routes/posts.js";
import usersRoutes from "./routes/users.js";
import subscribersRoutes from "./routes/subscribers.js";
import commentsRoutes from "./routes/comments.js";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin:
      "https://66b8b0f4e24d8141f1079541--lighthearted-empanada-4997b6.netlify.app",
    credentials: true,
  })
);

app.use("/api/posts", postsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/subscribers", subscribersRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/api/auth", authRoutes);

app.listen(process.env.PORT || 8800, () => {
  console.log("connected");
});
