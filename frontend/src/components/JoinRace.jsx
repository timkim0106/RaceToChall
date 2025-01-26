import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/JoinRace.css";

function JoinRace() {
  const [joinCode, setJoinCode] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();
  const { username } = useParams(); // Get the username from the URL parameters

  const handleJoinRace = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!username || !joinCode) {
      setError("Username and join code are required.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/api/join/join-race", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, joinCode }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to join race");
      }

      const data = await response.json();
      setSuccessMessage("Successfully joined the race!");
      console.log("Joined race:", data);
      // Navigate to the logged-in page after a short delay
      setTimeout(() => navigate(`/${username}`), 2000);
    } catch (err) {
      console.error("Error joining race:", err);
      setError(err.message || "Failed to join race. Please try again.");
    }
  };

  return (
    <div className="join-race-page">
      <h1>Join a Race</h1>
      {error && <p className="join-race-error">{error}</p>}
      {successMessage && <p className="join-race-success">{successMessage}</p>}
      <form className="join-race-form" onSubmit={handleJoinRace}>
        <label>Join Code</label>
        <input
          type="text"
          value={joinCode}
          placeholder="Enter join code"
          onChange={(e) => setJoinCode(e.target.value)}
        />
        <button type="submit">Join Race</button>
        <button type="button" onClick={() => navigate(`/${username}`)}>
          Back
        </button>
      </form>
    </div>
  );
}

export default JoinRace;