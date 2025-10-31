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
      role="button"
      tabIndex={0}
      aria-label={type === "start" ? "Start date handle" : "End date handle"}
      className={styles["bar-date-handle"]}
      x={x}
      y={y}
      width={5}
      height={20}
      ry={2}
      rx={2}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
        }
      }}
      onMouseDown={(event) => onMouseDownDateHandle(type, event)}
    />
  );
};

export default BarDateHandle;
