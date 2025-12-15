

import { Router } from "express";
import { getHome, getAbout, createUser, loginUser } from "../controllers/userControllers.js";


const router = Router()

router.get('/', getHome).get('/about', getAbout).post('/signup', createUser).post('/login', loginUser);


export default router;