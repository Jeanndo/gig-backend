import Response from "./../models/responseModel.js";
import Doctor from "./../models/doctorModel.js";

export const createResponse = async (req, res) => {
  try {
    const { response, email } = req.body;
    const doctor = await Doctor.findOne({ email });

    if (!doctor) {
      res.status(400).json({
        status: "fail",
        message: "Only doctor can respond",
      });
    }

    const newResponse = await Response.create({ response });
    res.status(200).json({
      status: "success",
      response: newResponse,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Eroor while responding",
    });
  }
};
