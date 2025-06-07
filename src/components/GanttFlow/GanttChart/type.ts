import type { Task } from "@/types/task";

/**
 * @description GanttChart props
 */
export type GanttChartProps = {
  /**
   * @description Tasks
   */
  task: Task[];
  /**
   * @description Disparity display
   *
   * @default false
   */
  disparityDisplay?: boolean;
  /**
   * @description Today's line display
   *
   * @default false
   */
  todaysLineDisplay?: boolean;
};
