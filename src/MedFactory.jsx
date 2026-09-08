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
    opener: (topic, hero) =>
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
    opener: (topic, hero) =>
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
    opener: (topic, hero) =>
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

const LIGHT_TOKENS = {
  '--bg': '#f3f2f2', '--s1': '#eae9e9', '--s2': '#dedcdc', '--ink': '#201e1d',
  '--dim': '#605d5d', '--faint': '#9b9797', '--rule': 'rgba(32,30,29,.16)',
  '--rule2': 'rgba(32,30,29,.42)', '--acc': '#dd2b0f', '--ok': '#2f7a55', '--warn': '#8a6412',
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
      heroProduct: '',
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
    document.body.style.background = light ? '#f3f2f2' : '#141312';
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
    } else if (['landing', 'ma-dash', 'ma-review', 'sci-dash', 'sci-review'].includes(s)) {
      this.setState({ screen: s, openPin: null, pendingPin: null });
    } else {
      this.setState({ screen: s });
    }
    if (s === 'pipe') this.runPipe();
    if (s === 'render') this.runRender();
  };

  /* ---------- role & approval methods ---------- */

  enterRole = (role) => {
    const screen = role === 'creator' ? 'dash' : role === 'ma' ? 'ma-dash' : 'sci-dash';
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
    const { projectInput, projectThreads, activeThreadId, topic, heroProduct } = this.state;
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

  curBlocks() {
    const n = this.state.slides[this.state.slideIdx].n;
    return this.state.blocks || BLOCKS[n] || BLOCKS.DEFAULT;
  }

  pickSlide = (i) => this.setState({ slideIdx: i, blocks: null, sel: 0, editDraft: '' });

  pill(status) {
    const map = {
      'Awaiting Review': ['var(--acc)', 'rgba(255,86,60,.12)'],
      Done: ['var(--ok)', 'rgba(79,168,124,.12)'],
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
      ['Dashboard', 'dash'], ['New Deck Intake', 'intake'], ['Brand Intelligence', 'intel'], ['Topic Selection', 'topics'],
      ['Project Brief Chat', 'chat'], ['Pipeline Status', 'pipe'],
      ['Validation Report', 'valid'], ['Review Workspace', 'review'], ['Revision Diff', 'diff'],
      ['Rendering', 'render'], ['Delivery', 'deliver'],
    ];

    const pipeStages = STAGE_NAMES.map((name, i) => {
      const done = i < st.stage - 1;
      const active = i === st.stage - 1;
      return {
        i: String(i + 1).padStart(2, '0'), name, note: STAGE_NOTES[i],
        glyph: done ? '✓' : active ? '◐' : '',
        icon: `width:20px;height:20px;flex:none;display:grid;place-items:center;font-size:11px;border:1px solid ${done ? 'var(--ok)' : active ? 'var(--acc)' : 'var(--rule)'};color:${done ? 'var(--ok)' : active ? 'var(--acc)' : 'var(--faint)'};background:${active ? 'rgba(255,86,60,.1)' : 'transparent'};${active ? 'animation:puls 1.4s infinite' : ''}`,
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
      style: `padding:16px 18px;margin-bottom:12px;cursor:pointer;background:${b.flag ? 'rgba(207,154,43,.07)' : 'var(--s1)'};border:1px solid ${i === sel ? 'var(--acc)' : b.flag ? 'rgba(207,154,43,.4)' : 'var(--rule)'}`,
    }));

    const diff = st.diff;
    const seg = (arr) => arr.map((p) => ({
      text: p[1],
      style: p[0] === 'del'
        ? 'background:rgba(255,86,60,.16);color:var(--acc);text-decoration:line-through'
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
      isDash: S_ === 'dash', isIntake: S_ === 'intake', isIntel: S_ === 'intel', isTopics: S_ === 'topics', isChat: S_ === 'chat',
      isPipe: S_ === 'pipe', isValid: S_ === 'valid',
      isReview: S_ === 'review', isDiff: S_ === 'diff' && !!diff, isRender: S_ === 'render', isDeliver: S_ === 'deliver',
      isLanding: !st.role, isMaDash: S_ === 'ma-dash', isMAReview: S_ === 'ma-review',
      isSciDash: S_ === 'sci-dash', isSciReview: S_ === 'sci-review',
      role: st.role, pptStatus: st.pptStatus,
      isCreator: st.role === 'creator', isMA: st.role === 'ma', isSci: st.role === 'sci',
      dirLabel: this.dirOf() === 'light' ? 'LIGHT' : 'DARK',
      toggleDir: () => this.setState({ dir: this.dirOf() === 'light' ? 'dark' : 'light' }),
      goIntake: () => this.go('intake'),
      goReview: () => {
        const rejected = ['ma-rejected','sci-rejected'].includes(this.state.pptStatus);
        this.setState({ screen: 'review', tab: rejected ? 'comments' : 'edit' });
      },
      goDeliver: () => this.go('deliver'),

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
      startGen: () => this.go('intel'),

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
      goMADash: () => this.go('ma-dash'),
      goMAReview: () => this.go('ma-review'),
      goSciDash: () => this.go('sci-dash'),
      goSciReview: () => this.go('sci-review'),
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
    const reviewerSidebarItems = v.isMA
      ? [['Dashboard', 'ma-dash'], ['My Reviews', 'ma-dash'], ['Settings', 'dash']]
      : [['Dashboard', 'sci-dash'], ['My Reviews', 'sci-dash'], ['Settings', 'dash']];
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
          {/* left panel — branding */}
          <div style={S('width:420px;flex:none;border-right:2px solid var(--rule2);display:flex;flex-direction:column;padding:52px 48px;background:var(--s1)')}>
            <div style={S('display:flex;align-items:center;gap:10px;margin-bottom:auto')}>
              <div style={S('width:16px;height:16px;background:var(--acc)')} />
              <div style={S('font-weight:800;font-size:17px;letter-spacing:-0.02em')}>MedFactory</div>
            </div>
            <div>
              <div style={merge(kicker, 'margin-bottom:18px')}>MEDICAL AFFAIRS · CONTENT PIPELINE</div>
              <h1 style={S('font-size:36px;font-weight:800;letter-spacing:-0.04em;line-height:1.1;margin:0 0 20px')}>Science-validated<br />content, faster.</h1>
              <div style={S('color:var(--dim);font-size:13.5px;line-height:1.7;margin-bottom:44px')}>
                Three roles. One pipeline. From brand brief to MA-approved webinar deck — with full audit trail.
              </div>
              <div style={S('display:flex;flex-direction:column;gap:12px')}>
                {[
                  { accent: 'var(--acc)',  label: 'Content Creator',           sub: 'Briefing · Topic selection · Submission' },
                  { accent: 'var(--warn)', label: 'Medical Affairs Reviewer',  sub: 'Scientific review · Comment pins · Approval' },
                  { accent: 'var(--ok)',   label: 'Scientific Reviewer',       sub: 'Final validation · Publication gate' },
                ].map((r, i) => (
                  <div key={i} style={S('display:flex;align-items:center;gap:12px')}>
                    <div style={S(`width:3px;height:32px;flex:none;background:${r.accent}`)} />
                    <div>
                      <div style={S('font-weight:700;font-size:13px')}>{r.label}</div>
                      <div style={S('color:var(--faint);font-size:11.5px')}>{r.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={S('margin-top:auto;padding-top:32px;border-top:1px solid var(--rule)')}>
              <div style={S('font:600 9.5px/1 Archivo;letter-spacing:0.14em;color:var(--faint);margin-bottom:10px')}>DEMO CREDENTIALS</div>
              {creds.map((c) => (
                <div
                  key={c.role}
                  style={S('display:flex;justify-content:space-between;align-items:baseline;padding:6px 0;border-bottom:1px solid var(--rule);cursor:pointer')}
                  onClick={() => this.setState({ loginEmail: c.email, loginPassword: c.password, loginError: '' })}
                >
                  <div style={S('font-size:12px;color:var(--dim)')}>{c.email}</div>
                  <div style={S('font-size:11px;color:var(--faint);font-family:var(--mono)')}>{c.password}</div>
                </div>
              ))}
              <div style={S('color:var(--faint);font-size:11px;margin-top:8px')}>Click a row to auto-fill.</div>
            </div>
          </div>

          {/* right panel — login form */}
          <div style={S('flex:1;display:flex;align-items:center;justify-content:center;padding:40px')}>
            <div style={S('width:100%;max-width:380px')}>
              <div style={merge(kicker, 'margin-bottom:10px')}>SIGN IN</div>
              <h2 style={S('font-size:26px;font-weight:800;letter-spacing:-0.03em;margin:0 0 32px')}>Welcome back</h2>

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
                  <div style={S('padding:11px 14px;background:#2b0d0d;border-left:3px solid var(--acc);color:var(--acc);font-size:13px')}>
                    {loginError}
                  </div>
                )}

                <Box
                  css="background:var(--acc);color:#fff;font-weight:700;padding:15px;text-align:center;cursor:pointer;font-size:14px;margin-top:4px"
                  hover="background:#dd2b0f"
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
        <aside style={S('width:232px;flex:none;border-right:2px solid var(--rule2);display:flex;flex-direction:column;background:var(--bg)')}>
          <div style={S('padding:18px 20px 15px;border-bottom:2px solid var(--rule2);display:flex;align-items:center;gap:9px')}>
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
        <main style={S('flex:1;min-width:0;overflow-y:auto;position:relative')}>

          {/* ============ 1 · DASHBOARD ============ */}
          {v.isDash && (
            <div style={S('display:flex;min-height:100%')}>
              <div style={S('flex:1;min-width:0')}>
                {/* rejection alert for creator */}
                {(v.pptStatus === 'ma-rejected' || v.pptStatus === 'sci-rejected') && (
                  <div style={S(`padding:14px 28px;background:#1e1000;border-bottom:2px solid ${v.pptStatus === 'sci-rejected' ? 'var(--ok)' : 'var(--warn)'};display:flex;align-items:center;gap:16px`)}>
                    <div style={S(`font-size:20px`)}>⚠</div>
                    <div style={S('flex:1')}>
                      <div style={S(`font-weight:700;color:${v.pptStatus === 'sci-rejected' ? 'var(--ok)' : 'var(--warn)'}`)}>{v.topic} — sent back by {v.pptStatus === 'sci-rejected' ? 'Scientific Reviewer' : 'Medical Affairs'}</div>
                      <div style={S('color:var(--dim);font-size:12.5px;margin-top:2px')}>{v.maTotalComments + v.sciTotalComments} comment{(v.maTotalComments + v.sciTotalComments) !== 1 ? 's' : ''} need addressing before re-submission.</div>
                    </div>
                    <Box css={`background:${v.pptStatus === 'sci-rejected' ? 'var(--ok)' : 'var(--warn)'};color:${v.pptStatus === 'sci-rejected' ? '#fff' : '#000'};font-weight:700;padding:10px 18px;cursor:pointer;font-size:13px`} hover="opacity:0.85" onClick={v.goReview}>Open Review Workspace →</Box>
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
                    hover="background:#dd2b0f"
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

                <div style={S('display:grid;grid-template-columns:1fr 1fr;gap:0 28px;padding:24px 0;border-bottom:1px solid var(--rule)')}>
                  <div>
                    <label style={S(label)}>THERAPEUTIC AREA</label>
                    <select value={v.area} onChange={v.onArea} style={S(fieldCss)}>
                      {v.areas.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={S(label)}>TARGET AUDIENCE</label>
                    <div style={S('display:flex;gap:0;border:1px solid var(--rule);overflow:hidden')}>
                      {v.audiences.map((a) => (
                        <div key={a.label} style={S(a.style)} onClick={a.pick}>
                          {a.label}
                          {a.locked && <span style={S('display:block;font:600 8px/1 Archivo;letter-spacing:0.1em;color:var(--faint);margin-top:3px')}>SOON</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={S('padding:24px 0;border-bottom:1px solid var(--rule)')}>
                  <div style={S('display:flex;justify-content:space-between;align-items:baseline;margin-bottom:16px')}>
                    <label style={S('font:600 10px/1 Archivo;letter-spacing:0.13em;color:var(--dim)')}>PRESENTATION DURATION</label>
                    <span style={S('font:700 15px/1 var(--mono);color:var(--acc)')}>{v.dur} min</span>
                  </div>
                  <input type="range" min="30" max="60" step="15" value={v.dur} onChange={v.onDur} style={S('width:100%;accent-color:var(--acc);background:transparent')} />
                  <div style={S('display:flex;justify-content:space-between;color:var(--faint);font-size:11px;margin-top:6px')}>
                    <span>30</span><span>45</span><span>60</span>
                  </div>
                </div>

                <div style={S('display:grid;grid-template-columns:1fr 1fr;gap:0 28px;padding:24px 0;border-bottom:1px solid var(--rule)')}>
                  <div>
                    <label style={S(label)}>REGION · COMPLIANCE RULESET</label>
                    <select value={v.region} onChange={v.onRegion} style={S(fieldCss)}>
                      {v.regions.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={S(label)}>LANGUAGE</label>
                    <select value={v.lang} onChange={v.onLang} style={S(fieldCss)}>
                      {v.langs.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                </div>

                <div style={S('padding:24px 0;border-bottom:1px solid var(--rule);position:relative')}>
                  <div style={S('display:flex;align-items:center;gap:12px;margin-bottom:14px')}>
                    <label style={S('font:600 10px/1 Archivo;letter-spacing:0.13em;color:var(--dim)')}>BRAND TEMPLATE</label>
                    <span style={S('font:700 9px/1 Archivo;letter-spacing:0.14em;padding:3px 7px;background:var(--s2);border:1px solid var(--rule);color:var(--faint)')}>COMING SOON</span>
                  </div>
                  <div style={S('display:grid;grid-template-columns:repeat(3,1fr);gap:14px;opacity:0.38;pointer-events:none')}>
                    {v.templates.map((t, i) => (
                      <div key={i} style={S(t.style)}>
                        <div style={S(t.thumb)}>
                          <div style={S(t.thumbBar)} />
                          <div style={S('height:4px;width:64%;background:var(--faint);margin-top:8px')} />
                          <div style={S('height:4px;width:44%;background:var(--faint);margin-top:4px')} />
                        </div>
                        <div style={S('font-weight:600;font-size:12px;margin-top:10px')}>{t.name}</div>
                        <div style={S('color:var(--faint);font-size:11px')}>{t.meta}</div>
                      </div>
                    ))}
                  </div>
                  <div style={S('position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none;margin-top:28px')}>
                    <div style={S('font:600 10px/1 Archivo;letter-spacing:0.2em;color:var(--faint);border:1px solid var(--rule);padding:6px 14px;background:var(--bg)')}>TEMPLATES COMING SOON</div>
                  </div>
                </div>

                <Box
                  css="padding:18px 0;border-bottom:1px solid var(--rule);cursor:pointer;display:flex;align-items:center;gap:10px;color:var(--dim)"
                  hover="color:var(--ink)"
                  onClick={v.toggleAdv}
                >
                  <span style={S(v.advMark)}>{v.advOpen ? '–' : '+'}</span>
                  <span style={S('font:600 10px/1 Archivo;letter-spacing:0.13em')}>ADVANCED OPTIONS</span>
                  <span style={S('margin-left:auto;font-size:11.5px;color:var(--faint)')}>{v.advSummary}</span>
                </Box>

                {v.advOpen && (
                  <div style={S('padding:24px 0;border-bottom:1px solid var(--rule);display:grid;grid-template-columns:1fr 1fr;gap:0 28px;animation:rise 0.18s ease')}>
                    <div>
                      <label style={S(label)}>MUST COVER</label>
                      <div style={S('display:flex;flex-wrap:wrap;gap:7px;margin-bottom:10px')}>
                        {v.cover.map((c, i) => (
                          <Box key={i} css="display:flex;align-items:center;gap:7px;border:1px solid var(--rule);background:var(--s1);padding:5px 9px;font-size:11.5px;cursor:pointer" hover="border-color:var(--acc);color:var(--acc)" onClick={c.remove}>
                            {c.label}<span style={S('color:var(--faint)')}>×</span>
                          </Box>
                        ))}
                      </div>
                      <input value={v.coverDraft} onChange={v.onCoverDraft} onKeyDown={v.onCoverKey} placeholder="Add topic, press Enter" style={S('width:100%;background:var(--s1);border:1px solid var(--rule);padding:10px 12px;font-size:12.5px')} />
                    </div>
                    <div>
                      <label style={S(label)}>MUST AVOID</label>
                      <div style={S('display:flex;flex-wrap:wrap;gap:7px;margin-bottom:10px')}>
                        {v.avoid.map((c, i) => (
                          <Box key={i} css="display:flex;align-items:center;gap:7px;border:1px solid rgba(255,86,60,.4);background:var(--s1);padding:5px 9px;font-size:11.5px;cursor:pointer;color:var(--acc)" hover="background:rgba(255,86,60,.12)" onClick={c.remove}>
                            {c.label}<span style={S('opacity:0.6')}>×</span>
                          </Box>
                        ))}
                      </div>
                      <input value={v.avoidDraft} onChange={v.onAvoidDraft} onKeyDown={v.onAvoidKey} placeholder="Add exclusion, press Enter" style={S('width:100%;background:var(--s1);border:1px solid var(--rule);padding:10px 12px;font-size:12.5px')} />
                    </div>
                  </div>
                )}

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
                  hover="background:#dd2b0f"
                  onClick={v.startGen}
                >
                  <div>
                    <div>Continue to Brand Intelligence</div>
                    <div style={S('font:400 11.5px/1 Archivo;opacity:0.75;margin-top:4px')}>Next: deep-brief the agent with clinical context</div>
                  </div>
                  <span style={S('margin-left:auto;font-size:18px')}>→</span>
                </Box>
              </div>
            </div>
          )}

          {/* ============ 2.5 · BRAND INTELLIGENCE ============ */}
          {v.isIntel && (() => {
            const threads = v.projectThreads;
            const activeThread = threads.find((t) => t.id === v.activeThreadId) || threads[0];
            const coveredCount = v.intelCoveredIds.size;
            const totalCriteria = v.intelCriteria.length;

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

                {/* ---- Left Rail ---- */}
                <div style={S('width:280px;flex:none;border-right:1px solid var(--rule2);display:flex;flex-direction:column;background:var(--s1);overflow:hidden')}>

                  {/* project card */}
                  <div style={S('padding:18px 18px 14px;border-bottom:1px solid var(--rule2)')}>
                    <div style={S('font:700 9px/1 Archivo;letter-spacing:0.18em;color:var(--acc);margin-bottom:10px')}>BRAND INTELLIGENCE PROJECT</div>
                    <div style={S('font-weight:800;font-size:13.5px;letter-spacing:-0.01em;line-height:1.3;margin-bottom:6px')}>{v.topic || 'Untitled Topic'}</div>
                    {v.heroProduct && (
                      <div style={S('display:inline-flex;align-items:center;gap:6px;font-size:11.5px;color:var(--warn);font-weight:600')}>
                        <span style={S('width:5px;height:5px;border-radius:50%;background:var(--warn)')} />
                        {v.heroProduct}
                      </div>
                    )}
                  </div>

                  {/* criteria coverage */}
                  <div style={S('padding:12px 18px;border-bottom:1px solid var(--rule)')}>
                    <div style={S('display:flex;justify-content:space-between;align-items:center;margin-bottom:8px')}>
                      <div style={S('font:600 9px/1 Archivo;letter-spacing:0.14em;color:var(--faint)')}>CRITERIA COVERAGE</div>
                      <div style={S('font:700 11px/1 Archivo;color:var(--acc)')}>{coveredCount}/{totalCriteria}</div>
                    </div>
                    <div style={S('height:3px;background:var(--rule);position:relative')}>
                      <div style={S(`position:absolute;left:0;top:0;bottom:0;background:var(--acc);width:${(coveredCount / totalCriteria) * 100}%;transition:width 0.3s`)} />
                    </div>
                    <div style={S('display:flex;flex-wrap:wrap;gap:5px;margin-top:10px')}>
                      {v.intelCriteria.map((c) => (
                        <div key={c.id} style={S(`font:600 8.5px/1 Archivo;padding:3px 7px;letter-spacing:0.08em;border:1px solid ${v.intelCoveredIds.has(c.id) ? c.color : 'var(--rule)'};color:${v.intelCoveredIds.has(c.id) ? c.color : 'var(--faint)'}`)}>
                          {v.intelCoveredIds.has(c.id) ? '✓ ' : ''}{c.label}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* threads list */}
                  <div style={S('font:600 9px/1 Archivo;letter-spacing:0.14em;color:var(--faint);padding:12px 18px 6px')}>THREADS · {threads.length}</div>
                  <div style={S('flex:1;overflow-y:auto')}>
                    {threads.map((t) => {
                      const lastMsg = [...t.messages].reverse().find((m) => m.from === 'user');
                      const isActive = t.id === v.activeThreadId;
                      const crit = v.intelCriteria.find((c) => c.id === t.criterionId);
                      return (
                        <div
                          key={t.id}
                          style={S(`padding:12px 18px;cursor:pointer;border-bottom:1px solid var(--rule);border-left:2px solid ${isActive ? (crit?.color || 'var(--acc)') : 'transparent'};background:${isActive ? 'var(--s2)' : 'transparent'}`)}
                          onClick={() => v.pickThread(t.id)}
                        >
                          <div style={S('font-weight:600;font-size:12.5px;margin-bottom:3px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap')}>{t.name}</div>
                          <div style={S('font-size:11.5px;color:var(--faint);overflow:hidden;text-overflow:ellipsis;white-space:nowrap')}>
                            {lastMsg ? lastMsg.text.slice(0, 52) + (lastMsg.text.length > 52 ? '…' : '') : 'No replies yet'}
                          </div>
                          <div style={S('font-size:10.5px;color:var(--faint);margin-top:4px')}>{t.createdAt}</div>
                        </div>
                      );
                    })}
                  </div>

                  {/* new thread + proceed */}
                  <div style={S('padding:12px 14px;border-top:1px solid var(--rule2);display:flex;flex-direction:column;gap:8px')}>
                    <Box
                      css="display:flex;align-items:center;gap:8px;padding:10px 12px;border:1px solid var(--rule2);cursor:pointer;color:var(--dim);font-size:12.5px;font-weight:600"
                      hover="border-color:var(--ink);color:var(--ink)"
                      onClick={v.newIntelThread}
                    >
                      <span style={S('font-size:16px;line-height:1;color:var(--acc)')}>+</span> New Thread
                    </Box>
                    <Box
                      css={`display:flex;align-items:center;justify-content:center;gap:8px;padding:11px 12px;font-weight:700;font-size:12.5px;cursor:${v.intelReady ? 'pointer' : 'default'};background:${v.intelReady ? 'var(--acc)' : 'var(--s2)'};color:${v.intelReady ? '#fff' : 'var(--faint)'};letter-spacing:-0.01em`}
                      hover={v.intelReady ? 'background:#dd2b0f' : ''}
                      onClick={v.intelReady ? v.goTopicsFromIntel : undefined}
                    >
                      {v.intelReady ? 'Proceed to Topic Selection →' : `Cover ${Math.max(0, 3 - coveredCount)} more criteria…`}
                    </Box>
                  </div>
                </div>

                {/* ---- Main Chat Area ---- */}
                <div style={S('flex:1;min-width:0;display:flex;flex-direction:column;overflow:hidden')}>

                  {activeThread ? (
                    <>
                      {/* thread header */}
                      <div style={S('padding:14px 24px;border-bottom:1px solid var(--rule);display:flex;align-items:center;gap:14px;flex:none')}>
                        <div style={S('flex:1;min-width:0')}>
                          <div style={S('font:600 9.5px/1 Archivo;letter-spacing:0.14em;color:var(--faint);margin-bottom:5px')}>
                            {(() => { const c = v.intelCriteria.find((cr) => cr.id === activeThread.criterionId); return c ? `CRITERION · ${c.label.toUpperCase()}` : 'THREAD'; })()}
                          </div>
                          <div style={S('font-weight:700;font-size:15px;letter-spacing:-0.01em')}>{activeThread.name}</div>
                        </div>
                        <div style={S('font:600 9.5px/1 Archivo;letter-spacing:0.12em;color:var(--faint);text-align:right')}>
                          {activeThread.messages.filter((m) => m.from === 'user').length} replies
                        </div>
                      </div>

                      {/* messages */}
                      <div style={S('flex:1;overflow-y:auto;padding:24px')}>
                        {activeThread.messages.map((m, i) => (
                          <div key={i} style={S(`display:flex;gap:12px;margin-bottom:22px;flex-direction:${m.from === 'user' ? 'row-reverse' : 'row'}`)}>
                            {/* avatar */}
                            <div style={S(`width:30px;height:30px;flex:none;display:grid;place-items:center;font:700 11px/1 Archivo;${m.from === 'agent' ? 'background:var(--acc);color:#fff' : 'background:var(--s2);border:1px solid var(--rule2);color:var(--dim)'}`)}>
                              {m.from === 'agent' ? 'AI' : 'MG'}
                            </div>
                            <div style={S(`max-width:72%;${m.from === 'user' ? 'text-align:right' : ''}`)}>
                              <div style={S(`font:600 9.5px/1 Archivo;letter-spacing:0.12em;color:var(--faint);margin-bottom:7px;${m.from === 'user' ? 'text-align:right' : ''}`)}>
                                {m.from === 'agent' ? 'BRAND INTELLIGENCE AGENT' : 'YOU'} · {m.time}
                              </div>
                              <div style={S(`background:${m.from === 'agent' ? 'var(--s1)' : 'var(--s2)'};border:1px solid ${m.from === 'agent' ? 'var(--rule)' : 'var(--rule2)'};padding:14px 16px;font-size:13.5px;line-height:1.65;${m.from === 'agent' ? 'border-left:2px solid var(--acc)' : ''}`)}>
                                {m.text.split('\n\n').map((para, pi) => (
                                  <p key={pi} style={S('margin:0 0 10px')}>{renderMarkdown(para)}</p>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* input */}
                      <div style={S('padding:16px 24px;border-top:1px solid var(--rule);flex:none')}>
                        <div style={S('display:flex;gap:10px;align-items:flex-end')}>
                          <textarea
                            rows={3}
                            style={S('flex:1;background:var(--s1);border:1px solid var(--rule2);color:var(--ink);padding:12px 14px;font-size:13.5px;resize:none;line-height:1.55;outline:none')}
                            placeholder={`Share your insights on "${activeThread.name}"… (Shift+Enter for new line, Enter to send)`}
                            value={v.projectInput}
                            onChange={v.onProjectInput}
                            onKeyDown={v.onProjectKey}
                          />
                          <Box
                            css="background:var(--acc);color:#fff;font-weight:700;padding:14px 18px;cursor:pointer;font-size:13px;flex:none;align-self:stretch;display:flex;align-items:center"
                            hover="background:#dd2b0f"
                            onClick={v.sendIntelMessage}
                          >Send</Box>
                        </div>
                        <div style={S('color:var(--faint);font-size:11px;margin-top:8px')}>
                          Enter to send · Shift+Enter for new line · Start a new thread for each criterion
                        </div>
                      </div>
                    </>
                  ) : (
                    <div style={S('flex:1;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:14px;color:var(--faint)')}>
                      <div style={S('font-size:32px')}>🧠</div>
                      <div style={S('font-weight:700;font-size:15px;color:var(--dim)')}>No thread selected</div>
                      <div style={S('font-size:13px')}>Pick a thread from the left or start a new one.</div>
                    </div>
                  )}
                </div>

                {/* ---- Right Criteria Guide ---- */}
                <div style={S('width:260px;flex:none;border-left:1px solid var(--rule);overflow-y:auto;background:var(--bg)')}>
                  <div style={S('padding:16px 18px;border-bottom:1px solid var(--rule)')}>
                    <div style={S('font:700 9.5px/1 Archivo;letter-spacing:0.14em;color:var(--faint);margin-bottom:4px')}>INTELLIGENCE FRAMEWORK</div>
                    <div style={S('color:var(--dim);font-size:12px;line-height:1.5')}>Cover all 8 criteria for the richest topic generation. Each thread deep-briefs one angle.</div>
                  </div>
                  <div style={S('padding:10px 0')}>
                    {v.intelCriteria.map((c, i) => {
                      const covered = v.intelCoveredIds.has(c.id);
                      const isCurrentThread = activeThread?.criterionId === c.id;
                      return (
                        <div key={c.id} style={S(`padding:11px 18px;border-bottom:1px solid var(--rule);border-left:2px solid ${isCurrentThread ? c.color : 'transparent'}`)}>
                          <div style={S('display:flex;align-items:center;gap:8px;margin-bottom:3px')}>
                            <div style={S(`width:16px;height:16px;border-radius:50%;display:grid;place-items:center;font:700 8px/1 Archivo;flex:none;background:${covered ? c.color : 'var(--s2)'};border:1px solid ${covered ? c.color : 'var(--rule)'};color:${covered && c.color === 'var(--warn)' ? '#000' : '#fff'}`)}>
                              {covered ? '✓' : i + 1}
                            </div>
                            <div style={S(`font-weight:700;font-size:12px;color:${covered ? 'var(--ink)' : 'var(--dim)'}`)}>
                              {c.label}
                            </div>
                            {covered && <div style={S('margin-left:auto;font:600 8.5px/1 Archivo;color:var(--ok)')}>DONE</div>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div style={S('padding:16px 18px;border-top:1px solid var(--rule)')}>
                    <div style={S('font:600 9.5px/1 Archivo;letter-spacing:0.12em;color:var(--faint);margin-bottom:8px')}>HOW THIS WORKS</div>
                    <div style={S('color:var(--faint);font-size:11.5px;line-height:1.6')}>
                      Each thread feeds your answers into the agent's scoring model. More context = more targeted topic options.
                      <br /><br />
                      After covering ≥3 criteria, the "Proceed" button unlocks.
                    </div>
                  </div>
                </div>

              </div>
            );
          })()}

          {/* ============ 3 · TOPIC SELECTION CHAT ============ */}
          {v.isTopics && (
            <div style={S('display:flex;flex-direction:column;height:100%')}>
              {/* header */}
              <div style={S('padding:14px 28px;border-bottom:2px solid var(--rule2);display:flex;align-items:center;gap:16px;flex:none')}>
                <div>
                  <div style={merge(kicker, 'margin-bottom:5px')}>TOPIC DISCOVERY AGENT · STEP 2 OF 4</div>
                  <div style={S('font-weight:700;font-size:15px;letter-spacing:-0.01em')}>{v.topic}</div>
                </div>
                <div style={S('margin-left:auto;display:flex;align-items:center;gap:10px')}>
                  <div style={S('width:7px;height:7px;background:var(--ok);border-radius:50%;animation:puls 1.8s infinite')} />
                  <div style={S('font:600 10px/1 Archivo;color:var(--ok);letter-spacing:0.1em')}>AGENT ACTIVE</div>
                  <div style={S('color:var(--faint);font-size:11.5px;margin-left:8px')}>{v.topicsMsgCount} messages</div>
                </div>
              </div>

              <div style={S('flex:1;display:grid;grid-template-columns:1fr 296px;min-height:0')}>

                {/* ---- main chat column ---- */}
                <div style={S('display:flex;flex-direction:column;min-height:0;border-right:2px solid var(--rule2)')}>

                  {/* messages */}
                  <div style={S('flex:1;overflow-y:auto;padding:28px 32px;display:flex;flex-direction:column;gap:22px')}>
                    {v.topicsMessages.map((m, mi) => (
                      <div key={mi} style={S(`display:flex;flex-direction:column;align-items:${m.isAgent ? 'flex-start' : 'flex-end'};animation:rise 0.22s ease`)}>
                        <div style={S(`font:600 9.5px/1 Archivo;letter-spacing:0.12em;color:var(--faint);margin-bottom:7px`)}>
                          {m.isAgent ? 'TOPIC DISCOVERY AGENT' : 'YOU'}
                        </div>

                        {/* bubble */}
                        {m.isAgent ? (
                          <div style={S('max-width:72ch;background:var(--s1);border:1px solid var(--rule);border-left:2px solid var(--acc);padding:16px 18px')}>
                            {m.parts.map((p, pi) => (
                              <p key={pi} style={S(`margin:0;font-size:13.5px;line-height:1.7;${pi > 0 ? 'margin-top:11px' : ''};${p.startsWith('•') ? 'padding-left:4px' : ''}`)}>{p}</p>
                            ))}
                          </div>
                        ) : (
                          <div style={S('max-width:56ch;background:var(--s2);border:1px solid var(--rule2);padding:13px 16px')}>
                            <p style={S('margin:0;font-size:13.5px;line-height:1.65;text-align:right')}>{m.text}</p>
                          </div>
                        )}

                        {/* inline topic cards */}
                        {m.inlineCards && (
                          <div style={S('width:100%;max-width:820px;margin-top:14px;display:flex;flex-direction:column;gap:10px')}>
                            {m.inlineCards.map((o, oi) => (
                              <div key={o.id} style={S(`display:flex;border:1px solid var(--rule);background:var(--bg);animation:rise 0.25s ease`)}>
                                <div style={S(`width:3px;flex:none;background:${o.riskColor}`)} />
                                <div style={S('flex:1;padding:18px 22px')}>
                                  <div style={S('display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:10px')}>
                                    <span style={S('font:700 10px/1 var(--mono);color:var(--faint)')}>OPTION {String(oi + 1).padStart(2, '0')}</span>
                                    <span style={S(`border:1px solid ${o.riskColor};color:${o.riskColor};padding:2px 7px;font:600 9px/1 Archivo;letter-spacing:0.1em`)}>{o.risk} RISK</span>
                                    <span style={S('display:inline-block;border:1px solid var(--rule2);padding:2px 8px;font:600 9px/1 Archivo;letter-spacing:0.1em;color:var(--dim)')}>{o.angle}</span>
                                    <span style={S('margin-left:auto;font:700 12px/1 var(--mono);color:var(--acc)')}>{o.strength} <span style={S('font:600 9px/1 Archivo;letter-spacing:0.08em;color:var(--faint)')}>EVIDENCE SCORE</span></span>
                                  </div>

                                  <div style={S('font-size:17px;font-weight:800;letter-spacing:-0.02em;margin-bottom:8px')}>{o.title}</div>
                                  <div style={S('color:var(--dim);font-size:12.5px;line-height:1.6;margin-bottom:12px;max-width:70ch')}>{o.why}</div>

                                  <div style={S('display:grid;grid-template-columns:1fr 1fr;gap:10px 20px;margin-bottom:14px')}>
                                    <div>
                                      <div style={S('font:600 9px/1 Archivo;letter-spacing:0.11em;color:var(--faint);margin-bottom:7px')}>EVIDENCE SIGNALS</div>
                                      <div style={S('display:flex;flex-wrap:wrap;gap:5px')}>
                                        {o.signals.map((sg, si) => (
                                          <span key={si} style={S('border:1px solid var(--rule);background:var(--s1);padding:3px 8px;font-size:10.5px;color:var(--dim)')}>{sg}</span>
                                        ))}
                                      </div>
                                    </div>
                                    <div>
                                      <div style={S('font:600 9px/1 Archivo;letter-spacing:0.11em;color:var(--faint);margin-bottom:7px')}>CONTENT FOCUS</div>
                                      <div style={S('display:flex;flex-wrap:wrap;gap:5px')}>
                                        {o.focus.map((f, fi) => (
                                          <span key={fi} style={S('background:var(--s2);padding:3px 8px;font-size:10.5px;color:var(--ink)')}>{f}</span>
                                        ))}
                                      </div>
                                    </div>
                                  </div>

                                  <div style={S('display:flex;gap:8px;align-items:center')}>
                                    <Box
                                      css="display:inline-flex;align-items:center;gap:20px;background:var(--acc);color:#fff;font-weight:700;font-size:12px;padding:10px 16px;cursor:pointer"
                                      hover="background:#dd2b0f"
                                      onClick={o.select}
                                    >
                                      <span>Select this topic</span><span>→</span>
                                    </Box>
                                    <Box
                                      css="border:1px solid var(--rule);padding:10px 14px;font-size:12px;color:var(--dim);cursor:pointer"
                                      hover="border-color:var(--acc);color:var(--acc)"
                                      onClick={() => v.useTopicsSuggestion(`Tell me more about Option ${oi + 1}`)}
                                    >
                                      Ask about this →
                                    </Box>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        <div style={S('font:11px/1 var(--mono);color:var(--faint);margin-top:5px')}>{m.time}</div>
                      </div>
                    ))}
                  </div>

                  {/* suggestions + input */}
                  <div style={S('border-top:2px solid var(--rule2);padding:14px 32px 18px;flex:none')}>
                    <div style={S('font:600 9.5px/1 Archivo;letter-spacing:0.12em;color:var(--faint);margin-bottom:8px')}>QUICK QUESTIONS</div>
                    <div style={S('display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px')}>
                      {v.topicsSuggestions.map((sg, si) => (
                        <Box
                          key={si}
                          css="border:1px solid var(--rule);padding:5px 11px;font-size:11px;color:var(--dim);cursor:pointer;white-space:nowrap"
                          hover="border-color:var(--acc);color:var(--acc)"
                          onClick={() => v.useTopicsSuggestion(sg)}
                        >
                          {sg}
                        </Box>
                      ))}
                    </div>
                    <div style={S('display:flex;gap:10px;align-items:flex-end')}>
                      <textarea
                        value={v.topicsInput}
                        onChange={v.onTopicsInput}
                        onKeyDown={v.onTopicsKey}
                        placeholder="Ask the agent to explain an option, compare them, adjust the focus, or show alternatives… (Enter to send)"
                        rows={2}
                        style={S('flex:1;background:var(--s1);border:1px solid var(--rule);padding:11px 14px;font-size:13px;line-height:1.5;resize:none')}
                      />
                      <Box
                        css="background:var(--acc);color:#fff;font-weight:700;padding:11px 16px;cursor:pointer;flex:none;height:fit-content"
                        hover="background:#dd2b0f"
                        onClick={v.doSendTopics}
                      >
                        Send →
                      </Box>
                    </div>
                  </div>
                </div>

                {/* ---- right rail ---- */}
                <div style={S('background:var(--s1);overflow-y:auto;display:flex;flex-direction:column')}>
                  <div style={S('padding:16px 18px;border-bottom:1px solid var(--rule)')}>
                    <div style={S('font:600 9.5px/1 Archivo;letter-spacing:0.13em;color:var(--faint);margin-bottom:10px')}>CURRENT OPTIONS</div>
                    <div style={S('display:flex;flex-direction:column;gap:8px')}>
                      {v.currentRailCards.map((o, oi) => (
                        <div key={o.id} style={S('display:flex;border:1px solid var(--rule);background:var(--bg)')}>
                          <div style={S(`width:2px;flex:none;background:${o.riskColor}`)} />
                          <div style={S('flex:1;padding:10px 12px')}>
                            <div style={S('display:flex;align-items:center;gap:7px;margin-bottom:5px')}>
                              <span style={S('font:700 9px/1 var(--mono);color:var(--faint)')}>OPT {oi + 1}</span>
                              <span style={S(`font:700 10px/1 var(--mono);color:var(--acc);margin-left:auto`)}>{o.strength}</span>
                            </div>
                            <div style={S('font-size:12px;font-weight:700;line-height:1.35;margin-bottom:7px')}>{o.title}</div>
                            <Box
                              css="font-size:11px;color:var(--dim);cursor:pointer;font-weight:600;display:flex;align-items:center;gap:6px"
                              hover="color:var(--acc)"
                              onClick={o.select}
                            >
                              Select <span>→</span>
                            </Box>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={S('padding:16px 18px;border-bottom:1px solid var(--rule)')}>
                    <div style={S('font:600 9.5px/1 Archivo;letter-spacing:0.13em;color:var(--faint);margin-bottom:10px')}>BRAND CONTEXT</div>
                    {[
                      ['Topic', v.topic.length > 28 ? v.topic.slice(0, 28) + '…' : v.topic],
                      ['Audience', v.aud],
                      ['Region', v.region],
                      ['Duration', `${v.dur} min`],
                    ].map(([lbl, val]) => (
                      <div key={lbl} style={S('display:flex;justify-content:space-between;margin-bottom:8px;font-size:11.5px')}>
                        <span style={S('color:var(--faint)')}>{lbl}</span>
                        <span style={S('font-weight:600;text-align:right;max-width:120px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap')}>{val}</span>
                      </div>
                    ))}
                  </div>

                  <div style={S('padding:16px 18px')}>
                    <div style={S('font:600 9.5px/1 Archivo;letter-spacing:0.13em;color:var(--faint);margin-bottom:10px')}>CRITERIA ANALYSED</div>
                    {[
                      'Clinical experience signals', 'Practitioner questions', 'Conference & trend signals',
                      'Hero product relevance', 'Evidence strength', 'Evidence timeliness', 'Human discussion signals',
                    ].map((c, ci) => (
                      <div key={ci} style={S('display:flex;align-items:center;gap:8px;margin-bottom:7px;font-size:11.5px;color:var(--dim)')}>
                        <span style={S('color:var(--ok);flex:none;font-size:10px')}>✓</span>{c}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============ 4 · PROJECT BRIEF CHAT ============ */}
          {v.isChat && (
            <div style={S('display:flex;flex-direction:column;height:100%')}>
              {/* header */}
              <div style={S('padding:16px 32px;border-bottom:2px solid var(--rule2);display:flex;align-items:center;gap:20px;flex:none')}>
                <Box css="color:var(--faint);font-size:12px;cursor:pointer" hover="color:var(--acc)" onClick={v.goTopics}>← Back</Box>
                <div style={S('width:1px;height:20px;background:var(--rule)')} />
                <div style={S('min-width:0')}>
                  <div style={S('font:600 9.5px/1 Archivo;letter-spacing:0.14em;color:var(--faint);margin-bottom:4px')}>PROJECT BRIEF</div>
                  <div style={S('font-weight:700;font-size:15px;letter-spacing:-0.01em;overflow:hidden;text-overflow:ellipsis;white-space:nowrap')}>{v.topic}</div>
                </div>
                {v.chatReady && (
                  <Box
                    css="margin-left:auto;background:var(--ok);color:#0d0f0d;font-weight:700;padding:11px 18px;cursor:pointer;display:flex;align-items:center;gap:24px;flex:none"
                    hover="opacity:0.88"
                    onClick={v.proceedToGen}
                  >
                    <span>Proceed to Generation</span><span>→</span>
                  </Box>
                )}
              </div>

              <div style={S('flex:1;display:grid;grid-template-columns:284px 1fr;min-height:0')}>
                {/* left context panel */}
                <div style={S('border-right:2px solid var(--rule2);background:var(--s1);overflow-y:auto;display:flex;flex-direction:column')}>
                  <div style={S('padding:18px 20px;border-bottom:1px solid var(--rule)')}>
                    <div style={S('font:600 9.5px/1 Archivo;letter-spacing:0.13em;color:var(--faint);margin-bottom:10px')}>SELECTED TOPIC</div>
                    <div style={S('font-weight:700;font-size:13.5px;line-height:1.4;margin-bottom:6px')}>{v.chosenTopic.title}</div>
                    <div style={S(`display:inline-block;border:1px solid ${v.chosenTopic.riskColor || 'var(--ok)'};color:${v.chosenTopic.riskColor || 'var(--ok)'};padding:3px 8px;font:600 9.5px/1 Archivo;letter-spacing:0.1em`)}>{v.chosenTopic.risk} RISK</div>
                  </div>

                  <div style={S('padding:18px 20px;border-bottom:1px solid var(--rule)')}>
                    <div style={S('font:600 9.5px/1 Archivo;letter-spacing:0.13em;color:var(--faint);margin-bottom:12px')}>BRIEF PARAMETERS</div>
                    {[
                      ['Audience', v.aud],
                      ['Region', v.region],
                      ['Duration', `${v.dur} min`],
                    ].map(([lbl, val]) => (
                      <div key={lbl} style={S('display:flex;justify-content:space-between;margin-bottom:9px;font-size:12.5px')}>
                        <span style={S('color:var(--faint)')}>{lbl}</span>
                        <span style={S('font-weight:600')}>{val}</span>
                      </div>
                    ))}
                    {v.cover.length > 0 && (
                      <div style={S('margin-top:10px')}>
                        <div style={S('font:600 9px/1 Archivo;letter-spacing:0.1em;color:var(--faint);margin-bottom:6px')}>MUST COVER</div>
                        <div style={S('display:flex;flex-wrap:wrap;gap:5px')}>
                          {v.cover.map((c, i) => <span key={i} style={S('background:var(--s2);padding:3px 8px;font-size:11px')}>{c.label}</span>)}
                        </div>
                      </div>
                    )}
                  </div>

                  <div style={S('padding:18px 20px')}>
                    <div style={S('font:600 9.5px/1 Archivo;letter-spacing:0.13em;color:var(--faint);margin-bottom:10px')}>CONTENT FOCUS AREAS</div>
                    <div style={S('display:flex;flex-direction:column;gap:5px')}>
                      {(v.chosenTopic.focus || []).map((f, i) => (
                        <div key={i} style={S('font-size:12px;color:var(--dim);display:flex;gap:8px;align-items:flex-start')}>
                          <span style={S('color:var(--ok);flex:none;margin-top:1px')}>✓</span>{f}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* chat area */}
                <div style={S('display:flex;flex-direction:column;min-height:0')}>
                  {/* messages */}
                  <div style={S('flex:1;overflow-y:auto;padding:28px 36px;display:flex;flex-direction:column;gap:20px')}>
                    {v.chatMessages.length === 0 && (
                      <div style={S('color:var(--faint);font-size:13px;text-align:center;margin-top:60px')}>Starting conversation…</div>
                    )}
                    {v.chatMessages.map((m, i) => (
                      <div key={i} style={S(`display:flex;flex-direction:column;align-items:${m.isAgent ? 'flex-start' : 'flex-end'};animation:rise 0.2s ease`)}>
                        <div style={S(`font:600 9.5px/1 Archivo;letter-spacing:0.12em;color:var(--faint);margin-bottom:7px;${m.isAgent ? '' : 'text-align:right'}`)}>
                          {m.isAgent ? 'CONTENT AGENT' : 'YOU'}
                        </div>
                        <div style={S(`max-width:68ch;padding:16px 18px;${m.isAgent ? 'background:var(--s1);border:1px solid var(--rule);border-left:2px solid var(--acc)' : 'background:var(--s2);border:1px solid var(--rule2)'}`)}>
                          {m.parts.map((p, j) => (
                            <p key={j} style={S(`margin:0;font-size:14px;line-height:1.65;${j > 0 ? 'margin-top:12px' : ''};${m.isAgent ? '' : 'text-align:right'}`)}>{p.replace(/\*\*(.*?)\*\*/g, '$1')}</p>
                          ))}
                        </div>
                        <div style={S('font:11px/1 var(--mono);color:var(--faint);margin-top:5px')}>{m.time}</div>
                      </div>
                    ))}
                  </div>

                  {/* suggestions + input */}
                  <div style={S('border-top:2px solid var(--rule2);padding:16px 36px 20px;flex:none')}>
                    <div style={S('font:600 9.5px/1 Archivo;letter-spacing:0.12em;color:var(--faint);margin-bottom:9px')}>QUICK RESPONSES</div>
                    <div style={S('display:flex;flex-wrap:wrap;gap:7px;margin-bottom:14px')}>
                      {v.chatSuggestions.map((s, i) => (
                        <Box key={i} css="border:1px solid var(--rule);padding:5px 12px;font-size:11.5px;color:var(--dim);cursor:pointer" hover="border-color:var(--acc);color:var(--acc)" onClick={() => v.useSuggestion(s)}>{s}</Box>
                      ))}
                    </div>
                    <div style={S('display:flex;gap:10px;align-items:flex-end')}>
                      <textarea
                        value={v.chatInput}
                        onChange={v.onChatInput}
                        onKeyDown={v.onChatKey}
                        placeholder="Type your response… (Enter to send, Shift+Enter for new line)"
                        rows={3}
                        style={S('flex:1;background:var(--s1);border:1px solid var(--rule);padding:12px 14px;font-size:13.5px;line-height:1.55;resize:none')}
                      />
                      <Box css="background:var(--acc);color:#fff;font-weight:700;padding:12px 16px;cursor:pointer;height:fit-content;flex:none" hover="background:#dd2b0f" onClick={v.sendChat}>Send →</Box>
                    </div>
                    {!v.chatReady && (
                      <div style={S('margin-top:10px;color:var(--faint);font-size:11.5px')}>Answer at least 2 questions to unlock "Proceed to Generation"</div>
                    )}
                    {v.chatReady && (
                      <div style={S('margin-top:12px;display:flex;align-items:center;gap:12px')}>
                        <div style={S('color:var(--ok);font-size:11.5px;font-weight:600')}>✓ Brief is ready</div>
                        <Box css="background:var(--ok);color:#0d0f0d;font-weight:700;padding:10px 16px;cursor:pointer;font-size:13px;display:flex;align-items:center;gap:20px" hover="opacity:0.88" onClick={v.proceedToGen}>
                          <span>Proceed to Generation</span><span>→</span>
                        </Box>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============ 5 · PIPELINE ============ */}
          {v.isPipe && (
            <div style={S('display:flex;flex-direction:column;min-height:100%')}>
              <div style={S('padding:26px 40px 0')}>
                <div style={S('display:flex;justify-content:space-between;align-items:baseline;margin-bottom:22px')}>
                  <div>
                    <div style={merge(kicker, 'margin-bottom:10px')}>PIPELINE · RUN #2418</div>
                    <h1 style={S('font-size:24px;font-weight:800;letter-spacing:-0.025em;margin:0')}>{v.topic}</h1>
                  </div>
                  <div style={S('text-align:right')}>
                    <div style={S('font:700 22px/1 var(--mono);color:var(--acc)')}>{v.pctLabel}</div>
                    <div style={S('color:var(--faint);font-size:11.5px;margin-top:6px')}>{v.etaLabel}</div>
                  </div>
                </div>
              </div>

              <div style={S('display:grid;grid-template-columns:repeat(7,1fr);border-top:2px solid var(--rule2);border-bottom:2px solid var(--rule2)')}>
                {v.stages.map((s, i) => (
                  <div key={i} style={S(s.style)}>
                    <div style={S('display:flex;align-items:center;gap:8px;margin-bottom:12px')}>
                      <span style={S(s.icon)}>{s.glyph}</span>
                      <span style={S('font:700 10px/1 var(--mono);color:var(--faint)')}>{s.i}</span>
                    </div>
                    <div style={S(s.label)}>{s.name}</div>
                    <div style={S('color:var(--faint);font-size:10.5px;margin-top:5px')}>{s.note}</div>
                  </div>
                ))}
              </div>

              <div style={S('flex:1;display:grid;grid-template-columns:1fr 372px')}>
                <div style={S('border-right:2px solid var(--rule2);display:flex;flex-direction:column')}>
                  <div style={S('padding:16px 40px 12px;border-bottom:1px solid var(--rule);display:flex;align-items:center;gap:10px')}>
                    <div style={S('font:600 10px/1 Archivo;letter-spacing:0.14em;color:var(--dim)')}>ACTIVITY LOG</div>
                    <div style={S('width:6px;height:6px;background:var(--acc);animation:puls 1.1s infinite')} />
                    <Box css="margin-left:auto;font-size:11.5px;color:var(--faint);cursor:pointer" hover="color:var(--acc)" onClick={v.skipPipe}>
                      skip to validation →
                    </Box>
                  </div>
                  <div style={S('padding:14px 40px 30px;font:12px/1.9 var(--mono);color:var(--dim)')}>
                    {v.logs.map((l, i) => (
                      <div key={i} style={S(l.style)}>
                        <span style={S('color:var(--faint)')}>{l.t}</span>{'  '}{l.text}
                      </div>
                    ))}
                  </div>
                </div>

                <div style={S('background:var(--s1)')}>
                  <div style={S('padding:16px 20px 12px;border-bottom:1px solid var(--rule)')}>
                    <div style={S('font:600 10px/1 Archivo;letter-spacing:0.14em;color:var(--dim);margin-bottom:4px')}>EVIDENCE STORE</div>
                    <div style={S('color:var(--faint);font-size:11.5px')}>{v.chunkLabel}</div>
                  </div>
                  {v.evidence.map((e, i) => (
                    <div key={i} style={S('padding:14px 20px;border-bottom:1px solid var(--rule);animation:rise 0.25s ease')}>
                      <div style={S('display:flex;align-items:center;gap:8px;margin-bottom:7px')}>
                        <span style={S(e.badge)}>{e.type}</span>
                        <span style={S('font:600 10.5px/1 var(--mono);color:var(--faint)')}>{e.year}</span>
                        <span style={S('margin-left:auto;display:flex;gap:2px')}>
                          {e.conf.map((c, j) => <span key={j} style={S(c.style)} />)}
                        </span>
                      </div>
                      <div style={S('font-size:12px;font-weight:500;line-height:1.4')}>{e.title}</div>
                      <div style={S('color:var(--faint);font-size:11px;margin-top:4px')}>{e.src}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={S('border-top:2px solid var(--rule2);padding:14px 40px;display:flex;align-items:center;gap:20px')}>
                <div style={S('flex:1;height:3px;background:var(--s2)')}><div style={S(v.progStyle)} /></div>
                <div style={S('font:600 11.5px/1 var(--mono);color:var(--dim);flex:none')}>{v.etaLabel}</div>
              </div>
            </div>
          )}

          {/* ============ 4 · VALIDATION REPORT ============ */}
          {v.isValid && (
            <div style={S('padding:34px 40px 50px')}>
              <div style={S('display:flex;justify-content:space-between;align-items:flex-start;gap:30px;padding-bottom:24px;border-bottom:2px solid var(--rule2)')}>
                <div>
                  <div style={merge(kicker, 'margin-bottom:11px')}>SCIENTIFIC VALIDATION REPORT</div>
                  <h1 style={S('font-size:26px;font-weight:800;letter-spacing:-0.025em;margin:0 0 8px')}>{v.topic}</h1>
                  <div style={S('color:var(--faint);font-size:12px')}>Run #2418 · 40 slides · 118 claims checked · completed 09:41</div>
                </div>
                <div style={S('border:2px solid var(--warn);color:var(--warn);padding:11px 16px;font:800 14px/1 Archivo;letter-spacing:0.08em;flex:none')}>PARTIAL</div>
              </div>

              <div style={S('display:grid;grid-template-columns:1fr 1fr;gap:0;border-bottom:2px solid var(--rule2)')}>
                {v.checks.map((c, i) => (
                  <div key={i} style={S(c.style)}>
                    <div style={S('display:flex;justify-content:space-between;align-items:baseline;gap:16px;margin-bottom:16px')}>
                      <div style={S('font-weight:700;font-size:14px')}>{c.name}</div>
                      <div style={S(c.tag)}>{c.verdict}</div>
                    </div>
                    <div style={S('display:flex;align-items:baseline;gap:10px;margin-bottom:14px')}>
                      <div style={S(c.numStyle)}>{c.score}</div>
                      <div style={S('color:var(--dim);font-size:12px')}>{c.unit}</div>
                    </div>
                    <div style={S('height:3px;background:var(--s2);margin-bottom:12px')}><div style={S(c.bar)} /></div>
                    <div style={S('color:var(--dim);font-size:11.5px')}>{c.note}</div>
                  </div>
                ))}
              </div>

              <div style={S('padding:26px 0 12px;display:flex;align-items:baseline;gap:14px')}>
                <h2 style={S('font-size:13px;font-weight:700;letter-spacing:0.1em;margin:0')}>FLAGGED ITEMS</h2>
                <span style={S('color:var(--faint);font-size:12px')}>3 items · 2 auto-repaired · 1 escalated</span>
              </div>

              {v.flags.map((f, i) => (
                <div key={i} style={S(f.style)}>
                  <div style={S('display:flex;align-items:center;gap:12px;margin-bottom:12px')}>
                    <span style={S('font:700 11px/1 var(--mono);color:var(--faint)')}>SLIDE {f.slide}</span>
                    <span style={S('font-weight:600;font-size:13px')}>{f.title}</span>
                    <span style={S(f.typeTag)}>{f.type}</span>
                    <span style={S(f.statusTag)}>{f.status}</span>
                  </div>
                  <div style={S('border-left:2px solid var(--warn);padding:2px 0 2px 14px;font-size:13.5px;line-height:1.55;margin-bottom:14px')}>{f.sentence}</div>
                  <div style={S('display:flex;gap:10px;align-items:flex-start')}>
                    <div style={S('font:600 9.5px/1.6 Archivo;letter-spacing:0.13em;color:var(--faint);flex:none;width:74px')}>{f.fixLabel}</div>
                    <div style={S('color:var(--dim);font-size:12.5px;line-height:1.5')}>{f.fix}</div>
                  </div>
                </div>
              ))}

              {v.pptStatus === 'sent-to-ma' && (
                <div style={S('display:flex;align-items:center;gap:12px;margin-top:28px;padding:14px 18px;background:#0d2b1f;border-left:3px solid var(--ok)')}>
                  <span style={S('color:var(--ok);font-size:16px')}>✓</span>
                  <div>
                    <div style={S('font-weight:700;font-size:13px;color:var(--ok)')}>Sent to Medical Affairs Review</div>
                    <div style={S('color:var(--dim);font-size:12px;margin-top:2px')}>You'll be notified when the reviewer responds. Switch to Medical Affairs role to see the review in progress.</div>
                  </div>
                </div>
              )}
              {v.pptStatus === 'ma-rejected' && (
                <div style={S('display:flex;align-items:center;gap:12px;margin-top:28px;padding:14px 18px;background:#2b1212;border-left:3px solid var(--acc)')}>
                  <span style={S('color:var(--acc);font-size:16px')}>!</span>
                  <div style={S('flex:1')}>
                    <div style={S('font-weight:700;font-size:13px;color:var(--acc)')}>Sent Back by Medical Affairs — {v.maTotalComments} comment{v.maTotalComments !== 1 ? 's' : ''} across {v.maCommentSlideCount} slide{v.maCommentSlideCount !== 1 ? 's' : ''}</div>
                    <div style={S('color:var(--dim);font-size:12px;margin-top:2px')}>Review the comments in the Review Workspace, make revisions, then re-submit.</div>
                  </div>
                  <Box css="background:var(--acc);color:#fff;font-weight:700;padding:11px 18px;cursor:pointer;white-space:nowrap;font-size:13px" hover="background:#dd2b0f" onClick={v.doResubmitToMA}>Re-submit to MA →</Box>
                </div>
              )}
              {(v.pptStatus === 'draft' || !v.pptStatus) && (
                <div style={S('display:flex;gap:12px;margin-top:28px')}>
                  <Box css="background:var(--acc);color:#fff;font-weight:700;padding:15px 20px;cursor:pointer;display:flex;align-items:center;gap:40px;min-width:280px" hover="background:#dd2b0f" onClick={v.doSendToMA}>
                    <span>Send to Reviewer</span><span style={S('margin-left:auto')}>→</span>
                  </Box>
                  <Box css="border:1px solid var(--rule2);padding:15px 20px;cursor:pointer;color:var(--dim)" hover="color:var(--ink);border-color:var(--ink)">Re-run validation</Box>
                </div>
              )}
            </div>
          )}

          {/* ============ 5 · REVIEW WORKSPACE ============ */}
          {v.isReview && (() => {
            const isSentBack = v.pptStatus === 'ma-rejected' || v.pptStatus === 'sci-rejected';
            const sentBackBy = v.pptStatus === 'sci-rejected' ? 'Scientific Reviewer' : 'Medical Affairs';
            const sentBackColor = v.pptStatus === 'sci-rejected' ? 'var(--ok)' : 'var(--warn)';
            const activeComments = v.pptStatus === 'sci-rejected'
              ? (v.sciAllComments[v.slides[v.slideIdx]?.n] || [])
              : (v.maAllComments[v.slides[v.slideIdx]?.n] || []);
            const allComments = v.pptStatus === 'sci-rejected' ? v.sciAllComments : v.maAllComments;
            const slidesWithComments = v.slides.filter(s => (allComments[s.n] || []).some(c => !c.resolved));
            const totalReviewerComments = Object.values(allComments).reduce((a, arr) => a + arr.filter(c => !c.resolved).length, 0);
            return (
            <div style={S('display:flex;flex-direction:column;height:100%')}>

              {/* sent-back alert banner */}
              {isSentBack && (
                <div style={S(`padding:12px 26px;background:#1e1000;border-bottom:2px solid ${sentBackColor};display:flex;align-items:center;gap:14px;flex:none`)}>
                  <div style={S(`width:28px;height:28px;border-radius:50%;background:${sentBackColor};display:grid;place-items:center;font:700 13px/1 Archivo;color:${sentBackColor === 'var(--warn)' ? '#000' : '#fff'};flex:none`)}>!</div>
                  <div style={S('flex:1')}>
                    <div style={S(`font-weight:700;font-size:13px;color:${sentBackColor}`)}>Sent back by {sentBackBy} — {totalReviewerComments} unresolved comment{totalReviewerComments !== 1 ? 's' : ''} across {slidesWithComments.length} slide{slidesWithComments.length !== 1 ? 's' : ''}</div>
                    <div style={S('color:var(--dim);font-size:12px;margin-top:2px')}>Review each comment in the right panel, make your edits, then re-submit for approval.</div>
                  </div>
                  <Box
                    css={`background:${sentBackColor};color:${sentBackColor === 'var(--warn)' ? '#000' : '#fff'};font-weight:700;padding:9px 16px;cursor:pointer;font-size:12.5px;flex:none`}
                    hover="opacity:0.85"
                    onClick={v.doResubmitToMA}
                  >Re-submit to {v.pptStatus === 'sci-rejected' ? 'Sci' : 'MA'} →</Box>
                </div>
              )}

              <div style={S('padding:14px 26px;border-bottom:2px solid var(--rule2);display:flex;align-items:center;gap:22px;flex:none')}>
                <div style={S('min-width:0')}>
                  <div style={S('font:600 9.5px/1 Archivo;letter-spacing:0.14em;color:var(--faint);margin-bottom:6px')}>{isSentBack ? `REVISION ROUND · ${sentBackBy.toUpperCase()} COMMENTS` : `HUMAN REVIEW · REVIEWER ${v.reviewer}`}</div>
                  <div style={S('font-weight:700;font-size:16px;letter-spacing:-0.02em;overflow:hidden;text-overflow:ellipsis;white-space:nowrap')}>{v.topic}</div>
                </div>
                <div style={S('flex:none;display:flex;align-items:center;gap:12px;padding-left:22px;border-left:1px solid var(--rule)')}>
                  <div style={S('font:700 13px/1 var(--mono)')}>{v.reviewedLabel}</div>
                  <div style={S('width:92px;height:3px;background:var(--s2)')}><div style={S(v.reviewProg)} /></div>
                </div>
                <div style={S('margin-left:auto;display:flex;gap:10px;flex:none')}>
                  <Box css="border:1px solid var(--rule);padding:10px 15px;font-size:12.5px;cursor:pointer;color:var(--dim)" hover="color:var(--ink);border-color:var(--ink)">Save Draft</Box>
                  {!isSentBack && <Box css="background:var(--acc);color:#fff;font-weight:700;padding:10px 16px;font-size:12.5px;cursor:pointer" hover="background:#dd2b0f" onClick={v.approveAll}>Approve All</Box>}
                  {isSentBack && (
                    <Box css={`background:${sentBackColor};color:${sentBackColor === 'var(--warn)' ? '#000' : '#fff'};font-weight:700;padding:10px 16px;font-size:12.5px;cursor:pointer`} hover="opacity:0.85" onClick={v.doResubmitToMA}>
                      Re-submit to {v.pptStatus === 'sci-rejected' ? 'Scientific Review' : 'MA Review'} →
                    </Box>
                  )}
                </div>
              </div>

              <div style={S('flex:1;display:grid;grid-template-columns:236px 1fr 348px;min-height:0')}>
                {/* slide rail */}
                <div style={S('border-right:2px solid var(--rule2);overflow-y:auto;background:var(--bg)')}>
                  <div style={S('padding:14px 18px 10px;font:600 9.5px/1 Archivo;letter-spacing:0.14em;color:var(--faint);border-bottom:1px solid var(--rule);position:sticky;top:0;background:var(--bg)')}>SLIDES · 40</div>
                  {v.slideNav.map((s, i) => {
                    const slideComments = (allComments[s.n] || []).filter(c => !c.resolved);
                    return (
                    <Box key={i} css={s.style} hover="background:var(--s1)" onClick={s.pick}>
                      <div style={S('display:flex;align-items:center;gap:9px;margin-bottom:7px')}>
                        <span style={S('font:700 10px/1 var(--mono);color:var(--faint)')}>{s.num}</span>
                        <span style={S(s.dot)} />
                        <span style={merge('font:600 9px/1 Archivo;letter-spacing:0.1em', s.stColor)}>{s.st}</span>
                        {isSentBack && slideComments.length > 0 && (
                          <span style={S(`margin-left:auto;background:${sentBackColor};color:${sentBackColor === 'var(--warn)' ? '#000' : '#fff'};font:700 9px/1 Archivo;padding:2px 5px`)}>{slideComments.length}</span>
                        )}
                      </div>
                      <div style={S(s.titleStyle)}>{s.title}</div>
                      <div style={S(s.thumb)} />
                    </Box>
                    );
                  })}
                </div>

                {/* slide canvas */}
                <div style={S('overflow-y:auto;min-width:0;display:flex;flex-direction:column')}>
                  <div style={S('flex:1;padding:28px 34px 20px')}>
                    <div style={S('font:600 10px/1 var(--mono);color:var(--faint);margin-bottom:12px')}>
                      SLIDE {v.activeNum} / 40 · {v.activeLayout}
                    </div>
                    <Box
                      as="input"
                      value={v.activeTitle}
                      onChange={v.onTitle}
                      css="width:100%;background:transparent;border:0;border-bottom:2px solid var(--rule2);padding:0 0 12px;font-size:25px;font-weight:800;letter-spacing:-0.025em;margin-bottom:26px"
                      hover="border-color:var(--acc)"
                    />
                    {v.blocks.map((b, i) => (
                      <Box key={i} css={b.style} hover="border-color:var(--rule2)" onClick={b.select}>
                        <div style={S('display:flex;align-items:center;gap:10px;margin-bottom:10px')}>
                          <span style={S('font:600 9px/1 Archivo;letter-spacing:0.12em;color:var(--faint)')}>{b.kind}</span>
                          {b.flagged && (
                            <span style={S('display:inline-flex;align-items:center;gap:6px;color:var(--warn);font:600 10px/1 Archivo;letter-spacing:0.08em')}>
                              <span style={S('width:0;height:0;border-left:6px solid var(--warn);border-top:4px solid transparent;border-bottom:4px solid transparent')} />
                              {b.flagType}
                            </span>
                          )}
                          <span style={S('margin-left:auto;display:flex;gap:12px;font-size:11px;color:var(--faint)')}>
                            <Box as="span" css="cursor:pointer" hover="color:var(--acc)">edit</Box>
                            <Box as="span" css="cursor:pointer" hover="color:var(--acc)">note</Box>
                            <Box as="span" css="cursor:pointer" hover="color:var(--acc)">delete</Box>
                          </span>
                        </div>
                        <div style={S('font-size:14.5px;line-height:1.6;text-wrap:pretty')}>{b.text}</div>
                        {b.flagged && (
                          <div style={S('margin-top:11px;padding:9px 12px;background:rgba(207,154,43,.1);border-left:2px solid var(--warn);color:var(--warn);font-size:11.5px;line-height:1.5')}>
                            {b.flagReason}
                          </div>
                        )}
                        <div style={S('display:flex;gap:6px;margin-top:13px')}>
                          {b.cites.map((c, j) => (
                            <Box
                              key={j}
                              css="border:1px solid var(--rule);padding:3px 8px;font:600 10.5px/1.5 var(--mono);color:var(--dim);cursor:pointer"
                              hover="border-color:var(--acc);color:var(--acc)"
                              onClick={(e) => { e.stopPropagation(); c.open(); }}
                            >
                              [{c.n}]
                            </Box>
                          ))}
                        </div>
                      </Box>
                    ))}
                  </div>

                  <div style={S('border-top:2px solid var(--rule2);padding:13px 34px;display:flex;align-items:center;gap:14px;position:sticky;bottom:0;background:var(--bg)')}>
                    <Box css="border:1px solid var(--rule);padding:9px 14px;font-size:12.5px;cursor:pointer;color:var(--dim)" hover="color:var(--ink);border-color:var(--ink)" onClick={v.prevSlide}>← Previous</Box>
                    <Box css="border:1px solid var(--rule);padding:9px 14px;font-size:12.5px;cursor:pointer;color:var(--dim)" hover="color:var(--ink);border-color:var(--ink)" onClick={v.nextSlide}>Next →</Box>
                    <Box css="margin-left:auto;background:var(--ok);color:#0d0f0d;font-weight:700;padding:10px 18px;font-size:12.5px;cursor:pointer" hover="opacity:0.85" onClick={v.approveSlide}>Approve This Slide</Box>
                  </div>
                </div>

                {/* edit / instruct / reviewer-comments panel */}
                <div style={S('border-left:2px solid var(--rule2);background:var(--s1);overflow-y:auto;display:flex;flex-direction:column')}>
                  <div style={S(`display:grid;grid-template-columns:${isSentBack ? '1fr 1fr 1fr' : '1fr 1fr'};border-bottom:2px solid var(--rule2)`)}>
                    <div style={S(v.tabEditStyle)} onClick={v.tabEdit}>Direct Edit</div>
                    <div style={S(v.tabInstrStyle)} onClick={v.tabInstr}>Instruction</div>
                    {isSentBack && (
                      <div
                        style={S(`padding:13px 10px;text-align:center;font:600 10px/1 Archivo;letter-spacing:0.08em;cursor:pointer;position:relative;background:${v.tab === 'comments' ? 'var(--s2)' : 'transparent'};color:${v.tab === 'comments' ? sentBackColor : 'var(--dim)'};border-bottom:${v.tab === 'comments' ? `2px solid ${sentBackColor}` : '2px solid transparent'}`)}
                        onClick={() => this.setState({ tab: 'comments' })}
                      >
                        Reviewer Comments
                        {activeComments.filter(c => !c.resolved).length > 0 && (
                          <span style={S(`position:absolute;top:6px;right:6px;background:${sentBackColor};color:${sentBackColor === 'var(--warn)' ? '#000' : '#fff'};font:700 8px/1 Archivo;padding:2px 4px`)}>{activeComments.filter(c => !c.resolved).length}</span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* reviewer comments tab content */}
                  {isSentBack && v.tab === 'comments' && (
                    <div style={S('padding:16px 18px;flex:1')}>
                      <div style={S('font:600 9.5px/1 Archivo;letter-spacing:0.13em;color:var(--faint);margin-bottom:12px')}>
                        {sentBackBy.toUpperCase()} COMMENTS · SLIDE {v.slides[v.slideIdx]?.n}
                      </div>
                      {activeComments.length === 0 ? (
                        <div style={S('color:var(--ok);font-size:13px;padding:18px 0;text-align:center')}>
                          ✓ No comments on this slide
                        </div>
                      ) : activeComments.map((c) => (
                        <div key={c.id} style={S(`margin-bottom:14px;border:1px solid ${c.resolved ? 'var(--rule)' : sentBackColor};padding:13px;background:${c.resolved ? 'transparent' : 'rgba(207,154,43,0.04)'}`)}>
                          <div style={S('display:flex;align-items:center;gap:8px;margin-bottom:8px')}>
                            <div style={S(`width:20px;height:20px;border-radius:50%;background:${sentBackColor};color:${sentBackColor === 'var(--warn)' ? '#000' : '#fff'};font:700 10px/20px Archivo;text-align:center;flex:none`)}>{c.id}</div>
                            <div style={S('font-weight:600;font-size:12px')}>{c.author}</div>
                            <div style={S('margin-left:auto;color:var(--faint);font-size:11px')}>{c.time}</div>
                          </div>
                          <div style={S('font-size:12.5px;line-height:1.55;color:var(--ink);margin-bottom:10px')}>{c.text}</div>
                          {c.resolved
                            ? <div style={S('font:600 9.5px/1 Archivo;letter-spacing:0.1em;color:var(--ok)')}>✓ ADDRESSED</div>
                            : (
                              <div style={S('display:flex;gap:7px')}>
                                <Box
                                  css={`flex:1;border:1px solid ${sentBackColor};padding:6px 10px;text-align:center;cursor:pointer;color:${sentBackColor};font:600 10px/1 Archivo`}
                                  hover={`background:${sentBackColor};color:${sentBackColor === 'var(--warn)' ? '#000' : '#fff'}`}
                                  onClick={() => v.resolvePin(v.pptStatus === 'sci-rejected' ? 'sci' : 'ma', v.slides[v.slideIdx]?.n, c.id)}
                                >Mark Addressed</Box>
                                <Box
                                  css="border:1px solid var(--rule);padding:6px 10px;cursor:pointer;color:var(--dim);font:600 10px/1 Archivo"
                                  hover="color:var(--ink)"
                                  onClick={() => { this.setState({ tab: 'instr', instr: `Address reviewer comment: "${c.text}"` }); }}
                                >Fix with AI</Box>
                              </div>
                            )
                          }
                        </div>
                      ))}

                      {/* overview of all slides */}
                      <div style={S('margin-top:20px;padding-top:16px;border-top:1px solid var(--rule)')}>
                        <div style={S('font:600 9.5px/1 Archivo;letter-spacing:0.13em;color:var(--faint);margin-bottom:10px')}>ALL SLIDES OVERVIEW</div>
                        {v.slides.map((sl) => {
                          const slComments = (allComments[sl.n] || []);
                          const open = slComments.filter(c => !c.resolved).length;
                          const done = slComments.filter(c => c.resolved).length;
                          if (slComments.length === 0) return null;
                          return (
                            <div key={sl.n} style={S('display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--rule)')}>
                              <div style={S('font:700 10px/1 var(--mono);color:var(--faint);flex:none;width:20px')}>S{sl.n}</div>
                              <div style={S('font-size:12px;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--dim)')}>{sl.title}</div>
                              {open > 0 && <span style={S(`background:${sentBackColor};color:${sentBackColor === 'var(--warn)' ? '#000' : '#fff'};font:700 8.5px/1 Archivo;padding:2px 5px`)}>{open} open</span>}
                              {done > 0 && <span style={S('background:var(--s2);color:var(--ok);font:700 8.5px/1 Archivo;padding:2px 5px')}>{done} done</span>}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}


                  {v.isTabEdit && (
                    <div style={S('padding:18px 20px;border-bottom:1px solid var(--rule)')}>
                      <div style={S('font:600 9.5px/1 Archivo;letter-spacing:0.13em;color:var(--faint);margin-bottom:11px')}>SELECTED BLOCK · {v.selLabel}</div>
                      <textarea value={v.editDraft} onChange={v.onEditDraft} style={S('width:100%;height:172px;background:var(--bg);border:1px solid var(--rule);padding:13px;font-size:13px;line-height:1.6;resize:vertical')} />
                      <Box css="background:var(--acc);color:#fff;font-weight:700;padding:11px 15px;font-size:12.5px;cursor:pointer;margin-top:12px" hover="background:#dd2b0f" onClick={v.saveEdit}>Save Changes</Box>
                    </div>
                  )}

                  {v.isTabInstr && (
                    <div style={S('padding:18px 20px;border-bottom:1px solid var(--rule)')}>
                      <div style={S('font:600 9.5px/1 Archivo;letter-spacing:0.13em;color:var(--faint);margin-bottom:11px')}>INSTRUCT THE AGENT</div>
                      <textarea value={v.instr} onChange={v.onInstr} placeholder="Tell the AI what to change..." style={S('width:100%;height:96px;background:var(--bg);border:1px solid var(--rule);padding:13px;font-size:13px;line-height:1.6;resize:vertical')} />
                      <div style={S('margin:14px 0 10px;font:600 9.5px/1 Archivo;letter-spacing:0.13em;color:var(--faint)')}>EXAMPLES</div>
                      {v.examples.map((e, i) => (
                        <Box key={i} css="border:1px solid var(--rule);padding:9px 11px;font-size:11.5px;color:var(--dim);cursor:pointer;margin-bottom:7px;line-height:1.45" hover="border-color:var(--acc);color:var(--ink)" onClick={e.use}>
                          {e.text}
                        </Box>
                      ))}
                      <Box css="background:var(--acc);color:#fff;font-weight:700;padding:11px 15px;font-size:12.5px;cursor:pointer;margin-top:8px;display:flex;align-items:center" hover="background:#dd2b0f" onClick={v.sendAI}>
                        <span>Send to AI</span><span style={S('margin-left:auto')}>→</span>
                      </Box>
                    </div>
                  )}

                  <div style={S('padding:18px 20px')}>
                    <div style={S('font:600 9.5px/1 Archivo;letter-spacing:0.13em;color:var(--faint);margin-bottom:14px')}>REVISION HISTORY · THIS SLIDE</div>
                    {v.history.map((h, i) => (
                      <div key={i} style={S('display:flex;gap:11px;padding-bottom:15px')}>
                        <div style={merge('flex:none;width:6px;height:6px;margin-top:5px', h.dot)} />
                        <div style={S('min-width:0')}>
                          <div style={S('font-size:12px;line-height:1.45')}>{h.text}</div>
                          <div style={S('color:var(--faint);font:10.5px/1 var(--mono);margin-top:5px')}>{h.meta}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* citation drawer */}
              {v.citOpen && (
                <div onClick={v.closeCit} style={S('position:absolute;inset:0;background:rgba(10,9,9,.55);display:flex;justify-content:flex-end;animation:rise 0.16s ease')}>
                  <div onClick={(e) => e.stopPropagation()} style={S('width:452px;background:var(--bg);border-left:2px solid var(--acc);padding:26px 28px;overflow-y:auto')}>
                    <div style={S('display:flex;justify-content:space-between;align-items:center;margin-bottom:22px')}>
                      <div style={S('font:700 13px/1 var(--mono);color:var(--acc)')}>SOURCE [{v.cit.n}]</div>
                      <div onClick={v.closeCit} style={S('color:var(--faint);cursor:pointer;font-size:16px')}>×</div>
                    </div>
                    <div style={S('display:flex;gap:9px;align-items:center;margin-bottom:14px')}>
                      <span style={S(v.cit.badge)}>{v.cit.type}</span>
                      <span style={S('font:600 11px/1 var(--mono);color:var(--faint)')}>{v.cit.year}</span>
                    </div>
                    <div style={S('font-size:18px;font-weight:700;letter-spacing:-0.02em;line-height:1.3;margin-bottom:8px')}>{v.cit.title}</div>
                    <div style={S('color:var(--dim);font-size:12.5px;margin-bottom:22px')}>{v.cit.src}</div>
                    <div style={S('border-top:2px solid var(--rule2);padding-top:18px;font:600 9.5px/1 Archivo;letter-spacing:0.13em;color:var(--faint);margin-bottom:12px')}>RETRIEVED SNIPPET</div>
                    <div style={S('border-left:2px solid var(--rule2);padding-left:15px;font-size:13.5px;line-height:1.65;color:var(--dim)')}>{v.cit.snippet}</div>
                    <div style={S('display:flex;gap:26px;margin-top:26px;padding-top:18px;border-top:1px solid var(--rule)')}>
                      <div>
                        <div style={S('font:600 9.5px/1 Archivo;letter-spacing:0.13em;color:var(--faint);margin-bottom:7px')}>ENTAILMENT</div>
                        <div style={S('font:700 14px/1 var(--mono);color:var(--ok)')}>{v.cit.entail}</div>
                      </div>
                      <div>
                        <div style={S('font:600 9.5px/1 Archivo;letter-spacing:0.13em;color:var(--faint);margin-bottom:7px')}>CHUNK ID</div>
                        <div style={S('font:700 14px/1 var(--mono);color:var(--dim)')}>{v.cit.chunk}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            );
          })()}

          {/* ============ 6 · REVISION DIFF ============ */}
          {v.isDiff && (
            <div style={S('padding:34px 40px 50px;max-width:1180px')}>
              <div style={merge(kicker, 'margin-bottom:12px')}>REVISION · SLIDE {v.activeNum} · BLOCK {v.selLabel}</div>
              <h1 style={S('font-size:25px;font-weight:800;letter-spacing:-0.025em;margin:0 0 8px')}>AI returned a revision</h1>
              <div style={S('color:var(--dim);margin-bottom:26px')}>Instruction: “{v.diffInstr}”</div>

              <div style={S('display:grid;grid-template-columns:1fr 1fr;border-top:2px solid var(--rule2);border-bottom:2px solid var(--rule2)')}>
                <div style={S('padding:20px 24px 24px;border-right:1px solid var(--rule)')}>
                  <div style={S('font:600 9.5px/1 Archivo;letter-spacing:0.13em;color:var(--faint);margin-bottom:14px')}>PREVIOUS VERSION</div>
                  <div style={S('font-size:14.5px;line-height:1.65')}>
                    {v.diffLeft.map((p, i) => <span key={i} style={S(p.style)}>{p.text}</span>)}
                  </div>
                </div>
                <div style={S('padding:20px 24px 24px;background:var(--s1)')}>
                  <div style={S('font:600 9.5px/1 Archivo;letter-spacing:0.13em;color:var(--ok);margin-bottom:14px')}>AI REVISED VERSION</div>
                  <div style={S('font-size:14.5px;line-height:1.65')}>
                    {v.diffRight.map((p, i) => <span key={i} style={S(p.style)}>{p.text}</span>)}
                  </div>
                </div>
              </div>

              <div style={S('display:grid;grid-template-columns:1fr 300px;gap:0;border-bottom:2px solid var(--rule2)')}>
                <div style={S('padding:22px 24px;border-right:1px solid var(--rule)')}>
                  <div style={S('font:600 9.5px/1 Archivo;letter-spacing:0.13em;color:var(--faint);margin-bottom:12px')}>WHAT CHANGED</div>
                  <div style={S('font-size:13.5px;line-height:1.6;color:var(--dim);max-width:74ch')}>{v.diffWhy}</div>
                </div>
                <div style={S('padding:22px 24px')}>
                  <div style={S('font:600 9.5px/1 Archivo;letter-spacing:0.13em;color:var(--faint);margin-bottom:12px')}>RE-VALIDATION</div>
                  <div style={S('display:flex;align-items:center;gap:10px;margin-bottom:10px')}>
                    <span style={S('border:2px solid var(--ok);color:var(--ok);padding:5px 10px;font:800 11px/1 Archivo;letter-spacing:0.08em')}>PASS</span>
                    <span style={S('color:var(--dim);font-size:12px')}>3 checks, 2 new citations</span>
                  </div>
                  <div style={S('color:var(--faint);font:11px/1.7 var(--mono)')}>grounding ✓ · entailment ✓ · numeric ✓</div>
                </div>
              </div>

              <div style={S('display:flex;gap:12px;margin-top:26px;align-items:center')}>
                <Box css="background:var(--ok);color:#0d0f0d;font-weight:700;padding:15px 22px;cursor:pointer;min-width:230px;display:flex;align-items:center" hover="opacity:0.85" onClick={v.acceptDiff}>
                  <span>Accept Changes</span><span style={S('margin-left:auto')}>✓</span>
                </Box>
                <Box css="border:1px solid var(--rule2);padding:15px 22px;cursor:pointer;color:var(--dim)" hover="color:var(--acc);border-color:var(--acc)" onClick={v.rejectDiff}>
                  Reject &amp; Try Again
                </Box>
                {['ma-rejected','sci-rejected'].includes(v.pptStatus) && (
                  <Box
                    css="margin-left:auto;background:var(--warn);color:#000;font-weight:700;padding:15px 22px;cursor:pointer;display:flex;align-items:center;gap:12px"
                    hover="opacity:0.88"
                    onClick={v.doResubmitToMA}
                  >
                    <span>Accept &amp; Re-submit to {v.pptStatus === 'sci-rejected' ? 'Sci' : 'MA'}</span><span>→</span>
                  </Box>
                )}
              </div>
            </div>
          )}

          {/* ============ 7 · RENDERING ============ */}
          {v.isRender && (
            <div style={S('padding:34px 40px 50px;display:flex;flex-direction:column;min-height:100%')}>
              <div style={S('display:flex;justify-content:space-between;align-items:baseline;padding-bottom:24px;border-bottom:2px solid var(--rule2)')}>
                <div>
                  <div style={merge(kicker, 'margin-bottom:11px')}>PRESENTATION RENDERING</div>
                  <h1 style={S('font-size:26px;font-weight:800;letter-spacing:-0.025em;margin:0')}>Building your presentation…</h1>
                </div>
                <div style={S('text-align:right')}>
                  <div style={S('font:700 20px/1 var(--mono);color:var(--acc)')}>{v.renderPct}</div>
                  <div style={S('color:var(--faint);font-size:11.5px;margin-top:6px')}>{v.renderEta}</div>
                </div>
              </div>

              <div style={S('display:grid;grid-template-columns:390px 1fr;flex:1;min-height:0')}>
                <div style={S('border-right:2px solid var(--rule2);padding:22px 26px 22px 0')}>
                  {v.renderSteps.map((r, i) => (
                    <div key={i} style={S(r.style)}>
                      <span style={S(r.icon)}>{r.glyph}</span>
                      <div style={S('min-width:0')}>
                        <div style={S(r.label)}>{r.name}</div>
                        <div style={S('color:var(--faint);font:10.5px/1.5 var(--mono);margin-top:4px')}>{r.note}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={S('padding:22px 0 22px 30px')}>
                  <div style={S('font:600 9.5px/1 Archivo;letter-spacing:0.13em;color:var(--faint);margin-bottom:16px')}>ASSEMBLY PREVIEW · {v.builtLabel}</div>
                  <div style={S('display:grid;grid-template-columns:repeat(5,1fr);gap:12px')}>
                    {v.tiles.map((t, i) => (
                      <div key={i} style={S(t.style)}>
                        <div style={S(t.bar1)} /><div style={S(t.bar2)} /><div style={S(t.bar3)} />
                        <div style={S('position:absolute;bottom:5px;right:6px;font:700 8px/1 var(--mono);color:var(--faint)')}>{t.n}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div style={S('border-top:2px solid var(--rule2);padding-top:16px;display:flex;align-items:center;gap:20px')}>
                <div style={S('flex:1;height:3px;background:var(--s2)')}><div style={S(v.renderBar)} /></div>
                <Box css="font-size:11.5px;color:var(--faint);cursor:pointer;flex:none" hover="color:var(--acc)" onClick={v.goDeliver}>skip to delivery →</Box>
              </div>
            </div>
          )}

          {/* ============ 8 · DELIVERY ============ */}
          {v.isDeliver && (
            <div style={S('padding:34px 40px 60px;max-width:1180px')}>
              <div style={S('display:flex;justify-content:space-between;align-items:flex-end;gap:30px;padding-bottom:26px;border-bottom:2px solid var(--rule2)')}>
                <div>
                  <div style={S('font:600 10px/1 Archivo;letter-spacing:0.16em;color:var(--ok);margin-bottom:12px')}>DELIVERY · RUN #2418 COMPLETE</div>
                  <h1 style={S('font-size:34px;font-weight:800;letter-spacing:-0.03em;margin:0 0 8px')}>Your deck is ready</h1>
                  <div style={S('color:var(--dim)')}>Approved by Munal Sharma at 14:26 · integrity gate verified against the approved content hash.</div>
                </div>
              </div>

              <div style={S('display:grid;grid-template-columns:1fr 340px;gap:0;border-bottom:2px solid var(--rule2)')}>
                <div style={S('padding:26px 30px 26px 0;border-right:1px solid var(--rule)')}>
                  <div style={S('background:var(--s1);border:1px solid var(--rule);aspect-ratio:16/9;padding:38px 42px;display:flex;flex-direction:column;justify-content:space-between')}>
                    <div style={S('display:flex;align-items:center;gap:10px')}>
                      <div style={S('width:12px;height:12px;background:var(--acc)')} />
                      <div style={S('font:600 9.5px/1 Archivo;letter-spacing:0.16em;color:var(--dim)')}>MEDICAL AFFAIRS · SCIENTIFIC EXCHANGE</div>
                    </div>
                    <div>
                      <div style={S('font-size:40px;font-weight:800;letter-spacing:-0.035em;line-height:1.05;max-width:22ch')}>{v.topic}</div>
                      <div style={S('color:var(--dim);margin-top:16px;font-size:14px')}>45-minute HCP presentation · EU (EMA) compliance ruleset</div>
                    </div>
                    <div style={S('display:flex;justify-content:space-between;color:var(--faint);font:10.5px/1 var(--mono)')}>
                      <span>v1.0 · 2 SEP 2026</span><span>SLIDE 1 / 40</span>
                    </div>
                  </div>
                </div>

                <div style={S('padding:26px 0 26px 30px;display:flex;flex-direction:column;gap:10px')}>
                  <div style={S('font:600 9.5px/1 Archivo;letter-spacing:0.13em;color:var(--faint);margin-bottom:4px')}>EXPORT</div>
                  <Box css="background:var(--acc);color:#fff;font-weight:700;padding:14px 16px;cursor:pointer;display:flex;align-items:center" hover="background:#dd2b0f">
                    <span>Download .pptx</span><span style={S('margin-left:auto')}>↓</span>
                  </Box>
                  <Box css="border:1px solid var(--rule2);padding:14px 16px;cursor:pointer;display:flex;align-items:center;color:var(--dim)" hover="color:var(--ink);border-color:var(--ink)">
                    <span>Download Reference Pack</span><span style={S('margin-left:auto')}>↓</span>
                  </Box>
                  <Box css="border:1px solid var(--rule);padding:14px 16px;cursor:pointer;display:flex;align-items:center;color:var(--dim)" hover="color:var(--ink);border-color:var(--ink)">
                    <span>View Audit Log</span><span style={S('margin-left:auto')}>→</span>
                  </Box>
                  <div style={S('margin-top:16px;padding-top:16px;border-top:1px solid var(--rule);font:600 9.5px/1 Archivo;letter-spacing:0.13em;color:var(--faint);margin-bottom:4px')}>SHARE</div>
                  <div style={S('display:flex;gap:8px;flex-wrap:wrap')}>
                    {['Copy link', 'SharePoint', 'Google Drive'].map((s) => (
                      <Box key={s} css="border:1px solid var(--rule);padding:9px 12px;font-size:11.5px;color:var(--dim);cursor:pointer" hover="border-color:var(--acc);color:var(--acc)">{s}</Box>
                    ))}
                  </div>
                </div>
              </div>

              <div style={S('display:grid;grid-template-columns:repeat(5,1fr);border-bottom:2px solid var(--rule2)')}>
                {v.deliverStats.map((s, i) => (
                  <div key={i} style={S(s.style)}>
                    <div style={S(s.numStyle)}>{s.value}</div>
                    <div style={S('font:600 9.5px/1.4 Archivo;letter-spacing:0.13em;color:var(--faint);margin-top:10px')}>{s.label}</div>
                  </div>
                ))}
              </div>

              <div style={S('padding:26px 0 12px;display:flex;align-items:baseline;gap:14px')}>
                <h2 style={S('font-size:13px;font-weight:700;letter-spacing:0.1em;margin:0')}>AUDIT LOG</h2>
                <span style={S('color:var(--faint);font-size:12px')}>48 events · showing 7</span>
              </div>
              <div style={S('border-top:2px solid var(--rule2);max-height:290px;overflow-y:auto')}>
                {v.audit.map((a, i) => (
                  <div key={i} style={S('display:grid;grid-template-columns:96px 130px 1fr 130px;gap:20px;align-items:baseline;padding:13px 0;border-bottom:1px solid var(--rule);font-size:12.5px')}>
                    <div style={S('font:11px/1 var(--mono);color:var(--faint)')}>{a.time}</div>
                    <div style={S('font-weight:600')}>{a.who}</div>
                    <div style={S('color:var(--dim);line-height:1.45')}>{a.what}</div>
                    <div style={S(a.tag)}>{a.result}</div>
                  </div>
                ))}
              </div>

              <div style={S('margin-top:22px;padding:16px 18px;background:var(--s1);border-left:2px solid var(--ok);font:11.5px/1.7 var(--mono);color:var(--dim);word-break:break-all')}>
                FINAL CONTENT HASH · sha256:9f2c41ab7de0c8551f6b3a94e77d20c1b8e5a6f30d94c72be1f8a05c6d3e4471
              </div>
            </div>
          )}

          {/* ============ MA DASHBOARD ============ */}
          {v.isMaDash && (() => {
            const stats = [
              { label: 'PENDING REVIEW', value: v.maInbox.filter(r => r.live && r.status === 'sent-to-ma').length, delta: '+1 this week', color: 'var(--warn)' },
              { label: 'APPROVED THIS MONTH', value: 4, delta: '+1 vs last month', color: 'var(--ok)' },
              { label: 'SENT BACK', value: 2, delta: 'avg 1.4 days to resubmit', color: 'var(--acc)' },
            ];
            return (
              <div style={S('padding:34px 40px;min-height:100%')}>
                <div style={merge(kicker, 'margin-bottom:14px')}>MEDICAL AFFAIRS REVIEW HUB</div>
                <h1 style={S('font-size:30px;font-weight:800;letter-spacing:-0.03em;margin:0 0 8px')}>Welcome back, Dr. Priya</h1>
                <div style={S('color:var(--dim);margin-bottom:34px')}>Your review queue for September 2026.</div>

                <div style={S('display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:34px')}>
                  {stats.map((s, i) => (
                    <div key={i} style={S('border:1px solid var(--rule);padding:22px 24px;background:var(--s1)')}>
                      <div style={S(`font:600 9.5px/1 Archivo;letter-spacing:0.14em;color:${s.color};margin-bottom:14px`)}>{s.label}</div>
                      <div style={S('font-size:34px;font-weight:800;letter-spacing:-0.03em;margin-bottom:6px')}>{s.value}</div>
                      <div style={S('color:var(--faint);font-size:12px')}>{s.delta}</div>
                    </div>
                  ))}
                </div>

                <div style={S('font:700 11px/1 Archivo;letter-spacing:0.14em;color:var(--faint);margin-bottom:14px')}>REVIEW INBOX</div>
                <div style={S('border:1px solid var(--rule);overflow:hidden')}>
                  <div style={S('display:grid;grid-template-columns:1fr 160px 140px 130px 140px;border-bottom:1px solid var(--rule);padding:10px 18px;background:var(--s1)')}>
                    {['DECK TITLE', 'SUBMITTED BY', 'DATE', 'STATUS', ''].map((h, i) => (
                      <div key={i} style={S('font:600 9.5px/1 Archivo;letter-spacing:0.12em;color:var(--faint)')}>{h}</div>
                    ))}
                  </div>
                  {v.maInbox.map((row, i) => (
                    <div key={i} style={S(`display:grid;grid-template-columns:1fr 160px 140px 130px 140px;padding:14px 18px;border-bottom:1px solid var(--rule);background:${row.live ? 'var(--s1)' : 'transparent'};align-items:center`)}>
                      <div>
                        <div style={S('font-weight:600;font-size:13px;margin-bottom:2px')}>{row.topic}</div>
                        {row.live && row.status === 'sent-to-ma' && <div style={S('font:600 9.5px/1 Archivo;letter-spacing:0.12em;color:var(--warn)')}>● AWAITING YOUR REVIEW</div>}
                      </div>
                      <div style={S('color:var(--dim);font-size:12.5px')}>{row.by}</div>
                      <div style={S('color:var(--dim);font-size:12.5px')}>{row.date}</div>
                      <div style={S(`display:inline-flex;align-items:center;gap:6px;font:600 11px/1 Archivo;padding:4px 10px;width:fit-content;background:${row.statusLabel === 'Pending Review' ? '#2b2200' : row.statusLabel === 'Approved' ? '#0d2b1f' : '#2b0d0d'};color:${row.statusLabel === 'Pending Review' ? 'var(--warn)' : row.statusLabel === 'Approved' ? 'var(--ok)' : 'var(--acc)'}`)}>
                        <span style={S('width:5px;height:5px;border-radius:50%;background:currentColor')} />{row.statusLabel}
                      </div>
                      <div>
                        {row.live && row.status === 'sent-to-ma' && (
                          <Box css="background:var(--warn);color:#000;font-weight:700;font-size:12px;padding:9px 14px;cursor:pointer;display:flex;align-items:center;gap:8px" hover="opacity:0.85" onClick={() => this.go('ma-review')}>
                            Open Review →
                          </Box>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* ============ MA REVIEW SCREEN ============ */}
          {v.isMAReview && (() => {
            const slideData = v.slides;
            const currentSlide = slideData.find(s => s.n === v.currentSlideNum) || slideData[0];
            const currentComments = v.maCurrentComments;
            return (
              <div style={S('display:flex;flex-direction:column;height:100%;overflow:hidden')}>
                {/* header */}
                <div style={S('padding:14px 22px;border-bottom:2px solid var(--rule2);display:flex;align-items:center;gap:18px;flex:none')}>
                  <div style={S('flex:1;min-width:0')}>
                    <div style={S('font:600 9.5px/1 Archivo;letter-spacing:0.14em;color:var(--warn);margin-bottom:5px')}>MEDICAL AFFAIRS REVIEW</div>
                    <div style={S('font-weight:700;font-size:15px;letter-spacing:-0.02em;overflow:hidden;text-overflow:ellipsis;white-space:nowrap')}>{v.topic}</div>
                  </div>
                  <div style={S('display:flex;gap:10px;align-items:center')}>
                    <Box
                      css="border:1px solid var(--rule2);padding:10px 18px;cursor:pointer;color:var(--dim);font-weight:600;font-size:13px"
                      hover="color:var(--ink);border-color:var(--ink)"
                      onClick={v.openSendBack}
                    >Send Back with Comments</Box>
                    <Box
                      css="background:var(--warn);color:#000;font-weight:700;padding:11px 18px;cursor:pointer;font-size:13px;display:flex;align-items:center;gap:10px"
                      hover="opacity:0.88"
                      onClick={v.doMAApprove}
                    >
                      Approve & Pass to Sci Review →
                    </Box>
                  </div>
                </div>

                {/* three-column body */}
                <div style={S('flex:1;display:flex;overflow:hidden')}>

                  {/* left — slide rail */}
                  <div style={S('width:168px;flex:none;border-right:1px solid var(--rule);overflow-y:auto;padding:12px 8px')}>
                    {slideData.map((sl, i) => {
                      const sNum = i + 1;
                      const hasPins = (v.maAllComments[sNum] || []).filter(c => !c.resolved).length;
                      return (
                        <div
                          key={i}
                          style={S(`margin-bottom:8px;cursor:pointer;border:2px solid ${v.currentSlideNum === sNum ? 'var(--warn)' : 'transparent'};padding:2px;position:relative`)}
                          onClick={() => v.pickSlideN(sNum)}
                        >
                          <div style={S('background:var(--s2);aspect-ratio:16/9;padding:6px 8px;position:relative')}>
                            <div style={S('font:700 6px/1 Archivo;color:var(--acc);letter-spacing:0.1em;margin-bottom:4px')}>SLIDE {sNum}</div>
                            <div style={S('font-size:6.5px;font-weight:700;line-height:1.3;color:var(--ink)')}>{sl.title}</div>
                          </div>
                          {hasPins > 0 && <div style={S('position:absolute;top:4px;right:4px;background:var(--warn);color:#000;font:700 9px/1 Archivo;padding:2px 5px')}>{hasPins}</div>}
                        </div>
                      );
                    })}
                  </div>

                  {/* center — canvas */}
                  <div style={S('flex:1;min-width:0;overflow:auto;display:flex;align-items:flex-start;justify-content:center;padding:28px;background:#0c0b0a')}>
                    <div style={S('width:100%;max-width:800px')}>
                      <div style={S('font:600 10px/1 Archivo;letter-spacing:0.14em;color:var(--faint);margin-bottom:12px;text-align:center')}>
                        SLIDE {v.currentSlideNum} OF {slideData.length} · CLICK ANYWHERE TO ADD A COMMENT
                      </div>
                      <div
                        style={S('aspect-ratio:16/9;background:var(--s2);position:relative;cursor:crosshair;border:1px solid var(--rule)')}
                        onClick={(e) => v.onSlideCanvasClick(e, v.currentSlideNum, 'ma')}
                      >
                        {/* slide content */}
                        <div style={S('position:absolute;inset:0;padding:24px 28px;display:flex;flex-direction:column')}>
                          <div style={S('font:700 10px/1 Archivo;letter-spacing:0.12em;color:var(--acc);margin-bottom:10px')}>SLIDE {v.currentSlideNum}</div>
                          <div style={S('font-size:18px;font-weight:800;letter-spacing:-0.02em;margin-bottom:12px;line-height:1.2')}>{currentSlide.title}</div>
                          {currentSlide.bullets && currentSlide.bullets.map((b, bi) => (
                            <div key={bi} style={S('display:flex;gap:8px;align-items:flex-start;margin-bottom:6px')}>
                              <div style={S('width:5px;height:5px;background:var(--acc);flex:none;margin-top:5px')} />
                              <div style={S('font-size:12px;line-height:1.5;color:var(--dim)')}>{b}</div>
                            </div>
                          ))}
                        </div>

                        {/* existing comment pins */}
                        {currentComments.map((pin) => !pin.resolved && (
                          <div
                            key={pin.id}
                            style={S(`position:absolute;left:${pin.x}%;top:${pin.y}%;transform:translate(-50%,-50%);z-index:10;cursor:pointer`)}
                            onClick={(e) => { e.stopPropagation(); v.setOpenPin(v.currentSlideNum, pin.id, 'ma'); }}
                          >
                            <div style={S('width:22px;height:22px;border-radius:50%;background:var(--warn);color:#000;font:700 11px/22px Archivo;text-align:center;box-shadow:0 2px 8px rgba(0,0,0,0.6)')}>
                              {pin.id}
                            </div>
                          </div>
                        ))}

                        {/* pending pin pulse */}
                        {v.pendingPin && v.pendingPin.slideNum === v.currentSlideNum && (
                          <div style={S(`position:absolute;left:${v.pendingPin.x}%;top:${v.pendingPin.y}%;transform:translate(-50%,-50%);z-index:10`)}
                               onClick={(e) => e.stopPropagation()}>
                            <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--warn)', opacity: 0.7, animation: 'puls 1s infinite', border: '2px solid var(--warn)' }} />
                          </div>
                        )}

                        {/* open pin popup */}
                        {v.openPinData && v.openPin && v.openPin.slideNum === v.currentSlideNum && v.openPin.role === 'ma' && (
                          <div
                            style={S(`position:absolute;left:${v.openPinData.x}%;top:${v.openPinData.y}%;z-index:20;transform:translate(${v.openPinData.x > 70 ? '-105%' : '12px'},${v.openPinData.y > 70 ? '-105%' : '0%'})`)}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div style={S('background:var(--bg);border:1px solid var(--warn);padding:14px;min-width:240px;max-width:280px;box-shadow:0 4px 18px rgba(0,0,0,0.7)')}>
                              <div style={S('display:flex;align-items:center;gap:8px;margin-bottom:10px')}>
                                <div style={S('width:20px;height:20px;border-radius:50%;background:var(--warn);color:#000;font:700 10px/20px Archivo;text-align:center')}>{v.openPinData.id}</div>
                                <div style={S('font:700 11px/1 Archivo;color:var(--warn)')}>{v.openPinData.author}</div>
                                <div style={S('margin-left:auto;color:var(--faint);font-size:11px')}>{v.openPinData.time}</div>
                              </div>
                              <div style={S('font-size:12.5px;line-height:1.55;color:var(--ink);margin-bottom:12px')}>{v.openPinData.text}</div>
                              <div style={S('display:flex;gap:8px')}>
                                <Box css="flex:1;border:1px solid var(--warn);padding:7px 10px;text-align:center;cursor:pointer;color:var(--warn);font:700 11px/1 Archivo" hover="background:var(--warn);color:#000" onClick={() => v.resolvePin('ma', v.currentSlideNum, v.openPinData.id)}>Resolve</Box>
                                <Box css="border:1px solid var(--rule);padding:7px 10px;cursor:pointer;color:var(--dim);font-size:12px" hover="color:var(--ink)" onClick={v.closePin}>✕</Box>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* pending pin comment box */}
                      {v.pendingPin && v.pendingPin.slideNum === v.currentSlideNum && (
                        <div style={S('margin-top:16px;border:1px solid var(--warn);padding:14px;background:var(--s1)')}>
                          <div style={S('font:700 11px/1 Archivo;letter-spacing:0.12em;color:var(--warn);margin-bottom:10px')}>ADD COMMENT AT THIS POSITION</div>
                          <textarea
                            rows={3}
                            style={S('width:100%;background:var(--bg);border:1px solid var(--rule);color:var(--ink);padding:10px;font-size:13px;resize:vertical;display:block')}
                            placeholder="Type your comment…"
                            value={v.commentDraft}
                            onChange={v.onCommentDraft}
                            onKeyDown={(e) => v.onCommentKey(e, 'ma')}
                            autoFocus
                          />
                          <div style={S('display:flex;gap:8px;margin-top:10px')}>
                            <Box css="background:var(--warn);color:#000;font-weight:700;padding:9px 16px;cursor:pointer;font-size:13px" hover="opacity:0.85" onClick={v.doAddComment}>Add Comment</Box>
                            <Box css="border:1px solid var(--rule);padding:9px 14px;cursor:pointer;color:var(--dim);font-size:13px" hover="color:var(--ink)" onClick={v.cancelPin}>Cancel</Box>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* right — comments panel */}
                  <div style={S('width:280px;flex:none;border-left:1px solid var(--rule);display:flex;flex-direction:column;overflow:hidden')}>
                    <div style={S('padding:14px 16px;border-bottom:1px solid var(--rule);flex:none')}>
                      <div style={S('font:700 9.5px/1 Archivo;letter-spacing:0.14em;color:var(--faint)')}>
                        COMMENTS · SLIDE {v.currentSlideNum} · {currentComments.length} COMMENT{currentComments.length !== 1 ? 'S' : ''}
                      </div>
                    </div>
                    <div style={S('flex:1;overflow-y:auto;padding:12px')}>
                      {currentComments.length === 0 ? (
                        <div style={S('color:var(--faint);font-size:12.5px;text-align:center;padding:24px 0')}>
                          No comments on this slide yet.<br />Click the canvas to add one.
                        </div>
                      ) : currentComments.map((c) => (
                        <div key={c.id} style={S(`margin-bottom:14px;border:1px solid ${c.resolved ? 'var(--rule)' : 'var(--warn)'};padding:12px;background:${c.resolved ? 'transparent' : 'rgba(207,154,43,0.04)'}`)}>
                          <div style={S('display:flex;align-items:center;gap:8px;margin-bottom:8px')}>
                            <div style={S('width:22px;height:22px;border-radius:50%;background:var(--warn);color:#000;font:700 10px/22px Archivo;text-align:center;flex:none')}>{c.id}</div>
                            <div style={S('font-weight:600;font-size:12px')}>{c.author}</div>
                            <div style={S('margin-left:auto;color:var(--faint);font-size:11px')}>{c.time}</div>
                          </div>
                          <div style={S('font-size:12.5px;line-height:1.55;color:var(--ink);margin-bottom:8px')}>{c.text}</div>
                          {c.resolved
                            ? <div style={S('font:600 9.5px/1 Archivo;letter-spacing:0.1em;color:var(--ok)')}>✓ RESOLVED</div>
                            : <Box css="font:600 9.5px/1 Archivo;letter-spacing:0.1em;color:var(--warn);cursor:pointer" hover="color:var(--ok)" onClick={() => v.resolvePin('ma', v.currentSlideNum, c.id)}>RESOLVE</Box>
                          }
                        </div>
                      ))}
                    </div>
                    <div style={S('padding:12px;border-top:1px solid var(--rule);flex:none')}>
                      <Box
                        css="width:100%;border:1px solid var(--warn);padding:10px;text-align:center;cursor:pointer;color:var(--warn);font:700 11px/1 Archivo"
                        hover="background:var(--warn);color:#000"
                        onClick={() => v.addCenterPin(v.currentSlideNum, 'ma')}
                      >+ Add Comment to Slide</Box>
                    </div>
                  </div>
                </div>

                {/* Send Back modal */}
                {v.sendBackOpen && (
                  <div style={S('position:fixed;inset:0;background:rgba(0,0,0,0.72);z-index:100;display:flex;align-items:center;justify-content:center')} onClick={v.closeSendBack}>
                    <div style={S('background:var(--bg);border:1px solid var(--rule2);padding:28px;width:440px')} onClick={(e) => e.stopPropagation()}>
                      <div style={S('font:700 11px/1 Archivo;letter-spacing:0.14em;color:var(--acc);margin-bottom:14px')}>SEND BACK FOR REVISION</div>
                      <div style={S('font-size:15px;font-weight:700;letter-spacing:-0.01em;margin-bottom:6px')}>Send to Content Team?</div>
                      <div style={S('color:var(--dim);font-size:13px;margin-bottom:18px')}>
                        {v.maTotalComments} comment{v.maTotalComments !== 1 ? 's' : ''} across {v.maCommentSlideCount} slide{v.maCommentSlideCount !== 1 ? 's' : ''} will be sent to Mayank Gupta.
                      </div>
                      <textarea
                        rows={3}
                        style={S('width:100%;background:var(--s1);border:1px solid var(--rule);color:var(--ink);padding:10px;font-size:13px;resize:vertical;display:block;margin-bottom:16px')}
                        placeholder="Optional message to the content team…"
                        value={v.sendBackNote}
                        onChange={(e) => this.setState({ sendBackNote: e.target.value })}
                      />
                      <div style={S('display:flex;gap:10px')}>
                        <Box css="flex:1;background:var(--acc);color:#fff;font-weight:700;padding:12px;text-align:center;cursor:pointer" hover="background:#dd2b0f" onClick={v.doMASendBack}>Send Back</Box>
                        <Box css="border:1px solid var(--rule2);padding:12px 18px;cursor:pointer;color:var(--dim)" hover="color:var(--ink)" onClick={v.closeSendBack}>Cancel</Box>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })()}

          {/* ============ SCI DASHBOARD ============ */}
          {v.isSciDash && (() => {
            const isLocked = !['ma-approved', 'sent-to-sci', 'sci-rejected', 'sci-approved'].includes(v.pptStatus);
            const stats = [
              { label: 'PENDING REVIEW', value: v.sciInbox.filter(r => r.live && r.status === 'ma-approved').length, delta: '+1 this week', color: 'var(--ok)' },
              { label: 'APPROVED THIS MONTH', value: 3, delta: '+2 vs last month', color: 'var(--ok)' },
              { label: 'SENT BACK', value: 1, delta: 'avg 2.1 days to resubmit', color: 'var(--acc)' },
            ];
            return (
              <div style={S('padding:34px 40px;min-height:100%')}>
                <div style={merge(kicker, 'margin-bottom:14px;color:var(--ok)')}>SCIENTIFIC REVIEW HUB</div>
                <h1 style={S('font-size:30px;font-weight:800;letter-spacing:-0.03em;margin:0 0 8px')}>Welcome back, Dr. Arjun</h1>
                <div style={S('color:var(--dim);margin-bottom:34px')}>Your scientific review queue for September 2026.</div>

                {isLocked && (
                  <div style={S('padding:20px 22px;background:var(--s1);border-left:3px solid var(--faint);margin-bottom:28px;display:flex;align-items:center;gap:14px')}>
                    <div style={S('font-size:22px;color:var(--faint)')}>🔒</div>
                    <div>
                      <div style={S('font-weight:700;margin-bottom:3px')}>Waiting for Medical Affairs Approval</div>
                      <div style={S('color:var(--dim);font-size:13px')}>The GLP-1 RA deck is currently under Medical Affairs review. You'll be notified once it's cleared.</div>
                    </div>
                  </div>
                )}

                <div style={S('display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:34px')}>
                  {stats.map((s, i) => (
                    <div key={i} style={S('border:1px solid var(--rule);padding:22px 24px;background:var(--s1)')}>
                      <div style={S(`font:600 9.5px/1 Archivo;letter-spacing:0.14em;color:${s.color};margin-bottom:14px`)}>{s.label}</div>
                      <div style={S('font-size:34px;font-weight:800;letter-spacing:-0.03em;margin-bottom:6px')}>{s.value}</div>
                      <div style={S('color:var(--faint);font-size:12px')}>{s.delta}</div>
                    </div>
                  ))}
                </div>

                <div style={S('font:700 11px/1 Archivo;letter-spacing:0.14em;color:var(--faint);margin-bottom:14px')}>REVIEW INBOX</div>
                <div style={S('border:1px solid var(--rule);overflow:hidden')}>
                  <div style={S('display:grid;grid-template-columns:1fr 160px 140px 130px 140px;border-bottom:1px solid var(--rule);padding:10px 18px;background:var(--s1)')}>
                    {['DECK TITLE', 'MA REVIEWER', 'DATE', 'STATUS', ''].map((h, i) => (
                      <div key={i} style={S('font:600 9.5px/1 Archivo;letter-spacing:0.12em;color:var(--faint)')}>{h}</div>
                    ))}
                  </div>
                  {v.sciInbox.map((row, i) => {
                    const locked = row.live && isLocked;
                    return (
                    <div key={i} style={S(`display:grid;grid-template-columns:1fr 160px 140px 130px 140px;padding:14px 18px;border-bottom:1px solid var(--rule);background:${row.live ? 'var(--s1)' : 'transparent'};align-items:center;opacity:${locked ? 0.5 : 1}`)}>
                      <div>
                        <div style={S('font-weight:600;font-size:13px;margin-bottom:2px')}>{row.topic}</div>
                        {row.live && !locked && <div style={S('font:600 9.5px/1 Archivo;letter-spacing:0.12em;color:var(--ok)')}>● AWAITING YOUR REVIEW</div>}
                        {locked && <div style={S('font:600 9.5px/1 Archivo;letter-spacing:0.12em;color:var(--faint)')}>🔒 PENDING MA REVIEW</div>}
                      </div>
                      <div style={S('color:var(--dim);font-size:12.5px')}>{row.by}</div>
                      <div style={S('color:var(--dim);font-size:12.5px')}>{row.date}</div>
                      <div style={S(`display:inline-flex;align-items:center;gap:6px;font:600 11px/1 Archivo;padding:4px 10px;width:fit-content;background:${row.statusLabel === 'Pending Review' ? (locked ? '#1a1a1a' : '#0d1f0d') : row.statusLabel === 'Approved' ? '#0d2b1f' : '#2b0d0d'};color:${row.statusLabel === 'Pending Review' ? (locked ? 'var(--faint)' : 'var(--ok)') : row.statusLabel === 'Approved' ? 'var(--ok)' : 'var(--acc)'}`)}>
                        <span style={S('width:5px;height:5px;border-radius:50%;background:currentColor')} />{row.statusLabel}
                      </div>
                      <div>
                        {row.live && !locked && (
                          <Box css="background:var(--ok);color:#fff;font-weight:700;font-size:12px;padding:9px 14px;cursor:pointer;display:flex;align-items:center;gap:8px" hover="opacity:0.85" onClick={() => this.go('sci-review')}>
                            Open Review →
                          </Box>
                        )}
                      </div>
                    </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}

          {/* ============ SCI REVIEW SCREEN ============ */}
          {v.isSciReview && (() => {
            const slideData = v.slides;
            const currentSlide = slideData.find(s => s.n === v.currentSlideNum) || slideData[0];
            const currentSciComments = v.sciCurrentComments;
            const currentMAComments = v.maCurrentComments;
            return (
              <div style={S('display:flex;flex-direction:column;height:100%;overflow:hidden')}>
                {/* header */}
                <div style={S('padding:14px 22px;border-bottom:2px solid var(--rule2);display:flex;align-items:center;gap:18px;flex:none')}>
                  <div style={S('flex:1;min-width:0')}>
                    <div style={S('font:600 9.5px/1 Archivo;letter-spacing:0.14em;color:var(--ok);margin-bottom:5px')}>SCIENTIFIC REVIEW · FINAL GATE</div>
                    <div style={S('font-weight:700;font-size:15px;letter-spacing:-0.02em;overflow:hidden;text-overflow:ellipsis;white-space:nowrap')}>{v.topic}</div>
                  </div>
                  <div style={S('display:flex;gap:10px;align-items:center')}>
                    <Box
                      css="border:1px solid var(--rule2);padding:10px 18px;cursor:pointer;color:var(--dim);font-weight:600;font-size:13px"
                      hover="color:var(--ink);border-color:var(--ink)"
                      onClick={v.openSendBack}
                    >Send Back with Comments</Box>
                    <Box
                      css="background:var(--ok);color:#fff;font-weight:700;padding:11px 18px;cursor:pointer;font-size:13px;display:flex;align-items:center;gap:10px"
                      hover="opacity:0.88"
                      onClick={v.doSciApprove}
                    >
                      Final Approval — Publish →
                    </Box>
                  </div>
                </div>

                {/* three-column body */}
                <div style={S('flex:1;display:flex;overflow:hidden')}>

                  {/* left — slide rail */}
                  <div style={S('width:168px;flex:none;border-right:1px solid var(--rule);overflow-y:auto;padding:12px 8px')}>
                    {slideData.map((sl, i) => {
                      const sNum = i + 1;
                      const sciPins = (v.sciAllComments[sNum] || []).filter(c => !c.resolved).length;
                      const maPins = (v.maAllComments[sNum] || []).filter(c => !c.resolved).length;
                      return (
                        <div
                          key={i}
                          style={S(`margin-bottom:8px;cursor:pointer;border:2px solid ${v.currentSlideNum === sNum ? 'var(--ok)' : 'transparent'};padding:2px;position:relative`)}
                          onClick={() => v.pickSlideN(sNum)}
                        >
                          <div style={S('background:var(--s2);aspect-ratio:16/9;padding:6px 8px')}>
                            <div style={S('font:700 6px/1 Archivo;color:var(--acc);letter-spacing:0.1em;margin-bottom:4px')}>SLIDE {sNum}</div>
                            <div style={S('font-size:6.5px;font-weight:700;line-height:1.3;color:var(--ink)')}>{sl.title}</div>
                          </div>
                          <div style={S('display:flex;gap:4px;margin-top:2px')}>
                            {sciPins > 0 && <div style={S('background:var(--ok);color:#fff;font:700 8px/1 Archivo;padding:2px 5px')}>{sciPins} sci</div>}
                            {maPins > 0 && <div style={S('background:var(--warn);color:#000;font:700 8px/1 Archivo;padding:2px 5px')}>{maPins} ma</div>}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* center — canvas (green accent) */}
                  <div style={S('flex:1;min-width:0;overflow:auto;display:flex;align-items:flex-start;justify-content:center;padding:28px;background:#090c09')}>
                    <div style={S('width:100%;max-width:800px')}>
                      <div style={S('font:600 10px/1 Archivo;letter-spacing:0.14em;color:var(--faint);margin-bottom:12px;text-align:center')}>
                        SLIDE {v.currentSlideNum} OF {slideData.length}{v.reviewerTab === 'my' ? ' · CLICK ANYWHERE TO ADD A COMMENT' : ' · MA COMMENTS MODE — READ ONLY'}
                      </div>
                      <div
                        style={S(`aspect-ratio:16/9;background:var(--s2);position:relative;cursor:${v.reviewerTab === 'my' ? 'crosshair' : 'default'};border:1px solid var(--rule)`)}
                        onClick={(e) => v.reviewerTab === 'my' && v.onSlideCanvasClick(e, v.currentSlideNum, 'sci')}
                      >
                        <div style={S('position:absolute;inset:0;padding:24px 28px;display:flex;flex-direction:column')}>
                          <div style={S('font:700 10px/1 Archivo;letter-spacing:0.12em;color:var(--acc);margin-bottom:10px')}>SLIDE {v.currentSlideNum}</div>
                          <div style={S('font-size:18px;font-weight:800;letter-spacing:-0.02em;margin-bottom:12px;line-height:1.2')}>{currentSlide.title}</div>
                          {currentSlide.bullets && currentSlide.bullets.map((b, bi) => (
                            <div key={bi} style={S('display:flex;gap:8px;align-items:flex-start;margin-bottom:6px')}>
                              <div style={S('width:5px;height:5px;background:var(--acc);flex:none;margin-top:5px')} />
                              <div style={S('font-size:12px;line-height:1.5;color:var(--dim)')}>{b}</div>
                            </div>
                          ))}
                        </div>

                        {/* MA pins (amber, read-only) — shown only if MA Comments tab active */}
                        {v.reviewerTab === 'ma' && currentMAComments.map((pin) => !pin.resolved && (
                          <div key={`ma-${pin.id}`} style={S(`position:absolute;left:${pin.x}%;top:${pin.y}%;transform:translate(-50%,-50%);z-index:10;cursor:pointer`)}>
                            <div style={S('width:22px;height:22px;border-radius:50%;background:var(--warn);color:#000;font:700 11px/22px Archivo;text-align:center;opacity:0.7')}>{pin.id}</div>
                          </div>
                        ))}

                        {/* sci pins (green) */}
                        {v.reviewerTab === 'my' && currentSciComments.map((pin) => !pin.resolved && (
                          <div
                            key={pin.id}
                            style={S(`position:absolute;left:${pin.x}%;top:${pin.y}%;transform:translate(-50%,-50%);z-index:10;cursor:pointer`)}
                            onClick={(e) => { e.stopPropagation(); v.setOpenPin(v.currentSlideNum, pin.id, 'sci'); }}
                          >
                            <div style={S('width:22px;height:22px;border-radius:50%;background:var(--ok);color:#fff;font:700 11px/22px Archivo;text-align:center;box-shadow:0 2px 8px rgba(0,0,0,0.6)')}>{pin.id}</div>
                          </div>
                        ))}

                        {/* pending pin */}
                        {v.pendingPin && v.pendingPin.slideNum === v.currentSlideNum && (
                          <div style={S(`position:absolute;left:${v.pendingPin.x}%;top:${v.pendingPin.y}%;transform:translate(-50%,-50%);z-index:10`)}
                               onClick={(e) => e.stopPropagation()}>
                            <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--ok)', opacity: 0.7, animation: 'puls 1s infinite' }} />
                          </div>
                        )}

                        {/* open sci pin popup */}
                        {v.openPinData && v.openPin && v.openPin.slideNum === v.currentSlideNum && v.openPin.role === 'sci' && (
                          <div
                            style={S(`position:absolute;left:${v.openPinData.x}%;top:${v.openPinData.y}%;z-index:20;transform:translate(${v.openPinData.x > 70 ? '-105%' : '12px'},${v.openPinData.y > 70 ? '-105%' : '0%'})`)}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div style={S('background:var(--bg);border:1px solid var(--ok);padding:14px;min-width:240px;max-width:280px;box-shadow:0 4px 18px rgba(0,0,0,0.7)')}>
                              <div style={S('display:flex;align-items:center;gap:8px;margin-bottom:10px')}>
                                <div style={S('width:20px;height:20px;border-radius:50%;background:var(--ok);color:#fff;font:700 10px/20px Archivo;text-align:center')}>{v.openPinData.id}</div>
                                <div style={S('font:700 11px/1 Archivo;color:var(--ok)')}>{v.openPinData.author}</div>
                                <div style={S('margin-left:auto;color:var(--faint);font-size:11px')}>{v.openPinData.time}</div>
                              </div>
                              <div style={S('font-size:12.5px;line-height:1.55;color:var(--ink);margin-bottom:12px')}>{v.openPinData.text}</div>
                              <div style={S('display:flex;gap:8px')}>
                                <Box css="flex:1;border:1px solid var(--ok);padding:7px 10px;text-align:center;cursor:pointer;color:var(--ok);font:700 11px/1 Archivo" hover="background:var(--ok);color:#fff" onClick={() => v.resolvePin('sci', v.currentSlideNum, v.openPinData.id)}>Resolve</Box>
                                <Box css="border:1px solid var(--rule);padding:7px 10px;cursor:pointer;color:var(--dim);font-size:12px" hover="color:var(--ink)" onClick={v.closePin}>✕</Box>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* pending pin comment box */}
                      {v.pendingPin && v.pendingPin.slideNum === v.currentSlideNum && v.reviewerTab === 'my' && (
                        <div style={S('margin-top:16px;border:1px solid var(--ok);padding:14px;background:var(--s1)')}>
                          <div style={S('font:700 11px/1 Archivo;letter-spacing:0.12em;color:var(--ok);margin-bottom:10px')}>ADD COMMENT AT THIS POSITION</div>
                          <textarea
                            rows={3}
                            style={S('width:100%;background:var(--bg);border:1px solid var(--rule);color:var(--ink);padding:10px;font-size:13px;resize:vertical;display:block')}
                            placeholder="Type your scientific comment…"
                            value={v.commentDraft}
                            onChange={v.onCommentDraft}
                            onKeyDown={(e) => v.onCommentKey(e, 'sci')}
                            autoFocus
                          />
                          <div style={S('display:flex;gap:8px;margin-top:10px')}>
                            <Box css="background:var(--ok);color:#fff;font-weight:700;padding:9px 16px;cursor:pointer;font-size:13px" hover="opacity:0.85" onClick={v.doAddComment}>Add Comment</Box>
                            <Box css="border:1px solid var(--rule);padding:9px 14px;cursor:pointer;color:var(--dim);font-size:13px" hover="color:var(--ink)" onClick={v.cancelPin}>Cancel</Box>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* right — dual tab comments panel */}
                  <div style={S('width:280px;flex:none;border-left:1px solid var(--rule);display:flex;flex-direction:column;overflow:hidden')}>
                    <div style={S('display:flex;border-bottom:1px solid var(--rule);flex:none')}>
                      {[['my', 'My Comments'], ['ma', 'MA Comments']].map(([tab, label]) => (
                        <div
                          key={tab}
                          style={S(`flex:1;padding:11px 12px;text-align:center;font:700 11px/1 Archivo;letter-spacing:0.1em;cursor:pointer;color:${v.reviewerTab === tab ? 'var(--ink)' : 'var(--faint)'};border-bottom:2px solid ${v.reviewerTab === tab ? (tab === 'my' ? 'var(--ok)' : 'var(--warn)') : 'transparent'}`)}
                          onClick={() => tab === 'ma' ? v.switchToMAComments() : v.switchToMyComments()}
                        >
                          {label}
                        </div>
                      ))}
                    </div>
                    <div style={S('flex:1;overflow-y:auto;padding:12px')}>
                      {v.reviewerTab === 'my' ? (
                        currentSciComments.length === 0 ? (
                          <div style={S('color:var(--faint);font-size:12.5px;text-align:center;padding:24px 0')}>No comments yet.<br />Click the canvas to add one.</div>
                        ) : currentSciComments.map((c) => (
                          <div key={c.id} style={S(`margin-bottom:14px;border:1px solid ${c.resolved ? 'var(--rule)' : 'var(--ok)'};padding:12px`)}>
                            <div style={S('display:flex;align-items:center;gap:8px;margin-bottom:8px')}>
                              <div style={S('width:22px;height:22px;border-radius:50%;background:var(--ok);color:#fff;font:700 10px/22px Archivo;text-align:center;flex:none')}>{c.id}</div>
                              <div style={S('font-weight:600;font-size:12px')}>{c.author}</div>
                              <div style={S('margin-left:auto;color:var(--faint);font-size:11px')}>{c.time}</div>
                            </div>
                            <div style={S('font-size:12.5px;line-height:1.55;color:var(--ink);margin-bottom:8px')}>{c.text}</div>
                            {c.resolved
                              ? <div style={S('font:600 9.5px/1 Archivo;letter-spacing:0.1em;color:var(--ok)')}>✓ RESOLVED</div>
                              : <Box css="font:600 9.5px/1 Archivo;letter-spacing:0.1em;color:var(--ok);cursor:pointer" hover="color:#fff" onClick={() => v.resolvePin('sci', v.currentSlideNum, c.id)}>RESOLVE</Box>
                            }
                          </div>
                        ))
                      ) : (
                        currentMAComments.length === 0 ? (
                          <div style={S('color:var(--faint);font-size:12.5px;text-align:center;padding:24px 0')}>No MA comments on this slide.</div>
                        ) : currentMAComments.map((c) => (
                          <div key={c.id} style={S('margin-bottom:14px;border:1px solid var(--warn);padding:12px;opacity:0.75')}>
                            <div style={S('display:flex;align-items:center;gap:8px;margin-bottom:8px')}>
                              <div style={S('width:22px;height:22px;border-radius:50%;background:var(--warn);color:#000;font:700 10px/22px Archivo;text-align:center;flex:none')}>{c.id}</div>
                              <div style={S('font-weight:600;font-size:12px')}>{c.author}</div>
                              <div style={S('margin-left:auto;color:var(--faint);font-size:11px')}>{c.time}</div>
                            </div>
                            <div style={S('font-size:12.5px;line-height:1.55;color:var(--ink);margin-bottom:4px')}>{c.text}</div>
                            <div style={S('font:600 9.5px/1 Archivo;letter-spacing:0.1em;color:var(--warn)')}>MA COMMENT — READ ONLY</div>
                          </div>
                        ))
                      )}
                    </div>
                    {v.reviewerTab === 'my' && (
                      <div style={S('padding:12px;border-top:1px solid var(--rule);flex:none')}>
                        <Box
                          css="width:100%;border:1px solid var(--ok);padding:10px;text-align:center;cursor:pointer;color:var(--ok);font:700 11px/1 Archivo"
                          hover="background:var(--ok);color:#fff"
                          onClick={() => v.addCenterPin(v.currentSlideNum, 'sci')}
                        >+ Add Comment to Slide</Box>
                      </div>
                    )}
                  </div>
                </div>

                {/* Send Back modal (sci) */}
                {v.sendBackOpen && (
                  <div style={S('position:fixed;inset:0;background:rgba(0,0,0,0.72);z-index:100;display:flex;align-items:center;justify-content:center')} onClick={v.closeSendBack}>
                    <div style={S('background:var(--bg);border:1px solid var(--rule2);padding:28px;width:440px')} onClick={(e) => e.stopPropagation()}>
                      <div style={S('font:700 11px/1 Archivo;letter-spacing:0.14em;color:var(--acc);margin-bottom:14px')}>SEND BACK FOR REVISION</div>
                      <div style={S('font-size:15px;font-weight:700;letter-spacing:-0.01em;margin-bottom:6px')}>Send to Content Team?</div>
                      <div style={S('color:var(--dim);font-size:13px;margin-bottom:18px')}>
                        {v.sciTotalComments} scientific comment{v.sciTotalComments !== 1 ? 's' : ''} across {v.sciCommentSlideCount} slide{v.sciCommentSlideCount !== 1 ? 's' : ''} will be sent to Mayank Gupta.
                      </div>
                      <textarea
                        rows={3}
                        style={S('width:100%;background:var(--s1);border:1px solid var(--rule);color:var(--ink);padding:10px;font-size:13px;resize:vertical;display:block;margin-bottom:16px')}
                        placeholder="Optional message to the content team…"
                        value={v.sendBackNote}
                        onChange={(e) => this.setState({ sendBackNote: e.target.value })}
                      />
                      <div style={S('display:flex;gap:10px')}>
                        <Box css="flex:1;background:var(--acc);color:#fff;font-weight:700;padding:12px;text-align:center;cursor:pointer" hover="background:#dd2b0f" onClick={v.doSciSendBack}>Send Back</Box>
                        <Box css="border:1px solid var(--rule2);padding:12px 18px;cursor:pointer;color:var(--dim)" hover="color:var(--ink)" onClick={v.closeSendBack}>Cancel</Box>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })()}
        </main>
      </div>
    );
  }
}
