/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    libInjectCss(),
    dts({
      tsconfigPath: "tsconfig.build.json",
      insertTypesEntry: true,
      exclude: [
        "src/**/*.test.*",
        "src/**/*.stories.*",
        "src/components/GanttFlow/data/**",
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(".", "src"),
    },
  },
  build: {
    lib: {
      entry: resolve(".", "src/index.ts"),
      name: "react-gantt-flow",
      fileName: "react-gantt-flow",
      formats: ["es", "cjs", "umd"],
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
