import { Suspense, lazy, memo, useMemo } from "react";
import { getNormalizeTaskDate } from "@/utils/get-normalize-task-date";
import type { GanttFlowProps } from "./type";
import styles from "./GanttFlow.module.css";
import TaskList from "./TaskList";

// Lazy load GanttChart to enable code splitting
const GanttChart = lazy(() => import("./GanttChart"));

const GanttFlow: React.FC<GanttFlowProps> = memo(
  ({
    disparityDisplay,
    task,
    taskListDisplay,
    todaysLineDisplay,
    onChange,
  }) => {
    // Re-run normalization only when task changes
    const normalizedTasks = useMemo(() => getNormalizeTaskDate(task), [task]);

    return (
      <div className={styles["gantt-flow-container"]}>
        <Suspense fallback={<div>Loading chart...</div>}>
          {taskListDisplay && <TaskList task={normalizedTasks} />}
          <div className={styles["gantt-flow-chart-container"]}>
            <GanttChart
              task={normalizedTasks}
              todaysLineDisplay={todaysLineDisplay}
              disparityDisplay={disparityDisplay}
              onDateChange={onChange}
            />
          </div>
        </Suspense>
      </div>
    );
  },
);

export default GanttFlow;
