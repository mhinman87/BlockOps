import assert from 'node:assert/strict';
import test from 'node:test';

import { FOUNDATIONAL_STRUCTURE_PAGES } from './wikiFoundationalStructureSeed.js';

const getPage = (title) => {
  const page = FOUNDATIONAL_STRUCTURE_PAGES.find((candidate) => candidate.title === title);
  assert.ok(page, `Missing foundational Wiki page: ${title}`);
  return page;
};

test('M1-205 locks the first-capture and recurring metric cadence without promising real-time data', () => {
  const kpi = getPage('KPI Dictionary and Data Ownership').bodyMd;
  const measurement = getPage('Measurement Framework and Minimum Dataset').bodyMd;

  for (const marker of [
    'M1 metric update cadence — approved 2026-07-21',
    'Day 0 after Live',
    'Day 3',
    'Day 7',
    'Monthly after first capture',
    'Quarterly',
    'Annually',
    'Event-triggered',
    'Historical snapshots are preserved',
    'Continuous Dashboard access does not mean real-time data',
    'separate Max-owned technical implementation work',
  ]) {
    assert.match(kpi, new RegExp(marker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'));
  }

  for (const marker of [
    'M1 measurement cadence — approved 2026-07-21',
    'refresh monthly where practical',
    'formal performance/value review occurs quarterly',
    'reviewed annually',
    'off-cycle refresh',
    'does not imply real-time data',
    'separate technical scheduling and implementation work',
  ]) {
    assert.match(measurement, new RegExp(marker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'));
  }
});
