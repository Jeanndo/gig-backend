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
    const { phone, description } = req.body;
    const patient = await Patient.findOne({ phone });

    if (!patient) {
      return res.status(403).json({
        status: "fail",
        message: "You are not registered, please register yourself!!",
      });
    }

    const newVital = await Vital.create({
      description: req.body.description,
      patientName: patient.firstName,
      patientEmail: patient.email,
      patientPhone: patient.phone,
      payementStatus: patient.status,
    });

    console.log("newVital", newVital);

    const message = `Dear ${patient.firstName},\n Thank you for using online Treatment  below is the link to pay your upfront amount of 10 RWF https://online-treatment.netlify.app/pages/payment.html using MTN momo`;
    await client.messages.create({
      body: message,
      from: "+19062566610",
      to: "+250780402713",
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

export const getAllVitals = async (req, res) => {
  try {
    const vitals = await Vital.find();

    res.status(200).json({
      status: "success",
      vitals,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error while getting all vital signs",
      err: error.stack,
    });
  }
};
export const deleteVital = async (req, res) => {
  try {
    const id = req.params.id;

    const vital = await Vital.findByIdAndDelete({ _id: id });

    if (!vital) {
      return res.status(404).json({
        status: "fail",
        message: "No vital found with That ID",
      });
    }

    res.status(200).json({
      message: "deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error while deleting a vital sign",
      err: error.stack,
    });
  }
};
