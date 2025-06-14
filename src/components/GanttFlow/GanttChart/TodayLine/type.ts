/**
 * Today Line Component Properties.
 *
 * This type defines the properties for rendering the current day's vertical marker in the Gantt chart.
 */
export type TodayLineProps = {
  /**
   * The height of the axis associated with the today's line marker.
   */
  axisHeight: number;
  /**
   * The full height of the Gantt chart, used to define the extent of the today's line marker.
   */
  chartHeight: number;
  /**
   * Function to convert a Date object to its corresponding x-coordinate value.
   */
  dateToX: (date: Date) => number;
};
