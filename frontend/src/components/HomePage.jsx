import React, {useState} from "react";
import "../styles/HomePage.css";
import { useNavigate } from "react-router-dom";

function HomePage() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const validateCredentials = (user, pass) => {
    
    // need to check database
    if (!user || !pass) 
      {
        alert("Invalid credentials.");
        return false;
      }

  

    return true;
  }

  const handleLogin = () => {
    if (validateCredentials(username, password)) {
      // navigate to the proper username address
      navigate(`/${username}`);
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  const handleRacesButton = () => {
    navigate()
  };


  return (
    <div className="page-wrapper">
      {/* Top Navigation Bar */}
      

      <nav className="top-links">
        <a href="">STATS</a>
        <a href="">DEVBLOG</a>
        <a href="/topraces">RACES</a>
      </nav>

      {/*
      <nav className="navbar">
        <button className="nav-button1">Stats</button>
        <button className="nav-button1">DevBlog</button>
        
        

        <button className="nav-button1" onClick={() => navigate("/topraces")}>
          Races
        </button>
      </nav>
      */}


      <div className="home-page">
        {/*
        <div className="images-and-text">
          <img
            src="/images/challengerFlag.png"
            alt="Left Icon"
            className="side-image-left"
          />
          <img
            src="/images/challengerIcon.png"
            alt="Right Icon"
            className="side-image-right"
          />
        </div>
        */}
        <header className="home-header">
          <h1>R A C E &nbsp; T O  &nbsp; C H A L L </h1>
          <h2>Create a race for the new season or sign up as a competitor</h2>
        </header>

        <div className="home-actions">

          {/*
          <button className="signup" onClick={() => navigate("/signup")}>Sign Up</button>
            */}

          {/* Login */}
          <div className="login-section">
            
            <div className="form-group">
            <h3 className="login-title">Username</h3>
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
            <h3 className="login-title">Password</h3>
              <input
                id="password"
                type="password"
                className="input"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>


            <button className="loginButton" onClick={handleLogin}>
              Log In</button>
            <p className="auth-create-account">
          <a href="/signup">Create Account</a>
        </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
