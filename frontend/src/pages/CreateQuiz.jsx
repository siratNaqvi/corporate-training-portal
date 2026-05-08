import { useState } from "react";
import api from "../api/axios";

export default function CreateQuiz() {
  const [question, setQuestion] = useState("");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [optionC, setOptionC] = useState("");
  const [optionD, setOptionD] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [moduleId, setModuleId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("SENDING QUIZ:", {
  module_id: moduleId,
  question
});
      await api.post("/quiz/create", {
       module_id: Number(moduleId),
        question,
        option_a: optionA,
        option_b: optionB,
        option_c: optionC,
        option_d: optionD,
        correct_answer: correctAnswer,
      });

      alert("Quiz created successfully!");

      setQuestion("");
      setOptionA("");
      setOptionB("");
      setOptionC("");
      setOptionD("");
      setCorrectAnswer("");
      setModuleId("");

    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Quiz creation failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create Quiz</h2>

      <form onSubmit={handleSubmit}>

        <input
          placeholder="Module ID"
          value={moduleId}
          onChange={(e) => setModuleId(e.target.value)}
        />

        <input
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <input
          placeholder="Option A"
          value={optionA}
          onChange={(e) => setOptionA(e.target.value)}
        />

        <input
          placeholder="Option B"
          value={optionB}
          onChange={(e) => setOptionB(e.target.value)}
        />

        <input
          placeholder="Option C"
          value={optionC}
          onChange={(e) => setOptionC(e.target.value)}
        />

        <input
          placeholder="Option D"
          value={optionD}
          onChange={(e) => setOptionD(e.target.value)}
        />

        <input
          placeholder="Correct Answer (A/B/C/D)"
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
        />

        <button type="submit">Create Quiz</button>

      </form>
    </div>
  );
}