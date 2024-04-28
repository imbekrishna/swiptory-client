import Section from "@/components/Section";
import Categories from "@components/Categories";
import { CategoryContext } from "@/contexts/CategoryContext";
import { useContext } from "react";

const Home = () => {
  const { categories } = useContext(CategoryContext);

  return (
    <div style={{ fontSize: "2rem" }}>
      <Categories />
      {categories?.map((category) => (
        <Section key={category._id} category={category} />
      ))}
    </div>
  );
};
export default Home;
