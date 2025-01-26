import type { Task } from "../../types/task";

/**
 * @description GanttChart props
 */
export type GanttChartProps = {
  /**
   * @description Tasks
   */
  task: Task[];
  /**
   * @description Width
   */
  width?: number;
  /**
   * @description Height
   */
  height?: number;
  /**
   * @description Bar height
   */
  barHeight?: number;
  /**
   * @description Bar gap
   */
  barGap?: number;
  /**
   * @description Axis height
   */
  axisHeight?: number;
};
