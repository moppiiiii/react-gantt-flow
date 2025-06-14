import { GANTT_CHART_DEFAULT_VALUE } from "../constants";
import type { TodayLineProps } from "./type";

const TodayLine: React.FC<TodayLineProps> = ({
  axisHeight,
  chartHeight,
  dateToX,
}) => {
  const { GRID_STROKE_WIDTH } = GANTT_CHART_DEFAULT_VALUE;
  const x = dateToX(new Date());

  return (
    <g>
      <line
        x1={x}
        y1={axisHeight}
        x2={x}
        y2={axisHeight + chartHeight}
        stroke="red"
        strokeWidth={GRID_STROKE_WIDTH}
      />

      {/* center red circle (static) */}
      <circle cx={x} cy={axisHeight} r={5} fill="red" />

      {/* ripple circle (expand + fade out animation) */}
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
