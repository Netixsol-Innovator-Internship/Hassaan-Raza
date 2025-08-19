const User = require('../models/user');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ success: false, message: 'Email already registered' });

  const user = await User.create({ name, email, password });
  res.status(201).json({
    success: true,
    token: generateToken(user._id),
    user: { id: user._id, name: user.name, email: user.email }
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(400).json({ success: false, message: 'Invalid credentials' });
  }
  res.json({
    success: true,
    token: generateToken(user._id),
    user: { id: user._id, name: user.name, email: user.email }
  });
};
