import { useContext } from "react";

import { ModalContext } from "@contexts/ModalContext";

import Spinner from "./Spinner";
import styles from "./styles.module.css";

const Loading = ({ hidden = true }) => {
  const { loadingModal } = useContext(ModalContext);
  return (
    <div style={{ display: !hidden || !loadingModal.hidden ? "" : "none" }} className={styles.wrapper}>
      <Spinner />
    </div>
  );
};
export default Loading;
