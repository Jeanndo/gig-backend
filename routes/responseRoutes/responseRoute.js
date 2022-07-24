import express from "express";
import {
  createResponse,
  getAllResponses,
} from "./../../controllers/responseController.js";

const router = express.Router();

router.route("/").post(createResponse).get(getAllResponses);

export default router;
