import type { DisparityRectProps } from "./type";
import { GANTT_CHART_DEFAULT_VALUE } from "../constants";

const DisparityRect: React.FC<DisparityRectProps> = ({
  tasks,
  dateToX,
  axisHeight,
  barAreaHeight,
}) => {
  const todayX = dateToX(new Date());

  const COLOR_DISPARITY_AHEAD = "#92e896";
  const COLOR_DISPARITY_BEHIND = "#FFD54F";
  const COLOR_DISPARITY_AHEAD_STROKE = "#66BB6A";
  const COLOR_DISPARITY_BEHIND_STROKE = "#fac51b";
  const RECT_STROKE_WIDTH = 3;

  return (
    <g>
      {tasks.map((task, i) => {
        // 各タスクバーの矩形座標
        const rowTop = axisHeight + i * barAreaHeight;
        const rectY = rowTop;
        const rectHeight =
          barAreaHeight - GANTT_CHART_DEFAULT_VALUE.GRID_STROKE_WIDTH;

        // 進捗率 100% の場合は稲妻矩形を描画しない
        if (task.progress === 100) return null;

        // 進捗位置（バー上での X）
        const startX = dateToX(new Date(task.startDate));
        const endX = dateToX(new Date(task.endDate)) - RECT_STROKE_WIDTH / 2;
        const width = endX - startX;
        const progressX = startX + (width * task.progress) / 100;

        // TodaysLine との距離
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
