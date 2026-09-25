import React from 'react';

/* ------------------------------------------------------------------ *
 *  MedFactory v1 (detailed)
 *  Medical-affairs deck factory — 8 screens in one navigable shell.
 *
 *  Props:
 *    theme         'dark' | 'light'   initial direction (default 'dark')
 *    reviewerName  string             reviewer shown in the workspace
 * ------------------------------------------------------------------ */

/* ---------- style helpers ---------- */

// Parses a CSS declaration string into a React style object.
// Keeps custom properties (--x) verbatim, camel-cases the rest.
const S = (css) => {
  const out = {};
  if (!css) return out;
  css.split(';').forEach((decl) => {
    const i = decl.indexOf(':');
    if (i < 0) return;
    const key = decl.slice(0, i).trim();
    const val = decl.slice(i + 1).trim();
    if (!key || !val) return;
    if (key.startsWith('--')) out[key] = val;
    else out[key.replace(/-([a-z])/g, (_, c) => c.toUpperCase())] = val;
  });
  return out;
};

const merge = (...cssStrings) => Object.assign({}, ...cssStrings.map(S));

// Element with a hover style, expressed as CSS strings.
function Box({ as: Tag = 'div', css, hover, children, ...rest }) {
  const [over, setOver] = React.useState(false);
  return (
    <Tag
      {...rest}
      style={{ ...S(css), ...(over && hover ? S(hover) : null) }}
      onMouseEnter={() => setOver(true)}
      onMouseLeave={() => setOver(false)}
    >
      {children}
    </Tag>
  );
}

/* ---------- static content ---------- */

const SRC = {
  1: { type: 'RCT', year: 2016, title: 'Semaglutide and cardiovascular outcomes in patients with type 2 diabetes', src: 'N Engl J Med · SUSTAIN-6 · PMID 27633186', snippet: 'In a 104-week trial of 3,297 patients at high cardiovascular risk, the primary composite outcome of CV death, non-fatal myocardial infarction or non-fatal stroke occurred in 6.6% of the semaglutide group versus 8.9% of the placebo group (HR 0.74; 95% CI 0.58-0.95; p=0.02 for non-inferiority).', entail: '0.94', chunk: 'ev_4417' },
  2: { type: 'Guideline', year: 2025, title: 'Standards of care in diabetes — pharmacologic approaches to glycaemic treatment', src: 'Diabetes Care · Section 9 · ADA', snippet: 'For adults with type 2 diabetes and established atherosclerotic cardiovascular disease, a GLP-1 receptor agonist with demonstrated cardiovascular benefit is recommended independently of baseline HbA1c or metformin use.', entail: '0.91', chunk: 'ev_4102' },
  3: { type: 'Meta-Analysis', year: 2024, title: 'Glycaemic target attainment in type 2 diabetes: a pooled analysis of 41 real-world cohorts', src: 'Lancet Diabetes Endocrinol · 1.2M patients', snippet: 'Across 41 cohorts, 47.2% of patients treated for type 2 diabetes achieved HbA1c below 7.0%, with attainment lowest in the first two years after treatment intensification.', entail: '0.88', chunk: 'ev_3980' },
  4: { type: 'Registry', year: 2025, title: 'IDF Diabetes Atlas — global prevalence and projections to 2050', src: 'International Diabetes Federation · 11th edition', snippet: 'An estimated 589 million adults aged 20-79 were living with diabetes in 2024, projected to reach 853 million by 2050, with the largest relative increases in low- and middle-income regions.', entail: '0.96', chunk: 'ev_3711' },
  5: { type: 'RCT', year: 2019, title: 'Renal outcomes with GLP-1 receptor agonism in type 2 diabetes and chronic kidney disease', src: 'N Engl J Med · post-hoc analysis', snippet: 'Treatment was associated with a lower rate of new or worsening nephropathy (3.8% versus 6.1%), driven predominantly by a reduction in persistent macroalbuminuria.', entail: '0.89', chunk: 'ev_4520' },
  6: { type: 'Guideline', year: 2024, title: 'Type 2 diabetes in adults: management — NICE guideline NG28', src: 'National Institute for Health and Care Excellence', snippet: 'Individualise HbA1c targets, taking account of the person’s daily activities, comorbidities, risk of hypoglycaemia and likelihood of complications.', entail: '0.93', chunk: 'ev_4188' },
};

const DECKS = [
  { topic: 'Type 2 Diabetes — GLP-1 RA landscape', area: 'Endocrinology', status: 'Awaiting Review', stage: 5, created: '2 Sep', to: 'review' },
  { topic: 'NASH / MASH — emerging therapeutic options', area: 'Hepatology', status: 'Awaiting Review', stage: 5, created: '1 Sep', to: 'review' },
  { topic: 'Chronic kidney disease in type 2 diabetes', area: 'Nephrology', status: 'Generating', stage: 3, created: '1 Sep', to: 'pipe' },
  { topic: 'Obesity and cardiometabolic risk reduction', area: 'Cardiometabolic', status: 'Researching', stage: 2, created: '31 Aug', to: 'pipe' },
  { topic: 'Adherence in basal insulin initiation', area: 'Endocrinology', status: 'Rendering', stage: 6, created: '29 Aug', to: 'render' },
  { topic: 'Semaglutide CV outcomes — SELECT readout', area: 'Cardiology', status: 'Done', stage: 7, created: '26 Aug', to: 'deliver' },
];

const STAGE_NAMES = ['Intake', 'Research & Grounding', 'Content Generation', 'Scientific Validation', 'Human Review', 'Presentation Rendering', 'Delivery'];
const STAGE_NOTES = ['brief locked', 'PubMed · EMBASE · guidelines', '12 section writers', '4 check batteries', 'reviewer Munal', 'layout + assets', 'pptx + ref pack'];

const LOG_SCRIPT = [
  ['09:31:04', 'Intake accepted — brief hashed 4f8c…d21a'],
  ['09:31:09', '→ Fetching PubMed sources for T2D…'],
  ['09:31:22', '→ Retrieved 47 evidence chunks'],
  ['09:31:24', '→ EMBASE: 18 chunks · ADA/EASD guidelines: 6 chunks'],
  ['09:31:38', '→ Dedupe + recency filter → 58 chunks retained'],
  ['09:31:52', '→ Grounding index built (58 chunks · 1,204 spans)'],
  ['09:32:10', '→ Section Writer: Disease Burden — started'],
  ['09:32:11', '→ Section Writer: Unmet Need — started'],
  ['09:32:11', '→ Section Writer: Mechanism of Action — started'],
  ['09:33:40', '→ Section Writer: Disease Burden — 4 slides drafted'],
  ['09:34:02', '→ Voltron cross-check: 3 numeric claims re-derived'],
  ['09:35:19', '→ Draft assembled — 40 slides · 118 claims'],
  ['09:35:48', '→ Validation: Grounding check — 38/40 passed'],
  ['09:36:12', '→ Validation: Citation integrity — 36/38 entailment passed'],
  ['09:36:30', '→ Validation: Numeric consistency — 40/40 passed'],
  ['09:36:44', '→ Compliance guardrails — 1 flag (off-label phrasing)'],
  ['09:36:58', '→ Auto-repair: 2 items repaired · 1 escalated to reviewer'],
  ['09:37:02', 'Validation report ready →'],
];

const EVIDENCE = [4, 2, 1, 3, 5, 6];

const BLOCKS = {
  3: [
    { id: 'b1', kind: 'HEADLINE CLAIM', text: 'Fewer than half of adults treated for type 2 diabetes reach the glycaemic targets set for them.', cites: [3, 6] },
    { id: 'b2', kind: 'BODY', text: 'In a pooled analysis of 41 real-world cohorts, 47.2% of patients achieved HbA1c below 7.0%. Attainment was lowest in the two years following treatment intensification, the window in which therapeutic inertia is most often recorded.', cites: [3] },
    { id: 'b3', kind: 'BODY', flag: 'UNSOURCED', flagReason: 'No supporting span found in the evidence store for “roughly three years”. Escalated to reviewer — retrieval returned only qualitative statements on inertia.', text: 'Treatment intensification is typically delayed by roughly three years after a patient first exceeds their individualised target.', cites: [] },
    { id: 'b4', kind: 'SO-WHAT', text: 'The gap is therefore less a question of available efficacy than of when therapy is escalated and how targets are individualised in practice.', cites: [6] },
  ],
  6: [
    { id: 'c1', kind: 'HEADLINE CLAIM', text: 'SUSTAIN-6 established cardiovascular non-inferiority, with a nominal reduction in the primary composite outcome.', cites: [1] },
    { id: 'c2', kind: 'DATA', text: 'The primary composite of CV death, non-fatal MI or non-fatal stroke occurred in 6.6% versus 8.9% on placebo (HR 0.74; 95% CI 0.58–0.95).', cites: [1] },
    { id: 'c3', kind: 'BODY', flag: 'ENTAILMENT FAIL', flagReason: 'Source supports non-inferiority for the composite endpoint; the sentence generalises to “all-cause mortality”, which the cited span does not entail.', text: 'The trial also demonstrated a benefit on all-cause mortality across the study population.', cites: [1] },
  ],
  DEFAULT: [
    { id: 'd1', kind: 'HEADLINE CLAIM', text: 'Diabetes prevalence continues to rise faster than projections issued a decade ago anticipated.', cites: [4] },
    { id: 'd2', kind: 'BODY', text: 'An estimated 589 million adults aged 20–79 were living with diabetes in 2024, projected to reach 853 million by 2050, with the largest relative increases in low- and middle-income regions.', cites: [4] },
    { id: 'd3', kind: 'SO-WHAT', text: 'Scientific exchange in this area is therefore increasingly framed around health-system capacity as much as individual treatment choice.', cites: [2] },
  ],
};

const TOPIC_OPTIONS = [
  {
    id: 1,
    title: 'GLP-1 RA in Cardiovascular Risk Reduction',
    angle: 'CV Outcomes Focus',
    why: 'Strongest alignment with hero product · SUSTAIN-6 and SELECT trial data anchor well · cardiologist and endocrinologist audience crossover this month',
    signals: ['EASD 2026 late-breaking CV data', 'SELECT trial 3-year follow-up published', 'ADA guideline CV section updated Q3'],
    focus: ['CV death and MACE reduction', 'Heart failure evidence', 'Cardiorenal continuum', 'Real-world registry outcomes'],
    strength: 0.91,
    risk: 'LOW',
  },
  {
    id: 2,
    title: 'Closing the Glycaemic Control Gap in T2D',
    angle: 'Therapeutic Inertia',
    why: 'High practitioner question signal · 3+ year treatment delay documented in 1.2M patient meta-analysis · directly targets HCP behaviour change',
    signals: ['Real-world cohort meta-analysis (1.2M patients)', 'HCP survey data Q2 2026 — inertia ranked #1 barrier', 'NICE NG28 intensification pathway update'],
    focus: ['Attainment gap statistics', 'Inertia drivers', 'Intensification decision pathways', 'Target individualisation by risk profile'],
    strength: 0.84,
    risk: 'LOW',
  },
  {
    id: 3,
    title: 'Renal Protection in Cardiometabolic Disease',
    angle: 'CKD + T2D Comorbidity',
    why: 'Strengthening evidence base · ADA/KDIGO joint positioning · nephrology referral decisions increasingly intersecting with GLP-1 RA prescribing',
    signals: ['CREDENCE + DAPA-CKD cross-reference data', 'ADA/KDIGO joint recommendations 2025', 'KOL demand signal from 4 major 2026 congresses'],
    focus: ['eGFR decline prevention', 'Albuminuria endpoints', 'Cardiorenal syndrome staging', 'Agent selection by renal function level'],
    strength: 0.77,
    risk: 'MEDIUM',
  },
];

const ALT_TOPIC_OPTIONS = [
  {
    id: 4,
    title: 'Optimising GLP-1 RA Selection in T2D',
    angle: 'Prescribing Decision Support',
    why: 'Directly answers the #1 HCP question — which agent, for which patient, when · clear decision framework · evidence-based positioning for the hero product across patient profiles',
    signals: ['HCP survey: agent selection ranked #1 unmet need Q2 2026', 'Comparative effectiveness meta-analysis 2026', 'Formulary access signals across 3 major payers'],
    focus: ['Comparative efficacy by endpoint', 'Patient profile matching algorithm', 'Dose optimisation', 'Switching and sequencing criteria'],
    strength: 0.89,
    risk: 'LOW',
  },
  {
    id: 5,
    title: 'Beyond HbA1c: Holistic Cardiometabolic Risk Management',
    angle: 'Multifactorial Risk Reduction',
    why: 'Aligns with guideline shift to treat-to-target beyond glucose · multiple evidence streams · resonates with internists and endocrinologists treating complex patients',
    signals: ['ADA/EASD consensus statement 2025', 'Real-world multifactorial outcome registry (88k patients)', 'KOL discussion frequency up 34% Q3 2026'],
    focus: ['Weight and CV composite outcomes', 'Blood pressure and lipid data', 'Composite risk reduction data', 'Holistic treatment algorithm design'],
    strength: 0.86,
    risk: 'LOW',
  },
  {
    id: 6,
    title: 'GLP-1 RA Safety in Complex Patients: CKD, HF & Elderly',
    angle: 'Subgroup Evidence Focus',
    why: 'Growing prescribing hesitancy in comorbid patients · subgroup data from landmark trials now published · directly addresses HCP uncertainty at the referral boundary',
    signals: ['SUSTAIN-6 and LEADER subgroup analyses published 2026', 'ADA/KDIGO joint recommendations 2025', 'Geriatric prescribing guideline update Q4 2026'],
    focus: ['eGFR-adjusted dosing thresholds', 'Heart failure safety profile', 'Frailty and tolerability in elderly', 'Shared decision-making frameworks'],
    strength: 0.82,
    risk: 'MEDIUM',
  },
];

const AGENT_QUESTIONS = [
  'What is the single most important clinical insight you want every HCP in the room to walk away with?',
  'How deep should we go on mechanism of action — a full dedicated section, a brief overview slide, or skip it entirely in favour of clinical outcomes data?',
  'Should the webinar anchor on one landmark trial, or weave multiple studies into a broader evidence narrative?',
  'Are there specific patient subgroups you want highlighted — high CV risk, CKD overlap, obesity, insulin-naive patients?',
  'Any prior content, KOL framings, or key messages that consistently resonated with this audience that I should build on?',
];

const INTEL_CRITERIA = [
  {
    id: 'clinical',
    label: 'Clinical Experiences',
    color: 'var(--acc)',
    opener: (topic, hero) =>
      `Let's start with real-world clinical context.\n\nWhat are the most common patient scenarios and treatment challenges HCPs face with **${topic || 'this topic'}**? Think about daily practice friction — where are physicians hesitant, where do they see gaps, and what does a "difficult patient" look like in this area?\n\nIf **${hero || 'your hero product'}** is involved in the treatment pathway, describe where it enters and what typically happens before and after initiation.`,
  },
  {
    id: 'practitioner',
    label: 'Practitioner Questions',
    color: 'var(--warn)',
    opener: (topic, hero) =>
      `What questions are HCPs most commonly asking about **${topic || 'this topic'}**?\n\nThink about the field feedback, MSL conversations, advisory board discussions. What misconceptions come up repeatedly? What does the average prescriber still not understand about **${hero || 'the product'}** mechanism, dosing, or patient selection?\n\nShare anything your field teams or KOLs have flagged as recurring knowledge gaps.`,
  },
  {
    id: 'conference',
    label: 'Conference & Trend Signals',
    color: 'var(--ok)',
    opener: () =>
      `What's the current signal from conferences and publications?\n\nAny key abstracts, posters, or late-breaking trials from ADA, ESC, EASD, or ACC that should inform this deck? Any major meta-analyses published in the last 18 months?\n\nAlso — are there any upcoming data readouts, guideline updates, or label expansions that the content should anticipate or be future-proofed against?`,
  },
  {
    id: 'hero',
    label: 'Hero Product Relevance',
    color: '#a78bfa',
    opener: (topic, hero) =>
      `Let's zero in on **${hero || 'the hero product'}** specifically.\n\nWhat are its key differentiators in the context of **${topic || 'this topic'}**? What does it do that existing options don't — in terms of mechanism, outcomes data, tolerability, or patient experience?\n\nWhat's the single most compelling clinical argument for its place in therapy that you want HCPs to leave the room with?`,
  },
  {
    id: 'evidence',
    label: 'Evidence Strength',
    color: 'var(--ok)',
    opener: () =>
      `Walk me through the evidence hierarchy supporting the key claims.\n\nWhat are the landmark trials we should anchor to? Are there head-to-head RCTs, or are we relying on indirect comparisons and real-world data? What is the quality of the primary publications — peer-reviewed journals, sample sizes, follow-up duration?\n\nAny claims that are widely accepted in practice but where the evidence base is actually thinner than it appears?`,
  },
  {
    id: 'timeliness',
    label: 'Evidence Timeliness',
    color: 'var(--warn)',
    opener: () =>
      `How current is the evidence base?\n\nAre we building on data from the last 2–3 years, or are key citations older? Are there any studies where the methodology is now considered outdated, or where newer evidence has shifted the interpretation?\n\nAlso — are there any citations we should avoid because they've been associated with controversy, retraction concerns, or regulatory scrutiny?`,
  },
  {
    id: 'discussion',
    label: 'Human Discussion',
    color: 'var(--acc)',
    opener: (topic) =>
      `What's the human conversation around **${topic || 'this topic'}** like?\n\nBeyond the data — what are KOLs debating at dinner after the symposium? What does the experienced HCP "gut feel" say versus what the trials show? Where is there genuine clinical equipoise, and where is the field moving faster than the published literature?\n\nThis is the layer of nuance that separates a formulaic deck from one that resonates with a room full of experienced physicians.`,
  },
  {
    id: 'judgment',
    label: 'Strategic Judgments',
    color: 'var(--dim)',
    opener: () =>
      `Final layer — strategic and editorial judgments.\n\nWhat tone should this deck take: authoritative and data-heavy, or conversational and case-driven? Are there any competitive sensitivities, regulatory guardrails, or internal brand guidelines that constrain what we can say?\n\nAnything you want to make absolutely sure makes it into the content — or absolutely sure stays out? Think of this as your final editorial brief to the agent team before they start building.`,
  },
];

const SLIDES = [
  { n: 1, title: 'Type 2 diabetes — scope of this presentation', st: 'approved', layout: 'Title' },
  { n: 2, title: 'Global prevalence and projections to 2050', st: 'approved', layout: 'Stat + chart' },
  { n: 3, title: 'Unmet need in glycaemic control', st: 'flagged', layout: 'Claim + evidence' },
  { n: 4, title: 'Mechanism of action — GLP-1 receptor agonism', st: 'pending', layout: 'Diagram' },
  { n: 5, title: 'SUSTAIN programme — trial design overview', st: 'edited', layout: 'Table' },
  { n: 6, title: 'SUSTAIN-6 — cardiovascular outcomes', st: 'flagged', layout: 'Forest plot' },
  { n: 7, title: 'Renal outcomes in T2D with CKD', st: 'pending', layout: 'Claim + evidence' },
  { n: 8, title: 'Safety and tolerability profile', st: 'pending', layout: 'Table' },
];

const RESEARCH_PAPERS = [
  { db: 'PubMed', type: 'RCT', title: 'Semaglutide CV outcomes — SUSTAIN-6', journal: 'N Engl J Med · MEDLINE-indexed, high impact', year: 2019, score: 0.97, artifacts: ['Deck', 'Protocol'], track: 'Cardiovascular outcomes evidence', designTier: 'RCT · double-blind, placebo-controlled', appraisal: 'CONSORT: 22/25 (excellent)', grade: 'High certainty', citations: '891 citations · 148.5/yr', funding: 'Industry-sponsored · Novo Nordisk', statRigor: 'N=3,297 · ITT · 104 wks', relevance: 97, flag: null, excerpt: '"The primary composite outcome of cardiovascular death, nonfatal myocardial infarction, or nonfatal stroke occurred in 6.6% of the semaglutide group versus 8.9% in the placebo group (HR 0.74; 95% CI 0.58–0.95; P=0.02 for noninferiority)."', excerptSrc: '— Results, p.12' },
  { db: 'PubMed', type: 'RCT', title: 'SELECT: Semaglutide in obesity without diabetes', journal: 'N Engl J Med · MEDLINE-indexed, high impact', year: 2023, score: 0.95, artifacts: ['Deck', 'Blog'], track: 'Cardiovascular outcomes evidence', designTier: 'RCT · double-blind, placebo-controlled', appraisal: 'CONSORT: 24/25 (excellent)', grade: 'High certainty', citations: '312 citations · 156/yr', funding: 'Industry-sponsored · Novo Nordisk', statRigor: 'N=17,604 · ITT · 39.8 mo', relevance: 95, flag: null, excerpt: '"Treatment with semaglutide resulted in a significantly lower incidence of death from cardiovascular causes, nonfatal myocardial infarction, or nonfatal stroke than placebo (HR 0.80; 95% CI 0.72–0.90; P<0.001)."', excerptSrc: '— Primary outcomes, p.8' },
  { db: 'EMBASE', type: 'Systematic Review', title: 'GLP-1 RA class effect on MACE — Cochrane review', journal: 'Cochrane Database Syst Rev · MEDLINE-indexed, high impact', year: 2024, score: 0.93, artifacts: ['Deck', 'Protocol', 'Blog'], track: 'General interventional evidence', designTier: 'Systematic review · meta-analysis of 7 RCTs', appraisal: 'AMSTAR-2: 15/16 (high confidence)', grade: 'High certainty', citations: '44 citations · 44/yr', funding: 'Independent — no industry funding', statRigor: 'Pooled N=56,004, I²=12%', relevance: 93, flag: null, excerpt: '"GLP-1 receptor agonists reduced major adverse cardiovascular events compared with placebo or active comparator (RR 0.88; 95% CI 0.82–0.94), with evidence of low heterogeneity across trials, supporting a class effect."', excerptSrc: '— Results, p.7' },
  { db: 'ADA Guidelines', type: 'Guideline', title: 'Standards of Care in Diabetes 2025 · Section 9', journal: 'Diabetes Care · ADA official guideline', year: 2025, score: 0.94, artifacts: ['Deck', 'Protocol'], track: 'Clinical practice guideline', designTier: 'Expert consensus · annual update', appraisal: 'AGREE II: A-rated', grade: 'Grade A — Strong recommendation', citations: '2,100+ citations · ongoing', funding: 'ADA · public-health grant', statRigor: 'N/A · evidence synthesis', relevance: 94, flag: null, excerpt: '"For adults with type 2 diabetes and established atherosclerotic cardiovascular disease, a GLP-1 receptor agonist with demonstrated cardiovascular benefit is recommended independently of baseline HbA1c or individualised glucose target."', excerptSrc: '— Section 9.3, p.S114' },
  { db: 'EMBASE', type: 'Meta-Analysis', title: 'Glycaemic attainment in T2D — 41 real-world cohorts', journal: 'Lancet Diabetes Endocrinol · MEDLINE-indexed, high impact', year: 2024, score: 0.91, artifacts: ['Deck', 'Blog'], track: 'Real-world outcomes evidence', designTier: 'Meta-analysis · 41 real-world cohorts', appraisal: 'AMSTAR-2: 13/16 (moderate confidence)', grade: 'Moderate certainty', citations: '62 citations · 62/yr', funding: 'Independent · public-health grant', statRigor: 'Pooled N=1.2M, I²=38%', relevance: 91, flag: null, excerpt: '"Across 41 cohorts totalling 1.2 million patients, only 47.2% achieved their individualised HbA1c target. Attainment was lowest in the first two years following treatment intensification, the window in which therapeutic inertia is most frequently recorded."', excerptSrc: '— Primary analysis, p.4' },
  { db: 'PubMed', type: 'RCT', title: 'LEADER: Liraglutide and cardiovascular outcomes', journal: 'N Engl J Med · MEDLINE-indexed, high impact', year: 2016, score: 0.86, artifacts: ['Deck'], track: 'Cardiovascular outcomes evidence', designTier: 'RCT · double-blind, placebo-controlled', appraisal: 'CONSORT: 21/25 (good)', grade: 'High certainty', citations: '4,211 citations · 526/yr', funding: 'Industry-sponsored · Novo Nordisk', statRigor: 'N=9,340 · ITT · 3.8 yrs', relevance: 86, flag: null, excerpt: '"The rate of first occurrence of death from cardiovascular causes, nonfatal myocardial infarction, or nonfatal stroke was lower with liraglutide than with placebo (HR 0.87; 95% CI 0.78–0.97; P=0.01 for superiority)."', excerptSrc: '— Primary endpoint, p.10' },
  { db: 'IDF Atlas', type: 'Registry', title: 'IDF Diabetes Atlas 11th edition — 2025', journal: 'International Diabetes Federation · global surveillance', year: 2025, score: 0.88, artifacts: ['Deck', 'Blog'], track: 'Epidemiological / burden of disease', designTier: 'Registry · global epidemiological survey', appraisal: 'N/A · surveillance report', grade: 'Grade B — Surveillance data', citations: '180 citations · ongoing', funding: 'IDF · multi-donor funded', statRigor: 'N=589M+ · global modelling', relevance: 88, flag: null, excerpt: '"An estimated 589 million adults aged 20–79 years were living with diabetes in 2024. This number is projected to reach 853 million by 2050, with the largest relative increases occurring in low- and middle-income regions."', excerptSrc: '— Executive Summary, p.6' },
  { db: 'EMBASE', type: 'Real-World', title: 'Therapeutic inertia in T2D — UK primary care cohort', journal: 'Diabetes Obes Metab · MEDLINE-indexed', year: 2023, score: 0.87, artifacts: ['Deck', 'Protocol'], track: 'Real-world outcomes evidence', designTier: 'Retrospective cohort · UK primary care', appraisal: 'STROBE: 18/22 (good)', grade: 'Moderate certainty', citations: '39 citations · 13/yr', funding: 'Independent · NHS research grant', statRigor: 'N=82,000 · retrospective · 5 yr follow-up', relevance: 87, flag: null, excerpt: '"The median delay from first recorded HbA1c exceeding the individualised target to treatment intensification was 3.7 years (IQR 1.4–6.9), with the longest delays observed in patients managed exclusively in primary care without specialist referral."', excerptSrc: '— Results, p.5' },
  { db: 'ADA/KDIGO', type: 'Guideline', title: 'Joint consensus on CKD management in T2D — 2025', journal: 'Diabetes Care / Kidney Int · joint ADA + KDIGO', year: 2025, score: 0.79, artifacts: ['Protocol', 'Deck'], track: 'Clinical practice guideline', designTier: 'Joint expert consensus guideline', appraisal: 'AGREE II: A-rated', grade: 'Grade A — Joint recommendation', citations: '94 citations · ongoing', funding: 'ADA + KDIGO · non-industry', statRigor: 'N/A · evidence synthesis panel', relevance: 79, flag: null, excerpt: '"For patients with type 2 diabetes and chronic kidney disease with eGFR ≥15 mL/min/1.73m², a GLP-1 receptor agonist with demonstrated cardiovascular or kidney benefit is recommended as a preferred add-on therapy, independently of HbA1c."', excerptSrc: '— Recommendation 4.2, p.S18' },
  { db: 'NICE', type: 'Guideline', title: 'Type 2 diabetes in adults: management — NG28', journal: 'NICE · UK national clinical guideline', year: 2024, score: 0.85, artifacts: ['Protocol', 'Deck'], track: 'Clinical practice guideline', designTier: 'NICE clinical guideline · evidence review', appraisal: 'AGREE II: A-rated', grade: 'Grade A — NICE evidence review', citations: '620 citations · ongoing', funding: 'NICE · UK government funded', statRigor: 'N/A · UK population-based review', relevance: 85, flag: null, excerpt: '"Individualise HbA1c targets, taking account of the person\'s daily activities, likelihood of adherence, comorbidities, risk of hypoglycaemia, and the likelihood that achieving the target will not be outweighed by the risks of treatment."', excerptSrc: '— Recommendation 1.7.1, p.22' },
  { db: 'PubMed', type: 'RCT', title: 'AMPLITUDE-O: Efpeglenatide CV outcomes in T2D', journal: 'N Engl J Med · MEDLINE-indexed', year: 2021, score: 0.74, artifacts: ['Deck'], track: 'Cardiovascular outcomes evidence', designTier: 'RCT · double-blind, placebo-controlled', appraisal: 'CONSORT: 20/25 (good)', grade: 'High certainty', citations: '148 citations · 29.6/yr', funding: 'Industry-sponsored · Sanofi', statRigor: 'N=4,076 · ITT · 1.8 yrs', relevance: 74, flag: null, excerpt: '"The incidence of major adverse cardiovascular events was significantly lower with efpeglenatide than with placebo (HR 0.73; 95% CI 0.58–0.92; P=0.007), consistent with a GLP-1 class effect on cardiovascular risk reduction."', excerptSrc: '— Primary results, p.9' },
  { db: 'EMBASE', type: 'RCT', title: 'Renal outcomes with GLP-1 RA in T2D and CKD', journal: 'N Engl J Med · post-hoc analysis', year: 2019, score: 0.82, artifacts: ['Deck', 'Protocol'], track: 'Renal outcomes evidence', designTier: 'Pre-specified post-hoc analysis of SUSTAIN-6', appraisal: 'CONSORT: 19/25 (post-hoc limitation noted)', grade: 'Moderate certainty', citations: '212 citations · 35.3/yr', funding: 'Industry-sponsored · Novo Nordisk', statRigor: 'N=3,297 · CKD subgroup · post-hoc', relevance: 82, flag: null, excerpt: '"Treatment with semaglutide was associated with a lower rate of new or worsening nephropathy (3.8% vs 6.1%; HR 0.64; 95% CI 0.46–0.88), driven predominantly by a reduction in persistent macroalbuminuria."', excerptSrc: '— Secondary outcomes, p.14' },
];

const RESEARCH_DBS = ['PubMed', 'EMBASE', 'ADA / EASD Guidelines', 'NICE / SIGN', 'Cochrane Library', 'IDF Atlas'];

const CONTENT_TRACKS = [
  { id: 'condition', label: 'Condition & clinical problem', color: '#7eb8f7',
    paperTracks: ['Epidemiological / burden of disease', 'Real-world outcomes evidence'] },
  { id: 'root', label: 'Root cause & mechanisms', color: '#7cc8b8',
    paperTracks: ['Clinical practice guideline'] },
  { id: 'foundational', label: 'Foundational & lifestyle support', color: '#e5a14b',
    paperTracks: [] },
  { id: 'general', label: 'General interventional evidence', color: '#f97b7b',
    paperTracks: ['General interventional evidence', 'Cardiovascular outcomes evidence'] },
  { id: 'targeted', label: 'Targeted support & ingredients', color: '#c084fc',
    paperTracks: [] },
  { id: 'hero', label: 'Hero product evidence', color: '#fb923c',
    paperTracks: [] },
  { id: 'safety', label: 'Safety & clinical application', color: '#4ade80',
    paperTracks: ['Renal outcomes evidence'] },
];

const ALL_ARTIFACTS = ['Deck', 'Blog', 'Protocol', 'Blurb', 'Facts'];

const PAPER_MOCK_SECTIONS = {
  default: [
    {
      id: 'abstract', heading: 'Abstract',
      paragraphs: [
        'Background: Type 2 diabetes mellitus (T2DM) remains a leading cause of cardiovascular morbidity worldwide. GLP-1 receptor agonists have demonstrated significant reductions in major adverse cardiovascular events (MACE) in large randomised controlled trials.',
        'Methods: We conducted a systematic review and meta-analysis of cardiovascular outcome trials (CVOTs) for GLP-1 RAs, including SUSTAIN-6, LEADER, PIONEER 6, HARMONY, and SELECT. Primary endpoint was 3-point MACE (CV death, non-fatal MI, non-fatal stroke). Secondary endpoints included all-cause mortality, hospitalisation for heart failure, and renal composite outcomes.',
        'Results: Across 6 trials (n=60,080 participants), GLP-1 RAs significantly reduced 3-point MACE (HR 0.86; 95% CI 0.80–0.93; p<0.001). Semaglutide demonstrated the most pronounced effect with a 20% MACE reduction in SELECT (HR 0.80; 95% CI 0.72–0.90).',
        'Conclusions: GLP-1 receptor agonists provide meaningful cardiovascular protection in patients with T2DM and established or high-risk cardiovascular disease. These findings support guideline recommendations for preferential use of GLP-1 RAs in this population.',
      ]
    },
    {
      id: 'intro', heading: '1. Introduction',
      paragraphs: [
        'Type 2 diabetes mellitus affects an estimated 537 million adults globally and is projected to reach 783 million by 2045 (IDF Atlas, 2021). Cardiovascular disease remains the leading cause of mortality in this population, accounting for approximately 50% of deaths in people with T2DM.',
        'Glucagon-like peptide-1 receptor agonists (GLP-1 RAs) represent a major therapeutic advance in the management of T2DM. Beyond glycaemic control, this drug class has demonstrated clinically meaningful reductions in cardiovascular events through mechanisms that include weight reduction, blood pressure lowering, and direct cardioprotective effects via GLP-1R expressed in cardiac tissue.',
        'The semaglutide cardiovascular outcome programme — comprising SUSTAIN-6 (subcutaneous) and PIONEER 6 (oral) — established non-inferiority to placebo for MACE. The more recent SELECT trial (2023), uniquely enrolling patients with overweight/obesity and established CVD without T2DM, demonstrated superiority for 3-point MACE, broadening the evidence base substantially.',
        'This review aims to synthesise the totality of cardiovascular evidence for GLP-1 RAs, with particular focus on semaglutide, to inform clinical practice and medical affairs communications.',
      ]
    },
    {
      id: 'methods', heading: '2. Methods',
      paragraphs: [
        'We searched PubMed, EMBASE, and the Cochrane Library from inception to August 2025. Eligible studies were randomised controlled trials with pre-specified cardiovascular outcome data reporting on GLP-1 RA therapies in adults with T2DM or high cardiovascular risk, with a minimum follow-up of 12 months.',
        'Two independent reviewers extracted data on trial design, population characteristics, primary endpoint events, and pre-specified secondary outcomes. Risk of bias was assessed using the Cochrane RoB 2 tool. Statistical heterogeneity was evaluated using the I² statistic; values >50% were considered to indicate substantial heterogeneity.',
        'The primary analysis used a random-effects model (DerSimonian-Laird). Subgroup analyses were performed by baseline HbA1c, BMI, renal function (eGFR <60 mL/min/1.73m²), and history of prior MI or stroke.',
      ]
    },
    {
      id: 'results', heading: '3. Results',
      paragraphs: [
        '3.1 Trial Characteristics. Six CVOTs met inclusion criteria: LEADER (liraglutide; n=9,340), SUSTAIN-6 (semaglutide SC; n=3,297), PIONEER 6 (semaglutide oral; n=3,183), HARMONY (albiglutide; n=9,463), REWIND (dulaglutide; n=9,901), SELECT (semaglutide SC 2.4 mg; n=17,604). Mean follow-up ranged from 1.3 years (PIONEER 6) to 5.4 years (REWIND).',
        '3.2 Primary Endpoint. The pooled HR for 3-point MACE was 0.86 (95% CI 0.80–0.93; I²=23%). All agents demonstrated point estimates below 1.0. Semaglutide showed numerically superior cardiovascular protection: SUSTAIN-6 HR 0.74 (95% CI 0.58–0.95) and SELECT HR 0.80 (95% CI 0.72–0.90).',
        '3.3 Secondary Outcomes. All-cause mortality was reduced by 12% across the class (HR 0.88; 95% CI 0.82–0.94). Hospitalisation for heart failure was reduced by 9% (HR 0.91; 95% CI 0.83–0.99). The renal composite outcome (40% eGFR decline, ESKD, or renal death) was reduced by 21% (HR 0.79; 95% CI 0.73–0.87), with consistent effects across eGFR strata.',
        '3.4 Subgroup Analyses. Cardiovascular benefit was consistent across age, sex, baseline HbA1c, and BMI. In patients with prior MI or stroke, the MACE reduction was more pronounced (HR 0.81; 95% CI 0.73–0.90 vs HR 0.91 in those without established CVD).',
      ]
    },
    {
      id: 'discussion', heading: '4. Discussion',
      paragraphs: [
        'This meta-analysis confirms that GLP-1 receptor agonists, as a class, significantly reduce 3-point MACE in individuals with T2DM and high cardiovascular risk. The consistency of effect across agents and trials strengthens confidence in a class-level cardioprotective mechanism, likely mediated through both metabolic and direct cardiac effects.',
        'Semaglutide demonstrates the most robust evidence base, encompassing both the largest trial by sample size (SELECT, n=17,604) and one of the earliest superiority demonstrations (SUSTAIN-6). The SELECT trial is particularly noteworthy as it demonstrated benefit in individuals without T2DM, suggesting that cardiovascular protection extends beyond glycaemic mechanisms.',
        'Several limitations warrant consideration. Trial populations differed in baseline CV risk, duration of diabetes, and background therapy. The SUSTAIN-6 trial was powered for non-inferiority only; the superiority finding should be interpreted with appropriate caution. Publication bias, while unlikely given regulatory mandates for CVOT reporting, cannot be entirely excluded.',
        'From a clinical and medical affairs perspective, these data support the preferential positioning of semaglutide in patients with T2DM and established CVD or high cardiovascular risk, consistent with the 2023 ADA/EASD consensus statement.',
      ]
    },
    {
      id: 'refs', heading: 'References',
      paragraphs: [
        '1. Marso SP et al. Semaglutide and Cardiovascular Outcomes in Patients with Type 2 Diabetes. N Engl J Med. 2016;375:1834-1844. (SUSTAIN-6)',
        '2. Lincoff AM et al. Semaglutide and Cardiovascular Outcomes in Obesity without Diabetes. N Engl J Med. 2023;389:2221-2232. (SELECT)',
        '3. Marso SP et al. Liraglutide and Cardiovascular Outcomes in Type 2 Diabetes. N Engl J Med. 2016;375:311-322. (LEADER)',
        '4. American Diabetes Association / EASD. Consensus Report: Management of Hyperglycaemia in Type 2 Diabetes, 2023. Diabetes Care. 2023;46(10):2753–2786.',
        '5. IDF Diabetes Atlas, 10th Edition, 2021. International Diabetes Federation, Brussels.',
      ]
    },
  ]
};

