import type { BarProps } from "./type";

import { GANTT_CHART_DEFAULT_VALUE } from "../../constants";

const Bar: React.FC<BarProps> = ({ task, index, dateToX }) => {
  const x = dateToX(task.startDate);
  const width = dateToX(task.endDate) - x;
  const y = index * GANTT_CHART_DEFAULT_VALUE.BAR_HEIGHT;

  return (
    <g>
      <rect
        x={x}
        y={y + 10}
        rx="5"
        ry="5"
        width={width}
        height={GANTT_CHART_DEFAULT_VALUE.BAR_HEIGHT - 20}
        fill="#aeb8c2"
        stroke="none"
        style={{ cursor: "pointer" }}
      />
      <text
        x={x + 10}
        y={y + GANTT_CHART_DEFAULT_VALUE.BAR_HEIGHT / 2}
        dominantBaseline="middle"
        fill="#fff"
        style={{ fontSize: 12, pointerEvents: "none", userSelect: "none" }}
      >
        {task.name}
      </text>
    </g>
  );
};

export default Bar;
