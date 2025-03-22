import type { Task } from "../../../types/task";

/**
 * @description Mock data
 */
export const TASK_MOCK_DATA: Task[] = [
  {
    id: "task-1",
    name: "プロジェクト計画の作成",
    startDate: new Date("2025-03-01"),
    endDate: new Date("2025-03-03"),
    progress: 100,
    dependencies: [],
  },
  {
    id: "task-2",
    name: "要件定義",
    startDate: new Date("2025-03-04"),
    endDate: new Date("2025-03-06"),
    progress: 75,
    dependencies: ["task-1"],
  },
  {
    id: "task-3",
    name: "設計",
    startDate: new Date("2025-03-07"),
    endDate: new Date("2025-03-10"),
    progress: 50,
    dependencies: ["task-2"],
  },
  {
    id: "task-4",
    name: "実装",
    startDate: new Date("2025-03-11"),
    endDate: new Date("2025-03-20"),
    progress: 25,
    dependencies: ["task-3"],
  },
  {
    id: "task-5",
    name: "テスト",
    startDate: new Date("2025-03-21"),
    endDate: new Date("2025-03-25"),
    progress: 0,
    dependencies: ["task-4"],
  },
  {
    id: "task-6",
    name: "ドキュメント作成",
    startDate: new Date("2025-03-07"),
    endDate: new Date("2025-03-10"),
    progress: 40,
    dependencies: ["task-2"],
  },
  {
    id: "task-7",
    name: "ユーザートレーニング",
    startDate: new Date("2025-03-26"),
    endDate: new Date("2025-03-28"),
    progress: 0,
    dependencies: ["task-5"],
  },
  {
    id: "task-8",
    name: "品質保証レビュー",
    startDate: new Date("2025-03-11"),
    endDate: new Date("2025-03-13"),
    progress: 60,
    dependencies: ["task-3"],
  },
  {
    id: "task-9",
    name: "市場調査",
    startDate: new Date("2025-03-01"),
    endDate: new Date("2025-03-04"),
    progress: 80,
    dependencies: [],
  },
  {
    id: "task-10",
    name: "競合分析",
    startDate: new Date("2025-03-05"),
    endDate: new Date("2025-03-08"),
    progress: 50,
    dependencies: ["task-9"],
  },
] as const;
