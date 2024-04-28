import Section from "@components/Section";
import Categories from "@components/Categories";
import { CategoryContext } from "@contexts/CategoryContext";
import { useContext } from "react";
import { UserContext } from "@contexts/UserContext";
import UserStories from "./UserStories";

const Home = () => {
  const { user } = useContext(UserContext);
  const { categories, activeCategory } = useContext(CategoryContext);

  if (!activeCategory) {
    return (
      <>
        <Categories />
        {user && <UserStories />}
        {categories?.map((category) => (
          <Section key={category._id} category={category} />
        ))}
      </>
    );
  }

  return (
    <>
      <Categories />
      <Section key={activeCategory._id} category={activeCategory} />;
    </>
  );
};
export default Home;
