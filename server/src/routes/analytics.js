import { Router } from 'express';
import { handleAnalytics } from '../controllers/analyticsController.js';

const router = Router();
router.post('/', handleAnalytics);
export default router;
