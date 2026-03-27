import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const files = [
  path.join(process.cwd(), 'android', 'app', 'capacitor.build.gradle'),
  path.join(process.cwd(), 'node_modules', '@capacitor', 'android', 'capacitor', 'build.gradle'),
  path.join(process.cwd(), 'node_modules', '@capacitor', 'app', 'android', 'build.gradle'),
  path.join(process.cwd(), 'node_modules', '@capacitor', 'browser', 'android', 'build.gradle')
];

async function patchFile(filePath) {
  try {
    const original = await fs.readFile(filePath, 'utf8');
    const next = original.replaceAll('JavaVersion.VERSION_21', 'JavaVersion.VERSION_17');

    if (next !== original) {
      await fs.writeFile(filePath, next, 'utf8');
      console.log(`Patched ${path.relative(process.cwd(), filePath)} to Java 17.`);
      return;
    }

    console.log(`No Java version patch was needed for ${path.relative(process.cwd(), filePath)}.`);
  } catch (error) {
    console.warn(`Skipped Android Java patch for ${path.relative(process.cwd(), filePath)}: ${error?.message || error}`);
  }
}

async function main() {
  for (const filePath of files) {
    await patchFile(filePath);
  }
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
