#!/usr/bin/env node
/**
 * Homepage implementation sanity check (PR11).
 * Verifies key files exist and legacy scroll heights are removed.
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const errors = [];

function read(rel) {
  return fs.readFileSync(path.join(root, rel), "utf8");
}

function assertNoMatch(rel, pattern, message) {
  const content = read(rel);
  if (pattern.test(content)) errors.push(`${rel}: ${message}`);
}

function assertMatch(rel, pattern, message) {
  const content = read(rel);
  if (!pattern.test(content)) errors.push(`${rel}: ${message}`);
}

function assertExists(rel) {
  if (!fs.existsSync(path.join(root, rel))) errors.push(`Missing file: ${rel}`);
}

// PR1/PR2: no scroll theatre
assertNoMatch("components/marketing/HeroStorySection.tsx", /520vh/, "520vh scroll container still present");
assertNoMatch("components/marketing/RoadStorySection.tsx", /400vh/, "400vh scroll container still present");
assertMatch("components/marketing/HeroStorySection.tsx", /<h1/, "desktop h1 missing");

// PR4: VDP links
assertMatch("components/home/FeaturedVehicleCard.tsx", /\/inventory\/\$\{vehicle\.id\}/, "cards must link to VDP");

// PR8: reserve noindex
assertMatch("app/(public)/inventory/[id]/reserve/page.tsx", /index:\s*false/, "reserve must be noindex");

// Assets
assertExists("public/branding/logo.png");
assertExists("public/favicon.ico");

// SEO
assertExists("components/seo/ev-charging-faq-structured-data.tsx");
assertExists("app/(public)/privacy/page.tsx");

if (errors.length) {
  console.error("Homepage check failed:\n");
  errors.forEach((e) => console.error(`  - ${e}`));
  process.exit(1);
}

console.log("Homepage check passed.");
