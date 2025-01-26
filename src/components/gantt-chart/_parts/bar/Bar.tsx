import type { BarProps } from "./type";

import { GANTT_CHART_DEFAULT_VALUE } from "../../constants";

const Bar: React.FC<BarProps> = ({ task, index, dateToX }) => {
  const x = dateToX(task.startDate);
  const width = dateToX(task.endDate) - x;
  const y = index * GANTT_CHART_DEFAULT_VALUE.BAR_AREA_HEIGHT;

  const progressWidth = (width * task.progress) / 100;

  return (
    <g>
      <rect
        x={x}
        y={y + GANTT_CHART_DEFAULT_VALUE.BAR_ALIGN_MARGIN}
        rx="5"
        ry="5"
        width={width}
        height={
          GANTT_CHART_DEFAULT_VALUE.BAR_AREA_HEIGHT -
          GANTT_CHART_DEFAULT_VALUE.BAR_ALIGN_MARGIN * 2
        }
        fill="#aeb8c2"
        stroke="none"
        style={{ cursor: "pointer" }}
      />

      {task.progress > 0 && (
        <rect
          x={x}
          y={y + GANTT_CHART_DEFAULT_VALUE.BAR_ALIGN_MARGIN}
          rx="5"
          ry="5"
          width={progressWidth}
          height={
            GANTT_CHART_DEFAULT_VALUE.BAR_AREA_HEIGHT -
            GANTT_CHART_DEFAULT_VALUE.BAR_ALIGN_MARGIN * 2
          }
          fill="#a3a3ff"
          stroke="none"
          style={{ cursor: "pointer" }}
        />
      )}

      <text
        x={x + width / 2}
        // TODO: 1.95 is a magic number, need to fix it
        // Visually displayed in a good position.
        y={y + GANTT_CHART_DEFAULT_VALUE.BAR_AREA_HEIGHT / 1.95}
        dominantBaseline="middle"
        textAnchor="middle"
        fill="#fff"
        style={{
          fontSize: 12,
          pointerEvents: "none",
          userSelect: "none",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {task.name}
      </text>
    </g>
  );
};

export default Bar;
