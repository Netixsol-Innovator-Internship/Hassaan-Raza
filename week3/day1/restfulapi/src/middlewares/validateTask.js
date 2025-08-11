module.exports = (req, res, next) => {
  const { title, completed } = req.body;

  if (typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ success: false, data: null, message: 'Title is required and must be a non-empty string' });
  }

  if (completed !== undefined && typeof completed !== 'boolean') {
    return res.status(400).json({ success: false, data: null, message: 'Completed must be a boolean' });
  }

  next();
};
