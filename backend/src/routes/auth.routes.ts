import express from 'express';
import { loginUser, registerUser } from '../controllers/auth.controller';
import { validateRegister } from '../middleware/validateRegister';

const router = express.Router();

router.post('/register', validateRegister, registerUser, loginUser);

export default router;
