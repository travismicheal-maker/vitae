// @ts-nocheck
// App.jsx — No API key needed from users.
// All AI calls go through /api/chat (your Vercel server) which holds the key secretly.

import { useState, useRef, useEffect } from "react";
import { Home, FolderOpen, MessageSquare, User, FlaskConical, ScanLine, ClipboardList, Pill, Send, AlertTriangle, CheckCircle2, XCircle, Heart, Upload, Bell, Lock, ExternalLink, ChevronRight, FileText, X, Loader } from "lucide-react";

const makeChatPrompt = (name, records) => {
  // Build a summary of all uploaded records to inject as context
  const recordContext = records && records.length > 0
    ? `\n\nPATIENT RECORDS ON FILE (${records.length} total):\n` +
      records.map((r, i) =>
        `[Record ${i+1}] ${r.name} — Type: ${r.type} — Date: ${r.date || 'unknown'} — Provider: ${r.provider || 'unknown'}${r.flagged ? ' — ⚠ FLAGGED' : ''}${r.flagReason ? ` (${r.flagReason})` : ''}\nValues: ${(r.values || []).join(' | ')}`
      ).join('\n')
    : '\n\nNo records uploaded yet.';

  return `You are Vitae AI, a personal health assistant${name ? ` for ${name}` : ''}.
Label ALL information: [Verified] for recognized guidelines (ACC/AHA, USPSTF, CDC, NIH, ADA) | [Speculation] for interpretations | [Unknown] when unclear.
Rules: Never diagnose or prescribe. Cite specific guidelines by name + year. Explain lab values with reference ranges. Recommend professional consultation for all medical decisions.
You have full access to the patient's uploaded records listed below. When answering questions, refer to these records directly by name and explain the specific values. Do not ask the patient to paste or re-enter their results — you already have them.
${recordContext}
End every response with: "⚕ Educational only — consult your healthcare provider."`;
};

const ANALYZE_PROMPT = `You are a medical document analyzer. Analyze this medical document carefully.
You MUST return a JSON object. Wrap it in triple backticks like this:
\`\`\`json
{"title":"...","type":"...","date":"...","provider":"...","flagged":true,"flagReason":"...","values":["..."]}
\`\`\`

Fields:
- title: short document name (e.g. "Lipid Panel", "Cardiometabolic Report")
- type: exactly one of: lab, imaging, note, medication
- date: date collected/reported or null
- provider: lab name or doctor name or null
- flagged: true if ANY value is marked H, L, HIGH, LOW, CRITICAL, or outside reference range
- flagReason: brief reason if flagged (e.g. "Lipoprotein(a) 180 nmol/L — High"), else null
- values: array of up to 8 most important findings as short strings under 50 chars each

For multi-page reports, summarize the most clinically significant findings.`;

// ── This is the key change: calls YOUR server, not Anthropic directly ─────────
const callAI = (body) =>
  fetch('/api/chat', {                    // ← your Vercel server route
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

const TYPE_STYLE = {
  lab:        { color:'#FFF7ED', iconColor:'#C05621' },
  imaging:    { color:'#EFF6FF', iconColor:'#1D4ED8' },
  note:       { color:'#F5F3FF', iconColor:'#5B21B6' },
  medication: { color:'#FEF3C7', iconColor:'#92400E' },
};
const RECICONS = {
  lab:<FlaskConical size={15}/>, imaging:<ScanLine size={15}/>,
  note:<ClipboardList size={15}/>, medication:<Pill size={15}/>,
};
const QUICK_QS = ['Explain my lab results','What values are flagged?','What lifestyle changes help?','Summarize my records','When should I see a doctor?'];

function renderMd(t) {
  if (!t) return '';
  return t
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>')
    .replace(/\[Verified\]/g,'<span style="background:#D1FAE5;color:#065F46;padding:1px 6px;border-radius:3px;font-size:10px;font-weight:700">[Verified]</span>')
    .replace(/\[Speculation\]/g,'<span style="background:#FEF3CD;color:#92400E;padding:1px 6px;border-radius:3px;font-size:10px;font-weight:700">[Speculation]</span>')
    .replace(/\[Unknown\]/g,'<span style="background:#F3F4F6;color:#4B5563;padding:1px 6px;border-radius:3px;font-size:10px;font-weight:700">[Unknown]</span>')
    .replace(/⚕(.*?)$/gm,'<div style="margin-top:8px;padding:7px 10px;background:#EFF6FF;border-radius:6px;font-size:11px;color:#1D4ED8;border:1px solid #BFDBFE">⚕$1</div>')
    .replace(/\n\n/g,'<br/><br/>').replace(/\n/g,'<br/>');
}
function toBase64(file) {
  return new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result.split(',')[1]);r.onerror=()=>rej(new Error('Read failed'));r.readAsDataURL(file);});
}

