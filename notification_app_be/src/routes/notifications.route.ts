import { Router } from 'express';
import { getAllNotifications, getPriorityNotifications } from '../controllers/notifications.controller';
const router = Router();
router.get('/', getAllNotifications);
router.get('/priority', getPriorityNotifications);
export default router;
