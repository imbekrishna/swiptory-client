import Story from "@components/Story";
import styles from "./styles.module.css";

const Section = () => {
  const data = Array.from({ length: 4 }, (i) => i);

  return (
    <div className={styles.wrapper}>
      <h2>Top stories about food</h2>
      <div className={styles.storiesWrapper}>
        {data.map((i) => (
          <Story key={i} />
        ))}
      </div>
    </div>
  );
};
export default Section;
