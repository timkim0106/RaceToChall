import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/CreateRace.css";

function CreateRace() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [raceType, setRaceType] = useState("Challenger");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { username } = useParams(); // Get the username from the URL parameters

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic validation for empty fields
    if (!title || !raceType || !startDate || !endDate || !inviteCode) {
      setError("Please fill out all required fields.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/api/race/create-race", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          raceType,
          startDate,
          endDate,
          inviteCode,
        }),
      });

      if (!response.ok) throw new Error("Failed to create race");
      const data = await response.json();
      alert(`Race "${title}" created successfully!`);
      navigate(`/${username}`); // Navigate to the LoggedIn component with the username
    } catch (err) {
      console.error("Error creating race:", err);
      setError("Failed to create race. Please try again.");
    }
  };

  return (
    <div className="create-race-page">
      <h1>Create a New Race</h1>

      {error && <p className="error">{error}</p>}

      <form className="create-race-form" onSubmit={handleSubmit}>
        <label>Race Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Race Title"
          required
        />

        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />

        <label>Race Type</label>
        <select value={raceType} onChange={(e) => setRaceType(e.target.value)}>
          <option value="Challenger">First to Challenger</option>
          <option value="Master">First to Masters</option>
          <option value="Kills">First to 100 Kills</option>
        </select>

        <label>Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />

        <label>End Date</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />

        <label>Invite Code</label>
        <input
          value={inviteCode}
          onChange={(e) => setInviteCode(e.target.value)}
          placeholder="Enter a unique invite code"
          required
        />

        <button type="submit" className="submit-button">
          Create Race
        </button>
      </form>
    </div>
  );
}

export default CreateRace;