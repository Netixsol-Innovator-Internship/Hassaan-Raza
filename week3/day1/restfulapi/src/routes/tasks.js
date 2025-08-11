const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/tasksController');
const validateTask = require('../middlewares/validateTask');

// Note: route order matters — place static routes before '/:id'
router.get('/', ctrl.getAllTasks);
router.get('/stats', ctrl.getStats); // optional stretch route
router.get('/:id', ctrl.getTaskById);
router.post('/', validateTask, ctrl.createTask);
router.put('/:id', validateTask, ctrl.updateTask);
router.delete('/:id', ctrl.deleteTask);

module.exports = router;
