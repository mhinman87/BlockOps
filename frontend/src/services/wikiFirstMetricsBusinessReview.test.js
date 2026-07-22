import assert from 'node:assert/strict';
import test from 'node:test';

import { FOUNDATIONAL_STRUCTURE_PAGES } from './wikiFoundationalStructureSeed.js';

const getPage = (title) => {
  const page = FOUNDATIONAL_STRUCTURE_PAGES.find((candidate) => candidate.title === title);
  assert.ok(page, `Missing foundational Wiki page: ${title}`);
  return page;
};

test('M1-207 records a fail-closed business review of the legacy demo metrics', () => {
  const measurement = getPage('Measurement Framework and Minimum Dataset').bodyMd;

  for (const marker of [
    'M1 first-metrics business review — completed 2026-07-21',
    'six quality_metrics rows',
    'four financials rows',
    'Hold — useful mock narrative scaffold, not a defensible client value story',
    'does not include the six approved M1 operational measures',
    'Four of the six displayed block-success rates do not reconcile',
    'ROI denominator and approved cost basis are not present',
    'is_published flag is a technical field, not factual approval',
    'Remove them from published eligibility while preserving history',
    'does not approve the legacy values, satisfy First Metrics Captured',
  ]) {
    assert.match(measurement, new RegExp(marker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'));
  }
});
