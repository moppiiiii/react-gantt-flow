import type { BarProgressHandleProps } from "./type";

import styles from "./BarProgressHandle.module.css";

export const BarProgressHandle: React.FC<BarProgressHandleProps> = ({
  progressPoint,
  onMouseDownProgressHandle,
}) => {
  return (
    <polygon
      tabIndex={0}
      className={styles["bar-progress-handle"]}
      points={progressPoint}
      onMouseDown={onMouseDownProgressHandle}
    />
  );
};
