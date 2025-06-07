/**
 * Task Object Definition.
 *
 * This type defines a task with key properties including a unique identifier, a descriptive name,
 * start and end dates, a progress percentage (ranging from 0 to 100), and an array of dependency IDs.
 */
export type Task = {
  /**
   * Unique identifier for the task (e.g., "task-001").
   */
  id: string;
  /**
   * Name of the task summarizing the work; for example, "Design Review".
   */
  name: string;
  /**
   * The start date of the task used for scheduling.
   */
  startDate: Date;
  /**
   * The expected end date which helps in deadline management.
   */
  endDate: Date;
  /**
   * Progress of the task expressed as a percentage ranging from 0 to 100.
   */
  progress: number;
  /**
   * Array of task IDs that this task depends on; for example, ["task-002", "task-003"].
   */
  dependencies: string[];
};
