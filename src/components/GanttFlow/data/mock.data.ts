import type { Task } from "../../../types/task";

/**
 * @description Mock data
 */
export const TASK_MOCK_DATA: Task[] = [
  {
    id: "task-1",
    name: "Project Plan Creation",
    startDate: new Date("2025-03-01"),
    endDate: new Date("2025-03-03"),
    progress: 100,
    dependencies: [],
  },
  {
    id: "task-2",
    name: "Requirements Definition",
    startDate: new Date("2025-03-04"),
    endDate: new Date("2025-03-06"),
    progress: 75,
    dependencies: ["task-1"],
  },
  {
    id: "task-3",
    name: "Design",
    startDate: new Date("2025-03-07"),
    endDate: new Date("2025-03-10"),
    progress: 50,
    dependencies: ["task-2"],
  },
  {
    id: "task-4",
    name: "Implementation",
    startDate: new Date("2025-03-11"),
    endDate: new Date("2025-03-20"),
    progress: 25,
    dependencies: ["task-3"],
  },
  {
    id: "task-5",
    name: "Testing",
    startDate: new Date("2025-03-21"),
    endDate: new Date("2025-03-25"),
    progress: 0,
    dependencies: ["task-4"],
  },
  {
    id: "task-6",
    name: "Documentation",
    startDate: new Date("2025-03-07"),
    endDate: new Date("2025-03-10"),
    progress: 40,
    dependencies: ["task-2"],
  },
  {
    id: "task-7",
    name: "User Training",
    startDate: new Date("2025-03-26"),
    endDate: new Date("2025-03-28"),
    progress: 0,
    dependencies: ["task-5"],
  },
  {
    id: "task-8",
    name: "Quality Assurance Review",
    startDate: new Date("2025-03-11"),
    endDate: new Date("2025-03-13"),
    progress: 60,
    dependencies: ["task-3"],
  },
  {
    id: "task-9",
    name: "Market Research",
    startDate: new Date("2025-03-01"),
    endDate: new Date("2025-03-04"),
    progress: 80,
    dependencies: [],
  },
  {
    id: "task-10",
    name: "Competitive Analysis",
    startDate: new Date("2025-03-05"),
    endDate: new Date("2025-03-08"),
    progress: 50,
    dependencies: ["task-9"],
  },
] as const;
