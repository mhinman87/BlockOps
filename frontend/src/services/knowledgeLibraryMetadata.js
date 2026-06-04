export const KNOWLEDGE_LIBRARY_METADATA = {
  'foundation.block-time-out-checklist': {
    description: '10-point verification checklist that must be completed before sedation. Covers patient ID, consent, laterality, allergies, anticoagulation, NPO/pregnancy, equipment readiness, and team confirmation.',
    category: 'safety',
    tags: ['Foundation', 'Safety'],
  },
  'foundation.last-protocol-suite': {
    description: 'Four-part local anesthetic systemic toxicity protocol: prevention strategies, recognition signs, crisis response algorithm, and intralipid stocking/administration guide.',
    category: 'safety',
    tags: ['Foundation', 'Safety', 'Emergency'],
  },
  'foundation.standardized-test-dose-protocol': {
    description: 'Standardized protocol for test dose administration before local anesthetic injection to detect intravascular placement.',
    category: 'safety',
    tags: ['Foundation', 'Safety'],
  },
  'foundation.weight-based-max-dose-calculator': {
    description: 'Dosing reference with volume tables for common patient weights and local anesthetic concentrations. Prevents overdose errors.',
    category: 'safety',
    tags: ['Foundation', 'Safety', 'Dosing'],
  },
  'foundation.high-volume-dilution-chart': {
    description: 'Dilution reference for plane blocks (TAP, PECS, serratus) where higher volumes at lower concentrations are needed for adequate spread.',
    category: 'safety',
    tags: ['Foundation', 'Safety', 'Dosing'],
  },
  'foundation.last-second-responder-nursing-competency': {
    description: 'Nursing-specific competency checklist for responding to LAST events as second responder. Covers intralipid preparation, airway assistance, and documentation.',
    category: 'safety',
    tags: ['Foundation', 'Safety', 'Nursing'],
  },
  'foundation.la-selection-algorithm': {
    description: 'Decision algorithm for local anesthetic selection. Bupivacaine default long-acting, mepivacaine default short-acting, with alternatives and clinical rationale.',
    category: 'pharmacology',
    tags: ['Foundation', 'Pharmacology'],
  },
  'foundation.adjuvant-dosing-guide': {
    description: 'Standardized adjuvant dosing: dexamethasone 4mg + epinephrine 1:400K as defaults, clonidine as secondary option. Includes evidence summaries.',
    category: 'pharmacology',
    tags: ['Foundation', 'Pharmacology', 'Dosing'],
  },
  'foundation.exparel-utilization-criteria': {
    description: 'Evidence-based assessment of liposomal bupivacaine. Not recommended as default due to 20-80x cost for marginal benefit over standard LA with adjuvants.',
    category: 'pharmacology',
    tags: ['Foundation', 'Pharmacology'],
  },
  'foundation.knobology-cheat-sheet': {
    description: 'Quick reference for ultrasound machine settings: depth, gain, focus, frequency optimization for nerve block imaging.',
    category: 'technique',
    tags: ['Foundation', 'Technique', 'Ultrasound'],
  },
  'foundation.part-maneuver-guide': {
    description: 'Probe manipulation technique guide: Pressure, Alignment, Rotation, and Tilting for optimal ultrasound visualization.',
    category: 'technique',
    tags: ['Foundation', 'Technique', 'Ultrasound'],
  },
  'foundation.triangle-of-success-setup-guide': {
    description: 'Ergonomic positioning guide for operator, patient, ultrasound machine, and equipment to optimize block performance.',
    category: 'technique',
    tags: ['Foundation', 'Technique', 'Ergonomics'],
  },
  'foundation.in-plane-technique-sop': {
    description: 'Standard operating procedure for in-plane needle approach. Block Ops default technique for all 6 launch blocks.',
    category: 'technique',
    tags: ['Foundation', 'Technique'],
  },
  'foundation.out-of-plane-technique-sop': {
    description: 'Standard operating procedure for out-of-plane needle approach. Specific applications only — not the default technique.',
    category: 'technique',
    tags: ['Foundation', 'Technique'],
  },
  'foundation.hydrodissection-opening-pressure-protocol': {
    description: 'Protocol for using hydrodissection to confirm correct tissue plane and assess opening pressure before full injection.',
    category: 'technique',
    tags: ['Foundation', 'Technique'],
  },
  'foundation.intraneural-injection-stop-criteria': {
    description: 'Four evidence-based stop criteria for detecting and preventing intraneural injection during nerve blocks.',
    category: 'technique',
    tags: ['Foundation', 'Technique', 'Safety'],
  },
  'foundation.clean-vs-sterile-protocol': {
    description: 'Defines when clean technique is acceptable vs when full sterile technique is required for different block types and clinical settings.',
    category: 'sterile',
    tags: ['Foundation', 'Sterile Technique'],
  },
  'foundation.probe-cover-gel-management-standard': {
    description: 'Standardized protocol for probe cover selection, application, gel management, and contamination prevention.',
    category: 'sterile',
    tags: ['Foundation', 'Sterile Technique'],
  },
  'foundation.block-cart-planogram': {
    description: 'Standardized framework for block-cart organization, emergency readiness, and customizable cart logic.',
    category: 'infrastructure',
    tags: ['Foundation', 'Infrastructure'],
  },
  'foundation.block-cart-par-level-guide': {
    description: 'Companion stocking-logic guide for setting minimum recommended quantities, restock triggers, and scaling based on workflow volume.',
    category: 'infrastructure',
    tags: ['Foundation', 'Infrastructure', 'Operations'],
  },
  'foundation.daily-cart-restock-checklist': {
    description: 'Daily checklist for nursing staff to verify block cart supplies, expiration dates, and equipment readiness before first case.',
    category: 'infrastructure',
    tags: ['Foundation', 'Infrastructure', 'Daily'],
  },
  'foundation.block-bay-workflow-logic': {
    description: 'Workflow diagram and logic for patient flow through the block bay — from arrival to block completion to OR transport.',
    category: 'infrastructure',
    tags: ['Foundation', 'Infrastructure', 'Workflow'],
  },
  'foundation.machine-cleaning-checklist': {
    description: 'Ultrasound machine cleaning and maintenance protocol. Daily, weekly, and post-case cleaning requirements.',
    category: 'infrastructure',
    tags: ['Foundation', 'Infrastructure'],
  },
  'foundation.probe-cover-selection-guide': {
    description: 'Guide for selecting appropriate probe covers based on block type, sterility requirements, and clinical setting.',
    category: 'infrastructure',
    tags: ['Foundation', 'Infrastructure'],
  },
  'foundation.gel-management-sop': {
    description: 'Standard operating procedure for ultrasound gel handling, contamination prevention, and waste management.',
    category: 'infrastructure',
    tags: ['Foundation', 'Infrastructure'],
  },
  'foundation.preop-nursing-smart-template': {
    description: 'Pre-operative nursing assessment template specific to regional anesthesia patients. Structured fields for block-relevant history and assessment.',
    category: 'documentation',
    tags: ['Foundation', 'Documentation', 'EMR'],
  },
  'foundation.pacu-block-assessment-smart-template': {
    description: 'Post-anesthesia care unit assessment template for monitoring patients with active nerve blocks. Includes sensory/motor checks.',
    category: 'documentation',
    tags: ['Foundation', 'Documentation', 'EMR'],
  },
  'foundation.block-status-tracking-board-guide': {
    description: 'Setup guide for a visual tracking board showing block status for all active patients — for OR and PACU visibility.',
    category: 'documentation',
    tags: ['Foundation', 'Documentation', 'Tracking'],
  },
  'foundation.block-success-failure-log': {
    description: 'Data collection template for tracking block outcomes: success rates, onset times, rescue requirements, and complications.',
    category: 'documentation',
    tags: ['Foundation', 'Documentation', 'Outcomes'],
  },
  'foundation.sedation-administration-monitoring-sop': {
    description: 'Protocol for nursing administration and monitoring of procedural sedation during nerve block placement.',
    category: 'nursing',
    tags: ['Foundation', 'Nursing'],
  },
  'foundation.sterile-setup-assist-competency': {
    description: 'Competency checklist for nursing staff assisting with nerve block procedures — sterile field preparation, equipment handling, and provider support.',
    category: 'nursing',
    tags: ['Foundation', 'Nursing', 'Competency'],
  },
  'foundation.fall-risk-assessment': {
    description: 'Nursing assessment tool for fall risk in patients with active lower extremity nerve blocks. Includes prevention interventions.',
    category: 'nursing',
    tags: ['Foundation', 'Nursing', 'Safety'],
  },
  'foundation.red-flag-recognition-card': {
    description: 'Quick-reference card for nursing staff listing red flag signs and symptoms requiring immediate escalation in block patients.',
    category: 'nursing',
    tags: ['Foundation', 'Nursing', 'Safety'],
  },
  'foundation.breakthrough-pain-protocol': {
    description: 'Protocol for managing breakthrough pain in patients with nerve blocks. Escalation pathway from repositioning through rescue analgesia.',
    category: 'nursing',
    tags: ['Foundation', 'Nursing'],
  },
  'foundation.nerve-block-patient-brochure': {
    description: 'Patient-facing educational brochure explaining what nerve blocks are, what to expect, and how they improve recovery — in plain language.',
    category: 'patient',
    tags: ['Foundation', 'Patient Education'],
  },
  'foundation.ra-consent-form': {
    description: 'Informed consent template covering risks, benefits, and alternatives for regional anesthesia procedures.',
    category: 'patient',
    tags: ['Foundation', 'Patient', 'Legal'],
  },
  'foundation.post-block-sensory-guide': {
    description: 'Patient handout explaining expected sensory changes after a nerve block — what is normal, what to watch for, and when to call.',
    category: 'patient',
    tags: ['Foundation', 'Patient Education'],
  },
  'foundation.patient-red-flag-card': {
    description: 'Wallet-sized card for patients listing warning signs that require calling their provider or going to the ER after a nerve block.',
    category: 'patient',
    tags: ['Foundation', 'Patient', 'Safety'],
  },
  'foundation.cpt-icd10-crosswalk': {
    description: 'Complete billing reference mapping nerve block CPT codes to ICD-10 diagnosis codes, with modifiers and common denial reasons.',
    category: 'compliance',
    tags: ['Foundation', 'Billing', 'CPT'],
  },
  'foundation.medical-necessity-phrases': {
    description: 'Pre-written medical necessity language for documentation and prior authorization. Covers common payer requirements.',
    category: 'compliance',
    tags: ['Foundation', 'Billing', 'Documentation'],
  },
  'foundation.pacu-los-tracker': {
    description: 'Tracking template for measuring PACU length of stay in block vs non-block patients. Feeds ROI calculations.',
    category: 'compliance',
    tags: ['Foundation', 'Outcomes', 'Tracking'],
  },
  'foundation.mme-calculator-reference': {
    description: 'Morphine milligram equivalent calculator and reference card for tracking opioid reduction in block patients.',
    category: 'compliance',
    tags: ['Foundation', 'Outcomes', 'Opioid'],
  },
  'foundation.block-champion-charter': {
    description: 'Defines the role, responsibilities, authority, and accountability of the on-site Block Champion provider. The governance backbone of every engagement.',
    category: 'governance',
    tags: ['Foundation', 'Governance'],
  },
  'foundation.block-lead-nurse-responsibility-list': {
    description: 'Defines the Block Lead Nurse role — daily responsibilities, quality checks, supply management, and escalation authority.',
    category: 'governance',
    tags: ['Foundation', 'Governance', 'Nursing'],
  },
};
