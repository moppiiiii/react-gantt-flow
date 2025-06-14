import { memo } from "react";
import Bar from "../Bar";
import DependenciesArrow from "../DependenciesArrow";

import type { TaskBarsPosition, TaskBarsProps } from "./type";

import { GANTT_CHART_DEFAULT_VALUE } from "../constants";

const TaskBars: React.FC<TaskBarsProps> = memo(
  ({ tasks, chartMinDate, chartMaxDate, dateToX, xToDate, onTaskUpdate }) => {
    const barPositions: TaskBarsPosition[] = tasks.map((task, i) => {
      const x = dateToX(task.startDate);
      const width = dateToX(task.endDate) - dateToX(task.startDate);
      const y = i * GANTT_CHART_DEFAULT_VALUE.BAR_AREA_HEIGHT;
      return { x, y, width };
    });

    const handleUpdateTaskDate = (
      taskId: string,
      newStart: Date,
      newEnd: Date,
      newProgress?: number,
      shouldNotifyExternal = true,
    ) => {
      onTaskUpdate(taskId, newStart, newEnd, newProgress, shouldNotifyExternal);
    };

    return (
      <g transform={`translate(0, ${GANTT_CHART_DEFAULT_VALUE.AXIS_HEIGHT})`}>
        <DependenciesArrow tasks={tasks} barPositions={barPositions} />

        {tasks.map((task, index) => (
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
  },
);

export default memo(TaskBars);
