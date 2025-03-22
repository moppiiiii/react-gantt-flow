import { startOfDay } from "date-fns";

import type { Task } from "@/types/task";

/**
 * @description Returns the normalized task date
 * @param task Task
 * @returns Normalized task date
 */
export function getNormalizeTaskDate(task: Task[]): Task[] {
  const normalizedTasks = task.map((task) => ({
    ...task,
    startDate: startOfDay(task.startDate),
    endDate: startOfDay(task.endDate),
  }));

  return normalizedTasks;
}
