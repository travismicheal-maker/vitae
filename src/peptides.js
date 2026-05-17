// src/peptides.js
// Peptide knowledge base — Vitae Bio Precision Aging
// BPC-157 fully updated from research literature (May 2026)
// ─────────────────────────────────────────────────────────────

export const PEPTIDE_GOALS_DATA = [
  { id: 'recovery',        label: 'Recovery & Healing',         icon: '🔄' },
  { id: 'sleep',           label: 'Sleep Quality',              icon: '😴' },
  { id: 'muscle_mass',     label: 'Muscle Mass & Strength',     icon: '💪' },
  { id: 'weight_loss',     label: 'Weight Reduction',           icon: '⚖️' },
  { id: 'visceral_fat',    label: 'Visceral Fat Reduction',     icon: '🎯' },
  { id: 'longevity',       label: 'Longevity & Anti-Aging',     icon: '⏳' },
  { id: 'mitochondrial',   label: 'Cellular / Mitochondrial',   icon: '⚡' },
  { id: 'fertility',       label: 'Fertility & Hormonal',       icon: '🧬' },
  { id: 'fatigue',         label: 'Physical Fatigue',           icon: '🔋' },
  { id: 'mental_clarity',  label: 'Mental Clarity & Cognition', icon: '🧠' },
  { id: 'inflammation',    label: 'Inflammation Reduction',     icon: '🛡️' },
  { id: 'metabolic_health',label: 'Metabolic Health',           icon: '📊' },
  { id: 'sexual_function', label: 'Sexual Health',              icon: '💚' },
  { id: 'gut_health',      label: 'Gut & GI Health',            icon: '🌿' },
  { id: 'neuroprotection', label: 'Neuroprotection',            icon: '🔬' },
  { id: 'anti_aging',      label: 'Skin & Connective Tissue',   icon: '✨' },
];

