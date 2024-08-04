import express from "express";
import dotenv from "dotenv";
import postsRoutes from "./routes/posts.js";
import usersRoutes from "./routes/users.js";
import subscribersRoutes from "./routes/subscribers.js";
import commentsRoutes from "./routes/comments.js";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/posts", postsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/subscribers", subscribersRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/api/auth", authRoutes);

app.listen(process.env.PORT || PORT, () => {
  console.log("connected");
});
