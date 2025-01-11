import path from "path"
import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      input: '/index.html',
    },
  },
  server: {
    // Ensure that your dev server handles SPA routes
    hmr: true,
  },
})