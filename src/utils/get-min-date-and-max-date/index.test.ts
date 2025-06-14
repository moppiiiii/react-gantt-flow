import { describe, it, expect } from "vitest";
import { getMinAndMaxDate } from ".";
import type { Task } from "@/types/task";

describe("getMinAndMaxDate", () => {
  it("should return the correct minDate and maxDate for multiple tasks", () => {
    const tasks: Task[] = [
      {
        id: "task-1",
        name: "task-name-1",
        startDate: new Date("2025-02-01"),
        endDate: new Date("2025-02-10"),
        progress: 50,
        dependencies: [],
        status: "inProgress",
      },
      {
        id: "task-2",
        name: "task-name-2",
        startDate: new Date("2025-01-15"),
        endDate: new Date("2025-02-20"),
        progress: 75,
        dependencies: ["task-1"],
        status: "inProgress",
      },
      {
        id: "task-3",
        name: "task-name-3",
        startDate: new Date("2025-03-05"),
        endDate: new Date("2025-04-10"),
        progress: 20,
        dependencies: ["task-2"],
        status: "inProgress",
      },
    ];

    const { min, max } = getMinAndMaxDate(tasks);

    expect(min).toEqual(new Date("2025-01-15"));
    expect(max).toEqual(new Date("2025-04-10"));
  });

  it("should return the startDate and endDate of the single task", () => {
    const tasks: Task[] = [
      {
        id: "task-4",
        name: "task-name-4",
        startDate: new Date("2025-05-01"),
        endDate: new Date("2025-05-10"),
        progress: 100,
        dependencies: [],
        status: "done",
      },
    ];

    const { min, max } = getMinAndMaxDate(tasks);

    expect(min).toEqual(new Date("2025-05-01"));
    expect(max).toEqual(new Date("2025-05-10"));
  });

  it("should throw an error when the tasks array is empty", () => {
    const tasks: Task[] = [];

    expect(() => getMinAndMaxDate(tasks)).toThrow(
      /Cannot read properties of undefined/,
    );
  });

  it("should return the same date for minDate and maxDate when all tasks have the same dates", () => {
    const tasks: Task[] = [
      {
        id: "task-5",
        name: "task-name-5",
        startDate: new Date("2025-06-01"),
        endDate: new Date("2025-06-10"),
        progress: 30,
        dependencies: [],
        status: "inProgress",
      },
      {
        id: "task-6",
        name: "task-name-6",
        startDate: new Date("2025-06-01"),
        endDate: new Date("2025-06-10"),
        progress: 60,
        dependencies: ["task-5"],
        status: "inProgress",
      },
    ];

    const { min, max } = getMinAndMaxDate(tasks);

    expect(min).toEqual(new Date("2025-06-01"));
    expect(max).toEqual(new Date("2025-06-10"));
  });

  it("should correctly identify minDate and maxDate when some tasks have the same startDate or endDate", () => {
    const tasks: Task[] = [
      {
        id: "task-7",
        name: "task-name-7",
        startDate: new Date("2025-07-01"),
        endDate: new Date("2025-07-15"),
        progress: 40,
        dependencies: [],
        status: "inProgress",
      },
      {
        id: "task-8",
        name: "task-name-8",
        startDate: new Date("2025-07-01"),
        endDate: new Date("2025-07-20"),
        progress: 80,
        dependencies: ["task-7"],
        status: "inProgress",
      },
      {
        id: "task-9",
        name: "task-name-9",
        startDate: new Date("2025-07-10"),
        endDate: new Date("2025-07-20"),
        progress: 60,
        dependencies: ["task-8"],
        status: "inProgress",
      },
    ];

    const { min, max } = getMinAndMaxDate(tasks);

    expect(min).toEqual(new Date("2025-07-01"));
    expect(max).toEqual(new Date("2025-07-20"));
  });

  it("should correctly handle tasks with different time components", () => {
    const tasks: Task[] = [
      {
        id: "task-10",
        name: "task-name-10",
        startDate: new Date("2025-08-01T10:30:00"),
        endDate: new Date("2025-08-10T15:45:00"),
        progress: 90,
        dependencies: [],
        status: "inProgress",
      },
      {
        id: "task-11",
        name: "task-name-11",
        startDate: new Date("2025-08-02T09:15:00"),
        endDate: new Date("2025-08-09T17:00:00"),
        progress: 70,
        dependencies: ["task-10"],
        status: "inProgress",
      },
    ];

    const { min, max } = getMinAndMaxDate(tasks);

    expect(min).toEqual(new Date("2025-08-01T10:30:00"));
    expect(max).toEqual(new Date("2025-08-10T15:45:00"));
  });

  it("should return correct dates when tasks have overlapping date ranges", () => {
    const tasks: Task[] = [
      {
        id: "task-12",
        name: "task-name-12",
        startDate: new Date("2025-09-01"),
        endDate: new Date("2025-09-10"),
        progress: 20,
        dependencies: [],
        status: "inProgress",
      },
      {
        id: "task-13",
        name: "task-name-13",
        startDate: new Date("2025-09-05"),
        endDate: new Date("2025-09-15"),
        progress: 50,
        dependencies: ["task-12"],
        status: "inProgress",
      },
      {
        id: "task-14",
        name: "task-name-14",
        startDate: new Date("2025-09-08"),
        endDate: new Date("2025-09-20"),
        progress: 80,
        dependencies: ["task-13"],
        status: "inProgress",
      },
    ];

    const { min, max } = getMinAndMaxDate(tasks);

    expect(min).toEqual(new Date("2025-09-01"));
    expect(max).toEqual(new Date("2025-09-20"));
  });

  it("should not mutate the original tasks array", () => {
    const tasks: Task[] = [
      {
        id: "task-15",
        name: "task-name-15",
        startDate: new Date("2025-10-01"),
        endDate: new Date("2025-10-10"),
        progress: 10,
        dependencies: [],
        status: "inProgress",
      },
      {
        id: "task-16",
        name: "task-name-16",
        startDate: new Date("2025-10-05"),
        endDate: new Date("2025-10-15"),
        progress: 40,
        dependencies: ["task-15"],
        status: "inProgress",
      },
    ];

    const tasksCopy = JSON.parse(
      JSON.stringify(tasks, (_, value) => {
        if (value instanceof Date) {
          return value.toISOString();
        }
        return value;
      }),
    ).map((task: Task) => ({
      ...task,
      startDate: new Date(task.startDate),
      endDate: new Date(task.endDate),
    }));

    getMinAndMaxDate(tasks);

    expect(tasks).toEqual(tasksCopy);
  });
});
