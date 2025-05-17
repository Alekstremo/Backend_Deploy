import { Router } from "express";
import { getIndex, getPong } from "../Controllers/index.controllers.js";

const router = Router();    
router.get('/', getIndex);

router.get('/ping', getPong);

export default router;