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
   * @description Inazuma line display
   *
   * @default false
   */
  inazumaLineDisplay?: boolean;
  /**
   * @description Today's line display
   *
   * @default false
   */
  todaysLineDisplay?: boolean;
};
