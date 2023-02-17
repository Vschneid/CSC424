import { useAuth, AuthProvider } from "./context/AuthProvider";
import { createContext, useContext, useState } from "react";

export const LogUp = () => {
    const { value } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [valpassword, setValPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Handling Logup")
        console.log("Username:", username);
        console.log("Password:", password);
        console.log("Password Validation:", valpassword);
        value.username = username;
        value.password = password;
        value.valpassword = valpassword;
        value.onLogup();
    };

    return (
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <label>
          Re-enter Password:
          <input type="password" value={valpassword} onChange={(e) => setValPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Log Up</button>
      </form>
    );
};