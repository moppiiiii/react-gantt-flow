import type { TaskListProps } from "./type";
import styles from "./TaskList.module.css";

const TaskList: React.FC<TaskListProps> = ({ task }) => {
  return (
    <div className={styles["task-list-container"]}>
      <div className={styles["task-list-row"]}>
        <div className={styles["task-list-row-item"]}>Name</div>
        <div className={styles["task-list-row-item"]}>From</div>
        <div className={styles["task-list-row-item"]}>To</div>
      </div>
      {task.map((task) => (
        <div className={styles["task-list-row"]} key={task.id}>
          <div className={styles["task-list-row-item"]}>{task.name}</div>
          <div className={styles["task-list-row-item"]}>
            {task.startDate.toLocaleDateString()}
          </div>
          <div className={styles["task-list-row-item"]}>
            {task.endDate.toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
