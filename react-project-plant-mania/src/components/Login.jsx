import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import "../css/Login.css";

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const { setUser } = useOutletContext();
  const nav = useNavigate();

  const submit = (event) => {
    event.preventDefault();
    fetch("http://localhost:3001/users")
      .then((response) => response.json())
      .then((users) => {
        const found = users.find(
          (u) => u.username === form.username && u.password === form.password
        );
        if (found) {
          setUser(found);
          alert(`Welcome, ${found.username}!`);
          nav("/dashboard");
        } else {
          alert("Invalid credentials");
        }
      })

  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center">
      <div className="card p-4 login-card">
        <h4 className="text-center text-success mb-4">Login</h4>
        <form onSubmit={submit}>
          <input
            name="username"
            className="form-control mb-3"
            placeholder="Username"
            value={form.username}
            onChange={(event) => setForm({ ...form, username: event.target.value })}
          />
          <input
            name="password"
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button className="btn btn-success w-100">Login</button>
        </form>
        <p className="text-center mt-3">
          Don't have an account?{" "}
          <a href="/register" className="text-success">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;