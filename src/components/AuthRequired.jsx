import { useContext } from "react";

import { UserContext } from "@contexts/UserContext";
import { Navigate, Outlet } from "react-router-dom";

const AuthRequired = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};
export default AuthRequired;
