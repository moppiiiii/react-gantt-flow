export type MonthsRowProps = {
  /**
   * @description Days
   */
  days: Date[];
  /**
   * @description Date to X
   */
  dateToX: (date: Date) => number;
  /**
   * @description Axis height
   */
  axisHeight: number;
};
