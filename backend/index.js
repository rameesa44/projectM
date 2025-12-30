import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/database.js";
import userRoutes from "./routes/UserRoutes.js";
import projectRoutes from "./routes/ProjectRoutes.js";
import taskRoutes from "./routes/TaskRoutes.js";
import cors from "cors";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
