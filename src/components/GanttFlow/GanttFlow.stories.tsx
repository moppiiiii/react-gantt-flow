import type { Meta, StoryObj } from "@storybook/react";

import GanttFlow from "./GanttFlow";

import { TASK_MOCK_DATA } from "./data/mock.data";

const meta: Meta<typeof GanttFlow> = {
  title: "Components/GanttFlow",
  component: GanttFlow,
  tags: ["autodocs"],
  args: {
    task: TASK_MOCK_DATA,
  },
} satisfies Meta<typeof GanttFlow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    task: TASK_MOCK_DATA,
    todaysLineDisplay: true,
  },
};
