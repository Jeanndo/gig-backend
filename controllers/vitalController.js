import Patient from "./../models/patientModel.js";
import Vital from "../models/vitalSigns.js";
import dotenv from "dotenv";
import twilio from "twilio";

dotenv.config();

var accountSid = process.env.TWILIO_ACCOUNT_SID;
var authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

export const createVital = async (req, res) => {
  try {
    const { phone, vitalSign } = req.body;
    const patient = await Patient.findOne({ phone });

    if (!patient) {
      return res.status(403).json({
        status: "fail",
        message: "You are not registered, please register yourself!!",
      });
    }

    const newVital = await Vital.create({ description: vitalSign });

    const message = `Dear ${patient.firstName},\n Thank you for using online Treatment  below is the link to pay your upfront amount of 10 RWF https://online-treatment.netlify.app/pages/payment.html using MTN momo`;
    await client.messages.create({
      body: message,
      from: process.env.CONTACT,
      to: process.env.RECIEVER,
    });
    res.status(200).json({
      status: "success",
      vital: newVital,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error while creating vital signs",
    });
    console.error(error);
  }
};
