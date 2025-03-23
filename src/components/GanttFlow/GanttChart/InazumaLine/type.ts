import type { Task } from "../../../../types/task";

export type InazumaLineProps = {
  /**
   * @description Tasks
   */
  tasks: Task[];
  /**
   * @description Date to X
   */
  dateToX: (date: Date) => number;
  /**
   * @description Axis height
   */
  axisHeight: number;
  /**
   * @description Bar area height
   */
  barAreaHeight: number;
};