const CSS=`
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
:root{--bg:#F7F5F1;--surf:#fff;--g9:#1B4332;--g7:#2D6A4F;--g5:#52B788;--g1:#D1FAE5;--g0:#F0FDF4;--tx:#111827;--mu:#6B7280;--bd:#E5E1D8;--wbg:#FFF7ED;--wbd:#FED7AA;--wtx:#9A3412;--rd:12px;--rds:8px;--sh:0 1px 8px rgba(0,0,0,.07)}
.wrap{background:#E8E4DC;min-height:100vh;display:flex;align-items:flex-start;justify-content:center;padding:16px 0;font-family:'DM Sans',sans-serif}
.phone{width:390px;min-height:calc(100vh - 32px);background:var(--surf);border-radius:32px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.18),0 0 0 1px rgba(0,0,0,.06);display:flex;flex-direction:column;position:relative}
.setup{flex:1;display:flex;flex-direction:column;padding:36px 24px 40px;overflow-y:auto}
.s-logo{display:flex;align-items:center;gap:8px;font-family:'Playfair Display',serif;font-size:26px;font-weight:600;color:var(--g9);margin-bottom:6px}
.s-sub{font-size:13px;color:var(--mu);margin-bottom:28px;line-height:1.6}
.field{margin-bottom:16px}
.field label{display:block;font-size:11px;font-weight:700;color:var(--tx);margin-bottom:5px;text-transform:uppercase;letter-spacing:.6px}
.field input{width:100%;padding:11px 13px;border:1.5px solid var(--bd);border-radius:var(--rds);font-size:14px;font-family:'DM Sans',sans-serif;color:var(--tx);background:var(--bg);outline:none;transition:border-color .15s}
.field input:focus{border-color:var(--g5);background:var(--surf)}
.s-btn{width:100%;padding:13px;background:var(--g9);color:#fff;border:none;border-radius:var(--rds);font-size:15px;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif;display:flex;align-items:center;justify-content:center;gap:8px;margin-top:10px;transition:all .15s}
.s-btn:hover{background:var(--g7)}.s-btn:disabled{opacity:.45;cursor:not-allowed}
.hd{padding:16px 18px 14px;background:var(--surf);border-bottom:1px solid var(--bd);flex-shrink:0;display:flex;align-items:center;justify-content:space-between}
.logo{font-family:'Playfair Display',serif;font-size:21px;font-weight:600;color:var(--g9);display:flex;align-items:center;gap:7px}
.ptitle{font-family:'Playfair Display',serif;font-size:20px;font-weight:600;color:var(--tx)}
.psub{font-size:11px;color:var(--mu);margin-top:1px}
.content{flex:1;overflow-y:auto;padding-bottom:74px}
.pad{padding:16px 16px 0}
.btn{display:inline-flex;align-items:center;gap:5px;padding:9px 16px;border-radius:var(--rds);font-size:13px;font-weight:500;cursor:pointer;border:none;font-family:'DM Sans',sans-serif;transition:all .15s}
.btnP{background:var(--g9);color:#fff}.btnP:hover{background:var(--g7)}
.btnS{background:var(--g5);color:#fff}
.btnO{background:transparent;color:var(--g9);border:1.5px solid var(--g9)}.btnO:hover{background:var(--g9);color:#fff}
.btnsm{padding:6px 12px;font-size:12px}.btnfull{width:100%;justify-content:center}
.hero{background:linear-gradient(140deg,#1B4332,#2D6A4F 55%,#40916C);border-radius:var(--rd);padding:20px;color:#fff;position:relative;overflow:hidden;margin-bottom:12px}
.hero::after{content:'';position:absolute;width:160px;height:160px;background:rgba(82,183,136,.18);border-radius:50%;top:-50px;right:-50px;pointer-events:none}
.hlbl{font-size:10px;opacity:.65;text-transform:uppercase;letter-spacing:1px}
.hname{font-family:'Playfair Display',serif;font-size:22px;font-weight:600;margin-top:2px}
.hmsg{font-size:12.5px;opacity:.78;margin-top:7px;line-height:1.5;position:relative;z-index:1}
.hbtns{display:flex;gap:8px;margin-top:16px;position:relative;z-index:1}
.hb{padding:8px 14px;border-radius:var(--rds);font-size:12.5px;font-weight:500;cursor:pointer;border:none;font-family:'DM Sans',sans-serif;transition:all .15s}
.hbacc{background:var(--g5);color:#fff}.hbgh{background:rgba(255,255,255,.15);color:#fff}
.stats{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px}
.sc{background:var(--surf);border:1px solid var(--bd);border-radius:var(--rd);padding:14px;box-shadow:var(--sh)}
.slbl{font-size:10px;text-transform:uppercase;letter-spacing:.6px;color:var(--mu);font-weight:500}
.snum{font-family:'Playfair Display',serif;font-size:30px;font-weight:600;line-height:1;margin-top:5px}
.sdsc{font-size:11px;color:var(--mu);margin-top:2px}
.sh{font-family:'Playfair Display',serif;font-size:16px;font-weight:600;margin-bottom:10px}
.wcard{background:var(--wbg);border:1px solid var(--wbd);border-radius:var(--rd);padding:12px 14px;margin-bottom:12px;display:flex;align-items:flex-start;gap:8px;font-size:12.5px;color:var(--wtx);line-height:1.5}
.frow{display:flex;gap:7px;overflow-x:auto;padding-bottom:3px;margin-bottom:12px;scrollbar-width:none}
.frow::-webkit-scrollbar{display:none}
.fc{padding:6px 13px;border-radius:20px;font-size:12px;font-weight:500;cursor:pointer;border:1.5px solid var(--bd);background:var(--surf);color:var(--mu);white-space:nowrap;font-family:'DM Sans',sans-serif;flex-shrink:0;transition:all .15s}
.fc.on{background:var(--g9);border-color:var(--g9);color:#fff}
.rc{background:var(--surf);border:1px solid var(--bd);border-radius:var(--rd);padding:13px;margin-bottom:9px;position:relative}
.rc.fl{border-left:3px solid #F59E0B}.rc.nr{border:1.5px solid var(--g5);background:var(--g0)}
.rtop{display:flex;align-items:flex-start;justify-content:space-between;gap:9px}
.rico{width:32px;height:32px;border-radius:7px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.rname{font-weight:600;font-size:13.5px;line-height:1.3}
.rmeta{font-size:11px;color:var(--mu);margin-top:2px}
.rvals{display:flex;flex-wrap:wrap;gap:4px;margin-top:9px}
.vc{padding:3px 8px;background:#F0ECE6;border-radius:20px;font-size:11px}
.vc.w{background:var(--wbg);color:var(--wtx)}
.bw{display:inline-flex;align-items:center;gap:2px;padding:2px 6px;border-radius:8px;background:#FEF3CD;color:#92400E;font-size:10px;font-weight:600}
.bg2{display:inline-flex;align-items:center;gap:2px;padding:2px 6px;border-radius:8px;background:var(--g1);color:#065F46;font-size:10px;font-weight:600}
.bnew{display:inline-flex;align-items:center;gap:2px;padding:2px 6px;border-radius:8px;background:#DCFCE7;color:#15803D;font-size:10px;font-weight:600;margin-top:3px}
.del{position:absolute;top:10px;right:10px;width:22px;height:22px;border-radius:50%;background:#FEE2E2;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#DC2626}
.upz{border:2px dashed var(--bd);border-radius:var(--rd);padding:28px;text-align:center;cursor:pointer;margin-bottom:14px;transition:all .15s}
.upz:hover,.upz.drag{border-color:var(--g5);background:var(--g0)}.upz.busy{cursor:not-allowed;border-color:var(--g5);background:var(--g0)}
.spin{display:inline-block;animation:sp 1s linear infinite}@keyframes sp{to{transform:rotate(360deg)}}
.toast{position:absolute;top:12px;left:50%;transform:translateX(-50%);background:#1B4332;color:#fff;padding:8px 16px;border-radius:20px;font-size:12px;font-weight:500;white-space:nowrap;z-index:20;box-shadow:0 4px 12px rgba(0,0,0,.2)}
.toast.err{background:#DC2626}
.cwrap{display:flex;flex-direction:column;height:calc(100vh - 158px);min-height:480px}
.cmsgs{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:12px}
.msg{max-width:84%}.msg.u{align-self:flex-end}.msg.a{align-self:flex-start}
.mrole{font-size:10px;color:var(--mu);margin-bottom:3px;font-weight:500;letter-spacing:.3px}
.mb{padding:10px 13px;border-radius:13px;font-size:13px;line-height:1.6}
.msg.u .mb{background:var(--g9);color:#fff;border-bottom-right-radius:3px}
.msg.a .mb{background:var(--surf);border:1px solid var(--bd);border-bottom-left-radius:3px;box-shadow:var(--sh)}
.dots{display:inline-flex;gap:3px;padding:10px 13px;background:var(--surf);border:1px solid var(--bd);border-radius:13px;border-bottom-left-radius:3px;align-self:flex-start}
.dot{width:5px;height:5px;background:var(--mu);border-radius:50%;animation:bl 1.2s infinite}
.dot:nth-child(2){animation-delay:.2s}.dot:nth-child(3){animation-delay:.4s}
@keyframes bl{0%,80%,100%{transform:scale(.6);opacity:.4}40%{transform:scale(1);opacity:1}}
.cbot{padding:9px 14px 12px;background:var(--surf);border-top:1px solid var(--bd);flex-shrink:0}
.qrow{display:flex;gap:5px;overflow-x:auto;padding-bottom:5px;scrollbar-width:none;margin-bottom:8px}
.qrow::-webkit-scrollbar{display:none}
.qc{padding:5px 11px;background:var(--bg);border:1px solid var(--bd);border-radius:20px;font-size:11.5px;color:var(--g9);cursor:pointer;font-family:'DM Sans',sans-serif;white-space:nowrap;flex-shrink:0}
.irow{display:flex;gap:7px;align-items:flex-end}
.ci{flex:1;padding:10px 13px;border:1.5px solid var(--bd);border-radius:var(--rds);font-size:13px;font-family:'DM Sans',sans-serif;color:var(--tx);background:var(--bg);resize:none;outline:none;transition:border-color .15s;line-height:1.5;min-height:42px;max-height:90px}
.ci:focus{border-color:var(--g5);background:var(--surf)}
.sb{width:42px;height:42px;border-radius:var(--rds);background:var(--g9);color:#fff;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.sb:disabled{opacity:.4;cursor:not-allowed}
.disc{font-size:10.5px;color:#1D4ED8;background:#EFF6FF;border:1px solid #BFDBFE;border-radius:5px;padding:6px 9px;margin-top:7px;line-height:1.5}
.prow{display:flex;align-items:center;gap:13px;padding:13px 0;border-bottom:1px solid var(--bd);cursor:pointer}
.prow:last-child{border-bottom:none}
.pico{width:38px;height:38px;border-radius:9px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.plbl{font-size:13.5px;font-weight:500}.plbl2{font-size:11.5px;color:var(--mu);margin-top:1px}
.hrow{display:flex;align-items:center;justify-content:space-between;padding:11px 0;border-bottom:1px solid var(--bd);font-size:13px}
.hrow:last-child{border-bottom:none}
.hst{display:flex;align-items:center;gap:4px;font-size:12px;font-weight:500}
.bnav{position:absolute;bottom:0;left:0;right:0;height:68px;background:var(--surf);border-top:1px solid var(--bd);display:flex;border-radius:0 0 32px 32px;overflow:hidden}
.bni{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;cursor:pointer;border:none;background:none;padding:0;font-family:'DM Sans',sans-serif}
.bnlbl{font-size:10px;font-weight:500;color:var(--mu)}.bni.on .bnlbl{color:var(--g9)}
.bnd{width:4px;height:4px;background:var(--g5);border-radius:50%;margin-top:1px}
@keyframes fU{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:translateY(0)}}
.fu{animation:fU .18s ease}
`;

