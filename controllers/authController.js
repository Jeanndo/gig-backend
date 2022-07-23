import Patient from "./../models/patientModel.js";
import Doctor from "./../models/doctorModel.js";
import jwt from "jsonwebtoken";
import bscript from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRETE, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const signup = async (req, res) => {
  try {
    const { email, role } = req.body;
    if (role === process.env.IS_PATIENT) {
      const patient = await Patient.findOne({ email: email });

      if (patient) {
        return res.status(401).json({
          status: "fail",
          message: "patient Already exist, Please use different Account",
        });
      }

      const newPatient = await Patient.create({
        firstName: req.body.firstName,
        midlleName: req.body.midlleName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        Address: req.body.Address,
        Nationality: req.body.Nationality,
        NationalId: req.body.NationalId,
        Insurance: req.body.Insurance,
        sex: req.body.sex,
        dob: req.body.dob,
        role: req.body.role,
        email: req.body.email,
        password: await bscript.hash(
          req.body.password,
          Number(process.env.SALT)
        ),
      });

      res.status(201).json({
        status: "success",
        message: `${newPatient.firstName} Registered successfuly `,
        data: {
          patient: newPatient,
        },
      });
    } else if (role === process.env.IS_DOCTOR) {
      const doctor = await Doctor.findOne({ email: email });

      if (doctor) {
        return res.status(401).json({
          status: "fail",
          message: "doctor Already exist, Please use different Account",
        });
      }

      const newDoctor = await Doctor.create({
        firstName: req.body.firstName,
        specialist: req.body.specialist,
        lastName: req.body.lastName,
        phone: req.body.phone,
        Address: req.body.Address,
        Nationality: req.body.Nationality,
        NationalId: req.body.NationalId,
        sex: req.body.sex,
        dob: req.body.dob,
        role: req.body.role,
        email: req.body.email,
        password: await bscript.hash(
          req.body.password,
          Number(process.env.SALT)
        ),
      });

      res.status(201).json({
        status: "success",
        message: `${newDoctor.firstName} Registered successfuly `,
        data: {
          docotor: newDoctor,
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error while signup",
      err: error.stack,
    });
    console.error(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (role === process.env.IS_PATIENT) {
      if (!email || !password) {
        return res.status(400).json({
          status: "fail",
          message: "Please provide email and password",
        });
      }

      const patient = await Patient.findOne({ email });

      if (!patient || !(await bscript.compare(password, patient.password))) {
        return res
          .status(401)
          .json({ status: "fail", message: "Incorrect Email or Password" });
      }

      const token = signToken(patient._id);
      res.status(200).json({
        status: "success",
        token,
        patient,
      });
    } else if (role === process.env.IS_DOCTOR) {
      if (!email || !password) {
        return res.status(400).json({
          status: "fail",
          message: "Please provide email and password",
        });
      }

      const doctor = await Doctor.findOne({ email });

      if (!doctor || !(await bscript.compare(password, doctor.password))) {
        return res
          .status(401)
          .json({ status: "fail", message: "Incorrect Email or Password" });
      }

      const token = signToken(doctor._id);
      res.status(200).json({
        status: "success",
        token,
        doctor,
      });
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error while login in" });
  }
};
