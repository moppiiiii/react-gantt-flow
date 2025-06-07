import { memo } from "react";
import type { GridProps } from "./type";

import { GANTT_CHART_DEFAULT_VALUE } from "../constants";

const Grid: React.FC<GridProps> = memo(
  ({ days, taskCount, dateToX, axisHeight, chartWidth, chartHeight }) => {
    const renderRows = () =>
      Array.from({ length: taskCount }).map((_, index) => {
        const y =
          axisHeight + index * GANTT_CHART_DEFAULT_VALUE.BAR_AREA_HEIGHT;
        const rowHeight = GANTT_CHART_DEFAULT_VALUE.BAR_AREA_HEIGHT;
        return (
          <rect
            key={`row-${y}`}
            x={0}
            y={y}
            width={chartWidth}
            height={rowHeight}
            fill="white"
          />
        );
      });

    const renderWeekendColumns = () =>
      days.map((day, index) => {
        const dayOfWeek = day.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) return null;

        const x = dateToX(day);
        const nextDay = days[index + 1];
        const rectWidth = nextDay ? dateToX(nextDay) - x : 10;
        return (
          <rect
            key={`weekend-${day.toISOString()}`}
            x={x}
            y={axisHeight}
            width={rectWidth}
            height={chartHeight}
            fill="#f7f7f7"
          />
        );
      });

    const renderVerticalLines = () =>
      days.map((day) => {
        const x = dateToX(day);
        return (
          <line
            key={day.toISOString()}
            x1={x}
            y1={axisHeight}
            x2={x}
            y2={axisHeight + chartHeight}
            stroke="#ededed"
            strokeWidth={GANTT_CHART_DEFAULT_VALUE.GRID_STROKE_WIDTH}
          />
        );
      });

    const renderHorizontalLines = () =>
      Array.from({ length: taskCount + 1 }).map((_, index) => {
        const y =
          axisHeight + index * GANTT_CHART_DEFAULT_VALUE.BAR_AREA_HEIGHT;
        return (
          <line
            key={`hline-${y}`}
            x1={0}
            y1={y}
            x2={chartWidth}
            y2={y}
            stroke="#ededed"
            strokeWidth={GANTT_CHART_DEFAULT_VALUE.GRID_STROKE_WIDTH}
          />
        );
      });

    return (
      <g>
        {renderRows()}
        {renderWeekendColumns()}
        {renderVerticalLines()}
        {renderHorizontalLines()}
      </g>
    );
  },
);

export default memo(Grid);
