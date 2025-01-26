import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/JoinRace.css"; // Adjust path if needed

function JoinRace() {
  const [inviteCode, setInviteCode] = useState("");
  const navigate = useNavigate();

  const handleJoin = () => {
    // In a real app, you'd call an API or check the invite code here
    alert(`Joining race with invite code: ${inviteCode}`);
  };

  const handleGoBack = () => {
    // Goes back one step in browser history
    // or you can navigate to a specific route: navigate("/loggedin");
    navigate(-1);
  };

  return (
    <div className="join-race-container">
      <h1>Join Race</h1>

      <div className="form-group">
        <h2>Invite Code</h2>

        <textarea
          id="invite"
          className="invite-textarea"
          value={inviteCode}
          onChange={(e) => setInviteCode(e.target.value)}
          placeholder="Enter your invite code..."
        />
      </div>

      <div className="buttons-container">
        <button className="join-button" onClick={handleJoin}>
          Join
        </button>
        <button className="back-button" onClick={handleGoBack}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default JoinRace;
