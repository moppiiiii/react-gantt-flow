import { useMemo, useState } from "react";
import { addDays } from "date-fns";
import Grid from "./Grid";
import DaysRow from "./DaysRow";
import MonthsRow from "./MonthsRow";
import TaskBars from "./TaskBars";
import TodayLine from "./TodayLine";
import InazumaLine from "./InazumaLine";
import { getMinAndMaxDate } from "@/utils/get-min-date-and-max-date";
import { getDateRange } from "@/utils/get-task-date-range";
import type { GanttChartProps } from "./type";
import {
  GANTT_CHART_DEFAULT_VALUE,
  GANTT_FLOW_DEFAULT_TITLE,
} from "./constants";

const GanttChart: React.FC<GanttChartProps> = ({
  task,
  todaysLineDisplay = false,
}) => {
  const [minDate, maxDate] = useMemo(() => {
    const offset = 7;
    if (task.length === 0) {
      const now = new Date();
      return [addDays(now, -offset), addDays(now, offset)];
    }
    const { min, max } = getMinAndMaxDate(task);
    return [addDays(min, -offset), addDays(max, offset)];
  }, [task]);

  const days = useMemo(
    () => getDateRange(minDate, maxDate),
    [minDate, maxDate],
  );

  // タスク状態を GanttChart 内で管理
  const [tasksState, setTasksState] = useState(task);

  const chartWidth = days.length * GANTT_CHART_DEFAULT_VALUE.GRID_COLUMN_WIDTH;

  const chartHeight =
    tasksState.length * GANTT_CHART_DEFAULT_VALUE.BAR_AREA_HEIGHT +
    GANTT_CHART_DEFAULT_VALUE.AXIS_HEIGHT;

  const dateToX = (date: Date): number => {
    const totalDuration = maxDate.getTime() - minDate.getTime();
    const currentOffset = date.getTime() - minDate.getTime();
    if (totalDuration === 0) return 0;

    return (
      GANTT_CHART_DEFAULT_VALUE.LEFT_MARGIN +
      (currentOffset / totalDuration) *
        (chartWidth - GANTT_CHART_DEFAULT_VALUE.RIGHT_MARGIN)
    );
  };

  function xToDate(x: number): Date {
    const totalDuration = maxDate.getTime() - minDate.getTime();
    if (totalDuration === 0) {
      return new Date(minDate);
    }

    const usableWidth = chartWidth - GANTT_CHART_DEFAULT_VALUE.RIGHT_MARGIN;

    const adjustedX = x - GANTT_CHART_DEFAULT_VALUE.LEFT_MARGIN;

    const fraction = adjustedX / usableWidth;

    const offsetMs = fraction * totalDuration;
    const dateTime = minDate.getTime() + offsetMs;

    return new Date(dateTime);
  }

  return (
    <svg width={chartWidth} height={chartHeight}>
      <title>{GANTT_FLOW_DEFAULT_TITLE}</title>

      <MonthsRow
        days={days}
        dateToX={dateToX}
        axisHeight={GANTT_CHART_DEFAULT_VALUE.AXIS_HEIGHT / 2}
      />

      <DaysRow
        days={days}
        dateToX={dateToX}
        axisHeight={GANTT_CHART_DEFAULT_VALUE.AXIS_HEIGHT / 2}
        yOffset={GANTT_CHART_DEFAULT_VALUE.AXIS_HEIGHT / 2}
      />

      <Grid
        days={days}
        taskCount={tasksState.length}
        dateToX={dateToX}
        axisHeight={GANTT_CHART_DEFAULT_VALUE.AXIS_HEIGHT}
        chartWidth={chartWidth}
        chartHeight={chartHeight}
      />

      <TaskBars
        tasks={tasksState}
        dateToX={dateToX}
        xToDate={xToDate}
        onTaskUpdate={(taskId, newStart, newEnd, newProgress) =>
          setTasksState((prev) =>
            prev.map((t) =>
              t.id === taskId
                ? {
                    ...t,
                    startDate: newStart,
                    endDate: newEnd,
                    ...(newProgress !== undefined
                      ? { progress: newProgress }
                      : {}),
                  }
                : t,
            ),
          )
        }
        chartMinDate={minDate}
        chartMaxDate={maxDate}
      />

      {todaysLineDisplay && (
        <>
          <InazumaLine
            tasks={tasksState}
            dateToX={dateToX}
            axisHeight={GANTT_CHART_DEFAULT_VALUE.AXIS_HEIGHT}
            barAreaHeight={GANTT_CHART_DEFAULT_VALUE.BAR_AREA_HEIGHT}
          />
          <TodayLine
            dateToX={dateToX}
            axisHeight={GANTT_CHART_DEFAULT_VALUE.AXIS_HEIGHT}
            chartHeight={chartHeight}
          />
        </>
      )}
    </svg>
  );
};

export default GanttChart;
