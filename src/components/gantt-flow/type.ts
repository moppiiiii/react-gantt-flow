/**
 * タスクデータの型
 */
export type Task = {
  id: string;
  title: string;
  start: Date;
  end: Date;
};

export type GanttFlowProps = {
  tasks: Task[];
  /**
   * チャートの描画幅
   */
  width?: number;
  /**
   * チャートの描画高さ
   */
  height?: number;
  /**
   * タスクバーの高さ
   */
  barHeight?: number;
  /**
   * タスクバー同士の間隔
   */
  barGap?: number;
  /**
   * 軸の高さ (日付ラベルなどのエリア)
   */
  axisHeight?: number;
};
