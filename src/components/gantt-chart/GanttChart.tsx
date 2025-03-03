import { useMemo } from "react";

import GridLines from "./_parts/grid-line/GridLine";
import Axis from "./_parts/axis/Axis";
import TaskBars from "./_parts/task-bars/TaskBars";

import { getNormalizeTaskDate } from "./_lib/get-normalize-task-date";
import { getMinAndMaxDate } from "./_lib/get-min-date-and-max-date";
import { getDateRange } from "./_lib/get-task-date-range";

import type { GanttChartProps } from "./type";

import {
  GANTT_CHART_DEFAULT_VALUE,
  GANTT_FLOW_DEFAULT_TITLE,
} from "./constants";

const GanttChart: React.FC<GanttChartProps> = ({ task }) => {
  /**
   * @description Normalized tasks
   */
  const normalizedTasks = getNormalizeTaskDate(task);

  /**
   * @description Min and max date
   */
  const [minDate, maxDate] = useMemo(() => {
    if (normalizedTasks.length === 0) {
      const now = new Date();
      return [now, now];
    }
    const { min, max } = getMinAndMaxDate(normalizedTasks);
    return [min, max];
  }, [normalizedTasks]);

  /**
   * @description Create an array for each “day” from minDate to maxDate
   */
  const days = useMemo(
    () => getDateRange(minDate, maxDate),
    [minDate, maxDate],
  );

  /**
   * @description Chart width
   */
  const chartWidth = days.length * GANTT_CHART_DEFAULT_VALUE.GRID_COLUMN_WIDTH;

  /**
   * @description Chart height
   */
  const chartHeight =
    task.length * GANTT_CHART_DEFAULT_VALUE.BAR_AREA_HEIGHT +
    GANTT_CHART_DEFAULT_VALUE.AXIS_HEIGHT;

  /**
   * @description Date to x
   */
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

  /**
   * @description x to date
   * @param x
   * @returns
   */
  function xToDate(x: number): Date {
    const totalDuration = maxDate.getTime() - minDate.getTime();
    if (totalDuration === 0) {
      // if minDate and maxDate are the same, return minDate
      return new Date(minDate);
    }

    // same calculation logic as "dateToX"
    const usableWidth = chartWidth - GANTT_CHART_DEFAULT_VALUE.RIGHT_MARGIN;

    // adjusted x coordinate without left margin
    const adjustedX = x - GANTT_CHART_DEFAULT_VALUE.LEFT_MARGIN;

    // normalize x coordinate to [0, usableWidth] → [0, 1]
    const fraction = adjustedX / usableWidth;

    // if necessary, clamp to prevent dragging outside the range
    // fraction = Math.max(0, Math.min(1, fraction));

    // date time advanced by fraction of total duration
    const offsetMs = fraction * totalDuration;
    const dateTime = minDate.getTime() + offsetMs;

    return new Date(dateTime);
  }

  return (
    <svg width={chartWidth} height={chartHeight}>
      <title>{GANTT_FLOW_DEFAULT_TITLE}</title>

      {/* Axis */}
      <Axis
        days={days}
        dateToX={dateToX}
        axisHeight={GANTT_CHART_DEFAULT_VALUE.AXIS_HEIGHT}
      />

      {/* Grid Lines */}
      <GridLines
        days={days}
        taskCount={task.length}
        dateToX={dateToX}
        axisHeight={GANTT_CHART_DEFAULT_VALUE.AXIS_HEIGHT}
        chartWidth={chartWidth}
        chartHeight={chartHeight}
      />

      {/* Task Bars */}
      <TaskBars
        tasks={normalizedTasks}
        dateToX={dateToX}
        xToDate={xToDate}
        barHeight={50}
        barGap={10}
        chartHeight={chartHeight}
        axisHeight={GANTT_CHART_DEFAULT_VALUE.AXIS_HEIGHT}
      />
    </svg>
  );
};

export default GanttChart;
