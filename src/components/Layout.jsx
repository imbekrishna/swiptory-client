import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import NavBar from "@components/NavBar";
import AuthForm from "@components/AuthForm";
import AddForm from "@components/AddForm";
import Loading from "@components/Loading";

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
