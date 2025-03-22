import { GANTT_CHART_DEFAULT_VALUE } from "../constants";
import type { TodayLineProps } from "./type";

const TodayLine: React.FC<TodayLineProps> = ({
  dateToX,
  axisHeight,
  chartHeight,
}) => {
  const x = dateToX(new Date());

  return (
    <g>
      <line
        x1={x}
        y1={axisHeight}
        x2={x}
        y2={axisHeight + chartHeight}
        stroke="red"
        strokeWidth={GANTT_CHART_DEFAULT_VALUE.GRID_STROKE_WIDTH}
      />

      {/* 中心の赤丸（静止） */}
      <circle cx={x} cy={axisHeight} r={5} fill="red" />

      {/* 波紋用の円（拡大 + フェードアウトするアニメーション） */}
      <circle cx={x} cy={axisHeight} fill="none" stroke="red" strokeWidth={2}>
        <animate
          attributeName="r"
          from="5"
          to="20"
          dur="1.5s"
          begin="0s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          from="1"
          to="0"
          dur="1.5s"
          begin="0s"
          repeatCount="indefinite"
        />
      </circle>
    </g>
  );
};

export default TodayLine;
