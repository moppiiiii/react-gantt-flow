import {
  Suspense,
  lazy,
  memo,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from "react";
import { getNormalizeTaskDate } from "@/utils/get-normalize-task-date";
import type { GanttFlowProps } from "./type";
import styles from "./GanttFlow.module.css";
import TaskList from "./TaskList";
import type { Task } from "@/types/task";

// Lazy load GanttChart to enable code splitting
const GanttChart = lazy(() => import("./GanttChart"));

const GanttFlow: React.FC<GanttFlowProps> = memo(
  ({
    disparityDisplay,
    task,
    taskListDisplay,
    todaysLineDisplay,
    autoLayoutDependencies = false,
    onChange,
  }) => {
    // ① Normalize received tasks
    const normalizedTasks = useMemo(() => getNormalizeTaskDate(task), [task]);

    // ② Internal state shared by TaskList/Chart
    const [tasksState, setTasksState] = useState<Task[]>(normalizedTasks);

    // Synchronize internal state when external prop changes
    useEffect(() => {
      setTasksState(normalizedTasks);
    }, [normalizedTasks]);

    // ③ Receive updates from GanttChart and reflect to internal state and external
    const handleDateChange = useCallback(
      (
        taskId: string,
        newStartDate: Date,
        newEndDate: Date,
        newProgress?: number,
      ) => {
        setTasksState((prev) =>
          prev.map((t) =>
            t.id === taskId
              ? {
                  ...t,
                  startDate: newStartDate,
                  endDate: newEndDate,
                  ...(newProgress !== undefined
                    ? { progress: newProgress }
                    : {}),
                }
              : t,
          ),
        );

        // Call external callback if available
        if (onChange) {
          onChange(taskId, newStartDate, newEndDate, newProgress);
        }
      },
      [onChange],
    );

    return (
      <div className={styles["gantt-flow-container"]}>
        <Suspense fallback={<div>Loading chart...</div>}>
          {taskListDisplay && <TaskList task={tasksState} />}
          <div className={styles["gantt-flow-chart-container"]}>
            <GanttChart
              task={tasksState}
              todaysLineDisplay={todaysLineDisplay}
              disparityDisplay={disparityDisplay}
              autoLayoutDependencies={autoLayoutDependencies}
              onDateChange={handleDateChange}
            />
          </div>
        </Suspense>
      </div>
    );
  },
);

export default memo(GanttFlow);
