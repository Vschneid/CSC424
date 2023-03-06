import { useAuth, AuthProvider } from "./context/AuthProvider";
import { createContext, useContext, useState } from "react";

export const LogUp = () => {
    const { value } = useAuth();
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [valpassword, setValPassword] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Handling Logup")
        console.log("Username:", username);
        console.log("Password:", password);
        console.log("Password Validation:", valpassword);
        value.name = name;
        value.username = username;
        value.password = password;
        value.valpassword = valpassword;
        value.email = email;
        value.onLogup();
    };

    return (
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="name" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
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
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <button type="submit">Log Up</button>
      </form>
    );
};