const express = require('express');
const router = express.Router();
const { dashboardController } = require('../../controller');

router.get('/get-all-tasks', dashboardController.getTasks);
router.post('/add-task', dashboardController.addTask);
router.post('/update-task', dashboardController.updateTask);
router.post('/update-status', dashboardController.updateStatus);
router.delete('/delete-task/:id', dashboardController.deleteTask);

module.exports = router;