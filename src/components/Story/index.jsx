import styles from "./styles.module.css";

const Story = ({ story }) => {
  const featureSlide = story?.slides[0];

  const bgStyle = {
    background: `
      linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.9) 0%,
      rgba(0, 0, 0, 0.09) 50%,
      rgba(0, 0, 0, 0.85) 75%
    ),
    url(${featureSlide.imageUrl}) center/cover no-repeat
    `,
  };
  return (
    <div className={styles.wrapper} style={bgStyle}>
      <div className={styles.detail}>
        <h3>{featureSlide.heading}</h3>
        <p>{featureSlide.description}</p>
      </div>
    </div>
  );
};
export default Story;
