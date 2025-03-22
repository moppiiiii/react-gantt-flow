import { useState } from "react";

import Bar from "../Bar";
import DependenciesArrow from "../DependenciesArrow";

import type { TaskBarsPosition, TaskBarsProps } from "./type";

import { GANTT_CHART_DEFAULT_VALUE } from "../constants";

const TaskBars: React.FC<TaskBarsProps> = ({
  tasks,
  dateToX,
  xToDate,
  chartMinDate,
  chartMaxDate,
}) => {
  const [localTasks, setLocalTasks] = useState(tasks);

  const barPositions: TaskBarsPosition[] = localTasks.map((task, i) => {
    const x = dateToX(task.startDate);
    const width = dateToX(task.endDate) - dateToX(task.startDate);
    const y = i * GANTT_CHART_DEFAULT_VALUE.BAR_AREA_HEIGHT;
    return { x, y, width };
  });

  const handleUpdateTaskDate = (
    taskId: string,
    newStart: Date,
    newEnd: Date,
  ) => {
    setLocalTasks((prevTasks) =>
      prevTasks.map((t) =>
        t.id === taskId ? { ...t, startDate: newStart, endDate: newEnd } : t,
      ),
    );
  };

  return (
    <g transform={`translate(0, ${GANTT_CHART_DEFAULT_VALUE.AXIS_HEIGHT})`}>
      <DependenciesArrow tasks={localTasks} barPositions={barPositions} />

      {localTasks.map((task, index) => (
        <Bar
          key={`bar-${task.id}`}
          task={task}
          index={index}
          dateToX={dateToX}
          xToDate={xToDate}
          onDateChange={handleUpdateTaskDate}
          chartMinDate={chartMinDate}
          chartMaxDate={chartMaxDate}
        />
      ))}
    </g>
  );
};

export default TaskBars;
