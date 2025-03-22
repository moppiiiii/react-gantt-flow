import type { Task } from "@/types/task";

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
  /**
   * @description X to date
   */
  xToDate: (x: number) => Date;
  /**
   * @description onDateChange
   */
  onDateChange: (taskId: string, newStart: Date, newEnd: Date) => void;
};
