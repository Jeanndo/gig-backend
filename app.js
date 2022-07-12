import express from "express";
import cors from "cors";
import patientRouter from "./routes/patientRoutes/patientRoute.js";
import authRoutes from "./routes/authRoutes/authRoutes.js";
import doctorRouter from "./routes/doctorRoutes/doctorRoutes.js";
import messageRouter from "./routes/messageRoutes/messageRoutes.js";
import paymentRouter from "./routes/paymentRoutes/paymentRoute.js";
import vitalRouter from "./routes/vitalRoutes/vitalRoutes.js";
import responseRouter from "./routes/responseRoutes/responseRoute.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/authentication", authRoutes);
app.use("/patients", patientRouter);
app.use("/doctors", doctorRouter);
app.use("/messages", messageRouter);
app.use("/payments", paymentRouter);
app.use("/vitals", vitalRouter);
app.use("/responses", responseRouter);

export default app;
