/**
 * Months Row Component Properties.
 *
 * This type defines the properties for rendering the months row of a Gantt chart.
 * It includes an array of days, a function to convert dates to x-coordinates, and the height of the axis.
 */
export type MonthsRowProps = {
  /**
   * An array of Date objects representing each day in the months row.
   */
  days: Date[];
  /**
   * Function to convert a Date object to its x-coordinate on the Gantt chart.
   */
  dateToX: (date: Date) => number;
  /**
   * Height of the axis used for displaying the months row.
   */
  axisHeight: number;
};
