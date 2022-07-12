import express from "express";
import {
  createMessage,
  getAllMessages,
  getMessage,
  updateMessage,
  deleteMessage,
} from "./../../controllers/messageController.js";

const router = express.Router();

router.route("/").get(getAllMessages).post(createMessage);
router.route("/:id").get(getMessage).patch(updateMessage).delete(deleteMessage);

export default router;
