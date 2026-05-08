import { useState } from "react";
import api from "../api/axios";
import "../styles/Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      // ✅ STORE DATA
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      const role = res.data.user.role.toLowerCase(); // ✅ normalize

      // ✅ ROLE REDIRECT FIXED
      if (role === "hr" || role === "admin") {
        window.location.href = "/hr";
      } 
      else if (role === "employee") {
        window.location.href = "/employee";
      } 
      else if (role === "trainer") {   // ✅ ADD THIS
        window.location.href = "/trainer";
      }
      else {
        alert("Invalid role");
      }

    } catch (err) {
      console.log(err.response?.data || err.message);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <div className="login-left">
          <h1>LearnHub</h1>
          <p>HR Training Portal</p>
        </div>

        <div className="login-right">
          <h2>Welcome Back</h2>

          <form onSubmit={login}>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">Login</button>
          </form>

        </div>

      </div>
    </div>
  );
}