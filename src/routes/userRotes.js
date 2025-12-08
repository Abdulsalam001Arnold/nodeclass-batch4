

import { Router } from "express";
import { getHome, getAbout } from "../controllers/userControllers.js";


const router = Router()

router.get('/', getHome).get('/about', getAbout)


export default router;