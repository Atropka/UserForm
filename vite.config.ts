import { URL, fileURLToPath } from "node:url";

import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({
    script: {
      defineModel: true
    },
    template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.includes('bim-')
        }
    }
  })],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    cors: {
      origin: "*",
      allowedHeaders: "X-Requested-With, content-type",
      preflightContinue: true,
      methods: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    },
    proxy: {
      "/api": "http://localhost:8908",
      "/login": "http://localhost:8908",
      "/logout": "http://localhost:8908",
      "/oauth2": "http://localhost:8908",
      "/redirect": "http://localhost:8908",
      "/proxy": "http://localhost:8908",
    },
  },
});
