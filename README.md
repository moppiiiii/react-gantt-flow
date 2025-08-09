# React Gantt Flow

<a id="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<br />
<div align="center">
  <a href="https://github.com/moppiiiii/react-gantt-flow">
    <img src="images/react-gantt-flow.svg" alt="Logo" width="150" height="150">
  </a>

  <h3 align="center">React Gantt Flow</h3>

  <div>
    <p>A lightweight and high-performance React (TypeScript) based Gantt chart component.</p>
    <p>It achieves excellent rendering performance with SVG and allows intuitive schedule editing with drag & drop.</p>
    <br />
    <a href="https://main--67923016a18edbfb58483060.chromatic.com">View Demo</a>
    <!-- &middot;
    <a href="https://github.com/othneildrew/Best-README-Template/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    &middot;
    <a href="https://github.com/othneildrew/Best-README-Template/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a> -->
  </div>
</div>

## About The Project

### 🔧 Built With

[![React][React.js]][React-url]

### ✨ Features

- **Drag & Resize** to modify start/end dates
- Update the progress bar using **slider control**
- Automatic rendering of **dependency arrows**
- Toggle **today's line** and **planned vs actual disparity** display with a single click
- Type-safe **TypeScript** API
- No dependencies except for `react` and `date-fns`

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started

### 💿 Installation

```bash
# pnpm
pnpm add @mopex/react-gantt-flow

# npm
npm install @mopex/react-gantt-flow
```

> React 19 or higher is required as a peer dependency.

### ⚡ Quick Start

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

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## API Reference

### 📚 `<GanttFlow />` Props

| Name                | Type                                     | Default   | Description                                               |
| ------------------- | ---------------------------------------- | --------- | --------------------------------------------------------- |
| `task`              | `Task[]`                                 | —         | Array of tasks to display                                 |
| `todaysLineDisplay` | `boolean`                                | `false`   | Display a vertical line indicating today                  |
| `disparityDisplay`  | `boolean`                                | `false`   | Render disparity between planned and actual as a rectangle  |
| `onChange`          | `(taskId, newStartDate, newEndDate, newProgress?) => void` | — | Callback invoked when a task is updated                    |

### ▪️ `Task` Type

```ts
type Task = {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  progress: number; // 0 ~ 100
  dependencies: string[];
  status: "todo" | "inProgress" | "done";
};
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Development

```bash
pnpm install       # Install dependencies
pnpm storybook     # View the UI using Storybook
pnpm build         # Build the library (generate dist)
```

<!-- ## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request -->

### 👦 Top contributors

<a href="https://github.com/moppiiiii/react-gantt-flow/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=moppiiiii/react-gantt-flow" alt="react-gantt-flow contributors"/>
</a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
[contributors-shield]: https://img.shields.io/github/contributors/moppiiiii/react-gantt-flow.svg?style=for-the-badge
[contributors-url]: https://github.com/moppiiiii/react-gantt-flow/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/moppiiiii/react-gantt-flow.svg?style=for-the-badge
[forks-url]: https://github.com/moppiiiii/react-gantt-flow/forks
[stars-shield]: https://img.shields.io/github/stars/moppiiiii/react-gantt-flow.svg?style=for-the-badge
[stars-url]: https://github.com/moppiiiii/react-gantt-flow/stargazers
[issues-shield]: https://img.shields.io/github/issues/moppiiiii/react-gantt-flow.svg?style=for-the-badge
[issues-url]: https://github.com/moppiiiii/react-gantt-flow/issues
[license-shield]: https://img.shields.io/github/license/moppiiiii/react-gantt-flow.svg?style=for-the-badge
[license-url]: https://github.com/moppiiiii/react-gantt-flow/blob/main/LICENSE
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
