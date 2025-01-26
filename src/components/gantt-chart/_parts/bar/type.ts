import type { Task } from "../../../../types/task";

/**
 * @description Bar props
 */
export type BarProps = {
  /**
   * @description Task
   */
  task: Task;
  /**
   * @description Index
   */
  index: number;
  /**
   * @description Date to x
   */
  dateToX: (date: Date) => number;
};

/**
 * @description Task bars props
 */
export type TaskBarsProps = {
  /**
   * @description Tasks
   */
  tasks: Task[];
  /**
   * @description Date to x
   */
  dateToX: (date: Date) => number;
  /**
   * @description Bar height
   */
  barHeight: number;
  /**
   * @description Bar gap
   */
  barGap: number;
  /**
   * @description Chart height
   */
  chartHeight: number;
  /**
   * @description Axis height
   */
  axisHeight: number;
};
