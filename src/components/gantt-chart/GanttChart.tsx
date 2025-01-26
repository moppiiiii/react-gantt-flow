import { format } from "date-fns";

const GanttChart = () => {
  return <div>{format(new Date(), "yyyy-MM-dd")}</div>;
};

export default GanttChart;
