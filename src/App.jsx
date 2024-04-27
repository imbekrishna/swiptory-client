import { Route, Routes } from "react-router-dom";
import "./App.css";

import Layout from "./components/Layout";

import Home from "./pages/Home";
import UserStories from "./pages/UserStories";
import UserBookmarks from "./pages/UserBookmarks";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="stories" element={<UserStories />} />
        <Route path="bookmarks" element={<UserBookmarks />} />
      </Route>
    </Routes>
  );
};
export default App;
