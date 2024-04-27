import styles from "./styles.module.css";
import { CategoryContext } from "../../contexts/CategoryContext";
import { useContext } from "react";
import clsx from "clsx";
import Loading from "../Loading";

const Categories = () => {
  const { categories, activeCategory, setActiveCategory } =
    useContext(CategoryContext);
  const bgStyle = (imageUrl) => ({
    background: `
    linear-gradient(rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.4) 100%),
    url(${imageUrl}) center/cover no-repeat`,
  });

  const allImage =
    "https://images.unsplash.com/photo-1578403881967-084f9885be74?q=80&w=500";

  if (!categories) {
    return <Loading hidden={false} />;
  }

  return (
    <div className={styles.wrapper}>
      <div
        className={clsx(
          styles.category,
          activeCategory === null ? styles.active : ""
        )}
        style={bgStyle(allImage)}
        onClick={() => setActiveCategory(null)}
      >
        All
      </div>
      {categories?.map((category) => (
        <div
          key={category._id}
          className={clsx(
            styles.category,
            category._id === activeCategory?._id ? styles.active : ""
          )}
          style={bgStyle(category.imageUrl)}
          onClick={() => setActiveCategory(category)}
        >
          {category.name}
        </div>
      ))}
    </div>
  );
};
export default Categories;
