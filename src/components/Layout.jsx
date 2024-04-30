import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

import AddForm from "@components/AddForm";
import AuthForm from "@components/AuthForm";
import Loading from "@components/Loading";
import NavBar from "@components/NavBar";
import StoryModal from "@components/StoryModal";

const Layout = () => {
  return (
    <>
      <NavBar />
      <main>
        <Outlet />
      </main>
      <Loading />
      <AddForm />
      <StoryModal />
      <AuthForm />
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
