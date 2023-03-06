import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { useCookies } from 'react-cookie';

export const ProtectedRoute = ({ children }) => {
  const [cookies, setCookie] = useCookies(['my-token']);
  const { value } = useAuth();
  if (cookies.token==="null") {
    return <Navigate to="/home" replace />;
  }
  return children;
};
