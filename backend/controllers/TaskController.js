import Task from "../models/Task.js";

// CRUD for Tasks
export const createTask = async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json(task);
};

export const getTasks = async (req, res) => {
  const tasks = await Task.find().populate("assignedTo", "-password").populate("project");
  res.json(tasks);
};

export const getTaskById = async (req, res) => {
  const task = await Task.findById(req.params.id).populate("assignedTo", "-password").populate("project");
  if (task) res.json(task);
  else res.status(404).json({ message: "Task not found" });
};

export const updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
};

export const deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
};
