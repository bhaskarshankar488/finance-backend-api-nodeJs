import express from "express";
import cors from "cors";
import morgan from "morgan";
import userRoutes from "./routes/user.routes.js";
import loginRoutes from "./routes/auth.routes.js";
import { sessionMiddleware } from "./config/session.js";

const app = express();

app.use(sessionMiddleware);
// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Test route
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// Routes
app.use("/api", userRoutes);
app.use("/api", loginRoutes);

export default app;