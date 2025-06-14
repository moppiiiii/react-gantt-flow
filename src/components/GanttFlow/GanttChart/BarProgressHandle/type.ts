/**
 * Bar Progress Handle Component Properties.
 *
 * This type defines the properties for rendering a progress handle on a Gantt chart bar,
 * including the progress point identifier and a mouse down event handler.
 */
export type BarProgressHandleProps = {
  /**
   * A string identifier representing the progress point on the task bar.
   */
  progressPoint: string;
  /**
   * Event handler triggered when the progress handle is pressed, receiving the mouse event.
   */
  onMouseDownProgressHandle: (
    event: React.MouseEvent<SVGPolygonElement>,
  ) => void;
};
