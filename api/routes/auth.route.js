import express from "express";
import { signin, signup, google, signout } from "../controllers/auth.controller.js";

const router = express.Router();

// host/api/auth/sign-up
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);
router.get("/signout", signout);

export default router;
