import assert from 'node:assert/strict';
import test from 'node:test';

import { FOUNDATIONAL_STRUCTURE_PAGES } from './wikiFoundationalStructureSeed.js';

const getPage = (title) => {
  const page = FOUNDATIONAL_STRUCTURE_PAGES.find((candidate) => candidate.title === title);
  assert.ok(page, `Missing foundational Wiki page: ${title}`);
  return page;
};

test('M1-GR-025 locks six mock value-story lenses without creating value claims', () => {
  const kpi = getPage('KPI Dictionary and Data Ownership').bodyMd;
  const measurement = getPage('Measurement Framework and Minimum Dataset').bodyMd;

  for (const marker of [
    'M1 mock value-story metric set — approved 2026-07-21',
    'Block utilization and opportunity',
    'Opioid-use impact',
    'Recovery and throughput impact',
    'Patient experience and quality',
    'Documentation and economic contribution',
    'Net value and ROI',
    'Mock assumption',
    'A mock assumption never becomes verified',
    'missing values are never converted to zero',
    'No lens permits a promise or claim',
    'Actual values, source fields, formulas, sanity checks, Dashboard implementation, capture, and external promotion remain separate',
  ]) {
    assert.match(kpi, new RegExp(marker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }

  assert.match(measurement, /six separately governed placeholders/);
  assert.match(measurement, /source, period, population, exclusions, assumptions, owner/);
  assert.match(measurement, /No placeholder may be represented as a measured result or external claim/);
  assert.match(measurement, /Definition approval does not prove implementation or capture/);
});
