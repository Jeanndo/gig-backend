import Patient from "./../models/patientModel.js";
import Flutterwave from "flutterwave-node-v3";
import dotenv from "dotenv";
import twilio from "twilio";

dotenv.config();

var accountSid = process.env.TWILIO_ACCOUNT_SID;
var authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

export const payment = async (req, res) => {
  try {
    const flw = new Flutterwave(
      process.env.PUBLIC_KEY,
      process.env.SECRETE_KEY
    );

    const { amount, phone } = req.body;

    const patient = await Patient.findOne({ phone });

    if (!patient) {
      return res.status(403).json({
        status: "fail",
        message: "You are not registered, please register yourself!!",
      });
    }
    const payload = {
      tx_ref: "MC-" + Date.now(),
      order_id: "USS_URG_" + Date.now(),
      amount: Number(amount),
      currency: "RWF",
      email: "jeanndo.dev@gmail.com",
      phone_number: `+25${phone}`,
      fullname: patient.firstName,
      redirect_url: "https://online-treatment.netlify.app/pages/success.html",
    };

    const response = await flw.MobileMoney.rwanda(payload);

    const message = `Dear ${patient.firstName},\n Your Payment of ${amount} was successfully initiated,click this link to continue with payment ${response?.meta?.authorization?.redirect}`;
    await client.messages.create({
      body: message,
      from: process.env.CONTACT,
      to: process.env.RECIEVER,
    });

    patient.status = true;
    await patient.save();

    res.status(200).json({
      ...response,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error while paying",
    });
  }
};
