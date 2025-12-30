import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    status: { type: String, enum: ["Active", "Completed", "On Hold"], default: "Active" },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