// ── Simple name setup (no API key needed from user) ───────────────────────────
function Setup({ onDone }) {
  const [name, setName] = useState('');
  return (
    <div className="setup">
      <div className="s-logo"><Heart size={22} fill="#52B788" color="#52B788"/>Vitae</div>
      <div className="s-sub">Your personal health AI. Enter your name to get started — no account or API key needed.</div>

      <div style={{background:'#F0FDF4',border:'1px solid #D1FAE5',borderRadius:'var(--rd)',padding:'14px',marginBottom:24}}>
        <div style={{fontWeight:600,fontSize:13,color:'#1B4332',marginBottom:6}}>✓ What you can do</div>
        <div style={{fontSize:12.5,color:'#2D6A4F',lineHeight:1.7}}>
          • Upload lab results, imaging, or any medical document<br/>
          • Get AI analysis of your records<br/>
          • Ask health questions with cited guidelines<br/>
          • All free — no signup required
        </div>
      </div>

      <div className="field">
        <label>Your Name</label>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Alex Johnson" onKeyDown={e=>e.key==='Enter'&&name.trim()&&onDone(name.trim())}/>
      </div>

      <button className="s-btn" onClick={()=>name.trim()&&onDone(name.trim())} disabled={!name.trim()}>
        Get Started →
      </button>

      <p style={{fontSize:11,color:'var(--mu)',marginTop:14,textAlign:'center',lineHeight:1.6}}>
        Your data stays in your browser session only.<br/>Nothing is stored on any server.
      </p>
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
  const endRef  = useRef(null);
  const fileRef = useRef(null);

  useEffect(()=>{
    if(name&&!msgs) setMsgs([{role:'assistant',content:`Hello **${name}**! I'm Vitae AI.\n\nUpload a medical record or ask me any health question. I'll give you evidence-based guidance with [Verified] citations from recognized clinical guidelines.\n\nOnce you upload records in the Records tab, I can see all your values and explain them — no copy-pasting needed.\n\nWhat would you like to know?`}]);
  },[name]);
  useEffect(()=>{endRef.current?.scrollIntoView({behavior:'smooth'});},[msgs,busy]);

  const toast2=(msg,err=false)=>{setToast({msg,err});setTimeout(()=>setToast(null),3500);};

  if(!name) return (
    <div className="wrap"><style>{CSS}</style>
      <div className="phone"><Setup onDone={n=>setName(n)}/></div>
    </div>
  );

  const send=async(text)=>{
    const m=(text||input).trim();if(!m||busy)return;
    const h=[...(msgs||[]),{role:'user',content:m}];
    setMsgs(h);setInput('');setBusy(true);
    try{
      const r=await callAI({model:'claude-sonnet-4-6',max_tokens:1000,system:makeChatPrompt(name,uploads),messages:h});
      const d=await r.json();
      setMsgs(p=>[...p,{role:'assistant',content:d.content?.[0]?.text||'Error — try again.'}]);
    }catch{setMsgs(p=>[...p,{role:'assistant',content:'⚠ Connection error. Please try again.'}]);}
    finally{setBusy(false);}
  };

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
      // Try multiple extraction strategies
      let p=null;
      // Strategy 1: extract JSON from code block
      const codeMatch=txt.match(/```(?:json)?\s*([\s\S]*?)```/);
      if(codeMatch){try{p=JSON.parse(codeMatch[1].trim());}catch{}}
      // Strategy 2: find the { } object anywhere in the text
      if(!p){const objMatch=txt.match(/\{[\s\S]*\}/);if(objMatch){try{p=JSON.parse(objMatch[0]);}catch{}}}
      // Strategy 3: try the whole text
      if(!p){try{p=JSON.parse(txt.trim());}catch{}}
      if(!p){throw new Error('Analysis failed — please try again or upload a clearer file');}
      const sty=TYPE_STYLE[p.type]||TYPE_STYLE.note;
      setUploads(prev=>[{id:Date.now(),isNew:true,type:p.type||'note',name:p.title||file.name,date:p.date||new Date().toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}),provider:p.provider||'Uploaded',flagged:!!p.flagged,flagReason:p.flagReason||null,values:p.values||['Document uploaded'],color:sty.color,iconColor:sty.iconColor},...prev]);
      setPage('records');setFilter('All');toast2(`✓ ${p.title||file.name} added`);
    }catch(e){toast2(e.message||'Analysis failed — please try again',true);}
    finally{setAnalyzing(false);if(fileRef.current)fileRef.current.value='';}
  };

  const allRecs=[...uploads];
  const filtered=allRecs.filter(r=>filter==='All'?true:filter==='Labs'?r.type==='lab':filter==='Imaging'?r.type==='imaging':filter==='Notes'?r.type==='note':filter==='Meds'?r.type==='medication':true);
  const flagCount=allRecs.filter(r=>r.flagged).length;
  const initials=name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
  const NAV=[{id:'home',lbl:'Home',I:Home},{id:'records',lbl:'Records',I:FolderOpen},{id:'ai',lbl:'AI',I:MessageSquare},{id:'profile',lbl:'Profile',I:User}];

  return (
    <div className="wrap"><style>{CSS}</style>
    <input ref={fileRef} type="file" accept=".pdf,image/*" style={{display:'none'}} onChange={e=>{const f=e.target.files?.[0];if(f)analyze(f);}}/>
    <div className="phone">
      {toast&&<div className={`toast ${toast.err?'err':''}`}>{toast.msg}</div>}

      <div className="hd">
        {page==='home'?<div className="logo"><Heart size={16} fill="#52B788" color="#52B788"/>Vitae</div>
          :<div><div className="ptitle">{{records:'My Records',ai:'AI Assistant',profile:'Profile'}[page]}</div>
          <div className="psub">{{records:'Labs, imaging & notes',ai:uploads.length>0?`Seeing ${uploads.length} uploaded record${uploads.length!==1?'s':''}` :'Upload records for full context',profile:name}[page]}</div></div>}
        <div style={{display:'flex',gap:7,alignItems:'center'}}>
          {page==='records'&&<button className="btn btnP btnsm" onClick={()=>!analyzing&&fileRef.current?.click()} disabled={analyzing}>
            {analyzing?<span className="spin"><Loader size={12}/></span>:<Upload size={12}/>}{analyzing?'Analyzing…':'Upload'}
          </button>}
          <div style={{width:34,height:34,borderRadius:8,background:'#F0FDF4',border:'1px solid #D1FAE5',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer'}}><Bell size={14} color="#2D6A4F"/></div>
        </div>
      </div>

      <div className="content">

        {page==='home'&&<div className="pad">
          <div className="hero">
            <div className="hlbl">Good morning</div>
            <div className="hname">{name}</div>
            <div className="hmsg">You have {allRecs.length} records on file{flagCount>0?` and ${flagCount} flagged for review`:' — all clear'}.</div>
            <div className="hbtns">
              <button className="hb hbacc" onClick={()=>setPage('ai')}>Ask AI</button>
              <button className="hb hbgh" onClick={()=>setPage('records')}>My Records</button>
            </div>
          </div>
          {flagCount>0&&<div className="wcard"><AlertTriangle size={14} style={{flexShrink:0,marginTop:1}}/><div><strong>Action needed:</strong> {flagCount} result{flagCount!==1?'s':''} flagged for review.</div><button className="btn btnS btnsm" style={{flexShrink:0,marginLeft:'auto'}} onClick={()=>setPage('records')}>View →</button></div>}
          <div className="stats">
            {[{lbl:'Records',num:String(allRecs.length),dsc:'On file',w:false},{lbl:'Uploaded',num:String(uploads.length),dsc:'By you',w:false},{lbl:'Flagged',num:String(flagCount),dsc:flagCount>0?'Review needed':'All clear',w:flagCount>0},{lbl:'Medications',num:String(uploads.filter(r=>r.type==='medication').length),dsc:'On file',w:false}].map(s=>(
              <div key={s.lbl} className="sc"><div className="slbl">{s.lbl}</div><div className="snum" style={s.w?{color:'#D97706'}:{}}>{s.num}</div><div className="sdsc" style={s.w?{color:'#B45309'}:{}}>{s.dsc}</div></div>
            ))}
          </div>
          <div style={{background:'#F0FDF4',border:'1px solid #D1FAE5',borderRadius:'var(--rd)',padding:'13px 14px',marginBottom:24}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:600,color:'#1B4332',marginBottom:7}}>Upload a Medical Record</div>
            <div style={{fontSize:12,color:'#2D6A4F',lineHeight:1.55,marginBottom:11}}>Add any lab result, imaging report, or medical document. Claude AI reads and categorizes it automatically.</div>
            <button className="btn btnP" style={{fontSize:12,padding:'7px 14px'}} onClick={()=>setPage('records')}><Upload size={12}/>Go to Records</button>
          </div>
        </div>}

        {page==='records'&&<div className="pad">
          <div className={`upz ${drag?'drag':''} ${analyzing?'busy':''}`}
            onClick={()=>!analyzing&&fileRef.current?.click()}
            onDragOver={e=>{e.preventDefault();setDrag(true);}}
            onDragLeave={()=>setDrag(false)}
            onDrop={e=>{e.preventDefault();setDrag(false);const f=e.dataTransfer.files?.[0];if(f)analyze(f);}}>
            {analyzing
              ?<><span className="spin" style={{display:'block',margin:'0 auto 8px',width:26,height:26,color:'var(--g5)'}}><Loader size={26}/></span><div style={{fontSize:13,fontWeight:600,color:'var(--g9)'}}>Analyzing with Claude AI…</div><div style={{fontSize:11.5,color:'var(--mu)',marginTop:4}}>Extracting key values from your document</div></>
              :<><Upload size={26} color="var(--mu)" style={{margin:'0 auto 7px',display:'block'}}/><div style={{fontSize:13,fontWeight:500}}>Tap to upload or drag & drop</div><div style={{fontSize:11.5,color:'var(--mu)',marginTop:3}}>PDF · JPG · PNG — Labs · Imaging · Notes</div><div style={{fontSize:11,color:'var(--g7)',marginTop:6,fontWeight:500}}>Claude AI analyzes and categorizes automatically</div></>}
          </div>
          <div className="frow">
            {['All','Labs','Imaging','Notes','Meds'].map(f=>(
              <button key={f} className={`fc ${filter===f?'on':''}`} onClick={()=>setFilter(f)}>{f}{f==='All'?` (${allRecs.length})`:''}</button>
            ))}
          </div>
          {filtered.map(r=>(
            <div key={r.id} className={`rc fu ${r.flagged?'fl':''} ${r.isNew?'nr':''}`}>
              {r.isNew&&<button className="del" onClick={()=>setUploads(p=>p.filter(x=>x.id!==r.id))}><X size={11}/></button>}
              <div className="rtop">
                <div style={{display:'flex',gap:9,alignItems:'flex-start',flex:1,minWidth:0}}>
                  <div className="rico" style={{background:r.color,color:r.iconColor}}>{RECICONS[r.type]||<FileText size={15}/>}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div className="rname" style={{paddingRight:r.isNew?20:0}}>{r.name}</div>
                    <div className="rmeta">{r.date} · {(r.provider||'').slice(0,26)}{(r.provider||'').length>26?'…':''}</div>
                    {r.isNew&&<span className="bnew">✓ Uploaded by you</span>}
                  </div>
                </div>
                {r.flagged?<span className="bw"><AlertTriangle size={8}/>Review</span>:<span className="bg2"><CheckCircle2 size={8}/>OK</span>}
              </div>
              {r.flagReason&&<div style={{marginTop:7,fontSize:11.5,color:'var(--wtx)',background:'var(--wbg)',padding:'5px 9px',borderRadius:6}}>⚠ {r.flagReason}</div>}
              <div className="rvals">{(r.values||[]).map(v=><span key={v} className={`vc ${v.toLowerCase().includes('high')||v.toLowerCase().includes('low')||v.includes('⚠')?'w':''}`}>{v}</span>)}</div>
              <button className="btn btnO btnsm btnfull" style={{marginTop:9}} onClick={()=>{setPage('ai');setInput(`Can you explain my ${r.name}? Values: ${(r.values||[]).join(', ')}`);}}>
                <MessageSquare size={11}/>Ask AI about this
              </button>
            </div>
          ))}
          <div style={{height:8}}/>
        </div>}

        {page==='ai'&&<div className="cwrap">
          <div className="cmsgs">
            {(msgs||[]).map((m,i)=>(
              <div key={i} className={`msg ${m.role==='user'?'u':'a'} fu`}>
                <div className="mrole">{m.role==='user'?'You':'Vitae AI'}</div>
                {m.role==='user'?<div className="mb">{m.content}</div>:<div className="mb" dangerouslySetInnerHTML={{__html:renderMd(m.content)}}/>}
              </div>
            ))}
            {busy&&<div className="msg a fu"><div className="mrole">Vitae AI</div><div className="dots"><div className="dot"/><div className="dot"/><div className="dot"/></div></div>}
            <div ref={endRef}/>
          </div>
          <div className="cbot">
            <div className="qrow">{QUICK_QS.map(q=><button key={q} className="qc" onClick={()=>send(q)}>{q}</button>)}</div>
            <div className="irow">
              <textarea className="ci" value={input} onChange={e=>setInput(e.target.value)}
                onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send();}}}
                placeholder="Ask any health question…" rows={1}/>
              <button className="sb" onClick={()=>send()} disabled={busy||!input.trim()}><Send size={15}/></button>
            </div>
            <div className="disc">⚕ Educational only — not a substitute for professional medical advice.</div>
          </div>
        </div>}

        {page==='profile'&&<div className="pad">
          <div style={{display:'flex',alignItems:'center',gap:13,padding:'16px',background:'linear-gradient(135deg,#1B4332,#2D6A4F)',borderRadius:'var(--rd)',marginBottom:14,color:'#fff'}}>
            <div style={{width:48,height:48,borderRadius:'50%',background:'#52B788',display:'flex',alignItems:'center',justifyContent:'center',fontSize:17,fontWeight:700,flexShrink:0}}>{initials}</div>
            <div style={{flex:1}}>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:600}}>{name}</div>
              <div style={{marginTop:6,display:'inline-flex',alignItems:'center',gap:3,padding:'2px 8px',background:'rgba(82,183,136,.2)',borderRadius:20,fontSize:9.5,color:'#95D5B2',letterSpacing:.4}}><Lock size={8}/>No account needed</div>
            </div>
            <button onClick={()=>setName(null)} style={{background:'rgba(255,255,255,.15)',border:'none',color:'#fff',padding:'6px 11px',borderRadius:7,fontSize:11.5,cursor:'pointer',fontFamily:'DM Sans,sans-serif'}}>Edit</button>
          </div>
          <div style={{background:'var(--surf)',border:'1px solid var(--bd)',borderRadius:'var(--rd)',padding:'13px 14px',boxShadow:'var(--sh)',marginBottom:13}}>
            <div className="sh">Quick Actions</div>
            {[
              {ico:<Upload size={14}/>,bg:'#F0FDF4',tx:'#065F46',lbl:'Upload a medical record',sub:'PDF or image',fn:()=>setPage('records')},
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
          <div style={{background:'#EFF6FF',border:'1px solid #BFDBFE',borderRadius:'var(--rd)',padding:'13px 14px',marginBottom:24,fontSize:12,color:'#1E40AF',lineHeight:1.6}}>
            <strong style={{display:'block',marginBottom:3}}>How this works</strong>
            AI calls go through a secure server route — your API key is never in the browser. Uploaded files are analyzed and shown here, but nothing is stored permanently. Closing the tab clears your session.
          </div>
        </div>}

      </div>

      <nav className="bnav">
        {NAV.map(({id,lbl,I})=>{
          const on=page===id;
          return <button key={id} className={`bni ${on?'on':''}`} onClick={()=>setPage(id)}>
            <I size={21} color={on?'#1B4332':'#9CA3AF'} strokeWidth={on?2.5:1.8}/>
            <span className="bnlbl">{lbl}</span>
            {on&&<div className="bnd"/>}
          </button>;
        })}
      </nav>
    </div></div>
  );
}
