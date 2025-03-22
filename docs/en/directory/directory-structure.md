# Directory Structure

## Overall View

```text
react-gantt-flow/
├─ .storybook/         // Place settings for Storybook
├─ docs/               // Store documentation
├─ src/
│  ├─ assets/          // Store assets
│  │  └─ styles/       // Store common style settings (including the output from Style Dictionary)
│  │      ├─ _variables.scss // Variables
│  │      ├─ _mixins.scss    // Mixins
│  │      ├─ _functions.scss // Functions
│  │      └─ ...
│  ├─ components/      // Manage components by directory
│  │  └─ gantt-flow/
│  │      ├─ GanttFlow.tsx
│  │      ├─ GanttFlow.stories.tsx  // Files for Storybook
│  │      ├─ index.ts            // Entry point to export components
│  ├─ hooks/           // Store React Hooks (custom hooks)
│  ├─ utils/           // Store general utility functions
│  ├─ types/           // Manage type definitions and common type aliases (as needed)
│  ├─ index.ts         // Comprehensive entry for exporting as a library
│  └─ ...              // Add additional files or directories as necessary
├─ .commitlintrc       // Commitlint configuration file
├─ .biome.json         // Biome configuration file
├─ knip.json           // Knip configuration file
├─ lefthook.yml        // Lefthook configuration file
├─ renovate.json       // Renovate configuration file
├─ package.json
├─ tsconfig.json       // TypeScript configuration file
├─ tsconfig.node.json  // TypeScript configuration file (for Node.js)
├─ tsconfig.app.json   // TypeScript configuration file (for applications)
├─ tsconfig.build.json // TypeScript configuration file (for builds)
├─ vite.config.ts      // Vite configuration file
├─ README.md           // Project description
├─ LICENSE             // License file
└─ pnpm-lock.json      // Package lock file
```

---
