import type { Task } from "@/types/task";

/**
 * @description Returns the minimum start date and maximum end date of the task
 * @param tasks Task array
 * @returns Minimum start date and maximum end date
 */
export function getMinAndMaxDate(tasks: Task[]): {
  min: Date;
  max: Date;
} {
  const min = tasks.reduce(
    (acc, task) => (task.startDate < acc ? task.startDate : acc),
    tasks[0].startDate,
  );
  const max = tasks.reduce(
    (acc, task) => (task.endDate > acc ? task.endDate : acc),
    tasks[0].endDate,
  );
  return { min, max };
}
