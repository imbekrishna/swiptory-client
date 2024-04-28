import Story from "@components/Story";
import styles from "./styles.module.css";
import api from "@/api/api_instance";
import { useCallback, useEffect, useRef, useState } from "react";

const Section = ({ category }) => {
  const [stories, setStories] = useState([]);

  const firstRef = useRef(true);
  const pageRef = useRef({ currentPage: null, totalPages: null });

  const getStories = useCallback(
    async (page = 1) => {
      try {
        const res = await api.get(
          `/api/story?category=${category._id}&page=${page}`
        );
        const { data, currentPage, totalPages } = res.data;
        setStories((prev) => [...prev, ...data]);
        pageRef.current.currentPage = currentPage;
        pageRef.current.totalPages = totalPages;
      } catch (error) {
        console.log(error);
      }
    },
    [category._id]
  );

  useEffect(() => {
    if (firstRef.current === true) {
      getStories();
      firstRef.current = false;
    }
  }, [getStories]);

  const fetchNextPage = () => {
    const { currentPage, totalPages } = pageRef.current;
    if (currentPage == totalPages) {
      return;
    }
    getStories(+currentPage + 1);
  };

  return (
    <div className={styles.wrapper}>
      <h2>Top stories about {category.name}</h2>
      {stories.length === 0 ? (
        <div className={styles.noStories}>No stories available</div>
      ) : (
        <>
          <div className={styles.storiesWrapper}>
            {stories.map((story) => (
              <Story key={story._id} story={story} />
            ))}
          </div>
          {pageRef.current.currentPage !== pageRef.current.totalPages && (
            <button className="bgPrimary textLight" onClick={fetchNextPage}>
              See all
            </button>
          )}
        </>
      )}
    </div>
  );
};
export default Section;
