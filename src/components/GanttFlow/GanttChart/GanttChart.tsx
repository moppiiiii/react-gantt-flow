import { useMemo } from "react";
import Grid from "./Grid";
import Axis from "./Axis";
import TaskBars from "./TaskBars";
import TodayLine from "./TodayLine";
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
    if (task.length === 0) {
      const now = new Date();
      return [now, now];
    }
    const { min, max } = getMinAndMaxDate(task);
    return [min, max];
  }, [task]);

  const days = useMemo(
    () => getDateRange(minDate, maxDate),
    [minDate, maxDate],
  );

  const chartWidth = days.length * GANTT_CHART_DEFAULT_VALUE.GRID_COLUMN_WIDTH;

  const chartHeight =
    task.length * GANTT_CHART_DEFAULT_VALUE.BAR_AREA_HEIGHT +
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

      <Axis
        days={days}
        dateToX={dateToX}
        axisHeight={GANTT_CHART_DEFAULT_VALUE.AXIS_HEIGHT}
      />

      <Grid
        days={days}
        taskCount={task.length}
        dateToX={dateToX}
        axisHeight={GANTT_CHART_DEFAULT_VALUE.AXIS_HEIGHT}
        chartWidth={chartWidth}
        chartHeight={chartHeight}
      />

      <TaskBars
        tasks={task}
        dateToX={dateToX}
        xToDate={xToDate}
        barHeight={50}
        barGap={10}
        chartHeight={chartHeight}
        axisHeight={GANTT_CHART_DEFAULT_VALUE.AXIS_HEIGHT}
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

export default GanttChart;
