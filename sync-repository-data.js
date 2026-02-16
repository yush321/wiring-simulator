#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

function fail(msg) {
  console.error(`[sync-repository-data] ${msg}`);
  process.exit(1);
}

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8").replace(/^\uFEFF/, "");
}

function writeText(filePath, text) {
  fs.writeFileSync(filePath, text, "utf8");
}

function detectEol(text) {
  return text.includes("\r\n") ? "\r\n" : "\n";
}

function parseArgs(argv) {
  const args = {
    repo: "src/data/repository.js",
    layout: null,
    tutorial: null,
    numbering: null,
    answers: null,
    mergeAnswers: false,
    dryRun: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const t = argv[i];
    if (t === "--repo") args.repo = argv[++i];
    else if (t === "--layout") args.layout = argv[++i];
    else if (t === "--tutorial") args.tutorial = argv[++i];
    else if (t === "--numbering") args.numbering = argv[++i];
    else if (t === "--answers") args.answers = argv[++i];
    else if (t === "--merge-answers") args.mergeAnswers = true;
    else if (t === "--dry-run") args.dryRun = true;
    else if (t === "--help" || t === "-h") {
      printHelp();
      process.exit(0);
    } else {
      fail(`Unknown arg: ${t}`);
    }
  }

  if (!args.tutorial && !args.numbering && !args.answers) {
    fail("At least one of --tutorial, --numbering, --answers is required.");
  }

  return args;
}

function printHelp() {
  console.log(
    [
      "Usage:",
      "  node sync-repository-data.js [options]",
      "",
      "Options:",
      "  --repo <path>         repository.js path (default: src/data/repository.js)",
      "  --tutorial <path>     tutorial JSON or let TUTORIAL_CONFIG = ...;",
      "  --numbering <path>    numbering JSON or let NUMBERING_SCENARIOS_DEFAULT = ...;",
      "  --answers <path>      answers JSON or let DB_ANSWERS = ...;",
      "  --layout <id>         required when input is single-layout shape (e.g. stages only)",
      "  --merge-answers       merge answers by key instead of full replace",
      "  --dry-run             validate and print summary only, no file write",
      "  -h, --help            show this help",
      "",
      "Examples:",
      "  node sync-repository-data.js --tutorial tutorial.json --numbering numbering.json --answers answers.json",
      "  node sync-repository-data.js --numbering one-layout-numbering.json --layout t7",
      "  node sync-repository-data.js --answers answers-export.js --merge-answers",
    ].join("\n")
  );
}

function parseInputPayload(rawText) {
  const text = String(rawText || "").trim();
  if (!text) fail("Input file is empty.");

  try {
    return JSON.parse(text);
  } catch (_) {
    // continue
  }

  const m = text.match(/(?:let|const|var)\s+([A-Za-z_$][\w$]*)\s*=\s*([\s\S]*?)\s*;?\s*$/);
  if (m) {
    const rhs = m[2].trim();
    try {
      return JSON.parse(rhs);
    } catch (_) {
      try {
        return vm.runInNewContext(`(${rhs})`, {}, { timeout: 300 });
      } catch (e) {
        fail(`Failed to parse assignment payload: ${e.message}`);
      }
    }
  }

  const noSemi = text.replace(/;\s*$/, "");
  try {
    return JSON.parse(noSemi);
  } catch (e) {
    fail(`Failed to parse input JSON: ${e.message}`);
  }
}

function scanBalancedObject(text, openIndex) {
  let depth = 0;
  let inString = false;
  let quote = "";
  let escaped = false;
  let inLineComment = false;
  let inBlockComment = false;

  for (let i = openIndex; i < text.length; i += 1) {
    const ch = text[i];
    const next = text[i + 1];

    if (inLineComment) {
      if (ch === "\n") inLineComment = false;
      continue;
    }
    if (inBlockComment) {
      if (ch === "*" && next === "/") {
        inBlockComment = false;
        i += 1;
      }
      continue;
    }
    if (inString) {
      if (escaped) escaped = false;
      else if (ch === "\\") escaped = true;
      else if (ch === quote) {
        inString = false;
        quote = "";
      }
      continue;
    }

    if (ch === "/" && next === "/") {
      inLineComment = true;
      i += 1;
      continue;
    }
    if (ch === "/" && next === "*") {
      inBlockComment = true;
      i += 1;
      continue;
    }
    if (ch === "'" || ch === '"' || ch === "`") {
      inString = true;
      quote = ch;
      escaped = false;
      continue;
    }

    if (ch === "{") depth += 1;
    else if (ch === "}") {
      depth -= 1;
      if (depth === 0) return i;
      if (depth < 0) return -1;
    }
  }

  return -1;
}

