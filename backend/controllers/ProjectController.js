import Project from "../models/Project.js";

// CRUD for Projects
export const createProject = async (req, res) => {
  const project = await Project.create(req.body);
  res.status(201).json(project);
};

export const getProjects = async (req, res) => {
  const projects = await Project.find().populate("members", "-password");
  res.json(projects);
};

export const getProjectById = async (req, res) => {
  const project = await Project.findById(req.params.id).populate("members", "-password");
  if (project) res.json(project);
  else res.status(404).json({ message: "Project not found" });
};

export const updateProject = async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(project);
};

export const deleteProject = async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: "Project deleted" });
};