/* ─────────────────────────────────────────────────────────────────
   SciPaperReader — defined at module level so React never unmounts it
   on re-render (avoids flicker / animation replays).
───────────────────────────────────────────────────────────────── */
const SciPaperReader = ({ paper, sciInlineComments, sciCommentDraft,
  setSciSelectedPaper, setSciCommentDraft, setSciCommentText,
  submitSciComment, cancelSciComment, resolveSciComment }) => {

  const [hoveredPara, setHoveredPara] = React.useState(null);
  const sections = PAPER_MOCK_SECTIONS.default;
  const trackColor = (() => {
    const tc = CONTENT_TRACKS.find(t => t.paperTracks && t.paperTracks.includes(paper.track));
    return tc ? tc.color : '#1e40af';
  })();
  const activeCount = Object.entries(sciInlineComments)
    .filter(([k]) => k.startsWith(`${paper._idx}-`))
    .flatMap(([, c]) => c).filter(c => !c.resolved).length;

  return (
    <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#fff', borderLeft: '1px solid rgba(13,31,78,0.12)' }}>

      {/* ── Header bar ── */}
      <div style={{ padding: '13px 20px', borderBottom: '1px solid rgba(13,31,78,0.12)', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0, background: '#fff' }}>
        <div style={{ width: 5, height: 38, background: trackColor, flexShrink: 0, borderRadius: 3 }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ font: '700 13.5px/1.4 Archivo', color: '#0d1f4e', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{paper.title}</div>
          <div style={{ font: '400 11px/1 Archivo', color: '#4a6896', marginTop: 4 }}>{paper.journal} &middot; {paper.year}{paper.n ? ` · n=${paper.n.toLocaleString()}` : ''}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          {activeCount > 0 && (
            <span style={{ padding: '3px 10px', background: 'rgba(146,64,14,0.09)', border: '1px solid rgba(146,64,14,0.3)', font: '600 10px/1 Archivo', color: '#92400e', borderRadius: 99 }}>
              {activeCount} comment{activeCount > 1 ? 's' : ''}
            </span>
          )}
          <span style={{ font: '400 10px/1 Archivo', color: '#4a6896', letterSpacing: '0.02em' }}>Hover to comment</span>
          <button onClick={() => setSciSelectedPaper(null)} style={{ padding: '5px 13px', font: '600 10.5px/1 Archivo', border: '1px solid rgba(13,31,78,0.18)', color: '#1e3460', background: 'transparent', cursor: 'pointer', borderRadius: 4 }}>&#x2715; Close</button>
        </div>
      </div>

      {/* ── Body: scrollable text + sidebar ── */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex' }}>

        {/* Text column */}
        <div style={{ flex: 1, overflowY: 'auto', background: '#f8fafc' }}>
          <div style={{ maxWidth: 720, margin: '0 auto', padding: '52px 56px 80px 68px' }}>

            {/* Paper title block */}
            <div style={{ marginBottom: 36 }}>
              <h1 style={{ font: '800 26px/1.3 Archivo', letterSpacing: '-0.03em', color: '#0d1f4e', margin: '0 0 14px' }}>{paper.title}</h1>
              <p style={{ font: '500 13px/1.6 Archivo', color: '#4a6896', margin: '0 0 6px' }}>
                Systematic Review &amp; Meta-Analysis &middot; {paper.journal} &middot; {paper.year}
              </p>
              {paper.n && <p style={{ font: '600 12px/1 Archivo', color: '#1e3460', margin: '0 0 28px' }}>n = {paper.n.toLocaleString()} participants</p>}
              <div style={{ height: 2, background: 'rgba(13,31,78,0.1)' }} />
            </div>

            {/* Sections */}
            {sections.map((sec) => (
              <div key={sec.id} style={{ marginBottom: 44 }}>
                <h3 style={{ font: '600 10.5px/1 Archivo', letterSpacing: '0.14em', color: '#4a6896', textTransform: 'uppercase', margin: '0 0 18px', paddingBottom: 10, borderBottom: '1px solid rgba(13,31,78,0.1)' }}>
                  {sec.heading}
                </h3>

                {sec.paragraphs.map((para, pi) => {
                  const paraKey = `${paper._idx}-${sec.id}-${pi}`;
                  const paraComments = (sciInlineComments[paraKey] || []).filter(c => !c.resolved);
                  const isDraftTarget = sciCommentDraft && sciCommentDraft.key === paraKey;
                  const hasComment = paraComments.length > 0;
                  const isHov = hoveredPara === paraKey && !isDraftTarget;

                  return (
                    <div key={pi}
                      style={{ position: 'relative', marginBottom: 22 }}
                      onMouseEnter={() => setHoveredPara(paraKey)}
                      onMouseLeave={() => { if (hoveredPara === paraKey) setHoveredPara(null); }}>

                      {/* Left margin: comment dot or + button */}
                      <div style={{ position: 'absolute', left: -40, top: 5, width: 28, display: 'flex', justifyContent: 'center', pointerEvents: 'none' }}>
                        {hasComment && !isDraftTarget && (
                          <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#92400e', display: 'grid', placeItems: 'center', fontSize: 9, fontWeight: 800, color: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.18)' }}>
                            {paraComments.length}
                          </div>
                        )}
                        {isHov && !hasComment && (
                          <div
                            title="Add comment"
                            onMouseDown={e => { e.stopPropagation(); setSciCommentDraft(paraKey); }}
                            style={{ width: 22, height: 22, borderRadius: '50%', background: '#1e40af', display: 'grid', placeItems: 'center', fontSize: 17, fontWeight: 300, color: '#fff', cursor: 'pointer', boxShadow: '0 2px 8px rgba(30,64,175,0.4)', userSelect: 'none', pointerEvents: 'auto' }}>
                            +
                          </div>
                        )}
                      </div>

                      {/* Paragraph */}
                      <p
                        onClick={() => { if (!isDraftTarget) setSciCommentDraft(paraKey); }}
                        style={{
                          margin: 0,
                          font: sec.id === 'refs' ? '400 13px/1.75 Archivo' : '400 15.5px/1.9 Georgia, "Times New Roman", serif',
                          color: sec.id === 'refs' ? '#1e3460' : '#0d1f4e',
                          background: isDraftTarget ? 'rgba(30,64,175,0.07)' : hasComment ? 'rgba(146,64,14,0.07)' : isHov ? 'rgba(30,64,175,0.04)' : 'transparent',
                          padding: '6px 10px',
                          marginLeft: -10,
                          borderLeft: isDraftTarget ? '3px solid #1e40af' : hasComment ? '3px solid #92400e' : isHov ? '3px solid rgba(30,64,175,0.3)' : '3px solid transparent',
                          cursor: 'text',
                          transition: 'background 0.1s, border-color 0.1s',
                          borderRadius: '0 3px 3px 0',
                          userSelect: 'text',
                        }}>
                        {para}
                      </p>

                      {/* Comment input card */}
                      {isDraftTarget && (
                        <div
                          onClick={e => e.stopPropagation()}
                          style={{ marginTop: 12, background: '#fff', border: '1px solid rgba(13,31,78,0.14)', boxShadow: '0 4px 24px rgba(13,31,78,0.12)', padding: '14px 16px', borderRadius: 6, animation: 'fadeUp 0.16s ease' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                            <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#1e40af', display: 'grid', placeItems: 'center', font: '700 9px Archivo', color: '#fff', flexShrink: 0 }}>AM</div>
                            <div>
                              <div style={{ font: '600 12px/1 Archivo', color: '#0d1f4e' }}>Dr. Arjun Mehta</div>
                              <div style={{ font: '400 10px/1 Archivo', color: '#4a6896', marginTop: 2 }}>Scientific Adviser</div>
                            </div>
                          </div>
                          <textarea
                            autoFocus
                            rows={3}
                            placeholder="Add a scientific comment or concern…"
                            value={sciCommentDraft.text}
                            onChange={e => setSciCommentText(e.target.value)}
                            style={{ width: '100%', background: '#f8fafc', border: '1px solid rgba(13,31,78,0.15)', color: '#0d1f4e', padding: '10px 12px', font: '400 13.5px/1.6 Archivo', resize: 'none', outline: 'none', display: 'block', borderRadius: 4 }}
                          />
                          <div style={{ display: 'flex', gap: 8, marginTop: 10, justifyContent: 'flex-end' }}>
                            <button onClick={cancelSciComment} style={{ padding: '7px 14px', font: '600 11.5px/1 Archivo', border: '1px solid rgba(13,31,78,0.18)', color: '#1e3460', background: '#fff', cursor: 'pointer', borderRadius: 4 }}>Cancel</button>
                            <button onClick={submitSciComment} style={{ padding: '7px 18px', font: '700 11.5px/1 Archivo', background: '#1e40af', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: 4 }}>Add Comment</button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Comments sidebar */}
        <div style={{ width: 280, flexShrink: 0, borderLeft: '1px solid rgba(13,31,78,0.1)', overflowY: 'auto', padding: '24px 18px', background: '#fff' }}>
          <div style={{ font: '700 9px/1 Archivo', letterSpacing: '0.14em', color: '#4a6896', marginBottom: 18 }}>REVIEW COMMENTS</div>
          {Object.entries(sciInlineComments)
            .filter(([k]) => k.startsWith(`${paper._idx}-`))
            .flatMap(([key, cmts]) => cmts.map(cmt => ({ key, cmt })))
            .filter(({ cmt }) => !cmt.resolved)
            .map(({ key, cmt }) => (
              <div key={cmt.id} style={{ border: '1px solid rgba(13,31,78,0.1)', background: '#f8fafc', padding: '12px 14px', marginBottom: 10, borderRadius: 6, animation: 'rise 0.2s ease' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#1e40af', display: 'grid', placeItems: 'center', font: '700 9px Archivo', color: '#fff', flexShrink: 0 }}>AM</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ font: '600 12px/1 Archivo', color: '#0d1f4e' }}>{cmt.author}</div>
                    <div style={{ font: '400 10px/1 Archivo', color: '#4a6896', marginTop: 3 }}>{cmt.time}</div>
                  </div>
                </div>
                <p style={{ margin: '0 0 10px', font: '400 13px/1.65 Archivo', color: '#0d1f4e' }}>{cmt.text}</p>
                <button
                  onClick={() => resolveSciComment(key, cmt.id)}
                  style={{ font: '600 10.5px/1 Archivo', color: '#4a6896', background: 'none', border: '1px solid rgba(13,31,78,0.12)', cursor: 'pointer', padding: '4px 10px', borderRadius: 3 }}>
                  &#x2713; Resolve
                </button>
              </div>
            ))}
          {activeCount === 0 && (
            <div style={{ font: '400 12.5px/1.8 Archivo', color: '#4a6896', padding: '8px 0' }}>
              No comments yet.<br />
              Hover any paragraph and click the{' '}
              <strong style={{ color: '#1e40af' }}>+</strong> button to add a comment.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

/* ── Resizable split panel (drag the divider to resize) ── */
const ResizableSplit = ({ left, right, defaultLeftPct = 44, minPct = 20, maxPct = 78 }) => {
  const [pct, setPct] = React.useState(defaultLeftPct);
  const containerRef = React.useRef(null);
  const dragging = React.useRef(false);

  const startDrag = (e) => {
    e.preventDefault();
    dragging.current = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    const onMove = (me) => {
      if (!dragging.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const next = ((me.clientX - rect.left) / rect.width) * 100;
      setPct(Math.min(maxPct, Math.max(minPct, next)));
    };
    const onUp = () => {
      dragging.current = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  };

  return (
    <div ref={containerRef} style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
      <div style={{ width: `${pct}%`, flexShrink: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>{left}</div>
      <div
        onMouseDown={startDrag}
        style={{ width: 6, flexShrink: 0, cursor: 'col-resize', background: 'rgba(13,31,78,0.12)', position: 'relative', zIndex: 10, transition: 'background 0.15s' }}
        onMouseEnter={e => { e.currentTarget.style.background = '#1e40af'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(13,31,78,0.12)'; }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', display: 'flex', flexDirection: 'column', gap: 4, pointerEvents: 'none' }}>
          {[0,1,2,3,4].map(i => <div key={i} style={{ width: 2, height: 2, borderRadius: '50%', background: 'rgba(255,255,255,0.7)' }} />)}
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>{right}</div>
    </div>
  );
};

/* ── Organize screen agent messages ── */
const ORGANIZE_AGENT_MSGS = [
  { text: 'Starting research organisation… scanning **7 accepted papers** across the evidence library and mapping excerpts to 7 content tracks.' },
  { text: '**Cardiovascular Outcomes** track is strongest — SUSTAIN-6, SELECT, and LEADER provide complementary RCT evidence (HR range 0.74–0.87). SELECT (n=17,604) recommended as the primary anchor claim for all artifact types.' },
  { text: '**Real-World Evidence** track has 2 papers. The 41-cohort meta-analysis (n=1.2M, attainment 47.2%) and UK therapeutic-inertia cohort (median delay 3.7 yrs) complement each other well for Blog and Facts artifacts.' },
  { text: '**Clinical Practice Guideline** track has 2 papers. ADA 2025 Section 9 (Grade A) and ADA/KDIGO 2025 joint consensus anchor the Protocol artifact with strong guideline-level evidence.' },
  { text: '⚠ **Gap detected:** Epidemiological / Burden of Disease track has no accepted papers. IDF Atlas 11th edition (n=589M, 2025) is in your research pool — accepting it fills the Blog and Facts excerpt gap immediately.' },
  { text: '**Organisation complete.** 4 of 5 artifacts have sufficient excerpt coverage. Blurb set still needs 2 excerpts — the IDF Atlas burden figure and the therapeutic-inertia 3.7-year delay statistic are the best candidates. Ready for MA Review.' },
];

const REVIEW_AGENT_MSGS = [
  { step: 1, text: 'Starting Medical Affairs review…\n\nScanning **12 accepted papers** across 6 databases. Loading excerpts from **7 content tracks**. Cross-referencing artifact coverage against required thresholds.' },
  { step: 2, artifact: 'Deck', color: '#7eb8f7', quality: 89,
    text: '**HCP Deck (45 min) — Evidence quality: HIGH**\n\n8 of 9 required excerpts confirmed. Strong cardiovascular outcomes evidence from SUSTAIN-6 (RCT, HR 0.74), SELECT (RCT, HR 0.80), and LEADER (RCT, HR 0.87). ADA 2025 provides a Grade A recommendation anchor.\n\n**Gap identified:** Mechanistic GLP-1 receptor pathway detail is thin — 1 excerpt versus 3 recommended for slides 4–5.\n\n**Recommendation:** Proceed. Flag mechanistic gap to content writer.',
    sources: ['SUSTAIN-6', 'SELECT', 'LEADER', 'ADA 2025'] },
  { step: 3, artifact: 'Blog', color: '#fb923c', quality: 100,
    text: '**Blog Post (500 words) — Evidence quality: HIGH**\n\nAll 5 required excerpts confirmed. Strong narrative arc from IDF Atlas burden data through real-world attainment gaps (47.2% target achievement) to GLP-1 RA class benefit.\n\n**No critical gaps identified.** Evidence base supports an evidence-led patient story without requiring specialist language.\n\n**Recommendation:** Proceed with full confidence.',
    sources: ['IDF Atlas 2025', 'Lancet DE 2024', 'SELECT'] },
  { step: 4, artifact: 'Protocol', color: '#4ade80', quality: 74,
    text: '**Protocol — Evidence quality: MODERATE**\n\n6 of 7 required excerpts confirmed. ADA 2025 and ADA/KDIGO joint consensus provide strong guideline anchors. NICE NG28 adds UK-specific context.\n\n**Gap identified:** No excerpt covering dose-titration safety in eGFR 30–59 range. SUSTAIN-6 renal subgroup partially addresses this but was not designed for dose guidance.\n\n**Recommendation:** Proceed with caution. Add a dose-titration note citing the KDIGO joint consensus, section 4.2.',
    sources: ['ADA 2025', 'ADA/KDIGO 2025', 'NICE NG28'] },
  { step: 5, artifact: 'Blurb', color: '#f97b7b', quality: 33,
    text: '**Blurb (×5) — Evidence quality: LOW**\n\n1 of 3 required excerpts confirmed. Coverage is thin — only the SELECT primary endpoint excerpt maps cleanly to a short-form message.\n\n**Critical gaps:** No burden-of-disease hook, no treatment-inertia statistic, no branded call-to-action anchor.\n\n**Recommendation:** Accept at least 2 more excerpts before generating — suggest the IDF Atlas burden figure and the therapeutic inertia 3.7-year delay statistic.',
    sources: ['SELECT'] },
  { step: 6, artifact: 'Facts', color: '#a78bfa', quality: 100,
    text: '**Fact Sheet — Evidence quality: HIGH**\n\n5 excerpts confirmed (above 4 required). Excellent breadth: epidemiology (IDF Atlas), outcomes (SUSTAIN-6, SELECT, LEADER), guidelines (ADA), and real-world attainment gaps (Lancet DE 2024).\n\n**No gaps identified.** Fact sheet can be generated across all 5 target categories immediately.\n\n**Recommendation:** Proceed.',
    sources: ['IDF Atlas 2025', 'SUSTAIN-6', 'SELECT', 'LEADER', 'ADA 2025', 'Lancet DE'] },
  { step: 7, artifact: null, quality: 78,
    text: '**Review complete.**\n\nOverall evidence quality: **GOOD (78/100)**. 4 of 5 artifacts meet threshold for content generation. The Blurb set requires 2 additional excerpts.\n\n**Recommended next action:** Accept the IDF Atlas burden excerpt and the UK therapeutic inertia statistic from the Organize screen, then return to generate all 5 artifact types.' },
];

const ARTIFACT_TARGETS = {
  Deck:     { label: 'HCP deck (45 min)', target: 9 },
  Blog:     { label: 'Blog post',         target: 5 },
  Protocol: { label: 'Protocol',          target: 7 },
  Blurb:    { label: 'Blurb (×5)',        target: 3 },
  Facts:    { label: 'Fact sheet',        target: 4 },
};

const PAPER_FIGURES = {
  0: [
    { type: 'km',     label: 'Figure 2', caption: 'KM estimates — time to first MACE, semaglutide vs. placebo (SUSTAIN-6)' },
    { type: 'bar',    label: 'Figure 3', caption: 'Component outcomes: CV death, nonfatal MI, nonfatal stroke' },
  ],
  1: [
    { type: 'km',     label: 'Figure 1', caption: 'Primary endpoint MACE-free survival over 39.8 months (SELECT)' },
    { type: 'bar',    label: 'Figure 3', caption: 'MACE rates per 100 person-years by pre-specified subgroup' },
  ],
  2: [
    { type: 'forest', label: 'Figure 2', caption: 'Forest plot: GLP-1 RA vs. placebo, MACE — 7 RCTs, N=56,004' },
  ],
  3: [
    { type: 'table',  label: 'Table 9.1', caption: 'Pharmacological treatment algorithm for T2D — ADA Standards 2025' },
  ],
  4: [
    { type: 'bar',    label: 'Figure 1', caption: 'HbA1c target attainment across 41 cohorts (pooled N=1.2M)' },
    { type: 'scatter',label: 'Figure 2', caption: 'Attainment rate vs. follow-up duration; bubble size = cohort N' },
  ],
  5: [
    { type: 'km',     label: 'Figure 2', caption: 'Primary composite MACE — liraglutide vs. placebo (LEADER)' },
  ],
  6: [
    { type: 'bar',    label: 'Figure 1', caption: 'Diabetes prevalence by IDF region: 2024 vs. 2050 projection' },
  ],
  11: [
    { type: 'bar',    label: 'Figure 3', caption: 'New or worsening nephropathy — semaglutide vs. placebo, CKD subgroup' },
  ],
};

const LIGHT_TOKENS = {
  '--bg': '#eef1f8', '--s1': '#ffffff', '--s2': '#e2e8f4', '--ink': '#0d1f4e',
  '--dim': '#1e3460', '--faint': '#4a6896', '--rule': 'rgba(13,31,78,0.1)',
  '--rule2': 'rgba(13,31,78,0.2)', '--acc': '#1e40af', '--ok': '#166534', '--warn': '#92400e',
};

/* ---------- component ---------- */

export default class MedFactory extends React.Component {
  constructor(props) {
    super(props);
    this.rootRef = React.createRef();
    this.state = {
      screen: 'dash',
      dir: null,
      topic: 'Type 2 Diabetes — GLP-1 RA landscape',
      area: 'Endocrinology / Metabolic',
      aud: 'HCP',
      dur: 45,
      region: 'EU (EMA)',
      lang: 'English (UK)',
      tpl: 1,
      cover: ['SUSTAIN-6 CV outcomes', 'Therapeutic inertia'],
      avoid: ['Off-label dosing'],
      coverDraft: '',
      avoidDraft: '',
      advOpen: false,
      fromQueue: false,
      approved: null,
      topicChoice: null,
      topicsMessages: [],
      topicsInput: '',
      topicsCardSet: 'default',
      chatMessages: [],
      chatInput: '',
      topicFeedbackDraft: '',
      role: null,
      loginEmail: '',
      loginPassword: '',
      loginError: '',
      loginPwShow: false,
      heroProduct: 'Ozempic® (Semaglutide)',
      projectThreads: [],
      activeThreadId: null,
      projectInput: '',
      pptStatus: 'draft',
      maComments: {
        3: [
          { id: 1, text: 'Citation missing for the 3-year inertia claim — reviewer to supply a source or the sentence should be cut', x: 34, y: 58, author: 'Dr. Priya Nair', time: '10:14', resolved: false },
          { id: 2, text: 'Headline too strong — "fewer than half" framing needs softening per EU compliance guidance', x: 68, y: 22, author: 'Dr. Priya Nair', time: '10:17', resolved: false },
        ],
      },
      sciComments: {},
      pendingPin: null,
      openPin: null,
      commentDraft: '',
      notifications: [
        { id: 1, text: 'NASH / MASH deck approved by Medical Affairs and passed to Scientific Review', from: 'MA Review', time: '1 Sep · 11:42', read: true },
      ],
      notifOpen: false,
      sendBackOpen: false,
      sendBackNote: '',
      logN: 6,
      stage: 2,
      elapsed: 0,
      slides: SLIDES,
      slideIdx: 2,
      blocks: null,
      sel: 0,
      tab: 'edit',
      editDraft: '',
      instr: '',
      citOpen: null,
      reviewed: 12,
      diff: null,
      researchN: 0,
      researchSourcesOpen: false,
      researchSrcExpanded: {},
      researchFilter: 'All',
      acceptedPapers: {},
      excerptOpen: {},
      acceptedDrawerOpen: false,
      acceptedPopupOpen: false,
      organizeExpanded: {},
      organizeExpandAll: false,
      organizeSelectedPaper: null,
      organizeArtifactFilter: { Deck: true, Blog: true, Protocol: true, Blurb: false, Facts: true },
      organizeView: 'track',
      organizeAgentMsgN: 0,
      organizeAgentThinking: false,
      organizeAgentInput: '',
      maReviewModal: false,
      reviewN: 0,
      medReviewTab: 'artifacts',
      medReviewPaper: null,
      sciSubmitted: false,
      sciReviewComments: {},   // keyed by `${paperIdx}-${excerptIdx}` → { text, rejected }
      sciReviewTab: 'track',
      sciChatInput: '',
      sciChatMessages: [],
      sciChatN: 0,
      sciSelectedPaper: null,
      sciInlineComments: {},
      sciCommentDraft: null,
      sciActiveHighlight: null,
      sciChatStep: 0,
      addExcerptModal: null,
      excerptModalText: '',
      excerptModalArtifacts: { Deck: true, Blog: false, Protocol: false, Blurb: false, Facts: false },
      excerptModalTracks: {},
      customExcerpts: [],
      renderStep: 2,
      built: 7,
      history: [
        { text: 'Block 3 flagged by validation — unsourced claim', meta: '09:36 · system', kind: 'flag' },
        { text: 'Citation [6] added to So-what block', meta: '14:02 · Munal', kind: 'edit' },
        { text: 'Slide title tightened for HCP audience', meta: '14:04 · Munal', kind: 'edit' },
      ],
    };
  }

  componentDidMount() { this.applyTheme(); }
  componentDidUpdate() { this.applyTheme(); }
  componentWillUnmount() { clearInterval(this.t); }

  dirOf() { return this.state.dir ?? this.props.theme ?? 'dark'; }

  applyTheme() {
    const el = this.rootRef.current;
    if (!el) return;
    const light = this.dirOf() === 'light';
    Object.keys(LIGHT_TOKENS).forEach((k) =>
      light ? el.style.setProperty(k, LIGHT_TOKENS[k]) : el.style.removeProperty(k)
    );
    document.body.style.background = light ? '#eef1f8' : '#eef1f8';
  }

  demoDiff() {
    return {
      instr: 'Add SUSTAIN-6 cardiovascular outcomes data',
      left: [
        ['eq', 'In a pooled analysis of 41 real-world cohorts, 47.2% of patients achieved HbA1c below 7.0%. '],
        ['del', 'Attainment was lowest in the two years following treatment intensification, the window in which therapeutic inertia is most often recorded.'],
      ],
      right: [
        ['eq', 'In a pooled analysis of 41 real-world cohorts, 47.2% of patients achieved HbA1c below 7.0%. '],
        ['add', 'Attainment was lowest in the two years after intensification. In SUSTAIN-6, the primary composite of CV death, non-fatal MI or non-fatal stroke occurred in 6.6% of patients versus 8.9% on placebo (HR 0.74; 95% CI 0.58–0.95), placing the control gap alongside a measured cardiovascular outcome.'],
      ],
      why: 'Kept the pooled attainment figure and the inertia framing, then added the SUSTAIN-6 primary composite result you asked for, quoted with its hazard ratio and confidence interval from the cited trial. Citation [1] was attached and the sentence was split so neither claim carries more than its source supports.',
      block: 'b2',
    };
  }

  go = (s) => {
    clearInterval(this.t);
    if (s === 'diff') {
      this.setState((st) => ({ screen: 'diff', slideIdx: 2, blocks: null, sel: 1, diff: st.diff || this.demoDiff() }));
    } else if (s === 'topics') {
      const initMsgs = [
        {
          from: 'agent',
          text: `I've analyzed your brand brief and cross-referenced it against 7 criteria:\n\nClinical experience signals · Practitioner questions · Conference and trend data · Hero product relevance · Evidence strength · Evidence timeliness · Human discussion signals\n\nHere are 3 narrow focus topics generated for your consideration:`,
          cards: 'default',
          time: 'Just now',
        },
        {
          from: 'agent',
          text: 'Which direction interests you? Select one directly, or ask me to explain the evidence behind any option, compare them, sharpen the clinical focus, or generate a completely different set.',
          time: 'Just now',
        },
      ];
      this.setState({ screen: 'topics', topicsMessages: initMsgs, topicsCardSet: 'default' });
    } else if (s === 'chat') {
      const tc = this.state.topicChoice;
      const chosen = TOPIC_OPTIONS.find((o) => o.id === tc) || TOPIC_OPTIONS[0];
      const msgs = [
        { from: 'agent', text: `Great choice. You've selected **${chosen.title}** as your focus topic.\n\nI'm now acting as your content strategist for this project. Before I brief the research and writing agents, I need to understand exactly what you want this webinar to achieve — your answers will directly shape the structure, depth, and emphasis of every slide.`, time: 'Just now' },
        { from: 'agent', text: AGENT_QUESTIONS[0], time: 'Just now' },
      ];
      this.setState({ screen: 'chat', chatMessages: msgs });
    } else if (s === 'intel') {
      this.openIntel();
      return;
    } else if (s === 'research') {
      const { projectThreads, topic, heroProduct } = this.state;
      if (projectThreads.length === 0) {
        const firstCrit = INTEL_CRITERIA[0];
        const thread = {
          id: 1, criterionId: firstCrit.id, name: firstCrit.label,
          messages: [{ from: 'agent', text: firstCrit.opener(topic, heroProduct), time: 'Just now' }],
          createdAt: 'Just now',
        };
        this.setState({ projectThreads: [thread], activeThreadId: 1, screen: 'research' });
      } else {
        this.setState({ screen: 'research' });
      }
    } else if (s === 'organize') {
      this.setState({ screen: 'organize', organizeExpanded: {}, organizeSelectedPaper: null, organizeAgentMsgN: 0, organizeAgentThinking: false, organizeAgentInput: '' });
      setTimeout(() => this.runOrganizeAgent(), 600);
      return;
    } else if (s === 'med-review') {
      this.setState({ screen: 'med-review', reviewN: 0 });
      setTimeout(() => this.runMedReview(), 400);
      return;
    } else if (s === 'sci-dash') {
      this.setState({ screen: 'sci-dash' });
      return;
    } else if (s === 'sci-review') {
      this.setState({ screen: 'sci-review', sciChatMessages: [], sciChatN: 0, sciChatStep: 0 });
      setTimeout(() => this.runSciChat(), 600);
      return;
    } else if (['landing', 'ma-dash', 'ma-review', 'sci-dash', 'sci-review'].includes(s)) {
      this.setState({ screen: s, openPin: null, pendingPin: null });
    } else {
      this.setState({ screen: s });
    }
    if (s === 'pipe') this.runPipe();
    if (s === 'render') this.runRender();
    if (s === 'research') this.runResearch();
  };

  /* ---------- role & approval methods ---------- */

  enterRole = (role) => {
    const screen = role === 'creator' ? 'dash' : role === 'sci' ? 'sci-dash' : 'dash';
    this.setState({ role, screen, notifOpen: false, openPin: null, pendingPin: null });
  };

  switchRole = () => {
    clearInterval(this.t);
    this.setState({ role: null, screen: 'landing', notifOpen: false, openPin: null, pendingPin: null, sendBackOpen: false, loginEmail: '', loginPassword: '', loginError: '', loginPwShow: false });
  };

  static CREDENTIALS = [
    { email: 'mayank@medfactory.com',  password: 'Creator@2026',   role: 'creator', name: 'Mayank Gupta',   title: 'Medical Affairs Lead' },
    { email: 'priya@medfactory.com',   password: 'MedReview@2026', role: 'ma',      name: 'Dr. Priya Nair', title: 'Lead MA Reviewer' },
    { email: 'arjun@medfactory.com',   password: 'SciReview@2026', role: 'sci',     name: 'Dr. Arjun Mehta',title: 'Scientific Adviser' },
  ];

  login = (e) => {
    e?.preventDefault();
    const { loginEmail, loginPassword } = this.state;
    const match = MedFactory.CREDENTIALS.find(
      (c) => c.email.toLowerCase() === loginEmail.trim().toLowerCase() && c.password === loginPassword
    );
    if (!match) {
      this.setState({ loginError: 'Invalid email or password. Check the demo credentials below.' });
      return;
    }
    this.setState({ loginError: '' }, () => this.enterRole(match.role));
  };

  /* -------- Project Intelligence methods -------- */
  openIntel = () => {
    const { projectThreads, topic, heroProduct } = this.state;
    if (projectThreads.length === 0) {
      const firstCrit = INTEL_CRITERIA[0];
      const thread = {
        id: 1,
        criterionId: firstCrit.id,
        name: firstCrit.label,
        messages: [
          { from: 'agent', text: firstCrit.opener(topic, heroProduct), time: 'Just now' },
        ],
        createdAt: 'Just now',
      };
      this.setState({ projectThreads: [thread], activeThreadId: 1, screen: 'intel' });
    } else {
      this.setState({ screen: 'intel' });
    }
  };

  newIntelThread = () => {
    const { projectThreads, topic, heroProduct } = this.state;
    const usedIds = new Set(projectThreads.map((t) => t.criterionId));
    const next = INTEL_CRITERIA.find((c) => !usedIds.has(c.id));
    const crit = next || INTEL_CRITERIA[0];
    const id = Date.now();
    const thread = {
      id,
      criterionId: crit.id,
      name: next ? crit.label : `Follow-up · ${crit.label}`,
      messages: [
        { from: 'agent', text: crit.opener(topic, heroProduct), time: 'Just now' },
      ],
      createdAt: 'Just now',
    };
    this.setState((st) => ({
      projectThreads: [...st.projectThreads, thread],
      activeThreadId: id,
      projectInput: '',
    }));
  };

  sendIntelMessage = () => {
    const { projectInput, projectThreads, activeThreadId } = this.state;
    if (!projectInput.trim()) return;
    const userMsg = { from: 'user', text: projectInput.trim(), time: 'Just now' };
    const thread = projectThreads.find((t) => t.id === activeThreadId);
    if (!thread) return;
    const msgCount = thread.messages.filter((m) => m.from === 'user').length;
    const crit = INTEL_CRITERIA.find((c) => c.id === thread.criterionId) || INTEL_CRITERIA[0];
    const nextCrit = INTEL_CRITERIA[INTEL_CRITERIA.indexOf(crit) + 1];
    const coveredCount = new Set(projectThreads.map((t) => t.criterionId)).size;

    let agentReply;
    if (msgCount === 0) {
      agentReply = nextCrit
        ? `That's a rich context — thank you. I've logged that under **${crit.label}**.\n\nOne follow-up: can you be more specific about the frequency or recency? For instance, is this something that emerged in the last 6–12 months, or has it been a persistent pattern for years? That affects how we frame urgency in the deck.\n\nOnce you're done with this thread, hit **+ New Thread** to continue with **${nextCrit.label}**.`
        : `Perfect — that rounds out all 8 intelligence criteria. The agent pipeline now has enough depth to generate highly targeted topic options.\n\nClick **Proceed to Topic Selection →** to see the AI-ranked topic recommendations based on everything you've shared.`;
    } else if (msgCount === 1) {
      agentReply = coveredCount >= 4
        ? `Noted. That detail will directly influence the evidence selection and framing.\n\nYou've now covered **${coveredCount} of 8 criteria** — that's enough for a strong first pass at topic generation. You can continue adding threads, or **Proceed to Topic Selection** when ready.`
        : `Good detail. That context is saved.\n\nYou've covered **${coveredCount} of 8 criteria** so far. I'd recommend at least ${Math.max(0, 4 - coveredCount)} more before we generate topic options — hit **+ New Thread** to continue with ${nextCrit ? `**${nextCrit.label}**` : 'another angle'}.`;
    } else {
      agentReply = `Understood — that's been logged and will shape the agent's scoring weights.\n\nCriteria covered so far: **${coveredCount} of 8**. ${coveredCount >= 5 ? 'You have strong coverage. Proceed when ready.' : `Consider adding a thread for ${nextCrit ? nextCrit.label : 'remaining criteria'}.`}`;
    }

    this.setState((st) => ({
      projectThreads: st.projectThreads.map((t) =>
        t.id === activeThreadId
          ? { ...t, messages: [...t.messages, userMsg, { from: 'agent', text: agentReply, time: 'Just now' }] }
          : t
      ),
      projectInput: '',
    }));
  };
  /* -------- end Project Intelligence -------- */

  addNotification = (text, from) => {
    this.setState((st) => ({
      notifications: [{ id: Date.now(), text, from, time: 'Just now', read: false }, ...st.notifications],
    }));
  };

  sendToMA = () => { this.setState({ pptStatus: 'sent-to-ma' }); };
  resubmitToMA = () => { this.setState({ pptStatus: 'sent-to-ma' }); this.addNotification('Revised deck resubmitted to Medical Affairs', 'You'); };

  maApprove = () => {
    this.setState({ pptStatus: 'ma-approved', screen: 'ma-dash' });
    this.addNotification('Medical Affairs approved — deck now awaiting Scientific Review', 'Dr. Priya Nair');
  };

  maSendBack = () => {
    const total = Object.values(this.state.maComments).reduce((a, arr) => a + arr.length, 0);
    this.setState({ pptStatus: 'ma-rejected', screen: 'ma-dash', sendBackOpen: false, sendBackNote: '' });
    this.addNotification(`Medical Affairs sent back with ${total} comment${total !== 1 ? 's' : ''} — revision required`, 'Dr. Priya Nair');
  };

  sciApprove = () => {
    this.setState({ pptStatus: 'sci-approved', screen: 'sci-dash' });
    this.addNotification('Scientific Review approved — deck is fully approved and ready to publish', 'Dr. Arjun Mehta');
  };

  sciSendBack = () => {
    const total = Object.values(this.state.sciComments).reduce((a, arr) => a + arr.length, 0);
    this.setState({ pptStatus: 'sci-rejected', screen: 'sci-dash', sendBackOpen: false, sendBackNote: '' });
    this.addNotification(`Scientific Review sent back with ${total} comment${total !== 1 ? 's' : ''} — changes required`, 'Dr. Arjun Mehta');
  };

  /* ---------- comment pin methods ---------- */

  handleSlideClick = (e, slideNum, reviewRole) => {
    if (this.state.sendBackOpen) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    this.setState({ pendingPin: { x, y, slideNum, role: reviewRole }, commentDraft: '', openPin: null });
  };

  addComment = () => {
    const { pendingPin, commentDraft } = this.state;
    if (!commentDraft.trim() || !pendingPin) return;
    const key = pendingPin.role === 'ma' ? 'maComments' : 'sciComments';
    const author = pendingPin.role === 'ma' ? 'Dr. Priya Nair' : 'Dr. Arjun Mehta';
    this.setState((st) => {
      const existing = st[key][pendingPin.slideNum] || [];
      const newPin = { id: Date.now(), text: commentDraft.trim(), x: pendingPin.x, y: pendingPin.y, author, time: 'Just now', resolved: false };
      return { [key]: { ...st[key], [pendingPin.slideNum]: [...existing, newPin] }, pendingPin: null, commentDraft: '' };
    });
  };

  resolveComment = (role, slideNum, commentId) => {
    const key = role === 'ma' ? 'maComments' : 'sciComments';
    this.setState((st) => ({
      [key]: { ...st[key], [slideNum]: st[key][slideNum].map((c) => (c.id === commentId ? { ...c, resolved: true } : c)) },
      openPin: null,
    }));
  };

  sendTopicsChat = () => {
    const { topicsInput, topicsMessages, topicsCardSet } = this.state;
    if (!topicsInput.trim()) return;
    const userMsg = { from: 'user', text: topicsInput.trim(), time: 'Just now' };
    const inp = topicsInput.toLowerCase();
    let text = '';
    let cards = null;
    let newCardSet = topicsCardSet;

    if (inp.match(/option\s*1|first\s*(option)?|cardiovascular|cv\s+(out|risk)|select\s*trial|sustain/)) {
      text = 'Option 1 carries the strongest evidence score (0.91) because of the SELECT trial superiority data published earlier this year. SUSTAIN-6 established non-inferiority on the primary MACE composite (HR 0.74; 6.6% vs 8.9%), but SELECT went further — demonstrating superiority in a primary prevention population of 17,604 patients.\n\nCombine that with the ADA 2026 guideline explicitly positioning GLP-1 RA as first-line for T2D with established CVD, and this is the sharpest, most defensible scientific story available for an HCP webinar right now. High conference currency from EASD 2026 late-breaking sessions adds further relevance.\n\nReady to select this topic, or want to explore more?';
    } else if (inp.match(/option\s*2|second\s*(option)?|glycaem|inertia|control\s+gap|hba1c|attain/)) {
      text = 'Option 2 is a behaviour change narrative. The anchor is a 1.2M patient real-world meta-analysis: 47.2% of treated patients never reach their HbA1c target, and intensification is typically delayed by 3+ years after first exceeding the individualised goal.\n\nThis resonates strongly with GPs who face therapeutic inertia daily. If your primary goal is to shift how HCPs think about when to escalate — not just what to escalate to — Option 2 is uniquely well-positioned. It also has lower scientific risk since the evidence base is largely real-world observational rather than comparative RCT.\n\nShall I explain the specific evidence pieces, or does this angle work for your needs?';
    } else if (inp.match(/option\s*3|third\s*(option)?|renal|kidney|ckd|nephrol|credence|dapa/)) {
      text = 'Option 3 is narrower but increasingly important clinically. The ADA/KDIGO 2025 joint recommendations explicitly position GLP-1 RA for CKD patients with T2D — a major shift in guidance that many practitioners are still catching up to.\n\nEvidence strength is 0.77: solid, but fewer head-to-head RCTs compared to the CV topic, and some primary publications are pre-2023. This angle works best for nephrology or multidisciplinary team audiences — strong for endocrinologists managing comorbid patients, weaker for generalists.\n\nIf your brand team is targeting nephrologists or cardiorenal intersections, this is a strong differentiating choice. Want me to pull out the specific evidence pieces?';
    } else if (inp.match(/more\s*clinical|clinical\s*focus|clinical\s*depth|evidence.based|deeper|hcp\s*focus|practitioner/)) {
      text = 'Understood — sharpening the clinical depth and practitioner angle. Regenerating with stronger evidence grounding, direct HCP framing, and topics that map more tightly to prescribing decisions. Here are 3 alternative options:';
      cards = 'alt';
      newCardSet = 'alt';
    } else if (inp.match(/alternative|different\s*options?|other\s*topics?|regenerate|new\s*options?|try\s*again|change\s*topic/)) {
      text = 'Generating a fresh set. These are calibrated to the same brand inputs but with different strategic angles — decision support, holistic risk, and subgroup safety focus:';
      cards = 'alt';
      newCardSet = 'alt';
    } else if (inp.match(/original|back\s*to\s*original|first\s*set|initial\s*options?|show\s*original/)) {
      text = 'Back to the original set. These three remain the strongest options based on the current evidence landscape and conference signals:';
      cards = 'default';
      newCardSet = 'default';
    } else if (inp.match(/evidence|studies|research|data|proof|papers|publications|pubmed/)) {
      text = 'Evidence snapshot across all three options:\n\n• Option 1 — CV Focus (0.91): SUSTAIN-6 (3,297 pts · 104 weeks · NEJM), SELECT trial (17,604 pts · superiority on MACE · NEJM), ADA 2026 guideline Section 9. All peer-reviewed, HIGH confidence, published 2019–2026.\n\n• Option 2 — Inertia (0.84): 41-cohort real-world meta-analysis (1.2M patients · Lancet Diabetes Endocrinol), NICE NG28 intensification update, HCP survey Q2 2026. Strong real-world signal, mixed study designs.\n\n• Option 3 — Renal (0.77): CREDENCE (4,401 pts), DAPA-CKD (4,304 pts), ADA/KDIGO joint recommendations 2025. Solid evidence, narrower scope, some publications pre-2023.\n\nWant me to go deeper on any of these evidence sets?';
    } else if (inp.match(/compare|vs\.?\s|versus|difference|better\s+option|which\s+is/)) {
      text = 'Quick comparison:\n\n• Evidence strength: Option 1 (0.91) > Option 2 (0.84) > Option 3 (0.77)\n• Audience breadth: Option 1 (cardiologists + endocrinologists) > Option 2 (GPs + endocrinologists) > Option 3 (nephrologists + endocrinologists)\n• HCP behaviour change potential: Option 2 highest, Option 1 strong, Option 3 narrow\n• Scientific review risk: All LOW or MEDIUM — no high-risk topics\n• Conference currency (EASD/ADA 2026): Option 1 strongest, Option 2 good, Option 3 specialist only\n• Brand alignment with hero product: Option 1 strongest, Option 2 moderate, Option 3 niche\n\nMy recommendation: Option 1 for maximum impact and evidence strength. Option 2 if your primary goal is shifting prescribing behaviour at the primary care level.';
    } else if (inp.match(/conference|congress|easd|ada\b|trending|meeting|late.break/)) {
      text = 'Conference signal breakdown for this cycle:\n\n• EASD 2026: 3 late-breaking CV sessions, all referencing GLP-1 RA class data — Option 1 anchors directly to this congress moment.\n• ADA 2026 Annual Meeting: SELECT 3-year extension was a plenary session — further reinforces Option 1.\n• For Option 2, an ATTAIN registry real-world inertia study was presented at EASD as an oral.\n• Option 3 had representation at ERA 2026 (European Renal Association) but no headline sessions.\n\nIf congress currency matters to your audience, Option 1 has the strongest tailwind right now.';
    } else if (inp.match(/risk|safe|compliance|flag|scientific\s*review|approval/)) {
      text = 'Risk assessment for scientific review:\n\n• Option 1 (LOW): Strong, recent peer-reviewed evidence · all claims directly supported · no off-label framing required.\n• Option 2 (LOW): Real-world data is well-characterised · inertia framing is guideline-consistent · low claim sensitivity.\n• Option 3 (MEDIUM): Limited direct head-to-head evidence for some CKD subgroups · older primary publications · requires careful framing around dosing guidance.\n\nAll three are within acceptable risk range for medical affairs content. The validation agent will flag any issues during generation regardless.';
    } else if (inp.match(/hcp\s*signal|prescrib|doctor|physician|gp\b|specialist|audience/)) {
      text = 'HCP signal analysis:\n\n• Option 1 has the broadest reach — cardiologists, endocrinologists, and internists all engaged with CV outcomes data at EASD 2026. Strong for secondary care.\n• Option 2 resonates most with GPs who face therapeutic inertia daily. If you\'re targeting primary care prescribers, this is the strongest angle.\n• Option 3 is speciality-specific: excellent for nephrologists and multidisciplinary CKD clinics, weak for generalists.\n\nWhat is the primary prescriber type your brand team is targeting this month?';
    } else if (inp.match(/thank|good\s*(choice)?|perfect|looks\s*good|great|proceed|go\s*ahead|happy|satisfied/)) {
      text = 'Ready to move forward. Select a topic above and I\'ll take you into a project brief conversation where we align on key messages, depth, and structure — before the research and writing agents begin. This typically takes 5 minutes and significantly improves the quality of the output.';
    } else {
      text = 'Understood. Is there a specific aspect of any of the options you\'d like me to dig into — evidence quality, audience fit, conference signals, HCP signal strength, or strategic angle? I can also generate a fresh set of alternatives if none of these feel right for this month\'s brief.';
    }

    this.setState({
      topicsMessages: [...topicsMessages, userMsg, { from: 'agent', text, cards, time: 'Just now' }],
      topicsInput: '',
      topicsCardSet: newCardSet,
    });
  };

  selectTopic = (id) => {
    const chosen = TOPIC_OPTIONS.find((o) => o.id === id);
    this.setState({ topicChoice: id, topic: chosen.title }, () => this.go('chat'));
  };

  sendChat = () => {
    const { chatInput, chatMessages } = this.state;
    if (!chatInput.trim()) return;
    const userMsg = { from: 'user', text: chatInput.trim(), time: 'Just now' };
    const userCount = chatMessages.filter((m) => m.from === 'user').length;
    const nextQ = AGENT_QUESTIONS[userCount + 1];
    const agentReply = nextQ
      ? { from: 'agent', text: nextQ, time: 'Just now' }
      : { from: 'agent', text: "Perfect — I have everything I need to build a strong brief. When you're satisfied, click \"Proceed to Generation\" and the pipeline will begin.", time: 'Just now' };
    this.setState({ chatMessages: [...chatMessages, userMsg, agentReply], chatInput: '' });
  };

  runPipe() {
    this.setState({ logN: 6, stage: 2, elapsed: 0 });
    this.t = setInterval(() => {
      this.setState((st) => {
        const logN = Math.min(LOG_SCRIPT.length, st.logN + 1);
        const stage = logN >= 13 ? 4 : logN >= 7 ? 3 : 2;
        if (logN === LOG_SCRIPT.length) clearInterval(this.t);
        return { logN, stage, elapsed: st.elapsed + 1 };
      });
    }, 1400);
  }

  runRender() {
    this.setState({ renderStep: 2, built: 7 });
    this.t = setInterval(() => {
      this.setState((st) => {
        const built = Math.min(20, st.built + 1);
        const renderStep = Math.min(7, 2 + Math.floor((built - 7) / 2.2));
        if (built === 20) clearInterval(this.t);
        return { built, renderStep };
      });
    }, 900);
  }

  runSciChat = () => {
    const steps = [
      { delay: 0,    step: 1, text: null },
      { delay: 900,  step: 2, text: 'Review package received from Medical Affairs.\n\nOpening **Ozempic® (Semaglutide) — GLP-1 RA landscape** deck…\n\nLoading 12 accepted papers, 47 excerpts, and MA quality report.' },
      { delay: 2200, step: 3, text: null },
      { delay: 3400, step: 4, text: 'Papers indexed across **7 content tracks**.\n\n→ Condition & clinical problem — 3 papers\n→ General interventional evidence — 4 papers\n→ Safety & clinical application — 2 papers\n→ Root cause & mechanisms — 3 papers\n\nCross-referencing excerpts against source documents…' },
      { delay: 5200, step: 5, text: null },
      { delay: 6600, step: 6, text: 'Excerpt validation complete.\n\n**5 of 5 artifacts** populated with evidence.\n\nEvidence quality by artifact:\n**Deck** · 89/100 · HIGH\n**Blog** · 100/100 · HIGH\n**Protocol** · 74/100 · MODERATE — 1 gap flagged\n**Blurb** · 33/100 · LOW — insufficient sourcing\n**Facts** · 100/100 · HIGH' },
      { delay: 8400, step: 7, text: 'All excerpts are **approved by default**.\n\nReject any excerpt or artifact with a mandatory reason. Pay particular attention to the **Protocol** (gap in renal endpoints) and **Blurb** (single source — SELECT only).\n\nReady. Ask me anything about the evidence.' },
    ];
    steps.forEach(({ delay, step, text }) => {
      setTimeout(() => {
        this.setState((st) => {
          const update = { sciChatStep: step };
          if (text) update.sciChatMessages = st.sciChatMessages.concat({ from: 'agent', text });
          return update;
        });
      }, delay);
    });
  };

  runOrganizeAgent = () => {
    const delays = [0, 2200, 4800, 7800, 10800, 14200];
    delays.forEach((delay, i) => {
      setTimeout(() => {
        this.setState({ organizeAgentThinking: true });
      }, delay);
      setTimeout(() => {
        this.setState((_s) => ({
          organizeAgentMsgN: i + 1,
          organizeAgentThinking: i < delays.length - 1,
        }));
      }, delay + 1400);
    });
  };

  runMedReview() {
    this.setState({ reviewN: 0 });
    this.t = setInterval(() => {
      this.setState((st) => {
        const n = st.reviewN + 1;
        if (n >= REVIEW_AGENT_MSGS.length + 1) clearInterval(this.t);
        return { reviewN: n };
      });
    }, 1800);
  }

  runResearch() {
    this.setState({ researchN: 0 });
    this.t = setInterval(() => {
      this.setState((st) => {
        const n = st.researchN + 1;
        const max = RESEARCH_DBS.length + RESEARCH_PAPERS.length + 3;
        if (n >= max) clearInterval(this.t);
        return { researchN: n };
      });
    }, 720);
  }

  curBlocks() {
    const n = this.state.slides[this.state.slideIdx].n;
    return this.state.blocks || BLOCKS[n] || BLOCKS.DEFAULT;
  }

  pickSlide = (i) => this.setState({ slideIdx: i, blocks: null, sel: 0, editDraft: '' });

  pill(status) {
    const map = {
      'Awaiting Review': ['var(--acc)', 'rgba(30,64,175,0.12)'],
      Done: ['var(--ok)', 'rgba(22,101,52,0.12)'],
      Generating: ['var(--dim)', 'transparent'],
      Researching: ['var(--dim)', 'transparent'],
      Rendering: ['var(--dim)', 'transparent'],
    };
    const [c, bg] = map[status] || ['var(--dim)', 'transparent'];
    return `display:inline-block;border:1px solid ${c};background:${bg};color:${c};padding:4px 9px;font:600 10px/1 Archivo;letter-spacing:0.1em;text-transform:uppercase`;
  }

  badge(type) {
    const c = type === 'RCT' ? 'var(--ok)' : type === 'Guideline' ? 'var(--dim)' : 'var(--warn)';
    return `border:1px solid ${c};color:${c};padding:3px 7px;font:600 9.5px/1 Archivo;letter-spacing:0.09em;text-transform:uppercase`;
  }

  /* -------- derived view model (all computation lives here) -------- */
  renderVals() {
    const st = this.state;
    const S_ = st.screen;
    const reviewer = this.props.reviewerName ?? 'Munal';
    const est = { 30: [26, 11, 84], 45: [38, 15, 127], 60: [52, 21, 168] }[st.dur];
    const blocks = this.curBlocks();
    const sel = Math.min(st.sel, blocks.length - 1);
    const slide = st.slides[st.slideIdx];
    const cit = st.citOpen ? Object.assign({ n: st.citOpen }, SRC[st.citOpen]) : null;

    const navItems = [
      ['Dashboard', 'dash', ''],
      ['Active Decks', 'dash', '8'],
      ['Evidence Library', 'dash', '2.4k'],
      ['Templates', 'dash', '6'],
      ['Settings', 'dash', ''],
    ];
    const flowItems = [
      ['Dashboard', 'dash'], ['New Deck Intake', 'intake'], ['Run Research', 'research'],
      ['Organize Research', 'organize'], ['MA Review', 'med-review'],
    ];

    const pipeStages = STAGE_NAMES.map((name, i) => {
      const done = i < st.stage - 1;
      const active = i === st.stage - 1;
      return {
        i: String(i + 1).padStart(2, '0'), name, note: STAGE_NOTES[i],
        glyph: done ? '✓' : active ? '◐' : '',
        icon: `width:20px;height:20px;flex:none;display:grid;place-items:center;font-size:11px;border:1px solid ${done ? 'var(--ok)' : active ? 'var(--acc)' : 'var(--rule)'};color:${done ? 'var(--ok)' : active ? 'var(--acc)' : 'var(--faint)'};background:${active ? 'rgba(30,64,175,0.1)' : 'transparent'};${active ? 'animation:puls 1.4s infinite' : ''}`,
        label: `font-weight:700;font-size:12px;line-height:1.3;color:${done || active ? 'var(--ink)' : 'var(--faint)'}`,
        style: `padding:18px 16px;border-right:1px solid var(--rule);${active ? 'background:var(--s1)' : ''}`,
      };
    });

    const logs = LOG_SCRIPT.slice(0, st.logN).map((l, i) => ({
      t: l[0], text: l[1],
      style: `animation:rise 0.22s ease;${i === st.logN - 1 ? 'color:var(--ink)' : ''}`,
    }));

    const evidence = EVIDENCE.slice(0, Math.min(6, 2 + Math.floor(st.logN / 3))).map((k, i) => {
      const s = SRC[k];
      const score = [5, 5, 4, 4, 5, 4][i];
      return {
        type: s.type, year: s.year, title: s.title, src: s.src, badge: this.badge(s.type),
        conf: [1, 2, 3, 4, 5].map((n) => ({ style: `width:4px;height:11px;background:${n <= score ? 'var(--ok)' : 'var(--s2)'}` })),
      };
    });

    const cardStyle = (i) => `padding:24px 26px;border-right:${i % 2 === 0 ? '1px solid var(--rule)' : '0'};border-bottom:${i < 2 ? '1px solid var(--rule)' : '0'}`;
    const checks = [
      { name: 'Grounding Check', score: '38/40', unit: 'claims sourced', verdict: 'PASS', c: 'var(--ok)', pct: 95, note: '2 claims had no retrievable supporting span.' },
      { name: 'Citation Integrity', score: '36/38', unit: 'entailment passed', verdict: '2 FLAGS', c: 'var(--warn)', pct: 95, note: 'Two citations support a weaker claim than the sentence makes.' },
      { name: 'Numeric Consistency', score: '40/40', unit: 'figures re-derived', verdict: 'PASS', c: 'var(--ok)', pct: 100, note: 'All percentages, HRs and CIs match the cited source.' },
      { name: 'Compliance Guardrails', score: '1', unit: 'flag · EU (EMA) ruleset', verdict: 'ACTION', c: 'var(--acc)', pct: 88, note: 'One sentence implies an indication outside the approved label.' },
    ].map((c, i) => ({
      ...c, style: cardStyle(i),
      tag: `border:1px solid ${c.c};color:${c.c};padding:4px 8px;font:600 9.5px/1 Archivo;letter-spacing:0.1em`,
      numStyle: `font:700 30px/1 var(--mono);letter-spacing:-0.02em;color:${c.c}`,
      bar: `height:3px;width:${c.pct}%;background:${c.c}`,
    }));

    const flagTag = () => 'border:1px solid var(--warn);color:var(--warn);padding:3px 7px;font:600 9.5px/1 Archivo;letter-spacing:0.09em';
    const stTag = (ok) => `margin-left:auto;border:1px solid ${ok ? 'var(--ok)' : 'var(--acc)'};color:${ok ? 'var(--ok)' : 'var(--acc)'};padding:3px 8px;font:600 9.5px/1 Archivo;letter-spacing:0.09em;flex:none`;
    const flags = [
      { slide: '03', title: 'Unmet need in glycaemic control', type: 'UNSOURCED', status: 'ESCALATED', ok: false, sentence: 'Treatment intensification is typically delayed by roughly three years after a patient first exceeds their individualised target.', fixLabel: 'REVIEWER', fix: 'Retrieval returned only qualitative statements on therapeutic inertia. No source supports the three-year figure — reviewer to supply a citation or cut the sentence.' },
      { slide: '06', title: 'SUSTAIN-6 — cardiovascular outcomes', type: 'ENTAILMENT FAIL', status: 'REPAIRED', ok: true, sentence: 'The trial also demonstrated a benefit on all-cause mortality across the study population.', fixLabel: 'AUTO-REPAIR', fix: 'Rewritten to “no significant difference in all-cause mortality was observed”, matching the cited span. Re-validated: entailment 0.92.' },
      { slide: '22', title: 'Positioning in combination therapy', type: 'COMPLIANCE', status: 'REPAIRED', ok: true, sentence: 'Consider earlier use in patients without established cardiovascular disease to pre-empt long-term risk.', fixLabel: 'AUTO-REPAIR', fix: 'EU (EMA) ruleset flagged an implied indication outside the approved label. Sentence replaced with guideline-sourced positioning and a label reference footnote.' },
    ].map((f) => ({
      ...f, typeTag: flagTag(), statusTag: stTag(f.ok),
      style: `padding:20px 22px;border:1px solid var(--rule);border-left:2px solid ${f.ok ? 'var(--ok)' : 'var(--acc)'};background:var(--s1);margin-bottom:12px`,
    }));

    const stColors = { approved: 'var(--ok)', flagged: 'var(--warn)', edited: 'var(--acc)', pending: 'var(--faint)' };
    const slideNav = st.slides.map((s, i) => {
      const on = i === st.slideIdx;
      const c = stColors[s.st];
      return {
        num: String(s.n).padStart(2, '0'), st: s.st.toUpperCase(), title: s.title, pick: () => this.pickSlide(i),
        style: `padding:13px 18px;border-bottom:1px solid var(--rule);cursor:pointer;border-left:2px solid ${on ? 'var(--acc)' : 'transparent'};${on ? 'background:var(--s1)' : ''}`,
        dot: `width:6px;height:6px;background:${c};flex:none`,
        stColor: `color:${c}`,
        titleStyle: `font-size:12px;line-height:1.35;font-weight:${on ? 600 : 400};color:${on ? 'var(--ink)' : 'var(--dim)'};margin-bottom:9px`,
        thumb: `height:34px;border:1px solid var(--rule);background:var(--s2);opacity:${on ? 1 : 0.5}`,
      };
    });

    const blockVals = blocks.map((b, i) => ({
      kind: b.kind, text: b.text, flagged: !!b.flag, flagType: b.flag, flagReason: b.flagReason,
      select: () => this.setState({ sel: i, editDraft: b.text, tab: 'edit' }),
      cites: (b.cites || []).map((n) => ({ n, open: () => this.setState({ citOpen: n }) })),
      style: `padding:16px 18px;margin-bottom:12px;cursor:pointer;background:${b.flag ? 'rgba(146,64,14,0.07)' : 'var(--s1)'};border:1px solid ${i === sel ? 'var(--acc)' : b.flag ? 'rgba(207,154,43,.4)' : 'var(--rule)'}`,
    }));

    const diff = st.diff;
    const seg = (arr) => arr.map((p) => ({
      text: p[1],
      style: p[0] === 'del'
        ? 'background:rgba(30,64,175,0.14);color:var(--acc);text-decoration:line-through'
        : p[0] === 'add'
          ? 'background:rgba(79,168,124,.18);color:var(--ok);font-weight:600'
          : '',
    }));

    const renderStepsData = [
      ['Content frozen and hashed', 'sha256:9f2c41ab…4471'],
      ['Layout agent: assigning slide layouts', '40 slides · 9 layout classes'],
      ['Visual asset agent: rendering charts', '6 of 11 figures'],
      ['Speaker notes generation', '45-minute pacing target'],
      ['Brand template applied', 'Corporate Blue 2026'],
      ['Visual QA check', 'overflow · contrast · alignment'],
      ['Integrity gate (text diff vs approved hash)', 'zero-tolerance gate'],
    ].map((r, i) => {
      const done = i < st.renderStep - 1;
      const active = i === st.renderStep - 1;
      return {
        name: r[0], note: r[1], glyph: done ? '✓' : active ? '◐' : '○',
        icon: `width:22px;height:22px;flex:none;display:grid;place-items:center;font-size:12px;color:${done ? 'var(--ok)' : active ? 'var(--acc)' : 'var(--faint)'};border:1px solid ${done ? 'var(--ok)' : active ? 'var(--acc)' : 'var(--rule)'};${active ? 'animation:puls 1.3s infinite' : ''}`,
        label: `font-weight:700;font-size:13.5px;color:${done || active ? 'var(--ink)' : 'var(--faint)'}`,
        style: 'display:flex;gap:14px;align-items:flex-start;padding:14px 0;border-bottom:1px solid var(--rule)',
      };
    });

    const tiles = Array.from({ length: 20 }, (_, i) => {
      const filled = i < st.built;
      return {
        n: String(i + 1).padStart(2, '0'),
        style: `position:relative;aspect-ratio:4/3;border:1px solid ${filled ? 'var(--rule2)' : 'var(--rule)'};background:var(--s1);padding:9px;${filled ? 'animation:fill 0.4s ease' : 'opacity:0.45'}`,
        bar1: `height:4px;width:${filled ? '72%' : '40%'};background:${filled ? 'var(--ink)' : 'var(--faint)'};opacity:${filled ? 0.9 : 0.35}`,
        bar2: `height:3px;width:${filled ? '54%' : '28%'};background:var(--faint);margin-top:7px;opacity:${filled ? 0.8 : 0.3}`,
        bar3: `height:3px;width:${filled ? '62%' : '20%'};background:var(--faint);margin-top:4px;opacity:${filled ? 0.8 : 0.3}`,
      };
    });

    const deliverStats = [
      ['40', 'SLIDES', 'var(--ink)'], ['45', 'MINUTES', 'var(--ink)'], ['127', 'REFERENCES', 'var(--ink)'],
      ['ALL PASSED', 'VALIDATION', 'var(--ok)'], ['VERIFIED', 'INTEGRITY GATE', 'var(--ok)'],
    ].map((s, i) => ({
      value: s[0], label: s[1],
      style: `padding:22px 24px 22px ${i === 0 ? '0' : '24px'};border-right:${i < 4 ? '1px solid var(--rule)' : '0'}`,
      numStyle: `font:700 ${s[0].length > 3 ? '19px' : '32px'}/1 var(--mono);letter-spacing:-0.02em;color:${s[2]}`,
    }));

    const audit = [
      ['09:31:04', 'Mayank Gupta', 'Brief submitted — T2D · HCP · 45 min · EU (EMA)', 'ACCEPTED', 'ok'],
      ['09:35:19', 'Content Agent', '40 slides drafted from 58 evidence chunks', '118 CLAIMS', 'n'],
      ['09:36:58', 'Validation', '4 check batteries run · 3 flags · 2 auto-repaired', 'PARTIAL', 'warn'],
      ['14:02:11', 'Munal Sharma', 'Citation [6] added to slide 3 So-what block', 'EDITED', 'n'],
      ['14:09:47', 'Munal Sharma', 'Instruction: add SUSTAIN-6 CV outcomes data', 'AI REVISED', 'n'],
      ['14:18:03', 'Validation', 'Re-validation of 2 revised blocks', 'PASS', 'ok'],
      ['14:26:35', 'Munal Sharma', 'Deck approved — 40/40 slides signed off', 'APPROVED', 'ok'],
    ].map((a) => ({
      time: a[0], who: a[1], what: a[2], result: a[3],
      tag: `justify-self:start;border:1px solid ${a[4] === 'ok' ? 'var(--ok)' : a[4] === 'warn' ? 'var(--warn)' : 'var(--rule)'};color:${a[4] === 'ok' ? 'var(--ok)' : a[4] === 'warn' ? 'var(--warn)' : 'var(--dim)'};padding:3px 8px;font:600 9.5px/1 Archivo;letter-spacing:0.09em`,
    }));

    const tabStyle = (on) => `padding:14px 16px;text-align:center;font-weight:700;font-size:12.5px;cursor:pointer;color:${on ? 'var(--ink)' : 'var(--faint)'};background:${on ? 'var(--bg)' : 'transparent'};border-bottom:2px solid ${on ? 'var(--acc)' : 'transparent'};border-right:1px solid var(--rule)`;

    const pct = Math.round((st.logN / LOG_SCRIPT.length) * 100);
    const rpct = Math.round((st.built / 20) * 100);

    return {
      isDash: S_ === 'dash', isIntake: S_ === 'intake', isResearch: S_ === 'research', isOrganize: S_ === 'organize', isMedReview: S_ === 'med-review',
      isLanding: !st.role,
      role: st.role, pptStatus: st.pptStatus,
      isCreator: st.role === 'creator', isMA: st.role === 'ma', isSci: st.role === 'sci',
      dirLabel: this.dirOf() === 'light' ? 'LIGHT' : 'DARK',
      toggleDir: () => this.setState({ dir: this.dirOf() === 'light' ? 'dark' : 'light' }),
      researchN: st.researchN,
      researchSourcesOpen: st.researchSourcesOpen,
      toggleResearchSources: () => this.setState((s) => ({ researchSourcesOpen: !s.researchSourcesOpen })),
      researchSrcExpanded: st.researchSrcExpanded,
      toggleSrcExpanded: (i) => this.setState((s) => ({ researchSrcExpanded: { ...s.researchSrcExpanded, [i]: !s.researchSrcExpanded[i] } })),
      researchFilter: st.researchFilter,
      setResearchFilter: (f) => this.setState({ researchFilter: f }),
      acceptedPapers: st.acceptedPapers,
      acceptedDrawerOpen: st.acceptedDrawerOpen,
      toggleAcceptedDrawer: () => this.setState((s) => ({ acceptedDrawerOpen: !s.acceptedDrawerOpen })),
      toggleAccept: (i) => {
        this.setState((s) => ({ acceptedPapers: { ...s.acceptedPapers, [i]: !s.acceptedPapers[i] } }));
      },
      acceptedPopupOpen: st.acceptedPopupOpen,
      toggleAcceptedPopup: () => this.setState((s) => ({ acceptedPopupOpen: !s.acceptedPopupOpen })),
      excerptOpen: st.excerptOpen,
      organizeExpanded: st.organizeExpanded,
      organizeExpandAll: st.organizeExpandAll,
      organizeSelectedPaper: st.organizeSelectedPaper,
      organizeArtifactFilter: st.organizeArtifactFilter,
      setOrganizeSelected: (p) => this.setState({ organizeSelectedPaper: p }),
      organizeView: st.organizeView,
      setOrganizeView: (vw) => this.setState({ organizeView: vw }),
      organizeAgentMsgN: st.organizeAgentMsgN,
      organizeAgentThinking: st.organizeAgentThinking,
      organizeAgentInput: st.organizeAgentInput,
      setOrganizeAgentInput: (val) => this.setState({ organizeAgentInput: val }),
      sendOrganizeMsg: () => {
        const txt = st.organizeAgentInput.trim();
        if (!txt) return;
        this.setState({ organizeAgentInput: '', organizeAgentThinking: true });
        setTimeout(() => this.setState((s) => ({
          organizeAgentMsgN: s.organizeAgentMsgN + 1,
          organizeAgentThinking: false,
        })), 1800);
      },
      maReviewModal: st.maReviewModal,
      openMAReview: () => this.setState({ maReviewModal: true }),
      closeMAReview: () => this.setState({ maReviewModal: false }),
      reviewN: st.reviewN,
      medReviewTab: st.medReviewTab,
      setMedReviewTab: (t) => this.setState({ medReviewTab: t, medReviewPaper: null }),
      medReviewPaper: st.medReviewPaper,
      setMedReviewPaper: (p) => this.setState({ medReviewPaper: p }),
      sciSubmitted: st.sciSubmitted,
      submitToSci: () => this.setState({ sciSubmitted: true }),
      isSciDash: S_ === 'sci-dash',
      isSciReview: S_ === 'sci-review',
      sciSelectedPaper: st.sciSelectedPaper,
      setSciSelectedPaper: (p) => this.setState({ sciSelectedPaper: p, sciCommentDraft: null, sciActiveHighlight: null }),
      sciInlineComments: st.sciInlineComments,
      sciCommentDraft: st.sciCommentDraft,
      setSciCommentDraft: (key) => this.setState({ sciCommentDraft: { key, text: '' } }),
      setSciCommentText: (text) => this.setState((s) => ({ sciCommentDraft: s.sciCommentDraft ? { ...s.sciCommentDraft, text } : null })),
      submitSciComment: () => this.setState((s) => {
        if (!s.sciCommentDraft || !s.sciCommentDraft.text.trim()) return null;
        const key = s.sciCommentDraft.key;
        const existing = s.sciInlineComments[key] || [];
        return {
          sciInlineComments: { ...s.sciInlineComments, [key]: existing.concat({ id: Date.now(), text: s.sciCommentDraft.text, author: 'Dr. Arjun Mehta', time: 'Just now', resolved: false }) },
          sciCommentDraft: null,
        };
      }),
      cancelSciComment: () => this.setState({ sciCommentDraft: null }),
      resolveSciComment: (key, id) => this.setState((s) => ({
        sciInlineComments: { ...s.sciInlineComments, [key]: (s.sciInlineComments[key] || []).map(c => c.id === id ? { ...c, resolved: true } : c) },
      })),
      sciActiveHighlight: st.sciActiveHighlight,
      setSciHighlight: (key) => this.setState({ sciActiveHighlight: key }),
      sciChatStep: st.sciChatStep,
      sciReviewComments: st.sciReviewComments,
      setSciComment: (key, text) => this.setState((s) => ({ sciReviewComments: { ...s.sciReviewComments, [key]: { ...s.sciReviewComments[key], text } } })),
      toggleSciReject: (key) => this.setState((s) => {
        const cur = s.sciReviewComments[key] || {};
        return { sciReviewComments: { ...s.sciReviewComments, [key]: { ...cur, rejected: !cur.rejected } } };
      }),
      sciReviewTab: st.sciReviewTab,
      setSciReviewTab: (t) => this.setState({ sciReviewTab: t }),
      sciChatInput: st.sciChatInput,
      sciChatMessages: st.sciChatMessages,
      onSciChatInput: (e) => this.setState({ sciChatInput: e.target.value }),
      sendSciChat: () => {
        const txt = st.sciChatInput.trim();
        if (!txt) return;
        const userMsg = { from: 'user', text: txt };
        const agentReply = { from: 'agent', text: 'Understood. I\'ve noted your concern about **' + txt.slice(0, 40) + (txt.length > 40 ? '…' : '') + '**. This will be flagged in the final scientific review report.' };
        this.setState((s) => ({ sciChatInput: '', sciChatMessages: s.sciChatMessages.concat(userMsg) }));
        setTimeout(() => this.setState((s) => ({ sciChatMessages: s.sciChatMessages.concat(agentReply) })), 1200);
      },
      sciApproveAll: () => this.setState({ screen: 'dash', sciSubmitted: false }),
      addExcerptModal: st.addExcerptModal,
      openAddExcerpt: (trackId) => this.setState({ addExcerptModal: { trackId }, excerptModalText: '', excerptModalArtifacts: { Deck: true, Blog: false, Protocol: false, Blurb: false, Facts: false }, excerptModalTracks: { [trackId]: true } }),
      closeAddExcerpt: () => this.setState({ addExcerptModal: null }),
      excerptModalText: st.excerptModalText,
      setExcerptModalText: (t) => this.setState({ excerptModalText: t }),
      excerptModalArtifacts: st.excerptModalArtifacts,
      toggleExcerptModalArtifact: (a) => this.setState((s) => ({ excerptModalArtifacts: { ...s.excerptModalArtifacts, [a]: !s.excerptModalArtifacts[a] } })),
      excerptModalTracks: st.excerptModalTracks,
      toggleExcerptModalTrack: (id) => this.setState((s) => ({ excerptModalTracks: { ...s.excerptModalTracks, [id]: !s.excerptModalTracks[id] } })),
      customExcerpts: st.customExcerpts,
      submitExcerpt: () => this.setState((s) => {
        if (!s.excerptModalText.trim()) return {};
        const entry = { id: Date.now(), text: s.excerptModalText.trim(), artifacts: Object.keys(s.excerptModalArtifacts).filter((a) => s.excerptModalArtifacts[a]), tracks: Object.keys(s.excerptModalTracks).filter((t) => s.excerptModalTracks[t]) };
        return { customExcerpts: [...s.customExcerpts, entry], addExcerptModal: null };
      }),
      toggleOrganizeTrack: (id) => this.setState((s) => ({ organizeExpanded: { ...s.organizeExpanded, [id]: !s.organizeExpanded[id] } })),
      setOrganizeExpandAll: (v2) => this.setState({ organizeExpandAll: v2, organizeExpanded: Object.fromEntries(CONTENT_TRACKS.map((t) => [t.id, v2])) }),
      toggleOrganizeArtifact: (a) => this.setState((s) => ({ organizeArtifactFilter: { ...s.organizeArtifactFilter, [a]: !s.organizeArtifactFilter[a] } })),
      toggleExcerpt: (i) => this.setState((s) => ({ excerptOpen: { ...s.excerptOpen, [i]: !s.excerptOpen[i] } })),
      goIntake: () => this.go('intake'),

      nav: navItems.map((n, i) => ({
        label: n[0], count: n[2], go: () => this.go(n[1]),
        style: `display:flex;align-items:center;gap:10px;padding:9px 20px 9px 18px;cursor:pointer;font-size:13px;font-weight:${i === 0 && S_ === 'dash' ? 600 : 400};color:${i === 0 && S_ === 'dash' ? 'var(--ink)' : 'var(--dim)'}`,
        bar: `width:2px;height:14px;background:${i === 0 && S_ === 'dash' ? 'var(--acc)' : 'transparent'}`,
        countStyle: 'margin-left:auto;font:600 10.5px/1 var(--mono);color:var(--faint)',
      })),
      flow: flowItems.map((f, i) => ({
        i: String(i + 1), label: f[0], go: () => this.go(f[1]),
        style: `display:flex;align-items:center;gap:11px;padding:7px 20px;cursor:pointer;font-size:12px;color:${S_ === f[1] ? 'var(--ink)' : 'var(--dim)'};${S_ === f[1] ? 'background:var(--s1)' : ''}`,
        num: `font:700 10px/1 var(--mono);color:${S_ === f[1] ? 'var(--acc)' : 'var(--faint)'};flex:none;width:10px`,
      })),

      stats: [
        { label: 'DECKS IN PROGRESS', value: '4', delta: '2 in generation', c: 'var(--ink)' },
        { label: 'PENDING YOUR REVIEW', value: '2', delta: 'oldest 1 day', c: 'var(--acc)' },
        { label: 'COMPLETED THIS MONTH', value: '18', delta: '+5 vs August', c: 'var(--ok)' },
      ].map((k, i) => ({
        ...k,
        style: `padding:26px 32px 28px;min-width:0;border-right:${i < 2 ? '1px solid var(--rule)' : '0'}`,
        numStyle: `font:700 40px/1 var(--mono);letter-spacing:-0.03em;color:${k.c}`,
      })),

      decks: DECKS.map((d) => ({
        topic: d.topic, area: d.area, status: d.status, created: d.created, pill: this.pill(d.status), go: () => this.go(d.to),
        ticks: Array.from({ length: 7 }, (_, i) => ({
          style: `height:3px;width:14px;background:${i < d.stage ? (d.status === 'Done' ? 'var(--ok)' : d.status === 'Awaiting Review' ? 'var(--acc)' : 'var(--dim)') : 'var(--s2)'}`,
        })),
      })),

      queue: [
        { topic: 'Tirzepatide in obesity — 2026 readouts', why: '12 new publications · EASD 2026 late-breaker', score: '0.91' },
        { topic: 'MASH fibrosis staging in practice', why: 'Guideline update expected Q4 · KOL demand high', score: '0.84' },
        { topic: 'CGM in non-insulin-treated T2D', why: '6 congress abstracts · payer interest rising', score: '0.77' },
      ].map((q, i) => ({
        ...q,
        approve: () => this.setState({ approved: i, topic: q.topic, fromQueue: true, screen: 'intake' }),
        btnLabel: st.approved === i ? 'Queued ✓' : 'Approve',
        btn: `border:1px solid ${st.approved === i ? 'var(--ok)' : 'var(--rule2)'};color:${st.approved === i ? 'var(--ok)' : 'var(--ink)'};padding:5px 11px;font-size:11.5px;font-weight:600;cursor:pointer`,
      })),

      attention: [
        { topic: 'Type 2 Diabetes — GLP-1 RA landscape', note: '1 claim escalated to reviewer — unsourced', meta: 'Awaiting Munal · 1 day', to: 'valid', c: 'var(--acc)' },
        { topic: 'NASH / MASH — emerging therapies', note: '28 of 36 slides reviewed', meta: 'Awaiting Munal · 4 hours', to: 'review', c: 'var(--acc)' },
        { topic: 'Adherence in basal insulin initiation', note: 'Visual QA: 2 slides overflow at 45 min pacing', meta: 'Rendering · automatic retry', to: 'render', c: 'var(--warn)' },
      ].map((a) => ({ ...a, go: () => this.go(a.to), mark: `width:3px;flex:none;background:${a.c}` })),

      topic: st.topic, fromQueue: st.fromQueue,
      onTopic: (e) => this.setState({ topic: e.target.value }),
      heroProduct: st.heroProduct,
      onHeroProduct: (e) => this.setState({ heroProduct: e.target.value }),
      area: st.area, areas: ['Endocrinology / Metabolic', 'Cardiology', 'Nephrology', 'Hepatology', 'Obesity / Cardiometabolic'], onArea: (e) => this.setState({ area: e.target.value }),
      region: st.region, regions: ['EU (EMA)', 'US (FDA)', 'UK (MHRA)', 'Japan (PMDA)', 'Global — strictest union'], onRegion: (e) => this.setState({ region: e.target.value }),
      lang: st.lang, langs: ['English (UK)', 'English (US)', 'German', 'Spanish', 'Japanese'], onLang: (e) => this.setState({ lang: e.target.value }),
      audiences: ['HCP', 'KOL', 'Internal'].map((a) => {
        const locked = a !== 'HCP';
        return {
          label: a, pick: () => !locked && this.setState({ aud: a }),
          locked,
          style: `flex:1;text-align:center;padding:11px 8px;cursor:${locked ? 'default' : 'pointer'};font-size:12.5px;font-weight:${st.aud === a ? 700 : 400};background:${st.aud === a ? 'var(--acc)' : 'transparent'};color:${locked ? 'var(--faint)' : st.aud === a ? '#fff' : 'var(--dim)'};border-right:1px solid var(--rule);position:relative`,
        };
      }),
      /* intel */
      projectThreads: st.projectThreads,
      activeThreadId: st.activeThreadId,
      projectInput: st.projectInput,
      onProjectInput: (e) => this.setState({ projectInput: e.target.value }),
      onProjectKey: (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); this.sendIntelMessage(); } },
      sendIntelMessage: () => this.sendIntelMessage(),
      newIntelThread: () => this.newIntelThread(),
      pickThread: (id) => this.setState({ activeThreadId: id, projectInput: '' }),
      intelCriteria: INTEL_CRITERIA,
      intelCoveredIds: new Set(st.projectThreads.map((t) => t.criterionId)),
      intelReady: (() => {
        const covered = new Set(st.projectThreads.map((t) => t.criterionId)).size;
        const msgs = st.projectThreads.reduce((a, t) => a + t.messages.filter((m) => m.from === 'user').length, 0);
        return covered >= 3 || msgs >= 2;
      })(),
      goTopicsFromIntel: () => this.go('topics'),
      dur: st.dur, onDur: (e) => this.setState({ dur: +e.target.value }),
      templates: [
        { name: 'Corporate Blue 2026', meta: '16:9 · approved' },
        { name: 'Scientific Exchange', meta: '16:9 · approved' },
        { name: 'Congress Booth', meta: '16:9 · draft' },
      ].map((t, i) => ({
        ...t, pick: () => this.setState({ tpl: i }),
        style: `padding:12px;cursor:pointer;border:1px solid ${st.tpl === i ? 'var(--acc)' : 'var(--rule)'};background:var(--s1)`,
        thumb: 'aspect-ratio:16/9;background:var(--bg);border:1px solid var(--rule);padding:10px',
        thumbBar: `height:6px;width:${[46, 60, 36][i]}%;background:${st.tpl === i ? 'var(--acc)' : 'var(--dim)'}`,
      })),
      advOpen: st.advOpen, toggleAdv: () => this.setState((s) => ({ advOpen: !s.advOpen })),
      advMark: 'display:grid;place-items:center;width:16px;height:16px;border:1px solid var(--rule2);font-size:11px;line-height:1;color:var(--ink)',
      advSummary: `${st.cover.length} must cover · ${st.avoid.length} must avoid`,
      cover: st.cover.map((c, i) => ({ label: c, remove: () => this.setState((s) => ({ cover: s.cover.filter((_, j) => j !== i) })) })),
      avoid: st.avoid.map((c, i) => ({ label: c, remove: () => this.setState((s) => ({ avoid: s.avoid.filter((_, j) => j !== i) })) })),
      coverDraft: st.coverDraft, avoidDraft: st.avoidDraft,
      onCoverDraft: (e) => this.setState({ coverDraft: e.target.value }),
      onAvoidDraft: (e) => this.setState({ avoidDraft: e.target.value }),
      onCoverKey: (e) => { if (e.key === 'Enter' && e.target.value.trim()) this.setState((s) => ({ cover: s.cover.concat(s.coverDraft.trim()), coverDraft: '' })); },
      onAvoidKey: (e) => { if (e.key === 'Enter' && e.target.value.trim()) this.setState((s) => ({ avoid: s.avoid.concat(s.avoidDraft.trim()), avoidDraft: '' })); },
      estSlides: est[0], estMin: est[1], estRefs: est[2],
      startGen: () => this.go('research'),

      goTopics: () => this.go('topics'),
      topicsMessages: st.topicsMessages.map((m) => {
        const pool = m.cards === 'alt' ? ALT_TOPIC_OPTIONS : TOPIC_OPTIONS;
        return {
          ...m,
          isAgent: m.from === 'agent',
          parts: m.text.split('\n\n'),
          inlineCards: m.cards ? pool.map((o) => ({
            ...o,
            riskColor: o.risk === 'LOW' ? 'var(--ok)' : o.risk === 'MEDIUM' ? 'var(--warn)' : 'var(--acc)',
            select: () => this.selectTopic(o.id),
          })) : null,
        };
      }),
      topicsInput: st.topicsInput,
      onTopicsInput: (e) => this.setState({ topicsInput: e.target.value }),
      onTopicsKey: (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); this.sendTopicsChat(); } },
      doSendTopics: () => this.sendTopicsChat(),
      topicsSuggestions: [
        'Tell me more about Option 1', 'More clinical focus', 'Compare all three options', 'Show evidence quality', 'Show alternatives', 'Which has the strongest HCP signal?', 'What are the conference signals?',
      ],
      useTopicsSuggestion: (t) => this.setState({ topicsInput: t }),
      currentRailCards: (st.topicsCardSet === 'alt' ? ALT_TOPIC_OPTIONS : TOPIC_OPTIONS).map((o) => ({
        ...o,
        riskColor: o.risk === 'LOW' ? 'var(--ok)' : o.risk === 'MEDIUM' ? 'var(--warn)' : 'var(--acc)',
        select: () => this.selectTopic(o.id),
      })),
      topicsMsgCount: st.topicsMessages.length,

      chatMessages: st.chatMessages.map((m) => ({
        ...m,
        isAgent: m.from === 'agent',
        parts: m.text.split('\n\n'),
      })),
      chatInput: st.chatInput,
      onChatInput: (e) => this.setState({ chatInput: e.target.value }),
      onChatKey: (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); this.sendChat(); } },
      sendChat: () => this.sendChat(),
      chatReady: st.chatMessages.filter((m) => m.from === 'user').length >= 2,
      proceedToGen: () => this.go('pipe'),
      chatSuggestions: [
        'Focus entirely on CV outcomes data', 'Skip MOA — audience knows it', 'Anchor on SUSTAIN-6 trial', 'Highlight high-CV-risk patients', 'Include real-world registry data',
      ],
      useSuggestion: (t) => this.setState({ chatInput: t }),
      chosenTopic: ([...TOPIC_OPTIONS, ...ALT_TOPIC_OPTIONS].find((o) => o.id === st.topicChoice)) || TOPIC_OPTIONS[0],

      stages: pipeStages, logs, evidence,
      chunkLabel: `${Math.min(58, 12 + st.logN * 3)} chunks indexed · 6 shown`,
      pctLabel: pct + '%',
      etaLabel: pct >= 100 ? 'Validation report ready' : `~${Math.max(1, Math.round((LOG_SCRIPT.length - st.logN) * 0.6))} min remaining · stage ${st.stage} of 7`,
      progStyle: `height:3px;width:${pct}%;background:var(--acc);transition:width 0.5s ease`,
      skipPipe: () => this.go('valid'),

      checks, flags,

      reviewer, reviewedLabel: `${st.reviewed} / 40 reviewed`,
      reviewProg: `height:3px;width:${Math.round((st.reviewed / 40) * 100)}%;background:var(--acc)`,
      approveAll: () => this.go('render'),
      slideNav, blocks: blockVals,
      activeNum: String(slide.n).padStart(2, '0'), activeTitle: slide.title, activeLayout: slide.layout,
      onTitle: (e) => { const v = e.target.value; this.setState((s) => ({ slides: s.slides.map((x, i) => (i === s.slideIdx ? { ...x, title: v } : x)) })); },
      prevSlide: () => this.pickSlide(Math.max(0, st.slideIdx - 1)),
      nextSlide: () => this.pickSlide(Math.min(st.slides.length - 1, st.slideIdx + 1)),
      approveSlide: () => this.setState((s) => ({
        slides: s.slides.map((x, i) => (i === s.slideIdx ? { ...x, st: 'approved' } : x)),
        reviewed: Math.min(40, s.reviewed + 1),
        slideIdx: Math.min(s.slides.length - 1, s.slideIdx + 1), blocks: null, sel: 0,
        history: [{ text: `Slide ${s.slides[s.slideIdx].n} approved`, meta: '14:31 · ' + reviewer, kind: 'ok' }].concat(s.history),
      })),
      tab: st.tab,
      isTabEdit: st.tab === 'edit', isTabInstr: st.tab === 'instr',
      tabEdit: () => this.setState({ tab: 'edit', editDraft: blocks[sel].text }),
      tabInstr: () => this.setState({ tab: 'instr' }),
      tabEditStyle: tabStyle(st.tab === 'edit'), tabInstrStyle: tabStyle(st.tab === 'instr'),
      selLabel: blocks[sel].kind, editDraft: st.editDraft || blocks[sel].text,
      onEditDraft: (e) => this.setState({ editDraft: e.target.value }),
      saveEdit: () => this.setState((s) => ({
        blocks: blocks.map((b, i) => (i === sel ? { ...b, text: s.editDraft || b.text } : b)),
        slides: s.slides.map((x, i) => (i === s.slideIdx ? { ...x, st: 'edited' } : x)),
        history: [{ text: `${blocks[sel].kind} block edited directly`, meta: '14:33 · ' + reviewer, kind: 'edit' }].concat(s.history),
      })),
      instr: st.instr, onInstr: (e) => this.setState({ instr: e.target.value }),
      examples: [
        'Add SUSTAIN-6 cardiovascular outcomes data',
        'Cut the unsourced three-year inertia claim',
        'Tighten to two sentences for a 45-minute pacing target',
      ].map((t) => ({ text: t, use: () => this.setState({ instr: t }) })),
      sendAI: () => {
        const b = blocks[sel];
        this.setState({ screen: 'diff', diff: Object.assign(this.demoDiff(), { instr: st.instr || 'Add SUSTAIN-6 cardiovascular outcomes data', block: b.id }) });
      },
      history: st.history.map((h) => ({
        text: h.text, meta: h.meta,
        dot: `background:${h.kind === 'flag' ? 'var(--warn)' : h.kind === 'ok' ? 'var(--ok)' : 'var(--acc)'}`,
      })),
      citOpen: !!cit, cit: cit ? { ...cit, badge: this.badge(cit.type) } : null,
      closeCit: () => this.setState({ citOpen: null }),

      diffInstr: diff ? diff.instr : '', diffWhy: diff ? diff.why : '',
      diffLeft: diff ? seg(diff.left) : [], diffRight: diff ? seg(diff.right) : [],
      acceptDiff: () => this.setState((s) => ({
        screen: 'review', diff: null,
        blocks: blocks.map((b, i) => (i === sel ? { ...b, flag: null, flagReason: null, cites: [3, 1], text: 'In a pooled analysis of 41 real-world cohorts, 47.2% of patients achieved HbA1c below 7.0%. Attainment was lowest in the two years after intensification. In SUSTAIN-6, the primary composite of CV death, non-fatal MI or non-fatal stroke occurred in 6.6% of patients versus 8.9% on placebo (HR 0.74; 95% CI 0.58–0.95), placing the control gap alongside a measured cardiovascular outcome.' } : b)),
        slides: s.slides.map((x, i) => (i === s.slideIdx ? { ...x, st: 'edited' } : x)),
        history: [{ text: 'AI revision accepted — SUSTAIN-6 data added, citation [1] attached', meta: '14:36 · ' + reviewer, kind: 'ok' }].concat(s.history),
      })),
      rejectDiff: () => this.setState({ screen: 'review', diff: null, tab: 'instr' }),

      renderSteps: renderStepsData, tiles, builtLabel: `${st.built} of 40 slides assembled`,
      renderPct: rpct + '%',
      renderEta: rpct >= 100 ? 'Finalising · integrity gate' : `~${Math.max(1, Math.round((20 - st.built) * 0.5))} min remaining`,
      renderBar: `height:3px;width:${rpct}%;background:var(--acc);transition:width 0.4s ease`,

      deliverStats, audit,

      /* ---------- role actions ---------- */
      enterRole: (r) => this.enterRole(r),
      switchRole: () => this.switchRole(),
      doSendToMA: () => this.sendToMA(),
      doResubmitToMA: () => this.resubmitToMA(),
      doMAApprove: () => this.maApprove(),
      doSciApprove: () => this.sciApprove(),

      /* ---------- notifications ---------- */
      notifications: st.notifications,
      unreadCount: st.notifications.filter((n) => !n.read).length,
      notifOpen: st.notifOpen,
      toggleNotif: () => this.setState((s) => ({
        notifOpen: !s.notifOpen,
        notifications: !s.notifOpen ? s.notifications.map((n) => ({ ...n, read: true })) : s.notifications,
      })),

      /* ---------- send-back modal ---------- */
      sendBackOpen: st.sendBackOpen,
      sendBackNote: st.sendBackNote,
      onSendBackNote: (e) => this.setState({ sendBackNote: e.target.value }),
      openSendBack: () => this.setState({ sendBackOpen: true }),
      closeSendBack: () => this.setState({ sendBackOpen: false, sendBackNote: '' }),
      doMASendBack: () => this.maSendBack(),
      doSciSendBack: () => this.sciSendBack(),
      maTotalComments: Object.values(st.maComments).reduce((a, arr) => a + arr.length, 0),
      sciTotalComments: Object.values(st.sciComments).reduce((a, arr) => a + arr.length, 0),
      maCommentSlideCount: Object.values(st.maComments).filter((arr) => arr.length > 0).length,
      sciCommentSlideCount: Object.values(st.sciComments).filter((arr) => arr.length > 0).length,

      /* ---------- comment pins ---------- */
      pendingPin: st.pendingPin,
      openPin: st.openPin,
      commentDraft: st.commentDraft,
      onCommentDraft: (e) => this.setState({ commentDraft: e.target.value }),
      onCommentKey: (e, role) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); this.addComment(role); } },
      cancelPin: () => this.setState({ pendingPin: null, openPin: null, commentDraft: '' }),
      doAddComment: () => this.addComment(st.pendingPin?.role),
      setOpenPin: (slideNum, commentId, role) => this.setState({ openPin: { slideNum, commentId, role }, pendingPin: null, commentDraft: '' }),
      closePin: () => this.setState({ openPin: null }),
      openPinData: (() => {
        if (!st.openPin) return null;
        const pool = st.openPin.role === 'ma' ? st.maComments : st.sciComments;
        return (pool[st.openPin.slideNum] || []).find((c) => c.id === st.openPin.commentId) || null;
      })(),
      resolvePin: (role, slideNum, commentId) => {
        if (role && slideNum && commentId) { this.resolveComment(role, slideNum, commentId); return; }
        if (st.openPin) this.resolveComment(st.openPin.role, st.openPin.slideNum, st.openPin.commentId);
      },
      onSlideCanvasClick: (e, slideNum, reviewRole) => this.handleSlideClick(e, slideNum, reviewRole),
      addCenterPin: (slideNum, reviewRole) => {
        this.setState({ pendingPin: { x: 50, y: 50, slideNum, role: reviewRole }, commentDraft: '', openPin: null });
      },
      pickSlideN: (n) => { const idx = st.slides.findIndex(s => s.n === n); if (idx >= 0) this.setState({ slideIdx: idx }); },
      slides: st.slides,
      currentSlideNum: st.slides[st.slideIdx]?.n ?? 3,
      maCurrentComments: st.maComments[st.slides[st.slideIdx]?.n] || [],
      sciCurrentComments: st.sciComments[st.slides[st.slideIdx]?.n] || [],
      maAllComments: st.maComments,
      sciAllComments: st.sciComments,

      /* ---------- reviewer tab state (sci panel) ---------- */
      reviewerTab: st.tab === 'instr' ? 'ma' : 'my',
      switchToMyComments: () => this.setState({ tab: 'edit' }),
      switchToMAComments: () => this.setState({ tab: 'instr' }),

      /* ---------- MA inbox ---------- */
      maInbox: (() => {
        const live = { topic: st.topic, by: 'Mayank Gupta', date: '2 Sep · 09:41', status: st.pptStatus, live: true };
        const hist = [
          { topic: 'NASH / MASH — emerging therapeutic options', by: 'Mayank Gupta', date: '1 Sep · 14:12', status: 'ma-approved', live: false },
          { topic: 'Obesity and cardiometabolic risk reduction', by: 'Mayank Gupta', date: '31 Aug · 11:05', status: 'ma-rejected', live: false },
        ];
        const all = st.pptStatus !== 'draft' ? [live, ...hist] : hist;
        const statusLabel = (s) => ({ 'sent-to-ma': 'Pending Review', 'ma-rejected': 'Sent Back', 'ma-approved': 'Approved', 'sent-to-sci': 'Approved', 'sci-rejected': 'Approved', 'sci-approved': 'Approved', 'draft': 'Draft' }[s] || s);
        const statusColor = (s) => s === 'sent-to-ma' ? 'var(--acc)' : s === 'ma-rejected' ? 'var(--warn)' : 'var(--ok)';
        return all.map((r) => ({
          ...r, statusLabel: statusLabel(r.status), statusColor: statusColor(r.status), isLive: r.live,
          open: r.live && r.status === 'sent-to-ma' ? () => this.go('ma-review') : null,
        }));
      })(),

      /* ---------- Sci inbox ---------- */
      sciInbox: (() => {
        const unlocked = ['ma-approved', 'sent-to-sci', 'sci-rejected', 'sci-approved'].includes(st.pptStatus);
        const live = { topic: st.topic, by: 'Mayank Gupta', date: '2 Sep · MA approved 14:26', status: st.pptStatus, live: true };
        const hist = [
          { topic: 'Semaglutide CV outcomes — SELECT readout', by: 'Mayank Gupta', date: '26 Aug · 16:03', status: 'sci-approved', live: false },
          { topic: 'NASH / MASH — emerging therapeutic options', by: 'Mayank Gupta', date: '25 Aug · 09:44', status: 'sci-approved', live: false },
        ];
        const all = unlocked ? [live, ...hist] : hist;
        const statusLabel = (s) => ({ 'ma-approved': 'Pending Review', 'sci-rejected': 'Sent Back', 'sci-approved': 'Approved' }[s] || 'Approved');
        const statusColor = (s) => s === 'ma-approved' ? 'var(--acc)' : s === 'sci-rejected' ? 'var(--warn)' : 'var(--ok)';
        return all.map((r) => ({
          ...r, statusLabel: statusLabel(r.status), statusColor: statusColor(r.status), isLive: r.live,
          open: r.live && r.status === 'ma-approved' ? () => this.go('sci-review') : null,
        }));
      })(),

      sciInboxLocked: !['ma-approved', 'sent-to-sci', 'sci-rejected', 'sci-approved'].includes(st.pptStatus),
    };
  }

  /* ---------------------------- render ---------------------------- */
  render() {
    const v = this.renderVals();
    const S_ = this.state.screen;
    const label = 'font:600 10px/1 Archivo;letter-spacing:0.13em;color:var(--dim);margin-bottom:12px;display:block';
    const kicker = 'font:600 10px/1 Archivo;letter-spacing:0.16em;color:var(--faint)';
    const fieldCss = 'width:100%;background:var(--s1);border:1px solid var(--rule);padding:11px 12px';

    /* ---------- role-specific sidebar helpers ---------- */
    const reviewerSidebarItems = [['Dashboard', 'dash'], ['Settings', 'dash']];
    const reviewerAccent = v.isMA ? 'var(--warn)' : 'var(--ok)';
    const reviewerLabel = v.isMA ? 'MEDICAL AFFAIRS' : 'SCIENTIFIC REVIEW';
    const reviewerName = v.isMA ? 'Dr. Priya Nair' : 'Dr. Arjun Mehta';
    const reviewerInitials = v.isMA ? 'PN' : 'AM';
    const reviewerRole = v.isMA ? 'Lead MA Reviewer' : 'Scientific Adviser';

    if (v.isLanding) {
      const { loginEmail, loginPassword, loginError, loginPwShow } = this.state;
      const creds = MedFactory.CREDENTIALS;
      return (
        <div ref={this.rootRef} style={S('font-family:Archivo,system-ui,sans-serif;background:var(--bg);color:var(--ink);height:100vh;display:flex;font-size:14px;line-height:1.45;-webkit-font-smoothing:antialiased')}>
          {/* left panel — branding (dark navy) */}
          <div style={{ width: 440, flexShrink: 0, display: 'flex', flexDirection: 'column', padding: '52px 48px', background: '#0d1f4e', color: '#e8eef8' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 'auto' }}>
              <div style={{ width: 16, height: 16, background: '#60a5fa' }} />
              <div style={{ fontWeight: 800, fontSize: 17, letterSpacing: '-0.02em', color: '#e8eef8' }}>MedFactory</div>
            </div>
            <div>
              <div style={{ font: '700 9px/1 Archivo', letterSpacing: '0.18em', color: '#60a5fa', marginBottom: 18 }}>MEDICAL AFFAIRS · CONTENT PIPELINE</div>
              <h1 style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.1, margin: '0 0 20px', color: '#ffffff' }}>Science-validated<br />content, faster.</h1>
              <div style={{ color: '#8aaad4', fontSize: 13.5, lineHeight: 1.7, marginBottom: 44 }}>
                Three roles. One pipeline. From brand brief to MA-approved webinar deck — with full audit trail.
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { accent: '#60a5fa', label: 'Medical Affairs (Creator)', sub: 'Briefing · Research · MA Review · Submit' },
                  { accent: '#34d399', label: 'Scientific Reviewer',       sub: 'Evidence validation · Approval · Sign-off' },
                ].map((r, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 3, height: 32, flexShrink: 0, background: r.accent }} />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 13, color: '#e8eef8' }}>{r.label}</div>
                      <div style={{ color: '#4d6fa0', fontSize: 11.5 }}>{r.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ marginTop: 'auto', paddingTop: 32, borderTop: '1px solid rgba(232,238,248,0.12)' }}>
              <div style={{ font: '600 9.5px/1 Archivo', letterSpacing: '0.14em', color: '#4d6fa0', marginBottom: 10 }}>DEMO CREDENTIALS</div>
              {creds.map((c) => (
                <div key={c.role}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '7px 0', borderBottom: '1px solid rgba(232,238,248,0.1)', cursor: 'pointer' }}
                  onClick={() => this.setState({ loginEmail: c.email, loginPassword: c.password, loginError: '' })}
                >
                  <div style={{ fontSize: 12, color: '#8aaad4' }}>{c.email}</div>
                  <div style={{ fontSize: 11, color: '#4d6fa0', fontFamily: 'var(--mono)' }}>{c.password}</div>
                </div>
              ))}
              <div style={{ color: '#4d6fa0', fontSize: 11, marginTop: 8 }}>Click a row to auto-fill.</div>
            </div>
          </div>

          {/* right panel — login form */}
          <div style={S('flex:1;display:flex;align-items:center;justify-content:center;padding:40px;background:var(--bg)')}>
            <div style={S('width:100%;max-width:380px')}>
              <div style={S('font:700 9px/1 Archivo;letter-spacing:0.18em;color:var(--acc);margin-bottom:10px')}>SIGN IN</div>
              <h2 style={S('font-size:26px;font-weight:800;letter-spacing:-0.03em;margin:0 0 32px;color:var(--ink)')}>Welcome back</h2>

              <form onSubmit={this.login} style={S('display:flex;flex-direction:column;gap:16px')}>
                <div>
                  <label style={S(label)}>EMAIL ADDRESS</label>
                  <input
                    type="email"
                    autoComplete="email"
                    value={loginEmail}
                    onChange={(e) => this.setState({ loginEmail: e.target.value, loginError: '' })}
                    onKeyDown={(e) => e.key === 'Enter' && this.login(e)}
                    style={S(`${fieldCss};width:100%;color:var(--ink);outline:none;font-size:14px`)}
                    placeholder="you@medfactory.com"
                  />
                </div>
                <div>
                  <label style={S(label)}>PASSWORD</label>
                  <div style={S('position:relative')}>
                    <input
                      type={loginPwShow ? 'text' : 'password'}
                      autoComplete="current-password"
                      value={loginPassword}
                      onChange={(e) => this.setState({ loginPassword: e.target.value, loginError: '' })}
                      onKeyDown={(e) => e.key === 'Enter' && this.login(e)}
                      style={S(`${fieldCss};width:100%;color:var(--ink);outline:none;font-size:14px;padding-right:48px`)}
                      placeholder="••••••••••••"
                    />
                    <Box
                      css="position:absolute;right:0;top:0;bottom:0;padding:0 14px;display:flex;align-items:center;cursor:pointer;color:var(--faint);font-size:12px;user-select:none"
                      hover="color:var(--dim)"
                      onClick={() => this.setState((s) => ({ loginPwShow: !s.loginPwShow }))}
                    >{loginPwShow ? 'HIDE' : 'SHOW'}</Box>
                  </div>
                </div>

                {loginError && (
                  <div style={S('padding:11px 14px;background:rgba(30,64,175,0.08);border-left:3px solid var(--acc);color:var(--acc);font-size:13px')}>
                    {loginError}
                  </div>
                )}

                <Box
                  css="background:var(--acc);color:#fff;font-weight:700;padding:15px;text-align:center;cursor:pointer;font-size:14px;margin-top:4px"
                  hover="opacity:0.85"
                  onClick={this.login}
                >
                  Sign In →
                </Box>
              </form>

              <div style={S('margin-top:32px;padding-top:24px;border-top:1px solid var(--rule);color:var(--faint);font-size:12px;text-align:center')}>
                Your role and workspace are determined by your credentials.
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div
        ref={this.rootRef}
        style={S('font-family:Archivo,system-ui,sans-serif;background:var(--bg);color:var(--ink);height:100vh;min-width:1280px;display:flex;overflow:hidden;font-size:14px;line-height:1.45;-webkit-font-smoothing:antialiased')}
      >
        {/* ---------------- sidebar (role-aware) ---------------- */}
        <aside style={{ width: 232, flexShrink: 0, borderRight: 'none', display: 'flex', flexDirection: 'column', background: '#0d1f4e', '--ink': '#e8eef8', '--dim': '#8aaad4', '--faint': '#4d6fa0', '--rule': 'rgba(232,238,248,0.1)', '--rule2': 'rgba(232,238,248,0.18)', '--s1': 'rgba(255,255,255,0.06)', '--s2': 'rgba(255,255,255,0.1)', '--bg': '#0d1f4e', '--acc': '#60a5fa', '--ok': '#4ade80', '--warn': '#fbbf24' }}>
          <div style={S('padding:18px 20px 15px;border-bottom:1px solid rgba(232,238,248,0.12);display:flex;align-items:center;gap:9px')}>
            <div style={S(`width:16px;height:16px;background:${v.isCreator ? 'var(--acc)' : reviewerAccent}`)} />
            <div style={S('font-weight:800;letter-spacing:-0.02em;font-size:16px')}>MedFactory</div>
          </div>

          {/* role badge */}
          {!v.isCreator && (
            <div style={S(`padding:8px 20px;background:var(--s1);border-bottom:1px solid var(--rule);display:flex;align-items:center;gap:8px`)}>
              <div style={S(`width:6px;height:6px;border-radius:50%;background:${reviewerAccent}`)} />
              <div style={S(`font:700 9.5px/1 Archivo;letter-spacing:0.14em;color:${reviewerAccent}`)}>{reviewerLabel}</div>
            </div>
          )}

          {v.isCreator ? (
            <>
              <nav style={S('display:flex;flex-direction:column;padding:12px 0;border-bottom:1px solid var(--rule)')}>
                {v.nav.map((it, i) => (
                  <Box key={i} css={it.style} hover="background:var(--s2)" onClick={it.go}>
                    <span style={S(it.bar)} />
                    <span>{it.label}</span>
                    {v.unreadCount > 0 && i === 0 && (
                      <span style={S('margin-left:auto;background:var(--acc);color:#fff;font:700 9px/1 Archivo;padding:2px 6px')}>{v.unreadCount}</span>
                    )}
                    {i !== 0 && <span style={S(it.countStyle)}>{it.count}</span>}
                  </Box>
                ))}
              </nav>
              <div style={S('padding:14px 20px 8px;font:600 9px/1 Archivo;letter-spacing:0.14em;color:var(--faint)')}>SCREEN FLOW</div>
              <div style={S('flex:1;overflow-y:auto;padding-bottom:12px')}>
                {v.flow.map((s, i) => (
                  <Box key={i} css={s.style} hover="color:var(--ink)" onClick={s.go}>
                    <span style={S(s.num)}>{s.i}</span>
                    <span>{s.label}</span>
                  </Box>
                ))}
              </div>
            </>
          ) : (
            <>
              <nav style={S('display:flex;flex-direction:column;padding:12px 0;flex:1')}>
                {reviewerSidebarItems.map(([lbl, scr], i) => (
                  <Box key={i} css={`display:flex;align-items:center;gap:10px;padding:10px 20px;cursor:pointer;font-size:13px;color:${S_ === scr && i === 0 ? 'var(--ink)' : 'var(--dim)'};font-weight:${S_ === scr && i === 0 ? 700 : 400}`} hover="color:var(--ink)" onClick={() => this.go(scr)}>
                    <span style={S(`width:2px;height:14px;background:${S_ === scr && i === 0 ? reviewerAccent : 'transparent'}`)} />
                    {lbl}
                    {i === 0 && v.unreadCount > 0 && <span style={S(`margin-left:auto;background:${reviewerAccent};color:${v.isMA ? '#000' : '#fff'};font:700 9px/1 Archivo;padding:2px 6px`)}>{v.unreadCount}</span>}
                  </Box>
                ))}
              </nav>
            </>
          )}

          <Box
            css="display:flex;align-items:center;justify-content:space-between;padding:12px 20px;border-top:1px solid var(--rule);cursor:pointer;color:var(--dim);font-size:12px"
            hover="color:var(--ink)"
            onClick={v.toggleDir}
          >
            <span>Direction</span>
            <span style={S('font-weight:700;color:var(--acc)')}>{v.dirLabel}</span>
          </Box>

          <div style={S('display:flex;align-items:center;gap:10px;padding:12px 20px;border-top:1px solid var(--rule)')}>
            <div style={S(`width:28px;height:28px;background:var(--s2);border:1px solid var(--rule);border-bottom:2px solid ${v.isCreator ? 'var(--acc)' : reviewerAccent};display:grid;place-items:center;font-weight:700;font-size:11px`)}>{v.isCreator ? 'MG' : reviewerInitials}</div>
            <div style={S('min-width:0')}>
              <div style={S('font-weight:600;font-size:12px')}>{v.isCreator ? 'Mayank Gupta' : reviewerName}</div>
              <div style={S('color:var(--faint);font-size:10.5px')}>{v.isCreator ? 'Medical Affairs Lead' : reviewerRole}</div>
            </div>
          </div>

          <Box
            css="display:flex;align-items:center;gap:8px;padding:11px 20px;border-top:2px solid var(--rule2);cursor:pointer;color:var(--faint);font-size:12px"
            hover="color:var(--ink)"
            onClick={v.switchRole}
          >
            <span style={S('font-size:10px')}>⇄</span> Switch Role
          </Box>
        </aside>

        {/* ---------------- main ---------------- */}
        <main style={S('flex:1;min-width:0;overflow-y:auto;position:relative;background:var(--bg)')}>

          {/* ============ 1 · DASHBOARD ============ */}
          {v.isDash && (
            <div style={S('display:flex;min-height:100%')}>
              <div style={S('flex:1;min-width:0')}>
                {/* rejection alert for creator */}
                {(v.pptStatus === 'ma-rejected' || v.pptStatus === 'sci-rejected') && (
                  <div style={S(`padding:14px 28px;background:rgba(146,64,14,0.08);border-bottom:2px solid ${v.pptStatus === 'sci-rejected' ? 'var(--ok)' : 'var(--warn)'};display:flex;align-items:center;gap:16px`)}>
                    <div style={S(`font-size:20px`)}>⚠</div>
                    <div style={S('flex:1')}>
                      <div style={S(`font-weight:700;color:${v.pptStatus === 'sci-rejected' ? 'var(--ok)' : 'var(--warn)'}`)}>{v.topic} — sent back by {v.pptStatus === 'sci-rejected' ? 'Scientific Reviewer' : 'Medical Affairs'}</div>
                      <div style={S('color:var(--dim);font-size:12.5px;margin-top:2px')}>{v.maTotalComments + v.sciTotalComments} comment{(v.maTotalComments + v.sciTotalComments) !== 1 ? 's' : ''} need addressing before re-submission.</div>
                    </div>
                    <Box css={`background:${v.pptStatus === 'sci-rejected' ? 'var(--ok)' : 'var(--warn)'};color:${v.pptStatus === 'sci-rejected' ? '#fff' : '#000'};font-weight:700;padding:10px 18px;cursor:pointer;font-size:13px`} hover="opacity:0.85" onClick={() => this.go('dash')}>Back to Dashboard →</Box>
                  </div>
                )}
                <div style={S('padding:34px 40px 28px;border-bottom:2px solid var(--rule2);display:flex;align-items:flex-end;justify-content:space-between;gap:32px')}>
                  <div>
                    <div style={merge(kicker, 'margin-bottom:14px')}>TUESDAY · 2 SEPTEMBER 2026</div>
                    <h1 style={S('font-size:34px;font-weight:800;letter-spacing:-0.03em;margin:0 0 8px')}>Good morning, Mayank</h1>
                    <div style={S('color:var(--dim);max-width:52ch')}>
                      Two decks need your sign-off before they move to Munal. September&apos;s topic queue is ready for approval.
                    </div>
                  </div>
                  <Box
                    css="flex:none;background:var(--acc);color:#fff;font-weight:700;padding:14px 20px;cursor:pointer;display:flex;align-items:center;gap:28px;min-width:250px"
                    hover="opacity:0.85"
                    onClick={v.goIntake}
                  >
                    <span>Generate New Deck</span>
                    <span style={S('margin-left:auto;font-size:16px')}>→</span>
                  </Box>
                </div>

                <div style={S('display:grid;grid-template-columns:repeat(3,1fr);border-bottom:2px solid var(--rule2)')}>
                  {v.stats.map((k, i) => (
                    <div key={i} style={S(k.style)}>
                      <div style={S('font:600 10px/1 Archivo;letter-spacing:0.14em;color:var(--faint);margin-bottom:18px')}>{k.label}</div>
                      <div style={S('display:flex;align-items:baseline;gap:10px')}>
                        <div style={S(k.numStyle)}>{k.value}</div>
                        <div style={S('color:var(--dim);font-size:12px')}>{k.delta}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={S('padding:26px 40px 10px;display:flex;align-items:baseline;gap:16px')}>
                  <h2 style={S('font-size:13px;font-weight:700;letter-spacing:0.1em;margin:0')}>RECENT DECKS</h2>
                  <span style={S('color:var(--faint);font-size:12px')}>6 of 24</span>
                </div>

                <div style={S('padding:0 40px 40px')}>
                  <div style={S('display:grid;grid-template-columns:1fr 150px 132px 76px 40px;gap:0 20px;padding:0 0 10px;border-bottom:2px solid var(--rule2);font:600 9.5px/1 Archivo;letter-spacing:0.13em;color:var(--faint)')}>
                    <div>TOPIC</div><div>THERAPEUTIC AREA</div><div>STATUS</div><div>CREATED</div><div />
                  </div>
                  {v.decks.map((d, i) => (
                    <Box
                      key={i}
                      css="display:grid;grid-template-columns:1fr 150px 132px 76px 40px;gap:0 20px;align-items:center;padding:15px 0 13px;border-bottom:1px solid var(--rule);cursor:pointer"
                      hover="background:var(--s1)"
                      onClick={d.go}
                    >
                      <div style={S('min-width:0;padding-right:20px')}>
                        <div style={S('display:flex;gap:3px;margin-bottom:9px')}>
                          {d.ticks.map((t, j) => <div key={j} style={S(t.style)} />)}
                        </div>
                        <div style={S('font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap')}>{d.topic}</div>
                      </div>
                      <div style={S('color:var(--dim);font-size:12.5px')}>{d.area}</div>
                      <div><span style={S(d.pill)}>{d.status}</span></div>
                      <div style={S('color:var(--faint);font-size:12px')}>{d.created}</div>
                      <div style={S('color:var(--faint);text-align:right')}>→</div>
                    </Box>
                  ))}
                </div>
              </div>

              {/* topic queue rail */}
              <div style={S('width:322px;flex:none;border-left:2px solid var(--rule2);background:var(--s1)')}>
                <div style={S('padding:20px;border-bottom:2px solid var(--rule2)')}>
                  <div style={S('font:600 10px/1 Archivo;letter-spacing:0.14em;color:var(--faint);margin-bottom:4px')}>TOPIC QUEUE · SEPTEMBER</div>
                  <div style={S('font-size:12px;color:var(--dim)')}>Auto-proposed from congress &amp; publication watchlists. Approve to queue generation.</div>
                </div>
                {v.queue.map((q, i) => (
                  <div key={i} style={S('padding:16px 20px;border-bottom:1px solid var(--rule)')}>
                    <div style={S('display:flex;justify-content:space-between;gap:10px;align-items:baseline;margin-bottom:6px')}>
                      <div style={S('font-weight:600;font-size:13px')}>{q.topic}</div>
                      <div style={S('font:700 11px/1 var(--mono);color:var(--acc);flex:none')}>{q.score}</div>
                    </div>
                    <div style={S('color:var(--faint);font-size:11.5px;margin-bottom:11px')}>{q.why}</div>
                    <div style={S('display:flex;gap:8px')}>
                      <Box css={q.btn} hover="background:var(--acc);color:#fff;border-color:var(--acc)" onClick={q.approve}>{q.btnLabel}</Box>
                      <Box css="border:1px solid var(--rule);padding:5px 11px;font-size:11.5px;color:var(--dim);cursor:pointer" hover="color:var(--ink)">Skip</Box>
                    </div>
                  </div>
                ))}
                <div style={S('padding:20px;border-bottom:2px solid var(--rule2);border-top:1px solid var(--rule)')}>
                  <div style={S('font:600 10px/1 Archivo;letter-spacing:0.14em;color:var(--acc)')}>NEEDS ATTENTION</div>
                </div>
                {v.attention.map((a, i) => (
                  <Box key={i} css="padding:15px 20px;border-bottom:1px solid var(--rule);cursor:pointer;display:flex;gap:12px" hover="background:var(--s2)" onClick={a.go}>
                    <div style={S(a.mark)} />
                    <div style={S('min-width:0')}>
                      <div style={S('font-weight:600;font-size:12.5px;margin-bottom:3px')}>{a.topic}</div>
                      <div style={S('color:var(--dim);font-size:11.5px')}>{a.note}</div>
                      <div style={S('color:var(--faint);font-size:11px;margin-top:5px')}>{a.meta}</div>
                    </div>
                  </Box>
                ))}
              </div>
            </div>
          )}

          {/* ============ 2 · INTAKE ============ */}
          {v.isIntake && (
            <div style={S('max-width:760px;margin:0 auto;padding:44px 40px 60px')}>
              <div style={merge(kicker, 'margin-bottom:12px')}>NEW DECK · INTAKE</div>
              <h1 style={S('font-size:28px;font-weight:800;letter-spacing:-0.025em;margin:0 0 6px')}>Define the brief</h1>
              <div style={S('color:var(--dim);margin-bottom:8px')}>
                The agent layer researches, drafts and validates from these constraints. Everything here is auditable downstream.
              </div>
              {v.fromQueue && (
                <div style={S('display:inline-flex;align-items:center;gap:8px;border:1px solid var(--acc);color:var(--acc);padding:5px 10px;font-size:11.5px;margin-bottom:26px')}>
                  Pulled from September topic queue
                </div>
              )}

              <div style={S('border-top:2px solid var(--rule2);margin-top:22px')}>
                <div style={S('display:grid;grid-template-columns:1fr 1fr;gap:0 28px;padding:24px 0;border-bottom:1px solid var(--rule)')}>
                  <div>
                    <label style={S(label)}>TOPIC OF THE MONTH</label>
                    <input
                      value={v.topic}
                      onChange={v.onTopic}
                      placeholder="e.g. Type 2 Diabetes — GLP-1 RA"
                      style={S('width:100%;background:var(--s1);border:1px solid var(--rule);border-left:2px solid var(--acc);padding:13px 14px;font-size:15px;font-weight:600;letter-spacing:-0.01em')}
                    />
                  </div>
                  <div>
                    <label style={S(label)}>HERO PRODUCT</label>
                    <input
                      value={v.heroProduct}
                      onChange={v.onHeroProduct}
                      placeholder="e.g. Ozempic (Semaglutide)"
                      style={S('width:100%;background:var(--s1);border:1px solid var(--rule);border-left:2px solid var(--warn);padding:13px 14px;font-size:15px;font-weight:600;letter-spacing:-0.01em')}
                    />
                    <div style={S('color:var(--faint);font-size:11px;margin-top:6px')}>The primary product this webinar supports</div>
                  </div>
                </div>


                <div style={S('padding:24px 0;border-bottom:1px solid var(--rule)')}>
                  <label style={S(label)}>TARGET AUDIENCE</label>
                  <div style={S('display:flex;gap:0;border:1px solid var(--rule);overflow:hidden;max-width:360px')}>
                    {v.audiences.map((a) => (
                      <div key={a.label} style={S(a.style)} onClick={a.pick}>
                        {a.label}
                        {a.locked && <span style={S('display:block;font:600 8px/1 Archivo;letter-spacing:0.1em;color:var(--faint);margin-top:3px')}>SOON</span>}
                      </div>
                    ))}
                  </div>
                </div>

                <div style={S('display:flex;align-items:center;gap:28px;padding:26px 0;border-bottom:2px solid var(--rule2)')}>
                  <div>
                    <div style={S('font:600 9.5px/1 Archivo;letter-spacing:0.13em;color:var(--faint);margin-bottom:7px')}>ESTIMATE</div>
                    <div style={S('font-size:15px')}>
                      <span style={S('font-weight:700')}>~{v.estSlides} slides</span>
                      <span style={S('color:var(--faint)')}> · </span>
                      <span style={S('color:var(--dim)')}>~{v.estMin} min generation</span>
                      <span style={S('color:var(--faint)')}> · </span>
                      <span style={S('color:var(--dim)')}>{v.estRefs} refs projected</span>
                    </div>
                  </div>
                </div>

                <Box
                  css="background:var(--acc);color:#fff;font-weight:700;font-size:15px;padding:17px 20px;margin-top:22px;cursor:pointer;display:flex;align-items:center"
                  hover="opacity:0.85"
                  onClick={v.startGen}
                >
                  <div>
                    <div>Run Research</div>
                    <div style={S('font:400 11.5px/1 Archivo;opacity:0.75;margin-top:4px')}>Next: deep-brief the agent with clinical context</div>
                  </div>
                  <span style={S('margin-left:auto;font-size:18px')}>→</span>
                </Box>
              </div>
            </div>
          )}

          {/* ============ 2.4 · RUN RESEARCH ============ */}
          {v.isResearch && (() => {
            const rN = v.researchN;
            const DB_PHASE = RESEARCH_DBS.length;           // 6
            const PAPER_START = DB_PHASE;                    // papers visible from step 6+
            const DEDUP_STEP = DB_PHASE + RESEARCH_PAPERS.length;       // 18
            const INDEX_STEP = DEDUP_STEP + 1;              // 19
            const DONE_STEP  = INDEX_STEP + 1;              // 20
            const isDone = rN >= DONE_STEP;
            const visiblePapers = Math.max(0, Math.min(RESEARCH_PAPERS.length, rN - PAPER_START));
            const pct = Math.round((Math.min(rN, DONE_STEP) / DONE_STEP) * 100);

            const typeColor = (t) => t === 'RCT' ? 'var(--ok)' : t === 'Guideline' ? 'var(--dim)' : t === 'Meta-Analysis' ? 'var(--warn)' : t === 'Systematic Review' ? '#a78bfa' : 'var(--faint)';

            const threads = v.projectThreads;
            const activeThread = threads.find((t) => t.id === v.activeThreadId) || threads[0];

            const THINKING_MSGS = [
              'Connecting to research databases…',
              'Scanning PubMed for clinical evidence…',
              'Searching EMBASE for trial data…',
              'Retrieving ADA / EASD guideline updates…',
              'Cross-referencing NICE / SIGN recommendations…',
              'Analysing Cochrane systematic reviews…',
              'Evaluating IDF prevalence data…',
              'Extracting evidence from retrieved papers…',
              'Scoring paper relevance to your topic…',
              'Cross-checking cardiovascular outcome data…',
              'Mapping evidence to hero product claims…',
              'Validating citation integrity across sources…',
              'Deduplicating results across databases…',
              'Building grounded evidence index…',
            ];
            const thinkingMsg = THINKING_MSGS[Math.min(rN, THINKING_MSGS.length - 1)];

            const renderMarkdown = (text) => {
              const parts = text.split(/(\*\*[^*]+\*\*)/g);
              return parts.map((p, i) =>
                p.startsWith('**') && p.endsWith('**')
                  ? <strong key={i}>{p.slice(2, -2)}</strong>
                  : <span key={i}>{p}</span>
              );
            };

            return (
              <div style={S('display:flex;height:100%;overflow:hidden')}>

                {/* ============ LEFT: Brand Intelligence Chat ============ */}
                <div style={S('width:48%;flex:none;border-right:2px solid var(--rule2);display:flex;flex-direction:column;overflow:hidden;position:relative')}>

                  {/* Running Research banner */}
                  <div style={S(`display:flex;align-items:center;gap:10px;padding:11px 20px;border-bottom:1px solid var(--rule);flex:none;background:${isDone ? 'rgba(22,101,52,0.08)' : 'rgba(30,64,175,0.06)'}`)}>
                    <div style={S(`width:8px;height:8px;border-radius:50%;flex:none;background:${isDone ? 'var(--ok)' : 'var(--acc)'};${isDone ? '' : 'animation:puls 1s infinite'}`)}>
                    </div>
                    <div style={S(`font:700 10px/1 Archivo;letter-spacing:0.14em;color:${isDone ? 'var(--ok)' : 'var(--acc)'}`)}>
                      {isDone ? 'RESEARCH COMPLETE — BRIEF YOUR AGENT BELOW' : 'RUNNING RESEARCH…'}
                    </div>
                    {!isDone && (
                      <div style={S('margin-left:auto;font:600 10px/1 var(--mono);color:var(--faint)')}>{pct}%</div>
                    )}
                  </div>

                  {/* Thread header */}
                  {activeThread && (
                    <div style={S('padding:14px 20px;border-bottom:1px solid var(--rule);flex:none')}>
                      <div style={S('font:600 9.5px/1 Archivo;letter-spacing:0.14em;color:var(--faint);margin-bottom:4px')}>BRAND INTELLIGENCE AGENT</div>
                      <div style={S('font-weight:700;font-size:14px;letter-spacing:-0.01em')}>{activeThread.name}</div>
                    </div>
                  )}

                  {/* Messages */}
                  <div style={S('flex:1;overflow-y:auto;padding:20px')}>
                    {activeThread && activeThread.messages.map((m, i) => (
                      <div key={i} style={S(`display:flex;gap:10px;margin-bottom:20px;flex-direction:${m.from === 'user' ? 'row-reverse' : 'row'}`)}>
                        <div style={S(`width:28px;height:28px;flex:none;display:grid;place-items:center;font:700 10px/1 Archivo;${m.from === 'agent' ? 'background:var(--acc);color:#fff' : 'background:var(--s2);border:1px solid var(--rule2);color:var(--dim)'}`)}>
                          {m.from === 'agent' ? 'AI' : 'ME'}
                        </div>
                        <div style={S(`max-width:80%;${m.from === 'user' ? 'text-align:right' : ''}`)}>
                          <div style={S(`background:${m.from === 'agent' ? 'var(--s1)' : 'var(--s2)'};border:1px solid ${m.from === 'agent' ? 'var(--rule)' : 'var(--rule2)'};padding:12px 14px;font-size:13px;line-height:1.65;${m.from === 'agent' ? 'border-left:2px solid var(--acc)' : ''}`)}>
                            {m.text.split('\n\n').map((para, pi) => (
                              <p key={pi} style={S('margin:0 0 8px')}>{renderMarkdown(para)}</p>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Thinking indicator — visible while research is running */}
                    {!isDone && (
                      <div style={S('display:flex;gap:10px;margin-bottom:20px;animation:rise 0.3s ease')}>
                        <div style={S('width:28px;height:28px;flex:none;display:grid;place-items:center;font:700 10px/1 Archivo;background:var(--acc);color:#fff')}>AI</div>
                        <div style={S('max-width:85%')}>
                          <div style={S('font:600 9.5px/1 Archivo;letter-spacing:0.12em;color:var(--acc);margin-bottom:7px')}>RESEARCH AGENT · ACTIVE</div>
                          <div style={S('background:var(--s1);border:1px solid var(--rule);border-left:2px solid var(--acc);padding:13px 15px')}>
                            <div style={S('font-size:12px;color:var(--dim);margin-bottom:11px;line-height:1.5')} key={thinkingMsg}>
                              {thinkingMsg}
                            </div>
                            <div style={S('display:flex;gap:5px;align-items:center')}>
                              {[0, 1, 2].map((d) => (
                                <div key={d} style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--acc)', animation: 'dotBounce 1.3s ease-in-out infinite', animationDelay: `${d * 0.18}s` }} />
                              ))}
                              <span style={S('font:600 10px/1 Archivo;letter-spacing:0.1em;color:var(--faint);margin-left:8px')}>RESEARCHING</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Done confirmation bubble */}
                    {isDone && (
                      <div style={S('display:flex;gap:10px;margin-bottom:20px;animation:rise 0.3s ease')}>
                        <div style={S('width:28px;height:28px;flex:none;display:grid;place-items:center;font:700 10px/1 Archivo;background:var(--ok);color:#fff')}>AI</div>
                        <div style={S('max-width:85%')}>
                          <div style={S('font:600 9.5px/1 Archivo;letter-spacing:0.12em;color:var(--ok);margin-bottom:7px')}>RESEARCH AGENT · COMPLETE</div>
                          <div style={S('background:var(--s1);border:1px solid var(--rule);border-left:2px solid var(--ok);padding:13px 15px;font-size:12.5px;line-height:1.6;color:var(--dim)')}>
                            Research complete — <strong style={S('color:var(--ink)')}>12 papers retrieved</strong> across 6 databases. Evidence is indexed and ready for content generation.<br /><br />
                            While you wait, share any clinical context below — it will sharpen the topic options on the next screen.
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ===== ACCEPTED PAPERS STACK WIDGET ===== */}
                    {isDone && (() => {
                      const acceptedCount = Object.values(v.acceptedPapers).filter(Boolean).length;
                      const acceptedList = RESEARCH_PAPERS.filter((_, idx) => v.acceptedPapers[idx]);
                      if (acceptedCount === 0) return null;
                      const preview = acceptedList.slice(0, 3);
                      return (
                        <div style={S('margin-bottom:20px;animation:rise 0.28s ease')}>
                          <div style={S('font:600 9.5px/1 Archivo;letter-spacing:0.12em;color:var(--ok);margin-bottom:8px;padding-left:38px')}>EVIDENCE BASE · {acceptedCount} {acceptedCount === 1 ? 'PAPER' : 'PAPERS'} ACCEPTED</div>
                          {/* Stack */}
                          <div style={S('display:flex;gap:10px;align-items:flex-start')}>
                            <div style={S('width:28px;height:28px;flex:none;display:grid;place-items:center;font:700 10px/1 Archivo;background:var(--ok);color:#fff')}>AI</div>
                            <Box
                              css="position:relative;cursor:pointer;padding-bottom:12px"
                              onClick={v.toggleAcceptedPopup}
                            >
                              {/* Stacked shadow cards */}
                              {preview.slice().reverse().map((_, si) => {
                                const offset = (preview.length - 1 - si) * 5;
                                return (
                                  <div key={si} style={{ position: si === 0 ? 'absolute' : 'absolute', top: offset, left: offset, right: -offset, height: 56, background: 'var(--s2)', border: '1px solid var(--rule2)', borderLeft: '2px solid var(--ok)', opacity: 0.45 + si * 0.18, zIndex: si }} />
                                );
                              })}
                              {/* Top card */}
                              <div style={{ position: 'relative', zIndex: preview.length, background: 'var(--s1)', border: '1px solid var(--rule)', borderLeft: '2px solid var(--ok)', padding: '10px 14px', minWidth: 260, marginTop: (preview.length - 1) * 5, marginLeft: (preview.length - 1) * 5 }}>
                                <div style={S('font:700 11.5px/1.4 Archivo;color:var(--ink);margin-bottom:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:240px')}>{acceptedList[acceptedCount - 1].title}</div>
                                <div style={S('font:500 10px/1 Archivo;color:var(--faint)')}>{acceptedList[acceptedCount - 1].journal.split('·')[0].trim()} · {acceptedList[acceptedCount - 1].year}</div>
                              </div>
                              {/* Count badge */}
                              <div style={{ position: 'absolute', top: -8, right: -8, zIndex: preview.length + 1, background: 'var(--ok)', color: '#fff', font: '700 10px/1 Archivo', padding: '3px 7px', borderRadius: 2 }}>
                                {acceptedCount}
                              </div>
                              {/* Click hint */}
                              <div style={S('margin-top:8px;font:600 10px/1 Archivo;color:var(--ok);letter-spacing:0.06em')}>
                                Click to view all accepted papers ↗
                              </div>
                            </Box>
                          </div>

                          {/* POPUP */}
                          {v.acceptedPopupOpen && (
                            <div style={{ position: 'absolute', inset: 0, zIndex: 50, background: 'rgba(20,19,18,0.72)', display: 'flex', alignItems: 'flex-end', justifyContent: 'stretch', animation: 'rise 0.2s ease' }}
                              onClick={(e) => { if (e.target === e.currentTarget) v.toggleAcceptedPopup(); }}>
                              <div style={{ width: '100%', background: 'var(--s1)', border: '1px solid var(--rule2)', borderBottom: 'none', maxHeight: '70%', display: 'flex', flexDirection: 'column' }}>
                                {/* Popup header */}
                                <div style={S('padding:14px 18px;border-bottom:1px solid var(--rule2);display:flex;align-items:center;gap:10px;flex:none')}>
                                  <span style={S('width:8px;height:8px;border-radius:50%;background:var(--ok);flex:none')} />
                                  <span style={S('font:700 12px/1 Archivo;letter-spacing:-0.01em')}>Accepted Evidence</span>
                                  <span style={S('padding:2px 8px;background:var(--ok);color:#fff;font:700 10px/1 Archivo;margin-left:2px')}>{acceptedCount}</span>
                                  <Box css="margin-left:auto;font:600 11px/1 Archivo;color:var(--faint);cursor:pointer;padding:4px 8px" hover="color:var(--ink)" onClick={v.toggleAcceptedPopup}>✕ Close</Box>
                                </div>
                                {/* Popup list */}
                                <div style={S('overflow-y:auto;flex:1')}>
                                  {acceptedList.map((p, idx) => (
                                    <div key={idx} style={S('padding:12px 18px;border-bottom:1px solid var(--rule);display:flex;flex-direction:column;gap:5px;animation:rise 0.18s ease')}>
                                      <div style={S('display:flex;align-items:flex-start;gap:8px')}>
                                        <span style={S('width:6px;height:6px;border-radius:50%;background:var(--ok);flex:none;margin-top:5px')} />
                                        <div style={S('font:700 12px/1.4 Archivo;color:var(--ink)')}>{p.title}</div>
                                      </div>
                                      <div style={S('padding-left:14px;font:500 10.5px/1 Archivo;color:var(--faint)')}>{p.journal.split('·')[0].trim()} · {p.year} · {p.grade}</div>
                                      <div style={S('padding-left:14px;display:flex;gap:6px;flex-wrap:wrap')}>
                                        {p.artifacts.map((a) => <span key={a} style={S('padding:2px 7px;border:1px solid var(--rule2);font:600 9px/1 Archivo;color:var(--faint)')}>{a}</span>)}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })()}
                  </div>

                  {/* Input */}
                  <div style={S('padding:14px 20px;border-top:1px solid var(--rule);flex:none')}>
                    <div style={S('display:flex;gap:8px;align-items:flex-end')}>
                      <textarea
                        rows={3}
                        style={S('flex:1;background:var(--s1);border:1px solid var(--rule2);color:var(--ink);padding:11px 12px;font-size:13px;resize:none;line-height:1.5;outline:none')}
                        placeholder={`Add context about "${activeThread?.name || 'this topic'}"…`}
                        value={v.projectInput}
                        onChange={v.onProjectInput}
                        onKeyDown={v.onProjectKey}
                      />
                      <Box
                        css="background:var(--acc);color:#fff;font-weight:700;padding:12px 16px;cursor:pointer;font-size:12px;flex:none;align-self:stretch;display:flex;align-items:center"
                        hover="opacity:0.85"
                        onClick={v.sendIntelMessage}
                      >Send</Box>
                    </div>
                  </div>
                </div>

                {/* ============ RIGHT: Research Panel ============ */}
                <div style={{ ...S('flex:1;min-width:0;display:flex;flex-direction:column;overflow:hidden;background:var(--s1)'), animation: 'slideInRight 0.55s cubic-bezier(0.22,1,0.36,1) both', animationDelay: '0.08s' }}>

                  {isDone ? (
                    /* ===== DONE STATE: Card Grid View ===== */
                    <div style={S('display:flex;flex-direction:column;height:100%;overflow:hidden;animation:rise 0.4s ease')}>

                      {/* Header bar */}
                      <div style={S('padding:13px 18px;border-bottom:1px solid var(--rule2);display:flex;align-items:center;gap:10px;flex:none;background:var(--bg)')}>
                        <span style={S('width:8px;height:8px;border-radius:50%;background:var(--ok);flex:none')} />
                        <div style={S('font:700 12px/1 Archivo;letter-spacing:-0.01em')}>Research Papers</div>
                        <span style={S('font:600 10px/1 var(--mono);color:var(--faint)')}>{RESEARCH_PAPERS.length} sources</span>
                        {/* Sources toggle */}
                        <Box
                          css="margin-left:auto;display:inline-flex;align-items:center;gap:6px;padding:5px 11px;border:1px solid var(--rule2);cursor:pointer;font:600 10.5px/1 Archivo;color:var(--dim)"
                          hover="border-color:var(--ink);color:var(--ink)"
                          onClick={v.toggleResearchSources}
                        >
                          <span style={S('font-size:11px')}>◎</span> Sources {v.researchSourcesOpen ? '▲' : '▼'}
                        </Box>
                      </div>

                      {/* Sources — Evidence Retrieved drawer */}
                      {v.researchSourcesOpen && (() => {
                        const dbColor = { PubMed: '#1e40af', EMBASE: '#7c3aed', 'ADA Guidelines': '#166534', 'ADA/KDIGO': '#0891b2', NICE: '#9a3412', 'IDF Atlas': '#b45309' };
                        const typeColor2 = { RCT: '#1e40af', 'Systematic Review': '#7c3aed', Guideline: '#166534', 'Meta-Analysis': '#0891b2', 'Real-World': '#b45309', Registry: '#9a3412' };
                        return (
                          <div style={{ borderBottom: '1px solid var(--rule2)', background: '#f4f7fb', animation: 'rise 0.22s ease', flexShrink: 0, maxHeight: 480, overflowY: 'auto' }}>

                            {/* Compact DB stats bar */}
                            <div style={{ padding: '10px 20px', background: '#fff', borderBottom: '1px solid rgba(13,31,78,0.08)', display: 'flex', alignItems: 'center', gap: 20 }}>
                              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', flex: 1 }}>
                                {RESEARCH_DBS.map((db) => (
                                  <span key={db} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 8px', border: '1px solid rgba(22,101,52,0.3)', background: 'rgba(22,101,52,0.06)', font: '600 10.5px/1 Archivo', color: '#166534', borderRadius: 3 }}>
                                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#166534', flexShrink: 0 }} />{db}
                                  </span>
                                ))}
                              </div>
                              <div style={{ display: 'flex', gap: 18, flexShrink: 0 }}>
                                {[['71', 'raw'], ['12', 'retained'], ['58', 'chunks']].map(([n, l]) => (
                                  <div key={l} style={{ textAlign: 'center' }}>
                                    <div style={{ font: '800 15px/1 Archivo', color: '#166534' }}>{n}</div>
                                    <div style={{ font: '600 9px/1 Archivo', color: '#4a6896', marginTop: 2, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{l}</div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Evidence Retrieved list */}
                            <div style={{ padding: '14px 18px' }}>
                              <div style={{ font: '700 10px/1 Archivo', letterSpacing: '0.14em', color: '#4a6896', marginBottom: 12, textTransform: 'uppercase' }}>
                                Evidence Retrieved &middot; {RESEARCH_PAPERS.length}
                              </div>

                              {RESEARCH_PAPERS.map((p, i) => {
                                const isExp = !!v.researchSrcExpanded[i];
                                const tc = typeColor2[p.type] || '#1e40af';
                                const dc = dbColor[p.db] || '#1e3460';
                                return (
                                  <div
                                    key={i}
                                    onClick={() => v.toggleSrcExpanded(i)}
                                    style={{ background: '#fff', border: '1px solid rgba(13,31,78,0.1)', borderLeft: `3px solid ${tc}`, marginBottom: 8, cursor: 'pointer', transition: 'box-shadow 0.15s', boxShadow: isExp ? '0 2px 12px rgba(13,31,78,0.1)' : 'none', borderRadius: '0 4px 4px 0' }}>

                                    {/* Main row */}
                                    <div style={{ padding: '11px 14px', display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                                      <div style={{ flex: 1, minWidth: 0 }}>
                                        {/* Pills row */}
                                        <div style={{ display: 'flex', gap: 6, marginBottom: 7, flexWrap: 'wrap' }}>
                                          <span style={{ padding: '2px 8px', border: `1px solid ${tc}`, font: '700 9.5px/1.5 Archivo', color: tc, letterSpacing: '0.04em', borderRadius: 3, textTransform: 'uppercase' }}>{p.type}</span>
                                          <span style={{ padding: '2px 8px', background: `${dc}14`, font: '600 9.5px/1.5 Archivo', color: dc, borderRadius: 3 }}>{p.db} {p.year}</span>
                                        </div>
                                        {/* Title */}
                                        <div style={{ font: '700 14px/1.4 Archivo', color: '#0d1f4e', marginBottom: 4 }}>{p.title}</div>
                                        {/* Journal */}
                                        <div style={{ font: '400 12px/1.3 Archivo', color: '#4a6896' }}>{p.journal}</div>
                                      </div>
                                      {/* Score */}
                                      <div style={{ flexShrink: 0, textAlign: 'right' }}>
                                        <div style={{ font: '800 17px/1 Archivo', color: '#0d1f4e', letterSpacing: '-0.02em' }}>{p.score.toFixed(2)}</div>
                                        <div style={{ font: '700 8.5px/1 Archivo', color: '#4a6896', letterSpacing: '0.1em', marginTop: 2 }}>REL</div>
                                      </div>
                                    </div>

                                    {/* Expanded detail */}
                                    {isExp && (
                                      <div style={{ borderTop: '1px solid rgba(13,31,78,0.08)', padding: '12px 14px', background: '#f8fafc', animation: 'fadeUp 0.16s ease' }}
                                        onClick={e => e.stopPropagation()}>
                                        {/* Stats row */}
                                        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 12 }}>
                                          {[['Design', p.designTier], ['GRADE', p.grade], ['Sample', p.statRigor], ['Citations', p.citations]].map(([label, val]) => (
                                            <div key={label}>
                                              <div style={{ font: '700 9px/1 Archivo', letterSpacing: '0.1em', color: '#4a6896', textTransform: 'uppercase', marginBottom: 3 }}>{label}</div>
                                              <div style={{ font: '500 12px/1.4 Archivo', color: '#1e3460' }}>{val}</div>
                                            </div>
                                          ))}
                                        </div>
                                        {/* Excerpt */}
                                        {p.excerpt && (
                                          <div style={{ background: '#fff', border: '1px solid rgba(13,31,78,0.1)', borderLeft: '3px solid ' + tc, padding: '10px 14px' }}>
                                            <div style={{ font: '700 9px/1 Archivo', letterSpacing: '0.1em', color: '#4a6896', textTransform: 'uppercase', marginBottom: 7 }}>Key Excerpt</div>
                                            <p style={{ margin: 0, font: '400 13px/1.7 Georgia, serif', color: '#0d1f4e', fontStyle: 'italic' }}>{p.excerpt}</p>
                                            <div style={{ font: '600 10.5px/1 Archivo', color: '#4a6896', marginTop: 8 }}>{p.excerptSrc}</div>
                                          </div>
                                        )}
                                        {p.flag && (
                                          <div style={{ marginTop: 10, padding: '8px 12px', background: 'rgba(146,64,14,0.06)', border: '1px solid rgba(146,64,14,0.25)', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                                            <span style={{ font: '700 10px/1 Archivo', color: '#92400e', flexShrink: 0, marginTop: 1 }}>⚠ FLAG</span>
                                            <span style={{ font: '400 12px/1.6 Archivo', color: '#92400e' }}>{p.flag}</span>
                                          </div>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })()}

                      {/* Filter chips */}
                      <div style={S('padding:10px 18px;border-bottom:1px solid var(--rule);display:flex;align-items:center;gap:6px;flex:none;flex-wrap:wrap;background:var(--bg)')}>
                        {['All', 'RCT', 'Guideline', 'Meta-Analysis', 'Systematic Review', 'Real-World', 'Registry'].map((f) => (
                          <Box
                            key={f}
                            css={`padding:4px 10px;font:600 10px/1 Archivo;letter-spacing:0.08em;cursor:pointer;border:1px solid ${v.researchFilter === f ? 'var(--acc)' : 'var(--rule)'};background:${v.researchFilter === f ? 'rgba(30,64,175,0.1)' : 'transparent'};color:${v.researchFilter === f ? 'var(--acc)' : 'var(--faint)'}`}
                            hover={v.researchFilter !== f ? 'border-color:var(--rule2);color:var(--dim)' : ''}
                            onClick={() => v.setResearchFilter(f)}
                          >{f}</Box>
                        ))}
                      </div>

                      {/* Card list */}
                      <div style={S('flex:1;overflow-y:auto;padding:14px 16px')}>
                        <div style={S('display:grid;grid-template-columns:repeat(2,1fr);gap:10px;align-items:start')}>
                          {RESEARCH_PAPERS.filter((p) => v.researchFilter === 'All' || p.type === v.researchFilter).map((p, i) => {
                            const tc = typeColor(p.type);
                            const accepted = v.acceptedPapers[i];
                            const excOpen = v.excerptOpen[i];
                            return (
                              <div key={i} style={{ ...S(`background:var(--bg);border:1px solid ${accepted ? 'var(--ok)' : 'var(--rule)'};border-left:3px solid ${tc};display:flex;flex-direction:column`), animation: `cardIn 0.32s ease both`, animationDelay: `${i * 0.04}s` }}>

                                {/* ARTIFACTS row */}
                                <div style={S('padding:10px 14px 0;display:flex;align-items:center;gap:6px;flex-wrap:wrap')}>
                                  <span style={S('font:700 8.5px/1 Archivo;letter-spacing:0.14em;color:var(--faint);margin-right:2px')}>ARTIFACTS</span>
                                  {p.artifacts.map((a) => (
                                    <span key={a} style={S('padding:2px 8px;font:600 9.5px/1 Archivo;border:1px solid var(--rule2);color:var(--dim)')}>{a}</span>
                                  ))}
                                </div>

                                {/* TRACK */}
                                <div style={S('padding:5px 14px 0;display:flex;align-items:center;gap:6px')}>
                                  <span style={S('font:700 8.5px/1 Archivo;letter-spacing:0.14em;color:var(--faint);margin-right:2px')}>TRACK</span>
                                  <span style={S(`padding:2px 8px;font:600 9.5px/1 Archivo;border:1px solid ${tc};color:${tc}`)}>{p.track}</span>
                                </div>

                                {/* Title */}
                                <div style={S('padding:10px 14px 0;font:700 13px/1.4 Archivo;letter-spacing:-0.01em;color:var(--ink)')}>{p.title}</div>

                                {/* Metadata grid */}
                                <div style={S('padding:10px 14px;display:grid;grid-template-columns:max-content 1fr;gap:3px 14px;align-items:baseline')}>
                                  {[
                                    ['Design tier', p.designTier],
                                    ['Appraisal score', p.appraisal],
                                    ['GRADE certainty', p.grade],
                                    ['Journal', p.journal.split('·')[0].trim() + (p.journal.includes('·') ? ' · ' + p.journal.split('·')[1].trim() : '')],
                                    ['Citations', p.citations],
                                    ['Funding / COI', p.funding],
                                    ['Stat. rigor', p.statRigor],
                                    ['Relevance', `${p.relevance}/100`],
                                  ].map(([label, val]) => (
                                    <React.Fragment key={label}>
                                      <div style={S('font:500 10.5px/1.5 Archivo;color:var(--faint);white-space:nowrap')}>{label}</div>
                                      <div style={S('font:600 10.5px/1.5 Archivo;color:var(--dim);text-align:right')}>{val}</div>
                                    </React.Fragment>
                                  ))}
                                </div>

                                {/* Flag warning */}
                                {p.flag && (
                                  <div style={S('margin:0 14px 10px;padding:7px 10px;border:1px solid var(--acc);background:rgba(30,64,175,0.07);font-size:10.5px;color:var(--acc);line-height:1.5')}>
                                    ⚠ {p.flag}
                                  </div>
                                )}

                                {/* Excerpt toggle */}
                                <Box
                                  css={`margin:0 14px 0;padding:8px 10px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;background:${excOpen ? 'var(--s1)' : 'transparent'};border:1px solid var(--rule)`}
                                  hover="background:var(--s1)"
                                  onClick={() => v.toggleExcerpt(i)}
                                >
                                  <span style={S('font:700 9.5px/1 Archivo;letter-spacing:0.1em;color:var(--dim)')}>Excerpt</span>
                                  <span style={S('font-size:10px;color:var(--faint)')}>{excOpen ? '▲' : '▼'}</span>
                                </Box>
                                {excOpen && (
                                  <div style={S('margin:0 14px;padding:10px 12px;background:var(--s1);border:1px solid var(--rule);border-top:none;animation:rise 0.18s ease')}>
                                    <div style={S('font-size:11px;color:var(--dim);line-height:1.7;font-style:italic')}>{p.excerpt}</div>
                                    <div style={S('font-size:10px;color:var(--faint);margin-top:6px')}>{p.excerptSrc}</div>
                                  </div>
                                )}

                                {/* Footer */}
                                <div style={S('padding:10px 14px;display:flex;align-items:center;gap:8px;flex-wrap:wrap;border-top:1px solid var(--rule);margin-top:10px')}>
                                  {p.artifacts.map((a) => (
                                    <span key={a} style={S('padding:2px 8px;font:600 9px/1 Archivo;border:1px solid var(--rule2);color:var(--faint)')}>{a}</span>
                                  ))}
                                  <span style={S(`padding:2px 8px;font:600 9px/1 Archivo;border:1px solid ${tc};color:${tc}`)}>{p.track.split(' ')[0]}</span>
                                  <Box
                                    css={`margin-left:auto;padding:7px 14px;font:700 10.5px/1 Archivo;cursor:pointer;background:${accepted ? 'var(--ok)' : 'transparent'};color:${accepted ? '#fff' : 'var(--ok)'};border:1px solid var(--ok)`}
                                    hover={!accepted ? 'background:rgba(22,101,52,0.12)' : ''}
                                    onClick={() => v.toggleAccept(i)}
                                  >
                                    {accepted ? '✓ Accepted' : 'Accept paper'}
                                  </Box>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* ===== STICKY FOOTER ===== */}
                      {(() => {
                        const acceptedCount = Object.values(v.acceptedPapers).filter(Boolean).length;
                        const acceptedList = RESEARCH_PAPERS.filter((_, idx) => v.acceptedPapers[idx]);
                        return (
                          <div style={S('flex:none;border-top:2px solid var(--rule2);background:var(--bg)')}>
                            {/* Accepted papers row */}
                            <div
                              style={S('padding:0 16px;border-bottom:1px solid var(--rule);cursor:pointer;display:flex;align-items:center;gap:10px')}
                              onClick={v.toggleAcceptedDrawer}
                            >
                              <span style={S('font:700 8.5px/1 Archivo;letter-spacing:0.14em;color:var(--faint);padding:10px 0')}>SHARED ACROSS EVERY RESEARCH TAB</span>
                              <div style={S('flex:1;display:flex;align-items:center;justify-content:space-between;padding:10px 0')}>
                                <span style={S('font:600 11.5px/1 Archivo;color:var(--dim)')}>
                                  Accepted papers
                                  <span style={S('display:inline-flex;align-items:center;justify-content:center;min-width:20px;height:20px;padding:0 6px;margin-left:8px;background:var(--ok);color:#fff;font:700 10px/1 Archivo;border-radius:2px')}>{acceptedCount}</span>
                                </span>
                                <span style={S('font-size:11px;color:var(--faint)')}>{v.acceptedDrawerOpen ? '▲' : '▼'}</span>
                              </div>
                            </div>

                            {/* Expanded accepted list */}
                            {v.acceptedDrawerOpen && acceptedList.length > 0 && (
                              <div style={S('max-height:140px;overflow-y:auto;border-bottom:1px solid var(--rule);animation:rise 0.18s ease')}>
                                {acceptedList.map((p, idx) => (
                                  <div key={idx} style={S('display:flex;align-items:center;gap:10px;padding:8px 16px;border-bottom:1px solid var(--rule)')}>
                                    <span style={S('width:6px;height:6px;border-radius:50%;background:var(--ok);flex:none')} />
                                    <span style={S('font:600 11px/1.4 Archivo;color:var(--dim);flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap')}>{p.title}</span>
                                    <span style={S('font:500 10px/1 Archivo;color:var(--faint);flex:none')}>{p.year}</span>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Action buttons */}
                            <div style={S('padding:12px 16px;display:flex;align-items:center;gap:10px')}>
                              <Box
                                css="padding:8px 14px;font:600 11px/1 Archivo;border:1px solid var(--rule2);color:var(--dim);cursor:pointer;white-space:nowrap"
                                hover="border-color:var(--ink);color:var(--ink)"
                              >
                                + Upload or link a paper to evaluate
                              </Box>
                              <Box
                                css="padding:8px 14px;font:600 11px/1 Archivo;border:1px solid var(--rule2);color:var(--dim);cursor:pointer;white-space:nowrap"
                                hover="border-color:var(--ink);color:var(--ink)"
                              >
                                + Add additional topic for research
                              </Box>
                              <Box
                                css="margin-left:auto;padding:8px 18px;font:700 11px/1 Archivo;background:var(--acc);color:#fff;cursor:pointer;white-space:nowrap;border:1px solid transparent"
                                hover="background:var(--acc)"
                                onClick={() => this.go('organize')}
                              >
                                Continue to next screen →
                              </Box>
                            </div>
                          </div>
                        );
                      })()}

                    </div>
                  ) : (
                    /* ===== LOADING STATE: Animated Feed ===== */
                    <div style={S('display:flex;flex-direction:column;height:100%;overflow:hidden')}>

                      {/* Header */}
                      <div style={S('padding:14px 22px;border-bottom:2px solid var(--rule2);display:flex;align-items:center;gap:12px;flex:none;background:var(--bg)')}>
                        <div style={S('width:9px;height:9px;border-radius:50%;flex:none;background:var(--acc);animation:puls 1.1s infinite')} />
                        <div>
                          <div style={S('font:700 9.5px/1 Archivo;letter-spacing:0.15em;color:var(--faint);margin-bottom:3px')}>RESEARCH AGENT</div>
                          <div style={S('font-weight:800;font-size:14px;letter-spacing:-0.01em')}>
                            {rN >= INDEX_STEP ? 'Building evidence index…' : rN >= DEDUP_STEP ? 'Deduplicating results…' : rN >= PAPER_START ? `Retrieving papers — ${visiblePapers} of ${RESEARCH_PAPERS.length} found` : 'Connecting to databases…'}
                          </div>
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div style={S('height:3px;background:var(--rule);flex:none')}>
                        <div style={S(`height:3px;background:var(--acc);width:${pct}%;transition:width 0.5s ease`)} />
                      </div>

                      <div style={S('flex:1;overflow-y:auto;padding:20px 22px')}>

                        {/* Evidence Collector compact strip */}
                        <div style={S('display:flex;align-items:center;gap:10px;padding:9px 12px;border:1px solid var(--rule);background:var(--bg);margin-bottom:16px')}>
                          <div style={S('display:flex;gap:3px;align-items:center')}>
                            {[0,1,2].map((d) => (
                              <div key={d} style={{ width:5, height:5, borderRadius:'50%', background:'var(--acc)', animation:'dotBounce 1.3s ease-in-out infinite', animationDelay:`${d*0.18}s` }} />
                            ))}
                          </div>
                          <div style={S('font:600 10px/1 Archivo;letter-spacing:0.1em;color:var(--faint)')}>EVIDENCE COLLECTOR</div>
                          <div style={S('font-size:11.5px;color:var(--dim);flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap')} key={thinkingMsg}>{thinkingMsg}</div>
                          <div style={S('font:600 10px/1 var(--mono);color:var(--faint);flex:none')}>{pct}%</div>
                        </div>

                    {/* Database sources */}
                    <div style={S('margin-bottom:20px')}>
                      <div style={S('font:700 9px/1 Archivo;letter-spacing:0.16em;color:var(--faint);margin-bottom:10px')}>SOURCES</div>
                      <div style={S('display:flex;flex-wrap:wrap;gap:7px')}>
                        {RESEARCH_DBS.map((db, i) => {
                          const connected = rN > i;
                          return (
                            <div key={db} style={S(`display:inline-flex;align-items:center;gap:6px;padding:5px 10px;border:1px solid ${connected ? 'var(--ok)' : 'var(--rule)'};background:${connected ? 'rgba(22,101,52,0.08)' : 'var(--bg)'};font-size:11.5px;font-weight:600;color:${connected ? 'var(--ok)' : 'var(--faint)'};${connected ? 'animation:rise 0.2s ease' : ''}`)}>
                              <span style={S(`width:5px;height:5px;border-radius:50%;flex:none;background:${connected ? 'var(--ok)' : 'var(--rule)'}`)}>
                              </span>
                              {db}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Papers feed */}
                    {visiblePapers > 0 && (
                      <div>
                        <div style={S('font:700 9px/1 Archivo;letter-spacing:0.16em;color:var(--faint);margin-bottom:10px')}>EVIDENCE RETRIEVED · {visiblePapers}</div>
                        <div style={S('display:flex;flex-direction:column;gap:8px')}>
                          {RESEARCH_PAPERS.slice(0, visiblePapers).map((p, i) => (
                            <div key={i} style={S('background:var(--bg);border:1px solid var(--rule);border-left:2px solid var(--rule2);padding:12px 14px;animation:rise 0.22s ease')}>
                              <div style={S('display:flex;align-items:center;gap:8px;margin-bottom:6px;flex-wrap:wrap')}>
                                <span style={S(`border:1px solid ${typeColor(p.type)};color:${typeColor(p.type)};padding:2px 6px;font:600 8.5px/1 Archivo;letter-spacing:0.09em`)}>{p.type.toUpperCase()}</span>
                                <span style={S('font:600 9px/1 var(--mono);color:var(--faint)')}>{p.db}</span>
                                <span style={S('font:600 9px/1 var(--mono);color:var(--faint)')}>{p.year}</span>
                                <span style={S('margin-left:auto;font:700 11px/1 var(--mono);color:var(--acc)')}>{p.score.toFixed(2)} <span style={S('font:500 9px/1 Archivo;color:var(--faint)')}>REL</span></span>
                              </div>
                              <div style={S('font-weight:700;font-size:12.5px;margin-bottom:5px;line-height:1.3;letter-spacing:-0.01em')}>{p.title}</div>
                              <div style={S('font-size:11px;color:var(--dim);line-height:1.55;font-style:italic;margin-bottom:4px')}>{p.journal}</div>
                              <div style={S('font-size:11.5px;color:var(--dim);line-height:1.55')}>{p.snippet}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {rN >= DEDUP_STEP && (
                      <div style={S('margin-top:12px;padding:12px 14px;border:1px solid var(--ok);background:rgba(22,101,52,0.06);display:flex;align-items:center;gap:10px;animation:rise 0.2s ease')}>
                        <span style={S('font-size:14px')}>✓</span>
                        <div style={S('font-size:12px;color:var(--ok);font-weight:600')}>Deduplication complete — 71 raw results → {RESEARCH_PAPERS.length} unique papers retained</div>
                      </div>
                    )}
                    {rN >= INDEX_STEP && (
                      <div style={S('margin-top:8px;padding:12px 14px;border:1px solid var(--ok);background:rgba(22,101,52,0.06);display:flex;align-items:center;gap:10px;animation:rise 0.2s ease')}>
                        <span style={S('font-size:14px')}>✓</span>
                        <div style={S('font-size:12px;color:var(--ok);font-weight:600')}>Evidence index built — {RESEARCH_PAPERS.length + 46} chunks · 1,204 spans · ready for content generation</div>
                      </div>
                    )}
                  </div>
                </div>
              )}
                </div>
              </div>
            );
          })()}

          {/* ============ ORGANIZE RESEARCH ============ */}
          {v.isOrganize && (() => {
            const acceptedList = RESEARCH_PAPERS.map((p, i) => ({ ...p, _idx: i })).filter((p) => v.acceptedPapers[p._idx]);
            const sel = v.organizeSelectedPaper;
            const curView = v.organizeView || 'track';

            const tc2 = (type) => {
              if (type === 'RCT') return '#7eb8f7';
              if (type === 'Systematic Review' || type === 'Meta-Analysis') return '#a78bfa';
              if (type === 'Guideline') return '#4ade80';
              if (type === 'Real-World') return '#fb923c';
              if (type === 'Registry') return '#f97b7b';
              return 'var(--dim)';
            };

            /* ---- SVG figure renders ---- */
            const FigKM = () => (
              <svg viewBox="0 0 220 140" style={{ width: '100%', height: 'auto', display: 'block' }}>
                <rect width="220" height="140" fill="#16151400" />
                {[0,1,2,3,4].map(i => <line key={i} x1="36" y1={18 + i*20} x2="210" y2={18 + i*20} stroke="#2a2828" strokeWidth="0.7" />)}
                <line x1="36" y1="18" x2="36" y2="118" stroke="#4a4848" strokeWidth="1.2" />
                <line x1="36" y1="118" x2="210" y2="118" stroke="#4a4848" strokeWidth="1.2" />
                {/* treatment line stays high */}
                <polyline points="36,22 65,22 65,24 95,24 95,26 125,26 130,28 160,28 165,31 200,31 205,33" fill="none" stroke="#7eb8f7" strokeWidth="2" strokeLinejoin="round" />
                {/* placebo drops faster */}
                <polyline points="36,22 60,22 60,28 85,28 85,36 110,36 115,46 140,46 145,58 170,58 175,72 205,75" fill="none" stroke="#f97b7b" strokeWidth="2" strokeLinejoin="round" />
                <polygon points="36,22 65,22 65,24 95,24 95,26 125,26 130,28 160,28 165,31 200,31 205,33 205,75 175,72 170,58 145,58 140,46 115,46 110,36 85,36 85,28 60,28 60,22 36,22" fill="rgba(126,184,247,0.07)" />
                {['1.00','0.95','0.90','0.85','0.80'].map((lbl, i) => (
                  <text key={i} x="33" y={22 + i*20} fontSize="6.5" fill="#605d5d" textAnchor="end" dominantBaseline="middle">{lbl}</text>
                ))}
                {[0,12,24,36,48].map((m, mi) => (
                  <text key={m} x={36 + mi*43.5} y="126" fontSize="7" fill="#605d5d" textAnchor="middle">{m}</text>
                ))}
                <text x="122" y="136" fontSize="7.5" fill="#605d5d" textAnchor="middle">Months from randomisation</text>
                <line x1="90" y1="131" x2="105" y2="131" stroke="#7eb8f7" strokeWidth="2"/><text x="107" y="134" fontSize="7" fill="#9b9797">Treatment</text>
                <line x1="148" y1="131" x2="163" y2="131" stroke="#f97b7b" strokeWidth="2"/><text x="165" y="134" fontSize="7" fill="#9b9797">Placebo</text>
              </svg>
            );

            const FigForest = () => {
              const studies = [
                { name: 'SUSTAIN-6', rr: 0.74, lo: 0.58, hi: 0.95, w: 14 },
                { name: 'SELECT', rr: 0.80, lo: 0.72, hi: 0.90, w: 22 },
                { name: 'LEADER', rr: 0.87, lo: 0.78, hi: 0.97, w: 20 },
                { name: 'HARMONY', rr: 0.78, lo: 0.68, hi: 0.90, w: 16 },
                { name: 'EXSCEL', rr: 0.91, lo: 0.83, hi: 1.00, w: 18 },
                { name: 'REWIND', rr: 0.88, lo: 0.79, hi: 0.99, w: 10 },
              ];
              const pooled = { rr: 0.86, lo: 0.82, hi: 0.94 };
              const xScale = (rr) => 52 + (rr - 0.5) * 200;
              return (
                <svg viewBox="0 0 280 170" style={{ width: '100%', height: 'auto', display: 'block' }}>
                  <rect width="280" height="170" fill="#16151400" />
                  {/* null line */}
                  <line x1={xScale(1.0)} y1="14" x2={xScale(1.0)} y2="148" stroke="#4a4848" strokeWidth="1" strokeDasharray="3,2" />
                  {/* x-axis */}
                  <line x1="52" y1="148" x2="252" y2="148" stroke="#4a4848" strokeWidth="1" />
                  {[0.6,0.7,0.8,0.9,1.0,1.1].map((v2) => (
                    <React.Fragment key={v2}>
                      <line x1={xScale(v2)} y1="145" x2={xScale(v2)} y2="151" stroke="#4a4848" strokeWidth="1" />
                      <text x={xScale(v2)} y="158" fontSize="6.5" fill="#605d5d" textAnchor="middle">{v2.toFixed(1)}</text>
                    </React.Fragment>
                  ))}
                  <text x="152" y="167" fontSize="7" fill="#605d5d" textAnchor="middle">Risk Ratio (95% CI)</text>
                  {studies.map((s, i) => {
                    const cx = xScale(s.rr); const y2 = 22 + i * 20; const hw = Math.sqrt(s.w) * 1.8;
                    return (
                      <React.Fragment key={s.name}>
                        <text x="50" y={y2} fontSize="7" fill="#9b9797" textAnchor="end" dominantBaseline="middle">{s.name}</text>
                        <line x1={xScale(s.lo)} y1={y2} x2={xScale(s.hi)} y2={y2} stroke="#7eb8f7" strokeWidth="1.2" />
                        <rect x={cx - hw / 2} y={y2 - hw / 2} width={hw} height={hw} fill="#7eb8f7" />
                        <text x="254" y={y2} fontSize="6.5" fill="#7eb8f7" dominantBaseline="middle">{s.rr.toFixed(2)}</text>
                      </React.Fragment>
                    );
                  })}
                  {/* pooled diamond */}
                  <polygon points={`${xScale(pooled.rr)},${148-8} ${xScale(pooled.hi)},${148-2} ${xScale(pooled.rr)},${148+4} ${xScale(pooled.lo)},${148-2}`} fill="#a78bfa" opacity="0.9" />
                  <text x="50" y="146" fontSize="7" fill="#a78bfa" textAnchor="end" dominantBaseline="middle">Pooled</text>
                  <text x="20" y="85" fontSize="7" fill="#4ade80" textAnchor="middle">Favours</text>
                  <text x="20" y="93" fontSize="7" fill="#4ade80" textAnchor="middle">treatment</text>
                  <text x="245" y="85" fontSize="7" fill="#f97b7b" textAnchor="middle">Favours</text>
                  <text x="245" y="93" fontSize="7" fill="#f97b7b" textAnchor="middle">placebo</text>
                </svg>
              );
            };

            const FigBar = ({ variant = 0 }) => {
              const sets = [
                { bars: [{l:'CV death',v:3.2,c:'#f97b7b'},{l:'Nonfatal MI',v:4.1,c:'#fb923c'},{l:'Stroke',v:1.8,c:'#a78bfa'}], pair: true },
                { bars: [{l:'<45',v:52,c:'#7eb8f7'},{l:'45–64',v:48,c:'#7eb8f7'},{l:'65–74',v:44,c:'#7eb8f7'},{l:'75+',v:38,c:'#7eb8f7'}], pair: false },
                { bars: [{l:'2024',v:589,c:'#4ade80'},{l:'2030',v:643,c:'#fb923c'},{l:'2040',v:722,c:'#f97b7b'},{l:'2050',v:853,c:'#f97b7b'}], pair: false },
              ][variant % 3];
              const max = Math.max(...sets.bars.map(b => b.v)) * 1.15;
              const bw = sets.bars.length <= 3 ? 28 : 20; const gap = sets.bars.length <= 3 ? 20 : 14;
              const totalW = sets.bars.length * (bw + gap) + gap; const startX = (220 - totalW) / 2 + gap;
              return (
                <svg viewBox="0 0 220 130" style={{ width: '100%', height: 'auto', display: 'block' }}>
                  <rect width="220" height="130" fill="#16151400" />
                  <line x1="20" y1="15" x2="20" y2="105" stroke="#4a4848" strokeWidth="1" />
                  <line x1="20" y1="105" x2="210" y2="105" stroke="#4a4848" strokeWidth="1" />
                  {[0,0.25,0.5,0.75,1].map(f => {
                    const y2 = 105 - f * 90;
                    return <line key={f} x1="18" y1={y2} x2="210" y2={y2} stroke="#2a2828" strokeWidth="0.7" />;
                  })}
                  {sets.bars.map((b, i) => {
                    const x = startX + i * (bw + gap); const h = (b.v / max) * 90; const y2 = 105 - h;
                    return (
                      <React.Fragment key={b.l}>
                        <rect x={x} y={y2} width={bw} height={h} fill={b.c} opacity="0.85" rx="1" />
                        <text x={x + bw/2} y="113" fontSize="6.5" fill="#605d5d" textAnchor="middle">{b.l}</text>
                        <text x={x + bw/2} y={y2 - 3} fontSize="6.5" fill={b.c} textAnchor="middle">{b.v}</text>
                      </React.Fragment>
                    );
                  })}
                </svg>
              );
            };

            const FigScatter = () => {
              const pts = [[8,72,12],[15,58,22],[22,63,8],[28,51,30],[35,47,18],[42,44,35],[50,48,10],[55,40,45],[62,36,28],[70,38,15],[78,33,40],[85,30,20]];
              return (
                <svg viewBox="0 0 220 140" style={{ width: '100%', height: 'auto', display: 'block' }}>
                  <rect width="220" height="140" fill="#16151400" />
                  <line x1="28" y1="15" x2="28" y2="115" stroke="#4a4848" strokeWidth="1" />
                  <line x1="28" y1="115" x2="212" y2="115" stroke="#4a4848" strokeWidth="1" />
                  {[0,25,50,75,100].map(v2 => (
                    <React.Fragment key={v2}>
                      <line x1="26" y1={115 - v2 * 0.98} x2="212" y2={115 - v2 * 0.98} stroke="#2a2828" strokeWidth="0.7" />
                      <text x="25" y={116 - v2 * 0.98} fontSize="6" fill="#605d5d" textAnchor="end">{v2}%</text>
                    </React.Fragment>
                  ))}
                  <line x1="32" y1="108" x2="208" y2="28" stroke="#a78bfa" strokeWidth="1" strokeDasharray="3,2" opacity="0.5" />
                  {pts.map(([x, y, r], i) => (
                    <circle key={i} cx={28 + x * 1.96} cy={115 - y * 0.98} r={Math.sqrt(r) * 1.2} fill="#7eb8f7" opacity="0.65" />
                  ))}
                  <text x="120" y="128" fontSize="7" fill="#605d5d" textAnchor="middle">Follow-up duration (months)</text>
                  <text x="12" y="65" fontSize="7" fill="#605d5d" textAnchor="middle" transform="rotate(-90,12,65)">Attainment %</text>
                </svg>
              );
            };

            const FigTable = () => {
              const rows = [
                ['Metformin', 'First-line', 'Grade A', '✓', '✓'],
                ['GLP-1 RA', 'Add-on (ASCVD)', 'Grade A', '✓', '✓'],
                ['SGLT2i', 'Add-on (CKD/HF)', 'Grade A', '✓', '✓'],
                ['DPP-4i', 'Add-on (low risk)', 'Grade B', '✓', '—'],
                ['Insulin', 'If HbA1c >10%', 'Grade A', '✓', '✓'],
              ];
              return (
                <svg viewBox="0 0 260 140" style={{ width: '100%', height: 'auto', display: 'block' }}>
                  <rect width="260" height="140" fill="#16151400" />
                  <rect x="4" y="8" width="252" height="16" fill="rgba(79,82,216,0.25)" />
                  {['Agent','Indication','Evidence','CV','Renal'].map((h, i) => (
                    <text key={h} x={10 + i * 50} y="19" fontSize="6.5" fill="var(--acc)" fontWeight="700">{h}</text>
                  ))}
                  {rows.map((row, ri) => (
                    <React.Fragment key={ri}>
                      <rect x="4" y={26 + ri*22} width="252" height="21" fill={ri%2===0?'rgba(255,255,255,0.02)':'transparent'} />
                      {row.map((cell, ci) => (
                        <text key={ci} x={10 + ci*50} y={40 + ri*22} fontSize="6.5" fill={ci===0?'#f3f2f2':'#9b9797'}>{cell}</text>
                      ))}
                    </React.Fragment>
                  ))}
                  {[0,1,2,3,4,5].map(i => (
                    <line key={i} x1="4" y1={26+i*22} x2="256" y2={26+i*22} stroke="#2a2828" strokeWidth="0.7"/>
                  ))}
                </svg>
              );
            };

            const renderFigSVG = (type, pIdx) => {
              if (type === 'km') return <FigKM />;
              if (type === 'forest') return <FigForest />;
              if (type === 'scatter') return <FigScatter />;
              if (type === 'table') return <FigTable />;
              return <FigBar variant={pIdx % 3} />;
            };

            const ART_COLORS = { Deck: '#7eb8f7', Blog: '#fb923c', Protocol: '#4ade80', Blurb: '#f97b7b', Facts: '#a78bfa' };
            const totalExcerpts = acceptedList.length + v.customExcerpts.length;
            const populatedTracks = CONTENT_TRACKS.filter((t) => acceptedList.some((p) => t.paperTracks.includes(p.track)) || v.customExcerpts.some((e) => e.tracks.includes(t.id))).length;

            /* ---- shared excerpt card ---- */
            const ExcerptCard = ({ p }) => (
              <Box
                css={`position:relative;background:var(--s2);border:1px solid ${sel && sel._idx === p._idx ? 'var(--acc)' : 'var(--rule)'};border-left:3px solid ${tc2(p.type)};padding:16px 18px;cursor:pointer;display:flex;flex-direction:column;gap:10px;transition:border-color 0.15s,background 0.15s`}
                hover={`border-color:var(--acc);background:var(--s1)`}
                onClick={() => v.setOrganizeSelected(p)}
              >
                {/* top row: db pill + type + year + score */}
                <div style={S('display:flex;align-items:center;gap:8px')}>
                  <span style={{ padding: '2px 8px', fontSize: 9, fontWeight: 700, fontFamily: 'Archivo', letterSpacing: '0.1em', border: `1px solid ${tc2(p.type)}`, color: tc2(p.type), background: `${tc2(p.type)}18` }}>{p.type}</span>
                  <span style={S('font:500 10px/1 var(--mono);color:var(--faint)')}>{p.db} · {p.year}</span>
                  <span style={S('margin-left:auto;font:700 11px/1 var(--mono);color:var(--ok)')}>{p.score.toFixed(2)}</span>
                </div>
                {/* title */}
                <div style={S('font:700 13px/1.4 Archivo;letter-spacing:-0.01em;color:var(--ink)')}>{p.title}</div>
                {/* excerpt blockquote */}
                <div style={S('border-left:2px solid var(--acc);padding:8px 14px;background:rgba(30,64,175,0.06)')}>
                  <div style={S('font:400 11.5px/1.75 Archivo;color:var(--dim);font-style:italic')}>{p.excerpt}</div>
                  <div style={S('font:600 9.5px/1 var(--mono);color:var(--faint);margin-top:7px;letter-spacing:0.04em')}>{p.excerptSrc}</div>
                </div>
                {/* artifact tags */}
                <div style={S('display:flex;gap:5px;flex-wrap:wrap')}>
                  {ALL_ARTIFACTS.map((a) => {
                    const active = p.artifacts.includes(a);
                    return <span key={a} style={{ padding: '2px 8px', font: '600 9px/1 Archivo', border: '1px solid', borderColor: active ? ART_COLORS[a] : 'var(--rule)', color: active ? ART_COLORS[a] : 'var(--faint)', background: active ? `${ART_COLORS[a]}15` : 'transparent' }}>{a}</span>;
                  })}
                </div>
              </Box>
            );

            /* ── Organize Agent Panel ── */
            const visibleOrgMsgs = ORGANIZE_AGENT_MSGS.slice(0, v.organizeAgentMsgN);
            const orgDone = v.organizeAgentMsgN >= ORGANIZE_AGENT_MSGS.length;

            const organizeAgentPanel = (
              <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative', animation: 'fadeUp 0.32s cubic-bezier(0.22,1,0.36,1) both' }}>

                {/* Status banner */}
                <div style={S(`display:flex;align-items:center;gap:10px;padding:11px 20px;border-bottom:1px solid var(--rule);flex:none;background:${orgDone ? 'rgba(22,101,52,0.08)' : 'rgba(30,64,175,0.06)'}`)}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: orgDone ? 'var(--ok)' : 'var(--acc)', animation: orgDone ? '' : 'puls 1s infinite' }} />
                  <div style={S(`font:700 10px/1 Archivo;letter-spacing:0.14em;color:${orgDone ? 'var(--ok)' : 'var(--acc)'}`)}>
                    {orgDone ? 'ORGANISATION COMPLETE' : 'ORGANISE AGENT · RUNNING…'}
                  </div>
                  {!orgDone && <div style={S('margin-left:auto;font:600 10px/1 var(--mono);color:var(--faint)')}>{Math.round((v.organizeAgentMsgN / ORGANIZE_AGENT_MSGS.length) * 100)}%</div>}
                </div>

                {/* Thread header */}
                <div style={S('padding:14px 20px;border-bottom:1px solid var(--rule);flex:none')}>
                  <div style={S('font:600 9.5px/1 Archivo;letter-spacing:0.14em;color:var(--faint);margin-bottom:4px')}>RESEARCH ORGANISATION AGENT</div>
                  <div style={S('font:700 14px/1 Archivo;letter-spacing:-0.01em;color:var(--ink)')}>Excerpt & Track Analysis</div>
                </div>

                {/* Messages */}
                <div style={S('flex:1;overflow-y:auto;padding:20px')}>
                  {visibleOrgMsgs.map((msg, i) => {
                    const isGap = msg.text.startsWith('⚠');
                    const accentVar = isGap ? 'var(--warn)' : 'var(--acc)';
                    const parts = msg.text.replace(/^⚠\s*/, '').split(/(\*\*[^*]+\*\*)/g);
                    return (
                      <div key={i} style={{ ...S('display:flex;gap:10px;margin-bottom:22px;animation:rise 0.3s ease both'), animationDelay: `${i * 0.05}s` }}>
                        <div style={{ width: 28, height: 28, flexShrink: 0, background: isGap ? 'var(--warn)' : 'var(--acc)', display: 'grid', placeItems: 'center', font: '700 10px/1 Archivo', color: '#fff' }}>
                          {isGap ? '!' : 'AI'}
                        </div>
                        <div style={S('max-width:88%;flex:1')}>
                          <div style={{ ...S('font:700 9.5px/1 Archivo;letter-spacing:0.12em;margin-bottom:6px'), color: isGap ? 'var(--warn)' : 'var(--acc)' }}>
                            {isGap ? 'GAP DETECTED' : `STEP ${i + 1} · ANALYSIS`}
                          </div>
                          <div style={{ background: 'var(--s1)', border: '1px solid var(--rule)', borderLeft: `2px solid ${accentVar}`, padding: '12px 14px', fontSize: 12.5, color: 'var(--dim)', lineHeight: 1.65 }}>
                            {parts.map((part, pi) =>
                              part.startsWith('**') && part.endsWith('**')
                                ? <strong key={pi} style={{ color: 'var(--ink)', fontWeight: 700 }}>{part.slice(2, -2)}</strong>
                                : <span key={pi}>{part}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* Thinking dots */}
                  {v.organizeAgentThinking && (
                    <div style={S('display:flex;gap:10px;margin-bottom:20px;animation:rise 0.25s ease')}>
                      <div style={S('width:28px;height:28px;flex:none;display:grid;place-items:center;font:700 10px/1 Archivo;background:var(--acc);color:#fff')}>AI</div>
                      <div style={S('background:var(--s1);border:1px solid var(--rule);border-left:2px solid var(--acc);padding:12px 14px')}>
                        <div style={S('font:600 10px/1 Archivo;letter-spacing:0.1em;color:var(--acc);margin-bottom:8px')}>
                          {visibleOrgMsgs.length === 0 ? 'LOADING EVIDENCE BASE…' : 'ANALYSING TRACKS…'}
                        </div>
                        <div style={S('display:flex;gap:5px')}>
                          {[0,1,2].map((d) => <div key={d} style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--acc)', animation: 'dotBounce 1.3s ease-in-out infinite', animationDelay: `${d * 0.18}s` }} />)}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Done bubble */}
                  {orgDone && (
                    <div style={S('display:flex;gap:10px;margin-bottom:20px;animation:rise 0.3s ease')}>
                      <div style={S('width:28px;height:28px;flex:none;display:grid;place-items:center;font:700 10px/1 Archivo;background:var(--ok);color:#fff')}>AI</div>
                      <div>
                        <div style={S('font:600 9.5px/1 Archivo;letter-spacing:0.12em;color:var(--ok);margin-bottom:6px')}>ORGANISE AGENT · COMPLETE</div>
                        <div style={S('background:var(--s1);border:1px solid var(--rule);border-left:2px solid var(--ok);padding:12px 14px;font-size:12.5px;color:var(--dim);line-height:1.65')}>
                          Organisation complete. <strong style={S('color:var(--ink)')}>4 of 5 tracks</strong> have sufficient excerpt coverage. Ready to proceed.
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input area */}
                <div style={S('padding:12px 16px;border-top:1px solid var(--rule);flex:none;display:flex;gap:8px')}>
                  <input
                    value={v.organizeAgentInput}
                    onChange={e => v.setOrganizeAgentInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && v.sendOrganizeMsg()}
                    placeholder="Ask about track coverage, gaps, or excerpts…"
                    style={S('flex:1;background:var(--s2);border:1px solid var(--rule2);color:var(--ink);padding:9px 13px;font:400 12.5px/1 Archivo;outline:none')}
                  />
                  <div onClick={v.sendOrganizeMsg} style={S('width:34px;height:34px;background:var(--acc);display:grid;place-items:center;cursor:pointer;flex:none')}>
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M15 1L7 9M15 1L10 15L7 9M15 1L1 6L7 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>

              </div>
            );

            return (
              <ResizableSplit left={organizeAgentPanel} defaultLeftPct={36} minPct={24} maxPct={60}
                right={<div style={S('display:flex;flex-direction:column;height:100%;overflow:hidden;animation:fadeUp 0.3s cubic-bezier(0.22,1,0.36,1) both')}>

                {/* ══ TOP HEADER BAR ══ */}
                <div style={S('padding:0 0 0;flex:none;border-bottom:1px solid var(--rule2)')}>
                  <div style={S('padding:22px 40px 16px;display:flex;align-items:flex-end;gap:0')}>
                    <div style={S('flex:1')}>
                      <div style={S('font:800 22px/1.2 Archivo;letter-spacing:-0.03em;color:var(--ink);margin-bottom:5px')}>Organize Your Research</div>
                      <div style={S('font:400 12px/1.6 Archivo;color:var(--faint);max-width:520px')}>
                        Excerpts grouped by content track — a paper appears under every track its evidence serves. Select any excerpt to inspect the full card.
                      </div>
                    </div>
                    {/* stat pills */}
                    <div style={S('display:flex;gap:8px;align-items:center;flex-shrink:0;margin-left:24px')}>
                      {[
                        { label: 'Papers', val: acceptedList.length, color: 'var(--ok)' },
                        { label: 'Excerpts', val: totalExcerpts, color: 'var(--acc)' },
                        { label: 'Tracks', val: `${populatedTracks} / ${CONTENT_TRACKS.length}`, color: 'var(--warn)' },
                      ].map(({ label, val, color }) => (
                        <div key={label} style={S('text-align:center;padding:8px 16px;background:var(--s2);border:1px solid var(--rule)')}>
                          <div style={{ font: '700 16px/1 Archivo', color, marginBottom: 3 }}>{val}</div>
                          <div style={S('font:500 9px/1 Archivo;letter-spacing:0.1em;color:var(--faint)')}>{label.toUpperCase()}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tab bar */}
                  <div style={S('padding:0 40px;display:flex;align-items:center;gap:0')}>
                    {[
                      { id: 'track', label: 'By Track' },
                      { id: 'artifact', label: 'By Artifact' },
                      { id: 'figures', label: '📊 Review Figures' },
                    ].map((tab) => {
                      const active = curView === tab.id;
                      return (
                        <Box key={tab.id}
                          css={`padding:10px 20px;font:600 12px/1 Archivo;cursor:pointer;color:${active ? 'var(--ink)' : 'var(--faint)'};border-bottom:2px solid ${active ? 'var(--acc)' : 'transparent'};margin-bottom:-1px;transition:color 0.15s,border-color 0.15s`}
                          hover={!active ? 'color:var(--dim)' : ''}
                          onClick={() => v.setOrganizeView(tab.id)}
                        >{tab.label}</Box>
                      );
                    })}
                    <div style={S('flex:1')} />
                    {/* Artifact filter */}
                    <div style={S('display:flex;align-items:center;gap:4px;padding-bottom:10px')}>
                      {ALL_ARTIFACTS.map((a) => {
                        const on = v.organizeArtifactFilter[a];
                        const c = ART_COLORS[a];
                        return (
                          <Box key={a}
                            css={`padding:4px 10px;font:600 10px/1 Archivo;cursor:pointer;border:1px solid ${on ? c : 'var(--rule)'};background:${on ? `${c}18` : 'transparent'};color:${on ? c : 'var(--faint)'};transition:all 0.15s`}
                            hover={!on ? `border-color:${c};color:${c}` : ''}
                            onClick={() => v.toggleOrganizeArtifact(a)}
                          >{a}</Box>
                        );
                      })}
                      <div style={S('width:1px;height:16px;background:var(--rule);margin:0 6px')} />
                      {curView !== 'figures' && <>
                        <Box css="padding:4px 10px;font:600 10px/1 Archivo;border:1px solid var(--rule);color:var(--faint);cursor:pointer" hover="color:var(--ink)" onClick={() => v.setOrganizeExpandAll(true)}>Expand all</Box>
                        <Box css="padding:4px 10px;font:600 10px/1 Archivo;border:1px solid var(--rule);color:var(--faint);cursor:pointer" hover="color:var(--ink)" onClick={() => v.setOrganizeExpandAll(false)}>Collapse all</Box>
                      </>}
                    </div>
                  </div>
                </div>

                {/* ══ MAIN BODY ══ */}
                {(() => {
                  const trackList = (
                    <div key={curView} style={S('flex:1;min-width:0;overflow-y:auto;padding:20px 40px 40px;animation:fadeUp 0.2s ease both')}>

                      {/* BY TRACK */}
                      {curView === 'track' && CONTENT_TRACKS.map((track, ti) => {
                        const trackPapers = acceptedList.filter((p) => track.paperTracks.includes(p.track));
                        const customHere = v.customExcerpts.filter((e) => e.tracks.includes(track.id));
                        const count = trackPapers.length + customHere.length;
                        const isOpen = !!v.organizeExpanded[track.id];
                        return (
                          <div key={track.id} style={{ borderLeft: `3px solid ${isOpen ? track.color : 'var(--rule)'}`, background: 'var(--bg)', marginBottom: 6, transition: 'border-color 0.2s', animation: `rise 0.22s ease both`, animationDelay: `${ti * 0.04}s` }}>
                            <Box
                              css={`display:flex;align-items:center;gap:12px;padding:14px 18px;cursor:pointer;background:${isOpen ? 'var(--s2)' : 'var(--bg)'};transition:background 0.15s`}
                              hover={!isOpen ? 'background:var(--s1)' : ''}
                              onClick={() => v.toggleOrganizeTrack(track.id)}
                            >
                              <div style={{ width: 8, height: 8, borderRadius: '50%', background: track.color, flexShrink: 0 }} />
                              <span style={{ font: '700 13px/1 Archivo', color: track.color }}>{track.label}</span>
                              <span style={S('font:500 10px/1 Archivo;color:var(--faint)')}>{count} {count === 1 ? 'excerpt' : 'excerpts'}</span>
                              {count > 0 && (
                                <div style={S('display:flex;gap:3px')}>
                                  {Array.from({ length: Math.min(count, 5) }).map((_, i) => (
                                    <div key={i} style={{ width: 4, height: 14, background: track.color, opacity: 0.4 + i * 0.12 }} />
                                  ))}
                                </div>
                              )}
                              <Box
                                css="margin-left:auto;display:inline-flex;align-items:center;gap:4px;padding:5px 12px;border:1px dashed var(--acc);color:var(--acc);font:600 10px/1 Archivo;cursor:pointer;transition:background 0.15s"
                                hover="background:rgba(79,82,216,.14)"
                                onClick={(e) => { e.stopPropagation(); v.openAddExcerpt(track.id); }}
                              >+ Add excerpt</Box>
                              <span style={{ color: 'var(--faint)', fontSize: 11, width: 18, textAlign: 'center', display: 'inline-block', transition: 'transform 0.2s', transform: `rotate(${isOpen ? 180 : 0}deg)` }}>▼</span>
                            </Box>
                            {isOpen && (
                              <div style={S('padding:12px 18px 16px;display:flex;flex-direction:column;gap:10px;border-top:1px solid var(--rule);animation:rise 0.18s ease')}>
                                {count === 0
                                  ? <div style={S('padding:20px;text-align:center;color:var(--faint);font:500 12px/1.6 Archivo;border:1px dashed var(--rule)')}>No excerpts yet in this track. Click <span style={{ color: 'var(--acc)' }}>+ Add excerpt</span> to add one.</div>
                                  : trackPapers.map((p) => <ExcerptCard key={p._idx} p={p} />)
                                }
                                {customHere.map((e) => (
                                  <div key={e.id} style={S('background:var(--s2);border:1px solid var(--rule);border-left:3px solid var(--acc);padding:14px 16px;display:flex;flex-direction:column;gap:8px;animation:rise 0.18s ease')}>
                                    <div style={S('display:flex;align-items:center;gap:8px')}>
                                      <span style={S('padding:2px 8px;border:1px solid var(--acc);background:rgba(30,64,175,0.16);font:700 8.5px/1 Archivo;letter-spacing:0.12em;color:var(--acc)')}>CUSTOM</span>
                                      <span style={S('font:500 10px/1 Archivo;color:var(--faint)')}>Added manually</span>
                                    </div>
                                    <div style={S('border-left:2px solid var(--acc);padding:8px 12px;background:rgba(30,64,175,0.06);font:400 12px/1.75 Archivo;color:var(--dim);font-style:italic')}>{e.text}</div>
                                    <div style={S('display:flex;gap:5px;flex-wrap:wrap')}>
                                      {e.artifacts.map((a) => <span key={a} style={{ padding: '2px 8px', font: '600 9px/1 Archivo', border: `1px solid ${ART_COLORS[a]}`, color: ART_COLORS[a], background: `${ART_COLORS[a]}15` }}>{a}</span>)}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}

                      {/* BY ARTIFACT */}
                      {curView === 'artifact' && ALL_ARTIFACTS.map((art, ai) => {
                        const artPapers = acceptedList.filter((p) => p.artifacts.includes(art));
                        const isOpen = !!v.organizeExpanded[`art_${art}`];
                        const c = ART_COLORS[art];
                        return (
                          <div key={art} style={{ borderLeft: `3px solid ${isOpen ? c : 'var(--rule)'}`, background: 'var(--bg)', marginBottom: 6, transition: 'border-color 0.2s', animation: `rise 0.22s ease both`, animationDelay: `${ai * 0.05}s` }}>
                            <Box css={`display:flex;align-items:center;gap:12px;padding:14px 18px;cursor:pointer;background:${isOpen ? 'var(--s2)' : 'var(--bg)'};transition:background 0.15s`} hover={!isOpen ? 'background:var(--s1)' : ''} onClick={() => v.toggleOrganizeTrack(`art_${art}`)}>
                              <div style={{ width: 8, height: 8, borderRadius: '50%', background: c, flexShrink: 0 }} />
                              <span style={{ font: '700 13px/1 Archivo', color: c }}>{art}</span>
                              <span style={S('font:500 10px/1 Archivo;color:var(--faint)')}>{artPapers.length} {artPapers.length === 1 ? 'paper' : 'papers'}</span>
                              <span style={{ marginLeft: 'auto', color: 'var(--faint)', fontSize: 11, display: 'inline-block', transition: 'transform 0.2s', transform: `rotate(${isOpen ? 180 : 0}deg)` }}>▼</span>
                            </Box>
                            {isOpen && (
                              <div style={S('padding:12px 18px 16px;display:flex;flex-direction:column;gap:10px;border-top:1px solid var(--rule);animation:rise 0.18s ease')}>
                                {artPapers.length === 0
                                  ? <div style={S('padding:20px;text-align:center;color:var(--faint);font:500 12px/1.6 Archivo;border:1px dashed var(--rule)')}>No accepted papers produce this artifact type.</div>
                                  : artPapers.map((p) => <ExcerptCard key={p._idx} p={p} />)
                                }
                              </div>
                            )}
                          </div>
                        );
                      })}

                      {/* REVIEW FIGURES */}
                      {curView === 'figures' && (() => {
                        const figCards = [];
                        acceptedList.forEach((p) => { (PAPER_FIGURES[p._idx] || []).forEach((fig) => figCards.push({ ...fig, paper: p })); });
                        if (figCards.length === 0) return (
                          <div style={S('display:flex;flex-direction:column;align-items:center;justify-content:center;padding:64px 32px;gap:12px')}>
                            <div style={S('font-size:32px')}>📊</div>
                            <div style={S('font:700 15px/1 Archivo;color:var(--dim)')}>No figures yet</div>
                            <div style={S('font:400 12px/1.65 Archivo;color:var(--faint);text-align:center;max-width:320px')}>Accept RCTs, meta-analyses or registry papers — those come with embedded figures that appear here.</div>
                          </div>
                        );
                        return (
                          <div style={S('display:grid;grid-template-columns:repeat(2,1fr);gap:12px')}>
                            {figCards.map(({ type, label, caption, paper }, i) => (
                              <Box key={i}
                                css={`display:flex;flex-direction:column;overflow:hidden;cursor:pointer;border:1px solid ${sel && sel._idx === paper._idx ? 'var(--acc)' : 'var(--rule)'};background:var(--bg);transition:border-color 0.15s,transform 0.15s`}
                                hover="border-color:var(--acc);transform:translateY(-2px)"
                                onClick={() => v.setOrganizeSelected(paper)}
                                style={{ animation: `cardIn 0.25s ease both`, animationDelay: `${i * 0.045}s` }}
                              >
                                <div style={S('background:var(--s2);padding:16px 16px 10px;border-bottom:1px solid var(--rule)')}>
                                  {renderFigSVG(type, paper._idx)}
                                </div>
                                <div style={S('padding:11px 14px;display:flex;flex-direction:column;gap:5px')}>
                                  <div style={S('display:flex;align-items:center;gap:7px')}>
                                    <span style={S('font:700 8.5px/1 Archivo;letter-spacing:0.12em;color:var(--faint)')}>{label.toUpperCase()}</span>
                                    <span style={{ padding: '1px 6px', font: '600 8px/1 Archivo', border: `1px solid ${tc2(paper.type)}`, color: tc2(paper.type) }}>{type.toUpperCase()}</span>
                                  </div>
                                  <div style={S('font:600 11px/1.45 Archivo;color:var(--dim)')}>{caption}</div>
                                  <div style={S('font:500 9.5px/1 Archivo;color:var(--faint)')}>{paper.title.length > 48 ? paper.title.slice(0, 48) + '…' : paper.title} · {paper.year}</div>
                                </div>
                              </Box>
                            ))}
                          </div>
                        );
                      })()}

                    </div>
                  );

                  if (!sel) return <div style={S('display:flex;flex:1;min-height:0')}>{trackList}</div>;

                  const detailPanel = (
                    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--s1)', overflow: 'hidden', borderLeft: '1px solid var(--rule2)', animation: 'slideInRight 0.25s cubic-bezier(0.22,1,0.36,1) both' }}>
                      <div key={sel._idx} style={S('flex:1;overflow-y:auto')}>
                        {/* Panel header */}
                        <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--rule2)', display: 'flex', alignItems: 'center', gap: 8, background: 'var(--bg)', position: 'sticky', top: 0, zIndex: 2 }}>
                          <div style={{ width: 6, height: 6, borderRadius: '50%', background: tc2(sel.type), flexShrink: 0 }} />
                          <span style={S('font:700 11px/1 Archivo;color:var(--ink);flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap')}>{sel.type} · {sel.year}</span>
                          <Box css="font-size:11px;color:var(--faint);cursor:pointer;padding:3px 8px;border:1px solid var(--rule)" hover="color:var(--ink);border-color:var(--dim)" onClick={() => v.setOrganizeSelected(null)}>✕</Box>
                        </div>

                        <div style={S('padding:16px;display:flex;flex-direction:column;gap:0')}>
                          {/* Score bar */}
                          <div style={S('display:flex;align-items:center;gap:8px;padding-bottom:14px;border-bottom:1px solid var(--rule)')}>
                            <span style={{ padding: '2px 8px', font: '700 9px/1 Archivo', border: `1px solid ${tc2(sel.type)}`, color: tc2(sel.type), background: `${tc2(sel.type)}15` }}>{sel.type}</span>
                            <div style={S('flex:1;height:3px;background:var(--rule);overflow:hidden')}>
                              <div style={{ width: `${sel.relevance}%`, height: '100%', background: 'var(--ok)' }} />
                            </div>
                            <span style={S('font:700 11px/1 var(--mono);color:var(--ok);flex-shrink:0')}>{sel.relevance}/100</span>
                          </div>

                          {/* Title + journal */}
                          <div style={S('padding:14px 0;border-bottom:1px solid var(--rule)')}>
                            <div style={S('font:700 13px/1.45 Archivo;letter-spacing:-0.01em;color:var(--ink);margin-bottom:6px')}>{sel.title}</div>
                            <div style={S('font:500 10px/1.4 Archivo;color:var(--faint)')}>{sel.journal}</div>
                          </div>

                          {/* Figures */}
                          {(PAPER_FIGURES[sel._idx] || []).length > 0 && (
                            <div style={S('padding:14px 0;border-bottom:1px solid var(--rule)')}>
                              <div style={S('font:700 8.5px/1 Archivo;letter-spacing:0.14em;color:var(--faint);margin-bottom:10px')}>FIGURES</div>
                              <div style={S('display:flex;flex-direction:column;gap:8px')}>
                                {(PAPER_FIGURES[sel._idx] || []).map((fig, fi) => (
                                  <div key={fi} style={S('border:1px solid var(--rule);overflow:hidden')}>
                                    <div style={S('background:var(--bg);padding:10px')}>{renderFigSVG(fig.type, sel._idx)}</div>
                                    <div style={S('padding:8px 10px;background:var(--s2)')}>
                                      <div style={S('font:700 8.5px/1 Archivo;color:var(--faint);letter-spacing:0.1em;margin-bottom:3px')}>{fig.label}</div>
                                      <div style={S('font:500 10px/1.45 Archivo;color:var(--dim)')}>{fig.caption}</div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Metadata table */}
                          <div style={S('padding:14px 0;border-bottom:1px solid var(--rule)')}>
                            <div style={S('font:700 8.5px/1 Archivo;letter-spacing:0.14em;color:var(--faint);margin-bottom:10px')}>EVIDENCE QUALITY</div>
                            <div style={S('display:flex;flex-direction:column;gap:0')}>
                              {[['Design', sel.designTier],['Appraisal', sel.appraisal],['GRADE', sel.grade],['Citations', sel.citations],['Funding', sel.funding],['Stat. rigor', sel.statRigor]].map(([lbl, val]) => (
                                <div key={lbl} style={S('display:flex;gap:8px;padding:5px 0;border-bottom:1px solid rgba(243,242,242,0.05)')}>
                                  <span style={S('font:500 9.5px/1.4 Archivo;color:var(--faint);width:72px;flex-shrink:0')}>{lbl}</span>
                                  <span style={S('font:600 9.5px/1.4 Archivo;color:var(--dim);flex:1')}>{val}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Flag */}
                          {sel.flag && (
                            <div style={S('padding:10px 12px;border:1px solid var(--acc);background:rgba(30,64,175,0.06);font-size:10px;color:var(--acc);line-height:1.6;margin-top:14px')}>⚠ {sel.flag}</div>
                          )}

                          {/* Excerpt */}
                          <div style={S('padding:14px 0;border-bottom:1px solid var(--rule)')}>
                            <div style={S('font:700 8.5px/1 Archivo;letter-spacing:0.14em;color:var(--faint);margin-bottom:10px')}>KEY EXCERPT</div>
                            <div style={S('border-left:2px solid var(--acc);padding:8px 12px;background:rgba(30,64,175,0.06);font:400 11px/1.75 Archivo;color:var(--dim);font-style:italic')}>{sel.excerpt}</div>
                            <div style={S('font:600 9px/1 var(--mono);color:var(--faint);margin-top:7px;letter-spacing:0.04em')}>{sel.excerptSrc}</div>
                          </div>

                          {/* Artifacts */}
                          <div style={S('padding:14px 0')}>
                            <div style={S('font:700 8.5px/1 Archivo;letter-spacing:0.14em;color:var(--faint);margin-bottom:10px')}>ARTIFACTS</div>
                            <div style={S('display:flex;gap:5px;flex-wrap:wrap')}>
                              {ALL_ARTIFACTS.map((a) => {
                                const active = sel.artifacts.includes(a);
                                return <span key={a} style={{ padding: '3px 10px', font: '600 9.5px/1 Archivo', border: '1px solid', borderColor: active ? ART_COLORS[a] : 'var(--rule)', color: active ? ART_COLORS[a] : 'var(--faint)', background: active ? `${ART_COLORS[a]}15` : 'transparent' }}>{a}</span>;
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );

                  return (
                    <div style={S('display:flex;flex:1;min-height:0')}>
                      <ResizableSplit left={trackList} right={detailPanel} defaultLeftPct={62} minPct={30} maxPct={78} />
                    </div>
                  );
                })()}

                {/* ══ STICKY FOOTER ══ */}
                {(() => {
                  const accepted = RESEARCH_PAPERS.map((p, i) => ({ ...p, _idx: i })).filter((p) => v.acceptedPapers[p._idx]);
                  const totalEx = accepted.length + v.customExcerpts.length;
                  const readiness = ALL_ARTIFACTS.map((a) => {
                    const cur = accepted.filter((p) => p.artifacts.includes(a)).length;
                    const tgt = ARTIFACT_TARGETS[a].target;
                    return { a, cur, tgt, ok: cur >= tgt };
                  });
                  const allReady = readiness.every((r) => r.ok);
                  return (
                    <div style={S('flex:none;border-top:2px solid var(--rule2);background:var(--bg);padding:14px 40px;display:flex;align-items:center;gap:14px')}>
                      {/* readiness pills */}
                      <div style={S('display:flex;align-items:center;gap:8px;flex:1;flex-wrap:wrap')}>
                        {readiness.map(({ a, cur, tgt, ok }) => (
                          <div key={a} style={S(`display:flex;align-items:center;gap:5px;padding:5px 10px;border:1px solid ${ok ? 'var(--ok)' : 'var(--rule2)'};background:${ok ? 'rgba(22,101,52,0.1)' : 'var(--s2)'}`)}>
                            <div style={{ width: 6, height: 6, borderRadius: '50%', background: ok ? 'var(--ok)' : 'var(--faint)' }} />
                            <span style={{ font: '600 10px/1 Archivo', color: ok ? 'var(--ok)' : 'var(--faint)' }}>{a}</span>
                            <span style={{ font: '500 10px/1 var(--mono)', color: ok ? 'var(--ok)' : 'var(--dim)' }}>{cur}/{tgt}</span>
                          </div>
                        ))}
                        <span style={S('font:500 11px/1 Archivo;color:var(--faint);margin-left:4px')}>{totalEx} excerpts · {accepted.length} papers</span>
                      </div>
                      {/* CTA */}
                      <Box
                        css={`padding:11px 24px;font:700 12px/1 Archivo;cursor:pointer;background:${allReady ? 'var(--acc)' : 'var(--s2)'};color:${allReady ? '#fff' : 'var(--ink)'};border:1px solid ${allReady ? 'var(--acc)' : 'var(--rule2)'};white-space:nowrap;transition:background 0.15s`}
                        hover={allReady ? 'background:var(--acc)' : 'border-color:var(--dim)'}
                        onClick={v.openMAReview}
                      >
                        Run Medical Affairs Review {allReady ? '→' : '⚠'}
                      </Box>
                    </div>
                  );
                })()}

                {/* ══ MA REVIEW READINESS MODAL ══ */}
                {v.maReviewModal && (() => {
                  const accepted = RESEARCH_PAPERS.map((p, i) => ({ ...p, _idx: i })).filter((p) => v.acceptedPapers[p._idx]);
                  const readiness = ALL_ARTIFACTS.map((a) => {
                    const cur = accepted.filter((p) => p.artifacts.includes(a)).length;
                    const tgt = ARTIFACT_TARGETS[a].target;
                    return { a, label: ARTIFACT_TARGETS[a].label, cur, tgt, ok: cur >= tgt };
                  });
                  const notReady = readiness.filter((r) => !r.ok);
                  const allReady = notReady.length === 0;
                  return (
                    <div style={{ position: 'absolute', inset: 0, zIndex: 90, background: 'rgba(14,13,12,0.82)', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'rise 0.16s ease', backdropFilter: 'blur(3px)' }}
                      onClick={(e) => { if (e.target === e.currentTarget) v.closeMAReview(); }}>
                      <div style={{ width: 520, background: 'var(--s1)', border: '1px solid var(--rule2)', display: 'flex', flexDirection: 'column', animation: 'fadeUp 0.22s cubic-bezier(0.22,1,0.36,1) both' }}>

                        {/* Header */}
                        <div style={S('padding:22px 24px 18px;display:flex;align-items:flex-start;justify-content:space-between;border-bottom:1px solid var(--rule)')}>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                              <div style={{ width: 10, height: 10, borderRadius: '50%', background: allReady ? 'var(--ok)' : 'var(--warn)', flexShrink: 0, animation: allReady ? '' : 'puls 1.2s infinite' }} />
                              <span style={S(`font:800 16px/1 Archivo;letter-spacing:-0.02em;color:var(--ink)`)}>{allReady ? 'Evidence base looks good' : 'Some artifacts aren\'t ready yet'}</span>
                            </div>
                            <div style={S('font:400 12px/1.6 Archivo;color:var(--faint);max-width:400px')}>
                              {allReady
                                ? 'All artifacts have enough accepted research behind them. You\'re ready to run the Medical Affairs review.'
                                : 'The following artifacts don\'t have enough accepted research behind them yet:'}
                            </div>
                          </div>
                          <Box css="width:26px;height:26px;border:1px solid var(--rule2);display:grid;place-items:center;cursor:pointer;font-size:12px;color:var(--faint);flex-shrink:0;margin-left:12px" hover="color:var(--ink);border-color:var(--dim)" onClick={v.closeMAReview}>✕</Box>
                        </div>

                        {/* Artifact readiness list */}
                        <div style={S('padding:20px 24px;display:flex;flex-direction:column;gap:0')}>
                          {notReady.length > 0 && (
                            <div style={S('margin-bottom:18px')}>
                              {notReady.map(({ a, label, cur, tgt }) => (
                                <div key={a} style={S('display:flex;align-items:center;gap:12px;padding:9px 0;border-bottom:1px solid var(--rule)')}>
                                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--acc)', flexShrink: 0 }} />
                                  <span style={S('font:600 13px/1 Archivo;color:var(--acc);flex:1')}>{label}</span>
                                  <div style={S('display:flex;align-items:center;gap:8px')}>
                                    {/* mini progress bar */}
                                    <div style={{ width: 80, height: 4, background: 'var(--rule2)', overflow: 'hidden' }}>
                                      <div style={{ width: `${(cur / tgt) * 100}%`, height: '100%', background: 'var(--acc)', transition: 'width 0.4s ease' }} />
                                    </div>
                                    <span style={S('font:700 12px/1 var(--mono);color:var(--acc);white-space:nowrap')}>{cur}/{tgt}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Ready artifacts */}
                          <div style={S('display:flex;flex-direction:column;gap:0')}>
                            {readiness.filter((r) => r.ok).map(({ a, label, cur, tgt }) => (
                              <div key={a} style={S('display:flex;align-items:center;gap:12px;padding:9px 0;border-bottom:1px solid var(--rule)')}>
                                <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--ok)', flexShrink: 0 }} />
                                <span style={S('font:600 13px/1 Archivo;color:var(--dim);flex:1')}>{label}</span>
                                <div style={S('display:flex;align-items:center;gap:8px')}>
                                  <div style={{ width: 80, height: 4, background: 'var(--rule2)', overflow: 'hidden' }}>
                                    <div style={{ width: '100%', height: '100%', background: 'var(--ok)' }} />
                                  </div>
                                  <span style={S('font:700 12px/1 var(--mono);color:var(--ok);white-space:nowrap')}>{cur}/{tgt}</span>
                                </div>
                              </div>
                            ))}
                          </div>

                          {notReady.length > 0 && (
                            <div style={S('margin-top:16px;font:400 12px/1.65 Archivo;color:var(--faint)')}>
                              You can go back and accept more excerpts for these artifacts, or finalize anyway if you're satisfied with what's there.
                            </div>
                          )}
                        </div>

                        {/* Footer buttons */}
                        <div style={S('padding:16px 24px;border-top:1px solid var(--rule);display:flex;align-items:center;justify-content:flex-end;gap:10px')}>
                          <Box css="padding:10px 22px;font:600 12px/1 Archivo;border:1px solid var(--rule2);color:var(--dim);cursor:pointer" hover="border-color:var(--ink);color:var(--ink)" onClick={v.closeMAReview}>Go back</Box>
                          <Box
                            css="padding:10px 28px;font:700 12px/1 Archivo;background:var(--acc);color:#fff;cursor:pointer;border:1px solid var(--acc)"
                            hover="background:var(--acc)"
                            onClick={() => { v.closeMAReview(); this.go('med-review'); }}
                          >
                            {allReady ? 'Run review →' : 'Finalize anyway →'}
                          </Box>
                        </div>

                      </div>
                    </div>
                  );
                })()}

                {/* ══ ADD EXCERPT MODAL ══ */}
                {v.addExcerptModal && (
                  <div style={{ position: 'absolute', inset: 0, zIndex: 80, background: 'rgba(14,13,12,0.78)', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'rise 0.16s ease', backdropFilter: 'blur(2px)' }}
                    onClick={(e) => { if (e.target === e.currentTarget) v.closeAddExcerpt(); }}>
                    <div style={{ width: 560, background: 'var(--s1)', border: '1px solid var(--rule2)', display: 'flex', flexDirection: 'column', animation: 'fadeUp 0.22s cubic-bezier(0.22,1,0.36,1) both', maxHeight: '90vh', overflow: 'hidden' }}>

                      <div style={S('padding:22px 26px 18px;display:flex;align-items:center;justify-content:space-between;border-bottom:2px solid var(--rule2)')}>
                        <div>
                          <div style={S('font:800 17px/1 Archivo;letter-spacing:-0.02em;color:var(--ink);margin-bottom:4px')}>Add an excerpt</div>
                          <div style={S('font:400 11px/1 Archivo;color:var(--faint)')}>Paste a key quote from a paper in your evidence base</div>
                        </div>
                        <Box css="width:28px;height:28px;border:1px solid var(--rule2);display:grid;place-items:center;cursor:pointer;font-size:13px;color:var(--faint);flex-shrink:0" hover="border-color:var(--dim);color:var(--ink)" onClick={v.closeAddExcerpt}>✕</Box>
                      </div>

                      <div style={S('padding:22px 26px;display:flex;flex-direction:column;gap:20px;overflow-y:auto')}>
                        {/* Textarea */}
                        <div>
                          <div style={S('font:700 9.5px/1 Archivo;letter-spacing:0.12em;color:var(--faint);margin-bottom:8px')}>EXCERPT TEXT</div>
                          <textarea rows={5} autoFocus
                            style={{ width: '100%', background: 'var(--bg)', border: '1px solid var(--acc)', color: 'var(--ink)', padding: '13px 14px', fontSize: 13, lineHeight: 1.65, resize: 'vertical', outline: 'none', fontFamily: 'Archivo,sans-serif', boxSizing: 'border-box', transition: 'border-color 0.15s' }}
                            placeholder="Paste or type the excerpt..."
                            value={v.excerptModalText}
                            onChange={(e) => v.setExcerptModalText(e.target.value)}
                          />
                          {v.excerptModalText.trim().length > 0 && (
                            <div style={S('margin-top:6px;font:500 10px/1 Archivo;color:var(--faint)')}>
                              {v.excerptModalText.trim().split(' ').length} words
                            </div>
                          )}
                        </div>

                        {/* Artifacts */}
                        <div>
                          <div style={S('font:700 9.5px/1 Archivo;letter-spacing:0.12em;color:var(--faint);margin-bottom:10px')}>USED IN ARTIFACTS</div>
                          <div style={S('display:flex;gap:8px;flex-wrap:wrap')}>
                            {ALL_ARTIFACTS.map((a) => {
                              const on = v.excerptModalArtifacts[a];
                              const c = ART_COLORS[a];
                              return (
                                <Box key={a}
                                  css={`padding:7px 18px;border-radius:999px;border:1px solid ${on ? c : 'var(--rule)'};background:${on ? `${c}20` : 'transparent'};color:${on ? c : 'var(--faint)'};font:600 12px/1 Archivo;cursor:pointer;transition:all 0.15s`}
                                  hover={!on ? `border-color:${c};color:${c}` : ''}
                                  onClick={() => v.toggleExcerptModalArtifact(a)}
                                >{a}</Box>
                              );
                            })}
                          </div>
                        </div>

                        {/* Tracks */}
                        <div>
                          <div style={S('font:700 9.5px/1 Archivo;letter-spacing:0.12em;color:var(--faint);margin-bottom:10px')}>RELEVANT TRACKS</div>
                          <div style={S('display:flex;gap:7px;flex-wrap:wrap')}>
                            {CONTENT_TRACKS.map((t) => {
                              const on = !!v.excerptModalTracks[t.id];
                              return (
                                <Box key={t.id}
                                  css={`padding:7px 14px;border-radius:999px;border:1px solid ${on ? t.color : 'var(--rule)'};background:${on ? `${t.color}20` : 'transparent'};color:${on ? t.color : 'var(--faint)'};font:600 11px/1 Archivo;cursor:pointer;transition:all 0.15s`}
                                  hover={!on ? `border-color:${t.color};color:${t.color}` : ''}
                                  onClick={() => v.toggleExcerptModalTrack(t.id)}
                                >{t.label}</Box>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      <div style={S('padding:16px 26px;border-top:1px solid var(--rule2);display:flex;align-items:center;justify-content:space-between')}>
                        <Box css="padding:9px 18px;font:600 11px/1 Archivo;border:1px solid var(--rule);color:var(--faint);cursor:pointer" hover="color:var(--ink)" onClick={v.closeAddExcerpt}>Cancel</Box>
                        <Box
                          css={`padding:10px 28px;font:700 12px/1 Archivo;cursor:${v.excerptModalText.trim() ? 'pointer' : 'default'};background:${v.excerptModalText.trim() ? 'var(--acc)' : 'var(--s2)'};color:${v.excerptModalText.trim() ? '#fff' : 'var(--faint)'};border:1px solid ${v.excerptModalText.trim() ? 'var(--acc)' : 'var(--rule)'};transition:all 0.15s`}
                          hover={v.excerptModalText.trim() ? 'background:var(--acc)' : ''}
                          onClick={v.excerptModalText.trim() ? v.submitExcerpt : undefined}
                        >Add excerpt</Box>
                      </div>

                    </div>
                  </div>
                )}

              </div>}
            />
          );
          })()}

          {/* ============ MED REVIEW ============ */}
          {v.isMedReview && (() => {
            const rN = v.reviewN;
            const isDone = rN > REVIEW_AGENT_MSGS.length;
            const visibleMsgs = REVIEW_AGENT_MSGS.slice(0, rN);
            const accepted = RESEARCH_PAPERS.map((p, i) => ({ ...p, _idx: i })).filter((p) => v.acceptedPapers[p._idx]);

            const renderMD = (text) => {
              const lines = text.split('\n\n');
              return lines.map((line, li) => {
                const parts = line.split(/(\*\*[^*]+\*\*)/g);
                return (
                  <p key={li} style={{ margin: '0 0 8px 0', lineHeight: 1.7 }}>
                    {parts.map((p2, pi) =>
                      p2.startsWith('**') && p2.endsWith('**')
                        ? <strong key={pi} style={{ color: 'var(--ink)' }}>{p2.slice(2, -2)}</strong>
                        : <span key={pi}>{p2}</span>
                    )}
                  </p>
                );
              });
            };

            const QualityRing = ({ score, color: _color }) => {
              const r = 18; const circ = 2 * Math.PI * r;
              const filled = (score / 100) * circ;
              const qColor = score >= 80 ? 'var(--ok)' : score >= 50 ? 'var(--warn)' : 'var(--acc)';
              return (
                <svg width="44" height="44" viewBox="0 0 44 44" style={{ flexShrink: 0 }}>
                  <circle cx="22" cy="22" r={r} fill="none" stroke="var(--rule2)" strokeWidth="3" />
                  <circle cx="22" cy="22" r={r} fill="none" stroke={qColor} strokeWidth="3"
                    strokeDasharray={`${filled} ${circ - filled}`} strokeLinecap="round"
                    transform="rotate(-90 22 22)" style={{ transition: 'stroke-dasharray 0.6s ease' }} />
                  <text x="22" y="26" textAnchor="middle" fontSize="9" fontWeight="700" fill={qColor} fontFamily="Archivo">{score}</text>
                </svg>
              );
            };

            const leftPanel = (<div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative', animation: 'fadeUp 0.32s cubic-bezier(0.22,1,0.36,1) both' }}>

                  {/* Status banner */}
                  <div style={S(`display:flex;align-items:center;gap:10px;padding:11px 20px;border-bottom:1px solid var(--rule);flex:none;background:${isDone ? 'rgba(22,101,52,0.08)' : 'rgba(30,64,175,0.06)'}`)}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: isDone ? 'var(--ok)' : 'var(--acc)', animation: isDone ? '' : 'puls 1s infinite' }} />
                    <div style={S(`font:700 10px/1 Archivo;letter-spacing:0.14em;color:${isDone ? 'var(--ok)' : 'var(--acc)'}`)}>
                      {isDone ? 'REVIEW COMPLETE — READY FOR CONTENT GENERATION' : 'MA REVIEW AGENT · RUNNING…'}
                    </div>
                    {!isDone && <div style={S('margin-left:auto;font:600 10px/1 var(--mono);color:var(--faint)')}>{Math.round((rN / (REVIEW_AGENT_MSGS.length + 1)) * 100)}%</div>}
                  </div>

                  {/* Thread header */}
                  <div style={S('padding:14px 20px;border-bottom:1px solid var(--rule);flex:none')}>
                    <div style={S('font:600 9.5px/1 Archivo;letter-spacing:0.14em;color:var(--faint);margin-bottom:4px')}>MEDICAL AFFAIRS REVIEW AGENT</div>
                    <div style={S('font:700 14px/1 Archivo;letter-spacing:-0.01em;color:var(--ink)')}>Evidence Quality & Artifact Readiness</div>
                  </div>

                  {/* Messages */}
                  <div style={S('flex:1;overflow-y:auto;padding:20px')}>
                    {visibleMsgs.map((msg, i) => (
                      <div key={i} style={{ ...S('display:flex;gap:10px;margin-bottom:22px;animation:rise 0.3s ease both'), animationDelay: `${i * 0.05}s` }}>
                        <div style={{ width: 28, height: 28, flexShrink: 0, background: msg.color || 'var(--acc)', display: 'grid', placeItems: 'center', font: '700 10px/1 Archivo', color: msg.color ? '#000' : '#fff', fontSize: msg.color ? 11 : 10 }}>
                          {msg.artifact ? msg.artifact[0] : 'AI'}
                        </div>
                        <div style={S('max-width:88%;flex:1')}>
                          {msg.artifact && (
                            <div style={{ ...S('font:700 9.5px/1 Archivo;letter-spacing:0.12em;margin-bottom:6px'), color: msg.color }}>
                              {msg.artifact.toUpperCase()} · ANALYSIS
                            </div>
                          )}
                          <div style={{ background: 'var(--s1)', border: '1px solid var(--rule)', borderLeft: `2px solid ${msg.color || 'var(--acc)'}`, padding: '12px 14px', fontSize: 12.5, color: 'var(--dim)' }}>
                            {renderMD(msg.text)}
                            {/* Sources */}
                            {msg.sources && msg.sources.length > 0 && (
                              <div style={S('display:flex;gap:5px;flex-wrap:wrap;margin-top:10px;padding-top:10px;border-top:1px solid var(--rule)')}>
                                <span style={S('font:600 9px/1 Archivo;letter-spacing:0.1em;color:var(--faint);margin-right:2px')}>SOURCES</span>
                                {msg.sources.map((s) => (
                                  <span key={s} style={S('padding:2px 8px;border:1px solid var(--rule2);font:600 9.5px/1 Archivo;color:var(--dim);cursor:pointer')}>{s}</span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Thinking indicator */}
                    {!isDone && rN > 0 && (
                      <div style={S('display:flex;gap:10px;margin-bottom:20px;animation:rise 0.25s ease')}>
                        <div style={S('width:28px;height:28px;flex:none;display:grid;place-items:center;font:700 10px/1 Archivo;background:var(--acc);color:#fff')}>AI</div>
                        <div style={S('background:var(--s1);border:1px solid var(--rule);border-left:2px solid var(--acc);padding:12px 14px')}>
                          <div style={S('font:600 10px/1 Archivo;letter-spacing:0.1em;color:var(--acc);margin-bottom:8px')}>
                            {rN <= 1 ? 'LOADING EVIDENCE BASE…' : `ANALYSING ${REVIEW_AGENT_MSGS[rN]?.artifact?.toUpperCase() || 'EVIDENCE'}…`}
                          </div>
                          <div style={S('display:flex;gap:5px')}>
                            {[0,1,2].map((d) => <div key={d} style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--acc)', animation: 'dotBounce 1.3s ease-in-out infinite', animationDelay: `${d * 0.18}s` }} />)}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Done summary bubble */}
                    {isDone && (
                      <div style={S('display:flex;gap:10px;margin-bottom:20px;animation:rise 0.3s ease')}>
                        <div style={S('width:28px;height:28px;flex:none;display:grid;place-items:center;font:700 10px/1 Archivo;background:var(--ok);color:#fff')}>AI</div>
                        <div>
                          <div style={S('font:600 9.5px/1 Archivo;letter-spacing:0.12em;color:var(--ok);margin-bottom:6px')}>MA REVIEW AGENT · COMPLETE</div>
                          <div style={S('background:var(--s1);border:1px solid var(--rule);border-left:2px solid var(--ok);padding:12px 14px;font-size:12.5px;color:var(--dim);line-height:1.65')}>
                            Review complete. Overall quality <strong style={S('color:var(--ink)')}>78/100</strong>. Download the evidence brief below or proceed directly to content generation.
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Download CTA */}
                  {isDone && (
                    <div style={S('padding:14px 20px;border-top:1px solid var(--rule);flex:none;display:flex;flex-direction:column;gap:8px')}>
                      <div style={S('display:flex;gap:8px')}>
                        <Box css="flex:1;padding:10px 0;text-align:center;font:700 11px/1 Archivo;border:1px solid var(--rule2);color:var(--dim);cursor:pointer" hover="border-color:var(--ink);color:var(--ink)">
                          ↓ Download research JSON
                        </Box>
                        <Box css="flex:1;padding:10px 0;text-align:center;font:700 11px/1 Archivo;border:1px solid var(--rule2);color:var(--dim);cursor:pointer" hover="border-color:var(--ink);color:var(--ink)">
                          ↓ Download evidence brief
                        </Box>
                      </div>
                      {v.sciSubmitted ? (
                        <div style={S('display:flex;align-items:center;justify-content:center;gap:8px;padding:10px;background:rgba(22,101,52,0.1);border:1px solid var(--ok);font:700 11px/1 Archivo;color:var(--ok)')}>
                          <span>✓</span> Sent for Scientific Review — awaiting Dr. Arjun Mehta
                        </div>
                      ) : (
                        <Box css="padding:12px 0;text-align:center;font:700 12px/1 Archivo;background:var(--ok);color:#fff;cursor:pointer" hover="opacity:0.85" onClick={v.submitToSci}>
                          Submit for Scientific Review →
                        </Box>
                      )}
                    </div>
                  )}
                </div>

            ); /* end leftPanel */

            const rightPanel = (<div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', animation: 'slideInRight 0.5s cubic-bezier(0.22,1,0.36,1) both', animationDelay: '0.08s' }}>

                  {/* Header + tabs */}
                  <div style={S('border-bottom:1px solid var(--rule2);flex:none;background:var(--bg)')}>
                    <div style={S('padding:12px 20px 0;display:flex;align-items:center;gap:10px')}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: isDone ? 'var(--ok)' : 'var(--warn)', animation: isDone ? '' : 'puls 1.1s infinite' }} />
                      <div style={S('font:700 12px/1 Archivo;letter-spacing:-0.01em')}>Evidence Review</div>
                      <span style={S('font:600 10px/1 var(--mono);color:var(--faint)')}>{accepted.length} papers · {visibleMsgs.filter(m => m.artifact).length} of 5 analysed</span>
                    </div>
                    <div style={S('display:flex;gap:0;padding:0 20px;margin-top:10px')}>
                      {[['artifacts','Artifact Readiness'],['papers','Papers & Excerpts']].map(([tid, tlabel]) => (
                        <div key={tid} onClick={() => v.setMedReviewTab(tid)}
                          style={{ padding: '6px 14px 10px', font: '600 11px/1 Archivo', cursor: 'pointer', color: v.medReviewTab === tid ? 'var(--ink)' : 'var(--faint)', borderBottom: v.medReviewTab === tid ? '2px solid var(--acc)' : '2px solid transparent', transition: 'color 0.15s, border-color 0.15s', marginBottom: -1 }}>
                          {tlabel}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ── ARTIFACTS TAB ── */}
                  {v.medReviewTab === 'artifacts' && <div key="artifacts" style={S('flex:1;overflow-y:auto;padding:16px 18px;display:flex;flex-direction:column;gap:10px')}>
                    {REVIEW_AGENT_MSGS.filter(m => m.artifact).map((msg, i) => {
                      const visible = rN > msg.step - 1;
                      const cur = accepted.filter((p) => p.artifacts.includes(msg.artifact)).length;
                      const tgt = ARTIFACT_TARGETS[msg.artifact]?.target || 5;
                      if (!visible) return (
                        <div key={i} style={S('border:1px solid var(--rule);padding:14px 16px;opacity:0.35;display:flex;align-items:center;gap:10px')}>
                          <div style={{ width: 8, height: 8, borderRadius: '50%', border: '1px solid var(--faint)' }} />
                          <span style={S('font:600 11px/1 Archivo;color:var(--faint)')}>{ARTIFACT_TARGETS[msg.artifact]?.label}</span>
                          <span style={S('font:500 10px/1 Archivo;color:var(--faint);margin-left:auto')}>pending…</span>
                        </div>
                      );
                      const qColor = msg.quality >= 80 ? 'var(--ok)' : msg.quality >= 50 ? 'var(--warn)' : 'var(--acc)';
                      const qLabel = msg.quality >= 80 ? 'HIGH' : msg.quality >= 50 ? 'MODERATE' : 'LOW';
                      return (
                        <div key={i} style={{ border: `1px solid ${msg.color}44`, borderLeft: `3px solid ${msg.color}`, background: 'var(--bg)', animation: 'cardIn 0.3s ease both' }}>
                          {/* Card header */}
                          <div style={S('padding:12px 14px;display:flex;align-items:center;gap:10px;border-bottom:1px solid var(--rule)')}>
                            <QualityRing score={msg.quality} color={msg.color} />
                            <div style={S('flex:1;min-width:0')}>
                              <div style={{ font: '700 12.5px/1 Archivo', color: msg.color, marginBottom: 4 }}>{ARTIFACT_TARGETS[msg.artifact]?.label}</div>
                              <div style={S('font:500 10px/1 Archivo;color:var(--faint)')}>Evidence quality: <span style={{ color: qColor, fontWeight: 700 }}>{qLabel}</span></div>
                            </div>
                            <div style={{ textAlign: 'right', flexShrink: 0 }}>
                              <div style={S('font:700 12px/1 var(--mono);color:var(--dim)')}>{cur}/{tgt}</div>
                              <div style={S('font:500 9px/1 Archivo;color:var(--faint);margin-top:3px')}>excerpts</div>
                            </div>
                          </div>
                          {/* Progress bar */}
                          <div style={S('height:3px;background:var(--rule2)')}>
                            <div style={{ width: `${Math.min(100, (cur / tgt) * 100)}%`, height: '100%', background: qColor, transition: 'width 0.5s ease' }} />
                          </div>
                          {/* Papers used */}
                          <div style={S('padding:10px 14px;display:flex;flex-direction:column;gap:6px')}>
                            <div style={S('font:700 8.5px/1 Archivo;letter-spacing:0.12em;color:var(--faint);margin-bottom:2px')}>SOURCES USED</div>
                            {accepted.filter(p => p.artifacts.includes(msg.artifact)).slice(0, 3).map((p) => (
                              <div key={p._idx} style={S('display:flex;align-items:center;gap:7px')}>
                                <div style={{ width: 5, height: 5, borderRadius: '50%', background: msg.color, flexShrink: 0 }} />
                                <span style={S('font:500 10.5px/1.4 Archivo;color:var(--dim);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1')}>{p.title}</span>
                                <span style={S('font:500 9px/1 var(--mono);color:var(--faint);flex-shrink:0')}>{p.year}</span>
                              </div>
                            ))}
                            {accepted.filter(p => p.artifacts.includes(msg.artifact)).length === 0 && (
                              <div style={S('font:500 10.5px/1 Archivo;color:var(--faint)')}>No papers accepted for this artifact yet.</div>
                            )}
                          </div>
                          {/* Gap indicator */}
                          {msg.quality < 80 && (
                            <div style={S('margin:0 14px 12px;padding:7px 10px;border:1px solid var(--warn);background:rgba(146,64,14,0.07);font:500 10.5px/1.5 Archivo;color:var(--warn)')}>
                              ⚠ Gap detected — see chat for recommendations
                            </div>
                          )}
                        </div>
                      );
                    })}

                    {/* Overall score card (visible when done) */}
                    {isDone && (
                      <div style={S('border:1px solid var(--rule2);background:var(--s2);padding:16px;display:flex;align-items:center;gap:14px;animation:fadeUp 0.3s ease both')}>
                        <QualityRing score={78} color="var(--acc)" />
                        <div>
                          <div style={S('font:700 13px/1 Archivo;color:var(--ink);margin-bottom:5px')}>Overall evidence quality</div>
                          <div style={S('font:500 11px/1.5 Archivo;color:var(--faint)')}>4 of 5 artifacts ready · 1 needs more excerpts</div>
                        </div>
                      </div>
                    )}
                  </div>}

                  {/* ── PAPERS TAB ── */}
                  {v.medReviewTab === 'papers' && (() => {
                    const sel = v.medReviewPaper;
                    const trackColor = (p) => {
                      const tc = CONTENT_TRACKS.find(t => t.paperTracks.includes(p.track));
                      return tc ? tc.color : 'var(--dim)';
                    };
                    return (
                      <div key="papers" style={S('flex:1;display:flex;overflow:hidden')}>

                        {/* Paper list */}
                        <div style={{ width: sel ? '42%' : '100%', flexShrink: 0, overflowY: 'auto', borderRight: sel ? '1px solid var(--rule2)' : 'none', transition: 'width 0.25s ease', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                          <div style={S('font:700 8.5px/1 Archivo;letter-spacing:0.14em;color:var(--faint);margin-bottom:4px')}>{accepted.length} ACCEPTED PAPERS</div>
                          {accepted.length === 0 && (
                            <div style={S('font:500 12px/1.6 Archivo;color:var(--faint);padding:20px 0')}>No papers accepted yet. Go back to Research to accept papers.</div>
                          )}
                          {accepted.map((p, i) => {
                            const isSel = sel && sel._idx === p._idx;
                            const tc = CONTENT_TRACKS.find(t => t.paperTracks.includes(p.track));
                            const tColor = tc ? tc.color : 'var(--dim)';
                            return (
                              <div key={p._idx} onClick={() => v.setMedReviewPaper(isSel ? null : p)}
                                style={{ border: `1px solid ${isSel ? tColor + '88' : 'var(--rule)'}`, borderLeft: `3px solid ${tColor}`, background: isSel ? 'var(--s2)' : 'var(--bg)', padding: '10px 12px', cursor: 'pointer', animation: 'cardIn 0.25s ease both', animationDelay: `${i * 0.04}s`, transition: 'background 0.15s, border-color 0.15s' }}>
                                <div style={S('font:600 10.5px/1.4 Archivo;color:var(--ink);margin-bottom:5px')}>{p.title}</div>
                                <div style={S('display:flex;flex-wrap:wrap;gap:5px;align-items:center')}>
                                  <span style={{ padding: '1px 7px', border: `1px solid ${tColor}44`, font: '600 9px/1.6 Archivo', color: tColor }}>{p.track || 'Uncategorised'}</span>
                                  <span style={S('font:500 9.5px/1 var(--mono);color:var(--faint)')}>{p.journal} · {p.year}</span>
                                  {p.artifacts && p.artifacts.map(a => (
                                    <span key={a} style={{ padding: '1px 6px', background: 'var(--s2)', font: '600 9px/1.6 Archivo', color: 'var(--faint)' }}>{a}</span>
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Paper detail panel */}
                        {sel && (
                          <div key={sel._idx} style={{ flex: 1, minWidth: 0, overflowY: 'auto', padding: '16px 18px', animation: 'slideInRight 0.28s cubic-bezier(0.22,1,0.36,1) both' }}>
                            {/* Close */}
                            <div style={S('display:flex;align-items:flex-start;gap:8px;margin-bottom:12px')}>
                              <div style={{ flex: 1 }}>
                                <div style={{ font: '700 8.5px/1 Archivo', letterSpacing: '0.14em', color: trackColor(sel), marginBottom: 5 }}>{sel.track || 'UNCATEGORISED'}</div>
                                <div style={S('font:700 13px/1.45 Archivo;color:var(--ink)')}>{sel.title}</div>
                              </div>
                              <div onClick={() => v.setMedReviewPaper(null)} style={S('cursor:pointer;color:var(--faint);font-size:16px;padding:2px 4px;line-height:1')}>×</div>
                            </div>

                            {/* Meta row */}
                            <div style={S('display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px;padding-bottom:12px;border-bottom:1px solid var(--rule)')}>
                              <span style={S('padding:2px 8px;border:1px solid var(--rule2);font:600 9.5px/1.6 Archivo;color:var(--dim)')}>{sel.journal}</span>
                              <span style={S('padding:2px 8px;border:1px solid var(--rule2);font:600 9.5px/1.6 Archivo;color:var(--dim)')}>{sel.year}</span>
                              {sel.n && <span style={S('padding:2px 8px;border:1px solid var(--rule2);font:600 9.5px/1.6 Archivo;color:var(--dim)')}>n={sel.n.toLocaleString()}</span>}
                              {sel.phase && <span style={S('padding:2px 8px;border:1px solid var(--rule2);font:600 9.5px/1.6 Archivo;color:var(--dim)')}>{sel.phase}</span>}
                            </div>

                            {/* Excerpt */}
                            {sel.excerpt && (
                              <div style={S('margin-bottom:16px')}>
                                <div style={S('font:700 8.5px/1 Archivo;letter-spacing:0.14em;color:var(--faint);margin-bottom:8px')}>KEY EXCERPT</div>
                                <div style={S('border-left:2px solid var(--rule2);padding:8px 12px;font:400 12px/1.65 Archivo;color:var(--dim);font-style:italic')}>&ldquo;{sel.excerpt}&rdquo;</div>
                              </div>
                            )}

                            {/* Artifact pills */}
                            {sel.artifacts && sel.artifacts.length > 0 && (
                              <div style={S('margin-bottom:16px')}>
                                <div style={S('font:700 8.5px/1 Archivo;letter-spacing:0.14em;color:var(--faint);margin-bottom:8px')}>USED IN ARTIFACTS</div>
                                <div style={S('display:flex;flex-wrap:wrap;gap:6px')}>
                                  {sel.artifacts.map(a => {
                                    const am = REVIEW_AGENT_MSGS.find(m => m.artifact === a);
                                    const aColor = am ? am.color : 'var(--dim)';
                                    return <span key={a} style={{ padding: '3px 10px', border: `1px solid ${aColor}55`, font: '700 10px/1.6 Archivo', color: aColor }}>{a}</span>;
                                  })}
                                </div>
                              </div>
                            )}

                            {/* Figures */}
                            {PAPER_FIGURES[sel._idx] && PAPER_FIGURES[sel._idx].length > 0 && (
                              <div>
                                <div style={S('font:700 8.5px/1 Archivo;letter-spacing:0.14em;color:var(--faint);margin-bottom:10px')}>FIGURES</div>
                                <div style={S('display:flex;flex-direction:column;gap:10px')}>
                                  {PAPER_FIGURES[sel._idx].map((fig, fi) => (
                                    <div key={fi} style={S('border:1px solid var(--rule);padding:10px')}>
                                      <div style={S('font:700 9.5px/1 Archivo;color:var(--dim);margin-bottom:6px')}>{fig.label}</div>
                                      <div style={S('font:400 9.5px/1.5 Archivo;color:var(--faint);margin-bottom:8px')}>{fig.caption}</div>
                                      <div style={S('background:var(--s2);height:90px;display:grid;place-items:center;font:500 10px/1 Archivo;color:var(--faint)')}>[{fig.type.toUpperCase()} FIGURE]</div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })()}

            </div>); /* end rightPanel */

            return <ResizableSplit left={leftPanel} right={rightPanel} defaultLeftPct={46} />;
          })()}

          {/* ============ SCI DASHBOARD ============ */}
          {v.isSciDash && (() => {
            const deck = {
              topic: 'Type 2 Diabetes — GLP-1 RA landscape',
              product: 'Ozempic® (Semaglutide)',
              submittedBy: 'Mayank Gupta (Medical Affairs)',
              submittedAt: 'Today · 14:32',
              papers: 12,
              excerpts: 47,
              artifacts: 5,
              maQuality: 78,
              status: 'Awaiting scientific review',
            };
            return (
              <div style={S('padding:40px 48px;min-height:100%;animation:fadeUp 0.35s cubic-bezier(0.22,1,0.36,1) both')}>
                {/* Header */}
                <div style={S('display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:32px')}>
                  <div>
                    <div style={S('font:700 9.5px/1 Archivo;letter-spacing:0.16em;color:var(--ok);margin-bottom:10px')}>SCIENTIFIC REVIEW HUB</div>
                    <h1 style={S('font:800 28px/1 Archivo;letter-spacing:-0.03em;margin:0 0 8px')}>Welcome, Dr. Arjun Mehta</h1>
                    <div style={S('font:400 13.5px/1 Archivo;color:var(--dim)')}>Scientific Adviser · September 2026</div>
                  </div>
                  <div style={S('display:flex;align-items:center;gap:10px')}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--ok)', animation: 'puls 1.4s infinite' }} />
                    <span style={S('font:600 10px/1 Archivo;letter-spacing:0.1em;color:var(--ok)')}>1 DECK AWAITING REVIEW</span>
                  </div>
                </div>

                {/* Stats row */}
                <div style={S('display:grid;grid-template-columns:repeat(3,1fr);border:1px solid var(--rule2);margin-bottom:32px')}>
                  {[
                    { label: 'AWAITING REVIEW', value: '1', color: 'var(--warn)', delta: 'Submitted today' },
                    { label: 'APPROVED THIS MONTH', value: '3', color: 'var(--ok)', delta: '+1 vs August' },
                    { label: 'SENT BACK', value: '1', color: 'var(--acc)', delta: 'Avg 1.2 days to resubmit' },
                  ].map((s, i) => (
                    <div key={i} style={{ padding: '22px 28px', borderRight: i < 2 ? '1px solid var(--rule2)' : 'none', background: 'var(--s1)' }}>
                      <div style={{ font: '700 9px/1 Archivo', letterSpacing: '0.14em', color: s.color, marginBottom: 12 }}>{s.label}</div>
                      <div style={{ font: '800 36px/1 Archivo', letterSpacing: '-0.03em', marginBottom: 6 }}>{s.value}</div>
                      <div style={S('font:400 11.5px/1 Archivo;color:var(--faint)')}>{s.delta}</div>
                    </div>
                  ))}
                </div>

                {/* Pending deck card */}
                <div style={S('font:700 11px/1 Archivo;letter-spacing:0.1em;color:var(--faint);margin-bottom:14px')}>PENDING YOUR REVIEW</div>
                <div style={S('border:1px solid var(--rule2);border-left:3px solid var(--ok);background:var(--s1);animation:cardIn 0.4s ease both;animation-delay:0.1s')}>
                  {/* Deck header */}
                  <div style={S('padding:18px 24px;border-bottom:1px solid var(--rule);display:flex;align-items:flex-start;gap:16px')}>
                    <div style={{ flexShrink: 0, width: 44, height: 44, background: 'var(--ok)', display: 'grid', placeItems: 'center', font: '700 16px/1 Archivo', color: '#fff' }}>D</div>
                    <div style={S('flex:1;min-width:0')}>
                      <div style={S('font:800 16px/1.3 Archivo;letter-spacing:-0.01em;margin-bottom:5px')}>{deck.topic}</div>
                      <div style={S('font:500 12px/1 Archivo;color:var(--faint)')}>{deck.product}</div>
                    </div>
                    <div style={S('text-align:right;flex:none')}>
                      <div style={S('display:flex;align-items:center;gap:6px;justify-content:flex-end;margin-bottom:6px')}>
                        <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--warn)', animation: 'puls 1.2s infinite' }} />
                        <span style={S('font:700 10px/1 Archivo;letter-spacing:0.1em;color:var(--warn)')}>AWAITING REVIEW</span>
                      </div>
                      <div style={S('font:500 10.5px/1 Archivo;color:var(--faint)')}>{deck.submittedAt}</div>
                    </div>
                  </div>

                  {/* Metadata grid */}
                  <div style={S('display:grid;grid-template-columns:repeat(4,1fr);border-bottom:1px solid var(--rule)')}>
                    {[
                      { label: 'SUBMITTED BY', value: deck.submittedBy },
                      { label: 'PAPERS', value: `${deck.papers} accepted` },
                      { label: 'EXCERPTS', value: `${deck.excerpts} across 5 artifacts` },
                      { label: 'MA QUALITY SCORE', value: `${deck.maQuality}/100`, color: 'var(--warn)' },
                    ].map((m, i) => (
                      <div key={i} style={{ padding: '12px 18px', borderRight: i < 3 ? '1px solid var(--rule)' : 'none' }}>
                        <div style={S('font:600 9px/1 Archivo;letter-spacing:0.12em;color:var(--faint);margin-bottom:5px')}>{m.label}</div>
                        <div style={{ font: '600 12.5px/1 Archivo', color: m.color || 'var(--ink)' }}>{m.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Artifact pills */}
                  <div style={S('padding:12px 24px;border-bottom:1px solid var(--rule);display:flex;align-items:center;gap:8px;flex-wrap:wrap')}>
                    <span style={S('font:600 9px/1 Archivo;letter-spacing:0.12em;color:var(--faint);margin-right:4px')}>ARTIFACTS</span>
                    {[
                      { name: 'HCP Deck', q: 89, color: '#7eb8f7' },
                      { name: 'Blog', q: 100, color: '#fb923c' },
                      { name: 'Protocol', q: 74, color: '#4ade80' },
                      { name: 'Blurb ×5', q: 33, color: '#f97b7b' },
                      { name: 'Fact Sheet', q: 100, color: '#a78bfa' },
                    ].map((a) => (
                      <div key={a.name} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '4px 10px', border: `1px solid ${a.color}44`, background: `${a.color}0d` }}>
                        <div style={{ width: 5, height: 5, borderRadius: '50%', background: a.q >= 80 ? 'var(--ok)' : a.q >= 50 ? 'var(--warn)' : 'var(--acc)' }} />
                        <span style={{ font: '600 11px/1 Archivo', color: a.color }}>{a.name}</span>
                        <span style={S('font:500 10px/1 var(--mono);color:var(--faint)')}>{a.q}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div style={S('padding:16px 24px;display:flex;align-items:center;gap:10px')}>
                    <div style={S('flex:1;font:400 12px/1.5 Archivo;color:var(--faint)')}>All excerpts are approved by default. You only need to act on what you reject.</div>
                    <Box css="padding:12px 28px;background:var(--ok);color:#fff;font:700 13px/1 Archivo;cursor:pointer;white-space:nowrap" hover="opacity:0.85" onClick={() => this.go('sci-review')}>
                      Open for Review →
                    </Box>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* ============ SCI REVIEW ============ */}
          {v.isSciReview && (() => {
            const accepted = RESEARCH_PAPERS.map((p, i) => ({ ...p, _idx: i })).filter((_, i) => v.acceptedPapers[i] || i < 7);
            const comments = v.sciReviewComments;
            const rejectedCount = Object.values(comments).filter(c => c.rejected).length;
            const selPaper = v.sciSelectedPaper;

            const artifactStatus = ALL_ARTIFACTS.map(a => {
              const anyRejected = accepted.some((p) => {
                const key = `${p._idx}-0`;
                return (comments[key] || {}).rejected && p.artifacts && p.artifacts.includes(a);
              });
              const msg = REVIEW_AGENT_MSGS.find(m => m.artifact === a);
              return { name: a, ok: !anyRejected, color: msg ? msg.color : 'var(--dim)' };
            });

            const trackGroups = CONTENT_TRACKS.map(tc => ({
              ...tc,
              papers: accepted.filter(p => tc.paperTracks.includes(p.track)),
            })).filter(tc => tc.papers.length > 0);

            return (
              <div style={{ display: 'flex', height: '100%', overflow: 'hidden', animation: 'fadeUp 0.24s ease both' }}>

                {/* ═══ LEFT: Paper List ═══ */}
                <div style={{ width: selPaper ? 400 : '100%', flexShrink: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden', transition: 'width 0.32s cubic-bezier(0.22,1,0.36,1)', borderRight: selPaper ? '1px solid rgba(13,31,78,0.12)' : 'none', background: 'var(--s1)' }}>

                  {/* Header */}
                  <div style={{ padding: '18px 22px', borderBottom: '1px solid rgba(13,31,78,0.12)', flexShrink: 0, background: '#fff' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                      <div style={{ flex: 1 }}>
                        <h2 style={{ font: '800 20px/1 Archivo', letterSpacing: '-0.025em', color: '#0d1f4e', margin: '0 0 6px' }}>Scientific Review</h2>
                        <div style={{ font: '500 13px/1 Archivo', color: '#1e3460' }}>
                          {accepted.length} papers under review &middot;&nbsp;
                          {rejectedCount > 0
                            ? <span style={{ color: '#1e40af', fontWeight: 700 }}>{rejectedCount} rejected</span>
                            : <span style={{ color: '#166534', fontWeight: 700 }}>none rejected</span>}
                        </div>
                      </div>
                    </div>
                    {/* Artifact readiness pills */}
                    <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
                      {artifactStatus.map(a => (
                        <div key={a.name} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 11px', border: `1px solid ${a.ok ? 'rgba(22,101,52,0.4)' : 'rgba(30,64,175,0.4)'}`, background: a.ok ? 'rgba(22,101,52,0.08)' : 'rgba(30,64,175,0.06)', borderRadius: 99 }}>
                          <div style={{ width: 15, height: 15, borderRadius: '50%', background: a.ok ? '#166534' : '#1e40af', display: 'grid', placeItems: 'center', fontSize: 9, color: '#fff', fontWeight: 800 }}>{a.ok ? '✓' : '!'}</div>
                          <span style={{ font: '600 12.5px/1 Archivo', color: '#0d1f4e' }}>{a.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Scrollable paper list */}
                  <div style={{ flex: 1, overflowY: 'auto', padding: '20px 22px' }}>
                    <div style={{ font: '700 11px/1 Archivo', letterSpacing: '0.1em', color: '#1e3460', marginBottom: 16, textTransform: 'uppercase' }}>Papers — click to open full view</div>
                    {trackGroups.map((tc) => (
                      <div key={tc.id} style={{ marginBottom: 24 }}>
                        <div style={{ font: '800 12px/1 Archivo', letterSpacing: '0.08em', color: tc.color, marginBottom: 10, paddingBottom: 8, borderBottom: `2px solid ${tc.color}40`, textTransform: 'uppercase' }}>{tc.label}</div>
                        {tc.papers.map((paper) => {
                          const key = `${paper._idx}-0`;
                          const cmt = comments[key] || {};
                          const isRejected = cmt.rejected;
                          const isSel = selPaper && selPaper._idx === paper._idx;
                          const inlineCount = Object.entries(v.sciInlineComments).filter(([k]) => k.startsWith(`${paper._idx}-`)).flatMap(([, c]) => c).filter(c => !c.resolved).length;
                          return (
                            <div key={paper._idx} style={{ border: `1px solid ${isSel ? tc.color + '66' : 'rgba(13,31,78,0.12)'}`, borderLeft: `4px solid ${isRejected ? '#1e40af' : isSel ? tc.color : tc.color}`, background: isSel ? `${tc.color}0d` : '#fff', marginBottom: 10, borderRadius: '0 6px 6px 0', transition: 'all 0.15s', boxShadow: isSel ? `0 2px 12px ${tc.color}18` : 'none' }}>
                              {/* Clickable title row */}
                              <div style={{ padding: '14px 16px', cursor: 'pointer', display: 'flex', alignItems: 'flex-start', gap: 10 }}
                                onClick={() => v.setSciSelectedPaper(isSel ? null : paper)}>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                  <div style={{ font: '700 15px/1.45 Archivo', color: '#0d1f4e', marginBottom: 5 }}>{paper.title}</div>
                                  <div style={{ font: '500 12.5px/1 Archivo', color: '#1e3460' }}>{paper.journal} &middot; {paper.year}{paper.n ? ` · n=${paper.n.toLocaleString()}` : ''}</div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 5, flexShrink: 0 }}>
                                  {inlineCount > 0 && <span style={{ padding: '3px 8px', background: 'rgba(146,64,14,0.09)', border: '1px solid rgba(146,64,14,0.35)', font: '700 10.5px/1.5 Archivo', color: '#92400e', borderRadius: 4 }}>{inlineCount} comment{inlineCount > 1 ? 's' : ''}</span>}
                                  {isRejected && <span style={{ padding: '3px 8px', background: 'rgba(30,64,175,0.08)', border: '1px solid rgba(30,64,175,0.35)', font: '700 10.5px/1.5 Archivo', color: '#1e40af', borderRadius: 4 }}>REJECTED</span>}
                                  <span style={{ font: '600 12px/1 Archivo', color: isSel ? tc.color : '#1e3460' }}>{isSel ? '← close' : 'open →'}</span>
                                </div>
                              </div>
                              {/* Excerpt */}
                              {paper.excerpt && (
                                <div style={{ padding: '0 16px 12px', borderTop: '1px solid rgba(13,31,78,0.08)' }}>
                                  <div style={{ paddingTop: 9, font: '400 13px/1.65 Archivo', color: '#1e3460', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>"{paper.excerpt}"</div>
                                </div>
                              )}
                              {/* Reject / comment row */}
                              <div style={{ padding: '8px 16px 12px', display: 'flex', gap: 8, alignItems: 'center', borderTop: '1px solid rgba(13,31,78,0.08)' }}>
                                <input
                                  placeholder={isRejected ? 'Rejection reason (required)…' : 'Optional comment…'}
                                  value={cmt.text || ''}
                                  onChange={(e) => v.setSciComment(key, e.target.value)}
                                  onClick={(e) => e.stopPropagation()}
                                  style={{ flex: 1, background: '#f4f7fb', border: `1px solid ${isRejected ? 'rgba(30,64,175,0.4)' : 'rgba(13,31,78,0.14)'}`, color: '#0d1f4e', padding: '7px 11px', font: '400 13px/1 Archivo', outline: 'none', borderRadius: 4 }}
                                />
                                <Box
                                  css={`padding:7px 13px;font:700 12px/1 Archivo;cursor:pointer;border:1px solid rgba(30,64,175,0.45);color:${isRejected ? '#fff' : '#1e40af'};background:${isRejected ? '#1e40af' : 'transparent'};white-space:nowrap;border-radius:4px`}
                                  hover="opacity:0.82"
                                  onClick={(e) => { e.stopPropagation(); v.toggleSciReject(key); }}>
                                  {isRejected ? '✕ Rejected' : '✕ Reject'}
                                </Box>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ))}

                    {/* Final CTA */}
                    <div style={{ marginTop: 16, paddingTop: 18, borderTop: '2px solid rgba(13,31,78,0.1)', display: 'flex', gap: 9 }}>
                      <Box css="flex:1;padding:13px 0;text-align:center;font:600 13px/1 Archivo;border:1px solid var(--rule2);color:var(--dim);cursor:pointer" hover="background:var(--s2);color:var(--ink)">&#x2193; Download report</Box>
                      <Box css="flex:2;padding:13px 0;text-align:center;font:700 13.5px/1 Archivo;background:var(--ok);color:#fff;cursor:pointer" hover="opacity:0.87" onClick={v.sciApproveAll}>
                        {rejectedCount > 0 ? `Send back · ${rejectedCount} rejection${rejectedCount > 1 ? 's' : ''} →` : 'Approve & finalise →'}
                      </Box>
                    </div>
                  </div>
                </div>

                {/* ═══ RIGHT: Paper Reader (stable module-level component) ═══ */}
                {selPaper && (
                  <SciPaperReader
                    key={selPaper._idx}
                    paper={selPaper}
                    sciInlineComments={v.sciInlineComments}
                    sciCommentDraft={v.sciCommentDraft}
                    setSciSelectedPaper={v.setSciSelectedPaper}
                    setSciCommentDraft={v.setSciCommentDraft}
                    setSciCommentText={v.setSciCommentText}
                    submitSciComment={v.submitSciComment}
                    cancelSciComment={v.cancelSciComment}
                    resolveSciComment={v.resolveSciComment}
                  />
                )}

              </div>
            );
          })()}

        </main>
      </div>
    );
  }
}
