import express from 'express';
import { registerUser } from '../controllers/auth.controller';
import { validateRegister } from '../middleware/validateRegister';

const router = express.Router();

router.post('/register', registerUser, validateRegister);

export default router;
