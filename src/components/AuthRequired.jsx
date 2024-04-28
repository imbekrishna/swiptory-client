import { UserContext } from "@/contexts/UserContext";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthRequired = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};
export default AuthRequired;
