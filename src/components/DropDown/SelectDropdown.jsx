import { useContext } from "react";
import { SelectContext } from "./Select";
import PropTypes from "prop-types";

export default function SelectDropdown({ children }) {
  const { open } = useContext(SelectContext);

  return open ? <div className="select-dropdown">{children}</div> : null;
}

SelectDropdown.propTypes = {
  children: PropTypes.node,
};
