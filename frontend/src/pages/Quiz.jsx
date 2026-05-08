import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

export default function Quiz() {
  const { moduleId } = useParams();
  const [quizzes, setQuizzes] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get(`/quiz/${moduleId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setQuizzes(res.data);

    } catch (err) {
      console.log("Quiz fetch error:", err);
    }
  };

  const handleChange = (quizId, option) => {
    setAnswers({
      ...answers,
      [quizId]: option,
    });
  };

  const submitQuiz = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.post(
        "/quiz/submit",
        {
          module_id: moduleId,
          answers,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(`Score: ${res.data.score}/${res.data.total}`);

    } catch (err) {
      console.log("Submit error:", err);
      alert("Submission failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Module Quiz</h2>

      {quizzes.length === 0 ? (
        <p>No quiz available</p>
      ) : (
        quizzes.map((q) => (
          <div key={q.id} style={{ marginBottom: "20px" }}>
            <h4>{q.question}</h4>

            {["A","B","C","D"].map((opt) => (
              <label key={opt}>
                <input
                  type="radio"
                  name={q.id}
                  onChange={() => handleChange(q.id, opt)}
                />
                {q[`option_${opt.toLowerCase()}`]}
              </label>
            ))}
          </div>
        ))
      )}

      <button onClick={submitQuiz}>Submit Quiz</button>
    </div>
  );
}