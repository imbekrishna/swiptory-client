import StoryGrid from "@components/Story/StoryGrid";

import styles from "./styles.module.css";

const SectionData = ({ title, loading, error, currentPage, totalPages, fetchNextPage, data, getStories }) => {
  return (
    <div className={styles.wrapper}>
      <h2>{title}</h2>
      {error ? (
        <button onClick={getStories} className="bgPrimary textLight">
          Try again
        </button>
      ) : (
        <StoryGrid
          currentPage={currentPage}
          fetchNextPage={fetchNextPage}
          loading={loading}
          stories={data}
          totalPages={totalPages}
        />
      )}
    </div>
  );
};
export default SectionData;