export const PEPTIDE_KNOWLEDGE_BASE = [

  // ─── BPC-157 ────────────────────────────────────────────────────────────────
  {
    id: 'bpc157',
    name: 'BPC-157',
    fullName: 'Body Protection Compound 157',
    aliases: ['BPC 157', 'PL-10', 'PLD-116', 'PL14736', 'Bepectin'],
    category: 'Healing & Cytoprotection',
    categoryTag: 'healing',
    goals: ['recovery', 'gut_health', 'inflammation', 'neuroprotection', 'anti_aging'],
    regulatoryStatus: 'Category 1 (compoundable by prescription) — reclassified Feb 27, 2026 by HHS. FDA safety review concludes July 2026.',
    researchLevel: 'moderate', // animal + limited human
    researchSummary: '200+ preclinical publications (1993–2024). Three published human studies as of 2026: IV safety pilot (Lee 2025), interstitial cystitis pilot (Lee 2024), knee pain intra-articular (Lee 2021). Phase I trial (NCT02637284) started 2015 but results were withdrawn in 2016.',

    molecular: {
      formula: 'C62H98N16O22',
      molecularWeight: 1419.5355,
      sequence: 'Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val',
      sequenceAbbrev: 'GEPPPGKPADDAGLV',
      source: 'Partial sequence of Body Protection Compound (BPC) isolated from human gastric juice (Sikiric et al., 1993)',
      stability: 'Stable in water, saline, and human gastric juice for >24 h. Resistant to hydrolysis and enzyme digestion. Can be stored at room temperature lyophilized; stable refrigerated 30 days post-reconstitution.',
    },

    summary: 'BPC-157 is a synthetic 15-amino-acid pentadecapeptide isolated from human gastric juice. It is the most extensively studied healing peptide in preclinical literature with over 200 published studies covering tendon, ligament, muscle, bone, GI tract, brain, and vascular healing models. It carries the most robust animal-model healing literature of any peptide currently in clinical use.',

    mechanism: `BPC-157 operates through several overlapping pathways:

• VEGFR2 Upregulation — Primary angiogenic mechanism. Stimulates vascular endothelial growth factor receptor-2 expression in ischemic tissue and endothelial cultures, driving new capillary formation (angiogenesis and vasculogenesis). This is why subcutaneous injection in the abdomen can affect a distant tendon.

• Nitric Oxide (NO) / eNOS Modulation — Interacts with the NO synthase system bidirectionally. Counteracts L-NAME (NOS inhibitor) damage and modulates L-arginine effects. Critical for vascular tone, mucosal integrity, and wound healing without depending on endogenous NO levels to work.

• FAK-Paxillin Pathway — Activates focal adhesion kinase signaling, promoting cell survival, migration, and outgrowth — key for tendon healing (tendon outgrowth) and wound closure.

• Growth Hormone Receptor (GHR) Upregulation — BPC-157 dose- and time-dependently increases GHR expression in tendon fibroblasts at mRNA and protein level (up to 7-fold by day 3). Combined with endogenous GH, this activates JAK2-STAT signaling → cell proliferation and PCNA expression. This explains synergy with GH-axis peptides (CJC/ipamorelin stacks).

• EGR-1 / NAB2 Expression — Stimulates early growth response-1 gene (cytokine/growth factor generation, early collagen formation) and its repressor nab2. Promotes collagen organization and granulation tissue earlier than PDGF-BB.

• Dopamine, Serotonin & Prostaglandin Modulation — Interacts with dopaminergic (attenuates haloperidol catalepsy, amphetamine effects) and serotonergic systems (5-HT2A-specific counteraction of serotonin syndrome). Anti-prostaglandin effects contribute to anti-inflammatory and gastroprotective activity.

• Antioxidant Enzyme Upregulation — Increases HO-1, NQO-1, glutathione reductase, glutathione peroxidase 2, GST-pi. Stabilizes free radical scavengers.`,

    benefits: [
      'Accelerates tendon-to-bone healing and ligament repair (Achilles, quadriceps, rotator cuff models)',
      'Heals GI tract: peptic ulcers, IBD, colocutaneous fistulas, NSAID-induced damage, esophageal lesions',
      'Repairs burn wounds topically — outperforms silver sulfadiazine in multiple parameters including re-epithelialization, collagen formation, angiogenesis',
      'Stimulates angiogenesis — optimizes vascular response across endothelial damage, clotting, thrombosis, vasoconstriction/dilation, and edema',
      'Neuroprotection — improves TBI outcomes, sciatic nerve healing, spinal cord injury recovery in rats',
      'Reduces systemic inflammation (lowers IL-6, TNF-α, LTB4, TXB2, MPO)',
      'Antidepressant and anxiolytic properties measured in Porsolt test',
      'Cytoprotective: shields against NSAID toxicity, corticosteroid impairment, alcohol liver damage',
      'Gastroprotective: stable in gastric juice, acts as basal protectant in saliva and gastric mucosa',
      'Potential in interstitial cystitis (IC): 10/12 patients with moderate-severe IC had 100% symptom resolution in single-procedure pilot (Lee 2024)',
      'Joint pain: 11/12 knee pain patients reported significant relief after single intra-articular injection (Lee 2021)',
    ],

    pharmacokinetics: {
      halfLife: '<30 minutes (prototype peptide) — consistent across rats and dogs',
      tmax: '3 min (rats IM), 6–9 min (dogs IM)',
      bioavailabilityIM: '14–19% (rats), 45–51% (dogs)',
      distributionPeak: 'Highest tissue concentrations: kidney > liver > stomach wall > thymus > spleen. Intestine/lung/skin ~ plasma. Low in brain (poor BBB penetration) and fat.',
      metabolism: 'Rapidly degraded by endopeptidases → 6 identified peptide metabolite fragments (M1–M6) → proline (main metabolite, 86% of plasma radioactivity at 1h) → normal amino acid metabolic pathway',
      excretion: 'Primary: urinary (15.9% in 72h). Secondary: biliary (9.1% in 72h bile-duct cannulated rats). Remainder in cadaver tissue as metabolites.',
      linearPK: 'Yes — AUC and Cmax linear across all tested doses in rats and dogs',
      accumulation: 'No accumulation with 7-day repeated dosing (parameters match single-dose)',
      humanPK: 'Human PK formally unstudied (Veljaca 2002 abstract — details unavailable). IV pilot (Lee 2025): no biomarker changes at 10–20 mg doses suggesting safe clearance.',
    },

    humanEvidence: [
      {
        study: 'Lee & Burgess (2025) — Alt Ther Health Med 31(5)',
        type: 'IRB-approved safety pilot',
        n: 2,
        finding: 'IV infusion of 10 mg then 20 mg BPC-157 in 250cc normal saline over 1 hour on consecutive days. No clinically significant changes in CBC, CMP, CPK, BNP, CRP, TSH, or RBC magnesium. No side effects reported. First published IV human safety data.',
      },
      {
        study: 'Lee, Walker & Ayadi (2024) — Alt Ther Health Med (PMID: 39325560)',
        type: 'Pilot study — interstitial cystitis',
        n: 12,
        finding: '10 mg intravesical injection. 10/12 patients: 100% symptom resolution. 2/12: 80% improvement. No adverse events. Single-procedure treatment in patients who failed pentosan polysulfate.',
      },
      {
        study: 'Lee & Padgett (2021) — Alt Ther Health Med 27(4)',
        type: 'Retrospective — knee pain',
        n: 16,
        finding: 'Intra-articular injection. 14/16 patients reported knee pain relief. Well tolerated, no side effects.',
      },
      {
        study: 'Ruenzi et al. (2005) — Gastroenterology 128 A584 (Phase II UC trial)',
        type: 'RCT — ulcerative colitis',
        n: 46,
        finding: 'PL14736 enema 80 mg/day x 2 weeks. DAI reduced 3.2 points vs 1.6 placebo. Trend but not statistically significant vs placebo. Well-tolerated.',
      },
      {
        study: 'Vasireddi et al. (2025) — Systematic Review (PMID: 40756949)',
        type: 'Systematic review',
        n: '36 studies (35 preclinical, 1 clinical)',
        finding: 'BPC-157 enhances GHR expression, angiogenesis pathways, reduces inflammatory cytokines. Improved functional, structural, and biomechanical outcomes across MSK injuries. Metabolized in liver, t1/2 <30 min. No adverse effects in preclinical safety. No clinical safety data found.',
      },
    ],

    dosing: {
      clinicalPharmacy: {
        typical: '250–500 mcg once daily',
        range: '250–500 mcg/day',
        route: 'Subcutaneous injection (only route dispensed by 503A compounding pharmacies in 2026)',
        sites: 'Abdomen and thigh rotation; peri-lesional when feasible for targeted MSK',
        reconstitution: '5 mg vial + 2 mL BAC water = 2.5 mg/mL (draw 0.10 mL = 250 mcg; 0.20 mL = 500 mcg)',
        cycle: '4–6 weeks standard; 6–8 weeks chronic tendinopathy',
        storage: 'Lyophilized: room temp or refrigerated. Reconstituted: 2–8°C, stable ~30 days. Do not freeze reconstituted vials.',
      },
      communityReported: {
        standard: '250 mcg twice daily (500 mcg/day total) SC',
        acuteInjury: '500 mcg twice daily (1,000 mcg/day) x 2 weeks, then taper to 250 mcg BID',
        maintenance: '250 mcg once daily, 5 days on / 2 days off',
        oral: '500–1,000 mcg/day sublingual or liquid, once or twice daily fasted — use case limited to GI/IBD indications',
        gut: '250–500 mcg twice daily oral or SC for 6–8 weeks',
      },
      goalBasedDosing: {
        'Acute musculoskeletal injury': '500 mcg BID SC, 4–6 weeks',
        'Chronic tendinopathy': '250 mcg BID SC, 6–8 weeks',
        'Gut / GI healing (IBD, gastritis, leaky gut)': '250–500 mcg BID oral or SC, 6–8 weeks',
        'Post-surgical recovery': '500 mcg BID SC, 4 weeks',
        'General repair / longevity': '250 mcg once daily SC, 4 weeks on / 4 weeks off',
        'Interstitial cystitis': '10 mg intravesical injection (clinical procedure only)',
      },
      cycleLengths: {
        mostCommon: '4 weeks on / 2–4 weeks off',
        aggressiveInjury: '6–8 weeks continuous, then 4 weeks off',
        longTermContinuous: 'Not studied; precautionary break every 8 weeks recommended',
      },
      ivDosing: {
        humanData: '10–20 mg in 250 cc NS over 1 hour (Lee 2025 pilot). Used anecdotally at 5 mg in clinical settings since 2018.',
        note: 'IV is off-label and not dispensed by compounding pharmacies in standard protocols. Requires physician supervision.',
      },
    },

    stacksAndCombinations: [
      {
        stack: 'Wolverine Stack (BPC-157 + TB-500)',
        use: 'Dominant healing combination. Synergistic — BPC provides angiogenesis/collagen/GHR upregulation; TB-500 provides actin sequestration and systemic anti-inflammatory + cell migration.',
        note: 'Most commonly used for MSK injuries, post-surgical recovery',
      },
      {
        stack: 'BPC-157 + GHK-Cu',
        use: 'Wound and skin healing, tissue regeneration',
      },
      {
        stack: 'BPC-157 + KPV',
        use: 'Gut-focused stack for IBD, leaky gut',
      },
      {
        stack: 'BPC-157 + IGF-1 LR3',
        use: 'Off-label injury recovery, used in bodybuilding contexts',
      },
      {
        stack: 'BPC-157 + CJC-1295 / Ipamorelin',
        use: 'Recovery + GH axis stack. BPC-157 upregulates GHR, amplifying GH released by CJC/ipamorelin. Very common combination.',
      },
      {
        stack: 'BPC-157 + Semaglutide (Sublingual)',
        use: 'Patented combination (US 2023/11833189 — Bentz et al.). Proposed synergistic weight-loss and GI side-effect mitigation.',
      },
    ],

    sideEffects: {
      reported: [
        'Injection site irritation, redness, mild bruising (most common — rotate sites)',
        'Transient fatigue or brain fog in first 1–2 days (~10% in community surveys, resolves 3–7 days)',
        'Mild flushing or warmth shortly after injection',
        'Rare: dizziness, headache',
        'Pain or necrosis possible if injected in aqueous solution (use BAC water properly)',
      ],
      noSerious: 'No serious adverse events reported in published animal literature or community surveys (500,000+ prescriptions dispensed 2018–2024 with no adverse events reported to 503A pharmacies)',
      theoreticalConcerns: [
        'Angiogenic activity (VEGFR2) may support occult tumor vasculature — no published human evidence either way; flagged as theoretical concern in Józwiak 2025 review',
        'Excess NO stimulation at high doses: potential mitochondrial respiration inhibition, peroxynitrite formation (theoretical, not observed)',
        'Proline metabolite → proline oxidase → superoxide cascade (theoretical metabolic concern in Józwiak 2025)',
        'WADA: temporarily banned 2022, currently NOT on 2026 prohibited list — verify sport-specific rules',
      ],
      lethalDose: 'LD1 not achieved in rodent studies. Single dose 20 mg/kg IM in rats — no deaths or adverse effects. 10 mg/kg IM in dogs — no adverse effects.',
    },

    contraindications: [
      'Active malignancy (theoretical angiogenic concern)',
      'Known hypersensitivity to peptide components',
      'Pregnancy (insufficient data)',
      'Use with caution in patients with cardiovascular disease or significant CV risk factors (NO pathway interactions)',
    ],

    patentApplications: [
      'US 1998/052973 — BPC peptide salts with organo-protective activity (Sikiric et al.)',
      'US 2023/11833189 — Sublingual semaglutide-BPC 157 combination for weight loss (Bentz et al.)',
      'US 2023/0141224 — BPC 157 + fibroblast therapy for ARDS (Ichim, O\'Heeron)',
      'WO 2021/202031 — BPC 157 + peptides for coronavirus fibroblast therapy',
      'Croatia Patent 2013/1075 — BPC 157 for multiple sclerosis treatment',
      'US 2022/0249575 — BPC 157 formulation for ophthalmic disorders (Vitti)',
      'WO 2021/252292 — BPC 157 for persistent neurogenic pain and complex injury',
      'EP 2022/4226918 — Oral capsule-in-capsule delivery system for BPC 157',
      'CN 2024/118615479 — BPC 157 medical dressing for scar repair',
    ],

    keyReferences: [
      'Sikiric P et al. (1993). A new gastric juice peptide, BPC. J Physiol Paris 87(5):313-327.',
      'Klicek R et al. (2008). BPC 157 heals colocutaneous fistulas in rats: Role of the NO system. J Pharmacol Sci 108:7-17.',
      'He L et al. (2022). Pharmacokinetics, distribution, metabolism, and excretion of BPC 157 in rats and dogs. Front Pharmacol 13:1026182.',
      'Chang CH et al. (2014). BPC 157 enhances growth hormone receptor expression in tendon fibroblasts. Molecules 19:19066-19077.',
      'Lee E & Burgess K (2025). Safety of IV infusion of BPC-157 in humans: a pilot study. Alt Ther Health Med 31(5):20-24.',
      'Lee E et al. (2024). Effect of BPC-157 on symptoms in patients with interstitial cystitis. PMID: 39325560.',
      'Mikus D et al. (2001). BPC 157 cream improves burn-wound healing and attenuates burn-gastric lesions in mice. Burns 27:817-827.',
      'Seiwerth S et al. (2014). BPC 157 and blood vessels. Curr Pharm Des 20(7):1121-1125. PMID: 23782145.',
      'Józwiak M et al. (2025). Multifunctionality and possible medical application of the BPC 157 peptide. Pharmaceuticals 18:185.',
      'Vasireddi N et al. (2025). Emerging use of BPC-157 in orthopaedic sports medicine: systematic review. PMID: 40756949.',
      'Ruenzi M et al. (2005). Phase II RCT of PL 14736 enema in ulcerative colitis. Gastroenterology 128:A584.',
    ],
  },

  // ─── TB-500 ─────────────────────────────────────────────────────────────────
  {
    id: 'tb500',
    name: 'TB-500',
    fullName: 'Thymosin Beta-4 (synthetic fragment)',
    aliases: ['Thymosin Beta-4', 'Tβ4'],
    category: 'Healing & Recovery',
    categoryTag: 'healing',
    goals: ['recovery', 'inflammation', 'muscle_mass', 'anti_aging'],
    regulatoryStatus: 'Not FDA-approved. Available via research peptide vendors; compounding pharmacy access limited.',
    researchLevel: 'moderate',
    summary: 'Synthetic version of the naturally occurring Thymosin Beta-4 protein fragment. Potent tissue repair, anti-inflammatory, and cell migration agent. Frequently paired with BPC-157 in the "Wolverine Stack."',
    mechanism: 'Sequesters G-actin monomers (actin polymerization regulation), promotes cell migration and proliferation, upregulates matrix metalloproteinases, stimulates formation of new blood vessels, reduces inflammation via NF-κB pathway modulation.',
    benefits: [
      'Accelerated healing of muscle, tendon, and ligament injuries',
      'Systemic anti-inflammatory effects',
      'Promotes cardiac repair post-myocardial injury',
      'Neurological — promotes neurite outgrowth',
      'Hair follicle stimulation (some evidence)',
    ],
    dosing: {
      typical: '2–2.5 mg twice weekly (loading), 2 mg weekly (maintenance)',
      range: '1–5 mg per dose',
      route: ['subcutaneous injection', 'intramuscular injection'],
      cycle: '4–6 weeks loading, then maintenance or cycle break',
      notes: 'Often stacked with BPC-157. Not orally bioavailable.',
    },
    sideEffects: 'Generally well-tolerated. Mild fatigue reported anecdotally. Limited long-term human data.',
    keyReferences: ['Goldstein AL et al. (2012). Thymosin beta4: a multi-functional regenerative peptide. Expert Opin Biol Ther.'],
  },

  // ─── ARA-290 ─────────────────────────────────────────────────────────────────
  {
    id: 'ara290',
    name: 'ARA-290',
    fullName: 'ARA-290 (Cibinetide)',
    aliases: ['Cibinetide', 'ARA290'],
    category: 'Neuroprotection & Metabolic',
    categoryTag: 'neuroprotection',
    goals: ['neuroprotection', 'inflammation', 'metabolic_health', 'fatigue'],
    regulatoryStatus: 'Investigational. Clinical trials completed in sarcoidosis/small fiber neuropathy. Not FDA-approved.',
    researchLevel: 'high',
    summary: 'A non-hematopoietic EPO analogue that selectively activates the tissue-protective receptor (βcR) without stimulating red blood cell production. Primarily studied for neuropathic pain, small fiber neuropathy, and metabolic dysfunction.',
    mechanism: 'Binds tissue-protective receptor complex (EPOR/βcR heterodimer) independently of the hematopoietic receptor. Activates Akt/PI3K, JAK2, and STAT3 pathways promoting cell survival and anti-apoptotic signaling. Reduces systemic inflammation via NF-κB and TNF-α suppression.',
    benefits: [
      'Significant reduction in neuropathic pain (sarcoidosis patients — RCT data)',
      'Regeneration of small nerve fibers',
      'Improved corneal nerve fiber density',
      'Improved insulin sensitivity and metabolic parameters',
      'Anti-inflammatory: reduces TNF-α, IL-6',
      'Protective against ischemia-reperfusion injury',
    ],
    dosing: {
      typical: '4 mg once daily SC (clinical trial doses)',
      range: '1–8 mg/day',
      route: ['subcutaneous injection'],
      cycle: '4–12 weeks depending on indication',
      notes: 'Dosed based on clinical trial protocols. No established community dosing range.',
    },
    sideEffects: 'Well-tolerated in clinical trials. Mild injection site reactions. No erythropoietic effects (no RBC stimulation).',
    keyReferences: ['Brines M et al. (2014). ARA290 alleviates chronic neuropathic pain in sarcoidosis patients. Mol Med.'],
  },

  // ─── AOD-9604 ─────────────────────────────────────────────────────────────────
  {
    id: 'aod9604',
    name: 'AOD-9604',
    fullName: 'Advanced Obesity Drug 9604',
    aliases: ['AOD 9604', 'hGH Fragment 176-191'],
    category: 'Metabolic & Fat Loss',
    categoryTag: 'metabolic',
    goals: ['weight_loss', 'visceral_fat', 'metabolic_health', 'recovery'],
    regulatoryStatus: 'GRAS status (Generally Recognized as Safe) granted by FDA for food use. Not approved as a drug. Compoundable.',
    researchLevel: 'moderate',
    summary: 'C-terminal fragment of human growth hormone (residues 176–191). Retains hGH\'s lipolytic properties without the IGF-1 stimulating or diabetogenic effects. Also demonstrated cartilage and bone repair properties.',
    mechanism: 'Stimulates lipolysis (fat breakdown) and inhibits lipogenesis through β-adrenergic receptor pathways, independent of IGF-1. Does not affect blood glucose or insulin resistance. In cartilage: promotes proteoglycan synthesis and chondrocyte differentiation.',
    benefits: [
      'Visceral and subcutaneous fat reduction',
      'No effect on blood glucose or insulin sensitivity',
      'Cartilage regeneration — proteoglycan synthesis in OA models',
      'Potential for osteoarthritis and joint repair',
      'Beneficial lipid profile effects',
    ],
    dosing: {
      typical: '300–500 mcg once daily',
      range: '150–600 mcg/day',
      route: ['subcutaneous injection', 'oral (limited bioavailability)'],
      cycle: '8–12 weeks, assess results',
      notes: 'Inject on empty stomach, ideally morning or pre-exercise. Intra-articular use: 0.25 mg AOD + 6 mg HA weekly x 4–7 weeks under ultrasound guidance.',
    },
    sideEffects: 'Exceptionally well-tolerated. No growth or IGF-1 effects. Minimal injection site reactions.',
    keyReferences: ['Ng FM et al. (2000). AOD9604: An anti-obesity drug targeting fat breakdown. Biochemistry.'],
  },

  // ─── Semaglutide ──────────────────────────────────────────────────────────────
  {
    id: 'semaglutide',
    name: 'Semaglutide',
    fullName: 'Semaglutide (GLP-1 Receptor Agonist)',
    aliases: ['Ozempic', 'Wegovy', 'Rybelsus'],
    category: 'GLP-1 / Metabolic',
    categoryTag: 'metabolic',
    goals: ['weight_loss', 'visceral_fat', 'metabolic_health'],
    regulatoryStatus: 'FDA-approved (Ozempic: T2DM; Wegovy: obesity; Rybelsus: oral T2DM). Available via compounding pharmacies during shortage periods.',
    researchLevel: 'very_high',
    summary: 'Long-acting GLP-1 receptor agonist. Gold standard for weight management and T2DM. 15–20% body weight reduction in clinical trials. Weekly subcutaneous injection or daily oral tablet.',
    mechanism: 'Binds and activates GLP-1 receptors in pancreas (insulin secretion, glucagon suppression), brain (appetite suppression, satiety), GI tract (delayed gastric emptying), and cardiovascular system (cardioprotective).',
    benefits: [
      '15–20% body weight reduction (SUSTAIN, STEP trials)',
      'Significant HbA1c reduction in T2DM',
      'Cardiovascular risk reduction (SUSTAIN-6)',
      'MASH/NASH improvement',
      'Potential neuroprotective effects (under investigation)',
    ],
    dosing: {
      typical: '0.5–2.4 mg/week SC (Wegovy dosing); 0.5–1 mg/week (Ozempic)',
      range: '0.25 mg/week starting dose, titrate over 16–20 weeks',
      route: ['subcutaneous injection', 'oral tablet (Rybelsus)'],
      cycle: 'Ongoing — chronic therapy for T2DM/obesity',
      notes: 'Titrate slowly to minimize GI side effects. Pause before surgery if gastroparesis concern. Patent combination with BPC-157 for weight loss exists (Bentz 2023).',
    },
    sideEffects: 'Nausea, vomiting, diarrhea (especially during titration). Rare: pancreatitis, gallbladder disease, thyroid C-cell risk (animal data). Muscle mass loss concern with rapid weight loss.',
    keyReferences: ['Wilding JPH et al. (2021). STEP-1: Semaglutide in obesity. NEJM.'],
  },

  // ─── Tirzepatide ──────────────────────────────────────────────────────────────
  {
    id: 'tirzepatide',
    name: 'Tirzepatide',
    fullName: 'Tirzepatide (GIP/GLP-1 Dual Agonist)',
    aliases: ['Mounjaro', 'Zepbound'],
    category: 'GLP-1 / Metabolic',
    categoryTag: 'metabolic',
    goals: ['weight_loss', 'visceral_fat', 'metabolic_health'],
    regulatoryStatus: 'FDA-approved (Mounjaro: T2DM; Zepbound: obesity).',
    researchLevel: 'very_high',
    summary: 'First-in-class dual GIP and GLP-1 receptor co-agonist. Superior weight loss vs semaglutide (20–22% body weight). Weekly SC injection.',
    mechanism: 'Activates both GIP and GLP-1 receptors. GIP adds insulin-potentiating and adipose-tissue-direct lipid-lowering effects beyond GLP-1 alone.',
    benefits: [
      '20–22% body weight reduction (SURMOUNT trials)',
      'Superior glycemic control vs semaglutide',
      'Improved lipid profile',
      'Sleep apnea improvement (SURMOUNT-OSA)',
      'Heart failure benefit (SUMMIT trial)',
    ],
    dosing: {
      typical: '5–15 mg/week SC',
      range: '2.5 mg starting, titrate by 2.5 mg every 4 weeks to maintenance dose',
      route: ['subcutaneous injection'],
      cycle: 'Ongoing chronic therapy',
      notes: 'Slower titration than semaglutide reduces GI side effects. Pair with resistance training and adequate protein to preserve muscle mass.',
    },
    sideEffects: 'Similar to semaglutide: nausea, diarrhea, vomiting during titration. Possibly less nausea than semaglutide at equivalent weight loss.',
    keyReferences: ['Jastreboff AM et al. (2022). SURMOUNT-1: Tirzepatide in obesity. NEJM.'],
  },

  // ─── CJC-1295 ─────────────────────────────────────────────────────────────────
  {
    id: 'cjc1295',
    name: 'CJC-1295',
    fullName: 'CJC-1295 (GHRH Analogue)',
    aliases: ['CJC-1295 w/ DAC', 'CJC-1295 no DAC', 'Mod GRF 1-29'],
    category: 'GH Axis',
    categoryTag: 'gh_axis',
    goals: ['muscle_mass', 'recovery', 'sleep', 'anti_aging', 'fatigue'],
    regulatoryStatus: 'Not FDA-approved. Compoundable by prescription.',
    researchLevel: 'moderate',
    summary: 'Growth hormone releasing hormone (GHRH) analogue that stimulates pituitary GH release. With DAC (Drug Affinity Complex): weekly dosing, sustained GH elevation. Without DAC (Mod GRF 1-29): pulsatile release, dosed with ipamorelin.',
    mechanism: 'Binds GHRH receptors on somatotrophs in the pituitary gland, stimulating GH synthesis and release. DAC version covalently binds to albumin, extending half-life to ~8 days.',
    benefits: [
      'Increased GH and IGF-1 levels',
      'Improved body composition (muscle gain, fat loss)',
      'Enhanced recovery and sleep quality',
      'Anti-aging effects on skin, hair, energy',
      'Improved bone density (long-term)',
    ],
    dosing: {
      typical: 'With DAC: 2 mg/week SC. Without DAC: 100–300 mcg with each ipamorelin dose',
      range: '1–2 mg/week (DAC); 100–300 mcg per pulse (no DAC)',
      route: ['subcutaneous injection'],
      cycle: '3–6 months, with breaks to preserve pituitary sensitivity',
      notes: 'Dose at night on empty stomach for optimal GH pulse alignment. Most often stacked with ipamorelin.',
    },
    sideEffects: 'Water retention, joint aches, tingling (GH-related). Injection site reactions. Potential desensitization with DAC form over time.',
    keyReferences: ['Teichman SL et al. (2006). CJC-1295 sustained GH elevation. JCEM.'],
  },

  // ─── Ipamorelin ───────────────────────────────────────────────────────────────
  {
    id: 'ipamorelin',
    name: 'Ipamorelin',
    fullName: 'Ipamorelin (GHRP-5)',
    aliases: ['GHRP-5'],
    category: 'GH Axis',
    categoryTag: 'gh_axis',
    goals: ['muscle_mass', 'recovery', 'sleep', 'anti_aging', 'fatigue'],
    regulatoryStatus: 'Not FDA-approved. Compoundable by prescription.',
    researchLevel: 'moderate',
    summary: 'Selective growth hormone secretagogue (GHSR agonist). Most selective GHRP — does not significantly stimulate cortisol or prolactin release. Always paired with CJC-1295 for synergistic GH pulse.',
    mechanism: 'Binds ghrelin receptor (GHSR) on pituitary, amplifying GH release. Highly selective — minimal cortisol, prolactin, or ACTH stimulation compared to older GHRPs.',
    benefits: [
      'Clean GH pulse without cortisol spike',
      'Improved sleep quality (slow-wave sleep)',
      'Muscle gain and fat loss (indirect via GH/IGF-1)',
      'Enhanced recovery',
      'Appetite stimulation (mild)',
    ],
    dosing: {
      typical: '100–300 mcg, 1–3x daily',
      range: '100–300 mcg per dose',
      route: ['subcutaneous injection'],
      cycle: '3–6 months, commonly ongoing',
      notes: 'Bedtime dose most valuable for GH pulse during sleep. Stack with CJC-1295 (no DAC) for 2–10x greater GH output.',
    },
    sideEffects: 'Mild transient flushing, tingling, mild water retention. No significant cortisol elevation.',
    keyReferences: ['Raun K et al. (1998). Ipamorelin selectivity in GH secretion. Eur J Endocrinol.'],
  },

  // ─── PT-141 ───────────────────────────────────────────────────────────────────
  {
    id: 'pt141',
    name: 'PT-141',
    fullName: 'Bremelanotide (PT-141)',
    aliases: ['Vyleesi', 'Bremelanotide'],
    category: 'Sexual Health',
    categoryTag: 'sexual',
    goals: ['sexual_function'],
    regulatoryStatus: 'FDA-approved as Vyleesi for hypoactive sexual desire disorder (HSDD) in premenopausal women. Used off-label in men.',
    researchLevel: 'high',
    summary: 'Melanocortin receptor agonist that acts centrally to increase sexual desire in both men and women. FDA-approved for HSDD. Works via brain pathway rather than vascular (distinct from PDE5 inhibitors).',
    mechanism: 'Activates melanocortin receptors (MC3R, MC4R) in the hypothalamus and limbic system. Increases dopaminergic and oxytocin signaling, driving sexual motivation centrally.',
    benefits: [
      'Increased sexual desire and arousal',
      'Effective in HSDD in women (FDA-approved)',
      'Spontaneous erections in men (off-label)',
      'Works regardless of vascular function (central mechanism)',
      'On-demand use (no daily dosing required)',
    ],
    dosing: {
      typical: '1.75 mg SC 45 minutes before sexual activity (FDA-approved dose)',
      range: '0.5–2 mg',
      route: ['subcutaneous injection', 'intranasal (not approved)'],
      cycle: 'On-demand, not more than once per 24 hours',
      notes: 'Onset 45–60 minutes, duration 6–12 hours. Can cause transient nausea — manage with antiemetics if needed.',
    },
    sideEffects: 'Nausea (most common), flushing, hyperpigmentation with repeated use, headache, hypertension (transient).',
    keyReferences: ['Simon JA et al. (2019). Bremelanotide (Vyleesi) for HSDD. Obstet Gynecol.'],
  },

  // ─── Sermorelin ───────────────────────────────────────────────────────────────
  {
    id: 'sermorelin',
    name: 'Sermorelin',
    fullName: 'Sermorelin (GHRH 1-29)',
    aliases: ['GHRH 1-29', 'Geref'],
    category: 'GH Axis',
    categoryTag: 'gh_axis',
    goals: ['muscle_mass', 'sleep', 'anti_aging', 'fatigue'],
    regulatoryStatus: 'Compoundable by prescription. Previously FDA-approved (withdrawn from market 2008 for commercial reasons, not safety).',
    researchLevel: 'high',
    summary: 'First 29 amino acids of GHRH. Longer clinical track record than CJC-1295. Stimulates natural, pulsatile GH release with less risk of desensitization. Entry-level GH axis peptide.',
    mechanism: 'Binds GHRH receptors on pituitary somatotrophs. Stimulates GH production and release in a physiological pulsatile pattern.',
    benefits: [
      'Natural pulsatile GH release',
      'Improved sleep quality',
      'Body composition improvement (gradual)',
      'Anti-aging effects',
      'Longer safety record than newer GHRH analogues',
    ],
    dosing: {
      typical: '200–300 mcg SC before bed',
      range: '100–500 mcg/day',
      route: ['subcutaneous injection'],
      cycle: '3–6 months minimum for meaningful results',
      notes: 'Bedtime dosing essential. Shorter half-life than CJC-1295; requires nightly dosing. Good entry point for GH axis therapy.',
    },
    sideEffects: 'Generally very well-tolerated. Mild flushing, tingling, headache.',
    keyReferences: ['Walker RF. (2006). Sermorelin: a better approach to management of adult-onset GH insufficiency? Clin Interv Aging.'],
  },

  // ─── Tesamorelin ──────────────────────────────────────────────────────────────
  {
    id: 'tesamorelin',
    name: 'Tesamorelin',
    fullName: 'Tesamorelin (Egrifta)',
    aliases: ['Egrifta', 'TH9507'],
    category: 'GH Axis / Metabolic',
    categoryTag: 'gh_axis',
    goals: ['visceral_fat', 'metabolic_health', 'mental_clarity'],
    regulatoryStatus: 'FDA-approved (Egrifta) for HIV-associated lipodystrophy. Compoundable off-label.',
    researchLevel: 'high',
    summary: 'GHRH analogue with FDA approval for visceral adiposity in HIV lipodystrophy. Uniquely potent for visceral fat reduction. Also under investigation for cognitive decline and NASH.',
    mechanism: 'Stabilized GHRH analogue. Increases GH pulsatility, elevating IGF-1. Preferential effect on visceral adipose tissue lipolysis.',
    benefits: [
      'Superior visceral fat reduction vs other GHRH analogues',
      'Improved waist circumference and trunk fat',
      'Cognitive benefits in MCI (Alzheimer\'s prevention studies)',
      'Liver fat reduction in NASH',
      'FDA-approved safety profile',
    ],
    dosing: {
      typical: '1–2 mg SC daily',
      range: '1–2 mg/day',
      route: ['subcutaneous injection'],
      cycle: 'Chronic ongoing (FDA trial ran 12+ months)',
      notes: 'Injected in the morning (unlike other GHRHs). Good choice when visceral fat is primary target.',
    },
    sideEffects: 'Edema, arthralgia, carpal tunnel (GH-related). Well-characterized safety from clinical trials.',
    keyReferences: ['Falutz J et al. (2010). Tesamorelin for visceral fat in HIV. NEJM.'],
  },

  // ─── Kisspeptin-10 ────────────────────────────────────────────────────────────
  {
    id: 'kisspeptin10',
    name: 'Kisspeptin-10',
    fullName: 'Kisspeptin-10 (KP-10)',
    aliases: ['KP-10', 'Metastin fragment'],
    category: 'Fertility & Hormonal',
    categoryTag: 'fertility',
    goals: ['fertility', 'sexual_function'],
    regulatoryStatus: 'Investigational. Not FDA-approved. Research use.',
    researchLevel: 'moderate',
    summary: 'Endogenous neuropeptide that stimulates GnRH release, driving LH and FSH secretion. Used for fertility restoration, hypogonadism support, and sexual function improvement.',
    mechanism: 'Binds KISS1R receptors on GnRH neurons in hypothalamus, triggering GnRH pulse → pituitary LH/FSH surge → gonadal steroidogenesis.',
    benefits: [
      'Stimulates natural LH and testosterone production',
      'Fertility enhancement (oocyte maturation, sperm production)',
      'Restores HPG axis in functional hypogonadotropic hypogonadism',
      'Sexual desire and arousal (central mechanism)',
    ],
    dosing: {
      typical: '9.6 nmol/kg IV (clinical trial) or 50–100 mcg SC',
      range: 'Variable — clinical dosing in research context',
      route: ['subcutaneous injection', 'intravenous (clinical trials)'],
      cycle: 'Pulsatile protocols; cycle design varies by indication',
      notes: 'Pulsatile administration required to avoid desensitization. Emerging clinical use in fertility medicine.',
    },
    sideEffects: 'Generally well-tolerated. Transient LH surge. Limited long-term data.',
    keyReferences: ['Jayasena CN et al. (2014). Kisspeptin-54 and sexual function. J Clin Invest.'],
  },

  // ─── GHK-Cu ───────────────────────────────────────────────────────────────────
  {
    id: 'ghkcu',
    name: 'GHK-Cu',
    fullName: 'Copper Peptide GHK-Cu',
    aliases: ['GHK', 'Copper tripeptide-1'],
    category: 'Skin & Anti-Aging',
    categoryTag: 'anti_aging',
    goals: ['anti_aging', 'recovery', 'inflammation'],
    regulatoryStatus: 'GRAS. Used in cosmetics and compounded formulations. Not FDA-approved as drug.',
    researchLevel: 'moderate',
    summary: 'Naturally occurring copper-binding tripeptide (Gly-His-Lys). Potent wound healing, anti-inflammatory, and antioxidant properties. Widely used in skin care and increasingly studied for systemic anti-aging and neuroprotection.',
    mechanism: 'Chelates copper → activates SOD (antioxidant), collagen and elastin synthesis, angiogenesis, and anti-inflammatory pathways. Upregulates VEGF, FGF, TGF-β. Downregulates TNF-α and IL-1.',
    benefits: [
      'Skin collagen and elastin synthesis',
      'Wound healing acceleration',
      'Hair follicle stimulation and hair growth',
      'Anti-inflammatory systemically',
      'Antioxidant via SOD activation',
      'Neuroprotective (emerging research)',
    ],
    dosing: {
      typical: '1–2 mg/day SC or topical application',
      range: '0.5–3 mg/day',
      route: ['subcutaneous injection', 'topical cream/serum'],
      cycle: '8–12 weeks',
      notes: 'Topical use: 1–5% concentration serums. Injectable GHK-Cu often combined with BPC-157 for wound/skin healing stacks.',
    },
    sideEffects: 'Excellent safety profile. Topical: mild irritation. Systemic: minimal reported effects.',
    keyReferences: ['Pickart L & Margolina A. (2018). Regenerative and protective actions of GHK-Cu. Biomolecules.'],
  },

  // ─── Epithalon ────────────────────────────────────────────────────────────────
  {
    id: 'epithalon',
    name: 'Epithalon',
    fullName: 'Epithalamin / Epithalon',
    aliases: ['Epitalon', 'AEDG peptide', 'Ala-Glu-Asp-Gly'],
    category: 'Longevity & Anti-Aging',
    categoryTag: 'longevity',
    goals: ['longevity', 'anti_aging', 'sleep', 'fatigue'],
    regulatoryStatus: 'Not FDA-approved. Research peptide.',
    researchLevel: 'moderate',
    summary: 'Tetrapeptide from the pineal gland. Studied for its telomerase activation properties, anti-aging effects, and circadian rhythm regulation. One of the most researched anti-aging peptides in Russian geroscience.',
    mechanism: 'Activates telomerase enzyme → extends telomere length. Regulates pineal gland melatonin secretion. Antioxidant effects. Suppresses oncogene expression in some models.',
    benefits: [
      'Telomere extension (in vitro and animal data)',
      'Improved sleep via melatonin regulation',
      'Extended lifespan in animal models',
      'Antioxidant, anti-tumor properties in animal studies',
      'Retinal function preservation',
    ],
    dosing: {
      typical: '5–10 mg/day SC, cyclically',
      range: '5–10 mg/day for 10–20 day courses',
      route: ['subcutaneous injection'],
      cycle: '10–20 days, 1–2x/year (typical geroscience protocol)',
      notes: 'Most evidence from Russian research groups. Human clinical evidence limited.',
    },
    sideEffects: 'Well-tolerated in studies. No significant adverse events reported.',
    keyReferences: ['Khavinson V et al. (2003). Epithalamin and aging. Annals NY Acad Sci.'],
  },

  // ─── Thymosin Alpha-1 ─────────────────────────────────────────────────────────
  {
    id: 'thymosin_alpha1',
    name: 'Thymosin Alpha-1',
    fullName: 'Thymosin Alpha-1 (Zadaxin)',
    aliases: ['Tα1', 'Zadaxin', 'TA1'],
    category: 'Immune Modulation',
    categoryTag: 'immune',
    goals: ['inflammation', 'fatigue', 'longevity'],
    regulatoryStatus: 'FDA-approved in some countries (Zadaxin) for hepatitis B/C and immune deficiency. Used off-label in US via compounding.',
    researchLevel: 'high',
    summary: 'Endogenous thymic peptide that modulates immune function — primarily T-cell differentiation and activation. Used for chronic infections, immune deficiency, and as an adjuvant in cancer therapy.',
    mechanism: 'Binds TLR2 and TLR9 on dendritic cells and T-cells. Enhances Th1 differentiation, NK cell activity, IL-2 and IFN-γ production. Reduces excessive Th2/inflammatory response in autoimmunity.',
    benefits: [
      'Enhances T-cell immunity (Th1 response)',
      'Antiviral: hepatitis B/C, COVID-19 (studied)',
      'Adjuvant in cancer immunotherapy',
      'Reduces chronic fatigue in immune-compromised patients',
      'Autoimmune modulation',
    ],
    dosing: {
      typical: '1.6 mg SC twice weekly (Zadaxin standard)',
      range: '0.8–3.2 mg/dose',
      route: ['subcutaneous injection'],
      cycle: '6–12 months for chronic conditions; shorter for acute immune support',
      notes: 'Well-established clinical dosing from Zadaxin trials.',
    },
    sideEffects: 'Very well-tolerated. Injection site reactions. No significant systemic adverse effects in trials.',
    keyReferences: ['Tuthill CW et al. (1994). Thymosin alpha-1 clinical use. Ann NY Acad Sci.'],
  },

  // ─── Selank ───────────────────────────────────────────────────────────────────
  {
    id: 'selank',
    name: 'Selank',
    fullName: 'Selank (TP-7)',
    aliases: ['TP-7'],
    category: 'Neuropeptide / Anxiolytic',
    categoryTag: 'neuro',
    goals: ['mental_clarity', 'neuroprotection', 'fatigue'],
    regulatoryStatus: 'Not FDA-approved. Registered in Russia as anxiolytic. Research peptide in US.',
    researchLevel: 'moderate',
    summary: 'Synthetic analogue of tuftsin. Anxiolytic, nootropic, and immunomodulatory peptide with no addictive potential. Acts on multiple neurotransmitter systems.',
    mechanism: 'Modulates GABA-A receptors (benzodiazepine-like mechanism without dependence). Increases BDNF, serotonin turnover. Inhibits enkephalin degradation. Stabilizes mRNA of IL-6 and IL-2.',
    benefits: [
      'Anxiolytic without sedation or dependence',
      'Nootropic — improved learning, memory, attention',
      'Mood stabilization',
      'Immune modulation',
      'Neuroprotection',
    ],
    dosing: {
      typical: '250–500 mcg intranasal or SC, 1–2x daily',
      range: '100–1,000 mcg/day',
      route: ['intranasal', 'subcutaneous injection'],
      cycle: '2–4 weeks; can be used as needed',
      notes: 'Intranasal administration is most common and convenient.',
    },
    sideEffects: 'Excellent tolerability. Mild sedation at higher doses. No withdrawal or dependence.',
    keyReferences: ['Semenova TP et al. (2010). Selank anxiolytic effects. Bull Exp Biol Med.'],
  },

  // ─── Semax ────────────────────────────────────────────────────────────────────
  {
    id: 'semax',
    name: 'Semax',
    fullName: 'Semax (ACTH 4-10 analogue)',
    aliases: ['ACTH 4-10 Pro-Gly-Pro'],
    category: 'Neuropeptide / Cognitive',
    categoryTag: 'neuro',
    goals: ['mental_clarity', 'neuroprotection', 'fatigue'],
    regulatoryStatus: 'Not FDA-approved. Registered drug in Russia. Research peptide in US.',
    researchLevel: 'moderate',
    summary: 'Synthetic ACTH 4-10 analogue with potent BDNF-stimulating and neuroprotective properties. Used for cognitive enhancement, stroke recovery, and ADHD-like conditions.',
    mechanism: 'Upregulates BDNF and NGF expression. Activates melanocortin receptors. Enhances dopaminergic and serotonergic neurotransmission. Anti-oxidative effects in brain tissue.',
    benefits: [
      'BDNF upregulation — neuroplasticity, learning, memory',
      'Cognitive enhancement (attention, processing speed)',
      'Stroke recovery and neuroprotection',
      'Anti-anxiety and antidepressant properties',
      'Energy and motivation enhancement',
    ],
    dosing: {
      typical: '200–600 mcg intranasal, 1–2x daily',
      range: '100–1,200 mcg/day',
      route: ['intranasal', 'subcutaneous injection'],
      cycle: '2–4 weeks on, 1–2 weeks off',
      notes: 'Intranasal preferred for direct CNS access. Morning dosing recommended (stimulatory).',
    },
    sideEffects: 'Generally well-tolerated. Possible mild anxiety at higher doses. No serious adverse effects reported.',
    keyReferences: ['Akhapkina VI et al. (2001). Semax neuroprotection and cognitive effects. Neurosci Behav Physiol.'],
  },

  // ─── KPV ──────────────────────────────────────────────────────────────────────
  {
    id: 'kpv',
    name: 'KPV',
    fullName: 'KPV Tripeptide (Lys-Pro-Val)',
    aliases: ['α-MSH fragment', 'Lys-Pro-Val'],
    category: 'Anti-Inflammatory / GI',
    categoryTag: 'gut',
    goals: ['gut_health', 'inflammation'],
    regulatoryStatus: 'Research peptide. Not FDA-approved.',
    researchLevel: 'moderate',
    summary: 'C-terminal fragment of alpha-MSH. Potent anti-inflammatory peptide with particular efficacy in gut inflammation. Often stacked with BPC-157 for IBD and leaky gut.',
    mechanism: 'Binds MC1R and MC3R. Inhibits NF-κB, TNF-α, and IL-1β. Reduces intestinal inflammation and permeability. Direct effect on colonic epithelium.',
    benefits: [
      'Reduces intestinal inflammation (IBD, Crohn\'s)',
      'Improves gut barrier integrity',
      'Systemic anti-inflammatory',
      'Potential wound healing properties',
    ],
    dosing: {
      typical: '100–500 mcg oral or SC, once or twice daily',
      range: '100–500 mcg/dose',
      route: ['oral', 'subcutaneous injection'],
      cycle: '4–8 weeks for gut conditions',
      notes: 'Oral bioavailability present (unlike most peptides). Combine with BPC-157 for synergistic GI healing.',
    },
    sideEffects: 'Very limited adverse event data. Appears well-tolerated in available studies.',
    keyReferences: ['Catania A et al. (2004). Alpha-MSH fragments and inflammation. Peptides.'],
  },

  // ─── MOTS-c ───────────────────────────────────────────────────────────────────
  {
    id: 'motsc',
    name: 'MOTS-c',
    fullName: 'Mitochondrial-Derived Peptide MOTS-c',
    aliases: ['Mitochondrial Open Reading Frame of the 12S rRNA-c'],
    category: 'Mitochondrial / Metabolic',
    categoryTag: 'mitochondrial',
    goals: ['mitochondrial', 'metabolic_health', 'longevity', 'fatigue'],
    regulatoryStatus: 'Research peptide. Not FDA-approved.',
    researchLevel: 'emerging',
    summary: 'Mitochondria-derived peptide encoded in the mitochondrial genome. Regulates insulin sensitivity, mitochondrial biogenesis, and metabolic homeostasis. Declines with age.',
    mechanism: 'Activates AMPK pathway. Regulates folate cycle and purine biosynthesis. Translocates to nucleus under metabolic stress, regulating nuclear gene expression for metabolic adaptation.',
    benefits: [
      'Improved insulin sensitivity',
      'Mitochondrial biogenesis and function',
      'Enhanced exercise performance and endurance',
      'Anti-aging metabolic effects',
      'Potential in T2DM management',
    ],
    dosing: {
      typical: '5–10 mg/week SC',
      range: '5–15 mg/week',
      route: ['subcutaneous injection'],
      cycle: '4–8 weeks',
      notes: 'Emerging peptide; limited established human protocols. Best used alongside exercise.',
    },
    sideEffects: 'Limited data. Appears well-tolerated in available animal and early human data.',
    keyReferences: ['Lee C et al. (2015). MOTS-c: a mitochondrial derived peptide regulating muscle and fat metabolism. Cell Metab.'],
  },

  // ─── SS-31 / Elamipretide ──────────────────────────────────────────────────────
  {
    id: 'ss31',
    name: 'SS-31',
    fullName: 'Elamipretide (SS-31)',
    aliases: ['MTP-131', 'Bendavia', 'D-Arg-2\'6\'-Dmt-Lys-Phe-NH2'],
    category: 'Mitochondrial',
    categoryTag: 'mitochondrial',
    goals: ['mitochondrial', 'longevity', 'fatigue', 'recovery'],
    regulatoryStatus: 'Investigational. Phase III trials completed. Not yet FDA-approved (NDA submitted for Barth syndrome).',
    researchLevel: 'high',
    summary: 'Cardiolipin-targeting mitochondrial peptide. Directly targets the inner mitochondrial membrane, restoring cristae structure and electron transport chain efficiency. Strongest evidence for cardiac and skeletal muscle mitochondrial restoration.',
    mechanism: 'Binds selectively to cardiolipin on inner mitochondrial membrane. Stabilizes cristae architecture, reduces electron leak, restores ATP synthesis, and reduces mitochondrial ROS.',
    benefits: [
      'Mitochondrial function restoration',
      'Improved cardiac function (heart failure with preserved EF)',
      'Reduced age-related skeletal muscle dysfunction',
      'Ischemia-reperfusion protection',
      'Energy and fatigue improvement',
    ],
    dosing: {
      typical: '0.05–0.25 mg/kg SC or IV (clinical trial dosing)',
      range: 'Varies by indication',
      route: ['subcutaneous injection', 'intravenous (clinical trials)'],
      cycle: 'Ongoing; 28-day trial data for Barth syndrome',
      notes: 'Highest-evidence mitochondrial peptide. Complex protocol — physician supervision required.',
    },
    sideEffects: 'Well-tolerated in trials. Injection site reactions. No serious adverse effects.',
    keyReferences: ['Szeto HH. (2017). Mitochondria-targeted peptide antioxidants. FASEB J.'],
  },

];

