import { resolve } from "path";
import { defineConfig } from "vite";
import typescript from "@rollup/plugin-typescript";

export default defineConfig({
  build: {
    minify: true,
    emptyOutDir: true,
    rollupOptions: {
      /** @see link https://rollupjs.org/guide/en/#preserveentrysignatures */
      preserveEntrySignatures: "strict",
      plugins: [typescript()],
    },
  },
});
