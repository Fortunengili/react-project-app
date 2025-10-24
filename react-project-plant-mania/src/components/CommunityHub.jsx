import React, { useEffect, useState } from "react";
import "../css/CommunityHub.css";

function CommunityHub() {
  const [professionals, setProfessionals] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/professionals")
      .then((res) => res.json())
      .then((data) => setProfessionals(data));
  }, []);

  const handleContact = (email) => {
    alert(`You can contact this professional at: ${email}`);
  };

  return (
    <div className="community-hub container">
      <h2 className="text-success mb-4">Connect with Green Professionals</h2>
      <div className="row">
        {professionals.length === 0 ? (
          <p className="text-center text-muted">No professionals available.</p>
        ) : (
          professionals.map((pro) => (
            <div key={pro.id} className="col-md-4 mb-4">
              <div className="card professional-card">
                <img src={pro.image} alt={pro.name} className="card-img-top" />
                <div className="card-body text-center">
                  <h5 className="card-title">{pro.name}</h5>
                  <p className="card-text text-muted">{pro.specialty}</p>
                  <p className="card-text">Experience: {pro.experience}</p>
                  <button
                    className="btn btn-outline-success btn-sm"
                    onClick={() => handleContact(pro.email)}
                  >
                    Contact
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CommunityHub;
