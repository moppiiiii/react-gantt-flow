/**
 * @description Bar date handle props
 */
export type BarDateHandleProps = {
  /**
   * @description Type
   */
  type: "start" | "end";
  /**
   * @description X
   */
  x: number;
  /**
   * @description Y
   */
  y: number;
  /**
   * @description Width
   */
  width: number;
  /**
   * @description onMouseDownDateHandle
   */
  onMouseDownDateHandle: (
    type: "start" | "end",
    event: React.MouseEvent<SVGRectElement>,
  ) => void;
};
