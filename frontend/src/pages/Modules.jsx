import { useEffect, useState } from "react";
import api from "../api/axios";
import "../styles/pro-dashboard.css";

export default function Modules() {
  const [modules, setModules] = useState([]);

  useEffect(() => {
    fetchModules();
  }, []);

  const fetchModules = async () => {
    try {
      const res = await api.get("/modules/all");
      setModules(res.data);
    } catch (err) {
      console.log("Modules fetch error:", err);
    }
  };

  return (
    <div className="layout">

      {/* Sidebar */}
      <div className="sidebar">
        <h2>LearnHub</h2>

        <button onClick={() => window.location.href = "/trainer"}>
          Dashboard
        </button>

        <button className="active">
          Modules
        </button>
      </div>

      {/* Main */}
      <div className="main">

        {/* Header */}
        <div className="header">
          <h2>Modules</h2>

          <button onClick={() => window.location.href = "/create-module"}>
            + Add Module
          </button>
        </div>

        {/* Modules List */}
        <div className="card">
          <h3>Your Modules</h3>

          {modules.length === 0 ? (
            <p>No modules found</p>
          ) : (
            modules.map((m) => (
              <div key={m.id} className="module-card">

                <div>
                  <h4>{m.title}</h4>
                  <p>{m.description}</p>

                  <small>
                    Training: {m.training?.title}
                  </small>
                </div>

                {/* 🎯 QUIZ BUTTON (PROPER POSITION) */}
                <div>
                  <button onClick={() => window.location.href = `/create-quiz/${m.id}`}>
  Add Quiz
</button>
                </div>

              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}