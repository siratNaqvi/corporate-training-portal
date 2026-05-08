import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

export default function EmployeeModules() {
  const { training_id, enrollment_id } = useParams();

  const [modules, setModules] = useState([]);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  const isSubmitting = useRef(false);

  useEffect(() => {
    fetchModules();
    fetchEnrollment();
  }, []);

  /* ================= FETCH MODULES ================= */
  const fetchModules = async () => {
    try {
      const res = await API.get(`/modules/training/${training_id}`);
      setModules(res.data || []);
    } catch (err) {
      console.log("Modules error:", err);
    }
  };

  /* ================= FETCH ENROLLMENT ================= */
  const fetchEnrollment = async () => {
    try {
      const res = await API.get("/training/my");

      const current = res.data.find(
        (t) => Number(t.enrollment_id) === Number(enrollment_id)
      );

      setProgress(current?.progress || 0);
      setLoading(false);
    } catch (err) {
      console.log("Enrollment error:", err);
      setLoading(false);
    }
  };

  /* ================= UPDATE PROGRESS ================= */
  const updateProgress = async (value) => {
    if (isSubmitting.current) return;
    isSubmitting.current = true;

    try {
      console.log("✅ Sending request");

      const res = await API.post("/training/progress", {
        enrollment_id,
        progress: value,
      });

      console.log("✅ SUCCESS:", res.data);

      setProgress(value);
    } catch (err) {
      console.log("❌ ERROR:", err.response?.data || err.message);
    }

    isSubmitting.current = false;
  };

  /* ================= LOADING ================= */
  if (loading) return <h3>Loading modules...</h3>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>📘 Training Modules</h2>

      {/* ================= MODULE LIST ================= */}
      {modules.length === 0 ? (
        <p>No modules found</p>
      ) : (
        modules.map((m) => (
          <div
            key={m.id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "8px",
            }}
          >
            <h3>{m.title}</h3>
            <p>{m.description}</p>
          </div>
        ))
      )}

      {/* ================= QUIZ BUTTON ================= */}
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() =>
            (window.location.href = `/quiz/${training_id}`)
          }
          style={{
            padding: "10px",
            background: "purple",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          📝 Attempt Quiz
        </button>
      </div>

      {/* ================= PROGRESS ================= */}
      <div style={{ marginTop: "30px" }}>
        <h3>📊 Progress: {progress}%</h3>

        {/* Progress bar */}
        <div
          style={{
            width: "100%",
            background: "#ddd",
            height: "10px",
            borderRadius: "10px",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              background: "green",
              height: "10px",
              borderRadius: "10px",
            }}
          />
        </div>

        {/* MARK COMPLETE */}
        {progress < 100 && (
          <button
            onClick={() => updateProgress(100)}
            style={{
              marginTop: "15px",
              padding: "10px",
              background: "blue",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Mark as Complete
          </button>
        )}

        {/* CERTIFICATE */}
        {progress >= 100 && (
          <button
            onClick={() => (window.location.href = "/certificates")}
            style={{
              marginTop: "15px",
              padding: "10px",
              background: "green",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            🎓 Generate Certificate
          </button>
        )}
      </div>
    </div>
  );
}