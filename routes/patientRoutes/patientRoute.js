import express from "express";
import {
  getAllPatient,
  getPatient,
  updatePatient,
  deltePatient,
} from "./../../controllers/patientController.js";

const router = express.Router();

router.route("/").get(getAllPatient);
router.route("/:id").get(getPatient).patch(updatePatient).delete(deltePatient);

export default router;
