import { useState, useEffect } from "react";
import api from "../api/axios";
import "../styles/CreateModule.css";
export default function CreateModule() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [trainingId, setTrainingId] = useState("");
  const [trainings, setTrainings] = useState([]);

  // ✅ LOAD TRAININGS
  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const res = await api.get("/training");
        setTrainings(res.data || []);
      } catch (err) {
        console.log("Training fetch error:", err);
      }
    };

    fetchTrainings();
  }, []);

  // ✅ SUBMIT MODULE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/modules/create",
        {
          title,
          description,
          training_id: trainingId,
           order_index: 1,
  content_type: "text",
  duration_minutes: 0
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Module created successfully!");

      setTitle("");
      setDescription("");
      setTrainingId("");

    } catch (err) {
       console.log("❌ FULL ERROR:", JSON.stringify(err.response?.data, null, 2));
    console.log("❌ RAW ERROR:", err.response?.data);
    console.log("❌ STATUS:", err.response?.status);
      console.log("❌ ERROR:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Module creation failed");
    }
  };

 return (
  <div className="create-module-page">
    <div className="create-module-card">

      <h2>Create Module</h2>

      <form onSubmit={handleSubmit}>

        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          value={trainingId}
          onChange={(e) => setTrainingId(e.target.value)}
        >
          <option value="">Select Training</option>

          {trainings.map((t) => (
            <option key={t.id} value={t.id}>
              {t.title}
            </option>
          ))}
        </select>

        <button type="submit">Create Module</button>

      </form>

    </div>
  </div>
);
}