const join = (...parts) => parts.filter(Boolean).join(' ');

export const dashboardPageTitle = 'text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100';
export const dashboardHeroTitle = 'text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wide';
export const dashboardPageSubtitle = 'text-gray-500 dark:text-gray-400 text-sm mt-1 font-light';
export const dashboardHeroSubtitle = 'text-gray-600 dark:text-gray-400 mt-2 font-light';

export const dashboardCard = '!bg-white dark:!bg-dark-card !border-gray-200 dark:!border-dark-border border rounded-xl';
export const dashboardCardInteractive = join(
  dashboardCard,
  'transition',
  'hover:border-primary/40 hover:shadow-md',
  'dark:hover:border-primary/50 dark:hover:bg-dark-border/30'
);
export const dashboardSurfaceMuted = '!bg-gray-50 dark:!bg-dark-bg !border-gray-200 dark:!border-dark-border border rounded-lg';
export const dashboardSurfaceSoft = '!bg-gray-50 dark:!bg-dark-border/40 rounded-lg';
export const dashboardSectionHeader = '!bg-gray-50 dark:!bg-dark-bg !border-gray-200 dark:!border-dark-border border-y';

export const dashboardButtonSecondary = join(
  'flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition',
  'text-gray-600 dark:text-gray-300',
  'bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border',
  'hover:text-primary hover:border-primary/30 dark:hover:border-primary/40 dark:hover:bg-dark-border/40'
);

export const dashboardInput = join(
  'w-full px-4 py-2.5 rounded-lg text-sm font-light transition',
  '!bg-white dark:!bg-dark-bg',
  '!border-gray-200 dark:!border-dark-border border',
  'text-gray-900 dark:text-gray-200',
  'placeholder:text-gray-400 dark:placeholder:text-gray-500',
  'focus:outline-none focus:border-primary'
);

export const dashboardChip = 'bg-gray-100 dark:bg-dark-border/60 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-border';
export const dashboardChipActive = 'bg-gray-900 dark:bg-primary text-white border border-gray-900 dark:border-primary';
