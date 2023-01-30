import { useAuth, AuthProvider } from "./context/AuthProvider";
import { createContext, useContext, useState } from "react";
//import "./signin.css";
//import "bootstrap/dist/css/bootstrap.min.css";
//import Button from "react-bootstrap/Button";
//import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

export const SignIn = () => {
  const { value } = useAuth();
  const [uname, setUsername] = useState(null);
  const [pword, setPassword] = useState(null);
  const navigate = useNavigate();
  //const {}

  const handleSubmit = (e) => {
    //e.preventDefault();
    console.log('Email:', uname);
    console.log('Password:', pword);
    if(uname === "van" && pword === "1234"){
      value.onLogin();
      navigate("/landing");
    }
    else{
      navigate("/home");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="username" value={uname} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={pword} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button type="submit">Sign In</button>
    </form>
  );
};

//     <button type="button" onClick={value.onLogin}>
//Sign In
//</button>
