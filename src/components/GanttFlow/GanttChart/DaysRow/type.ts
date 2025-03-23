/**
 * @description Axis props
 */
export type DaysRowProps = {
  /**
   * @description Axis height
   */
  axisHeight: number;
  /**
   * @description Days
   */
  days: Date[];
  /**
   * @description Date to X
   */
  dateToX: (date: Date) => number;
};
