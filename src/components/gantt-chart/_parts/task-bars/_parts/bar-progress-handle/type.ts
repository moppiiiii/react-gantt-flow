/**
 * @description Bar progress handle props
 */
export type BarProgressHandleProps = {
  /**
   * @description Progress point
   */
  progressPoint: string;
  /**
   * @description On mouse down
   */
  onMouseDownProgressHandle: (
    event: React.MouseEvent<SVGPolygonElement>,
  ) => void;
};
