/**
 * @description GridLine props
 */
export type GridProps = {
  /**
   * @description Days
   */
  days: Date[];
  /**
   * @description Task Count
   */
  taskCount: number;
  /**
   * @description Date to x
   */
  dateToX: (date: Date) => number;
  /**
   * @description Axis height
   */
  axisHeight: number;
  /**
   * @description Chart width
   */
  chartWidth: number;
  /**
   * @description Chart height
   */
  chartHeight: number;
};
