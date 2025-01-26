import type { GridLineProps } from "./type";

import { GANTT_CHART_DEFAULT_VALUE } from "../../constants";

const GridLines: React.FC<GridLineProps> = ({
  days,
  taskCount,
  dateToX,
  axisHeight,
  chartWidth,
  chartHeight,
}) => {
  return (
    <g>
      {Array.from({ length: taskCount }).map((_, index) => {
        const y =
          axisHeight + index * GANTT_CHART_DEFAULT_VALUE.BAR_AREA_HEIGHT;
        const rowHeight = GANTT_CHART_DEFAULT_VALUE.BAR_AREA_HEIGHT;

        const fillColor = index % 2 === 0 ? "#f5f5f5" : "white";

        return (
          <rect
            key={`row-${y}`}
            x={0}
            y={y}
            width={chartWidth}
            height={rowHeight}
            fill={fillColor}
          />
        );
      })}

      {days.map((day) => {
        const x = dateToX(day);
        return (
          <line
            key={day.toISOString()}
            x1={x}
            y1={axisHeight}
            x2={x}
            y2={axisHeight + chartHeight}
            stroke="#e6e5e3"
            strokeWidth={GANTT_CHART_DEFAULT_VALUE.GRID_STROKE_WIDTH}
          />
        );
      })}
    </g>
  );
};

export default GridLines;
