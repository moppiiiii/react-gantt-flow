import type { Meta, StoryObj } from "@storybook/react";

import GanttFlow from "./GanttFlow";

const meta: Meta<typeof GanttFlow> = {
  title: "Components/GanttFlow",
  component: GanttFlow,
  tags: ["autodocs"],
} satisfies Meta<typeof GanttFlow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
