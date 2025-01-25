import React from "react";
import "../styles/LoggedIn.css";

function LoggedIn() {
  // You might fetch user data or race data from an API here, e.g.:
  // useEffect(() => {
  //   fetchRaces();
  // }, []);

  const handleNewRace = () => {
    // Logic to create or join a new race
    console.log("Create or join a new race");
  };

  return (
    <div className="loggedin-page">
      {/* Top Nav Bar */}
      <nav className="loggedin-navbar">
        <div className="profile-icon"></div>
        <button className="nav-button">Current Races</button>
        <button className="nav-button" onClick={handleNewRace}>
          New Race
        </button>
        <button className="nav-button">Stats</button>
        <button className="nav-button">Settings</button>
        <button className="nav-button">Friends</button>
      </nav>

      {/* Main Races Container */}
      <div className="races-container">
        <div className="current-races">
          <h2>Current Races</h2>
          <div className="race-card"></div>
          <div className="race-card"></div>
          <div className="race-card"></div>
        </div>
        {/* Separator */}
        <div className="vertical-divider"></div>
        {/* Popular Races */}
        <div className="popular-races">
          <h2>Popular Races</h2>
          <div className="race-card"></div>
          <div className="race-card"></div>
          <div className="race-card"></div>
        </div>
        {/* Friends List (or side panel) */}
        <div className="friends-panel">
          <h3>Friends</h3>
          <div className="friend-box"></div>
          <div className="friend-box"></div>
          <div className="friend-box"></div>
        </div>
      </div>
    </div>
  );
}

export default LoggedIn;
