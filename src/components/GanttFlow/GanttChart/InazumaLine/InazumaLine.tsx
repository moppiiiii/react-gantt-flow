import type { InazumaLineProps } from "./type";

const InazumaLine: React.FC<InazumaLineProps> = ({
  tasks,
  dateToX,
  axisHeight,
  barAreaHeight,
}) => {
  const todayX = dateToX(new Date());

  return (
    <g>
      {tasks.map((task, i) => {
        const baselineX = todayX;
        const baselineY = axisHeight + i * barAreaHeight;
        // 次のグリッド交点
        const nextY =
          axisHeight +
          (i < tasks.length - 1
            ? (i + 1) * barAreaHeight
            : tasks.length * barAreaHeight);
        let progressX: number;
        let progressY: number;
        if (task.progress === 100) {
          progressX = baselineX;
          progressY = baselineY;
        } else {
          const startX = dateToX(new Date(task.startDate));
          const endX = dateToX(new Date(task.endDate));
          const width = endX - startX;
          progressX = startX + width * (task.progress / 100);
          progressY = baselineY + 25;
        }
        const points = `${baselineX},${baselineY} ${progressX},${progressY} ${baselineX},${nextY}`;
        return (
          <polyline
            key={`task-${task.startDate}-${i}`}
            points={points}
            stroke="#454444"
            strokeWidth="1"
            fill="none"
          />
        );
      })}
    </g>
  );
};

export default InazumaLine;
