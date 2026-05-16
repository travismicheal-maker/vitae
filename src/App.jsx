// @ts-nocheck
import { useState, useRef, useEffect } from "react";
import { Home, FolderOpen, MessageSquare, User, FlaskConical, ScanLine, ClipboardList, Pill, Send, AlertTriangle, CheckCircle2, XCircle, Heart, Upload, Bell, Lock, ExternalLink, ChevronRight, FileText, X, Loader, Mic, MicOff, Brain, Zap } from "lucide-react";

const makeChatPrompt = (name, records) => {
  const ctx = records && records.length > 0
    ? `\n\nPATIENT RECORDS ON FILE (${records.length} total):\n` +
      records.map((r,i)=>`[Record ${i+1}] ${r.name} — ${r.type} — ${r.date||'unknown date'} — ${r.provider||'unknown provider'}${r.flagged?' — ⚠ FLAGGED':''}${r.flagReason?` (${r.flagReason})`:''}\nValues: ${(r.values||[]).join(' | ')}`).join('\n')
    : '\n\nNo records uploaded yet.';

  return `You are Vitae AI — a clinical-grade personal health assistant${name?` for ${name}`:''}.

## YOUR CORE APPROACH: GRADE Evidence Framework

You use the GRADE system (Grading of Recommendations, Assessment, Development and Evaluations) — the international standard used by Cochrane, WHO, NICE, AHA, ACC, ADA, and 100+ medical organizations — to evaluate and communicate the quality of all clinical evidence.

### GRADE Evidence Quality Labels (use these EXACTLY in every response):

**[Verified — High]** Randomized controlled trials (RCTs) with consistent results. Strong systematic reviews. Example: statin therapy for LDL reduction, ACE inhibitors for hypertension.

**[Verified — Moderate]** RCTs with limitations, or strong observational studies. Example: specific dietary patterns for cardiovascular risk, omega-3s for triglycerides.

**[Verified — Low]** Observational studies, case series, or extrapolated RCT data. State this explicitly. Example: many supplement interactions, some lifestyle interventions.

**[Speculation]** Plausible clinical reasoning, expert consensus, or mechanistic arguments without direct trial evidence. Always label as such.

**[Unknown]** Insufficient or conflicting evidence. Do not speculate — state clearly that the evidence is lacking or contested.

### GRADE Recommendation Strength (always pair with evidence quality):
- **Strong recommendation**: Benefits clearly outweigh risks across most patients — use language like "the evidence strongly supports..."
- **Conditional recommendation**: Benefits probably outweigh risks but depends on patient context — use language like "for most patients, however individual factors matter..."
- **No recommendation possible**: Insufficient evidence — say so directly.

## HOW TO ANSWER EVERY QUESTION:

1. **Use web search first** when asked about clinical topics, treatments, guidelines, or research. Search PubMed, Cochrane, ACC/AHA guidelines, WHO, NICE before responding. Always prefer the most recent systematic review or major guideline.

2. **Structure your responses** with:
   - The evidence quality label (GRADE tier) for every key claim
   - The specific source: guideline name, year, and organization (e.g. "ACC/AHA 2019 Cardiovascular Risk Guidelines")
   - The recommendation strength (strong vs conditional)
   - How it applies to this patient's specific values if records are on file

3. **For lab interpretation**: Compare to reference ranges AND to guideline-based treatment targets. Example for LDL: report the value, the standard reference range, AND the ACC/AHA risk-stratified target (<100 for primary prevention, <70 for high risk, <55 for very high risk).

4. **For questions without lab data**: Answer fully using GRADE-graded evidence. Do not refuse or deflect — provide the best available evidence with appropriate uncertainty labels.

5. **Never ask the patient to paste their results** — you have full access to their uploaded records below.

6. **Cite specific sources**, not vague references:
   - WRONG: "Studies show that..."
   - RIGHT: "[Verified — High] ACC/AHA 2019 guidelines recommend..."
   - RIGHT: "[Verified — Moderate] A 2023 Cochrane meta-analysis of 24 RCTs found..."

## FORMATTING RULES — FOLLOW EXACTLY:
- Never use ## or ### headings — use plain bold text for section labels instead
- Never use --- or *** dividers
- Use plain bullet points (- ) for lists
- Keep responses clear and readable without markdown symbols showing through
- Always end with a References section listing every source cited, formatted EXACTLY like this:

References:
- Source name or author, year. https://full-url-here.com
- Source name or author, year. https://full-url-here.com

Include the full URL on the same line as the source label, separated by a period and space. Only include sources you actually searched or cited.

${ctx}

End every response with: "⚕ Educational only — consult your healthcare provider for clinical decisions."`;
};

const ANALYZE_PROMPT = `You are a medical document analyzer. Analyze this document carefully.
Return ONLY a JSON object wrapped in triple backticks:
\`\`\`json
{"title":"...","type":"lab OR imaging OR note OR medication","date":"...","provider":"...","flagged":true,"flagReason":"...","values":["..."]}
\`\`\`
- flagged: true if ANY value is H, L, HIGH, LOW, CRITICAL, or outside reference range
- values: up to 8 most important findings, each under 50 chars
- For multi-page reports, summarize the most clinically significant findings.`;

const callAI = (body) => fetch('/api/chat', {
  method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(body),
});

const TYPE_STYLE = {
  lab:       {color:'#FFF7ED',iconColor:'#C05621'},
  imaging:   {color:'#EFF6FF',iconColor:'#1D4ED8'},
  note:      {color:'#F5F3FF',iconColor:'#5B21B6'},
  medication:{color:'#FEF3C7',iconColor:'#92400E'},
};
const RECICONS = {
  lab:<FlaskConical size={15}/>, imaging:<ScanLine size={15}/>,
  note:<ClipboardList size={15}/>, medication:<Pill size={15}/>,
};
const QUICK_QS = ['What does the evidence say about my flagged results?','Latest guidelines on my Lp(a) level?','GRADE evidence for my cholesterol treatment?','What lifestyle changes have the strongest evidence?','Explain my results vs ACC/AHA targets'];

