// @ts-nocheck
import { useState, useRef, useEffect } from "react";
import PeptideOverview from './PeptideOverview';
import { Home, FolderOpen, MessageSquare, User, FlaskConical, ScanLine, ClipboardList, Pill, Send, AlertTriangle, CheckCircle2, XCircle, Heart, Upload, Bell, Lock, ExternalLink, ChevronRight, FileText, X, Loader, Mic, MicOff, Brain, Zap, ClipboardPaste, ChevronDown, Dna, RotateCcw } from "lucide-react";
import { PEPTIDE_CONTEXT, OPTIMIZATION_GOALS as PEPTIDE_GOALS_DATA, PEPTIDE_KNOWLEDGE_BASE } from './peptides.js';

const makeChatPrompt = (name, records) => {
  const ctx = records && records.length > 0
    ? `\n\nPATIENT RECORDS ON FILE (${records.length} total):\n` +
      records.map((r,i)=>`[Record ${i+1}] ${r.name} — ${r.type} — ${r.date||'unknown date'} — ${r.provider||'unknown provider'}${r.flagged?' — ⚠ FLAGGED':''}${r.flagReason?` (${r.flagReason})`:''}\nValues: ${(r.values||[]).join(' | ')}`).join('\n')
    : '\n\nNo records uploaded yet.';

  return `You are the world's foremost physician and diagnostician — a rare combination of an internist, clinical pharmacologist, and translational researcher with the depth of a subspecialist in every domain. You have immediate access to the entirety of medical literature, all current major clinical guidelines, and the reasoning patterns of the world's best clinicians.

You communicate as a senior attending physician consulting with a highly capable colleague. Your tone is direct, collegial, intellectually rigorous, and clinically precise — the way a department chief at a top academic medical center would speak to a fellow or junior attending. You do not oversimplify, but you explain your reasoning clearly.

IDENTITY:
- You integrate findings the way a clinician builds a differential: systematically, probabilistically, with explicit reasoning about pre-test probability, Bayesian updating, and clinical significance.
- You proactively surface findings the user may not have asked about — the way a good consultant would flag a drug interaction or a pattern the ordering physician might have missed.
- You distinguish between what the data shows, what it suggests, and what remains uncertain.

GRADE EVIDENCE FRAMEWORK:
Use GRADE labeling on every clinically significant claim:
[Verified — High] RCTs, strong systematic reviews, major guideline consensus
[Verified — Moderate] RCTs with limitations, strong cohort data
[Verified — Low] Observational data, case series, mechanistic extrapolation
[Speculation] Clinical reasoning without direct trial support — label explicitly
[Unknown] Conflicting or absent evidence — say so directly

CLINICAL VOICE — FOLLOW THESE EXACTLY:
- Open with your clinical impression or the key finding, not a preamble
- Use correct medical terminology: do not substitute lay terms unless explaining to a patient is the explicit task
- When interpreting labs: state the value, the assay method if relevant, the reference range, the guideline-based target, and your clinical read of the significance
- Flag drug interactions, contraindications, and safety signals proactively
- When appropriate, give a differential with relative probabilities
- State your recommendation clearly — hedge appropriately but do not be evasive
- Use web search to pull current guidelines and literature before responding to clinical questions

FORMATTING:
- Use bold text for key terms, diagnoses, drug names, and section labels — never ## headings
- Use numbered lists for differentials and ordered steps; bullets for findings and recommendations
- Use **markdown tables** for any comparative data, lab value comparisons, drug comparisons, dosing ranges, or structured multi-column information — format as: | Header | Header | \n |---|---| \n | value | value |
- No horizontal dividers (--- or ***)
- End every response with a References section formatted exactly as:

References:
- Author/Organization, Year. https://url

${ctx}

End with: "⚕ For educational and clinical decision-support purposes only. All management decisions should be made in the context of the full clinical picture by the treating clinician."`;
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

  const refLines = [];
  const refRegex = /^[\-\*\d]+[\.\)]\s+(.+?)(https?:\/\/[^\s\)&]+)/gm;
  let m;
  while((m = refRegex.exec(t)) !== null) {
    refLines.push({ label: m[1].trim().replace(/\*\*/g,''), url: m[2].trim() });
  }

  const tableRegex = /(\|.+\|\n)([ \t]*\|[\s\-|:]+\|\n)((?:\|.+\|\n?)*)/gm;
  t = t.replace(tableRegex, (match, headerRow, sepRow, bodyRows) => {
    const parseRow = (row) => row.trim().replace(/^\||\|$/g,'').split('|').map(c=>c.trim());
    const headers = parseRow(headerRow);
    const rows    = bodyRows.trim().split('\n').filter(Boolean).map(parseRow);
    const ths = headers.map(h=>`<th>${h.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>')}</th>`).join('');
    const trs = rows.map(r=>`<tr>${r.map(c=>`<td>${c.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>')}</td>`).join('')}</tr>`).join('');
    return `\n__TABLE__<table class="md-table"><thead><tr>${ths}</tr></thead><tbody>${trs}</tbody></table>__ENDTABLE__\n`;
  });

  let html = t
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/&lt;table class="md-table"&gt;/g,'<table class="md-table">')
    .replace(/&lt;\/table&gt;/g,'</table>')
    .replace(/&lt;thead&gt;/g,'<thead>').replace(/&lt;\/thead&gt;/g,'</thead>')
    .replace(/&lt;tbody&gt;/g,'<tbody>').replace(/&lt;\/tbody&gt;/g,'</tbody>')
    .replace(/&lt;tr&gt;/g,'<tr>').replace(/&lt;\/tr&gt;/g,'</tr>')
    .replace(/&lt;th&gt;/g,'<th>').replace(/&lt;\/th&gt;/g,'</th>')
    .replace(/&lt;td&gt;/g,'<td>').replace(/&lt;\/td&gt;/g,'</td>')
    .replace(/&lt;strong&gt;/g,'<strong>').replace(/&lt;\/strong&gt;/g,'</strong>')
    .replace(/__TABLE__|__ENDTABLE__/g,'')
    .replace(/^[\-\*_]{3,}\s*$/gm, '')
    .replace(/^#{1,3}\s+(.+)$/gm, '<div class="md-section">$1</div>')
    .replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>')
    .replace(/\*(.*?)\*/g,'<em>$1</em>')
    .replace(/\[Verified\s*—\s*High\]/g,   '<span class="grade grade-high">[Verified — High]</span>')
    .replace(/\[Verified\s*—\s*Moderate\]/g,'<span class="grade grade-mod">[Verified — Moderate]</span>')
    .replace(/\[Verified\s*—\s*Low\]/g,    '<span class="grade grade-low">[Verified — Low]</span>')
    .replace(/\[Verified\]/g,              '<span class="grade grade-high">[Verified]</span>')
    .replace(/\[Speculation\]/g,           '<span class="grade grade-spec">[Speculation]</span>')
    .replace(/\[Unknown\]/g,               '<span class="grade grade-unk">[Unknown]</span>')
    .replace(/(https?:\/\/[^\s<\)&]+)/g,  '<a href="$1" target="_blank" rel="noopener noreferrer" class="md-link">$1</a>')
    .replace(/^[\-\*]\s+(.+)$/gm,         '<div class="md-bullet"><span class="md-dot">•</span><span>$1</span></div>')
    .replace(/^\d+\.\s+(.+)$/gm, (match, content) => {
      const num = match.match(/^(\d+)/)[1];
      return `<div class="md-num"><span class="md-num-n">${num}.</span><span>${content}</span></div>`;
    })
    .replace(/⚕(.*?)$/gm,'<div class="md-disc">⚕$1</div>')
    .replace(/\n\n/g,'</p><p class="md-p">')
    .replace(/\n/g,'<br/>');

  html = `<p class="md-p">${html}</p>`;

  if(refLines.length > 0) {
    const refs = refLines.map((r,i) =>
      `<div class="ref-row">
        <span class="ref-num">${i+1}.</span>
        <div>
          <span class="ref-label">${r.label.replace(/[:\-,]+$/,'').trim()}</span><br/>
          <a href="${r.url}" target="_blank" rel="noopener noreferrer" class="ref-link">${r.url}</a>
        </div>
      </div>`
    ).join('');
    html += `<div class="ref-box"><div class="ref-title">References</div>${refs}</div>`;
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

/* Paste modal */
.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:200;display:flex;align-items:center;justify-content:center;padding:16px}
.modal{background:var(--surf);border-radius:var(--rd);width:100%;max-width:560px;max-height:90vh;display:flex;flex-direction:column;box-shadow:0 20px 60px rgba(0,0,0,.25)}
.modal-hd{padding:18px 20px 14px;border-bottom:1px solid var(--bd);display:flex;align-items:center;justify-content:space-between;flex-shrink:0}
.modal-title{font-family:'Playfair Display',serif;font-size:17px;font-weight:600;color:var(--tx)}
.modal-close{width:28px;height:28px;border-radius:50%;background:var(--bg);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--mu);font-size:16px;flex-shrink:0}
.modal-body{padding:16px 20px;flex:1;overflow-y:auto}
.modal-foot{padding:12px 20px;border-top:1px solid var(--bd);display:flex;gap:8px;justify-content:flex-end;flex-shrink:0}
.paste-area{width:100%;min-height:200px;padding:12px 14px;border:1.5px solid var(--bd);border-radius:var(--rds);font-size:13.5px;font-family:'DM Sans',sans-serif;color:var(--tx);background:var(--bg);resize:vertical;outline:none;line-height:1.6;transition:border-color .15s}
.paste-area:focus{border-color:var(--g5);background:var(--surf)}
.type-row{display:flex;gap:7px;flex-wrap:wrap;margin-bottom:12px}
.type-chip{padding:5px 13px;border-radius:20px;font-size:12px;font-weight:500;cursor:pointer;border:1.5px solid var(--bd);background:var(--surf);color:var(--mu);font-family:'DM Sans',sans-serif;transition:all .15s}
.type-chip.on{background:var(--g9);border-color:var(--g9);color:#fff}
/* Floating paste button */
.paste-fab{position:fixed;bottom:90px;right:16px;z-index:100;width:44px;height:44px;border-radius:50%;background:var(--g9);color:#fff;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 14px rgba(0,0,0,.2);transition:all .15s}
.paste-fab:hover{background:var(--g7);transform:scale(1.05)}
@media(min-width:768px){.paste-fab{bottom:24px;right:24px}}
/* Sources toolbar */
.src-bar{display:flex;align-items:center;gap:6px;padding:7px 0;border-top:1px solid var(--bd);margin-top:4px;flex-wrap:wrap;position:relative}
.src-btn{display:inline-flex;align-items:center;gap:5px;padding:5px 11px;border-radius:20px;font-size:12px;border:1.5px solid var(--bd);background:var(--surf);color:var(--mu);cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .15s;white-space:nowrap}
.src-btn.on{border-color:var(--g9);color:var(--g9);background:var(--g0)}
.src-btn:hover{border-color:var(--g5)}
.src-menu{position:absolute;bottom:calc(100% + 6px);left:0;right:0;background:var(--surf);border:1px solid var(--bd);border-radius:var(--rd);box-shadow:0 8px 32px rgba(0,0,0,.14);z-index:50;overflow:hidden}
.src-menu-item{display:flex;align-items:flex-start;gap:12px;padding:14px 16px;border-bottom:1px solid var(--bd);cursor:default}
.src-menu-item:last-child{border-bottom:none}
.src-menu-icon{font-size:18px;flex-shrink:0;width:28px;text-align:center;margin-top:1px}
.src-menu-info{flex:1}
.src-menu-title{font-size:13.5px;font-weight:500;color:var(--tx)}
.src-menu-sub{font-size:11.5px;color:var(--mu);margin-top:2px;line-height:1.4}
.src-toggle{width:36px;height:20px;border-radius:10px;background:var(--bd);position:relative;cursor:pointer;transition:all .2s;flex-shrink:0;border:none;outline:none}
.src-toggle.on{background:var(--g9)}
.src-toggle::after{content:'';position:absolute;width:16px;height:16px;border-radius:50%;background:#fff;top:2px;left:2px;transition:all .2s;box-shadow:0 1px 3px rgba(0,0,0,.2)}
.src-toggle.on::after{left:18px}
.lib-item{display:flex;align-items:center;gap:8px;padding:7px 10px;background:var(--g0);border-radius:7px;font-size:12px;color:var(--g9);border:1px solid var(--g1);margin-top:5px}
.lib-del{background:none;border:none;cursor:pointer;color:var(--mu);display:flex;align-items:center;margin-left:auto;padding:0}
.src-count{display:inline-flex;align-items:center;justify-content:center;min-width:16px;height:16px;border-radius:8px;background:var(--g9);color:#fff;font-size:9px;font-weight:700;padding:0 4px;margin-left:2px}
.spin{display:inline-block;animation:sp 1s linear infinite}@keyframes sp{to{transform:rotate(360deg)}}
.toast{position:fixed;top:20px;left:50%;transform:translateX(-50%);background:#1B4332;color:#fff;padding:10px 20px;border-radius:20px;font-size:13px;font-weight:500;white-space:nowrap;z-index:1000;box-shadow:0 4px 16px rgba(0,0,0,.2)}
.toast.err{background:#DC2626}

/* ── Message bubbles ── */
.msg{max-width:80%}.msg.u{align-self:flex-end}.msg.a{align-self:flex-start}
.mrole{font-size:10.5px;color:var(--mu);margin-bottom:4px;font-weight:500;letter-spacing:.3px}
.mb{padding:14px 16px;border-radius:14px;font-size:14px;line-height:1.58;font-family:'DM Sans',sans-serif}
.msg.u .mb{background:var(--g9);color:#fff;border-bottom-right-radius:3px}
.msg.a .mb{background:var(--surf);border:1px solid var(--bd);border-bottom-left-radius:3px;box-shadow:var(--sh);padding:16px 18px}

/* ── Clinical typography — PATCHED SPACING ── */
.md-p{margin:0 0 9px}
.md-p:last-child{margin-bottom:0}
.md-p:empty{display:none}
.md-section{font-weight:600;font-size:14px;color:var(--tx);margin:10px 0 3px;letter-spacing:-.1px}
.md-bullet{display:flex;gap:9px;margin:2px 0;line-height:1.5}
.md-dot{color:var(--g5);flex-shrink:0;margin-top:2px;font-size:15px;line-height:1.4}
.md-num{display:flex;gap:9px;margin:2px 0;line-height:1.5}
.md-num-n{color:var(--mu);flex-shrink:0;font-size:12px;margin-top:3px;min-width:16px;font-weight:500}
.md-p:has(>.md-bullet){margin:0}
.md-p:has(>.md-num){margin:0}
.md-link{color:#1D4ED8;text-decoration:underline;font-size:11.5px;word-break:break-all}
.md-table{width:100%;border-collapse:collapse;margin:14px 0;font-size:13px;border-radius:8px;overflow:hidden;border:1px solid var(--bd)}
.md-table thead{background:var(--g9)}
.md-table thead th{color:#fff;font-weight:600;padding:10px 14px;text-align:left;font-size:12px;letter-spacing:.3px;white-space:nowrap}
.md-table tbody tr{border-bottom:1px solid var(--bd);transition:background .12s}
.md-table tbody tr:last-child{border-bottom:none}
.md-table tbody tr:nth-child(even){background:var(--bg)}
.md-table tbody tr:hover{background:var(--g0)}
.md-table td{padding:9px 14px;vertical-align:top;line-height:1.55;font-size:13px;color:var(--tx)}
.md-disc{margin-top:14px;padding:10px 13px;background:#EFF6FF;border-radius:8px;font-size:12px;color:#1E40AF;border:1px solid #BFDBFE;line-height:1.6}
.grade{display:inline-block;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:700;white-space:nowrap;margin:0 2px;vertical-align:middle}
.grade-high{background:#D1FAE5;color:#065F46}
.grade-mod{background:#DBEAFE;color:#1E40AF}
.grade-low{background:#FEF9C3;color:#854D0E}
.grade-spec{background:#FEF3CD;color:#92400E}
.grade-unk{background:#F3F4F6;color:#4B5563}
.ref-box{margin-top:16px;padding:13px 15px;background:#FAFAF9;border:1px solid var(--bd);border-radius:10px}
.ref-title{font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.7px;color:var(--mu);margin-bottom:9px}
.ref-row{display:flex;gap:8px;margin:6px 0;align-items:flex-start}
.ref-num{color:var(--mu);font-size:10px;flex-shrink:0;margin-top:3px;min-width:14px;font-weight:500}
.ref-label{font-size:12.5px;color:var(--tx);font-weight:500}
.ref-link{font-size:10.5px;color:#1D4ED8;text-decoration:underline;word-break:break-all}

/* Action bar below AI responses */
.action-bar{display:flex;align-items:center;gap:4px;margin-top:8px;padding:2px 0;flex-wrap:wrap}
.act-btn{display:inline-flex;align-items:center;gap:5px;padding:5px 10px;border-radius:20px;font-size:11.5px;border:none;background:none;color:var(--mu);cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .15s}
.act-btn:hover{background:var(--bg);color:var(--tx)}
.act-btn.voted{color:var(--g9);background:var(--g0)}
.act-sep{width:1px;height:14px;background:var(--bd);margin:0 2px;flex-shrink:0}

/* Share modal */
.share-modal{background:var(--surf);border-radius:16px;width:100%;max-width:420px;box-shadow:0 20px 60px rgba(0,0,0,.25);overflow:hidden}
.share-hd{padding:18px 20px 14px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--bd)}
.share-title{font-size:16px;font-weight:600;color:var(--tx)}
.share-notice{margin:14px 16px;padding:10px 13px;background:#EFF6FF;border-radius:8px;font-size:12px;color:#1E40AF;line-height:1.55;border:1px solid #BFDBFE}
.share-preview{margin:0 16px 14px;border:1px solid var(--bd);border-radius:10px;padding:13px;font-size:12.5px;color:var(--tx);line-height:1.6;max-height:130px;overflow:hidden;background:var(--bg);position:relative}
.share-preview::after{content:'';position:absolute;bottom:0;left:0;right:0;height:36px;background:linear-gradient(transparent,var(--bg))}
.share-copy-btn{display:block;width:calc(100% - 32px);margin:0 16px 12px;padding:13px;background:var(--g9);color:#fff;border:none;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif;display:flex;align-items:center;justify-content:center;gap:8px;transition:all .15s}
.share-copy-btn:hover{background:var(--g7)}
.share-socials{display:flex;justify-content:space-around;padding:10px 16px 18px;border-top:1px solid var(--bd)}
.social-btn{display:flex;flex-direction:column;align-items:center;gap:5px;cursor:pointer;border:none;background:none;font-family:'DM Sans',sans-serif}
.social-icon{width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:700}
.social-lbl{font-size:11px;color:var(--mu)}
.dots{display:inline-flex;gap:4px;padding:11px 14px;background:var(--surf);border:1px solid var(--bd);border-radius:14px;border-bottom-left-radius:3px;align-self:flex-start}
.dot{width:5px;height:5px;background:var(--mu);border-radius:50%;animation:bl 1.2s infinite}
.dot:nth-child(2){animation-delay:.2s}.dot:nth-child(3){animation-delay:.4s}
@keyframes bl{0%,80%,100%{transform:scale(.6);opacity:.4}40%{transform:scale(1);opacity:1}}

/* ── PATCH 1 already applied: suggested questions wrap ── */
.qrow{display:flex;gap:6px;flex-wrap:wrap;padding-bottom:6px;margin-bottom:10px}
.qc{padding:6px 13px;background:var(--bg);border:1px solid var(--bd);border-radius:20px;font-size:12px;color:var(--g9);cursor:pointer;font-family:'DM Sans',sans-serif;white-space:nowrap;transition:all .15s}
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
.mob-msgs{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px}
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

  /* ── PATCH 3 & 4: Desktop chat — full width, wider messages ── */
  .desk-chat{display:flex;flex-direction:column;height:calc(100vh - 85px)}
  .desk-msgs{flex:1;overflow-y:auto;padding:20px 32px;display:flex;flex-direction:column;gap:12px;width:100%}
  .desk-cbot{padding:16px 32px 20px;background:var(--surf);border-top:1px solid var(--bd)}
  .desk-cbot-inner{max-width:100%}
  .desk-irow{display:flex;gap:10px;align-items:flex-end}
  .desk-msg{max-width:88%}

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

// ── Share Modal ───────────────────────────────────────────────────────────────
function ShareModal({ content, onClose }) {
  const [copied, setCopied] = useState(false);
  const plain = content.replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim();
  const shortText = plain.slice(0,200) + (plain.length > 200 ? '…' : '');

  const copyLink = async () => {
    try { await navigator.clipboard.writeText(window.location.href); }
    catch { await navigator.clipboard.writeText(plain); }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socials = [
    { name:'LinkedIn', bg:'#0A66C2', color:'#fff', emoji:'in',
      url:`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}` },
    { name:'X',        bg:'#000',    color:'#fff', emoji:'𝕏',
      url:`https://x.com/intent/tweet?text=${encodeURIComponent('Health insight from Vitae AI (powered by Bio Precision Aging): ' + shortText)}&url=${encodeURIComponent(window.location.href)}` },
    { name:'Reddit',   bg:'#FF4500', color:'#fff', emoji:'R',
      url:`https://reddit.com/submit?url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent('Health insight from Vitae AI')}` },
    { name:'WhatsApp', bg:'#25D366', color:'#fff', emoji:'W',
      url:`https://wa.me/?text=${encodeURIComponent('Health insight from Vitae AI: ' + shortText + ' ' + window.location.href)}` },
  ];

  return (
    <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="share-modal">
        <div className="share-hd">
          <div className="share-title">Share</div>
          <button className="modal-close" onClick={onClose}><X size={14}/></button>
        </div>
        <div className="share-notice">
          ⓘ By sharing, confirm this content contains no sensitive or identifiable patient information.
        </div>
        <div className="share-preview">{shortText}</div>
        <button className="share-copy-btn" onClick={copyLink}>
          {copied ? '✓ Copied!' : '🔗 Copy link'}
        </button>
        <div className="share-socials">
          {socials.map(s=>(
            <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" style={{textDecoration:'none'}}>
              <div className="social-btn">
                <div className="social-icon" style={{background:s.bg,color:s.color}}>{s.emoji}</div>
                <span className="social-lbl">{s.name}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── PDF Generation ────────────────────────────────────────────────────────────
function generatePDF(content, question) {
  const plain = content
    .replace(/<div class="ref-box">[\s\S]*<\/div>/,'')
    .replace(/<[^>]+>/g,'\n')
    .replace(/\n{3,}/g,'\n\n')
    .replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>')
    .trim();

  const now = new Date().toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'});

  const html = `<!DOCTYPE html><html><head><meta charset="utf-8">
<title>Vitae Clinical Analysis</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=DM+Sans:opsz,wght@9..40,400;9..40,500&display=swap');
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'DM Sans',sans-serif;font-size:13px;color:#111827;background:#fff;padding:48px;max-width:720px;margin:0 auto;line-height:1.7}
  .header{border-bottom:2px solid #1B4332;padding-bottom:18px;margin-bottom:24px}
  .brand{font-family:'Playfair Display',serif;font-size:22px;font-weight:700;color:#1B4332}
  .brand-sub{font-size:11px;color:#6B7280;margin-top:3px;letter-spacing:.3px}
  .date{font-size:11px;color:#6B7280;margin-top:8px}
  .query-box{background:#F0FDF4;border-left:3px solid #52B788;padding:12px 16px;border-radius:0 8px 8px 0;margin-bottom:22px;font-size:13px;color:#1B4332;font-style:italic}
  .query-lbl{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.6px;color:#2D6A4F;margin-bottom:5px}
  .body{white-space:pre-wrap;font-size:13px;line-height:1.75;color:#1F2937}
  .footer{margin-top:32px;padding-top:14px;border-top:1px solid #E5E1D8;font-size:10.5px;color:#9CA3AF;line-height:1.6}
  .powered{margin-top:8px;font-size:11px;color:#2D6A4F;font-weight:500}
</style></head><body>
<div class="header">
  <div class="brand">Vitae Health AI</div>
  <div class="brand-sub">Powered by Bio Precision Aging · bioprecisionaging.com</div>
  <div class="date">Generated ${now}</div>
</div>
<div class="query-lbl">Clinical Query</div>
<div class="query-box">${question || 'Clinical analysis'}</div>
<div class="body">${plain}</div>
<div class="footer">
  This report was generated by Vitae AI, a clinical decision-support tool powered by Claude AI and grounded in GRADE evidence methodology.<br/>
  For educational and clinical decision-support purposes only. All management decisions should be made in the context of the full clinical picture by the treating clinician.
  <div class="powered">Bio Precision Aging · bioprecisionaging.com</div>
</div>
</body></html>`;

  const blob = new Blob([html], { type: 'text/html' });
  const url  = URL.createObjectURL(blob);
  const win  = window.open(url, '_blank');
  if(win) { win.onload = () => { win.print(); }; }
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}

// ── Paste / Free Text Modal ───────────────────────────────────────────────────
const PASTE_TYPES = ['lab','imaging','note','medication','symptom','other'];

function PasteModal({ onClose, onAnalyze, analyzing }) {
  const [text,     setText]    = useState('');
  const [recType,  setRecType] = useState('lab');
  const [title,    setTitle]   = useState('');
  const areaRef = useRef(null);

  useEffect(() => { areaRef.current?.focus(); }, []);

  const handlePaste = async () => {
    if (!text.trim()) return;
    await onAnalyze(text.trim(), recType, title.trim() || null);
  };

  const handleSendToChat = () => {
    if (!text.trim()) return;
    onClose({ sendToChat: text.trim() });
  };

  return (
    <div className="modal-overlay" onClick={e => e.target===e.currentTarget && onClose({})}>
      <div className="modal">
        <div className="modal-hd">
          <div className="modal-title">Paste or type health information</div>
          <button className="modal-close" onClick={() => onClose({})}><X size={14}/></button>
        </div>
        <div className="modal-body">
          <div style={{fontSize:12.5,color:'var(--mu)',marginBottom:12,lineHeight:1.55}}>
            Paste lab results, doctor notes, symptom descriptions, medication lists, or any health text. Claude AI will analyze and categorize it automatically.
          </div>
          <input
            value={title}
            onChange={e=>setTitle(e.target.value)}
            placeholder="Title (optional — e.g. CBC Results, Symptoms, Visit Notes)"
            style={{width:'100%',padding:'9px 12px',border:'1.5px solid var(--bd)',borderRadius:'var(--rds)',fontSize:13,fontFamily:"'DM Sans',sans-serif",color:'var(--tx)',background:'var(--bg)',outline:'none',marginBottom:10}}
          />
          <div style={{fontSize:11,fontWeight:700,textTransform:'uppercase',letterSpacing:'.6px',color:'var(--mu)',marginBottom:7}}>Record type</div>
          <div className="type-row">
            {PASTE_TYPES.map(t=>(
              <button key={t} className={`type-chip ${recType===t?'on':''}`} onClick={()=>setRecType(t)}>
                {t.charAt(0).toUpperCase()+t.slice(1)}
              </button>
            ))}
          </div>
          <textarea
            ref={areaRef}
            className="paste-area"
            value={text}
            onChange={e=>setText(e.target.value)}
            placeholder={`Paste your ${recType} information here…\n\nExamples:\n• Lab results with values and reference ranges\n• Doctor visit notes or discharge summaries\n• Symptoms you're experiencing\n• Medication names and dosages\n• Any health-related text`}
          />
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:8}}>
            <span style={{fontSize:11.5,color:'var(--mu)'}}>{text.length} characters</span>
            <button
              style={{fontSize:12,color:'var(--g7)',background:'none',border:'none',cursor:'pointer',textDecoration:'underline'}}
              onClick={async()=>{try{const t=await navigator.clipboard.readText();setText(t);}catch{}}}
            >
              Paste from clipboard
            </button>
          </div>
        </div>
        <div className="modal-foot">
          <button className="btn btnO btnsm" onClick={handleSendToChat} disabled={!text.trim()}>
            <MessageSquare size={13}/>Send to AI chat
          </button>
          <button className="btn btnP btnsm" onClick={handlePaste} disabled={!text.trim() || analyzing}>
            {analyzing
              ? <><span style={{display:'inline-block',animation:'sp 1s linear infinite'}}><Loader size={13}/></span>Analyzing…</>
              : <><ClipboardPaste size={13}/>Analyze &amp; save to Records</>
            }
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Peptide System Prompt ─────────────────────────────────────────────────────
const makePeptidePrompt = (name, questionnaire, libraryText) => {
  const q = questionnaire;
  return `You are the world's foremost peptide medicine specialist — combining the expertise of an endocrinologist, sports medicine physician, longevity researcher, and clinical pharmacologist. You consult practitioner-to-practitioner on peptide therapeutics for optimization, longevity, and performance.

You have deep, current knowledge of:
- Peptide pharmacology: mechanisms, receptor binding, downstream signaling
- Clinical dosing protocols and evidence-based titration strategies
- Peptide stacking combinations and synergistic effects
- Side effect profiles, contraindications, and monitoring parameters
- The full spectrum from FDA-approved peptides to research compounds
- Injection technique, reconstitution, storage, and administration
- Compounding pharmacy considerations and sourcing quality

COMMUNICATION STYLE:
- Practitioner-to-practitioner — assume clinical literacy
- Lead with mechanism, then clinical application, then dosing
- Be specific about dosing — give ranges, titration schedules, and timing
- Flag safety considerations and monitoring proactively
- Note evidence quality (RCT vs animal model vs case series vs clinical experience)
- When stacking, explain synergies and any interaction considerations

GRADE LABELS (use on every key claim):
[Verified — High] RCTs or FDA-approved data
[Verified — Moderate] Strong observational or multiple cohort studies
[Verified — Low] Animal models + clinical extrapolation
[Speculation] Mechanistic reasoning + practitioner experience
[Unknown] Insufficient evidence

PATIENT PROFILE:
${name ? `Name: ${name}` : 'Patient: Anonymous'}
${q ? `
Age: ${q.age || 'Not provided'}
Biological sex: ${q.sex || 'Not provided'}
Activity level: ${q.activity || 'Not provided'}
Primary optimization goals: ${(q.goals || []).join(', ')}
Health history / conditions: ${q.history || 'None provided'}
Current medications / peptides: ${q.currentMeds || 'None'}
Experience with peptides: ${q.experience || 'Not provided'}
Additional context: ${q.notes || 'None'}
` : 'No questionnaire completed yet — ask the patient to complete the assessment for personalized recommendations.'}

PEPTIDE FORMULARY — BIO PRECISION AGING:
${PEPTIDE_CONTEXT.slice(0, 12000)}

${libraryText ? `\nCLINICIAN LIBRARY DOCUMENTS:\n${libraryText.slice(0,4000)}` : ''}

FORMATTING:
- Use **markdown tables** whenever presenting comparative data, dosing options, compound comparisons, side effect profiles, or any structured multi-column information — never use pipe-separated text without a proper header/separator row
- Table format: | Header | Header | \n |---|---| \n | value | value |
- Bold key peptide names, doses, and clinical terms
- Use numbered lists for protocols and differentials
- Use bullets for benefits and considerations
- Always include a References section with URLs where available
- No ## headings, no --- dividers

End with: "⚕ For clinical decision-support only. Peptide therapy should be supervised by a qualified clinician with appropriate monitoring."`;
};

// ── Peptide Consultant Component ──────────────────────────────────────────────
const PEPTIDE_GOALS = PEPTIDE_GOALS_DATA;

const PEPTIDE_CSS = `
.p-wrap{display:flex;flex-direction:column;height:100%;min-height:500px}
.p-msgs{flex:1;overflow-y:auto;padding:20px 32px;display:flex;flex-direction:column;gap:16px;align-items:stretch}
.p-msgs-inner{max-width:900px;width:100%;margin:0 auto;display:flex;flex-direction:column;gap:16px;flex:1}
.p-cbot{padding:12px 32px 16px;background:var(--surf);border-top:1px solid var(--bd)}
.p-cbot-inner{max-width:900px;width:100%;margin:0 auto}
.p-irow{display:flex;gap:8px;align-items:flex-end}
.qz-card{background:var(--surf);border:1px solid var(--bd);border-radius:var(--rd);padding:20px 24px;max-width:640px}
.qz-title{font-family:'Playfair Display',serif;font-size:18px;font-weight:600;color:var(--g9);margin-bottom:5px}
.qz-sub{font-size:13px;color:var(--mu);margin-bottom:18px;line-height:1.5}
.qz-section{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.6px;color:var(--mu);margin:16px 0 8px}
.qz-goals{display:flex;flex-wrap:wrap;gap:7px;margin-bottom:4px}
.goal-chip{padding:7px 13px;border-radius:20px;font-size:12.5px;cursor:pointer;border:1.5px solid var(--bd);background:var(--surf);color:var(--tx);font-family:'DM Sans',sans-serif;transition:all .15s;display:flex;align-items:center;gap:6px}
.goal-chip.sel{background:var(--g9);border-color:var(--g9);color:#fff}
.qz-input{width:100%;padding:10px 12px;border:1.5px solid var(--bd);border-radius:var(--rds);font-size:13.5px;font-family:'DM Sans',sans-serif;color:var(--tx);background:var(--bg);outline:none;transition:border-color .15s;margin-bottom:8px}
.qz-input:focus{border-color:var(--g5);background:var(--surf)}
.qz-select{width:100%;padding:10px 12px;border:1.5px solid var(--bd);border-radius:var(--rds);font-size:13.5px;font-family:'DM Sans',sans-serif;color:var(--tx);background:var(--bg);outline:none;margin-bottom:8px;appearance:none;cursor:pointer}
.qz-textarea{width:100%;padding:10px 12px;border:1.5px solid var(--bd);border-radius:var(--rds);font-size:13.5px;font-family:'DM Sans',sans-serif;color:var(--tx);background:var(--bg);outline:none;resize:vertical;min-height:70px;line-height:1.55;margin-bottom:8px}
.qz-textarea:focus,.qz-input:focus,.qz-select:focus{border-color:var(--g5)}
.qz-btns{display:flex;gap:8px;margin-top:14px}
.p-chip{padding:5px 13px;background:var(--bg);border:1px solid var(--bd);border-radius:20px;font-size:12px;color:var(--g9);cursor:pointer;font-family:'DM Sans',sans-serif;white-space:nowrap;flex-shrink:0}
.p-chip:hover{background:var(--g1)}
`;

function PeptideConsultant({ name, library, isMobile }) {
  const [step,    setStep]    = useState('intro');
  const [qData,   setQData]   = useState({ goals:[], age:'', sex:'', activity:'', history:'', currentMeds:'', experience:'', notes:'' });
  const [msgs,    setMsgs]    = useState([]);
  const [input,   setInput]   = useState('');
  const [busy,    setBusy]    = useState(false);
  const [votes,   setVotes]   = useState({});
  const [copiedIdx, setCopied] = useState(null);
  const endRef = useRef(null);

  useEffect(()=>{ endRef.current?.scrollIntoView({behavior:'smooth'}); }, [msgs, busy]);

  const toggleGoal = (id) => setQData(d => ({
    ...d,
    goals: d.goals.includes(id) ? d.goals.filter(g=>g!==id) : [...d.goals, id],
  }));

  const startConsult = () => {
    const intro = `I've completed your peptide optimization assessment. Based on your profile:

**Patient:** ${name || 'Anonymous'}
**Age:** ${qData.age || 'Not provided'} | **Sex:** ${qData.sex || 'Not provided'} | **Activity:** ${qData.activity || 'Not provided'}
**Primary goals:** ${qData.goals.map(g => PEPTIDE_GOALS.find(p=>p.id===g)?.label || g).join(', ')}
**Health history:** ${qData.history || 'None noted'}
**Current medications/peptides:** ${qData.currentMeds || 'None'}
**Peptide experience:** ${qData.experience || 'Not specified'}

I'll now generate your personalized peptide recommendations. Ask me anything about specific peptides, dosing protocols, stacking strategies, or mechanisms.`;

    setMsgs([{ role:'assistant', content: intro }]);
    setStep('chat');
    setTimeout(() => sendPeptide(`Based on my profile above, provide personalized peptide recommendations with specific dosing protocols for my primary goals: ${qData.goals.map(g => PEPTIDE_GOALS.find(p=>p.id===g)?.label || g).join(', ')}`), 300);
  };

  const sendPeptide = async (text) => {
    const m = (text || input).trim();
    if (!m || busy) return;
    const h = [...msgs, { role:'user', content:m }];
    setMsgs(h);
    setInput('');
    setBusy(true);
    try {
      const libText = library?.map(d=>`[Library: ${d.name}]\n${d.text||''}`).join('\n\n') || null;
      const r = await fetch('/api/chat', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
          model:'claude-sonnet-4-6',
          max_tokens:3000,
          system: makePeptidePrompt(name, qData.goals.length ? qData : null, libText),
          messages: h,
          _sources: { clinicalWeb: true, literature: true },
        }),
      });
      const d = await r.json();
      const reply = d.mergedText || d.content?.[0]?.text || 'Error — try again.';
      setMsgs(p => [...p, { role:'assistant', content: reply }]);
    } catch {
      setMsgs(p => [...p, { role:'assistant', content:'⚠ Connection error. Please try again.' }]);
    } finally { setBusy(false); }
  };

  const quickQs = [
    'What are the best peptides for my goals?',
    'How do I stack these peptides?',
    'Explain the dosing protocol in detail',
    'What monitoring do I need?',
    'What are the contraindications?',
    'Compare CJC-1295 vs Ipamorelin',
  ];

  const copyText = async (i, content) => {
    const plain = content.replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim();
    try { await navigator.clipboard.writeText(plain); } catch {}
    setCopied(i);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <>
      <style>{PEPTIDE_CSS}</style>
      <div className="p-wrap">
        <div className="p-msgs">
          <div className="p-msgs-inner">
          {step === 'intro' && (
            <div style={{maxWidth:640,width:'100%',margin:'0 auto'}}>
            <div className="qz-card fu">
              <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:12}}>
                <div style={{width:40,height:40,borderRadius:10,background:'var(--g1)',display:'flex',alignItems:'center',justifyContent:'center'}}><Dna size={20} color="var(--g9)"/></div>
                <div>
                  <div className="qz-title">Peptide Consultant</div>
                  <div style={{fontSize:12,color:'var(--mu)'}}>Powered by Bio Precision Aging</div>
                </div>
              </div>
              <div className="qz-sub">
                I'm a specialized AI consultant for peptide therapeutics — providing evidence-graded information on mechanisms, clinical applications, and dosing protocols for optimization, longevity, and performance.<br/><br/>
                Complete a brief assessment to receive personalized recommendations, or ask a direct question below.
              </div>
              <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                <button className="btn btnP" onClick={()=>setStep('questionnaire')}>
                  Complete Assessment →
                </button>
                <button className="btn btnO" onClick={()=>{
                  setMsgs([{role:'assistant',content:`I'm your Peptide Consultant. Ask me anything about peptide therapeutics: mechanisms, dosing protocols, stacking strategies, or specific optimization goals. I communicate as an AI clinical consultant with full clinical detail.\n\nWhat would you like to know?`}]);
                  setStep('chat');
                }}>
                  Skip — Ask Directly
                </button>
              </div>
            </div>
            </div>
          )}

          {step === 'questionnaire' && (
            <div style={{maxWidth:640,width:'100%',margin:'0 auto'}}>
            <div className="qz-card fu">
              <div className="qz-title">Optimization Assessment</div>
              <div className="qz-sub">Complete this assessment for personalized peptide recommendations. All fields optional.</div>

              <div className="qz-section">Step 1 — Select your optimization goals (select all that apply)</div>
              <div className="qz-goals">
                {PEPTIDE_GOALS.map(g => (
                  <button key={g.id} className={`goal-chip ${qData.goals.includes(g.id)?'sel':''}`} onClick={()=>toggleGoal(g.id)}>
                    {g.icon} {g.label}
                  </button>
                ))}
              </div>

              <div className="qz-section">Step 2 — Basic information</div>
              <input className="qz-input" placeholder="Age" type="number" value={qData.age} onChange={e=>setQData(d=>({...d,age:e.target.value}))}/>
              <select className="qz-select" value={qData.sex} onChange={e=>setQData(d=>({...d,sex:e.target.value}))}>
                <option value="">Biological sex (select)</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other/Prefer not to say">Other / Prefer not to say</option>
              </select>
              <select className="qz-select" value={qData.activity} onChange={e=>setQData(d=>({...d,activity:e.target.value}))}>
                <option value="">Activity level (select)</option>
                <option value="Sedentary">Sedentary (desk job, minimal exercise)</option>
                <option value="Lightly active">Lightly active (1–3x/week)</option>
                <option value="Moderately active">Moderately active (3–5x/week)</option>
                <option value="Highly active">Highly active (6–7x/week)</option>
                <option value="Athlete/competitive">Athlete / Competitive</option>
              </select>

              <div className="qz-section">Step 3 — Health history &amp; medications</div>
              <textarea className="qz-textarea" placeholder="Relevant health conditions, diagnoses, or concerns (e.g. hypothyroidism, insulin resistance, history of cancer...)" value={qData.history} onChange={e=>setQData(d=>({...d,history:e.target.value}))}/>
              <textarea className="qz-textarea" placeholder="Current medications, hormones, or peptides (e.g. testosterone, metformin, BPC-157...)" value={qData.currentMeds} onChange={e=>setQData(d=>({...d,currentMeds:e.target.value}))}/>
              <select className="qz-select" value={qData.experience} onChange={e=>setQData(d=>({...d,experience:e.target.value}))}>
                <option value="">Experience with peptides (select)</option>
                <option value="None — new to peptides">None — new to peptides</option>
                <option value="Some experience (1–5 peptides)">Some experience (1–5 peptides)</option>
                <option value="Experienced (multiple protocols)">Experienced (multiple protocols)</option>
                <option value="Advanced (stacking, years of use)">Advanced (stacking, years of use)</option>
              </select>
              <textarea className="qz-textarea" placeholder="Anything else to know? Specific questions, failed approaches, preferences..." value={qData.notes} onChange={e=>setQData(d=>({...d,notes:e.target.value}))}/>

              <div className="qz-btns">
                <button className="btn btnP" onClick={startConsult} disabled={qData.goals.length===0}>
                  Generate Recommendations →
                </button>
                <button className="btn btnO" onClick={()=>setStep('intro')}>
                  Back
                </button>
              </div>
              {qData.goals.length===0 && <div style={{fontSize:12,color:'var(--mu)',marginTop:8}}>Select at least one goal to continue.</div>}
            </div>
            </div>
          )}

          {step === 'chat' && msgs.map((m,i) => (
            <div key={i} className={`${isMobile?'msg':'desk-msg'} ${m.role==='user'?'u':'a'} fu`}>
              <div className="mrole" style={{display:'flex',alignItems:'center',gap:6}}>
                {m.role==='user'?'You':'Peptide Consultant'}
                {m.role==='assistant'&&<span className="model-badge" style={{background:'#EDE9FE',color:'#5B21B6',fontSize:9,padding:'2px 7px',borderRadius:20,fontWeight:600,display:'inline-flex',alignItems:'center',gap:3}}><Dna size={8}/>Bio Precision AI</span>}
              </div>
              {m.role==='user'
                ? <div className="mb">{m.content}</div>
                : <>
                    <div className="mb" dangerouslySetInnerHTML={{__html:renderMd(m.content)}}/>
                    <div className="action-bar">
                      <button className={`act-btn ${votes[i]==='up'?'voted':''}`} onClick={()=>setVotes(v=>({...v,[i]:v[i]==='up'?null:'up'}))}>👍{votes[i]==='up'?' Helpful':''}</button>
                      <button className={`act-btn ${votes[i]==='down'?'voted':''}`} onClick={()=>setVotes(v=>({...v,[i]:v[i]==='down'?null:'down'}))}>👎{votes[i]==='down'?' Not helpful':''}</button>
                      <div className="act-sep"/>
                      <button className="act-btn" onClick={()=>copyText(i,m.content)}>{copiedIdx===i?'✓ Copied':'📋 Copy'}</button>
                      <button className="act-btn" onClick={()=>generatePDF(m.content, msgs.filter(x=>x.role==='user')[Math.floor(i/2)]?.content||'Peptide consultation')}>📄 PDF</button>
                    </div>
                  </>
              }
            </div>
          ))}
          {busy && step==='chat' && (
            <div className={`${isMobile?'msg':'desk-msg'} a fu`}>
              <div className="mrole" style={{display:'flex',alignItems:'center',gap:6}}>Peptide Consultant <span className="model-badge badge-opus"><Brain size={9}/>Analyzing…</span></div>
              <div className="dots"><div className="dot"/><div className="dot"/><div className="dot"/></div>
            </div>
          )}
          <div ref={endRef}/>
          </div>
        </div>

        {step==='chat' && (
          <div className="p-cbot">
            <div className="p-cbot-inner">
            <div className="qrow" style={{marginBottom:8}}>
              {quickQs.map(q=><button key={q} className="p-chip" onClick={()=>sendPeptide(q)}>{q}</button>)}
              <button className="p-chip" style={{color:'var(--mu)',borderStyle:'dashed'}} onClick={()=>setStep('questionnaire')}>
                <RotateCcw size={11} style={{display:'inline',marginRight:4}}/>Redo assessment
              </button>
            </div>
            <div className="p-irow">
              <textarea className="ci" value={input} onChange={e=>setInput(e.target.value)}
                onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendPeptide();}}}
                placeholder="Ask about peptides, dosing, stacking, mechanisms…" rows={1}/>
              <button className="sb" onClick={()=>sendPeptide()} disabled={busy||!input.trim()}><Send size={16}/></button>
            </div>
            <div className="disc">⚕ For clinical decision-support only. Peptide therapy requires clinician supervision.</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function Setup({ onDone }) {
  const [name, setName] = useState('');
  return (
    <div style={{minHeight:'100vh',background:'#f9fafb',display:'flex',alignItems:'center',justifyContent:'center',padding:'24px'}}>
      <div style={{background:'#ffffff',borderRadius:16,padding:'36px 28px',maxWidth:440,width:'100%',boxShadow:'0 4px 24px rgba(0,0,0,0.08)'}}>
        <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:10}}>
          <Heart size={28} style={{color:'#52B788'}} fill="#52B788"/>
          <span style={{fontSize:26,fontWeight:700,color:'#1B4332',fontFamily:"'Playfair Display',Georgia,serif"}}>Vitae</span>
        </div>
        <p style={{fontSize:15,color:'#6B7280',marginBottom:24,lineHeight:1.6}}>
          Your personal health AI. Enter your name to get started — no account or API key needed.
        </p>
        <div style={{background:'#F0FDF4',border:'1px solid #D1FAE5',borderRadius:12,padding:'16px',marginBottom:24}}>
          <div style={{fontWeight:600,fontSize:13,color:'#1B4332',marginBottom:8}}>✓ What you can do</div>
          <div style={{fontSize:13,color:'#2D6A4F',lineHeight:1.8}}>
            • Upload lab results, imaging, or any medical document<br/>
            • Get AI analysis with flagged values highlighted<br/>
            • Ask health questions with cited clinical guidelines<br/>
            • Works on mobile and desktop<br/>
            • A complete Peptide Guide with AI Consulting<br/>
            • Ask questions about the most popular peptides
          </div>
        </div>
        <div style={{marginBottom:16}}>
          <label style={{display:'block',fontSize:11,fontWeight:700,letterSpacing:'0.08em',color:'#374151',marginBottom:6,textTransform:'uppercase'}}>Your Name</label>
          <input
            value={name}
            onChange={e=>setName(e.target.value)}
            placeholder="e.g. Alex Johnson"
            onKeyDown={e=>e.key==='Enter'&&name.trim()&&onDone(name.trim())}
            style={{width:'100%',padding:'12px 14px',fontSize:15,border:'1.5px solid #D1FAE5',borderRadius:10,outline:'none',boxSizing:'border-box',color:'#111827',background:'#fff',fontFamily:'inherit'}}
            onFocus={e=>e.target.style.borderColor='#52B788'}
            onBlur={e=>e.target.style.borderColor='#D1FAE5'}
          />
        </div>
        <button
          onClick={()=>name.trim()&&onDone(name.trim())}
          disabled={!name.trim()}
          style={{width:'100%',padding:'14px',fontSize:15,fontWeight:600,color:'#fff',background:name.trim()?'#2D6A4F':'#9CA3AF',border:'none',borderRadius:10,cursor:name.trim()?'pointer':'not-allowed',transition:'background 0.2s',fontFamily:'inherit'}}
          onMouseEnter={e=>{if(name.trim())e.target.style.background='#1B4332';}}
          onMouseLeave={e=>{if(name.trim())e.target.style.background='#2D6A4F';}}
        >
          Get Started →
        </button>
        <p style={{fontSize:11,color:'#9CA3AF',marginTop:16,textAlign:'center',lineHeight:1.6}}>
          Your data stays in your browser session only. Nothing is stored on any server.
        </p>
        <div style={{marginTop:20,paddingTop:16,borderTop:'1px solid #F3F4F6',textAlign:'center'}}>
          <p style={{fontSize:11,color:'#9CA3AF',margin:'0 0 3px'}}>Powered by</p>
          <p style={{fontSize:13,fontWeight:600,color:'#1B4332',margin:0,fontFamily:"'Playfair Display',Georgia,serif"}}>Bio Precision Aging</p>
        </div>
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
        <div className="hlbl">Good morning · <a href="https://www.bioprecisionaging.com" target="_blank" rel="noopener noreferrer" style={{color:'rgba(255,255,255,.65)',textDecoration:'none',letterSpacing:'1px'}}>Bio Precision Aging</a></div>
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

function RecordsContent({uploads, setUploads, analyzing, setAnalyzing, filter, setFilter, allRecs, filtered, setPage, setInput, fileRef, toast2, drag, setDrag, setShowPaste}) {
  return (
    <>
      <div className={`upz ${drag?'drag':''} ${analyzing?'busy':''}`}
        onClick={()=>!analyzing&&fileRef.current?.click()}
        onDragOver={e=>{e.preventDefault();setDrag(true);}}
        onDragLeave={()=>setDrag(false)}
        onDrop={e=>{e.preventDefault();setDrag(false);const f=e.dataTransfer.files?.[0];if(f)fileRef.current._analyze(f);}}>
        {analyzing
          ?<><span className="spin" style={{display:'block',margin:'0 auto 9px',width:28,height:28,color:'var(--g5)'}}><Loader size={28}/></span><div style={{fontSize:14,fontWeight:600,color:'var(--g9)'}}>Analyzing with Claude AI…</div><div style={{fontSize:12,color:'var(--mu)',marginTop:5}}>Extracting key values from your document</div></>
          :<><Upload size={28} color="var(--mu)" style={{margin:'0 auto 8px',display:'block'}}/><div style={{fontSize:14,fontWeight:500}}>Tap to upload or drag & drop</div><div style={{fontSize:12,color:'var(--mu)',marginTop:4}}>PDF · JPG · PNG — Labs · Imaging · Notes</div><div style={{fontSize:12,color:'var(--g7)',marginTop:7,fontWeight:500}}>Claude AI analyzes and categorizes automatically</div><div style={{marginTop:10,paddingTop:10,borderTop:'1px dashed var(--bd)'}}><button onClick={e=>{e.stopPropagation();setShowPaste(true);}} style={{fontSize:12,color:'var(--g9)',background:'none',border:'none',cursor:'pointer',textDecoration:'underline',fontFamily:"'DM Sans',sans-serif",display:'flex',alignItems:'center',gap:5,margin:'0 auto'}}><ClipboardPaste size={13}/>Or paste / type text instead</button></div></>}
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

function ChatContent({msgs, busy, input, setInput, send, QUICK_QS, endRef, isMobile, recording, toggleVoice, voiceHint, lastModel, sources, setSources, library, setLibrary, showSrcMenu, setShowSrcMenu, libraryFileRef, addToLibrary}) {
  const [votes,      setVotes]      = useState({});
  const [shareIdx,   setShareIdx]   = useState(null);
  const [copiedIdx,  setCopiedIdx]  = useState(null);

  const vote = (i, dir) => setVotes(v => ({...v, [i]: v[i]===dir ? null : dir}));

  const copyText = async (i, content) => {
    const plain = content.replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim();
    try { await navigator.clipboard.writeText(plain); } catch {}
    setCopiedIdx(i);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const userMsgs = msgs?.filter(m=>m.role==='user') || [];

  return (
    <>
      {shareIdx !== null && (
        <ShareModal content={msgs[shareIdx]?.content || ''} onClose={() => setShareIdx(null)}/>
      )}
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
            {m.role==='user'
              ? <div className="mb">{m.content}</div>
              : <>
                  <div className="mb" dangerouslySetInnerHTML={{__html:renderMd(m.content)}}/>
                  <div className="action-bar">
                    <button className={`act-btn ${votes[i]==='up'?'voted':''}`} onClick={()=>vote(i,'up')} title="Helpful">
                      👍 {votes[i]==='up' ? 'Helpful' : ''}
                    </button>
                    <button className={`act-btn ${votes[i]==='down'?'voted':''}`} onClick={()=>vote(i,'down')} title="Not helpful">
                      👎 {votes[i]==='down' ? 'Not helpful' : ''}
                    </button>
                    <div className="act-sep"/>
                    <button className="act-btn" onClick={()=>copyText(i, m.content)} title="Copy text">
                      {copiedIdx===i ? '✓ Copied' : '📋 Copy'}
                    </button>
                    <button className="act-btn" onClick={()=>setShareIdx(i)} title="Share">
                      🔗 Share
                    </button>
                    <button className="act-btn" onClick={()=>generatePDF(m.content, userMsgs[Math.floor(i/2)]?.content||'')} title="Download as PDF">
                      📄 PDF
                    </button>
                  </div>
                </>
            }
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

          {/* Sources toolbar */}
          <div className="src-bar">
            <span style={{fontSize:11,color:'var(--mu)',fontWeight:500,marginRight:2}}>Sources</span>
            <button className={`src-btn ${sources.clinicalWeb?'on':''}`}
              onClick={()=>setSources(s=>({...s,clinicalWeb:!s.clinicalWeb}))}>
              🌐 Clinical web
              <button className={`src-toggle ${sources.clinicalWeb?'on':''}`}
                onClick={e=>{e.stopPropagation();setSources(s=>({...s,clinicalWeb:!s.clinicalWeb}));}}/>
            </button>
            <button className={`src-btn ${sources.literature?'on':''}`}
              onClick={()=>setSources(s=>({...s,literature:!s.literature}))}>
              📚 Literature &amp; guidelines
              <button className={`src-toggle ${sources.literature?'on':''}`}
                onClick={e=>{e.stopPropagation();setSources(s=>({...s,literature:!s.literature}));}}/>
            </button>
            <button className={`src-btn ${library.length>0?'on':''}`}
              onClick={()=>setShowSrcMenu(v=>!v)}>
              🗂 My library
              {library.length>0 && <span className="src-count">{library.length}</span>}
            </button>
            {showSrcMenu && (
              <div className="src-menu" onClick={e=>e.stopPropagation()}>
                <div className="src-menu-item">
                  <div className="src-menu-icon">🗂</div>
                  <div className="src-menu-info">
                    <div className="src-menu-title">My Library</div>
                    <div className="src-menu-sub">Upload PDFs or text files. Claude will reference them as primary source material when answering your questions.</div>
                    <label className="btn btnP btnsm" style={{marginTop:9,fontSize:11.5,cursor:'pointer',display:'inline-flex',alignItems:'center',gap:5}}>
                      + Add document
                      <input type="file" accept=".pdf,.txt,.md" style={{position:'absolute',opacity:0,width:0,height:0,overflow:'hidden'}}
                        onChange={e=>{const f=e.target.files?.[0];if(f){addToLibrary(f);}e.target.value='';}}/>
                    </label>
                    {library.map((doc,i)=>(
                      <div key={i} className="lib-item">
                        📄 <span style={{flex:1,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{doc.name}</span>
                        <button className="lib-del" onClick={()=>setLibrary(prev=>prev.filter((_,j)=>j!==i))}><X size={12}/></button>
                      </div>
                    ))}
                    {library.length===0 && <div style={{fontSize:12,color:'var(--mu)',marginTop:7,fontStyle:'italic'}}>No documents yet — add one above</div>}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className={isMobile?'mob-irow':'desk-irow'}>
            <button className={`mic-btn ${recording?'recording':''}`} onClick={toggleVoice} title={recording?'Stop recording':'Start voice input'}>
              {recording ? <MicOff size={17}/> : <Mic size={17}/>}
            </button>
            <textarea className="ci" value={input} onChange={e=>setInput(e.target.value)}
              onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send();}}}
              placeholder="Ask any health question — or tap the mic to speak…" rows={1}/>
            <button className="sb" onClick={()=>send()} disabled={busy||!input.trim()}><Send size={16}/></button>
          </div>
          <div className="disc">⚕ For educational and clinical decision-support purposes only.</div>
          <div style={{textAlign:'center',marginTop:6,fontSize:10,color:'var(--mu)',letterSpacing:'.2px'}}>Powered by <a href="https://www.bioprecisionaging.com" target="_blank" rel="noopener noreferrer" style={{fontWeight:600,color:'var(--g9)',textDecoration:'none'}}>Bio Precision Aging</a></div>
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
  const [recording,  setRecording]  = useState(false);
  const [voiceHint,  setVoiceHint]  = useState('');
  const [lastModel,  setLastModel]  = useState('sonnet');
  const [showPaste,  setShowPaste]  = useState(false);
  const [sources,    setSources]    = useState({ clinicalWeb: true, literature: true });
  const [library,    setLibrary]    = useState([]);
  const [showSrcMenu, setShowSrcMenu] = useState(false);
  const libraryFileRef = useRef(null);
  const recognitionRef = useRef(null);
  const mediaRecRef    = useRef(null);
  const endRef  = useRef(null);
  const fileRef = useRef(null);

  useEffect(()=>{
    if(name&&!msgs) setMsgs([{role:'assistant',content:`Hello **${name}**! I'm Vitae AI.\n\nUpload records in the Records tab and I can see all your values — no copy-pasting needed. I'll give you [Verified] evidence-based guidance from recognized clinical guidelines.\n\nWhat would you like to know?`}]);
  },[name]);
  useEffect(()=>{endRef.current?.scrollIntoView({behavior:'smooth'});},[msgs,busy]);
  useEffect(()=>{
    if(!showSrcMenu) return;
    const close = (e) => {
      if (!e.target.closest('.src-bar') && !e.target.closest('.src-menu')) {
        setShowSrcMenu(false);
      }
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  },[showSrcMenu]);

  const toast2=(msg,err=false)=>{setToast({msg,err});setTimeout(()=>setToast(null),3500);};

  const addToLibrary = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const isText = file.type === 'text/plain';
      if (isText) {
        const text = e.target.result;
        setLibrary(prev => [...prev, { name: file.name, text: text.slice(0, 12000) }]);
        toast2(`✓ "${file.name}" added to My Library`);
      } else {
        const b64 = e.target.result.split(',')[1];
        setLibrary(prev => [...prev, { name: file.name, b64, type: file.type }]);
        toast2(`✓ "${file.name}" added to My Library`);
      }
    };
    if (file.type === 'text/plain') reader.readAsText(file);
    else reader.readAsDataURL(file);
    if (libraryFileRef.current) libraryFileRef.current.value = '';
  };

  const startVoice = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous      = false;
      recognition.interimResults  = true;
      recognition.lang            = 'en-US';
      recognitionRef.current      = recognition;
      recognition.onstart = () => { setRecording(true); setVoiceHint('Listening… speak your question'); };
      recognition.onresult = (e) => {
        const transcript = Array.from(e.results).map(r => r[0].transcript).join('');
        setInput(transcript);
        if (e.results[e.results.length - 1].isFinal) setVoiceHint('Got it — tap send or keep talking');
      };
      recognition.onerror = (e) => { setRecording(false); setVoiceHint(''); if (e.error !== 'aborted') toast2('Microphone error: ' + e.error, true); };
      recognition.onend = () => { setRecording(false); setVoiceHint(''); recognitionRef.current = null; };
      recognition.start();
      return;
    }
    if (!navigator.mediaDevices?.getUserMedia) { toast2('Voice input not supported in this browser. Try Chrome or Edge.', true); return; }
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
          const blob = new Blob(chunks, { type: mimeType });
          const b64  = await new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result.split(',')[1]); r.onerror = rej; r.readAsDataURL(blob); });
          const resp = await fetch('/api/transcribe', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ audio: b64, mimeType }) });
          const data = await resp.json();
          if (data.transcript) setInput(data.transcript);
          else toast2(data.error || 'Could not transcribe audio', true);
        } catch { toast2('Transcription failed — please try again', true); }
        finally { setRecording(false); setVoiceHint(''); mediaRecRef.current = null; }
      };
      rec.start();
      setRecording(true);
      setVoiceHint('Recording… tap mic again to stop');
    }).catch(() => { toast2('Microphone access denied', true); });
  };

  const stopVoice = () => {
    if (recognitionRef.current) { recognitionRef.current.stop(); recognitionRef.current = null; }
    if (mediaRecRef.current && mediaRecRef.current.state !== 'inactive') mediaRecRef.current.stop();
    setRecording(false); setVoiceHint('');
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

  useEffect(()=>{if(fileRef.current)fileRef.current._analyze=analyze;},[analyzing,uploads]);

  const analyzeText = async (text, hintType, hintTitle) => {
    setAnalyzing(true);
    try {
      const textPrompt = `Analyze this pasted health information (type hint: ${hintType}).\nThe user pasted this text:\n\n${text}\n\nReturn the JSON object as instructed.`;
      const r = await callAI({ model:'claude-sonnet-4-6', max_tokens:1000, system: ANALYZE_PROMPT, _skipRouting: true, messages:[{role:'user', content: textPrompt}] });
      const d = await r.json();
      if(d.error) throw new Error(d.error.message || 'Analysis error');
      const txt = d.content?.[0]?.text || d.mergedText || '';
      let p = null;
      const cm = txt.match(/```(?:json)?\s*([\s\S]*?)```/);
      if(cm){try{p=JSON.parse(cm[1].trim());}catch{}}
      if(!p){const om=txt.match(/\{[\s\S]*\}/);if(om){try{p=JSON.parse(om[0]);}catch{}}}
      if(!p){try{p=JSON.parse(txt.trim());}catch{}}
      if(!p) throw new Error('Could not parse response — try again');
      const sty = TYPE_STYLE[p.type] || TYPE_STYLE[hintType] || TYPE_STYLE.note;
      setUploads(prev=>[{id:Date.now(),isNew:true,type:p.type||hintType||'note',name:hintTitle||p.title||`Pasted ${hintType}`,date:p.date||new Date().toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}),provider:p.provider||'Pasted text',flagged:!!p.flagged,flagReason:p.flagReason||null,values:p.values||[text.slice(0,80)+'…'],color:sty.color,iconColor:sty.iconColor},...prev]);
      setPage('records'); setFilter('All');
      toast2(`✓ ${hintTitle||p.title||'Pasted text'} added to records`);
      setShowPaste(false);
    } catch(e) { toast2(e.message||'Analysis failed — please try again',true); }
    finally { setAnalyzing(false); }
  };

  const handlePasteClose = ({ sendToChat } = {}) => {
    setShowPaste(false);
    if (sendToChat) { setPage('ai'); setInput(sendToChat.slice(0, 800)); }
  };

  const send=async(text)=>{
    const m=(text||input).trim();if(!m||busy)return;
    const h=[...(msgs||[]),{role:'user',content:m}];
    setMsgs(h);setInput('');setBusy(true);
    try{
      const libraryText = library.length > 0 ? library.map(d=>`[Library: ${d.name}]\n${d.text||'(PDF — see base64 attachment)'}`).join('\n\n') : null;
      const r=await callAI({model:'claude-sonnet-4-6',max_tokens:2048,system:makeChatPrompt(name,uploads),messages:h,_sources:sources,_libraryText:libraryText});
      const d=await r.json();
      if(d._meta?.model?.includes('opus')) setLastModel('opus');
      else setLastModel('sonnet');
      const reply = d.mergedText || d.content?.[0]?.text || 'Error — try again.';
      setMsgs(p=>[...p,{role:'assistant',content:reply,_model:d._meta?.model,_sources:d._meta?.sources}]);
    }catch{setMsgs(p=>[...p,{role:'assistant',content:'⚠ Connection error. Please try again.'}]);}
    finally{setBusy(false);}
  };

  if(!name) return <Setup onDone={n=>setName(n)}/>;

  const allRecs=[...uploads];
  const filtered=allRecs.filter(r=>filter==='All'?true:filter==='Labs'?r.type==='lab':filter==='Imaging'?r.type==='imaging':filter==='Notes'?r.type==='note':filter==='Meds'?r.type==='medication':true);
  const flagCount=allRecs.filter(r=>r.flagged).length;
  const initials=name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
  const NAV=[{id:'home',lbl:'Home',I:Home},{id:'records',lbl:'Records',I:FolderOpen},{id:'ai',lbl:'AI Consultant',I:MessageSquare},{id:'peptide',lbl:'Peptide Consultant',I:Dna},{id:'profile',lbl:'Profile',I:User}];

  const sharedProps = {uploads,setUploads,analyzing,setAnalyzing,filter,setFilter,allRecs,filtered,setPage,setInput,fileRef,toast2,drag,setDrag,msgs,busy,input,send,endRef,name,initials,setName,flagCount,recording,toggleVoice,voiceHint,lastModel,setShowPaste,sources,setSources,library,setLibrary,showSrcMenu,setShowSrcMenu,libraryFileRef,addToLibrary};

  return (
    <>
      <style>{CSS}</style>
      <input ref={fileRef} type="file" accept=".pdf,image/*" style={{display:'none'}} onChange={e=>{const f=e.target.files?.[0];if(f)analyze(f);}}/>
      <input ref={libraryFileRef} type="file" accept=".pdf,.txt,.md" style={{display:'none'}} onChange={e=>{const f=e.target.files?.[0];if(f)addToLibrary(f);}}/>
      {toast&&<div className={`toast ${toast.err?'err':''}`}>{toast.msg}</div>}

      {showPaste && <PasteModal onClose={handlePasteClose} onAnalyze={analyzeText} analyzing={analyzing}/>}

      <button className="paste-fab" onClick={()=>setShowPaste(true)} title="Paste or type health information" aria-label="Open paste text panel">
        <ClipboardPaste size={18}/>
      </button>

      {/* ══ MOBILE ══ */}
      <div className="mob-wrap">
        <div className="phone">
          <div className="mob-hd">
            {page==='home'
              ?<div className="logo"><Heart size={15} fill="#52B788" color="#52B788"/>Vitae<span style={{fontSize:11,fontWeight:400,color:'var(--mu)',borderLeft:'1px solid var(--bd)',paddingLeft:8,marginLeft:2}}><a href="https://www.bioprecisionaging.com" target="_blank" rel="noopener noreferrer" style={{color:'var(--mu)',textDecoration:'none'}}>Bio Precision Aging</a></span></div>
              :<div><div className="ptitle">{{records:'My Records',ai:'AI Consultant',peptide:'Peptide Consultant',profile:'Profile'}[page]}</div>
              <div className="psub">{{records:'Labs, imaging & notes',ai:uploads.length>0?`Seeing ${uploads.length} record${uploads.length!==1?'s':''}` :'Upload records for full context',peptide:'Bio Precision Peptide AI',profile:name}[page]}</div></div>}
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
            {page==='peptide'&&<div className="mob-chat"><PeptideOverview /></div>}
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
        <aside className="desk-side">
          <div className="desk-brand">
            <Heart size={18} fill="#52B788" color="#52B788"/>
            <div>
              <span className="desk-brand-name">Vitae</span>
              <div style={{fontSize:10,color:'rgba(255,255,255,.5)',marginTop:2,letterSpacing:'.2px'}}>Powered by <a href="https://www.bioprecisionaging.com" target="_blank" rel="noopener noreferrer" style={{color:'rgba(255,255,255,.7)',textDecoration:'none',fontWeight:500}}>Bio Precision Aging</a></div>
            </div>
          </div>
          <nav className="desk-nav">
            {NAV.map(({id,lbl,I})=>(
              <button key={id} className={`desk-nav-item ${page===id?'on':''}`} onClick={()=>setPage(id)}>
                <I size={18} strokeWidth={page===id?2.2:1.8}/>{lbl}<div className="desk-dot"/>
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

        <main className="desk-main">
          <div className="desk-topbar">
            <div>
              <div className="desk-page-title">
                {page==='home'?`Good morning, ${name.split(' ')[0]}`:{records:'My Records',ai:'AI Consultant',peptide:'Peptide Consultant',profile:'Profile'}[page]}
              </div>
              <div className="desk-page-sub">
                {{home:'Your health records at a glance',records:'Labs, imaging & notes',peptide:'Personalized peptide recommendations',ai:uploads.length>0?`Seeing ${uploads.length} uploaded record${uploads.length!==1?'s':''}` :'Upload records so AI can reference them',profile:'Your session'}[page]}
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
          {page==='peptide'&&<div className="desk-chat"><PeptideOverview /></div>}
          {page==='profile'&&<div className="desk-content"><ProfileContent {...sharedProps}/></div>}
        </main>
      </div>
    </>
  );
}
