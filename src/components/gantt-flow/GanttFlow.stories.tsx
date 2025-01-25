import type { Meta, StoryObj } from "@storybook/react";

import GanttFlow from "./GanttFlow";
import type { Task } from "./type";

const meta: Meta<typeof GanttFlow> = {
  title: "Components/GanttFlow",
  component: GanttFlow,
  tags: ["autodocs"],
} satisfies Meta<typeof GanttFlow>;

export default meta;
type Story = StoryObj<typeof meta>;

const tasks: Task[] = [
  {
    id: "1",
    title: "Task A",
    start: new Date("2025-01-01"),
    end: new Date("2025-01-05"),
  },
  {
    id: "2",
    title: "Task B",
    start: new Date("2025-01-03"),
    end: new Date("2025-01-10"),
  },
  {
    id: "3",
    title: "Task C",
    start: new Date("2025-01-09"),
    end: new Date("2025-01-15"),
  },
];

export const Default: Story = {
  args: {
    tasks,
  },
};
