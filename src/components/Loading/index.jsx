import { useContext } from "react";
import styles from "./styles.module.css";
import { ModalContext } from "../../contexts/ModalContext";

const Loading = () => {
  const { loadingModal } = useContext(ModalContext);
  return (
    <div
      style={{ display: loadingModal.hidden ? "none" : "" }}
      className={styles.wrapper}
    >
      <span className={styles.loader}></span>
    </div>
  );
};
export default Loading;