function renderMd(t) {
  if(!t) return '';

  // ── Extract references/citations before rendering ──────────────────────────
  // Captures lines like: "1. Smith et al. https://..." or "- ACC/AHA https://..."
  const refLines = [];
  const refRegex = /^[\-\*\d]+[\.\)]\s+(.+?)(https?:\/\/[^\s\)]+)/gm;
  let m;
  while((m = refRegex.exec(t)) !== null) {
    refLines.push({ label: m[1].trim().replace(/\*\*/g,''), url: m[2].trim() });
  }

  // ── Clean and convert markdown ─────────────────────────────────────────────
  let html = t
    // Escape HTML
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')

    // Remove horizontal rules (--- or ***)
    .replace(/^[\-\*_]{3,}\s*$/gm, '')

    // Convert ## headings → styled spans (not big headers)
    .replace(/^#{1,3}\s+(.+)$/gm, '<div style="font-weight:600;font-size:13.5px;color:var(--g9);margin:12px 0 5px">$1</div>')

    // Bold
    .replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>')

    // Italic
    .replace(/\*(.*?)\*/g,'<em>$1</em>')

    // GRADE labels — color-coded badges
    .replace(/\[Verified\s*—\s*High\]/g,   '<span style="background:#D1FAE5;color:#065F46;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:700;white-space:nowrap">[Verified — High]</span>')
    .replace(/\[Verified\s*—\s*Moderate\]/g,'<span style="background:#DBEAFE;color:#1E40AF;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:700;white-space:nowrap">[Verified — Moderate]</span>')
    .replace(/\[Verified\s*—\s*Low\]/g,    '<span style="background:#FEF9C3;color:#854D0E;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:700;white-space:nowrap">[Verified — Low]</span>')
    .replace(/\[Verified\]/g,              '<span style="background:#D1FAE5;color:#065F46;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:700;white-space:nowrap">[Verified]</span>')
    .replace(/\[Speculation\]/g,           '<span style="background:#FEF3CD;color:#92400E;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:700;white-space:nowrap">[Speculation]</span>')
    .replace(/\[Unknown\]/g,               '<span style="background:#F3F4F6;color:#4B5563;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:700;white-space:nowrap">[Unknown]</span>')

    // Inline URLs → clickable links (before bullet processing)
    .replace(/(https?:\/\/[^\s<\)&]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer" style="color:#1D4ED8;text-decoration:underline;font-size:11px;word-break:break-all">$1</a>')

    // Bullet lists — lines starting with - or *
    .replace(/^[\-\*]\s+(.+)$/gm, '<div style="display:flex;gap:7px;margin:3px 0"><span style="color:var(--g5);flex-shrink:0;margin-top:1px">•</span><span>$1</span></div>')

    // Numbered lists
    .replace(/^\d+\.\s+(.+)$/gm, (match, content, offset, str) => {
      const num = match.match(/^(\d+)/)[1];
      return `<div style="display:flex;gap:8px;margin:3px 0"><span style="color:var(--mu);flex-shrink:0;font-size:11px;margin-top:2px;min-width:14px">${num}.</span><span>${content}</span></div>`;
    })

    // Disclaimer line
    .replace(/⚕(.*?)$/gm,'<div style="margin-top:12px;padding:8px 12px;background:#EFF6FF;border-radius:7px;font-size:11.5px;color:#1E40AF;border:1px solid #BFDBFE;line-height:1.5">⚕$1</div>')

    // Paragraphs — double newline
    .replace(/\n\n/g,'</p><p style="margin:8px 0">')

    // Single newlines
    .replace(/\n/g,'<br/>');

  html = `<p style="margin:0">${html}</p>`;

  // ── Build references section ───────────────────────────────────────────────
  if(refLines.length > 0) {
    const refs = refLines.map((r,i) =>
      `<div style="display:flex;gap:7px;margin:4px 0;align-items:flex-start">
        <span style="color:var(--mu);font-size:10px;flex-shrink:0;margin-top:2px">${i+1}.</span>
        <div>
          <span style="font-size:11.5px;color:var(--tx)">${r.label.replace(/[:\-,]+$/,'').trim()}</span><br/>
          <a href="${r.url}" target="_blank" rel="noopener noreferrer"
             style="font-size:10.5px;color:#1D4ED8;text-decoration:underline;word-break:break-all">${r.url}</a>
        </div>
      </div>`
    ).join('');

    html += `
      <div style="margin-top:14px;padding:11px 13px;background:#F8F7F5;border:1px solid var(--bd);border-radius:8px">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.6px;color:var(--mu);margin-bottom:8px">References</div>
        ${refs}
      </div>`;
  }

  return html;
}
function toBase64(file) {
  return new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result.split(',')[1]);r.onerror=()=>rej(new Error('Read failed'));r.readAsDataURL(file);});
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#F7F5F1;--surf:#fff;--g9:#1B4332;--g7:#2D6A4F;--g5:#52B788;--g1:#D1FAE5;--g0:#F0FDF4;
  --tx:#111827;--mu:#6B7280;--bd:#E5E1D8;--wbg:#FFF7ED;--wbd:#FED7AA;--wtx:#9A3412;
  --rd:12px;--rds:8px;--sh:0 1px 8px rgba(0,0,0,.07);--sidebar:240px
}

