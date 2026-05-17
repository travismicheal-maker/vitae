import { useState, useRef, useEffect } from "react";

// ── Site color palette (matches Vitae) ──────────────────────────────────────
const C = {
  bg:        '#f9fafb',
  card:      '#ffffff',
  border:    '#E5E7EB',
  borderGrn: '#D1FAE5',
  green1:    '#1B4332',
  green2:    '#2D6A4F',
  green3:    '#52B788',
  greenLt:   '#F0FDF4',
  text:      '#111827',
  textMd:    '#374151',
  textSm:    '#6B7280',
  textXs:    '#9CA3AF',
  orange:    '#D97706',
  orangeLt:  '#FFFBEB',
  orangeBdr: '#FDE68A',
  red:       '#DC2626',
  redLt:     '#FEF2F2',
  blue:      '#2563EB',
  blueLt:    '#EFF6FF',
};

// ── Category config ─────────────────────────────────────────────────────────
const CAT = {
  healing:         { accent: '#2D6A4F', bg: '#F0FDF4', border: '#D1FAE5', label: 'Healing' },
  metabolic:       { accent: '#0369A1', bg: '#F0F9FF', border: '#BAE6FD', label: 'Metabolic' },
  gh_axis:         { accent: '#6D28D9', bg: '#F5F3FF', border: '#DDD6FE', label: 'GH Axis' },
  sexual:          { accent: '#BE185D', bg: '#FDF2F8', border: '#FBCFE8', label: 'Sexual Health' },
  longevity:       { accent: '#7C3AED', bg: '#F5F3FF', border: '#DDD6FE', label: 'Longevity' },
  neuro:           { accent: '#4338CA', bg: '#EEF2FF', border: '#C7D2FE', label: 'Neuropeptide' },
  neuroprotection: { accent: '#4338CA', bg: '#EEF2FF', border: '#C7D2FE', label: 'Neuroprotection' },
  immune:          { accent: '#0E7490', bg: '#ECFEFF', border: '#A5F3FC', label: 'Immune' },
  mitochondrial:   { accent: '#B45309', bg: '#FFFBEB', border: '#FDE68A', label: 'Mitochondrial' },
  anti_aging:      { accent: '#B45309', bg: '#FFF7ED', border: '#FED7AA', label: 'Anti-Aging' },
  fertility:       { accent: '#065F46', bg: '#ECFDF5', border: '#A7F3D0', label: 'Fertility' },
  gut:             { accent: '#065F46', bg: '#ECFDF5', border: '#A7F3D0', label: 'GI Health' },
};

const RESEARCH_BADGE = {
  very_high: { color: '#065F46', bg: '#ECFDF5', label: 'Evidence: Very High' },
  high:      { color: '#1D4ED8', bg: '#EFF6FF', label: 'Evidence: High' },
  moderate:  { color: '#B45309', bg: '#FFFBEB', label: 'Evidence: Moderate' },
  emerging:  { color: '#6D28D9', bg: '#F5F3FF', label: 'Evidence: Emerging' },
};

const GOALS = [
  { icon: '🔄', label: 'Recovery & Healing',  cat: 'healing' },
  { icon: '⚖️', label: 'Weight & Fat Loss',   cat: 'metabolic' },
  { icon: '💪', label: 'Muscle & Strength',    cat: 'gh_axis' },
  { icon: '🧠', label: 'Mental Clarity',       cat: 'neuro' },
  { icon: '🌿', label: 'Gut & GI Health',      cat: 'gut' },
  { icon: '⏳', label: 'Longevity',            cat: 'longevity' },
  { icon: '🛡️', label: 'Immune Support',       cat: 'immune' },
  { icon: '⚡', label: 'Mitochondrial Health', cat: 'mitochondrial' },
];

const FILTERS = [
  { id: 'all',             label: 'All' },
  { id: 'healing',        label: 'Healing' },
  { id: 'metabolic',      label: 'Metabolic' },
  { id: 'gh_axis',        label: 'GH Axis' },
  { id: 'neuro',          label: 'Neuro' },
  { id: 'neuroprotection',label: 'Neuroprotection' },
  { id: 'anti_aging',     label: 'Anti-Aging' },
  { id: 'longevity',      label: 'Longevity' },
  { id: 'immune',         label: 'Immune' },
  { id: 'mitochondrial',  label: 'Mitochondrial' },
  { id: 'sexual',         label: 'Sexual Health' },
  { id: 'gut',            label: 'GI Health' },
];

const WARNINGS = [
  { icon: '🚫', title: 'Avoid Research-Grade / Online Peptide Vendors', body: 'Peptides sold online as research-use-only are not tested for human safety, sterility, or accurate dosing. Independent testing has shown widespread counterfeiting, contamination with endotoxins, and significant under-dosing. Self-administering these products poses serious health risks.' },
  { icon: '🏥', title: 'Always Work with a Licensed Physician', body: 'Peptide therapy should only be initiated under the supervision of a licensed physician who can evaluate your medical history, order appropriate labs, monitor your response, and adjust dosing safely.' },
  { icon: '💊', title: 'Use Only an FDA-Registered 503A Compounding Pharmacy', body: 'When your physician prescribes a compoundable peptide, ensure it is filled by a legitimate 503A compounding pharmacy licensed by your state board of pharmacy and providing a certificate of analysis (COA) confirming purity and sterility.' },
];

