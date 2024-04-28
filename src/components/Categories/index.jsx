import styles from "./styles.module.css";
import { CategoryContext } from "@contexts/CategoryContext";
import { useContext } from "react";
import clsx from "clsx";
import Loading from "@components/Loading";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

const Categories = () => {
  const { fetchStatus, categories, activeCategory, setActiveCategory } =
    useContext(CategoryContext);
  const bgStyle = (imageUrl) => ({
    background: `
    linear-gradient(rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.4) 100%),
    url(${imageUrl}) center/cover no-repeat`,
  });

  const allImage =
    "https://images.unsplash.com/photo-1578403881967-084f9885be74?q=80&w=500";

  if (fetchStatus.Loading) {
    return <Loading hidden={true} />;
  }

  if (fetchStatus.error) {
    toast.error("Something went wrong. Please refresh.");
    return <Navigate to="error" />;
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