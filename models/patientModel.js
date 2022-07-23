import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Your first Name please!!"],
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, "Your last Name please!!"],
  },
  phone: {
    type: String,
    required: [true, "Your phone please!!"],
  },
  email: {
    type: String,
    required: [true, "Your Email please!!"],
  },
  password: {
    type: String,
    required: [true, "Your password please!!"],
  },
  Address: {
    type: String,
  },
  Nationality: {
    type: String,
  },
  NationalId: {
    type: String,
  },
  Insurance: {
    type: String,
    required: [true, "Your Insurance please!!"],
  },
  sex: {
    type: String,
    required: [true, "Your Gender please!!"],
  },
  dob: {
    type: Date,
  },
  role: {
    type: String,
  },
  status: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;
