import { memo } from "react";
import styles from "./MonthsRow.module.css";
import type { MonthsRowProps } from "./type";

const MonthsRow: React.FC<MonthsRowProps> = memo(
  ({ days, dateToX, axisHeight }) => {
    if (!days || days.length === 0) return null;

    // Group days by month
    type MonthGroup = {
      key: string;
      month: string;
      start: Date;
      end: Date;
    };
    const monthGroups: MonthGroup[] = [];

    let currentKey = `${days[0].getFullYear()}-${days[0].getMonth()}`;
    let currentMonthLabel = days[0].toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
    let groupStart = days[0];
    let groupEnd = days[0];

    for (let i = 1; i < days.length; i++) {
      const day = days[i];
      const key = `${day.getFullYear()}-${day.getMonth()}`;
      if (key === currentKey) {
        groupEnd = day;
      } else {
        monthGroups.push({
          key: currentKey,
          month: currentMonthLabel,
          start: groupStart,
          end: groupEnd,
        });
        currentKey = key;
        currentMonthLabel = day.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
        });
        groupStart = day;
        groupEnd = day;
      }
    }
    monthGroups.push({
      key: currentKey,
      month: currentMonthLabel,
      start: groupStart,
      end: groupEnd,
    });

    return (
      <g>
        {monthGroups.map((group) => {
          const xStart = dateToX(group.start);
          return (
            <g key={group.key}>
              <text
                className={styles["months-text"]}
                x={xStart - 5}
                y={axisHeight / 1.3}
                textAnchor="start"
              >
                {group.month}
              </text>
            </g>
          );
        })}
      </g>
    );
  },
);

export default memo(MonthsRow);
