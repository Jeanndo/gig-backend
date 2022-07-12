import Doctor from "./../models/doctorModel.js";

export const getAllDoctors = async (req, res) => {
  try {
    const allDoctors = await Doctor.find();

    res.status(200).json({
      status: "success",
      data: {
        allDoctors,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error while fetching all doctors",
    });
  }
};

export const getDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      res.status(404).json({ message: "No doctor found with that ID" });
    }

    res.status(200).json({
      status: "success",
      data: {
        doctor,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error while fetching a doctor",
    });
  }
};

export const updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!doctor) {
      res.status(404).json({ message: "No Doctor found with that ID" });
    }

    res.status(200).json({
      status: "success",
      message: "updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error while updating a doctor",
    });
  }
};

export const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndRemove(req.params.id);
    if (!doctor) {
      res.status(404).json({ message: "No Doctor found with that ID" });
    }

    res.status(200).json({
      status: "success",
      message: "Deleted Successfully!!",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error while deleting a doctor",
    });
  }
};
