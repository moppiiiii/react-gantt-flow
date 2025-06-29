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
  disparityDisplay,
  task,
  todaysLineDisplay,
  autoLayoutDependencies = false,
  onDateChange,
}) => {
  const [tasksState, setTasksState] = useState(task);
  const [range, setRange] = useState(calcRange(task));
  const [minDate, maxDate] = range;

  const { LEFT_MARGIN, GRID_COLUMN_WIDTH, BAR_AREA_HEIGHT, AXIS_HEIGHT } =
    GANTT_CHART_DEFAULT_VALUE;

  useEffect(() => {
    setTasksState(task);
    setRange(calcRange(task));
  }, [task]);

  const days = useMemo(
    () => getDateRange(minDate, maxDate),
    [minDate, maxDate],
  );

  const chartWidth = useMemo(
    () => LEFT_MARGIN + days.length * GRID_COLUMN_WIDTH,
    [days.length, LEFT_MARGIN, GRID_COLUMN_WIDTH],
  );

  const chartHeight = useMemo(
    () => tasksState.length * BAR_AREA_HEIGHT + AXIS_HEIGHT,
    [tasksState.length, BAR_AREA_HEIGHT, AXIS_HEIGHT],
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
        const original = prev.find((t) => t.id === taskId);
        const deltaMs =
          original !== undefined
            ? newStart.getTime() - original.startDate.getTime()
            : 0;

        /**
         * 1) First, recursively collect dependent task IDs
         */
        const dependents: Set<string> = new Set();
        if (autoLayoutDependencies && deltaMs !== 0) {
          const collect = (parentId: string) => {
            for (const t of prev) {
              if (t.dependencies.includes(parentId) && !dependents.has(t.id)) {
                dependents.add(t.id);
                collect(t.id);
              }
            }
          };
          collect(taskId);
        }

        /**
         * 2) Shift dates in bulk including dependent tasks
         */
        const updated = prev.map((t) => {
          // Task that was moved
          if (t.id === taskId) {
            return {
              ...t,
              startDate: newStart,
              endDate: newEnd,
              ...(newProgress !== undefined ? { progress: newProgress } : {}),
            };
          }

          // Dependent task
          if (dependents.has(t.id)) {
            return {
              ...t,
              startDate: new Date(t.startDate.getTime() + deltaMs),
              endDate: new Date(t.endDate.getTime() + deltaMs),
            };
          }

          return t; // No changes for others
        });

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
    [onDateChange, autoLayoutDependencies],
  );

  return (
    <svg width={chartWidth} height={chartHeight}>
      <title>{GANTT_FLOW_DEFAULT_TITLE}</title>

      <MonthsRow days={days} dateToX={dateToX} axisHeight={AXIS_HEIGHT / 2} />

      <DaysRow
        days={days}
        dateToX={dateToX}
        axisHeight={AXIS_HEIGHT / 2}
        yOffset={AXIS_HEIGHT / 2}
      />

      <Grid
        days={days}
        taskCount={tasksState.length}
        dateToX={dateToX}
        axisHeight={AXIS_HEIGHT}
        chartWidth={chartWidth}
        chartHeight={chartHeight}
      />

      {disparityDisplay && (
        <DisparityRect
          tasks={tasksState}
          dateToX={dateToX}
          axisHeight={AXIS_HEIGHT}
          barAreaHeight={BAR_AREA_HEIGHT}
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
          axisHeight={AXIS_HEIGHT}
          chartHeight={chartHeight}
        />
      )}
    </svg>
  );
};

export default memo(GanttChart);
