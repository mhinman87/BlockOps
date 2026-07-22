import assert from 'node:assert/strict';
import test from 'node:test';

import { FOUNDATIONAL_STRUCTURE_PAGES } from './wikiFoundationalStructureSeed.js';

const getPage = (title) => {
  const page = FOUNDATIONAL_STRUCTURE_PAGES.find((candidate) => candidate.title === title);
  assert.ok(page, `Missing foundational Wiki page: ${title}`);
  return page;
};

test('M1-197 locks the six operational first-capture metrics without inventing value claims', () => {
  const kpi = getPage('KPI Dictionary and Data Ownership').bodyMd;
  const measurement = getPage('Measurement Framework and Minimum Dataset').bodyMd;

  for (const marker of [
    'M1 mock first operational metric set — approved 2026-07-21',
    'Mock workflow volume',
    'Journey coverage',
    'Stage cycle time',
    'Handoff quality',
    'Operating readiness',
    'First-week support activity',
    'Unknown or unavailable values remain Unknown',
    'Revenue, ROI, opioid reduction, clinical outcomes',
    'Definition approval does not prove source fields',
  ]) {
    assert.match(kpi, new RegExp(marker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }

  assert.match(measurement, /six approved measures/);
  assert.match(measurement, /Samir owns the business meaning/);
  assert.match(measurement, /Definition approval does not prove implementation or capture/);
});
