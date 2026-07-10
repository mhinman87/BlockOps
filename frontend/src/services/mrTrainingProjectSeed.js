// Approved 2026-07-10. Additive Mission Control seed for the mixed-reality training platform.
export const MR_TRAINING_TASKS = [
  {
    "taskKey": "M2-MR-CLIN-01",
    "title": "Define the never-move-an-unvisualized-needle doctrine",
    "description": "Document the governing behavior: visualize, advance, stop, confirm, and reacquire with the probe before any further needle movement.",
    "primaryOwner": "Samir",
    "status": "ready",
    "priority": "critical",
    "workstream": "MR Training \u2014 Clinical Doctrine",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": true,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 2000
  },
  {
    "taskKey": "M2-MR-CLIN-02",
    "title": "Define adequate needle-tip visualization",
    "description": "Specify the visual evidence and confidence threshold required before needle movement is permitted.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Clinical Doctrine",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": true,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 2001
  },
  {
    "taskKey": "M2-MR-CLIN-03",
    "title": "Define measurable needle movement",
    "description": "Set translation and rotation thresholds that distinguish intentional movement from tracker noise.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Clinical Doctrine",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": true,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 2002
  },
  {
    "taskKey": "M2-MR-CLIN-04",
    "title": "Classify critical and noncritical training errors",
    "description": "Define critical unvisualized movement, alignment errors, overshoot, and recoverable coaching events.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Clinical Doctrine",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": true,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 2003
  },
  {
    "taskKey": "M2-MR-CLIN-05",
    "title": "Define the stop-and-reacquire sequence",
    "description": "Specify the required trainee response after losing the tip, including stopping the needle and moving the probe to reacquire visualization.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Clinical Doctrine",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": true,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 2004
  },
  {
    "taskKey": "M2-MR-CLIN-06",
    "title": "Define M2 clinical pass/fail criteria",
    "description": "Set the minimum safe performance needed to complete the prototype exercise.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Clinical Doctrine",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": true,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 2005
  },
  {
    "taskKey": "M2-MR-ARCH-01",
    "title": "Choose the M2 Quest runtime",
    "description": "Decide native Quest versus WebXR using tracking precision, latency, accessory support, and portal integration as selection criteria.",
    "primaryOwner": "Max",
    "status": "ready",
    "priority": "high",
    "workstream": "MR Training \u2014 Product & Technical Architecture",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 2006
  },
  {
    "taskKey": "M2-MR-ARCH-02",
    "title": "Define portal-to-headset architecture",
    "description": "Specify authentication, session launch, local operation, result synchronization, and future licensing boundaries.",
    "primaryOwner": "Max",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Product & Technical Architecture",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 2007
  },
  {
    "taskKey": "M2-MR-ARCH-03",
    "title": "Define probe, needle, pad, and headset coordinate systems",
    "description": "Document transforms and calibration relationships for every tracked physical and virtual object.",
    "primaryOwner": "Max",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Product & Technical Architecture",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 2008
  },
  {
    "taskKey": "M2-MR-ARCH-04",
    "title": "Define training telemetry schema",
    "description": "Specify sessions, attempts, visibility state, motion events, violations, scores, and device diagnostics.",
    "primaryOwner": "Max",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Product & Technical Architecture",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 2009
  },
  {
    "taskKey": "M2-MR-ARCH-05",
    "title": "Create the prototype repository and environments",
    "description": "Establish reproducible development, test, and Quest build environments with ownership and handoff notes.",
    "primaryOwner": "Max",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Product & Technical Architecture",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 2010
  },
  {
    "taskKey": "M2-MR-ARCH-06",
    "title": "Document the M2 architecture and M3 expansion path",
    "description": "Record current decisions, rejected alternatives, technical risks, and the path to volumetric anatomy.",
    "primaryOwner": "Max",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Product & Technical Architecture",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 2011
  },
  {
    "taskKey": "M2-MR-TRACK-01",
    "title": "Select probe and needle tracking methods",
    "description": "Evaluate controllers, tracked accessories, rigid mounts, occlusion risk, safety, and achievable precision.",
    "primaryOwner": "Max",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Tracking & Calibration",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 2012
  },
  {
    "taskKey": "M2-MR-TRACK-02",
    "title": "Build the tracked probe prototype",
    "description": "Create and calibrate a probe-shaped prop with a known rigid transform to its tracker.",
    "primaryOwner": "Max",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Tracking & Calibration",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 2013
  },
  {
    "taskKey": "M2-MR-TRACK-03",
    "title": "Build the tracked needle-handle prototype",
    "description": "Create a safe tracked needle or analog with known shaft geometry and tip position.",
    "primaryOwner": "Max",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Tracking & Calibration",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 2014
  },
  {
    "taskKey": "M2-MR-TRACK-04",
    "title": "Implement four-corner pad calibration",
    "description": "Register pad position, orientation, dimensions, and scale in the Quest coordinate system.",
    "primaryOwner": "Max",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Tracking & Calibration",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 2015
  },
  {
    "taskKey": "M2-MR-TRACK-05",
    "title": "Determine insertion-depth estimation method",
    "description": "Select and test the M2 method for estimating the needle tip after it enters the silicone.",
    "primaryOwner": "Max",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Tracking & Calibration",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 2016
  },
  {
    "taskKey": "M2-MR-TRACK-06",
    "title": "Measure tracking precision, drift, latency, and occlusion",
    "description": "Run repeatable bench tests and record whether performance meets the defined M2 tolerance.",
    "primaryOwner": "Max",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Tracking & Calibration",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 2017
  },
  {
    "taskKey": "M2-MR-TRACK-07",
    "title": "Prove simultaneous probe-plane and needle tracking",
    "description": "Demonstrate reliable real-time calculation of needle alignment and intersection with the ultrasound plane.",
    "primaryOwner": "Max",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Tracking & Calibration",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 2018
  },
  {
    "taskKey": "M2-MR-TRACK-08",
    "title": "Pass the M2 tracking feasibility gate",
    "description": "Approve continued prototype investment only after the core tracking evidence meets acceptance criteria.",
    "primaryOwner": "Max",
    "status": "locked",
    "priority": "critical",
    "workstream": "MR Training \u2014 Tracking & Calibration",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 2019
  },
  {
    "taskKey": "M2-MR-HARD-01",
    "title": "Define the minimum M2 physical kit",
    "description": "Specify headset, probe prop, needle analog, silicone pad, calibration surface, mounts, and replaceable components.",
    "primaryOwner": "Samir",
    "status": "ready",
    "priority": "high",
    "workstream": "MR Training \u2014 Physical Training Kit",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 2020
  },
  {
    "taskKey": "M2-MR-HARD-02",
    "title": "Select silicone pad geometry and density",
    "description": "Choose dimensions and resistance appropriate for coordination training without claiming full tissue realism.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Physical Training Kit",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 2021
  },
  {
    "taskKey": "M2-MR-HARD-03",
    "title": "Define safe needle specifications",
    "description": "Select a blunt or otherwise controlled training instrument and document handling requirements.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Physical Training Kit",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 2022
  },
  {
    "taskKey": "M2-MR-HARD-04",
    "title": "Design tracker mounts and calibration fixture",
    "description": "Create stable, reproducible mounts that preserve known geometry during use.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Physical Training Kit",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 2023
  },
  {
    "taskKey": "M2-MR-HARD-05",
    "title": "Produce the first complete training station",
    "description": "Assemble one reproducible internal M2 kit.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Physical Training Kit",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 2024
  },
  {
    "taskKey": "M2-MR-HARD-06",
    "title": "Test ergonomics, durability, and replaceability",
    "description": "Exercise realistic two-handed use and document failures, wear, cleaning, and replacement needs.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Physical Training Kit",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 2025
  },
  {
    "taskKey": "M2-MR-HARD-07",
    "title": "Estimate prototype and production unit economics",
    "description": "Document prototype cost, likely production cost drivers, and vendor dependencies.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Physical Training Kit",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 2026
  },
  {
    "taskKey": "M2-MR-APP-01",
    "title": "Create the Quest application shell",
    "description": "Implement session setup, permissions, device checks, and the initial mixed-reality workspace.",
    "primaryOwner": "Max",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Mixed-Reality Application",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 2027
  },
  {
    "taskKey": "M2-MR-APP-02",
    "title": "Implement pad and accessory calibration",
    "description": "Guide the trainee through repeatable calibration and reject invalid calibration states.",
    "primaryOwner": "Max",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Mixed-Reality Application",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 2028
  },
  {
    "taskKey": "M2-MR-APP-03",
    "title": "Render tracked probe and needle state",
    "description": "Display or internally model the calibrated physical props with low-latency updates.",
    "primaryOwner": "Max",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Mixed-Reality Application",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 2029
  },
  {
    "taskKey": "M2-MR-APP-04",
    "title": "Calculate the live ultrasound imaging plane",
    "description": "Derive the image plane from the tracked probe pose.",
    "primaryOwner": "Max",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Mixed-Reality Application",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 2030
  },
  {
    "taskKey": "M2-MR-APP-05",
    "title": "Calculate needle-plane alignment and tip visibility",
    "description": "Determine shaft intersection, tip visibility, and alignment error continuously.",
    "primaryOwner": "Max",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Mixed-Reality Application",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 2031
  },
  {
    "taskKey": "M2-MR-APP-06",
    "title": "Detect needle translation and rotation",
    "description": "Produce filtered motion signals that remain sensitive to intentional unsafe movement.",
    "primaryOwner": "Max",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Mixed-Reality Application",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 2032
  },
  {
    "taskKey": "M2-MR-APP-07",
    "title": "Implement critical unvisualized-movement response",
    "description": "Trigger immediate visual, audio, or haptic feedback and pause safe progression when movement occurs without tip visualization.",
    "primaryOwner": "Max",
    "status": "locked",
    "priority": "critical",
    "workstream": "MR Training \u2014 Mixed-Reality Application",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 2033
  },
  {
    "taskKey": "M2-MR-APP-08",
    "title": "Implement session controls and structured event logging",
    "description": "Add start, pause, reset, completion, and durable event capture for every attempt.",
    "primaryOwner": "Max",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Mixed-Reality Application",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 2034
  },
  {
    "taskKey": "M2-MR-APP-09",
    "title": "Add handedness and essential accessibility settings",
    "description": "Support left/right-handed use and readable, audible safety feedback.",
    "primaryOwner": "Max",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Mixed-Reality Application",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 2035
  },
  {
    "taskKey": "M2-MR-CONTENT-01",
    "title": "Select the M2 synthetic or phantom imaging approach",
    "description": "Choose the lowest-risk content method that can credibly demonstrate probe-plane and needle alignment.",
    "primaryOwner": "Samir",
    "status": "ready",
    "priority": "high",
    "workstream": "MR Training \u2014 Ultrasound Simulation Content",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 2036
  },
  {
    "taskKey": "M2-MR-CONTENT-02",
    "title": "Create the first simulated ultrasound environment",
    "description": "Build a controlled image space with a target, depth cues, and clear needle response.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Ultrasound Simulation Content",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 2037
  },
  {
    "taskKey": "M2-MR-CONTENT-03",
    "title": "Make imagery respond to probe pose",
    "description": "Update the simulated image based on probe position and orientation.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Ultrasound Simulation Content",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 2038
  },
  {
    "taskKey": "M2-MR-CONTENT-04",
    "title": "Make needle visibility respond to plane alignment",
    "description": "Show shaft and tip only when geometry supports visualization rather than through a cosmetic overlay.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Ultrasound Simulation Content",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 2039
  },
  {
    "taskKey": "M2-MR-CONTENT-05",
    "title": "Create angle, depth, and tip-loss exercise variations",
    "description": "Provide enough controlled variation to test acquisition, maintenance, loss, and reacquisition.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Ultrasound Simulation Content",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 2040
  },
  {
    "taskKey": "M2-MR-CONTENT-06",
    "title": "Complete internal clinical review of simulated behavior",
    "description": "Confirm that the exercise reinforces safe technique without overstating anatomical realism.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Ultrasound Simulation Content",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 2041
  },
  {
    "taskKey": "M2-MR-SCORE-01",
    "title": "Implement the safety-first score hierarchy",
    "description": "Make critical safety behavior outrank speed, target accuracy, and completion time.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Safety, Scoring & Progression",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 2042
  },
  {
    "taskKey": "M2-MR-SCORE-02",
    "title": "Record every unvisualized needle-movement event",
    "description": "Capture event timing, duration, movement magnitude, visibility confidence, and recovery.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "critical",
    "workstream": "MR Training \u2014 Safety, Scoring & Progression",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 2043
  },
  {
    "taskKey": "M2-MR-SCORE-03",
    "title": "Require tip reacquisition before progression resumes",
    "description": "Block advancement until visualization has been re-established for the defined confirmation interval.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Safety, Scoring & Progression",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 2044
  },
  {
    "taskKey": "M2-MR-SCORE-04",
    "title": "Calculate core performance metrics",
    "description": "Measure tip-visible time, unsafe-motion time, alignment error, probe efficiency, path smoothness, overshoot, and completion time.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Safety, Scoring & Progression",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 2045
  },
  {
    "taskKey": "M2-MR-SCORE-05",
    "title": "Define level completion and automatic failure rules",
    "description": "Prevent users from passing through speed or accuracy while violating the safety invariant.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Safety, Scoring & Progression",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 2046
  },
  {
    "taskKey": "M2-MR-SCORE-06",
    "title": "Generate trainee coaching feedback",
    "description": "Return specific post-attempt guidance tied to detected behaviors.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Safety, Scoring & Progression",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 2047
  },
  {
    "taskKey": "M2-MR-SCORE-07",
    "title": "Create the M2 progression sequence",
    "description": "Build introductory levels from static alignment through deliberate tip loss and safe recovery.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Safety, Scoring & Progression",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 2048
  },
  {
    "taskKey": "M2-MR-PORTAL-01",
    "title": "Define trainee, exercise, session, and safety-event records",
    "description": "Create the minimum additive data model needed for assignments, progress, and evidence.",
    "primaryOwner": "Max",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Portal & Data Integration",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 2049
  },
  {
    "taskKey": "M2-MR-PORTAL-02",
    "title": "Create the internal Training portal entry point",
    "description": "Add an internal-only route or launch surface without exposing draft training content to clients.",
    "primaryOwner": "Max",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Portal & Data Integration",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 2050
  },
  {
    "taskKey": "M2-MR-PORTAL-03",
    "title": "Implement Quest session launch or deep link",
    "description": "Connect the selected exercise and authenticated trainee to the headset runtime.",
    "primaryOwner": "Max",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Portal & Data Integration",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 2051
  },
  {
    "taskKey": "M2-MR-PORTAL-04",
    "title": "Synchronize prototype results to the portal",
    "description": "Return scores, critical violations, completion state, and diagnostics.",
    "primaryOwner": "Max",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Portal & Data Integration",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 2052
  },
  {
    "taskKey": "M2-MR-PORTAL-05",
    "title": "Display internal progress and safety metrics",
    "description": "Provide a minimal review surface for internal testing and clinical evaluation.",
    "primaryOwner": "Max",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Portal & Data Integration",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 2053
  },
  {
    "taskKey": "M2-MR-PORTAL-06",
    "title": "Define future block-pack entitlement boundaries",
    "description": "Document how purchased block packs and organization licensing will later be enforced.",
    "primaryOwner": "Max",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Portal & Data Integration",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 2054
  },
  {
    "taskKey": "M2-MR-RISK-01",
    "title": "Define educational-use and non-certification language",
    "description": "State that the prototype trains component skills and does not certify clinical competency or replace supervised training.",
    "primaryOwner": "Samir",
    "status": "ready",
    "priority": "high",
    "workstream": "MR Training \u2014 QA, Legal, Safety & IP",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": true,
    "legalGateFlag": true,
    "changedByNewInfo": true,
    "sortOrder": 2055
  },
  {
    "taskKey": "M2-MR-RISK-02",
    "title": "Complete prototype hardware hazard analysis",
    "description": "Assess needle injury, tracker detachment, headset collision, cleaning, and equipment risks.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 QA, Legal, Safety & IP",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": true,
    "legalGateFlag": true,
    "changedByNewInfo": true,
    "sortOrder": 2056
  },
  {
    "taskKey": "M2-MR-RISK-03",
    "title": "Define privacy and training-data controls",
    "description": "Set collection, access, retention, and deletion rules for prototype telemetry.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 QA, Legal, Safety & IP",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": true,
    "legalGateFlag": true,
    "changedByNewInfo": true,
    "sortOrder": 2057
  },
  {
    "taskKey": "M2-MR-RISK-04",
    "title": "Define future patient-data consent and de-identification requirements",
    "description": "Establish gates before real ultrasound datasets may be captured or used.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 QA, Legal, Safety & IP",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": true,
    "legalGateFlag": true,
    "changedByNewInfo": true,
    "sortOrder": 2058
  },
  {
    "taskKey": "M2-MR-RISK-05",
    "title": "Review contractor IP and work-for-hire requirements",
    "description": "Ensure software, hardware designs, datasets, and annotations are owned or properly licensed by Block Ops.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 QA, Legal, Safety & IP",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": true,
    "legalGateFlag": true,
    "changedByNewInfo": true,
    "sortOrder": 2059
  },
  {
    "taskKey": "M2-MR-RISK-06",
    "title": "Evaluate protectable intellectual property",
    "description": "Review tracking, calibration, safety detection, scoring, and curriculum innovations with qualified counsel.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 QA, Legal, Safety & IP",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": true,
    "legalGateFlag": true,
    "changedByNewInfo": true,
    "sortOrder": 2060
  },
  {
    "taskKey": "M2-MR-RISK-07",
    "title": "Complete M2 legal and safety release review",
    "description": "Record counsel-required items and approve only the bounded internal prototype use.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 QA, Legal, Safety & IP",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": true,
    "legalGateFlag": true,
    "changedByNewInfo": true,
    "sortOrder": 2061
  },
  {
    "taskKey": "M2-MR-VALID-01",
    "title": "Create the M2 internal test protocol",
    "description": "Define devices, exercises, intentional violations, success thresholds, evidence capture, and defect severity.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Prototype Validation",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 2062
  },
  {
    "taskKey": "M2-MR-VALID-02",
    "title": "Recruit and brief internal clinical testers",
    "description": "Prepare qualified testers to assess safety behavior, usability, and realism within prototype limits.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Prototype Validation",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 2063
  },
  {
    "taskKey": "M2-MR-VALID-03",
    "title": "Test intentional unvisualized advancement detection",
    "description": "Measure detection sensitivity across angles, speeds, depths, and occlusion conditions.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "critical",
    "workstream": "MR Training \u2014 Prototype Validation",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 2064
  },
  {
    "taskKey": "M2-MR-VALID-04",
    "title": "Measure false-positive and missed safety violations",
    "description": "Quantify failure modes and set remediation thresholds.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Prototype Validation",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 2065
  },
  {
    "taskKey": "M2-MR-VALID-05",
    "title": "Run complete internal training demonstrations",
    "description": "Exercise calibration through session review with repeatable evidence.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Prototype Validation",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 2066
  },
  {
    "taskKey": "M2-MR-VALID-06",
    "title": "Resolve all critical M2 defects",
    "description": "Close or explicitly disposition safety-critical, tracking-critical, and data-integrity failures.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Prototype Validation",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 2067
  },
  {
    "taskKey": "M2-MR-VALID-07",
    "title": "Pass the M2 MR prototype acceptance gate",
    "description": "Demonstrate reliable enforcement of never moving an unvisualized needle and approve external-validation preparation.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "critical",
    "workstream": "MR Training \u2014 Prototype Validation",
    "milestoneSlug": "m2-mock-run-complete",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 2068
  },
  {
    "taskKey": "M3-MR-CLINVAL-01",
    "title": "Recruit attending anesthesiologist reviewers",
    "description": "Select external reviewers and document conflicts, qualifications, scope, and expectations.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 External Clinical Validation",
    "milestoneSlug": "m3-trusted-anesthesiologist-validation",
    "complianceFlag": true,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 3069
  },
  {
    "taskKey": "M3-MR-CLINVAL-02",
    "title": "Create the structured external review protocol",
    "description": "Define exercises, ratings, qualitative feedback, safety tests, and acceptance criteria.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 External Clinical Validation",
    "milestoneSlug": "m3-trusted-anesthesiologist-validation",
    "complianceFlag": true,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 3070
  },
  {
    "taskKey": "M3-MR-CLINVAL-03",
    "title": "Compare expert and novice performance patterns",
    "description": "Assess whether metrics and violations distinguish expected skill behaviors without making unsupported competency claims.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 External Clinical Validation",
    "milestoneSlug": "m3-trusted-anesthesiologist-validation",
    "complianceFlag": true,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 3071
  },
  {
    "taskKey": "M3-MR-CLINVAL-04",
    "title": "Refine visualization and movement thresholds",
    "description": "Update thresholds only from documented clinical and technical evidence.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 External Clinical Validation",
    "milestoneSlug": "m3-trusted-anesthesiologist-validation",
    "complianceFlag": true,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 3072
  },
  {
    "taskKey": "M3-MR-CLINVAL-05",
    "title": "Complete external clinical validation signoff",
    "description": "Resolve critical findings and record whether the M3 review/test has passed.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 External Clinical Validation",
    "milestoneSlug": "m3-trusted-anesthesiologist-validation",
    "complianceFlag": true,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 3073
  },
  {
    "taskKey": "M3-MR-ANATOMY-01",
    "title": "Select the first block-specific training pack",
    "description": "Choose the first block based on training value, capture feasibility, market value, and safety scope.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Anatomy & Block-Pack Pipeline",
    "milestoneSlug": "m3-trusted-anesthesiologist-validation",
    "complianceFlag": true,
    "legalGateFlag": true,
    "changedByNewInfo": true,
    "sortOrder": 3074
  },
  {
    "taskKey": "M3-MR-ANATOMY-02",
    "title": "Define ultrasound capture, consent, and de-identification protocol",
    "description": "Create the governed process required before collecting real patient or volunteer data.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Anatomy & Block-Pack Pipeline",
    "milestoneSlug": "m3-trusted-anesthesiologist-validation",
    "complianceFlag": true,
    "legalGateFlag": true,
    "changedByNewInfo": true,
    "sortOrder": 3075
  },
  {
    "taskKey": "M3-MR-ANATOMY-03",
    "title": "Acquire or license the first volumetric dataset set",
    "description": "Obtain legally usable source data with provenance and usage rights.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Anatomy & Block-Pack Pipeline",
    "milestoneSlug": "m3-trusted-anesthesiologist-validation",
    "complianceFlag": true,
    "legalGateFlag": true,
    "changedByNewInfo": true,
    "sortOrder": 3076
  },
  {
    "taskKey": "M3-MR-ANATOMY-04",
    "title": "Register and annotate anatomy and danger zones",
    "description": "Map nerves, vessels, fascia, bone, targets, and prohibited regions for simulation.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Anatomy & Block-Pack Pipeline",
    "milestoneSlug": "m3-trusted-anesthesiologist-validation",
    "complianceFlag": true,
    "legalGateFlag": true,
    "changedByNewInfo": true,
    "sortOrder": 3077
  },
  {
    "taskKey": "M3-MR-ANATOMY-05",
    "title": "Build anatomical variation and difficulty cases",
    "description": "Create multiple governed scenarios rather than presenting one anatomy as universal.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Anatomy & Block-Pack Pipeline",
    "milestoneSlug": "m3-trusted-anesthesiologist-validation",
    "complianceFlag": true,
    "legalGateFlag": true,
    "changedByNewInfo": true,
    "sortOrder": 3078
  },
  {
    "taskKey": "M3-MR-ANATOMY-06",
    "title": "Complete clinical fact review of the first block pack",
    "description": "Approve every client-visible or trainee-visible clinical element before release.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Anatomy & Block-Pack Pipeline",
    "milestoneSlug": "m3-trusted-anesthesiologist-validation",
    "complianceFlag": true,
    "legalGateFlag": true,
    "changedByNewInfo": true,
    "sortOrder": 3079
  },
  {
    "taskKey": "M3-MR-HARDEN-01",
    "title": "Improve tracking precision, latency, and depth estimation",
    "description": "Address M2 measurement limits using external validation evidence.",
    "primaryOwner": "Max",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Technical Hardening",
    "milestoneSlug": "m3-trusted-anesthesiologist-validation",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 3080
  },
  {
    "taskKey": "M3-MR-HARDEN-02",
    "title": "Add realistic volumetric ultrasound rendering",
    "description": "Reslice registered data according to live probe pose and preserve needle-plane behavior.",
    "primaryOwner": "Max",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Technical Hardening",
    "milestoneSlug": "m3-trusted-anesthesiologist-validation",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 3081
  },
  {
    "taskKey": "M3-MR-HARDEN-03",
    "title": "Add cloud synchronization and resilient offline recovery",
    "description": "Protect sessions from connectivity loss and reconcile results safely.",
    "primaryOwner": "Max",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Technical Hardening",
    "milestoneSlug": "m3-trusted-anesthesiologist-validation",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 3082
  },
  {
    "taskKey": "M3-MR-HARDEN-04",
    "title": "Add instructor accounts, assignments, and review tools",
    "description": "Support governed external testing and future site delivery.",
    "primaryOwner": "Max",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Technical Hardening",
    "milestoneSlug": "m3-trusted-anesthesiologist-validation",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 3083
  },
  {
    "taskKey": "M3-MR-HARDEN-05",
    "title": "Add block-pack installation and entitlement controls",
    "description": "Enforce licensed access without exposing draft or unapproved packs.",
    "primaryOwner": "Max",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Technical Hardening",
    "milestoneSlug": "m3-trusted-anesthesiologist-validation",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 3084
  },
  {
    "taskKey": "M3-MR-HARDEN-06",
    "title": "Harden crash reporting, updates, and device diagnostics",
    "description": "Create the support evidence needed for controlled deployments.",
    "primaryOwner": "Max",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Technical Hardening",
    "milestoneSlug": "m3-trusted-anesthesiologist-validation",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 3085
  },
  {
    "taskKey": "M3-MR-EXTTEST-01",
    "title": "Run external attending usability sessions",
    "description": "Execute the approved protocol and preserve results, observations, and incidents.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 External Test Execution",
    "milestoneSlug": "m3-trusted-anesthesiologist-validation",
    "complianceFlag": true,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 3086
  },
  {
    "taskKey": "M3-MR-EXTTEST-02",
    "title": "Analyze safety-rule detection and behavior-change evidence",
    "description": "Determine whether warnings reliably stop unsafe movement and promote probe-based reacquisition.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 External Test Execution",
    "milestoneSlug": "m3-trusted-anesthesiologist-validation",
    "complianceFlag": true,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 3087
  },
  {
    "taskKey": "M3-MR-EXTTEST-03",
    "title": "Resolve critical external-review findings",
    "description": "Rework clinical content, hardware, thresholds, or UX where evidence requires it.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 External Test Execution",
    "milestoneSlug": "m3-trusted-anesthesiologist-validation",
    "complianceFlag": true,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 3088
  },
  {
    "taskKey": "M3-MR-EXTTEST-04",
    "title": "Repeat failed or materially changed validation tests",
    "description": "Do not carry forward stale evidence after significant changes.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 External Test Execution",
    "milestoneSlug": "m3-trusted-anesthesiologist-validation",
    "complianceFlag": true,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 3089
  },
  {
    "taskKey": "M3-MR-EXTTEST-05",
    "title": "Pass the M3 MR external-validation gate",
    "description": "Confirm attending review is complete and the MR platform has passed its defined external test.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "critical",
    "workstream": "MR Training \u2014 External Test Execution",
    "milestoneSlug": "m3-trusted-anesthesiologist-validation",
    "complianceFlag": true,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 3090
  },
  {
    "taskKey": "M4-MR-SITE-01",
    "title": "Select the foundational-client training use case",
    "description": "Define the bounded site objective, trainees, instructors, and approved block packs.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Foundational Client Deployment",
    "milestoneSlug": "m4-validation-closed",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 4091
  },
  {
    "taskKey": "M4-MR-SITE-02",
    "title": "Complete site hardware, space, network, and safety assessment",
    "description": "Confirm the training station can be deployed and operated safely.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Foundational Client Deployment",
    "milestoneSlug": "m4-validation-closed",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 4092
  },
  {
    "taskKey": "M4-MR-SITE-03",
    "title": "Deploy and verify site training kits",
    "description": "Install, calibrate, inventory, and acceptance-test every device and replaceable component.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Foundational Client Deployment",
    "milestoneSlug": "m4-validation-closed",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 4093
  },
  {
    "taskKey": "M4-MR-SITE-04",
    "title": "Train site administrators and instructors",
    "description": "Teach setup, assignment, cleaning, troubleshooting, incident response, and escalation.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Foundational Client Deployment",
    "milestoneSlug": "m4-validation-closed",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 4094
  },
  {
    "taskKey": "M4-MR-SITE-05",
    "title": "Establish site operating and support procedures",
    "description": "Document storage, cleaning, replacement, updates, support, and downtime workflows.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Foundational Client Deployment",
    "milestoneSlug": "m4-validation-closed",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 4095
  },
  {
    "taskKey": "M4-MR-PROD-01",
    "title": "Add organization, site, role, and device registration",
    "description": "Create production-grade tenant and hardware boundaries.",
    "primaryOwner": "Max",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Production Platform",
    "milestoneSlug": "m4-validation-closed",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 4096
  },
  {
    "taskKey": "M4-MR-PROD-02",
    "title": "Add production licensing and block-pack entitlements",
    "description": "Connect contracts and approved access to enforceable technical controls.",
    "primaryOwner": "Max",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Production Platform",
    "milestoneSlug": "m4-validation-closed",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 4097
  },
  {
    "taskKey": "M4-MR-PROD-03",
    "title": "Add monitoring, backups, recovery, and secure updates",
    "description": "Operate the platform with auditable reliability and recoverability.",
    "primaryOwner": "Max",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Production Platform",
    "milestoneSlug": "m4-validation-closed",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 4098
  },
  {
    "taskKey": "M4-MR-PROD-04",
    "title": "Add privacy retention and support diagnostics",
    "description": "Implement approved data controls and least-privilege troubleshooting.",
    "primaryOwner": "Max",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Production Platform",
    "milestoneSlug": "m4-validation-closed",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 4099
  },
  {
    "taskKey": "M4-MR-PROD-05",
    "title": "Pass the production deployment readiness review",
    "description": "Prove the site can operate without unmanaged prototype dependencies.",
    "primaryOwner": "Max",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Production Platform",
    "milestoneSlug": "m4-validation-closed",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 4100
  },
  {
    "taskKey": "M4-MR-OUTCOMES-01",
    "title": "Establish baseline trainee measurements",
    "description": "Capture initial performance using the approved M4 protocol.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Outcomes & Adoption",
    "milestoneSlug": "m4-validation-closed",
    "complianceFlag": true,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 4101
  },
  {
    "taskKey": "M4-MR-OUTCOMES-02",
    "title": "Assign and monitor training pathways",
    "description": "Track completion, critical violations, retries, and safe progression.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Outcomes & Adoption",
    "milestoneSlug": "m4-validation-closed",
    "complianceFlag": true,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 4102
  },
  {
    "taskKey": "M4-MR-OUTCOMES-03",
    "title": "Measure repeated-session improvement",
    "description": "Analyze behavior changes without overstating clinical-outcome causality.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Outcomes & Adoption",
    "milestoneSlug": "m4-validation-closed",
    "complianceFlag": true,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 4103
  },
  {
    "taskKey": "M4-MR-OUTCOMES-04",
    "title": "Collect instructor and trainee usability feedback",
    "description": "Identify abandonment, friction, realism concerns, and support needs.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Outcomes & Adoption",
    "milestoneSlug": "m4-validation-closed",
    "complianceFlag": true,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 4104
  },
  {
    "taskKey": "M4-MR-OUTCOMES-05",
    "title": "Complete the foundational-client outcomes review",
    "description": "Document results, limitations, incidents, and required platform changes.",
    "primaryOwner": "Samir",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Outcomes & Adoption",
    "milestoneSlug": "m4-validation-closed",
    "complianceFlag": true,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 4105
  },
  {
    "taskKey": "M4-MR-COMM-01",
    "title": "Develop the evidence-aligned platform narrative",
    "description": "Position the platform around validated component-skill training and Block Ops comprehensiveness.",
    "primaryOwner": "Adrian",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Commercial Readiness",
    "milestoneSlug": "m4-validation-closed",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 4106
  },
  {
    "taskKey": "M4-MR-COMM-02",
    "title": "Define packaging and pricing hypotheses",
    "description": "Model hardware, platform access, block packs, facility licensing, and support.",
    "primaryOwner": "Adrian",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Commercial Readiness",
    "milestoneSlug": "m4-validation-closed",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 4107
  },
  {
    "taskKey": "M4-MR-COMM-03",
    "title": "Create approved demonstration materials",
    "description": "Use only validated capabilities and reviewed claims.",
    "primaryOwner": "Adrian",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Commercial Readiness",
    "milestoneSlug": "m4-validation-closed",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 4108
  },
  {
    "taskKey": "M4-MR-COMM-04",
    "title": "Define facility and clinician buyer profiles",
    "description": "Identify acquisition relevance, decision makers, procurement needs, and adoption barriers.",
    "primaryOwner": "Adrian",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Commercial Readiness",
    "milestoneSlug": "m4-validation-closed",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 4109
  },
  {
    "taskKey": "M4-MR-COMM-05",
    "title": "Build the post-M4 commercialization pipeline",
    "description": "Create qualification criteria and outreach targets for controlled expansion.",
    "primaryOwner": "Adrian",
    "status": "locked",
    "priority": "high",
    "workstream": "MR Training \u2014 Commercial Readiness",
    "milestoneSlug": "m4-validation-closed",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 4110
  },
  {
    "taskKey": "M4-MR-COMM-06",
    "title": "Pass the M4 MR foundational-client success gate",
    "description": "Confirm successful site delivery and approve the next commercialization stage.",
    "primaryOwner": "Adrian",
    "status": "locked",
    "priority": "critical",
    "workstream": "MR Training \u2014 Commercial Readiness",
    "milestoneSlug": "m4-validation-closed",
    "complianceFlag": false,
    "legalGateFlag": false,
    "changedByNewInfo": true,
    "sortOrder": 4111
  }
];

