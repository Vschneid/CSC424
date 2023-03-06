import { useAuth } from "./context/AuthProvider";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from 'react';

export const Home = () => {
  const { value } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <h2>Home (Public)</h2>
      </>
);
};