import { useState } from "react";
import "./DropArea.css";
const DropArea = ({ onDrop }) => {
  const [showdropArea, setshowDropArea] = useState(false);
  return (
    <div
      onDragEnter={() => setshowDropArea(true)}
      onDragLeave={() => setshowDropArea(false)}
      onDrop={() => {
        onDrop();
        setshowDropArea(false);
      }}
      onDragOver={e => e.preventDefault()}
      className={showdropArea ? "drop_area" : "hide_drop"}
    >
      DropArea
    </div>
  );
};
export default DropArea;
