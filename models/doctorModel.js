import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Your first Name please!!"],
  },
  specialist: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, "Your last Name please!!"],
  },
  phone: {
    type: Number,
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
  sex: {
    type: String,
  },
  dob: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;
