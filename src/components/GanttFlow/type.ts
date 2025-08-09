import type { Task } from "@/types/task";

/**
 * GanttFlow Component Properties.
 *
 * This interface defines the properties for the GanttFlow component used to render and manage the Gantt chart.
 * It provides customizable options such as group area display, today's date indicator, and disparity indicators
 * to highlight differences between planned and actual timelines.
 */
export type GanttFlowProps = {
  /**
   * Drag and drop to move the task, if true, the subsequent tasks with dependencies will be automatically laid out (shifted by the same number of days).
   * @default false
   */
  autoLayoutDependencies?: boolean;
  /**
   * A boolean flag that, if true, activates visual indicators to highlight discrepancies between planned and actual timelines.
   */
  disparityDisplay?: boolean;
  /**
   * An array of task objects conforming to the Task type.
   * Each task includes essential details like title, start and end dates, progress, and dependencies.
   */
  task: Task[];
  /**
   * If set to true, displays an additional section to group related tasks or information.
   * This option facilitates category-based organization in the Gantt chart.
   * @default false
   */
  taskListDisplay?: boolean;
  /**
   * If set to true, displays a vertical line representing the current date.
   * This helps users identify the current day within the timeline.
   * @default false
   */
  todaysLineDisplay?: boolean;
  /**
   * Callback function invoked when a task's dates or progress is updated.
   * Parameters include taskId, new start date, new end date, and an optional new progress.
   */
  onChange?: (
    taskId: string,
    newStartDate: Date,
    newEndDate: Date,
    newProgress?: number,
  ) => void;
};
