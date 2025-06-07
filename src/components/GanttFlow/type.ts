import type { Task } from "../../types/task";

/**
 * GanttFlow Component Properties.
 *
 * This interface defines the properties for the GanttFlow component used to render and manage the Gantt chart.
 * It provides customizable options such as group area display, today's date indicator, and disparity indicators
 * to highlight differences between planned and actual timelines.
 */
export type GanttFlowProps = {
  /**
   * If set to true, displays an additional section to group related tasks or information.
   * This option facilitates category-based organization in the Gantt chart.
   * @default false
   */
  groupAreaDisplay?: boolean;
  /**
   * An array of task objects conforming to the Task type.
   * Each task includes essential details like title, start and end dates, progress, and dependencies.
   */
  task: Task[];
  /**
   * If set to true, displays a vertical line representing the current date.
   * This helps users identify the current day within the timeline.
   * @default false
   */
  todaysLineDisplay?: boolean;
  /**
   * If set to true, displays visual indicators highlighting discrepancies between planned and actual timelines.
   * These indicators may include color cues or markers.
   * @default false
   */
  disparityDisplay?: boolean;
};
