import type { Task } from "../../../../types/task";
import type { TaskBarsPosition } from "../task-bars/type";

/**
 * @description Dependencies arrow props
 */
export type DependenciesArrowProps = {
  /**
   * @description Tasks
   */
  tasks: Task[];
  /**
   * @description Bar positions
   */
  barPositions: TaskBarsPosition[];
};
