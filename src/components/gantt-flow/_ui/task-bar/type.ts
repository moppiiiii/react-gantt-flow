import type { Task } from "../../type";

/**
 * タスクバーのプロパティ
 */
export type BarProps = {
  /**
   * タスクデータ
   */
  task: Task;
  /**
   * タスクのインデックス
   */
  index: number;
  /**
   * 日付をX座標に変換する関数
   */
  dateToX: (date: Date) => number;
  /**
   * タスクバーの高さ
   */
  barHeight: number;
  /**
   * タスクバー同士の間隔
   */
  barGap: number;
};

/**
 * タスクバーのプロパティ
 */
export type TaskBarsProps = {
  /**
   * タスクデータ
   */
  tasks: Task[];
  /**
   * 日付をX座標に変換する関数
   */
  dateToX: (date: Date) => number;
  /**
   * タスクバーの高さ
   */
  barHeight: number;
  /**
   * タスクバー同士の間隔
   */
  barGap: number;
  /**
   * チャートの高さ
   */
  chartHeight: number;
  /**
   * 軸の高さ
   */
  axisHeight: number;
};
