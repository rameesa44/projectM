import express from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/TaskController.js";
import { protect } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getTasks).post(protect, createTask);
router
  .route("/:id")
  .get(protect, getTaskById)
  .put(protect, updateTask)
  .delete(protect, deleteTask);

export default router;
