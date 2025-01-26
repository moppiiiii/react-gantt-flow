import type { Task } from "../../../types/task";

/**
 * @description Mock data
 */
export const TASK_MOCK_DATA: Task[] = [
  {
    id: "task-1",
    name: "プロジェクト計画の作成",
    startDate: new Date("2025-02-01"),
    endDate: new Date("2025-02-10"),
    progress: 100,
    dependencies: [],
  },
  {
    id: "task-2",
    name: "要件定義",
    startDate: new Date("2025-02-11"),
    endDate: new Date("2025-02-20"),
    progress: 75,
    dependencies: ["task-1"],
  },
  {
    id: "task-3",
    name: "設計",
    startDate: new Date("2025-02-22"),
    endDate: new Date("2025-03-05"),
    progress: 50,
    dependencies: ["task-2"],
  },
  {
    id: "task-4",
    name: "実装",
    startDate: new Date("2025-03-06"),
    endDate: new Date("2025-04-15"),
    progress: 25,
    dependencies: ["task-3"],
  },
  {
    id: "task-5",
    name: "テスト",
    startDate: new Date("2025-04-16"),
    endDate: new Date("2025-05-01"),
    progress: 0,
    dependencies: ["task-4"],
  },
  {
    id: "task-6",
    name: "ドキュメント作成",
    startDate: new Date("2025-03-01"),
    endDate: new Date("2025-03-20"),
    progress: 40,
    dependencies: ["task-2"],
  },
  {
    id: "task-7",
    name: "ユーザートレーニング",
    startDate: new Date("2025-05-02"),
    endDate: new Date("2025-05-15"),
    progress: 0,
    dependencies: ["task-5"],
  },
  {
    id: "task-8",
    name: "品質保証レビュー",
    startDate: new Date("2025-04-01"),
    endDate: new Date("2025-04-10"),
    progress: 60,
    dependencies: ["task-3"],
  },
  {
    id: "task-9",
    name: "市場調査",
    startDate: new Date("2025-02-05"),
    endDate: new Date("2025-02-25"),
    progress: 80,
    dependencies: [],
  },
  {
    id: "task-10",
    name: "競合分析",
    startDate: new Date("2025-02-26"),
    endDate: new Date("2025-03-10"),
    progress: 50,
    dependencies: ["task-9"],
  },
] as const;
