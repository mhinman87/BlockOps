import assert from 'node:assert/strict';
import test from 'node:test';

import { FOUNDATIONAL_STRUCTURE_PAGES } from './wikiFoundationalStructureSeed.js';

const getPage = (title) => {
  const page = FOUNDATIONAL_STRUCTURE_PAGES.find((candidate) => candidate.title === title);
  assert.ok(page, `Missing foundational Wiki page: ${title}`);
  return page;
};

test('M1-201 defines eight fail-closed metric sanity checks and four result states', () => {
  const kpi = getPage('KPI Dictionary and Data Ownership').bodyMd;
  const measurement = getPage('Measurement Framework and Minimum Dataset').bodyMd;

  for (const marker of [
    'M1 metric sanity-check standard — approved 2026-07-21',
    'Identity and definition',
    'Source and provenance',
    'Period and scope',
    'Missing-data handling',
    'Type and range',
    'Arithmetic and reconciliation',
    'Chronology and duplication',
    'Interpretation and review gates',
    '**Pass:**',
    '**Warning / Data-quality concern:**',
    '**Hold:**',
    '**Unknown:**',
    'M1 sets no universal statistical outlier threshold',
    'does not prove the underlying outcome',
  ]) {
    assert.match(kpi, new RegExp(marker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }

  assert.match(measurement, /eight approved sanity checks/);
  assert.match(measurement, /Pass, Warning \/ Data-quality concern, Hold, or Unknown/);
  assert.match(measurement, /passing check proves only minimum internal consistency/);
  assert.match(measurement, /Definition approval does not prove implementation or capture/);
});
