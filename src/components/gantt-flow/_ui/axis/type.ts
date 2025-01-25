/**
 * 軸のプロパティ
 */
export type AxisProps = {
  /**
   * 軸の高さ
   */
  axisHeight: number;
  /**
   * 日付の配列
   */
  days: Date[];
  /**
   * チャートの幅
   */
  chartWidth: number;
  /**
   * 日付をX座標に変換する関数
   */
  dateToX: (date: Date) => number;
};
