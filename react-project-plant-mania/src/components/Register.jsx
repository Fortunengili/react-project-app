import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import "../css/Register.css"; 

function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const { addUser } = useOutletContext();
  const nav = useNavigate();

  const submit = (event) => {
    event.preventDefault();
    if (!form.username || !form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }

    fetch("http://localhost:3001/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((response) => response.json())
      .then((data) => {
        addUser(data);
        alert("Registered successfully!");
        nav("/login");
      });
  };

  return (
    <div className="register-page d-flex justify-content-center align-items-center">
      <div className="register-card card p-4 col-md-4 shadow-sm">
        <h4 className="text-center text-success">Register</h4>
        <form onSubmit={submit}>
          <input
            name="username"
            className="form-control mb-2"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <input
            name="email"
            type="email"
            className="form-control mb-2"
            placeholder="Email"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
          />
          <input
            name="password"
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={form.password}
            onChange={(event) => setForm({ ...form, password: event.target.value })}
          />
          <button className="btn btn-success w-100">Create Account</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
