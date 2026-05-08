import { NavLink } from "react-router-dom";
import "../styles/pro-dashboard.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2>LearnHub</h2>

      <p>MANAGEMENT</p>

      <NavLink
        to="/hr"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Dashboard
      </NavLink>

      <NavLink
        to="/trainings"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Trainings
      </NavLink>

      <NavLink
        to="/modules"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Modules
      </NavLink>

      <hr />

      <NavLink
        to="/trainer"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Trainer Panel
      </NavLink>

      <NavLink
        to="/employee"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Employee Panel
      </NavLink>
    </div>
  );
}