// ─── Helper: get peptide by ID ─────────────────────────────────────────────────
export const getPeptideById = (id) =>
  PEPTIDE_KNOWLEDGE_BASE.find(p => p.id === id);

// ─── Helper: get peptides by goal ─────────────────────────────────────────────
export const getPeptidesByGoal = (goalId) =>
  PEPTIDE_KNOWLEDGE_BASE.filter(p => p.goals.includes(goalId));

// ─── Helper: get peptides by category ─────────────────────────────────────────
export const getPeptidesByCategory = (cat) =>
  PEPTIDE_KNOWLEDGE_BASE.filter(p => p.categoryTag === cat);

// ─── Category color map (for UI) ──────────────────────────────────────────────
export const CATEGORY_COLORS = {
  healing:        { bg: '#0d3d2e', accent: '#10b981', label: 'Healing' },
  metabolic:      { bg: '#1a2a0d', accent: '#84cc16', label: 'Metabolic' },
  gh_axis:        { bg: '#0d1f3d', accent: '#3b82f6', label: 'GH Axis' },
  sexual:         { bg: '#3d0d2a', accent: '#ec4899', label: 'Sexual Health' },
  longevity:      { bg: '#2a0d3d', accent: '#a855f7', label: 'Longevity' },
  neuro:          { bg: '#1a0d3d', accent: '#6366f1', label: 'Neuropeptide' },
  neuroprotection:{ bg: '#1a0d3d', accent: '#6366f1', label: 'Neuroprotection' },
  immune:         { bg: '#0d2a3d', accent: '#0ea5e9', label: 'Immune' },
  mitochondrial:  { bg: '#3d2a0d', accent: '#f59e0b', label: 'Mitochondrial' },
  anti_aging:     { bg: '#3d1a0d', accent: '#f97316', label: 'Anti-Aging' },
  fertility:      { bg: '#0d3d1a', accent: '#22c55e', label: 'Fertility' },
  gut:            { bg: '#0d3d1a', accent: '#16a34a', label: 'GI Health' },
};
