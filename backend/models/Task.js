import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
    assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    status: { type: String, enum: ["To Do", "In Progress", "Completed", "Overdue"], default: "To Do" },
    dueDate: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
