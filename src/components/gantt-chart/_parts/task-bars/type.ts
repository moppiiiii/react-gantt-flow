import type { Task } from "../../../../types/task";

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
   * @description X to date
   */
  xToDate: (x: number) => Date;
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

/**
 * @description Task bars position
 */
export type TaskBarsPosition = {
  /**
   * @description X
   */
  x: number;
  /**
   * @description Y
   */
  y: number;
  /**
   * @description Width
   */
  width: number;
};
