import chokidar from "chokidar";
import { $ } from "zx";
import { resolve, extname } from "path";
import { readdir, stat } from "fs/promises";

async function getFiles(dir: string, ext: string) {
  const paths = (await readdir(dir)).map((f) => resolve(dir, f));
  const result: string[] = [];
  for (const p of paths) {
    const fstat = await stat(p);
    if (fstat.isDirectory()) {
      result.push(...(await getFiles(p, ext)));
    } else {
      extname(p) === ext && result.push(p);
    }
  }
  return result;
}

(async () => {
  const source = resolve(process.cwd(), "src");
  const ts = await getFiles(source, ".ts");
  const watcher = chokidar.watch(ts);
  const build = () => {
    $`pnpm build`;
    $`pnpm build:page`;
  };
  build();

  console.log("start watching...", JSON.stringify(ts));
  watcher.on("change", () => {
    console.log("updating...");
    build();
  });
})();
