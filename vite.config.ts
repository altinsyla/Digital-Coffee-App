// vite.config.ts
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => {
  /* Optional: read .env.{mode} so VITE_API_PORT is configurable */
  const env = loadEnv(mode, process.cwd(), "");

  return {
    server: {
      host: "::",
      port: 8080,
      proxy: {
        /*  All calls to /api/** → http://localhost:4000/api/** (default)
            You can override PORT with VITE_API_PORT in .env.development   */
        "/api": {
          target: `http://localhost:${env.VITE_API_PORT || 4000}`,
          changeOrigin: true,
          secure: false,
        },
      },
    },

    plugins: [
      react(),
      mode === "development" && componentTagger(),
    ].filter(Boolean),

    resolve: {
      alias: { "@": path.resolve(__dirname, "./src") },
    },
  };
});
