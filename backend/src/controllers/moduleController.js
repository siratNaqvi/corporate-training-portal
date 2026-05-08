import AppDataSource from "../config/data-source.js";
import CourseModule from "../entities/CourseModule.js";
import TrainingProgram from "../entities/TrainingProgram.js";

const moduleRepo = AppDataSource.getRepository(CourseModule);
const trainingRepo = AppDataSource.getRepository(TrainingProgram);

//
// ✅ CREATE MODULE (ONLY FOR OWN TRAINING)
//
export const createModule = async (req, res) => {
  try {
    const {
      training_id,
      title,
      description,
      content_type,
      content,
      video_url,
      file_url,
      order_index,
      duration_minutes,
    } = req.body;

    // 🔥 get training WITH trainer
    const training = await trainingRepo.findOne({
        where: { id: Number(training_id) },
      relations: ["trainer"],
    });

    if (!training) {
      return res.status(404).json({ message: "Training not found" });
    }

    // 🚨 IMPORTANT SECURITY CHECK
    if (training.trainer.id !== req.user.id) {
      return res.status(403).json({
        message: "You can only create modules for your own trainings",
      });
    }

    const module = moduleRepo.create({
      title,
      description,
      content_type,
      content,
      video_url,
      file_url,
      order_index,
      duration_minutes,
      training,
    });

    await moduleRepo.save(module);

    res.status(201).json({
      message: "Module created successfully",
      module,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


//
// ✅ GET MODULES BY TRAINING (TRAINER SAFE)
//
export const getModulesByTraining = async (req, res) => {
  try {
    const { training_id } = req.params;

    const modules = await moduleRepo.find({
      where: {
        training: {
          id: Number(training_id),
        },
      },
      relations: ["training"],
      order: { order_index: "ASC" },
    });

    res.json(modules);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


//
// ✅ GET ALL MODULES (ONLY FOR LOGGED-IN TRAINER)
//
export const getAllModules = async (req, res) => {
  try {
    const modules = await moduleRepo.find({
      where: {
        training: {
          trainer: { id: req.user.id },   // 🔥 MAIN FIX
        },
      },
      relations: ["training", "training.trainer"],
      order: { order_index: "ASC" },
    });

    res.json(modules);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};