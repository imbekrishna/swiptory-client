import { Outlet } from "react-router-dom";

import NavBar from "./NavBar";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  return (
    <>
      <NavBar />
      <main>
        <Outlet />
      </main>
      <Toaster />
    </>
  );
};
export default Layout;