/* ── Shared ── */
body{font-family:'DM Sans',sans-serif;background:var(--bg);color:var(--tx)}
.btn{display:inline-flex;align-items:center;gap:5px;padding:9px 16px;border-radius:var(--rds);font-size:13px;font-weight:500;cursor:pointer;border:none;font-family:'DM Sans',sans-serif;transition:all .15s}
.btnP{background:var(--g9);color:#fff}.btnP:hover{background:var(--g7)}
.btnS{background:var(--g5);color:#fff}
.btnO{background:transparent;color:var(--g9);border:1.5px solid var(--g9)}.btnO:hover{background:var(--g9);color:#fff}
.btnsm{padding:6px 12px;font-size:12px}.btnfull{width:100%;justify-content:center}
.hero{background:linear-gradient(140deg,#1B4332,#2D6A4F 55%,#40916C);border-radius:var(--rd);padding:24px;color:#fff;position:relative;overflow:hidden;margin-bottom:16px}
.hero::after{content:'';position:absolute;width:200px;height:200px;background:rgba(82,183,136,.15);border-radius:50%;top:-60px;right:-60px;pointer-events:none}
.hlbl{font-size:10px;opacity:.65;text-transform:uppercase;letter-spacing:1px}
.hname{font-family:'Playfair Display',serif;font-size:26px;font-weight:600;margin-top:3px}
.hmsg{font-size:13px;opacity:.78;margin-top:8px;line-height:1.5;position:relative;z-index:1}
.hbtns{display:flex;gap:8px;margin-top:18px;position:relative;z-index:1}
.hb{padding:9px 18px;border-radius:var(--rds);font-size:13px;font-weight:500;cursor:pointer;border:none;font-family:'DM Sans',sans-serif;transition:all .15s}
.hbacc{background:var(--g5);color:#fff}.hbgh{background:rgba(255,255,255,.15);color:#fff}
.sh{font-family:'Playfair Display',serif;font-size:17px;font-weight:600;margin-bottom:12px}
.wcard{background:var(--wbg);border:1px solid var(--wbd);border-radius:var(--rd);padding:14px 16px;margin-bottom:14px;display:flex;align-items:flex-start;gap:9px;font-size:13px;color:var(--wtx);line-height:1.5}
.frow{display:flex;gap:7px;overflow-x:auto;padding-bottom:3px;margin-bottom:14px;scrollbar-width:none}
.frow::-webkit-scrollbar{display:none}
.fc{padding:6px 14px;border-radius:20px;font-size:12.5px;font-weight:500;cursor:pointer;border:1.5px solid var(--bd);background:var(--surf);color:var(--mu);white-space:nowrap;font-family:'DM Sans',sans-serif;flex-shrink:0;transition:all .15s}
.fc.on{background:var(--g9);border-color:var(--g9);color:#fff}
.rc{background:var(--surf);border:1px solid var(--bd);border-radius:var(--rd);padding:15px;margin-bottom:10px;position:relative;transition:box-shadow .15s}
.rc:hover{box-shadow:var(--sh)}
.rc.fl{border-left:3px solid #F59E0B}.rc.nr{border:1.5px solid var(--g5);background:var(--g0)}
.rtop{display:flex;align-items:flex-start;justify-content:space-between;gap:10px}
.rico{width:34px;height:34px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.rname{font-weight:600;font-size:14px;line-height:1.3}
.rmeta{font-size:11.5px;color:var(--mu);margin-top:2px}
.rvals{display:flex;flex-wrap:wrap;gap:5px;margin-top:10px}
.vc{padding:3px 9px;background:#F0ECE6;border-radius:20px;font-size:11.5px}
.vc.w{background:var(--wbg);color:var(--wtx)}
.bw{display:inline-flex;align-items:center;gap:2px;padding:2px 7px;border-radius:8px;background:#FEF3CD;color:#92400E;font-size:10px;font-weight:600}
.bg2{display:inline-flex;align-items:center;gap:2px;padding:2px 7px;border-radius:8px;background:var(--g1);color:#065F46;font-size:10px;font-weight:600}
.bnew{display:inline-flex;align-items:center;gap:2px;padding:2px 7px;border-radius:8px;background:#DCFCE7;color:#15803D;font-size:10px;font-weight:600;margin-top:4px}
.del{position:absolute;top:11px;right:11px;width:24px;height:24px;border-radius:50%;background:#FEE2E2;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#DC2626}
.upz{border:2px dashed var(--bd);border-radius:var(--rd);padding:32px;text-align:center;cursor:pointer;margin-bottom:16px;transition:all .15s}
.upz:hover,.upz.drag{border-color:var(--g5);background:var(--g0)}.upz.busy{cursor:not-allowed;border-color:var(--g5);background:var(--g0)}
.spin{display:inline-block;animation:sp 1s linear infinite}@keyframes sp{to{transform:rotate(360deg)}}
.toast{position:fixed;top:20px;left:50%;transform:translateX(-50%);background:#1B4332;color:#fff;padding:10px 20px;border-radius:20px;font-size:13px;font-weight:500;white-space:nowrap;z-index:1000;box-shadow:0 4px 16px rgba(0,0,0,.2)}
.toast.err{background:#DC2626}
.msg{max-width:80%}.msg.u{align-self:flex-end}.msg.a{align-self:flex-start}
.mrole{font-size:10.5px;color:var(--mu);margin-bottom:4px;font-weight:500;letter-spacing:.3px}
.mb{padding:11px 14px;border-radius:14px;font-size:14px;line-height:1.65}
.msg.u .mb{background:var(--g9);color:#fff;border-bottom-right-radius:3px}
.msg.a .mb{background:var(--surf);border:1px solid var(--bd);border-bottom-left-radius:3px;box-shadow:var(--sh)}
.dots{display:inline-flex;gap:4px;padding:11px 14px;background:var(--surf);border:1px solid var(--bd);border-radius:14px;border-bottom-left-radius:3px;align-self:flex-start}
.dot{width:5px;height:5px;background:var(--mu);border-radius:50%;animation:bl 1.2s infinite}
.dot:nth-child(2){animation-delay:.2s}.dot:nth-child(3){animation-delay:.4s}
@keyframes bl{0%,80%,100%{transform:scale(.6);opacity:.4}40%{transform:scale(1);opacity:1}}
.qrow{display:flex;gap:6px;overflow-x:auto;padding-bottom:6px;scrollbar-width:none;margin-bottom:10px}
.qrow::-webkit-scrollbar{display:none}
.qc{padding:6px 13px;background:var(--bg);border:1px solid var(--bd);border-radius:20px;font-size:12px;color:var(--g9);cursor:pointer;font-family:'DM Sans',sans-serif;white-space:nowrap;flex-shrink:0;transition:all .15s}
.qc:hover{background:var(--g1)}
.ci{flex:1;padding:11px 14px;border:1.5px solid var(--bd);border-radius:var(--rds);font-size:14px;font-family:'DM Sans',sans-serif;color:var(--tx);background:var(--bg);resize:none;outline:none;transition:border-color .15s;line-height:1.5;min-height:44px;max-height:100px}
.ci:focus{border-color:var(--g5);background:var(--surf)}
.sb{width:44px;height:44px;border-radius:var(--rds);background:var(--g9);color:#fff;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .15s}
.sb:hover:not(:disabled){background:var(--g7)}.sb:disabled{opacity:.4;cursor:not-allowed}
.mic-btn{width:44px;height:44px;border-radius:var(--rds);background:var(--bg);color:var(--mu);border:1.5px solid var(--bd);cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .15s}
.mic-btn:hover{border-color:var(--g5);color:var(--g9)}
.mic-btn.recording{background:#FEE2E2;border-color:#DC2626;color:#DC2626;animation:pulse-rec 1.2s ease-in-out infinite}
.mic-btn.recording:hover{background:#FECACA}
@keyframes pulse-rec{0%,100%{box-shadow:0 0 0 0 rgba(220,38,38,.3)}50%{box-shadow:0 0 0 6px rgba(220,38,38,0)}}
.model-badge{display:inline-flex;align-items:center;gap:4px;padding:3px 9px;border-radius:20px;font-size:10px;font-weight:600;margin-bottom:4px}
.badge-opus{background:#EDE9FE;color:#5B21B6}
.badge-sonnet{background:var(--g1);color:#065F46}
.voice-hint{font-size:11px;color:var(--g7);text-align:center;padding:4px 0;animation:fU .2s ease}
.transcript-preview{background:var(--g0);border:1px solid var(--g1);border-radius:var(--rds);padding:8px 12px;font-size:12.5px;color:var(--g9);margin-bottom:6px;line-height:1.5;animation:fU .15s ease}
.disc{font-size:11px;color:#1D4ED8;background:#EFF6FF;border:1px solid #BFDBFE;border-radius:6px;padding:7px 11px;margin-top:8px;line-height:1.55}
.prow{display:flex;align-items:center;gap:14px;padding:14px 0;border-bottom:1px solid var(--bd);cursor:pointer}
.prow:last-child{border-bottom:none}
.pico{width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.plbl{font-size:14px;font-weight:500}.plbl2{font-size:12px;color:var(--mu);margin-top:2px}
@keyframes fU{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:translateY(0)}}
.fu{animation:fU .18s ease}

/* ══════════════════════════════════════
   MOBILE LAYOUT  (default, ≤767px)
   ══════════════════════════════════════ */
.mob-wrap{background:#E8E4DC;min-height:100vh;display:flex;align-items:flex-start;justify-content:center;padding:16px 0}
.phone{width:100%;max-width:430px;min-height:calc(100vh - 32px);background:var(--surf);border-radius:28px;overflow:hidden;box-shadow:0 16px 48px rgba(0,0,0,.15),0 0 0 1px rgba(0,0,0,.06);display:flex;flex-direction:column;position:relative}
.mob-hd{padding:16px 18px 13px;background:var(--surf);border-bottom:1px solid var(--bd);flex-shrink:0;display:flex;align-items:center;justify-content:space-between}
.mob-content{flex:1;overflow-y:auto;padding-bottom:74px}
.mob-pad{padding:16px 16px 0}
.mob-stats{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px}
.sc{background:var(--surf);border:1px solid var(--bd);border-radius:var(--rd);padding:14px;box-shadow:var(--sh)}
.slbl{font-size:10px;text-transform:uppercase;letter-spacing:.6px;color:var(--mu);font-weight:500}
.snum{font-family:'Playfair Display',serif;font-size:28px;font-weight:600;line-height:1;margin-top:5px}
.sdsc{font-size:11px;color:var(--mu);margin-top:2px}
.mob-chat{display:flex;flex-direction:column;height:calc(100vh - 155px);min-height:460px}
.mob-msgs{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:12px}
.mob-cbot{padding:9px 14px 12px;background:var(--surf);border-top:1px solid var(--bd);flex-shrink:0}
.mob-irow{display:flex;gap:7px;align-items:flex-end}
.bnav{position:absolute;bottom:0;left:0;right:0;height:68px;background:var(--surf);border-top:1px solid var(--bd);display:flex;border-radius:0 0 28px 28px;overflow:hidden}
.bni{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;cursor:pointer;border:none;background:none;padding:0;font-family:'DM Sans',sans-serif}
.bnlbl{font-size:10px;font-weight:500;color:var(--mu)}.bni.on .bnlbl{color:var(--g9)}
.bnd{width:4px;height:4px;background:var(--g5);border-radius:50%;margin-top:1px}
.logo{font-family:'Playfair Display',serif;font-size:20px;font-weight:600;color:var(--g9);display:flex;align-items:center;gap:6px}
.ptitle{font-family:'Playfair Display',serif;font-size:19px;font-weight:600;color:var(--tx)}
.psub{font-size:11px;color:var(--mu);margin-top:1px}

/* ══════════════════════════════════════
   DESKTOP LAYOUT  (≥768px)
   ══════════════════════════════════════ */
@media(min-width:768px){
  .mob-wrap{display:none}
  .desk-app{display:flex;min-height:100vh;background:var(--bg)}

  /* Sidebar */
  .desk-side{width:var(--sidebar);background:var(--g9);display:flex;flex-direction:column;flex-shrink:0;position:fixed;top:0;left:0;height:100vh;z-index:10}
  .desk-brand{padding:28px 20px 24px;display:flex;align-items:center;gap:10px;border-bottom:1px solid rgba(255,255,255,.1)}
  .desk-brand-name{font-family:'Playfair Display',serif;font-size:22px;font-weight:600;color:#fff}
  .desk-nav{flex:1;padding:16px 0}
  .desk-nav-item{display:flex;align-items:center;gap:11px;padding:11px 20px;cursor:pointer;color:rgba(255,255,255,.65);font-size:14px;font-weight:500;transition:all .15s;border:none;background:none;width:100%;font-family:'DM Sans',sans-serif;border-radius:0}
  .desk-nav-item:hover{background:rgba(255,255,255,.08);color:#fff}
  .desk-nav-item.on{background:rgba(255,255,255,.14);color:#fff}
  .desk-nav-item.on .desk-dot{display:block}
  .desk-dot{display:none;width:5px;height:5px;background:var(--g5);border-radius:50%;margin-left:auto}
  .desk-user{padding:16px 20px;border-top:1px solid rgba(255,255,255,.1)}
  .desk-avatar{width:36px;height:36px;border-radius:50%;background:var(--g5);display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:#fff;flex-shrink:0}

  /* Main area */
  .desk-main{margin-left:var(--sidebar);flex:1;display:flex;flex-direction:column;min-height:100vh}
  .desk-topbar{background:var(--surf);border-bottom:1px solid var(--bd);padding:18px 32px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:5}
  .desk-page-title{font-family:'Playfair Display',serif;font-size:22px;font-weight:600;color:var(--tx)}
  .desk-page-sub{font-size:12px;color:var(--mu);margin-top:2px}
  .desk-content{flex:1;padding:28px 32px;max-width:900px;width:100%}
  .desk-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:20px}
  .desk-sc{background:var(--surf);border:1px solid var(--bd);border-radius:var(--rd);padding:18px;box-shadow:var(--sh)}
  .desk-snum{font-family:'Playfair Display',serif;font-size:36px;font-weight:600;line-height:1;margin-top:6px}

  /* Desktop chat */
  .desk-chat{display:flex;flex-direction:column;height:calc(100vh - 85px)}
  .desk-msgs{flex:1;overflow-y:auto;padding:24px 32px;display:flex;flex-direction:column;gap:16px;max-width:900px;width:100%}
  .desk-cbot{padding:16px 32px 20px;background:var(--surf);border-top:1px solid var(--bd)}
  .desk-cbot-inner{max-width:900px}
  .desk-irow{display:flex;gap:10px;align-items:flex-end}
  .desk-msg{max-width:72%}

  /* Desktop records grid */
  .desk-records-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:14px}
}

/* Hide desktop on mobile */
@media(max-width:767px){
  .desk-app{display:none}
}

/* Setup screen */
.setup-wrap{min-height:100vh;background:var(--bg);display:flex;align-items:center;justify-content:center;padding:24px}
.setup-card{background:var(--surf);border-radius:var(--rd);padding:40px;max-width:440px;width:100%;box-shadow:0 4px 24px rgba(0,0,0,.08);border:1px solid var(--bd)}
.s-logo{display:flex;align-items:center;gap:9px;font-family:'Playfair Display',serif;font-size:28px;font-weight:600;color:var(--g9);margin-bottom:8px}
.s-sub{font-size:13.5px;color:var(--mu);margin-bottom:28px;line-height:1.6}
.field{margin-bottom:16px}
.field label{display:block;font-size:11px;font-weight:700;color:var(--tx);margin-bottom:5px;text-transform:uppercase;letter-spacing:.6px}
.field input{width:100%;padding:12px 14px;border:1.5px solid var(--bd);border-radius:var(--rds);font-size:14px;font-family:'DM Sans',sans-serif;color:var(--tx);background:var(--bg);outline:none;transition:border-color .15s}
.field input:focus{border-color:var(--g5);background:var(--surf)}
.s-btn{width:100%;padding:13px;background:var(--g9);color:#fff;border:none;border-radius:var(--rds);font-size:15px;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif;display:flex;align-items:center;justify-content:center;gap:8px;margin-top:10px;transition:all .15s}
.s-btn:hover{background:var(--g7)}.s-btn:disabled{opacity:.45;cursor:not-allowed}
`;

function Setup({ onDone }) {
  const [name, setName] = useState('');
  return (
    <div className="setup-wrap">
      <style>{CSS}</style>
      <div className="setup-card">
        <div className="s-logo"><Heart size={24} fill="#52B788" color="#52B788"/>Vitae</div>
        <div className="s-sub">Your personal health AI. Enter your name to get started — no account or API key needed.</div>
        <div style={{background:'#F0FDF4',border:'1px solid #D1FAE5',borderRadius:'var(--rd)',padding:'14px',marginBottom:24}}>
          <div style={{fontWeight:600,fontSize:13,color:'#1B4332',marginBottom:6}}>✓ What you can do</div>
          <div style={{fontSize:13,color:'#2D6A4F',lineHeight:1.7}}>
            • Upload lab results, imaging, or any medical document<br/>
            • Get AI analysis with flagged values highlighted<br/>
            • Ask health questions with cited clinical guidelines<br/>
            • Works on mobile and desktop
          </div>
        </div>
        <div className="field">
          <label>Your Name</label>
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Alex Johnson" onKeyDown={e=>e.key==='Enter'&&name.trim()&&onDone(name.trim())}/>
        </div>
        <button className="s-btn" onClick={()=>name.trim()&&onDone(name.trim())} disabled={!name.trim()}>Get Started →</button>
        <p style={{fontSize:11,color:'var(--mu)',marginTop:14,textAlign:'center',lineHeight:1.6}}>Your data stays in your browser session only. Nothing is stored on any server.</p>
      </div>
    </div>
  );
}

// ── Shared page content components ────────────────────────────────────────────
function HomeContent({name, allRecs, flagCount, uploads, setPage, isMobile}) {
  const pad = isMobile ? 'mob-pad' : '';
  return (
    <div className={pad} style={!isMobile?{padding:'0'}:{}}>
      <div className="hero">
        <div className="hlbl">Good morning</div>
        <div className="hname">{name}</div>
        <div className="hmsg">You have {allRecs.length} record{allRecs.length!==1?'s':''} on file{flagCount>0?` and ${flagCount} flagged for review`:' — all clear'}.</div>
        <div className="hbtns">
          <button className="hb hbacc" onClick={()=>setPage('ai')}>Ask AI</button>
          <button className="hb hbgh" onClick={()=>setPage('records')}>My Records</button>
        </div>
      </div>
      {flagCount>0&&<div className="wcard">
        <AlertTriangle size={15} style={{flexShrink:0,marginTop:1}}/>
        <div><strong>Action needed:</strong> {flagCount} result{flagCount!==1?'s':''} flagged for review.</div>
        <button className="btn btnS btnsm" style={{flexShrink:0,marginLeft:'auto'}} onClick={()=>setPage('records')}>View →</button>
      </div>}
      <div className={isMobile?'mob-stats':'desk-stats'}>
        {[
          {lbl:'Records',num:String(allRecs.length),dsc:'On file',w:false},
          {lbl:'Uploaded',num:String(uploads.length),dsc:'By you',w:false},
          {lbl:'Flagged',num:String(flagCount),dsc:flagCount>0?'Review needed':'All clear',w:flagCount>0},
          {lbl:'Medications',num:String(uploads.filter(r=>r.type==='medication').length),dsc:'On file',w:false},
        ].map(s=>(
          <div key={s.lbl} className={isMobile?'sc':'desk-sc'}>
            <div className="slbl">{s.lbl}</div>
            <div className={isMobile?'snum':'desk-snum'} style={s.w?{color:'#D97706'}:{}}>{s.num}</div>
            <div className="sdsc" style={s.w?{color:'#B45309'}:{}}>{s.dsc}</div>
          </div>
        ))}
      </div>
      <div style={{background:'#F0FDF4',border:'1px solid #D1FAE5',borderRadius:'var(--rd)',padding:'16px',marginBottom:isMobile?24:0}}>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:600,color:'#1B4332',marginBottom:8}}>Upload a Medical Record</div>
        <div style={{fontSize:13,color:'#2D6A4F',lineHeight:1.55,marginBottom:12}}>Add any lab result, imaging report, or medical document. Claude AI reads and categorizes it automatically.</div>
        <button className="btn btnP" style={{fontSize:13,padding:'8px 16px'}} onClick={()=>setPage('records')}><Upload size={13}/>Go to Records</button>
      </div>
    </div>
  );
}

function RecordsContent({uploads, setUploads, analyzing, setAnalyzing, filter, setFilter, allRecs, filtered, setPage, setInput, fileRef, toast2, drag, setDrag}) {
  return (
    <>
      <div className={`upz ${drag?'drag':''} ${analyzing?'busy':''}`}
        onClick={()=>!analyzing&&fileRef.current?.click()}
        onDragOver={e=>{e.preventDefault();setDrag(true);}}
        onDragLeave={()=>setDrag(false)}
        onDrop={e=>{e.preventDefault();setDrag(false);const f=e.dataTransfer.files?.[0];if(f)fileRef.current._analyze(f);}}>
        {analyzing
          ?<><span className="spin" style={{display:'block',margin:'0 auto 9px',width:28,height:28,color:'var(--g5)'}}><Loader size={28}/></span><div style={{fontSize:14,fontWeight:600,color:'var(--g9)'}}>Analyzing with Claude AI…</div><div style={{fontSize:12,color:'var(--mu)',marginTop:5}}>Extracting key values from your document</div></>
          :<><Upload size={28} color="var(--mu)" style={{margin:'0 auto 8px',display:'block'}}/><div style={{fontSize:14,fontWeight:500}}>Tap to upload or drag & drop</div><div style={{fontSize:12,color:'var(--mu)',marginTop:4}}>PDF · JPG · PNG — Labs · Imaging · Notes</div><div style={{fontSize:12,color:'var(--g7)',marginTop:7,fontWeight:500}}>Claude AI analyzes and categorizes automatically</div></>}
      </div>
      <div className="frow">
        {['All','Labs','Imaging','Notes','Meds'].map(f=>(
          <button key={f} className={`fc ${filter===f?'on':''}`} onClick={()=>setFilter(f)}>{f}{f==='All'?` (${allRecs.length})`:''}</button>
        ))}
      </div>
      <div className="desk-records-grid" style={{display:'block'}}>
        {filtered.map(r=>(
          <div key={r.id} className={`rc fu ${r.flagged?'fl':''} ${r.isNew?'nr':''}`}>
            {r.isNew&&<button className="del" onClick={()=>setUploads(p=>p.filter(x=>x.id!==r.id))}><X size={11}/></button>}
            <div className="rtop">
              <div style={{display:'flex',gap:10,alignItems:'flex-start',flex:1,minWidth:0}}>
                <div className="rico" style={{background:r.color,color:r.iconColor}}>{RECICONS[r.type]||<FileText size={15}/>}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div className="rname" style={{paddingRight:r.isNew?24:0}}>{r.name}</div>
                  <div className="rmeta">{r.date} · {(r.provider||'').slice(0,30)}{(r.provider||'').length>30?'…':''}</div>
                  {r.isNew&&<span className="bnew">✓ Uploaded by you</span>}
                </div>
              </div>
              {r.flagged?<span className="bw"><AlertTriangle size={9}/>Review</span>:<span className="bg2"><CheckCircle2 size={9}/>OK</span>}
            </div>
            {r.flagReason&&<div style={{marginTop:8,fontSize:12,color:'var(--wtx)',background:'var(--wbg)',padding:'6px 10px',borderRadius:6}}>⚠ {r.flagReason}</div>}
            <div className="rvals">{(r.values||[]).map(v=><span key={v} className={`vc ${v.toLowerCase().includes('high')||v.toLowerCase().includes('low')||v.includes('⚠')?'w':''}`}>{v}</span>)}</div>
            <button className="btn btnO btnsm btnfull" style={{marginTop:10}} onClick={()=>{setPage('ai');setInput(`Can you explain my ${r.name}? Values: ${(r.values||[]).join(', ')}`);}}><MessageSquare size={12}/>Ask AI about this</button>
          </div>
        ))}
      </div>
    </>
  );
}

function ChatContent({msgs, busy, input, setInput, send, QUICK_QS, endRef, isMobile, recording, toggleVoice, voiceHint, lastModel}) {
  return (
    <>
      <div className={isMobile?'mob-msgs':'desk-msgs'}>
        {(msgs||[]).map((m,i)=>(
          <div key={i} className={`${isMobile?'msg':'desk-msg'} ${m.role==='user'?'u':'a'} fu`}>
            <div className="mrole" style={{display:'flex',alignItems:'center',gap:6}}>
              {m.role==='user'?'You':'Vitae AI'}
              {m.role==='assistant' && m._model?.includes('opus') && (
                <span className="model-badge badge-opus"><Brain size={9}/>Deep analysis · Opus</span>
              )}
              {m.role==='assistant' && m._model && !m._model.includes('opus') && (
                <span className="model-badge badge-sonnet"><Zap size={9}/>Sonnet</span>
              )}
            </div>
            {m.role==='user'?<div className="mb">{m.content}</div>:<div className="mb" dangerouslySetInnerHTML={{__html:renderMd(m.content)}}/>}
          </div>
        ))}
        {busy&&(
          <div className={`${isMobile?'msg':'desk-msg'} a fu`}>
            <div className="mrole" style={{display:'flex',alignItems:'center',gap:6}}>
              Vitae AI
              {lastModel==='opus'
                ? <span className="model-badge badge-opus"><Brain size={9}/>Thinking deeply…</span>
                : <span className="model-badge badge-sonnet"><Zap size={9}/>Searching…</span>
              }
            </div>
            <div className="dots"><div className="dot"/><div className="dot"/><div className="dot"/></div>
          </div>
        )}
        <div ref={endRef}/>
      </div>
      <div className={isMobile?'mob-cbot':'desk-cbot'}>
        <div className={isMobile?'':' desk-cbot-inner'}>
          <div className="qrow">{QUICK_QS.map(q=><button key={q} className="qc" onClick={()=>send(q)}>{q}</button>)}</div>
          {voiceHint && <div className="voice-hint">{recording ? '🔴 ' : ''}{voiceHint}</div>}
          {input && recording && <div className="transcript-preview">"{input}"</div>}
          <div className={isMobile?'mob-irow':'desk-irow'}>
            <button
              className={`mic-btn ${recording?'recording':''}`}
              onClick={toggleVoice}
              title={recording?'Stop recording':'Start voice input'}
              aria-label={recording?'Stop recording':'Tap to speak'}
            >
              {recording ? <MicOff size={17}/> : <Mic size={17}/>}
            </button>
            <textarea className="ci" value={input} onChange={e=>setInput(e.target.value)}
              onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send();}}}
              placeholder="Ask any health question — or tap the mic to speak…" rows={1}/>
            <button className="sb" onClick={()=>send()} disabled={busy||!input.trim()}><Send size={16}/></button>
          </div>
          <div className="disc">⚕ Educational only — not a substitute for professional medical advice.</div>
        </div>
      </div>
    </>
  );
}

function ProfileContent({name, initials, setName, uploads, setPage}) {
  return (
    <div style={{maxWidth:560}}>
      <div style={{display:'flex',alignItems:'center',gap:14,padding:'20px',background:'linear-gradient(135deg,#1B4332,#2D6A4F)',borderRadius:'var(--rd)',marginBottom:16,color:'#fff'}}>
        <div style={{width:52,height:52,borderRadius:'50%',background:'#52B788',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,fontWeight:700,flexShrink:0}}>{initials}</div>
        <div style={{flex:1}}>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:600}}>{name}</div>
          <div style={{marginTop:6,display:'inline-flex',alignItems:'center',gap:3,padding:'2px 9px',background:'rgba(82,183,136,.2)',borderRadius:20,fontSize:10,color:'#95D5B2',letterSpacing:.4}}><Lock size={9}/>No account needed</div>
        </div>
        <button onClick={()=>setName(null)} style={{background:'rgba(255,255,255,.15)',border:'none',color:'#fff',padding:'7px 13px',borderRadius:8,fontSize:12,cursor:'pointer',fontFamily:'DM Sans,sans-serif'}}>Edit name</button>
      </div>
      <div style={{background:'var(--surf)',border:'1px solid var(--bd)',borderRadius:'var(--rd)',padding:'14px 16px',boxShadow:'var(--sh)',marginBottom:14}}>
        <div className="sh">Quick Actions</div>
        {[
          {ico:<Upload size={14}/>,bg:'#F0FDF4',tx:'#065F46',lbl:'Upload a medical record',sub:'PDF or image analyzed by AI',fn:()=>setPage('records')},
          {ico:<MessageSquare size={14}/>,bg:'#EFF6FF',tx:'#1E40AF',lbl:'Ask AI a health question',sub:'Evidence-based guidance',fn:()=>setPage('ai')},
          {ico:<ExternalLink size={14}/>,bg:'#FEF9C3',tx:'#854D0E',lbl:'Connect Epic MyChart',sub:'FHIR sync — coming soon',fn:()=>{}},
        ].map(a=>(
          <div key={a.lbl} className="prow" onClick={a.fn}>
            <div className="pico" style={{background:a.bg,color:a.tx}}>{a.ico}</div>
            <div style={{flex:1}}><div className="plbl">{a.lbl}</div><div className="plbl2">{a.sub}</div></div>
            <ChevronRight size={14} color="var(--mu)"/>
          </div>
        ))}
      </div>
      <div style={{background:'#EFF6FF',border:'1px solid #BFDBFE',borderRadius:'var(--rd)',padding:'14px 16px',fontSize:13,color:'#1E40AF',lineHeight:1.6}}>
        <strong style={{display:'block',marginBottom:4}}>How this works</strong>
        AI calls go through a secure server route — your API key is never in the browser. Uploaded files are analyzed and shown here, but nothing is stored permanently. Closing the tab clears your session.
      </div>
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────
export default function Vitae() {
  const [name,      setName]      = useState(null);
  const [page,      setPage]      = useState('home');
  const [filter,    setFilter]    = useState('All');
  const [msgs,      setMsgs]      = useState(null);
  const [input,     setInput]     = useState('');
  const [busy,      setBusy]      = useState(false);
  const [uploads,   setUploads]   = useState([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [toast,     setToast]     = useState(null);
  const [drag,      setDrag]      = useState(false);
  // Voice state
  const [recording,  setRecording]  = useState(false);
  const [voiceHint,  setVoiceHint]  = useState('');
  const [lastModel,  setLastModel]  = useState('sonnet'); // 'sonnet' | 'opus'
  const recognitionRef = useRef(null);
  const mediaRecRef    = useRef(null);
  const endRef  = useRef(null);
  const fileRef = useRef(null);

  useEffect(()=>{
    if(name&&!msgs) setMsgs([{role:'assistant',content:`Hello **${name}**! I'm Vitae AI.\n\nUpload records in the Records tab and I can see all your values — no copy-pasting needed. I'll give you [Verified] evidence-based guidance from recognized clinical guidelines.\n\nWhat would you like to know?`}]);
  },[name]);
  useEffect(()=>{endRef.current?.scrollIntoView({behavior:'smooth'});},[msgs,busy]);

  const toast2=(msg,err=false)=>{setToast({msg,err});setTimeout(()=>setToast(null),3500);};

  // ── Voice recording ──────────────────────────────────────────────────────────
  const startVoice = () => {
    // Try Web Speech API first (Chrome, Edge, Safari)
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous      = false;
      recognition.interimResults  = true;
      recognition.lang            = 'en-US';
      recognitionRef.current      = recognition;

      recognition.onstart = () => {
        setRecording(true);
        setVoiceHint('Listening… speak your question');
      };

      recognition.onresult = (e) => {
        const transcript = Array.from(e.results).map(r => r[0].transcript).join('');
        setInput(transcript);
        if (e.results[e.results.length - 1].isFinal) {
          setVoiceHint('Got it — tap send or keep talking');
        }
      };

      recognition.onerror = (e) => {
        setRecording(false);
        setVoiceHint('');
        if (e.error !== 'aborted') toast2('Microphone error: ' + e.error, true);
      };

      recognition.onend = () => {
        setRecording(false);
        setVoiceHint('');
        recognitionRef.current = null;
      };

      recognition.start();
      return;
    }

    // Fallback: MediaRecorder → OpenAI Whisper
    if (!navigator.mediaDevices?.getUserMedia) {
      toast2('Voice input not supported in this browser. Try Chrome or Edge.', true);
      return;
    }

    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      const chunks = [];
      const mimeType = MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : 'audio/mp4';
      const rec = new MediaRecorder(stream, { mimeType });
      mediaRecRef.current = rec;

      rec.ondataavailable = e => chunks.push(e.data);
      rec.onstop = async () => {
        stream.getTracks().forEach(t => t.stop());
        setVoiceHint('Transcribing…');
        try {
          const blob   = new Blob(chunks, { type: mimeType });
          const b64    = await new Promise((res, rej) => {
            const r = new FileReader();
            r.onload  = () => res(r.result.split(',')[1]);
            r.onerror = rej;
            r.readAsDataURL(blob);
          });
          const resp = await fetch('/api/transcribe', {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify({ audio: b64, mimeType }),
          });
          const data = await resp.json();
          if (data.transcript) setInput(data.transcript);
          else toast2(data.error || 'Could not transcribe audio', true);
        } catch {
          toast2('Transcription failed — please try again', true);
        } finally {
          setRecording(false);
          setVoiceHint('');
          mediaRecRef.current = null;
        }
      };

      rec.start();
      setRecording(true);
      setVoiceHint('Recording… tap mic again to stop');
    }).catch(() => {
      toast2('Microphone access denied', true);
    });
  };

  const stopVoice = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    if (mediaRecRef.current && mediaRecRef.current.state !== 'inactive') {
      mediaRecRef.current.stop();
    }
    setRecording(false);
    setVoiceHint('');
  };

  const toggleVoice = () => recording ? stopVoice() : startVoice();

  const analyze=async(file)=>{
    if(analyzing)return;
    if(!['application/pdf','image/jpeg','image/png','image/webp','image/gif'].includes(file.type)){toast2('Please upload a PDF or image',true);return;}
    if(file.size>20*1024*1024){toast2('File too large — max 20 MB',true);return;}
    setAnalyzing(true);toast2(`Analyzing ${file.name}…`);
    try{
      const b64=await toBase64(file);
      const isPDF=file.type==='application/pdf';
      const blk=isPDF?{type:'document',source:{type:'base64',media_type:'application/pdf',data:b64}}:{type:'image',source:{type:'base64',media_type:file.type,data:b64}};
      const r=await callAI({model:'claude-sonnet-4-6',max_tokens:1000,system:ANALYZE_PROMPT,messages:[{role:'user',content:[blk,{type:'text',text:'Analyze this medical document and return the JSON object.'}]}]});
      const d=await r.json();
      if(d.error){throw new Error(d.error.message||'API error');}
      const txt=d.content?.[0]?.text||'';
      let p=null;
      const cm=txt.match(/```(?:json)?\s*([\s\S]*?)```/);
      if(cm){try{p=JSON.parse(cm[1].trim());}catch{}}
      if(!p){const om=txt.match(/\{[\s\S]*\}/);if(om){try{p=JSON.parse(om[0]);}catch{}}}
      if(!p){try{p=JSON.parse(txt.trim());}catch{}}
      if(!p){throw new Error('Analysis failed — please try again');}
      const sty=TYPE_STYLE[p.type]||TYPE_STYLE.note;
      const rec={id:Date.now(),isNew:true,type:p.type||'note',name:p.title||file.name,date:p.date||new Date().toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}),provider:p.provider||'Uploaded',flagged:!!p.flagged,flagReason:p.flagReason||null,values:p.values||['Document uploaded'],color:sty.color,iconColor:sty.iconColor};
      setUploads(prev=>[rec,...prev]);
      setPage('records');setFilter('All');toast2(`✓ ${p.title||file.name} added`);
    }catch(e){toast2(e.message||'Analysis failed',true);}
    finally{setAnalyzing(false);if(fileRef.current)fileRef.current.value='';}
  };

  // Attach analyze to fileRef so drag-drop in RecordsContent can call it
  useEffect(()=>{if(fileRef.current)fileRef.current._analyze=analyze;},[analyzing,uploads]);

  const send=async(text)=>{
    const m=(text||input).trim();if(!m||busy)return;
    const h=[...(msgs||[]),{role:'user',content:m}];
    setMsgs(h);setInput('');setBusy(true);
    try{
      const r=await callAI({
        model:'claude-sonnet-4-6',
        max_tokens:2048,
        system:makeChatPrompt(name,uploads),
        messages:h,
      });
      const d=await r.json();
      // Track which model was used (returned in _meta)
      if(d._meta?.model?.includes('opus')) setLastModel('opus');
      else setLastModel('sonnet');
      const reply = d.mergedText || d.content?.[0]?.text || 'Error — try again.';
      setMsgs(p=>[...p,{role:'assistant',content:reply, _model: d._meta?.model}]);
    }catch{setMsgs(p=>[...p,{role:'assistant',content:'⚠ Connection error. Please try again.'}]);}
    finally{setBusy(false);}
  };

  if(!name) return <Setup onDone={n=>setName(n)}/>;

  const allRecs=[...uploads];
  const filtered=allRecs.filter(r=>filter==='All'?true:filter==='Labs'?r.type==='lab':filter==='Imaging'?r.type==='imaging':filter==='Notes'?r.type==='note':filter==='Meds'?r.type==='medication':true);
  const flagCount=allRecs.filter(r=>r.flagged).length;
  const initials=name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
  const NAV=[{id:'home',lbl:'Home',I:Home},{id:'records',lbl:'Records',I:FolderOpen},{id:'ai',lbl:'AI',I:MessageSquare},{id:'profile',lbl:'Profile',I:User}];

  const sharedProps = {uploads,setUploads,analyzing,setAnalyzing,filter,setFilter,allRecs,filtered,setPage,setInput,fileRef,toast2,drag,setDrag,msgs,busy,input,send,endRef,name,initials,setName,flagCount,recording,toggleVoice,voiceHint,lastModel};

  return (
    <>
      <style>{CSS}</style>
      <input ref={fileRef} type="file" accept=".pdf,image/*" style={{display:'none'}} onChange={e=>{const f=e.target.files?.[0];if(f)analyze(f);}}/>
      {toast&&<div className={`toast ${toast.err?'err':''}`}>{toast.msg}</div>}

      {/* ══ MOBILE ══ */}
      <div className="mob-wrap">
        <div className="phone">
          <div className="mob-hd">
            {page==='home'
              ?<div className="logo"><Heart size={15} fill="#52B788" color="#52B788"/>Vitae</div>
              :<div><div className="ptitle">{{records:'My Records',ai:'AI Assistant',profile:'Profile'}[page]}</div>
              <div className="psub">{{records:'Labs, imaging & notes',ai:uploads.length>0?`Seeing ${uploads.length} record${uploads.length!==1?'s':''}` :'Upload records for full context',profile:name}[page]}</div></div>}
            <div style={{display:'flex',gap:7,alignItems:'center'}}>
              {page==='records'&&<button className="btn btnP btnsm" onClick={()=>!analyzing&&fileRef.current?.click()} disabled={analyzing}>
                {analyzing?<span className="spin"><Loader size={12}/></span>:<Upload size={12}/>}{analyzing?'Analyzing…':'Upload'}
              </button>}
              <div style={{width:34,height:34,borderRadius:8,background:'#F0FDF4',border:'1px solid #D1FAE5',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer'}}><Bell size={14} color="#2D6A4F"/></div>
            </div>
          </div>
          <div className="mob-content">
            {page==='home'&&<div className="mob-pad"><HomeContent {...sharedProps} isMobile={true}/></div>}
            {page==='records'&&<div className="mob-pad"><RecordsContent {...sharedProps}/></div>}
            {page==='ai'&&<div className="mob-chat"><ChatContent {...sharedProps} QUICK_QS={QUICK_QS} isMobile={true}/></div>}
            {page==='profile'&&<div className="mob-pad"><ProfileContent {...sharedProps}/></div>}
          </div>
          <nav className="bnav">
            {NAV.map(({id,lbl,I})=>{const on=page===id;return(
              <button key={id} className={`bni ${on?'on':''}`} onClick={()=>setPage(id)}>
                <I size={21} color={on?'#1B4332':'#9CA3AF'} strokeWidth={on?2.5:1.8}/>
                <span className="bnlbl">{lbl}</span>
                {on&&<div className="bnd"/>}
              </button>
            );})}
          </nav>
        </div>
      </div>

      {/* ══ DESKTOP ══ */}
      <div className="desk-app">
        {/* Sidebar */}
        <aside className="desk-side">
          <div className="desk-brand">
            <Heart size={18} fill="#52B788" color="#52B788"/>
            <span className="desk-brand-name">Vitae</span>
          </div>
          <nav className="desk-nav">
            {NAV.map(({id,lbl,I})=>(
              <button key={id} className={`desk-nav-item ${page===id?'on':''}`} onClick={()=>setPage(id)}>
                <I size={18} strokeWidth={page===id?2.2:1.8}/>
                {lbl}
                <div className="desk-dot"/>
              </button>
            ))}
          </nav>
          <div className="desk-user">
            <div style={{display:'flex',alignItems:'center',gap:10}}>
              <div className="desk-avatar">{initials}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:13,fontWeight:600,color:'#fff',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{name}</div>
                <div style={{fontSize:11,color:'rgba(255,255,255,.5)',marginTop:1}}>Health AI session</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="desk-main">
          <div className="desk-topbar">
            <div>
              <div className="desk-page-title">
                {page==='home'?`Good morning, ${name.split(' ')[0]}`:{records:'My Records',ai:'AI Assistant',profile:'Profile'}[page]}
              </div>
              <div className="desk-page-sub">
                {{home:'Your health records at a glance',records:'Labs, imaging & notes',ai:uploads.length>0?`Seeing ${uploads.length} uploaded record${uploads.length!==1?'s':''}` :'Upload records so AI can reference them',profile:'Your session'}[page]}
              </div>
            </div>
            {page==='records'&&(
              <button className="btn btnP" onClick={()=>!analyzing&&fileRef.current?.click()} disabled={analyzing}>
                {analyzing?<><span className="spin"><Loader size={14}/></span>Analyzing…</>:<><Upload size={14}/>Upload Record</>}
              </button>
            )}
          </div>

          {page==='home'&&<div className="desk-content"><HomeContent {...sharedProps} isMobile={false}/></div>}
          {page==='records'&&<div className="desk-content"><RecordsContent {...sharedProps}/></div>}
          {page==='ai'&&<div className="desk-chat"><ChatContent {...sharedProps} QUICK_QS={QUICK_QS} isMobile={false}/></div>}
          {page==='profile'&&<div className="desk-content"><ProfileContent {...sharedProps}/></div>}
        </main>
      </div>
    </>
  );
}
