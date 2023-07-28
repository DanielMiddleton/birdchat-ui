import solid from "solid-start/vite";
import { defineConfig } from "vite";
import eslint from "vite-plugin-eslint";
import vercel from "solid-start-vercel";

export default defineConfig({
  plugins: [solid({ adapter: vercel({}) }), eslint()],
  ssr: {
    noExternal: ["@kobalte/core"],
  },
});
