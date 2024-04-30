import express from "express";
import { test } from "../controllers/user.controller.js";

const router = express.Router();

// host/api/user/
router.get("/", test);

export default router;
