import type { GridLineProps } from "./type";

const GridLines: React.FC<GridLineProps> = ({
  days,
  dateToX,
  axisHeight,
  chartHeight,
}) => {
  return (
    <g>
      {days.map((day) => {
        const x = dateToX(day);
        return (
          <line
            key={day.toISOString()}
            x1={x}
            y1={axisHeight}
            x2={x}
            y2={axisHeight + chartHeight}
            stroke="#ccc"
            strokeWidth={1}
            strokeDasharray="2,2"
          />
        );
      })}
    </g>
  );
};

export default GridLines;
