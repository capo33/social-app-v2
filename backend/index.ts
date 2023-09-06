import dotenv from "dotenv";
import path from "path";
import express, { Application, Request, Response } from "express";
import cookieParser from "cookie-parser";

// Routes imports
import authRoutes from "./routes/Auth.routes";
import userRoutes from "./routes/User.routes";
import postrRoutes from "./routes/Post.routes";

import { errorHandler, notFound } from "./middlewares/errorHandler";

// Load env vars
dotenv.config();

import { connectDB } from "./config/db";

// Initialize express
const app: Application = express();

// Set port
const port: string = process.env.PORT || "5000";

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());


// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postrRoutes);

// Make uploads folder static
if (process.env.NODE_ENV === "production") {
  const __dirname: string = path.resolve();
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  // for any route that is not api, redirect to index.html
  app.get("*", (req: Request, res: Response) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  // Welcome route
  app.get("/", (req: Request, res: Response) => {
    res.json({
      message: "API is running...",
    });
  });
}

// Error handler middleware
app.use(notFound);
app.use(errorHandler);

// Start server
try {
  app.listen(port, (): void => {
    console.log(`Server is running on port ${port} 🚀`);
  });
} catch (error) {
  if (error instanceof Error) {
    console.log(`Error occured: (${error.message})`);
  }
}
