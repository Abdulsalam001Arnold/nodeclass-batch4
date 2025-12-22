

import { Router } from "express";
import { getHome, getAbout, createUser, loginUser, getUsers, deleteUser } from "../controllers/userControllers.js";
import {protect} from "../middlewares/authMiddleware.js";

const router = Router()

router.get('/', getHome).get('/about', getAbout).post('/signup', createUser).post('/login', loginUser).get('/users', protect, getUsers).delete('/user/:id', deleteUser)


export default router;