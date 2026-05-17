// src/peptides.js
// Bio Precision Aging — Peptide Knowledge Base
// All 39 peptides. Default route: SQ injection unless noted.
// Structure ready for detailed dosing/background population.

export const PEPTIDE_KNOWLEDGE_BASE = [

  // ── GLP-1 / Metabolic ────────────────────────────────────────────────────────

  {
    id: 'semaglutide',
    name: 'Semaglutide',
    fullName: 'Semaglutide (GLP-1 receptor agonist)',
    category: 'metabolic',
    route: ['subcutaneous injection'],
    goals: ['weight_loss', 'visceral_fat', 'metabolic_health', 'longevity'],
    summary: 'GLP-1 receptor agonist. FDA approved for T2DM (Ozempic) and obesity (Wegovy). First-line peptide for significant weight and visceral fat reduction.',
    mechanism: 'Activates GLP-1 receptors in the pancreas (insulin secretion), hypothalamus (appetite suppression), and GI tract (delayed gastric emptying). Reduces glucagon, lowers postprandial glucose.',
    benefits: ['15–20% body weight reduction (STEP trials)', 'Significant visceral fat reduction', 'Cardiovascular risk reduction (SUSTAIN-6)', 'Improved insulin sensitivity', 'Emerging neuroprotective and longevity data'],
    dosing: { typical: '0.25–2.4 mg/week', range: 'Titrate: 0.25 → 0.5 → 1 → 1.7 → 2.4 mg over 16–20 weeks', frequency: 'Once weekly', route: ['subcutaneous injection'], cycle: 'Chronic therapy', notes: 'Slow titration minimizes nausea. Compounded semaglutide: verify semaglutide base only, no acetate salt.' },
    sideEffects: 'Nausea (most common, dose-dependent), vomiting, constipation, GERD. Rare: pancreatitis. Contraindicated in MEN2/medullary thyroid carcinoma history.',
    researchLevel: 'very_high',
    tags: ['FDA approved', 'GLP-1', 'weekly injection'],
  },

  {
    id: 'tirzepatide',
    name: 'Tirzepatide',
    fullName: 'Tirzepatide (GIP/GLP-1 dual agonist)',
    category: 'metabolic',
    route: ['subcutaneous injection'],
    goals: ['weight_loss', 'visceral_fat', 'metabolic_health', 'muscle_preservation'],
    summary: 'Dual GIP and GLP-1 receptor agonist. FDA approved (Mounjaro/Zepbound). Superior weight loss efficacy vs semaglutide. GIP component may preserve lean mass.',
    mechanism: 'Simultaneous activation of GIP and GLP-1 receptors produces additive metabolic effects. GIP also acts on adipocytes and may improve lean mass preservation.',
    benefits: ['20–22.5% body weight reduction (SURMOUNT-1)', 'Superior to semaglutide head-to-head', 'Better lean mass preservation', 'Strong visceral fat reduction', 'Excellent glycemic control'],
    dosing: { typical: '5–15 mg/week', range: 'Titrate: 2.5 → 5 → 7.5 → 10 → 12.5 → 15 mg over 20+ weeks', frequency: 'Once weekly', route: ['subcutaneous injection'], cycle: 'Chronic therapy', notes: 'Slower titration vs semaglutide. SURMOUNT trials showed best-in-class weight outcomes.' },
    sideEffects: 'Similar to semaglutide — nausea, GI upset. Some evidence of better GI tolerability than semaglutide. Same thyroid/pancreas precautions.',
    researchLevel: 'very_high',
    tags: ['FDA approved', 'GLP-1/GIP', 'weekly injection'],
  },

  {
    id: 'retatrutide',
    name: 'Retatrutide',
    fullName: 'Retatrutide (GLP-1/GIP/Glucagon triple agonist)',
    category: 'metabolic',
    route: ['subcutaneous injection'],
    goals: ['weight_loss', 'visceral_fat', 'metabolic_health', 'muscle_preservation'],
    summary: 'Triple incretin agonist (GLP-1 + GIP + glucagon receptors). Phase 2 data shows superior weight loss vs tirzepatide (~24% body weight). Not yet FDA approved.',
    mechanism: 'Adds glucagon receptor agonism to dual GLP-1/GIP action — increases energy expenditure and hepatic fat mobilization while preserving benefits of dual incretins.',
    benefits: ['~24% body weight reduction in Phase 2 trials', 'Most powerful weight loss peptide in development', 'Enhanced fat oxidation via glucagon component', 'Strong hepatic fat reduction'],
    dosing: { typical: '4–12 mg/week (investigational)', range: 'Titrate slowly — Phase 2 protocol: 2 → 4 → 8 → 12 mg', frequency: 'Once weekly', route: ['subcutaneous injection'], cycle: 'Compounded/research use — not FDA approved', notes: 'Compounded versions available. Follow titration carefully — glucagon component adds cardiovascular considerations.' },
    sideEffects: 'GI effects similar to or greater than tirzepatide. Potential for greater nausea. Glucagon component may affect glucose dynamics.',
    researchLevel: 'high',
    tags: ['Phase 2/3', 'triple agonist', 'not FDA approved'],
  },

  // ── BPC-157 Variants ─────────────────────────────────────────────────────────

  {
    id: 'bpc157_capsule',
    name: 'BPC-157 (Capsule)',
    fullName: 'Body Protection Compound 157 — Oral Capsule',
    category: 'healing',
    route: ['oral'],
    goals: ['gut_health', 'inflammation', 'recovery'],
    summary: 'Oral BPC-157 for GI-specific indications. Lower systemic bioavailability vs injection but direct gut mucosal action. Preferred route for IBD, leaky gut, GERD, and GI healing.',
    mechanism: 'Local action on GI mucosal cells. Upregulates growth hormone receptors, promotes local angiogenesis, modulates nitric oxide synthesis in the gut wall.',
    benefits: ['Direct mucosal healing for IBD, Crohn\'s, GERD', 'Leaky gut repair', 'Gastroprotective', 'Liver and intestinal cytoprotection', 'Systemic absorption still provides some whole-body benefits'],
    dosing: { typical: '250–500 mcg twice daily', range: '250–1000 mcg/day divided', frequency: 'Twice daily, away from food', route: ['oral capsule'], cycle: '4–12 weeks, can be chronic for GI conditions', notes: 'Take on empty stomach. For systemic effects, injectable form preferred. Capsule is the preferred route for GI pathology.' },
    sideEffects: 'Generally well-tolerated. Mild nausea possible.',
    researchLevel: 'moderate',
    tags: ['oral', 'GI health', 'capsule'],
  },

  {
    id: 'bpc157_cream',
    name: 'BPC-157 (Cream)',
    fullName: 'Body Protection Compound 157 — Topical Cream',
    category: 'healing',
    route: ['topical'],
    goals: ['recovery', 'inflammation', 'anti_aging'],
    summary: 'Topical BPC-157 for localized tissue healing, wound care, and skin repair. Applied directly to injury sites, surgical wounds, or areas of chronic inflammation.',
    mechanism: 'Transcutaneous absorption promotes local angiogenesis, fibroblast activation, and collagen deposition. Modulates local inflammatory cytokines.',
    benefits: ['Accelerated wound and incision healing', 'Localized tendon/ligament support', 'Skin regeneration and scar reduction', 'Arthritis and joint pain applied topically'],
    dosing: { typical: 'Apply thin layer to affected area 2–3x daily', range: 'Apply as directed by compounding pharmacy concentration', frequency: '2–3x daily', route: ['topical cream'], cycle: 'Continue until healed, typically 2–8 weeks', notes: 'Synergistic with injectable BPC-157. Apply to clean, dry skin. Concentrations vary by compounding pharmacy.' },
    sideEffects: 'Local skin irritation possible. Generally well-tolerated.',
    researchLevel: 'low_emerging',
    tags: ['topical', 'cream', 'localized healing'],
  },

  {
    id: 'bpc157_injection',
    name: 'BPC-157 (Injection)',
    fullName: 'Body Protection Compound 157 — Subcutaneous/IM Injection',
    category: 'healing',
    route: ['subcutaneous injection', 'intramuscular injection'],
    goals: ['recovery', 'inflammation', 'gut_health', 'injury', 'neuroprotection'],
    summary: 'Systemic BPC-157 via injection. Best systemic bioavailability. Gold standard for whole-body healing, tendon/ligament repair, and neuroprotection.',
    mechanism: 'Systemic: upregulates GH receptors, promotes angiogenesis via VEGF, modulates NO system, activates FAK-paxillin wound healing pathway. Crosses blood-brain barrier.',
    benefits: ['Fastest healing of tendons, ligaments, muscle tears', 'Systemic anti-inflammatory', 'Neuroprotective and potentially neurorestorative', 'GI cytoprotection at systemic level', 'Liver protection'],
    dosing: { typical: '200–500 mcg/day', range: '100–600 mcg/day', frequency: 'Once or twice daily', route: ['subcutaneous injection', 'intramuscular near injury site'], cycle: '4–12 weeks', notes: 'Inject near site of injury for local effect. Split into two doses (AM/PM) for greater coverage. Stable in bacteriostatic water.' },
    sideEffects: 'Well-tolerated. Mild nausea at higher doses. No known serious adverse effects in research to date.',
    researchLevel: 'moderate',
    tags: ['injection', 'systemic healing', 'workhorse peptide'],
  },

  // ── Anti-Inflammatory / GI ───────────────────────────────────────────────────

  {
    id: 'kpv',
    name: 'KPV',
    fullName: 'KPV (Lys-Pro-Val)',
    category: 'anti_inflammatory',
    route: ['oral', 'subcutaneous injection', 'topical'],
    goals: ['gut_health', 'inflammation', 'anti_aging'],
    summary: 'C-terminal tripeptide of alpha-MSH. Potent anti-inflammatory with gut mucosal healing properties. Particularly effective for IBD, Crohn\'s, and colitis.',
    mechanism: 'Acts on melanocortin receptors (MC1R, MC3R). Inhibits NF-κB pathway and pro-inflammatory cytokines (TNF-α, IL-6, IL-1β). Direct anti-inflammatory action in GI epithelium.',
    benefits: ['Powerful anti-inflammatory for gut and systemic use', 'Reduces colitis and IBD severity', 'Mucosal healing', 'Skin anti-inflammatory applications', 'Lower side effect profile vs steroids'],
    dosing: { typical: '500 mcg–1 mg/day', range: '250 mcg–2 mg/day', frequency: 'Once or twice daily', route: ['oral', 'subcutaneous injection', 'topical'], cycle: '4–12 weeks or chronic for IBD', notes: 'Oral effective for GI indications. Injectable for systemic anti-inflammatory effect. Can be stacked with BPC-157 for GI conditions.' },
    sideEffects: 'Generally well-tolerated. Mild GI upset possible orally.',
    researchLevel: 'low_emerging',
    tags: ['tripeptide', 'anti-inflammatory', 'gut healing'],
  },

  // ── Copper Peptides / Cosmetic ───────────────────────────────────────────────

  {
    id: 'ghk_cream',
    name: 'GHK 2% Cosmetic Cream',
    fullName: 'GHK-Cu 2% Copper Peptide Cosmetic Cream',
    category: 'cosmetic',
    route: ['topical'],
    goals: ['anti_aging', 'skin_health'],
    summary: 'Topical 2% GHK-Cu cream for skin rejuvenation. One of the best-studied cosmetic peptides. Stimulates collagen, reduces fine lines, improves skin density and elasticity.',
    mechanism: 'GHK-Cu (glycyl-l-histidyl-l-lysine copper complex) activates skin remodeling: stimulates collagen I, III, and IV synthesis, activates metalloproteinases for damaged protein removal, promotes keratinocyte and fibroblast proliferation.',
    benefits: ['Collagen synthesis stimulation', 'Reduces fine lines and wrinkles', 'Improves skin elasticity and density', 'Anti-inflammatory on skin', 'Wound healing acceleration', 'Antioxidant protection'],
    dosing: { typical: 'Apply thin layer to face/neck twice daily', range: 'As directed', frequency: 'Twice daily (AM/PM)', route: ['topical'], cycle: 'Ongoing — results typically seen at 8–12 weeks', notes: 'Apply after cleansing. Can be used with retinol on alternating evenings. Avoid eyes. Store cool and dark.' },
    sideEffects: 'Rare: mild skin irritation or redness initially. Copper may cause temporary blue-green tint on fair skin.',
    researchLevel: 'high',
    tags: ['topical', 'cosmetic', 'copper peptide', 'collagen'],
  },

  {
    id: 'ghk_hair',
    name: 'GHK-Cu Hair Solution',
    fullName: 'GHK-Cu Copper Peptide Hair Solution',
    category: 'cosmetic',
    route: ['topical'],
    goals: ['hair_growth', 'anti_aging'],
    summary: 'Topical GHK-Cu formulated for scalp and hair follicle application. Promotes hair follicle enlargement, reduces hair loss, and stimulates new growth.',
    mechanism: 'GHK-Cu activates hair follicle stem cells, upregulates vascular endothelial growth factor (VEGF) in follicle dermal papilla, enlarges follicle size, and extends anagen (growth) phase.',
    benefits: ['Promotes hair follicle enlargement', 'Extends hair growth (anagen) phase', 'Reduces miniaturization in androgenic alopecia', 'Stimulates new follicle activity', 'Anti-inflammatory on scalp'],
    dosing: { typical: 'Apply to scalp once or twice daily', range: 'Concentration varies (0.1–1% GHK-Cu)', frequency: '1–2x daily', route: ['topical scalp application'], cycle: 'Minimum 3–6 months for visible results', notes: 'Apply to clean, dry scalp. Massage in gently. Can be combined with minoxidil or other hair treatments. Results cumulative with continued use.' },
    sideEffects: 'Generally well-tolerated. Temporary scalp tingling. Possible blue-green tint from copper if over-applied.',
    researchLevel: 'moderate',
    tags: ['topical', 'hair', 'copper peptide', 'alopecia'],
  },

  // ── NAD+ ─────────────────────────────────────────────────────────────────────

  {
    id: 'nad_nasal',
    name: 'NAD+ Nasal Spray',
    fullName: 'NAD+ (Nicotinamide Adenine Dinucleotide) Intranasal',
    category: 'cellular',
    route: ['intranasal'],
    goals: ['mitochondrial', 'mental_clarity', 'fatigue', 'longevity', 'cellular_health'],
    summary: 'Intranasal NAD+ for systemic delivery with direct CNS access. NAD+ is a critical coenzyme in cellular energy production and DNA repair. Levels decline significantly with age.',
    mechanism: 'NAD+ is essential for mitochondrial function (electron transport chain), sirtuins (longevity pathways), PARP enzymes (DNA repair), and CD38 signaling. Intranasal route provides CNS delivery.',
    benefits: ['Improves cellular energy production', 'Activates sirtuin longevity pathways', 'DNA repair support', 'Mental clarity and cognitive function', 'Reduces fatigue', 'Anti-aging at cellular level'],
    dosing: { typical: '1–2 sprays per nostril, 1–2x daily', range: 'Per compounding pharmacy formulation (typically 50–100 mg/mL)', frequency: 'Daily or as needed', route: ['intranasal spray'], cycle: 'Can be used chronically. Many use 5-day loading courses quarterly.', notes: 'Fast onset for energy/cognitive effects. Synergistic with NAD+ precursors (NMN, NR). Less niacin flushing vs IV. Refrigerate.' },
    sideEffects: 'Mild nasal irritation. Occasional headache with first use. Generally well-tolerated.',
    researchLevel: 'moderate',
    tags: ['intranasal', 'NAD+', 'mitochondrial', 'longevity'],
  },

  {
    id: 'nad_injection',
    name: 'NAD+ Injection',
    fullName: 'NAD+ (Nicotinamide Adenine Dinucleotide) Injection',
    category: 'cellular',
    route: ['subcutaneous injection', 'intravenous'],
    goals: ['mitochondrial', 'mental_clarity', 'fatigue', 'longevity', 'cellular_health', 'recovery'],
    summary: 'Injectable NAD+ — subcutaneous or IV. Highest bioavailability and strongest acute effects. IV NAD+ infusions used for addiction, neurological conditions, and aggressive anti-aging protocols.',
    mechanism: 'Same as nasal NAD+ — direct cellular delivery. IV/SQ bypasses GI and liver first-pass, maximizing systemic NAD+ elevation rapidly.',
    benefits: ['Rapid, significant NAD+ repletion', 'Strongest cognitive clarity and energy effects', 'IV use in addiction medicine and neurological recovery', 'Maximum mitochondrial support'],
    dosing: { typical: 'SQ: 50–100 mg/day. IV: 250–1000 mg per infusion', range: 'SQ: 25–200 mg/day. IV: 100–2000 mg per session', frequency: 'SQ: daily. IV: 1–5 days loading, then weekly or monthly maintenance', route: ['subcutaneous injection', 'intravenous infusion'], cycle: 'Loading course then maintenance. SQ can be daily.', notes: 'IV must be administered slowly (2–4 hours) to avoid flushing, nausea, and chest tightness. SQ much better tolerated. Consider monitoring liver enzymes with chronic high-dose use.' },
    sideEffects: 'IV: Flushing, nausea, chest tightness, muscle cramping if infused too fast. SQ: mild injection site discomfort.',
    researchLevel: 'moderate',
    tags: ['injection', 'IV', 'NAD+', 'longevity', 'high impact'],
  },

  // ── Growth Hormone / HGH ─────────────────────────────────────────────────────

  {
    id: 'omnitrope',
    name: 'Omnitrope',
    fullName: 'Omnitrope (Somatropin) — recombinant Human Growth Hormone',
    category: 'growth_hormone',
    route: ['subcutaneous injection'],
    goals: ['muscle_mass', 'fat_loss', 'anti_aging', 'recovery', 'sleep', 'longevity'],
    summary: 'FDA-approved recombinant human growth hormone (rHGH). Brand name: Omnitrope. The gold standard GH replacement — provides exogenous GH directly. Used for GH deficiency and off-label anti-aging.',
    mechanism: 'Direct GH receptor agonism — stimulates IGF-1 production in the liver and peripheral tissues. Promotes lipolysis, protein synthesis, bone density, and cellular repair.',
    benefits: ['Direct GH replacement', 'Most potent for lean mass and fat loss', 'Improved body composition', 'Skin and connective tissue quality', 'Deep wave sleep enhancement', 'IGF-1 elevation'],
    dosing: { typical: '1–3 IU/day', range: '0.5–6 IU/day (clinical doses vary)', frequency: 'Daily injection, typically pre-sleep', route: ['subcutaneous injection'], cycle: '3–6 month cycles with breaks; some protocols are chronic', notes: 'Pre-sleep injection mimics natural GH pulse. Monitor IGF-1, fasting glucose, and thyroid. Finger-stick BG monitoring recommended. Requires prescription.' },
    sideEffects: 'Water retention, carpal tunnel, joint pain, potential insulin resistance, increased fasting glucose. Risk of acromegaly at excessive doses.',
    researchLevel: 'very_high',
    tags: ['FDA approved', 'prescription only', 'rHGH', 'direct GH'],
  },

  // ── Neuropeptides / Wellness ─────────────────────────────────────────────────

  {
    id: 'oxytocin',
    name: 'Oxytocin',
    fullName: 'Oxytocin (neuropeptide)',
    category: 'neuro',
    route: ['subcutaneous injection', 'intranasal'],
    goals: ['mental_clarity', 'wellbeing', 'sexual_function', 'fertility', 'fatigue'],
    summary: 'Endogenous neuropeptide. The "bonding hormone." Used therapeutically for social anxiety, PTSD, post-partum support, sexual function, and overall wellbeing.',
    mechanism: 'Activates oxytocin receptors in hypothalamus, amygdala, and peripheral tissues. Modulates dopamine and serotonin pathways. Anti-anxiety, pro-social, analgesic, and anti-inflammatory effects.',
    benefits: ['Reduces social anxiety and fear response', 'Improves mood and bonding', 'Enhances sexual experience and function', 'Post-partum support', 'Chronic pain modulation', 'Anti-inflammatory effects'],
    dosing: { typical: 'Intranasal: 20–40 IU as needed. SQ: 10–40 IU', range: '10–80 IU depending on indication and route', frequency: 'As needed (social situations, intimacy) or daily for therapeutic use', route: ['intranasal', 'subcutaneous injection'], cycle: 'As needed or therapeutic cycles of 4–12 weeks', notes: 'Intranasal preferred for CNS effects. SQ for systemic/chronic use. Intranasal: 1–2 sprays each nostril. Store refrigerated.' },
    sideEffects: 'Generally well-tolerated. Possible uterine contractions (contraindicated in pregnancy). Occasional headache. Rare blood pressure changes.',
    researchLevel: 'high',
    tags: ['neuropeptide', 'wellbeing', 'intranasal', 'injection'],
  },

  {
    id: 'pt141',
    name: 'PT-141',
    fullName: 'Bremelanotide (PT-141)',
    category: 'sexual_health',
    route: ['subcutaneous injection', 'intranasal'],
    goals: ['sexual_function', 'fertility', 'wellbeing'],
    summary: 'Melanocortin receptor agonist. FDA approved (Vyleesi) for HSDD in premenopausal women. Off-label for male sexual dysfunction. Central mechanism — acts on desire, not just blood flow.',
    mechanism: 'Activates MC3R and MC4R in the hypothalamus and limbic system. Distinctly different from PDE5 inhibitors — works centrally on desire and arousal pathways.',
    benefits: ['Increases sexual desire and arousal (both sexes)', 'Effective in men unresponsive to PDE5 inhibitors', 'Addresses both physical and psychological components', 'FDA approved for women (HSDD)'],
    dosing: { typical: '1–2 mg as needed', range: '0.5–2 mg', frequency: '45–90 minutes before activity, as needed', route: ['subcutaneous injection', 'intranasal'], cycle: 'As needed — tolerance develops with frequent use', notes: 'Start low (0.5–1 mg) to assess tolerance. Not for daily use. Avoid in hypertension or CVD history. Nausea dose-dependent.' },
    sideEffects: 'Nausea (most common, dose-dependent), facial flushing, transient BP elevation. Hyperpigmentation with chronic use at high doses.',
    researchLevel: 'high',
    tags: ['FDA approved', 'sexual health', 'melanocortin'],
  },

  {
    id: 'selank',
    name: 'Selank',
    fullName: 'Selank (Thr-Lys-Pro-Arg-Pro-Gly-Pro)',
    category: 'neuro',
    route: ['intranasal', 'subcutaneous injection'],
    goals: ['mental_clarity', 'anxiety', 'fatigue', 'cognitive', 'immune'],
    summary: 'Synthetic tuftsin analogue. Anxiolytic and nootropic developed in Russia. Approved pharmaceutical in Russia/CIS. No sedation or dependence — clean anxiolytic profile.',
    mechanism: 'Stabilizes enkephalins, modulates GABA-A receptor, increases BDNF, regulates IL-6 and cytokine balance, affects monoamine neurotransmitter turnover.',
    benefits: ['Anxiolytic without sedation or dependence', 'Cognitive enhancement — memory and learning', 'Immune modulation (antiviral)', 'Reduces mental fatigue', 'Antidepressant effects in some users'],
    dosing: { typical: '250–500 mcg/day', range: '100–1000 mcg/day', frequency: 'Once or twice daily', route: ['intranasal (preferred)', 'subcutaneous injection'], cycle: '2–4 weeks on, break, repeat as needed', notes: 'Intranasal fast onset. Often stacked with Semax for cognitive optimization. Store refrigerated.' },
    sideEffects: 'Mild fatigue initially. Occasional mild headache. No withdrawal or dependence noted.',
    researchLevel: 'moderate',
    tags: ['intranasal', 'nootropic', 'anxiolytic', 'Russia approved'],
  },

  {
    id: 'semax',
    name: 'Semax',
    fullName: 'Semax (ACTH 4-7 Pro8 Gly9 Pro10)',
    category: 'neuro',
    route: ['intranasal'],
    goals: ['mental_clarity', 'cognitive', 'fatigue', 'neuroprotection', 'recovery'],
    summary: 'ACTH-derived nootropic. Among the most studied cognitive peptides. Approved pharmaceutical in Russia for stroke, TBI, and cognitive disorders.',
    mechanism: 'Stimulates BDNF and NGF production, modulates dopaminergic and serotonergic transmission, neuroprotective via Bcl-2, improves cerebral circulation.',
    benefits: ['Strong cognitive enhancement — memory, focus, processing speed', 'Neuroprotection and neuroregeneration', 'Reduces mental fatigue', 'Mood elevation', 'Stroke and TBI recovery support'],
    dosing: { typical: '300–900 mcg/day', range: '200 mcg–2 mg/day', frequency: 'Once or twice daily (morning preferred)', route: ['intranasal'], cycle: '2–4 weeks on, 2 weeks off', notes: 'Intranasal only practical route. Cognitive effects typically noticeable within days. Stack with Selank for anxiety + cognition protocol.' },
    sideEffects: 'Mild anxiety or irritability at high doses. Transient headache. Generally well-tolerated.',
    researchLevel: 'moderate',
    tags: ['intranasal', 'nootropic', 'BDNF', 'Russia approved'],
  },

  // ── GHRH Analogues / GH Secretagogues ────────────────────────────────────────

  {
    id: 'sermorelin',
    name: 'Sermorelin',
    fullName: 'Sermorelin (GHRH 1-29)',
    category: 'growth_hormone',
    route: ['subcutaneous injection'],
    goals: ['muscle_mass', 'fat_loss', 'sleep', 'recovery', 'anti_aging', 'longevity'],
    summary: 'First 29 amino acids of endogenous GHRH. Stimulates natural, pulsatile GH release from pituitary. FDA approved. Considered the most physiological GHRH analogue.',
    mechanism: 'Binds GHRH receptor on pituitary somatotrophs — triggers natural GH pulse. Preserves pituitary responsiveness and feedback loop. Downstream IGF-1 elevation.',
    benefits: ['Stimulates natural GH release', 'Improves sleep quality (deep wave sleep)', 'Improves body composition over time', 'Anti-aging effects on skin and connective tissue', 'FDA approved, well-studied', 'Preserves pituitary axis integrity'],
    dosing: { typical: '200–500 mcg/day', range: '100–600 mcg/day', frequency: 'Once daily, 30–60 min before sleep', route: ['subcutaneous injection'], cycle: '3–6 months, then break to assess', notes: 'Pre-sleep injection maximizes GH pulse during stage 3–4 sleep. Fasted injection preferred. Often combined with GHRP for synergistic effect.' },
    sideEffects: 'Water retention, mild headache, facial flushing, injection site reactions.',
    researchLevel: 'high',
    tags: ['GHRH analogue', 'FDA approved', 'physiological GH'],
  },

  {
    id: 'sermorelin_nasal',
    name: 'Sermorelin Nasal Spray',
    fullName: 'Sermorelin — Intranasal Formulation',
    category: 'growth_hormone',
    route: ['intranasal'],
    goals: ['muscle_mass', 'fat_loss', 'sleep', 'recovery', 'anti_aging'],
    summary: 'Intranasal sermorelin for needle-free GH stimulation. Lower bioavailability vs injection but convenient option for needle-averse patients. Good for sleep optimization protocol.',
    mechanism: 'Same GHRH receptor mechanism as injectable sermorelin. Intranasal absorption via nasal mucosa provides direct CNS delivery and systemic absorption.',
    benefits: ['Needle-free GH stimulation', 'Improved sleep quality', 'Convenient daily protocol', 'Anti-aging benefits', 'Suitable for patients averse to injection'],
    dosing: { typical: '1–2 sprays (200–400 mcg) per nostril before sleep', range: '100–600 mcg total dose', frequency: 'Once nightly', route: ['intranasal spray'], cycle: '3–6 months', notes: 'Use 30–60 min before sleep. Absorption ~20–30% of SQ bioavailability — dose accordingly. Keep refrigerated.' },
    sideEffects: 'Nasal irritation, mild congestion. Systemic effects same as injectable at equivalent doses.',
    researchLevel: 'moderate',
    tags: ['intranasal', 'GHRH', 'needle-free', 'sleep'],
  },

  {
    id: 'tb500',
    name: 'TB-500',
    fullName: 'Thymosin Beta-4 (synthetic fragment TB-500)',
    category: 'healing',
    route: ['subcutaneous injection', 'intramuscular injection'],
    goals: ['recovery', 'injury', 'inflammation', 'muscle_mass', 'cardiac_health'],
    summary: 'Synthetic Thymosin Beta-4 fragment. Potent tissue repair and regeneration peptide. Often stacked with BPC-157 for accelerated healing protocols.',
    mechanism: 'Sequesters actin monomers, promotes cell migration and proliferation, upregulates metalloproteinases, stimulates angiogenesis. Promotes cardiac and neural repair.',
    benefits: ['Accelerates healing of muscle, tendon, ligament', 'Reduces scar tissue formation', 'Cardiac tissue repair', 'Neurological regeneration potential', 'Reduces chronic inflammation', 'Improves flexibility'],
    dosing: { typical: '2–2.5 mg twice weekly', range: '1–5 mg per injection', frequency: '2x/week loading, then 1x/week maintenance', route: ['subcutaneous injection', 'intramuscular injection'], cycle: '4–6 week loading, then maintenance', notes: 'Classic stack: BPC-157 + TB-500 for synergistic healing. Loading phase is key. Systemic — inject anywhere (abdomen preferred).' },
    sideEffects: 'Mild fatigue or lethargy. Transient head rush post-injection. Well-tolerated overall.',
    researchLevel: 'moderate',
    tags: ['healing', 'regeneration', 'stacked with BPC-157'],
  },

  {
    id: 'aod9604',
    name: 'AOD-9604',
    fullName: 'AOD-9604 (Anti-Obesity Drug 9604)',
    category: 'metabolic',
    route: ['subcutaneous injection'],
    goals: ['fat_loss', 'visceral_fat', 'metabolic_health'],
    summary: 'C-terminal fragment of HGH (hGH 176-191). Mimics the fat-metabolizing properties of HGH without affecting IGF-1 or blood glucose. Targeted lipolytic agent.',
    mechanism: 'Activates beta-3 adrenergic receptors on fat cells to stimulate lipolysis. Inhibits lipogenesis. Does NOT bind GH receptor — thus no IGF-1 effects or glucose interference.',
    benefits: ['Targeted fat loss — especially abdominal/visceral', 'No effect on blood glucose (safe for diabetics)', 'No IGF-1 elevation', 'Potential cartilage repair benefits', 'Can stack with GH peptides without synergistic glucose effects'],
    dosing: { typical: '300–500 mcg/day', range: '200–600 mcg/day', frequency: 'Once daily, fasted (morning preferred)', route: ['subcutaneous injection'], cycle: '12–16 weeks', notes: 'Inject fasted for maximum lipolytic effect. Combine with caloric restriction and exercise. Can stack with Ipamorelin/CJC for comprehensive body composition.' },
    sideEffects: 'Generally very well-tolerated. Mild injection site reaction.',
    researchLevel: 'moderate',
    tags: ['fat loss', 'HGH fragment', 'lipolytic', 'no IGF-1 effect'],
  },

  {
    id: 'tesamorelin',
    name: 'Tesamorelin',
    fullName: 'Tesamorelin (GHRH analogue)',
    category: 'growth_hormone',
    route: ['subcutaneous injection'],
    goals: ['fat_loss', 'visceral_fat', 'muscle_mass', 'cognitive', 'anti_aging'],
    summary: 'FDA-approved GHRH analogue. Originally approved for HIV-associated lipodystrophy. Potent visceral fat reduction with GH stimulation. Strong evidence base.',
    mechanism: 'Binds GHRH receptor — stimulates pulsatile GH release with downstream IGF-1 elevation. Specifically studied for visceral adiposity reduction via GH/IGF-1 lipolytic axis.',
    benefits: ['Significant visceral fat reduction (FDA-approved indication)', 'Lean mass preservation and improvement', 'IGF-1 elevation', 'Cognitive benefits in older adults', 'Cardiovascular risk marker improvement'],
    dosing: { typical: '1–2 mg/day', range: '1–2 mg/day', frequency: 'Once daily, pre-sleep or morning fasted', route: ['subcutaneous injection'], cycle: '3–6 months; FDA data supports chronic use', notes: 'Most potent GHRH analogue for visceral fat. Monitor IGF-1 quarterly. Best studied GHRH in humans for body composition.' },
    sideEffects: 'Injection site reactions, arthralgia, water retention. Monitor glucose (less effect than exogenous HGH but present).',
    researchLevel: 'very_high',
    tags: ['FDA approved', 'GHRH', 'visceral fat', 'potent'],
  },

  {
    id: 'ipamorelin',
    name: 'Ipamorelin',
    fullName: 'Ipamorelin (selective GH secretagogue)',
    category: 'growth_hormone',
    route: ['subcutaneous injection'],
    goals: ['muscle_mass', 'fat_loss', 'sleep', 'recovery', 'anti_aging', 'longevity'],
    summary: 'Selective GH secretagogue and ghrelin receptor agonist. The cleanest GH-releasing peptide — minimal cortisol, prolactin, or ACTH elevation.',
    mechanism: 'Selectively activates GHS-R1a (ghrelin receptor) on pituitary somatotrophs. Stimulates GH release with minimal effect on other pituitary hormones — cleaner profile than GHRP-2 or GHRP-6.',
    benefits: ['Clean GH release without cortisol spike', 'Lean body composition', 'Deep wave sleep quality', 'Recovery enhancement', 'Anti-aging effects', 'Long-term use compatibility'],
    dosing: { typical: '200–300 mcg/injection', range: '100–500 mcg/injection', frequency: '1–3x daily — fasted or pre-sleep', route: ['subcutaneous injection'], cycle: 'Can be used long-term. 3–6 month cycles common.', notes: 'Gold standard: Ipamorelin + CJC-1295 (no DAC) = large physiological GH pulse. Inject 30–60 min before sleep.' },
    sideEffects: 'Very well-tolerated. Mild water retention, transient tingling, hunger at high doses.',
    researchLevel: 'high',
    tags: ['GH secretagogue', 'clean profile', 'gold standard stack'],
  },

  {
    id: 'cjc1295',
    name: 'CJC-1295 (No DAC)',
    fullName: 'CJC-1295 without DAC (Modified GRF 1-29)',
    category: 'growth_hormone',
    route: ['subcutaneous injection'],
    goals: ['muscle_mass', 'fat_loss', 'sleep', 'recovery', 'anti_aging'],
    summary: 'Modified GHRH 1-29 without Drug Affinity Complex. Short half-life creates physiological GH pulse. Combined with Ipamorelin as the premier GH-stimulating stack.',
    mechanism: 'Binds GHRH receptors on pituitary with ~30-minute half-life — creates single, large, physiological GH pulse when combined with GHRP like Ipamorelin.',
    benefits: ['Physiological pulsatile GH release', 'Synergistic with Ipamorelin', 'Lean mass and fat loss over time', 'Sleep quality improvement', 'Anti-aging effects on skin and joints'],
    dosing: { typical: '100–300 mcg/injection', range: '100–300 mcg', frequency: '1–3x daily, fasted', route: ['subcutaneous injection'], cycle: '3–6 months', notes: 'Always combine with Ipamorelin or another GHRP for maximum GH pulse. Inject simultaneously in same or adjacent sites. Pre-sleep timing optimal.' },
    sideEffects: 'Water retention, mild fatigue, tingling. Well-tolerated.',
    researchLevel: 'high',
    tags: ['GHRH', 'no DAC', 'combination peptide'],
  },

  {
    id: 'ipamorelin_cjc',
    name: 'Ipamorelin/CJC',
    fullName: 'Ipamorelin + CJC-1295 (No DAC) — Combination',
    category: 'growth_hormone',
    route: ['subcutaneous injection'],
    goals: ['muscle_mass', 'fat_loss', 'sleep', 'recovery', 'anti_aging', 'longevity'],
    summary: 'The gold standard GH peptide combination. Ipamorelin (GHRP) + CJC-1295 No DAC (GHRH) together produce a large, synergistic, physiological GH pulse superior to either alone.',
    mechanism: 'Dual-mechanism synergy: GHRH (CJC) primes the pituitary, GHRP (Ipamorelin) amplifies the GH pulse via separate receptor pathway. Together produce 2–4x the GH release of either alone.',
    benefits: ['Maximum physiological GH stimulation', 'Enhanced lean mass and fat loss vs either peptide alone', 'Superior sleep quality improvement', 'Accelerated recovery and tissue repair', 'Comprehensive anti-aging effects'],
    dosing: { typical: 'Ipamorelin 200–300 mcg + CJC 100–300 mcg per injection', range: 'Both dosed equally — 100–300 mcg each', frequency: '1–3x daily, fasted — bedtime injection preferred', route: ['subcutaneous injection'], cycle: '3–6 months', notes: 'Mix in same syringe or inject separately at adjacent sites. Pre-sleep is highest yield timing. This is the preferred protocol for most body composition and anti-aging goals.' },
    sideEffects: 'Mild water retention, tingling, morning grogginess if overdosed. Generally very well tolerated.',
    researchLevel: 'high',
    tags: ['combination', 'gold standard', 'GH stack', 'most popular'],
  },

  // ── Mitochondrial ────────────────────────────────────────────────────────────

  {
    id: 'ss31',
    name: 'SS-31',
    fullName: 'SS-31 (Elamipretide) — Szeto-Schiller peptide 31',
    category: 'mitochondrial',
    route: ['subcutaneous injection'],
    goals: ['mitochondrial', 'cellular_health', 'longevity', 'recovery', 'cardiac_health'],
    summary: 'Mitochondria-targeted antioxidant peptide. Localizes to the inner mitochondrial membrane (cardiolipin). Restores mitochondrial function in aging and disease.',
    mechanism: 'Concentrates in the inner mitochondrial membrane by binding cardiolipin. Reduces mitochondrial ROS, restores electron transport chain efficiency, prevents mPTP opening. Cardioprotective.',
    benefits: ['Restores mitochondrial bioenergetics', 'Reduces mitochondrial oxidative stress', 'Cardioprotective — studied in heart failure', 'Renal protective', 'Improves exercise capacity in aging', 'Enhances cellular ATP production'],
    dosing: { typical: '0.25–0.5 mg/kg/day (or 20–40 mg flat dose)', range: '10–80 mg/day depending on protocol', frequency: 'Daily or every other day', route: ['subcutaneous injection'], cycle: '4–12 weeks, 1–2x per year', notes: 'Emerging longevity protocol. Often combined with MOTS-c and Humanin for comprehensive mitochondrial support. Store at -20°C.' },
    sideEffects: 'Limited human data outside clinical trials. Injection site reactions. Generally well-tolerated in trials.',
    researchLevel: 'moderate',
    tags: ['mitochondrial', 'cardiolipin', 'anti-aging', 'SS peptide'],
  },

  {
    id: 'motsc',
    name: 'MOTS-c',
    fullName: 'MOTS-c (Mitochondrial Open Reading Frame of 12S rRNA-c)',
    category: 'mitochondrial',
    route: ['subcutaneous injection'],
    goals: ['mitochondrial', 'longevity', 'muscle_mass', 'fat_loss', 'metabolic_health', 'cellular_health'],
    summary: 'Mitochondrial-derived peptide (MDP). Regulates metabolic homeostasis, exercise capacity, and aging. Declines significantly with age. Mimics exercise at the cellular level.',
    mechanism: 'Activates AMPK pathway, improves mitochondrial function and biogenesis, regulates glucose utilization, anti-inflammatory via nuclear translocation to regulate gene expression.',
    benefits: ['Improves insulin sensitivity and metabolic health', 'Mimics exercise benefits on mitochondria', 'Increases exercise capacity and endurance', 'Anti-inflammatory', 'Extends lifespan in animal models', 'Regulates body weight'],
    dosing: { typical: '5–10 mg/week', range: '2.5–15 mg/week', frequency: 'Daily or every other day', route: ['subcutaneous injection'], cycle: '4–8 weeks, 1–2x per year', notes: 'Exercise synergy is significant — best outcomes when combined with physical activity. Emerging protocols still being established.' },
    sideEffects: 'Limited human data. Generally well-tolerated. Injection site reactions.',
    researchLevel: 'low_emerging',
    tags: ['mitochondrial', 'MDP', 'AMPK', 'metabolic'],
  },

  // ── Fertility / Hormonal ─────────────────────────────────────────────────────

  {
    id: 'hcg',
    name: 'hCG (Pregnyl/Novarel/Ovidrel)',
    fullName: 'Human Chorionic Gonadotropin (hCG)',
    category: 'hormonal',
    route: ['subcutaneous injection', 'intramuscular injection'],
    goals: ['fertility', 'hormonal_balance', 'sexual_function', 'muscle_mass'],
    summary: 'Human chorionic gonadotropin. LH analogue — stimulates testosterone production and maintains testicular/ovarian function. FDA approved. Critical for fertility and testosterone therapy adjuncts.',
    mechanism: 'Mimics LH — binds LH receptors on Leydig cells (testes) and corpus luteum (ovaries). Stimulates testosterone and progesterone synthesis. Maintains gonadal function during testosterone therapy.',
    benefits: ['Maintains natural testosterone production during TRT', 'Testicular volume preservation during TRT', 'Fertility support for men on TRT', 'Ovulation induction in women (fertility)', 'Stimulates testosterone in hypogonadal men'],
    dosing: { typical: 'Men (TRT adjunct): 250–500 IU 2–3x/week. Fertility: 1000–2000 IU 3x/week', range: '250–5000 IU depending on indication', frequency: '2–3x weekly (SQ or IM)', route: ['subcutaneous injection', 'intramuscular injection'], cycle: 'Ongoing during TRT; cycles for fertility', notes: 'Requires prescription. Reconstitute with bacteriostatic water. Store refrigerated after reconstitution. Monitor LH/FSH/testosterone levels.' },
    sideEffects: 'Gynecomastia (aromatization to estradiol), acne, water retention. Testicular achiness. Desensitization with chronic high-dose use.',
    researchLevel: 'very_high',
    tags: ['FDA approved', 'fertility', 'LH analogue', 'TRT adjunct'],
  },

  {
    id: 'gonadorelin',
    name: 'Gonadorelin',
    fullName: 'Gonadorelin (GnRH analogue)',
    category: 'hormonal',
    route: ['subcutaneous injection'],
    goals: ['fertility', 'hormonal_balance'],
    summary: 'Synthetic GnRH (gonadotropin-releasing hormone). Stimulates pituitary release of LH and FSH. Used as hCG alternative during TRT to maintain HPG axis function.',
    mechanism: 'Pulsatile activation of GnRH receptors on pituitary gonadotrophs → LH and FSH release → downstream testosterone and spermatogenesis. Pulsatile administration is key.',
    benefits: ['Maintains HPG axis during TRT', 'Preserves testicular function and size', 'Maintains fertility on testosterone therapy', 'Lower estrogen conversion vs hCG', 'Maintains FSH (sperm production)'],
    dosing: { typical: '100 mcg twice weekly', range: '50–200 mcg per dose, 2–3x weekly', frequency: '2–3x weekly SQ', route: ['subcutaneous injection'], cycle: 'Ongoing during testosterone therapy', notes: 'Increasingly preferred over hCG due to lower aromatization. Pulsatile SQ injections mimic natural GnRH secretion. Monitor LH, FSH, testosterone levels.' },
    sideEffects: 'Injection site reactions. Less gynecomastia risk than hCG. Headache occasionally.',
    researchLevel: 'high',
    tags: ['GnRH', 'fertility', 'TRT adjunct', 'HPG axis'],
  },

  {
    id: 'kisspeptin',
    name: 'Kisspeptin-10',
    fullName: 'Kisspeptin-10',
    category: 'hormonal',
    route: ['subcutaneous injection'],
    goals: ['fertility', 'hormonal_balance', 'sexual_function'],
    summary: 'Endogenous neuropeptide activating GnRH neurons. Key regulator of HPG axis. Used in fertility medicine. Stimulates natural LH/FSH release upstream of GnRH.',
    mechanism: 'Activates KISS1R (GPR54) on GnRH neurons in the hypothalamus → GnRH pulse → LH/FSH release → sex hormone production. Most upstream HPG axis intervention.',
    benefits: ['Stimulates LH and FSH release', 'Supports natural testosterone in men', 'Fertility treatment — IVF protocols', 'Regulates HPG axis naturally', 'Sexual desire and arousal'],
    dosing: { typical: '1–2 mcg/kg body weight', range: '0.5–3 mcg/kg', frequency: 'Pulsatile (every 90–120 min mimics physiology) or 1–2x/day', route: ['subcutaneous injection'], cycle: '2–4 week cycles', notes: 'Pulsatile admin most physiological. Used clinically in IVF. Emerging fertility medicine. Human clinical trial data from UK fertility programs.' },
    sideEffects: 'Facial flushing, mild nausea at higher doses. Generally well-tolerated.',
    researchLevel: 'high',
    tags: ['fertility', 'HPG axis', 'kisspeptin', 'GnRH upstream'],
  },

  // ── Immune / Thymic ──────────────────────────────────────────────────────────

  {
    id: 'thymosin_alpha1',
    name: 'Thymosin Alpha-1',
    fullName: 'Thymosin Alpha-1 (Tα1)',
    category: 'immune',
    route: ['subcutaneous injection'],
    goals: ['immune_health', 'longevity', 'anti_aging', 'fatigue', 'cellular_health'],
    summary: 'Thymic peptide. Powerful immune modulator and regulator. FDA Orphan Drug designation. Used globally for chronic infections, immune deficiency, and cancer immunotherapy.',
    mechanism: 'Activates dendritic cells, NK cells, and T-lymphocytes. Upregulates MHC class II expression. Modulates Th1/Th2 balance. Activates TLR9 signaling. Direct immune surveillance enhancement.',
    benefits: ['Immune system normalization and enhancement', 'Improves response to chronic viral infections (Hep B/C, HIV)', 'Used alongside cancer immunotherapy', 'Reduces immunosenescence (immune aging)', 'Antifungal and antimicrobial properties', 'Reduces fatigue in immune-compromised patients'],
    dosing: { typical: '1.6 mg twice weekly', range: '0.8–3.2 mg, 2–3x/week', frequency: '2x weekly SQ', route: ['subcutaneous injection'], cycle: '4–12 weeks; some chronic protocols for longevity', notes: 'Thymosin Alpha-1 used in over 35 countries (brand: Zadaxin). FDA orphan status. Excellent safety profile across decades of research.' },
    sideEffects: 'Excellent safety profile. Mild injection site reaction. Rare: mild flu-like symptoms.',
    researchLevel: 'high',
    tags: ['immune', 'thymic', 'Zadaxin', 'immunomodulator'],
  },

  // ── GH Secretagogues ─────────────────────────────────────────────────────────

  {
    id: 'hexarelin',
    name: 'Hexarelin',
    fullName: 'Hexarelin (GHRP-6 analogue)',
    category: 'growth_hormone',
    route: ['subcutaneous injection'],
    goals: ['muscle_mass', 'fat_loss', 'cardiac_health', 'recovery', 'anti_aging'],
    summary: 'Most potent GHRP (growth hormone releasing peptide). Also has direct cardiac receptor agonism independent of GH release. Used for body composition and cardiac support.',
    mechanism: 'Activates GHS-R1a and CD36 cardiac receptors. Produces the highest GH release among GHRPs. Cardiac effects (anti-apoptotic, protective) are GH-independent via CD36.',
    benefits: ['Strongest GH pulse of all GHRPs', 'Direct cardiac protection via CD36', 'Significant lean mass improvement', 'Fat loss', 'Post-MI cardiac recovery (investigational)', 'GH-independent cytoprotective effects'],
    dosing: { typical: '100–200 mcg/injection', range: '50–300 mcg', frequency: '2–3x daily fasted', route: ['subcutaneous injection'], cycle: '4–8 weeks (rapid desensitization limits longer use)', notes: 'Desensitizes faster than Ipamorelin — cycle off regularly. Causes more hunger (via ghrelin) than Ipamorelin. Powerful but less forgiving than Ipamorelin.' },
    sideEffects: 'Significant hunger, water retention, elevated cortisol and prolactin (more than Ipamorelin). Facial flushing.',
    researchLevel: 'moderate',
    tags: ['GHRP', 'most potent GH', 'cardiac', 'desensitization risk'],
  },

  {
    id: 'mk677',
    name: 'MK-677',
    fullName: 'MK-677 (Ibutamoren) — oral GH secretagogue',
    category: 'growth_hormone',
    route: ['oral'],
    goals: ['muscle_mass', 'fat_loss', 'sleep', 'recovery', 'anti_aging', 'longevity'],
    summary: 'Oral GHS-R1a agonist (ghrelin mimetic). Non-peptide oral compound. Only oral GH secretagogue. Significant GH/IGF-1 elevation with once-daily oral dosing.',
    mechanism: 'Orally active ghrelin receptor agonist — stimulates pituitary GH release. Elevates IGF-1 significantly. Long half-life (~24h) provides sustained GH elevation vs pulsatile peptide protocols.',
    benefits: ['Oral — no injections required', 'Significant GH and IGF-1 elevation', 'Muscle mass and fat loss', 'Deep wave sleep enhancement', 'Bone density improvement', 'Skin and hair quality'],
    dosing: { typical: '10–25 mg/day', range: '10–50 mg/day', frequency: 'Once daily, pre-sleep', route: ['oral'], cycle: '3–6 months, then break', notes: 'Pre-sleep dosing maximizes GH pulse during sleep. Hunger is a significant side effect — time around dinner. Monitor fasting glucose. Not technically a peptide (small molecule) but used in peptide protocols.' },
    sideEffects: 'Significant hunger (ghrelin effect), water retention, increased fasting glucose, insulin resistance at higher doses, fatigue.',
    researchLevel: 'high',
    tags: ['oral', 'ghrelin mimetic', 'non-injectable', 'IGF-1'],
  },

  {
    id: 'ghrp2',
    name: 'GHRP-2',
    fullName: 'GHRP-2 (Growth Hormone Releasing Peptide 2)',
    category: 'growth_hormone',
    route: ['subcutaneous injection'],
    goals: ['muscle_mass', 'fat_loss', 'recovery', 'anti_aging'],
    summary: 'Second-generation GHRP. Potent GH release with moderate cortisol and prolactin elevation. Stronger than GHRP-6 for GH release with less hunger.',
    mechanism: 'Synthetic agonist of GHS-R1a (ghrelin receptor). Stimulates GH release from pituitary. More potent than GHRP-6 on a mcg-for-mcg basis with less ghrelin-mediated hunger.',
    benefits: ['Strong GH pulse', 'Better cortisol/prolactin profile than GHRP-6', 'Less hunger than GHRP-6', 'Lean mass and fat loss', 'Synergistic with GHRH analogues'],
    dosing: { typical: '100–200 mcg/injection', range: '50–300 mcg', frequency: '2–3x daily fasted', route: ['subcutaneous injection'], cycle: '4–8 weeks', notes: 'Combine with Sermorelin or CJC-1295 for synergistic GH pulse. Less hunger than GHRP-6. Better suited for daytime dosing than GHRP-6.' },
    sideEffects: 'Moderate cortisol and prolactin elevation, water retention, hunger (less than GHRP-6).',
    researchLevel: 'moderate',
    tags: ['GHRP', 'second gen', 'GH secretagogue'],
  },

  {
    id: 'ghrp6',
    name: 'GHRP-6',
    fullName: 'GHRP-6 (Growth Hormone Releasing Peptide 6)',
    category: 'growth_hormone',
    route: ['subcutaneous injection'],
    goals: ['muscle_mass', 'fat_loss', 'recovery', 'gut_health'],
    summary: 'First-generation GHRP. Potent GH release with strongest appetite stimulation of the GHRPs. Used for GH stimulation and also explored for GI healing (shares mechanism with ghrelin).',
    mechanism: 'First identified GHS-R1a agonist. Stimulates GH release and strongly activates ghrelin pathway — significant appetite stimulation. Gastroprotective properties similar to BPC-157 via ghrelin mechanism.',
    benefits: ['Strong GH pulse', 'Significant appetite stimulation (useful in underweight/cachexia)', 'Potential gastroprotective effects', 'Lean mass increase with adequate caloric intake', 'Synergistic with GHRH analogues'],
    dosing: { typical: '100–200 mcg/injection', range: '50–300 mcg', frequency: '2–3x daily fasted', route: ['subcutaneous injection'], cycle: '4–8 weeks', notes: 'Significant hunger — inject 15 min before meals for clinical use or at bedtime. Less preferred than Ipamorelin/GHRP-2 for most anti-aging protocols due to hunger side effect.' },
    sideEffects: 'Significant hunger, cortisol and prolactin elevation, water retention, potential desensitization.',
    researchLevel: 'moderate',
    tags: ['GHRP', 'first gen', 'appetite', 'hunger'],
  },

  // ── Longevity / Pineal ───────────────────────────────────────────────────────

  {
    id: 'epitalon',
    name: 'Epitalon',
    fullName: 'Epithalon / Epitalon (Ala-Glu-Asp-Gly)',
    category: 'longevity',
    route: ['subcutaneous injection', 'intranasal'],
    goals: ['longevity', 'anti_aging', 'cellular_health', 'sleep', 'mitochondrial'],
    summary: 'Tetrapeptide derived from the pineal gland. Activates telomerase — considered the primary longevity peptide. 40+ years of Russian research (Khavinson). Extended lifespan in multiple model organisms.',
    mechanism: 'Stimulates telomerase activity → telomere lengthening. Regulates circadian rhythm via pineal function. Antioxidant. Modulates cortisol/melatonin. Upregulates p53 tumor suppressor.',
    benefits: ['Telomere lengthening via telomerase activation', 'Extended healthy lifespan in animal models', 'Normalizes circadian rhythm and melatonin', 'Antioxidant and potential anti-cancer properties', 'Immune modulation', 'Improved sleep quality'],
    dosing: { typical: '5–10 mg/day for 10–20 day course', range: '5–20 mg/day', frequency: 'Daily during course', route: ['subcutaneous injection', 'intranasal'], cycle: '10–20 day course, 1–2x/year typical', notes: 'Cyclic use preferred — not continuous. Significant longevity data from Russian research. Often used alongside DSIP for sleep/longevity protocol. Best used pre-sleep.' },
    sideEffects: 'Excellent safety profile over decades of research. Mild injection site reactions.',
    researchLevel: 'moderate',
    tags: ['longevity', 'telomerase', 'pineal', 'Khavinson'],
  },

  {
    id: 'pinealon',
    name: 'Pinealon',
    fullName: 'Pinealon (Glu-Asp-Arg)',
    category: 'longevity',
    route: ['subcutaneous injection', 'intranasal'],
    goals: ['longevity', 'neuroprotection', 'sleep', 'anti_aging', 'cognitive'],
    summary: 'Tripeptide from pineal gland. Neuroprotective and anti-aging. From the same Khavinson/St. Petersburg research as Epitalon. Used for neurological protection and circadian rhythm regulation.',
    mechanism: 'Penetrates blood-brain barrier. Activates neuronal telomerase, reduces neuronal apoptosis, modulates melatonin pathway, anti-inflammatory in CNS.',
    benefits: ['Neuroprotection and neuronal longevity', 'Cognitive support in aging', 'Sleep quality and circadian regulation', 'Anti-aging at CNS level', 'May slow neurodegenerative processes'],
    dosing: { typical: '5–10 mg/day for 10 day course', range: '5–20 mg/day', frequency: 'Daily during course', route: ['subcutaneous injection', 'intranasal'], cycle: '10-day course, 1–2x per year', notes: 'Often combined with Epitalon as part of a comprehensive longevity protocol. Intranasal provides direct CNS delivery.' },
    sideEffects: 'Very limited human data outside Russian research. Well-tolerated in studies.',
    researchLevel: 'low_emerging',
    tags: ['longevity', 'neuroprotective', 'pineal', 'Khavinson'],
  },

  {
    id: 'dsip',
    name: 'DSIP',
    fullName: 'DSIP (Delta Sleep-Inducing Peptide)',
    category: 'sleep',
    route: ['subcutaneous injection'],
    goals: ['sleep', 'fatigue', 'longevity', 'anti_aging'],
    summary: 'Endogenous neuropeptide that induces natural deep (delta) sleep. Anti-stress and longevity-promoting at doses studied. Used for insomnia, sleep architecture improvement, and stress regulation.',
    mechanism: 'Modulates delta-wave sleep by acting on thalamocortical neurons. Anti-stress via hypothalamic-pituitary-adrenal (HPA) axis modulation. Reduces ACTH and corticosterone.',
    benefits: ['Induces natural deep sleep', 'Improves sleep architecture (stage 3-4)', 'Reduces insomnia', 'Anti-stress via HPA axis modulation', 'Potential longevity properties', 'Reduces pain in some studies'],
    dosing: { typical: '250–500 mcg before sleep', range: '100–800 mcg', frequency: 'Pre-sleep, as needed', route: ['subcutaneous injection'], cycle: 'As needed, or 2–4 week courses', notes: 'Inject 30–60 min before sleep. Works best in a dark, quiet environment. Not sedating in the pharmacological sense — enables natural sleep onset.' },
    sideEffects: 'Generally well-tolerated. Occasional dizziness. Vivid dreams reported.',
    researchLevel: 'moderate',
    tags: ['sleep', 'delta wave', 'anti-stress', 'longevity'],
  },

  // ── Melanocortin ─────────────────────────────────────────────────────────────

  {
    id: 'melanotan',
    name: 'Melanotan',
    fullName: 'Melanotan II (MT-II)',
    category: 'cosmetic',
    route: ['subcutaneous injection'],
    goals: ['sexual_function', 'fat_loss', 'skin_health'],
    summary: 'Synthetic melanocortin analogue. Produces melanogenesis (tanning without UV), appetite suppression, and sexual arousal. Not FDA approved. Precursor inspiration for PT-141.',
    mechanism: 'Non-selective melanocortin receptor agonist (MC1R through MC5R). MC1R → melanogenesis (tanning). MC3R/MC4R → appetite suppression and sexual arousal. Stronger and less selective than PT-141.',
    benefits: ['Promotes skin melanogenesis (tanning)', 'Strong sexual arousal (stronger than PT-141 but less selective)', 'Appetite suppression and fat loss', 'UV protection via melanin'],
    dosing: { typical: '0.25–0.5 mg as needed', range: '0.1–1 mg', frequency: 'As needed for tanning or sexual function. Loading: 0.25 mg/day for 1–2 weeks', route: ['subcutaneous injection'], cycle: 'Loading then as-needed maintenance', notes: 'Start very low to assess nausea tolerance. Much stronger than PT-141 — non-selective receptor binding creates more side effects. Consider PT-141 for sexual function as cleaner option.' },
    sideEffects: 'Significant nausea (common), facial flushing, spontaneous erection, darkening of moles/freckles, fatigue. Potential melanoma risk with mole changes — monitor skin.',
    researchLevel: 'moderate',
    tags: ['melanocortin', 'tanning', 'sexual', 'not FDA approved'],
  },

  // ── Antioxidant ──────────────────────────────────────────────────────────────

  {
    id: 'glutathione',
    name: 'Glutathione',
    fullName: 'Glutathione (GSH — gamma-L-glutamyl-L-cysteinylglycine)',
    category: 'antioxidant',
    route: ['subcutaneous injection', 'intravenous', 'nebulized', 'oral liposomal'],
    goals: ['cellular_health', 'longevity', 'mitochondrial', 'immune_health', 'detoxification', 'anti_aging'],
    summary: 'Master antioxidant tripeptide. Central to cellular redox balance, detoxification, and immune function. Levels decline significantly with age and disease.',
    mechanism: 'Directly neutralizes reactive oxygen species (ROS), regenerates vitamins C and E, supports Phase II hepatic detoxification, maintains mitochondrial membrane potential, modulates immune signaling via NF-κB.',
    benefits: ['Master cellular antioxidant', 'Hepatic detoxification support', 'Skin brightening (inhibits melanin synthesis)', 'Immune enhancement', 'Mitochondrial protection', 'Heavy metal chelation support', 'Neurological protection'],
    dosing: { typical: 'IV: 600–1200 mg/infusion. SQ: 200–600 mg/day. Nasal/nebulized: 100–400 mg/day', range: 'Wide range by indication and route', frequency: 'IV: 1–3x/week. SQ: daily or every other day', route: ['intravenous', 'subcutaneous injection', 'nebulized', 'oral liposomal'], cycle: 'Can be used chronically. IV loading courses of 4–12 sessions common.', notes: 'IV has highest bioavailability. SQ convenient for home use. Oral liposomal is next best. Standard oral poorly absorbed. Combine with NAD+ for comprehensive cellular health protocol.' },
    sideEffects: 'IV: rare allergic reactions, potential zinc depletion with chronic high-dose use. Generally very well-tolerated. Skin lightening with high IV doses.',
    researchLevel: 'high',
    tags: ['antioxidant', 'master antioxidant', 'detox', 'IV', 'SQ'],
  },

];

