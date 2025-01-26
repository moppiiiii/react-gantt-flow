import type { AxisProps } from "./type";

import { GANTT_CHART_DEFAULT_VALUE } from "../../constants";

import styles from "./Axis.module.css";

const Axis: React.FC<AxisProps> = ({ days, dateToX }) => {
  return (
    <g>
      {days.map((day) => {
        const x = dateToX(day);
        const dateString = day.getDate().toString();

        return (
          <g key={day.toISOString()} transform={`translate(${x}, 0)`}>
            <text
              className={styles["axis-text"]}
              y={GANTT_CHART_DEFAULT_VALUE.AXIS_HEIGHT / 2}
              textAnchor="middle"
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
