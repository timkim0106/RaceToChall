import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import SignUp from "./components/SignUp";
import LoggedIn from "./components/LoggedIn";
import TopRaces from "./components/TopRaces";
import CreateRace from "./components/CreateRace";
import JoinRace from "./components/JoinRace";
import Leaderboard from "./components/Leaderboard";

function App() {
  const [count, setCount] = useState(0);
  const [randomItem, setRandomItem] = useState(null);

  async function getRandomItem() {
    const res = await fetch(`/api/get-random`);
    const data = await res.json();
    setRandomItem(data["item_id"]);
  }

  useEffect(() => {
    getRandomItem();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="topraces" element={<TopRaces />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/:username" element={<LoggedIn />} />
        <Route path="/:username/joinrace" element={<JoinRace />} />
        <Route path="/:username/createrace" element={<CreateRace />} />
        <Route path="/leaderboard/:raceId" element={<Leaderboard />} />
      </Routes>
    </Router>
  );
}

export default App;