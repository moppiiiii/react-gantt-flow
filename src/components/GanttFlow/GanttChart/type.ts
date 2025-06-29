import type { Task } from "@/types/task";

/**
 * GanttChart Component Properties.
 *
 * This type defines the properties for rendering a Gantt chart.
 * It includes an array of task objects along with settings for disparity display
 * and displaying today's date marker.
 */
export type GanttChartProps = {
  /**
   * If true, enables automatic layout for dependent tasks.
   * @default false
   */
  autoLayoutDependencies?: boolean;
  /**
   * A boolean flag that, if true, activates visual indicators to highlight discrepancies between planned and actual timelines.
   * @default false
   */
  disparityDisplay?: boolean;
  /**
   * An array of task objects conforming to the Task type, representing the tasks displayed in the chart.
   */
  task: Task[];
  /**
   * A boolean flag that, if true, displays a vertical marker denoting today's date on the Gantt chart.
   * @default false
   */
  todaysLineDisplay?: boolean;
  /**
   * Callback function invoked when a task's dates or progress is updated.
   * Parameters include taskId, new start date, new end date, and an optional new progress.
   */
  onDateChange?: (
    taskId: string,
    newStartDate: Date,
    newEndDate: Date,
    newProgress?: number,
  ) => void;
};
