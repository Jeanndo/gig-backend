import express from "express";
import { payment } from "./../../controllers/paymentController.js";

const router = express.Router();

router.post("/pay", payment);

export default router;
