import type { Task } from "../../types/task";

/**
 * @description GanttFlow props
 */
export type GanttFlowProps = {
  /**
   * @description Group area display
   *
   * @default false
   */
  groupAreaDisplay?: boolean;
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
  /**
   * @description Inazuma line display
   *
   * @default false
   */
  inazumaLineDisplay?: boolean;
};
