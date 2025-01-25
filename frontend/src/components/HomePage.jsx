import React, {useState} from "react";
import "../styles/HomePage.css";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const validateCredentials = (user, pass) => {
    if (!user || !pass) return false;

    return true;
  }

  const handleLogin = () => {
    if (validateCredentials(username, password)) {
      // navigate to /:username, e.g. /alice
      navigate(`/${username}`);
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };



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


          <button onClick={() => navigate("/signup")}>Sign Up</button>


          {/* Left Section: Login */}
          <div className="login-section">
            <h2 className="login-title">Login</h2>
            <div className="form-group">
              <label htmlFor="username" className="label">
                Username
              </label>
              <input
                id="username"
                type="text"
                className="input"
                placeholder="Enter username"
                value = {username}
                onChange={(e) => setUsername(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>


            <button onClick={handleLogin}>Log In</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
