import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/LoggedIn.css";

function LoggedIn() {
  const { username } = useParams(); // e.g. 'Alice'
  const navigate = useNavigate();

  const [currentRaces, setCurrentRaces] = useState([]);
  const [popularRaces, setPopularRaces] = useState([]);

  useEffect(() => {
    // Fetch the user's current races
    // fetch(`/api/current-races?user=${username}`)
    //   .then((res) => res.json())
    //   .then((data) => setCurrentRaces(data));

    // For now, placeholder:
    setCurrentRaces([
      { id: 1, title: "Road to Diamond" },
      { id: 2, title: "Master Marathon" },
    ]);

    // Fetch the popular races (top 3)
    // fetch("/api/popular-races?limit=3")
    //   .then((res) => res.json())
    //   .then((data) => setPopularRaces(data));

    // Placeholder:
    setPopularRaces([
      { id: 10, title: "Dragon's Descent" },
      { id: 11, title: "Baron Blitz" },
      { id: 12, title: "Challenger Chase" },
    ]);
  }, [username]);

  const handleCreateRace = () => {
    navigate("/createrace");
  };

  return (
    <div className="loggedin-page">
      {/* Top Nav Bar */}
      <nav className="loggedin-navbar">
        <div className="profile-icon"></div>
 
        <button className="nav-button" onClick={handleCreateRace}>
          Create Race
        </button>
        <button className="nav-button">Stats</button>
        <button className="nav-button">Settings</button>
        <button className="nav-button">Friends</button>
      </nav>

      <div className="races-container">
        <div className="current-races">
          <h2>Current Races for {username}</h2>
          {currentRaces.map((race) => (
            <div key={race.id} className="race-card">
              {race.title}
            </div>
          ))}
        </div>

        {/* Separator */}
        <div className="vertical-divider"></div>

        <div className="popular-races">
          <h2>Popular Races</h2>
          {popularRaces.map((race) => (
            <div key={race.id} className="race-card">
              {race.title}
            </div>
          ))}
        </div>

        <div className="friends-panel">
          <h3>Friends</h3>
          <div className="friend-box">Friend 1</div>
          <div className="friend-box">Friend 2</div>
          <div className="friend-box">Friend 3</div>
        </div>
      </div>
    </div>
  );
}

export default LoggedIn;
