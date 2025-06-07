import type { Task } from "@/types/task";

/**
 * Bar Component Properties.
 *
 * This type defines the properties required by a Gantt chart bar component, including the task details, index, date conversion functions, a date change handler, and chart boundary dates.
 */
export type BarProps = {
  /**
   * The task object containing details for the specific bar in the Gantt chart.
   */
  task: Task;
  /**
   * The zero-based index of the task bar.
   */
  index: number;
  /**
   * Function to convert a Date object to its corresponding x-coordinate value.
   */
  dateToX: (date: Date) => number;
  /**
   * Function to convert an x-coordinate value back into a Date object.
   */
  xToDate: (x: number) => Date;
  /**
   * Callback function invoked when a task's dates or progress is updated, receiving taskId, new start date, new end date, and optionally new progress percentage.
   */
  onDateChange: (
    taskId: string,
    newStart: Date,
    newEnd: Date,
    newProgress?: number,
    shouldNotifyExternal?: boolean,
  ) => void;
  /**
   * The start boundary of the chart's date range.
   */
  chartMinDate: Date;
  /**
   * The end boundary of the chart's date range.
   */
  chartMaxDate: Date;
};
