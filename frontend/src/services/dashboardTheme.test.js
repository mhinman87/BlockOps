import test from 'node:test';
import assert from 'node:assert/strict';

import {
  dashboardCard,
  dashboardCardInteractive,
  dashboardButtonSecondary,
  dashboardInput,
  dashboardPageTitle,
  dashboardPageSubtitle,
  dashboardSurfaceMuted,
} from './dashboardTheme.js';

test('dashboard theme exports include explicit dark-mode classes for core surfaces', () => {
  assert.match(dashboardCard, /dark:!?bg-dark-card/);
  assert.match(dashboardCard, /dark:!?border-dark-border/);
  assert.match(dashboardSurfaceMuted, /dark:!?bg-dark-bg/);
  assert.match(dashboardSurfaceMuted, /dark:!?border-dark-border/);
});

test('dashboard theme exports include explicit dark-mode classes for typography and controls', () => {
  assert.match(dashboardPageTitle, /dark:text-gray-100/);
  assert.match(dashboardPageSubtitle, /dark:text-gray-400/);
  assert.match(dashboardButtonSecondary, /dark:bg-dark-card/);
  assert.match(dashboardButtonSecondary, /dark:text-gray-300/);
  assert.match(dashboardInput, /dark:!?bg-dark-bg/);
  assert.match(dashboardInput, /dark:text-gray-200/);
});

test('interactive card variant preserves base card styling and hover states', () => {
  assert.match(dashboardCardInteractive, /dark:!?bg-dark-card/);
  assert.match(dashboardCardInteractive, /hover:border-primary\/40/);
  assert.match(dashboardCardInteractive, /dark:hover:border-primary\/50/);
  assert.match(dashboardCardInteractive, /dark:hover:bg-dark-border\/30/);
});
