import express from 'express';
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  toggleTask,
  deleteTask,
  clearCompleted,
} from '../controllers/taskController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes are protected
router.use(protect);

router.route('/').get(getTasks).post(createTask);
router.delete('/completed/clear', clearCompleted);
router.route('/:id').get(getTask).put(updateTask).delete(deleteTask);
router.patch('/:id/toggle', toggleTask);

export default router;