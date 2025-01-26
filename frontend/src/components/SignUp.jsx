import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SignUp.css";

function SignUp() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [ign, setIgn] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        setErrorMessage(""); // Clear previous errors
        setSuccessMessage(""); // Clear previous success messages

        if (!username || !password || !ign) {
            setErrorMessage("Please fill out all fields.");
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:5000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password, ign }),
            });

            if (response.ok) {
                const data = await response.json();
                setSuccessMessage("Account created successfully!");
                console.log("Account created:", data);
                // Navigate to login page after a short delay
                setTimeout(() => navigate("/"), 2000);
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.error || "Failed to create account.");
            }
        } catch (error) {
            console.error("Error during sign-up:", error);
            setErrorMessage("An unexpected error occurred. Please try again.");
        }
    };

    return (
        <div className="signup-page">
            <h1>Create an Account</h1>
            {errorMessage && <p className="signup-error">{errorMessage}</p>}
            {successMessage && <p className="signup-success">{successMessage}</p>}
            <form className="signup-form" onSubmit={handleSignUp}>
                <label>Username</label>
                <input
                    type="text"
                    value={username}
                    placeholder="Enter username"
                    onChange={(e) => setUsername(e.target.value)}
                />

                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    placeholder="Enter password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <label>IGN</label>
                <input
                    type="text"
                    value={ign}
                    placeholder="Enter Game Name + #NA1"
                    onChange={(e) => setIgn(e.target.value)}
                />

                <button type="submit">Sign Up</button>
                <button type="button" onClick={() => navigate("/")}>
                    Back
                </button>
            </form>
        </div>
    );
}

export default SignUp;