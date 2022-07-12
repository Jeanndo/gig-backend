import Patient from "./../models/patientModel.js";

export const getAllPatient = async (req, res) => {
  try {
    const allpatients = await Patient.find();

    res.status(200).json({
      status: "success",
      data: {
        allpatients,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error while fetching all patientS",
    });
  }
};

export const getPatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      res.status(404).json({ message: "No Patient found with that ID" });
    }

    res.status(200).json({
      status: "success",
      data: {
        patient,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error while fetching patient",
    });
  }
};

export const updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!patient) {
      res.status(404).json({ message: "No Patient found with that ID" });
    }

    res.status(200).json({
      status: "success",
      message: "updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error while updating patient",
      err: error.stack,
    });
    console.error(error);
  }
};

export const deltePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndRemove(req.params.id);
    if (!patient) {
      res.status(404).json({ message: "No Patient found with that ID" });
    }

    res.status(200).json({
      status: "success",
      message: "Deleted Successfully!!",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error while deleting a patient",
    });
  }
};
