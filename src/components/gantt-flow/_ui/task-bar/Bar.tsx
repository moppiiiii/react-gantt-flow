import type { BarProps } from "./type";

const Bar: React.FC<BarProps> = ({
  task,
  index,
  dateToX,
  barHeight,
  barGap,
}) => {
  const x = dateToX(task.start);
  const width = dateToX(task.end) - x;
  const y = index * (barHeight + barGap);

  return (
    <g>
      <rect
        x={x}
        y={y + 10}
        rx="5"
        ry="5"
        width={width}
        height={barHeight - 20}
        fill="#aeb8c2"
        stroke="none"
        style={{ cursor: "pointer" }}
      />
      <text
        x={x + 10}
        y={y + barHeight / 2}
        dominantBaseline="middle"
        fill="#fff"
        style={{ fontSize: 12, pointerEvents: "none", userSelect: "none" }}
      >
        {task.title}
      </text>
    </g>
  );
};

export default Bar;
