import { useState, useEffect } from "react";
import API from "../api/axios";
import "../styles/AssignTraining.css";

export default function AssignTraining() {
  const [users, setUsers] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    user_id: "",
    training_id: ""
  });

  useEffect(() => {
    fetchUsers();
    fetchTrainings();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchTrainings = async () => {
    try {
      const res = await API.get("/training"); // ✅ correct endpoint
      setTrainings(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const assign = async () => {
    if (!form.user_id || !form.training_id) {
      alert("Select employee and training");
      return;
    }

    try {
      setLoading(true);

      await API.post("/training/assign", {
        user_id: form.user_id,
        training_id: form.training_id
      });

      alert("Training Assigned Successfully!");

      setForm({ user_id: "", training_id: "" });

    } catch (err) {
      console.log(err);
      alert("Assign failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="assign-page">
      <div className="assign-card">

        <h2>Assign Training</h2>

        {/* USERS */}
        <select
          value={form.user_id}
          onChange={(e) =>
            setForm({ ...form, user_id: e.target.value })
          }
        >
          <option value="">Select Employee</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>

        {/* TRAININGS */}
        <select
          value={form.training_id}
          onChange={(e) =>
            setForm({ ...form, training_id: e.target.value })
          }
        >
          <option value="">Select Training</option>
          {trainings.map((t) => (
            <option key={t.id} value={t.id}>
              {t.title}
            </option>
          ))}
        </select>

        <button onClick={assign} disabled={loading}>
          {loading ? "Assigning..." : "Assign Training"}
        </button>

      </div>
    </div>
  );
}