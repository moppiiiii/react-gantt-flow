import type { Task } from "@/types/task";

/**
 * Disparity Rectangle Component Properties.
 *
 * This type defines the properties for rendering disparity indicators on a Gantt chart,
 * including the tasks to be displayed, a conversion function for dates to x-coordinates,
 * and dimensions for the axis and the bar area.
 */
export type DisparityRectProps = {
  /**
   * Height of the axis where the disparity indicators are rendered.
   */
  axisHeight: number;
  /**
   * Height of the bar area in the Gantt chart where the tasks are displayed.
   */
  barAreaHeight: number;
  /**
   * An array of task objects representing the tasks for which disparities are calculated.
   */
  tasks: Task[];
  /**
   * Function to convert a Date object to its corresponding x-coordinate value.
   */
  dateToX: (date: Date) => number;
};
