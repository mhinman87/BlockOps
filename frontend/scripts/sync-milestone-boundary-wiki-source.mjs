#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'node:fs';

const repoFile = new URL('../src/services/wikiLibraryItems.js', import.meta.url);
const vaultRoot = '/home/bloq/Documents/Block Ops Vault';
const sourceByTitle = new Map([
  ['Proposal Workflow', '02 - Operations/Proposal Workflow.md'],
  ['CRM Pipeline Stages', '02 - Operations/CRM Pipeline Stages.md'],
  ['Training Day Readiness', '02 - Operations/Training Day Readiness.md'],
  ['Go-Live Verification', '02 - Operations/Go-Live Verification.md'],
  ['Legal Review Index', '02 - Operations/Legal Review Index.md'],
  ['Client Onboarding', '03 - Client Delivery/Client Onboarding.md'],
  ['Implementation Bundle Delivery', '02 - Operations/Implementation Bundle Delivery.md'],
  ['Clinical / Block Program Knowledge Index', '02 - Operations/Clinical - Block Program Knowledge Index.md'],
  ['Status Rules', '02 - Operations/Status Rules.md'],
  ['Block Ops Wiki Go-Live Readiness Matrix', '02 - Operations/Block Ops Wiki Go-Live Readiness Matrix.md'],
]);

let source = readFileSync(repoFile, 'utf8');
const updated = [];
const missing = [];

for (const [title, relativePath] of sourceByTitle) {
  const titleMarker = `"title": ${JSON.stringify(title)}`;
  const titleIndex = source.indexOf(titleMarker);
  if (titleIndex < 0) {
    missing.push(title);
    continue;
  }
  const contentMarker = '"content": ';
  const contentIndex = source.indexOf(contentMarker, titleIndex);
  const nextObjectIndex = source.indexOf('\n  },', titleIndex);
  if (contentIndex < 0 || contentIndex > nextObjectIndex) throw new Error(`Missing content field for ${title}`);
  const valueStart = contentIndex + contentMarker.length;
  if (source[valueStart] !== '"') throw new Error(`Content for ${title} is not a JSON string`);
  let valueEnd = valueStart + 1;
  let escaped = false;
  for (; valueEnd < source.length; valueEnd += 1) {
    const char = source[valueEnd];
    if (escaped) escaped = false;
    else if (char === '\\') escaped = true;
    else if (char === '"') break;
  }
  if (valueEnd >= source.length) throw new Error(`Unterminated content for ${title}`);
  const body = readFileSync(`${vaultRoot}/${relativePath}`, 'utf8');
  source = `${source.slice(0, valueStart)}${JSON.stringify(body)}${source.slice(valueEnd + 1)}`;
  updated.push({ title, bytes: Buffer.byteLength(body) });
}

if (missing.length) throw new Error(`Missing static Wiki items: ${missing.join(', ')}`);
writeFileSync(repoFile, source);
console.log(JSON.stringify({ updated }, null, 2));
