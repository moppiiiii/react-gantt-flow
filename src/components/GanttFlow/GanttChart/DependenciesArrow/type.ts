import type { Task } from "@/types/task";
import type { TaskBarsPosition } from "../TaskBars/type";

/**
 * Dependencies Arrow Component Properties.
 *
 * This type defines the properties for rendering dependency arrows between tasks in a Gantt chart.
 * It includes an array of tasks and their corresponding bar positions to determine arrow placement.
 */
export type DependenciesArrowProps = {
  /**
   * An array of bar positions representing the x and y coordinates and widths for tasks in the chart.
   */
  barPositions: TaskBarsPosition[];
  /**
   * An array of task objects representing the tasks between which dependencies are drawn.
   */
  tasks: Task[];
};
