import styles from "./styles.module.css";

const Error = () => {
  return (
    <div className={styles.wrapper}>
      <h1>Something went wrong</h1>
      <button
        className="bgPrimary textLight"
        onClick={() => {
          window.location.replace(window.location.origin);
        }}
      >
        Refresh
      </button>
    </div>
  );
};
export default Error;
