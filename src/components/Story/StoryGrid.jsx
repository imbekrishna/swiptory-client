import { Suspense, lazy } from "react";

import Skeleton from "./Skeleton";
import styles from "./storyGrid.module.css";

const Story = lazy(() => import("./index"));

const StoryGrid = ({ stories, loading, currentPage, totalPages, fetchNextPage }) => {
  return (
    <>
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
          {currentPage !== totalPages && (
            <button className="textLight bgPrimary" disabled={loading} onClick={fetchNextPage}>
              {loading ? <span className={styles.loader}></span> : "See more"}
            </button>
          )}
        </>
      )}
    </>
  );
};
export default StoryGrid;
