import mongoose from "mongoose";
const responseSchema = new mongoose.Schema({
  response: {
    type: String,
    required: [true, "Response is require"],
  },
  patientPhone: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Response = mongoose.model("Response", responseSchema);
export default Response;
