import { useEffect, useState } from "react";
import api from "../api/axios";
import "../styles/pro-dashboard.css";

export default function TrainerDashboard() {
  const [trainings, setTrainings] = useState([]);
  const [modules, setModules] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
    fetchProgress();
  }, []);

  /* ================= FETCH TRAINER DATA ================= */
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      const [tRes, mRes] = await Promise.all([
        api.get("/training/trainer", {
          headers: { Authorization: `Bearer ${token}` }
        }),
        api.get("/modules/all", {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      setTrainings(tRes.data);
      setModules(mRes.data);

    } catch (err) {
      console.log(err);
    }
  };

  /* ================= FETCH PROGRESS ================= */
  const fetchProgress = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/training/trainer/progress", {
        headers: { Authorization: `Bearer ${token}` }
      });

      setData(res.data || []);

    } catch (err) {
      console.log(err);
      setData([]);
    }
  };

  /* ================= COMPUTED VALUE (IMPORTANT FIX) ================= */
  const completedCount = data.filter(
    (item) => Number(item.progress) === 100
  ).length;

  return (
    <div className="layout">

      {/* SIDEBAR */}
      <div className="sidebar">
        <h2>LearnHub</h2>

        <button>HR / Admin</button>
        <button className="active">Trainer</button>
        <button>Employee</button>

        <hr />

        <button className="active">Dashboard</button>
        <button onClick={() => window.location.href="/modules"}>
          Modules
        </button>
      </div>

      {/* MAIN */}
      <div className="main">

        <div className="header">
          <h2>Trainer Dashboard</h2>
          <button onClick={() => window.location.href="/create-module"}>
            + Add Module
          </button>
        </div>

        {/* STATS */}
        <div className="stats">
          <div className="stat-card">
            <p>Total Modules</p>
            <h2>{modules.length}</h2>
          </div>

          <div className="stat-card">
            <p>Active Trainings</p>
            <h2>{trainings.length}</h2>
          </div>

          <div className="stat-card">
            <p>Completed</p>
            <h2>{completedCount}</h2>
          </div>
        </div>

        {/* TRAININGS */}
        <div className="card">
          <h3>Your Trainings</h3>

          {trainings.map((t) => (
            <div key={t.id}>
              <h4>{t.title}</h4>
              <p>{t.category}</p>
            </div>
          ))}
        </div>

        {/* PROGRESS SECTION */}
        <div className="card">
          <h3>Employee Progress</h3>

          {data.map((item, index) => (
            <div key={index} style={{ marginBottom: "15px" }}>
              <h4>{item.employee_name}</h4>
              <p>Training: {item.training_title}</p>
              <p>Status: {item.status}</p>

              {/* Progress bar */}
              <div style={{ width: "100%", background: "#eee" }}>
                <div
                  style={{
                    width: `${item.progress}%`,
                    background: "green",
                    color: "white",
                    padding: "4px"
                  }}
                >
                  {item.progress}%
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}