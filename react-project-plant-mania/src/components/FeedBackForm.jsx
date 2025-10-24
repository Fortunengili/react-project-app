import React, { useState } from "react";
import "../css/FeedBackForm.css";

function FeedBackForm({ onClose, addFeedback }) {
  const [formData, setFormData] = useState({ name: "", message: "" });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    fetch("http://localhost:3001/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        addFeedback(data);
        alert("Feedback submitted successfully!");
        setFormData({ name: "", message: "" });
        onClose();
      });
  }

  return (
    <div className="feedback-form-container">
      <div className="feedback-form-header">
        <h5 className="text-success mb-0">Send Feedback</h5>
        <button className="btn-close" onClick={onClose}></button>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="form-control mb-2"
          placeholder="Your Name"
          required
        />

        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="form-control mb-3"
          rows="3"
          placeholder="Your feedback..."
          required
        ></textarea>

        <button type="submit" className="btn btn-success w-100 rounded-pill">
          Submit
        </button>
      </form>
    </div>
  );
}

export default FeedBackForm;
