import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import axios from "axios";

const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [token, setToken] = useState(null);
  const [name, setName] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [valpassword, setValPassword] = useState(null);
  const [email, setEmail] = useState(null);
  const [cookies, setCookie] = useCookies(['my-token']);
  
  const handleLogin = async () => {
    try {
      const res = await axios.post("https://localhost:5000/account/login", {
        username: value.username,
        password: value.password
      });
      setCookie('token', res.data, { path: '/' });
      navigate("/landing");
      window.location.reload();
    } catch (error) {
      alert("Create an account!");
      console.error(error);
      navigate("/home");
    }
  };

  const handleLogup = async () => {
    try {
      const res = await axios.post("https://localhost:5000/account/logup", {
        name: value.name,
        username: value.username,
        password: value.password,
        valpassword: value.valpassword,
        email: value.email
      });
      setCookie('token', res.data, { path: '/' });
      navigate("/landing");
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Password must contain at least one uppercase letter, one number and one special character.");
      navigate("/home");
    }
  };

  const handleLogout = () => {
    window.location.reload();
    setCookie('token', null, { path: '/' });
  };

  const value = {
    name,
    username,
    password,
    valpassword,
    email,
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

export async function fetchDir() {
  try {
    return await axios.get("https://localhost:5000/directory");
  } catch (error) {
    return false;
  }
}

export const useAuth = () => useContext(AuthContext);