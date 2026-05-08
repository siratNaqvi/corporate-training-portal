import AppDataSource from "../config/data-source.js";
import Quiz from "../entities/Quiz.js";
import QuizResult from "../entities/QuizResult.js";

const quizRepo = AppDataSource.getRepository(Quiz);
const resultRepo = AppDataSource.getRepository(QuizResult);

//
// ✅ CREATE QUIZ (Trainer)
//
export const createQuiz = async (req, res) => {
  try {
    const {
      module_id,
      question,
      option_a,
      option_b,
      option_c,
      option_d,
      correct_answer,
    } = req.body;

 const quiz = quizRepo.create({
  question,
  option_a,
  option_b,
  option_c,
  option_d,
  correct_answer,
  module: { id: module_id }, // IMPORTANT
});

    await quizRepo.save(quiz);

    res.status(201).json({
      message: "Quiz created successfully",
      quiz,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//
// ✅ GET QUIZ BY MODULE
//
export const getQuizByModule = async (req, res) => {
  try {
    const { module_id } = req.params;

    const quizzes = await quizRepo.find({
      where: { module: { id: module_id } },
    });

    res.json(quizzes);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//
// ✅ SUBMIT QUIZ (Employee)
//
export const submitQuiz = async (req, res) => {
  try {
    const { module_id, answers } = req.body;
    const userId = req.user.id;

    const quizzes = await quizRepo.find({
      where: { module: { id: Number(module_id) } },
    });
  
    let score = 0;

    quizzes.forEach((q) => {
      const userAnswer = answers.find(
        (a) => Number(a.question_id) === q.id
      );

      if (userAnswer && userAnswer.selected === q.correct_answer) {
        score++;
      }
    });

    const percentage = (score / quizzes.length) * 100;

    const result = resultRepo.create({
      score,
      user: { id: userId }
    });

    await resultRepo.save(result);

    res.json({
      message: "Quiz submitted",
      score,
      percentage,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  
  }
};
export const getQuizResults = async (req, res) => {
  try {
    const results = await resultRepo.find({
      relations: ["user", "quiz"],
    });

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getQuizByTraining = async (req, res) => {
  try {
    const { training_id } = req.params;

    const quiz = await quizRepo
      .createQueryBuilder("quiz")
      .leftJoinAndSelect("quiz.module", "module")
      .where("module.training_id = :id", { id: Number(training_id) })
      .getMany();

    res.json(quiz);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
export const attemptQuiz = async (req, res) => {
  try {
    const { answers, training_id } = req.body;

    // Example structure:
    // answers = [{ question_id: 1, selected: "A" }]

    let score = 0;

    // 🔥 get all quiz questions of this training
    const questions = await quizRepo
  .createQueryBuilder("quiz")
  .leftJoin("quiz.module", "module")
  .where("module.training_id = :id", { id: Number(training_id) })
  .getMany();

    // 🔥 check answers
 questions.forEach((q) => {
  const userAnswer = answers.find(
    (a) => Number(a.question_id) === q.id
  );

  let correctOption = "";

  if (q.correct_answer === "A") correctOption = q.option_a;
  if (q.correct_answer === "B") correctOption = q.option_b;
  if (q.correct_answer === "C") correctOption = q.option_c;
  if (q.correct_answer === "D") correctOption = q.option_d;

  if (
    userAnswer &&
    userAnswer.selected.trim().toLowerCase() ===
      correctOption.trim().toLowerCase()
  ) {
    score++;
  }
});

    const percentage = (score / questions.length) * 100;

    res.json({
      message: "Quiz submitted",
      
      score,
      percentage
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
 
  }
};