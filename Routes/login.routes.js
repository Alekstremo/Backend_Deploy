import { Router } from "express";
import { login } from "../Controllers/login.controllers.js";

const router = Router();

router.post("/login/", login);

export default router;