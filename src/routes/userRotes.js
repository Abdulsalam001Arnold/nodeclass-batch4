

import { Router } from "express";
import { getHome, getAbout, createUser } from "../controllers/userControllers.js";


const router = Router()

router.get('/', getHome).get('/about', getAbout).post('/signup', createUser)


export default router;