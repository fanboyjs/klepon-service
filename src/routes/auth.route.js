import express from 'express';
import { login, logout, verifyToken } from '../controllers/auth.controller.js'

const router = express.Router();

router
.post('/login', login)
.post('/logout',verifyToken, logout);

export default router