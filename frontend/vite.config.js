import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Make the server accessible from the network
    port: 3000, // Optional: specify a custom port (default is 5173)
    proxy: {
      "/api": {
        target: "http://localhost:8010",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
