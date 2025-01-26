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
    fetch(`http://127.0.0.1:5000/api/race/user-races/${username}`)
      .then((res) => res.json())
      .then((data) => setCurrentRaces(data.slice(0, 5))) // Display up to 5 races
      .catch((error) => console.error("Error fetching user races:", error));

    // Fetch the popular races (top 3)
    fetch("http://127.0.0.1:5000/api/race/top-races")
      .then((res) => res.json())
      .then((data) => setPopularRaces(data.slice(0, 5))) // Display up to 5 races
      .catch((error) => console.error("Error fetching top races:", error));
  }, [username]);

  const handleCreateRace = () => {
    navigate(`/${username}/createrace`);
  };

  const handleJoinRace = () => {
    navigate(`/${username}/joinrace`);
  };

  const handleLogout = () => {
    // We can maybe clear the "logged in" state or tokens here
    navigate("/");
  };

  const handleRaceClick = (raceId) => {
    navigate(`/leaderboard/${raceId}`);
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

      <div className="races-container">
        <div className="current-races">
          <h2>{username}'s Races</h2>
          {currentRaces.map((race) => (
            <div key={race.id} className="race-card" onClick={() => handleRaceClick(race.id)}>
              {race.title}
            </div>
          ))}
        </div>

        {/* Separator */}
        <div className="vertical-divider"></div>

        <div className="popular-races">
          <h2>Top Races</h2>
          {popularRaces.map((race) => (
            <div key={race.id} className="race-card" onClick={() => handleRaceClick(race.id)}>
              {race.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LoggedIn;