const PEPTIDES = [
  { id:'bpc157', name:'BPC-157', fullName:'Body Protection Compound 157', categoryTag:'healing', category:'Healing & Cytoprotection', icon:'🔄', tagline:'The most studied healing peptide in clinical use', regulatoryStatus:'Category 1 — Compoundable by prescription (Feb 2026)', researchLevel:'moderate', isResearchOnly:false, summary:'Synthetic 15-amino-acid pentadecapeptide isolated from human gastric juice. Over 200 preclinical publications. Heals tendons, ligaments, GI tract, burns, and nerve tissue via angiogenesis, nitric oxide modulation, and growth hormone receptor upregulation.', mechanism:'VEGFR2 upregulation (angiogenesis) · NO/eNOS modulation · FAK-paxillin pathway · Growth hormone receptor upregulation in fibroblasts (7x by day 3) · EGR-1/NAB2 collagen expression · Dopamine and serotonin system modulation', benefits:['Accelerates tendon, ligament, and muscle healing','Heals GI tract: ulcers, IBD, fistulas, NSAID damage','Burn wound healing — outperforms silver sulfadiazine','Optimizes vascular response across endothelium, thrombosis, and edema','Neuroprotection: TBI, sciatic nerve, spinal cord injury','Reduces IL-6, TNF-alpha, LTB4, TXB2, MPO','Interstitial cystitis: 10/12 patients 100% resolved (Lee 2024)'], dosing:{ clinical:'250-500 mcg once daily SC', community:'250 mcg BID SC (500 mcg/day total)', acute:'500 mcg BID x 2 weeks, then taper to 250 mcg BID', cycle:'4-6 weeks standard; 2-4 week break recommended', routes:['Subcutaneous','Intramuscular','Oral (GI indications only)'] }, sideEffects:'Well-tolerated. Mild injection-site irritation. Transient fatigue in first few days (~10%). No serious adverse events in 500,000+ prescriptions.', stacks:['BPC-157 + TB-500 (Wolverine Stack)','BPC-157 + CJC-1295/Ipamorelin (GH axis amplification)','BPC-157 + KPV (gut healing)','BPC-157 + GHK-Cu (skin and wound healing)'], humanEvidence:'3 published human studies: IV safety pilot (Lee 2025, n=2), interstitial cystitis pilot (Lee 2024, n=12, 10/12 resolved), knee pain (Lee 2021, n=16, 14/16 relief). Phase II UC trial (Ruenzi 2005) showed trend but not statistically significant vs placebo.', pkHalfLife:'<30 min', bioavailability:'IM: 14-19% (rats), 45-51% (dogs)' },
  { id:'tb500', name:'TB-500', fullName:'Thymosin Beta-4', categoryTag:'healing', category:'Healing & Recovery', icon:'⚡', tagline:'Systemic tissue repair and anti-inflammatory agent', regulatoryStatus:'Research peptide — not FDA approved', researchLevel:'moderate', isResearchOnly:true, summary:'Synthetic fragment of Thymosin Beta-4. Promotes cell migration, angiogenesis, and systemic anti-inflammation. Most commonly paired with BPC-157 in the Wolverine Stack.', mechanism:'Actin G-monomer sequestration · Cell migration via FAK · MMP upregulation · NF-kB anti-inflammatory suppression · Angiogenesis', benefits:['Accelerated muscle, tendon, and ligament repair','Systemic anti-inflammatory effects','Cardiac tissue repair post-injury','Neurite outgrowth support','Hair follicle stimulation'], dosing:{ clinical:'2-2.5 mg twice weekly SC (loading phase)', community:'2 mg twice weekly loading, 2 mg weekly maintenance', cycle:'4-6 weeks loading, then maintenance or break', routes:['Subcutaneous','Intramuscular'] }, sideEffects:'Generally well-tolerated. Mild fatigue reported anecdotally. Limited long-term human data.', stacks:['TB-500 + BPC-157 (Wolverine Stack — most common healing combination)'], humanEvidence:'Limited human data. Primarily animal studies. Widely used in clinical practice.', pkHalfLife:'~2 hours', bioavailability:'IM: high' },
  { id:'ara290', name:'ARA-290', fullName:'Cibinetide (ARA-290)', categoryTag:'neuroprotection', category:'Neuroprotection & Metabolic', icon:'🔬', tagline:'Non-hematopoietic EPO analogue for neuropathic pain', regulatoryStatus:'Investigational — clinical trials completed in sarcoidosis/SFN', researchLevel:'high', isResearchOnly:true, summary:'Selectively activates the tissue-protective EPO receptor complex (EPOR/betacR) without stimulating red blood cell production. Strongest clinical evidence for small fiber neuropathy and sarcoidosis-related neuropathic pain.', mechanism:'EPOR/betacR heterodimer activation · Akt/PI3K, JAK2, STAT3 pathways · NF-kB and TNF-alpha suppression · Nerve fiber regeneration', benefits:['Significant neuropathic pain reduction (RCT data)','Small nerve fiber regeneration','Improved insulin sensitivity','Anti-inflammatory: reduces TNF-alpha, IL-6','Ischemia-reperfusion protection'], dosing:{ clinical:'4 mg once daily SC (clinical trial dose)', cycle:'4-12 weeks depending on indication', routes:['Subcutaneous'] }, sideEffects:'Well-tolerated in clinical trials. No erythropoietic effects.', stacks:['ARA-290 + BPC-157 (nerve and tissue repair)'], humanEvidence:'Multiple clinical trials in sarcoidosis and small fiber neuropathy with positive results.', pkHalfLife:'~3-4 hours', bioavailability:'SC: ~60%' },
  { id:'aod9604', name:'AOD-9604', fullName:'Advanced Obesity Drug 9604', categoryTag:'metabolic', category:'Metabolic & Fat Loss', icon:'⚖️', tagline:'hGH lipolytic fragment without IGF-1 effects', regulatoryStatus:'FDA GRAS status for food use. Compoundable.', researchLevel:'moderate', isResearchOnly:false, summary:'C-terminal fragment of hGH (residues 176-191). Retains fat-burning properties of GH without IGF-1 stimulation, insulin resistance, or growth side effects. Also studied for cartilage and OA repair.', mechanism:'Beta-adrenergic receptor lipolysis · Lipogenesis inhibition (IGF-1 independent) · Proteoglycan synthesis in cartilage · Chondrocyte differentiation', benefits:['Visceral and subcutaneous fat reduction','No effect on blood glucose or insulin sensitivity','Cartilage regeneration in osteoarthritis models','Improved lipid profile'], dosing:{ clinical:'300-500 mcg once daily SC', community:'300-500 mcg fasted AM or pre-exercise', cycle:'8-12 weeks, assess results', routes:['Subcutaneous','Oral (limited bioavailability)'] }, sideEffects:'Exceptionally well-tolerated. No growth or IGF-1 side effects.', stacks:['AOD-9604 + CJC-1295/Ipamorelin (fat loss + GH axis)','AOD-9604 + BPC-157 (intra-articular for OA — physician only)'], humanEvidence:'Phase II/III human trials for obesity. Safe in all studies. GRAS status.', pkHalfLife:'~30 min', bioavailability:'SC: ~90%' },
  { id:'semaglutide', name:'Semaglutide', fullName:'Semaglutide (GLP-1 RA)', categoryTag:'metabolic', category:'GLP-1 / Metabolic', icon:'📊', tagline:'Gold standard GLP-1 agonist — 15-20% weight loss', regulatoryStatus:'FDA-approved (Ozempic / Wegovy / Rybelsus)', researchLevel:'very_high', isResearchOnly:false, summary:'Long-acting GLP-1 receptor agonist. The current gold standard for weight management and T2DM treatment. 15-20% body weight reduction in STEP trials. Weekly injection or daily oral tablet.', mechanism:'GLP-1R agonism · Insulin secretion increase · Glucagon suppression · Delayed gastric emptying · Central appetite suppression (hypothalamic) · Cardioprotective pathways', benefits:['15-20% body weight reduction (STEP trials)','HbA1c reduction in T2DM','Cardiovascular risk reduction (SUSTAIN-6)','MASH/NASH liver improvement','Potential neuroprotective effects under investigation'], dosing:{ clinical:'0.25 mg/week starting dose, titrate to 2.4 mg/week over 16-20 weeks', cycle:'Chronic ongoing therapy for weight management or T2DM', routes:['Subcutaneous injection (weekly)','Oral tablet daily (Rybelsus)'] }, sideEffects:'Nausea, vomiting, diarrhea during titration. Rare: pancreatitis, gallbladder disease. Muscle mass loss concern with rapid weight reduction.', stacks:['Semaglutide + resistance training + adequate protein (muscle preservation)','Semaglutide + BPC-157 sublingual (patented combination for GI side effects)'], humanEvidence:'Multiple large RCTs: STEP 1-4 programs, SUSTAIN program. Thousands of participants. FDA-approved.', pkHalfLife:'~7 days', bioavailability:'SC: ~89%; oral: ~1%' },
  { id:'cjc_ipamorelin', name:'CJC-1295 / Ipamorelin', fullName:'CJC-1295 + Ipamorelin Stack', categoryTag:'gh_axis', category:'GH Axis', icon:'💪', tagline:'Synergistic GH pulse — GHRH + GHRP combination', regulatoryStatus:'Compoundable by prescription. Not FDA-approved.', researchLevel:'moderate', isResearchOnly:false, summary:'The most common GH-axis peptide stack. CJC-1295 (GHRH analogue) elevates baseline GH; Ipamorelin (selective GHRP) amplifies the pulse without cortisol or prolactin side effects. Together produce 2-10x greater GH output.', mechanism:'CJC-1295: GHRH receptor agonism on pituitary somatotrophs. Ipamorelin: GHSR (ghrelin receptor) agonism — selective, no ACTH or cortisol stimulation.', benefits:['Increased GH and IGF-1 levels','Improved body composition: muscle gain and fat loss','Enhanced recovery and slow-wave sleep quality','Anti-aging effects on skin, hair, and energy','Joint and connective tissue improvement'], dosing:{ clinical:'CJC-1295 (no DAC) 100-300 mcg + Ipamorelin 100-300 mcg together, bedtime SC', cycle:'3-6 months, then break to preserve pituitary sensitivity', routes:['Subcutaneous (both peptides)'] }, sideEffects:'Water retention, joint aches, tingling (GH-related, dose-dependent). Generally mild.', stacks:['CJC/Ipamorelin + BPC-157 (BPC upregulates GHR, amplifying GH effect)','CJC/Ipamorelin + AOD-9604 (GH axis + direct fat loss)'], humanEvidence:'CJC-1295 human PK data published (Teichman 2006). Ipamorelin: animal plus limited human data.', pkHalfLife:'CJC (no DAC): ~30 min; Ipamorelin: ~2 hours', bioavailability:'SC: ~70-90%' },
  { id:'pt141', name:'PT-141', fullName:'Bremelanotide (PT-141)', categoryTag:'sexual', category:'Sexual Health', icon:'💚', tagline:'Central melanocortin agonist — FDA-approved for HSDD', regulatoryStatus:'FDA-approved as Vyleesi for HSDD in premenopausal women', researchLevel:'high', isResearchOnly:false, summary:'Melanocortin receptor agonist acting centrally on the hypothalamus to increase sexual desire. Distinct from PDE5 inhibitors — works via brain, not vascular. On-demand use for both men and women.', mechanism:'MC3R and MC4R agonism in hypothalamus · Dopaminergic and oxytocin pathway activation · Central sexual motivation drive', benefits:['Increased sexual desire and arousal in men and women','FDA-approved for HSDD in premenopausal women','Spontaneous erections in men (off-label)','Central mechanism — independent of vascular function','On-demand dosing with no daily requirement'], dosing:{ clinical:'1.75 mg SC 45 minutes before activity (FDA-approved dose)', community:'0.5-2 mg SC or intranasal', cycle:'On-demand use, maximum once per 24 hours', routes:['Subcutaneous','Intranasal (off-label)'] }, sideEffects:'Nausea (most common), flushing, headache, transient hyperpigmentation with repeated use.', stacks:['PT-141 + Kisspeptin-10 (hormonal + central desire)','PT-141 + PDE5 inhibitor (vascular + central)'], humanEvidence:'FDA Phase III trials completed (Simon 2019). Well-established clinical safety and efficacy data.', pkHalfLife:'~2-3 hours', bioavailability:'SC: ~100%' },
  { id:'ghkcu', name:'GHK-Cu', fullName:'Copper Peptide GHK-Cu', categoryTag:'anti_aging', category:'Skin & Anti-Aging', icon:'✨', tagline:'Copper tripeptide — collagen synthesis and skin renewal', regulatoryStatus:'GRAS in cosmetics. Compoundable for injectable use.', researchLevel:'moderate', isResearchOnly:false, summary:'Naturally occurring copper-binding tripeptide (Gly-His-Lys). Drives collagen and elastin synthesis, wound healing, and antioxidant pathways. Used in both topical cosmeceuticals and injectable anti-aging protocols.', mechanism:'Copper chelation activates SOD · Collagen and elastin synthesis increase · VEGF, FGF, TGF-beta upregulation · TNF-alpha and IL-1 suppression · Hair follicle activation', benefits:['Skin collagen and elastin synthesis','Wound healing acceleration','Hair follicle stimulation and regrowth support','Systemic anti-inflammatory activity','Antioxidant via superoxide dismutase (SOD) activation'], dosing:{ clinical:'1-2 mg/day SC or topical application', community:'0.5-3 mg/day SC; topical 1-5% serums twice daily', cycle:'8-12 weeks injectable; topical can be ongoing', routes:['Subcutaneous','Topical cream or serum'] }, sideEffects:'Excellent safety profile. Topical: mild irritation possible. Systemic: minimal reported adverse effects.', stacks:['GHK-Cu + BPC-157 (wound and skin healing)','GHK-Cu + Epithalon (comprehensive anti-aging protocol)'], humanEvidence:'Primarily in vitro and animal data. Extensive cosmeceutical human data for topical use. Limited injectable human trials.', pkHalfLife:'~1 hour', bioavailability:'SC: high; topical: 3-5% skin penetration' },
  { id:'epithalon', name:'Epithalon', fullName:'Epithalamin / Epithalon', categoryTag:'longevity', category:'Longevity & Anti-Aging', icon:'⏳', tagline:'Telomerase-activating tetrapeptide from the pineal gland', regulatoryStatus:'Research peptide — not FDA-approved', researchLevel:'moderate', isResearchOnly:true, summary:'Pineal-derived tetrapeptide (Ala-Glu-Asp-Gly). Activates telomerase, extends telomere length, and regulates melatonin and circadian rhythms. One of the most researched anti-aging peptides in Russian geroscience literature.', mechanism:'Telomerase enzyme activation · Telomere length extension · Pineal melatonin synthesis regulation · Antioxidant pathway activation', benefits:['Telomere extension (in vitro and animal data)','Improved sleep quality via melatonin regulation','Extended lifespan in multiple animal models','Retinal function preservation','Antioxidant and immune modulation'], dosing:{ clinical:'5-10 mg/day SC for 10-20 day courses', community:'5-10 mg/day, 10-20 days, 1-2 times per year', cycle:'10-20 day courses repeated 1-2 times per year (geroscience protocol)', routes:['Subcutaneous'] }, sideEffects:'Well-tolerated in all available studies. No significant adverse events reported.', stacks:['Epithalon + GHK-Cu (anti-aging combination)','Epithalon + Thymosin Alpha-1 (immune longevity protocol)'], humanEvidence:'Russian clinical research spanning decades (Khavinson et al). Limited Western RCT data but long safety record.', pkHalfLife:'~30 min', bioavailability:'SC: high' },
  { id:'thymosin_alpha1', name:'Thymosin Alpha-1', fullName:'Thymosin Alpha-1 (Zadaxin)', categoryTag:'immune', category:'Immune Modulation', icon:'🛡️', tagline:'Endogenous thymic peptide — FDA-approved in 35+ countries', regulatoryStatus:'FDA-approved (Zadaxin) in 35+ countries. US compoundable off-label.', researchLevel:'high', isResearchOnly:false, summary:'Endogenous thymic hormone that modulates T-cell differentiation and immune balance. Used for chronic hepatitis B/C, cancer immunotherapy adjuvant, and immune deficiency states. Strongest immune peptide with established clinical protocols.', mechanism:'TLR2 and TLR9 agonism on dendritic cells · Th1 differentiation increase · NK cell activation · IL-2 and IFN-gamma production upregulation', benefits:['Enhances T-cell immunity (Th1 response)','Antiviral activity: hepatitis B/C, studied in COVID-19','Cancer immunotherapy adjuvant','Chronic fatigue and immune deficiency improvement','Autoimmune condition modulation'], dosing:{ clinical:'1.6 mg SC twice weekly (Zadaxin standard protocol)', cycle:'6-12 months for chronic conditions; shorter courses for acute immune support', routes:['Subcutaneous'] }, sideEffects:'Very well-tolerated. Injection site reactions only. Excellent clinical safety record across decades of use.', stacks:['Thymosin Alpha-1 + Epithalon (immune longevity protocol)','Thymosin Alpha-1 + BPC-157 (inflammation and immune support)'], humanEvidence:'Multiple large RCTs for hepatitis B/C. Clinical approval in 35+ countries including Zadaxin designation.', pkHalfLife:'~2 hours', bioavailability:'SC: ~100%' },
  { id:'selank', name:'Selank', fullName:'Selank (TP-7)', categoryTag:'neuro', category:'Neuropeptide / Anxiolytic', icon:'🧠', tagline:'Anxiolytic neuropeptide without dependence or sedation', regulatoryStatus:'Registered drug in Russia. Research peptide in United States.', researchLevel:'moderate', isResearchOnly:true, summary:'Synthetic tuftsin analogue with anxiolytic, nootropic, and immunomodulatory effects. No addictive potential or benzodiazepine-like withdrawal. Acts simultaneously on GABA-A, serotonin, and BDNF pathways.', mechanism:'GABA-A modulation without dependence · Serotonin turnover increase · BDNF upregulation · Enkephalin degradation inhibition · IL-6 and IL-2 mRNA stabilization', benefits:['Anxiety reduction without sedation or dependence','Nootropic effects: learning, memory, attention','Mood stabilization and emotional regulation','Immune modulation','Neuroprotection'], dosing:{ clinical:'250-500 mcg intranasal or SC, 1-2 times daily', cycle:'2-4 weeks; can be used as needed for acute anxiety', routes:['Intranasal (preferred for CNS access)','Subcutaneous'] }, sideEffects:'Excellent tolerability profile. Mild sedation at higher doses. No withdrawal effects.', stacks:['Selank + Semax (cognitive plus anxiolytic balance)','Selank + BPC-157 (neuroprotection stack)'], humanEvidence:'Russian clinical trials for anxiety conditions. Limited Western controlled trial data.', pkHalfLife:'~15 min intranasal', bioavailability:'Intranasal: ~90% CNS penetration' },
  { id:'semax', name:'Semax', fullName:'Semax (ACTH 4-10 analogue)', categoryTag:'neuro', category:'Neuropeptide / Cognitive', icon:'💡', tagline:'BDNF-stimulating nootropic for focus and neuroprotection', regulatoryStatus:'Registered drug in Russia. Research peptide in United States.', researchLevel:'moderate', isResearchOnly:true, summary:'Synthetic ACTH 4-10 analogue. Potent BDNF and NGF upregulator. Used for cognitive enhancement, stroke recovery, and neuroprotection. Stimulatory profile — morning use is preferred.', mechanism:'BDNF and NGF upregulation · Melanocortin receptor activation · Dopaminergic and serotonergic enhancement · Brain antioxidant protection', benefits:['BDNF upregulation supporting neuroplasticity and memory','Cognitive enhancement: attention, processing speed','Stroke recovery support and neuroprotection','Antidepressant and mood-elevating properties','Energy and motivation enhancement'], dosing:{ clinical:'200-600 mcg intranasal, 1-2 times daily in the morning', cycle:'2-4 weeks on, 1-2 weeks off to prevent tolerance', routes:['Intranasal (preferred)','Subcutaneous'] }, sideEffects:'Generally well-tolerated. Mild anxiety or overstimulation at higher doses. No serious adverse effects reported.', stacks:['Semax + Selank (cognitive enhancement plus anxiolytic balance)','Semax + BPC-157 (neuroprotection combination)'], humanEvidence:'Russian clinical trials for stroke recovery and cognitive conditions. Limited Western RCT data.', pkHalfLife:'~20 min intranasal', bioavailability:'Intranasal: high CNS penetration' },
  { id:'kpv', name:'KPV', fullName:'KPV Tripeptide (Lys-Pro-Val)', categoryTag:'gut', category:'Anti-Inflammatory / GI', icon:'🌿', tagline:'Alpha-MSH fragment — targeted gut anti-inflammatory', regulatoryStatus:'Research peptide — not FDA-approved', researchLevel:'moderate', isResearchOnly:true, summary:'C-terminal fragment of alpha-MSH. Potent intestinal anti-inflammatory with oral bioavailability — rare for a peptide. Best combined with BPC-157 for IBD, leaky gut, and NSAID-induced GI damage.', mechanism:'MC1R and MC3R agonism · NF-kB, TNF-alpha, IL-1beta inhibition · Intestinal permeability improvement · Direct colonic epithelium action', benefits:['IBD and Crohns disease inflammation reduction','Gut barrier and leaky gut improvement','Systemic anti-inflammatory activity','Wound healing properties'], dosing:{ clinical:'100-500 mcg oral or SC, 1-2 times daily', cycle:'4-8 weeks for gut healing indications', routes:['Oral (bioavailable — rare for peptides)','Subcutaneous'] }, sideEffects:'Very limited adverse event data available. Appears well-tolerated in all studies.', stacks:['KPV + BPC-157 (gut healing synergy — most common GI stack)'], humanEvidence:'Limited — primarily in vitro and animal studies. Clinical use growing rapidly.', pkHalfLife:'~1 hour', bioavailability:'Oral: moderate; SC: high' },
  { id:'motsc', name:'MOTS-c', fullName:'Mitochondrial-Derived Peptide MOTS-c', categoryTag:'mitochondrial', category:'Mitochondrial / Metabolic', icon:'⚡', tagline:'Mitochondrial genome-encoded peptide for metabolic health', regulatoryStatus:'Research peptide — not FDA-approved', researchLevel:'emerging', isResearchOnly:true, summary:'Mitochondria-derived peptide encoded in the mitochondrial genome. Naturally declines with age. Regulates insulin sensitivity, mitochondrial biogenesis, and exercise adaptation. One of the most exciting emerging longevity peptides.', mechanism:'AMPK activation · Folate cycle and purine biosynthesis regulation · Nuclear gene expression for metabolic adaptation · Mitochondrial biogenesis', benefits:['Improved insulin sensitivity and glucose metabolism','Mitochondrial biogenesis stimulation','Enhanced exercise performance and endurance','Anti-aging metabolic effects','Potential applications in T2DM management'], dosing:{ clinical:'5-10 mg/week SC', cycle:'4-8 weeks; best results when combined with regular exercise', routes:['Subcutaneous'] }, sideEffects:'Limited safety data. Appears well-tolerated in available animal and early human studies.', stacks:['MOTS-c + SS-31 (mitochondrial dual stack)','MOTS-c + Epithalon (longevity protocol)'], humanEvidence:'Early human data available. Strong AMPK and metabolic effects in animal studies.', pkHalfLife:'~1-2 hours', bioavailability:'SC: high' },
  { id:'ss31', name:'SS-31', fullName:'Elamipretide (SS-31)', categoryTag:'mitochondrial', category:'Mitochondrial', icon:'🔋', tagline:'Cardiolipin-targeting peptide for mitochondrial restoration', regulatoryStatus:'Investigational — Phase III completed, NDA submitted for Barth syndrome', researchLevel:'high', isResearchOnly:true, summary:'Targets cardiolipin on the inner mitochondrial membrane. The highest-evidence mitochondrial peptide. Restores cristae architecture, reduces electron leak, and improves ATP synthesis. Strong evidence for heart failure and skeletal muscle restoration.', mechanism:'Cardiolipin binding on inner mitochondrial membrane · Cristae structure stabilization · Electron transport chain efficiency increase · Mitochondrial ROS reduction · ATP synthesis restoration', benefits:['Mitochondrial function restoration','Cardiac function improvement in HFpEF','Age-related skeletal muscle dysfunction reversal','Ischemia-reperfusion injury protection','Energy and fatigue improvement'], dosing:{ clinical:'0.05-0.25 mg/kg SC or IV (clinical trial dosing)', cycle:'Ongoing; requires physician supervision for dosing and monitoring', routes:['Subcutaneous','Intravenous (clinical trials only)'] }, sideEffects:'Well-tolerated in Phase II/III trials. Injection site reactions are the primary adverse effect.', stacks:['SS-31 + MOTS-c (mitochondrial dual stack for comprehensive mitochondrial support)'], humanEvidence:'Multiple Phase II/III clinical trials completed. NDA submitted to FDA for Barth syndrome indication.', pkHalfLife:'~1 hour', bioavailability:'SC: high; selectively concentrates in mitochondria' },
];

