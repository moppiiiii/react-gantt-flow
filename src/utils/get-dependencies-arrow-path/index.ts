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
  const intensity = 2;

  const cpOffsetX =
    (GANTT_CHART_DEFAULT_VALUE.GRID_COLUMN_WIDTH / 2) * intensity;
  const cpOffsetY = (GANTT_CHART_DEFAULT_VALUE.BAR_AREA_HEIGHT / 2) * intensity;

  return `
    M ${sx} ${sy}
    C ${sx + cpOffsetX} ${sy + cpOffsetY},
      ${ex - cpOffsetX} ${ey - cpOffsetY},
      ${ex + GANTT_CHART_DEFAULT_VALUE.GRID_STROKE_WIDTH / 2} ${ey}
  `;
}
