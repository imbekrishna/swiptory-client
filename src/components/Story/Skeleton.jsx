import styles from "./styles.module.css";
const Skeleton = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.detail}>
        <h3>&nbsp;</h3>
        <p>&nbsp;</p>
      </div>
    </div>
  );
};
export default Skeleton;
