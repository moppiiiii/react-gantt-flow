import { useMemo } from "react";

import GridLines from "./_ui/grid-line/GridLine";
import Axis from "./_ui/axis/Axis";
import TaskBars from "./_ui/task-bar/TaskBars";

import { getMinAndMaxDate } from "./_lib/get-min-and-max-date";
import { getDateRange } from "./_lib/get-date-range";
import { startOfDay } from "date-fns";

import type { GanttFlowProps } from "./type";

import {
  GANTT_CHART_DEFAULT_VALUE,
  GANTT_FLOW_DEFAULT_TITLE,
} from "./constants";

const GanttFlow: React.FC<GanttFlowProps> = ({
  tasks,
  width = 800,
  height = 300,
  barHeight = GANTT_CHART_DEFAULT_VALUE.BAR_HEIGHT,
  barGap = GANTT_CHART_DEFAULT_VALUE.BAR_GAP,
  axisHeight = GANTT_CHART_DEFAULT_VALUE.AXIS_HEIGHT,
}) => {
  const normalizedTasks = tasks.map((task) => ({
    ...task,
    start: startOfDay(task.start),
    end: startOfDay(task.end),
  }));
  /**
   * タスク全体の期間の最小開始日と最大終了日を求める
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
   * 日付を X 座標に変換する関数
   * @param date 日付
   * @returns X 座標
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
   * 軸エリアを除いた高さ
   */
  const chartHeight = height - axisHeight;

  /**
   * minDate から maxDate までの「日」ごとの配列を作成
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

      {/* 1日ごとの縦線をグリッドとして描画（背面に配置） */}
      <GridLines
        days={days}
        dateToX={dateToX}
        axisHeight={axisHeight}
        chartHeight={chartHeight}
      />

      {/* 軸や日付ラベルの表示（手前に表示） */}
      <Axis
        days={days}
        chartWidth={width}
        axisHeight={axisHeight}
        dateToX={dateToX}
      />

      {/* タスクバーの描画 */}
      <TaskBars
        tasks={normalizedTasks}
        dateToX={dateToX}
        chartHeight={chartHeight}
        barHeight={barHeight}
        barGap={barGap}
        axisHeight={axisHeight}
      />
    </svg>
  );
};

export default GanttFlow;
