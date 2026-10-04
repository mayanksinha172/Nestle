import React from 'react';
import './EvidenceStudio.css';

// ========================== ICONS ==========================
const IP = {
  grid:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  panel:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/>',
  gear:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
  pencil:'<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
  flask:'<path d="M9 3h6M10 3v6l-5.5 9.5A2 2 0 0 0 6.2 21h11.6a2 2 0 0 0 1.7-2.5L14 9V3"/><path d="M7.5 15h9"/>',
  doc:'<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
  check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  x:'<path d="M6 6l12 12M18 6L6 18"/>',
  lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  logout:'<path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 17l-5-5 5-5M5 12h11"/>',
  target:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/>',
  pill:'<path d="M10.5 20.5a5 5 0 0 1-7-7l10-10a5 5 0 0 1 7 7z"/><path d="M8.5 8.5l7 7"/>',
  play:'<path d="M7 5l12 7-12 7z"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  back:'<path d="M15 18l-6-6 6-6"/>',
  alert:'<path d="M12 3l9.5 17h-19z"/><path d="M12 10v4M12 17h.01"/>',
  shield:'<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
  slides:'<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
  copy:'<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>',
  inbox:'<path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.5 5h13l3.5 7v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6z"/>',
  users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M21.5 20a6.5 6.5 0 0 0-4-6"/>'
};

function Ic({ n, cls = '' }) {
  return <svg className={`i ${cls}`} viewBox="0 0 24 24" aria-hidden="true" dangerouslySetInnerHTML={{ __html: IP[n] || '' }} />;
}

// ========================== CONSTANTS ==========================
const ADMIN_R = 'Admin', MA_R = 'Medical Affairs', SA_R = 'Scientific Affairs';
const ROLES = [ADMIN_R, MA_R, SA_R];
const STORE = 'evidence-studio-demo-v3';
const DEFAULT_PERMS = { othersWorkspace: true, othersResearch: true, othersArtifact: true };
const DEFAULT_CITATION_DEPTH = 3;
const ART_TYPES = [
  { id: 'hcp', name: 'HCP Deck', desc: 'Built in the Presentation Agent' },
  { id: 'protocol', name: 'Protocol', desc: 'Study or program protocol outline' },
  { id: 'blog', name: 'Blog & Blurbs', desc: 'Long-form post plus short copy' },
  { id: 'facts', name: 'Facts', desc: 'Referenced fact sheet' },
];
const ST = {
  draft: { l: 'In progress', c: 'b-draft' }, progress: { l: 'In progress', c: 'b-running' },
  'mr-waiting': { l: 'Medical review waiting', c: 'b-amber' }, 'sr-waiting': { l: 'Scientific review waiting', c: 'b-amber' },
  approved: { l: 'Approved', c: 'b-approved' }, rejected: { l: 'Rejected', c: 'b-rejected' },
  unapproved: { l: 'Unapproved', c: 'b-unapproved' },
};

// ========================== HELPERS ==========================
let _uid = 1;
const nid = p => p + Date.now().toString(36) + (_uid++) + Math.random().toString(36).slice(2, 5);
const pad = (n, l = 3) => String(n).padStart(l, '0');
const norm = s => s.trim().replace(/\s+/g, ' ').toLowerCase();
const M = 6e4, H = 36e5, D = 864e5;
function rel(t) { const d = Date.now() - t; if (d < M) return 'just now'; if (d < H) return Math.floor(d / M) + 'm ago'; if (d < H) return Math.floor(d / H) + 'h ago'; if (d < D) return Math.floor(d / H) + 'h ago'; if (d < 7 * D) return Math.floor(d / D) + 'd ago'; return fmtDate(t); }
const fmtDate = t => new Date(t).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
const fmtTime = t => new Date(t).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
const initials = n => n.replace(/^Dr\.\s*/, '').split(/\s+/).map(s => s[0]).slice(0, 2).join('').toUpperCase();
const slug = s => s.split(':')[0].trim().replace(/[^A-Za-z0-9]+/g, '_').replace(/^_|_$/g, '');
function tsStamp() { const d = new Date(), p = n => String(n).padStart(2, '0'); return `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}_${p(d.getHours())}${p(d.getMinutes())}${p(d.getSeconds())}`; }
const typeName = id => (ART_TYPES.find(t => t.id === id) || {}).name || id;

function defaultUsers() {
  return [
    { id: 'p.raman', name: 'Priya Raman', greet: 'Priya', roles: [ADMIN_R], color: '#6A3FA0' },
    { id: 'm.oyelaran', name: 'Dr. Marcus Oyelaran', greet: 'Marcus', roles: [MA_R], color: '#14328C' },
    { id: 'l.hoffmann', name: 'Dr. Lena Hoffmann', greet: 'Lena', roles: [SA_R], color: '#006400' },
    { id: 'j.blake', name: 'Jordan Blake', greet: 'Jordan', roles: [ADMIN_R, MA_R], color: '#C07600' },
  ];
}

function seedWorkspaces() {
  const now = Date.now(); let n = 0;
  const mk = (name, topic, product, ago, by) => ({ id: nid('w'), code: 'WS-' + pad(++n), name, topic, product, createdAt: now - ago - 20 * D, updatedAt: now - ago, createdBy: by, research: [], artifacts: [], rseq: 0, aseq: 0 });
  return [
    mk('October HCP Cycle', 'Histamine Intolerance', 'DAO Enzyme', H, 'm.oyelaran'),
    mk('September HCP Cycle', 'Heart failure with preserved ejection fraction: SGLT2 outcomes', 'Cardivex', 4 * H, 'm.oyelaran'),
    mk('Q4 Oncology Congress Prep', 'Biomarker-driven first-line therapy in NSCLC', 'Onkaris', 9 * H, 'j.blake'),
    mk('Diabetes Education Series', 'Time-in-range as a clinical endpoint', 'Glucora', D + 3 * H, 'm.oyelaran'),
    mk('Respiratory Launch Support', 'Biologics in severe eosinophilic asthma', 'Aeroquell', 2 * D, 'j.blake'),
    mk('Renal Outcomes Review', 'CKD progression and albuminuria (UACR) as a marker', 'Nephrosyn', 4 * D, 'm.oyelaran'),
    mk('Adult RSV Immunization Hub', 'Adult RSV immunization uptake in adults 60+', 'Resvara', 9 * D, 'j.blake'),
  ];
}

// ========================== BADGE / TRACKER ==========================
function Badge({ status }) {
  const t = ST[status] || ST.progress;
  return <span className={`badge ${t.c}`}>{t.l}{status === 'draft' ? ' · not run' : ''}</span>;
}

function Tracker({ status }) {
  if (status === 'unapproved') return <span className="trk"><span><i></i>Not eligible for review · research not approved</span></span>;
  const mr = status === 'mr-waiting' ? 'w' : ['sr-waiting', 'approved', 'rejected'].includes(status) ? 'c' : '';
  const sr = status === 'sr-waiting' ? 'w' : ['approved', 'rejected'].includes(status) ? 'c' : '';
  const lab = x => x === 'w' ? 'waiting' : x === 'c' ? 'complete' : 'not started';
  return <span className="trk"><span><i className={mr}></i>Medical review {lab(mr)}</span><span><i className={sr}></i>Scientific review {lab(sr)}</span></span>;
}

function StatusCol({ status }) {
  return <div className="stat"><Badge status={status} /><Tracker status={status} /></div>;
}

function Av({ user, size = 30 }) {
  return <span className="avatar" style={{ background: user.color, width: size, height: size, fontSize: size * 0.4 }}>{initials(user.name)}</span>;
}

function RoleChips({ user, inMenu = false }) {
  return <span className="rchips">{user.roles.map(r => <span key={r} className={`rchip${inMenu ? ' menu-chip' : ''}`}>{r}</span>)}</span>;
}

// ========================== MAIN CLASS ==========================
export default class EvidenceStudioV2 extends React.Component {
  constructor(props) {
    super(props);
    const loaded = this._load();
    this.state = {
      users: loaded.users || defaultUsers(),
      workspaces: loaded.workspaces || seedWorkspaces(),
      wsSeq: loaded.wsSeq || 0,
      perms: { ...DEFAULT_PERMS, ...(loaded.perms || {}) },
      citationDepth: Number.isInteger(loaded.citationDepth) ? loaded.citationDepth : DEFAULT_CITATION_DEPTH,
      showSwitchUser: loaded.showSwitchUser !== false,
      user: null,
      view: { kind: 'dashboard' },
      sidePin: false,
      sideHiddenAt: null,
      menu: false,
      loginPick: null,
      loginUser: '',
      loginPass: '',
      loginErr: '',
      confirmStartOver: false,
      modal: null,
      modalState: {},
      toast: null,
      tip: null,
    };
    this._toastTimer = null;
    // Form refs
    this._wsNameRef = React.createRef();
    this._rsNameRef = React.createRef();
    this._afNameRef = React.createRef();
    this._rnNameRef = React.createRef();
    this._saCommentRef = React.createRef();
  }