function findAssignmentRange(source, varName) {
  const re = new RegExp(`\\b(?:let|const|var)\\s+${varName}\\s*=`, "m");
  const m = re.exec(source);
  if (!m) fail(`Variable not found in repository.js: ${varName}`);

  const eqIndex = source.indexOf("=", m.index);
  if (eqIndex < 0) fail(`Invalid assignment for ${varName}`);

  let valueStart = eqIndex + 1;
  while (valueStart < source.length && /\s/.test(source[valueStart])) valueStart += 1;
  if (source[valueStart] !== "{") fail(`${varName} is not assigned to an object literal.`);

  const valueEnd = scanBalancedObject(source, valueStart);
  if (valueEnd < 0) fail(`Could not find matching closing brace for ${varName}.`);

  let replaceEnd = valueEnd + 1;
  while (replaceEnd < source.length && /\s/.test(source[replaceEnd])) replaceEnd += 1;
  if (source[replaceEnd] === ";") replaceEnd += 1;

  return { valueStart, replaceEnd };
}

function readAssignmentObject(source, varName) {
  const { valueStart, replaceEnd } = findAssignmentRange(source, varName);
  const raw = source.slice(valueStart, replaceEnd).trim().replace(/;\s*$/, "");
  try {
    return JSON.parse(raw);
  } catch (_) {
    try {
      return vm.runInNewContext(`(${raw})`, {}, { timeout: 500 });
    } catch (e) {
      fail(`Failed to parse ${varName} from repository.js: ${e.message}`);
    }
  }
}

function replaceAssignmentObject(source, varName, obj) {
  const { valueStart, replaceEnd } = findAssignmentRange(source, varName);
  const eol = detectEol(source);
  const serialized = JSON.stringify(obj, null, 2).replace(/\n/g, eol);
  return `${source.slice(0, valueStart)}${serialized};${source.slice(replaceEnd)}`;
}

function isPlainObject(v) {
  return !!v && typeof v === "object" && !Array.isArray(v);
}

function looksLikeTutorialEntry(v) {
  return isPlainObject(v) && (Array.isArray(v.desc) || typeof v.title === "string" || typeof v.img === "string");
}

function looksLikeNumberingEntry(v) {
  return isPlainObject(v) && Array.isArray(v.stages);
}

function toTutorialPatch(payload, layoutId) {
  if (looksLikeTutorialEntry(payload)) {
    if (!layoutId) fail("Tutorial single-layout payload requires --layout <id>.");
    return { [layoutId]: payload };
  }
  if (!isPlainObject(payload)) fail("Tutorial payload must be an object.");
  return payload;
}

function toNumberingPatch(payload, layoutId) {
  if (looksLikeNumberingEntry(payload)) {
    if (!layoutId) fail("Numbering single-layout payload requires --layout <id>.");
    return { [layoutId]: payload };
  }
  if (!isPlainObject(payload)) fail("Numbering payload must be an object.");
  return payload;
}

function run() {
  const args = parseArgs(process.argv.slice(2));
  const repoPath = path.resolve(args.repo);
  if (!fs.existsSync(repoPath)) fail(`File not found: ${repoPath}`);

  let source = readText(repoPath);
  const summary = [];

  if (args.tutorial) {
    const payload = parseInputPayload(readText(path.resolve(args.tutorial)));
    const patch = toTutorialPatch(payload, args.layout);
    const base = readAssignmentObject(source, "TUTORIAL_CONFIG");
    const next = { ...base, ...patch };
    source = replaceAssignmentObject(source, "TUTORIAL_CONFIG", next);
    summary.push(`TUTORIAL_CONFIG keys: ${Object.keys(next).length}`);
  }

  if (args.numbering) {
    const payload = parseInputPayload(readText(path.resolve(args.numbering)));
    const patch = toNumberingPatch(payload, args.layout);
    const base = readAssignmentObject(source, "NUMBERING_SCENARIOS_DEFAULT");
    const next = { ...base, ...patch };
    source = replaceAssignmentObject(source, "NUMBERING_SCENARIOS_DEFAULT", next);
    summary.push(`NUMBERING_SCENARIOS_DEFAULT keys: ${Object.keys(next).length}`);
  }

  if (args.answers) {
    const payload = parseInputPayload(readText(path.resolve(args.answers)));
    if (!isPlainObject(payload)) fail("DB_ANSWERS payload must be an object.");
    const next = args.mergeAnswers
      ? { ...readAssignmentObject(source, "DB_ANSWERS"), ...payload }
      : payload;
    source = replaceAssignmentObject(source, "DB_ANSWERS", next);
    summary.push(`DB_ANSWERS keys: ${Object.keys(next).length}${args.mergeAnswers ? " (merged)" : ""}`);
  }

  if (args.dryRun) {
    console.log("[sync-repository-data] Dry run complete.");
    summary.forEach((line) => console.log(`- ${line}`));
    return;
  }

  writeText(repoPath, source);
  console.log("[sync-repository-data] Updated repository.js");
  summary.forEach((line) => console.log(`- ${line}`));
}

run();

