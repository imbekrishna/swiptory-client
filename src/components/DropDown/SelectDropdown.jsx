import { useContext } from "react";

import { SelectContext } from "./Select";

export default function SelectDropdown({ children }) {
  const { open } = useContext(SelectContext);

  return open ? <div className="select-dropdown">{children}</div> : null;
}
