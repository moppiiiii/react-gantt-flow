import type { Task } from "../../type";

/**
 * タスクの最小開始日と最大終了日を求めるヘルパー関数
 */
export function getMinAndMaxDate(tasks: Task[]): { min: Date; max: Date } {
  const min = tasks.reduce(
    (acc, task) => (task.start < acc ? task.start : acc),
    tasks[0].start,
  );
  const max = tasks.reduce(
    (acc, task) => (task.end > acc ? task.end : acc),
    tasks[0].end,
  );
  return { min, max };
}
