export const DELIVERABLE_CATEGORY_CONFIG = {
  categories: {
    safety: { label: 'Safety' },
    pharmacology: { label: 'Pharmacology' },
    technique: { label: 'Technical Fundamentals' },
    sterile: { label: 'Sterile Technique' },
    infrastructure: { label: 'Physical Infrastructure' },
    documentation: { label: 'Documentation & Digital' },
    nursing: { label: 'Nursing Competencies' },
    patient: { label: 'Patient Experience' },
    compliance: { label: 'Compliance & Billing' },
    governance: { label: 'Governance' },
  },
  objectCategoryMap: {
    'foundation.block-time-out-checklist': 'safety',
    'foundation.last-protocol-suite': 'safety',
    'foundation.standardized-test-dose-protocol': 'safety',
    'foundation.weight-based-max-dose-calculator': 'safety',
    'foundation.high-volume-dilution-chart': 'safety',
    'foundation.last-second-responder-nursing-competency': 'safety',
    'foundation.la-selection-algorithm': 'pharmacology',
    'foundation.adjuvant-dosing-guide': 'pharmacology',
    'foundation.exparel-utilization-criteria': 'pharmacology',
    'foundation.knobology-cheat-sheet': 'technique',
    'foundation.part-maneuver-guide': 'technique',
    'foundation.triangle-of-success-setup-guide': 'technique',
    'foundation.in-plane-technique-sop': 'technique',
    'foundation.out-of-plane-technique-sop': 'technique',
    'foundation.hydrodissection-opening-pressure-protocol': 'technique',
    'foundation.intraneural-injection-stop-criteria': 'technique',
    'foundation.clean-vs-sterile-protocol': 'sterile',
    'foundation.probe-cover-gel-management-standard': 'sterile',
    'foundation.block-cart-planogram': 'infrastructure',
    'foundation.block-cart-par-level-guide': 'infrastructure',
    'foundation.daily-cart-restock-checklist': 'infrastructure',
    'foundation.block-bay-workflow-logic': 'infrastructure',
    'foundation.machine-cleaning-checklist': 'infrastructure',
    'foundation.probe-cover-selection-guide': 'infrastructure',
    'foundation.gel-management-sop': 'infrastructure',
    'foundation.preop-nursing-smart-template': 'documentation',
    'foundation.pacu-block-assessment-smart-template': 'documentation',
    'foundation.block-status-tracking-board-guide': 'documentation',
    'foundation.block-success-failure-log': 'documentation',
    'foundation.sedation-administration-monitoring-sop': 'nursing',
    'foundation.sterile-setup-assist-competency': 'nursing',
    'foundation.fall-risk-assessment': 'nursing',
    'foundation.red-flag-recognition-card': 'nursing',
    'foundation.breakthrough-pain-protocol': 'nursing',
    'foundation.nerve-block-patient-brochure': 'patient',
    'foundation.ra-consent-form': 'patient',
    'foundation.post-block-sensory-guide': 'patient',
    'foundation.patient-red-flag-card': 'patient',
    'foundation.cpt-icd10-crosswalk': 'compliance',
    'foundation.medical-necessity-phrases': 'compliance',
    'foundation.pacu-los-tracker': 'compliance',
    'foundation.mme-calculator-reference': 'compliance',
    'foundation.block-champion-charter': 'governance',
    'foundation.block-lead-nurse-responsibility-list': 'governance',
  },
};

export const buildFoundationSections = (rows, config = DELIVERABLE_CATEGORY_CONFIG) => {
  const grouped = new Map();

  for (const row of rows || []) {
    const category = config.objectCategoryMap[row.object_id];
    if (!category || !config.categories[category]) continue;

    if (!grouped.has(category)) {
      grouped.set(category, []);
    }

    grouped.get(category).push({
      objectId: row.object_id,
      name: row.title,
      status: row.review_status,
      storagePath: row.storage_path,
      category,
    });
  }

  return Object.entries(config.categories)
    .filter(([categoryId]) => grouped.has(categoryId))
    .map(([categoryId, meta]) => ({
      id: categoryId,
      name: meta.label,
      items: grouped.get(categoryId).sort((a, b) => a.name.localeCompare(b.name)),
    }));
};
