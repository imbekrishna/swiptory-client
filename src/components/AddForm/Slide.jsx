import clsx from "clsx";
import PropTypes from "prop-types";
import closeIcon from "../../assets/form_close.svg";
import styles from "./styles.module.css";

const Slide = ({
  children,
  handleClose,
  active = false,
  canClose = false,
  ...restProps
}) => {
  return (
    <div className={clsx(styles.slide, active && styles.active)} {...restProps}>
      {children}
      {canClose && (
        <img
          width="16px"
          height="16px"
          src={closeIcon}
          alt=""
          onClick={(e) => {
            handleClose();
            // Prevents onClick of the parent element element to be triggered
            e.stopPropagation();
          }}
        />
      )}
    </div>
  );
};

Slide.propTypes = {
  children: PropTypes.node,
  handleClose: PropTypes.func,
  canClose: PropTypes.bool,
  active: PropTypes.bool,
};

export default Slide;