// ── Helper exports ────────────────────────────────────────────────────────────

export const OPTIMIZATION_GOALS = [
  { id: 'recovery',         label: 'Recovery & Healing',         icon: '🔄' },
  { id: 'sleep',            label: 'Sleep Quality',              icon: '😴' },
  { id: 'muscle_mass',      label: 'Muscle Mass & Strength',     icon: '💪' },
  { id: 'fat_loss',         label: 'Weight / Fat Reduction',     icon: '⚖️' },
  { id: 'visceral_fat',     label: 'Visceral Fat Reduction',     icon: '🎯' },
  { id: 'longevity',        label: 'Longevity & Anti-Aging',     icon: '⏳' },
  { id: 'mitochondrial',    label: 'Cellular / Mitochondrial',   icon: '⚡' },
  { id: 'fertility',        label: 'Fertility & Hormonal',       icon: '🧬' },
  { id: 'fatigue',          label: 'Physical Fatigue',           icon: '🔋' },
  { id: 'mental_clarity',   label: 'Mental Clarity & Cognition', icon: '🧠' },
  { id: 'inflammation',     label: 'Inflammation Reduction',     icon: '🛡️' },
  { id: 'metabolic_health', label: 'Metabolic Health',           icon: '📊' },
  { id: 'sexual_function',  label: 'Sexual Health & Function',   icon: '💚' },
  { id: 'gut_health',       label: 'Gut & GI Health',            icon: '🌿' },
  { id: 'neuroprotection',  label: 'Neuroprotection',            icon: '🔬' },
  { id: 'anti_aging',       label: 'Skin & Connective Tissue',   icon: '✨' },
  { id: 'immune_health',    label: 'Immune Health',              icon: '🛡️' },
  { id: 'cardiac_health',   label: 'Cardiac Health',             icon: '❤️' },
  { id: 'cellular_health',  label: 'Cellular Health',            icon: '🔬' },
  { id: 'cognitive',        label: 'Cognitive Enhancement',      icon: '🧠' },
];

// Full knowledge base as formatted string for Claude's system prompt
export const PEPTIDE_CONTEXT = `
BIO PRECISION AGING — PEPTIDE FORMULARY (${PEPTIDE_KNOWLEDGE_BASE.length} peptides)
Route default: Subcutaneous injection unless noted.

${PEPTIDE_KNOWLEDGE_BASE.map(p => `
── ${p.name} (${p.fullName}) ──
Category: ${p.category} | Route: ${p.route.join(' / ')}
Goals: ${p.goals.join(', ')}
Summary: ${p.summary}
Mechanism: ${p.mechanism}
Key benefits: ${p.benefits.join(' | ')}
Dosing: ${p.dosing.typical} — ${p.dosing.frequency}
Route: ${p.dosing.route.join(' / ')} | Cycle: ${p.dosing.cycle}
Protocol notes: ${p.dosing.notes}
Side effects: ${p.sideEffects}
Evidence: ${p.researchLevel}
`).join('\n')}
`;

export default PEPTIDE_KNOWLEDGE_BASE;
