const Task = require('../models/task');

exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.json({ success: true, data: tasks });
};

exports.createTask = async (req, res) => {
  const task = await Task.create({ ...req.body, user: req.user.id });
  res.status(201).json({ success: true, data: task });
};

exports.updateTask = async (req, res) => {
  let task = await Task.findOne({ _id: req.params.id, user: req.user.id });
  if (!task) return res.status(404).json({ success: false, message: 'Task not found' });

  task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ success: true, data: task });
};

exports.deleteTask = async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  if (!task) return res.status(404).json({ success: false, message: 'Task not found' });
  res.json({ success: true, message: 'Task deleted' });
};
