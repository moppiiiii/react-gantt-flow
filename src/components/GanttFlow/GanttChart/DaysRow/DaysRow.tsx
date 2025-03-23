import type { DaysRowProps } from "./type";

import styles from "./DaysRow.module.css";

const DaysRow: React.FC<
  DaysRowProps & { axisHeight: number; yOffset?: number }
> = ({ days, dateToX, axisHeight, yOffset = 0 }) => {
  return (
    <g transform={`translate(0, ${yOffset})`}>
      {days.map((day) => {
        const x = dateToX(day);
        const dateString = day.getDate().toString();

        return (
          <g key={day.toISOString()} transform={`translate(${x}, 0)`}>
            <text
              className={styles["axis-text"]}
              y={axisHeight / 2}
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

export default DaysRow;
