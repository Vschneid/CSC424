import { useAuth, AuthProvider } from "./context/AuthProvider";
import { createContext, useContext, useState } from "react";

export const LogIn = () => {
    const { value } = useAuth();
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Handling Login")
        console.log("Username:", username);
        console.log("Password:", password);
        value.username = username;
        value.password = password;
        value.onLogin()
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
        <br />
        <button type="submit">Log In</button>
      </form>
    );
};
