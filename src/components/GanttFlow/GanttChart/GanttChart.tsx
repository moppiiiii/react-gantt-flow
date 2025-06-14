import { useMemo, useState, useCallback, memo, useEffect } from "react";
import { useTimeScale } from "@/hooks/useTimeScale";
import { addDays } from "date-fns";
import Grid from "./Grid";
import DaysRow from "./DaysRow";
import MonthsRow from "./MonthsRow";
import TaskBars from "./TaskBars";
import TodayLine from "./TodayLine";
import DisparityRect from "./DisparityRect";
import { getMinAndMaxDate } from "@/utils/get-min-date-and-max-date";
import { getDateRange } from "@/utils/get-task-date-range";
import type { Task } from "@/types/task";
import type { GanttChartProps } from "./type";
import {
  END_DATE_OFFSET,
  GANTT_CHART_DEFAULT_VALUE,
  GANTT_FLOW_DEFAULT_TITLE,
  START_DATE_OFFSET,
} from "./constants";

const calcRange = (tasks: Task[]): [Date, Date] => {
  if (tasks.length === 0) {
    const now = new Date();
    return [addDays(now, -START_DATE_OFFSET), addDays(now, END_DATE_OFFSET)];
  }
  const { min, max } = getMinAndMaxDate(tasks);
  return [addDays(min, -START_DATE_OFFSET), addDays(max, END_DATE_OFFSET)];
};

const GanttChart: React.FC<GanttChartProps> = ({
  disparityDisplay = false,
  task,
  todaysLineDisplay = false,
  onDateChange,
}) => {
  const [tasksState, setTasksState] = useState(task);
  const [range, setRange] = useState(calcRange(task));
  const [minDate, maxDate] = range;

  useEffect(() => {
    setTasksState(task);
    setRange(calcRange(task));
  }, [task]);

  const days = useMemo(
    () => getDateRange(minDate, maxDate),
    [minDate, maxDate],
  );

  const chartWidth = useMemo(
    () =>
      GANTT_CHART_DEFAULT_VALUE.LEFT_MARGIN +
      days.length * GANTT_CHART_DEFAULT_VALUE.GRID_COLUMN_WIDTH,
    [days.length],
  );

  const chartHeight = useMemo(
    () =>
      tasksState.length * GANTT_CHART_DEFAULT_VALUE.BAR_AREA_HEIGHT +
      GANTT_CHART_DEFAULT_VALUE.AXIS_HEIGHT,
    [tasksState.length],
  );

  const { dateToX, xToDate } = useTimeScale(minDate, maxDate, chartWidth);

  const handleTaskUpdate = useCallback(
    (
      taskId: string,
      newStart: Date,
      newEnd: Date,
      newProgress?: number,
      shouldNotifyExternal = true,
    ) => {
      // local state update
      setTasksState((prev) => {
        const updated = prev.map((t) =>
          t.id === taskId
            ? {
                ...t,
                startDate: newStart,
                endDate: newEnd,
                ...(newProgress !== undefined ? { progress: newProgress } : {}),
              }
            : t,
        );

        if (shouldNotifyExternal) {
          setRange(calcRange(updated));
        }
        return updated;
      });

      // notify external (user) only if the flag is enabled
      if (shouldNotifyExternal && onDateChange) {
        onDateChange(taskId, newStart, newEnd, newProgress);
      }
    },
    [onDateChange],
  );

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

      {disparityDisplay && (
        <DisparityRect
          tasks={tasksState}
          dateToX={dateToX}
          axisHeight={GANTT_CHART_DEFAULT_VALUE.AXIS_HEIGHT}
          barAreaHeight={GANTT_CHART_DEFAULT_VALUE.BAR_AREA_HEIGHT}
        />
      )}

      <TaskBars
        tasks={tasksState}
        dateToX={dateToX}
        xToDate={xToDate}
        onTaskUpdate={handleTaskUpdate}
        chartMinDate={minDate}
        chartMaxDate={maxDate}
      />

      {todaysLineDisplay && (
        <TodayLine
          dateToX={dateToX}
          axisHeight={GANTT_CHART_DEFAULT_VALUE.AXIS_HEIGHT}
          chartHeight={chartHeight}
        />
      )}
    </svg>
  );
};

export default memo(GanttChart);
