/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import dts from "vite-plugin-dts";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      tsconfigPath: "tsconfig.build.json",
      insertTypesEntry: true,
    }),
  ],
  server: {
    port: 3000,
    strictPort: true,
  },
  build: {
    lib: {
      entry: resolve(".", "src/index.ts"),
      name: "yokogawa-react-r2",
      fileName: "yokogawa-react-r2",
    },
  },
});
