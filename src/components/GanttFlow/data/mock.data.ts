import type { Task } from "@/types/task";

const now = new Date();
const MS_PER_DAY = 1000 * 60 * 60 * 24;

const implementationStart = new Date(now.getTime() - 5 * MS_PER_DAY);
const implementationEnd = new Date(
  implementationStart.getTime() + 9 * MS_PER_DAY,
);

/**
 * @description Mock data
 */
export const TASK_MOCK_DATA: Task[] = [
  {
    id: "task-1",
    name: "Project Plan Creation",
    startDate: new Date(implementationStart.getTime() - 15 * MS_PER_DAY),
    endDate: new Date(implementationStart.getTime() - 8 * MS_PER_DAY),
    progress: 100,
    dependencies: [],
    status: "done",
  },
  {
    id: "task-2",
    name: "Requirements Definition",
    startDate: new Date(implementationStart.getTime() - 10 * MS_PER_DAY),
    endDate: new Date(implementationStart.getTime() - 5 * MS_PER_DAY),
    progress: 100,
    dependencies: ["task-1"],
    status: "done",
  },
  {
    id: "task-3",
    name: "Design",
    startDate: new Date(implementationStart.getTime() - 8 * MS_PER_DAY),
    endDate: new Date(implementationStart.getTime() - 1 * MS_PER_DAY),
    progress: 100,
    dependencies: ["task-2"],
    status: "done",
  },
  {
    id: "task-4",
    name: "Implementation",
    startDate: implementationStart,
    endDate: implementationEnd,
    progress: 75,
    dependencies: ["task-3"],
    status: "inProgress",
  },
  {
    id: "task-5",
    name: "Testing",
    startDate: new Date(implementationStart.getTime() + 10 * MS_PER_DAY),
    endDate: new Date(implementationStart.getTime() + 14 * MS_PER_DAY),
    progress: 0,
    dependencies: ["task-4"],
    status: "todo",
  },
  {
    id: "task-6",
    name: "Documentation",
    startDate: new Date(implementationStart.getTime() + 4 * MS_PER_DAY),
    endDate: new Date(implementationStart.getTime() + 9 * MS_PER_DAY),
    progress: 40,
    dependencies: ["task-5"],
    status: "inProgress",
  },
  {
    id: "task-7",
    name: "User Training",
    startDate: new Date(implementationStart.getTime() + 14 * MS_PER_DAY),
    endDate: new Date(implementationStart.getTime() + 17 * MS_PER_DAY),
    progress: 0,
    dependencies: ["task-5"],
    status: "todo",
  },
  {
    id: "task-8",
    name: "Quality Assurance Review",
    startDate: implementationStart,
    endDate: new Date(implementationStart.getTime() + 2 * MS_PER_DAY),
    progress: 60,
    dependencies: ["task-3"],
    status: "inProgress",
  },
  {
    id: "task-9",
    name: "Market Research",
    startDate: new Date(implementationStart.getTime() - 10 * MS_PER_DAY),
    endDate: new Date(implementationStart.getTime() - 7 * MS_PER_DAY),
    progress: 100,
    dependencies: [],
    status: "done",
  },
  {
    id: "task-10",
    name: "Competitive Analysis",
    startDate: new Date(implementationStart.getTime() - 6 * MS_PER_DAY),
    endDate: new Date(implementationStart.getTime() - 3 * MS_PER_DAY),
    progress: 100,
    dependencies: ["task-9"],
    status: "done",
  },
] as const;
