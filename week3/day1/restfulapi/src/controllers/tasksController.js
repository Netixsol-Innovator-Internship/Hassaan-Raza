const { v4: uuidv4 } = require('uuid');

// In-memory store
let tasks = [
  { id: uuidv4(), title: 'Learn Express', completed: false }
];

exports.getAllTasks = (req, res, next) => {
  try {
    const { title } = req.query;
    let result = tasks;
    if (title) {
      result = tasks.filter(t => t.title.toLowerCase().includes(title.toLowerCase()));
    }
    res.json({ success: true, data: result, message: 'Tasks retrieved successfully' });
  } catch (err) { next(err); }
};

exports.getTaskById = (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id)
    const task = tasks.find(t => t.id === id);
    if (!task) return res.status(404).json({ success: false, data: null, message: 'Task not found' });
    res.json({ success: true, data: task, message: 'Task retrieved successfully' });
  } catch (err) { next(err); }
};

exports.createTask = (req, res, next) => {
  try {
    const { title, completed = false } = req.body;
    const newTask = { id: uuidv4(), title, completed };
    tasks.push(newTask);
    res.status(201).json({ success: true, data: newTask, message: 'Task created successfully' });
  } catch (err) { next(err); }
};

exports.updateTask = (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) return res.status(404).json({ success: false, data: null, message: 'Task not found' });

    tasks[index] = { ...tasks[index], title, completed };
    res.json({ success: true, data: tasks[index], message: 'Task updated successfully' });
  } catch (err) { next(err); }
};

exports.deleteTask = (req, res, next) => {
  try {
    const { id } = req.params;
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) return res.status(404).json({ success: false, data: null, message: 'Task not found' });

    tasks.splice(index, 1);
    res.json({ success: true, data: null, message: 'Task deleted successfully' });
  } catch (err) { next(err); }
};

// Stretch: stats
exports.getStats = (req, res, next) => {
  try {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;
    res.json({ success: true, data: { total, completed, pending }, message: 'Stats retrieved' });
  } catch (err) { next(err); }
};
