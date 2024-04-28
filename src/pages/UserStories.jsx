import useAPIData from "@/hooks/useAPIData";
import toast from "react-hot-toast";
import styles from "./styles.module.css";
import StoryGrid from "@components/Story/StoryGrid";

const UserStories = () => {
  const { loading, error, currentPage, totalPages, fetchNextPage, data } =
    useAPIData("/api/user/stories/", {});

  if (error) {
    toast.error(error.message);
    return;
  }
  return (
    <div className={styles.wrapper}>
      <h2>Your stories</h2>
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
export default UserStories;
