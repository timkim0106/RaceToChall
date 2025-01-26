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
    navigate(`/${username}/createrace`);
  };

  const handleJoinRace = () => {
    // Navigate to your join race page
    navigate("/joinrace");
  };

  const handleLogout = () => {

    // We can maybe clear the "logged in" state or tokens here
    navigate("/");
  };

  return (
    <div className="loggedin-page">

      <nav className="top-links">


        <button className="borderless" onClick={handleCreateRace}>
          <h3>Create Race</h3>
        </button>
        
        <button className="borderless" onClick={handleJoinRace}>
          <h3>Join Race</h3>
        </button>

        <button className="borderless" onClick={handleLogout}>
          <h3>Log Out</h3>
        </button>
      </nav>
      {/* Top Nav Bar 
      <nav className="loggedin-navbar">
        
 
       

        
        <div className="profile-icon"></div>
        <button className="nav-button">Stats</button>
        <button className="nav-button">Settings</button>
        <button className="nav-button">Friends</button>
        

      </nav>
      */}
      

      <div className="races-container">
        <div className="current-races">
          <h2> {username}'s Races</h2>
          {currentRaces.map((race) => (
            <div key={race.id} className="race-card">
              {race.title}
            </div>
          ))}
        </div>

        {/* Separator */}
        <div className="vertical-divider"></div>

        <div className="popular-races">
          <h2>Top Races</h2>
          {popularRaces.map((race) => (
            <div key={race.id} className="race-card">
              {race.title}
            </div>
          ))}
        </div>
{/*
        <div className="friends-panel">
          <h3>Friends</h3>
          <div className="friend-box">Friend 1</div>
          <div className="friend-box">Friend 2</div>
          <div className="friend-box">Friend 3</div>
        </div>
*/}
      </div>
    </div>
  );
}

export default LoggedIn;
