import Message from "./../models/messageModel.js";

export const createMessage = async (req, res) => {
  try {
    const newMessage = await Message.create(req.body);
    res.status(200).json({
      status: "success",
      message: "Message Sent successfully",
      newMessage,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error while sending message",
    });
  }
};

export const getAllMessages = async (req, res) => {
  try {
    const allMessages = await Message.find();

    res.status(200).json({
      status: "success",
      data: {
        allMessages,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error while fetching all messages",
    });
  }
};

export const getMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      res.status(404).json({ message: "No Message found with that ID" });
    }

    res.status(200).json({
      status: "success",
      data: {
        message,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error while fetching a message",
    });
  }
};

export const updateMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!message) {
      res.status(404).json({ message: "No message found with that ID" });
    }

    res.status(200).json({
      status: "success",
      message: "updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error while updating message",
    });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndRemove(req.params.id);
    if (!message) {
      res.status(404).json({ message: "No message found with that ID" });
    }

    res.status(200).json({
      status: "success",
      message: "Deleted Successfully!!",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error while deleting a message",
    });
  }
};
