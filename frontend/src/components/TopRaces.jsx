import React, { useEffect, useState } from "react";
import "../styles/TopRaces.css";

function TopRaces() {
  const [topRaces, setTopRaces] = useState([]);

  // fetch the top races from your server
  useEffect(() => {
    // fetch("/api/top-races")
    //   .then((res) => res.json())
    //   .then((data) => setTopRaces(data))
    //   .catch((err) => console.error(err));

    // fake data 
    setTopRaces([
      { id: 1, title: "Challenger Sprint", participants: 42 },
      { id: 2, title: "Marathon to Master", participants: 35 },
      { id: 3, title: "Climb to Challenger", participants: 50 },
    ]);
  }, []);

  return (
    <div style={styles.container}>
      <h1>Top Races</h1>
      <ul style={styles.raceList}>
        {topRaces.map((race) => (
          <li key={race.id} style={styles.raceItem}>
            <strong>{race.title}</strong> — {race.participants} participants
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
    container: {
      padding: 20,
      fontFamily: "Arial, sans-serif",
    },
    raceList: {
      listStyle: "none",
      paddingLeft: 0,
    },
    raceItem: {
      marginBottom: 10,
      background: "#eee",
      padding: 10,
      borderRadius: 6,
    },
  };

export default TopRaces;
