import express from "express";
import { payment } from "./../../controllers/paymentController.js";

const router = express.Router();

router.get("/pay", payment);

export default router;
