import type { BarDateHandleProps } from "./type";

import styles from "./BarDateHandle.module.css";

const BarDateHandle: React.FC<BarDateHandleProps> = ({
  type,
  x,
  y,
  onMouseDownDateHandle,
}) => {
  return (
    <rect
      tabIndex={0}
      className={styles["bar-date-handle"]}
      x={x}
      y={y}
      width={5}
      height={20}
      ry={2}
      rx={2}
      onMouseDown={(event) => onMouseDownDateHandle(type, event)}
    />
  );
};

export default BarDateHandle;
