import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import Layout from "./components/Layout";

import Home from "./pages/Home";
import StoryModal from "./components/StoryModal";
import UserStories from "./pages/UserStories";
import UserBookmarks from "./pages/UserBookmarks";
import AuthForm from "./components/AuthForm";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="auth" element={<AuthForm />} />
        <Route path="story/:storyId" element={<StoryModal />} />
        <Route path="stories" element={<UserStories />} />
        <Route path="bookmarks" element={<UserBookmarks />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
export default App;