// ── AI Chat Component ────────────────────────────────────────────────────────
function PeptideAIChat({ onBack }) {
  const [msgs, setMsgs]   = useState([{ role: 'assistant', content: 'Hello! I am your Peptide AI Consultant. Ask me anything about peptide therapy — mechanisms, dosing protocols, stacking strategies, safety considerations, or which peptides may support your goals. How can I help you today?' }]);
  const [input, setInput] = useState('');
  const [busy, setBusy]   = useState(false);
  const endRef            = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs, busy]);

  const send = async () => {
    const text = input.trim();
    if (!text || busy) return;
    const history = [...msgs, { role: 'user', content: text }];
    setMsgs(history);
    setInput('');
    setBusy(true);
    try {
      const peptideContext = PEPTIDES.map(p =>
        `PEPTIDE: ${p.name} (${p.fullName})\nCategory: ${p.category}\nSummary: ${p.summary}\nMechanism: ${p.mechanism}\nBenefits: ${p.benefits.join(' | ')}\nTypical Dose: ${p.dosing?.clinical || 'See protocol'}\nCycle: ${p.dosing?.cycle || 'See protocol'}\nSide Effects: ${p.sideEffects}\nResearch Level: ${p.researchLevel}\nRegulatory: ${p.regulatoryStatus}`
      ).join('\n---\n');

      const systemPrompt = `You are a Peptide Medicine Consultant with expertise in peptide therapeutics, longevity medicine, sports medicine, and regenerative medicine. You provide evidence-based guidance on peptide therapy.

PEPTIDE KNOWLEDGE BASE:
${peptideContext}

RULES:
- Always recommend physician supervision and 503A compounding pharmacy sourcing
- Distinguish clearly between FDA-approved, compoundable, and research-only peptides
- Label evidence quality: [Verified] for established data, [Emerging] for limited data, [Theoretical] for proposed mechanisms
- Provide specific dosing, cycling, and stacking guidance when asked
- Never diagnose or prescribe — educate and guide
- Flag research-only peptides clearly and advise against unregulated online sources
- End responses with: "Always consult a licensed physician before starting any peptide protocol."`;

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: systemPrompt,
          messages: history,
        }),
      });
      const data = await response.json();
      const reply = data.content?.[0]?.text || 'Sorry, I could not get a response. Please try again.';
      setMsgs(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      setMsgs(prev => [...prev, { role: 'assistant', content: 'Connection error. Please try again.' }]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div style={{ background: C.bg, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ background: C.card, borderBottom: `1px solid ${C.border}`, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
        <button onClick={onBack} style={{ background: 'transparent', border: `1px solid ${C.border}`, borderRadius: 8, padding: '6px 12px', cursor: 'pointer', fontSize: 13, color: C.textSm, display: 'flex', alignItems: 'center', gap: 6 }}>← Back</button>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: C.greenLt, border: `1px solid ${C.borderGrn}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🧬</div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: C.green1 }}>Peptide AI Consultant</div>
          <div style={{ fontSize: 12, color: C.textSm }}>Ask anything about peptide therapy</div>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 720, width: '100%', margin: '0 auto' }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{
              maxWidth: '80%', padding: '12px 16px', borderRadius: 14,
              background: m.role === 'user' ? C.green2 : C.card,
              color: m.role === 'user' ? '#fff' : C.text,
              border: m.role === 'user' ? 'none' : `1px solid ${C.border}`,
              fontSize: 14, lineHeight: 1.65,
            }}>{m.content}</div>
          </div>
        ))}
        {busy && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: '12px 16px', color: C.textSm, fontSize: 14 }}>Thinking...</div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <div style={{ background: C.card, borderTop: `1px solid ${C.border}`, padding: '14px 16px', display: 'flex', gap: 10, maxWidth: 720, width: '100%', margin: '0 auto', boxSizing: 'border-box' }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
          placeholder="Ask about peptides, dosing, stacking, or your goals..."
          style={{ flex: 1, padding: '11px 14px', border: `1.5px solid ${C.border}`, borderRadius: 10, fontSize: 14, outline: 'none', color: C.text, background: C.bg, fontFamily: 'inherit' }}
          onFocus={e => e.target.style.borderColor = C.green3}
          onBlur={e => e.target.style.borderColor = C.border}
        />
        <button
          onClick={send}
          disabled={busy || !input.trim()}
          style={{ padding: '11px 20px', background: input.trim() && !busy ? C.green2 : C.textXs, color: '#fff', border: 'none', borderRadius: 10, cursor: input.trim() && !busy ? 'pointer' : 'not-allowed', fontSize: 14, fontWeight: 600, fontFamily: 'inherit' }}
        >Send</button>
      </div>
    </div>
  );
}

// ── Disclaimer ───────────────────────────────────────────────────────────────
function PeptideDisclaimer() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div style={{ background: C.orangeLt, border: `1px solid ${C.orangeBdr}`, borderRadius: 12, padding: '14px 16px', marginBottom: 20 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>⚠️</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#92400E', marginBottom: 3 }}>Important Safety Notice — Research-Only Peptides</div>
          <p style={{ fontSize: 12.5, color: '#B45309', margin: 0, lineHeight: 1.5 }}>
            Some peptides in this library are research-only substances and carry significant safety risks if obtained from unregulated sources.
          </p>
        </div>
        <button onClick={() => setExpanded(e => !e)} style={{ background: 'transparent', border: `1px solid ${C.orangeBdr}`, borderRadius: 6, color: C.orange, fontSize: 11, fontWeight: 700, padding: '4px 10px', cursor: 'pointer', flexShrink: 0, whiteSpace: 'nowrap' }}>
          {expanded ? 'Less ▲' : 'Read More ▼'}
        </button>
      </div>
      {expanded && (
        <div style={{ marginTop: 14, borderTop: `1px solid ${C.orangeBdr}`, paddingTop: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {WARNINGS.map(w => (
            <div key={w.title} style={{ display: 'flex', gap: 10 }}>
              <span style={{ fontSize: 14, flexShrink: 0 }}>{w.icon}</span>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#92400E', marginBottom: 2 }}>{w.title}</div>
                <p style={{ fontSize: 12, color: '#B45309', margin: 0, lineHeight: 1.55 }}>{w.body}</p>
              </div>
            </div>
          ))}
          <div style={{ background: C.greenLt, border: `1px solid ${C.borderGrn}`, borderRadius: 10, padding: '12px 14px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.green1, marginBottom: 8 }}>The Safe Path</div>
            {['Consult a physician specializing in peptide or regenerative medicine','Obtain a written prescription for any compoundable peptide','Fill your prescription at a licensed 503A pharmacy and request the COA','Never purchase injectable peptides from online research vendors','Use this guide for education only — not as a self-prescribing tool'].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, fontSize: 12, color: C.green2, lineHeight: 1.5, marginBottom: 4 }}>
                <span style={{ color: C.green3, flexShrink: 0 }}>→</span> {item}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main Export ──────────────────────────────────────────────────────────────
export default function PeptideOverview() {
  const [view, setView]       = useState('home'); // 'home' | 'library' | 'detail' | 'chat'
  const [selected, setSelected] = useState(null);
  const [filter, setFilter]   = useState('all');
  const [search, setSearch]   = useState('');

  const filtered = PEPTIDES.filter(p => {
    const matchCat    = filter === 'all' || p.categoryTag === filter;
    const matchSearch = !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.fullName.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const goToLibrary = (cat) => {
    setFilter(cat || 'all');
    setView('library');
  };

  const cat   = selected ? (CAT[selected.categoryTag] || CAT.healing) : null;
  const badge = selected ? (RESEARCH_BADGE[selected.researchLevel] || RESEARCH_BADGE.moderate) : null;

  // ── AI Chat Screen ─────────────────────────────────────────────────────────
  if (view === 'chat') return <PeptideAIChat onBack={() => setView('home')} />;

  // ── Peptide Detail Screen ──────────────────────────────────────────────────
  if (view === 'detail' && selected) return (
    <div style={{ background: C.bg, minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '28px 20px' }}>
        {/* Nav */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
          <button onClick={() => { setSelected(null); setView('library'); }} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontSize: 13, color: C.textMd }}>← Library</button>
          <button onClick={() => { setSelected(null); setView('home'); }} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontSize: 13, color: C.textMd }}>Home</button>
        </div>

        {/* Research-only warning */}
        {selected.isResearchOnly && (
          <div style={{ background: C.orangeLt, border: `1px solid ${C.orangeBdr}`, borderRadius: 12, padding: '14px 16px', marginBottom: 20, display: 'flex', gap: 12 }}>
            <span style={{ fontSize: 18, flexShrink: 0 }}>⚠️</span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#92400E', marginBottom: 3 }}>Research-Only Peptide</div>
              <p style={{ fontSize: 12.5, color: '#B45309', margin: 0, lineHeight: 1.5 }}><strong>{selected.name}</strong> is classified as research-only and is not FDA-approved for human administration. Do not obtain from online research vendors. Consult a qualified physician before pursuing access through any channel.</p>
            </div>
          </div>
        )}

        {/* Hero */}
        <div style={{ background: cat.bg, border: `1px solid ${cat.border}`, borderRadius: 16, padding: '24px', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 14, flexWrap: 'wrap' }}>
            <div style={{ width: 52, height: 52, borderRadius: 12, background: '#fff', border: `1px solid ${cat.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>{selected.icon}</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontSize: 26, fontWeight: 800, color: cat.accent, margin: '0 0 4px' }}>{selected.name}</h1>
              <div style={{ fontSize: 13, color: C.textSm }}>{selected.fullName}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
            <span style={{ fontSize: 11, fontWeight: 700, background: '#fff', color: cat.accent, padding: '4px 10px', borderRadius: 20, border: `1px solid ${cat.border}` }}>{selected.category}</span>
            <span style={{ fontSize: 11, fontWeight: 600, background: badge.bg, color: badge.color, padding: '4px 10px', borderRadius: 20 }}>{badge.label}</span>
            {selected.isResearchOnly && <span style={{ fontSize: 11, fontWeight: 700, background: C.orangeLt, color: C.orange, padding: '4px 10px', borderRadius: 20, border: `1px solid ${C.orangeBdr}` }}>Research Only</span>}
            <span style={{ fontSize: 11, fontWeight: 600, background: '#fff', color: C.textSm, padding: '4px 10px', borderRadius: 20, border: `1px solid ${C.border}` }}>Half-life: {selected.pkHalfLife}</span>
          </div>
          <p style={{ fontSize: 14, color: C.textMd, margin: '0 0 12px', lineHeight: 1.65 }}>{selected.summary}</p>
          <div style={{ fontSize: 12, color: cat.accent, background: '#fff', padding: '8px 12px', borderRadius: 8, border: `1px solid ${cat.border}` }}>
            Regulatory Status: {selected.regulatoryStatus}
          </div>
        </div>

        {/* Sections */}
        {[
          { title: 'Mechanism of Action', icon: '⚙️', content: <p style={{ fontSize: 14, color: C.textMd, lineHeight: 1.7, margin: 0 }}>{selected.mechanism}</p> },
          { title: 'Key Benefits', icon: '✅', content: <ul style={{ margin: 0, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>{selected.benefits.map((b, i) => <li key={i} style={{ display: 'flex', gap: 10, fontSize: 13.5, color: C.textMd, lineHeight: 1.5 }}><span style={{ color: cat.accent, flexShrink: 0 }}>✓</span>{b}</li>)}</ul> },
          { title: 'Dosing Protocols', icon: '💉', content: (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {Object.entries(selected.dosing).map(([key, val]) => {
                if (!val || key === 'routes') return null;
                const labels = { clinical: 'Clinical / Pharmacy', community: 'Community Reported', acute: 'Acute Injury', cycle: 'Cycle Length', typical: 'Typical', range: 'Range' };
                return (
                  <div key={key} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: cat.accent, background: cat.bg, border: `1px solid ${cat.border}`, padding: '3px 8px', borderRadius: 6, flexShrink: 0, whiteSpace: 'nowrap' }}>{labels[key] || key}</span>
                    <span style={{ fontSize: 13.5, color: C.textMd, lineHeight: 1.5 }}>{val}</span>
                  </div>
                );
              })}
              {selected.dosing.routes && (
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 4 }}>
                  {selected.dosing.routes.map(r => <span key={r} style={{ fontSize: 12, background: C.bg, color: C.textSm, padding: '4px 10px', borderRadius: 6, border: `1px solid ${C.border}` }}>{r}</span>)}
                </div>
              )}
            </div>
          )},
          { title: 'Common Stacks', icon: '🔗', content: <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>{selected.stacks.map((s, i) => <div key={i} style={{ fontSize: 13.5, color: C.textMd, padding: '10px 14px', background: C.bg, borderRadius: 10, border: `1px solid ${C.border}` }}>{s}</div>)}</div> },
          { title: 'Side Effects & Safety', icon: '⚠️', content: <p style={{ fontSize: 13.5, color: C.textMd, lineHeight: 1.65, margin: 0 }}>{selected.sideEffects}</p> },
          { title: 'Human Evidence', icon: '📄', content: <p style={{ fontSize: 13.5, color: C.textMd, lineHeight: 1.65, margin: 0 }}>{selected.humanEvidence}</p> },
        ].map(section => (
          <div key={section.title} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: '18px 20px', marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: cat.accent, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>{section.icon}</span> {section.title}
            </div>
            {section.content}
          </div>
        ))}

        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <button onClick={() => setView('chat')} style={{ background: C.green2, color: '#fff', border: 'none', borderRadius: 10, padding: '12px 24px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
            Ask AI about {selected.name} →
          </button>
        </div>

        <p style={{ fontSize: 11, color: C.textXs, textAlign: 'center', marginTop: 16, lineHeight: 1.5 }}>Educational purposes only · Not medical advice · All peptide therapy requires physician supervision and a licensed 503A compounding pharmacy</p>
      </div>
    </div>
  );

  // ── Library Grid Screen ────────────────────────────────────────────────────
  if (view === 'library') return (
    <div style={{ background: C.bg, minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '28px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20, flexWrap: 'wrap' }}>
          <button onClick={() => setView('home')} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontSize: 13, color: C.textMd }}>← Back</button>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: C.green1, margin: 0 }}>🧬 Peptide Library</h1>
            <p style={{ fontSize: 13, color: C.textSm, margin: '4px 0 0' }}>{PEPTIDES.length} peptides · Click any card to view full profile</p>
          </div>
          <input placeholder="Search peptides..." value={search} onChange={e => setSearch(e.target.value)} style={{ padding: '9px 14px', background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, color: C.text, fontSize: 13, outline: 'none', width: 200 }}
            onFocus={e => e.target.style.borderColor = C.green3}
            onBlur={e => e.target.style.borderColor = C.border}
          />
        </div>

        {/* Warning bar */}
        <div style={{ background: C.orangeLt, border: `1px solid ${C.orangeBdr}`, borderRadius: 10, padding: '10px 16px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10, fontSize: 12.5, color: '#B45309' }}>
          <span>⚠️</span>
          <span>Peptides marked <strong>RESEARCH ONLY</strong> are not FDA-approved. Only use compoundable peptides prescribed by a physician through a licensed 503A pharmacy.</span>
        </div>

        {/* Category filter pills */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
          {FILTERS.map(f => {
            const active = filter === f.id;
            const c = f.id !== 'all' && CAT[f.id];
            return (
              <button key={f.id} onClick={() => setFilter(f.id)} style={{ padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s', background: active ? (c ? c.bg : C.greenLt) : C.card, border: `1px solid ${active ? (c ? c.border : C.borderGrn) : C.border}`, color: active ? (c ? c.accent : C.green2) : C.textSm }}>
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: 14 }}>
          {filtered.map(p => {
            const c = CAT[p.categoryTag] || CAT.healing;
            const r = RESEARCH_BADGE[p.researchLevel] || RESEARCH_BADGE.moderate;
            return (
              <button key={p.id} onClick={() => { setSelected(p); setView('detail'); }} style={{ background: C.card, border: `1.5px solid ${C.border}`, borderRadius: 14, padding: '18px', textAlign: 'left', cursor: 'pointer', transition: 'all 0.15s', display: 'flex', flexDirection: 'column', gap: 10, position: 'relative' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = c.accent; e.currentTarget.style.background = c.bg; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.card; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                {p.isResearchOnly && <div style={{ position: 'absolute', top: 12, right: 12, fontSize: 9, fontWeight: 800, background: C.orangeLt, color: C.orange, padding: '2px 6px', borderRadius: 4, border: `1px solid ${C.orangeBdr}` }}>RESEARCH ONLY</div>}
                <div style={{ display: 'flex', gap: 12 }}>
                  <div style={{ width: 42, height: 42, borderRadius: 10, background: c.bg, border: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{p.icon}</div>
                  <div style={{ flex: 1, paddingRight: p.isResearchOnly ? 60 : 0 }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: C.green1, marginBottom: 2 }}>{p.name}</div>
                    <div style={{ fontSize: 11, color: C.textXs }}>{p.fullName}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 10, fontWeight: 700, background: c.bg, color: c.accent, padding: '3px 8px', borderRadius: 20, border: `1px solid ${c.border}` }}>{p.category}</span>
                  <span style={{ fontSize: 10, fontWeight: 600, background: r.bg, color: r.color, padding: '3px 8px', borderRadius: 20 }}>{r.label}</span>
                </div>
                <p style={{ fontSize: 12.5, color: C.textSm, margin: 0, lineHeight: 1.5 }}>{p.tagline}</p>
                <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 10, display: 'flex', gap: 16 }}>
                  <div><div style={{ fontSize: 10, color: C.textXs, fontWeight: 700, textTransform: 'uppercase', marginBottom: 2 }}>Half-life</div><div style={{ fontSize: 12, color: C.textMd, fontWeight: 600 }}>{p.pkHalfLife}</div></div>
                  <div style={{ flex: 1 }}><div style={{ fontSize: 10, color: C.textXs, fontWeight: 700, textTransform: 'uppercase', marginBottom: 2 }}>Clinical Dose</div><div style={{ fontSize: 12, color: C.textMd, fontWeight: 600 }}>{(p.dosing.clinical || '').split('·')[0].trim()}</div></div>
                </div>
              </button>
            );
          })}
        </div>
        {filtered.length === 0 && <div style={{ textAlign: 'center', padding: 60, color: C.textXs }}>No peptides match your search.</div>}
      </div>
    </div>
  );

  // ── Home Screen ────────────────────────────────────────────────────────────
  return (
    <div style={{ background: C.bg, minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '40px 20px' }}>

        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 11, letterSpacing: 3, color: C.textXs, fontWeight: 700, marginBottom: 10, textTransform: 'uppercase' }}>Vitae · Bio Precision Aging</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: C.green1, margin: '0 0 8px' }}>Peptide Consultant</h1>
          <p style={{ color: C.textSm, fontSize: 14.5, margin: 0, lineHeight: 1.6 }}>AI-assisted guidance for evidence-based peptide therapy. Explore the library, filter by goal, or chat with our AI consultant.</p>
        </div>

        {/* Disclaimer */}
        <PeptideDisclaimer />

        {/* Two main action buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>

          {/* Peptide Overview */}
          <button onClick={() => goToLibrary('all')} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px', background: C.greenLt, border: `1.5px solid ${C.borderGrn}`, borderRadius: 14, cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#D1FAE5'; e.currentTarget.style.borderColor = C.green3; e.currentTarget.style.boxShadow = '0 4px 12px rgba(52,183,120,0.15)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = C.greenLt; e.currentTarget.style.borderColor = C.borderGrn; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <div style={{ width: 42, height: 42, borderRadius: 10, background: C.green2, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>🧬</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.green1, marginBottom: 3 }}>Peptide Overview</div>
              <div style={{ fontSize: 12, color: C.green2, lineHeight: 1.4 }}>Browse all {PEPTIDES.length} peptides in our library</div>
            </div>
          </button>

          {/* Peptide AI Consultant */}
          <button onClick={() => setView('chat')} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 16px', background: '#EFF6FF', border: '1.5px solid #BFDBFE', borderRadius: 14, cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#DBEAFE'; e.currentTarget.style.borderColor = '#93C5FD'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(37,99,235,0.12)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#EFF6FF'; e.currentTarget.style.borderColor = '#BFDBFE'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <div style={{ width: 42, height: 42, borderRadius: 10, background: C.blue, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>💬</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#1D4ED8', marginBottom: 3 }}>Peptide AI Consultant</div>
              <div style={{ fontSize: 12, color: '#3B82F6', lineHeight: 1.4 }}>Ask our AI any peptide question</div>
            </div>
          </button>
        </div>

        {/* Goal selection */}
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: '20px' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.textSm, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 14 }}>Filter Library by Your Goal</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
            {GOALS.map(g => {
              const c = CAT[g.cat] || CAT.healing;
              return (
                <button key={g.label} onClick={() => goToLibrary(g.cat)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', background: C.bg, border: `1.5px solid ${C.border}`, borderRadius: 10, cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = c.bg; e.currentTarget.style.borderColor = c.accent; e.currentTarget.style.color = c.accent; }}
                  onMouseLeave={e => { e.currentTarget.style.background = C.bg; e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textMd; }}
                >
                  <span style={{ fontSize: 18 }}>{g.icon}</span>
                  <span style={{ fontSize: 13, fontWeight: 500, color: 'inherit' }}>{g.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <p style={{ fontSize: 11, color: C.textXs, textAlign: 'center', marginTop: 20, lineHeight: 1.5 }}>
          Educational purposes only · Not medical advice · All peptide therapy requires physician supervision and a prescription from a licensed 503A compounding pharmacy.
        </p>
      </div>
    </div>
  );
}
