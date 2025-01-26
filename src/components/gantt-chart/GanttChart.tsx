import { useMemo } from "react";

import GridLines from "./_parts/grid-line/GridLine";

import { getNormalizeTaskDate } from "./_lib/get-normalize-task-date";
import { getMinAndMaxDate } from "./_lib/get-min-date-and-max-date";
import { getDateRange } from "./_lib/get-task-date-range";

import type { GanttChartProps } from "./type";

import {
  GANTT_CHART_DEFAULT_VALUE,
  GANTT_FLOW_DEFAULT_TITLE,
} from "./constants";

const GanttChart: React.FC<GanttChartProps> = ({
  task,
  width = 800,
  height = 300,
  axisHeight = GANTT_CHART_DEFAULT_VALUE.AXIS_HEIGHT,
}) => {
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
   * @description Date to x
   */
  const dateToX = (date: Date): number => {
    const totalDuration = maxDate.getTime() - minDate.getTime();
    const currentOffset = date.getTime() - minDate.getTime();
    if (totalDuration === 0) return 0;

    return (
      GANTT_CHART_DEFAULT_VALUE.LEFT_MARGIN +
      (currentOffset / totalDuration) *
        (width - GANTT_CHART_DEFAULT_VALUE.RIGHT_MARGIN)
    );
  };

  /**
   * @description Chart height
   */
  const chartHeight = height - axisHeight;

  /**
   * @description Create an array for each “day” from minDate to maxDate
   */
  const days = useMemo(
    () => getDateRange(minDate, maxDate),
    [minDate, maxDate],
  );

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid meet"
    >
      <title>{GANTT_FLOW_DEFAULT_TITLE}</title>

      {/* Grid Lines */}
      <GridLines
        days={days}
        dateToX={dateToX}
        axisHeight={axisHeight}
        chartHeight={chartHeight}
      />
    </svg>
  );
};

export default GanttChart;
