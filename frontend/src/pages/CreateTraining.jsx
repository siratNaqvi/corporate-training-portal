import { useState } from "react";
import API from "../api/axios";

export default function CreateTraining() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    department: "",
    due_date: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const createProgram = async () => {
    try {
      await API.post(
        "/training/create",
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      alert("Training Created!");
      setForm({
        title: "",
        description: "",
        category: "",
        department: "",
        due_date: ""
      });
    } catch (err) {
      console.log(err);
      alert("Error creating training");
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px"
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "10px"
  };

  const containerStyle = {
    maxWidth: "500px",
    margin: "50px auto",
    padding: "25px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
  };

  const titleStyle = {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "22px",
    fontWeight: "bold"
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>➕ Create Training Program</h2>

      <input
        style={inputStyle}
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
      />

      <textarea
        style={{ ...inputStyle, height: "80px", resize: "none" }}
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />

      <input
        style={inputStyle}
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
      />

      <input
        style={inputStyle}
        name="department"
        placeholder="Department"
        value={form.department}
        onChange={handleChange}
      />

      <input
        style={inputStyle}
        type="date"
        name="due_date"
        value={form.due_date}
        onChange={handleChange}
      />

      <button style={buttonStyle} onClick={createProgram}>
        Create Training
      </button>
    </div>
  );
}