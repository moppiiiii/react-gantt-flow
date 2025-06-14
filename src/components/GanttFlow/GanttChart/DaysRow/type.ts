/**
 * Days Row Component Properties.
 *
 * This type defines the properties for rendering the days row (axis) in the Gantt chart.
 */
export type DaysRowProps = {
  /**
   * The height of the axis displaying day labels.
   */
  axisHeight: number;
  /**
   * An array of Date objects representing the days shown on the axis.
   */
  days: Date[];
  /**
   * The y-offset of the days row.
   */
  yOffset?: number;
  /**
   * Function to convert a Date object to its x-coordinate on the chart.
   */
  dateToX: (date: Date) => number;
};
