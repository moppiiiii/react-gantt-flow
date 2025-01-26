import type { AxisProps } from "./type";

const Axis: React.FC<AxisProps> = ({ days, dateToX }) => {
  return (
    <g>
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
