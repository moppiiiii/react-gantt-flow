import type { Meta, StoryObj } from "@storybook/react";

import GanttFlow from "./GanttFlow";

import { TASK_MOCK_DATA } from "./data/mock.data";

const meta: Meta<typeof GanttFlow> = {
  title: "Components/GanttFlow",
  component: GanttFlow,
  tags: ["autodocs"],
  parameters: {
    actions: { argTypesRegex: "^on.*" },
  },
  argTypes: {
    onChange: { action: "onChange" },
  },
} satisfies Meta<typeof GanttFlow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    task: TASK_MOCK_DATA,
  },
};

export const TaskListDisplay: Story = {
  args: {
    task: TASK_MOCK_DATA,
    taskListDisplay: true,
  },
};

export const TodaysLineDisplay: Story = {
  args: {
    task: TASK_MOCK_DATA,
    todaysLineDisplay: true,
  },
};

export const DisparityDisplay: Story = {
  args: {
    task: TASK_MOCK_DATA,
    todaysLineDisplay: true,
    disparityDisplay: true,
  },
};

export const AutoLayoutDependencies: Story = {
  args: {
    task: TASK_MOCK_DATA,
    todaysLineDisplay: true,
    disparityDisplay: true,
    autoLayoutDependencies: true,
  },
};