export const MR_TRAINING_DEPENDENCIES = [
  {
    "taskKey": "M2-MR-CLIN-02",
    "dependsOnTaskKey": "M2-MR-CLIN-01",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-CLIN-03",
    "dependsOnTaskKey": "M2-MR-CLIN-02",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-CLIN-04",
    "dependsOnTaskKey": "M2-MR-CLIN-03",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-CLIN-05",
    "dependsOnTaskKey": "M2-MR-CLIN-04",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-CLIN-06",
    "dependsOnTaskKey": "M2-MR-CLIN-05",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-ARCH-02",
    "dependsOnTaskKey": "M2-MR-ARCH-01",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-ARCH-03",
    "dependsOnTaskKey": "M2-MR-ARCH-02",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-ARCH-04",
    "dependsOnTaskKey": "M2-MR-ARCH-03",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-ARCH-05",
    "dependsOnTaskKey": "M2-MR-ARCH-04",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-ARCH-06",
    "dependsOnTaskKey": "M2-MR-ARCH-05",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-TRACK-02",
    "dependsOnTaskKey": "M2-MR-TRACK-01",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-TRACK-03",
    "dependsOnTaskKey": "M2-MR-TRACK-02",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-TRACK-04",
    "dependsOnTaskKey": "M2-MR-TRACK-03",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-TRACK-05",
    "dependsOnTaskKey": "M2-MR-TRACK-04",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-TRACK-06",
    "dependsOnTaskKey": "M2-MR-TRACK-05",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-TRACK-07",
    "dependsOnTaskKey": "M2-MR-TRACK-06",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-TRACK-08",
    "dependsOnTaskKey": "M2-MR-TRACK-07",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-HARD-02",
    "dependsOnTaskKey": "M2-MR-HARD-01",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-HARD-03",
    "dependsOnTaskKey": "M2-MR-HARD-02",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-HARD-04",
    "dependsOnTaskKey": "M2-MR-HARD-03",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-HARD-05",
    "dependsOnTaskKey": "M2-MR-HARD-04",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-HARD-06",
    "dependsOnTaskKey": "M2-MR-HARD-05",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-HARD-07",
    "dependsOnTaskKey": "M2-MR-HARD-06",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-APP-02",
    "dependsOnTaskKey": "M2-MR-APP-01",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-APP-03",
    "dependsOnTaskKey": "M2-MR-APP-02",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-APP-04",
    "dependsOnTaskKey": "M2-MR-APP-03",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-APP-05",
    "dependsOnTaskKey": "M2-MR-APP-04",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-APP-06",
    "dependsOnTaskKey": "M2-MR-APP-05",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-APP-07",
    "dependsOnTaskKey": "M2-MR-APP-06",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-APP-08",
    "dependsOnTaskKey": "M2-MR-APP-07",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-APP-09",
    "dependsOnTaskKey": "M2-MR-APP-08",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-CONTENT-02",
    "dependsOnTaskKey": "M2-MR-CONTENT-01",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-CONTENT-03",
    "dependsOnTaskKey": "M2-MR-CONTENT-02",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-CONTENT-04",
    "dependsOnTaskKey": "M2-MR-CONTENT-03",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-CONTENT-05",
    "dependsOnTaskKey": "M2-MR-CONTENT-04",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-CONTENT-06",
    "dependsOnTaskKey": "M2-MR-CONTENT-05",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-SCORE-02",
    "dependsOnTaskKey": "M2-MR-SCORE-01",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-SCORE-03",
    "dependsOnTaskKey": "M2-MR-SCORE-02",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-SCORE-04",
    "dependsOnTaskKey": "M2-MR-SCORE-03",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-SCORE-05",
    "dependsOnTaskKey": "M2-MR-SCORE-04",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-SCORE-06",
    "dependsOnTaskKey": "M2-MR-SCORE-05",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-SCORE-07",
    "dependsOnTaskKey": "M2-MR-SCORE-06",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-PORTAL-02",
    "dependsOnTaskKey": "M2-MR-PORTAL-01",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-PORTAL-03",
    "dependsOnTaskKey": "M2-MR-PORTAL-02",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-PORTAL-04",
    "dependsOnTaskKey": "M2-MR-PORTAL-03",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-PORTAL-05",
    "dependsOnTaskKey": "M2-MR-PORTAL-04",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-PORTAL-06",
    "dependsOnTaskKey": "M2-MR-PORTAL-05",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-RISK-02",
    "dependsOnTaskKey": "M2-MR-RISK-01",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-RISK-03",
    "dependsOnTaskKey": "M2-MR-RISK-02",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-RISK-04",
    "dependsOnTaskKey": "M2-MR-RISK-03",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-RISK-05",
    "dependsOnTaskKey": "M2-MR-RISK-04",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-RISK-06",
    "dependsOnTaskKey": "M2-MR-RISK-05",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-RISK-07",
    "dependsOnTaskKey": "M2-MR-RISK-06",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-VALID-02",
    "dependsOnTaskKey": "M2-MR-VALID-01",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-VALID-03",
    "dependsOnTaskKey": "M2-MR-VALID-02",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-VALID-04",
    "dependsOnTaskKey": "M2-MR-VALID-03",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-VALID-05",
    "dependsOnTaskKey": "M2-MR-VALID-04",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-VALID-06",
    "dependsOnTaskKey": "M2-MR-VALID-05",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-VALID-07",
    "dependsOnTaskKey": "M2-MR-VALID-06",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M3-MR-CLINVAL-02",
    "dependsOnTaskKey": "M3-MR-CLINVAL-01",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M3-MR-CLINVAL-03",
    "dependsOnTaskKey": "M3-MR-CLINVAL-02",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M3-MR-CLINVAL-04",
    "dependsOnTaskKey": "M3-MR-CLINVAL-03",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M3-MR-CLINVAL-05",
    "dependsOnTaskKey": "M3-MR-CLINVAL-04",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M3-MR-ANATOMY-02",
    "dependsOnTaskKey": "M3-MR-ANATOMY-01",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M3-MR-ANATOMY-03",
    "dependsOnTaskKey": "M3-MR-ANATOMY-02",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M3-MR-ANATOMY-04",
    "dependsOnTaskKey": "M3-MR-ANATOMY-03",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M3-MR-ANATOMY-05",
    "dependsOnTaskKey": "M3-MR-ANATOMY-04",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M3-MR-ANATOMY-06",
    "dependsOnTaskKey": "M3-MR-ANATOMY-05",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M3-MR-HARDEN-02",
    "dependsOnTaskKey": "M3-MR-HARDEN-01",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M3-MR-HARDEN-03",
    "dependsOnTaskKey": "M3-MR-HARDEN-02",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M3-MR-HARDEN-04",
    "dependsOnTaskKey": "M3-MR-HARDEN-03",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M3-MR-HARDEN-05",
    "dependsOnTaskKey": "M3-MR-HARDEN-04",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M3-MR-HARDEN-06",
    "dependsOnTaskKey": "M3-MR-HARDEN-05",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M3-MR-EXTTEST-02",
    "dependsOnTaskKey": "M3-MR-EXTTEST-01",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M3-MR-EXTTEST-03",
    "dependsOnTaskKey": "M3-MR-EXTTEST-02",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M3-MR-EXTTEST-04",
    "dependsOnTaskKey": "M3-MR-EXTTEST-03",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M3-MR-EXTTEST-05",
    "dependsOnTaskKey": "M3-MR-EXTTEST-04",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M4-MR-SITE-02",
    "dependsOnTaskKey": "M4-MR-SITE-01",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M4-MR-SITE-03",
    "dependsOnTaskKey": "M4-MR-SITE-02",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M4-MR-SITE-04",
    "dependsOnTaskKey": "M4-MR-SITE-03",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M4-MR-SITE-05",
    "dependsOnTaskKey": "M4-MR-SITE-04",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M4-MR-PROD-02",
    "dependsOnTaskKey": "M4-MR-PROD-01",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M4-MR-PROD-03",
    "dependsOnTaskKey": "M4-MR-PROD-02",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M4-MR-PROD-04",
    "dependsOnTaskKey": "M4-MR-PROD-03",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M4-MR-PROD-05",
    "dependsOnTaskKey": "M4-MR-PROD-04",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M4-MR-OUTCOMES-02",
    "dependsOnTaskKey": "M4-MR-OUTCOMES-01",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M4-MR-OUTCOMES-03",
    "dependsOnTaskKey": "M4-MR-OUTCOMES-02",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M4-MR-OUTCOMES-04",
    "dependsOnTaskKey": "M4-MR-OUTCOMES-03",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M4-MR-OUTCOMES-05",
    "dependsOnTaskKey": "M4-MR-OUTCOMES-04",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M4-MR-COMM-02",
    "dependsOnTaskKey": "M4-MR-COMM-01",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M4-MR-COMM-03",
    "dependsOnTaskKey": "M4-MR-COMM-02",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M4-MR-COMM-04",
    "dependsOnTaskKey": "M4-MR-COMM-03",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M4-MR-COMM-05",
    "dependsOnTaskKey": "M4-MR-COMM-04",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M4-MR-COMM-06",
    "dependsOnTaskKey": "M4-MR-COMM-05",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-TRACK-01",
    "dependsOnTaskKey": "M2-MR-ARCH-01",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-TRACK-02",
    "dependsOnTaskKey": "M2-MR-HARD-01",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-APP-01",
    "dependsOnTaskKey": "M2-MR-ARCH-02",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-APP-02",
    "dependsOnTaskKey": "M2-MR-TRACK-04",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-APP-05",
    "dependsOnTaskKey": "M2-MR-TRACK-07",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-APP-07",
    "dependsOnTaskKey": "M2-MR-CLIN-05",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-SCORE-01",
    "dependsOnTaskKey": "M2-MR-CLIN-04",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-SCORE-02",
    "dependsOnTaskKey": "M2-MR-APP-07",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-PORTAL-02",
    "dependsOnTaskKey": "M2-MR-ARCH-02",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-VALID-01",
    "dependsOnTaskKey": "M2-MR-CLIN-06",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-VALID-03",
    "dependsOnTaskKey": "M2-MR-APP-07",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-VALID-07",
    "dependsOnTaskKey": "M2-MR-TRACK-08",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-VALID-07",
    "dependsOnTaskKey": "M2-MR-HARD-07",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-VALID-07",
    "dependsOnTaskKey": "M2-MR-APP-09",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-VALID-07",
    "dependsOnTaskKey": "M2-MR-CONTENT-06",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-VALID-07",
    "dependsOnTaskKey": "M2-MR-SCORE-07",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-VALID-07",
    "dependsOnTaskKey": "M2-MR-PORTAL-06",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M2-MR-VALID-07",
    "dependsOnTaskKey": "M2-MR-RISK-07",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M3-MR-CLINVAL-01",
    "dependsOnTaskKey": "M2-MR-VALID-07",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M3-MR-ANATOMY-01",
    "dependsOnTaskKey": "M2-MR-VALID-07",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M3-MR-HARDEN-01",
    "dependsOnTaskKey": "M2-MR-VALID-07",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M3-MR-EXTTEST-01",
    "dependsOnTaskKey": "M2-MR-VALID-07",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M3-MR-EXTTEST-05",
    "dependsOnTaskKey": "M3-MR-CLINVAL-05",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M3-MR-EXTTEST-05",
    "dependsOnTaskKey": "M3-MR-ANATOMY-06",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M3-MR-EXTTEST-05",
    "dependsOnTaskKey": "M3-MR-HARDEN-06",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M4-MR-SITE-01",
    "dependsOnTaskKey": "M3-MR-EXTTEST-05",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M4-MR-PROD-01",
    "dependsOnTaskKey": "M3-MR-EXTTEST-05",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M4-MR-OUTCOMES-01",
    "dependsOnTaskKey": "M3-MR-EXTTEST-05",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M4-MR-COMM-01",
    "dependsOnTaskKey": "M3-MR-EXTTEST-05",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M4-MR-COMM-06",
    "dependsOnTaskKey": "M4-MR-SITE-05",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M4-MR-COMM-06",
    "dependsOnTaskKey": "M4-MR-PROD-05",
    "dependencyType": "finish_to_start"
  },
  {
    "taskKey": "M4-MR-COMM-06",
    "dependsOnTaskKey": "M4-MR-OUTCOMES-05",
    "dependencyType": "finish_to_start"
  }
];

