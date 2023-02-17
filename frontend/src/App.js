import React, { useEffect, useState } from "react";
import { Routes, Route} from "react-router-dom";
import { Home } from "./Home";
import { Landing } from "./Landing";
import { LogIn } from "./Log-In"
import { LogUp } from "./Log-Up"
import { ProtectedRoute } from "./utils/ProtectedRoute";
import { NavLink } from 'react-router-dom';
import { useAuth } from "./context/AuthProvider";
import { AuthProvider } from "./context/AuthProvider";

export const AuthContext = React.createContext(null);


const App = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    document.body.style.backgroundColor = "lightblue"
  });

  const handleLogout = () => {setToken(null);};


  return (
    <>
     
   
    <AuthProvider>
  
    <Navigation token={token} onLogout={handleLogout} />
   
    <h1>React Router</h1>

    <Routes>
      <Route index element={<Home />} />
      <Route path="landing" element={<ProtectedRoute><Landing /></ProtectedRoute>} />
      <Route path="home" element={<Home />} />
      <Route path="log-in" element={<LogIn />} />
      <Route path="log-up" element={<LogUp />} />
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
      <NavLink to="/log-in">SignIn</NavLink>
      <NavLink to="/log-up">SignUp</NavLink>
      {value.token && (
        <button type="button" onClick={value.onLogout}>
          Sign Out
     </button>
      )}
    </nav>
  )
  };

export default App;

