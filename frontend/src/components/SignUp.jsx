import React, { useState } from "react";
import "../styles/SignUp.css";

function SignUp() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [ign, setIgn] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSignUp = (e) => {
        e.preventDefault();
        if (!username || !password) {
            setErrorMessage("Please fill out all fields.");
            return;
        }
        // Hook up League API / server in future
        console.log("Creating account for:", username);

        //  mock a success scenario or navigate to login.
        window.location.href = "/";
    };

    return (
        <div className="signup-page">
            <h1>Create an Account</h1>
            {errorMessage && <p className="signup-error">{errorMessage}</p>}
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
            </form>
        </div>
    );
}

export default SignUp;
