import { useContext } from "react";

import { SelectContext } from "./Select";

export default function SelectButton({ children }) {
  const { toggle } = useContext(SelectContext);
  return (
    <div className="select-button" onClick={toggle}>
      {children}
    </div>
  );
}
