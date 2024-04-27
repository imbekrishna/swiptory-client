import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import NavBar from "./NavBar";
import AuthForm from "./AuthForm";
import AddForm from "./AddForm";
import Loading from "./Loading";

const Layout = () => {
  return (
    <>
      <NavBar />
      <main>
        <Outlet />
      </main>
      <Loading />
      <AuthForm />
      <AddForm />
      <Toaster
        position="top-right"
        containerStyle={{
          fontSize: "1.5rem",
        }}
      />
    </>
  );
};
export default Layout;
