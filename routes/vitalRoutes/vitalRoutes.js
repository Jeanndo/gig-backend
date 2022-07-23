import express from "express";
import {
  createVital,
  getAllVitals,
  deleteVital,
} from "./../../controllers/vitalController.js";

const router = express.Router();

router.route("/").post(createVital).get(getAllVitals);
// router.post("/", createVital);
// router.get("/", getAllVitals);
router.delete("/:id", deleteVital);
export default router;