  // ========================== PERSISTENCE ==========================
  _load() {
    try {
      const raw = localStorage.getItem(STORE);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return {};
  }
  _save(st = this.state) {
    try {
      localStorage.setItem(STORE, JSON.stringify({
        workspaces: st.workspaces, users: st.users, wsSeq: st.wsSeq,
        perms: st.perms, citationDepth: st.citationDepth, showSwitchUser: st.showSwitchUser,
      }));
    } catch (e) {}
  }
  _saveAfter(cb) {
    this.setState(cb, () => this._save());
  }

  // ========================== HELPERS ==========================
  _has(role, u = this.state.user) { return !!u && u.roles.includes(role); }
  _userById(id) { return this.state.users.find(u => u.id === id); }
  _uname(id) { return (this._userById(id) || {}).name || id || '—'; }
  _wsById(id) { return this.state.workspaces.find(w => w.id === id); }
  _findItem(wsId, itype, id) { const w = this._wsById(wsId); if (!w) return {}; const it = (itype === 'research' ? w.research : w.artifacts).find(x => x.id === id); return { w, it }; }
  _touch(w) { w.updatedAt = Date.now(); }
  _nameTaken(w, name, exceptId) { const n = norm(name); return w.research.some(r => r.id !== exceptId && norm(r.name) === n) || w.artifacts.some(a => a.id !== exceptId && norm(a.name) === n); }
  _uniqueName(w, base) { let n = base, i = 2; while (this._nameTaken(w, n)) n = `${base}_${i++}`; return n; }
  _lastDecision(it) { return (it.decisions || [])[(it.decisions || []).length - 1]; }
  _mySubmission(it) { return !it.submittedBy || it.submittedBy === this.state.user.id; }
  _meId() { return this.state.user && this.state.user.id; }
  _canActWs(w) { return !!w && (this.state.perms.othersWorkspace || w.createdBy === this._meId()); }
  _canActR(r) { return !!r && ((this.state.perms.othersWorkspace && this.state.perms.othersResearch) || r.createdBy === this._meId()); }
  _canActA(a) { return !!a && ((this.state.perms.othersWorkspace && this.state.perms.othersArtifact) || a.createdBy === this._meId()); }
  _ownerNote(what, owner) { return `Only ${this._uname(owner)}, who created this ${what}, can work on it. An admin can change this in Settings → Permissions.`; }
  _eligible(r) { return r.status === 'approved' || (r.entryCount || 0) > 0; }

  _allItems() { return this.state.workspaces.flatMap(w => [...w.research.map(r => ({ w, itype: 'research', it: r })), ...w.artifacts.map(a => ({ w, itype: 'artifact', it: a }))]); }
  _itemType(x) { return x.itype === 'research' ? 'Research' : typeName(x.it.type); }
  _waitingItems() { return this._allItems().filter(x => x.it.status === 'sr-waiting').sort((a, b) => (a.it.submittedAt || 0) - (b.it.submittedAt || 0)); }
  _decidedItems() { return this._allItems().flatMap(x => (x.it.decisions || []).map((d, di) => ({ ...x, d, di }))).sort((a, b) => b.d.at - a.d.at); }

  _homeView() {
    if (this._has(SA_R)) return { kind: 'approvals', tab: 'waiting' };
    if (this._has(MA_R)) return { kind: 'dashboard' };
    return { kind: 'admin' };
  }

  _sideVisible() {
    const { sidePin, sideHiddenAt, view } = this.state;
    const autoSide = v => ['workspace', 'dashboard', 'approvals', 'admin'].includes(v.kind);
    const viewKey = v => v.kind + ':' + (v.id || v.wsId || '');
    return sidePin || (autoSide(view) && sideHiddenAt !== viewKey(view));
  }
  _toggleSide() {
    const vis = this._sideVisible();
    const { view } = this.state;
    const autoSide = v => ['workspace', 'dashboard', 'approvals', 'admin'].includes(v.kind);
    const viewKey = v => v.kind + ':' + (v.id || v.wsId || '');
    if (vis) {
      this.setState({ sidePin: false, sideHiddenAt: autoSide(view) ? viewKey(view) : this.state.sideHiddenAt });
    } else {
      this.setState({ sidePin: true, sideHiddenAt: null });
    }
  }

  _toast(msg) {
    clearTimeout(this._toastTimer);
    this.setState({ toast: msg });
    this._toastTimer = setTimeout(() => this.setState({ toast: null }), 3000);
  }

  _openModal(m) { this.setState({ modal: m, modalState: {} }); }
  _closeModal() { this.setState({ modal: null, modalState: {} }); }

  _suggestName(w, r, type) {
    let base = `${typeName(type)} – ${r.name}`, n = base, i = 2;
    while (this._nameTaken(w, n)) n = `${base} (${i++})`;
    return n;
  }

  _artSteps(a, r) {
    return [`Loading research "${r ? r.name : '—'}"`, 'Selecting claims and references', `Drafting ${typeName(a.type)} content`, 'Applying template and fair-balance statements', 'Finalising the artifact'];
  }

  _runArtifact(w, a) {
    const tick = () => {
      a.step++;
      if (a.step >= 5) {
        const r = w.research.find(x => x.id === a.researchId);
        a.status = r && r.status === 'approved' ? 'progress' : 'unapproved';
        this._touch(w);
        this._saveAfter(s => ({ workspaces: s.workspaces }));
        this._toast(`"${a.name}" is ready${a.status === 'unapproved' ? ' · Unapproved' : ''}`);
        return;
      }
      this._saveAfter(s => ({ workspaces: s.workspaces }));
      setTimeout(tick, 700);
    };
    setTimeout(tick, 700);
  }

  // ========================== EVENTS ==========================
  _onLogin(e) {
    e.preventDefault();
    const { loginUser, loginPass, users } = this.state;
    const id = loginUser.trim().toLowerCase();
    const u = users.find(x => x.id === id);
    if (!u) { this.setState({ loginErr: 'No user with that ID. Pick a sample user on the left.' }); return; }
    if (!loginPass) { this.setState({ loginErr: 'Enter a password. Any text works in this demo.' }); return; }
    this.setState({ user: u, view: this._homeViewFor(u), loginErr: '', sidePin: false, sideHiddenAt: null });
  }
  _homeViewFor(u) {
    if (u.roles.includes(SA_R)) return { kind: 'approvals', tab: 'waiting' };
    if (u.roles.includes(MA_R)) return { kind: 'dashboard' };
    return { kind: 'admin' };
  }
  _pickUser(uid) {
    this.setState({ loginPick: uid, loginUser: uid, loginPass: 'demo-pass', loginErr: '' });
  }
  _logout() {
    this.setState({ user: null, menu: false, loginPick: null, loginUser: '', loginPass: '', view: { kind: 'dashboard' }, sidePin: false, sideHiddenAt: null });
  }
  _switchUser(uid) {
    const nu = this._userById(uid);
    if (!nu) return;
    this.setState({ user: nu, menu: false, view: this._homeViewFor(nu), sidePin: false, sideHiddenAt: null });
    this._toast(`Switched to ${nu.name} · ${nu.roles.join(', ')}`);
  }

  _createWorkspace(e) {
    e.preventDefault();
    const f = e.target;
    const name = f.querySelector('#ws-name').value.trim().replace(/\s+/g, ' ');
    const topic = f.querySelector('#ws-topic').value.trim();
    const product = f.querySelector('#ws-product').value.trim();
    const err = f.querySelector('#ws-err');
    if (!name || !topic || !product) { if (err) err.textContent = 'Fill in the name, Topic and Hero Product.'; return; }
    if (this.state.workspaces.some(w => norm(w.name) === norm(name))) { if (err) err.textContent = `A workspace named "${name}" already exists.`; return; }
    const wsSeq = this.state.wsSeq + 1;
    const w = { id: nid('w'), code: 'WS-' + pad(wsSeq), name, topic, product, createdAt: Date.now(), updatedAt: Date.now(), createdBy: this._meId(), research: [], artifacts: [], rseq: 0, aseq: 0 };
    this._saveAfter(s => ({ workspaces: [...s.workspaces, w], wsSeq, modal: null, view: { kind: 'workspace', id: w.id } }));
    this._toast('Workspace created');
  }
  _renameWorkspace(e, wsId) {
    e.preventDefault();
    const f = e.target;
    const w = this._wsById(wsId);
    const name = f.querySelector('#rn-name').value.trim().replace(/\s+/g, ' ');
    const err = f.querySelector('#rn-err');
    if (!name) { if (err) err.textContent = 'Enter a workspace name.'; return; }
    if (this.state.workspaces.some(x => x.id !== w.id && norm(x.name) === norm(name))) { if (err) err.textContent = `A workspace named "${name}" already exists.`; return; }
    w.name = name; this._touch(w);
    this._saveAfter(s => ({ workspaces: s.workspaces, modal: null }));
    this._toast('Workspace renamed');
  }
  _createResearch(e, wsId) {
    e.preventDefault();
    const f = e.target;
    const w = this._wsById(wsId);
    const name = f.querySelector('#rs-name').value.trim().replace(/\s+/g, ' ');
    const err = f.querySelector('#rs-err');
    if (!name) { if (err) err.textContent = 'Enter a name for the research.'; return; }
    if (this._nameTaken(w, name)) { if (err) err.textContent = `"${name}" is already used in this workspace.`; return; }
    w.rseq++;
    const r = { id: nid('r'), code: w.code + '-R' + pad(w.rseq), name, status: 'draft', createdAt: Date.now(), createdBy: this._meId(), decisions: [] };
    w.research.push(r); this._touch(w);
    this._saveAfter(s => ({ workspaces: s.workspaces, modal: { kind: 'run-choice', wsId: w.id, rid: r.id } }));
  }
  _createArtifact(e, wsId) {
    e.preventDefault();
    const f = e.target;
    const w = this._wsById(wsId);
    const name = f.querySelector('#af-name').value.trim().replace(/\s+/g, ' ');
    const err = f.querySelector('#af-err');
    const rid = f.querySelector('#af-research').value;
    const typeInput = f.querySelector('input[name=atype]:checked');
    const type = typeInput ? typeInput.value : 'hcp';
    if (!name) { if (err) err.textContent = 'Enter a name for the artifact.'; return; }
    if (this._nameTaken(w, name)) { if (err) err.textContent = `"${name}" is already used in this workspace.`; return; }
    w.aseq++;
    const a = { id: nid('a'), code: w.code + '-A' + pad(w.aseq), name, type, researchId: rid, status: type === 'hcp' ? 'progress' : 'building', step: type === 'hcp' ? 5 : 0, createdAt: Date.now(), createdBy: this._meId(), decisions: [] };
    w.artifacts.push(a); this._touch(w);
    if (type === 'hcp') {
      this._saveAfter(s => ({ workspaces: s.workspaces, modal: null, view: { kind: 'deck', wsId: w.id, aid: a.id } }));
      this._toast('Opening the Presentation Agent');
    } else {
      this._saveAfter(s => ({ workspaces: s.workspaces, modal: { kind: 'art-agent', wsId: w.id, aid: a.id } }));
      this._runArtifact(w, a);
    }
  }
  _simStep(wsId, aid, to) {
    const { w, it: a } = this._findItem(wsId, 'artifact', aid);
    if (!a || !this._canActA(a)) return;
    if (to === 'sr-waiting') { a.round = (a.round || 0) + 1; a.submittedBy = this._meId(); a.submittedAt = Date.now(); this._toast('Submitted for scientific review. Medical review is complete.'); }
    a.status = to; this._touch(w);
    this._saveAfter(s => ({ workspaces: s.workspaces }));
    this._openModal({ ...this.state.modal, kind: 'artifact' });
  }
  _simDecide(wsId, itype, id, outcome) {
    const comment = this._saCommentRef.current ? this._saCommentRef.current.value.trim() : '';
    if (outcome === 'rejected' && !comment) {
      this.setState(s => ({ modalState: { ...s.modalState, saErr: 'Add a comment to reject, so the submitter knows what to fix.' } }));
      return;
    }
    const { w, it } = this._findItem(wsId, itype, id);
    const snap = JSON.stringify({ type: itype, name: it.name });
    (it.decisions = it.decisions || []).push({ round: it.round || 1, outcome, by: this._meId(), at: Date.now(), snap, comment });
    it.status = outcome; this._touch(w);
    this._saveAfter(s => ({ workspaces: s.workspaces, view: { kind: 'approvals', tab: 'decided' }, modal: null }));
    this._toast(outcome === 'approved' ? `Approved: ${it.name}` : `Rejected and returned to ${this._uname(it.submittedBy)}`);
  }
  _runNow(wsId, rid) {
    this._closeModal();
    const w = this._wsById(wsId); const r = w.research.find(x => x.id === rid);
    if (r.status === 'draft') { r.status = 'progress'; this._touch(w); this._save(); }
    this.setState({ view: { kind: 'research', wsId: w.id, rid: r.id } });
  }
  _openWorkspace(id) {
    const w = this._wsById(id); this._touch(w); this._save();
    this.setState({ view: { kind: 'workspace', id: w.id } });
  }
  _openResearch(wsId, rid) {
    const w = this._wsById(wsId); const r = w && w.research.find(x => x.id === rid);
    if (!r) return;
    if (r.status === 'draft' && this._canActR(r)) { r.status = 'progress'; this._touch(w); this._save(); }
    this.setState({ view: { kind: 'research', wsId: w.id, rid: r.id } });
  }
  _openArtifact(wsId, aid) {
    this._closeModal();
    const w = this._wsById(wsId); const a = w && w.artifacts.find(x => x.id === aid);
    if (!a) return;
    if (a.type === 'hcp') { this.setState({ view: { kind: 'deck', wsId: w.id, aid: a.id } }); return; }
    this._openModal({ kind: a.status === 'building' ? 'art-agent' : 'artifact', wsId: w.id, aid: a.id });
  }

  _changeRole(uid, role, checked) {
    const u = this._userById(uid);
    const next = checked ? [...u.roles, role] : u.roles.filter(x => x !== role);
    if (!next.length) {
      this.setState(s => ({ modalState: { ...s.modalState, roleErr: `${u.name} needs at least one role.` } }));
      return;
    }
    u.roles = ROLES.filter(x => next.includes(x));
    const curUser = this.state.user;
    const newCurUser = u.id === curUser.id ? u : curUser;
    this._saveAfter(s => ({ users: s.users, user: newCurUser, view: u.id === curUser.id ? this._homeViewFor(u) : s.view, modalState: { ...s.modalState, roleErr: '' } }));
    this._toast(`${u.name}: ${u.roles.join(', ')}`);
  }
  _changePerm(key, checked) {
    const perms = { ...this.state.perms, [key]: checked };
    if (key === 'othersWorkspace' && !checked) { perms.othersResearch = false; perms.othersArtifact = false; }
    this._saveAfter(() => ({ perms }));
    const labels = { othersWorkspace: 'Workspaces', othersResearch: 'Research', othersArtifact: 'Artifacts' };
    this._toast(`${labels[key]}: ${checked ? 'anyone can work on them' : 'only the creator can work on them'}`);
  }
  _resetData() {
    const me = this._meId();
    const newUsers = defaultUsers();
    const newUser = newUsers.find(u => u.id === me) || newUsers[0];
    const newWs = seedWorkspaces();
    this._saveAfter(() => ({
      users: newUsers, workspaces: newWs, wsSeq: newWs.length,
      perms: { ...DEFAULT_PERMS }, citationDepth: DEFAULT_CITATION_DEPTH, showSwitchUser: true,
      user: newUser, view: this._homeViewFor(newUser), modal: null,
    }));
    this._toast('Demo data restored');
  }
  _startOver() {
    const newUsers = defaultUsers();
    const newUser = newUsers[0];
    const newWs = seedWorkspaces();
    this._saveAfter(() => ({
      users: newUsers, workspaces: newWs, wsSeq: newWs.length,
      perms: { ...DEFAULT_PERMS }, citationDepth: DEFAULT_CITATION_DEPTH, showSwitchUser: true,
      user: null, view: { kind: 'dashboard' }, confirmStartOver: false, loginPick: null, loginUser: '', loginPass: '',
    }));
    this._toast('Started over. All saved demo data was removed.');
  }

  // ========================== RENDER: LOGIN ==========================
  renderLogin() {
    const { loginPick, loginUser, loginPass, loginErr, users, confirmStartOver } = this.state;
    return (
      <div className="login">
        <aside className="login-users">
          <div><h2>Sample users</h2><p className="sub">Select a user to fill in the sign-in form.</p></div>
          <div className="su-list">
            {users.map(u => (
              <button key={u.id} className={`su${loginPick === u.id ? ' sel' : ''}`} onClick={() => this._pickUser(u.id)}>
                <Av user={u} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <b>{u.name}</b>
                  <span className="mono">{u.id}</span>
                  <RoleChips user={u} />
                </div>
              </button>
            ))}
          </div>
          <p className="demo-note">Demo environment. Products and data are fictional. Any password works.</p>
        </aside>
        <section className="login-main">
          <div className="login-card">
            <div className="brand-mark">
              <span className="logo">E</span>
              <div><b style={{ fontWeight: 600, display: 'block', lineHeight: 1.1 }}>Evidence Studio v2</b><div style={{ color: 'var(--muted)', fontSize: 12 }}>Medical Affairs workspace</div></div>
            </div>
            <div><h1>Sign in</h1><p className="muted" style={{ marginTop: 6 }}>Research, review and build field-ready materials from one place.</p></div>
            <form className="form" onSubmit={e => this._onLogin(e)}>
              <div className="field">
                <label htmlFor="lg-user">User ID</label>
                <input className="input" id="lg-user" autoComplete="username" placeholder="e.g. m.oyelaran" value={loginUser} onChange={e => this.setState({ loginUser: e.target.value, loginErr: '' })} />
              </div>
              <div className="field">
                <label htmlFor="lg-pass">Password</label>
                <input className="input" id="lg-pass" type="password" autoComplete="current-password" value={loginPass} onChange={e => this.setState({ loginPass: e.target.value, loginErr: '' })} />
              </div>
              <p className="err">{loginErr}</p>
              <button className="btn primary" type="submit" style={{ justifyContent: 'center' }}>Sign in</button>
            </form>
            <div className="startover">
              {confirmStartOver ? (
                <>
                  <p><b>Start over?</b> This removes every workspace, research, artifact and review record saved in this browser, and restores the sample workspaces and users.</p>
                  <div className="acts">
                    <button className="btn sm" onClick={() => this.setState({ confirmStartOver: false })}>Cancel</button>
                    <button className="btn sm danger-btn" onClick={() => this._startOver()}>Remove everything</button>
                  </div>
                </>
              ) : (
                <button className="link-btn" onClick={() => this.setState({ confirmStartOver: true })}>Start over · clear saved demo data</button>
              )}
            </div>
          </div>
        </section>
      </div>
    );
  }

  // ========================== RENDER: SHELL ==========================
  renderShell() {
    const { user, view, menu, showSwitchUser, users } = this.state;
    const collapsed = !this._sideVisible();
    const isAdmin = this._has(ADMIN_R);
    const isSA = this._has(SA_R);
    const isMA = this._has(MA_R);

    let sidebar = null;
    let crumbs = null;
    let content = null;
    let agentMode = false;

    if (isSA) {
      const wait = this._waitingItems();
      sidebar = (
        <>
          <div className="side-top">
            <div className="brand-mark"><span className="logo">E</span><div><b style={{ color: '#fff', fontWeight: 600 }}>Evidence Studio v2</b><span>Scientific Affairs</span></div></div>
            <button className={`nav-btn${view.kind === 'approvals' ? ' active' : ''}`} onClick={() => this.setState({ view: { kind: 'approvals', tab: 'waiting' } })}><Ic n="inbox" />Approval list</button>
          </div>
          <div className="side-list">
            <div className="side-head"><span>Waiting · {wait.length}</span></div>
            <ul className="ws-list">
              {wait.length ? wait.map(x => (
                <li key={x.it.id}><button className={`ws-item${view.kind === 'sa-item' && view.id === x.it.id ? ' active' : ''}`} onClick={() => this.setState({ view: { kind: 'sa-item', wsId: x.w.id, itype: x.itype, id: x.it.id } })}>
                  <b>{x.it.name}</b><span>{this._itemType(x)} · {x.w.name}</span>
                </button></li>
              )) : <li><span className="ws-item" style={{ cursor: 'default', display: 'block', padding: '8px 10px' }}><span style={{ color: 'var(--side-muted)', fontSize: 12 }}>Nothing waiting</span></span></li>}
            </ul>
          </div>
        </>
      );
      if (view.kind === 'sa-item') { const r = this.renderSAItem(); crumbs = r.crumb; content = r.content; agentMode = r.agent; }
      else if (view.kind === 'sa-decision') { const r = this.renderSADecision(); crumbs = r.crumb; content = r.content; }
      else { crumbs = <b>Approval list</b>; content = this.renderApprovals(); }
    } else if (isMA) {
      const sorted = [...this.state.workspaces].sort((a, b) => b.createdAt - a.createdAt);
      const cur = this._wsById(view.wsId || view.id);
      sidebar = (
        <>
          <div className="side-top">
            <div className="brand-mark"><span className="logo">E</span><div><b style={{ color: '#fff', fontWeight: 600 }}>Evidence Studio v2</b><span>Medical Affairs</span></div></div>
            <button className={`nav-btn${view.kind === 'dashboard' ? ' active' : ''}`} onClick={() => this.setState({ view: { kind: 'dashboard' } })}><Ic n="grid" />Workspace dashboard</button>
          </div>
          <div className="side-list">
            <div className="side-head">
              <span>Workspaces</span>
              <button className="icon-btn" onClick={() => this._openModal({ kind: 'new-ws' })} aria-label="Create workspace"><Ic n="plus" /></button>
            </div>
            <ul className="ws-list">
              {sorted.map(w => (
                <li key={w.id}><button className={`ws-item${cur && cur.id === w.id && view.kind !== 'dashboard' ? ' active' : ''}`} onClick={() => this._openWorkspace(w.id)}>
                  <b>{w.name}</b><span>{w.product} · {w.topic}</span>
                </button></li>
              ))}
            </ul>
          </div>
        </>
      );
      if (cur && view.kind === 'workspace') { crumbs = <><span>Workspaces</span><span>/</span><b>{cur.name}</b></>; content = this.renderWorkspace(cur); }
      else if (cur && view.kind === 'research') { crumbs = <><span>{cur.name}</span><span>/</span><b>{view.rid}</b></>; const r = this.renderResearchView(cur); crumbs = <><span>{cur.name}</span><span>/</span><b>{r.name}</b></>; content = r.content; agentMode = r.agent; }
      else if (cur && view.kind === 'deck') { const r = this.renderDeckView(cur); crumbs = <><span>{cur.name}</span><span>/</span><b>{r.name}</b></>; content = r.content; agentMode = r.agent; }
      else { crumbs = <b>Workspace dashboard</b>; content = this.renderDashboard(); }
    } else {
      sidebar = (
        <>
          <div className="side-top">
            <div className="brand-mark"><span className="logo">E</span><div><b style={{ color: '#fff', fontWeight: 600 }}>Evidence Studio v2</b><span>Administration</span></div></div>
            <button className="nav-btn active"><Ic n="users" />Administration</button>
          </div>
          <div className="side-list"></div>
        </>
      );
      crumbs = <b>Administration</b>; content = this.renderAdminHome();
    }

    return (
      <div className={`shell${collapsed ? ' collapsed' : ''}`} style={{ height: '100%' }}>
        <aside className="side">{sidebar}</aside>
        <main className="main">
          <header className="topbar">
            <button className="icon-btn" onClick={() => this._toggleSide()} aria-label={collapsed ? 'Show navigation' : 'Hide navigation'}><Ic n="panel" /></button>
            <div className="crumb">{crumbs}</div>
            <div className="top-right">
              {isAdmin && <button className="icon-btn" onClick={() => this._openModal({ kind: 'settings', tab: 'users' })} aria-label="Settings"><Ic n="gear" /></button>}
              <button className="user-chip" onClick={() => this.setState(s => ({ menu: !s.menu }))}>
                <Av user={user} /><span className="uid mono">{user.id}</span>
              </button>
            </div>
            {menu && (
              <div className="menu">
                <div className="who"><Av user={user} /><div><b>{user.name}</b><span className="mono muted">{user.id}</span></div></div>
                <RoleChips user={user} inMenu />
                {this.state.showSwitchUser && (
                  <div className="switch-u">
                    <span className="label">Switch user · demo</span>
                    {users.filter(x => x.id !== user.id).map(x => (
                      <button key={x.id} className="sw-btn" onClick={() => this._switchUser(x.id)}>
                        <Av user={x} size={26} /><span><b>{x.name}</b><small>{x.roles.join(' · ')}</small></span>
                      </button>
                    ))}
                  </div>
                )}
                <button className="btn sm" onClick={() => this._logout()}><Ic n="logout" />Sign out</button>
              </div>
            )}
          </header>
          <div className={`content${agentMode ? ' agent-mode' : ''}`} onClick={() => menu && this.setState({ menu: false })}>{content}</div>
        </main>
      </div>
    );
  }

  // ========================== RENDER: DASHBOARD ==========================
  renderDashboard() {
    const { user, workspaces } = this.state;
    const items = this._allItems();
    const prog = items.filter(x => ['draft', 'progress', 'mr-waiting'].includes(x.it.status)).length;
    const wait = items.filter(x => x.it.status === 'sr-waiting').length;
    const mine = items.filter(x => x.it.status === 'rejected' && x.it.submittedBy === user.id);
    const recent = [...workspaces].sort((a, b) => b.updatedAt - a.updatedAt).slice(0, 6);
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    return (
      <div className="page">
        <div className="page-head">
          <div>
            <p className="eyebrow">{today}</p>
            <h1>Welcome back, {user.greet}</h1>
            <p className="muted" style={{ marginTop: 4 }}>Signed in as {user.roles.join(' and ')}. Pick up where your team left off.</p>
          </div>
          <button className="btn primary" onClick={() => this._openModal({ kind: 'new-ws' })}><Ic n="plus" />Create workspace</button>
        </div>
        <div className="metrics">
          <div className="metric"><span className="n">{workspaces.length}</span><span className="l">Total workspaces</span></div>
          <div className="metric"><span className="n">{prog}</span><span className="l">In progress or in medical review</span></div>
          <div className="metric"><span className="n">{wait}</span><span className="l">Waiting for scientific review</span></div>
          <div className="metric"><span className="n">{mine.length}</span><span className="l">Returned to you</span></div>
        </div>
        {mine.length > 0 && (
          <section className="panel rejected-panel">
            <header><h2><Ic n="alert" />Rejected · needs your rework</h2><span className="count">{mine.length}</span></header>
            <ul className="rows">
              {mine.map(x => {
                const d = this._lastDecision(x.it);
                return (
                  <li key={x.it.id} className="row row-click" onClick={() => x.itype === 'research' ? this._openResearch(x.w.id, x.it.id) : this._openArtifact(x.w.id, x.it.id)}>
                    <div className="main-c">
                      <b>{x.it.name}</b>
                      <span>{this._itemType(x)} · {x.w.name} · rejected by {this._uname(d.by)} {rel(d.at)}</span>
                    </div>
                    <div className="side-c">
                      <Badge status="rejected" />
                      <button className="btn sm primary">{x.itype === 'research' ? 'Fix rejected items' : 'Rework'}</button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        )}
        <div className="section-h"><h2>Recent workspaces</h2><span className="muted" style={{ fontSize: 12.5 }}>Last worked on</span></div>
        <div className="recent">
          {recent.map(w => {
            const creator = this._userById(w.createdBy);
            return (
              <button key={w.id} className="wcard" onClick={() => this._openWorkspace(w.id)}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'center' }}><span className="mono muted">{w.code}</span><span className="muted" style={{ fontSize: 12 }}>{rel(w.updatedAt)}</span></div>
                <h3>{w.name}</h3>
                <p className="topic">{w.topic}</p>
                <span className="pill"><Ic n="pill" />{w.product}</span>
                <div className="foot"><span>{w.research.length} research · {w.artifacts.length} artifacts</span><span>by {creator ? creator.greet : w.createdBy}</span></div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // ========================== RENDER: WORKSPACE ==========================
  renderWorkspace(w) {
    const canWs = this._canActWs(w);
    return (
      <div className="page">
        <div className="ws-head">
          <div className="ws-title">
            <div style={{ minWidth: 0 }}>
              <p className="eyebrow mono">{w.code} · created {fmtDate(w.createdAt)}</p>
              <h1>{w.name}{canWs && <button className="icon-btn" onClick={() => this._openModal({ kind: 'rename-ws', wsId: w.id })} aria-label="Rename"><Ic n="pencil" /></button>}</h1>
            </div>
            <div className="ws-actions">
              {canWs ? (
                <>
                  <button className="btn primary" onClick={() => this._openModal({ kind: 'new-research', wsId: w.id })}><Ic n="flask" />Create Research</button>
                  <button className="btn" onClick={() => this._openModal({ kind: 'new-artifact', wsId: w.id })}><Ic n="doc" />Create Artifact</button>
                </>
              ) : <span className="lock-note"><Ic n="lock" />View only</span>}
            </div>
          </div>
          {!canWs && <p className="note-box">{this._ownerNote('workspace', w.createdBy)}</p>}
          <dl className="props">
            <div><dt><Ic n="target" />Topic of the Month</dt><dd>{w.topic}</dd></div>
            <div><dt><Ic n="pill" />Hero Product of the Month</dt><dd>{w.product}</dd></div>
            <div><dt>Owner</dt><dd>{this._uname(w.createdBy)}</dd></div>
          </dl>
        </div>
        <div className="cols">
          <section className="panel">
            <header><h2><Ic n="flask" />Research <span className="count">{w.research.length}</span></h2></header>
            {w.research.length > 0 ? (
              <ul className="rows">
                {[...w.research].sort((a, b) => b.createdAt - a.createdAt).map(r => (
                  <li key={r.id} className="row row-click" onMouseEnter={e => this._showTip(e, w, 'r', r.id)} onMouseLeave={() => this._hideTip()} onClick={() => this._openResearch(w.id, r.id)}>
                    <div className="main-c"><b>{r.name}</b><span className="mono">{r.code}{r.round ? ` · round ${r.round}` : ''}</span></div>
                    <div className="side-c">
                      <StatusCol status={r.status} />
                      {!this._canActR(r) && <span className="lock-note" title={`Created by ${this._uname(r.createdBy)}`}><Ic n="lock" />Owner only</span>}
                      {r.status === 'draft' && this._canActR(r) && <button className="btn sm" onClick={e => { e.stopPropagation(); this._openResearch(w.id, r.id); }}><Ic n="play" />Run</button>}
                      {r.status === 'rejected' && this._mySubmission(r) && this._canActR(r) && <button className="btn sm primary" onClick={e => { e.stopPropagation(); this._openResearch(w.id, r.id); }}>Fix rejected items</button>}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="empty">No research yet. Research is the input for every artifact.{canWs && <button className="btn sm primary" onClick={() => this._openModal({ kind: 'new-research', wsId: w.id })}><Ic n="plus" />Create Research</button>}</div>
            )}
          </section>
          <section className="panel">
            <header><h2><Ic n="doc" />Artifacts <span className="count">{w.artifacts.length}</span></h2></header>
            {w.artifacts.length > 0 ? (
              <ul className="rows">
                {[...w.artifacts].sort((a, b) => b.createdAt - a.createdAt).map(a => {
                  const r = w.research.find(x => x.id === a.researchId);
                  return (
                    <li key={a.id} className="row row-click" onMouseEnter={e => this._showTip(e, w, 'a', a.id)} onMouseLeave={() => this._hideTip()} onClick={() => this._openArtifact(w.id, a.id)}>
                      <div className="main-c"><b>{a.name}</b><span>{typeName(a.type)} · from {r ? r.name : '—'}</span></div>
                      <div className="side-c">
                        {!this._canActA(a) && <span className="lock-note"><Ic n="lock" />Owner only</span>}
                        {a.status === 'building' ? <span className="badge b-running">Building</span> : <StatusCol status={a.status} />}
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="empty">No artifacts yet. Any research with at least one excerpt or figure can feed an artifact.{canWs && <button className="btn sm" onClick={() => this._openModal({ kind: 'new-artifact', wsId: w.id })}><Ic n="plus" />Create Artifact</button>}</div>
            )}
          </section>
        </div>
      </div>
    );
  }

  // ========================== RENDER: RESEARCH VIEW ==========================
  renderResearchView(w) {
    const { view } = this.state;
    const r = w.research.find(x => x.id === view.rid);
    if (!r) return { name: 'Research', content: this.renderNotice('Not found', 'This research no longer exists.'), agent: false };
    const dec = this._lastDecision(r);
    const titleEl = <><span className="mono muted">{r.code}</span><Badge status={r.status} />{r.round ? <span className="muted" style={{ fontSize: 12 }}>Round {r.round}</span> : null}</>;
    const artBtn = this._eligible(r) ? <button className="btn sm" onClick={() => this._openModal({ kind: 'new-artifact', wsId: w.id, rid: r.id })}><Ic n="doc" />Create artifact</button> : null;
    const recordBtn = dec ? <button className="btn sm ghost" onClick={() => this.setState({ view: { ...view, record: true } })}>View last review record</button> : null;
    const bar = (extra = null, notes = null) => (
      <div className="agent-bar">
        <button className="btn ghost sm" onClick={() => this.setState({ view: { kind: 'workspace', id: w.id } })}><Ic n="back" />{w.name}</button>
        <div className="t">{titleEl}</div>
        {extra}
      </div>
    );
    if (!this._canActR(r)) return { name: r.name, agent: false, content: <>{bar(recordBtn)}{this.renderNotice('Owned by ' + this._uname(r.createdBy), this._ownerNote('research', r.createdBy))}</> };
    if (r.status === 'rejected' && !this._mySubmission(r)) {
      return { name: r.name, agent: false, content: <>{bar(recordBtn)}{this.renderNotice('Returned to ' + this._uname(r.submittedBy), `Scientific Affairs rejected this research. It went back to ${this._uname(r.submittedBy)} for rework.`)}</> };
    }
    const agentSlot = (
      <div className="agent-slot">
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--accent-soft)', color: 'var(--accent)', display: 'grid', placeItems: 'center', margin: '0 auto 12px', fontSize: 22 }}><Ic n="flask" /></div>
          <div style={{ fontWeight: 600, fontSize: 15, color: 'var(--ink)', marginBottom: 4 }}>{r.name}</div>
          <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 16 }}>Research agent · {(ST[r.status] || ST.progress).l}</div>
          {r.status === 'draft' || r.status === 'progress' ? (
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
              {this._canActR(r) && <button className="btn primary sm" onClick={() => { r.status = 'mr-waiting'; this._touch(w); this._saveAfter(s => ({ workspaces: s.workspaces })); this._toast('Submitted for medical review'); }}>Submit for medical review</button>}
              {this._eligible(r) && <button className="btn sm" onClick={() => this._openModal({ kind: 'new-artifact', wsId: w.id, rid: r.id })}><Ic n="doc" />Create artifact</button>}
            </div>
          ) : null}
          {r.status === 'mr-waiting' && this._canActR(r) ? (
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
              <button className="btn sm" onClick={() => { r.status = 'progress'; this._touch(w); this._saveAfter(s => ({ workspaces: s.workspaces })); }}>Back to editing</button>
              <button className="btn primary sm" onClick={() => { r.status = 'sr-waiting'; r.round = (r.round || 0) + 1; r.submittedBy = this._meId(); r.submittedAt = Date.now(); this._touch(w); this._saveAfter(s => ({ workspaces: s.workspaces })); this._toast('Submitted for scientific review'); }}>Submit for scientific review</button>
            </div>
          ) : null}
          {r.status === 'sr-waiting' ? <p style={{ fontSize: 13, color: 'var(--muted)' }}>Waiting for a Scientific Affairs decision.</p> : null}
          {r.status === 'approved' ? <p style={{ fontSize: 13, color: 'var(--ok)', fontWeight: 500 }}>Approved {dec ? `by ${this._uname(dec.by)} on ${fmtTime(dec.at)}` : ''}</p> : null}
          {r.status === 'rejected' && dec ? (
            <div style={{ textAlign: 'left', maxWidth: 480 }}>
              <p style={{ color: 'var(--bad)', fontWeight: 600, marginBottom: 8 }}>Rejected by {this._uname(dec.by)} on {fmtTime(dec.at)}</p>
              {(dec.items || []).length > 0 && <ul className="fb-list">{(dec.items || []).map((x, i) => <li key={i}><b>{x.title}</b><p className="fb-reason">{x.reason}</p></li>)}</ul>}
              <button className="btn primary sm" style={{ marginTop: 12 }} onClick={() => { r.status = 'progress'; dec && (r.decisions = r.decisions.filter((_, i) => i < r.decisions.length - 1)); this._touch(w); this._saveAfter(s => ({ workspaces: s.workspaces })); this._toast('Returned to In progress'); }}>Start rework</button>
            </div>
          ) : null}
        </div>
      </div>
    );
    return {
      name: r.name, agent: true,
      content: (
        <>
          {bar(artBtn)}
          {r.status === 'sr-waiting' && <div className="agent-note">Waiting for a Scientific Affairs decision. You can view the review page but not change it.</div>}
          {r.status === 'rejected' && dec && <div className="agent-note">Rejected by {this._uname(dec.by)} on {fmtTime(dec.at)}. Fix the rejected items, then resubmit.</div>}
          {agentSlot}
        </>
      ),
    };
  }

  // ========================== RENDER: DECK VIEW ==========================
  renderDeckView(w) {
    const { view } = this.state;
    const a = w.artifacts.find(x => x.id === view.aid);
    if (!a) return { name: 'Artifact', content: this.renderNotice('Not found', 'This artifact no longer exists.'), agent: false };
    const r = w.research.find(x => x.id === a.researchId);
    const dec = this._lastDecision(a);
    const titleEl = <><b>{a.name}</b><Badge status={a.status} /><span className="muted" style={{ fontSize: 12 }}>HCP Deck · from {r ? r.name : '—'}</span></>;
    const bar = (
      <div className="agent-bar">
        <button className="btn ghost sm" onClick={() => this.setState({ view: { kind: 'workspace', id: w.id } })}><Ic n="back" />{w.name}</button>
        <div className="t">{titleEl}</div>
      </div>
    );
    if (!this._canActA(a)) return { name: a.name, agent: false, content: <>{bar}{this.renderNotice('Owned by ' + this._uname(a.createdBy), this._ownerNote('artifact', a.createdBy))}</> };
    const agentSlot = (
      <div className="agent-slot">
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--accent-soft)', color: 'var(--accent)', display: 'grid', placeItems: 'center', margin: '0 auto 12px', fontSize: 22 }}><Ic n="slides" /></div>
          <div style={{ fontWeight: 600, fontSize: 15, color: 'var(--ink)', marginBottom: 4 }}>{a.name}</div>
          <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 16 }}>Presentation Agent · HCP Deck</div>
          {['progress', 'unapproved'].includes(a.status) && this._canActA(a) && (
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
              {r && r.status === 'approved' && <button className="btn primary sm" onClick={() => this._simStep(w.id, a.id, 'mr-waiting')}>Start medical review</button>}
              {!(r && r.status === 'approved') && <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>Source research not yet approved. Build the deck, but it can't go to review yet.</p>}
            </div>
          )}
          {a.status === 'mr-waiting' && this._canActA(a) && (
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
              <button className="btn sm" onClick={() => this._simStep(w.id, a.id, 'progress')}>Back to editing</button>
              {r && r.status === 'approved' && <button className="btn primary sm" onClick={() => this._simStep(w.id, a.id, 'sr-waiting')}>Submit for scientific review</button>}
            </div>
          )}
          {a.status === 'sr-waiting' && <p style={{ fontSize: 13, color: 'var(--muted)' }}>Waiting for a Scientific Affairs decision.</p>}
          {a.status === 'approved' && dec && <p style={{ fontSize: 13, color: 'var(--ok)', fontWeight: 500 }}>Approved by {this._uname(dec.by)} on {fmtTime(dec.at)}</p>}
          {a.status === 'rejected' && dec && (
            <>
              <p style={{ color: 'var(--bad)', fontWeight: 600, marginBottom: 8 }}>Rejected by {this._uname(dec.by)} on {fmtTime(dec.at)}{dec.comment ? `: "${dec.comment}"` : ''}</p>
              {this._mySubmission(a) && <button className="btn primary sm" onClick={() => this._simStep(w.id, a.id, 'progress')}>Rework</button>}
            </>
          )}
        </div>
      </div>
    );
    return {
      name: a.name, agent: true,
      content: (
        <>
          {bar}
          {r && r.status !== 'approved' && <div className="agent-note">Source research isn't approved yet ({(ST[r.status] || {}).l || ''}). You can build the deck, but it can't go for review until the research is approved.</div>}
          {a.status === 'sr-waiting' && <div className="agent-note">Waiting for a Scientific Affairs decision. You can view the deck but not change it.</div>}
          {agentSlot}
        </>
      ),
    };
  }

  // ========================== RENDER: APPROVALS ==========================
  renderApprovals() {
    const { view } = this.state;
    const tab = view.tab || 'waiting';
    const wait = this._waitingItems();
    const dec = this._decidedItems();
    const isWaiting = tab === 'waiting';
    const rows = isWaiting ? wait : dec;
    return (
      <div className="page">
        <div className="page-head">
          <div><p className="eyebrow">Scientific Affairs</p><h1>Approval list</h1><p className="muted" style={{ marginTop: 4 }}>Research and artifacts that finished medical review and need a scientific decision.</p></div>
        </div>
        <div className="appr-tabs">
          <button aria-selected={isWaiting} onClick={() => this.setState({ view: { kind: 'approvals', tab: 'waiting' } })}>Waiting · {wait.length}</button>
          <button aria-selected={!isWaiting} onClick={() => this.setState({ view: { kind: 'approvals', tab: 'decided' } })}>Decided · {dec.length}</button>
        </div>
        {rows.length > 0 ? (
          <div className="tbl-wrap">
            <table className="appr">
              <thead><tr><th>Name</th><th>Type</th><th>Workspace</th><th>Round</th><th>{isWaiting ? 'Submitted by' : 'Decided by'}</th><th>{isWaiting ? 'Submitted' : 'Decided'}</th><th>Status</th></tr></thead>
              <tbody>
                {isWaiting ? wait.map(x => (
                  <tr key={x.it.id} className="click" onClick={() => this.setState({ view: { kind: 'sa-item', wsId: x.w.id, itype: x.itype, id: x.it.id } })}>
                    <td className="nm">{x.it.name}</td><td><span className="tchip">{this._itemType(x)}</span></td><td>{x.w.name}</td><td>{x.it.round || 1}</td><td>{this._uname(x.it.submittedBy)}</td><td>{x.it.submittedAt ? rel(x.it.submittedAt) : '—'}</td><td><StatusCol status="sr-waiting" /></td>
                  </tr>
                )) : dec.map((x, idx) => (
                  <tr key={idx} className="click" onClick={() => this.setState({ view: { kind: 'sa-decision', wsId: x.w.id, itype: x.itype, id: x.it.id, di: x.di } })}>
                    <td className="nm">{x.it.name}</td><td><span className="tchip">{this._itemType(x)}</span></td><td>{x.w.name}</td><td>{x.d.round}</td><td>{this._uname(x.d.by)}</td><td>{fmtTime(x.d.at)}</td><td><StatusCol status={x.d.outcome} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty panel">{isWaiting ? 'Nothing is waiting for scientific review.' : 'No decisions yet.'}</div>
        )}
      </div>
    );
  }

  // ========================== RENDER: SA ITEM ==========================
  renderSAItem() {
    const { view, modalState } = this.state;
    const { w, it } = this._findItem(view.wsId, view.itype, view.id);
    if (!it) return { crumb: <b>Not found</b>, content: this.renderNotice('Not found', 'This item no longer exists.'), agent: false };
    const crumb = <><span>Approval list</span><span>/</span><b>{it.name}</b></>;
    const backBtn = <button className="btn ghost sm" onClick={() => this.setState({ view: { kind: 'approvals', tab: 'waiting' } })}><Ic n="back" />Approval list</button>;
    const bar = (
      <div className="agent-bar">
        {backBtn}
        <div className="t"><b>{it.name}</b><span className="tchip">{view.itype === 'research' ? 'Research' : typeName(it.type)}</span><span className="muted" style={{ fontSize: 12 }}>{w.name} · round {it.round || 1} · submitted by {this._uname(it.submittedBy)}</span></div>
      </div>
    );
    if (it.status !== 'sr-waiting') return { crumb, agent: false, content: <>{bar}{this.renderNotice('Already decided', 'This item is no longer waiting for scientific review.', <button className="btn" onClick={() => this.setState({ view: { kind: 'approvals', tab: 'waiting' } })}>Back to approval list</button>)}</> };

    // For non-HCP artifacts, show the document + decision form
    if (view.itype === 'artifact' && it.type !== 'hcp') {
      return {
        crumb, agent: false,
        content: (
          <div className="page">
            {bar}
            <div className="review-host">
              {this.renderArtifactDoc(w, it)}
              <section className="panel" style={{ padding: '18px 20px', gap: 12, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: 15, fontWeight: 600 }}>Scientific decision</h3>
                <div className="field">
                  <label htmlFor="sa-comment">Comment <span className="muted">(required to reject)</span></label>
                  <textarea className="input" id="sa-comment" rows={3} placeholder={`Add a comment for ${this._uname(it.submittedBy)}`} ref={this._saCommentRef} />
                </div>
                {modalState.saErr && <p className="err">{modalState.saErr}</p>}
                <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                  <button className="btn" style={{ color: 'var(--bad)' }} onClick={() => this._simDecide(view.wsId, view.itype, view.id, 'rejected')}><Ic n="x" />Reject</button>
                  <button className="btn primary" onClick={() => this._simDecide(view.wsId, view.itype, view.id, 'approved')}><Ic n="check" />Approve</button>
                </div>
              </section>
            </div>
          </div>
        ),
      };
    }

    // Research or HCP deck: show agent slot with approve/reject
    const agentSlot = (
      <div className="agent-slot">
        <div style={{ textAlign: 'center', maxWidth: 500 }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--accent-soft)', color: 'var(--accent)', display: 'grid', placeItems: 'center', margin: '0 auto 12px', fontSize: 22 }}>{view.itype === 'research' ? <Ic n="flask" /> : <Ic n="slides" />}</div>
          <div style={{ fontWeight: 600, fontSize: 15, color: 'var(--ink)', marginBottom: 4 }}>{it.name}</div>
          <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 20 }}>{view.itype === 'research' ? 'Research' : 'HCP Deck'} · submitted by {this._uname(it.submittedBy)} · round {it.round || 1}</div>
          <div className="field" style={{ marginBottom: 12, textAlign: 'left' }}>
            <label>Scientific decision comment <span className="muted">(required to reject)</span></label>
            <textarea className="input" rows={3} placeholder={`Add a comment for ${this._uname(it.submittedBy)}`} ref={this._saCommentRef} />
          </div>
          {modalState.saErr && <p className="err">{modalState.saErr}</p>}
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
            <button className="btn" style={{ color: 'var(--bad)' }} onClick={() => this._simDecide(view.wsId, view.itype, view.id, 'rejected')}><Ic n="x" />Reject</button>
            <button className="btn primary" onClick={() => this._simDecide(view.wsId, view.itype, view.id, 'approved')}><Ic n="check" />Approve</button>
          </div>
        </div>
      </div>
    );
    return { crumb, agent: true, content: <>{bar}{agentSlot}</> };
  }

  // ========================== RENDER: SA DECISION ==========================
  renderSADecision() {
    const { view } = this.state;
    const { w, it } = this._findItem(view.wsId, view.itype, view.id);
    const d = it && it.decisions && it.decisions[view.di];
    if (!d) return { crumb: <b>Not found</b>, content: this.renderNotice('Not found', 'This decision no longer exists.') };
    const crumb = <><span>Approval list</span><span>/</span><b>{it.name}</b></>;
    const bar = (
      <div className="agent-bar">
        <button className="btn ghost sm" onClick={() => this.setState({ view: { kind: 'approvals', tab: 'decided' } })}><Ic n="back" />Approval list</button>
        <div className="t"><b>{it.name}</b><span className="tchip">{view.itype === 'research' ? 'Research' : typeName(it.type)}</span><span className="muted" style={{ fontSize: 12 }}>{w.name}</span></div>
      </div>
    );
    const decBar = (
      <div className={`decision-bar ${d.outcome}`}>
        <Ic n={d.outcome === 'approved' ? 'shield' : 'alert'} />
        <span><b>{d.outcome === 'approved' ? 'Approved' : 'Rejected'}</b> by {this._uname(d.by)} on {fmtTime(d.at)} · round {d.round}. This record is view-only.</span>
      </div>
    );
    if (view.itype === 'artifact' && it.type !== 'hcp') {
      return {
        crumb,
        content: (
          <div className="page">
            {bar}
            {decBar}
            <div className="review-host">
              {this.renderArtifactDoc(w, it)}
              {d.comment && <section className="panel" style={{ padding: '14px 18px' }}><span className="label">Comment</span><p>{d.comment}</p></section>}
            </div>
          </div>
        ),
      };
    }
    return {
      crumb,
      content: (
        <>
          {bar}
          {decBar}
          <div className="agent-slot">
            <div style={{ textAlign: 'center' }}>
              <Ic n={d.outcome === 'approved' ? 'shield' : 'alert'} cls={d.outcome === 'approved' ? '' : ''} />
              <div style={{ fontWeight: 600, fontSize: 15, marginTop: 12, color: d.outcome === 'approved' ? 'var(--ok)' : 'var(--bad)' }}>{d.outcome === 'approved' ? 'Approved' : 'Rejected'}</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>by {this._uname(d.by)} · {fmtTime(d.at)}</div>
              {d.comment && <p style={{ fontSize: 13, marginTop: 8, maxWidth: 360 }}>"{d.comment}"</p>}
            </div>
          </div>
        </>
      ),
    };
  }

  // ========================== RENDER: ADMIN HOME ==========================
  renderAdminHome() {
    const { users } = this.state;
    return (
      <div className="admin-home">
        <div className="page-head">
          <div><p className="eyebrow">Administration</p><h1>Hello, {this.state.user.greet}</h1><p className="muted" style={{ marginTop: 4 }}>Your account has the Admin role only. Admin adds access to Settings.</p></div>
          <button className="btn primary" onClick={() => this._openModal({ kind: 'settings', tab: 'users' })}><Ic n="gear" />Open settings</button>
        </div>
        <section className="panel">
          <header><h2><Ic n="users" />People and roles</h2></header>
          <div className="tscroll">
            <table className="utable" style={{ margin: '4px 0' }}>
              <tbody>
                {users.map(u => (
                  <tr key={u.id}>
                    <td style={{ paddingLeft: 18 }}><div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Av user={u} />{u.name}</div></td>
                    <td className="mono">{u.id}</td>
                    <td><RoleChips user={u} inMenu /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    );
  }

  // ========================== RENDER: ARTIFACT DOC ==========================
  renderArtifactDoc(w, a) {
    const r = w.research.find(x => x.id === a.researchId);
    const P = w.product;
    const t = w.topic.split(':')[0].trim().toLowerCase();
    let body = null;
    if (a.type === 'protocol') body = (
      <section>
        <h3>Protocol outline</h3>
        <ol style={{ marginTop: 6 }}>
          <li><b>Background.</b> Rationale drawn from "{r ? r.name : ''}" on {t}.</li>
          <li><b>Assessment & screening.</b> Who qualifies, and which baseline measures to take.</li>
          <li><b>Foundation phase.</b> Diet and lifestyle steps supported by the research.</li>
          <li><b>Targeted intervention.</b> Where {P} fits, with dosing taken only from the research.</li>
          <li><b>Monitoring & follow-up.</b> What to track and when to review.</li>
          <li><b>Safety & contraindications.</b> As reported in the research.</li>
        </ol>
      </section>
    );
    else if (a.type === 'blog') body = (
      <>
        <section><h3>Blog post</h3><h2 style={{ fontSize: 20, fontWeight: 500, marginTop: 6 }}>What clinicians should know about {t}</h2><p style={{ marginTop: 8 }}>Recent evidence has changed how care teams approach {t}. This post walks through the data, where {P} fits, and the questions still open for practice.</p></section>
        <section><h3>Blurbs</h3><div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
          <div className="blurb"><p className="eyebrow">Newsletter</p>New evidence summary on {t}, including {P} data.</div>
          <div className="blurb"><p className="eyebrow">Social</p>How is the evidence on {t} evolving? Our medical team summarises the latest data.</div>
          <div className="blurb"><p className="eyebrow">Email subject line</p>{P}: the evidence at a glance</div>
        </div></section>
      </>
    );
    else body = (
      <section><h3>Fact sheet</h3><div className="facts" style={{ marginTop: 8 }}>
        {['Primary endpoint met in the pivotal trial', 'Consistent effect across pre-specified subgroups', 'No new safety signals reported', 'Evidence grade and funding shown for every fact'].map((f, i) => (
          <div key={i} className="fact"><span className="mono muted">FACT {pad(i + 1, 2)} · Ref {i + 1}</span><b style={{ fontWeight: 500 }}>{f} ({P}).</b></div>
        ))}
      </div></section>
    );
    return (
      <div className="doc panel" style={{ padding: '18px 20px' }}>
        <div className="doc-meta">
          <span>{typeName(a.type)} · <span className="mono">{a.code}</span></span>
          <span>Source research <b>{r ? r.name : '—'}</b></span>
          <span>Hero product <b>{P}</b></span>
        </div>
        {body}
        <p className="sample-note">Simulated output. Only HCP Decks are built by the Presentation Agent.</p>
      </div>
    );
  }

  // ========================== RENDER: NOTICE ==========================
  renderNotice(title, text, acts = null) {
    return (
      <div className="notice-page">
        <h2>{title}</h2>
        <p className="muted">{text}</p>
        {acts && <div className="acts">{acts}</div>}
      </div>
    );
  }

  // ========================== RENDER: MODALS ==========================
  renderModal() {
    const { modal, modalState, workspaces, users, perms, citationDepth, showSwitchUser } = this.state;
    if (!modal) return null;
    const w = modal.wsId ? this._wsById(modal.wsId) : null;

    const dialog = ({ title, sub, body, footer, wide, tabs }) => (
      <div className="overlay" onClick={e => e.target === e.currentTarget && this._closeModal()}>
        <div className={`dialog${wide ? ' wide' : ''}`} role="dialog" aria-modal="true">
          <header>
            <div><h2>{title}</h2>{sub && <p>{sub}</p>}</div>
            <button className="icon-btn" onClick={() => this._closeModal()} aria-label="Close"><Ic n="x" /></button>
          </header>
          {tabs}
          <div className="body">{body}</div>
          {footer && <footer>{footer}</footer>}
        </div>
      </div>
    );

    const inheritBox = () => w ? (
      <div className="inherit">
        <div><span className="label"><Ic n="target" />Topic of the Month <span className="lock"><Ic n="lock" />inherited</span></span><b>{w.topic}</b></div>
        <div><span className="label"><Ic n="pill" />Hero Product of the Month <span className="lock"><Ic n="lock" />inherited</span></span><b>{w.product}</b></div>
      </div>
    ) : null;

    switch (modal.kind) {
      case 'new-ws': return dialog({
        title: 'Create workspace', sub: 'Topic and hero product are fixed once the workspace is created.',
        body: (
          <form id="f-ws" className="form" onSubmit={e => this._createWorkspace(e)}>
            <div className="field"><label htmlFor="ws-name">Workspace name</label><input className="input" id="ws-name" maxLength={80} placeholder="e.g. November HCP Cycle" /></div>
            <div className="field"><label htmlFor="ws-topic">Topic of the Month <span className="lock"><Ic n="lock" />cannot be changed later</span></label><input className="input" id="ws-topic" maxLength={140} placeholder="e.g. Histamine Intolerance" /></div>
            <div className="field"><label htmlFor="ws-product">Hero Product of the Month <span className="lock"><Ic n="lock" />cannot be changed later</span></label><input className="input" id="ws-product" maxLength={60} placeholder="e.g. DAO Enzyme" /></div>
            <p className="err" id="ws-err"></p>
          </form>
        ),
        footer: <><button className="btn" onClick={() => this._closeModal()}>Cancel</button><button className="btn primary" type="submit" form="f-ws">Create workspace</button></>,
      });

      case 'rename-ws': return dialog({
        title: 'Rename workspace', sub: 'Only the name can be edited.',
        body: (
          <form id="f-rename" className="form" onSubmit={e => this._renameWorkspace(e, modal.wsId)}>
            <div className="field"><label htmlFor="rn-name">Workspace name</label><input className="input" id="rn-name" maxLength={80} defaultValue={w ? w.name : ''} /></div>
            <div className="field"><label>Topic of the Month <span className="lock"><Ic n="lock" />locked</span></label><input className="input" readOnly value={w ? w.topic : ''} onChange={() => {}} /></div>
            <div className="field"><label>Hero Product of the Month <span className="lock"><Ic n="lock" />locked</span></label><input className="input" readOnly value={w ? w.product : ''} onChange={() => {}} /></div>
            <p className="err" id="rn-err"></p>
          </form>
        ),
        footer: <><button className="btn" onClick={() => this._closeModal()}>Cancel</button><button className="btn primary" type="submit" form="f-rename">Save name</button></>,
      });

      case 'new-research': {
        const suggestedName = w ? this._uniqueName(w, `${slug(w.topic)}_${slug(w.product)}_${tsStamp()}`) : '';
        return dialog({
          title: 'Create research', sub: w ? `In ${w.name}` : '',
          body: (
            <form id="f-research" className="form" onSubmit={e => this._createResearch(e, modal.wsId)}>
              <div className="field"><label htmlFor="rs-name">Research name</label><input className="input" id="rs-name" maxLength={120} defaultValue={suggestedName} /><span className="muted" style={{ fontSize: 12 }}>Must be unique among research and artifacts in this workspace.</span></div>
              {inheritBox()}
              <p className="note-box">The research agent receives this name, the topic and the hero product.</p>
              <p className="err" id="rs-err"></p>
            </form>
          ),
          footer: <><button className="btn" onClick={() => this._closeModal()}>Cancel</button><button className="btn primary" type="submit" form="f-research">Create research</button></>,
        });
      }

      case 'run-choice': {
        const r = w && w.research.find(x => x.id === modal.rid);
        return dialog({
          title: 'Research created', sub: r ? `"${r.name}" is saved as ${r.code}.` : '',
          body: (
            <>
              <p style={{ marginBottom: 14 }}>Open the research agent now, or run it later from the workspace.</p>
              <div className="choice">
                <button onClick={() => this._runNow(modal.wsId, modal.rid)}><b><Ic n="play" />Run now</b><span>Open the research agent with this research.</span></button>
                <button onClick={() => this._closeModal()}><b><Ic n="clock" />Do it later</b><span>Saved as In progress · not run.</span></button>
              </div>
            </>
          ),
        });
      }

      case 'new-artifact': {
        if (!w) return null;
        const done = w.research.filter(r => this._eligible(r));
        if (!done.length) return dialog({
          title: 'Create artifact', sub: `In ${w.name}`,
          body: <>{inheritBox()}<div className="empty">Artifacts are built from research that holds at least one excerpt or figure. Run research in this workspace first.</div></>,
          footer: <><button className="btn" onClick={() => this._closeModal()}>Close</button><button className="btn primary" onClick={() => this._openModal({ kind: 'new-research', wsId: w.id })}><Ic n="flask" />Create Research</button></>,
        });
        const pre = (modal.rid && done.some(r => r.id === modal.rid)) ? modal.rid : (done.find(r => r.status === 'approved') || done[0] || {}).id;
        const selR = done.find(r => r.id === (modalState.afResearch || pre));
        const selType = modalState.afType || 'hcp';
        return dialog({
          title: 'Create artifact', sub: `In ${w.name}`, wide: true,
          body: (
            <form id="f-artifact" className="form" onSubmit={e => this._createArtifact(e, modal.wsId)}>
              {inheritBox()}
              <div className="field">
                <label htmlFor="af-research">Research to use</label>
                <select className="input" id="af-research" defaultValue={pre} onChange={e => this.setState(s => ({ modalState: { ...s.modalState, afResearch: e.target.value } }))}>
                  {done.map(r => <option key={r.id} value={r.id}>{r.name} — {r.status === 'approved' ? 'Approved' : 'Unapproved · ' + (ST[r.status] || {}).l}</option>)}
                </select>
                <span className="muted" style={{ fontSize: 12 }}>{selR && selR.status === 'approved' ? 'Approved research. The artifact can go through review.' : 'Unapproved research. The artifact can\'t be sent for review until the research is approved.'}</span>
              </div>
              <div className="field">
                <span className="label">Artifact type</span>
                <div className="types">
                  {ART_TYPES.map((t, i) => (
                    <div key={t.id} className="type-opt">
                      <input type="radio" name="atype" id={`at-${t.id}`} value={t.id} defaultChecked={i === 0} onChange={() => this.setState(s => ({ modalState: { ...s.modalState, afType: t.id } }))} />
                      <label htmlFor={`at-${t.id}`}><Ic n={t.id === 'hcp' ? 'slides' : t.id === 'facts' ? 'check' : 'doc'} /><div><b>{t.name}</b><span>{t.desc}</span></div></label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="field"><label htmlFor="af-name">Artifact name</label><input className="input" id="af-name" maxLength={90} defaultValue={selR ? this._suggestName(w, selR, selType) : ''} /><span className="muted" style={{ fontSize: 12 }}>Must be unique in this workspace.</span></div>
              <p className="err" id="af-err"></p>
            </form>
          ),
          footer: <><button className="btn" onClick={() => this._closeModal()}>Cancel</button><button className="btn primary" type="submit" form="f-artifact"><Ic n="play" />Create artifact</button></>,
        });
      }

      case 'art-agent': {
        const a = w && w.artifacts.find(x => x.id === modal.aid);
        const r = a && w.research.find(x => x.id === a.researchId);
        if (!a) return null;
        const steps = this._artSteps(a, r);
        return dialog({
          title: a.status === 'building' ? 'Building artifact' : 'Artifact ready',
          sub: a.status === 'building' ? 'You can close this window. The build continues in the background.' : undefined,
          body: (
            <>
              <div className="agent-top"><span className="ico"><Ic n="doc" /></span><div><b>Content agent</b><span className="muted" style={{ fontSize: 12.5 }}>{a.name} · {typeName(a.type)}</span></div></div>
              <ol className="steps">
                {steps.map((s, i) => <li key={i} className={i < a.step ? 'done' : i === a.step && a.status === 'building' ? 'now' : ''}><span className="dot">{i < a.step ? <Ic n="check" /> : ''}</span>{s}</li>)}
              </ol>
              {a.status !== 'building' && <p className="note-box" style={{ marginTop: 12 }}>{a.status === 'unapproved' ? 'Status: Unapproved. Built from unapproved research.' : 'Status: In progress. Next, start medical review.'}</p>}
            </>
          ),
          footer: a.status === 'building'
            ? <button className="btn" onClick={() => this._closeModal()}>Run in background</button>
            : <><button className="btn" onClick={() => this._closeModal()}>Done</button><button className="btn primary" onClick={() => this._openArtifact(modal.wsId, modal.aid)}>Open artifact</button></>,
        });
      }

      case 'artifact': {
        const a = w && w.artifacts.find(x => x.id === modal.aid);
        if (!a) return null;
        const r = w.research.find(x => x.id === a.researchId);
        const dec = this._lastDecision(a);
        const mine = this._mySubmission(a);
        let act = null, note = null;
        if (a.status === 'progress' && !(r && r.status === 'approved')) { a.status = 'unapproved'; this._save(); }
        if (a.status === 'unapproved') {
          if (r && r.status === 'approved') { note = 'The source research is now approved, so this artifact can go through review.'; act = <button className="btn primary" onClick={() => this._simStep(modal.wsId, modal.aid, 'mr-waiting')}>Start medical review</button>; }
          else note = 'Built from unapproved research, so this is its final stage.';
        } else if (a.status === 'progress') act = <button className="btn primary" onClick={() => this._simStep(modal.wsId, modal.aid, 'mr-waiting')}>Start medical review</button>;
        else if (a.status === 'mr-waiting') {
          if (r && r.status === 'approved') act = <><button className="btn" onClick={() => this._simStep(modal.wsId, modal.aid, 'progress')}>Back to editing</button><button className="btn primary" onClick={() => this._simStep(modal.wsId, modal.aid, 'sr-waiting')}>Submit for scientific review</button></>;
          else { note = 'Source research not yet approved.'; act = <button className="btn" onClick={() => this._simStep(modal.wsId, modal.aid, 'progress')}>Back to editing</button>; }
        } else if (a.status === 'sr-waiting') note = 'Waiting for a Scientific Affairs decision.';
        else if (a.status === 'rejected') { note = `Rejected by ${this._uname(dec.by)} on ${fmtTime(dec.at)}${dec.comment ? `: "${dec.comment}"` : ''}.`; if (mine) act = <button className="btn primary" onClick={() => this._simStep(modal.wsId, modal.aid, 'progress')}>Rework</button>; else note += ` Returned to ${this._uname(a.submittedBy)}.`; }
        else if (a.status === 'approved') note = `Approved by ${this._uname(dec.by)} on ${fmtTime(dec.at)}.`;
        return dialog({
          title: a.name, sub: `${typeName(a.type)} · ${a.code}`, wide: true,
          body: (
            <>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}><StatusCol status={a.status} /></div>
              {this.renderArtifactDoc(w, a)}
              {note && <p className="note-box" style={{ marginTop: 12 }}>{note}</p>}
              {!this._canActA(a) && <p className="note-box" style={{ marginTop: 12 }}><Ic n="lock" /> {this._ownerNote('artifact', a.createdBy)}</p>}
            </>
          ),
          footer: <><button className="btn" onClick={() => this._closeModal()}>Close</button>{this._canActA(a) && act}</>,
        });
      }

      case 'settings': {
        const tab = modal.tab || 'users';
        const tabs = (
          <div className="tabs">
            {[['users', 'Users & roles'], ['perms', 'Permissions'], ['agent', 'Research agent'], ['data', 'Demo data']].map(([k, l]) => (
              <button key={k} className={`tab${tab === k ? ' on' : ''}`} onClick={() => this._openModal({ ...modal, tab: k })}>{l}</button>
            ))}
          </div>
        );
        let body = null;
        if (tab === 'users') body = (
          <>
            <div className="tscroll" style={{ marginTop: 8 }}>
              <table className="utable"><thead><tr><th>User</th><th>User ID</th><th>Roles</th></tr></thead>
                <tbody>{users.map(u => {
                  const me = this.state.user;
                  return (
                    <tr key={u.id}>
                      <td><div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Av user={u} />{u.name}</div></td>
                      <td className="mono">{u.id}</td>
                      <td><div className="role-grid">{ROLES.map(r => {
                        const on = u.roles.includes(r);
                        const clash = (r === MA_R && u.roles.includes(SA_R)) || (r === SA_R && u.roles.includes(MA_R));
                        const self = u.id === me.id && r === ADMIN_R && on;
                        const dis = clash || self;
                        return <label key={r} className={dis ? 'off' : ''} title={clash ? 'MA and SA can\'t be combined' : self ? 'You can\'t remove your own Admin role' : ''}><input type="checkbox" checked={on} disabled={dis} onChange={e => this._changeRole(u.id, r, e.target.checked)} /> {r}</label>;
                      })}</div></td>
                    </tr>
                  );
                })}</tbody>
              </table>
            </div>
            <p className="muted" style={{ fontSize: 12.5, marginTop: 10 }}>Medical Affairs and Scientific Affairs can't be held together, so nobody approves their own work.</p>
            {modalState.roleErr && <p className="err">{modalState.roleErr}</p>}
          </>
        );
        else if (tab === 'perms') {
          const row = (key, title, desc) => {
            const locked = key !== 'othersWorkspace' && !perms.othersWorkspace;
            return (
              <div key={key} className={`set-row${locked ? ' locked' : ''}`}>
                <div><b>{title}</b><p>{desc}{locked && <><br /><span className="lock-why">Set to Owner only because Workspaces is Owner only.</span></>}</p></div>
                <label className="switch" title={locked ? 'Workspaces is Owner only' : ''}>
                  <input type="checkbox" checked={perms[key]} disabled={locked} onChange={e => this._changePerm(key, e.target.checked)} />
                  <span className="track"></span><span className="sw-lab">{perms[key] ? 'Anyone' : 'Owner only'}</span>
                </label>
              </div>
            );
          };
          body = (
            <>
              <p className="muted" style={{ fontSize: 12.5, margin: '10px 0 2px' }}>Choose who can work on items they didn't create.</p>
              {row('othersWorkspace', 'Workspaces', 'Rename a workspace and create research or artifacts in it.')}
              {row('othersResearch', 'Research', 'Run, edit, submit and rework research in the Research Agent.')}
              {row('othersArtifact', 'Artifacts', 'Build, edit and send artifacts for review.')}
            </>
          );
        } else if (tab === 'agent') body = (
          <>
            <div className="set-row">
              <div><b>Citation depth</b><p>How many levels of citations the Research Agent lets you follow.</p></div>
              <div className="num-set"><input className="input" type="number" min={0} max={10} step={1} defaultValue={citationDepth} onBlur={e => { const n = parseInt(e.target.value); if (Number.isInteger(n) && n >= 0 && n <= 10) this._saveAfter(() => ({ citationDepth: n })); }} /><span className="muted" style={{ fontSize: 12.5 }}>levels (0–10)</span></div>
            </div>
          </>
        );
        else body = (
          <>
            <div className="set-row">
              <div><b>Switch user in the account menu</b><p>Shows a list of sample users in the account menu.</p></div>
              <label className="switch"><input type="checkbox" checked={showSwitchUser} onChange={e => this._saveAfter(() => ({ showSwitchUser: e.target.checked }))} /><span className="track"></span><span className="sw-lab">{showSwitchUser ? 'Shown' : 'Hidden'}</span></label>
            </div>
            <div className="set-row">
              <div><b>Reset demo data</b><p>Restores the sample workspaces and users. Everything created is removed.</p></div>
              {modalState.confirmReset ? (
                <div style={{ display: 'flex', gap: 8 }}><button className="btn sm" onClick={() => this.setState(s => ({ modalState: { ...s.modalState, confirmReset: false } }))}>Keep data</button><button className="btn sm primary" onClick={() => this._resetData()}>Reset now</button></div>
              ) : (
                <button className="btn sm" onClick={() => this.setState(s => ({ modalState: { ...s.modalState, confirmReset: true } }))}>Reset data</button>
              )}
            </div>
          </>
        );
        return dialog({ title: 'Settings', sub: 'Administration', tabs, body, wide: true, footer: <button className="btn primary" onClick={() => this._closeModal()}>Done</button> });
      }

      case 'notice': return dialog({
        title: 'Message', body: <p style={{ whiteSpace: 'pre-wrap' }}>{modal.text}</p>,
        footer: <button className="btn primary" onClick={() => this._closeModal()}>OK</button>,
      });

      default: return null;
    }
  }

  // ========================== TOOLTIPS ==========================
  _showTip(e, w, tipType, itemId) {
    const rect = e.currentTarget.getBoundingClientRect();
    let html = '';
    if (tipType === 'r') {
      const r = w.research.find(x => x.id === itemId);
      if (!r) return;
      html = { type: 'research', item: r, w };
    } else {
      const a = w.artifacts.find(x => x.id === itemId);
      if (!a) return;
      html = { type: 'artifact', item: a, w };
    }
    const tw = 380, vw = window.innerWidth, vh = window.innerHeight;
    let left = Math.min(Math.max(8, rect.left + 24), vw - tw - 8);
    let top = rect.bottom + 6;
    if (top + 200 > vh - 8) top = Math.max(8, rect.top - 200 - 6);
    this.setState({ tip: { ...html, left, top } });
  }
  _hideTip() { this.setState({ tip: null }); }

  renderTooltip() {
    const { tip } = this.state;
    if (!tip) return null;
    const { type, item, w, left, top } = tip;
    const dec = this._lastDecision(item);
    const mr = ['sr-waiting', 'approved', 'rejected'].includes(item.status) ? 'Complete' : item.status === 'mr-waiting' ? 'Waiting' : item.status === 'unapproved' ? 'Not eligible' : 'Not started';
    const sr = ['approved', 'rejected'].includes(item.status) ? 'Complete' : item.status === 'sr-waiting' ? 'Waiting' : item.status === 'unapproved' ? 'Not eligible' : 'Not started';
    const row = (k, v) => v ? <div key={k} className="tip-r"><span>{k}</span><b dangerouslySetInnerHTML={{ __html: v }} /></div> : null;
    return (
      <div className="row-tip-el" style={{ left, top }}>
        <div className="tip-h"><span className="tchip">{type === 'research' ? 'Research' : typeName(item.type)}</span><b>{item.name}</b></div>
        {row('Status', `<span class="badge ${(ST[item.status] || ST.progress).c}">${(ST[item.status] || ST.progress).l}</span>`)}
        {row('Medical review', mr)}
        {row('Scientific review', sr)}
        {row('Code', `<span class="mono">${item.code}</span>`)}
        {row('Workspace', w.name)}
        {dec && row('Last decision', `${dec.outcome === 'approved' ? 'Approved' : 'Rejected'} by ${this._uname(dec.by)} · ${fmtTime(dec.at)}`)}
        <p className="tip-f">Click to open</p>
      </div>
    );
  }

  // ========================== MAIN RENDER ==========================
  render() {
    const { user, toast } = this.state;
    return (
      <div className="ev-app" onClick={() => this.state.menu && this.setState({ menu: false })}>
        {user ? this.renderShell() : this.renderLogin()}
        {this.renderModal()}
        {this.renderTooltip()}
        {toast && <div id="ev-toast">{toast}</div>}
      </div>
    );
  }
}
