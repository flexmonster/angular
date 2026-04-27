#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";

const REPO = resolve(import.meta.dirname, "..");
const DIST = join(REPO, "dist/flexmonster/angular");

function run(cmd, args, cwd) {
  console.log(`\n$ ${cmd} ${args.join(" ")}  (cwd: ${cwd})`);
  execFileSync(cmd, args, { cwd, stdio: "inherit" });
}

let failed = false;
function assert(cond, msg) {
  if (!cond) {
    console.error(`  ✗ ${msg}`);
    failed = true;
    return;
  }
  console.log(`  ✓ ${msg}`);
}

// 1. Build — this also type-checks every wrapper against its IFM* interface.
//    A missing/renamed/mis-typed method on any wrapper fails here.
run("npx", ["ng", "build", "@flexmonster/angular"], REPO);

// 2. Verify the artifacts ng-packagr produced.
console.log("\nVerifying dist artifacts:");
assert(existsSync(join(DIST, "package.json")), "dist/.../package.json exists");
assert(existsSync(join(DIST, "fesm2022")),     "CSR fesm2022 bundle exists");
assert(existsSync(join(DIST, "ssr")),          "SSR secondary entry exists");
assert(existsSync(join(DIST, "types")),        "types directory exists");

if (existsSync(join(DIST, "package.json"))) {
  const pkg = JSON.parse(readFileSync(join(DIST, "package.json"), "utf8"));
  assert(pkg.name === "@flexmonster/angular", `package name is @flexmonster/angular (got "${pkg.name}")`);
  assert(!!pkg.version,                        `package version is set (${pkg.version})`);
  assert(pkg.exports && pkg.exports["."],      "exports['.'] is defined");
  assert(pkg.exports && pkg.exports["./ssr"],  "exports['./ssr'] is defined");
}

if (failed) {
  console.error("\n✗ Smoke tests failed.");
  process.exit(1);
}

// 3. Dry-run pack — confirms the tarball is producible. No registry contact, no auth.
run("npm", ["pack", "--dry-run"], DIST);

console.log("\n✓ Smoke tests passed.");
