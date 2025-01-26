import { useMemo } from "react";

import GridLines from "./_parts/grid-line/GridLine";
import Axis from "./_parts/axis/Axis";

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
  const chartWidth = days.length * 50;
  console.log(chartWidth);

  /**
   * @description Chart height
   */
  const chartHeight = task.length * 50 - GANTT_CHART_DEFAULT_VALUE.AXIS_HEIGHT;

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
        dateToX={dateToX}
        axisHeight={GANTT_CHART_DEFAULT_VALUE.AXIS_HEIGHT}
        chartHeight={chartHeight}
      />
    </svg>
  );
};

export default GanttChart;
