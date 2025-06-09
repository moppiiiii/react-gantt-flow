import type { Task } from "@/types/task";

/**
 * TaskList Component Properties.
 *
 * This type defines the properties for rendering a task list.
 * It includes an array of task objects.
 */
export type TaskListProps = {
  /**
   * An array of task objects conforming to the Task type, representing the tasks displayed in the chart.
   */
  task: Task[];
};
