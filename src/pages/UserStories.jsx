import { useContext } from "react";

import { UserContext } from "@/contexts/UserContext";
import useAPIData from "@/hooks/useAPIData";
import toast from "react-hot-toast";

import SectionData from "@components/Section/SectionData";

const UserStories = () => {
  const { refreshKey } = useContext(UserContext);
  const { loading, error, currentPage, totalPages, fetchNextPage, data, getStories } = useAPIData(
    "/api/user/stories/",
    {},
  );

  const title = "Your stories";

  if (error) {
    toast.error(error.message);
  }
  
  return (
    <SectionData
      key={refreshKey}
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
export default UserStories;
