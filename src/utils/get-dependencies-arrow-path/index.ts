import { GANTT_CHART_DEFAULT_VALUE } from "@/components/GanttFlow/GanttChart/constants";

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
  const { GRID_COLUMN_WIDTH, BAR_AREA_HEIGHT, GRID_STROKE_WIDTH } =
    GANTT_CHART_DEFAULT_VALUE;

  const intensity = 2;

  const cpOffsetX = (GRID_COLUMN_WIDTH / 2) * intensity;
  const cpOffsetY = (BAR_AREA_HEIGHT / 2) * intensity;

  return `
    M ${sx} ${sy}
    C ${sx + cpOffsetX} ${sy + cpOffsetY},
      ${ex - cpOffsetX} ${ey - cpOffsetY},
      ${ex + GRID_STROKE_WIDTH / 2} ${ey}
  `;
}
