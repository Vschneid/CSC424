import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Home } from "./Home";
import { Landing } from "./Landing";
import { SignIn } from "./SignIn"
import { ProtectedRoute } from "./utils/ProtectedRoute";
import { fakeAuth } from "./utils/FakeAuth";
import { NavLink } from 'react-router-dom';
import { useAuth } from "./context/AuthProvider";
import { AuthProvider } from "./context/AuthProvider";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export const AuthContext = React.createContext(null);


const App = () => {
  //const [username, setUsername] = useState("");
  //const [password, setPassword] = useState("");

  const [token, setToken] = React.useState(null);
  const [user, setUser] = React.useState(null);

  //const handleLogin = () => setUser({ id: "1", name: "bj" });
  //const handleLogout = () => setUser(null);

  const handleLogin = async () => {
    //if(username === "van" && password === "1234"){
      const token = await fakeAuth();
      setToken(token);
    //}
  };

  const handleLogout = () => {setToken(null);};


  //<Navigation token={token} onLogout={handleLogout} />  

  return (
    <>
     
   
    <AuthProvider>
  
    <Navigation token={token} onLogout={handleLogout} />
   
    <h1>React Router</h1>

    <Routes>
      <Route index element={<Home />} />
      <Route path="landing" element={<ProtectedRoute><Landing /></ProtectedRoute>} />
      <Route path="home" element={<Home />} />
      <Route path="*" element={<p>There's nothing here: 404!</p>} />
    </Routes>
    </AuthProvider>
    </>
  );
  };

const Navigation = () => {
  const { value } = useAuth();
  return (
    <nav>
      <NavLink to="/home">Home</NavLink>
      <NavLink to="/landing">Landing</NavLink>
      {value.token && (
        <button type="button" onClick={value.onLogout}>
          Sign Out
     </button>
      )}
    </nav>
  )
  };

export default App;

