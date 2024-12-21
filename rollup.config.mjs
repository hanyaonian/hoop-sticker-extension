import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

const plugins = [
  resolve({
    preferBuiltins: true,
    extensions: [".js", ".ts"],
  }),
  commonjs(),
  typescript(),
];

export default [
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.js",
      format: "umd",
    },
    plugins,
  },
];
