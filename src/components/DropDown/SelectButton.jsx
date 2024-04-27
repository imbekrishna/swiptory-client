import { useContext } from "react";
import { SelectContext } from "./Select";
import PropTypes from "prop-types";

export default function SelectButton({ children }) {
  const { toggle } = useContext(SelectContext);
  return (
    <div className="select-button" onClick={toggle}>
      {children}
    </div>
  );
}

SelectButton.propTypes = {
  children: PropTypes.node,
};
