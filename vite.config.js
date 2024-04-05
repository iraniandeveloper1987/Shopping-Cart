import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Set your desired port number for development
  },
  preview: {
    port: 3000, // Set your desired port number for production
  },
});
