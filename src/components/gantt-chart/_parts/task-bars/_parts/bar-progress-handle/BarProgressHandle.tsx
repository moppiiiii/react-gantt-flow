import type { BarProgressHandleProps } from "./type";

import styles from "./BarProgressHandle.module.css";

export const BarProgressHandle: React.FC<BarProgressHandleProps> = ({
  progressPoint,
  onMouseDownProgressHandle,
}) => {
  return (
    <polygon
      className={styles["bar-progress-handle"]}
      points={progressPoint}
      onMouseDown={onMouseDownProgressHandle}
    />
  );
};
