import mongoose from "mongoose";
import app from "./app.js";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.CONNECTION_URL, () => {
  console.log(`Database connection established successfully!!`);
});
const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
