import Bar from "./Bar";

import type { TaskBarsProps } from "./type";

import { GANTT_CHART_DEFAULT_VALUE } from "../../constants";

const TaskBars: React.FC<TaskBarsProps> = ({ tasks, dateToX }) => {
  const barPositions = tasks.map((task, i) => {
    const x = dateToX(task.startDate);
    const width = dateToX(task.endDate) - dateToX(task.startDate);
    const y = i * GANTT_CHART_DEFAULT_VALUE.BAR_HEIGHT;

    return { x, y, width };
  });

  return (
    <g transform={`translate(0, ${GANTT_CHART_DEFAULT_VALUE.AXIS_HEIGHT})`}>
      {barPositions.map((_, index) => (
        <Bar
          key={`bar-${tasks[index].id}`}
          task={tasks[index]}
          index={index}
          dateToX={dateToX}
        />
      ))}
    </g>
  );
};

export default TaskBars;
