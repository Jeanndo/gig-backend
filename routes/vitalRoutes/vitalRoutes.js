import express from "express";
import { createVital } from "./../../controllers/vitalController.js";

const router = express.Router();

router.post("/", createVital);
export default router;
