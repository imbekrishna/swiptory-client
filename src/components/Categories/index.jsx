import { useContext } from "react";

import clsx from "clsx";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

import { CategoryContext } from "@contexts/CategoryContext";

import Skeleton from "./Skeleton";
import styles from "./styles.module.css";

const Categories = () => {
  const { fetchStatus, categories, activeCategory, setActiveCategory } = useContext(CategoryContext);
  const bgStyle = (imageUrl) => ({
    background: `
    linear-gradient(rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0.4) 100%),
    url(${imageUrl}) center/cover no-repeat`,
  });

  const allImage = "https://images.unsplash.com/photo-1578403881967-084f9885be74?q=80&w=500";

  if (fetchStatus.error) {
    toast.error("Something went wrong. Please refresh.");
    return <Navigate to="error" />;
  }

  return (
    <div className={styles.wrapper}>
      {fetchStatus.loading && (
        <>
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </>
      )}
      {!fetchStatus.loading && (
        <>
          <div
            className={clsx(styles.category, activeCategory === null ? styles.active : "")}
            style={bgStyle(allImage)}
            onClick={() => setActiveCategory(null)}
          >
            All
          </div>
          <>
            {categories?.map((category) => (
              <div
                key={category._id}
                className={clsx(styles.category, category._id === activeCategory?._id ? styles.active : "")}
                style={bgStyle(category.imageUrl)}
                onClick={() => setActiveCategory(category)}
              >
                {category.name}
              </div>
            ))}
          </>
        </>
      )}
    </div>
  );
};
export default Categories;
