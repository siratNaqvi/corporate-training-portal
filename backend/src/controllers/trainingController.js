import AppDataSource from "../config/data-source.js";
import TrainingProgram from "../entities/TrainingProgram.js";
import PDFDocument from "pdfkit";
import Enrollment from "../entities/Enrollment.js";

const enrollmentRepo = AppDataSource.getRepository(Enrollment);
const trainingRepo = AppDataSource.getRepository(TrainingProgram);
export const updateProgress = async (req, res) => {
  console.log("🔥 updateProgress hit");

  try {
    const { enrollment_id, progress } = req.body;

    const enrollment = await enrollmentRepo.findOne({
      where: { id: Number(enrollment_id) },
    });

    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    enrollment.progress = progress;

    // ✅ STATUS LOGIC
    if (progress >= 100) {
      enrollment.status = "completed";
    } else if (progress > 0) {
      enrollment.status = "in-progress";
    } else {
      enrollment.status = "assigned";
    }

    await enrollmentRepo.save(enrollment); // ✅ MUST SAVE

    res.json({
      message: "Progress updated successfully",
      enrollment,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};


//
// ✅ CREATE TRAINING (Trainer / HR)
//
export const createTraining = async (req, res) => {
  try {
    const { title, description, category, department, due_date } = req.body;

    const training = trainingRepo.create({
      title,
      description: description || "No description",
      category,
      department: department || "General",
      due_date: due_date || null,
      trainer: { id: req.user.id },
    });

    await trainingRepo.save(training);

    res.json({
      message: "Training created successfully",
      training,
    });

  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

//
// ✅ GET ALL TRAININGS (Admin view / debugging)
//
export const getAllTrainings = async (req, res) => {
  try {
    const trainings = await trainingRepo.find({
      relations: ["trainer"],
    });

    res.json(trainings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//
// ✅ GET TRAININGS FOR TRAINER
//
export const getTrainerTrainings = async (req, res) => {
  try {
    const trainings = await trainingRepo.find({
      where: {
        trainer: { id: req.user.id },
      },
      relations: ["trainer"],
    });

    res.json(trainings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//
// ✅ GET TRAININGS FOR EMPLOYEE (TEMP FIX)
// (later we will replace with Enrollment table)
//
export const getMyTrainings = async (req, res) => {
  try {
    const enrollments = await enrollmentRepo.find({
      where: { user: { id: req.user.id } },
      relations: ["training"],
    });

    const data = enrollments.map((e) => ({
      enrollment_id: e.id,
      training_id: e.training.id,
      title: e.training.title,
      progress: e.progress,
      status: e.status,
    }));

    res.json(data);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




//
// ❌ ASSIGN TRAINING (TEMP DISABLED LOGIC)
// (we removed assigned_to because it doesn't exist)
//
export const assignTraining = async (req, res) => {
  try {
    const { user_id, training_id } = req.body;

    // check training exists
    const training = await trainingRepo.findOne({
      where: { id: training_id },
    });

    if (!training) {
      return res.status(404).json({ message: "Training not found" });
    }

    // create enrollment
    const enrollment = enrollmentRepo.create({
      user: { id: user_id },
      training: { id: training_id },
      status: "assigned",
      progress: 0,
    });

    await enrollmentRepo.save(enrollment);

    res.json({
      message: "Training assigned successfully",
      enrollment,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// ✅ GET CERTIFICATES
export const getCertificates = async (req, res) => {
  try {
    const trainings = await trainingRepo.find();

    // TEMP: treat all as completed (for now)
    const certs = trainings.map((t) => ({
      id: t.id,
      title: t.title,
      issued_at: new Date(),
    }));

    res.json(certs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ DOWNLOAD CERTIFICATE
export const downloadCertificate = async (req, res) => {
  try {
    console.log("REQ USER:", req.user);
    const { id } = req.params;

    const training = await trainingRepo.findOne({
      where: { id: Number(id) },
    });

    if (!training) {
      return res.status(404).json({ message: "Certificate not found" });
    }

    // 🎯 CREATE PDF
    const doc = new PDFDocument({
      size: "A4",
      layout: "landscape",
    });

    // headers
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${training.title}.pdf`
    );

    doc.pipe(res);

    // 🎨 DESIGN
    doc.rect(0, 0, doc.page.width, doc.page.height)
      .fill("#f9f9f9");

    doc
      .fillColor("#333")
      .fontSize(40)
      .text("Certificate of Completion", {
        align: "center",
      });

    doc.moveDown(2);

    doc
      .fontSize(20)
      .text("This is to certify that", {
        align: "center",
      });

    doc.moveDown();

    doc
      .fontSize(28)
      .fillColor("blue")
      .text("EMPLOYEE NAME", {
        align: "center",
      });

    doc.moveDown();

    doc
      .fontSize(20)
      .fillColor("#333")
      .text("has successfully completed the training", {
        align: "center",
      });

    doc.moveDown();

    doc
      .fontSize(24)
      .fillColor("green")
      .text(`"${training.title}"`, {
        align: "center",
      });

    doc.moveDown(2);

    doc
      .fontSize(16)
      .fillColor("#000")
      .text(`Date: ${new Date().toLocaleDateString()}`, {
        align: "center",
      });

    doc.moveDown(3);

    doc
      .fontSize(18)
      .text("✔ Successfully Completed", {
        align: "center",
      });

    doc.end();

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const getTrainerEmployeeProgress = async (req, res) => {
  try {
    const trainerId = req.user.id;

    // get enrollments with user + training
    const enrollments = await enrollmentRepo.find({
      relations: ["user", "training", "training.trainer"],
    });

    // filter only trainings created by this trainer
    const data = enrollments
      .filter((e) => e.training.trainer.id === trainerId)
      .map((e) => ({
        employee_name: e.user.name,
        training_title: e.training.title,
        progress: e.progress,
        status: e.status,
      }));

    res.json(data);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};