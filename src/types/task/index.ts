/**
 * @description Task type
 */
export type Task = {
  /**
   * @description Task ID
   */
  id: string;
  /**
   * @description Task name
   */
  name: string;
  /**
   * @description Task start date
   */
  startDate: Date;
  /**
   * @description Task end date
   */
  endDate: Date;
  /**
   * @description Task progress
   */
  progress: number;
  /**
   * @description Task dependencies
   */
  dependencies: string[];
};
