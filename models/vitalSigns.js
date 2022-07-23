import mongoose from "mongoose";

const vitalSchema = new mongoose.Schema({
  description: {
    type: String,
    trim: true,
  },
  patientName: {
    type: String,
  },
  patientEmail: {
    type: String,
  },
  patientPhone: {
    type: String,
  },
  payementStatus: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Vital = mongoose.model("Vital", vitalSchema);

export default Vital;
