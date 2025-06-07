import { useMemo, useState, useCallback, memo } from "react";
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
import type { GanttChartProps } from "./type";
import {
  GANTT_CHART_DEFAULT_VALUE,
  GANTT_FLOW_DEFAULT_TITLE,
} from "./constants";

const GanttChart: React.FC<GanttChartProps> = ({
  task,
  todaysLineDisplay = false,
  disparityDisplay = false,
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

  const [tasksState, setTasksState] = useState(task);

  const chartWidth = useMemo(
    () => days.length * GANTT_CHART_DEFAULT_VALUE.GRID_COLUMN_WIDTH,
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
    (taskId: string, newStart: Date, newEnd: Date, newProgress?: number) => {
      setTasksState((prev) =>
        prev.map((t) =>
          t.id === taskId
            ? {
                ...t,
                startDate: newStart,
                endDate: newEnd,
                ...(newProgress !== undefined ? { progress: newProgress } : {}),
              }
            : t,
        ),
      );
    },
    [],
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
