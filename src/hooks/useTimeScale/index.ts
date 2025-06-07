import { useMemo } from "react";
import { GANTT_CHART_DEFAULT_VALUE } from "@/components/GanttFlow/GanttChart/constants";

/**
 * @description common hook for handling the time scale of the chart
 * @param minDate start date of the display range
 * @param maxDate end date of the display range
 * @param chartWidth total width of the SVG
 */
export const useTimeScale = (
  minDate: Date,
  maxDate: Date,
  chartWidth: number,
) => {
  return useMemo(() => {
    const dateToX = (date: Date): number => {
      const total = maxDate.getTime() - minDate.getTime();
      if (total === 0) return 0;

      const offset = date.getTime() - minDate.getTime();
      return (
        GANTT_CHART_DEFAULT_VALUE.LEFT_MARGIN +
        (offset / total) * (chartWidth - GANTT_CHART_DEFAULT_VALUE.RIGHT_MARGIN)
      );
    };

    const xToDate = (x: number): Date => {
      const total = maxDate.getTime() - minDate.getTime();
      if (total === 0) return new Date(minDate);

      const usable = chartWidth - GANTT_CHART_DEFAULT_VALUE.RIGHT_MARGIN;
      const adjusted = x - GANTT_CHART_DEFAULT_VALUE.LEFT_MARGIN;
      return new Date(minDate.getTime() + (adjusted / usable) * total);
    };

    return { dateToX, xToDate };
  }, [minDate, maxDate, chartWidth]);
};
