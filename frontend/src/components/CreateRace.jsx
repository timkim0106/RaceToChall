import React, { useState } from "react";
import "../styles/CreateRace.css";

function CreateRace() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [raceType, setRaceType] = useState("Solo");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [inviteCode, setInviteCode] = useState("");

  // Example function to generate an invite code (or fetch from server).
  // The user said there's a token generator, so we can assume an API call or local method
  const generateInviteCode = () => {
   try {
    const response = await.axios.get('http://localhost:5000/generate-invite-code');
    setInviteCode(response.data.inviteCode); 
   }
   catch (error) {
    console.error('Error generating invite code:', error);
  }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send form data to server to create the race
    // fetch("/api/create-race", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     title,
    //     description,
    //     raceType,
    //     startDate,
    //     endDate,
    //     inviteCode,
    //   }),
    // });
    console.log("Race created:", { title, description, raceType, startDate, endDate, inviteCode });

    alert(`Race "${title}" created! Invite Code: ${inviteCode}`);
  };

  return (
    <div className="create-race-page">
      <h1>Create a New Race</h1>
      <form className="create-race-form" onSubmit={handleSubmit}>
        <label>Race Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="2025 Race to Challenger"
          required
        />

        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="A fun sprint to Challenger rank..."
          required
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

        <div className="invite-code-section">
          <label>Invite Code</label>
          <div className="invite-code-gen">
            <input value={inviteCode} readOnly placeholder="No code yet" />
            <button type="button" onClick={generateInviteCode}>
              Generate Code
            </button>
          </div>
        </div>

        <button type="submit" className="submit-button">Create Race</button>
      </form>
    </div>
  );
}

export default CreateRace;
