module.exports = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, data: null, message: 'Internal Server Error' });
};
