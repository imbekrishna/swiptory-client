// import Story from "@components/Story";
import styles from "./styles.module.css";
import api from "@/api/api_instance";
import {
  lazy,
  useCallback,
  useEffect,
  useRef,
  useState,
  Suspense,
} from "react";

import Skeleton from "../Story/Skeleton";
import toast from "react-hot-toast";
import clsx from "clsx";

const Story = lazy(() => import("@components/Story"));

const Section = ({ category }) => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);

  const firstRef = useRef(true);
  const pageRef = useRef({ currentPage: null, totalPages: null });

  const getStories = useCallback(
    async (page = 1) => {
      try {
        setLoading(true);
        const res = await api.get(
          `/api/story?category=${category._id}&page=${page}`
        );
        const { data, currentPage, totalPages } = res.data;
        setStories((prev) => [...prev, ...data]);
        pageRef.current.currentPage = currentPage;
        pageRef.current.totalPages = totalPages;
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      } finally {
        setLoading(false);
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
        <div className={styles.noStories}>
          {loading ? (
            <div className={styles.storiesWrapper}>
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </div>
          ) : (
            "No stories available"
          )}
        </div>
      ) : (
        <>
          <div className={styles.storiesWrapper}>
            {stories.map((story) => (
              <Suspense key={story._id} fallback={<Skeleton />}>
                <Story key={story._id} story={story} />
              </Suspense>
            ))}
          </div>
          {pageRef.current.currentPage !== pageRef.current.totalPages && (
            <button
              className={clsx("textLight", !loading && "bgPrimary")}
              onClick={fetchNextPage}
            >
              {loading ? "..." : "See all"}
            </button>
          )}
        </>
      )}
    </div>
  );
};
export default Section;
