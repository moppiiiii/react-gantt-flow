import GanttChart from "../gantt-chart/GanttChart";

import type { GanttFlowProps } from "./type";

import styles from "./GanttFlow.module.css";

const GanttFlow: React.FC<GanttFlowProps> = ({ task }) => {
  return (
    <div className={styles["gantt-flow-container"]}>
      <div>Grouping Area</div>
      <GanttChart task={task} />
    </div>
  );
};

export default GanttFlow;
