import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import SideBar from "./SideBar";
import PlantCard from "./PlantCard";
import CommunityHub from "./CommunityHub";
import FeedBackForm from "./FeedBackForm";
import "../css/DashBoard.css";

function DashBoard() {
  const { user } = useOutletContext();
  const [active, setActive] = useState("plants");
  const [feedbacks, setFeedbacks] = useState([]);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3001/feedback")
      .then((response) => response.json())
      .then((data) => setFeedbacks(data));
  }, []);

  const addFeedback = (newFeedback) => {
    setFeedbacks((prev) => [...prev, newFeedback]);

    fetch("http://localhost:3001/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newFeedback),
    });
  };

  return (
    <div className="dashboard-container">
      {user && (
        <h4 className="text-success mb-3">
          Welcome, {user.username || "User"}!
        </h4>
      )}

      <div className="dashboard-content d-flex">
        <SideBar active={active} onSelect={setActive} />

        <div className="content flex-grow-1">
          {active === "plants" ? <PlantCard /> : <CommunityHub />}

          <div className="feedback-section mt-4">
            <h5 className="text-success mb-3">Recent Feedback</h5>
            {feedbacks.length === 0 ? (
              <p className="text-muted">No feedback available.</p>
            ) : (
              feedbacks.map((fb) => (
                <div key={fb.id} className="card mb-3">
                  <div className="card-body">
                    <p className="mb-0">
                      <strong>{fb.name}</strong>: {fb.message}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <button
        className="floating-btn"
        onClick={() => setShowFeedbackForm(true)}
      >
        +
      </button>

      {showFeedbackForm && (
        <FeedBackForm
          onClose={() => setShowFeedbackForm(false)}
          addFeedback={addFeedback}
        />
      )}
    </div>
  );
}

export default DashBoard;
