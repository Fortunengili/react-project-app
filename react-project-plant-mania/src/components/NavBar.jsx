import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/NavBar.css";

function NavBar({ onCartClick, cartCount }) {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-light plant-navbar shadow-sm">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand fw-bold text-success">
          PlantMania
        </Link>
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center gap-3">
            <li className="nav-item">
              <Link
                to="/"
                className={`nav-link ${location.pathname === "/" ? "active-link" : ""}`}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/dashboard"
                className={`nav-link ${location.pathname === "/dashboard" ? "active-link" : ""}`}
              >
                Feed
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/login"
                className={`nav-link ${location.pathname === "/login" ? "active-link" : ""}`}
              >
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/register"
                className={`nav-link ${location.pathname === "/register" ? "active-link" : ""}`}
              >
                Register
              </Link>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-light cart-btn position-relative"
                onClick={onCartClick}
              >
                Cart
                {cartCount > 0 && (
                  <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
                    {cartCount}
                  </span>
                )}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;