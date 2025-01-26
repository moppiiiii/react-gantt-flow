import { eachDayOfInterval } from "date-fns";

/**
 * @description Returns a date array from start date to end date
 * @param startDate Start Date
 * @param endDate End Date
 * @returns Date array from start date to end date
 */
export function getDateRange(startDate: Date, endDate: Date): Date[] {
  const dateRange = eachDayOfInterval({ start: startDate, end: endDate });
  return dateRange;
}
