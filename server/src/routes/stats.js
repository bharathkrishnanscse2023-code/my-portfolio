import { Router } from 'express';
import { handleStats } from '../controllers/statsController.js';

const router = Router();
router.get('/', handleStats);
export default router;
