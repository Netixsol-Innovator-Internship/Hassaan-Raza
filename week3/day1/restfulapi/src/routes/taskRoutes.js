const express = require('express');
const { body } = require('express-validator');
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const validateRequest = require('../middlewares/validateRequest');
const auth = require('../middlewares/auth');

const router = express.Router();

router.use(auth);

router.get('/', getTasks);

router.post('/', [
  body('title').notEmpty(),
  body('completed').optional().isBoolean()
], validateRequest, createTask);

router.put('/:id', [
  body('title').optional().notEmpty(),
  body('completed').optional().isBoolean()
], validateRequest, updateTask);

router.delete('/:id', deleteTask);

module.exports = router;
