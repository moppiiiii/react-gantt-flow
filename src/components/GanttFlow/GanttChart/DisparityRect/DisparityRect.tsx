import type { DisparityRectProps } from "./type";
import { GANTT_CHART_DEFAULT_VALUE } from "../constants";

const DisparityRect: React.FC<DisparityRectProps> = ({
  axisHeight,
  barAreaHeight,
  tasks,
  dateToX,
}) => {
  const { GRID_STROKE_WIDTH } = GANTT_CHART_DEFAULT_VALUE;

  const todayX = dateToX(new Date());

  const COLOR_DISPARITY_AHEAD = "#92e896";
  const COLOR_DISPARITY_BEHIND = "#FFD54F";
  const COLOR_DISPARITY_AHEAD_STROKE = "#66BB6A";
  const COLOR_DISPARITY_BEHIND_STROKE = "#fac51b";
  const RECT_STROKE_WIDTH = 3;

  return (
    <g>
      {tasks.map((task, i) => {
        // each task bar rectangle coordinates
        const rowTop = axisHeight + i * barAreaHeight;
        const rectY = rowTop;
        const rectHeight = barAreaHeight - GRID_STROKE_WIDTH;

        // if progress is 0% or 100%, don't draw the disparity rectangle
        if (task.progress === 0 || task.progress === 100) return null;

        // progress position (on the bar)
        const startX = dateToX(new Date(task.startDate));
        const endX = dateToX(new Date(task.endDate)) - RECT_STROKE_WIDTH / 2;
        const width = endX - startX;
        const progressX = startX + (width * task.progress) / 100;

        // distance from TodaysLine
        const rectX = Math.min(todayX, progressX);
        const rectWidth = Math.abs(progressX - todayX);

        if (rectWidth === 0) return null;

        const fillColor =
          progressX > todayX ? COLOR_DISPARITY_AHEAD : COLOR_DISPARITY_BEHIND;
        const strokeColor =
          progressX > todayX
            ? COLOR_DISPARITY_AHEAD_STROKE
            : COLOR_DISPARITY_BEHIND_STROKE;

        return (
          <rect
            key={`inazuma-${task.id}`}
            x={rectX}
            y={rectY}
            width={rectWidth}
            height={rectHeight}
            fill={fillColor}
            opacity={0.5}
            stroke={strokeColor}
            strokeWidth={RECT_STROKE_WIDTH}
          />
        );
      })}
    </g>
  );
};

export default DisparityRect;
