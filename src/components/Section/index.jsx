import useAPIData from "@/hooks/useAPIData";
import toast from "react-hot-toast";

import StoryGrid from "@components/Story/StoryGrid";

import styles from "./styles.module.css";

const Section = ({ category }) => {
  const { loading, error, currentPage, totalPages, fetchNextPage, data } = useAPIData("/api/story/", {
    category: category._id,
  });

  if (error) {
    toast.error(error.message);
    return;
  }
  return (
    <div className={styles.wrapper}>
      <h2>Top stories about {category.name}</h2>
      <StoryGrid
        currentPage={currentPage}
        fetchNextPage={fetchNextPage}
        loading={loading}
        stories={data}
        totalPages={totalPages}
      />
    </div>
  );
};
export default Section;
