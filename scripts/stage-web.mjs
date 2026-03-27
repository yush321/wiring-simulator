import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { build as esbuildBuild } from 'esbuild';

const rootDir = process.cwd();
const distDir = path.join(rootDir, 'dist');
const copyTargets = [
  'index.html',
  'images',
  'src',
  'USER_MANUAL_KO.md',
  'REVIEW_AND_ROADMAP_KO.md'
];

async function removeDist() {
  await fs.rm(distDir, { recursive: true, force: true });
}

async function ensureDist() {
  await fs.mkdir(distDir, { recursive: true });
}

async function copyTarget(target) {
  const source = path.join(rootDir, target);
  const destination = path.join(distDir, target);
  await fs.cp(source, destination, {
    recursive: true,
    force: true
  });
}

async function bundleAuthRuntime() {
  const outfile = path.join(distDir, 'src', 'auth', 'runtime.bundle.js');
  await fs.mkdir(path.dirname(outfile), { recursive: true });
  await esbuildBuild({
    entryPoints: [path.join(rootDir, 'src', 'auth', 'runtime-entry.js')],
    bundle: true,
    format: 'iife',
    platform: 'browser',
    target: ['es2020'],
    outfile
  });
}

async function injectAuthScripts() {
  const indexPath = path.join(distDir, 'index.html');
  const marker = '<script src="./src/ui/home-drawer.js"></script>';
  let html = await fs.readFile(indexPath, 'utf8');
  if (!html.includes(marker)) {
    throw new Error('Failed to inject auth scripts: home-drawer marker not found.');
  }
  html = html.replace(
    marker,
    [
      '<script src="./src/config/app-config.js"></script>',
      '<script src="./src/auth/runtime.bundle.js"></script>',
      marker
    ].join('\n')
  );
  await fs.writeFile(indexPath, html, 'utf8');
}

async function main() {
  const cleanOnly = process.argv.includes('--clean');
  await removeDist();
  if (cleanOnly) return;

  await ensureDist();

  for (const target of copyTargets) {
    await copyTarget(target);
  }

  await bundleAuthRuntime();
  await injectAuthScripts();

  console.log(`Staged web assets to ${distDir}`);
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
