/**
 * Grid Component Properties.
 *
 * This type defines the properties for rendering the grid of a Gantt chart.
 * It includes an array of days, the number of tasks, a function to convert dates to x-coordinates,
 * and dimensions for the axis and chart.
 */
export type GridProps = {
  /**
   * An array of Date objects representing the days displayed in the grid.
   */
  days: Date[];
  /**
   * The total number of tasks displayed in the Gantt chart.
   */
  taskCount: number;
  /**
   * Function to convert a Date object to its corresponding x-coordinate value.
   */
  dateToX: (date: Date) => number;
  /**
   * Height of the axis allocated for date labels.
   */
  axisHeight: number;
  /**
   * The full width of the Gantt chart.
   */
  chartWidth: number;
  /**
   * The full height of the Gantt chart.
   */
  chartHeight: number;
};
