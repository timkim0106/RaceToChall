import React from "react";
import "../styles/HomePage.css"; 
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="page-wrapper">
    {/* Top Navigation Bar */}
    <nav className="navbar">
      <button className="nav-button">Stats</button>
      <button className="nav-button">DevBlog</button>
      <button className="nav-button">Races</button>
    </nav>

    
    <div className="home-page">
    <div className="images-and-text">
            <img
              src="/images/challengerFlag.png"
              alt="Left Icon"
              className="side-image"
            />
            <img
              src="/images/challengerIcon.png"
              alt="Right Icon"
              className="side-image"
            />
            </div>
      <header className="home-header">
        <h1>RaceToChall</h1>
        <p>Create a race for the new season or sign up as a competitor</p>
      </header>

      

      <div className="home-actions">


        <button onClick={() =>navigate("/signup")}>Sign Up</button>
         

                {/* Left Section: Login */}
        <div className="login-section">
          <h2 className="login-title">Login</h2>
          <div className="form-group">
            <label htmlFor="username" className="label">
              User
            </label>
            <input
              id="username"
              type="text"
              className="input"
              placeholder="Enter username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="label">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="input"
              placeholder="Enter password"
            />
          </div>

          
        <button onClick={() => window.location.href = "/login"}>
          Log In
        </button>
      </div>
    </div>
    </div>
    </div>
  );
  }

export default HomePage;
