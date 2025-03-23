import type { Task } from "@/types/task";

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
   * @description Chart minimum date
   */
  chartMinDate: Date;
  /**
   * @description Chart maximum date
   */
  chartMaxDate: Date;
  /**
   * @description On task update
   */
  onTaskUpdate: (
    taskId: string,
    newStart: Date,
    newEnd: Date,
    newProgress?: number,
  ) => void;
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
