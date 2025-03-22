import GanttChart from "./GanttChart";
import { getNormalizeTaskDate } from "@/utils/get-normalize-task-date";
import type { GanttFlowProps } from "./type";
import styles from "./GanttFlow.module.css";

const GanttFlow: React.FC<GanttFlowProps> = ({
  groupAreaDisplay = false,
  task,
  todaysLineDisplay = false,
}) => {
  const normalizedTasks = getNormalizeTaskDate(task);

  return (
    <div className={styles["gantt-flow-container"]}>
      {groupAreaDisplay && (
        <div className={styles["task-grouping-area"]}>Grouping Area</div>
      )}
      <div className={styles["gantt-flow-chart-container"]}>
        <GanttChart
          task={normalizedTasks}
          todaysLineDisplay={todaysLineDisplay}
        />
      </div>
    </div>
  );
};

export default GanttFlow;
