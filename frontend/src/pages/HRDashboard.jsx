import { useEffect, useState } from "react";
import API from "../api/axios";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function HRDashboard() {
  const [stats, setStats] = useState({});
  const [details, setDetails] = useState({
    activity: [],
    departmentStats: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await API.get("/dashboard/hr");
        const res2 = await API.get("/dashboard/details");

        setStats(res1.data);
        setDetails(res2.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  // ---------------- PIE CHART (Completion)
  const pieData = {
    labels: ["Completed", "Remaining"],
    datasets: [
      {
        data: [
          stats.completionRate || 0,
          100 - (stats.completionRate || 0),
        ],
        backgroundColor: ["#22c55e", "#e5e7eb"],
      },
    ],
  };

  // ---------------- BAR CHART (Departments)
  const barData = {
    labels: details.departmentStats.map((d) => d.department),
    datasets: [
      {
        label: "Completed",
        data: details.departmentStats.map((d) => d.completed || 0),
        backgroundColor: "#6366f1",
      },
    ],
  };

  return (
    <div className="layout">
      <Sidebar />

      <div className="main">

        {/* ================= HEADER ================= */}
        <div className="header">
          <h2>HR Dashboard</h2>

          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={() => window.location.href = "/create-training"}>
              + New Program
            </button>

            <button onClick={() => navigate("/assign-training")}>
              Assign Training
            </button>
          </div>
        </div>

        {/* ================= STATS ================= */}
        <div className="stats">
          <div className="stat-card">
            <h3>{stats.totalEmployees || 0}</h3>
            <p>Employees</p>
          </div>

          <div className="stat-card">
            <h3>{stats.activePrograms || 0}</h3>
            <p>Active Programs</p>
          </div>

          <div className="stat-card">
            <h3>{stats.overdueTrainings || 0}</h3>
            <p>Overdue</p>
          </div>

          <div className="stat-card">
            <h3>{stats.completionRate || 0}%</h3>
            <p>Completion</p>
          </div>
        </div>

        {/* ================= CHARTS ================= */}
        <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
          
          <div style={{ width: "300px" }}>
            <h3>Completion Rate</h3>
            <Pie data={pieData} />
          </div>

          <div style={{ flex: 1 }}>
            <h3>Department Progress</h3>
            <Bar data={barData} />
          </div>
        </div>

        {/* ================= RECENT ACTIVITY ================= */}
        <div className="card" style={{ marginTop: "20px" }}>
          <h3>Recent Activity</h3>

          {details.activity.length === 0 ? (
            <p>No activity found</p>
          ) : (
            details.activity.map((item) => (
              <div key={item.id} className="activity-item">
                <div>
                  <b>{item.user_name}</b> → {item.training_title}
                </div>

                <span className={`badge ${item.status}`}>
                  {item.status}
                </span>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}