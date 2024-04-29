import clsx from "clsx";
import styles from "./styles.module.css";

const Skeleton = () => {
  return <div className={clsx(styles.category, styles.shimmer)}></div>;
};
export default Skeleton;
