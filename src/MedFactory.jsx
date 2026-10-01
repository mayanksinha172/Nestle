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
  { topic: 'GLP-1 RA Landscape in Type 2 Diabetes', area: 'Endocrinology', status: 'Awaiting MA Review', stage: 5, created: '2 Sep', to: 'review' },
  { topic: 'NASH/MASH Emerging Therapeutics', area: 'Hepatology', status: 'Awaiting MA Review', stage: 5, created: '1 Sep', to: 'review' },
  { topic: 'CKD Progression in Type 2 Diabetes', area: 'Nephrology', status: 'Generating Content', stage: 3, created: '1 Sep', to: 'pipe' },
  { topic: 'Cardiometabolic Risk and Obesity', area: 'Cardiometabolic', status: 'Research in Progress', stage: 2, created: '31 Aug', to: 'pipe' },
  { topic: 'Basal Insulin Adherence Barriers', area: 'Endocrinology', status: 'Rendering Presentation', stage: 6, created: '29 Aug', to: 'render' },
  { topic: 'Semaglutide CV Outcomes: SELECT Trial', area: 'Cardiology', status: 'Completed', stage: 7, created: '26 Aug', to: 'deliver' },
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

/* ---------- Expanded evidence batch (revealed on "show me more papers") ---------- */
const EXTRA_PAPERS = [
  { db: 'PubMed', type: 'RCT', title: 'PIONEER-6: Oral semaglutide and cardiovascular outcomes in T2D', journal: 'N Engl J Med · MEDLINE-indexed, high impact', year: 2019, score: 0.81, artifacts: ['Deck', 'Protocol'], track: 'Cardiovascular outcomes evidence', designTier: 'RCT · double-blind, placebo-controlled', appraisal: 'CONSORT: 21/25 (good)', grade: 'High certainty', citations: '421 citations · 70.2/yr', funding: 'Industry-sponsored · Novo Nordisk', statRigor: 'N=3,183 · ITT · 15.9 mo', relevance: 81, flag: null, excerpt: '"The rate of MACE was lower with oral semaglutide than with placebo, confirming cardiovascular non-inferiority (HR 0.79; 95% CI 0.57–1.11; P<0.001 for noninferiority). The oral formulation achieved equivalent CV safety to injectable GLP-1 RA."', excerptSrc: '— Primary outcome, p.7' },
  { db: 'EMBASE', type: 'RCT', title: 'STEP-2: Semaglutide 2.4 mg in adults with obesity and type 2 diabetes', journal: 'Lancet · MEDLINE-indexed, high impact', year: 2021, score: 0.84, artifacts: ['Deck', 'Blog'], track: 'Real-world outcomes evidence', designTier: 'RCT · double-blind, placebo-controlled', appraisal: 'CONSORT: 23/25 (excellent)', grade: 'High certainty', citations: '318 citations · 63.6/yr', funding: 'Industry-sponsored · Novo Nordisk', statRigor: 'N=1,210 · ITT · 68 wks', relevance: 84, flag: null, excerpt: '"Participants receiving semaglutide 2.4 mg had a mean weight change of −9.6% versus −3.4% for placebo at 68 weeks. 69% achieved ≥5% weight loss with semaglutide versus 28% with placebo (OR 4.88; 95% CI 3.58–6.64)."', excerptSrc: '— Weight outcomes, p.6' },
  { db: 'PubMed', type: 'Real-World', title: 'GLP-1 RA treatment persistence in routine T2D care — multicentre registry', journal: 'Diabetes Obes Metab · MEDLINE-indexed', year: 2023, score: 0.76, artifacts: ['Deck', 'Protocol', 'Blog'], track: 'Real-world outcomes evidence', designTier: 'Prospective registry · 12 centres', appraisal: 'STROBE: 19/22 (good)', grade: 'Moderate certainty', citations: '28 citations · 9.3/yr', funding: 'Independent · public-health grant', statRigor: 'N=12,400 · 24 mo follow-up', relevance: 76, flag: null, excerpt: '"At 24 months, 58.4% of patients initiated on a GLP-1 RA remained on therapy versus 41.2% on DPP-4 inhibitors. Persistence was highest for semaglutide once-weekly (63.7%) and correlated positively with early HbA1c response at 3 months."', excerptSrc: '— Persistence analysis, p.4' },
  { db: 'Cochrane', type: 'Systematic Review', title: 'GLP-1 RA versus insulin for glycaemic control in T2D — Cochrane review', journal: 'Cochrane Database Syst Rev · MEDLINE-indexed, high impact', year: 2022, score: 0.80, artifacts: ['Deck', 'Protocol'], track: 'General interventional evidence', designTier: 'Systematic review · 18 RCTs', appraisal: 'AMSTAR-2: 14/16 (high confidence)', grade: 'High certainty', citations: '66 citations · 22/yr', funding: 'Independent — Cochrane collaboration', statRigor: 'Pooled N=8,240, I²=22%', relevance: 80, flag: null, excerpt: '"GLP-1 RAs produced comparable HbA1c reductions to basal insulin (MD −0.08%; 95% CI −0.22 to 0.06) with significantly greater body weight reduction (MD −3.7 kg) and lower hypoglycaemia risk (RR 0.31; 95% CI 0.23–0.42)."', excerptSrc: '— Summary of findings, p.9' },
  { db: 'ADA Guidelines', type: 'Guideline', title: 'Obesity management for the treatment of type 2 diabetes — ADA position statement', journal: 'Diabetes Care · ADA position statement', year: 2023, score: 0.77, artifacts: ['Deck', 'Blog'], track: 'Clinical practice guideline', designTier: 'Expert consensus · ADA position statement', appraisal: 'AGREE II: A-rated', grade: 'Grade A — Strong recommendation', citations: '140 citations · 46.7/yr', funding: 'ADA · public-health grant', statRigor: 'N/A · evidence synthesis', relevance: 77, flag: null, excerpt: '"For adults with T2D and BMI ≥27 kg/m², anti-obesity medications including GLP-1 receptor agonists are recommended as adjunct to lifestyle modification. Agents with demonstrated cardiovascular benefit should be preferred in patients with established ASCVD or high CV risk."', excerptSrc: '— Recommendation 3.2, p.S108' },
  { db: 'EMBASE', type: 'Meta-Analysis', title: 'Patient-reported outcomes with GLP-1 RA therapy — synthesis of 22 RCTs', journal: 'BMJ Open · MEDLINE-indexed', year: 2024, score: 0.73, artifacts: ['Deck', 'Blog'], track: 'General interventional evidence', designTier: 'Meta-analysis · 22 RCTs, PRO endpoints', appraisal: 'AMSTAR-2: 12/16 (moderate confidence)', grade: 'Moderate certainty', citations: '19 citations · 19/yr', funding: 'Independent · academic consortium', statRigor: 'Pooled N=24,800, I²=31%', relevance: 73, flag: null, excerpt: '"GLP-1 RA therapy was associated with significant improvements in disease-specific quality of life (SMD 0.38; 95% CI 0.24–0.52) and treatment satisfaction (SMD 0.41; 95% CI 0.29–0.53), with once-weekly formulations showing superior adherence-related PRO scores versus daily injectables."', excerptSrc: '— Patient outcomes synthesis, p.7' },
  { db: 'PubMed', type: 'RCT', title: 'SCALE: Liraglutide 3.0 mg for sustained weight management in obesity', journal: 'N Engl J Med · MEDLINE-indexed, high impact', year: 2015, score: 0.71, artifacts: ['Deck'], track: 'Real-world outcomes evidence', designTier: 'RCT · double-blind, placebo-controlled', appraisal: 'CONSORT: 20/25 (good)', grade: 'High certainty', citations: '1,840 citations · 183.4/yr', funding: 'Industry-sponsored · Novo Nordisk', statRigor: 'N=3,731 · ITT · 56 wks', relevance: 71, flag: null, excerpt: '"63.2% of participants receiving liraglutide 3.0 mg lost ≥5% of body weight at 56 weeks versus 27.1% on placebo (OR 4.8; 95% CI 4.1–5.6). Mean weight loss was 8.0 kg with liraglutide versus 2.6 kg with placebo."', excerptSrc: '— Primary endpoint, p.8' },
  { db: 'NICE', type: 'Real-World', title: 'Cost-effectiveness of semaglutide in T2D with high cardiovascular risk — NICE HTA', journal: 'NICE Health Technology Assessment · UK HTA', year: 2024, score: 0.75, artifacts: ['Protocol', 'Facts'], track: 'Clinical practice guideline', designTier: 'Health technology assessment · Markov modelling', appraisal: 'AGREE II: A-rated', grade: 'Grade A — NICE evidence review', citations: '31 citations · 31/yr', funding: 'NICE · UK government funded', statRigor: 'N/A · lifetime horizon Markov model', relevance: 75, flag: null, excerpt: '"Semaglutide 0.5 mg and 1.0 mg once-weekly were cost-effective versus standard of care for patients with T2D and established cardiovascular disease (ICER £18,400/QALY, below the £20,000–30,000 NICE threshold), driven primarily by MACE reduction and hospitalisation avoidance."', excerptSrc: '— Economic analysis, p.14' },
];

const RESEARCH_DBS = ['PubMed', 'EMBASE', 'ADA / EASD Guidelines', 'NICE / SIGN', 'Cochrane Library', 'IDF Atlas'];

/* ---------- Alternate excerpts for Manage Excerpt panel (per paper _idx) ---------- */
const ALTERNATE_EXCERPTS = {
  0: [ // SUSTAIN-6
    { text: '"Non-fatal myocardial infarction occurred in 2.9% of semaglutide-treated patients versus 3.9% placebo (HR 0.74; 95% CI 0.51–1.08). Non-fatal stroke occurred in 1.6% versus 2.7% (HR 0.61; 95% CI 0.38–0.99)."', src: '— Secondary endpoints, p.14' },
    { text: '"The rate of new or worsening nephropathy was 3.8% in the semaglutide group versus 6.1% in the placebo group (HR 0.64; 95% CI 0.46–0.88; P=0.005)."', src: '— Microvascular outcomes, p.15' },
    { text: '"There was no significant difference in all-cause mortality between the semaglutide group and placebo (HR 1.05; 95% CI 0.74–1.50), though the trial was not powered for this endpoint."', src: '— Mortality analysis, p.16' },
    { text: '"Semaglutide significantly reduced HbA1c from baseline to week 104 (estimated treatment difference −1.1%; 95% CI −1.3 to −0.9; P<0.001) alongside body weight reduction of −4.2 kg versus placebo."', src: '— Glycaemic outcomes, p.11' },
    { text: '"Retinopathy complications occurred more frequently in the semaglutide group (3.0%) than placebo (1.8%; HR 1.76; 95% CI 1.11–2.78), primarily in patients with a history of severe diabetic retinopathy."', src: '— Safety outcomes, p.17' },
  ],
  1: [ // SELECT
    { text: '"All-cause mortality was numerically lower with semaglutide (2.6%) versus placebo (3.0%), though the trial was not powered to formally test this endpoint."', src: '— Mortality outcomes, p.11' },
    { text: '"A ≥5% body weight reduction was achieved by 72.3% of semaglutide-treated participants versus 40.4% on placebo at 104 weeks, regardless of glycaemic status at baseline."', src: '— Weight outcomes, p.9' },
    { text: '"The effect on MACE was consistent across subgroups defined by BMI, age, sex, race, geographic region, and baseline glycaemic status (P for interaction all >0.15)."', src: '— Subgroup analysis, p.12' },
    { text: '"Semaglutide was associated with significantly lower rates of hospitalisation for heart failure (1.8% vs 2.3%; HR 0.79; 95% CI 0.64–0.98) compared with placebo."', src: '— Heart failure outcomes, p.10' },
    { text: '"C-reactive protein was reduced by 43% with semaglutide versus 6% with placebo at 20 weeks, suggesting rapid anti-inflammatory effects independent of weight or glycaemic change."', src: '— Biomarker analysis, p.13' },
  ],
  2: [ // Cochrane GLP-1 RA class effect
    { text: '"The number needed to treat to prevent one MACE over a mean 3.4-year follow-up was 68 (95% CI 51–115), suggesting clinically meaningful absolute risk reduction at the population level."', src: '— Clinical impact, p.9' },
    { text: '"All-cause mortality was reduced by GLP-1 RA treatment (RR 0.88; 95% CI 0.82–0.95), driven predominantly by cardiovascular death reduction (RR 0.87; 95% CI 0.79–0.96)."', src: '— Mortality meta-analysis, p.8' },
    { text: '"Body weight was significantly reduced in patients receiving GLP-1 RAs compared with placebo (MD −3.1 kg; 95% CI −3.6 to −2.6), with the effect maintained at ≥2 years."', src: '— Weight outcomes, p.10' },
    { text: '"Subgroup analysis by baseline eGFR showed consistent CV benefit in patients with CKD stages 3–4 (RR 0.85; 95% CI 0.74–0.97), supporting broad eligibility irrespective of renal function."', src: '— CKD subgroup, p.11' },
    { text: '"Publication bias was assessed using Egger\'s test (P=0.37) and funnel plot symmetry; no significant asymmetry was detected across all seven included trials."', src: '— Bias assessment, p.12' },
  ],
  3: [ // ADA Standards of Care 2025
    { text: '"A GLP-1 receptor agonist with proven CV benefit should be considered as first injectable therapy in patients with T2D and established ASCVD, irrespective of HbA1c level or metformin use (Grade A)."', src: '— Section 9.2, p.S112' },
    { text: '"In patients with T2D who require additional glycaemic control, a GLP-1 RA is preferred over basal insulin when weight loss is a priority and hypoglycaemia risk should be minimised (Grade B)."', src: '— Section 9.5, p.S118' },
    { text: '"For patients with T2D and heart failure with reduced ejection fraction (HFrEF), an SGLT2 inhibitor should be the preferred add-on therapy; GLP-1 RA can be considered if SGLT2i is not tolerated (Grade A)."', src: '— Section 9.7, p.S122' },
    { text: '"Combination therapy with GLP-1 RA and SGLT2 inhibitor may be considered in patients with T2D who have both established CVD and CKD, as each agent independently reduces cardiovascular and renal risk (Grade B)."', src: '— Section 9.8, p.S124' },
    { text: '"Patient-centred factors — including injection device preference, frequency, cost, and access — should be explicitly discussed when selecting a GLP-1 RA formulation (Grade E, expert consensus)."', src: '— Section 9.11, p.S129' },
  ],
  4: [ // Glycaemic attainment meta-analysis
    { text: '"Predictors of poor glycaemic attainment included: longer disease duration (OR 1.8 per decade), insulin regimen (OR 2.1), and absence of specialist involvement (OR 1.6) in adjusted multivariate analyses."', src: '— Predictors analysis, p.6' },
    { text: '"Patients in low- and middle-income countries achieved their targets 18.3 percentage points less frequently than those in high-income settings (29.2% vs 47.5%), a disparity unexplained by clinical factors alone."', src: '— Regional disparities, p.7' },
    { text: '"Among patients who did not achieve their target, 62.4% had received no treatment escalation in the preceding 12 months, with clinical inertia the most frequently cited barrier in qualitative data."', src: '— Inertia analysis, p.8' },
    { text: '"Attainment rates improved significantly when structured diabetes reviews were conducted ≥2×/year (52.1% vs 39.6%; OR 1.65; 95% CI 1.44–1.90) across 28 of 41 included cohorts."', src: '— Care structure analysis, p.9' },
    { text: '"Attainment was highest in the first 6–12 months after treatment intensification (61.3%) but declined to 43.1% by 36 months, suggesting significant regression over time in most cohorts."', src: '— Temporal trends, p.5' },
  ],
  5: [ // LEADER
    { text: '"Cardiovascular death was significantly lower with liraglutide (4.7%) versus placebo (6.0%; HR 0.78; 95% CI 0.66–0.93; P=0.007), the primary driver of the composite MACE benefit."', src: '— CV death analysis, p.11' },
    { text: '"All-cause mortality was reduced with liraglutide (HR 0.85; 95% CI 0.74–0.97; P=0.02), with a consistent pattern observed across all prespecified subgroups."', src: '— Mortality outcomes, p.12' },
    { text: '"New or worsening nephropathy occurred less frequently with liraglutide (HR 0.78; 95% CI 0.67–0.92; P=0.003), driven primarily by reduction in macroalbuminuria."', src: '— Renal outcomes, p.13' },
    { text: '"Mean HbA1c was reduced by 0.4% more in the liraglutide group versus placebo at 36 months, with significantly greater weight loss (−2.3 kg; P<0.001) and lower systolic blood pressure (−1.2 mmHg; P=0.04)."', src: '— Glycaemic/metabolic outcomes, p.10' },
    { text: '"Among patients with baseline eGFR <60 mL/min/1.73m², the CV benefit of liraglutide was preserved (HR 0.83; 95% CI 0.62–1.10), supporting use in moderate CKD."', src: '— CKD subgroup, p.15' },
  ],
  6: [ // IDF Atlas
    { text: '"The global economic burden of diabetes exceeded USD 966 billion in 2021 and is projected to surpass USD 1.05 trillion by 2045, with healthcare expenditure concentrated in high-income regions."', src: '— Economic burden, p.10' },
    { text: '"More than 240 million people are estimated to be living with undiagnosed diabetes globally, representing 44% of all cases. Undiagnosed prevalence is highest in sub-Saharan Africa (57%) and South-East Asia (52%)."', src: '— Undiagnosed diabetes, p.14' },
    { text: '"T2D accounts for approximately 90–95% of all diabetes cases worldwide. The fastest growing cohort is adults aged 45–64 years, with prevalence in this group projected to increase 72% by 2050."', src: '— T2D epidemiology, p.8' },
    { text: '"1.3 million deaths were directly attributable to diabetes in 2021, with an additional 5.0 million deaths linked to diabetes-related complications — making it the 7th leading cause of death globally."', src: '— Mortality burden, p.12' },
    { text: '"Pacific Island nations report the highest age-adjusted prevalence of diabetes globally (up to 33% in some territories), driven by rapid urbanisation, dietary transition, and genetic predisposition."', src: '— Regional prevalence, p.16' },
  ],
  7: [ // Therapeutic inertia UK cohort
    { text: '"Among patients with at least one year of uncontrolled HbA1c, only 31.4% received treatment intensification within 6 months of the first exceedance, despite clear guidance recommending prompt action."', src: '— Intensification rates, p.6' },
    { text: '"Therapeutic inertia was significantly associated with patient age >75 years (OR 2.4), ≥3 comorbidities (OR 1.9), and the prescribing behaviour of individual GPs (OR range 0.5–4.1 across practices)."', src: '— Predictors, p.7' },
    { text: '"Practices with a dedicated diabetes nurse were 1.7 times more likely to escalate therapy within 3 months (P<0.001), highlighting the role of structured multidisciplinary care in reducing inertia."', src: '— Practice-level analysis, p.8' },
    { text: '"The estimated population-level cost of delayed intensification was £142 million per year in avoidable complications, based on micro-costing of hospital admissions linked to the study cohort."', src: '— Economic impact, p.9' },
    { text: '"Patients managed in primary care without annual specialist referral experienced a 4.1-year median delay to intensification compared with 1.8 years in those with at least annual specialist review."', src: '— Specialist access, p.6' },
  ],
  8: [ // ADA/KDIGO CKD guideline
    { text: '"In patients with T2D and CKD with eGFR ≥20 mL/min/1.73m², SGLT2 inhibition is recommended to reduce CKD progression and CV risk (Grade A), with GLP-1 RA as preferred second-line (Grade B)."', src: '— Recommendation 3.1, p.S14' },
    { text: '"Blood pressure targets in T2D and CKD should be <120 mmHg systolic where tolerated, based on SPRINT and CKD-specific subanalyses (Grade B)."', src: '— BP management, p.S22' },
    { text: '"Dietary protein restriction to 0.8 g/kg/day is recommended for adults with CKD not on dialysis to slow progression; lower intakes are not generally recommended (Grade B)."', src: '— Nutritional recommendations, p.S28' },
    { text: '"Finerenone is recommended in patients with T2D, CKD (eGFR 25–75), and albuminuria (UACR ≥30) already receiving maximally tolerated RAS blockade (Grade A, FIDELIO-DKD, FIGARO-DKD)."', src: '— Recommendation 5.4, p.S32' },
    { text: '"Annual monitoring of eGFR and UACR is recommended for all patients with T2D; more frequent monitoring (3–6 monthly) is recommended when eGFR <45 or UACR >300."', src: '— Monitoring recommendations, p.S10' },
  ],
  9: [ // NICE NG28
    { text: '"Offer a GLP-1 RA to adults with T2D if triple therapy with metformin, a sulfonylurea and a DPP-4 inhibitor (or SGLT2 inhibitor) is not adequately controlling HbA1c, or if weight loss is a clinical priority."', src: '— Recommendation 1.8.3, p.26' },
    { text: '"Consider SGLT2 inhibitor therapy for adults with T2D and established CVD, CKD, or heart failure as part of a cardioprotective strategy, in line with the NICE technology appraisals for empagliflozin, dapagliflozin, and canagliflozin."', src: '— Recommendation 1.9.2, p.28' },
    { text: '"Structured education should be offered to all people newly diagnosed with T2D, repeated when requested, and updated as treatments and targets change (Grade 1 — strong recommendation)."', src: '— Recommendation 1.2.1, p.10' },
    { text: '"Blood pressure targets for adults with T2D are <140/90 mmHg, or <130/80 mmHg if nephropathy, retinopathy, cerebrovascular disease, or 10-year CV risk >20% is present."', src: '— Recommendation 1.5.3, p.17' },
    { text: '"An HbA1c target of 48 mmol/mol (6.5%) is recommended for adults newly diagnosed with T2D on lifestyle or single non-hypoglycaemia-inducing drug. A 53 mmol/mol (7.0%) target applies where hypoglycaemia risk is increased."', src: '— Recommendation 1.7.2, p.22' },
  ],
  10: [ // AMPLITUDE-O
    { text: '"The benefit of efpeglenatide on MACE was consistent across patients with and without established CVD (HR 0.76 vs 0.70; P for interaction 0.68), supporting broad eligibility criteria."', src: '— Subgroup analysis, p.11' },
    { text: '"A kidney composite outcome of ≥40% eGFR reduction, ESKD, or renal death occurred in 13.0% of efpeglenatide patients versus 18.4% placebo (HR 0.68; 95% CI 0.57–0.79)."', src: '— Renal outcomes, p.12' },
    { text: '"HbA1c was reduced by 1.1% from baseline with efpeglenatide versus 0.1% with placebo at 18 months; 52% of patients achieved HbA1c <7% in the active arm versus 16% on placebo."', src: '— Glycaemic outcomes, p.10' },
    { text: '"Body weight was reduced by 3.5 kg with efpeglenatide versus 0.5 kg with placebo (P<0.001), with the effect greatest in patients with baseline BMI ≥30 kg/m² (−4.3 kg)."', src: '— Weight outcomes, p.10' },
    { text: '"Gastrointestinal adverse events were the most common treatment-related events (30.3% vs 14.4%), with nausea (19.1%) and vomiting (10.7%) most frequent in the efpeglenatide arm."', src: '— Safety profile, p.14' },
  ],
  11: [ // Renal outcomes SUSTAIN-6
    { text: '"Persistent macroalbuminuria (>300 mg/g) developed in 2.5% of the semaglutide group versus 4.5% of the placebo group (HR 0.54; 95% CI 0.37–0.77), representing a 46% relative risk reduction."', src: '— Albuminuria outcomes, p.15' },
    { text: '"The renal benefit was most pronounced in patients with baseline eGFR 30–59 mL/min/1.73m² (HR 0.55; 95% CI 0.31–0.97), suggesting particular value in patients with existing moderate CKD."', src: '— CKD subgroup, p.16' },
    { text: '"Estimated GFR decline was slower in the semaglutide arm (−1.6 vs −2.5 mL/min/1.73m²/year; P=0.01), with the separation emerging after the first 12 months of treatment."', src: '— eGFR trajectory, p.15' },
    { text: '"As a post-hoc analysis of SUSTAIN-6, these renal findings are hypothesis-generating rather than confirmatory. Definitive evidence is anticipated from the ongoing FLOW trial (NCT03819153)."', src: '— Limitations, p.17' },
    { text: '"The renal composite was not a prespecified primary or co-primary endpoint in SUSTAIN-6; these results should be interpreted in the context of the FLOW trial primary analysis."', src: '— Statistical note, p.18' },
  ],
};

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
    return tc ? tc.color : '#2c52cc';
  })();
  const activeCount = Object.entries(sciInlineComments)
    .filter(([k]) => k.startsWith(`${paper._idx}-`))
    .flatMap(([, c]) => c).filter(c => !c.resolved).length;

  return (
    <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#fff', borderLeft: '1px solid rgba(26,45,107,0.12)' }}>

      {/* ── Header bar ── */}
      <div style={{ padding: '13px 20px', borderBottom: '1px solid rgba(26,45,107,0.12)', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0, background: '#fff' }}>
        <div style={{ width: 5, height: 38, background: trackColor, flexShrink: 0, borderRadius: 3 }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ font: '700 13.5px/1.4 Plus Jakarta Sans', color: '#1a2d6b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{paper.title}</div>
          <div style={{ font: '400 11px/1 Plus Jakarta Sans', color: '#6878a8', marginTop: 4 }}>{paper.journal} &middot; {paper.year}{paper.n ? ` · n=${paper.n.toLocaleString()}` : ''}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          {activeCount > 0 && (
            <span style={{ padding: '3px 10px', background: 'rgba(146,64,14,0.09)', border: '1px solid rgba(146,64,14,0.3)', font: '600 10px/1 Plus Jakarta Sans', color: '#92400e', borderRadius: 99 }}>
              {activeCount} comment{activeCount > 1 ? 's' : ''}
            </span>
          )}
          <span style={{ font: '400 10px/1 Plus Jakarta Sans', color: '#6878a8', letterSpacing: '0.02em' }}>Hover to comment</span>
          <button onClick={() => setSciSelectedPaper(null)} style={{ padding: '5px 13px', font: '600 10.5px/1 Plus Jakarta Sans', border: '1px solid rgba(26,45,107,0.18)', color: '#2d4a8a', background: 'transparent', cursor: 'pointer', borderRadius: 4 }}>&#x2715; Close</button>
        </div>
      </div>

      {/* ── Body: scrollable text + sidebar ── */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex' }}>

        {/* Text column */}
        <div style={{ flex: 1, overflowY: 'auto', background: 'var(--s2)' }}>
          <div style={{ maxWidth: 720, margin: '0 auto', padding: '52px 56px 80px 68px' }}>

            {/* Paper title block */}
            <div style={{ marginBottom: 36 }}>
              <h1 style={{ font: '800 26px/1.3 Plus Jakarta Sans', letterSpacing: '-0.03em', color: '#1a2d6b', margin: '0 0 14px' }}>{paper.title}</h1>
              <p style={{ font: '500 13px/1.6 Plus Jakarta Sans', color: '#6878a8', margin: '0 0 6px' }}>
                Systematic Review &amp; Meta-Analysis &middot; {paper.journal} &middot; {paper.year}
              </p>
              {paper.n && <p style={{ font: '600 12px/1 Plus Jakarta Sans', color: '#2d4a8a', margin: '0 0 28px' }}>n = {paper.n.toLocaleString()} participants</p>}
              <div style={{ height: 2, background: 'rgba(26,45,107,0.1)' }} />
            </div>

            {/* Sections */}
            {sections.map((sec) => (
              <div key={sec.id} style={{ marginBottom: 44 }}>
                <h3 style={{ font: '600 10.5px/1 Plus Jakarta Sans', letterSpacing: '0.14em', color: '#6878a8', textTransform: 'uppercase', margin: '0 0 18px', paddingBottom: 10, borderBottom: '1px solid rgba(26,45,107,0.1)' }}>
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
                            style={{ width: 22, height: 22, borderRadius: '50%', background: '#2c52cc', display: 'grid', placeItems: 'center', fontSize: 17, fontWeight: 300, color: '#fff', cursor: 'pointer', boxShadow: '0 2px 8px rgba(44,82,204,0.4)', userSelect: 'none', pointerEvents: 'auto' }}>
                            +
                          </div>
                        )}
                      </div>

                      {/* Paragraph */}
                      <p
                        onClick={() => { if (!isDraftTarget) setSciCommentDraft(paraKey); }}
                        style={{
                          margin: 0,
                          font: sec.id === 'refs' ? '400 13px/1.75 Plus Jakarta Sans' : '400 15.5px/1.9 Georgia, "Times New Roman", serif',
                          color: sec.id === 'refs' ? '#2d4a8a' : '#1a2d6b',
                          background: isDraftTarget ? 'rgba(44,82,204,0.07)' : hasComment ? 'rgba(146,64,14,0.07)' : isHov ? 'rgba(44,82,204,0.04)' : 'transparent',
                          padding: '6px 10px',
                          marginLeft: -10,
                          borderLeft: isDraftTarget ? '3px solid #2c52cc' : hasComment ? '3px solid #92400e' : isHov ? '3px solid rgba(44,82,204,0.3)' : '3px solid transparent',
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
                          style={{ marginTop: 12, background: '#fff', border: '1px solid rgba(26,45,107,0.14)', boxShadow: '0 4px 24px rgba(26,45,107,0.12)', padding: '14px 16px', borderRadius: 6, animation: 'fadeUp 0.16s ease' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                            <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#2c52cc', display: 'grid', placeItems: 'center', font: '700 9px Plus Jakarta Sans', color: '#fff', flexShrink: 0 }}>AM</div>
                            <div>
                              <div style={{ font: '600 12px/1 Plus Jakarta Sans', color: '#1a2d6b' }}>Dr. Arjun Mehta</div>
                              <div style={{ font: '400 10px/1 Plus Jakarta Sans', color: '#6878a8', marginTop: 2 }}>Scientific Adviser</div>
                            </div>
                          </div>
                          <textarea
                            autoFocus
                            rows={3}
                            placeholder="Add a scientific comment or concern…"
                            value={sciCommentDraft.text}
                            onChange={e => setSciCommentText(e.target.value)}
                            style={{ width: '100%', background: 'var(--s2)', border: '1px solid rgba(26,45,107,0.15)', color: '#1a2d6b', padding: '10px 12px', font: '400 13.5px/1.6 Plus Jakarta Sans', resize: 'none', outline: 'none', display: 'block', borderRadius: 4 }}
                          />
                          <div style={{ display: 'flex', gap: 8, marginTop: 10, justifyContent: 'flex-end' }}>
                            <button onClick={cancelSciComment} style={{ padding: '7px 14px', font: '600 11.5px/1 Plus Jakarta Sans', border: '1px solid rgba(26,45,107,0.18)', color: '#2d4a8a', background: '#fff', cursor: 'pointer', borderRadius: 4 }}>Cancel</button>
                            <button onClick={submitSciComment} style={{ padding: '7px 18px', font: '700 11.5px/1 Plus Jakarta Sans', background: '#2c52cc', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: 4 }}>Add Comment</button>
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
        <div style={{ width: 280, flexShrink: 0, borderLeft: '1px solid rgba(26,45,107,0.1)', overflowY: 'auto', padding: '24px 18px', background: '#fff' }}>
          <div style={{ font: '700 9px/1 Plus Jakarta Sans', letterSpacing: '0.14em', color: '#6878a8', marginBottom: 18 }}>REVIEW COMMENTS</div>
          {Object.entries(sciInlineComments)
            .filter(([k]) => k.startsWith(`${paper._idx}-`))
            .flatMap(([key, cmts]) => cmts.map(cmt => ({ key, cmt })))
            .filter(({ cmt }) => !cmt.resolved)
            .map(({ key, cmt }) => (
              <div key={cmt.id} style={{ border: '1px solid rgba(26,45,107,0.1)', background: 'var(--s2)', padding: '12px 14px', marginBottom: 10, borderRadius: 6, animation: 'rise 0.2s ease' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#2c52cc', display: 'grid', placeItems: 'center', font: '700 9px Plus Jakarta Sans', color: '#fff', flexShrink: 0 }}>AM</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ font: '600 12px/1 Plus Jakarta Sans', color: '#1a2d6b' }}>{cmt.author}</div>
                    <div style={{ font: '400 10px/1 Plus Jakarta Sans', color: '#6878a8', marginTop: 3 }}>{cmt.time}</div>
                  </div>
                </div>
                <p style={{ margin: '0 0 10px', font: '400 13px/1.65 Plus Jakarta Sans', color: '#1a2d6b' }}>{cmt.text}</p>
                <button
                  onClick={() => resolveSciComment(key, cmt.id)}
                  style={{ font: '600 10.5px/1 Plus Jakarta Sans', color: '#6878a8', background: 'none', border: '1px solid rgba(26,45,107,0.12)', cursor: 'pointer', padding: '4px 10px', borderRadius: 3 }}>
                  &#x2713; Resolve
                </button>
              </div>
            ))}
          {activeCount === 0 && (
            <div style={{ font: '400 12.5px/1.8 Plus Jakarta Sans', color: '#6878a8', padding: '8px 0' }}>
              No comments yet.<br />
              Hover any paragraph and click the{' '}
              <strong style={{ color: '#2c52cc' }}>+</strong> button to add a comment.
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
        style={{ width: 6, flexShrink: 0, cursor: 'col-resize', background: 'rgba(26,45,107,0.12)', position: 'relative', zIndex: 10, transition: 'background 0.15s' }}
        onMouseEnter={e => { e.currentTarget.style.background = '#2c52cc'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(26,45,107,0.12)'; }}>
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
  '--bg': '#f4f7fd', '--s1': '#ffffff', '--s2': '#e8eef9', '--ink': '#0c1a3d',
  '--dim': '#1a3070', '--faint': '#3d5499', '--rule': 'rgba(12,26,61,0.10)',
  '--rule2': 'rgba(12,26,61,0.20)', '--acc': '#2c52cc', '--ok': '#15803d', '--warn': '#b45309',
};

const MOCK_CITE_PAPERS = [
  { title: 'GLP-1 receptor agonists and cardiovascular protection — mechanisms beyond glycaemia', journal: 'Cardiovascular Research', year: 2024 },
  { title: 'Comparative effectiveness of GLP-1 RA versus DPP-4 inhibitors in real-world cohorts', journal: 'Diabetes Care', year: 2023 },
  { title: 'Long-term renal outcomes with incretin-based therapy in type 2 diabetes', journal: 'Journal of Clinical Endocrinology', year: 2022 },
  { title: 'Patient adherence and persistence with weekly versus daily GLP-1 formulations', journal: 'Annals of Internal Medicine', year: 2023 },
  { title: 'Network meta-analysis of MACE outcomes across GLP-1 RA cardiovascular outcome trials', journal: 'JAMA Cardiology', year: 2024 },
  { title: 'Semaglutide dose-response relationship in glycaemic and weight outcomes — pooled RCT data', journal: 'The Lancet Diabetes & Endocrinology', year: 2022 },
];

const CITE_EVAL_VARIANTS = [
  { artifacts: ['Deck', 'Blog', 'Protocol'], tracks: ['Hero product evidence', 'Targeted support & ingredients'], designTier: 'Likely cohort/observational (estimated)', grade: 'Provisionally low', relevance: 72, citations: '~34 citations (approx.)', excerpt: '"The paper concludes that current evidence on gut mucosal barrier function remains preliminary but directionally consistent with related literature."' },
  { artifacts: ['Deck', 'Blog'], tracks: ['Condition & clinical problem'], designTier: 'Likely RCT (estimated)', grade: 'Moderate certainty (estimated)', relevance: 81, citations: '~67 citations (approx.)', excerpt: '"Histamine metabolism cross-sectional data supports a plausible mechanistic link, though causal inference is not supported by the study design."' },
  { artifacts: ['Blog', 'Facts'], tracks: ['Root cause & mechanism'], designTier: 'Systematic review (estimated)', grade: 'Moderate-to-high (estimated)', relevance: 78, citations: '~112 citations (approx.)', excerpt: '"Food-intolerance biomarker profiles show diagnostic promise; however, population-level specificity requires validation in prospective cohorts."' },
  { artifacts: ['Deck', 'Facts'], tracks: ['Hero product evidence'], designTier: 'Likely RCT (estimated)', grade: 'High certainty (estimated)', relevance: 88, citations: '~189 citations (approx.)', excerpt: '"Dietary histamine exposure correlates with symptom burden, particularly in sensitised individuals; the effect size is clinically meaningful."' },
  { artifacts: ['Deck', 'Blog', 'Blurb'], tracks: ['Condition & clinical problem', 'Root cause & mechanism'], designTier: 'Narrative review (estimated)', grade: 'Low (estimated)', relevance: 65, citations: '~28 citations (approx.)', excerpt: '"Histamine receptor signalling plays a modulatory role in gut motility and permeability; clinical application requires further mechanistic characterisation."' },
  { artifacts: ['Deck', 'Protocol'], tracks: ['Safety & tolerability'], designTier: 'Likely RCT — pooled analysis (estimated)', grade: 'High certainty (estimated)', relevance: 91, citations: '~203 citations (approx.)', excerpt: '"Pooled RCT data demonstrates a consistent dose-response relationship; the evidence base is sufficient to support primary endpoint claims in approved indications."' },
];

/* ---------- gap analysis findings ---------- */

const GAP_FINDINGS = [
  {
    paperIdx: 7,
    severity: 'Critical',
    type: 'Causal Inference Overstated',
    title: 'Retrospective design used to assert causation',
    description: 'The excerpt states that therapeutic inertia "causes" delayed intensification, but this is a retrospective cohort study. Causal language cannot be supported by the study design — only association can be claimed.',
    why: 'Retrospective cohort designs (STROBE-rated) lack the randomisation required to attribute causation. Using causal language in MA communications derived from this paper creates regulatory risk under ABPI/EFPIA codes and could be challenged during medical review.',
    recommendation: 'Replace causal language ("causes", "leads to") with associative language ("is associated with", "correlates with"). Alternatively, pair this citation with an RCT that demonstrates the same direction of effect.',
    highlightText: 'The median delay from first recorded HbA1c exceeding the individualised target to treatment intensification was 3.7 years',
    excerptContext: 'The excerpt makes a strong directional claim about treatment patterns. In MA content (decks, protocols), this claim must be qualified with study design limitations per applicable regulatory guidance.',
  },
  {
    paperIdx: 11,
    severity: 'Critical',
    type: 'Post-Hoc Analysis Undisclosed',
    title: 'Post-hoc subgroup not disclosed in evidence summary',
    description: 'This renal outcomes paper is a pre-specified post-hoc analysis of SUSTAIN-6, not an independent primary trial. The evidence summary does not flag this limitation, creating a misleading impression of the strength of evidence.',
    why: 'Post-hoc analyses carry higher risk of false-positive findings due to multiple testing and are subject to regulatory scrutiny. Using this paper as a primary evidence source for renal benefit claims without disclosing the post-hoc origin violates standard evidence grading practices.',
    recommendation: 'Add a prominent limitation note: "Pre-specified post-hoc analysis of SUSTAIN-6 — not a primary renal endpoint trial." Consider supplementing with data from FLOW (dedicated renal outcomes trial for semaglutide) if available.',
    highlightText: 'Treatment with semaglutide was associated with a lower rate of new or worsening nephropathy (3.8% vs 6.1%; HR 0.64; 95% CI 0.46–0.88)',
    excerptContext: 'This finding is real but derived from a post-hoc analysis. The original SUSTAIN-6 trial was powered for cardiovascular, not renal, endpoints — so confidence intervals for the renal subgroup are wide.',
  },
  {
    paperIdx: 0,
    severity: 'Warning',
    type: 'Industry Funding Conflict',
    title: 'Single industry-sponsored source for primary efficacy claim',
    description: 'The primary cardiovascular efficacy narrative relies heavily on SUSTAIN-6, which is industry-sponsored by Novo Nordisk. Without independent replication flagged alongside this citation, the funding conflict is not adequately balanced.',
    why: 'EFPIA and ABPI guidance requires that funding sources be disclosed and that industry-sponsored evidence be contextualised with independent or Cochrane-level confirmatory data. Presentations relying on a single sponsor-funded RCT may be challenged during regulatory medical review.',
    recommendation: 'Pair SUSTAIN-6 with the Cochrane GLP-1 RA systematic review (independent, pooled N=56,004) or SELECT trial commentary from independent authors. Ensure funding disclosure is visible in the evidence appendix.',
    highlightText: 'The primary composite outcome of cardiovascular death, nonfatal myocardial infarction, or nonfatal stroke occurred in 6.6% of the semaglutide group versus 8.9% in the placebo group',
    excerptContext: 'This is the flagship efficacy claim. It is robust, but the sole reliance on industry-sponsored data for a primary efficacy statement in MA materials is a known audit vulnerability.',
  },
  {
    paperIdx: 10,
    severity: 'Warning',
    type: 'Off-Label Product Conflation',
    title: 'Non-semaglutide agent used as class proxy',
    description: 'AMPLITUDE-O studies efpeglenatide (Sanofi), not semaglutide (Novo Nordisk). Citing this trial as supporting evidence for the hero product creates a class-conflation risk — regulatory reviewers may flag this as off-label extrapolation.',
    why: 'While GLP-1 RA class effects on MACE are well-established, individual agents have different structures, dosing schedules, and regulatory indications. Using a competitor\'s trial to support hero product claims has been challenged in EU regulatory submissions and is flagged by the EMA as a common MA communications risk.',
    recommendation: 'Either (a) remove AMPLITUDE-O from hero product evidence and move it to a "GLP-1 class evidence" supporting appendix, or (b) explicitly frame it as class-level evidence and clarify that it does not support semaglutide-specific claims.',
    highlightText: 'The incidence of major adverse cardiovascular events was significantly lower with efpeglenatide than with placebo (HR 0.73; 95% CI 0.58–0.92)',
    excerptContext: 'Efpeglenatide is a distinct molecule that failed to reach commercial approval in most markets. Its inclusion without qualification may confuse or mislead HCP audiences.',
  },
  {
    paperIdx: 5,
    severity: 'Note',
    type: 'Superseded Evidence',
    title: 'Older liraglutide data may be superseded by SELECT (2023)',
    description: 'LEADER (2016) is an important historical anchor for GLP-1 RA CV evidence, but more recent and larger trials (SELECT, 2023; N=17,604) are available. Leading with LEADER may understate the current evidence base.',
    why: 'Evidence hierarchies in MA materials are implicitly date-sensitive. Using 2016 data as a primary citation when a 2023 superiority trial for the same mechanism is available creates a perception gap. Some HCP audiences may be aware of SELECT and question why it\'s not primary.',
    recommendation: 'Reorder evidence so SELECT (2023) leads the cardiovascular narrative, with LEADER (2016) as historical context. Update the evidence tier label from "primary" to "supporting — historical".',
    highlightText: 'The rate of first occurrence of death from cardiovascular causes, nonfatal myocardial infarction, or nonfatal stroke was lower with liraglutide than with placebo (HR 0.87; 95% CI 0.78–0.97)',
    excerptContext: 'LEADER was groundbreaking in 2016 but the effect size (HR 0.87) is smaller than semaglutide\'s SELECT result (HR 0.80). Leading with the stronger, more recent evidence is best practice.',
  },
];

/* ---------- evidence helpers ---------- */

const typeColor = (t) => t === 'RCT' ? 'var(--ok)' : t === 'Guideline' ? 'var(--dim)' : t === 'Meta-Analysis' ? 'var(--warn)' : t === 'Systematic Review' ? '#a78bfa' : 'var(--faint)';

function gradeLetterFromPaper(p) {
  const g = p.grade.toLowerCase();
  if (g.startsWith('high') || g.includes('grade a')) return 'A';
  if (g.startsWith('moderate') || g.includes('grade b')) return 'B';
  return 'C';
}

function evidenceSortFn(sortBy, sortDir) {
  const dir = sortDir === 'desc' ? -1 : 1;
  return (a, b) => {
    switch (sortBy) {
      case 'composite': return dir * (a.score - b.score);
      case 'relevance':  return dir * (a.relevance - b.relevance);
      case 'year':       return dir * (a.year - b.year);
      case 'title':      return dir * a.title.localeCompare(b.title);
      case 'citations': {
        const nA = parseInt((a.citations.match(/^([\d,]+)/) || ['','0'])[1].replace(/,/g, ''));
        const nB = parseInt((b.citations.match(/^([\d,]+)/) || ['','0'])[1].replace(/,/g, ''));
        return dir * (nA - nB);
      }
      case 'grade': {
        const order = { A: 0, B: 1, C: 2 };
        return dir * ((order[gradeLetterFromPaper(a)] || 2) - (order[gradeLetterFromPaper(b)] || 2));
      }
      case 'funding': return dir * (a.funding.toLowerCase().includes('independent') ? -1 : 1);
      case 'statRigor': {
        const nA = parseInt(((a.statRigor.match(/N=([\d,]+)/) || ['','0'])[1]).replace(/,/g, ''));
        const nB = parseInt(((b.statRigor.match(/N=([\d,]+)/) || ['','0'])[1]).replace(/,/g, ''));
        return dir * (nA - nB);
      }
      default: return 0;
    }
  };
}

/* ---------- component ---------- */

export default class MedFactory extends React.Component {
  constructor(props) {
    super(props);
    this.rootRef = React.createRef();
    this.state = {
      screen: 'dash',
      dir: null,
      workspaceName: 'Q4 GLP-1 RA Campaign: Semaglutide',
      agentContext: 'Focus on cardiovascular outcome data from the SELECT trial and SUSTAIN-6. Prioritise RCTs and meta-analyses published from 2020 onwards. Flag any evidence around renal outcomes in CKD patients with T2D. The audience consists of experienced endocrinologists already familiar with GLP-1 mechanism — no need to cover basics. Avoid off-label framing. Highlight differentiators vs. dulaglutide and liraglutide where evidence allows.',
      workspaceSearch: '',
      activeWorkspaceId: null,
      createdWorkspaces: [],
      wsResearches: [],
      wsActiveResearch: null,
      sidebarExpandedWs: null,
      sidebarCollapsed: false,
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
      chatPaperSelections: {},
      chatAttachments: [],
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
      moreResearchActive: false,
      moreResearchN: 0,
      moreResearchDone: false,
      researchSourcesOpen: false,
      researchSrcExpanded: {},
      researchFilter: 'All',
      trackFilter: 'All',
      gradeFilter: [],
      artifactFilter: 'All',
      fundingFilter: 'All',
      sortBy: 'composite',
      sortDir: 'desc',
      evidenceView: 'grid',
      sortDropdownOpen: false,
      chatCollapsed: false,
      acceptedPapers: {},
      deletedPapers: {},
      aiAcceptLoading: false,
      aiAcceptStep: 0,
      excerptOpen: {},
      acceptedDrawerOpen: false,
      acceptedPopupOpen: false,
      organizeExpanded: {},
      organizeExpandAll: false,
      organizeSelectedPaper: null,
      organizeArtifactFilter: { Deck: true, Blog: true, Protocol: true, Blurb: false, Facts: true },
      organizeView: 'track',
      manageExcerptIdx: null,
      paperExcerpts: {},
      showMoreExcerpts: {},
      aiExcerpts: {},           // { [idx]: [{text, src}] } AI-generated excerpts per paper
      aiExcerptsLoading: {},    // { [idx]: true } loading state
      organizeAgentMsgN: 0,
      organizeAgentThinking: false,
      organizeAgentInput: '',
      maReviewModal: false,
      reviewN: 0,
      medReviewTab: 'artifacts',
      medReviewPaper: null,
      pipeViewPaper: null,
      pipeCitationsOpen: null,
      pipeCitationSort: 'year-desc',
      citeEvalStack: [],
      citeEvalAdded: {},
      gapSelected: 0,
      gapResolved: {},
      gapWhyExpanded: {},
      gapPaperOpen: false,
      gapShowRecommendation: {},
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
      sectionSelectTracks: CONTENT_TRACKS.map(t => t.id),
      sectionSelectCustom: [],
      sectionSelectInput: '',
      figureSelections: {},
      uploadedFigures: [],
      combinedExcerptsModal: null,
      renderStep: 2,
      built: 7,
      history: [
        { text: 'Block 3 flagged by validation — unsourced claim', meta: '09:36 · system', kind: 'flag' },
        { text: 'Citation [6] added to So-what block', meta: '14:02 · Munal', kind: 'edit' },
        { text: 'Slide title tightened for HCP audience', meta: '14:04 · Munal', kind: 'edit' },
      ],
    };
  }

  componentDidMount() {
    this.applyTheme();
    window.history.replaceState({ screen: this.state.screen }, '');
    this._onPopState = (e) => {
      const s = e.state?.screen;
      if (!s || s === 'landing') { this.switchRole(); return; }
      this._skipHistory = true;
      this.go(s);
      this._skipHistory = false;
    };
    window.addEventListener('popstate', this._onPopState);
  }
  componentDidUpdate(prevProps, prevState) {
    this.applyTheme();
    if (prevState.researchN !== this.state.researchN && this.state.researchN >= 20) {
      const { wsResearches, wsActiveResearch } = this.state;
      const activeR = wsResearches.find((r) => r.id === wsActiveResearch);
      if (activeR && activeR.status === 'in-progress') {
        this.setState((s) => ({
          wsResearches: s.wsResearches.map((r) => r.id === s.wsActiveResearch ? { ...r, status: 'complete' } : r),
        }));
      }
    }
  }
  componentWillUnmount() {
    clearInterval(this.t);
    window.removeEventListener('popstate', this._onPopState);
  }

  dirOf() { return this.state.dir ?? this.props.theme ?? 'dark'; }

  applyTheme() {
    const el = this.rootRef.current;
    if (!el) return;
    const light = this.dirOf() === 'light';
    Object.keys(LIGHT_TOKENS).forEach((k) =>
      light ? el.style.setProperty(k, LIGHT_TOKENS[k]) : el.style.removeProperty(k)
    );
    document.body.style.background = light ? '#ffffff' : '#ffffff';
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
    if (s === 'dash') this.setState({ sidebarCollapsed: false });
    else if (s !== 'landing') this.setState({ sidebarCollapsed: true });
    if (!this._skipHistory && s !== 'landing' && s !== 'intel') {
      window.history.pushState({ screen: s }, '');
    }
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
    } else if (s === 'section-select') {
      this.setState({ screen: 'section-select' });
      return;
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
    window.history.pushState({ screen }, '');
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
    const { projectInput, projectThreads, activeThreadId, moreResearchDone, moreResearchActive } = this.state;
    const { chatAttachments } = this.state;
    if (!projectInput.trim() && chatAttachments.length === 0) return;
    const attachPrefix = chatAttachments.length > 0
      ? `[Attached papers: ${chatAttachments.map((p) => p.title).join('; ')}]\n\n`
      : '';
    const rawText = projectInput.trim() || `Attached ${chatAttachments.length} paper${chatAttachments.length > 1 ? 's' : ''} for context.`;
    const userMsg = { from: 'user', text: attachPrefix + rawText, time: 'Just now' };

    // Detect "show me more papers" intent
    const wantsMore = /more paper|find more|show more|expand.*search|additional paper|search more|get more|more evidence/i.test(projectInput.trim());
    if (wantsMore && !moreResearchDone && !moreResearchActive) {
      const agentReply = { from: 'agent', text: `Running an expanded search across **Cochrane Library**, **NICE HTA database**, and supplementary PubMed queries for additional evidence on this topic.\n\nThis will take a moment — you'll see the new papers appear in the Evidence Review tab once the search is complete.`, time: 'Just now' };
      this.setState((st) => ({
        projectThreads: st.projectThreads.map((t) =>
          t.id === activeThreadId
            ? { ...t, messages: [...t.messages, userMsg, agentReply] }
            : t
        ),
        projectInput: '',
        chatAttachments: [],
      }));
      setTimeout(() => this.runMoreResearch(), 800);
      return;
    }

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
      chatAttachments: [],
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

  runMoreResearch = () => {
    const threadId = this.state.activeThreadId;
    this.setState({ moreResearchActive: true, moreResearchN: 0 });
    const max = EXTRA_PAPERS.length + 4;
    let n = 0;
    const interval = setInterval(() => {
      n++;
      if (n >= max) {
        clearInterval(interval);
        this.setState({ moreResearchN: n, moreResearchActive: false, moreResearchDone: true });
        setTimeout(() => {
          this.setState((st) => ({
            projectThreads: st.projectThreads.map((t) =>
              t.id === threadId
                ? { ...t, messages: [...t.messages, { from: 'agent', text: `Expanded search complete — **${EXTRA_PAPERS.length} additional papers** retrieved from Cochrane, NICE HTA, and supplementary PubMed queries.\n\nAll papers have been added to your **Evidence Review** tab. Total evidence base: **${RESEARCH_PAPERS.length + EXTRA_PAPERS.length} papers** across 8 sources.`, time: 'Just now' }] }
                : t
            ),
          }));
        }, 600);
      } else {
        this.setState({ moreResearchN: n });
      }
    }, 750);
  };

  curBlocks() {
    const n = this.state.slides[this.state.slideIdx].n;
    return this.state.blocks || BLOCKS[n] || BLOCKS.DEFAULT;
  }

  pickSlide = (i) => this.setState({ slideIdx: i, blocks: null, sel: 0, editDraft: '' });

  pill(status) {
    const map = {
      'Awaiting Review':        ['var(--acc)', 'rgba(44,82,204,0.12)'],
      'Awaiting MA Review':     ['var(--acc)', 'rgba(44,82,204,0.12)'],
      'Awaiting Sci Review':    ['var(--acc)', 'rgba(44,82,204,0.12)'],
      Done:                     ['var(--ok)',  'rgba(22,101,52,0.12)'],
      Completed:                ['var(--ok)',  'rgba(22,101,52,0.12)'],
      'Research in Progress':   ['#7c3aed',   'rgba(124,58,237,0.1)'],
      'Generating Content':     ['var(--dim)', 'rgba(30,52,96,0.08)'],
      'Rendering Presentation': ['var(--dim)', 'rgba(30,52,96,0.08)'],
      Generating:               ['var(--dim)', 'transparent'],
      Researching:              ['var(--dim)', 'transparent'],
      Rendering:                ['var(--dim)', 'transparent'],
    };
    const [c, bg] = map[status] || ['var(--dim)', 'transparent'];
    return `display:inline-block;border:1px solid ${c};background:${bg};color:${c};padding:5px 12px;font:600 10px/1 Plus Jakarta Sans;letter-spacing:0.08em;text-transform:uppercase;border-radius:100px`;
  }

  badge(type) {
    const c = type === 'RCT' ? 'var(--ok)' : type === 'Guideline' ? 'var(--dim)' : 'var(--warn)';
    return `border:1px solid ${c};color:${c};padding:3px 7px;font:600 9.5px/1 Plus Jakarta Sans;letter-spacing:0.09em;text-transform:uppercase;border-radius:20px`;
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
      ['Settings', 'dash', ''],
    ];

    const pipeStages = STAGE_NAMES.map((name, i) => {
      const done = i < st.stage - 1;
      const active = i === st.stage - 1;
      return {
        i: String(i + 1).padStart(2, '0'), name, note: STAGE_NOTES[i],
        glyph: done ? '✓' : active ? '◐' : '',
        icon: `width:20px;height:20px;flex:none;display:grid;place-items:center;font-size:11px;border:1px solid ${done ? 'var(--ok)' : active ? 'var(--acc)' : 'var(--rule)'};color:${done ? 'var(--ok)' : active ? 'var(--acc)' : 'var(--faint)'};background:${active ? 'rgba(44,82,204,0.1)' : 'transparent'};${active ? 'animation:puls 1.4s infinite' : ''}`,
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
      tag: `border:1px solid ${c.c};color:${c.c};padding:4px 8px;font:600 9.5px/1 Plus Jakarta Sans;letter-spacing:0.1em`,
      numStyle: `font:700 30px/1 var(--mono);letter-spacing:-0.02em;color:${c.c}`,
      bar: `height:3px;width:${c.pct}%;background:${c.c}`,
    }));

    const flagTag = () => 'border:1px solid var(--warn);color:var(--warn);padding:3px 7px;font:600 9.5px/1 Plus Jakarta Sans;letter-spacing:0.09em';
    const stTag = (ok) => `margin-left:auto;border:1px solid ${ok ? 'var(--ok)' : 'var(--acc)'};color:${ok ? 'var(--ok)' : 'var(--acc)'};padding:3px 8px;font:600 9.5px/1 Plus Jakarta Sans;letter-spacing:0.09em;flex:none`;
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
        ? 'background:rgba(44,82,204,0.14);color:var(--acc);text-decoration:line-through'
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
      tag: `justify-self:start;border:1px solid ${a[4] === 'ok' ? 'var(--ok)' : a[4] === 'warn' ? 'var(--warn)' : 'var(--rule)'};color:${a[4] === 'ok' ? 'var(--ok)' : a[4] === 'warn' ? 'var(--warn)' : 'var(--dim)'};padding:3px 8px;font:600 9.5px/1 Plus Jakarta Sans;letter-spacing:0.09em`,
    }));

    const tabStyle = (on) => `padding:14px 16px;text-align:center;font-weight:700;font-size:12.5px;cursor:pointer;color:${on ? 'var(--ink)' : 'var(--faint)'};background:${on ? 'var(--bg)' : 'transparent'};border-bottom:2px solid ${on ? 'var(--acc)' : 'transparent'};border-right:1px solid var(--rule)`;

    const pct = Math.round((st.logN / LOG_SCRIPT.length) * 100);
    const rpct = Math.round((st.built / 20) * 100);

    return {
      isDash: S_ === 'dash', isIntake: S_ === 'intake', isResearch: S_ === 'research', isOrganize: S_ === 'organize', isMedReview: S_ === 'med-review', isWsHub: S_ === 'workspace-hub', isSectionSelect: S_ === 'section-select',
      backRoute: ({ intake: ['dash','Dashboard'], 'section-select': ['intake','Setup'], research: ['section-select','Sections'], pipe: ['intake','Setup'], organize: ['research','Research'], 'med-review': ['organize','Organize'], 'sci-review': ['sci-dash','Inbox'] })[S_] || null,
      goBack: () => { const b = ({ intake: ['dash','Dashboard'], 'section-select': ['intake','Setup'], research: ['section-select','Sections'], pipe: ['intake','Setup'], organize: ['research','Research'], 'med-review': ['organize','Organize'], 'sci-review': ['sci-dash','Inbox'] })[S_]; if (b) this.go(b[0]); },
      isLanding: !st.role,
      role: st.role, pptStatus: st.pptStatus,
      isCreator: st.role === 'creator', isMA: st.role === 'ma', isSci: st.role === 'sci',
      dirLabel: this.dirOf() === 'light' ? 'LIGHT' : 'DARK',
      toggleDir: () => this.setState({ dir: this.dirOf() === 'light' ? 'dark' : 'light' }),
      researchN: st.researchN,
      moreResearchActive: st.moreResearchActive,
      moreResearchN: st.moreResearchN,
      moreResearchDone: st.moreResearchDone,
      researchSourcesOpen: st.researchSourcesOpen,
      toggleResearchSources: () => this.setState((s) => ({ researchSourcesOpen: !s.researchSourcesOpen })),
      researchSrcExpanded: st.researchSrcExpanded,
      toggleSrcExpanded: (i) => this.setState((s) => ({ researchSrcExpanded: { ...s.researchSrcExpanded, [i]: !s.researchSrcExpanded[i] } })),
      researchFilter: st.researchFilter,
      setResearchFilter: (f) => this.setState({ researchFilter: f }),
      trackFilter: st.trackFilter,
      setTrackFilter: (f) => this.setState({ trackFilter: f, sortDropdownOpen: false }),
      gradeFilter: st.gradeFilter,
      toggleGradeFilter: (g) => this.setState((s) => ({
        gradeFilter: s.gradeFilter.includes(g) ? s.gradeFilter.filter((x) => x !== g) : [...s.gradeFilter, g],
      })),
      artifactFilter: st.artifactFilter,
      setArtifactFilter: (f) => this.setState({ artifactFilter: f }),
      fundingFilter: st.fundingFilter,
      setFundingFilter: (f) => this.setState({ fundingFilter: f }),
      sortBy: st.sortBy,
      setSortBy: (sb) => this.setState({ sortBy: sb, sortDropdownOpen: false }),
      sortDir: st.sortDir,
      toggleSortDir: () => this.setState((s) => ({ sortDir: s.sortDir === 'desc' ? 'asc' : 'desc' })),
      evidenceView: st.evidenceView,
      setEvidenceView: (vw) => this.setState({ evidenceView: vw }),
      sortDropdownOpen: st.sortDropdownOpen,
      toggleSortDropdown: () => this.setState((s) => ({ sortDropdownOpen: !s.sortDropdownOpen })),
      clearEvidenceFilters: () => this.setState({
        trackFilter: 'All', gradeFilter: [], artifactFilter: 'All',
        fundingFilter: 'All', sortBy: 'composite', sortDir: 'desc', sortDropdownOpen: false,
      }),
      quickAccept: (preset) => this.setState((s) => {
        const acc = { ...s.acceptedPapers };
        RESEARCH_PAPERS.forEach((p, i) => {
          if (preset === 'grade-ab' && (gradeLetterFromPaper(p) === 'A' || gradeLetterFromPaper(p) === 'B')) acc[i] = true;
          if (preset === 'independent' && p.funding.toLowerCase().includes('independent')) acc[i] = true;
          if (preset === 'relevance80' && p.relevance >= 80) acc[i] = true;
          if (preset === 'journal' && (p.journal.toLowerCase().includes('high impact') || p.journal.toLowerCase().includes('medline'))) acc[i] = true;
        });
        return { acceptedPapers: acc };
      }),
      gapSelected: st.gapSelected,
      setGapSelected: (i) => this.setState({ gapSelected: i }),
      gapResolved: st.gapResolved,
      resolveGap: (i) => this.setState((s) => ({ gapResolved: { ...s.gapResolved, [i]: true } })),
      unresolveGap: (i) => this.setState((s) => { const r = { ...s.gapResolved }; delete r[i]; return { gapResolved: r }; }),
      gapWhyExpanded: st.gapWhyExpanded,
      toggleGapWhy: (i) => this.setState((s) => ({ gapWhyExpanded: { ...s.gapWhyExpanded, [i]: !s.gapWhyExpanded[i] } })),
      gapPaperOpen: st.gapPaperOpen,
      setGapPaperOpen: (v) => this.setState({ gapPaperOpen: v }),
      gapShowRecommendation: st.gapShowRecommendation,
      toggleGapRecommendation: (i) => this.setState((s) => ({ gapShowRecommendation: { ...s.gapShowRecommendation, [i]: !s.gapShowRecommendation[i] } })),
      aiAcceptLoading: st.aiAcceptLoading,
      aiAcceptStep: st.aiAcceptStep,
      addPaperToChat: (p) => this.setState((s) => {
        const threads = s.projectThreads;
        if (!threads.length) return {};
        const activeId = s.activeThreadId || threads[0].id;
        const msg = { from: 'user', text: `Tell me more about this paper: **${p.title}** (${p.journal.split('·')[0].trim()}, ${p.year}). Relevance: ${p.relevance}/100. Grade: ${p.grade}.`, time: 'Just now' };
        const reply = { from: 'agent', text: `Reviewing **${p.title}** (${p.year}).\n\nThis is a ${p.type} with a composite score of ${p.score.toFixed(2)}. ${p.grade}. ${p.statRigor}.\n\nKey excerpt: ${p.excerpt}`, time: 'Just now' };
        return {
          projectThreads: threads.map((t) => t.id === activeId ? { ...t, messages: [...t.messages, msg, reply] } : t),
        };
      }),
      chatPaperSelections: st.chatPaperSelections,
      toggleChatPaperSel: (idx) => this.setState((s) => {
        const n = { ...s.chatPaperSelections };
        if (n[idx]) delete n[idx]; else n[idx] = true;
        return { chatPaperSelections: n };
      }),
      chatAttachments: st.chatAttachments,
      addSelectedToChat: () => this.setState((s) => {
        const allPapers = [...RESEARCH_PAPERS.map((p, i) => ({ ...p, _idx: i })), ...EXTRA_PAPERS.map((p, i) => ({ ...p, _idx: RESEARCH_PAPERS.length + i }))];
        const papers = allPapers.filter((p) => s.chatPaperSelections[p._idx]);
        return { chatAttachments: [...s.chatAttachments, ...papers.filter(np => !s.chatAttachments.find(a => a._idx === np._idx))], chatPaperSelections: {} };
      }),
      removeChatAttachment: (idx) => this.setState((s) => ({ chatAttachments: s.chatAttachments.filter((_, i) => i !== idx) })),
      clearChatAttachments: () => this.setState({ chatAttachments: [] }),
      addAllAcceptedToChat: () => this.setState((s) => {
        const accepted = RESEARCH_PAPERS.map((p, i) => ({ ...p, _idx: i })).filter((p) => s.acceptedPapers[p._idx]);
        if (!accepted.length) return {};
        return { chatAttachments: [...s.chatAttachments, ...accepted.filter(np => !s.chatAttachments.find(a => a._idx === np._idx))] };
      }),
      quickAcceptByAI: () => {
        if (st.aiAcceptLoading) return;
        this.setState({ aiAcceptLoading: true, aiAcceptStep: 0 });
        const steps = [0, 800, 1600, 2400];
        steps.forEach((delay, i) => {
          setTimeout(() => this.setState({ aiAcceptStep: i + 1 }), delay);
        });
        setTimeout(() => {
          // Accept top 10 papers by score (indices sorted by score desc, take first 10)
          const sorted = RESEARCH_PAPERS
            .map((p, i) => ({ score: p.score, idx: i }))
            .sort((a, b) => b.score - a.score)
            .slice(0, 10);
          const acc = {};
          sorted.forEach(({ idx }) => { acc[idx] = true; });
          this.setState({ aiAcceptLoading: false, aiAcceptStep: 0, acceptedPapers: acc });
        }, 3200);
      },
      chatCollapsed: st.chatCollapsed,
      setChatCollapsed: (b) => this.setState({ chatCollapsed: b }),
      acceptedPapers: st.acceptedPapers,
      deletedPapers: st.deletedPapers,
      deleteResearchPaper: (idx) => this.setState((s) => ({
        deletedPapers: { ...s.deletedPapers, [idx]: true },
        acceptedPapers: (() => { const a = { ...s.acceptedPapers }; delete a[idx]; return a; })(),
      })),
      pipeViewPaper: st.pipeViewPaper,
      setPipeViewPaper: (p) => this.setState({ pipeViewPaper: p }),
      pipeCitationsOpen: st.pipeCitationsOpen,
      setPipeCitationsOpen: (p) => this.setState({ pipeCitationsOpen: p }),
      pipeCitationSort: st.pipeCitationSort,
      setPipeCitationSort: (s) => this.setState({ pipeCitationSort: s }),
      evaluateCitation: (cite, ci) => this.setState((s) => ({
        citeEvalStack: [...s.citeEvalStack, { ...cite, ci: ci !== undefined ? ci : 0, depth: s.citeEvalStack.length + 1 }],
        pipeCitationsOpen: null,
      })),
      citeEvalStack: st.citeEvalStack,
      citeEvalPaper: st.citeEvalStack.length > 0 ? st.citeEvalStack[st.citeEvalStack.length - 1] : null,
      setCiteEvalPaper: (p) => this.setState(p ? { citeEvalStack: [p] } : { citeEvalStack: [] }),
      goToCiteDepth: (depth) => this.setState((s) => ({ citeEvalStack: s.citeEvalStack.slice(0, depth) })),
      citeEvalAdded: st.citeEvalAdded,
      addCiteToEvidence: (key) => this.setState((s) => ({ citeEvalAdded: { ...s.citeEvalAdded, [key]: 'added' } })),
      acceptCitePaper: (key) => this.setState((s) => ({ citeEvalAdded: { ...s.citeEvalAdded, [key]: 'accepted' } })),
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
      manageExcerptIdx: st.manageExcerptIdx,
      openManageExcerpt: (idx) => this.setState((s) => ({ manageExcerptIdx: s.manageExcerptIdx === idx ? null : idx })),
      closeManageExcerpt: () => this.setState({ manageExcerptIdx: null }),
      paperExcerpts: st.paperExcerpts,
      replaceExcerpt: (idx, exc) => this.setState((s) => ({ paperExcerpts: { ...s.paperExcerpts, [idx]: [exc] }, manageExcerptIdx: null })),
      addExcerpt: (idx, exc) => this.setState((s) => {
        const cur = s.paperExcerpts[idx] || [{ text: RESEARCH_PAPERS[idx]?.excerpt || '', src: RESEARCH_PAPERS[idx]?.excerptSrc || '' }];
        if (cur.find((e) => e.text === exc.text)) return {};
        return { paperExcerpts: { ...s.paperExcerpts, [idx]: [...cur, exc] }, manageExcerptIdx: null };
      }),
      removeExcerptItem: (idx, text) => this.setState((s) => {
        const cur = s.paperExcerpts[idx] || [{ text: RESEARCH_PAPERS[idx]?.excerpt || '', src: RESEARCH_PAPERS[idx]?.excerptSrc || '' }];
        const next = cur.filter((e) => e.text !== text);
        return { paperExcerpts: { ...s.paperExcerpts, [idx]: next.length ? next : [{ text: RESEARCH_PAPERS[idx]?.excerpt || '', src: RESEARCH_PAPERS[idx]?.excerptSrc || '' }] } };
      }),
      showMoreExcerpts: st.showMoreExcerpts,
      toggleShowMore: (idx) => this.setState((s) => ({ showMoreExcerpts: { ...s.showMoreExcerpts, [idx]: !s.showMoreExcerpts[idx] } })),
      aiExcerpts: st.aiExcerpts,
      aiExcerptsLoading: st.aiExcerptsLoading,
      generateAIExcerpts: (idx, paper) => {
        this.setState((s) => ({ aiExcerptsLoading: { ...s.aiExcerptsLoading, [idx]: true } }));
        setTimeout(() => {
          const generated = [
            { text: `"${paper.title.split(' ').slice(0,6).join(' ')} — findings suggest a statistically significant effect (p<0.001) with consistent results across subgroups, supporting applicability in routine clinical practice."`, src: 'AI summary · Methods, p.3', aiGenerated: true },
            { text: `"${paper.journal} data confirms that the intervention produced clinically meaningful improvements in the primary endpoint, with an effect size exceeding the pre-specified minimum clinically important difference."`, src: 'AI summary · Results, p.5', aiGenerated: true },
            { text: `"Pooled analysis across ${paper.year} data demonstrates robust reproducibility; sensitivity analyses were consistent with main findings, reinforcing the reliability of the reported outcomes."`, src: 'AI summary · Discussion, p.7', aiGenerated: true },
          ];
          this.setState((s) => ({
            aiExcerptsLoading: { ...s.aiExcerptsLoading, [idx]: false },
            aiExcerpts: { ...s.aiExcerpts, [idx]: generated },
          }));
        }, 1800);
      },
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
        label: n[0], go: () => this.go(n[1]),
        active: (i === 0 && S_ === 'dash') || (i === 1 && S_ === 'settings'),
        style: `display:flex;align-items:center;gap:10px;padding:9px 20px 9px 18px;cursor:pointer;font-size:13px`,
      })),
      workspaceSearch: st.workspaceSearch,
      onWorkspaceSearch: (e) => this.setState({ workspaceSearch: e.target.value }),
      sidebarWorkspaces: (() => {
        const q = st.workspaceSearch.trim().toLowerCase();
        const allWs = [
          ...st.createdWorkspaces.map((w) => ({
            id: w.id, topic: w.name, status: w.status, created: w.created,
            go: () => this.go(w.to), dotColor: w.dotColor, isActive: w.id === st.activeWorkspaceId,
            isCreated: true,
          })),
          ...DECKS.map((d) => ({
            id: d.topic, topic: d.topic, status: d.status, created: d.created,
            go: () => this.go(d.to),
            dotColor: d.status === 'Completed' ? 'var(--ok)' : d.status === 'Awaiting MA Review' ? 'var(--acc)' : d.status === 'Research in Progress' ? '#a78bfa' : 'var(--faint)',
            isActive: false, isCreated: false,
          })),
        ];
        return q ? allWs.filter((w) => w.topic.toLowerCase().includes(q) || w.status.toLowerCase().includes(q)) : allWs;
      })(),
      createdWorkspaces: st.createdWorkspaces,
      activeWorkspaceId: st.activeWorkspaceId,
      sidebarExpandedWs: st.sidebarExpandedWs,
      toggleSidebarWs: (id) => this.setState((s) => ({ sidebarExpandedWs: s.sidebarExpandedWs === id ? null : id })),
      sidebarCollapsed: st.sidebarCollapsed,
      toggleSidebar: () => this.setState((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),

      stats: [
        { label: 'WORKSPACES IN PROGRESS', value: '4', delta: '2 in generation', c: 'var(--ink)' },
        { label: 'PENDING YOUR REVIEW', value: '2', delta: 'oldest 1 day', c: 'var(--acc)' },
        { label: 'COMPLETED THIS MONTH', value: '18', delta: '+5 vs August', c: 'var(--ok)' },
      ].map((k, i) => ({
        ...k,
        style: `padding:26px 32px 28px;min-width:0;border-right:${i < 2 ? '1px solid var(--rule)' : '0'}`,
        numStyle: `font:700 40px/1 var(--mono);letter-spacing:-0.03em;color:${k.c}`,
      })),

      decks: DECKS.map((d) => {
        const barColor = d.status === 'Completed' ? 'var(--ok)' : d.status === 'Awaiting MA Review' ? 'var(--acc)' : d.status === 'Research in Progress' ? '#7c3aed' : 'var(--dim)';
        const leftBorder = d.status === 'Completed' ? 'var(--ok)' : d.status === 'Awaiting MA Review' ? 'var(--acc)' : d.status === 'Research in Progress' ? '#7c3aed' : 'var(--dim)';
        return {
          topic: d.topic, area: d.area, status: d.status, created: d.created,
          pill: this.pill(d.status), go: () => this.go(d.to),
          stagePct: Math.round((d.stage / 7) * 100),
          stage: d.stage, stageName: STAGE_NAMES[d.stage - 1] || '',
          barColor, leftBorder,
        };
      }),

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

      workspaceName: st.workspaceName,
      onWorkspaceName: (e) => this.setState({ workspaceName: e.target.value }),
      agentContext: st.agentContext,
      onAgentContext: (e) => this.setState({ agentContext: e.target.value }),
      topic: st.topic, fromQueue: st.fromQueue,
      onTopic: (e) => this.setState({ topic: e.target.value }),
      heroProduct: st.heroProduct,
      onHeroProduct: (e) => this.setState({ heroProduct: e.target.value }),
      area: st.area, areas: ['Endocrinology / Metabolic', 'Cardiology', 'Nephrology', 'Hepatology', 'Obesity / Cardiometabolic'], onArea: (e) => this.setState({ area: e.target.value }),
      region: st.region, regions: ['EU (EMA)', 'US (FDA)', 'UK (MHRA)', 'Japan (PMDA)', 'Global — strictest union'], onRegion: (e) => this.setState({ region: e.target.value }),
      lang: st.lang, langs: ['English (UK)', 'English (US)', 'German', 'Spanish', 'Japanese'], onLang: (e) => this.setState({ lang: e.target.value }),
      audiences: ['HCP', 'KOL', 'Plus Jakarta Sansnal'].map((a) => {
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
      startGen: () => {
        this.setState({
          sectionSelectTracks: CONTENT_TRACKS.map(t => t.id),
          sectionSelectCustom: [],
          sectionSelectInput: '',
        }, () => this.go('section-select'));
      },
      skipToHub: () => {
        const id = Date.now();
        const ws = {
          id, name: st.workspaceName.trim() || st.topic, topic: st.topic,
          status: 'Research in Progress', created: 'Today', to: 'workspace-hub', dotColor: '#a78bfa',
        };
        this.setState((s) => ({
          createdWorkspaces: [ws, ...s.createdWorkspaces], activeWorkspaceId: id,
          wsResearches: [], wsActiveResearch: null, sidebarExpandedWs: id,
        }), () => this.go('workspace-hub'));
      },
      wsResearches: st.wsResearches,
      wsActiveResearch: st.wsActiveResearch,
      setWsActiveResearch: (id) => this.setState({ wsActiveResearch: id }),
      createWsResearch: () => this.setState((s) => {
        if (s.wsResearches.length >= 5) return null;
        const newId = s.wsResearches.length + 1;
        return { wsResearches: [...s.wsResearches, { id: newId, name: `Research ${newId}`, status: 'in-progress', artifacts: [] }], wsActiveResearch: newId };
      }, () => this.go('research')),
      addWsResearch: () => this.setState((s) => {
        if (s.wsResearches.length >= 5) return null;
        const newId = s.wsResearches.length + 1;
        return { wsResearches: [...s.wsResearches, { id: newId, name: `Research ${newId}`, status: 'in-progress', artifacts: [] }], wsActiveResearch: newId };
      }, () => this.go('research')),

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

      /* ---------- section select ---------- */
      sectionSelectTracks: st.sectionSelectTracks,
      sectionSelectCustom: st.sectionSelectCustom,
      sectionSelectInput: st.sectionSelectInput,
      onSectionSelectInput: (e) => this.setState({ sectionSelectInput: e.target.value }),
      toggleSectionTrack: (id) => this.setState((s) => ({
        sectionSelectTracks: s.sectionSelectTracks.includes(id)
          ? s.sectionSelectTracks.filter(x => x !== id)
          : [...s.sectionSelectTracks, id],
      })),
      toggleCustomSection: (label) => this.setState((s) => ({
        sectionSelectCustom: s.sectionSelectCustom.map(c => c.label === label ? { ...c, on: !c.on } : c),
      })),
      addCustomSection: () => {
        const label = st.sectionSelectInput.trim();
        if (!label) return;
        this.setState((s) => ({
          sectionSelectCustom: [...s.sectionSelectCustom, { label, on: true, color: '#60a5fa' }],
          sectionSelectInput: '',
        }));
      },
      proceedFromSectionSelect: () => {
        const id = Date.now();
        const ws = {
          id, name: st.workspaceName.trim() || st.topic, topic: st.topic,
          status: 'Research in Progress', created: 'Today', to: 'research', dotColor: '#a78bfa',
        };
        const r1 = { id: 1, name: 'Research 1', status: 'in-progress', artifacts: [] };
        this.setState((s) => ({
          createdWorkspaces: [ws, ...s.createdWorkspaces], activeWorkspaceId: id,
          wsResearches: [r1], wsActiveResearch: 1, sidebarExpandedWs: id,
        }), () => this.go('research'));
      },

      /* ---------- combined excerpts modal ---------- */
      combinedExcerptsModal: st.combinedExcerptsModal,
      openCombinedExcerpts: (obj) => this.setState({ combinedExcerptsModal: obj }),
      closeCombinedExcerpts: () => this.setState({ combinedExcerptsModal: null }),

      /* ---------- figure management ---------- */
      figureSelections: st.figureSelections,
      toggleFigureInclude: (key) => this.setState((s) => {
        const cur = s.figureSelections[key] || { included: false, artifacts: [], tracks: [], useAs: null };
        return { figureSelections: { ...s.figureSelections, [key]: { ...cur, included: !cur.included } } };
      }),
      toggleFigureArtifact: (key, a) => this.setState((s) => {
        const cur = s.figureSelections[key] || { included: true, artifacts: [], tracks: [], useAs: null };
        const arts = cur.artifacts.includes(a) ? cur.artifacts.filter(x => x !== a) : [...cur.artifacts, a];
        return { figureSelections: { ...s.figureSelections, [key]: { ...cur, artifacts: arts } } };
      }),
      toggleFigureTrack: (key, t) => this.setState((s) => {
        const cur = s.figureSelections[key] || { included: true, artifacts: [], tracks: [], useAs: null };
        const tracks = cur.tracks.includes(t) ? cur.tracks.filter(x => x !== t) : [...cur.tracks, t];
        return { figureSelections: { ...s.figureSelections, [key]: { ...cur, tracks } } };
      }),
      setFigureUseAs: (key, val) => this.setState((s) => {
        const cur = s.figureSelections[key] || { included: true, artifacts: [], tracks: [], useAs: null };
        return { figureSelections: { ...s.figureSelections, [key]: { ...cur, useAs: val } } };
      }),
      confirmFigures: () => {
        this.setState({ figureSelections: st.figureSelections });
      },
      uploadedFigures: st.uploadedFigures,
      addUploadedFigure: (fig) => this.setState((s) => ({ uploadedFigures: [...s.uploadedFigures, fig] })),
      removeUploadedFigure: (id) => this.setState((s) => ({ uploadedFigures: s.uploadedFigures.filter(f => f.id !== id) })),

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
    const label = 'font:600 10px/1 Plus Jakarta Sans;letter-spacing:0.13em;color:var(--dim);margin-bottom:12px;display:block';
    const kicker = 'font:600 10px/1 Plus Jakarta Sans;letter-spacing:0.16em;color:var(--faint)';
    const fieldCss = 'width:100%;background:var(--s1);border:1px solid var(--rule);padding:11px 12px;border-radius:8px';

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
        <div ref={this.rootRef} style={S('font-family:Plus Jakarta Sans,system-ui,sans-serif;background:var(--bg);color:var(--ink);height:100vh;display:flex;font-size:14px;line-height:1.45;-webkit-font-smoothing:antialiased')}>
          {/* left panel — branding (dark navy) */}
          <div style={{ width: 440, flexShrink: 0, display: 'flex', flexDirection: 'column', padding: '52px 48px', background: 'linear-gradient(170deg,#1e3370 0%,#0d1a4a 100%)', color: '#e8eef8' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 'auto' }}>
              <div style={{ width: 16, height: 16, background: '#60a5fa' }} />
              <div style={{ fontWeight: 800, fontSize: 17, letterSpacing: '-0.02em', color: '#e8eef8' }}>MedFactory</div>
            </div>
            <div>
              <div style={{ font: '700 9px/1 Plus Jakarta Sans', letterSpacing: '0.18em', color: '#60a5fa', marginBottom: 18 }}>MEDICAL AFFAIRS · CONTENT PIPELINE</div>
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
              <div style={{ font: '600 9.5px/1 Plus Jakarta Sans', letterSpacing: '0.14em', color: '#4d6fa0', marginBottom: 10 }}>DEMO CREDENTIALS</div>
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
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px', background: 'rgba(44,82,204,0.08)', borderRadius: 20, marginBottom: 20 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--acc)' }} />
                <span style={{ font: '700 10px/1 Plus Jakarta Sans', letterSpacing: '0.14em', color: 'var(--acc)' }}>SIGN IN</span>
              </div>
              <h2 style={S('font-size:30px;font-weight:800;letter-spacing:-0.04em;margin:0 0 6px;color:var(--ink)')}>Welcome back</h2>
              <div style={S('font:400 13.5px/1 Plus Jakarta Sans;color:var(--faint);margin-bottom:32px')}>Sign in to your MedFactory workspace</div>

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
                  <div style={S('padding:11px 14px;background:rgba(44,82,204,0.08);border-left:3px solid var(--acc);color:var(--acc);font-size:13px')}>
                    {loginError}
                  </div>
                )}

                <Box
                  css="background:linear-gradient(135deg,#2c52cc,#4468e0);color:#fff;font-weight:700;padding:15px;text-align:center;cursor:pointer;font-size:14px;margin-top:4px;border-radius:8px"
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
        style={S('font-family:Plus Jakarta Sans,system-ui,sans-serif;background:var(--bg);color:var(--ink);height:100vh;min-width:1280px;display:flex;overflow:hidden;font-size:14px;line-height:1.45;-webkit-font-smoothing:antialiased')}
      >
        {/* ---------------- sidebar (role-aware) ---------------- */}
        <aside style={{ width: v.sidebarCollapsed ? 56 : 240, flexShrink: 0, display: 'flex', flexDirection: 'column', background: 'linear-gradient(170deg,#1e3370 0%,#0d1a4a 100%)', transition: 'width 0.22s cubic-bezier(0.4,0,0.2,1)', overflow: 'hidden', '--ink': '#e8eef8', '--dim': '#a8c0e8', '--faint': '#5878a8', '--rule': 'rgba(232,238,248,0.1)', '--rule2': 'rgba(232,238,248,0.18)', '--s1': 'rgba(255,255,255,0.07)', '--s2': 'rgba(255,255,255,0.12)', '--bg': '#1a2d6b', '--acc': '#60a5fa', '--ok': '#4ade80', '--warn': '#fbbf24' }}>
          {/* Logo row + collapse toggle */}
          <div style={{ padding: '16px 14px 14px', borderBottom: '1px solid rgba(232,238,248,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, overflow: 'hidden' }}>
              <div style={{ width: 20, height: 20, background: v.isCreator ? '#60a5fa' : reviewerAccent, flexShrink: 0, borderRadius: 3 }} />
              {!v.sidebarCollapsed && <div style={{ fontWeight: 800, letterSpacing: '-0.02em', fontSize: 15, color: '#e8eef8', whiteSpace: 'nowrap' }}>MedFactory</div>}
            </div>
            <button
              onClick={v.toggleSidebar}
              style={{ background: 'rgba(255,255,255,0.08)', border: 'none', cursor: 'pointer', padding: '5px 7px', display: 'flex', alignItems: 'center', borderRadius: 4, color: '#a8c0e8', flexShrink: 0 }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                {v.sidebarCollapsed
                  ? <path d="M4 2l6 5-6 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  : <path d="M10 2L4 7l6 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                }
              </svg>
            </button>
          </div>

          {/* role badge */}
          {!v.isCreator && !v.sidebarCollapsed && (
            <div style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.07)', borderBottom: '1px solid rgba(232,238,248,0.1)', display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: reviewerAccent }} />
              <div style={{ font: '700 9.5px/1 Plus Jakarta Sans', letterSpacing: '0.14em', color: reviewerAccent }}>{reviewerLabel}</div>
            </div>
          )}

          {v.isCreator ? (
            <>
              {/* Top nav: Dashboard + Settings */}
              <nav style={{ display: 'flex', flexDirection: 'column', padding: '8px 0', borderBottom: '1px solid rgba(232,238,248,0.1)', flexShrink: 0 }}>
                {v.nav.map((it, i) => {
                  const navIcons = [
                    <svg key="d" width="15" height="15" viewBox="0 0 15 15" fill="none"><rect x="1" y="1" width="5.5" height="5.5" stroke="currentColor" strokeWidth="1.4"/><rect x="8.5" y="1" width="5.5" height="5.5" stroke="currentColor" strokeWidth="1.4"/><rect x="1" y="8.5" width="5.5" height="5.5" stroke="currentColor" strokeWidth="1.4"/><rect x="8.5" y="8.5" width="5.5" height="5.5" stroke="currentColor" strokeWidth="1.4"/></svg>,
                    <svg key="s" width="15" height="15" viewBox="0 0 15 15" fill="none"><circle cx="7.5" cy="7.5" r="2" stroke="currentColor" strokeWidth="1.4"/><path d="M7.5 1v2M7.5 12v2M1 7.5h2M12 7.5h2M2.9 2.9l1.4 1.4M10.7 10.7l1.4 1.4M2.9 12.1l1.4-1.4M10.7 4.3l1.4-1.4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>,
                  ];
                  return (
                    <Box
                      key={i}
                      css={`display:flex;align-items:center;gap:10px;padding:9px ${v.sidebarCollapsed ? '0' : '16px'};cursor:pointer;font-size:12.5px;font-weight:${it.active ? 600 : 400};color:${it.active ? '#e8eef8' : '#a8c0e8'};${v.sidebarCollapsed ? 'justify-content:center' : ''}`}
                      hover="background:rgba(255,255,255,0.08);color:#e8eef8"
                      onClick={it.go}
                    >
                      {it.active && !v.sidebarCollapsed && <span style={{ width: 2, height: 14, background: '#60a5fa', flexShrink: 0 }} />}
                      <span style={{ flexShrink: 0, opacity: it.active ? 1 : 0.7 }}>{navIcons[i]}</span>
                      {!v.sidebarCollapsed && <span style={{ whiteSpace: 'nowrap' }}>{it.label}</span>}
                      {!v.sidebarCollapsed && i === 0 && v.unreadCount > 0 && (
                        <span style={{ marginLeft: 'auto', background: '#60a5fa', color: '#fff', font: '700 9px/1 Plus Jakarta Sans', padding: '2px 6px', borderRadius: 3 }}>{v.unreadCount}</span>
                      )}
                    </Box>
                  );
                })}
              </nav>

              {/* Workspaces section */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                {v.sidebarCollapsed ? (
                  /* Collapsed: just a + icon */
                  <div style={{ padding: '12px 0', display: 'flex', justifyContent: 'center', borderBottom: '1px solid rgba(232,238,248,0.1)', flexShrink: 0 }}>
                    <Box css="cursor:pointer;color:#60a5fa;display:flex;align-items:center;justify-content:center;padding:6px" hover="background:rgba(255,255,255,0.08)" onClick={v.goIntake}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
                    </Box>
                  </div>
                ) : (
                  /* Section header + New button */
                  <div style={{ padding: '14px 16px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
                    <span style={{ font: '600 9px/1 Plus Jakarta Sans', letterSpacing: '0.14em', color: '#5878a8' }}>WORKSPACES</span>
                    <Box
                      css="font:700 10px/1 Plus Jakarta Sans;letter-spacing:0.06em;color:#60a5fa;cursor:pointer;padding:3px 8px;border:1px solid rgba(96,165,250,0.3)"
                      hover="background:rgba(96,165,250,0.12)"
                      onClick={v.goIntake}
                    >+ NEW</Box>
                  </div>
                )}

                {/* Search */}
                {!v.sidebarCollapsed && <div style={S('padding:0 14px 10px;flex-shrink:0')}>
                  <div style={S('display:flex;align-items:center;gap:8px;background:var(--s1);border:1px solid var(--rule);padding:7px 10px')}>
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                      <circle cx="4.5" cy="4.5" r="3.5" stroke="currentColor" strokeWidth="1.4" style={{ color: 'var(--faint)' }}/>
                      <line x1="7.5" y1="7.5" x2="10" y2="10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" style={{ color: 'var(--faint)' }}/>
                    </svg>
                    <input
                      value={v.workspaceSearch}
                      onChange={v.onWorkspaceSearch}
                      placeholder="Search workspaces…"
                      style={S('flex:1;background:transparent;border:none;outline:none;font:400 11.5px/1 Plus Jakarta Sans;color:var(--ink);min-width:0')}
                    />
                    {v.workspaceSearch && (
                      <span
                        style={S('color:var(--faint);cursor:pointer;font-size:12px;flex-shrink:0')}
                        onClick={() => this.setState({ workspaceSearch: '' })}
                      >✕</span>
                    )}
                  </div>
                </div>}

                {/* Workspace list */}
                {!v.sidebarCollapsed && <div style={S('flex:1;overflow-y:auto;padding-bottom:8px')}>
                  {v.sidebarWorkspaces.length === 0 ? (
                    <div style={S('padding:16px 20px;font:400 11.5px/1.5 Plus Jakarta Sans;color:var(--faint)')}>
                      No workspaces match your search.
                    </div>
                  ) : (() => {
                    const created = v.sidebarWorkspaces.filter((w) => w.isCreated);
                    const legacy = v.sidebarWorkspaces.filter((w) => !w.isCreated);
                    return (
                      <>
                        {/* Created workspaces — tree */}
                        {created.map((ws) => {
                          const isExpanded = v.sidebarExpandedWs === ws.id;
                          return (
                            <div key={ws.id} style={S(`border-bottom:1px solid var(--rule)`)}>
                              {/* Workspace header row */}
                              <Box
                                css={`display:flex;align-items:center;gap:9px;padding:11px 14px 11px 14px;cursor:pointer;${ws.isActive ? 'background:rgba(44,82,204,0.1);border-left:2px solid var(--acc)' : 'padding-left:16px'}`}
                                hover={!ws.isActive ? 'background:var(--s1)' : ''}
                                onClick={() => { ws.go(); v.toggleSidebarWs(ws.id); }}
                              >
                                {/* Folder icon */}
                                <svg width="14" height="12" viewBox="0 0 14 12" fill="none" style={{ flexShrink: 0, color: ws.isActive ? 'var(--acc)' : 'var(--faint)' }}>
                                  <path d="M1 2.5h4l1.5 1.5H13v7H1V2.5z" stroke="currentColor" strokeWidth="1.3" fill={ws.isActive ? 'rgba(44,82,204,0.15)' : 'transparent'}/>
                                </svg>
                                <div style={S('flex:1;min-width:0')}>
                                  <div style={S('font:700 11.5px/1.3 Plus Jakarta Sans;color:var(--ink);overflow:hidden;text-overflow:ellipsis;white-space:nowrap')}>{ws.topic}</div>
                                  {ws.isActive && <div style={{ font: '500 9.5px/1 Plus Jakarta Sans', color: 'var(--acc)', marginTop: 3 }}>Active workspace</div>}
                                </div>
                                {ws.isActive && (
                                  <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--acc)', flexShrink: 0, animation: 'puls 1.4s infinite' }} />
                                )}
                                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" style={{ flexShrink: 0, transform: isExpanded ? 'rotate(90deg)' : 'none', transition: 'transform 0.15s', color: 'var(--faint)' }}>
                                  <path d="M2 1l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square"/>
                                </svg>
                              </Box>

                              {/* Research sessions — tree children */}
                              {isExpanded && (
                                <div style={{ background: 'rgba(0,0,0,0.025)', paddingBottom: 6 }}>
                                  {v.wsResearches.length === 0 ? (
                                    <div style={{ padding: '10px 14px 6px 36px', font: '400 11px/1.5 Plus Jakarta Sans', color: 'var(--faint)' }}>
                                      No research sessions yet
                                    </div>
                                  ) : v.wsResearches.map((r, ri) => {
                                    const isDone = r.status === 'complete';
                                    const isInProgress = r.status === 'in-progress';
                                    const isActiveR = r.id === v.wsActiveResearch;
                                    const isLast = ri === v.wsResearches.length - 1;
                                    return (
                                      <Box
                                        key={r.id}
                                        css={`display:flex;align-items:center;gap:0;padding:0;cursor:pointer;${isActiveR ? 'background:rgba(44,82,204,0.07)' : ''}`}
                                        hover="background:rgba(255,255,255,0.5)"
                                        onClick={() => { v.setWsActiveResearch(r.id); this.go('workspace-hub'); }}
                                      >
                                        {/* Tree line */}
                                        <div style={{ width: 28, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', alignSelf: 'stretch', position: 'relative' }}>
                                          <div style={{ position: 'absolute', left: 14, top: 0, bottom: isLast ? '50%' : 0, width: 1, background: 'rgba(255,255,255,0.12)' }} />
                                          <div style={{ position: 'absolute', left: 14, top: '50%', width: 8, height: 1, background: 'rgba(255,255,255,0.12)' }} />
                                        </div>
                                        {/* Content */}
                                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px 8px 4px' }}>
                                          {/* Status dot */}
                                          <div style={{ width: 7, height: 7, borderRadius: '50%', background: isDone ? 'var(--ok)' : isInProgress ? '#a78bfa' : 'var(--faint)', flexShrink: 0 }} />
                                          <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{ font: `${isActiveR ? 600 : 500} 11.5px/1.3 Plus Jakarta Sans`, color: isActiveR ? 'var(--ink)' : 'var(--dim)' }}>{r.name}</div>
                                            <div style={{ font: '400 10px/1 Plus Jakarta Sans', color: isDone ? 'var(--ok)' : isInProgress ? '#a78bfa' : 'var(--faint)', marginTop: 2 }}>
                                              {isDone ? 'Complete' : isInProgress ? 'In progress' : 'Not started'}
                                            </div>
                                          </div>
                                          {isDone && (
                                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}>
                                              <circle cx="6" cy="6" r="5" fill="var(--ok)" opacity="0.2"/>
                                              <path d="M3.5 6l2 2 3-3.5" stroke="var(--ok)" strokeWidth="1.4" strokeLinecap="square"/>
                                            </svg>
                                          )}
                                        </div>
                                      </Box>
                                    );
                                  })}
                                  {v.wsResearches.length < 5 && (
                                    <Box
                                      css="display:flex;align-items:center;gap:8px;padding:7px 12px 7px 36px;cursor:pointer;color:var(--acc);font:600 10.5px/1 Plus Jakarta Sans;opacity:0.8"
                                      hover="opacity:1;background:rgba(255,255,255,0.4)"
                                      onClick={v.addWsResearch}
                                    >
                                      <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M4.5 1v7M1 4.5h7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square"/></svg>
                                      Add Research
                                    </Box>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}

                        {/* Divider between created and legacy */}
                        {created.length > 0 && legacy.length > 0 && (
                          <div style={S('padding:10px 20px 6px;font:600 9px/1 Plus Jakarta Sans;letter-spacing:0.14em;color:var(--faint)')}>OTHER WORKSPACES</div>
                        )}

                        {/* Legacy DECKS — flat list */}
                        {legacy.map((ws, i) => (
                          <Box
                            key={ws.id || i}
                            css="display:flex;align-items:center;gap:10px;padding:9px 14px 9px 20px;cursor:pointer;border-bottom:1px solid var(--rule)"
                            hover="background:var(--s1)"
                            onClick={ws.go}
                          >
                            <div style={{ width: 6, height: 6, borderRadius: '50%', background: ws.dotColor, flexShrink: 0 }} />
                            <div style={S('flex:1;min-width:0')}>
                              <div style={S('font:500 11px/1.35 Plus Jakarta Sans;color:var(--dim);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-bottom:2px')}>{ws.topic}</div>
                              <div style={S('display:flex;align-items:center;justify-content:space-between;gap:6px')}>
                                <span style={{ font: '500 9.5px/1 Plus Jakarta Sans', color: ws.dotColor }}>{ws.status}</span>
                                <span style={S('font:400 9.5px/1 var(--mono);color:var(--faint);flex-shrink:0')}>{ws.created}</span>
                              </div>
                            </div>
                          </Box>
                        ))}
                      </>
                    );
                  })()}
                </div>}
              </div>
            </>
          ) : (
            <>
              <nav style={S('display:flex;flex-direction:column;padding:12px 0;flex:1')}>
                {reviewerSidebarItems.map(([lbl, scr], i) => (
                  <Box key={i} css={`display:flex;align-items:center;gap:10px;padding:10px 20px;cursor:pointer;font-size:13px;color:${S_ === scr && i === 0 ? 'var(--ink)' : 'var(--dim)'};font-weight:${S_ === scr && i === 0 ? 700 : 400}`} hover="color:var(--ink)" onClick={() => this.go(scr)}>
                    <span style={S(`width:2px;height:14px;background:${S_ === scr && i === 0 ? reviewerAccent : 'transparent'}`)} />
                    {lbl}
                    {i === 0 && v.unreadCount > 0 && <span style={S(`margin-left:auto;background:${reviewerAccent};color:${v.isMA ? '#000' : '#fff'};font:700 9px/1 Plus Jakarta Sans;padding:2px 6px`)}>{v.unreadCount}</span>}
                  </Box>
                ))}
              </nav>
            </>
          )}

          {!v.sidebarCollapsed && (
            <Box
              css="display:flex;align-items:center;justify-content:space-between;padding:10px 16px;border-top:1px solid rgba(232,238,248,0.1);cursor:pointer;color:#8aaad4;font-size:11.5px"
              hover="color:#e8eef8"
              onClick={v.toggleDir}
            >
              <span>Direction</span>
              <span style={{ fontWeight: 700, color: '#60a5fa' }}>{v.dirLabel}</span>
            </Box>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: v.sidebarCollapsed ? '12px 0' : '12px 16px', borderTop: '1px solid rgba(232,238,248,0.1)', justifyContent: v.sidebarCollapsed ? 'center' : 'flex-start' }}>
            <div style={{ width: 28, height: 28, background: 'rgba(255,255,255,0.12)', borderBottom: `2px solid ${v.isCreator ? '#60a5fa' : reviewerAccent}`, display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 11, flexShrink: 0, color: '#e8eef8', borderRadius: 4 }}>{v.isCreator ? 'MG' : reviewerInitials}</div>
            {!v.sidebarCollapsed && (
              <div style={{ minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: 12, color: '#e8eef8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{v.isCreator ? 'Mayank Gupta' : reviewerName}</div>
                <div style={{ color: '#5878a8', fontSize: 10.5, marginTop: 2 }}>{v.isCreator ? 'Medical Affairs Lead' : reviewerRole}</div>
              </div>
            )}
          </div>

          {!v.sidebarCollapsed && (
            <Box
              css="display:flex;align-items:center;gap:8px;padding:10px 16px;border-top:1px solid rgba(232,238,248,0.12);cursor:pointer;color:#5878a8;font-size:12px"
              hover="color:#e8eef8"
              onClick={v.switchRole}
            >
              <span style={{ fontSize: 10 }}>⇄</span> Switch Role
            </Box>
          )}
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
                {/* ── Hero header ── */}
                <div style={{ background: 'linear-gradient(135deg,#eef2fb 0%,#f7f9fd 60%,#f0f4ff 100%)', padding: '40px 40px 36px', borderBottom: '1px solid var(--rule)', position: 'relative', overflow: 'hidden' }}>
                  {/* decorative accent blob */}
                  <div style={{ position: 'absolute', right: 280, top: -60, width: 260, height: 260, borderRadius: '50%', background: 'radial-gradient(circle,rgba(44,82,204,0.07) 0%,transparent 70%)', pointerEvents: 'none' }} />
                  <div style={{ position: 'absolute', right: 40, top: -30, width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle,rgba(68,104,224,0.05) 0%,transparent 70%)', pointerEvents: 'none' }} />
                  <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 32, position: 'relative' }}>
                    <div>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(44,82,204,0.08)', borderRadius: 20, padding: '5px 12px', marginBottom: 18 }}>
                        <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--acc)' }} />
                        <span style={{ font: '700 9.5px/1 Plus Jakarta Sans', letterSpacing: '0.16em', color: 'var(--acc)' }}>TUESDAY · 2 SEPTEMBER 2026</span>
                      </div>
                      <h1 style={{ fontSize: 38, fontWeight: 800, letterSpacing: '-0.04em', margin: '0 0 10px', color: 'var(--ink)', lineHeight: 1.1 }}>Good morning, Mayank</h1>
                      <div style={{ color: 'var(--dim)', fontSize: 14, lineHeight: 1.6, maxWidth: '52ch' }}>
                        Two workspaces need your sign-off before they move to Munal. September&apos;s topic queue is ready for approval.
                      </div>
                    </div>
                    <Box
                      css="flex:none;background:linear-gradient(135deg,#2c52cc,#4468e0);color:#fff;font-weight:700;padding:15px 26px;cursor:pointer;display:flex;align-items:center;gap:12px;border-radius:12px;box-shadow:0 4px 20px rgba(44,82,204,0.28);white-space:nowrap"
                      hover="opacity:0.88;box-shadow:0 6px 24px rgba(44,82,204,0.36)"
                      onClick={v.goIntake}
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2v12M2 8h12" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
                      <span style={{ fontSize: 14 }}>Create a New Workspace</span>
                    </Box>
                  </div>
                </div>

                {/* ── Stat cards ── */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, padding: '24px 40px' }}>
                  {[
                    { label: 'WORKSPACES IN PROGRESS', value: '4', delta: '2 in generation', color: 'var(--ink)', bg: 'rgba(15,31,74,0.04)', accent: '#0f1f4a' },
                    { label: 'PENDING YOUR REVIEW', value: '2', delta: 'oldest 1 day', color: 'var(--acc)', bg: 'rgba(44,82,204,0.06)', accent: '#2c52cc' },
                    { label: 'COMPLETED THIS MONTH', value: '18', delta: '+5 vs August', color: 'var(--ok)', bg: 'rgba(22,101,52,0.06)', accent: '#166534' },
                  ].map((k, i) => (
                    <div key={i} style={{ background: '#fff', borderRadius: 14, padding: '22px 24px', boxShadow: '0 1px 3px rgba(15,31,74,0.06),0 4px 16px rgba(15,31,74,0.05)', border: '1px solid var(--rule)', position: 'relative', overflow: 'hidden' }}>
                      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: k.accent, borderRadius: '14px 14px 0 0' }} />
                      <div style={{ font: '600 9.5px/1 Plus Jakarta Sans', letterSpacing: '0.14em', color: 'var(--faint)', marginBottom: 14 }}>{k.label}</div>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                        <div style={{ font: `800 40px/1 Plus Jakarta Sans`, letterSpacing: '-0.04em', color: k.color }}>{k.value}</div>
                        <div style={{ background: k.bg, borderRadius: 20, padding: '3px 10px', font: '600 11px/1 Plus Jakarta Sans', color: k.accent }}>{k.delta}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* ── Recent workspaces ── */}
                <div style={{ padding: '4px 40px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <h2 style={{ font: '700 13px/1 Plus Jakarta Sans', letterSpacing: '0.1em', margin: 0, color: 'var(--ink)' }}>RECENT WORKSPACES</h2>
                    <div style={{ background: 'var(--s2)', borderRadius: 20, padding: '3px 10px', font: '700 11px/1 Plus Jakarta Sans', color: 'var(--faint)' }}>6 of 24</div>
                  </div>
                  <div style={{ font: '600 12px/1 Plus Jakarta Sans', color: 'var(--acc)', cursor: 'pointer' }}>View all →</div>
                </div>

                <div style={{ padding: '0 40px 40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  {v.decks.map((d, i) => (
                    <Box
                      key={i}
                      css={`display:flex;flex-direction:column;background:#fff;border:1px solid var(--rule);cursor:pointer;border-radius:14px;overflow:hidden;animation:cardIn 0.32s ease both`}
                      hover={`border-color:${d.leftBorder};box-shadow:0 8px 28px rgba(15,31,74,0.12);transform:translateY(-2px)`}
                      onClick={d.go}
                      style={{ animationDelay: `${i * 0.06}s`, boxShadow: '0 1px 4px rgba(15,31,74,0.06),0 4px 16px rgba(15,31,74,0.05)', transition: 'transform 0.18s,box-shadow 0.18s,border-color 0.18s' }}
                    >
                      {/* top accent bar */}
                      <div style={{ height: 3, background: d.leftBorder, flexShrink: 0 }} />
                      <div style={{ padding: '18px 20px 20px', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                          <div style={{ font: '500 10.5px/1 Plus Jakarta Sans', color: 'var(--faint)', letterSpacing: '0.02em' }}>Created {d.created}</div>
                          <span style={S(d.pill)}>{d.status}</span>
                        </div>
                        <div style={{ font: '700 15px/1.4 Plus Jakarta Sans', letterSpacing: '-0.01em', color: 'var(--ink)', flex: 1 }}>{d.topic}</div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div style={{ height: 4, width: 80, background: 'var(--s2)', borderRadius: 4, overflow: 'hidden' }}>
                              <div style={{ height: '100%', width: `${d.stagePct}%`, background: d.leftBorder, borderRadius: 4 }} />
                            </div>
                            <span style={{ font: '500 10px/1 Plus Jakarta Sans', color: 'var(--faint)' }}>Stage {d.stage}/7</span>
                          </div>
                          <div style={{ width: 28, height: 28, borderRadius: '50%', background: `${d.leftBorder}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ fontSize: 13, color: d.leftBorder }}>→</span>
                          </div>
                        </div>
                      </div>
                    </Box>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ============ 2 · INTAKE ============ */}
          {v.isIntake && (
            <div style={S('max-width:720px;margin:0 auto;padding:44px 40px 80px')}>

              {/* Back button — top */}
              <Box
                css="display:inline-flex;align-items:center;gap:5px;padding:6px 10px;font:600 11px/1 Plus Jakarta Sans;color:var(--faint);cursor:pointer;border:1px solid var(--rule2);border-radius:6px;margin-bottom:28px"
                hover="color:var(--ink);border-color:var(--ink)"
                onClick={v.goBack}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M8 2L3 6l5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Back to Dashboard
              </Box>

              {/* Page header */}
              <div style={merge(kicker, 'margin-bottom:14px')}>NEW WORKSPACE · SETUP</div>
              <h1 style={S('font-size:30px;font-weight:800;letter-spacing:-0.03em;margin:0 0 8px')}>Create a New Workspace</h1>
              <div style={S('color:var(--dim);font-size:14px;margin-bottom:32px;max-width:54ch')}>
                Your workspace will hold all research, evidence, drafts, and approvals for this project.
              </div>

              {v.fromQueue && (
                <div style={S('display:inline-flex;align-items:center;gap:8px;border:1px solid var(--acc);background:rgba(44,82,204,0.06);color:var(--acc);padding:6px 12px;font:600 11.5px/1 Plus Jakarta Sans;margin-bottom:24px')}>
                  ✦ Pulled from September topic queue
                </div>
              )}

              <div style={S('display:flex;flex-direction:column;gap:0;border-top:2px solid var(--rule2)')}>

                {/* 1 — Workspace name */}
                <div style={S('padding:26px 0;border-bottom:1px solid var(--rule)')}>
                  <div style={S('display:flex;align-items:baseline;gap:10px;margin-bottom:10px')}>
                    <span style={S('font:700 10px/1 Plus Jakarta Sans;letter-spacing:0.14em;color:var(--acc)')}>01</span>
                    <label style={S('font:700 10px/1 Plus Jakarta Sans;letter-spacing:0.14em;color:var(--ink)')}>WORKSPACE NAME</label>
                  </div>
                  <input
                    value={v.workspaceName}
                    onChange={v.onWorkspaceName}
                    placeholder="e.g. Q4 Semaglutide Campaign, MASH Landscape Oct 2026"
                    style={S('width:100%;background:var(--s1);border:1px solid var(--rule2);border-left:3px solid var(--acc);padding:14px 16px;font-size:16px;font-weight:700;letter-spacing:-0.01em;color:var(--ink);border-radius:8px')}
                  />
                  <div style={S('color:var(--faint);font-size:11px;margin-top:6px')}>This name will appear in your workspace list and approval chain</div>
                </div>

                {/* 2 — Topic + Hero Product */}
                <div style={S('padding:26px 0;border-bottom:1px solid var(--rule)')}>
                  <div style={S('display:grid;grid-template-columns:1fr 1fr;gap:24px')}>
                    <div>
                      <div style={S('display:flex;align-items:baseline;gap:10px;margin-bottom:10px')}>
                        <span style={S('font:700 10px/1 Plus Jakarta Sans;letter-spacing:0.14em;color:var(--acc)')}>02</span>
                        <label style={S('font:700 10px/1 Plus Jakarta Sans;letter-spacing:0.14em;color:var(--ink)')}>TOPIC OF THE MONTH</label>
                      </div>
                      <input
                        value={v.topic}
                        onChange={v.onTopic}
                        placeholder="e.g. Type 2 Diabetes — GLP-1 RA"
                        style={S('width:100%;background:var(--s1);border:1px solid var(--rule2);border-left:3px solid var(--dim);padding:13px 14px;font-size:14px;font-weight:600;letter-spacing:-0.01em;border-radius:8px')}
                      />
                    </div>
                    <div>
                      <div style={S('display:flex;align-items:baseline;gap:10px;margin-bottom:10px')}>
                        <span style={S('font:700 10px/1 Plus Jakarta Sans;letter-spacing:0.14em;color:var(--acc)')}>03</span>
                        <label style={S('font:700 10px/1 Plus Jakarta Sans;letter-spacing:0.14em;color:var(--ink)')}>HERO PRODUCT</label>
                      </div>
                      <input
                        value={v.heroProduct}
                        onChange={v.onHeroProduct}
                        placeholder="e.g. Ozempic (Semaglutide)"
                        style={S('width:100%;background:var(--s1);border:1px solid var(--rule2);border-left:3px solid var(--warn);padding:13px 14px;font-size:14px;font-weight:600;letter-spacing:-0.01em;border-radius:8px')}
                      />
                      <div style={S('color:var(--faint);font-size:11px;margin-top:6px')}>The primary product this content supports</div>
                    </div>
                  </div>
                </div>

                {/* 3 — Target Audience */}
                <div style={S('padding:26px 0;border-bottom:1px solid var(--rule)')}>
                  <div style={S('display:flex;align-items:baseline;gap:10px;margin-bottom:12px')}>
                    <span style={S('font:700 10px/1 Plus Jakarta Sans;letter-spacing:0.14em;color:var(--acc)')}>04</span>
                    <label style={S('font:700 10px/1 Plus Jakarta Sans;letter-spacing:0.14em;color:var(--ink)')}>TARGET AUDIENCE</label>
                  </div>
                  <div style={S('display:flex;align-items:center;gap:12px')}>
                    <div style={S('display:flex;align-items:center;gap:10px;padding:11px 18px;border:2px solid var(--acc);background:rgba(44,82,204,0.07)')}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--acc)' }} />
                      <span style={S('font:700 13px/1 Plus Jakarta Sans;color:var(--acc)')}>HCP</span>
                      <span style={S('font:500 11px/1 Plus Jakarta Sans;color:var(--faint)')}>Healthcare Professional</span>
                    </div>
                    <div style={S('font:400 11.5px/1.5 Plus Jakarta Sans;color:var(--faint)')}>All content in this workspace is scoped for HCP audiences.</div>
                  </div>
                </div>

                {/* 4 — Agent Context */}
                <div style={S('padding:26px 0;border-bottom:2px solid var(--rule2)')}>
                  <div style={S('display:flex;align-items:baseline;gap:10px;margin-bottom:6px')}>
                    <span style={S('font:700 10px/1 Plus Jakarta Sans;letter-spacing:0.14em;color:var(--acc)')}>05</span>
                    <label style={S('font:700 10px/1 Plus Jakarta Sans;letter-spacing:0.14em;color:var(--ink)')}>RESEARCH AGENT CONTEXT</label>
                  </div>
                  <div style={S('color:var(--faint);font-size:11.5px;margin-bottom:12px;max-width:58ch')}>
                    Give the research agent additional context, focus areas, clinical nuances, or constraints. The more specific you are, the more targeted the evidence retrieval.
                  </div>
                  <textarea
                    value={v.agentContext}
                    onChange={v.onAgentContext}
                    rows={5}
                    placeholder={"e.g. Focus on cardiovascular outcome data from the SELECT trial and SUSTAIN-6. Prioritise RCTs and meta-analyses from 2020 onwards. Flag any evidence around renal outcomes in CKD patients. Avoid off-label framing. The audience consists of experienced endocrinologists who are already familiar with GLP-1 mechanism — no need to explain basics."}
                    style={S('width:100%;background:var(--s1);border:1px solid var(--rule2);border-left:3px solid #7c3aed;padding:14px 16px;font:400 13px/1.65 Plus Jakarta Sans;color:var(--ink);resize:vertical;border-radius:8px')}
                  />
                  <div style={S('display:flex;align-items:center;gap:16px;margin-top:8px')}>
                    <div style={S('font:500 11px/1 Plus Jakarta Sans;color:var(--faint)')}>
                      This goes directly to your research agent as its initial brief — you can refine further in the chat once research starts.
                    </div>
                    {v.agentContext.length > 0 && (
                      <span style={{ font: '600 10px/1 var(--mono)', color: 'var(--acc)', flexShrink: 0 }}>{v.agentContext.length} chars</span>
                    )}
                  </div>
                </div>

                {/* CTA — two options */}
                <div style={S('padding-top:28px;display:flex;flex-direction:column;gap:10px')}>
                  {(!v.workspaceName.trim() || !v.topic.trim()) && (
                    <div style={S('font:500 11.5px/1 Plus Jakarta Sans;color:var(--faint);margin-bottom:2px')}>
                      Workspace name and topic are required to continue.
                    </div>
                  )}
                  <div style={S('display:flex;gap:12px;align-items:stretch')}>
                    {/* Option 1: Start Research Now */}
                    <Box
                      css={`flex:1;background:${v.workspaceName.trim() && v.topic.trim() ? 'var(--acc)' : 'var(--s2)'};color:${v.workspaceName.trim() && v.topic.trim() ? '#fff' : 'var(--faint)'};font-weight:700;font-size:14px;padding:18px 20px;cursor:${v.workspaceName.trim() && v.topic.trim() ? 'pointer' : 'default'};display:flex;align-items:center;gap:10px`}
                      hover={v.workspaceName.trim() && v.topic.trim() ? 'opacity:0.88' : ''}
                      onClick={() => { if (v.workspaceName.trim() && v.topic.trim()) v.startGen(); }}
                    >
                      <div>
                        <div style={S('font:700 14px/1 Plus Jakarta Sans')}>Start Research Now</div>
                        <div style={S('font:400 11px/1.4 Plus Jakarta Sans;opacity:0.72;margin-top:5px')}>Research agent starts immediately</div>
                      </div>
                      <span style={S('margin-left:auto;font-size:18px')}>→</span>
                    </Box>

                    {/* Option 2: Skip Research */}
                    <Box
                      css={`flex:1;background:var(--s1);border:1.5px solid var(--rule2);color:${v.workspaceName.trim() && v.topic.trim() ? 'var(--ink)' : 'var(--faint)'};font-weight:700;font-size:14px;padding:18px 20px;cursor:${v.workspaceName.trim() && v.topic.trim() ? 'pointer' : 'default'};display:flex;align-items:center;gap:10px`}
                      hover={v.workspaceName.trim() && v.topic.trim() ? 'border-color:var(--dim);background:var(--s2)' : ''}
                      onClick={() => { if (v.workspaceName.trim() && v.topic.trim()) v.skipToHub(); }}
                    >
                      <div>
                        <div style={S('font:700 14px/1 Plus Jakarta Sans')}>Skip Research for Now</div>
                        <div style={S('font:400 11px/1.4 Plus Jakarta Sans;color:var(--faint);margin-top:5px')}>Set up workspace, add research later</div>
                      </div>
                      <span style={S('margin-left:auto;font-size:18px;color:var(--faint)')}>→</span>
                    </Box>
                  </div>

                  <Box
                    css="align-self:flex-start;padding:10px 16px;border:1px solid var(--rule);color:var(--faint);font:600 11.5px/1 Plus Jakarta Sans;cursor:pointer;border-radius:6px;display:inline-flex;align-items:center;gap:5px"
                    hover="border-color:var(--ink);color:var(--ink)"
                    onClick={v.goBack}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M8 2L3 6l5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    Back to Dashboard
                  </Box>
                </div>

              </div>
            </div>
          )}

          {/* ============ WORKSPACE HUB ============ */}
          {v.isWsHub && (() => {
            const activeR = v.wsResearches.find((r) => r.id === v.wsActiveResearch) || null;
            const canAdd = v.wsResearches.length < 5;
            return (
              <div style={S('display:flex;flex-direction:column;min-height:100%')}>

                {/* Header bar */}
                <div style={S('padding:28px 40px 22px;border-bottom:2px solid var(--rule2)')}>
                  <div style={S('font:600 10px/1 Plus Jakarta Sans;letter-spacing:0.14em;color:var(--faint);margin-bottom:10px')}>WORKSPACE</div>
                  <div style={S('display:flex;align-items:flex-end;justify-content:space-between;gap:24px;flex-wrap:wrap')}>
                    <div>
                      <h1 style={S('font:800 26px/1.1 Plus Jakarta Sans;letter-spacing:-0.03em;margin:0 0 10px;color:var(--ink)')}>{v.workspaceName || 'Untitled Workspace'}</h1>
                      <div style={S('display:flex;align-items:center;gap:10px;flex-wrap:wrap')}>
                        <span style={S('font:600 9px/1 Plus Jakarta Sans;letter-spacing:0.12em;color:var(--faint)')}>TOPIC</span>
                        <span style={S('font:600 12px/1 Plus Jakarta Sans;color:var(--dim);padding:3px 10px;border:1px solid var(--rule2)')}>{v.topic}</span>
                        <span style={S('font:600 9px/1 Plus Jakarta Sans;letter-spacing:0.12em;color:var(--faint)')}>HERO PRODUCT</span>
                        <span style={S('font:600 12px/1 Plus Jakarta Sans;color:var(--dim);padding:3px 10px;border:1px solid var(--warn);color:var(--warn)')}>{v.heroProduct}</span>
                        <span style={S('font:600 9px/1 Plus Jakarta Sans;letter-spacing:0.12em;color:var(--faint)')}>AUDIENCE</span>
                        <span style={S('font:600 12px/1 Plus Jakarta Sans;padding:3px 10px;border:1px solid var(--acc);color:var(--acc)')}>HCP</span>
                      </div>
                    </div>
                    <Box
                      css="background:linear-gradient(135deg,#2c52cc,#4468e0);color:#fff;font:700 13px/1 Plus Jakarta Sans;padding:13px 22px;cursor:pointer;display:flex;align-items:center;gap:10px;flex-shrink:0;border-radius:8px"
                      hover="opacity:0.88"
                      onClick={v.createWsResearch}
                    >
                      {canAdd ? (
                        <>{v.wsResearches.length === 0 ? 'Create Research' : '+ Add Research'}</>
                      ) : (
                        <>Max 5 reached</>
                      )}
                    </Box>
                  </div>
                </div>

                {/* Body */}
                <div style={S('flex:1;padding:28px 40px 48px')}>

                  {v.wsResearches.length === 0 ? (
                    <div style={S('display:flex;flex-direction:column;align-items:center;justify-content:center;padding:72px 40px;text-align:center')}>
                      <div style={S('width:48px;height:48px;border:2px solid var(--rule2);display:grid;place-items:center;margin-bottom:24px')}>
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                          <circle cx="11" cy="11" r="9" stroke="var(--faint)" strokeWidth="1.5"/>
                          <path d="M11 7v4M11 15h.01" stroke="var(--faint)" strokeWidth="1.5" strokeLinecap="square"/>
                        </svg>
                      </div>
                      <div style={S('font:700 16px/1.3 Plus Jakarta Sans;color:var(--ink);margin-bottom:10px')}>No research sessions yet</div>
                      <div style={S('font:400 13px/1.6 Plus Jakarta Sans;color:var(--faint);max-width:340px;margin-bottom:28px')}>Start a research session to gather scientific evidence, then create artifacts from it — decks, blogs, protocols and more.</div>
                      <Box
                        css="background:linear-gradient(135deg,#2c52cc,#4468e0);color:#fff;font:700 13px/1 Plus Jakarta Sans;padding:13px 28px;cursor:pointer;display:inline-flex;align-items:center;gap:10px;border-radius:8px"
                        hover="opacity:0.88"
                        onClick={v.createWsResearch}
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square"/></svg>
                        Create Research
                      </Box>
                    </div>
                  ) : (
                    <>
                      {/* Research tabs */}
                      <div style={S('display:flex;align-items:flex-end;gap:0;border-bottom:2px solid var(--rule2);margin-bottom:0')}>
                        {v.wsResearches.map((r) => {
                          const isActive = r.id === v.wsActiveResearch;
                          const isDone = r.status === 'complete';
                          return (
                            <Box
                              key={r.id}
                              css={`padding:10px 22px;font:${isActive ? 700 : 600} 12.5px/1 Plus Jakarta Sans;cursor:pointer;border:1px solid ${isActive ? 'var(--rule2)' : 'transparent'};border-bottom:none;margin-bottom:-2px;display:flex;align-items:center;gap:8px;background:${isActive ? 'var(--s1)' : 'transparent'};color:${isActive ? 'var(--ink)' : 'var(--dim)'}`}
                              hover={!isActive ? 'color:var(--ink);background:var(--s2)' : ''}
                              onClick={() => v.setWsActiveResearch(r.id)}
                            >
                              {isDone && (
                                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--ok)', flexShrink: 0 }} />
                              )}
                              {r.name}
                              {isDone && (
                                <span style={S('font:700 8px/1 Plus Jakarta Sans;letter-spacing:0.1em;color:var(--ok);border:1px solid var(--ok);padding:1px 5px;margin-left:2px')}>DONE</span>
                              )}
                            </Box>
                          );
                        })}
                      </div>

                      {/* Expanded panel for active research */}
                      {activeR && (() => {
                        const DONE_STEP = 20;
                        const rPct = Math.round((Math.min(v.researchN, DONE_STEP) / DONE_STEP) * 100);
                        const isInProgress = activeR.status === 'in-progress';
                        const isDone = activeR.status === 'complete';
                        const phases = [
                          { label: 'Scanning databases', threshold: 6 },
                          { label: 'Retrieving papers', threshold: 18 },
                          { label: 'Deduplication', threshold: 19 },
                          { label: 'Indexing evidence', threshold: 20 },
                        ];
                        const currentPhase = phases.findLast((p) => v.researchN >= p.threshold - 6) || phases[0];
                        return (
                          <div style={S('border:1px solid var(--rule2);border-top:none;background:var(--s1);animation:rise 0.2s ease')}>

                            {/* In-progress banner */}
                            {isInProgress && (
                              <div style={S('padding:14px 24px;border-bottom:1px solid var(--rule);background:rgba(124,58,237,0.04)')}>
                                <div style={S('display:flex;align-items:center;justify-content:space-between;margin-bottom:10px')}>
                                  <div style={S('display:flex;align-items:center;gap:8px')}>
                                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#7c3aed', animation: 'puls 1.2s ease-in-out infinite' }} />
                                    <span style={S('font:600 12px/1 Plus Jakarta Sans;color:#5b21b6')}>Research in progress</span>
                                    <span style={S('font:400 11px/1 Plus Jakarta Sans;color:var(--faint)')}>{currentPhase.label}…</span>
                                  </div>
                                  <span style={S('font:700 11px/1 var(--mono);color:#7c3aed')}>{rPct}%</span>
                                </div>
                                <div style={S('height:4px;background:rgba(124,58,237,0.12);overflow:hidden')}>
                                  <div style={{ width: `${rPct}%`, height: '100%', background: '#7c3aed', transition: 'width 0.8s ease' }} />
                                </div>
                                <div style={S('display:flex;gap:0;margin-top:8px')}>
                                  {phases.map((p, pi) => {
                                    const done = v.researchN >= p.threshold;
                                    return (
                                      <div key={pi} style={S('flex:1;display:flex;align-items:center;gap:4px')}>
                                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: done ? '#7c3aed' : 'rgba(124,58,237,0.2)', flexShrink: 0 }} />
                                        <span style={{ font: '500 9px/1 Plus Jakarta Sans', color: done ? '#5b21b6' : 'var(--faint)', letterSpacing: '0.02em' }}>{p.label}</span>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}

                            {/* Action buttons row */}
                            <div style={S('padding:14px 24px;border-bottom:1px solid var(--rule);display:flex;align-items:center;gap:10px')}>
                              <Box
                                css="padding:9px 18px;font:600 12px/1 Plus Jakarta Sans;border:1px solid var(--rule2);color:var(--dim);cursor:pointer;display:flex;align-items:center;gap:8px;background:var(--bg);border-radius:8px"
                                hover="border-color:var(--ink);color:var(--ink)"
                                onClick={() => this.go('research')}
                              >
                                <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M1 5.5h9M6 1.5l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/></svg>
                                {isDone ? 'View / Modify Research' : isInProgress ? 'View Research' : 'Start Research'}
                              </Box>
                              <Box
                                css={`padding:9px 18px;font:600 12px/1 Plus Jakarta Sans;border:1px solid ${isDone ? 'var(--acc)' : 'var(--rule)'};color:${isDone ? 'var(--acc)' : 'var(--faint)'};cursor:${isDone ? 'pointer' : 'default'};background:${isDone ? 'rgba(44,82,204,0.07)' : 'transparent'};display:flex;align-items:center;gap:8px`}
                                hover={isDone ? 'background:rgba(44,82,204,0.14)' : ''}
                              >
                                <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><rect x="1" y="1" width="4" height="4" stroke="currentColor" strokeWidth="1.3"/><rect x="6" y="6" width="4" height="4" stroke="currentColor" strokeWidth="1.3"/><path d="M5 3h3V6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="square"/></svg>
                                Create Artifact
                                {!isDone && <span style={S('font:500 9px/1 Plus Jakarta Sans;color:var(--faint)')}>— complete research first</span>}
                              </Box>
                              {isDone && (
                                <div style={S('margin-left:auto;display:flex;align-items:center;gap:6px')}>
                                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" fill="rgba(22,101,52,0.12)"/><path d="M4 7l2.5 2.5L10 5" stroke="var(--ok)" strokeWidth="1.5" strokeLinecap="square"/></svg>
                                  <span style={S('font:600 11px/1 Plus Jakarta Sans;color:var(--ok)')}>Research complete</span>
                                </div>
                              )}
                            </div>

                            {/* Artifacts list */}
                            {activeR.artifacts.length > 0 ? (
                              <div style={S('padding:0')}>
                                <div style={S('padding:10px 24px 8px;font:600 9px/1 Plus Jakarta Sans;letter-spacing:0.14em;color:var(--faint)')}>ARTIFACTS</div>
                                {activeR.artifacts.map((art, ai) => (
                                  <div key={ai} style={S('display:flex;align-items:center;gap:16px;padding:12px 24px;border-top:1px solid var(--rule)')}>
                                    <div style={S('font:600 13px/1 Plus Jakarta Sans;color:var(--ink);flex:1')}>{art.name}</div>
                                    <span style={{ padding: '3px 9px', font: '700 9px/1 Plus Jakarta Sans', letterSpacing: '0.1em', border: `1px solid ${art.status === 'In Review' ? 'var(--acc)' : 'var(--rule2)'}`, color: art.status === 'In Review' ? 'var(--acc)' : 'var(--faint)' }}>{art.status.toUpperCase()}</span>
                                    <Box
                                      css="padding:7px 14px;font:600 11.5px/1 Plus Jakarta Sans;border:1px solid var(--rule2);color:var(--dim);cursor:pointer;border-radius:6px"
                                      hover="border-color:var(--ink);color:var(--ink)"
                                      onClick={() => this.go('deliver')}
                                    >Modify →</Box>
                                  </div>
                                ))}
                              </div>
                            ) : isDone ? (
                              /* Research complete — summary card */
                              <div style={S('padding:24px')}>
                                <div style={{ background: 'rgba(22,101,52,0.05)', border: '1px solid rgba(22,101,52,0.2)', borderRadius: 12, padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>
                                  {/* Header */}
                                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(22,101,52,0.12)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 9l4.5 4.5L15 5" stroke="var(--ok)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                    </div>
                                    <div>
                                      <div style={S('font:700 15px/1.2 Plus Jakarta Sans;color:var(--ink);margin-bottom:4px')}>Research 1 complete</div>
                                      <div style={S('font:400 12.5px/1.5 Plus Jakarta Sans;color:var(--faint)')}>12 papers retrieved across 6 databases. Evidence is indexed and ready for content generation.</div>
                                    </div>
                                  </div>
                                  {/* Stats row */}
                                  <div style={{ display: 'flex', gap: 12 }}>
                                    {[['12', 'Papers'], ['6', 'Databases'], ['71', 'Raw sources'], ['97%', 'Top relevance']].map(([n, l]) => (
                                      <div key={l} style={{ flex: 1, background: '#fff', border: '1px solid var(--rule)', borderRadius: 8, padding: '12px 10px', textAlign: 'center' }}>
                                        <div style={S('font:800 18px/1 Plus Jakarta Sans;color:var(--ok);margin-bottom:4px')}>{n}</div>
                                        <div style={S('font:500 10px/1 Plus Jakarta Sans;color:var(--faint);letter-spacing:0.06em')}>{l}</div>
                                      </div>
                                    ))}
                                  </div>
                                  {/* CTA */}
                                  <Box
                                    css="display:flex;align-items:center;justify-content:space-between;padding:14px 20px;background:linear-gradient(135deg,#2c52cc,#4468e0);color:#fff;cursor:pointer;border-radius:10px"
                                    hover="opacity:0.9"
                                    onClick={() => this.go('research')}
                                  >
                                    <div>
                                      <div style={S('font:700 13px/1 Plus Jakarta Sans;margin-bottom:4px')}>View Research Papers</div>
                                      <div style={S('font:400 11px/1 Plus Jakarta Sans;opacity:0.8')}>Review evidence, accept papers, then send to Scientific Review</div>
                                    </div>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 10h12M11 5l5 5-5 5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                  </Box>
                                </div>
                              </div>
                            ) : (
                              <div style={S('padding:28px 24px;color:var(--faint);font:400 12.5px/1.6 Plus Jakarta Sans;text-align:center')}>
                                {isInProgress ? 'Artifacts will be available once research completes.' : 'Complete research first, then create artifacts here.'}
                              </div>
                            )}
                          </div>
                        );
                      })()}
                    </>
                  )}
                </div>
              </div>
            );
          })()}

          {/* ============ SELECT RESEARCH SECTIONS ============ */}
          {v.isSectionSelect && (() => {
            const trackColors = ['#7eb8f7','#7cc8b8','#e5a14b','#f97b7b','#c084fc','#fb923c','#4ade80'];
            return (
              <div style={{ minHeight: '100%', background: 'var(--bg)', padding: '52px 64px', animation: 'fadeUp 0.28s cubic-bezier(0.22,1,0.36,1) both' }}>

                {/* Title + subtitle */}
                <h1 style={{ font: '800 32px/1 Plus Jakarta Sans', letterSpacing: '-0.03em', color: 'var(--ink)', margin: '0 0 14px' }}>Select Research Sections</h1>
                <p style={{ font: '400 14px/1.65 Plus Jakarta Sans', color: 'var(--faint)', margin: '0 0 28px', maxWidth: 480 }}>
                  These are the content sections this research will cover. Unselect any you don't need for this run, or add a new custom section — it gets its own color automatically. The rest of the research will only use whatever is selected here.
                </p>

                {/* Proceed button */}
                <Box
                  css="display:inline-flex;align-items:center;gap:8px;padding:11px 22px;background:#2c52cc;color:#fff;font:700 13px/1 Plus Jakarta Sans;cursor:pointer;border-radius:8px;margin-bottom:36px"
                  hover="background:#4468e0"
                  onClick={v.proceedFromSectionSelect}
                >
                  Proceed with selected sections →
                </Box>

                {/* Track rows */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 680, marginBottom: 28 }}>
                  {CONTENT_TRACKS.map((track, i) => {
                    const on = v.sectionSelectTracks.includes(track.id);
                    const col = trackColors[i] || '#60a5fa';
                    return (
                      <div
                        key={track.id}
                        onClick={() => v.toggleSectionTrack(track.id)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 16,
                          padding: '16px 20px',
                          background: on ? 'rgba(44,82,204,0.05)' : 'var(--s1)',
                          border: `1px solid ${on ? 'rgba(44,82,204,0.3)' : 'var(--rule)'}`,
                          borderRadius: 10, cursor: 'pointer',
                          transition: 'background 0.15s, border-color 0.15s',
                        }}
                      >
                        {/* Checkbox */}
                        <div style={{
                          width: 20, height: 20, borderRadius: 5, flexShrink: 0,
                          background: on ? 'var(--acc)' : 'transparent',
                          border: `2px solid ${on ? 'var(--acc)' : 'var(--rule2)'}`,
                          display: 'grid', placeItems: 'center',
                          transition: 'background 0.15s, border-color 0.15s',
                        }}>
                          {on && (
                            <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
                              <path d="M1 4l3 3 6-6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </div>
                        {/* Color label pill */}
                        <div style={{
                          padding: '3px 10px', borderRadius: 20, fontSize: 10, fontWeight: 700,
                          fontFamily: 'Plus Jakarta Sans', letterSpacing: '0.02em',
                          background: `${col}22`, color: col, border: `1px solid ${col}55`,
                          whiteSpace: 'nowrap', flexShrink: 0,
                        }}>
                          {track.label}
                        </div>
                        {/* Name */}
                        <span style={{ font: '500 14px/1 Plus Jakarta Sans', color: on ? 'var(--ink)' : 'var(--faint)' }}>
                          {track.label}
                        </span>
                      </div>
                    );
                  })}

                  {/* Custom sections */}
                  {v.sectionSelectCustom.map((c, i) => (
                    <div
                      key={i}
                      onClick={() => v.toggleCustomSection(c.label)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 16,
                        padding: '16px 20px',
                        background: c.on ? 'rgba(44,82,204,0.05)' : 'var(--s1)',
                        border: `1px solid ${c.on ? 'rgba(44,82,204,0.3)' : 'var(--rule)'}`,
                        borderRadius: 10, cursor: 'pointer',
                        transition: 'background 0.15s, border-color 0.15s',
                      }}
                    >
                      <div style={{
                        width: 20, height: 20, borderRadius: 5, flexShrink: 0,
                        background: c.on ? 'var(--acc)' : 'transparent',
                        border: `2px solid ${c.on ? 'var(--acc)' : 'var(--rule2)'}`,
                        display: 'grid', placeItems: 'center',
                        transition: 'background 0.15s, border-color 0.15s',
                      }}>
                        {c.on && (
                          <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
                            <path d="M1 4l3 3 6-6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                      <div style={{
                        padding: '3px 10px', borderRadius: 20, fontSize: 10, fontWeight: 700,
                        fontFamily: 'Plus Jakarta Sans', letterSpacing: '0.02em',
                        background: `${c.color}22`, color: c.color, border: `1px solid ${c.color}55`,
                        whiteSpace: 'nowrap', flexShrink: 0,
                      }}>
                        {c.label}
                      </div>
                      <span style={{ font: '500 14px/1 Plus Jakarta Sans', color: c.on ? 'var(--ink)' : 'var(--faint)' }}>{c.label}</span>
                    </div>
                  ))}
                </div>

                {/* Add custom section input */}
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', maxWidth: 500 }}>
                  <input
                    value={v.sectionSelectInput}
                    onChange={v.onSectionSelectInput}
                    onKeyDown={(e) => { if (e.key === 'Enter') v.addCustomSection(); }}
                    placeholder="New section name (e.g. Patient adherence…)"
                    style={{
                      flex: 1, padding: '11px 16px',
                      background: 'var(--s1)',
                      border: '1px solid var(--rule2)',
                      borderRadius: 8, color: 'var(--ink)',
                      font: '400 13px/1 Plus Jakarta Sans',
                      outline: 'none',
                    }}
                  />
                  <Box
                    css="padding:11px 20px;background:transparent;border:1.5px solid var(--rule2);color:var(--dim);font:600 13px/1 Plus Jakarta Sans;cursor:pointer;border-radius:8px;white-space:nowrap"
                    hover="background:var(--s2);border-color:var(--dim)"
                    onClick={v.addCustomSection}
                  >
                    + Add section
                  </Box>
                </div>

                {/* Back link */}
                <Box
                  css="display:inline-flex;align-items:center;gap:5px;margin-top:36px;padding:6px 10px;font:600 11px/1 Plus Jakarta Sans;color:var(--faint);cursor:pointer;border:1px solid var(--rule2);border-radius:6px"
                  hover="color:var(--ink);border-color:var(--dim)"
                  onClick={v.goBack}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M8 2L3 6l5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Back to Setup
                </Box>

              </div>
            );
          })()}

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

            const chatPanelJSX = (
              <div style={S('height:100%;display:flex;flex-direction:column;overflow:hidden;position:relative')}>

                  {/* Running Research banner */}
                  <div style={S(`display:flex;align-items:center;gap:10px;padding:11px 20px;border-bottom:1px solid var(--rule);flex:none;background:${isDone ? 'rgba(22,101,52,0.08)' : 'rgba(44,82,204,0.06)'}`)}>
                    <div style={S(`width:8px;height:8px;border-radius:50%;flex:none;background:${isDone ? 'var(--ok)' : 'var(--acc)'};${isDone ? '' : 'animation:puls 1s infinite'}`)}>
                    </div>
                    <div style={S(`font:700 10px/1 Plus Jakarta Sans;letter-spacing:0.14em;color:${isDone ? 'var(--ok)' : 'var(--acc)'}`)}>
                      {isDone ? 'RESEARCH COMPLETE — BRIEF YOUR AGENT BELOW' : 'RUNNING RESEARCH…'}
                    </div>
                    {!isDone && (
                      <div style={S('margin-left:auto;font:600 10px/1 var(--mono);color:var(--faint)')}>{pct}%</div>
                    )}
                    <Box
                      css={`${isDone ? 'margin-left:auto;' : ''}flex-shrink:0;padding:5px 12px;font:700 9.5px/1 Plus Jakarta Sans;letter-spacing:0.1em;cursor:pointer;border:1.5px solid var(--acc);color:var(--acc);background:rgba(44,82,204,0.07);display:flex;align-items:center;gap:6px`}
                      hover="background:rgba(44,82,204,0.15);color:var(--acc)"
                      onClick={() => this.setState({ chatCollapsed: true })}
                    >
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><polygon points="7,5 4,2 4,8"/><rect x="7.5" y="1.5" width="1.5" height="7"/></svg>
                      HIDE CHAT
                    </Box>
                  </div>

                  {/* Thread header */}
                  {activeThread && (
                    <div style={S('padding:14px 20px;border-bottom:1px solid var(--rule);flex:none')}>
                      <div style={S('font:600 9.5px/1 Plus Jakarta Sans;letter-spacing:0.14em;color:var(--faint);margin-bottom:4px')}>BRAND INTELLIGENCE AGENT</div>
                      <div style={S('font-weight:700;font-size:14px;letter-spacing:-0.01em')}>{activeThread.name}</div>
                    </div>
                  )}

                  {/* Messages */}
                  <div style={S('flex:1;overflow-y:auto;padding:20px')}>
                    {activeThread && activeThread.messages.map((m, i) => (
                      <div key={i} style={S(`display:flex;gap:10px;margin-bottom:20px;flex-direction:${m.from === 'user' ? 'row-reverse' : 'row'}`)}>
                        <div style={S(`width:28px;height:28px;flex:none;display:grid;place-items:center;font:700 10px/1 Plus Jakarta Sans;border-radius:50%;${m.from === 'agent' ? 'background:linear-gradient(135deg,#2c52cc,#4468e0);color:#fff' : 'background:var(--s2);border:1px solid var(--rule2);color:var(--dim)'}`)}>
                          {m.from === 'agent' ? 'AI' : 'ME'}
                        </div>
                        <div style={S(`max-width:80%;${m.from === 'user' ? 'text-align:right' : ''}`)}>
                          <div style={S(`background:${m.from === 'agent' ? 'var(--s1)' : 'var(--s2)'};border:1px solid ${m.from === 'agent' ? 'var(--rule)' : 'var(--rule2)'};padding:12px 14px;font-size:13px;line-height:1.65;border-radius:10px;${m.from === 'agent' ? 'border-left:2px solid var(--acc)' : ''}`)}>
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
                        <div style={S('width:28px;height:28px;flex:none;display:grid;place-items:center;font:700 10px/1 Plus Jakarta Sans;background:linear-gradient(135deg,#2c52cc,#4468e0);color:#fff;border-radius:50%')}>AI</div>
                        <div style={S('max-width:85%')}>
                          <div style={S('font:600 9.5px/1 Plus Jakarta Sans;letter-spacing:0.12em;color:var(--acc);margin-bottom:7px')}>RESEARCH AGENT · ACTIVE</div>
                          <div style={S('background:var(--s1);border:1px solid var(--rule);border-left:2px solid var(--acc);padding:13px 15px;border-radius:10px')}>
                            <div style={S('font-size:12px;color:var(--dim);margin-bottom:11px;line-height:1.5')} key={thinkingMsg}>
                              {thinkingMsg}
                            </div>
                            <div style={S('display:flex;gap:5px;align-items:center')}>
                              {[0, 1, 2].map((d) => (
                                <div key={d} style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--acc)', animation: 'dotBounce 1.3s ease-in-out infinite', animationDelay: `${d * 0.18}s` }} />
                              ))}
                              <span style={S('font:600 10px/1 Plus Jakarta Sans;letter-spacing:0.1em;color:var(--faint);margin-left:8px')}>RESEARCHING</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Done confirmation bubble */}
                    {isDone && (
                      <div style={S('display:flex;gap:10px;margin-bottom:20px;animation:rise 0.3s ease')}>
                        <div style={S('width:28px;height:28px;flex:none;display:grid;place-items:center;font:700 10px/1 Plus Jakarta Sans;background:var(--ok);color:#fff;border-radius:50%')}>AI</div>
                        <div style={S('max-width:85%')}>
                          <div style={S('font:600 9.5px/1 Plus Jakarta Sans;letter-spacing:0.12em;color:var(--ok);margin-bottom:7px')}>RESEARCH AGENT · COMPLETE</div>
                          <div style={S('background:var(--s1);border:1px solid var(--rule);border-left:2px solid var(--ok);padding:13px 15px;font-size:12.5px;line-height:1.6;color:var(--dim);border-radius:10px')}>
                            Research complete — <strong style={S('color:var(--ink)')}>12 papers retrieved</strong> across 6 databases. Evidence is indexed and ready for content generation.<br /><br />
                            While you wait, share any clinical context below — or type <strong style={S('color:var(--ink)')}>"show me more papers"</strong> to expand the search.
                          </div>
                        </div>
                      </div>
                    )}

                    {/* More research thinking bubble */}
                    {v.moreResearchActive && (
                      <div style={S('display:flex;gap:10px;margin-bottom:20px;animation:rise 0.3s ease')}>
                        <div style={S('width:28px;height:28px;flex:none;display:grid;place-items:center;font:700 10px/1 Plus Jakarta Sans;background:linear-gradient(135deg,#2c52cc,#4468e0);color:#fff;border-radius:50%')}>AI</div>
                        <div style={S('max-width:85%')}>
                          <div style={S('font:600 9.5px/1 Plus Jakarta Sans;letter-spacing:0.12em;color:var(--acc);margin-bottom:7px')}>RESEARCH AGENT · EXPANDING</div>
                          <div style={S('background:var(--s1);border:1px solid var(--rule);border-left:2px solid var(--acc);padding:13px 15px;border-radius:10px')}>
                            <div style={S('font-size:12px;color:var(--dim);margin-bottom:10px;line-height:1.5')}>
                              {['Querying Cochrane Library…', 'Scanning NICE HTA database…', 'Deep-searching supplementary PubMed…', 'Extracting and scoring new evidence…', 'Indexing additional papers…'][Math.min(Math.floor(v.moreResearchN / 2), 4)]}
                            </div>
                            <div style={S('display:flex;gap:5px;align-items:center')}>
                              {[0, 1, 2].map((d) => (
                                <div key={d} style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--acc)', animation: 'dotBounce 1.3s ease-in-out infinite', animationDelay: `${d * 0.18}s` }} />
                              ))}
                              <span style={S('font:600 10px/1 Plus Jakarta Sans;letter-spacing:0.1em;color:var(--faint);margin-left:8px')}>{v.moreResearchN} / {EXTRA_PAPERS.length + 4}</span>
                            </div>
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
                          <div style={S('font:600 9.5px/1 Plus Jakarta Sans;letter-spacing:0.12em;color:var(--ok);margin-bottom:8px;padding-left:38px')}>EVIDENCE BASE · {acceptedCount} {acceptedCount === 1 ? 'PAPER' : 'PAPERS'} ACCEPTED</div>
                          {/* Stack */}
                          <div style={S('display:flex;gap:10px;align-items:flex-start')}>
                            <div style={S('width:28px;height:28px;flex:none;display:grid;place-items:center;font:700 10px/1 Plus Jakarta Sans;background:var(--ok);color:#fff;border-radius:50%')}>AI</div>
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
                                <div style={S('font:700 11.5px/1.4 Plus Jakarta Sans;color:var(--ink);margin-bottom:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:240px')}>{acceptedList[acceptedCount - 1].title}</div>
                                <div style={S('font:500 10px/1 Plus Jakarta Sans;color:var(--faint)')}>{acceptedList[acceptedCount - 1].journal.split('·')[0].trim()} · {acceptedList[acceptedCount - 1].year}</div>
                              </div>
                              {/* Count badge */}
                              <div style={{ position: 'absolute', top: -8, right: -8, zIndex: preview.length + 1, background: 'var(--ok)', color: '#fff', font: '700 10px/1 Plus Jakarta Sans', padding: '3px 7px', borderRadius: 2 }}>
                                {acceptedCount}
                              </div>
                              {/* Click hint */}
                              <div style={S('margin-top:8px;font:600 10px/1 Plus Jakarta Sans;color:var(--ok);letter-spacing:0.06em')}>
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
                                  <span style={S('font:700 12px/1 Plus Jakarta Sans;letter-spacing:-0.01em')}>Accepted Evidence</span>
                                  <span style={S('padding:2px 8px;background:var(--ok);color:#fff;font:700 10px/1 Plus Jakarta Sans;margin-left:2px;border-radius:20px')}>{acceptedCount}</span>
                                  <Box css="margin-left:auto;font:600 11px/1 Plus Jakarta Sans;color:var(--faint);cursor:pointer;padding:4px 8px" hover="color:var(--ink)" onClick={v.toggleAcceptedPopup}>✕ Close</Box>
                                </div>
                                {/* Popup list */}
                                <div style={S('overflow-y:auto;flex:1')}>
                                  {acceptedList.map((p, idx) => (
                                    <div key={idx} style={S('padding:12px 18px;border-bottom:1px solid var(--rule);display:flex;flex-direction:column;gap:5px;animation:rise 0.18s ease')}>
                                      <div style={S('display:flex;align-items:flex-start;gap:8px')}>
                                        <span style={S('width:6px;height:6px;border-radius:50%;background:var(--ok);flex:none;margin-top:5px')} />
                                        <div style={S('font:700 12px/1.4 Plus Jakarta Sans;color:var(--ink)')}>{p.title}</div>
                                      </div>
                                      <div style={S('padding-left:14px;font:500 10.5px/1 Plus Jakarta Sans;color:var(--faint)')}>{p.journal.split('·')[0].trim()} · {p.year} · {p.grade}</div>
                                      <div style={S('padding-left:14px;display:flex;gap:6px;flex-wrap:wrap')}>
                                        {p.artifacts.map((a) => <span key={a} style={S('padding:2px 7px;border:1px solid var(--rule2);font:600 9px/1 Plus Jakarta Sans;color:var(--faint);border-radius:20px')}>{a}</span>)}
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

                  {/* Selected papers action bar */}
                  {Object.keys(v.chatPaperSelections).length > 0 && (
                    <div style={S('padding:8px 20px;border-top:1px solid var(--acc);background:rgba(44,82,204,0.06);flex:none;display:flex;align-items:center;gap:10px;animation:rise 0.15s ease')}>
                      <span style={S('font:600 11px/1 Plus Jakarta Sans;color:var(--acc);flex:1')}>{Object.keys(v.chatPaperSelections).length} paper{Object.keys(v.chatPaperSelections).length > 1 ? 's' : ''} selected</span>
                      <Box
                        css="padding:6px 14px;font:700 11px/1 Plus Jakarta Sans;cursor:pointer;background:var(--acc);color:#fff;border-radius:8px;display:flex;align-items:center;gap:5px"
                        hover="opacity:0.85"
                        onClick={v.addSelectedToChat}
                      >
                        <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        Add to chat
                      </Box>
                      <Box
                        css="padding:5px 8px;font:500 10.5px/1 Plus Jakarta Sans;cursor:pointer;color:var(--faint);border:1px solid var(--rule2);border-radius:6px"
                        hover="color:var(--ink)"
                        onClick={() => this.setState({ chatPaperSelections: {} })}
                      >Cancel</Box>
                    </div>
                  )}

                  {/* Input */}
                  <div style={S('padding:14px 20px;border-top:1px solid var(--rule);flex:none')}>
                    {/* Attachment chips */}
                    {v.chatAttachments.length > 0 && (
                      <div style={S('display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px')}>
                        {v.chatAttachments.map((p, i) => (
                          <div key={i} style={S('display:inline-flex;align-items:center;gap:5px;padding:4px 8px 4px 10px;background:rgba(44,82,204,0.1);border:1px solid rgba(44,82,204,0.25);border-radius:20px;animation:rise 0.15s ease')}>
                            <svg width="9" height="9" viewBox="0 0 12 12" fill="none"><rect x="1" y="1.5" width="10" height="9" rx="1" stroke="#2c52cc" strokeWidth="1.3"/><path d="M3.5 5h5M3.5 7.5h3" stroke="#2c52cc" strokeWidth="1.3" strokeLinecap="round"/></svg>
                            <span style={S('font:600 10px/1 Plus Jakarta Sans;color:var(--acc);max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap')} title={p.title}>{p.title}</span>
                            <button
                              onClick={() => v.removeChatAttachment(i)}
                              style={{ background: 'none', border: 'none', padding: '0 0 0 2px', cursor: 'pointer', color: 'var(--acc)', opacity: 0.6, lineHeight: 1, fontSize: 11 }}
                            >✕</button>
                          </div>
                        ))}
                        <button
                          onClick={v.clearChatAttachments}
                          style={{ background: 'none', border: 'none', padding: '4px 6px', cursor: 'pointer', font: '500 10px/1 Plus Jakarta Sans', color: 'var(--faint)' }}
                        >Clear all</button>
                      </div>
                    )}
                    <div style={S('display:flex;gap:8px;align-items:flex-end')}>
                      <textarea
                        rows={3}
                        style={S('flex:1;background:var(--s1);border:1px solid var(--rule2);color:var(--ink);padding:11px 12px;font-size:13px;resize:none;line-height:1.5;outline:none;border-radius:8px')}
                        placeholder={v.chatAttachments.length > 0 ? `Message with ${v.chatAttachments.length} attached paper${v.chatAttachments.length > 1 ? 's' : ''}…` : `Add context about "${activeThread?.name || 'this topic'}"…`}
                        value={v.projectInput}
                        onChange={v.onProjectInput}
                        onKeyDown={v.onProjectKey}
                      />
                      <Box
                        css="background:linear-gradient(135deg,#2c52cc,#4468e0);color:#fff;font-weight:700;padding:12px 16px;cursor:pointer;font-size:12px;flex:none;align-self:stretch;display:flex;align-items:center;border-radius:8px"
                        hover="opacity:0.85"
                        onClick={v.sendIntelMessage}
                      >Send</Box>
                    </div>
                  </div>
              </div>
            );
            const activeWs = v.createdWorkspaces.find((w) => w.id === v.activeWorkspaceId);
            const researchPanelJSX = (
              <div style={S('height:100%;display:flex;flex-direction:column;overflow:hidden;background:var(--s1)')}>

                  {/* Back button — top */}
                  <div style={{ padding: '8px 18px', borderBottom: '1px solid var(--rule)', flexShrink: 0 }}>
                    <Box
                      css="display:inline-flex;align-items:center;gap:5px;padding:5px 10px;font:600 10.5px/1 Plus Jakarta Sans;color:var(--faint);cursor:pointer;border:1px solid var(--rule2);border-radius:6px"
                      hover="color:var(--ink);border-color:var(--ink)"
                      onClick={v.goBack}
                    >
                      <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M8 2L3 6l5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      Back to Setup
                    </Box>
                  </div>

                  {/* Breadcrumb — back to workspace hub */}
                  {activeWs && (
                    <div style={S('padding:7px 18px;border-bottom:1px solid var(--rule);display:flex;align-items:center;gap:6px;flex:none;background:var(--s2)')}>
                      <Box
                        css="display:inline-flex;align-items:center;gap:6px;font:500 11px/1 Plus Jakarta Sans;color:var(--faint);cursor:pointer;padding:3px 0"
                        hover="color:var(--acc)"
                        onClick={() => this.go('workspace-hub')}
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M8 1L3 6l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        <span style={S('font:600 11px/1 Plus Jakarta Sans;color:var(--faint)')}>Workspace</span>
                      </Box>
                      <span style={S('color:var(--rule2);font-size:11px')}>/</span>
                      <span style={S('font:600 11px/1 Plus Jakarta Sans;color:var(--ink);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:220px')}>{activeWs.topic || activeWs.name}</span>
                      <span style={S('color:var(--rule2);font-size:11px')}>/</span>
                      <span style={S('font:600 11px/1 Plus Jakarta Sans;color:var(--dim)')}>
                        {v.wsResearches.find(r => r.id === v.wsActiveResearch)?.name || 'Research'}
                      </span>
                    </div>
                  )}

                  {isDone ? (
                    /* ===== DONE STATE: Card Grid View ===== */
                    <div style={S('display:flex;flex-direction:column;height:100%;overflow:hidden;animation:rise 0.4s ease')}>

                      {/* Header bar */}
                      <div style={S('padding:13px 18px;border-bottom:1px solid var(--rule2);display:flex;align-items:center;gap:10px;flex:none;background:var(--bg)')}>
                        <span style={S('width:8px;height:8px;border-radius:50%;background:var(--ok);flex:none')} />
                        <div style={S('font:700 12px/1 Plus Jakarta Sans;letter-spacing:-0.01em')}>Research Papers</div>
                        <span style={S('font:600 10px/1 var(--mono);color:var(--faint)')}>{RESEARCH_PAPERS.length + (v.moreResearchDone ? EXTRA_PAPERS.length : 0)} sources</span>
                        {v.moreResearchDone && (
                          <span style={S('padding:2px 7px;font:700 8.5px/1 Plus Jakarta Sans;letter-spacing:0.1em;color:var(--ok);border:1px solid var(--ok);background:rgba(22,101,52,0.07)')}>+{EXTRA_PAPERS.length} EXPANDED</span>
                        )}
                      </div>

                      {/* Sources — Evidence Retrieved drawer */}
                      {v.researchSourcesOpen && (() => {
                        const dbColor = { PubMed: '#2c52cc', EMBASE: '#7c3aed', 'ADA Guidelines': '#166534', 'ADA/KDIGO': '#0891b2', NICE: '#9a3412', 'IDF Atlas': '#b45309' };
                        const typeColor2 = { RCT: '#2c52cc', 'Systematic Review': '#7c3aed', Guideline: '#166534', 'Meta-Analysis': '#0891b2', 'Real-World': '#b45309', Registry: '#9a3412' };
                        return (
                          <div style={{ borderBottom: '1px solid var(--rule2)', background: '#f4f7fb', animation: 'rise 0.22s ease', flexShrink: 0, maxHeight: 480, overflowY: 'auto' }}>

                            {/* Compact DB stats bar */}
                            <div style={{ padding: '10px 20px', background: '#fff', borderBottom: '1px solid rgba(26,45,107,0.08)', display: 'flex', alignItems: 'center', gap: 20 }}>
                              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', flex: 1 }}>
                                {RESEARCH_DBS.map((db) => (
                                  <span key={db} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 8px', border: '1px solid rgba(22,101,52,0.3)', background: 'rgba(22,101,52,0.06)', font: '600 10.5px/1 Plus Jakarta Sans', color: '#166534', borderRadius: 20 }}>
                                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#166534', flexShrink: 0 }} />{db}
                                  </span>
                                ))}
                              </div>
                              <div style={{ display: 'flex', gap: 18, flexShrink: 0 }}>
                                {[['71', 'raw'], ['12', 'retained'], ['58', 'chunks']].map(([n, l]) => (
                                  <div key={l} style={{ textAlign: 'center' }}>
                                    <div style={{ font: '800 15px/1 Plus Jakarta Sans', color: '#166534' }}>{n}</div>
                                    <div style={{ font: '600 9px/1 Plus Jakarta Sans', color: '#6878a8', marginTop: 2, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{l}</div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Evidence Retrieved list */}
                            <div style={{ padding: '14px 18px' }}>
                              <div style={{ font: '700 10px/1 Plus Jakarta Sans', letterSpacing: '0.14em', color: '#6878a8', marginBottom: 12, textTransform: 'uppercase' }}>
                                Evidence Retrieved &middot; {RESEARCH_PAPERS.length}
                              </div>

                              {RESEARCH_PAPERS.map((p, i) => {
                                const isExp = !!v.researchSrcExpanded[i];
                                const tc = typeColor2[p.type] || '#2c52cc';
                                const dc = dbColor[p.db] || '#2d4a8a';
                                return (
                                  <div
                                    key={i}
                                    onClick={() => v.toggleSrcExpanded(i)}
                                    style={{ background: '#fff', border: '1px solid rgba(26,45,107,0.1)', borderLeft: `3px solid ${tc}`, marginBottom: 8, cursor: 'pointer', transition: 'box-shadow 0.15s', boxShadow: isExp ? '0 2px 12px rgba(26,45,107,0.1)' : 'none', borderRadius: '0 4px 4px 0' }}>

                                    {/* Main row */}
                                    <div style={{ padding: '11px 14px', display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                                      <div style={{ flex: 1, minWidth: 0 }}>
                                        {/* Pills row */}
                                        <div style={{ display: 'flex', gap: 6, marginBottom: 7, flexWrap: 'wrap' }}>
                                          <span style={{ padding: '2px 8px', border: `1px solid ${tc}`, font: '700 9.5px/1.5 Plus Jakarta Sans', color: tc, letterSpacing: '0.04em', borderRadius: 3, textTransform: 'uppercase' }}>{p.type}</span>
                                          <span style={{ padding: '2px 8px', background: `${dc}14`, font: '600 9.5px/1.5 Plus Jakarta Sans', color: dc, borderRadius: 3 }}>{p.db} {p.year}</span>
                                        </div>
                                        {/* Title */}
                                        <div style={{ font: '700 14px/1.4 Plus Jakarta Sans', color: '#1a2d6b', marginBottom: 4 }}>{p.title}</div>
                                        {/* Journal */}
                                        <div style={{ font: '400 12px/1.3 Plus Jakarta Sans', color: '#6878a8' }}>{p.journal}</div>
                                      </div>
                                      {/* Relevance */}
                                      <div style={{ flexShrink: 0, width: 64, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, paddingTop: 2 }}>
                                        <span style={{ font: '700 12px/1 var(--mono)', color: p.relevance >= 80 ? '#166534' : p.relevance >= 60 ? '#92400e' : '#2c52cc' }}>{p.relevance}/100</span>
                                        <div style={{ width: 64, height: 4, background: 'rgba(26,45,107,0.1)', overflow: 'hidden' }}>
                                          <div style={{ width: `${p.relevance}%`, height: '100%', background: p.relevance >= 80 ? '#166534' : p.relevance >= 60 ? '#92400e' : '#2c52cc' }} />
                                        </div>
                                        <span style={{ font: '700 8px/1 Plus Jakarta Sans', letterSpacing: '0.12em', color: '#6878a8' }}>RELEVANCE</span>
                                      </div>
                                    </div>

                                    {/* Expanded detail */}
                                    {isExp && (
                                      <div style={{ borderTop: '1px solid rgba(26,45,107,0.08)', padding: '12px 14px', background: 'var(--s2)', animation: 'fadeUp 0.16s ease' }}
                                        onClick={e => e.stopPropagation()}>
                                        {/* Stats row */}
                                        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 12 }}>
                                          {[['Design', p.designTier], ['GRADE', p.grade], ['Sample', p.statRigor], ['Citations', p.citations]].map(([label, val]) => (
                                            <div key={label}>
                                              <div style={{ font: '700 9px/1 Plus Jakarta Sans', letterSpacing: '0.1em', color: '#6878a8', textTransform: 'uppercase', marginBottom: 3 }}>{label}</div>
                                              <div style={{ font: '500 12px/1.4 Plus Jakarta Sans', color: '#2d4a8a' }}>{val}</div>
                                            </div>
                                          ))}
                                        </div>
                                        {/* Excerpt */}
                                        {p.excerpt && (
                                          <div style={{ background: '#fff', border: '1px solid rgba(26,45,107,0.1)', borderLeft: '3px solid ' + tc, padding: '10px 14px' }}>
                                            <div style={{ font: '700 9px/1 Plus Jakarta Sans', letterSpacing: '0.1em', color: '#6878a8', textTransform: 'uppercase', marginBottom: 7 }}>Key Excerpt</div>
                                            <p style={{ margin: 0, font: '400 13px/1.7 Georgia, serif', color: '#1a2d6b', fontStyle: 'italic' }}>{p.excerpt}</p>
                                            <div style={{ font: '600 10.5px/1 Plus Jakarta Sans', color: '#6878a8', marginTop: 8 }}>{p.excerptSrc}</div>
                                          </div>
                                        )}
                                        {p.flag && (
                                          <div style={{ marginTop: 10, padding: '8px 12px', background: 'rgba(146,64,14,0.06)', border: '1px solid rgba(146,64,14,0.25)', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                                            <span style={{ font: '700 10px/1 Plus Jakarta Sans', color: '#92400e', flexShrink: 0, marginTop: 1 }}>⚠ FLAG</span>
                                            <span style={{ font: '400 12px/1.6 Plus Jakarta Sans', color: '#92400e' }}>{p.flag}</span>
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

                      {/* ===== MORE-RESEARCH LOADING STATE ===== */}
                      {v.moreResearchActive && (() => {
                        const morePct = Math.round((v.moreResearchN / (EXTRA_PAPERS.length + 4)) * 100);
                        const visibleExtra = Math.max(0, v.moreResearchN - 3);
                        const EXTRA_DBS = ['Cochrane (extended)', 'NICE HTA', 'Supplementary PubMed'];
                        const thinkLabel = ['Scanning additional sources…', 'Retrieving new papers…', 'Scoring relevance…', 'Cross-referencing evidence…', 'Indexing batch 2…'][Math.min(Math.floor(v.moreResearchN / 2.5), 4)];
                        return (
                          <div style={S('flex:1;display:flex;flex-direction:column;overflow:hidden;animation:rise 0.25s ease')}>
                            {/* Progress header */}
                            <div style={S('padding:14px 20px;border-bottom:1px solid var(--rule2);flex:none;background:rgba(44,82,204,0.04)')}>
                              <div style={S('display:flex;align-items:center;gap:10px;margin-bottom:8px')}>
                                <div style={S('width:9px;height:9px;border-radius:50%;flex:none;background:var(--acc);animation:puls 1.1s infinite')} />
                                <span style={S('font:700 9.5px/1 Plus Jakarta Sans;letter-spacing:0.15em;color:var(--acc)')}>EXPANDING SEARCH · BATCH 2</span>
                                <span style={S('margin-left:auto;font:700 11px/1 var(--mono);color:var(--faint)')}>{morePct}%</span>
                              </div>
                              <div style={S('height:3px;background:var(--rule);overflow:hidden')}>
                                <div style={{ height: '100%', background: 'var(--acc)', width: `${morePct}%`, transition: 'width 0.6s ease' }} />
                              </div>
                            </div>

                            {/* Feed */}
                            <div style={S('flex:1;overflow-y:auto;padding:18px 20px')}>
                              {/* New DB connections */}
                              <div style={S('margin-bottom:16px')}>
                                <div style={S('font:700 9px/1 Plus Jakarta Sans;letter-spacing:0.16em;color:var(--faint);margin-bottom:10px')}>ADDITIONAL SOURCES</div>
                                <div style={S('display:flex;gap:8px;flex-wrap:wrap')}>
                                  {EXTRA_DBS.map((db, i) => {
                                    const connected = v.moreResearchN > i;
                                    return (
                                      <div key={db} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 11px', border: `1px solid ${connected ? 'var(--ok)' : 'var(--rule)'}`, background: connected ? 'rgba(22,101,52,0.08)' : 'var(--bg)', font: '600 11px/1 Plus Jakarta Sans', color: connected ? 'var(--ok)' : 'var(--faint)', animation: connected ? 'rise 0.22s ease' : '' }}>
                                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: connected ? 'var(--ok)' : 'var(--rule2)', flexShrink: 0 }} />
                                        {db}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>

                              {/* Status label */}
                              <div style={S('font:700 9px/1 Plus Jakarta Sans;letter-spacing:0.16em;color:var(--faint);margin-bottom:10px')}>
                                PAPERS FOUND · {visibleExtra} of {EXTRA_PAPERS.length}
                              </div>

                              {/* Papers appearing one by one */}
                              {EXTRA_PAPERS.slice(0, visibleExtra).map((p, i) => {
                                const tc = typeColor(p.type);
                                const relColor = p.relevance >= 80 ? 'var(--ok)' : p.relevance >= 60 ? 'var(--warn)' : 'var(--acc)';
                                return (
                                  <div key={i} style={{ background: 'var(--bg)', border: '1px solid rgba(44,82,204,0.2)', borderLeft: '2px solid var(--acc)', padding: '12px 14px', marginBottom: 8, animation: 'cardIn 0.38s cubic-bezier(0.22,1,0.36,1) both' }}>
                                    <div style={S('display:flex;align-items:center;gap:8px;margin-bottom:6px;flex-wrap:wrap')}>
                                      <span style={{ padding: '2px 6px', font: '700 8.5px/1 Plus Jakarta Sans', border: `1px solid ${tc}`, color: tc, letterSpacing: '0.09em' }}>{p.type.toUpperCase()}</span>
                                      <span style={S('font:600 9px/1 var(--mono);color:var(--faint)')}>{p.db}</span>
                                      <span style={S('font:600 9px/1 var(--mono);color:var(--faint)')}>{p.year}</span>
                                      <div style={{ marginLeft: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 3, flexShrink: 0 }}>
                                        <span style={{ font: '700 11px/1 var(--mono)', color: relColor }}>{p.relevance}/100</span>
                                        <div style={{ width: 48, height: 3, background: 'var(--rule2)', overflow: 'hidden' }}>
                                          <div style={{ width: `${p.relevance}%`, height: '100%', background: relColor }} />
                                        </div>
                                      </div>
                                    </div>
                                    <div style={S('font:700 12.5px/1.35 Plus Jakarta Sans;color:var(--ink);letter-spacing:-0.01em;margin-bottom:4px')}>{p.title}</div>
                                    <div style={S('font:400 11px/1.55 Plus Jakarta Sans;color:var(--dim);font-style:italic')}>{p.journal}</div>
                                  </div>
                                );
                              })}

                              {/* Thinking dots while still running */}
                              {visibleExtra < EXTRA_PAPERS.length && (
                                <div style={S('display:flex;gap:5px;align-items:center;padding:12px 0')}>
                                  {[0, 1, 2].map((d) => (
                                    <div key={d} style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--acc)', animation: 'dotBounce 1.3s ease-in-out infinite', animationDelay: `${d * 0.18}s` }} />
                                  ))}
                                  <span style={S('font:600 10px/1 Plus Jakarta Sans;color:var(--faint);margin-left:8px;letter-spacing:0.1em')}>{thinkLabel}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })()}

                      {/* ===== FILTER / SORT BAR ===== */}
                      {!v.moreResearchActive && (() => {
                        // Precompute counts
                        const artifactCounts = {};
                        RESEARCH_PAPERS.forEach((p) => p.artifacts.forEach((a) => { artifactCounts[a] = (artifactCounts[a] || 0) + 1; }));
                        const gradeCounts = { A: 0, B: 0, C: 0, D: 0, F: 0 };
                        RESEARCH_PAPERS.forEach((p) => { const g = gradeLetterFromPaper(p); if (g in gradeCounts) gradeCounts[g]++; });
                        const ART_COLORS_EV = { Deck: '#2563eb', Blog: '#d97706', Protocol: '#7c3aed', Blurb: '#dc2626', Facts: 'var(--dim)' };

                        const SORT_OPTIONS = [
                          { key: 'composite', label: 'Composite score' },
                          { key: 'designTier', label: 'Design tier' },
                          { key: 'appraisal', label: 'Appraisal score' },
                          { key: 'grade', label: 'GRADE certainty' },
                          { key: 'journal', label: 'Journal credibility' },
                          { key: 'citations', label: 'Citation count' },
                          { key: 'funding', label: 'Funding transparency' },
                          { key: 'statRigor', label: 'Statistical rigor' },
                          { key: 'relevance', label: 'Relevance' },
                          { key: 'year', label: 'Publication year' },
                          { key: 'title', label: 'Title (A–Z)' },
                        ];
                        const sortLabel = (SORT_OPTIONS.find((o) => o.key === v.sortBy) || SORT_OPTIONS[0]).label;

                        // Combine base + extra papers when expanded search is done
                        const allEvidencePapers = [
                          ...RESEARCH_PAPERS.map((p, i) => ({ ...p, _idx: i, _batch: 1 })),
                          ...(v.moreResearchDone ? EXTRA_PAPERS.map((p, i) => ({ ...p, _idx: RESEARCH_PAPERS.length + i, _batch: 2 })) : []),
                        ];

                        // Filtered + sorted papers
                        const filteredPapers = allEvidencePapers
                          .map((p) => p)
                          .filter((p) => {
                            if (v.deletedPapers[p._idx]) return false;
                            if (v.trackFilter !== 'All') {
                              const trk = CONTENT_TRACKS.find((t) => t.label === v.trackFilter);
                              if (!trk || !trk.paperTracks.includes(p.track)) return false;
                            }
                            if (v.gradeFilter.length > 0 && !v.gradeFilter.includes(gradeLetterFromPaper(p))) return false;
                            if (v.artifactFilter !== 'All' && !p.artifacts.includes(v.artifactFilter)) return false;
                            if (v.fundingFilter === 'Independent' && !p.funding.toLowerCase().includes('independent')) return false;
                            if (v.fundingFilter === 'Industry' && !p.funding.toLowerCase().includes('industry')) return false;
                            return true;
                          })
                          .sort(evidenceSortFn(v.sortBy, v.sortDir));

                        const isFiltered = v.trackFilter !== 'All' || v.gradeFilter.length > 0 || v.artifactFilter !== 'All' || v.fundingFilter !== 'All' || v.sortBy !== 'composite';

                        return (
                          <>
                            {/* Row 1: Track chips + Grid/List toggle */}
                            <div style={S('padding:10px 16px;border-bottom:1px solid var(--rule);display:flex;align-items:center;gap:6px;flex:none;flex-wrap:wrap;background:var(--s1)')}>
                              {[{ label: 'All papers', id: 'All', color: '#2c52cc' }, ...CONTENT_TRACKS.map((t) => ({ label: t.label, id: t.label, color: t.color }))].map(({ label, id, color }) => {
                                const active = v.trackFilter === id;
                                return (
                                  <Box
                                    key={id}
                                    css={`padding:5px 14px;font:600 11px/1 Plus Jakarta Sans;cursor:pointer;border-radius:20px;border:1.5px solid ${active ? color : 'var(--rule)'};background:${active ? color + '18' : 'var(--s1)'};color:${active ? color : 'var(--faint)'};transition:all 0.15s`}
                                    hover={!active ? `border-color:${color};color:${color};background:${color}0d` : ''}
                                    onClick={() => v.setTrackFilter(id)}
                                  >{label}</Box>
                                );
                              })}
                              <div style={{ marginLeft: 'auto', display: 'flex', gap: 2, background: 'var(--s2)', borderRadius: 8, padding: 3, flexShrink: 0 }}>
                                {[['grid', (<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="1" width="5" height="5" fill="currentColor" opacity=".9"/><rect x="8" y="1" width="5" height="5" fill="currentColor" opacity=".9"/><rect x="1" y="8" width="5" height="5" fill="currentColor" opacity=".9"/><rect x="8" y="8" width="5" height="5" fill="currentColor" opacity=".9"/></svg>)], ['list', (<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="2.5" width="12" height="2" fill="currentColor"/><rect x="1" y="6" width="12" height="2" fill="currentColor"/><rect x="1" y="9.5" width="12" height="2" fill="currentColor"/></svg>)]].map(([mode, icon]) => {
                                  const active = v.evidenceView === mode;
                                  return (
                                    <Box
                                      key={mode}
                                      css={`padding:5px 8px;cursor:pointer;display:flex;align-items:center;border-radius:6px;background:${active ? 'var(--s1)' : 'transparent'};color:${active ? 'var(--acc)' : 'var(--faint)'};box-shadow:${active ? '0 1px 3px rgba(15,31,74,0.1)' : 'none'}`}
                                      hover={!active ? 'background:rgba(255,255,255,0.6);color:var(--dim)' : ''}
                                      onClick={() => v.setEvidenceView(mode)}
                                    >{icon}</Box>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Row 2: Grade · Artifact · Funding · Sort · Clear */}
                            <div style={S('padding:8px 16px;border-bottom:1px solid var(--rule);display:flex;align-items:center;gap:8px;flex:none;flex-wrap:wrap;background:var(--s1);position:relative')}>
                              <span style={S('font:700 9px/1 Plus Jakarta Sans;letter-spacing:0.12em;color:var(--faint)')}>GRADE</span>
                              {[['A','#16a34a'],['B','#2563eb'],['C','#d97706'],['D','#ea580c'],['F','#dc2626']].map(([g, gc]) => {
                                const active = v.gradeFilter.includes(g);
                                const count = gradeCounts[g] || 0;
                                return (
                                  <Box
                                    key={g}
                                    css={`width:26px;height:26px;display:flex;align-items:center;justify-content:center;border-radius:50%;font:700 10px/1 Plus Jakarta Sans;cursor:pointer;border:1.5px solid ${active ? gc : count > 0 ? gc + '55' : 'var(--rule)'};background:${active ? gc : count > 0 ? gc + '12' : 'transparent'};color:${active ? '#fff' : count > 0 ? gc : 'var(--rule2)'};transition:all 0.15s`}
                                    hover={!active && count > 0 ? `border-color:${gc};background:${gc}22;color:${gc}` : ''}
                                    onClick={() => count > 0 && v.toggleGradeFilter(g)}
                                  >{g}</Box>
                                );
                              })}

                              <div style={S('width:1px;height:20px;background:var(--rule2);flex-shrink:0')} />

                              <span style={S('font:700 9px/1 Plus Jakarta Sans;letter-spacing:0.12em;color:var(--faint)')}>ARTIFACT</span>
                              {['All', ...ALL_ARTIFACTS].map((a) => {
                                const active = v.artifactFilter === a;
                                const count = a === 'All' ? RESEARCH_PAPERS.length : (artifactCounts[a] || 0);
                                const col = a !== 'All' ? ART_COLORS_EV[a] : 'var(--acc)';
                                return (
                                  <Box
                                    key={a}
                                    css={`padding:4px 12px;font:600 10px/1 Plus Jakarta Sans;cursor:pointer;border-radius:20px;border:1.5px solid ${active ? col : 'var(--rule2)'};background:${active ? col : 'transparent'};color:${active ? '#fff' : 'var(--faint)'};transition:all 0.15s`}
                                    hover={!active ? `background:${col}22;border-color:${col};color:${col}` : ''}
                                    onClick={() => v.setArtifactFilter(a)}
                                  >{a}{a !== 'All' ? ` (${count})` : ''}</Box>
                                );
                              })}

                              <div style={S('width:1px;height:20px;background:var(--rule2);flex-shrink:0')} />

                              <span style={S('font:700 9px/1 Plus Jakarta Sans;letter-spacing:0.12em;color:var(--faint)')}>FUNDING</span>
                              <select
                                value={v.fundingFilter}
                                onChange={(e) => v.setFundingFilter(e.target.value)}
                                style={{ font: '600 10px/1 Plus Jakarta Sans', color: 'var(--dim)', background: 'var(--s1)', border: '1.5px solid var(--rule)', padding: '5px 10px', cursor: 'pointer', outline: 'none', borderRadius: 20 }}
                              >
                                <option value="All">All</option>
                                <option value="Independent">Independent</option>
                                <option value="Industry">Industry</option>
                              </select>

                              <div style={S('width:1px;height:20px;background:var(--rule2);flex-shrink:0')} />

                              <span style={S('font:700 9px/1 Plus Jakarta Sans;letter-spacing:0.12em;color:var(--faint)')}>SORT BY</span>
                              <div style={{ position: 'relative' }}>
                                <Box
                                  css="padding:5px 12px;font:600 10px/1 Plus Jakarta Sans;cursor:pointer;border:1.5px solid var(--rule);color:var(--dim);display:flex;align-items:center;gap:5px;border-radius:20px;background:var(--s1)"
                                  hover="border-color:var(--acc);color:var(--acc)"
                                  onClick={() => v.toggleSortDropdown()}
                                >
                                  {sortLabel}
                                  <svg width="8" height="5" viewBox="0 0 8 5" fill="currentColor"><path d="M0 0l4 5 4-5z"/></svg>
                                </Box>
                                {v.sortDropdownOpen && (
                                  <div style={{ position: 'absolute', top: 'calc(100% + 4px)', left: 0, background: 'var(--s1)', border: '1px solid var(--rule2)', zIndex: 20, minWidth: 180, boxShadow: '0 4px 16px rgba(26,45,107,0.12)', animation: 'fadeUp 0.12s ease', borderRadius: 8 }}>
                                    {SORT_OPTIONS.map((o) => (
                                      <Box
                                        key={o.key}
                                        css={`padding:8px 12px;font:${v.sortBy === o.key ? '700' : '500'} 11px/1 Plus Jakarta Sans;cursor:pointer;color:${v.sortBy === o.key ? 'var(--acc)' : 'var(--dim)'};display:flex;align-items:center;gap:8px`}
                                        hover="background:var(--s2)"
                                        onClick={() => v.setSortBy(o.key)}
                                      >
                                        {v.sortBy === o.key && <span style={{ color: 'var(--acc)', fontSize: 10 }}>✓</span>}
                                        {v.sortBy !== o.key && <span style={{ width: 10 }} />}
                                        {o.label}
                                      </Box>
                                    ))}
                                  </div>
                                )}
                              </div>
                              <Box
                                css="padding:5px 12px;font:600 10px/1 Plus Jakarta Sans;cursor:pointer;border:1.5px solid var(--rule);color:var(--dim);display:flex;align-items:center;gap:4px;border-radius:20px;background:var(--s1)"
                                hover="border-color:var(--rule2);color:var(--ink)"
                                onClick={() => v.toggleSortDir()}
                              >
                                {v.sortDir === 'desc' ? '↓' : '↑'} {v.sortDir === 'desc' ? 'High to low' : 'Low to high'}
                              </Box>

                              {isFiltered && (
                                <Box
                                  css="margin-left:auto;font:600 10px/1 Plus Jakarta Sans;color:var(--faint);cursor:pointer;text-decoration:underline;text-underline-offset:2px"
                                  hover="color:var(--ink)"
                                  onClick={() => v.clearEvidenceFilters()}
                                >Clear filters</Box>
                              )}
                            </div>

                            {/* Row 3: Quick accept */}
                            <div style={S('padding:8px 16px;border-bottom:1px solid var(--rule);display:flex;align-items:center;gap:8px;flex:none;flex-wrap:wrap;background:var(--s2)')}>
                              <span style={S('font:700 9px/1 Plus Jakarta Sans;letter-spacing:0.12em;color:var(--faint);flex-shrink:0')}>QUICK ACCEPT</span>
                              {[
                                { key: 'grade-ab', label: 'Grade A & B' },
                                { key: 'independent', label: 'Independent funding' },
                                { key: 'relevance80', label: 'Relevance ≥ 80' },
                                { key: 'journal', label: 'Strong journal credibility' },
                              ].map(({ key, label }) => (
                                <Box
                                  key={key}
                                  css="padding:4px 11px;font:600 10px/1 Plus Jakarta Sans;cursor:pointer;border:1px solid var(--rule2);color:var(--dim);background:var(--s1);border-radius:20px"
                                  hover="border-color:var(--ok);color:var(--ok);background:rgba(22,101,52,0.06)"
                                  onClick={() => v.quickAccept(key)}
                                >{label}</Box>
                              ))}

                              {/* Loading feedback inline */}
                              {v.aiAcceptLoading && (() => {
                                const steps = ['Scanning evidence quality…','Ranking by composite score…','Evaluating funding & bias…','Selecting top 10 papers…'];
                                const msg = steps[Math.min(v.aiAcceptStep, steps.length) - 1] || steps[0];
                                return (
                                  <div style={S('display:flex;align-items:center;gap:7px;margin-left:4px')}>
                                    {[0,1,2].map(d => <div key={d} style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--acc)', animation: 'dotBounce 1.3s ease-in-out infinite', animationDelay: `${d * 0.18}s` }} />)}
                                    <span key={msg} style={{ font: '600 10px/1 Plus Jakarta Sans', color: 'var(--acc)', animation: 'fadeUp 0.2s ease both' }}>{msg}</span>
                                    <div style={S('width:80px;height:2px;background:var(--rule);overflow:hidden;border-radius:2px')}>
                                      <div style={{ height: '100%', background: 'var(--acc)', width: `${(v.aiAcceptStep / 4) * 100}%`, transition: 'width 0.6s cubic-bezier(0.22,1,0.36,1)' }} />
                                    </div>
                                  </div>
                                );
                              })()}

                              {(() => {
                                const selCount = Object.keys(v.chatPaperSelections).length;
                                if (!selCount) return null;
                                return (
                                  <Box
                                    css="display:inline-flex;align-items:center;gap:5px;padding:4px 11px;font:700 10px/1 Plus Jakarta Sans;cursor:pointer;border-radius:20px;border:1.5px solid var(--acc);color:var(--acc);background:rgba(44,82,204,0.06);white-space:nowrap;flex-shrink:0;animation:rise 0.15s ease both"
                                    hover="background:rgba(44,82,204,0.12)"
                                    onClick={v.addSelectedToChat}
                                  >
                                    <svg width="9" height="9" viewBox="0 0 16 16" fill="none"><path d="M8 2a6 6 0 1 0 0 12A6 6 0 0 0 8 2zM7 5h2v3h3v2H9v3H7v-3H4V8h3V5z" fill="currentColor"/></svg>
                                    Add to chat
                                    <span style={{ background: 'var(--acc)', color: '#fff', borderRadius: 20, padding: '1px 6px', font: '700 9px/1.4 Plus Jakarta Sans', minWidth: 16, textAlign: 'center' }}>{selCount}</span>
                                  </Box>
                                );
                              })()}

                              <Box
                                css={`margin-left:auto;display:inline-flex;align-items:center;gap:5px;padding:4px 11px;font:700 10px/1 Plus Jakarta Sans;cursor:${v.aiAcceptLoading ? 'default' : 'pointer'};border-radius:20px;background:${v.aiAcceptLoading ? 'transparent' : 'linear-gradient(135deg,#2c52cc,#4468e0)'};color:${v.aiAcceptLoading ? 'var(--faint)' : '#fff'};border:1px solid ${v.aiAcceptLoading ? 'var(--rule2)' : 'transparent'};transition:all 0.2s;white-space:nowrap;flex-shrink:0`}
                                hover={v.aiAcceptLoading ? '' : 'opacity:0.88'}
                                onClick={v.quickAcceptByAI}
                              >
                                {v.aiAcceptLoading
                                  ? <><div style={{ width: 9, height: 9, border: '1.5px solid var(--faint)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} /> Selecting…</>
                                  : <><svg width="9" height="9" viewBox="0 0 14 14" fill="none"><path d="M7 1l1.5 3.5L12 5.5l-2.5 2.5.5 3.5L7 10l-3 1.5.5-3.5L2 5.5l3.5-1L7 1z" fill="#fff"/></svg> Quick Accept by AI</>
                                }
                              </Box>
                            </div>

                            {/* Card list */}
                            <div style={S('flex:1;overflow-y:auto;padding:14px 16px')}>
                              <div style={S('display:flex;align-items:center;gap:10px;margin-bottom:12px')}>
                                <span style={S('font:600 10px/1 Plus Jakarta Sans;color:var(--faint);letter-spacing:0.08em')}>
                                  SHOWING {filteredPapers.length} {filteredPapers.length === 1 ? 'PAPER' : 'PAPERS'}
                                  {isFiltered && <span style={{ color: 'var(--acc)', marginLeft: 6 }}>· filtered</span>}
                                </span>
                                {Object.keys(v.acceptedPapers).length > 0 && (
                                  <Box
                                    css="margin-left:auto;display:inline-flex;align-items:center;gap:5px;padding:4px 11px;font:600 10px/1 Plus Jakarta Sans;cursor:pointer;border:1px solid var(--acc);color:var(--acc);border-radius:20px;background:transparent;white-space:nowrap"
                                    hover="background:rgba(44,82,204,0.08)"
                                    onClick={v.addAllAcceptedToChat}
                                  >
                                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                                    Add all accepted papers to chat
                                  </Box>
                                )}
                              </div>

                              {filteredPapers.length === 0 && (
                                <div style={S('padding:32px;text-align:center;color:var(--faint);font:500 13px/1.6 Plus Jakarta Sans;border:1px dashed var(--rule2)')}>
                                  No papers match the current filters.<br />
                                  <span style={{ color: 'var(--acc)', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => v.clearEvidenceFilters()}>Clear filters</span>
                                </div>
                              )}

                              {v.evidenceView === 'grid' ? (
                                <div style={S('display:grid;grid-template-columns:repeat(2,1fr);gap:10px;align-items:start')}>
                                  {filteredPapers.map((p, idx) => {
                                    const tc = typeColor(p.type);
                                    const accepted = v.acceptedPapers[p._idx];
                                    const excOpen = v.excerptOpen[p._idx];
                                    const isBatch2 = p._batch === 2;
                                    const cardAnim = isBatch2
                                      ? { animation: 'batchIn 0.55s cubic-bezier(0.22,1,0.36,1) both', animationDelay: `${(p._idx - RESEARCH_PAPERS.length) * 0.08}s` }
                                      : { animation: 'cardIn 0.32s ease both', animationDelay: `${idx * 0.04}s` };
                                    return (
                                      <div key={p._idx} style={{ ...S(`background:var(--bg);border:1px solid ${isBatch2 ? 'rgba(44,82,204,0.3)' : accepted ? 'var(--ok)' : 'var(--rule)'};border-left:3px solid ${isBatch2 ? 'var(--acc)' : accepted ? 'var(--ok)' : tc};display:flex;flex-direction:column;border-radius:10px;overflow:hidden`), ...cardAnim }}>

                                        {/* Top bar: checkbox + track pill + NEW badge + delete */}
                                        <div style={S('padding:10px 14px 0;display:flex;align-items:center;gap:6px;flex-wrap:wrap')}>
                                          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', flexShrink: 0 }} title="Select for chat">
                                            <input
                                              type="checkbox"
                                              checked={!!v.chatPaperSelections[p._idx]}
                                              onChange={() => v.toggleChatPaperSel(p._idx)}
                                              style={{ width: 14, height: 14, accentColor: 'var(--acc)', cursor: 'pointer', margin: 0 }}
                                            />
                                          </label>
                                          <span style={S(`padding:2px 8px;font:600 9px/1 Plus Jakarta Sans;border:1px solid ${tc};color:${tc};border-radius:20px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:200px`)}>{p.track}</span>
                                          {p._batch === 2 && (
                                            <span style={{ padding: '3px 8px', font: '700 8.5px/1 Plus Jakarta Sans', letterSpacing: '0.1em', color: '#fff', background: 'var(--acc)', display: 'flex', alignItems: 'center', gap: 5, borderRadius: 4 }}>
                                              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#93c5fd', display: 'inline-block', animation: 'puls 1.4s infinite' }} />
                                              NEW
                                            </span>
                                          )}
                                          <Box
                                            css="margin-left:auto;padding:4px 6px;cursor:pointer;color:var(--faint);border:1px solid transparent;border-radius:6px;display:flex;align-items:center"
                                            hover="color:#dc2626;border-color:#dc2626;background:rgba(220,38,38,0.05)"
                                            onClick={() => v.deleteResearchPaper(p._idx)}
                                            title="Remove paper"
                                          >
                                            <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M1 1l9 9M10 1L1 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                                          </Box>
                                        </div>

                                        {/* Title */}
                                        <div style={S('padding:10px 14px 0;font:700 13px/1.4 Plus Jakarta Sans;letter-spacing:-0.01em;color:var(--ink)')}>{p.title}</div>

                                        {/* Relevance bar */}
                                        <div style={S('padding:8px 14px 10px')}>
                                          <div style={S('display:flex;align-items:center;gap:8px')}>
                                            <span style={S('font:700 8.5px/1 Plus Jakarta Sans;letter-spacing:0.14em;color:var(--faint);flex-shrink:0')}>RELEVANCE</span>
                                            <div style={S('flex:1;height:4px;background:var(--rule);overflow:hidden')}>
                                              <div style={{ width: `${p.relevance}%`, height: '100%', background: p.relevance >= 80 ? 'var(--ok)' : p.relevance >= 60 ? 'var(--warn)' : 'var(--acc)' }} />
                                            </div>
                                            <span style={{ font: '700 11px/1 var(--mono)', color: p.relevance >= 80 ? 'var(--ok)' : p.relevance >= 60 ? 'var(--warn)' : 'var(--acc)', flexShrink: 0 }}>{p.relevance}/100</span>
                                          </div>
                                        </div>

                                        {/* Metadata grid */}
                                        <div style={S('padding:0 14px 10px;display:grid;grid-template-columns:max-content 1fr;gap:3px 14px;align-items:baseline')}>
                                          {[
                                            ['Design tier', p.designTier],
                                            ['Appraisal score', p.appraisal],
                                            ['GRADE certainty', p.grade],
                                            ['Journal', p.journal.split('·')[0].trim() + (p.journal.includes('·') ? ' · ' + p.journal.split('·')[1].trim() : '')],
                                            ['Citations', p.citations],
                                            ['Funding / COI', p.funding],
                                            ['Stat. rigor', p.statRigor],
                                          ].map(([label, val]) => (
                                            <React.Fragment key={label}>
                                              <div style={S('font:500 10.5px/1.5 Plus Jakarta Sans;color:var(--faint);white-space:nowrap')}>{label}</div>
                                              <div style={S('font:600 10.5px/1.5 Plus Jakarta Sans;color:var(--dim);text-align:right')}>{val}</div>
                                            </React.Fragment>
                                          ))}
                                        </div>

                                        {/* Flag warning */}
                                        {p.flag && (
                                          <div style={S('margin:0 14px 10px;padding:7px 10px;border:1px solid var(--acc);background:rgba(44,82,204,0.07);font-size:10.5px;color:var(--acc);line-height:1.5')}>
                                            ⚠ {p.flag}
                                          </div>
                                        )}

                                        {/* Excerpt toggle */}
                                        <Box
                                          css={`margin:0 14px 0;padding:8px 10px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;background:${excOpen ? 'var(--s1)' : 'transparent'};border:1px solid var(--rule)`}
                                          hover="background:var(--s1)"
                                          onClick={() => v.toggleExcerpt(p._idx)}
                                        >
                                          <span style={S('font:700 9.5px/1 Plus Jakarta Sans;letter-spacing:0.1em;color:var(--dim)')}>Excerpt</span>
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
                                          <Box
                                            css="padding:6px 11px;font:600 10.5px/1 Plus Jakarta Sans;cursor:pointer;color:var(--acc);border:1px solid var(--acc);border-radius:8px;display:flex;align-items:center;gap:5px"
                                            hover="background:rgba(44,82,204,0.07)"
                                            onClick={() => { v.setPipeViewPaper(p); window.open('/mock-paper.html', '_blank'); }}
                                          >
                                            <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><rect x="1" y="1.5" width="10" height="9" rx="1" stroke="currentColor" strokeWidth="1.3"/><path d="M3.5 5h5M3.5 7.5h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
                                            View Paper
                                          </Box>
                                          <Box
                                            css="padding:6px 11px;font:600 10.5px/1 Plus Jakarta Sans;cursor:pointer;color:var(--dim);border:1px solid var(--rule2);border-radius:8px;display:flex;align-items:center;gap:5px"
                                            hover="background:var(--s2);border-color:var(--dim)"
                                            onClick={() => v.setPipeCitationsOpen(p)}
                                          >
                                            <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M6 1a5 5 0 100 10A5 5 0 006 1z" stroke="currentColor" strokeWidth="1.3"/><path d="M6 4.5v3M6 8.5v.3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
                                            {p.citations.split('·')[0].trim()}
                                          </Box>
                                          <Box
                                            css={`margin-left:auto;padding:7px 14px;font:700 10.5px/1 Plus Jakarta Sans;cursor:pointer;background:${accepted ? 'var(--ok)' : 'transparent'};color:${accepted ? '#fff' : 'var(--ok)'};border:1px solid var(--ok);border-radius:8px`}
                                            hover={!accepted ? 'background:rgba(22,101,52,0.12)' : ''}
                                            onClick={() => v.toggleAccept(p._idx)}
                                          >
                                            {accepted ? '✓ Accepted' : 'Accept paper'}
                                          </Box>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              ) : (
                                /* List view */
                                <div style={S('display:flex;flex-direction:column;gap:6px')}>
                                  {filteredPapers.map((p, idx) => {
                                    const tc = typeColor(p.type);
                                    const accepted = v.acceptedPapers[p._idx];
                                    const relColor = p.relevance >= 80 ? 'var(--ok)' : p.relevance >= 60 ? 'var(--warn)' : 'var(--acc)';
                                    const isBatch2List = p._batch === 2;
                                    const listAnim = isBatch2List
                                      ? { animation: 'batchIn 0.5s cubic-bezier(0.22,1,0.36,1) both', animationDelay: `${(p._idx - RESEARCH_PAPERS.length) * 0.07}s` }
                                      : { animation: 'cardIn 0.28s ease both', animationDelay: `${idx * 0.03}s` };
                                    return (
                                      <div key={p._idx} style={{ ...S(`background:var(--bg);border:1px solid ${isBatch2List ? 'rgba(44,82,204,0.3)' : accepted ? 'var(--ok)' : 'var(--rule)'};border-left:3px solid ${isBatch2List ? 'var(--acc)' : accepted ? 'var(--ok)' : tc};display:flex;align-items:center;gap:12px;padding:10px 14px`), ...listAnim }}>
                                        <input
                                          type="checkbox"
                                          checked={!!v.chatPaperSelections[p._idx]}
                                          onChange={() => v.toggleChatPaperSel(p._idx)}
                                          style={{ width: 14, height: 14, accentColor: 'var(--acc)', cursor: 'pointer', flexShrink: 0, margin: 0 }}
                                          title="Select for chat"
                                        />
                                        <span style={{ padding: '2px 7px', font: '700 9px/1 Plus Jakarta Sans', border: `1px solid ${tc}`, color: tc, flexShrink: 0, letterSpacing: '0.06em' }}>{p.type.toUpperCase()}</span>
                                        {isBatch2List && (
                                          <span style={{ padding: '2px 7px', font: '700 8.5px/1 Plus Jakarta Sans', letterSpacing: '0.1em', color: '#fff', background: 'var(--acc)', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 4 }}>
                                            <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#93c5fd', display: 'inline-block', animation: 'puls 1.4s infinite' }} />
                                            NEW
                                          </span>
                                        )}
                                        <span style={S('font:600 10px/1 var(--mono);color:var(--faint);flex-shrink:0')}>{p.year}</span>
                                        <div style={S('font:600 12.5px/1.3 Plus Jakarta Sans;color:var(--ink);flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap')}>{p.title}</div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                                          <div style={{ width: 72, height: 4, background: 'var(--rule)', overflow: 'hidden' }}>
                                            <div style={{ width: `${p.relevance}%`, height: '100%', background: relColor }} />
                                          </div>
                                          <span style={{ font: '700 10px/1 var(--mono)', color: relColor }}>{p.relevance}/100</span>
                                        </div>
                                        <Box
                                          css="padding:5px 11px;font:600 10px/1 Plus Jakarta Sans;cursor:pointer;color:var(--acc);border:1px solid var(--acc);border-radius:6px;flex-shrink:0;display:flex;align-items:center;gap:4px"
                                          hover="background:rgba(44,82,204,0.07)"
                                          onClick={() => { v.setPipeViewPaper(p); window.open('/mock-paper.html', '_blank'); }}
                                        >
                                          <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><rect x="1" y="1.5" width="10" height="9" rx="1" stroke="currentColor" strokeWidth="1.3"/><path d="M3.5 5h5M3.5 7.5h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
                                          View
                                        </Box>
                                        <Box
                                          css={`padding:5px 12px;font:700 10px/1 Plus Jakarta Sans;cursor:pointer;background:${accepted ? 'var(--ok)' : 'transparent'};color:${accepted ? '#fff' : 'var(--ok)'};border:1px solid var(--ok);flex-shrink:0`}
                                          hover={!accepted ? 'background:rgba(22,101,52,0.12)' : ''}
                                          onClick={() => v.toggleAccept(p._idx)}
                                        >
                                          {accepted ? '✓' : 'Accept'}
                                        </Box>
                                        <Box
                                          css="padding:5px 8px;cursor:pointer;color:var(--faint);border:1px solid var(--rule2);flex-shrink:0;display:flex;align-items:center;border-radius:6px"
                                          hover="color:#dc2626;border-color:#dc2626;background:rgba(220,38,38,0.05)"
                                          onClick={() => v.deleteResearchPaper(p._idx)}
                                          title="Remove paper"
                                        >
                                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                                        </Box>
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          </>
                        );
                      })()}

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
                              <span style={S('font:700 8.5px/1 Plus Jakarta Sans;letter-spacing:0.14em;color:var(--faint);padding:10px 0')}>SHARED ACROSS EVERY RESEARCH TAB</span>
                              <div style={S('flex:1;display:flex;align-items:center;justify-content:space-between;padding:10px 0')}>
                                <span style={S('font:600 11.5px/1 Plus Jakarta Sans;color:var(--dim)')}>
                                  Accepted papers
                                  <span style={S('display:inline-flex;align-items:center;justify-content:center;min-width:20px;height:20px;padding:0 6px;margin-left:8px;background:var(--ok);color:#fff;font:700 10px/1 Plus Jakarta Sans;border-radius:20px')}>{acceptedCount}</span>
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
                                    <span style={S('font:600 11px/1.4 Plus Jakarta Sans;color:var(--dim);flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap')}>{p.title}</span>
                                    <span style={S('font:500 10px/1 Plus Jakarta Sans;color:var(--faint);flex:none')}>{p.year}</span>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Action buttons */}
                            <div style={S('padding:12px 16px;display:flex;align-items:center;gap:10px')}>
                              <Box
                                css="display:inline-flex;align-items:center;gap:5px;padding:7px 12px;font:600 10.5px/1 Plus Jakarta Sans;color:var(--faint);cursor:pointer;border:1px solid var(--rule2);border-radius:6px;flex-shrink:0"
                                hover="color:var(--ink);border-color:var(--ink)"
                                onClick={v.goBack}
                              >
                                <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M8 2L3 6l5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                Back
                              </Box>
                              <Box
                                css="padding:8px 14px;font:600 11px/1 Plus Jakarta Sans;border:1px solid var(--rule2);color:var(--dim);cursor:pointer;white-space:nowrap;border-radius:8px"
                                hover="border-color:var(--ink);color:var(--ink)"
                              >
                                + Upload or link a paper to evaluate
                              </Box>
                              <Box
                                css="padding:8px 14px;font:600 11px/1 Plus Jakarta Sans;border:1px solid var(--rule2);color:var(--dim);cursor:pointer;white-space:nowrap;border-radius:8px"
                                hover="border-color:var(--ink);color:var(--ink)"
                              >
                                + Add additional topic for research
                              </Box>
                              <Box
                                css="margin-left:auto;padding:8px 18px;font:700 11px/1 Plus Jakarta Sans;background:linear-gradient(135deg,#2c52cc,#4468e0);color:#fff;cursor:pointer;white-space:nowrap;border:1px solid transparent;border-radius:8px"
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
                          <div style={S('font:700 9.5px/1 Plus Jakarta Sans;letter-spacing:0.15em;color:var(--faint);margin-bottom:3px')}>RESEARCH AGENT</div>
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
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: 'rgba(44,82,204,0.06)', border: '1px solid rgba(44,82,204,0.15)', borderRadius: 10, marginBottom: 16 }}>
                          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                            {[0,1,2].map((d) => (
                              <div key={d} style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--acc)', animation: 'dotBounce 1.3s ease-in-out infinite', animationDelay: `${d*0.18}s` }} />
                            ))}
                          </div>
                          <div style={{ font: '700 10px/1 Plus Jakarta Sans', letterSpacing: '0.12em', color: 'var(--acc)' }}>EVIDENCE COLLECTOR</div>
                          <div style={{ fontSize: 11.5, color: 'var(--dim)', flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} key={thinkingMsg}>{thinkingMsg}</div>
                          <div style={{ font: '700 11px/1 var(--mono)', color: 'var(--acc)' }}>{pct}%</div>
                        </div>

                    {/* Database sources */}
                    <div style={S('margin-bottom:20px')}>
                      <div style={S('font:700 9px/1 Plus Jakarta Sans;letter-spacing:0.16em;color:var(--faint);margin-bottom:10px')}>SOURCES</div>
                      <div style={S('display:flex;flex-wrap:wrap;gap:7px')}>
                        {RESEARCH_DBS.map((db, i) => {
                          const connected = rN > i;
                          return (
                            <div key={db} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px', border: `1px solid ${connected ? 'rgba(22,101,52,0.25)' : 'var(--rule)'}`, background: connected ? 'rgba(22,101,52,0.07)' : 'var(--s1)', fontSize: 11.5, fontWeight: 600, color: connected ? 'var(--ok)' : 'var(--faint)', borderRadius: 20, boxShadow: connected ? '0 1px 4px rgba(22,101,52,0.08)' : 'none', animation: connected ? 'rise 0.2s ease' : 'none', transition: 'all 0.2s' }}>
                              <span style={{ width: 5, height: 5, borderRadius: '50%', flexShrink: 0, background: connected ? 'var(--ok)' : 'var(--rule)' }} />
                              {db}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Papers feed */}
                    {visiblePapers > 0 && (
                      <div>
                        <div style={S('font:700 9px/1 Plus Jakarta Sans;letter-spacing:0.16em;color:var(--faint);margin-bottom:10px')}>EVIDENCE RETRIEVED · {visiblePapers}</div>
                        <div style={S('display:flex;flex-direction:column;gap:8px')}>
                          {RESEARCH_PAPERS.slice(0, visiblePapers).map((p, i) => {
                            const tc = typeColor(p.type);
                            const rc = p.relevance >= 80 ? 'var(--ok)' : p.relevance >= 60 ? 'var(--warn)' : 'var(--acc)';
                            return (
                              <div key={i} style={{ background: 'var(--s1)', border: '1px solid var(--rule)', borderRadius: 12, padding: '12px 16px', animation: 'rise 0.22s ease', boxShadow: '0 1px 4px rgba(15,31,74,0.05)', display: 'flex', flexDirection: 'column', gap: 6 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexWrap: 'wrap' }}>
                                  <span style={{ border: `1px solid ${tc}`, color: tc, padding: '2px 8px', font: '700 8.5px/1 Plus Jakarta Sans', letterSpacing: '0.08em', borderRadius: 20 }}>{p.type.toUpperCase()}</span>
                                  <span style={{ font: '600 10px/1 Plus Jakarta Sans', color: 'var(--faint)' }}>{p.db} · {p.year}</span>
                                  <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                                    <div style={{ width: 52, height: 4, background: 'var(--rule2)', borderRadius: 4, overflow: 'hidden' }}>
                                      <div style={{ width: `${p.relevance}%`, height: '100%', background: rc, borderRadius: 4 }} />
                                    </div>
                                    <span style={{ font: '700 11px/1 var(--mono)', color: rc, minWidth: 38, textAlign: 'right' }}>{p.relevance}/100</span>
                                  </div>
                                </div>
                                <div style={{ fontWeight: 700, fontSize: 12.5, lineHeight: 1.35, letterSpacing: '-0.01em', color: 'var(--ink)' }}>{p.title}</div>
                                <div style={{ fontSize: 11, color: 'var(--faint)', lineHeight: 1.5 }}>{p.journal}</div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Expanded batch papers — dramatic reveal after loading */}
                    {v.moreResearchDone && (
                      <div key="batch2-sources" style={S('margin-top:20px')}>
                        {/* Separator banner */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, animation: 'batchBanner 0.5s cubic-bezier(0.22,1,0.36,1) both' }}>
                          <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, var(--acc), transparent)' }} />
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 12px', background: 'rgba(44,82,204,0.08)', border: '1px solid var(--acc)' }}>
                            <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--acc)', animation: 'puls 1.4s infinite' }} />
                            <span style={{ font: '700 9.5px/1 Plus Jakarta Sans', letterSpacing: '0.14em', color: 'var(--acc)' }}>BATCH 2 — {EXTRA_PAPERS.length} NEW PAPERS</span>
                          </div>
                          <div style={{ flex: 1, height: 1, background: 'linear-gradient(to left, var(--acc), transparent)' }} />
                        </div>
                        <div style={S('display:flex;flex-direction:column;gap:8px')}>
                          {EXTRA_PAPERS.map((p, i) => {
                            const relColor = p.relevance >= 80 ? 'var(--ok)' : p.relevance >= 60 ? 'var(--warn)' : 'var(--acc)';
                            return (
                              <div key={i} style={{ background: 'var(--s1)', border: '1px solid rgba(44,82,204,0.18)', borderRadius: 12, padding: '12px 16px', animation: 'batchIn 0.55s cubic-bezier(0.22,1,0.36,1) both', animationDelay: `${i * 0.07}s`, boxShadow: '0 2px 8px rgba(44,82,204,0.08)', display: 'flex', flexDirection: 'column', gap: 6 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexWrap: 'wrap' }}>
                                  <span style={{ border: `1px solid ${typeColor(p.type)}`, color: typeColor(p.type), padding: '2px 8px', font: '700 8.5px/1 Plus Jakarta Sans', letterSpacing: '0.08em', borderRadius: 20 }}>{p.type.toUpperCase()}</span>
                                  <span style={{ font: '600 10px/1 Plus Jakarta Sans', color: 'var(--faint)' }}>{p.db} · {p.year}</span>
                                  <span style={{ marginLeft: 'auto', padding: '2px 7px', font: '700 8px/1 Plus Jakarta Sans', letterSpacing: '0.1em', color: '#fff', background: 'var(--acc)', borderRadius: 20, display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#93c5fd', display: 'inline-block', animation: 'puls 1.4s infinite' }} />
                                    NEW
                                  </span>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexShrink: 0 }}>
                                    <div style={{ width: 52, height: 4, background: 'var(--rule2)', borderRadius: 4, overflow: 'hidden' }}>
                                      <div style={{ width: `${p.relevance}%`, height: '100%', background: relColor, borderRadius: 4 }} />
                                    </div>
                                    <span style={{ font: '700 11px/1 var(--mono)', color: relColor }}>{p.relevance}/100</span>
                                  </div>
                                </div>
                                <div style={{ fontWeight: 700, fontSize: 12.5, lineHeight: 1.35, letterSpacing: '-0.01em', color: 'var(--ink)' }}>{p.title}</div>
                                <div style={{ fontSize: 11, color: 'var(--faint)', lineHeight: 1.5 }}>{p.journal}</div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {rN >= DEDUP_STEP && (
                      <div style={{ marginTop: 12, padding: '11px 16px', border: '1px solid rgba(22,101,52,0.2)', background: 'rgba(22,101,52,0.06)', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 10, animation: 'rise 0.2s ease' }}>
                        <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(22,101,52,0.15)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                          <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M1.5 5.5l3 3 5-5" stroke="var(--ok)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--ok)', fontWeight: 600 }}>Deduplication complete — 71 raw results → {RESEARCH_PAPERS.length} unique papers retained</div>
                      </div>
                    )}
                    {rN >= INDEX_STEP && (
                      <div style={{ marginTop: 8, padding: '11px 16px', border: '1px solid rgba(22,101,52,0.2)', background: 'rgba(22,101,52,0.06)', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 10, animation: 'rise 0.2s ease' }}>
                        <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(22,101,52,0.15)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                          <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M1.5 5.5l3 3 5-5" stroke="var(--ok)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--ok)', fontWeight: 600 }}>Evidence index built — {RESEARCH_PAPERS.length + 46} chunks · 1,204 spans · ready for content generation</div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              </div>
            );
            return (
              <div style={S('height:100%;overflow:hidden;position:relative')}>
                {v.chatCollapsed ? (
                  <>
                    <div style={S('height:100%;display:flex;flex-direction:column;overflow:hidden')}>
                      {researchPanelJSX}
                    </div>
                    <div
                      style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 10, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'var(--acc)', color: '#fff', padding: '16px 8px', gap: 10, boxShadow: '-3px 0 12px rgba(44,82,204,0.18)' }}
                      onClick={() => this.setState({ chatCollapsed: false })}
                    >
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><polygon points="3,5 6,2 6,8"/><rect x="1" y="1.5" width="1.5" height="7"/></svg>
                      <span style={{ font: '700 9px/1 Plus Jakarta Sans', letterSpacing: '0.14em', color: '#fff', writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>OPEN CHAT</span>
                    </div>
                  </>
                ) : (
                  <ResizableSplit
                    left={researchPanelJSX}
                    right={chatPanelJSX}
                    defaultLeftPct={80}
                    minPct={50}
                    maxPct={90}
                  />
                )}


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
            const ExcerptCard = ({ p }) => {
              const currentExcerpts = v.paperExcerpts[p._idx] || [{ text: p.excerpt, src: p.excerptSrc }];
              const alts = ALTERNATE_EXCERPTS[p._idx] || [];
              const manageOpen = v.manageExcerptIdx === p._idx;
              const aiGenerated = v.aiExcerpts[p._idx] || [];
              const aiLoading = v.aiExcerptsLoading[p._idx];
              const visibleAlts = alts;
              return (
                <div style={{ position: 'relative', background: '#fff', border: `1px solid ${sel && sel._idx === p._idx ? 'var(--acc)' : 'var(--rule2)'}`, borderLeft: `4px solid ${tc2(p.type)}`, borderRadius: '0 10px 10px 0', transition: 'all 0.15s', overflow: 'hidden' }}>
                  {/* Clickable main content */}
                  <div
                    style={{ padding: '16px 18px', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 10 }}
                    onClick={() => v.setOrganizeSelected(p)}
                  >
                    {/* top row: type pill + db + year + score */}
                    <div style={S('display:flex;align-items:center;gap:8px')}>
                      <span style={{ padding: '3px 10px', fontSize: 9, fontWeight: 700, fontFamily: 'Plus Jakarta Sans', letterSpacing: '0.1em', borderRadius: 20, border: `1.5px solid ${tc2(p.type)}`, color: '#fff', background: tc2(p.type) }}>{p.type}</span>
                      <span style={{ font:'500 10px/1 Plus Jakarta Sans', color:'var(--faint)', fontFamily:'var(--mono)' }}>{p.db} · {p.year}</span>
                      <span style={{ marginLeft:'auto', font:'800 12px/1 Plus Jakarta Sans', color:'#166534', background:'#dcfce7', padding:'2px 8px', borderRadius:20 }}>{p.score.toFixed(2)}</span>
                    </div>
                    {/* title */}
                    <div style={{ font:'700 13.5px/1.45 Plus Jakarta Sans', letterSpacing:'-0.01em', color:'var(--ink)' }}>{p.title}</div>
                    {/* current excerpt(s) */}
                    {currentExcerpts.map((exc, ei) => (
                      <div key={ei} style={{ borderLeft:'3px solid var(--acc)', padding:'10px 14px', background:'#eff6ff', borderRadius:'0 8px 8px 0', position: 'relative' }}>
                        <div style={{ font:'400 12px/1.8 Plus Jakarta Sans', color:'var(--dim)', fontStyle:'italic' }}>{exc.text}</div>
                        <div style={{ font:'600 9.5px/1 Plus Jakarta Sans', color:'var(--faint)', marginTop:7, letterSpacing:'0.04em', fontFamily:'var(--mono)' }}>{exc.src}</div>
                        {currentExcerpts.length > 1 && (
                          <button
                            onClick={(e) => { e.stopPropagation(); v.removeExcerptItem(p._idx, exc.text); }}
                            style={{ position:'absolute', top:6, right:8, background:'none', border:'none', cursor:'pointer', color:'var(--faint)', fontSize:12, lineHeight:1, padding:'2px 4px' }}
                            title="Remove this excerpt"
                          >✕</button>
                        )}
                      </div>
                    ))}
                    {/* artifact tags + manage button */}
                    <div style={S('display:flex;align-items:center;gap:5px;flex-wrap:wrap')}>
                      {ALL_ARTIFACTS.map((a) => {
                        const active = p.artifacts.includes(a);
                        const PASTEL = { Deck:'#3b82f6', Blog:'#f97316', Protocol:'#10b981', Blurb:'#ef4444', Facts:'#8b5cf6' };
                        const pc = PASTEL[a];
                        return <span key={a} style={{ padding: '3px 9px', font: '600 9px/1 Plus Jakarta Sans', borderRadius:20, border: `1.5px solid ${active ? pc : 'var(--rule2)'}`, color: active ? '#fff' : 'var(--faint)', background: active ? pc : 'transparent', transition:'all 0.15s' }}>{a}</span>;
                      })}
                      <Box
                        css={`margin-left:auto;display:inline-flex;align-items:center;gap:4px;padding:4px 10px;font:600 10px/1 Plus Jakarta Sans;border-radius:6px;cursor:pointer;flex-shrink:0;transition:all 0.15s;color:${manageOpen ? '#fff' : 'var(--acc)'};background:${manageOpen ? 'var(--acc)' : 'transparent'};border:1px solid var(--acc)`}
                        hover={manageOpen ? '' : 'background:rgba(44,82,204,0.08)'}
                        onClick={(e) => { e.stopPropagation(); v.openManageExcerpt(p._idx); }}
                      >
                        <svg width="10" height="10" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/></svg>
                        Manage Excerpt
                      </Box>
                    </div>
                  </div>

                  {/* Manage Excerpt panel — inline expanded */}
                  {manageOpen && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      style={{ borderTop: '1px solid #e2e8f0', background: '#f8faff', padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: 10, animation: 'rise 0.18s ease' }}
                    >
                      {/* Current excerpts section */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ font: '700 9px/1 Plus Jakarta Sans', letterSpacing: '0.12em', color: 'var(--faint)' }}>CURRENT EXCERPT{currentExcerpts.length > 1 ? 'S' : ''}</span>
                        <button
                          onClick={() => v.closeManageExcerpt()}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--faint)', fontSize: 13, lineHeight: 1, padding: '2px 4px' }}
                        >✕</button>
                      </div>
                      {currentExcerpts.map((exc, ei) => (
                        <div key={ei} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, padding: '10px 12px' }}>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ font: '400 11px/1.7 Plus Jakarta Sans', color: 'var(--dim)', fontStyle: 'italic' }}>{exc.text}</div>
                            <div style={{ font: '600 9px/1 Plus Jakarta Sans', color: 'var(--faint)', marginTop: 5, fontFamily: 'var(--mono)' }}>{exc.src}</div>
                          </div>
                          <button
                            onClick={() => v.removeExcerptItem(p._idx, exc.text)}
                            style={{ flexShrink: 0, background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 6, cursor: 'pointer', color: '#dc2626', font: '600 9px/1 Plus Jakarta Sans', padding: '4px 8px', whiteSpace: 'nowrap' }}
                          >Remove</button>
                        </div>
                      ))}

                      {/* Alternatives section */}
                      {alts.length > 0 && (
                        <>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 }}>
                            <span style={{ font: '700 9px/1 Plus Jakarta Sans', letterSpacing: '0.12em', color: 'var(--faint)' }}>ALTERNATIVE EXCERPTS</span>
                            {!aiGenerated.length && (
                              <button
                                onClick={() => v.generateAIExcerpts(p._idx, p)}
                                disabled={!!aiLoading}
                                style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 10px', font: '700 9px/1 Plus Jakarta Sans', background: aiLoading ? 'var(--s2)' : 'linear-gradient(135deg,#2c52cc,#4468e0)', color: aiLoading ? 'var(--faint)' : '#fff', border: 'none', borderRadius: 20, cursor: aiLoading ? 'default' : 'pointer', transition: 'all 0.2s' }}
                              >
                                {aiLoading ? (
                                  <><div style={{ width: 8, height: 8, border: '1.5px solid var(--faint)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} /> Generating…</>
                                ) : (
                                  <><svg width="9" height="9" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg> Generate more with AI</>
                                )}
                              </button>
                            )}
                          </div>
                          {visibleAlts.map((alt, ai) => {
                            const alreadyAdded = currentExcerpts.some((e) => e.text === alt.text);
                            return (
                              <div key={ai} style={{ background: '#fff', border: '1px solid var(--rule2)', borderRadius: 8, padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                                <div style={{ font: '400 11px/1.7 Plus Jakarta Sans', color: 'var(--dim)', fontStyle: 'italic' }}>{alt.text}</div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                  <span style={{ font: '600 9px/1 Plus Jakarta Sans', color: 'var(--faint)', fontFamily: 'var(--mono)' }}>{alt.src}</span>
                                  {alreadyAdded ? (
                                    <span style={{ font: '600 9px/1 Plus Jakarta Sans', color: '#16a34a', padding: '3px 8px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 6 }}>✓ Added</span>
                                  ) : (
                                    <div style={{ display: 'flex', gap: 6 }}>
                                      <button onClick={() => v.replaceExcerpt(p._idx, alt)} style={{ background: 'var(--acc)', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', font: '700 9px/1 Plus Jakarta Sans', padding: '4px 10px' }}>Replace</button>
                                      <button onClick={() => v.addExcerpt(p._idx, alt)} style={{ background: 'transparent', color: 'var(--acc)', border: '1px solid var(--acc)', borderRadius: 6, cursor: 'pointer', font: '600 9px/1 Plus Jakarta Sans', padding: '4px 10px' }}>Add</button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                          {/* AI-generated excerpts */}
                          {aiGenerated.length > 0 && (
                            <>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
                                <span style={{ font: '700 9px/1 Plus Jakarta Sans', letterSpacing: '0.12em', color: 'var(--faint)' }}>AI-GENERATED EXCERPTS</span>
                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, padding: '2px 7px', font: '700 8px/1 Plus Jakarta Sans', background: 'linear-gradient(135deg,#2c52cc,#4468e0)', color: '#fff', borderRadius: 20 }}>
                                  <svg width="7" height="7" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                                  Generated by AI
                                </span>
                              </div>
                              {aiGenerated.map((alt, ai) => {
                                const alreadyAdded = currentExcerpts.some((e) => e.text === alt.text);
                                return (
                                  <div key={`ai-${ai}`} style={{ background: 'rgba(44,82,204,0.04)', border: '1px solid rgba(44,82,204,0.18)', borderRadius: 8, padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 8, animation: 'rise 0.2s ease both', animationDelay: `${ai * 0.1}s` }}>
                                    <div style={{ font: '400 11px/1.7 Plus Jakarta Sans', color: 'var(--dim)', fontStyle: 'italic' }}>{alt.text}</div>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                      <span style={{ font: '600 9px/1 Plus Jakarta Sans', color: 'var(--faint)', fontFamily: 'var(--mono)' }}>{alt.src}</span>
                                      {alreadyAdded ? (
                                        <span style={{ font: '600 9px/1 Plus Jakarta Sans', color: '#16a34a', padding: '3px 8px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 6 }}>✓ Added</span>
                                      ) : (
                                        <div style={{ display: 'flex', gap: 6 }}>
                                          <button onClick={() => v.replaceExcerpt(p._idx, alt)} style={{ background: 'var(--acc)', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', font: '700 9px/1 Plus Jakarta Sans', padding: '4px 10px' }}>Replace</button>
                                          <button onClick={() => v.addExcerpt(p._idx, alt)} style={{ background: 'transparent', color: 'var(--acc)', border: '1px solid var(--acc)', borderRadius: 6, cursor: 'pointer', font: '600 9px/1 Plus Jakarta Sans', padding: '4px 10px' }}>Add</button>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </div>
              );
            };

            /* ── Organize Agent Panel ── */
            const visibleOrgMsgs = ORGANIZE_AGENT_MSGS.slice(0, v.organizeAgentMsgN);
            const orgDone = v.organizeAgentMsgN >= ORGANIZE_AGENT_MSGS.length;

            const organizeAgentPanel = (
              <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative', animation: 'fadeUp 0.32s cubic-bezier(0.22,1,0.36,1) both' }}>

                {/* Status banner */}
                <div style={S(`display:flex;align-items:center;gap:10px;padding:11px 20px;border-bottom:1px solid var(--rule);flex:none;background:${orgDone ? 'rgba(22,101,52,0.08)' : 'rgba(44,82,204,0.06)'}`)}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: orgDone ? 'var(--ok)' : 'var(--acc)', animation: orgDone ? '' : 'puls 1s infinite' }} />
                  <div style={S(`font:700 10px/1 Plus Jakarta Sans;letter-spacing:0.14em;color:${orgDone ? 'var(--ok)' : 'var(--acc)'}`)}>
                    {orgDone ? 'ORGANISATION COMPLETE' : 'ORGANISE AGENT · RUNNING…'}
                  </div>
                  {!orgDone && <div style={S('margin-left:auto;font:600 10px/1 var(--mono);color:var(--faint)')}>{Math.round((v.organizeAgentMsgN / ORGANIZE_AGENT_MSGS.length) * 100)}%</div>}
                </div>

                {/* Thread header */}
                <div style={S('padding:14px 20px;border-bottom:1px solid var(--rule);flex:none')}>
                  <div style={S('font:600 9.5px/1 Plus Jakarta Sans;letter-spacing:0.14em;color:var(--faint);margin-bottom:4px')}>RESEARCH ORGANISATION AGENT</div>
                  <div style={S('font:700 14px/1 Plus Jakarta Sans;letter-spacing:-0.01em;color:var(--ink)')}>Excerpt & Track Analysis</div>
                </div>

                {/* Messages */}
                <div style={S('flex:1;overflow-y:auto;padding:20px')}>
                  {visibleOrgMsgs.map((msg, i) => {
                    const isGap = msg.text.startsWith('⚠');
                    const accentVar = isGap ? 'var(--warn)' : 'var(--acc)';
                    const parts = msg.text.replace(/^⚠\s*/, '').split(/(\*\*[^*]+\*\*)/g);
                    return (
                      <div key={i} style={{ ...S('display:flex;gap:10px;margin-bottom:22px;animation:rise 0.3s ease both'), animationDelay: `${i * 0.05}s` }}>
                        <div style={{ width: 28, height: 28, flexShrink: 0, background: isGap ? 'var(--warn)' : 'var(--acc)', display: 'grid', placeItems: 'center', font: '700 10px/1 Plus Jakarta Sans', color: '#fff' }}>
                          {isGap ? '!' : 'AI'}
                        </div>
                        <div style={S('max-width:88%;flex:1')}>
                          <div style={{ ...S('font:700 9.5px/1 Plus Jakarta Sans;letter-spacing:0.12em;margin-bottom:6px'), color: isGap ? 'var(--warn)' : 'var(--acc)' }}>
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
                      <div style={S('width:28px;height:28px;flex:none;display:grid;place-items:center;font:700 10px/1 Plus Jakarta Sans;background:linear-gradient(135deg,#2c52cc,#4468e0);color:#fff;border-radius:50%')}>AI</div>
                      <div style={S('background:var(--s1);border:1px solid var(--rule);border-left:2px solid var(--acc);padding:12px 14px')}>
                        <div style={S('font:600 10px/1 Plus Jakarta Sans;letter-spacing:0.1em;color:var(--acc);margin-bottom:8px')}>
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
                      <div style={S('width:28px;height:28px;flex:none;display:grid;place-items:center;font:700 10px/1 Plus Jakarta Sans;background:var(--ok);color:#fff;border-radius:50%')}>AI</div>
                      <div>
                        <div style={S('font:600 9.5px/1 Plus Jakarta Sans;letter-spacing:0.12em;color:var(--ok);margin-bottom:6px')}>ORGANISE AGENT · COMPLETE</div>
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
                    style={S('flex:1;background:var(--s2);border:1px solid var(--rule2);color:var(--ink);padding:9px 13px;font:400 12.5px/1 Plus Jakarta Sans;outline:none;border-radius:8px')}
                  />
                  <div onClick={v.sendOrganizeMsg} style={S('width:34px;height:34px;background:var(--acc);display:grid;place-items:center;cursor:pointer;flex:none;border-radius:50%')}>
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M15 1L7 9M15 1L10 15L7 9M15 1L1 6L7 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>

              </div>
            );

            return (
              <div style={S('display:flex;flex-direction:column;height:100%;overflow:hidden;animation:fadeUp 0.3s cubic-bezier(0.22,1,0.36,1) both')}>

                {/* ══ TOP HEADER BAR ══ */}
                <div style={S('padding:0 0 0;flex:none;border-bottom:1px solid var(--rule2)')}>
                  <div style={S('padding:22px 40px 16px;display:flex;align-items:flex-end;gap:0')}>
                    <div style={S('flex:1')}>
                      <Box
                        css="display:inline-flex;align-items:center;gap:5px;padding:5px 10px;font:600 10.5px/1 Plus Jakarta Sans;color:var(--faint);cursor:pointer;border:1px solid var(--rule2);border-radius:6px;margin-bottom:12px"
                        hover="color:var(--ink);border-color:var(--ink)"
                        onClick={v.goBack}
                      >
                        <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M8 2L3 6l5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        Back to Research
                      </Box>
                      <div style={{ font:'800 26px/1.2 Plus Jakarta Sans', letterSpacing:'-0.03em', color:'var(--ink)', marginBottom:6 }}>Organize Your Research</div>
                      <div style={{ font:'400 13px/1.6 Plus Jakarta Sans', color:'var(--dim)', maxWidth:520 }}>
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
                        <div key={label} style={{ textAlign:'center', padding:'10px 22px', background: label==='Papers'?'#dcfce7':label==='Excerpts'?'#dbeafe':'#fef3c7', borderRadius:14, border:'none' }}>
                          <div style={{ font:'800 22px/1 Plus Jakarta Sans', color: label==='Papers'?'#166534':label==='Excerpts'?'#1d4ed8':'#92400e', marginBottom:5 }}>{val}</div>
                          <div style={{ font:'700 9px/1 Plus Jakarta Sans', letterSpacing:'0.14em', color: label==='Papers'?'#15803d':label==='Excerpts'?'#1e40af':'#a16207' }}>{label.toUpperCase()}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tab bar */}
                  <div style={S('padding:0 40px;display:flex;align-items:center;gap:0')}>
                    {[
                      { id: 'track', label: 'By Track' },
                      { id: 'artifact', label: 'By Artifact' },
                      { id: 'figures', label: 'Manage Figures' },
                    ].map((tab) => {
                      const active = curView === tab.id;
                      return (
                        <Box key={tab.id}
                          css={`padding:11px 22px;font:600 12.5px/1 Plus Jakarta Sans;cursor:pointer;color:${active ? 'var(--ink)' : 'var(--faint)'};border-bottom:3px solid ${active ? 'var(--acc)' : 'transparent'};margin-bottom:-1px;transition:color 0.15s,border-color 0.15s`}
                          hover={!active ? 'color:#334155' : ''}
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
                            css={`padding:5px 12px;font:600 10px/1 Plus Jakarta Sans;cursor:pointer;border-radius:20px;border:1.5px solid ${on ? c : 'var(--rule2)'};background:${on ? c : 'var(--s2)'};color:${on ? '#fff' : 'var(--faint)'};transition:all 0.15s`}
                            hover={!on ? `border-color:${c};color:${c};background:#fff` : ''}
                            onClick={() => v.toggleOrganizeArtifact(a)}
                          >{a}</Box>
                        );
                      })}
                      <div style={S('width:1px;height:16px;background:var(--rule);margin:0 6px')} />
                      {curView !== 'figures' && <>
                        <Box css="padding:4px 10px;font:600 10px/1 Plus Jakarta Sans;border:1px solid var(--rule);color:var(--faint);cursor:pointer" hover="color:var(--ink)" onClick={() => v.setOrganizeExpandAll(true)}>Expand all</Box>
                        <Box css="padding:4px 10px;font:600 10px/1 Plus Jakarta Sans;border:1px solid var(--rule);color:var(--faint);cursor:pointer" hover="color:var(--ink)" onClick={() => v.setOrganizeExpandAll(false)}>Collapse all</Box>
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
                          <div key={track.id} style={{ borderLeft: `4px solid ${track.color}`, background: '#fff', marginBottom: 8, transition: 'all 0.2s', animation: `rise 0.22s ease both`, animationDelay: `${ti * 0.04}s`, borderRadius: '0 12px 12px 0', boxShadow: isOpen ? '0 2px 12px rgba(15,31,74,0.08)' : '0 1px 4px rgba(15,31,74,0.04)', border: `1px solid ${isOpen ? track.color+'40' : 'var(--rule2)'}`, borderLeft: `4px solid ${track.color}` }}>
                            <Box
                              css={`display:flex;align-items:center;gap:12px;padding:14px 20px;cursor:pointer;background:${isOpen ? track.color+'0a' : 'transparent'};border-radius:0 12px ${isOpen ? '0 0' : '12px 12px'};transition:background 0.15s`}
                              hover={!isOpen ? `background:${track.color}08` : ''}
                              onClick={() => v.toggleOrganizeTrack(track.id)}
                            >
                              <div style={{ width: 10, height: 10, borderRadius: '50%', background: track.color, flexShrink: 0, boxShadow: `0 0 0 3px ${track.color}25` }} />
                              <span style={{ font: '700 13.5px/1 Plus Jakarta Sans', color: 'var(--ink)' }}>{track.label}</span>
                              <span style={{ padding:'2px 9px', font:'600 10px/1 Plus Jakarta Sans', borderRadius:20, background:`${track.color}18`, color:track.color, border:`1px solid ${track.color}35` }}>{count} {count === 1 ? 'excerpt' : 'excerpts'}</span>
                              {count > 0 && (
                                <div style={{ display:'flex', gap:3 }}>
                                  {Array.from({ length: Math.min(count, 5) }).map((_, i) => (
                                    <div key={i} style={{ width: 4, height: 16, background: track.color, opacity: 0.3 + i * 0.15, borderRadius:2 }} />
                                  ))}
                                </div>
                              )}
                              <Box
                                css="margin-left:auto;display:inline-flex;align-items:center;gap:4px;padding:5px 12px;border:1px dashed var(--acc);color:var(--acc);font:600 10px/1 Plus Jakarta Sans;cursor:pointer;border-radius:20px;transition:background 0.15s"
                                hover="background:rgba(79,82,216,.14)"
                                onClick={(e) => { e.stopPropagation(); v.openAddExcerpt(track.id); }}
                              >+ Add excerpt</Box>
                              <Box
                                css="width:26px;height:26px;border-radius:50%;border:1.5px solid var(--rule2);color:var(--faint);font:700 11px/1 Plus Jakarta Sans;display:grid;place-items:center;cursor:pointer;flex-shrink:0;transition:all 0.15s"
                                hover="border-color:var(--acc);color:var(--acc);background:rgba(44,82,204,0.08)"
                                onClick={(e) => { e.stopPropagation(); v.openCombinedExcerpts({ type: 'track', id: track.id, label: track.label, color: track.color, papers: trackPapers }); }}
                              >i</Box>
                              <span style={{ color: 'var(--faint)', fontSize: 11, width: 18, textAlign: 'center', display: 'inline-block', transition: 'transform 0.2s', transform: `rotate(${isOpen ? 180 : 0}deg)` }}>▼</span>
                            </Box>
                            {isOpen && (
                              <div style={{ padding:'12px 18px 16px', display:'flex', flexDirection:'column', gap:10, borderTop:`1px solid ${track.color}25`, background:`${track.color}05`, animation:'rise 0.18s ease', borderRadius:'0 0 12px 12px' }}>
                                {count === 0
                                  ? <div style={{ padding:'24px', textAlign:'center', color:'var(--faint)', font:'500 12px/1.6 Plus Jakarta Sans', border:'1.5px dashed #cbd5e1', borderRadius:10, background:'var(--s2)' }}>No excerpts yet in this track. Click <span style={{ color:'var(--acc)', fontWeight:700 }}>+ Add excerpt</span> to add one.</div>
                                  : trackPapers.map((p) => <ExcerptCard key={p._idx} p={p} />)
                                }
                                {customHere.map((e) => (
                                  <div key={e.id} style={{ background:'#fff', border:'1px solid #e2e8f0', borderLeft:'3px solid var(--acc)', padding:'14px 16px', display:'flex', flexDirection:'column', gap:8, animation:'rise 0.18s ease', borderRadius:'0 8px 8px 0' }}>
                                    <div style={S('display:flex;align-items:center;gap:8px')}>
                                      <span style={{ padding:'2px 8px', border:'1px solid var(--acc)', background:'#dbeafe', font:'700 8.5px/1 Plus Jakarta Sans', letterSpacing:'0.12em', color:'#1d4ed8', borderRadius:4 }}>CUSTOM</span>
                                      <span style={{ font:'500 10px/1 Plus Jakarta Sans', color:'var(--faint)' }}>Added manually</span>
                                    </div>
                                    <div style={{ borderLeft:'2px solid var(--acc)', padding:'8px 12px', background:'#eff6ff', font:'400 12px/1.75 Plus Jakarta Sans', color:'var(--dim)', fontStyle:'italic', borderRadius:'0 6px 6px 0' }}>{e.text}</div>
                                    <div style={S('display:flex;gap:5px;flex-wrap:wrap')}>
                                      {e.artifacts.map((a) => <span key={a} style={{ padding: '2px 8px', font: '600 9px/1 Plus Jakarta Sans', border: `1px solid ${ART_COLORS[a]}`, color: ART_COLORS[a], background: `${ART_COLORS[a]}15` }}>{a}</span>)}
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
                          <div key={art} style={{ borderLeft:`4px solid ${c}`, background:'#fff', marginBottom:8, transition:'all 0.2s', animation:`rise 0.22s ease both`, animationDelay:`${ai * 0.05}s`, borderRadius:'0 12px 12px 0', boxShadow: isOpen ? '0 2px 12px rgba(15,31,74,0.08)' : '0 1px 4px rgba(15,31,74,0.04)', border:`1px solid ${isOpen ? c+'40' : 'var(--rule2)'}`, borderLeft:`4px solid ${c}` }}>
                            <Box css={`display:flex;align-items:center;gap:12px;padding:14px 20px;cursor:pointer;background:${isOpen ? c+'0a' : 'transparent'};border-radius:0 12px ${isOpen ? '0 0' : '12px 12px'};transition:background 0.15s`} hover={!isOpen ? `background:${c}08` : ''} onClick={() => v.toggleOrganizeTrack(`art_${art}`)}>
                              <div style={{ width:10, height:10, borderRadius:'50%', background:c, flexShrink:0, boxShadow:`0 0 0 3px ${c}25` }} />
                              <span style={{ font:'700 13.5px/1 Plus Jakarta Sans', color:'var(--ink)' }}>{art}</span>
                              <span style={{ padding:'2px 9px', font:'600 10px/1 Plus Jakarta Sans', borderRadius:20, background:`${c}18`, color:c, border:`1px solid ${c}35` }}>{artPapers.length} {artPapers.length === 1 ? 'paper' : 'papers'}</span>
                              <Box
                                css="margin-left:auto;width:26px;height:26px;border-radius:50%;border:1.5px solid #e2e8f0;color:#64748b;font:700 11px/1 Plus Jakarta Sans;display:grid;place-items:center;cursor:pointer;flex-shrink:0;transition:all 0.15s"
                                hover="border-color:var(--acc);color:var(--acc);background:#eff6ff"
                                onClick={(e) => { e.stopPropagation(); v.openCombinedExcerpts({ type: 'artifact', id: art, label: art, color: c, papers: artPapers }); }}
                              >i</Box>
                              <span style={{ color: 'var(--faint)', fontSize: 11, display: 'inline-block', transition: 'transform 0.2s', transform: `rotate(${isOpen ? 180 : 0}deg)` }}>▼</span>
                            </Box>
                            {isOpen && (
                              <div style={{ padding:'12px 18px 16px', display:'flex', flexDirection:'column', gap:10, borderTop:`1px solid ${c}25`, background:`${c}05`, animation:'rise 0.18s ease', borderRadius:'0 0 12px 12px' }}>
                                {artPapers.length === 0
                                  ? <div style={{ padding:'24px', textAlign:'center', color:'var(--faint)', font:'500 12px/1.6 Plus Jakarta Sans', border:'1.5px dashed #cbd5e1', borderRadius:10, background:'var(--s2)' }}>No accepted papers produce this artifact type.</div>
                                  : artPapers.map((p) => <ExcerptCard key={p._idx} p={p} />)
                                }
                              </div>
                            )}
                          </div>
                        );
                      })}

                      {/* MANAGE FIGURES */}
                      {curView === 'figures' && (() => {
                        const figCards = [];
                        acceptedList.forEach((p) => { (PAPER_FIGURES[p._idx] || []).forEach((fig, fi) => figCards.push({ ...fig, figIdx: fi, key: `${p._idx}-${fi}`, paper: p })); });
                        if (figCards.length === 0) return (
                          <div style={S('display:flex;flex-direction:column;align-items:center;justify-content:center;padding:64px 32px;gap:12px')}>
                            <div style={S('font-size:32px')}>📊</div>
                            <div style={S('font:700 15px/1 Plus Jakarta Sans;color:var(--dim)')}>No figures yet</div>
                            <div style={S('font:400 12px/1.65 Plus Jakarta Sans;color:var(--faint);text-align:center;max-width:320px')}>Accept RCTs, meta-analyses or registry papers to see their figures here.</div>
                          </div>
                        );

                        // top action bar
                        const includedCount = figCards.filter(f => v.figureSelections[f.key]?.included).length;

                        return (
                          <div style={S('display:flex;flex-direction:column;gap:0')}>

                            {/* Top bar: Upload + Confirm */}
                            <div style={S('display:flex;align-items:center;gap:10px;margin-bottom:20px')}>
                              <input
                                id="fig-upload-input"
                                type="file"
                                accept="image/*"
                                multiple
                                style={{ display: 'none' }}
                                onChange={(e) => {
                                  Array.from(e.target.files || []).forEach((file) => {
                                    const reader = new FileReader();
                                    reader.onload = (ev) => {
                                      v.addUploadedFigure({
                                        id: `upload-${Date.now()}-${Math.random().toString(36).slice(2)}`,
                                        src: ev.target.result,
                                        name: file.name.replace(/\.[^.]+$/, ''),
                                      });
                                    };
                                    reader.readAsDataURL(file);
                                  });
                                  e.target.value = '';
                                }}
                              />
                              <Box
                                css="display:inline-flex;align-items:center;gap:6px;padding:8px 16px;border:1.5px solid var(--rule2);color:var(--faint);font:600 11px/1 Plus Jakarta Sans;cursor:pointer;border-radius:8px"
                                hover="border-color:var(--dim);color:var(--dim)"
                                onClick={() => document.getElementById('fig-upload-input').click()}
                              >
                                <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 9V1M3 4l3.5-3L10 4M1 10v1.5a.5.5 0 00.5.5h10a.5.5 0 00.5-.5V10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                Upload image
                              </Box>
                              <div style={S('flex:1')} />
                              {includedCount > 0 && (
                                <span style={S('font:500 11px/1 Plus Jakarta Sans;color:var(--faint)')}>{includedCount} figure{includedCount > 1 ? 's' : ''} selected</span>
                              )}
                              <Box
                                css="padding:8px 22px;background:var(--acc);color:#fff;font:700 12px/1 Plus Jakarta Sans;cursor:pointer;border-radius:8px"
                                hover="opacity:0.88"
                                onClick={v.confirmFigures}
                              >
                                Confirm
                              </Box>
                            </div>

                            {/* Figure cards grid */}
                            <div style={S('display:grid;grid-template-columns:repeat(3,1fr);gap:14px;align-items:start')}>
                              {figCards.map(({ type, label, caption, key, paper }, i) => {
                                const fSel = v.figureSelections[key] || { included: false, artifacts: [], tracks: [], useAs: null };
                                const included = fSel.included;
                                const validationError = included && (fSel.artifacts.length === 0 || fSel.tracks.length === 0);

                                return (
                                  <div
                                    key={key}
                                    style={{ background: 'var(--s1)', border: `1px solid ${included ? 'var(--acc)' : 'var(--rule)'}`, borderRadius: 12, overflow: 'hidden', display: 'flex', flexDirection: 'column', animation: `cardIn 0.25s ease both`, animationDelay: `${i * 0.05}s`, transition: 'border-color 0.15s', boxShadow: included ? '0 0 0 2px rgba(44,82,204,0.12)' : '0 1px 4px rgba(15,31,74,0.06)' }}
                                  >
                                    {/* Figure preview */}
                                    <div style={{ background: 'var(--bg)', padding: '12px 12px 8px', borderBottom: '1px solid var(--rule)' }}>
                                      {renderFigSVG(type, paper._idx)}
                                    </div>

                                    <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>

                                      {/* Include checkbox */}
                                      <label style={{ display: 'flex', alignItems: 'center', gap: 9, cursor: 'pointer' }} onClick={() => v.toggleFigureInclude(key)}>
                                        <div style={{ width: 18, height: 18, borderRadius: 4, border: `2px solid ${included ? 'var(--acc)' : 'var(--rule2)'}`, background: included ? 'var(--acc)' : 'transparent', display: 'grid', placeItems: 'center', flexShrink: 0, transition: 'all 0.15s' }}>
                                          {included && <svg width="10" height="7" viewBox="0 0 10 7" fill="none"><path d="M1 3.5l2.5 2.5 5.5-5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                                        </div>
                                        <span style={{ font: '600 12px/1 Plus Jakarta Sans', color: 'var(--ink)' }}>Include this figure</span>
                                      </label>

                                      {/* Figure title */}
                                      <div>
                                        <div style={{ font: '700 13px/1.4 Plus Jakarta Sans', color: 'var(--ink)', marginBottom: 4 }}>{caption}</div>
                                        <div style={{ font: '400 10.5px/1.5 Plus Jakarta Sans', color: 'var(--faint)' }}>From: {paper.title.length > 60 ? paper.title.slice(0, 60) + '…' : paper.title}</div>
                                      </div>

                                      {/* Validation error */}
                                      {validationError && (
                                        <div style={{ padding: '8px 12px', background: 'rgba(220,38,38,0.07)', border: '1px solid rgba(220,38,38,0.25)', borderRadius: 6, font: '500 11px/1.5 Plus Jakarta Sans', color: '#dc2626' }}>
                                          Select at least one artifact and one track to finish including this figure.
                                        </div>
                                      )}

                                      {/* Artifacts */}
                                      <div>
                                        <div style={{ font: '600 9px/1 Plus Jakarta Sans', letterSpacing: '0.12em', color: 'var(--faint)', marginBottom: 8 }}>Artifacts</div>
                                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                                          {ALL_ARTIFACTS.map((a) => {
                                            const on = fSel.artifacts.includes(a);
                                            const ac = ART_COLORS[a];
                                            return (
                                              <Box
                                                key={a}
                                                css={`padding:4px 10px;font:600 10px/1 Plus Jakarta Sans;cursor:pointer;border-radius:20px;border:1.5px solid ${on ? ac : 'var(--rule2)'};background:${on ? `${ac}18` : 'transparent'};color:${on ? ac : 'var(--faint)'};transition:all 0.15s`}
                                                hover={!on ? `border-color:${ac};color:${ac}` : ''}
                                                onClick={() => v.toggleFigureArtifact(key, a)}
                                              >{a}</Box>
                                            );
                                          })}
                                        </div>
                                      </div>

                                      {/* Tracks */}
                                      <div>
                                        <div style={{ font: '600 9px/1 Plus Jakarta Sans', letterSpacing: '0.12em', color: 'var(--faint)', marginBottom: 8 }}>Tracks</div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                          {CONTENT_TRACKS.map((tc) => {
                                            const on = fSel.tracks.includes(tc.id);
                                            return (
                                              <Box
                                                key={tc.id}
                                                css={`padding:6px 10px;font:500 11px/1 Plus Jakarta Sans;cursor:pointer;border-radius:6px;border:1px solid ${on ? tc.color : 'var(--rule)'};background:${on ? `${tc.color}14` : 'transparent'};color:${on ? tc.color : 'var(--dim)'};transition:all 0.15s`}
                                                hover={!on ? `border-color:${tc.color};color:${tc.color};background:${tc.color}0a` : ''}
                                                onClick={() => v.toggleFigureTrack(key, tc.id)}
                                              >{tc.label}</Box>
                                            );
                                          })}
                                        </div>
                                      </div>

                                      {/* Use as-is? */}
                                      <div>
                                        <div style={{ font: '600 9px/1 Plus Jakarta Sans', letterSpacing: '0.12em', color: 'var(--faint)', marginBottom: 8 }}>Use as-is?</div>
                                        <div style={{ display: 'flex', gap: 8 }}>
                                          {[['as-is', 'Use as-is'], ['redesign', 'Needs redesign before use']].map(([val, lbl]) => {
                                            const on = fSel.useAs === val;
                                            return (
                                              <Box
                                                key={val}
                                                css={`flex:1;padding:8px 0;text-align:center;font:600 10px/1 Plus Jakarta Sans;cursor:pointer;border-radius:20px;border:1.5px solid ${on ? 'var(--acc)' : 'var(--rule2)'};background:${on ? 'rgba(44,82,204,0.1)' : 'transparent'};color:${on ? 'var(--acc)' : 'var(--faint)'};transition:all 0.15s`}
                                                hover={!on ? 'border-color:var(--acc);color:var(--acc)' : ''}
                                                onClick={() => v.setFigureUseAs(key, val)}
                                              >{lbl}</Box>
                                            );
                                          })}
                                        </div>
                                      </div>

                                    </div>
                                  </div>
                                );
                              })}

                              {/* Uploaded image cards */}
                              {v.uploadedFigures.map((fig, i) => {
                                const uKey = fig.id;
                                const fSel = v.figureSelections[uKey] || { included: false, artifacts: [], tracks: [], useAs: null };
                                const included = fSel.included;
                                return (
                                  <div
                                    key={uKey}
                                    style={{ background: 'var(--s1)', border: `1px solid ${included ? 'var(--acc)' : 'var(--rule)'}`, borderRadius: 12, overflow: 'hidden', display: 'flex', flexDirection: 'column', animation: 'batchIn 0.4s cubic-bezier(0.22,1,0.36,1) both', animationDelay: `${i * 0.05}s`, transition: 'border-color 0.15s', boxShadow: included ? '0 0 0 2px rgba(44,82,204,0.12)' : '0 1px 4px rgba(15,31,74,0.06)' }}
                                  >
                                    {/* Image preview */}
                                    <div style={{ background: 'var(--bg)', padding: '10px', borderBottom: '1px solid var(--rule)', position: 'relative' }}>
                                      <img src={fig.src} alt={fig.name} style={{ width: '100%', height: 120, objectFit: 'contain', display: 'block' }} />
                                      <button
                                        onClick={() => v.removeUploadedFigure(fig.id)}
                                        style={{ position:'absolute', top:6, right:6, background:'rgba(220,38,38,0.85)', border:'none', borderRadius:4, cursor:'pointer', color:'#fff', fontSize:10, lineHeight:1, padding:'3px 5px', fontWeight:700 }}
                                        title="Remove uploaded image"
                                      >✕</button>
                                      <div style={{ position:'absolute', top:6, left:6, background:'rgba(44,82,204,0.85)', color:'#fff', font:'700 8px/1 Plus Jakarta Sans', padding:'3px 7px', borderRadius:4, letterSpacing:'0.08em' }}>UPLOADED</div>
                                    </div>

                                    <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                                      <label style={{ display: 'flex', alignItems: 'center', gap: 9, cursor: 'pointer' }} onClick={() => v.toggleFigureInclude(uKey)}>
                                        <div style={{ width: 18, height: 18, borderRadius: 4, border: `2px solid ${included ? 'var(--acc)' : 'var(--rule2)'}`, background: included ? 'var(--acc)' : 'transparent', display: 'grid', placeItems: 'center', flexShrink: 0, transition: 'all 0.15s' }}>
                                          {included && <svg width="10" height="7" viewBox="0 0 10 7" fill="none"><path d="M1 3.5l2.5 2.5 5.5-5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                                        </div>
                                        <span style={{ font: '600 12px/1 Plus Jakarta Sans', color: 'var(--ink)' }}>Include this figure</span>
                                      </label>
                                      <div style={{ font: '700 13px/1.4 Plus Jakarta Sans', color: 'var(--ink)' }}>{fig.name || 'Uploaded figure'}</div>
                                      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                                        {ALL_ARTIFACTS.map((a) => {
                                          const on = fSel.artifacts.includes(a);
                                          const ac = ART_COLORS[a];
                                          return (
                                            <Box key={a} css={`padding:4px 10px;font:600 9px/1 Plus Jakarta Sans;border-radius:20px;cursor:pointer;border:1.5px solid ${on ? ac : 'var(--rule2)'};color:${on ? ac : 'var(--faint)'};background:${on ? `${ac}18` : 'transparent'};transition:all 0.15s`} hover={!on ? `border-color:${ac};color:${ac}` : ''} onClick={() => v.toggleFigureArtifact(uKey, a)}>{a}</Box>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>

                          </div>
                        );
                      })()}

                    </div>
                  );

                  if (!sel) return <div style={S('display:flex;flex:1;min-height:0')}>{trackList}</div>;

                  const selTrack = CONTENT_TRACKS.find(t => t.paperTracks.includes(sel.track));

                  const detailPanel = (
                    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--s1)', overflow: 'hidden', borderLeft: '1px solid var(--rule2)', animation: 'slideInRight 0.25s cubic-bezier(0.22,1,0.36,1) both' }}>

                      {/* "Selected paper" sticky header */}
                      <div style={{ padding: '13px 18px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: 8, background: '#fff', position: 'sticky', top: 0, zIndex: 2, flexShrink: 0 }}>
                        <div style={{ width:3, height:16, background:'var(--acc)', borderRadius:2 }} />
                        <span style={{ font:'700 10px/1 Plus Jakarta Sans', letterSpacing:'0.14em', color:'var(--ink)', flex:1 }}>SELECTED PAPER</span>
                        <Box css="display:flex;align-items:center;justify-content:center;width:26px;height:26px;color:#64748b;cursor:pointer;border:1px solid #e2e8f0;border-radius:6px;font-size:12px" hover="color:#0f172a;border-color:#94a3b8;background:#f1f5f9" onClick={() => v.setOrganizeSelected(null)}>✕</Box>
                      </div>

                      <div key={sel._idx} style={S('flex:1;overflow-y:auto')}>
                        <div style={S('padding:16px;display:flex;flex-direction:column;gap:0')}>

                          {/* Title + journal */}
                          <div style={S('padding-bottom:14px;border-bottom:1px solid var(--rule)')}>
                            <div style={S('font:700 14px/1.45 Plus Jakarta Sans;letter-spacing:-0.01em;color:var(--ink);margin-bottom:8px')}>{sel.title}</div>
                            <div style={S('font:500 10px/1.4 Plus Jakarta Sans;color:var(--faint);margin-bottom:10px')}>{sel.journal} · {sel.year}</div>
                            {/* Artifact tags */}
                            <div style={S('display:flex;gap:5px;flex-wrap:wrap;margin-bottom:8px')}>
                              {sel.artifacts.map((a) => (
                                <span key={a} style={{ padding: '3px 10px', font: '600 9.5px/1 Plus Jakarta Sans', border: `1px solid ${ART_COLORS[a]}`, color: ART_COLORS[a], background: `${ART_COLORS[a]}18`, borderRadius: 20 }}>{a}</span>
                              ))}
                            </div>
                            {/* Track pill */}
                            {selTrack && (
                              <span style={{ padding: '4px 11px', font: '600 10px/1 Plus Jakarta Sans', color: selTrack.color, background: `${selTrack.color}18`, border: `1px solid ${selTrack.color}55`, borderRadius: 20, display: 'inline-block' }}>
                                {selTrack.label}
                              </span>
                            )}
                          </div>

                          {/* Metadata table */}
                          <div style={S('padding:14px 0;border-bottom:1px solid var(--rule)')}>
                            <div style={S('display:flex;flex-direction:column;gap:0')}>
                              {[
                                ['Design tier', sel.designTier],
                                ['Appraisal score', sel.appraisal],
                                ['GRADE certainty', sel.grade],
                                ['Journal', sel.journal.split('·')[0].trim()],
                                ['Citations', sel.citations],
                                ['Funding / COI', sel.funding],
                                ['Stat. rigor', sel.statRigor],
                                ['Relevance', `${sel.relevance}/100`],
                              ].map(([lbl, val]) => (
                                <div key={lbl} style={S('display:flex;gap:8px;padding:6px 0;border-bottom:1px solid var(--rule)')}>
                                  <span style={S('font:500 10px/1.4 Plus Jakarta Sans;color:var(--faint);width:100px;flex-shrink:0')}>{lbl}</span>
                                  <span style={S('font:600 10px/1.4 Plus Jakarta Sans;color:var(--dim);flex:1')}>{val}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Figures */}
                          {(PAPER_FIGURES[sel._idx] || []).length > 0 && (
                            <div style={S('padding:14px 0;border-bottom:1px solid var(--rule)')}>
                              <div style={S('font:700 8.5px/1 Plus Jakarta Sans;letter-spacing:0.14em;color:var(--faint);margin-bottom:10px')}>FIGURES</div>
                              <div style={S('display:flex;flex-direction:column;gap:8px')}>
                                {(PAPER_FIGURES[sel._idx] || []).map((fig, fi) => (
                                  <div key={fi} style={S('border:1px solid var(--rule);overflow:hidden')}>
                                    <div style={S('background:var(--bg);padding:10px')}>{renderFigSVG(fig.type, sel._idx)}</div>
                                    <div style={S('padding:8px 10px;background:var(--s2)')}>
                                      <div style={S('font:700 8.5px/1 Plus Jakarta Sans;color:var(--faint);letter-spacing:0.1em;margin-bottom:3px')}>{fig.label}</div>
                                      <div style={S('font:500 10px/1.45 Plus Jakarta Sans;color:var(--dim)')}>{fig.caption}</div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Excerpt */}
                          <div style={S('padding:14px 0')}>
                            <div style={S('font:700 8.5px/1 Plus Jakarta Sans;letter-spacing:0.14em;color:var(--faint);margin-bottom:10px')}>** EXCERPT</div>
                            <div style={S('border-left:2px solid var(--acc);padding:10px 14px;background:rgba(44,82,204,0.06);font:400 11px/1.75 Plus Jakarta Sans;color:var(--dim);font-style:italic')}>{sel.excerpt}</div>
                            <div style={S('font:600 9px/1 var(--mono);color:var(--faint);margin-top:7px;letter-spacing:0.04em')}>{sel.excerptSrc}</div>
                          </div>

                        </div>
                      </div>

                      {/* Footer — sticky */}
                      <div style={S('flex:none;padding:12px 16px;border-top:1px solid var(--rule2);background:var(--bg);display:flex;flex-direction:column;gap:8px')}>
                        {/* View Paper + Citations row */}
                        <div style={S('display:flex;gap:8px')}>
                          <Box
                            css="flex:1;padding:8px 0;text-align:center;font:600 12px/1 Plus Jakarta Sans;color:var(--acc);border:1px solid var(--acc);border-radius:8px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:5px"
                            hover="background:rgba(44,82,204,0.07)"
                            onClick={() => v.setPipeViewPaper(sel)}
                          >
                            <svg width="13" height="13" fill="none" viewBox="0 0 16 16"><rect x="2" y="1" width="9" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><path d="M11 4h2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><path d="M11 7h2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><path d="M11 10h2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><path d="M4.5 5h4M4.5 8h4M4.5 11h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                            View Paper
                          </Box>
                          <Box
                            css="flex:1;padding:8px 0;text-align:center;font:600 12px/1 Plus Jakarta Sans;color:var(--dim);border:1px solid var(--rule2);border-radius:8px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:5px"
                            hover="background:var(--s2)"
                            onClick={() => v.setPipeCitationsOpen(sel)}
                          >
                            <svg width="13" height="13" fill="none" viewBox="0 0 16 16"><circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4"/><path d="M8 7v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="8" cy="4.5" r="0.9" fill="currentColor"/></svg>
                            {sel.citations.split('·')[0].trim()}
                          </Box>
                        </div>
                        {/* Remove from accepted */}
                        <Box
                          css="width:100%;padding:9px 0;text-align:center;font:700 12px/1 Plus Jakarta Sans;color:var(--warn);border:1.5px solid var(--warn);cursor:pointer;border-radius:8px;background:transparent"
                          hover="background:rgba(146,64,14,0.08)"
                          onClick={() => { v.toggleAccept(sel._idx); v.setOrganizeSelected(null); }}
                        >
                          Remove from accepted
                        </Box>
                      </div>

                    </div>
                  );

                  return (
                    <div style={S('display:flex;flex:1;min-height:0')}>
                      <ResizableSplit left={trackList} right={detailPanel} defaultLeftPct={62} minPct={30} maxPct={78} />
                    </div>
                  );
                })()}

                {/* ══ COMBINED EXCERPTS MODAL ══ */}
                {v.combinedExcerptsModal && (() => {
                  const m = v.combinedExcerptsModal;
                  const letterColor = (type) => ({ RCT: '#7eb8f7', 'Systematic Review': '#fb923c', 'Meta-Analysis': '#4ade80', Guideline: '#c084fc', Registry: '#f97b7b', 'Real-World': '#e5a14b' })[type] || 'var(--dim)';
                  return (
                    <div
                      style={{ position: 'fixed', inset: 0, background: 'rgba(5,10,30,0.72)', zIndex: 250, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32 }}
                      onClick={v.closeCombinedExcerpts}
                    >
                      <div
                        style={{ background: '#0f1e3d', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 14, width: '100%', maxWidth: 520, maxHeight: '82vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', animation: 'fadeUp 0.22s cubic-bezier(0.22,1,0.36,1) both', boxShadow: '0 24px 64px rgba(0,0,0,0.5)' }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {/* Header */}
                        <div style={{ padding: '18px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                          <div style={{ width: 8, height: 8, borderRadius: '50%', background: m.color, flexShrink: 0 }} />
                          <span style={{ font: '700 14px/1 Plus Jakarta Sans', color: '#e8eef8', flex: 1 }}>Combined excerpts — {m.label}</span>
                          <Box
                            css="width:26px;height:26px;border-radius:50%;border:1px solid rgba(255,255,255,0.15);color:#8aaad4;font-size:14px;display:grid;place-items:center;cursor:pointer"
                            hover="border-color:rgba(255,255,255,0.35);color:#e8eef8"
                            onClick={v.closeCombinedExcerpts}
                          >×</Box>
                        </div>

                        {/* Description */}
                        <div style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.07)', flexShrink: 0 }}>
                          <p style={{ font: '400 12px/1.65 Plus Jakarta Sans', color: 'var(--dim)', margin: 0 }}>
                            This is a concatenated view of the excerpts currently tagged to this {m.type === 'track' ? 'track' : 'artifact'}. In the full product, this section would instead show an AI-generated summary combining these excerpts.
                          </p>
                        </div>

                        {/* Paper excerpts list */}
                        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 20 }}>
                          {m.papers.length === 0 ? (
                            <div style={{ font: '400 12px/1.6 Plus Jakarta Sans', color: 'var(--dim)', textAlign: 'center', padding: '32px 0' }}>No excerpts in this {m.type} yet.</div>
                          ) : m.papers.map((p) => {
                            const lc = letterColor(p.type);
                            const figs = PAPER_FIGURES[p._idx] || [];
                            return (
                              <div key={p._idx} style={{ display: 'flex', gap: 12 }}>
                                {/* Letter avatar */}
                                <div style={{ width: 28, height: 28, borderRadius: '50%', background: lc, display: 'grid', placeItems: 'center', font: '700 11px/1 Plus Jakarta Sans', color: '#0f1e3d', flexShrink: 0, marginTop: 2 }}>
                                  {p.type[0]}
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                  <div style={{ font: '700 13px/1.4 Plus Jakarta Sans', color: '#e8eef8', marginBottom: 3 }}>{p.title}</div>
                                  <div style={{ font: '400 10.5px/1 Plus Jakarta Sans', color: 'var(--dim)', marginBottom: 10 }}>{p.journal.split('·')[0].trim()} · {p.year}</div>
                                  {/* Excerpt */}
                                  <div style={{ font: '400 12px/1.7 Plus Jakarta Sans', color: 'var(--dim)', fontStyle: 'italic', borderLeft: `2px solid ${lc}40`, paddingLeft: 12, marginBottom: figs.length > 0 ? 10 : 0 }}>
                                    {p.excerpt}
                                  </div>
                                  {/* Inline figure if any */}
                                  {figs.length > 0 && (
                                    <div style={{ background: '#fff', borderRadius: 8, padding: '10px 12px', marginTop: 8 }}>
                                      {(() => {
                                        const fig = figs[0];
                                        const tc3 = (type) => ({ RCT: '#7eb8f7', 'Systematic Review': '#fb923c', 'Meta-Analysis': '#4ade80', Guideline: '#c084fc', Registry: '#f97b7b', 'Real-World': '#e5a14b' })[type] || 'var(--dim)';
                                        if (fig.type === 'bar') {
                                          const vals = [72, 48, 38, 20].map(n => n + (p._idx * 7) % 15);
                                          const mx = Math.max(...vals);
                                          const lbls = ['Control', 'Low-dose', 'High-dose', 'Symptomatic'];
                                          return (
                                            <svg viewBox="0 0 200 90" style={{ width: '100%', height: 90 }}>
                                              <text x="100" y="10" textAnchor="middle" fontSize="7" fontWeight="700" fill="#333">{fig.label}</text>
                                              {vals.map((v2, i) => {
                                                const bh = (v2 / mx) * 58; const bx = 20 + i * 44; const by = 72 - bh;
                                                const cols = ['#60a5fa','#34d399','#f59e0b','#f87171'];
                                                return <g key={i}><rect x={bx} y={by} width="30" height={bh} fill={cols[i]} rx="2"/><text x={bx+15} y={by-3} textAnchor="middle" fontSize="6" fill="#555">{v2}%</text><text x={bx+15} y="82" textAnchor="middle" fontSize="5.5" fill="#888">{lbls[i]}</text></g>;
                                              })}
                                            </svg>
                                          );
                                        }
                                        return <div style={{ font: '500 10px/1 Plus Jakarta Sans', color: '#888', textAlign: 'center', padding: '8px 0' }}>{fig.label}</div>;
                                      })()}
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
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
                      {/* Back — bottom */}
                      <Box
                        css="display:inline-flex;align-items:center;gap:5px;padding:7px 12px;font:600 10.5px/1 Plus Jakarta Sans;color:var(--faint);cursor:pointer;border:1px solid var(--rule2);border-radius:6px;flex-shrink:0"
                        hover="color:var(--ink);border-color:var(--ink)"
                        onClick={v.goBack}
                      >
                        <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M8 2L3 6l5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        Back
                      </Box>
                      {/* readiness pills */}
                      <div style={S('display:flex;align-items:center;gap:8px;flex:1;flex-wrap:wrap')}>
                        {readiness.map(({ a, cur, tgt, ok }) => (
                          <div key={a} style={S(`display:flex;align-items:center;gap:5px;padding:5px 10px;border:1px solid ${ok ? 'var(--ok)' : 'var(--rule2)'};background:${ok ? 'rgba(22,101,52,0.1)' : 'var(--s2)'}`)}>
                            <div style={{ width: 6, height: 6, borderRadius: '50%', background: ok ? 'var(--ok)' : 'var(--faint)' }} />
                            <span style={{ font: '600 10px/1 Plus Jakarta Sans', color: ok ? 'var(--ok)' : 'var(--faint)' }}>{a}</span>
                            <span style={{ font: '500 10px/1 var(--mono)', color: ok ? 'var(--ok)' : 'var(--dim)' }}>{cur}/{tgt}</span>
                          </div>
                        ))}
                        <span style={S('font:500 11px/1 Plus Jakarta Sans;color:var(--faint);margin-left:4px')}>{totalEx} excerpts · {accepted.length} papers</span>
                      </div>
                      {/* CTA */}
                      <Box
                        css={`padding:11px 24px;font:700 12px/1 Plus Jakarta Sans;cursor:pointer;background:${allReady ? 'var(--acc)' : 'var(--s2)'};color:${allReady ? '#fff' : 'var(--ink)'};border:1px solid ${allReady ? 'var(--acc)' : 'var(--rule2)'};white-space:nowrap;transition:background 0.15s;border-radius:8px`}
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
                              <span style={S(`font:800 16px/1 Plus Jakarta Sans;letter-spacing:-0.02em;color:var(--ink)`)}>{allReady ? 'Evidence base looks good' : 'Some artifacts aren\'t ready yet'}</span>
                            </div>
                            <div style={S('font:400 12px/1.6 Plus Jakarta Sans;color:var(--faint);max-width:400px')}>
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
                                  <span style={S('font:600 13px/1 Plus Jakarta Sans;color:var(--acc);flex:1')}>{label}</span>
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
                                <span style={S('font:600 13px/1 Plus Jakarta Sans;color:var(--dim);flex:1')}>{label}</span>
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
                            <div style={S('margin-top:16px;font:400 12px/1.65 Plus Jakarta Sans;color:var(--faint)')}>
                              You can go back and accept more excerpts for these artifacts, or finalize anyway if you're satisfied with what's there.
                            </div>
                          )}
                        </div>

                        {/* Footer buttons */}
                        <div style={S('padding:16px 24px;border-top:1px solid var(--rule);display:flex;align-items:center;justify-content:flex-end;gap:10px')}>
                          <Box css="padding:10px 22px;font:600 12px/1 Plus Jakarta Sans;border:1px solid var(--rule2);color:var(--dim);cursor:pointer;border-radius:8px" hover="border-color:var(--ink);color:var(--ink)" onClick={v.closeMAReview}>Go back</Box>
                          <Box
                            css="padding:10px 28px;font:700 12px/1 Plus Jakarta Sans;background:linear-gradient(135deg,#2c52cc,#4468e0);color:#fff;cursor:pointer;border:1px solid var(--acc);border-radius:8px"
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
                          <div style={S('font:800 17px/1 Plus Jakarta Sans;letter-spacing:-0.02em;color:var(--ink);margin-bottom:4px')}>Add an excerpt</div>
                          <div style={S('font:400 11px/1 Plus Jakarta Sans;color:var(--faint)')}>Paste a key quote from a paper in your evidence base</div>
                        </div>
                        <Box css="width:28px;height:28px;border:1px solid var(--rule2);display:grid;place-items:center;cursor:pointer;font-size:13px;color:var(--faint);flex-shrink:0" hover="border-color:var(--dim);color:var(--ink)" onClick={v.closeAddExcerpt}>✕</Box>
                      </div>

                      <div style={S('padding:22px 26px;display:flex;flex-direction:column;gap:20px;overflow-y:auto')}>
                        {/* Textarea */}
                        <div>
                          <div style={S('font:700 9.5px/1 Plus Jakarta Sans;letter-spacing:0.12em;color:var(--faint);margin-bottom:8px')}>EXCERPT TEXT</div>
                          <textarea rows={5} autoFocus
                            style={{ width: '100%', background: 'var(--bg)', border: '1px solid var(--acc)', color: 'var(--ink)', padding: '13px 14px', fontSize: 13, lineHeight: 1.65, resize: 'vertical', outline: 'none', fontFamily: 'Plus Jakarta Sans,sans-serif', boxSizing: 'border-box', transition: 'border-color 0.15s', borderRadius: 8 }}
                            placeholder="Paste or type the excerpt..."
                            value={v.excerptModalText}
                            onChange={(e) => v.setExcerptModalText(e.target.value)}
                          />
                          {v.excerptModalText.trim().length > 0 && (
                            <div style={S('margin-top:6px;font:500 10px/1 Plus Jakarta Sans;color:var(--faint)')}>
                              {v.excerptModalText.trim().split(' ').length} words
                            </div>
                          )}
                        </div>

                        {/* Artifacts */}
                        <div>
                          <div style={S('font:700 9.5px/1 Plus Jakarta Sans;letter-spacing:0.12em;color:var(--faint);margin-bottom:10px')}>USED IN ARTIFACTS</div>
                          <div style={S('display:flex;gap:8px;flex-wrap:wrap')}>
                            {ALL_ARTIFACTS.map((a) => {
                              const on = v.excerptModalArtifacts[a];
                              const c = ART_COLORS[a];
                              return (
                                <Box key={a}
                                  css={`padding:7px 18px;border-radius:999px;border:1px solid ${on ? c : 'var(--rule)'};background:${on ? `${c}20` : 'transparent'};color:${on ? c : 'var(--faint)'};font:600 12px/1 Plus Jakarta Sans;cursor:pointer;transition:all 0.15s`}
                                  hover={!on ? `border-color:${c};color:${c}` : ''}
                                  onClick={() => v.toggleExcerptModalArtifact(a)}
                                >{a}</Box>
                              );
                            })}
                          </div>
                        </div>

                        {/* Tracks */}
                        <div>
                          <div style={S('font:700 9.5px/1 Plus Jakarta Sans;letter-spacing:0.12em;color:var(--faint);margin-bottom:10px')}>RELEVANT TRACKS</div>
                          <div style={S('display:flex;gap:7px;flex-wrap:wrap')}>
                            {CONTENT_TRACKS.map((t) => {
                              const on = !!v.excerptModalTracks[t.id];
                              return (
                                <Box key={t.id}
                                  css={`padding:7px 14px;border-radius:999px;border:1px solid ${on ? t.color : 'var(--rule)'};background:${on ? `${t.color}20` : 'transparent'};color:${on ? t.color : 'var(--faint)'};font:600 11px/1 Plus Jakarta Sans;cursor:pointer;transition:all 0.15s`}
                                  hover={!on ? `border-color:${t.color};color:${t.color}` : ''}
                                  onClick={() => v.toggleExcerptModalTrack(t.id)}
                                >{t.label}</Box>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      <div style={S('padding:16px 26px;border-top:1px solid var(--rule2);display:flex;align-items:center;justify-content:space-between')}>
                        <Box css="padding:9px 18px;font:600 11px/1 Plus Jakarta Sans;border:1px solid var(--rule);color:var(--faint);cursor:pointer" hover="color:var(--ink)" onClick={v.closeAddExcerpt}>Cancel</Box>
                        <Box
                          css={`padding:10px 28px;font:700 12px/1 Plus Jakarta Sans;cursor:${v.excerptModalText.trim() ? 'pointer' : 'default'};background:${v.excerptModalText.trim() ? 'var(--acc)' : 'var(--s2)'};color:${v.excerptModalText.trim() ? '#fff' : 'var(--faint)'};border:1px solid ${v.excerptModalText.trim() ? 'var(--acc)' : 'var(--rule)'};transition:all 0.15s`}
                          hover={v.excerptModalText.trim() ? 'background:var(--acc)' : ''}
                          onClick={v.excerptModalText.trim() ? v.submitExcerpt : undefined}
                        >Add excerpt</Box>
                      </div>

                    </div>
                  </div>
                )}

              </div>

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
                  <text x="22" y="26" textAnchor="middle" fontSize="9" fontWeight="700" fill={qColor} fontFamily="Plus Jakarta Sans">{score}</text>
                </svg>
              );
            };

            const leftPanel = (<div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative', animation: 'fadeUp 0.32s cubic-bezier(0.22,1,0.36,1) both' }}>

                  {/* Status banner */}
                  <div style={S(`display:flex;align-items:center;gap:10px;padding:11px 20px;border-bottom:1px solid var(--rule);flex:none;background:${isDone ? 'rgba(22,101,52,0.08)' : 'rgba(44,82,204,0.06)'}`)}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: isDone ? 'var(--ok)' : 'var(--acc)', animation: isDone ? '' : 'puls 1s infinite' }} />
                    <div style={S(`font:700 10px/1 Plus Jakarta Sans;letter-spacing:0.14em;color:${isDone ? 'var(--ok)' : 'var(--acc)'}`)}>
                      {isDone ? 'REVIEW COMPLETE — READY FOR CONTENT GENERATION' : 'MA REVIEW AGENT · RUNNING…'}
                    </div>
                    {!isDone && <div style={S('margin-left:auto;font:600 10px/1 var(--mono);color:var(--faint)')}>{Math.round((rN / (REVIEW_AGENT_MSGS.length + 1)) * 100)}%</div>}
                  </div>

                  {/* Thread header */}
                  <div style={S('padding:14px 20px;border-bottom:1px solid var(--rule);flex:none')}>
                    <div style={S('font:600 9.5px/1 Plus Jakarta Sans;letter-spacing:0.14em;color:var(--faint);margin-bottom:4px')}>MEDICAL AFFAIRS REVIEW AGENT</div>
                    <div style={S('font:700 14px/1 Plus Jakarta Sans;letter-spacing:-0.01em;color:var(--ink)')}>Evidence Quality & Artifact Readiness</div>
                  </div>

                  {/* Messages */}
                  <div style={S('flex:1;overflow-y:auto;padding:20px')}>
                    {visibleMsgs.map((msg, i) => (
                      <div key={i} style={{ ...S('display:flex;gap:10px;margin-bottom:22px;animation:rise 0.3s ease both'), animationDelay: `${i * 0.05}s` }}>
                        <div style={{ width: 28, height: 28, flexShrink: 0, background: msg.color || 'var(--acc)', display: 'grid', placeItems: 'center', font: '700 10px/1 Plus Jakarta Sans', color: msg.color ? '#000' : '#fff', fontSize: msg.color ? 11 : 10, borderRadius: '50%' }}>
                          {msg.artifact ? msg.artifact[0] : 'AI'}
                        </div>
                        <div style={S('max-width:88%;flex:1')}>
                          {msg.artifact && (
                            <div style={{ ...S('font:700 9.5px/1 Plus Jakarta Sans;letter-spacing:0.12em;margin-bottom:6px'), color: msg.color }}>
                              {msg.artifact.toUpperCase()} · ANALYSIS
                            </div>
                          )}
                          <div style={{ background: 'var(--s1)', border: '1px solid var(--rule)', borderLeft: `2px solid ${msg.color || 'var(--acc)'}`, padding: '12px 14px', fontSize: 12.5, color: 'var(--dim)', borderRadius: 10 }}>
                            {renderMD(msg.text)}
                            {/* Sources */}
                            {msg.sources && msg.sources.length > 0 && (
                              <div style={S('display:flex;gap:5px;flex-wrap:wrap;margin-top:10px;padding-top:10px;border-top:1px solid var(--rule)')}>
                                <span style={S('font:600 9px/1 Plus Jakarta Sans;letter-spacing:0.1em;color:var(--faint);margin-right:2px')}>SOURCES</span>
                                {msg.sources.map((s) => (
                                  <span key={s} style={S('padding:2px 8px;border:1px solid var(--rule2);font:600 9.5px/1 Plus Jakarta Sans;color:var(--dim);cursor:pointer;border-radius:20px')}>{s}</span>
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
                        <div style={S('width:28px;height:28px;flex:none;display:grid;place-items:center;font:700 10px/1 Plus Jakarta Sans;background:linear-gradient(135deg,#2c52cc,#4468e0);color:#fff;border-radius:50%')}>AI</div>
                        <div style={S('background:var(--s1);border:1px solid var(--rule);border-left:2px solid var(--acc);padding:12px 14px;border-radius:10px')}>
                          <div style={S('font:600 10px/1 Plus Jakarta Sans;letter-spacing:0.1em;color:var(--acc);margin-bottom:8px')}>
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
                        <div style={S('width:28px;height:28px;flex:none;display:grid;place-items:center;font:700 10px/1 Plus Jakarta Sans;background:var(--ok);color:#fff;border-radius:50%')}>AI</div>
                        <div>
                          <div style={S('font:600 9.5px/1 Plus Jakarta Sans;letter-spacing:0.12em;color:var(--ok);margin-bottom:6px')}>MA REVIEW AGENT · COMPLETE</div>
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
                        <Box css="flex:1;padding:10px 0;text-align:center;font:700 11px/1 Plus Jakarta Sans;border:1px solid var(--rule2);color:var(--dim);cursor:pointer;border-radius:8px" hover="border-color:var(--ink);color:var(--ink)">
                          ↓ Download research JSON
                        </Box>
                        <Box css="flex:1;padding:10px 0;text-align:center;font:700 11px/1 Plus Jakarta Sans;border:1px solid var(--rule2);color:var(--dim);cursor:pointer;border-radius:8px" hover="border-color:var(--ink);color:var(--ink)">
                          ↓ Download evidence brief
                        </Box>
                      </div>
                      {v.sciSubmitted ? (
                        <div style={S('display:flex;align-items:center;justify-content:center;gap:8px;padding:10px;background:rgba(22,101,52,0.1);border:1px solid var(--ok);font:700 11px/1 Plus Jakarta Sans;color:var(--ok)')}>
                          <span>✓</span> Sent for Scientific Review — awaiting Dr. Arjun Mehta
                        </div>
                      ) : (
                        <Box css="padding:12px 0;text-align:center;font:700 12px/1 Plus Jakarta Sans;background:var(--ok);color:#fff;cursor:pointer;border-radius:8px" hover="opacity:0.85" onClick={v.submitToSci}>
                          Submit for Scientific Review →
                        </Box>
                      )}
                    </div>
                  )}
                </div>

            ); /* end leftPanel */

            const rightPanel = (<div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', animation: 'fadeUp 0.32s cubic-bezier(0.22,1,0.36,1) both' }}>

                  {/* Back button — top */}
                  <div style={S('padding:10px 20px;flex:none;border-bottom:1px solid var(--rule)')}>
                    <Box
                      css="display:inline-flex;align-items:center;gap:5px;padding:6px 10px;font:600 11px/1 Plus Jakarta Sans;color:var(--faint);cursor:pointer;border:1px solid var(--rule2);border-radius:6px"
                      hover="color:var(--ink);border-color:var(--ink)"
                      onClick={v.goBack}
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M8 2L3 6l5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      Back to Organize
                    </Box>
                  </div>

                  {/* Header */}
                  <div style={S('border-bottom:1px solid var(--rule2);flex:none;background:var(--bg);padding:12px 20px')}>
                    <div style={S('display:flex;align-items:center;gap:10px')}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: isDone ? 'var(--ok)' : 'var(--warn)', animation: isDone ? '' : 'puls 1.1s infinite' }} />
                      <div style={S('font:700 12px/1 Plus Jakarta Sans;letter-spacing:-0.01em')}>Gap Analysis</div>
                      <span style={{ background: '#dc2626', color: '#fff', fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 10, fontFamily: 'Plus Jakarta Sans' }}>
                        {GAP_FINDINGS.filter((_g, i) => !v.gapResolved[i]).length} issues
                      </span>
                      <div style={{ flex: 1 }} />
                      <Box
                        css="display:inline-flex;align-items:center;gap:8px;padding:11px 24px;font:700 13px/1 Plus Jakarta Sans;cursor:pointer;background:linear-gradient(135deg,#2c52cc,#4468e0);color:#fff;border-radius:10px;box-shadow:0 3px 12px rgba(44,82,204,0.3)"
                        hover="opacity:0.88"
                        onClick={v.doMAApprove}
                      >
                        <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        Send to Scientific Review
                      </Box>
                    </div>
                  </div>

                  {/* ── GAP ANALYSIS ── */}
                  {(() => {
                    const sevColor = (s) => s === 'Critical' ? '#dc2626' : s === 'Warning' ? '#d97706' : '#2563eb';
                    const sevBg = (s) => s === 'Critical' ? '#fef2f2' : s === 'Warning' ? '#fffbeb' : '#eff6ff';
                    const sevBorder = (s) => s === 'Critical' ? '#fecaca' : s === 'Warning' ? '#fde68a' : '#bfdbfe';
                    const sevIcon = (s) => s === 'Critical' ? (
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="6" stroke="#dc2626" strokeWidth="1.2"/><path d="M6.5 3.5v3.2" stroke="#dc2626" strokeWidth="1.4" strokeLinecap="round"/><circle cx="6.5" cy="9.5" r="0.75" fill="#dc2626"/></svg>
                    ) : s === 'Warning' ? (
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 1.5L12.5 12H0.5L6.5 1.5z" stroke="#d97706" strokeWidth="1.2" strokeLinejoin="round"/><path d="M6.5 5v3" stroke="#d97706" strokeWidth="1.4" strokeLinecap="round"/><circle cx="6.5" cy="10" r="0.75" fill="#d97706"/></svg>
                    ) : (
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="6" stroke="#2563eb" strokeWidth="1.2"/><path d="M6.5 6v3.5" stroke="#2563eb" strokeWidth="1.4" strokeLinecap="round"/><circle cx="6.5" cy="4" r="0.75" fill="#2563eb"/></svg>
                    );

                    const critical = GAP_FINDINGS.map((g, i) => ({ ...g, gapIdx: i })).filter(g => g.severity === 'Critical');
                    const warning = GAP_FINDINGS.map((g, i) => ({ ...g, gapIdx: i })).filter(g => g.severity === 'Warning');
                    const note = GAP_FINDINGS.map((g, i) => ({ ...g, gapIdx: i })).filter(g => g.severity === 'Note');

                    const selGap = GAP_FINDINGS[v.gapSelected];
                    const selPaper = selGap ? RESEARCH_PAPERS[selGap.paperIdx] : null;
                    const isResolved = selGap ? !!v.gapResolved[v.gapSelected] : false;
                    const whyOpen = selGap ? !!v.gapWhyExpanded[v.gapSelected] : false;
                    const resolvedCount = Object.values(v.gapResolved).filter(Boolean).length;

                    const SidebarGroup = ({ label, items, color }) => items.length === 0 ? null : (
                      <div style={{ marginBottom: 4 }}>
                        <div style={{ padding: '5px 12px 3px', display: 'flex', alignItems: 'center', gap: 5 }}>
                          <span style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', color: 'var(--faint)', textTransform: 'uppercase' }}>{label}</span>
                          <span style={{ background: color, color: '#fff', fontSize: 8.5, fontWeight: 700, padding: '1px 5px', borderRadius: 10, fontFamily: 'Plus Jakarta Sans' }}>{items.length}</span>
                        </div>
                        {items.map((g) => {
                          const active = v.gapSelected === g.gapIdx;
                          const resolved = !!v.gapResolved[g.gapIdx];
                          const p = RESEARCH_PAPERS[g.paperIdx];
                          return (
                            <div
                              key={g.gapIdx}
                              onClick={() => v.setGapSelected(g.gapIdx)}
                              style={{
                                padding: '7px 12px',
                                cursor: 'pointer',
                                background: active ? '#f0f4ff' : 'transparent',
                                borderLeft: active ? '3px solid ' + color : '3px solid transparent',
                                borderBottom: '1px solid var(--rule)',
                                opacity: resolved ? 0.5 : 1,
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 2 }}>
                                <span style={{ background: sevBg(g.severity), color: sevColor(g.severity), border: '1px solid ' + sevBorder(g.severity), fontSize: 8.5, fontWeight: 700, padding: '1px 5px', borderRadius: 3, fontFamily: 'Plus Jakarta Sans' }}>{g.severity}</span>
                                {resolved && <span style={{ fontSize: 8.5, color: '#16a34a', fontWeight: 700, fontFamily: 'Plus Jakarta Sans' }}>✓</span>}
                              </div>
                              <div style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 11, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.3, marginBottom: 2 }}>{g.title}</div>
                              <div style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 9.5, color: 'var(--faint)' }} title={p.title}>{p.title.length > 38 ? p.title.slice(0, 35) + '…' : p.title}</div>
                            </div>
                          );
                        })}
                      </div>
                    );

                    return (
                      <div key="gaps" style={{ flex: 1, display: 'flex', overflow: 'hidden', minHeight: 0 }}>
                        {/* Sidebar */}
                        <div style={{ width: 218, flexShrink: 0, borderRight: '1px solid var(--rule)', background: 'var(--s2)', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
                          <div style={{ padding: '10px 12px 8px', borderBottom: '1px solid var(--rule)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
                              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1L13 12.5H1L7 1z" stroke="#d97706" strokeWidth="1.2" strokeLinejoin="round" fill="rgba(217,119,6,0.08)"/><path d="M7 5.5v3" stroke="#d97706" strokeWidth="1.4" strokeLinecap="round"/><circle cx="7" cy="10.5" r="0.8" fill="#d97706"/></svg>
                              <span style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 12, fontWeight: 700, color: 'var(--ink)' }}>Gap Analysis</span>
                            </div>
                            <div style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 9.5, color: 'var(--faint)', lineHeight: 1.45, marginBottom: 8 }}>
                              {GAP_FINDINGS.length} issues found across {RESEARCH_PAPERS.length} papers
                            </div>
                            <div style={{ display: 'flex', gap: 4 }}>
                              {[['#dc2626','#fef2f2','#fecaca',critical.length,'C'],['#d97706','#fffbeb','#fde68a',warning.length,'W'],['#2563eb','#eff6ff','#bfdbfe',note.length,'N']].map(([c,bg,border,n,label]) => (
                                <div key={label} style={{ flex: 1, background: bg, border: '1px solid ' + border, borderRadius: 6, padding: '5px 4px', textAlign: 'center' }}>
                                  <div style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 15, fontWeight: 800, color: c }}>{n}</div>
                                  <div style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 8, color: c, fontWeight: 600 }}>{label === 'C' ? 'CRIT' : label === 'W' ? 'WARN' : 'NOTE'}</div>
                                </div>
                              ))}
                            </div>
                            {resolvedCount > 0 && (
                              <div style={{ marginTop: 6, background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 5, padding: '4px 7px', display: 'flex', alignItems: 'center', gap: 5 }}>
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><circle cx="5" cy="5" r="4.5" fill="#16a34a"/><path d="M3 5l1.5 1.5 3-3" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                <span style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 9.5, fontWeight: 600, color: '#16a34a' }}>{resolvedCount}/{GAP_FINDINGS.length} resolved</span>
                              </div>
                            )}
                          </div>
                          <div style={{ flex: 1, overflowY: 'auto', paddingTop: 3 }}>
                            <SidebarGroup label="Critical" items={critical} color="#dc2626" />
                            <SidebarGroup label="Warning" items={warning} color="#d97706" />
                            <SidebarGroup label="Note" items={note} color="#2563eb" />
                          </div>
                        </div>

                        {/* Main content */}
                        <div style={{ flex: 1, minWidth: 0, overflowY: 'auto', background: '#fff' }}>
                          {selGap && selPaper ? (() => {
                            const excerptIdx = selPaper.excerpt.indexOf(selGap.highlightText);
                            const beforeHL = excerptIdx >= 0 ? selPaper.excerpt.slice(0, excerptIdx) : selPaper.excerpt;
                            const hl = excerptIdx >= 0 ? selGap.highlightText : '';
                            const afterHL = excerptIdx >= 0 ? selPaper.excerpt.slice(excerptIdx + selGap.highlightText.length) : '';
                            return (
                              <div style={{ padding: '16px 20px', maxWidth: 760, width: '100%', margin: '0 auto' }}>
                                {/* Paper header */}
                                <div style={{ marginBottom: 14, paddingBottom: 12, borderBottom: '1px solid var(--rule)' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                                    <span style={{ background: typeColor(selPaper.type), color: '#fff', fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 3, fontFamily: 'Plus Jakarta Sans' }}>{selPaper.type}</span>
                                    <span style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 10.5, color: 'var(--faint)' }}>{selPaper.year} · {selPaper.db}</span>
                                    {isResolved && <span style={{ marginLeft: 'auto', background: '#16a34a', color: '#fff', fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 10, fontFamily: 'Plus Jakarta Sans' }}>✓ RESOLVED</span>}
                                  </div>
                                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 4 }}>
                                    <button
                                      onClick={() => v.setGapPaperOpen(true)}
                                      style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 13.5, fontWeight: 700, color: 'var(--ink)', lineHeight: 1.35, background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left', flex: 1 }}
                                    >
                                      {selPaper.title}
                                    </button>
                                    <button
                                      onClick={() => v.setGapPaperOpen(true)}
                                      title="View paper details"
                                      style={{ flexShrink: 0, marginTop: 2, width: 20, height: 20, borderRadius: '50%', border: '1.5px solid #94a3b8', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--faint)' }}
                                    >
                                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><circle cx="5" cy="5" r="4.5" stroke="currentColor" strokeWidth="1.2"/><path d="M5 4.5v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><circle cx="5" cy="3" r="0.6" fill="currentColor"/></svg>
                                    </button>
                                  </div>
                                  <div style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 10.5, color: 'var(--faint)' }}>{selPaper.journal}</div>
                                </div>

                                {/* Paper detail modal */}
                                {v.gapPaperOpen && (
                                  <div style={{ position: 'fixed', inset: 0, zIndex: 400, background: 'rgba(15,31,74,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(2px)', animation: 'rise 0.15s ease' }}
                                    onClick={(e) => { if (e.target === e.currentTarget) v.setGapPaperOpen(false); }}>
                                    <div style={{ width: 560, maxHeight: '82vh', background: '#fff', borderRadius: 14, border: '1px solid var(--rule2)', boxShadow: '0 8px 40px rgba(15,31,74,0.18)', display: 'flex', flexDirection: 'column', overflow: 'hidden', animation: 'fadeUp 0.2s cubic-bezier(0.22,1,0.36,1) both' }}>
                                      {/* Modal header */}
                                      <div style={{ padding: '16px 20px 12px', borderBottom: '1px solid var(--rule)', display: 'flex', alignItems: 'flex-start', gap: 10, flexShrink: 0 }}>
                                        <div style={{ flex: 1 }}>
                                          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                                            <span style={{ background: typeColor(selPaper.type), color: '#fff', fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 3, fontFamily: 'Plus Jakarta Sans' }}>{selPaper.type}</span>
                                            <span style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 10.5, color: 'var(--faint)' }}>{selPaper.year} · {selPaper.db}</span>
                                          </div>
                                          <div style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 14, fontWeight: 700, color: 'var(--ink)', lineHeight: 1.35, marginBottom: 3 }}>{selPaper.title}</div>
                                          <div style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 10.5, color: 'var(--faint)' }}>{selPaper.journal}</div>
                                        </div>
                                        <button onClick={() => v.setGapPaperOpen(false)} style={{ background: 'none', border: '1px solid var(--rule2)', borderRadius: 6, width: 26, height: 26, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--faint)', flexShrink: 0 }}>
                                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
                                        </button>
                                      </div>
                                      {/* Modal body */}
                                      <div style={{ overflowY: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                                        {/* Metadata grid */}
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                                          {[['Study Design', selPaper.designTier], ['GRADE Certainty', selPaper.grade], ['Statistical Rigor', selPaper.statRigor], ['Citations', selPaper.citations], ['Funding', selPaper.funding], ['Appraisal', selPaper.appraisal]].map(([label, val]) => (
                                            <div key={label} style={{ background: 'var(--s2)', border: '1px solid var(--rule)', borderRadius: 7, padding: '8px 12px' }}>
                                              <div style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 9, fontWeight: 700, color: 'var(--faint)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 3 }}>{label}</div>
                                              <div style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 11, color: 'var(--dim)', lineHeight: 1.4 }}>{val}</div>
                                            </div>
                                          ))}
                                        </div>
                                        {/* Relevance bar */}
                                        <div>
                                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                                            <span style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 9, fontWeight: 700, color: 'var(--faint)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Relevance Score</span>
                                            <span style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 11, fontWeight: 700, color: 'var(--ink)' }}>{selPaper.relevance}/100</span>
                                          </div>
                                          <div style={{ height: 5, background: 'var(--rule)', borderRadius: 10 }}>
                                            <div style={{ height: '100%', width: `${selPaper.relevance}%`, background: selPaper.relevance >= 80 ? '#16a34a' : selPaper.relevance >= 60 ? '#d97706' : '#dc2626', borderRadius: 10, transition: 'width 0.5s ease' }} />
                                          </div>
                                        </div>
                                        {/* Excerpt */}
                                        <div>
                                          <div style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 9, fontWeight: 700, color: 'var(--faint)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 7 }}>Key Excerpt</div>
                                          <div style={{ fontFamily: 'Georgia, serif', fontSize: 12.5, lineHeight: 1.8, color: 'var(--ink)', background: 'var(--s2)', borderRadius: 7, padding: '12px 14px', border: '1px solid var(--rule)', borderLeft: '3px solid ' + typeColor(selPaper.type) }}>
                                            {selPaper.excerpt}
                                            <div style={{ marginTop: 6, fontFamily: 'Plus Jakarta Sans', fontSize: 9.5, color: 'var(--faint)' }}>{selPaper.excerptSrc}</div>
                                          </div>
                                        </div>
                                        {/* Artifact tags */}
                                        <div>
                                          <div style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 9, fontWeight: 700, color: 'var(--faint)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>Used In</div>
                                          <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                                            {selPaper.artifacts.map((a) => (
                                              <span key={a} style={{ padding: '3px 10px', border: '1px solid var(--rule2)', borderRadius: 20, fontFamily: 'Plus Jakarta Sans', fontSize: 10, color: 'var(--dim)', fontWeight: 600 }}>{a}</span>
                                            ))}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {/* Highlighted excerpt with switch toggle */}
                                {(() => {
                                  const showRec = !!v.gapShowRecommendation[v.gapSelected];
                                  return (
                                    <div style={{ marginBottom: 14 }}>
                                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 7 }}>
                                        <div style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 9.5, fontWeight: 700, color: 'var(--faint)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                                          {showRec ? 'AI Recommended Version' : 'Current Excerpt (Flagged)'}
                                        </div>
                                        <button
                                          onClick={() => v.toggleGapRecommendation(v.gapSelected)}
                                          style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '4px 10px', border: `1.5px solid ${showRec ? '#16a34a' : '#2563eb'}`, borderRadius: 20, background: showRec ? '#f0fdf4' : '#eff6ff', cursor: 'pointer', fontFamily: 'Plus Jakarta Sans', fontSize: 10, fontWeight: 700, color: showRec ? '#16a34a' : '#2563eb' }}
                                        >
                                          <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M2 5.5c0-1.93 1.57-3.5 3.5-3.5S9 3.57 9 5.5 7.43 9 5.5 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><path d="M9 3.5V5.5H7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                          {showRec ? 'Show original' : 'Switch to AI recommendation'}
                                        </button>
                                      </div>
                                      {showRec ? (
                                        <div style={{ fontFamily: 'Georgia, serif', fontSize: 13, lineHeight: 1.8, color: 'var(--ink)', background: '#f0fdf4', borderRadius: 7, padding: '12px 16px', border: '1px solid #bbf7d0', borderLeft: '3px solid #16a34a', animation: 'rise 0.18s ease' }}>
                                          <div style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 9, fontWeight: 700, color: '#16a34a', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>✓ Recommended replacement</div>
                                          {selPaper.excerpt
                                            .replace('causes', 'is associated with')
                                            .replace('leads to', 'correlates with')
                                            .replace('cause', 'associate with')}
                                          <div style={{ marginTop: 6, fontFamily: 'Plus Jakarta Sans', fontSize: 9.5, color: 'var(--faint)' }}>{selPaper.excerptSrc} · <em>language adjusted per AI recommendation</em></div>
                                        </div>
                                      ) : (
                                        <div style={{ fontFamily: 'Georgia, serif', fontSize: 13, lineHeight: 1.8, color: 'var(--ink)', background: 'var(--s2)', borderRadius: 7, padding: '12px 16px', border: '1px solid var(--rule)' }}>
                                          {beforeHL}
                                          {hl && <span style={{ background: 'rgba(251,191,36,0.35)', borderBottom: '2px solid #f59e0b', borderRadius: 2, padding: '1px 2px' }}>{hl}</span>}
                                          {afterHL}
                                          <div style={{ marginTop: 6, fontFamily: 'Plus Jakarta Sans', fontSize: 9.5, color: 'var(--faint)' }}>{selPaper.excerptSrc}</div>
                                        </div>
                                      )}
                                    </div>
                                  );
                                })()}

                                {/* Gap card */}
                                <div style={{ border: '1px solid ' + sevBorder(selGap.severity), borderRadius: 8, overflow: 'hidden', marginBottom: 14, opacity: isResolved ? 0.65 : 1 }}>
                                  <div style={{ background: sevBg(selGap.severity), borderBottom: '1px solid ' + sevBorder(selGap.severity), padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 7 }}>
                                    {sevIcon(selGap.severity)}
                                    <span style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 9.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: sevColor(selGap.severity) }}>{selGap.severity}</span>
                                    <span style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 9.5, color: sevColor(selGap.severity), opacity: 0.7 }}>·</span>
                                    <span style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 10, fontWeight: 600, color: sevColor(selGap.severity) }}>{selGap.type}</span>
                                  </div>
                                  <div style={{ background: '#fff', padding: '14px 16px' }}>
                                    <div style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 13, fontWeight: 700, color: 'var(--ink)', marginBottom: 7 }}>{selGap.title}</div>
                                    <div style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 12, color: 'var(--dim)', lineHeight: 1.6, marginBottom: 12 }}>{selGap.description}</div>
                                    {/* Why collapsible */}
                                    <div style={{ marginBottom: 12 }}>
                                      <button onClick={() => v.toggleGapWhy(v.gapSelected)} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'Plus Jakarta Sans', fontSize: 11, fontWeight: 600, color: 'var(--dim)' }}>
                                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" style={{ transform: whyOpen ? 'rotate(90deg)' : 'none', transition: 'transform 0.15s' }}><path d="M3.5 2l4 3.5-4 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                        Why this was flagged
                                      </button>
                                      {whyOpen && (
                                        <div style={{ marginTop: 6, background: 'var(--s2)', border: '1px solid var(--rule)', borderRadius: 5, padding: '8px 12px', fontFamily: 'Plus Jakarta Sans', fontSize: 11.5, color: 'var(--dim)', lineHeight: 1.6, animation: 'rise 0.15s ease' }}>
                                          {selGap.why}
                                        </div>
                                      )}
                                    </div>
                                    {/* Recommendation */}
                                    <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 7, padding: '9px 12px', marginBottom: 14 }}>
                                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0, marginTop: 1 }}><circle cx="6" cy="6" r="5.5" fill="#16a34a"/><path d="M3 6l2.5 2.5 4-4" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                        <div>
                                          <div style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 9.5, fontWeight: 700, color: '#16a34a', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 3 }}>Recommendation</div>
                                          <div style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 11.5, color: '#166534', lineHeight: 1.55 }}>{selGap.recommendation}</div>
                                        </div>
                                      </div>
                                    </div>
                                    {/* Actions */}
                                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                                      {!isResolved ? (
                                        <button onClick={() => v.resolveGap(v.gapSelected)} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '6px 12px', background: 'linear-gradient(135deg,#16a34a,#22c55e)', color: '#fff', border: 'none', borderRadius: 6, fontFamily: 'Plus Jakarta Sans', fontSize: 11, fontWeight: 700, cursor: 'pointer', boxShadow: '0 2px 6px rgba(22,163,74,0.25)' }}>
                                          <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M2 5.5l3 3 4.5-5" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                          Mark Resolved
                                        </button>
                                      ) : (
                                        <button onClick={() => v.unresolveGap(v.gapSelected)} style={{ padding: '6px 12px', background: 'var(--s2)', color: 'var(--dim)', border: '1px solid var(--rule2)', borderRadius: 6, fontFamily: 'Plus Jakarta Sans', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>
                                          Undo Resolve
                                        </button>
                                      )}
                                      <button onClick={() => v.deleteResearchPaper(selGap.paperIdx)} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '6px 12px', background: '#fff', color: '#dc2626', border: '1px solid #fecaca', borderRadius: 6, fontFamily: 'Plus Jakarta Sans', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>
                                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
                                        Remove Paper
                                      </button>
                                      <button onClick={() => { v.toggleAccept(selGap.paperIdx); v.resolveGap(v.gapSelected); }} style={{ padding: '6px 12px', background: '#fff', color: 'var(--dim)', border: '1px solid var(--rule2)', borderRadius: 6, fontFamily: 'Plus Jakarta Sans', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>
                                        Accept Anyway
                                      </button>
                                    </div>
                                  </div>
                                </div>

                                {/* Context */}
                                <div style={{ background: 'var(--s2)', borderRadius: 7, padding: '10px 14px', border: '1px solid var(--rule)' }}>
                                  <div style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 9.5, fontWeight: 700, color: 'var(--faint)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 5 }}>Evidence Context</div>
                                  <div style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 11.5, color: 'var(--faint)', lineHeight: 1.6 }}>{selGap.excerptContext}</div>
                                </div>
                              </div>
                            );
                          })() : (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--faint)', fontFamily: 'Plus Jakarta Sans', fontSize: 12 }}>
                              Select an issue from the sidebar
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })()}

            </div>); /* end rightPanel */

            return <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>{rightPanel}</div>;
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
                    <div style={S('font:700 9.5px/1 Plus Jakarta Sans;letter-spacing:0.16em;color:var(--ok);margin-bottom:10px')}>SCIENTIFIC REVIEW HUB</div>
                    <h1 style={S('font:800 28px/1 Plus Jakarta Sans;letter-spacing:-0.03em;margin:0 0 8px')}>Welcome, Dr. Arjun Mehta</h1>
                    <div style={S('font:400 13.5px/1 Plus Jakarta Sans;color:var(--dim)')}>Scientific Adviser · September 2026</div>
                  </div>
                  <div style={S('display:flex;align-items:center;gap:10px')}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--ok)', animation: 'puls 1.4s infinite' }} />
                    <span style={S('font:600 10px/1 Plus Jakarta Sans;letter-spacing:0.1em;color:var(--ok)')}>1 DECK AWAITING REVIEW</span>
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
                      <div style={{ font: '700 9px/1 Plus Jakarta Sans', letterSpacing: '0.14em', color: s.color, marginBottom: 12 }}>{s.label}</div>
                      <div style={{ font: '800 36px/1 Plus Jakarta Sans', letterSpacing: '-0.03em', marginBottom: 6 }}>{s.value}</div>
                      <div style={S('font:400 11.5px/1 Plus Jakarta Sans;color:var(--faint)')}>{s.delta}</div>
                    </div>
                  ))}
                </div>

                {/* Pending deck card */}
                <div style={S('font:700 11px/1 Plus Jakarta Sans;letter-spacing:0.1em;color:var(--faint);margin-bottom:14px')}>PENDING YOUR REVIEW</div>
                <div style={S('border:1px solid var(--rule2);border-left:3px solid var(--ok);background:var(--s1);animation:cardIn 0.4s ease both;animation-delay:0.1s')}>
                  {/* Deck header */}
                  <div style={S('padding:18px 24px;border-bottom:1px solid var(--rule);display:flex;align-items:flex-start;gap:16px')}>
                    <div style={{ flexShrink: 0, width: 44, height: 44, background: 'var(--ok)', display: 'grid', placeItems: 'center', font: '700 16px/1 Plus Jakarta Sans', color: '#fff' }}>D</div>
                    <div style={S('flex:1;min-width:0')}>
                      <div style={S('font:800 16px/1.3 Plus Jakarta Sans;letter-spacing:-0.01em;margin-bottom:5px')}>{deck.topic}</div>
                      <div style={S('font:500 12px/1 Plus Jakarta Sans;color:var(--faint)')}>{deck.product}</div>
                    </div>
                    <div style={S('text-align:right;flex:none')}>
                      <div style={S('display:flex;align-items:center;gap:6px;justify-content:flex-end;margin-bottom:6px')}>
                        <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--warn)', animation: 'puls 1.2s infinite' }} />
                        <span style={S('font:700 10px/1 Plus Jakarta Sans;letter-spacing:0.1em;color:var(--warn)')}>AWAITING REVIEW</span>
                      </div>
                      <div style={S('font:500 10.5px/1 Plus Jakarta Sans;color:var(--faint)')}>{deck.submittedAt}</div>
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
                        <div style={S('font:600 9px/1 Plus Jakarta Sans;letter-spacing:0.12em;color:var(--faint);margin-bottom:5px')}>{m.label}</div>
                        <div style={{ font: '600 12.5px/1 Plus Jakarta Sans', color: m.color || 'var(--ink)' }}>{m.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Artifact pills */}
                  <div style={S('padding:12px 24px;border-bottom:1px solid var(--rule);display:flex;align-items:center;gap:8px;flex-wrap:wrap')}>
                    <span style={S('font:600 9px/1 Plus Jakarta Sans;letter-spacing:0.12em;color:var(--faint);margin-right:4px')}>ARTIFACTS</span>
                    {[
                      { name: 'HCP Deck', q: 89, color: '#7eb8f7' },
                      { name: 'Blog', q: 100, color: '#fb923c' },
                      { name: 'Protocol', q: 74, color: '#4ade80' },
                      { name: 'Blurb ×5', q: 33, color: '#f97b7b' },
                      { name: 'Fact Sheet', q: 100, color: '#a78bfa' },
                    ].map((a) => (
                      <div key={a.name} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '4px 10px', border: `1px solid ${a.color}44`, background: `${a.color}0d` }}>
                        <div style={{ width: 5, height: 5, borderRadius: '50%', background: a.q >= 80 ? 'var(--ok)' : a.q >= 50 ? 'var(--warn)' : 'var(--acc)' }} />
                        <span style={{ font: '600 11px/1 Plus Jakarta Sans', color: a.color }}>{a.name}</span>
                        <span style={S('font:500 10px/1 var(--mono);color:var(--faint)')}>{a.q}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div style={S('padding:16px 24px;display:flex;align-items:center;gap:10px;border-top:1px solid var(--rule)')}>
                    <Box
                      css="display:inline-flex;align-items:center;gap:5px;padding:6px 10px;font:600 11px/1 Plus Jakarta Sans;color:var(--faint);cursor:pointer;border:1px solid var(--rule2);border-radius:6px;flex:none"
                      hover="color:var(--ink);border-color:var(--ink)"
                      onClick={v.goBack}
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M8 2L3 6l5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      Back to Organize
                    </Box>
                    <div style={S('flex:1;font:400 12px/1.5 Plus Jakarta Sans;color:var(--faint)')}>All excerpts are approved by default. You only need to act on what you reject.</div>
                    <Box css="padding:12px 28px;background:var(--ok);color:#fff;font:700 13px/1 Plus Jakarta Sans;cursor:pointer;white-space:nowrap" hover="opacity:0.85" onClick={() => this.go('sci-review')}>
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
                <div style={{ width: selPaper ? 400 : '100%', flexShrink: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden', transition: 'width 0.32s cubic-bezier(0.22,1,0.36,1)', borderRight: selPaper ? '1px solid rgba(26,45,107,0.12)' : 'none', background: 'var(--s1)' }}>

                  {/* Back — top */}
                  <div style={{ padding: '10px 22px', borderBottom: '1px solid rgba(26,45,107,0.12)', flexShrink: 0, background: '#fff' }}>
                    <Box
                      css="display:inline-flex;align-items:center;gap:5px;padding:6px 10px;font:600 11px/1 Plus Jakarta Sans;color:var(--faint);cursor:pointer;border:1px solid var(--rule2);border-radius:6px"
                      hover="color:var(--ink);border-color:var(--ink)"
                      onClick={v.goBack}
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M8 2L3 6l5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      Back to Inbox
                    </Box>
                  </div>

                  {/* Header */}
                  <div style={{ padding: '18px 22px', borderBottom: '1px solid rgba(26,45,107,0.12)', flexShrink: 0, background: '#fff' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                      <div style={{ flex: 1 }}>
                        <h2 style={{ font: '800 20px/1 Plus Jakarta Sans', letterSpacing: '-0.025em', color: '#1a2d6b', margin: '0 0 6px' }}>Scientific Review</h2>
                        <div style={{ font: '500 13px/1 Plus Jakarta Sans', color: '#2d4a8a' }}>
                          {accepted.length} papers under review &middot;&nbsp;
                          {rejectedCount > 0
                            ? <span style={{ color: '#2c52cc', fontWeight: 700 }}>{rejectedCount} rejected</span>
                            : <span style={{ color: '#166534', fontWeight: 700 }}>none rejected</span>}
                        </div>
                      </div>
                    </div>
                    {/* Artifact readiness pills */}
                    <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
                      {artifactStatus.map(a => (
                        <div key={a.name} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 11px', border: `1px solid ${a.ok ? 'rgba(22,101,52,0.4)' : 'rgba(44,82,204,0.4)'}`, background: a.ok ? 'rgba(22,101,52,0.08)' : 'rgba(44,82,204,0.06)', borderRadius: 99 }}>
                          <div style={{ width: 15, height: 15, borderRadius: '50%', background: a.ok ? '#166534' : '#2c52cc', display: 'grid', placeItems: 'center', fontSize: 9, color: '#fff', fontWeight: 800 }}>{a.ok ? '✓' : '!'}</div>
                          <span style={{ font: '600 12.5px/1 Plus Jakarta Sans', color: '#1a2d6b' }}>{a.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Scrollable paper list */}
                  <div style={{ flex: 1, overflowY: 'auto', padding: '20px 22px' }}>
                    <div style={{ font: '700 11px/1 Plus Jakarta Sans', letterSpacing: '0.1em', color: '#2d4a8a', marginBottom: 16, textTransform: 'uppercase' }}>Papers — click to open full view</div>
                    {trackGroups.map((tc) => (
                      <div key={tc.id} style={{ marginBottom: 24 }}>
                        <div style={{ font: '800 12px/1 Plus Jakarta Sans', letterSpacing: '0.08em', color: tc.color, marginBottom: 10, paddingBottom: 8, borderBottom: `2px solid ${tc.color}40`, textTransform: 'uppercase' }}>{tc.label}</div>
                        {tc.papers.map((paper) => {
                          const key = `${paper._idx}-0`;
                          const cmt = comments[key] || {};
                          const isRejected = cmt.rejected;
                          const isSel = selPaper && selPaper._idx === paper._idx;
                          const inlineCount = Object.entries(v.sciInlineComments).filter(([k]) => k.startsWith(`${paper._idx}-`)).flatMap(([, c]) => c).filter(c => !c.resolved).length;
                          return (
                            <div key={paper._idx} style={{ border: `1px solid ${isSel ? tc.color + '66' : 'rgba(26,45,107,0.12)'}`, borderLeft: `4px solid ${isRejected ? '#2c52cc' : isSel ? tc.color : tc.color}`, background: isSel ? `${tc.color}0d` : '#fff', marginBottom: 10, borderRadius: '0 6px 6px 0', transition: 'all 0.15s', boxShadow: isSel ? `0 2px 12px ${tc.color}18` : 'none' }}>
                              {/* Clickable title row */}
                              <div style={{ padding: '14px 16px', cursor: 'pointer', display: 'flex', alignItems: 'flex-start', gap: 10 }}
                                onClick={() => v.setSciSelectedPaper(isSel ? null : paper)}>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                  <div style={{ font: '700 15px/1.45 Plus Jakarta Sans', color: '#1a2d6b', marginBottom: 5 }}>{paper.title}</div>
                                  <div style={{ font: '500 12.5px/1 Plus Jakarta Sans', color: '#2d4a8a' }}>{paper.journal} &middot; {paper.year}{paper.n ? ` · n=${paper.n.toLocaleString()}` : ''}</div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 5, flexShrink: 0 }}>
                                  {inlineCount > 0 && <span style={{ padding: '3px 8px', background: 'rgba(146,64,14,0.09)', border: '1px solid rgba(146,64,14,0.35)', font: '700 10.5px/1.5 Plus Jakarta Sans', color: '#92400e', borderRadius: 4 }}>{inlineCount} comment{inlineCount > 1 ? 's' : ''}</span>}
                                  {isRejected && <span style={{ padding: '3px 8px', background: 'rgba(44,82,204,0.08)', border: '1px solid rgba(44,82,204,0.35)', font: '700 10.5px/1.5 Plus Jakarta Sans', color: '#2c52cc', borderRadius: 4 }}>REJECTED</span>}
                                  <span style={{ font: '600 12px/1 Plus Jakarta Sans', color: isSel ? tc.color : '#2d4a8a' }}>{isSel ? '← close' : 'open →'}</span>
                                </div>
                              </div>
                              {/* Excerpt */}
                              {paper.excerpt && (
                                <div style={{ padding: '0 16px 12px', borderTop: '1px solid rgba(26,45,107,0.08)' }}>
                                  <div style={{ paddingTop: 9, font: '400 13px/1.65 Plus Jakarta Sans', color: '#2d4a8a', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>"{paper.excerpt}"</div>
                                </div>
                              )}
                              {/* Reject / comment row */}
                              <div style={{ padding: '8px 16px 12px', display: 'flex', gap: 8, alignItems: 'center', borderTop: '1px solid rgba(26,45,107,0.08)' }}>
                                <input
                                  placeholder={isRejected ? 'Rejection reason (required)…' : 'Optional comment…'}
                                  value={cmt.text || ''}
                                  onChange={(e) => v.setSciComment(key, e.target.value)}
                                  onClick={(e) => e.stopPropagation()}
                                  style={{ flex: 1, background: '#f4f7fb', border: `1px solid ${isRejected ? 'rgba(44,82,204,0.4)' : 'rgba(26,45,107,0.14)'}`, color: '#1a2d6b', padding: '7px 11px', font: '400 13px/1 Plus Jakarta Sans', outline: 'none', borderRadius: 4 }}
                                />
                                <Box
                                  css={`padding:7px 13px;font:700 12px/1 Plus Jakarta Sans;cursor:pointer;border:1px solid rgba(44,82,204,0.45);color:${isRejected ? '#fff' : '#2c52cc'};background:${isRejected ? '#2c52cc' : 'transparent'};white-space:nowrap;border-radius:4px`}
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
                    <div style={{ marginTop: 16, paddingTop: 18, borderTop: '2px solid rgba(26,45,107,0.1)', display: 'flex', flexDirection: 'column', gap: 9 }}>
                      <div style={{ display: 'flex', gap: 9 }}>
                        <Box css="flex:1;padding:13px 0;text-align:center;font:600 13px/1 Plus Jakarta Sans;border:1px solid var(--rule2);color:var(--dim);cursor:pointer" hover="background:var(--s2);color:var(--ink)">&#x2193; Download report</Box>
                        <Box css="flex:2;padding:13px 0;text-align:center;font:700 13.5px/1 Plus Jakarta Sans;background:var(--ok);color:#fff;cursor:pointer" hover="opacity:0.87" onClick={v.sciApproveAll}>
                          {rejectedCount > 0 ? `Send back · ${rejectedCount} rejection${rejectedCount > 1 ? 's' : ''} →` : 'Approve & finalise →'}
                        </Box>
                      </div>
                      <Box
                        css="display:inline-flex;align-items:center;gap:5px;padding:6px 10px;font:600 11px/1 Plus Jakarta Sans;color:var(--faint);cursor:pointer;border:1px solid var(--rule2);border-radius:6px;align-self:flex-start"
                        hover="color:var(--ink);border-color:var(--ink)"
                        onClick={v.goBack}
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M8 2L3 6l5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        Back to Inbox
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

          {/* ===== CITATIONS PANEL ===== */}
          {v.pipeCitationsOpen && (() => {
            const cp = v.pipeCitationsOpen;
            const currentDepth = v.citeEvalStack.length;
            const sortedCites = [...MOCK_CITE_PAPERS].sort((a, b) => {
              if (v.pipeCitationSort === 'year-desc') return b.year - a.year;
              if (v.pipeCitationSort === 'year-asc') return a.year - b.year;
              if (v.pipeCitationSort === 'title') return a.title.localeCompare(b.title);
              return 0;
            });
            const relevanceColors = ['#4ade80','#4ade80','#fbbf24','#fb923c','#f87171','#f87171'];
            return (
              <div
                style={{ position: 'fixed', inset: 0, background: 'rgba(5,12,30,0.72)', zIndex: 325, display: "flex", alignItems: "center", justifyContent: "center", padding: "32px 24px", backdropFilter: 'blur(6px)' }}
                onClick={(e) => { if (e.target === e.currentTarget) v.setPipeCitationsOpen(null); }}
              >
                <div style={{ background: 'var(--s1)', width: '100%', maxWidth: 680, maxHeight: '88vh', display: 'flex', flexDirection: 'column', borderRadius: 16, boxShadow: '0 20px 60px rgba(15,31,74,0.18), 0 0 0 1px var(--rule)', overflow: 'hidden', animation: 'fadeUp 0.22s cubic-bezier(0.22,1,0.36,1)' }}>

                  {/* Header */}
                  <div style={{ padding: '22px 26px 18px', borderBottom: '1px solid var(--rule)', flexShrink: 0, background: 'var(--bg)' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 14 }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                          <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--acc)', flexShrink: 0 }} />
                          <span style={{ font: '600 9px/1 Plus Jakarta Sans', letterSpacing: '0.16em', color: 'var(--faint)', textTransform: 'uppercase' }}>Papers citing this source</span>
                        </div>
                        <div style={{ font: '700 15px/1.4 Plus Jakarta Sans', color: 'var(--ink)', letterSpacing: '-0.015em' }}>{cp.title}</div>
                        {cp.journal && <div style={{ font: '400 11.5px/1 Plus Jakarta Sans', color: 'var(--faint)', marginTop: 4 }}>{cp.journal}{cp.year ? ` · ${cp.year}` : ''}</div>}
                      </div>
                      <button onClick={() => v.setPipeCitationsOpen(null)} style={{ flexShrink: 0, background: 'var(--s2)', border: '1px solid var(--rule2)', borderRadius: 8, width: 32, height: 32, cursor: 'pointer', color: 'var(--faint)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="12" height="12" fill="none" viewBox="0 0 12 12"><path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
                      </button>
                    </div>
                    {/* Controls row */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ font: '500 10.5px/1 Plus Jakarta Sans', color: 'var(--faint)' }}>{sortedCites.length} papers found</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ font: '500 10.5px/1 Plus Jakarta Sans', color: 'var(--faint)' }}>Sort</span>
                        <div style={{ position: 'relative' }}>
                          <select value={v.pipeCitationSort} onChange={(e) => v.setPipeCitationSort(e.target.value)} style={{ appearance: 'none', background: 'var(--s1)', border: '1px solid var(--rule2)', borderRadius: 7, padding: '5px 26px 5px 10px', font: '600 10.5px/1 Plus Jakarta Sans', color: 'var(--ink)', cursor: 'pointer', outline: 'none' }}>
                            <option value="year-desc">Newest first</option>
                            <option value="year-asc">Oldest first</option>
                            <option value="title">Title A–Z</option>
                          </select>
                          <svg style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} width="9" height="9" viewBox="0 0 10 10" fill="none"><path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Paper list */}
                  <div style={{ flex: 1, overflowY: 'auto', padding: '10px 14px' }}>
                    {sortedCites.map((cite, ci) => {
                      const variant = CITE_EVAL_VARIANTS[ci % CITE_EVAL_VARIANTS.length];
                      const relScore = variant.relevance;
                      const relColor = relScore >= 85 ? 'var(--ok)' : relScore >= 70 ? 'var(--warn)' : '#dc2626';
                      return (
                        <div key={ci} style={{ display: 'flex', gap: 14, padding: '16px 14px', borderRadius: 10, marginBottom: 6, background: 'var(--bg)', border: '1px solid var(--rule)', transition: 'background 0.15s' }}
                          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--s2)'}
                          onMouseLeave={(e) => e.currentTarget.style.background = 'var(--bg)'}
                        >
                          {/* Year pill */}
                          <div style={{ flexShrink: 0, width: 42, height: 42, borderRadius: 10, background: 'var(--s2)', border: '1px solid var(--rule2)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ font: '700 12px/1 Plus Jakarta Sans', color: 'var(--acc)' }}>{String(cite.year).slice(2)}</span>
                            <span style={{ font: '500 8px/1 Plus Jakarta Sans', color: 'var(--faint)', marginTop: 1 }}>{String(cite.year).slice(0,2)}</span>
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ font: '600 13px/1.5 Plus Jakarta Sans', color: 'var(--ink)', marginBottom: 5, letterSpacing: '-0.005em' }}>{cite.title}</div>
                            <div style={{ font: '400 11px/1 Plus Jakarta Sans', color: 'var(--faint)', marginBottom: 10 }}>{cite.journal}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                <div style={{ width: 56, height: 4, borderRadius: 2, background: 'var(--rule)', overflow: 'hidden' }}>
                                  <div style={{ height: '100%', width: `${relScore}%`, background: relColor, borderRadius: 2 }} />
                                </div>
                                <span style={{ font: '700 10px/1 Plus Jakarta Sans', color: relColor }}>{relScore}</span>
                              </div>
                              {variant.artifacts.slice(0,2).map(a => (
                                <span key={a} style={{ font: '600 9px/1 Plus Jakarta Sans', color: 'var(--dim)', background: 'var(--s2)', border: '1px solid var(--rule2)', borderRadius: 4, padding: '2px 6px' }}>{a}</span>
                              ))}
                            </div>
                          </div>
                          <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                            <Box
                              css="padding:8px 18px;font:700 11px/1 Plus Jakarta Sans;cursor:pointer;color:#fff;border-radius:8px;background:linear-gradient(135deg,#2c52cc,#4468e0);border:none;white-space:nowrap;display:flex;align-items:center;gap:5px"
                              hover="opacity:0.88"
                              onClick={() => v.evaluateCitation(cite, ci)}
                            >
                              Evaluate
                              <svg width="10" height="10" fill="none" viewBox="0 0 12 12"><path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </Box>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Footer */}
                  <div style={{ padding: '14px 26px', borderTop: '1px solid var(--rule)', background: 'var(--bg)', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                    {currentDepth > 0 && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        {[1,2,3].map(d => (
                          <div key={d} style={{ width: 7, height: 7, borderRadius: '50%', background: d <= currentDepth ? 'var(--acc)' : 'var(--rule2)', border: d === currentDepth ? '2px solid rgba(44,82,204,0.3)' : 'none', transition: 'all 0.2s' }} />
                        ))}
                        <span style={{ font: '500 10px/1 Plus Jakarta Sans', color: 'var(--faint)', marginLeft: 4 }}>Depth {currentDepth} of 3</span>
                      </div>
                    )}
                    <span style={{ font: '500 10.5px/1 Plus Jakarta Sans', color: 'var(--faint)', marginLeft: 'auto' }}>Click Evaluate to open citation analysis</span>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* ===== CITE EVAL WORKSPACE ===== */}
          {v.citeEvalPaper && (() => {
            const ce = v.citeEvalPaper;
            const variant = CITE_EVAL_VARIANTS[ce.ci % CITE_EVAL_VARIANTS.length];
            const key = `${ce.title}-${ce.depth}`;
            const added = v.citeEvalAdded[key];
            const ART_COLORS_CE = { Deck: '#2563eb', Blog: '#d97706', Protocol: '#7c3aed', Blurb: '#dc2626', Facts: 'var(--dim)' };
            const gradeColor = variant.grade.includes('High') ? '#22c55e' : variant.grade.includes('Moderate') ? '#f59e0b' : '#ef4444';
            const relScore = variant.relevance;
            const relColor = relScore >= 85 ? '#22c55e' : relScore >= 70 ? '#f59e0b' : '#ef4444';
            const canCite = ce.depth < 3;
            const mockViewPaper = { ...ce, type: 'Guideline', score: relScore, relevance: relScore, grade: variant.grade, citations: variant.citations, funding: 'Not disclosed on source page', statRigor: 'Not formally assessed (auto-evaluated)', appraisal: 'Auto-evaluated', designTier: variant.designTier, artifacts: variant.artifacts, track: variant.tracks[0] || '', excerpt: variant.excerpt, excerptSrc: `${ce.journal}, ${ce.year}`, _idx: -1 };
            return (
              <div
                style={{ position: 'fixed', inset: 0, background: 'rgba(5,12,30,0.8)', zIndex: 310, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '28px 20px', backdropFilter: 'blur(8px)' }}
                onClick={(e) => { if (e.target === e.currentTarget) v.setCiteEvalPaper(null); }}
              >
                <div style={{ width: '100%', maxWidth: 960, height: '92vh', display: 'flex', flexDirection: 'column', borderRadius: 18, boxShadow: '0 48px 120px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.07)', overflow: 'hidden', animation: 'fadeUp 0.24s cubic-bezier(0.22,1,0.36,1)' }}>

                  {/* Top bar — citation chain breadcrumb */}
                  <div style={{ background: 'var(--bg)', borderBottom: '1px solid var(--rule)', padding: '0 24px', display: 'flex', alignItems: 'center', gap: 0, flexShrink: 0, minHeight: 52, overflowX: 'auto' }}>
                    <span style={{ font: '600 9px/1 Plus Jakarta Sans', letterSpacing: '0.14em', color: 'var(--faint)', flexShrink: 0, marginRight: 14 }}>CITATION CHAIN</span>

                    {/* Breadcrumb — one node per stack item */}
                    {v.citeEvalStack.map((item, idx) => {
                      const isCurrent = idx === v.citeEvalStack.length - 1;
                      const shortTitle = item.title.split(/\s+/).slice(0, 5).join(' ') + (item.title.split(/\s+/).length > 5 ? '…' : '');
                      return (
                        <React.Fragment key={idx}>
                          {idx > 0 && (
                            <svg width="14" height="14" fill="none" viewBox="0 0 14 14" style={{ flexShrink: 0, margin: '0 2px' }}><path d="M4.5 3l5 4-5 4" stroke="var(--rule2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          )}
                          <button
                            onClick={() => !isCurrent && v.goToCiteDepth(idx + 1)}
                            style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '6px 10px', borderRadius: 8, background: isCurrent ? 'rgba(44,82,204,0.08)' : 'transparent', border: isCurrent ? '1px solid rgba(44,82,204,0.25)' : '1px solid transparent', cursor: isCurrent ? 'default' : 'pointer', flexShrink: 0, transition: 'all 0.15s' }}
                            onMouseEnter={(e) => { if (!isCurrent) e.currentTarget.style.background = 'var(--s2)'; }}
                            onMouseLeave={(e) => { if (!isCurrent) e.currentTarget.style.background = 'transparent'; }}
                          >
                            <div style={{ width: 18, height: 18, borderRadius: '50%', background: isCurrent ? 'var(--acc)' : 'var(--s2)', border: isCurrent ? 'none' : '1px solid var(--rule2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <span style={{ font: '700 8px/1 Plus Jakarta Sans', color: isCurrent ? '#fff' : 'var(--faint)' }}>{idx + 1}</span>
                            </div>
                            <span style={{ font: `${isCurrent ? '600' : '400'} 11px/1 Plus Jakarta Sans`, color: isCurrent ? 'var(--acc)' : 'var(--faint)', whiteSpace: 'nowrap', maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis' }}>{shortTitle}</span>
                          </button>
                        </React.Fragment>
                      );
                    })}

                    {/* Spacer + right controls */}
                    <div style={{ flex: 1 }} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0, paddingLeft: 16 }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--s2)', border: '1px solid var(--rule2)', borderRadius: 20, padding: '4px 12px' }}>
                        <span style={{ font: '600 9.5px/1 Plus Jakarta Sans', color: 'var(--acc)' }}>Depth {ce.depth} of 3</span>
                      </div>
                      <button onClick={() => v.setCiteEvalPaper(null)} style={{ background: 'var(--s2)', border: '1px solid var(--rule2)', borderRadius: 8, width: 32, height: 32, cursor: 'pointer', color: 'var(--faint)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <svg width="11" height="11" fill="none" viewBox="0 0 12 12"><path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
                      </button>
                    </div>
                  </div>

                  {/* Main content — horizontal split */}
                  <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

                    {/* LEFT — paper content */}
                    <div style={{ flex: '0 0 58%', display: 'flex', flexDirection: 'column', background: '#fff', overflowY: 'auto' }}>

                      {/* Paper hero */}
                      <div style={{ padding: '32px 36px 24px', borderBottom: '1px solid var(--rule)' }}>
                        <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
                          {variant.artifacts.map((a) => (
                            <span key={a} style={{ padding: '4px 12px', borderRadius: 20, background: `${ART_COLORS_CE[a]}15`, border: `1.5px solid ${ART_COLORS_CE[a]}40`, font: '700 10px/1 Plus Jakarta Sans', color: ART_COLORS_CE[a], letterSpacing: '0.04em' }}>{a}</span>
                          ))}
                          {variant.tracks.map((t) => (
                            <span key={t} style={{ padding: '4px 12px', borderRadius: 20, background: 'var(--s2)', border: '1px solid var(--rule2)', font: '500 10px/1 Plus Jakarta Sans', color: 'var(--faint)' }}>{t}</span>
                          ))}
                        </div>
                        <h2 style={{ margin: '0 0 12px', font: '700 20px/1.35 Plus Jakarta Sans', color: 'var(--ink)', letterSpacing: '-0.02em' }}>{ce.title}</h2>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <span style={{ font: '400 12.5px/1 Plus Jakarta Sans', color: 'var(--faint)' }}>{ce.journal}</span>
                          <span style={{ color: 'var(--rule2)', fontSize: 12 }}>·</span>
                          <span style={{ font: '600 12.5px/1 Plus Jakarta Sans', color: 'var(--dim)' }}>{ce.year}</span>
                          <span style={{ color: 'var(--rule2)', fontSize: 12 }}>·</span>
                          <span style={{ font: '500 11px/1 Plus Jakarta Sans', color: 'var(--faint)' }}>{variant.citations}</span>
                        </div>
                      </div>

                      {/* Excerpt */}
                      <div style={{ padding: '28px 36px', borderBottom: '1px solid var(--rule)', flex: 1 }}>
                        <div style={{ font: '700 9px/1 Plus Jakarta Sans', letterSpacing: '0.14em', color: 'var(--faint)', marginBottom: 16 }}>KEY EXCERPT</div>
                        <div style={{ position: 'relative', paddingLeft: 20 }}>
                          <div style={{ position: 'absolute', left: 0, top: 4, bottom: 4, width: 3, background: 'linear-gradient(180deg,#2c52cc,#4468e0)', borderRadius: 2 }} />
                          <p style={{ margin: 0, font: 'italic 15px/1.85 Georgia, serif', color: 'var(--ink)', letterSpacing: '-0.005em' }}>{variant.excerpt}</p>
                        </div>
                        <div style={{ marginTop: 14, font: '500 10.5px/1 Plus Jakarta Sans', color: 'var(--faint)' }}>{ce.journal}, {ce.year}</div>
                      </div>

                      {/* Relevance bar */}
                      <div style={{ padding: '20px 36px', background: 'var(--bg)', borderTop: '1px solid var(--rule)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                          <span style={{ font: '600 10px/1 Plus Jakarta Sans', letterSpacing: '0.1em', color: 'var(--faint)', flexShrink: 0 }}>RELEVANCE SCORE</span>
                          <div style={{ flex: 1, height: 6, borderRadius: 3, background: 'var(--rule)', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${relScore}%`, background: `linear-gradient(90deg,${relColor}88,${relColor})`, borderRadius: 3, transition: 'width 0.6s cubic-bezier(0.22,1,0.36,1)' }} />
                          </div>
                          <span style={{ font: '800 16px/1 Plus Jakarta Sans', color: relColor, flexShrink: 0 }}>{relScore}<span style={{ font: '500 11px/1', color: 'var(--faint)' }}>/100</span></span>
                        </div>
                      </div>
                    </div>

                    {/* RIGHT — metadata + actions */}
                    <div style={{ flex: '0 0 42%', display: 'flex', flexDirection: 'column', background: 'var(--bg)', borderLeft: '1px solid var(--rule)', overflowY: 'auto' }}>

                      {/* Evidence quality */}
                      <div style={{ padding: '28px 28px 20px', borderBottom: '1px solid var(--rule)' }}>
                        <div style={{ font: '700 9px/1 Plus Jakarta Sans', letterSpacing: '0.16em', color: 'var(--faint)', marginBottom: 18 }}>EVIDENCE QUALITY</div>
                        {[
                          ['Design tier', variant.designTier, false],
                          ['GRADE certainty', variant.grade, true],
                          ['Appraisal', 'Not formally appraised', false],
                          ['Funding / COI', 'Not disclosed on source page', false],
                          ['Stat. rigor', 'Not formally assessed', false],
                        ].map(([label, val, isGrade]) => (
                          <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 14 }}>
                            <span style={{ font: '600 9px/1 Plus Jakarta Sans', letterSpacing: '0.1em', color: 'var(--faint)', textTransform: 'uppercase' }}>{label}</span>
                            <span style={{ font: isGrade ? '700 12.5px/1.4 Plus Jakarta Sans' : '500 12px/1.4 Plus Jakarta Sans', color: isGrade ? gradeColor : 'var(--dim)' }}>{val}</span>
                          </div>
                        ))}
                      </div>

                      {/* Citation context */}
                      <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--rule)' }}>
                        <div style={{ font: '700 9px/1 Plus Jakarta Sans', letterSpacing: '0.16em', color: 'var(--faint)', marginBottom: 14 }}>CITATION CONTEXT</div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                          <div style={{ background: 'var(--s1)', border: '1px solid var(--rule)', borderRadius: 10, padding: '12px 14px' }}>
                            <div style={{ font: '600 9px/1 Plus Jakarta Sans', color: 'var(--faint)', marginBottom: 6, letterSpacing: '0.08em' }}>CITATIONS</div>
                            <div style={{ font: '700 15px/1 Plus Jakarta Sans', color: 'var(--acc)' }}>{variant.citations.split(' ')[0]}</div>
                          </div>
                          <div style={{ background: 'var(--s1)', border: '1px solid var(--rule)', borderRadius: 10, padding: '12px 14px' }}>
                            <div style={{ font: '600 9px/1 Plus Jakarta Sans', color: 'var(--faint)', marginBottom: 6, letterSpacing: '0.08em' }}>JOURNAL</div>
                            <div style={{ font: '600 10.5px/1.4 Plus Jakarta Sans', color: 'var(--dim)' }}>{ce.journal.split(' ').slice(0,3).join(' ')}</div>
                          </div>
                        </div>
                      </div>

                      {/* Spacer pushes actions to bottom */}
                      <div style={{ flex: 1 }} />

                      {/* Action zone */}
                      <div style={{ padding: '24px 28px', borderTop: '1px solid var(--rule)', background: 'var(--s1)' }}>
                        <div style={{ font: '700 9px/1 Plus Jakarta Sans', letterSpacing: '0.14em', color: 'var(--faint)', marginBottom: 14 }}>ACTIONS</div>

                        {/* Navigate row */}
                        <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                          <Box
                            css="flex:1;padding:10px 0;font:600 11.5px/1 Plus Jakarta Sans;color:var(--acc);border:1px solid var(--rule2);border-radius:10px;cursor:pointer;background:var(--s2);display:flex;align-items:center;justify-content:center;gap:6px"
                            hover="background:rgba(44,82,204,0.1);border-color:var(--acc)"
                            onClick={() => v.setPipeViewPaper(mockViewPaper)}
                          >
                            <svg width="13" height="13" fill="none" viewBox="0 0 16 16"><rect x="2" y="1" width="9" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><path d="M11 4h2.5M11 7h2.5M11 10h2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><path d="M4.5 5h4M4.5 8h4M4.5 11h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                            View Paper
                          </Box>
                          {canCite && (
                            <Box
                              css="flex:1;padding:10px 0;font:600 11.5px/1 Plus Jakarta Sans;color:var(--dim);border:1px solid var(--rule2);border-radius:10px;cursor:pointer;background:var(--s2);display:flex;align-items:center;justify-content:center;gap:6px"
                              hover="background:var(--s2);border-color:var(--dim)"
                              onClick={() => v.setPipeCitationsOpen(ce)}
                            >
                              <svg width="13" height="13" fill="none" viewBox="0 0 16 16"><circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4"/><path d="M8 7v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="8" cy="4.5" r="0.9" fill="currentColor"/></svg>
                              Citations
                            </Box>
                          )}
                        </div>

                        {/* Add/Accept row */}
                        {added === 'accepted' ? (
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '13px 0', background: 'rgba(22,101,52,0.07)', border: '1.5px solid rgba(22,101,52,0.25)', borderRadius: 12, font: '700 12.5px/1 Plus Jakarta Sans', color: 'var(--ok)' }}>
                            <svg width="15" height="15" fill="none" viewBox="0 0 16 16"><circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4"/><path d="M5.5 8.5l2 2 3-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            Paper accepted to evidence list
                          </div>
                        ) : added === 'added' ? (
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '13px 0', background: 'rgba(44,82,204,0.07)', border: '1.5px solid rgba(44,82,204,0.2)', borderRadius: 12, font: '700 12.5px/1 Plus Jakarta Sans', color: 'var(--acc)' }}>
                            <svg width="15" height="15" fill="none" viewBox="0 0 16 16"><circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4"/><path d="M5.5 8.5l2 2 3-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            Added to evidence list
                          </div>
                        ) : (
                          <div style={{ display: 'flex', gap: 8 }}>
                            <Box
                              css="flex:1;padding:13px 0;font:700 12px/1 Plus Jakarta Sans;color:var(--acc);border:1.5px solid var(--rule2);border-radius:12px;cursor:pointer;background:var(--s2);display:flex;align-items:center;justify-content:center;gap:6px"
                              hover="background:rgba(44,82,204,0.1);border-color:var(--acc)"
                              onClick={() => v.addCiteToEvidence(key)}
                            >
                              <svg width="13" height="13" fill="none" viewBox="0 0 16 16"><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>
                              Add to evidence
                            </Box>
                            <Box
                              css="flex:1;padding:13px 0;font:700 12px/1 Plus Jakarta Sans;color:var(--ok);border:1.5px solid rgba(22,101,52,0.25);border-radius:12px;cursor:pointer;background:rgba(22,101,52,0.07);display:flex;align-items:center;justify-content:center;gap:6px"
                              hover="background:rgba(22,101,52,0.14);border-color:var(--ok)"
                              onClick={() => v.acceptCitePaper(key)}
                            >
                              <svg width="13" height="13" fill="none" viewBox="0 0 16 16"><path d="M3 8.5l3.5 3.5L13 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
                              Accept paper
                            </Box>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* ===== VIEW PAPER MODAL ===== */}
          {v.pipeViewPaper && (() => {
            const mp = v.pipeViewPaper;
            const tc = typeColor(mp.type);
            const accepted = v.acceptedPapers[mp._idx];
            const showCitations = mp._citationsTab;
            return (
              <div
                style={{ position: 'fixed', inset: 0, background: 'rgba(15,31,74,0.45)', zIndex: 330, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, backdropFilter: 'blur(2px)' }}
                onClick={(e) => { if (e.target === e.currentTarget) v.setPipeViewPaper(null); }}
              >
                <div style={{ background: '#fff', width: '100%', maxWidth: 720, maxHeight: '88vh', display: 'flex', flexDirection: 'column', borderRadius: 14, boxShadow: '0 24px 64px rgba(15,31,74,0.28)', overflow: 'hidden', animation: 'fadeUp 0.22s ease' }}>

                  {/* Modal header */}
                  <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--rule)', display: 'flex', alignItems: 'flex-start', gap: 14, flexShrink: 0 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                        <span style={{ padding: '3px 10px', font: '700 9px/1 Plus Jakarta Sans', letterSpacing: '0.1em', border: `1px solid ${tc}`, color: tc, borderRadius: 20 }}>{mp.type.toUpperCase()}</span>
                        <span style={{ padding: '3px 10px', font: '600 9px/1 Plus Jakarta Sans', background: 'var(--s2)', color: 'var(--faint)', borderRadius: 20 }}>{mp.db}</span>
                        <span style={{ font: '600 10px/1 var(--mono)', color: 'var(--faint)' }}>{mp.year}</span>
                      </div>
                      <div style={{ font: '800 17px/1.35 Plus Jakarta Sans', letterSpacing: '-0.02em', color: 'var(--ink)', marginBottom: 6 }}>{mp.title}</div>
                      <div style={{ font: '500 11.5px/1.5 Plus Jakarta Sans', color: 'var(--faint)' }}>{mp.journal}</div>
                    </div>
                    <button
                      onClick={() => v.setPipeViewPaper(null)}
                      style={{ flexShrink: 0, background: 'var(--s2)', border: 'none', borderRadius: 8, width: 30, height: 30, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--dim)', fontSize: 16, marginTop: 2 }}
                    >✕</button>
                  </div>

                  {/* Tabs */}
                  <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid var(--rule)', flexShrink: 0 }}>
                    {['Paper Details', 'Citations & Funding'].map((tab, ti) => {
                      const isActive = (ti === 1) === !!showCitations;
                      return (
                        <button
                          key={tab}
                          onClick={() => v.setPipeViewPaper(ti === 1 ? { ...mp, _citationsTab: true } : { ...mp, _citationsTab: false })}
                          style={{ padding: '11px 20px', font: `${isActive ? '700' : '500'} 12px/1 Plus Jakarta Sans`, color: isActive ? 'var(--acc)' : 'var(--faint)', background: 'none', border: 'none', borderBottom: isActive ? '2px solid var(--acc)' : '2px solid transparent', cursor: 'pointer', letterSpacing: '0.01em' }}
                        >{tab}</button>
                      );
                    })}
                  </div>

                  {/* Body */}
                  <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
                    {!showCitations ? (
                      <>
                        {/* Relevance bar */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, padding: '12px 16px', background: 'var(--s2)', borderRadius: 10 }}>
                          <span style={{ font: '700 9px/1 Plus Jakarta Sans', letterSpacing: '0.14em', color: 'var(--faint)', flexShrink: 0 }}>RELEVANCE SCORE</span>
                          <div style={{ flex: 1, height: 6, background: 'var(--rule)', borderRadius: 4, overflow: 'hidden' }}>
                            <div style={{ width: `${mp.relevance}%`, height: '100%', background: mp.relevance >= 80 ? 'var(--ok)' : mp.relevance >= 60 ? 'var(--warn)' : 'var(--acc)', borderRadius: 4 }} />
                          </div>
                          <span style={{ font: '800 14px/1 Plus Jakarta Sans', color: mp.relevance >= 80 ? 'var(--ok)' : mp.relevance >= 60 ? 'var(--warn)' : 'var(--acc)', flexShrink: 0 }}>{mp.relevance}/100</span>
                        </div>

                        {/* Metadata grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 20px', marginBottom: 20 }}>
                          {[
                            ['Design Tier', mp.designTier],
                            ['Appraisal Score', mp.appraisal],
                            ['GRADE Certainty', mp.grade],
                            ['Statistical Rigor', mp.statRigor],
                          ].map(([label, val]) => (
                            <div key={label} style={{ background: 'var(--s2)', borderRadius: 8, padding: '12px 14px' }}>
                              <div style={{ font: '600 9px/1 Plus Jakarta Sans', letterSpacing: '0.12em', color: 'var(--faint)', marginBottom: 6 }}>{label.toUpperCase()}</div>
                              <div style={{ font: '600 12.5px/1.4 Plus Jakarta Sans', color: 'var(--ink)' }}>{val}</div>
                            </div>
                          ))}
                        </div>

                        {/* Excerpt */}
                        <div style={{ borderLeft: `3px solid ${tc}`, paddingLeft: 16, marginBottom: 20 }}>
                          <div style={{ font: '700 9px/1 Plus Jakarta Sans', letterSpacing: '0.14em', color: 'var(--faint)', marginBottom: 10 }}>KEY EXCERPT</div>
                          <blockquote style={{ margin: 0, font: '400 13.5px/1.75 Georgia, serif', color: 'var(--dim)', fontStyle: 'italic' }}>{mp.excerpt}</blockquote>
                          <div style={{ font: '500 10.5px/1 Plus Jakarta Sans', color: 'var(--faint)', marginTop: 8 }}>{mp.excerptSrc}</div>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Citations section */}
                        <div style={{ marginBottom: 20, padding: '18px 20px', background: 'rgba(44,82,204,0.05)', border: '1px solid rgba(44,82,204,0.15)', borderRadius: 10 }}>
                          <div style={{ font: '700 9px/1 Plus Jakarta Sans', letterSpacing: '0.14em', color: 'var(--acc)', marginBottom: 10 }}>CITATION COUNT</div>
                          <div style={{ font: '800 28px/1 Plus Jakarta Sans', letterSpacing: '-0.03em', color: 'var(--ink)', marginBottom: 6 }}>{mp.citations.split('·')[0].trim()}</div>
                          {mp.citations.includes('·') && (
                            <div style={{ font: '500 12px/1 Plus Jakarta Sans', color: 'var(--faint)' }}>{mp.citations.split('·').slice(1).join('·').trim()} citation rate</div>
                          )}
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 20px', marginBottom: 20 }}>
                          {[
                            ['Funding & COI', mp.funding],
                            ['Appraisal Score', mp.appraisal],
                            ['GRADE Certainty', mp.grade],
                            ['Journal', mp.journal.split('·')[0].trim()],
                          ].map(([label, val]) => (
                            <div key={label} style={{ background: 'var(--s2)', borderRadius: 8, padding: '12px 14px' }}>
                              <div style={{ font: '600 9px/1 Plus Jakarta Sans', letterSpacing: '0.12em', color: 'var(--faint)', marginBottom: 6 }}>{label.toUpperCase()}</div>
                              <div style={{ font: '600 12.5px/1.4 Plus Jakarta Sans', color: 'var(--ink)' }}>{val}</div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Modal footer */}
                  <div style={{ padding: '14px 24px', borderTop: '1px solid var(--rule)', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                    <Box
                      css={`padding:9px 18px;font:700 11px/1 Plus Jakarta Sans;cursor:pointer;background:${accepted ? 'var(--ok)' : 'transparent'};color:${accepted ? '#fff' : 'var(--ok)'};border:1px solid var(--ok);border-radius:8px`}
                      hover={!accepted ? 'background:rgba(22,101,52,0.12)' : ''}
                      onClick={() => v.toggleAccept(mp._idx)}
                    >
                      {accepted ? '✓ Accepted' : 'Accept paper'}
                    </Box>
                    <Box
                      css="margin-left:auto;padding:9px 18px;font:600 11px/1 Plus Jakarta Sans;cursor:pointer;color:var(--dim);border:1px solid var(--rule2);border-radius:8px"
                      hover="background:var(--s2)"
                      onClick={() => v.setPipeViewPaper(null)}
                    >
                      Close
                    </Box>
                  </div>
                </div>
              </div>
            );
          })()}

        </main>
      </div>
    );
  }
}
