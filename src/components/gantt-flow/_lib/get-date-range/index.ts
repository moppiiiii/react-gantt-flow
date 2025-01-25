import { eachDayOfInterval } from "date-fns";

/**
 * minDate から maxDate までを1日刻みで列挙し、Date配列を返すヘルパー関数
 */
export function getDateRange(start: Date, end: Date): Date[] {
  const dateRange = eachDayOfInterval({ start, end });
  return dateRange;
}
