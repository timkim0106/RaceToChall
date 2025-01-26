import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/TopRaces.css"; 

function TopRaces() {
  const [topRaces, setTopRaces] = useState([]);
  const navigate = useNavigate();

  // fetch the top races from your server
  useEffect(() => {
    // fetch("/api/top-races")
    //   .then((res) => res.json())
    //   .then((data) => setTopRaces(data))
    //   .catch((err) => console.error(err));

    // fake data
    setTopRaces([
      { id: 1, title: "Race To Challenger", participants: 72 },
      { id: 2, title: "Marathon to Master", participants: 55 },
      { id: 3, title: "Climb to Challenger", participants: 49 },
      { id: 4, title: "RACE 4", participants: 41 },
      { id: 5, title: "First To Iron", participants: 5 },

    ]);
  }, []);

  return (
    <div className="top-races-container">
      <h1>T O P &nbsp; R A C E S</h1>
      
      <ul className="top-races-list">
        {topRaces.map((race) => (
          <li key={race.id} className="top-race-item">
            <strong>{race.title}</strong> — {race.participants} participants
          </li>
        ))}
      </ul>
      <button onClick={() => navigate("/")}>Back</button>
    </div>
  );
}

export default TopRaces;
