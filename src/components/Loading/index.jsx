import { useContext } from "react";
import styles from "./styles.module.css";
import { ModalContext } from "@contexts/ModalContext";

const Loading = ({ hidden = true }) => {
  const { loadingModal } = useContext(ModalContext);
  return (
    <div
      style={{ display: !hidden || !loadingModal.hidden ? "" : "none" }}
      className={styles.wrapper}
    >
      <span className={styles.loader}></span>
    </div>
  );
};
export default Loading;
