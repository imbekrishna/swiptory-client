import clsx from "clsx";
import styles from "./styles.module.css";

const Skeleton = () => {
  return (
    <div
      className={clsx(styles.category, styles.shimmer)}
      style={{
        background:
          "linear-gradient(rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.1) 50% , rgba(0, 0, 0, 0.4) 100%)",
      }}
    ></div>
  );
};
export default Skeleton;
