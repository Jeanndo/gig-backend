import express from "express";
import {
  getAllDoctors,
  getDoctor,
  updateDoctor,
  deleteDoctor,
} from "./../../controllers/doctorController.js";

const router = express.Router();

router.route("/").get(getAllDoctors);
router.route("/:id").get(getDoctor).patch(updateDoctor).delete(deleteDoctor);

export default router;
