import React from "react";
import "./HomePage.css";

function HomePage() {
  return (
    <div className="page-wrapper">
      {/* Top Navigation Bar */}
      <nav className="navbar">
      <button className="nav-button">Races</button>
        <button className="nav-button">Stats</button>
        <button className="nav-button">DevBlog</button>

      </nav>

      <div className="main-content">
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
          <button className="login-button">Login</button>
        </div>

        {/* Center Section: Title & Description with images */}
        <div className="center-section">
          <div className="images-and-text">
            <img
              src="/Users/timothykim/Desktop/hacka/hacka/frontend/src/components/images/challengerFlag.png"
              alt="Left Icon"
              className="side-image"
            />

            <div className="text-container">
              <h1 className="site-title">RaceToChall</h1>
              <p className="site-description">
                Create a race for the new season or sign up as a competitor
              </p>
            </div>

            <img
              src="/Users/timothykim/Desktop/hacka/hacka/frontend/src/components/images/challengerFlag.png"
              alt="Right Icon"
              className="side-image"
            />
          </div>
          {/* Sign Up Link at the bottom (centered) */}
          <div className="sign-up-container">
            <a href="#signup" className="sign-up-link">
              Sign Up!
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}


export default HomePage;
