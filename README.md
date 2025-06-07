# React Gantt Flow

A lightweight and high-performance **React (TypeScript)** based Gantt chart component.  
It achieves excellent rendering performance with SVG and allows intuitive schedule editing with drag & drop.

---

## ✨ Features

- **Drag & Resize** to modify start/end dates
- Update the progress bar using **slider control**
- Automatic rendering of **dependency arrows**
- Toggle **today's line** and **planned vs actual disparity** display with a single click
- Type-safe **TypeScript** API
- No dependencies except for `react` and `date-fns`

---

## 💿 Installation

```bash
# pnpm
pnpm add @mopex/react-gantt-flow

# npm
npm install @mopex/react-gantt-flow
```

> React 19 or higher is required as a peer dependency.

---

## ⚡ Quick Start

```tsx
import { useState } from "react";
import GanttFlow from "@mopex/react-gantt-flow";

const initialTasks = [
  {
    id: "task-001",
    name: "Design",
    startDate: new Date(2025, 0, 1),
    endDate: new Date(2025, 0, 7),
    progress: 30,
    dependencies: [],
  },
  {
    id: "task-002",
    name: "Implementation",
    startDate: new Date(2025, 0, 8),
    endDate: new Date(2025, 0, 21),
    progress: 0,
    dependencies: ["task-001"],
  },
];

export default function App() {
  const [tasks, setTasks] = useState(initialTasks);

  return (
    <GanttFlow
      task={tasks}
      todaysLineDisplay
      disparityDisplay
      onChange={(id, newStart, newEnd, newProgress) => {
        setTasks((prev) =>
          prev.map((t) =>
            t.id === id
              ? {
                  ...t,
                  startDate: newStart,
                  endDate: newEnd,
                  progress: newProgress ?? t.progress,
                }
              : t,
          ),
        );
      }}
    />
  );
}
```

---

## 📚 API Reference

### `<GanttFlow />` Props

| Name                | Type                                     | Default   | Description                                               |
| ------------------- | ---------------------------------------- | --------- | --------------------------------------------------------- |
| `task`              | `Task[]`                                 | —         | Array of tasks to display                                 |
| `todaysLineDisplay` | `boolean`                                | `false`   | Display a vertical line indicating today                  |
| `disparityDisplay`  | `boolean`                                | `false`   | Render disparity between planned and actual as a rectangle  |
| `onChange`          | `(taskId, newStartDate, newEndDate, newProgress?) => void` | — | Callback invoked when a task is updated                    |

### `Task` Type

```ts
type Task = {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  progress: number; // 0 ~ 100
  dependencies: string[];
};
```

---

## 🛠️ Development

```bash
pnpm install       # Install dependencies
pnpm storybook     # View the UI using Storybook
pnpm build         # Build the library (generate dist)
```

---

## 📄 License

MIT License
