import type { Task } from "@/types/task";

/**
 * Task Bars Component Properties.
 *
 * This type defines the properties for rendering a collection of task bars in the Gantt chart.
 * It includes an array of task objects, date conversion functions, chart boundaries, and a callback for task updates.
 */
export type TaskBarsProps = {
  /**
   * An array of task objects conforming to the Task type.
   */
  tasks: Task[];
  /**
   * Function to convert a Date object to its corresponding x-coordinate.
   */
  dateToX: (date: Date) => number;
  /**
   * Function to convert an x-coordinate value back into a Date object.
   */
  xToDate: (x: number) => Date;
  /**
   * The start boundary of the chart's date range.
   */
  chartMinDate: Date;
  /**
   * The end boundary of the chart's date range.
   */
  chartMaxDate: Date;
  /**
   * Callback function invoked when a task is updated. Parameters include taskId, new start date, new end date, and an optional new progress.
   */
  onTaskUpdate: (
    taskId: string,
    newStart: Date,
    newEnd: Date,
    newProgress?: number,
    shouldNotifyExternal?: boolean,
  ) => void;
};

/**
 * Task Bars Position.
 *
 * This type defines the position and dimensions of a task bar within the Gantt chart.
 */
export type TaskBarsPosition = {
  /**
   * The x-coordinate of the task bar.
   */
  x: number;
  /**
   * The y-coordinate of the task bar.
   */
  y: number;
  /**
   * The width of the task bar.
   */
  width: number;
};
