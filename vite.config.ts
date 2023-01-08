import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

const SERVER_HOST = "vaultz.itsbohara.com";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths(), react()],

  server: {
    proxy: {
      // "/api": {
      //   target: `http://${SERVER_HOST}/api`,
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/api/, ""),
      // },
    },
  },
});
