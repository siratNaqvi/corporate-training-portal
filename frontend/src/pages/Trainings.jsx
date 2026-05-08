import { useEffect, useState } from "react";
import API from "../api/axios";
import "../styles/trainings.css";

export default function Trainings() {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    fetchTrainings();
  }, []);

 const fetchTrainings = async () => {
  try {
    const res = await API.get("/training", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    setTrainings(res.data);
  } catch (err) {
    console.log(err);
  }
};

  return (
    <div className="trainings-page">
      
      {/* Header */}
      <div className="trainings-header">
        <h2>Trainings</h2>
        <button onClick={fetchTrainings}>Refresh</button>
      </div>

      {/* Cards */}
      <div className="trainings-grid">
        {trainings.map((t) => (
          <div className="training-card" key={t.enrollment_id}>
            <h3>{t.title}</h3>
            <p>{t.description}</p>

            <div className="training-footer">
              <span className="badge">Active</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}