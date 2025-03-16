import { GANTT_CHART_DEFAULT_VALUE } from "../../constants";

/**
 * @description Get dependencies arrow path
 * @param sx - Start x
 * @param sy - Start y
 * @param ex - End x
 * @param ey - End y
 * @returns Reversed S path
 */
export function getDependenciesArrowPath(
  sx: number,
  sy: number,
  ex: number,
  ey: number,
) {
  return `
      M ${sx} ${sy}
      h ${GANTT_CHART_DEFAULT_VALUE.GRID_COLUMN_WIDTH / 2}
      v ${GANTT_CHART_DEFAULT_VALUE.BAR_AREA_HEIGHT / 2}
      H ${ex - (GANTT_CHART_DEFAULT_VALUE.GRID_COLUMN_WIDTH / 2) + GANTT_CHART_DEFAULT_VALUE.GRID_STROKE_WIDTH / 2}
      V ${ey}
      h ${GANTT_CHART_DEFAULT_VALUE.GRID_COLUMN_WIDTH / 2}
    `;
}
