import {register, login, logout, currentUser } from "../controllers/authController.js";
import {protect} from "../middleware/protectMiddleware.js"
import {authRateLimitMiddleware} from "../middleware/authRateLimitMiddleware.js"
import {validate} from "../middleware/validateMiddleware.js"

import express from 'express';

const router = express.Router();

router.post('/register', validate, authRateLimitMiddleware, register);

router.post('/login', validate, authRateLimitMiddleware, login);

router.post('/logout', protect, logout);

router.post('/currentUser', protect, currentUser);

export default router;