export const MR_TRAINING_COLLABORATORS = [
  {
    "taskKey": "M2-MR-ARCH-01",
    "collaborator": "Samir"
  },
  {
    "taskKey": "M2-MR-ARCH-02",
    "collaborator": "Samir"
  },
  {
    "taskKey": "M2-MR-ARCH-03",
    "collaborator": "Samir"
  },
  {
    "taskKey": "M2-MR-ARCH-04",
    "collaborator": "Samir"
  },
  {
    "taskKey": "M2-MR-ARCH-05",
    "collaborator": "Samir"
  },
  {
    "taskKey": "M2-MR-ARCH-06",
    "collaborator": "Samir"
  },
  {
    "taskKey": "M2-MR-TRACK-01",
    "collaborator": "Samir"
  },
  {
    "taskKey": "M2-MR-TRACK-02",
    "collaborator": "Samir"
  },
  {
    "taskKey": "M2-MR-TRACK-03",
    "collaborator": "Samir"
  },
  {
    "taskKey": "M2-MR-TRACK-04",
    "collaborator": "Samir"
  },
  {
    "taskKey": "M2-MR-TRACK-05",
    "collaborator": "Samir"
  },
  {
    "taskKey": "M2-MR-TRACK-06",
    "collaborator": "Samir"
  },
  {
    "taskKey": "M2-MR-TRACK-07",
    "collaborator": "Samir"
  },
  {
    "taskKey": "M2-MR-TRACK-08",
    "collaborator": "Samir"
  },
  {
    "taskKey": "M2-MR-APP-01",
    "collaborator": "Samir"
  },
  {
    "taskKey": "M2-MR-APP-02",
    "collaborator": "Samir"
  },
  {
    "taskKey": "M2-MR-APP-03",
    "collaborator": "Samir"
  },
  {
    "taskKey": "M2-MR-APP-04",
    "collaborator": "Samir"
  },
  {
    "taskKey": "M2-MR-APP-05",
    "collaborator": "Samir"
  },
  {
    "taskKey": "M2-MR-APP-06",
    "collaborator": "Samir"
  },
  {
    "taskKey": "M2-MR-APP-07",
    "collaborator": "Samir"
  },
  {
    "taskKey": "M2-MR-APP-08",
    "collaborator": "Samir"
  },
  {
    "taskKey": "M2-MR-APP-09",
    "collaborator": "Samir"
  },
  {
    "taskKey": "M2-MR-PORTAL-01",
    "collaborator": "Samir"
  },
  {
    "taskKey": "M2-MR-PORTAL-02",
    "collaborator": "Samir"
  },
  {
    "taskKey": "M2-MR-PORTAL-03",
    "collaborator": "Samir"
  },
  {
    "taskKey": "M2-MR-PORTAL-04",
    "collaborator": "Samir"
  },
  {
    "taskKey": "M2-MR-PORTAL-05",
    "collaborator": "Samir"
  },
  {
    "taskKey": "M2-MR-PORTAL-06",
    "collaborator": "Samir"
  },
  {
    "taskKey": "M2-MR-VALID-01",
    "collaborator": "Max"
  },
  {
    "taskKey": "M2-MR-VALID-02",
    "collaborator": "Max"
  },
  {
    "taskKey": "M2-MR-VALID-03",
    "collaborator": "Max"
  },
  {
    "taskKey": "M2-MR-VALID-04",
    "collaborator": "Max"
  },
  {
    "taskKey": "M2-MR-VALID-05",
    "collaborator": "Max"
  },
  {
    "taskKey": "M2-MR-VALID-06",
    "collaborator": "Max"
  },
  {
    "taskKey": "M2-MR-VALID-07",
    "collaborator": "Max"
  },
  {
    "taskKey": "M3-MR-CLINVAL-01",
    "collaborator": "Max"
  },
  {
    "taskKey": "M3-MR-CLINVAL-02",
    "collaborator": "Max"
  },
  {
    "taskKey": "M3-MR-CLINVAL-03",
    "collaborator": "Max"
  },
  {
    "taskKey": "M3-MR-CLINVAL-04",
    "collaborator": "Max"
  },
  {
    "taskKey": "M3-MR-CLINVAL-05",
    "collaborator": "Max"
  },
  {
    "taskKey": "M3-MR-HARDEN-01",
    "collaborator": "Samir"
  },
  {
    "taskKey": "M3-MR-HARDEN-02",
    "collaborator": "Samir"
  },
  {
    "taskKey": "M3-MR-HARDEN-03",
    "collaborator": "Samir"
  },
  {
    "taskKey": "M3-MR-HARDEN-04",
    "collaborator": "Samir"
  },
  {
    "taskKey": "M3-MR-HARDEN-05",
    "collaborator": "Samir"
  },
  {
    "taskKey": "M3-MR-HARDEN-06",
    "collaborator": "Samir"
  },
  {
    "taskKey": "M4-MR-PROD-01",
    "collaborator": "Samir"
  },
  {
    "taskKey": "M4-MR-PROD-02",
    "collaborator": "Samir"
  },
  {
    "taskKey": "M4-MR-PROD-03",
    "collaborator": "Samir"
  },
  {
    "taskKey": "M4-MR-PROD-04",
    "collaborator": "Samir"
  },
  {
    "taskKey": "M4-MR-PROD-05",
    "collaborator": "Samir"
  },
  {
    "taskKey": "M4-MR-COMM-01",
    "collaborator": "Samir"
  },
  {
    "taskKey": "M4-MR-COMM-02",
    "collaborator": "Samir"
  },
  {
    "taskKey": "M4-MR-COMM-03",
    "collaborator": "Samir"
  },
  {
    "taskKey": "M4-MR-COMM-04",
    "collaborator": "Samir"
  },
  {
    "taskKey": "M4-MR-COMM-05",
    "collaborator": "Samir"
  },
  {
    "taskKey": "M4-MR-COMM-06",
    "collaborator": "Samir"
  }
];
