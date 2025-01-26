import React, { useState } from "react";
import "../styles/HomePage.css";
import { useNavigate } from "react-router-dom";

function HomePage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleLogin = async () => {
        setErrorMessage("");

        if (!username || !password) {
            setErrorMessage("Username and password are required.");
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                navigate(`/${username}`);
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.error || "Invalid credentials.");
            }
        } catch (error) {
            setErrorMessage("Unable to connect to the server. Please try again.");
        }
    };

    return (
        <div className="page-wrapper">
            <nav className="top-links">
                <a href="/stats">STATS</a>
                <a href="/devblog">DEVBLOG</a>
                <a href="/topraces">RACES</a>
            </nav>

            <div className="home-page">
                <header className="home-header">
                    <h1>R A C E &nbsp; T O &nbsp; C H A L L</h1>
                    <h2>Create a race or join as a competitor</h2>
                </header>

                <div className="home-actions">
                    <div className="login-section">
                        <h3>Log In</h3>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button onClick={handleLogin}>Log In</button>
                        <p>
                            <a href="/signup">Create an Account</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;