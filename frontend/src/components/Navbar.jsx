import { Link } from "react-router-dom";

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div style={{ padding: 10, borderBottom: "1px solid black" }}>
      <Link to="/">Login</Link> |{" "}
      <Link to="/trainings">Trainings</Link> |{" "}
      <Link to={`/${user?.role}`}>Dashboard</Link>
    </div>
  );
}