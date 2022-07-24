import Response from "./../models/responseModel.js";
import Doctor from "./../models/doctorModel.js";
import Patient from "./../models/patientModel.js";
import dotenv from "dotenv";
import twilio from "twilio";

dotenv.config();

var accountSid = process.env.TWILIO_ACCOUNT_SID;
var authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

export const createResponse = async (req, res) => {
  try {
    const { response, email, patientPhone } = req.body;
    const doctor = await Doctor.findOne({ email });

    if (!doctor) {
      res.status(400).json({
        status: "fail",
        message: "Only doctor can respond",
      });
    }

    const patient = await Patient.findOne({ phone: patientPhone });
    const newResponse = await Response.create({
      response,
      patientPhone: patientPhone,
    });

    const message = `Dear ${patient.firstName},\n You have been responded you can login to see your result here https://online-treatment.netlify.app/pages/login.html`;
    await client.messages.create({
      body: message,
      from: process.env.CONTACT,
      to: process.env.RECIEVER,
    });

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

export const getAllResponses = async (req, res) => {
  try {
    const allResponses = await Response.find();

    res.status(200).json({
      status: "success",
      allResponses,
    });
  } catch (error) {
    res.status(5000).json({
      message: "Error while getting all responses",
      err: error.stack,
    });
  }
};
