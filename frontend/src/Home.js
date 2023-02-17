import { useAuth } from "./context/AuthProvider";
//import { SignIn } from "./SignIn";
export const Home = () => {
  const { value } = useAuth();
  return (
    <>
      <h2>Home (Public)</h2>
      </>
);
};