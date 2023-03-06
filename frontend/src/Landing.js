import { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import { fetchDir } from "./context/AuthProvider";
import UserTable from "./UserTable";

export const Landing = () => {
  const [cookies, setCookie] = useCookies(['my-token']);
  const [directoryListing, setDirectoryListing] = useState([]);

  useEffect(() => {
    fetchDir().then(result => {if(result) {
        setDirectoryListing(result.data);}})
  },[setDirectoryListing]);

  return (
    <>
     <h2>Landing (Protected)</h2>
     <div> Authenticated as {cookies.token}</div>
     <UserTable users={directoryListing}/>
    </>
  );
};

export default Landing;