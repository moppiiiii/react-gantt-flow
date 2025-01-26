import GanttChart from "../gantt-chart/GanttChart";

import "./GanttFlow.css";

const GanttFlow = () => {
  return (
    <div className="gantt-flow-container">
      <div>Grouping Area</div>
      <GanttChart />
    </div>
  );
};

export default GanttFlow;
