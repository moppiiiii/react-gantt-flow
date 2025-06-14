/**
 * Bar Date Handle Component Properties.
 *
 * This type defines the properties for rendering a date handle on a Gantt chart bar,
 * including its type, position, dimension, and a mouse down event handler.
 */
export type BarDateHandleProps = {
  /**
   * Indicates whether the handle is for the start or the end of the bar.
   */
  type: "start" | "end";
  /**
   * The width of the handle.
   */
  // width: number;
  /**
   * The x-coordinate position of the handle.
   */
  x: number;
  /**
   * The y-coordinate position of the handle.
   */
  y: number;
  /**
   * Event handler triggered when the date handle is pressed, receiving the type and the mouse event.
   */
  onMouseDownDateHandle: (
    type: "start" | "end",
    event: React.MouseEvent<SVGRectElement>,
  ) => void;
};
