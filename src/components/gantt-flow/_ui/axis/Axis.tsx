import type { AxisProps } from "./type";

const Axis: React.FC<AxisProps> = ({ days, chartWidth, dateToX }) => {
  return (
    <g>
      <line
        x1={0}
        y1={0}
        x2={chartWidth}
        y2={0}
        stroke="#000"
        strokeWidth={1}
      />

      {days.map((day) => {
        const x = dateToX(day);
        const dateString = day.getDate().toString();

        return (
          <g key={day.toISOString()} transform={`translate(${x}, 0)`}>
            <text
              y={20}
              textAnchor="middle"
              style={{ fontSize: 10, userSelect: "none" }}
            >
              {dateString}
            </text>
          </g>
        );
      })}
    </g>
  );
};

export default Axis;
