/**
 * @description GridLine props
 */
export type GridLineProps = {
  /**
   * @description Days
   */
  days: Date[];
  /**
   * @description Date to x
   */
  dateToX: (date: Date) => number;
  /**
   * @description Axis height
   */
  axisHeight: number;
  /**
   * @description Chart height
   */
  chartHeight: number;
};
