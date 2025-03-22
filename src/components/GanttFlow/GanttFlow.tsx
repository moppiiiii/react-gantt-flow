import GanttChart from "./GanttChart";

import type { GanttFlowProps } from "./type";

import styles from "./GanttFlow.module.css";

const GanttFlow: React.FC<GanttFlowProps> = ({
  groupAreaDisplay = false,
  task,
  todaysLineDisplay = false,
}) => {
  return (
    <div className={styles["gantt-flow-container"]}>
      {groupAreaDisplay && (
        <div className={styles["task-grouping-area"]}>Grouping Area</div>
      )}
      <div className={styles["gantt-flow-chart-container"]}>
        <GanttChart task={task} todaysLineDisplay={todaysLineDisplay} />
      </div>
    </div>
  );
};

export default GanttFlow;
