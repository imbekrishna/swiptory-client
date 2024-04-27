import { Outlet } from "react-router-dom";

import NavBar from "./NavBar";
import AuthForm from "./AuthForm";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";

import api from "../api/api_instance";

const Layout = () => {
  useEffect(() => {
    api
      .get("/")
      .then((res) => console.log(res.data))
      .catch(console.error);
  }, []);

  return (
    <>
      <NavBar />
      <main>
        <Outlet />
      </main>
      <AuthForm />
      <Toaster />
    </>
  );
};
export default Layout;
