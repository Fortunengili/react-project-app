import React from "react";
import "../css/SideBar.css";

function SideBar({ active, onSelect }) {
  const sections = [{ id: "connect", label: "Connect with Professionals" }];

  return (
    <aside className="sidebar p-3">
      <h5 className="text-success mb-3">Community Hub</h5>
      <ul className="list-unstyled">
        {sections.map((section) => (
          <li key={section.id}>
            <button
              className={`btn w-100 mb-2 ${
                active === section.id ? "btn-success text-white" : "btn-outline-success"
              }`}
              onClick={() => onSelect(section.id)}
            >
              {section.label}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default SideBar;