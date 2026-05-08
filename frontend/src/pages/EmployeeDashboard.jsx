import { useEffect, useState } from "react";
import API from "../api/axios";
import "../styles/pro-dashboard.css";

export default function EmployeeDashboard() {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = async () => {
    try {
      const res = await API.get("/training/my");

      console.log("MY TRAININGS:", res.data);

      setTrainings(res.data || []);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  /* ================= SAFE STATS ================= */
  const assigned = trainings.length;

  const pending = trainings.filter(
    (t) => t?.status === "assigned" || t?.status === "in-progress"
  ).length;

  const completed = trainings.filter(
    (t) => t?.status === "completed"
  ).length;

  return (
    <div className="layout">

      <div className="sidebar">
        <h2>LearnHub</h2>
      </div>

      <div className="main">

        <h2>Employee Dashboard</h2>

        {/* STATS */}
        <div className="stats">
          <div className="stat-card">
            <p>Assigned</p>
            <h2>{assigned}</h2>
          </div>

          <div className="stat-card">
            <p>Pending</p>
            <h2>{pending}</h2>
          </div>

          <div className="stat-card">
            <p>Completed</p>
            <h2>{completed}</h2>
          </div>
        </div>

        {/* TRAININGS */}
        <div className="card">
          <h3>My Trainings</h3>

          {trainings.length === 0 ? (
            <p>No trainings assigned</p>
          ) : (
            trainings.map((t) => (
              <div key={t.id || t.training_id} className="training-item">

                <h3>{t.title}</h3>

                <p>
                  <b>Status:</b> {t.status || "assigned"}
                </p>

                <p>
                  <b>Progress:</b> {t.progress || 0}%
                </p>

                {/* Progress bar */}
                <div style={{
                  width: "100%",
                  background: "#ddd",
                  height: "8px",
                  borderRadius: "10px"
                }}>
                  <div style={{
                    width: `${t.progress || 0}%`,
                    height: "8px",
                    background: "green",
                    borderRadius: "10px"
                  }} />
                </div>

                {/* MODULE BUTTON */}
                <button
                  onClick={() =>
                    window.location.href = `/modules/${t.training_id || t.id}/${t.enrollment_id }`
                  }
                >
                  View Modules
                </button>

                {/* CERTIFICATE */}
                {t.status === "completed" && (
                  <button
                    onClick={() =>
                      window.location.href = "/certificates"
                    }
                  >
                    View Certificate
                  </button>
                )}

              </div>
            ))
          )}

        </div>

      </div>
    </div>
  );
}