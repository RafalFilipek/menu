import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// @ts-expect-error no typings
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      gzipSize: true,
    }),
  ],
});
