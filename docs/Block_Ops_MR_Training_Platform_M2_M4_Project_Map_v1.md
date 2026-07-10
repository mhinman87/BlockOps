1|# Block Ops Mixed-Reality Needle Visualization Trainer — M2–M4 Project Map
2|
**Status:** Approved for live Mission Control activation
**Approved:** 2026-07-10
**Planning truth:** This document defines project scope; live Supabase Mission Control tracks execution.
6|
7|## Governing safety invariant
8|
9|> The trainee must never move the needle when the needle tip is not visualized. If visualization is lost, needle movement stops and the trainee reacquires the tip by adjusting the probe before continuing.
10|
11|Any measured needle translation or rotation above the calibrated noise threshold while tip visibility is below the approved confidence threshold is a critical safety violation. Safety outranks speed, target accuracy, and completion time.
12|
13|## Milestone gates
14|
15|- **M2 — Working prototype:** Quest-based coordination trainer proves tracked probe/needle alignment, pad calibration, simulated ultrasound response, unvisualized-movement detection, enforced reacquisition, scoring, and one complete internal exercise.
16|- **M3 — External validation:** Attending anesthesiologists complete the structured review/test; thresholds, content, and hardware are revised from evidence; the first governed block-pack pipeline is demonstrated.
17|- **M4 — Foundational client:** The platform is deployed and operated successfully with the foundational client, with production controls, measured adoption, and evidence-aligned commercial packaging.
18|
19|## Workflow and task map
20|
21|### M2 — MR Training — Clinical Doctrine
22|**Primary owner:** Samir
23|
24|- **M2-MR-CLIN-01 — Define the never-move-an-unvisualized-needle doctrine.** Document the governing behavior: visualize, advance, stop, confirm, and reacquire with the probe before any further needle movement.
25|- **M2-MR-CLIN-02 — Define adequate needle-tip visualization.** Specify the visual evidence and confidence threshold required before needle movement is permitted.
26|- **M2-MR-CLIN-03 — Define measurable needle movement.** Set translation and rotation thresholds that distinguish intentional movement from tracker noise.
27|- **M2-MR-CLIN-04 — Classify critical and noncritical training errors.** Define critical unvisualized movement, alignment errors, overshoot, and recoverable coaching events.
28|- **M2-MR-CLIN-05 — Define the stop-and-reacquire sequence.** Specify the required trainee response after losing the tip, including stopping the needle and moving the probe to reacquire visualization.
29|- **M2-MR-CLIN-06 — Define M2 clinical pass/fail criteria.** Set the minimum safe performance needed to complete the prototype exercise.
30|
31|### M2 — MR Training — Product & Technical Architecture
32|**Primary owner:** Max
33|
34|- **M2-MR-ARCH-01 — Choose the M2 Quest runtime.** Decide native Quest versus WebXR using tracking precision, latency, accessory support, and portal integration as selection criteria.
35|- **M2-MR-ARCH-02 — Define portal-to-headset architecture.** Specify authentication, session launch, local operation, result synchronization, and future licensing boundaries.
36|- **M2-MR-ARCH-03 — Define probe, needle, pad, and headset coordinate systems.** Document transforms and calibration relationships for every tracked physical and virtual object.
37|- **M2-MR-ARCH-04 — Define training telemetry schema.** Specify sessions, attempts, visibility state, motion events, violations, scores, and device diagnostics.
38|- **M2-MR-ARCH-05 — Create the prototype repository and environments.** Establish reproducible development, test, and Quest build environments with ownership and handoff notes.
39|- **M2-MR-ARCH-06 — Document the M2 architecture and M3 expansion path.** Record current decisions, rejected alternatives, technical risks, and the path to volumetric anatomy.
40|
41|### M2 — MR Training — Tracking & Calibration
42|**Primary owner:** Max
43|
44|- **M2-MR-TRACK-01 — Select probe and needle tracking methods.** Evaluate controllers, tracked accessories, rigid mounts, occlusion risk, safety, and achievable precision.
45|- **M2-MR-TRACK-02 — Build the tracked probe prototype.** Create and calibrate a probe-shaped prop with a known rigid transform to its tracker.
46|- **M2-MR-TRACK-03 — Build the tracked needle-handle prototype.** Create a safe tracked needle or analog with known shaft geometry and tip position.
47|- **M2-MR-TRACK-04 — Implement four-corner pad calibration.** Register pad position, orientation, dimensions, and scale in the Quest coordinate system.
48|- **M2-MR-TRACK-05 — Determine insertion-depth estimation method.** Select and test the M2 method for estimating the needle tip after it enters the silicone.
49|- **M2-MR-TRACK-06 — Measure tracking precision, drift, latency, and occlusion.** Run repeatable bench tests and record whether performance meets the defined M2 tolerance.
50|- **M2-MR-TRACK-07 — Prove simultaneous probe-plane and needle tracking.** Demonstrate reliable real-time calculation of needle alignment and intersection with the ultrasound plane.
51|- **M2-MR-TRACK-08 — Pass the M2 tracking feasibility gate.** Approve continued prototype investment only after the core tracking evidence meets acceptance criteria.
52|
53|### M2 — MR Training — Physical Training Kit
54|**Primary owner:** Samir
55|
56|- **M2-MR-HARD-01 — Define the minimum M2 physical kit.** Specify headset, probe prop, needle analog, silicone pad, calibration surface, mounts, and replaceable components.
57|- **M2-MR-HARD-02 — Select silicone pad geometry and density.** Choose dimensions and resistance appropriate for coordination training without claiming full tissue realism.
58|- **M2-MR-HARD-03 — Define safe needle specifications.** Select a blunt or otherwise controlled training instrument and document handling requirements.
59|- **M2-MR-HARD-04 — Design tracker mounts and calibration fixture.** Create stable, reproducible mounts that preserve known geometry during use.
60|- **M2-MR-HARD-05 — Produce the first complete training station.** Assemble one reproducible internal M2 kit.
61|- **M2-MR-HARD-06 — Test ergonomics, durability, and replaceability.** Exercise realistic two-handed use and document failures, wear, cleaning, and replacement needs.
62|- **M2-MR-HARD-07 — Estimate prototype and production unit economics.** Document prototype cost, likely production cost drivers, and vendor dependencies.
63|
64|### M2 — MR Training — Mixed-Reality Application
65|**Primary owner:** Max
66|
67|- **M2-MR-APP-01 — Create the Quest application shell.** Implement session setup, permissions, device checks, and the initial mixed-reality workspace.
68|- **M2-MR-APP-02 — Implement pad and accessory calibration.** Guide the trainee through repeatable calibration and reject invalid calibration states.
69|- **M2-MR-APP-03 — Render tracked probe and needle state.** Display or internally model the calibrated physical props with low-latency updates.
70|- **M2-MR-APP-04 — Calculate the live ultrasound imaging plane.** Derive the image plane from the tracked probe pose.
71|- **M2-MR-APP-05 — Calculate needle-plane alignment and tip visibility.** Determine shaft intersection, tip visibility, and alignment error continuously.
72|- **M2-MR-APP-06 — Detect needle translation and rotation.** Produce filtered motion signals that remain sensitive to intentional unsafe movement.
73|- **M2-MR-APP-07 — Implement critical unvisualized-movement response.** Trigger immediate visual, audio, or haptic feedback and pause safe progression when movement occurs without tip visualization.
74|- **M2-MR-APP-08 — Implement session controls and structured event logging.** Add start, pause, reset, completion, and durable event capture for every attempt.
75|- **M2-MR-APP-09 — Add handedness and essential accessibility settings.** Support left/right-handed use and readable, audible safety feedback.
76|
77|### M2 — MR Training — Ultrasound Simulation Content
78|**Primary owner:** Samir
79|
80|- **M2-MR-CONTENT-01 — Select the M2 synthetic or phantom imaging approach.** Choose the lowest-risk content method that can credibly demonstrate probe-plane and needle alignment.
81|- **M2-MR-CONTENT-02 — Create the first simulated ultrasound environment.** Build a controlled image space with a target, depth cues, and clear needle response.
82|- **M2-MR-CONTENT-03 — Make imagery respond to probe pose.** Update the simulated image based on probe position and orientation.
83|- **M2-MR-CONTENT-04 — Make needle visibility respond to plane alignment.** Show shaft and tip only when geometry supports visualization rather than through a cosmetic overlay.
84|- **M2-MR-CONTENT-05 — Create angle, depth, and tip-loss exercise variations.** Provide enough controlled variation to test acquisition, maintenance, loss, and reacquisition.
85|- **M2-MR-CONTENT-06 — Complete internal clinical review of simulated behavior.** Confirm that the exercise reinforces safe technique without overstating anatomical realism.
86|
87|### M2 — MR Training — Safety, Scoring & Progression
88|**Primary owner:** Samir
89|
90|- **M2-MR-SCORE-01 — Implement the safety-first score hierarchy.** Make critical safety behavior outrank speed, target accuracy, and completion time.
91|- **M2-MR-SCORE-02 — Record every unvisualized needle-movement event.** Capture event timing, duration, movement magnitude, visibility confidence, and recovery.
92|- **M2-MR-SCORE-03 — Require tip reacquisition before progression resumes.** Block advancement until visualization has been re-established for the defined confirmation interval.
93|- **M2-MR-SCORE-04 — Calculate core performance metrics.** Measure tip-visible time, unsafe-motion time, alignment error, probe efficiency, path smoothness, overshoot, and completion time.
94|- **M2-MR-SCORE-05 — Define level completion and automatic failure rules.** Prevent users from passing through speed or accuracy while violating the safety invariant.
95|- **M2-MR-SCORE-06 — Generate trainee coaching feedback.** Return specific post-attempt guidance tied to detected behaviors.
96|- **M2-MR-SCORE-07 — Create the M2 progression sequence.** Build introductory levels from static alignment through deliberate tip loss and safe recovery.
97|
98|### M2 — MR Training — Portal & Data Integration
99|**Primary owner:** Max
100|
101|- **M2-MR-PORTAL-01 — Define trainee, exercise, session, and safety-event records.** Create the minimum additive data model needed for assignments, progress, and evidence.
102|- **M2-MR-PORTAL-02 — Create the internal Training portal entry point.** Add an internal-only route or launch surface without exposing draft training content to clients.
103|- **M2-MR-PORTAL-03 — Implement Quest session launch or deep link.** Connect the selected exercise and authenticated trainee to the headset runtime.
104|- **M2-MR-PORTAL-04 — Synchronize prototype results to the portal.** Return scores, critical violations, completion state, and diagnostics.
105|- **M2-MR-PORTAL-05 — Display internal progress and safety metrics.** Provide a minimal review surface for internal testing and clinical evaluation.
106|- **M2-MR-PORTAL-06 — Define future block-pack entitlement boundaries.** Document how purchased block packs and organization licensing will later be enforced.
107|
108|### M2 — MR Training — QA, Legal, Safety & IP
109|**Primary owner:** Samir
110|
111|- **M2-MR-RISK-01 — Define educational-use and non-certification language.** State that the prototype trains component skills and does not certify clinical competency or replace supervised training.
112|- **M2-MR-RISK-02 — Complete prototype hardware hazard analysis.** Assess needle injury, tracker detachment, headset collision, cleaning, and equipment risks.
113|- **M2-MR-RISK-03 — Define privacy and training-data controls.** Set collection, access, retention, and deletion rules for prototype telemetry.
114|- **M2-MR-RISK-04 — Define future patient-data consent and de-identification requirements.** Establish gates before real ultrasound datasets may be captured or used.
115|- **M2-MR-RISK-05 — Review contractor IP and work-for-hire requirements.** Ensure software, hardware designs, datasets, and annotations are owned or properly licensed by Block Ops.
116|- **M2-MR-RISK-06 — Evaluate protectable intellectual property.** Review tracking, calibration, safety detection, scoring, and curriculum innovations with qualified counsel.
117|- **M2-MR-RISK-07 — Complete M2 legal and safety release review.** Record counsel-required items and approve only the bounded internal prototype use.
118|
119|### M2 — MR Training — Prototype Validation
120|**Primary owner:** Samir
121|
122|- **M2-MR-VALID-01 — Create the M2 internal test protocol.** Define devices, exercises, intentional violations, success thresholds, evidence capture, and defect severity.
123|- **M2-MR-VALID-02 — Recruit and brief internal clinical testers.** Prepare qualified testers to assess safety behavior, usability, and realism within prototype limits.
124|- **M2-MR-VALID-03 — Test intentional unvisualized advancement detection.** Measure detection sensitivity across angles, speeds, depths, and occlusion conditions.
125|- **M2-MR-VALID-04 — Measure false-positive and missed safety violations.** Quantify failure modes and set remediation thresholds.
126|- **M2-MR-VALID-05 — Run complete internal training demonstrations.** Exercise calibration through session review with repeatable evidence.
127|- **M2-MR-VALID-06 — Resolve all critical M2 defects.** Close or explicitly disposition safety-critical, tracking-critical, and data-integrity failures.
128|- **M2-MR-VALID-07 — Pass the M2 MR prototype acceptance gate.** Demonstrate reliable enforcement of never moving an unvisualized needle and approve external-validation preparation.
129|
130|### M3 — MR Training — External Clinical Validation
131|**Primary owner:** Samir
132|
133|- **M3-MR-CLINVAL-01 — Recruit attending anesthesiologist reviewers.** Select external reviewers and document conflicts, qualifications, scope, and expectations.
134|- **M3-MR-CLINVAL-02 — Create the structured external review protocol.** Define exercises, ratings, qualitative feedback, safety tests, and acceptance criteria.
135|- **M3-MR-CLINVAL-03 — Compare expert and novice performance patterns.** Assess whether metrics and violations distinguish expected skill behaviors without making unsupported competency claims.
136|- **M3-MR-CLINVAL-04 — Refine visualization and movement thresholds.** Update thresholds only from documented clinical and technical evidence.
137|- **M3-MR-CLINVAL-05 — Complete external clinical validation signoff.** Resolve critical findings and record whether the M3 review/test has passed.
138|
139|### M3 — MR Training — Anatomy & Block-Pack Pipeline
140|**Primary owner:** Samir
141|
142|- **M3-MR-ANATOMY-01 — Select the first block-specific training pack.** Choose the first block based on training value, capture feasibility, market value, and safety scope.
143|- **M3-MR-ANATOMY-02 — Define ultrasound capture, consent, and de-identification protocol.** Create the governed process required before collecting real patient or volunteer data.
144|- **M3-MR-ANATOMY-03 — Acquire or license the first volumetric dataset set.** Obtain legally usable source data with provenance and usage rights.
145|- **M3-MR-ANATOMY-04 — Register and annotate anatomy and danger zones.** Map nerves, vessels, fascia, bone, targets, and prohibited regions for simulation.
146|- **M3-MR-ANATOMY-05 — Build anatomical variation and difficulty cases.** Create multiple governed scenarios rather than presenting one anatomy as universal.
147|- **M3-MR-ANATOMY-06 — Complete clinical fact review of the first block pack.** Approve every client-visible or trainee-visible clinical element before release.
148|
149|### M3 — MR Training — Technical Hardening
150|**Primary owner:** Max
151|
152|- **M3-MR-HARDEN-01 — Improve tracking precision, latency, and depth estimation.** Address M2 measurement limits using external validation evidence.
153|- **M3-MR-HARDEN-02 — Add realistic volumetric ultrasound rendering.** Reslice registered data according to live probe pose and preserve needle-plane behavior.
154|- **M3-MR-HARDEN-03 — Add cloud synchronization and resilient offline recovery.** Protect sessions from connectivity loss and reconcile results safely.
155|- **M3-MR-HARDEN-04 — Add instructor accounts, assignments, and review tools.** Support governed external testing and future site delivery.
156|- **M3-MR-HARDEN-05 — Add block-pack installation and entitlement controls.** Enforce licensed access without exposing draft or unapproved packs.
157|- **M3-MR-HARDEN-06 — Harden crash reporting, updates, and device diagnostics.** Create the support evidence needed for controlled deployments.
158|
159|### M3 — MR Training — External Test Execution
160|**Primary owner:** Samir
161|
162|- **M3-MR-EXTTEST-01 — Run external attending usability sessions.** Execute the approved protocol and preserve results, observations, and incidents.
163|- **M3-MR-EXTTEST-02 — Analyze safety-rule detection and behavior-change evidence.** Determine whether warnings reliably stop unsafe movement and promote probe-based reacquisition.
164|- **M3-MR-EXTTEST-03 — Resolve critical external-review findings.** Rework clinical content, hardware, thresholds, or UX where evidence requires it.
165|- **M3-MR-EXTTEST-04 — Repeat failed or materially changed validation tests.** Do not carry forward stale evidence after significant changes.
166|- **M3-MR-EXTTEST-05 — Pass the M3 MR external-validation gate.** Confirm attending review is complete and the MR platform has passed its defined external test.
167|
168|### M4 — MR Training — Foundational Client Deployment
169|**Primary owner:** Samir
170|
171|- **M4-MR-SITE-01 — Select the foundational-client training use case.** Define the bounded site objective, trainees, instructors, and approved block packs.
172|- **M4-MR-SITE-02 — Complete site hardware, space, network, and safety assessment.** Confirm the training station can be deployed and operated safely.
173|- **M4-MR-SITE-03 — Deploy and verify site training kits.** Install, calibrate, inventory, and acceptance-test every device and replaceable component.
174|- **M4-MR-SITE-04 — Train site administrators and instructors.** Teach setup, assignment, cleaning, troubleshooting, incident response, and escalation.
175|- **M4-MR-SITE-05 — Establish site operating and support procedures.** Document storage, cleaning, replacement, updates, support, and downtime workflows.
176|
177|### M4 — MR Training — Production Platform
178|**Primary owner:** Max
179|
180|- **M4-MR-PROD-01 — Add organization, site, role, and device registration.** Create production-grade tenant and hardware boundaries.
181|- **M4-MR-PROD-02 — Add production licensing and block-pack entitlements.** Connect contracts and approved access to enforceable technical controls.
182|- **M4-MR-PROD-03 — Add monitoring, backups, recovery, and secure updates.** Operate the platform with auditable reliability and recoverability.
183|- **M4-MR-PROD-04 — Add privacy retention and support diagnostics.** Implement approved data controls and least-privilege troubleshooting.
184|- **M4-MR-PROD-05 — Pass the production deployment readiness review.** Prove the site can operate without unmanaged prototype dependencies.
185|
186|### M4 — MR Training — Outcomes & Adoption
187|**Primary owner:** Samir
188|
189|- **M4-MR-OUTCOMES-01 — Establish baseline trainee measurements.** Capture initial performance using the approved M4 protocol.
190|- **M4-MR-OUTCOMES-02 — Assign and monitor training pathways.** Track completion, critical violations, retries, and safe progression.
191|- **M4-MR-OUTCOMES-03 — Measure repeated-session improvement.** Analyze behavior changes without overstating clinical-outcome causality.
192|- **M4-MR-OUTCOMES-04 — Collect instructor and trainee usability feedback.** Identify abandonment, friction, realism concerns, and support needs.
193|- **M4-MR-OUTCOMES-05 — Complete the foundational-client outcomes review.** Document results, limitations, incidents, and required platform changes.
194|
195|### M4 — MR Training — Commercial Readiness
196|**Primary owner:** Adrian
197|
198|- **M4-MR-COMM-01 — Develop the evidence-aligned platform narrative.** Position the platform around validated component-skill training and Block Ops comprehensiveness.
199|- **M4-MR-COMM-02 — Define packaging and pricing hypotheses.** Model hardware, platform access, block packs, facility licensing, and support.
200|- **M4-MR-COMM-03 — Create approved demonstration materials.** Use only validated capabilities and reviewed claims.
201|- **M4-MR-COMM-04 — Define facility and clinician buyer profiles.** Identify acquisition relevance, decision makers, procurement needs, and adoption barriers.
202|- **M4-MR-COMM-05 — Build the post-M4 commercialization pipeline.** Create qualification criteria and outreach targets for controlled expansion.
203|- **M4-MR-COMM-06 — Pass the M4 MR foundational-client success gate.** Confirm successful site delivery and approve the next commercialization stage.
204|
205|## Dependency doctrine
206|
207|- M2 begins with parallel clinical doctrine, runtime architecture, physical-kit definition, content approach, and risk/legal framing.
208|- Tracking feasibility is the primary technical investment gate.
209|- The M2 acceptance gate requires every safety-critical and prototype workflow to close.
210|- M3 execution is locked behind M2 prototype acceptance.
211|- M4 execution is locked behind the M3 external-validation gate.
212|- Every task has exactly one primary owner; collaborators do not dilute accountability.
213|- State-based statuses are used. No `this_week` status is created.
214|