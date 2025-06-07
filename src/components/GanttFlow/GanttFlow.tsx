import { Suspense, lazy, memo, useMemo } from "react";
import { getNormalizeTaskDate } from "@/utils/get-normalize-task-date";
import type { GanttFlowProps } from "./type";
import styles from "./GanttFlow.module.css";

// Lazy load GanttChart to enable code splitting
const GanttChart = lazy(() => import("./GanttChart"));

const GanttFlow: React.FC<GanttFlowProps> = memo(
  ({
    // groupAreaDisplay = false,
    task,
    todaysLineDisplay = false,
    disparityDisplay = false,
    onChange,
  }) => {
    // Re-run normalization only when task changes
    const normalizedTasks = useMemo(() => getNormalizeTaskDate(task), [task]);

    return (
      <div className={styles["gantt-flow-container"]}>
        {/* {groupAreaDisplay && (
          <div className={styles["task-grouping-area"]}>Grouping Area</div>
        )} */}
        <div className={styles["gantt-flow-chart-container"]}>
          <Suspense fallback={<div>Loading chart...</div>}>
            <GanttChart
              task={normalizedTasks}
              todaysLineDisplay={todaysLineDisplay}
              disparityDisplay={disparityDisplay}
              onDateChange={onChange}
            />
          </Suspense>
        </div>
      </div>
    );
  },
);

export default GanttFlow;
