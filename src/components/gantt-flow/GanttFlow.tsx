import { format } from "date-fns";

const GanttFlow = () => {
  return <div>{format(new Date(), "yyyy-MM-dd")}</div>;
};

export default GanttFlow;
