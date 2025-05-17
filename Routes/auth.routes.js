import { Router } from "express";
import { register } from "../Controllers/register.controllers.js";
import { login } from "../Controllers/login.controllers.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);

export default router;