import type { TaskBarsProps } from "./type";
import Bar from "./Bar";

function createReversedSPath(
  sx: number,
  sy: number, // 開始座標
  ex: number,
  ey: number, // 終了座標
) {
  return `
    M ${sx} ${sy}
    h 25
    v 25
    H ${ex - 25}
    V ${ey}
    h 25
  `;
}

const TaskBars: React.FC<TaskBarsProps> = ({
  tasks,
  dateToX,
  barHeight,
  barGap,
  axisHeight,
}) => {
  const barPositions = tasks.map((task, i) => {
    const x = dateToX(task.start);
    const width = dateToX(task.end) - dateToX(task.start);
    const y = i * (barHeight + barGap); // 縦に並べるだけの場合

    return { x, y, width };
  });

  return (
    <g transform={`translate(0, ${axisHeight})`}>
      {/* 2) 矢印マーカーの定義 */}
      <defs>
        <marker
          id="arrow"
          markerWidth="10"
          markerHeight="10"
          refX="6" // 線の終点がマーカーのどこにくるか
          refY="3"
          orient="auto"
        >
          {/* 矢印の形状 (三角形) */}
          <path d="M0,0 L0,6 L6,3 z" fill="#000" />
        </marker>
      </defs>

      {barPositions.map((_, index) => (
        <Bar
          key={`bar-${tasks[index].id}`}
          task={tasks[index]}
          index={index}
          dateToX={dateToX}
          barHeight={barHeight}
          barGap={barGap}
        />
      ))}

      {barPositions.map((pos, i) => {
        // 最後のバーは次がないのでスキップ
        if (i === barPositions.length - 1) return null;

        const nextPos = barPositions[i + 1];

        // 始点: 現在のバー右端の中央 (y+barHeight/2)
        const startX = pos.x + pos.width;
        const startY = pos.y + barHeight / 2;

        // 終点: 次のバー左端の中央
        const endX = nextPos.x;
        const endY = nextPos.y + barHeight / 2;

        // 逆S字パス生成 (各ステップ値はお好みで調整)
        const pathD = createReversedSPath(startX, startY, endX, endY);

        return (
          <g key={`arrow-path-${pos.x}-${pos.y}`}>
            <path d={pathD} fill="none" stroke="gray" strokeWidth={1.5} />
            <polygon
              points={`
            ${endX},${endY}
            ${endX - 5},${endY + 5}
            ${endX - 5},${endY - 5}
          `}
              fill="gray"
            />
          </g>
        );
      })}
    </g>
  );
};

export default TaskBars;
