import { useContext } from "react";
import styles from "./styles.module.css";
import { ModalContext } from "@contexts/ModalContext";
import Spinner from "./Spinner";

const Loading = ({ hidden = true }) => {
  const { loadingModal } = useContext(ModalContext);
  return (
    <div
      style={{ display: !hidden || !loadingModal.hidden ? "" : "none" }}
      className={styles.wrapper}
    >
      <Spinner />
    </div>
  );
};
export default Loading;
