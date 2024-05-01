import { useContext } from "react";

import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

import useAPIData from "@hooks/useAPIData";

import { UserContext } from "@contexts/UserContext";

import SectionData from "@components/Section/SectionData";

import styles from "./userStories.module.css";

const UserStories = () => {
  const { pathname } = useLocation();
  const { refreshKey } = useContext(UserContext);
  const { loading, error, currentPage, totalPages, fetchNextPage, data, getStories } = useAPIData(
    "/api/user/stories/",
    {},
  );

  const title = "Your stories";

  if (error) {
    toast.error(error.message);
  }

  if (!data?.length > 0 && pathname === "/") {
    return;
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
      classNames={pathname === "/" && styles.userStoriesWrapper}
    />
  );
};
export default UserStories;
