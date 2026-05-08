import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

export default function EmployeeQuiz() {
  const { training_id } = useParams();

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    try {
      const res = await API.get(`/quiz/training/${training_id}`);
      setQuestions(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  /* ================= SELECT ANSWER ================= */
  const selectAnswer = (qId, option) => {
    setAnswers({
      ...answers,
      [qId]: option,
    });
  };

  /* ================= SUBMIT QUIZ ================= */
  const submitQuiz = async () => {
    try {
      const payload = Object.keys(answers).map((qId) => ({
        question_id: qId,
        selected: answers[qId],
      }));

      const res = await API.post("/quiz/attempt", {
  answers: payload,
  training_id: training_id,   // ✅ ADD THIS
});

      setResult(res.data);
alert("✅ Quiz submitted successfully!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📝 Quiz</h2>

      {questions.map((q) => (
        <div key={q.id} style={{ marginBottom: "20px" }}>
          <h3>{q.question}</h3>

          {[q.option_a, q.option_b, q.option_c, q.option_d].map((opt, i) => (
            <div key={i}>
              <input
                type="radio"
                name={`q-${q.id}`}
                onChange={() => selectAnswer(q.id, opt)}
              />
              {opt}
            </div>
          ))}
        </div>
      ))}

      <button onClick={submitQuiz}>Submit Quiz</button>

      {/* RESULT */}
      {result && (
        <div style={{ marginTop: "20px" }}>
         <h3>🎯 Score: {result.score}</h3>
<p>Percentage: {result.percentage}%</p>
        </div>
      )}
    </div>
  );
}