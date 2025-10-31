import type { BarProgressHandleProps } from "./type";

import styles from "./BarProgressHandle.module.css";

const BarProgressHandle: React.FC<BarProgressHandleProps> = ({
  progressPoint,
  onMouseDownProgressHandle,
}) => {
  return (
    <polygon
      role="button"
      tabIndex={0}
      aria-label="Progress handle"
      className={styles["bar-progress-handle"]}
      points={progressPoint}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
        }
      }}
      onMouseDown={onMouseDownProgressHandle}
    />
  );
};

export default BarProgressHandle;
