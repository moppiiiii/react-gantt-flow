/**
 * グリッド線のプロパティ
 */
export type GridLineProps = {
  /**
   * 日付の配列
   */
  days: Date[];
  /**
   * 日付をX座標に変換する関数
   */
  dateToX: (date: Date) => number;
  /**
   * 軸の高さ
   */
  axisHeight: number;
  /**
   * チャートの高さ
   */
  chartHeight: number;
};
