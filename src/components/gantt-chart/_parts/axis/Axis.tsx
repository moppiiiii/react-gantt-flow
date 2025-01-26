import type { AxisProps } from "./type";

import { GANTT_CHART_DEFAULT_VALUE } from "../../constants";

const Axis: React.FC<AxisProps> = ({ days, dateToX }) => {
  return (
    <g>
      {days.map((day) => {
        const x = dateToX(day);
        const dateString = day.getDate().toString();

        return (
          <g key={day.toISOString()} transform={`translate(${x}, 0)`}>
            <text
              y={GANTT_CHART_DEFAULT_VALUE.AXIS_HEIGHT / 2}
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
