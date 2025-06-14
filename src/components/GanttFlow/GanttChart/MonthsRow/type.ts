/**
 * Months Row Component Properties.
 *
 * This type defines the properties for rendering the months row of a Gantt chart.
 * It includes an array of days, a function to convert dates to x-coordinates, and the height of the axis.
 */
export type MonthsRowProps = {
  /**
   * Height of the axis used for displaying the months row.
   */
  axisHeight: number;
  /**
   * An array of Date objects representing each day in the months row.
   */
  days: Date[];
  /**
   * Function to convert a Date object to its x-coordinate on the Gantt chart.
   */
  dateToX: (date: Date) => number;
};

/**
 * Month Group.
 *
 * This type defines a group of months in the Gantt chart.
 */
export type MonthGroup = {
  /**
   * The end date of the month group.
   */
  end: Date;
  /**
   * The key of the month group.
   */
  key: string;
  /**
   * The month of the month group.
   */
  month: string;
  /**
   * The start date of the month group.
   */
  start: Date;
};
