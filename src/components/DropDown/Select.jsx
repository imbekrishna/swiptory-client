import { createContext, useState } from "react";
const SelectContext = createContext();
import PropTypes from "prop-types";

export default function Select({ children }) {
  const [open, setOpen] = useState(false);

  function toggle() {
    setOpen((prevOpen) => !prevOpen);
  }

  return (
    <SelectContext.Provider value={{ open, toggle }}>
      <div className="select">{children}</div>
    </SelectContext.Provider>
  );
}

Select.propTypes = {
  children: PropTypes.node,
};

export { SelectContext };
