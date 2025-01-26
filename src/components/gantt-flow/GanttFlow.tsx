import GanttChart from "../gantt-chart/GanttChart";

import type { GanttFlowProps } from "./type";

import styles from "./GanttFlow.module.css";

const GanttFlow: React.FC<GanttFlowProps> = ({ task }) => {
  return (
    <div className={styles["gantt-flow-container"]}>
      <div className={styles["task-grouping-area"]}>Grouping Area</div>
      <div className={styles["gantt-flow-chart-container"]}>
        <GanttChart task={task} />
      </div>
    </div>
  );
};

export default GanttFlow;
