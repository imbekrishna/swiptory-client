import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import Layout from "@components/Layout";

import Home from "@pages/Home";
import StoryModal from "@components/StoryModal";
import UserStories from "@pages/UserStories";
import UserBookmarks from "@pages/UserBookmarks";
import Error from "@/components/Error";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="story/:storyId" element={<StoryModal />} />
        {/* TODO: Protect routes */}
        <Route path="user/stories" element={<UserStories />} />
        <Route path="user/bookmarks" element={<UserBookmarks />} />
      </Route>
      <Route path="error" element={<Error />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
export default App;
