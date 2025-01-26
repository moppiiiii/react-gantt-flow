import { format } from "date-fns";
import type { GanttChartProps } from "./type";

const GanttChart: React.FC<GanttChartProps> = ({ task }) => {
  return (
    <div>
      {format(new Date(), "yyyy-MM-dd")}
      <div>{JSON.stringify(task)}</div>
    </div>
  );
};

export default GanttChart;
