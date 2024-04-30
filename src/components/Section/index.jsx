import useAPIData from "@/hooks/useAPIData";
import toast from "react-hot-toast";

import SectionData from "./SectionData";

const Section = ({ category }) => {
  const { loading, error, currentPage, totalPages, fetchNextPage, data, getStories } = useAPIData("/api/story/", {
    category: category._id,
  });

  const title = `Top stories about ${category.name}`;

  if (error) {
    toast.error(error.message);
    return;
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
export default Section;
