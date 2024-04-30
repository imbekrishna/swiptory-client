import { useContext } from "react";

import { SelectContext } from "./Select";

export default function SelectItem({ children, onClick }) {
  const { toggle } = useContext(SelectContext);
  const handleClick = () => {
    onClick();
    toggle();
  };
  return (
    <div onClick={handleClick} className="select-item">
      {children}
    </div>
  );
}
