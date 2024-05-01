import { useContext } from "react";

import { CategoryContext } from "@contexts/CategoryContext";
import { UserContext } from "@contexts/UserContext";

import Categories from "@components/Categories";
import Section from "@components/Section";

import UserStories from "./UserStories";

const Home = () => {
  const { user, refreshKey } = useContext(UserContext);
  const { categories, activeCategory } = useContext(CategoryContext);

  if (!activeCategory) {
    return (
      <>
        <Categories />
        {user && (
            <UserStories key={refreshKey} />
        )}
        {categories?.map((category) => (
          <Section key={`${category._id}${refreshKey}`} category={category} />
        ))}
      </>
    );
  }

  return (
    <>
      <Categories />
      <Section key={`${activeCategory._id}${refreshKey}`} category={activeCategory} />;
    </>
  );
};
export default Home;
