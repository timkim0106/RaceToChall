import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/Leaderboard.css";

function Leaderboard() {
  const { raceId } = useParams(); // Get the race ID from the URL parameters
  const navigate = useNavigate();

  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch the leaderboard for the race
    fetch(`http://127.0.0.1:5000/api/race/leaderboard/${raceId}`)
      .then((res) => res.json())
      .then((data) => setLeaderboard(data))
      .catch((error) => {
        console.error("Error fetching leaderboard:", error);
        setError("Failed to fetch leaderboard. Please try again.");
      });
  }, [raceId]);

  return (
    <div className="leaderboard-page">
      <h1>Leaderboard</h1>
      {error && <p className="leaderboard-error">{error}</p>}
      <div className="leaderboard-container">
        {leaderboard.map((user, index) => (
          <div key={index} className="leaderboard-card">
            <h3>{user.username}</h3>
            <p>Tier: {user.tier}</p>
            <p>Division: {user.division}</p>
            <p>LP: {user.lp}</p>
          </div>
        ))}
      </div>
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
}

export default Leaderboard;