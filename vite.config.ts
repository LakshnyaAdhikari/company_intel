import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/analyze": "http://127.0.0.1:8002",
      "/analysis-runs": "http://127.0.0.1:8002",
      "/companies": "http://127.0.0.1:8002",
      "/download": "http://127.0.0.1:8002",
      "/health": "http://127.0.0.1:8002",
      "/results": "http://127.0.0.1:8002"
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  }
});
