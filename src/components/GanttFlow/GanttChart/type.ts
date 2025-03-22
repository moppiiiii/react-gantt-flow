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
   * @description Today's line display
   *
   * @default false
   */
  todaysLineDisplay?: boolean;
};
