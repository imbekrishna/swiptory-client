import useAPIData from "@hooks/useAPIData";
import SectionData from "@components/Section/SectionData";
import toast from "react-hot-toast";

const UserBookmarks = () => {
  const { loading, error, currentPage, totalPages, fetchNextPage, data, getStories } = useAPIData(
    "/api/user/bookmarks/",
    {},
  );

  const title = "Your bookmarks";

  if (error) {
    toast.error(error.message);
  }
  return (
    <SectionData
      title={title}
      data={data}
      error={error}
      loading={loading}
      getStories={getStories}
      totalPages={totalPages}
      currentPage={currentPage}
      fetchNextPage={fetchNextPage}
    />
  );
};
export default UserBookmarks;
