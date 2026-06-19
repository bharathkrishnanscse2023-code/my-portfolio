import { Router } from 'express';
import { validateContact } from '../middleware/validate.js';
import { handleContact } from '../controllers/contactController.js';

const router = Router();
router.post('/', validateContact, handleContact);
export default router;
