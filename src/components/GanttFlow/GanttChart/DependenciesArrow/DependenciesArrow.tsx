import { getDependenciesArrowPath } from "@/utils/get-dependencies-arrow-path";

import type { DependenciesArrowProps } from "./type";

import { GANTT_CHART_DEFAULT_VALUE } from "../constants";

import styles from "./DependenciesArror.module.css";

const DependenciesArrow: React.FC<DependenciesArrowProps> = ({
  barPositions,
  tasks,
}) => {
  return (
    <>
      {tasks.map((task, i) => {
        if (!task.dependencies || task.dependencies.length === 0) {
          return null;
        }

        return task.dependencies.map((depId) => {
          const depIndex = tasks.findIndex((t) => t.id === depId);
          if (depIndex === -1) return null;

          const depPos = barPositions[depIndex];
          const currentPos = barPositions[i];

          const startX = depPos.x + depPos.width;
          const startY =
            depPos.y + GANTT_CHART_DEFAULT_VALUE.BAR_AREA_HEIGHT / 2;

          const endX = currentPos.x;
          const endY =
            currentPos.y + GANTT_CHART_DEFAULT_VALUE.BAR_AREA_HEIGHT / 2;

          const pathD = getDependenciesArrowPath(startX, startY, endX, endY);

          return (
            <g key={`arrow-${depId}-${task.id}`}>
              <path
                d={pathD}
                className={styles["dependencies-arrow-path"]}
                strokeWidth={GANTT_CHART_DEFAULT_VALUE.BAR_ARROW_STROKE_WIDTH}
              />
              <circle
                className={styles["dependencies-arrow-circle"]}
                cx={endX}
                cy={endY}
                r={5}
              />
            </g>
          );
        });
      })}
    </>
  );
};

export default DependenciesArrow;
