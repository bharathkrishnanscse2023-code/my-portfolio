import { Router } from 'express';
import { validateFeedback } from '../middleware/validate.js';
import { handleFeedback } from '../controllers/feedbackController.js';

const router = Router();
router.post('/', validateFeedback, handleFeedback);
export default router;
