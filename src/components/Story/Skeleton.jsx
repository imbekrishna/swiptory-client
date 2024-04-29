import clsx from "clsx";
import styles from "./styles.module.css";
const Skeleton = () => {
  return (
    <div className={clsx(styles.wrapper, styles.shimmer)}>
      <div>
        <h3>&nbsp;</h3>
        <p>&nbsp;</p>
      </div>
    </div>
  );
};
export default Skeleton;
