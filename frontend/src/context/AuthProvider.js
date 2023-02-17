import { createContext, useContext, useState } from "react";
//import { fakeAuth } from "../utils/FakeAuth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [valpassword, setValPassword] = useState(null);
  
  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/account/login", {
        username: value.username,
        password: value.password
      });
      setToken(res.data);
      navigate("/landing");
    } catch (error) {
      alert("Create an account!");
      console.error(error);
      navigate("/home");
    }
  };

  const handleLogup = async () => {
    try {
      const res = await axios.post("http://localhost:5000/account/logup", {
        username: value.username,
        password: value.password,
        valpassword: value.valpassword
      });
      setToken(res.data);
      navigate("/landing");
    } catch (error) {
      console.error(error);
      alert("Password must contain at least one uppercase letter, one number and one special character.");
      navigate("/home");
    }
  };

  const handleLogout = () => {
    setToken(null);
  };

  const value = {
    username,
    password,
    valpassword,
    token,
    onLogin: handleLogin,
    onLogup: handleLogup,
    onLogout: handleLogout,
  };

  return (
    <AuthContext.Provider value={{ value }}>
      {children}
    </AuthContext.Provider>
  );
};

// give callers access to the context
export const useAuth = () => useContext(AuthContext);