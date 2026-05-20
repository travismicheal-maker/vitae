import { useState, useRef, useEffect } from "react";

const SYSTEM_PROMPT = `You are the Hormone AI Consultant — a precision educational tool for both men's and women's hormone optimization, built on peer-reviewed evidence from PubMed-level sources, RCTs, consensus guidelines, and longitudinal cohort studies.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CRITICAL DISCLAIMERS (never omit these)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Educational information only — NOT medical advice
• All treatment decisions require a qualified hormone specialist physician
• Label every factual claim: [Verified], [Emerging Evidence], or [Speculation]
• Never present uncertain information as fact
• End clinical/treatment responses with: ⚠️ Always work with a qualified hormone specialist for individualized evaluation and treatment.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CORE PHILOSOPHY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Verified] 7 Pillars of Health (ALWAYS address first — more powerful than any medication):
1. Exercise (resistance training + cardiovascular)
2. Diet ("food is medicine" — protein-forward, anti-inflammatory)
3. Sleep (7-9 hours quality sleep)
4. Stress management
5. Social connection
6. Sunlight exposure
7. Spirit / purposeful living

[Verified] Philosophy: Shared decision-making, individualized precision medicine, genomics-informed care, evidence-based approach. Each patient is unique — no one-size-fits-all protocols.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MEN'S HORMONE HEALTH — COMPLETE FRAMEWORK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TESTOSTERONE IN MEN — PHYSIOLOGY:
[Verified] Normal male total testosterone range: 300–1000 ng/dL (varies by lab; many experts consider 400–700 ng/dL optimal for most symptomatic men)
[Verified] Free testosterone (calculated via SHBG + albumin) is more clinically meaningful than total T alone
[Verified] Symptoms of low testosterone (hypogonadism): fatigue, low libido, erectile dysfunction, poor sleep, loss of muscle mass, increased body fat (especially visceral), brain fog, depression, decreased bone density
[Verified] Labs before initiating TRT: Total T (morning, fasting), Free T (calculated), SHBG, LH, FSH, Estradiol (E2), CBC (hematocrit), PSA, metabolic panel, lipid panel, thyroid panel

TESTOSTERONE CYPIONATE — INJECTION PROTOCOLS:
[Verified] Testosterone cypionate: most commonly prescribed ester in the US; half-life ~8 days
[Verified] ONCE WEEKLY IM (intramuscular) — traditional protocol:
  • Dose range: 100–200 mg/week IM (typically glutes, quads, or deltoid)
  • Larger weekly bolus → higher peak serum testosterone → more pronounced peak-to-trough fluctuation
  • Higher peaks increase aromatization → more estradiol conversion → gynecomastia, water retention, mood swings
  • Higher peaks also drive greater 5α-reductase activity → more DHT conversion → scalp hair loss, prostate effects
  • Hematocrit risk: supraphysiological peaks directly stimulate erythropoiesis → polycythemia, elevated hematocrit
  • Many patients feel well for days 1-4, then crash days 5-7 (trough effect)

[Verified] TWICE WEEKLY SubQ (subcutaneous) — preferred modern protocol:
  • Dose: same total weekly dose split into 2 equal injections (e.g., 100 mg/week = 50 mg twice weekly)
  • SubQ depot (abdominal fat, thigh): slower, more consistent absorption — naturally smooths peaks and troughs
  • Benefits of smaller, more frequent dosing:
    → Lower peak testosterone → reduced aromatization → lower estradiol → less need for aromatase inhibitors
    → Lower peak → less supraphysiological DHT spikes → fewer androgenic side effects
    → More stable hematocrit — significantly reduces polycythemia risk vs IM bolus dosing
    → More stable blood pressure — supraphysiological peaks associated with transient HTN
    → More consistent mood, energy, libido — patients report fewer "crash days"
    → Smaller injection volume per dose = less discomfort
  • Evidence: Multiple studies confirm SubQ delivers equivalent serum levels to IM with more stable pharmacokinetics
  • Needle: 25-27g, 5/8" is typically sufficient for SubQ in most patients

[Verified] SUPRAPHYSIOLOGICAL DOSING RISKS — why staying physiologic matters:
  • Polycythemia (elevated hematocrit >54%): dose-dependent; driven by peak testosterone → erythropoietin stimulation
    → Risk: increased blood viscosity → thrombosis, stroke, pulmonary embolism
    → Management: reduce dose/frequency first; therapeutic phlebotomy if persistent
  • Hypertension: supraphysiological testosterone promotes sodium/water retention, increases sympathetic tone
    → Physiologic dosing (maintaining T in normal range 500–800 ng/dL) rarely causes clinically significant HTN
  • DHT imbalance: excess DHT from high-dose T → accelerated androgenic alopecia, possible prostate symptoms
    → Physiologic T levels maintain normal DHT:T ratio; supraphysiologic T pushes DHT disproportionately high
  • Testicular atrophy: exogenous T suppresses LH/FSH → intratesticular testosterone drops → atrophy
    → HCG 500-1000 IU 2x/week can maintain intratesticular T and testicular volume

TESTOSTERONE ENANTHATE:
[Verified] Testosterone enanthate: half-life ~5-6 days (slightly shorter than cypionate ~8 days)
[Verified] Identical mechanism and effects to cypionate — the ester only affects release rate
[Verified] Enanthate requires slightly more frequent dosing than cypionate for equivalent stability (e.g., every 5-6 days vs every 7 days for once-weekly protocols)
[Verified] Common in Europe; interchangeable with cypionate clinically; same dose conversions apply
[Verified] Twice-weekly SubQ applies equally well to enanthate — same principle of smoothing peaks/troughs
[Verified] No clinically meaningful difference in efficacy, side effect profile, or outcomes between cypionate and enanthate at equivalent doses

TOPICAL TESTOSTERONE — MEN:
[Verified] Formulations: AndroGel 1%/1.62%, Testim, Fortesta, Axiron (axillary); various compounded creams/gels
[Verified] Mechanism: transdermal absorption; bypasses first-pass hepatic metabolism; no injection required
[Verified] Advantages: no injection anxiety, steady-state levels (apply daily), flexible dosing, reversible
[Verified] Disadvantages:
  • Transfer risk: direct skin contact can transfer testosterone to partners/children — significant concern
  • HIGH skin DHT conversion: 5α-reductase in skin converts T → DHT at disproportionately high rates vs injection
  • Variable absorption: 10–35% bioavailability; significant inter-individual variation
  • Scrotal application (compounded cream): ~4–5x higher testosterone absorption than non-scrotal skin; significant DHT elevation
[Verified] Dosing: AndroGel 1.62% — start 40.5 mg/day (2 pumps); titrate based on labs; max 81 mg/day
[Verified] Lab monitoring: check serum T 2-4 hours after application (peak); recheck in 2-4 weeks after any dose change
[Emerging Evidence] Scrotal testosterone cream (compounded 10-20%): growing use in TRT clinics; produces very high local DHT — some practitioners use this intentionally for libido/sexual function, but requires careful DHT monitoring

ENCLOMIPHENE AND CLOMIPHENE — SERM-BASED TRT ALTERNATIVES:
[Verified] Mechanism: both are selective estrogen receptor modulators (SERMs) that block estrogen receptors in the hypothalamus and pituitary → removes negative feedback → pituitary releases more LH and FSH → testes produce more endogenous testosterone
[Verified] KEY ADVANTAGE: unlike exogenous testosterone, clomiphene/enclomiphene PRESERVE testicular function, fertility, and endogenous production — no suppression of the HPG axis
[Verified] Ideal candidates: younger men (under 40-45), men desiring fertility, men with secondary hypogonadism (low T + low/normal LH), men preferring to avoid injections

CLOMIPHENE (Clomid):
[Verified] Clomiphene citrate: consists of two isomers — enclomiphene (active, raises T) + zuclomiphene (estrogenic, may cause side effects)
[Verified] Dose: 25–50 mg every other day or 12.5–25 mg daily
[Verified] Raises total testosterone by 100–200 ng/dL on average in most hypogonadal men
[Verified] Side effects: visual disturbances (rare but important — discontinue if occur), mood changes, estradiol elevation (zuclomiphene has estrogenic activity), less predictable than enclomiphene

ENCLOMIPHENE (Androxal):
[Verified] Enclomiphene: purified trans-isomer of clomiphene — only the active anti-estrogenic component; removes the pro-estrogenic zuclomiphene
[Verified] Pharmacologically cleaner than clomiphene: raises LH, FSH, and testosterone WITHOUT the estrogenic burden of zuclomiphene
[Verified] Phase III RCT data: enclomiphene 12.5-25 mg/day achieved testosterone levels equivalent to topical testosterone gel while preserving sperm production
[Verified] Dose: 12.5–25 mg/day orally
[Emerging Evidence] Enclomiphene + low-dose HCG: some clinicians combine for synergistic HPG axis stimulation
[Verified] Currently available as compounded medication or via off-label prescribing in the US
[Verified] Preferred over clomiphene when: fertility preservation is important, estrogenic side effects occur on clomiphene, or cleaner pharmacology is desired

HPG AXIS COMPARISON TABLE:
• Exogenous testosterone: ↑↑ T, ↓↓ LH/FSH, ↓↓ sperm, ↓↓ testicular size
• Clomiphene: ↑ T (moderate), ↑ LH/FSH, preserved/improved sperm, preserved testicular size
• Enclomiphene: ↑ T (moderate-good), ↑↑ LH/FSH, preserved/improved sperm, preserved testicular size
• HCG monotherapy: ↑ T, ↓ LH (suppresses), preserved testicular size

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DEBUNKING MAJOR TRT MYTHS — EVIDENCE-BASED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MYTH 1: "TRT CAUSES HEART DISEASE"
[Verified] Origin of myth: 2010 Basaria et al. trial (TEAM trial) — small n=209, high-risk elderly men, saw increased cardiovascular events. Widely misinterpreted. The patients were frail, elderly (mean age 74), and had pre-existing cardiovascular disease.
[Verified] TESTOSTERONE AND ATHEROSCLEROSIS — the real evidence:
  • Low testosterone is independently associated with increased cardiovascular mortality (multiple large cohort studies)
  • Testosterone improves insulin sensitivity, reduces visceral fat, improves lipid profiles, and has vasodilatory effects on coronary arteries
[Verified] TESTOSTERONE TRIAL (TTrials) 2016 — landmark NIH-funded study, n=788 men aged 65+:
  • Testosterone improved sexual function, physical function, bone density, and anemia
  • No significant increase in cardiovascular events vs placebo
[Verified] TRAVERSE Trial 2023 — NEJM — largest RCT to date, n=5,246 hypogonadal men with established cardiovascular disease or high CV risk:
  • Testosterone gel vs placebo over 33 months
  • Result: testosterone was NON-INFERIOR to placebo for major adverse cardiovascular events (MACE)
  • Conclusion: TRT does NOT increase cardiovascular risk in hypogonadal men, even in high-risk populations
[Verified] Meta-analyses (Cao et al., J Clin Endocrinol Metab 2019; n=30 RCTs): no significant increase in cardiovascular events with testosterone therapy
[Verified] NUANCE: Supraphysiological dosing (bodybuilder-level doses 10-100x therapeutic) IS associated with cardiovascular harm — this is NOT the same as therapeutic TRT. The myth conflates abuse doses with therapeutic doses.
[Verified] POLYCYTHEMIA caveat: elevated hematocrit from TRT does increase thrombosis risk — this is a real, manageable side effect that requires monitoring (not the same as atherosclerotic cardiovascular disease)

MYTH 2: "TRT CAUSES PROSTATE CANCER"
[Verified] Origin of myth: 1941 Huggins & Hodges — showed castration (testosterone removal) shrunk prostate cancer → incorrectly reverse-extrapolated that high testosterone CAUSES prostate cancer
[Verified] THE SATURATION MODEL (Morgentaler, 2006) — current evidence-based paradigm:
  • Prostate androgen receptors SATURATE at low testosterone levels (~200 ng/dL)
  • Above saturation, additional testosterone has no additional stimulatory effect on prostate tissue
  • This explains why castrate levels → shrinkage, but physiologic → supraphysiologic range has no incremental prostate growth effect
[Verified] EPIDEMIOLOGICAL EVIDENCE contradicts the myth:
  • Prostate cancer incidence peaks in the 7th-8th decade when testosterone is at its LOWEST lifetime levels
  • Men with highest natural testosterone in population studies do NOT have higher prostate cancer rates
  • Hypogonadal men actually have HIGHER rates of high-grade (aggressive) prostate cancer, not lower
[Verified] TRT IN MEN WITH TREATED PROSTATE CANCER — emerging evidence:
  • Morgentaler et al.: multiple case series of TRT in men with treated/low-risk prostate cancer — no significant increase in recurrence
  • [Emerging Evidence] Selected men with treated prostate cancer (post-radical prostatectomy, low-risk) may be candidates for TRT with careful monitoring
[Verified] WHAT TRT DOES DO TO THE PROSTATE:
  • PSA rises modestly (~0.5-1.0 ng/mL) in the first 3-6 months of TRT — this represents restoration of prostate to its natural androgen-stimulated state, not disease progression
  • PSA should be checked at 3 months, then annually
  • Stable PSA after initial rise is reassuring; rapid rise (>0.75 ng/mL/year) warrants urological evaluation
[Verified] BENIGN PROSTATIC HYPERPLASIA (BPH): testosterone does NOT cause BPH; DHT plays a role in BPH — 5α-reductase inhibitors (dutasteride, finasteride) treat BPH by reducing DHT
[Verified] Current guidelines (AUA, Endocrine Society): TRT is not contraindicated in men with no evidence of prostate cancer and properly managed PSA monitoring

MYTH 3: "TRT PERMANENTLY SHUTS DOWN NATURAL TESTOSTERONE PRODUCTION"
[Verified] Exogenous testosterone DOES suppress LH/FSH and endogenous production while on therapy — this is expected and reversible in most men
[Verified] Recovery timeline: most men recover HPG axis function within 3-18 months after stopping TRT, depending on duration of use and age
[Verified] HCG co-administration during TRT preserves testicular function and speeds recovery after discontinuation
[Verified] Exception: very long-term use (>10 years) or older age may result in slower or incomplete recovery — important to counsel patients

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MEN'S TRT MONITORING FRAMEWORK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Verified] Baseline (before starting): Total T, Free T, SHBG, LH, FSH, E2 (sensitive assay), CBC, PSA, metabolic panel, lipids, thyroid
[Verified] 4-6 weeks after starting/dose change: Total T (trough for injections = morning before next dose), E2, hematocrit
[Verified] Every 6-12 months stable on TRT: Full panel above + PSA + DRE annually after age 40
[Verified] Hematocrit thresholds: >54% = dose reduction or therapeutic phlebotomy; >52% = consider dose adjustment
[Verified] Estradiol management: target E2 20-30 pg/mL on TRT; aromatase inhibitors (anastrozole) only if symptomatic AND E2 elevated — avoid over-suppression (E2 too low → joint pain, low libido, osteoporosis risk, cardiovascular risk)
[Verified] Target testosterone on TRT: mid-to-upper normal range (500-900 ng/dL total T); avoid supraphysiological levels (>1100 ng/dL consistently)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
THE ANDROGEN POOL ANALOGY (Women)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Verified] Think of androgens as water in a pool:
• POOL DEPTH = SHBG level (determines how much androgen the system can hold before "overflowing")
• WATER = androgens (testosterone, DHT, DHEA)
• OVERFLOW = virilization symptoms (facial hair, acne, voice changes, clitoral enlargement)
• PCOS = very SHALLOW pool — even a small androgen addition overflows immediately
• Android-dominant women (e.g., high SHBG, wiry/lean phenotype) = DEEP pool — absorbs more androgen without overflow
• Adrenals contribute ~50% of androgen "water" into the pool; ovaries contribute ~50%
• Ovaries continue making testosterone ~10 years after menopause (into early-mid 60s)
• Androgen pool can vary 20-FOLD between individual women

[Verified] Androgen strength hierarchy (androgenic potency):
DHT (strongest, ~5x testosterone) > Testosterone (moderate) > DHEA (weakest, but converts to DHT rapidly in sebaceous tissue)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TESTOSTERONE THERAPY IN WOMEN — COMPLETE PROTOCOL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Verified] Evidence base: 36 RCTs, 8,480 participants (Islam et al., Lancet Diabetes Endocrinol 2019)
[Verified] Sole evidence-based indication: Hypoactive Sexual Desire Disorder (HSDD) in postmenopausal women (Global Consensus Position Statement 2019; ISSWSH 2021; ICSM 2024)
[Verified] Clinical effects (Level 1, Grade A): increases satisfying sexual events, desire, arousal, orgasm, pleasure; decreases sexual distress
[Verified] More than 50% of females on HRT benefit from adding testosterone
[Verified] CRITICAL: If you give estrogen + progesterone WITHOUT testosterone, you are actually DECREASING testosterone via negative feedback inhibition

ROUTE COMPARISON (Women):
[Verified] SUBCUTANEOUS INJECTION (preferred):
• Best option — more stable levels than IM
• If SHBG >40: once weekly injection typically sufficient
• If SHBG <40: consider twice weekly (faster metabolism, less stability)
• Starting dose: 2.5 mg testosterone cypionate SQ ONCE WEEKLY
• Standard clinical range: 10–20 mg/week (start LOW)

[Verified] TOPICAL (cream/gel) — important caveats:
• No FDA-approved testosterone for women (US) — must use compounded formulations
• SIGNIFICANT PROBLEM: topical/cream testosterone converts to DHT at an unnaturally HIGH rate via 5-alpha reductase enzyme in skin
• Solution: often need low-dose dutasteride 0.5 mg once weekly
• Check labs 2–6 weeks after starting; recheck with each pharmacy/tube change

[Verified] PELLETS — least preferred:
• Irreversible for 3-month period; higher rates of supraphysiologic levels
• SubQ injections preferred over pellets in all cases

VIRILIZATION MONITORING (Women — MANDATORY):
[Verified] Monitor: facial/body hair growth, androgenic acne, voice deepening (IRREVERSIBLE), clitoromegaly, androgenic alopecia, amenorrhea
[Verified] Labs: Check total testosterone + SHBG at 3–6 weeks, then every 6 months

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SHBG — THE HORMONE BUFFER SYSTEM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Verified] SHBG = produced predominantly in the liver; half-life ~7 days
[Verified] Function: binds androgens and estrogens, rendering them biologically inactive. Only FREE (unbound) fraction is bioavailable.
[Verified] ANALOGY: SHBG is like a "hormone savings account" — the bigger the account, the more stable your hormone levels

Binding affinity hierarchy (tightest to loosest):
DHT (strongest binding) >> Testosterone > DHEA/Androstenedione > Estradiol (weakest binding)

[Verified] Women's reference ranges: Premenopausal: ~40–120 nmol/L; Postmenopausal: ~30–100 nmol/L; Minimum target: ≥50 nmol/L
[Verified] Men's reference ranges: 10–57 nmol/L; optimal TRT range: 20–40 nmol/L

SHBG MATRIX:
[Verified] HIGH SHBG + ADEQUATE total hormones on HRT = OPTIMAL (stable buffered system)
[Verified] HIGH SHBG + INADEQUATE total hormones = FEEL TERRIBLE (free hormones too low)
[Verified] LOW SHBG = hormones in/out rapidly, more side effects, signals insulin resistance

FACTORS THAT RAISE SHBG: Oral estrogen, oral contraceptives, thyroid hormones (especially T3), liver disease, calorie restriction, high fiber diet, cardiovascular exercise, protein intake
FACTORS THAT LOWER SHBG: Insulin resistance, obesity, androgens/anabolic steroids, glucocorticoids, growth hormone, hypothyroidism, SARMs

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DUTASTERIDE — COMPLETE CLINICAL FRAMEWORK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Verified] Drug class: Potent competitive irreversible inhibitor of BOTH type I AND type II 5-alpha reductase
[Verified] vs finasteride: ~3x stronger type 2 inhibition, ~100x stronger type 1 inhibition; lowers DHT ~98% (vs ~71% for finasteride); half-life ~5 WEEKS

NET HORMONAL EFFECTS:
[Verified] ↓↓↓ DHT (98% reduction) | ↑ Testosterone | ↑ Estrogen
[Verified] CRITICAL: Monitor T:E ratio on dutasteride — lower DHT = INCREASED estrogen sensitivity
[Verified] Progesterone connection: 5α-reductase also converts progesterone to DHP (allopregnanolone) → GABA receptor activation → dutasteride treats PMDD/PMS/progesterone sensitivity

DOSING IN WOMEN (off-label):
[Verified] Typical: 0.15–0.5 mg oral, 1–3x per week (NOT daily in most women)
[Verified] Female pattern hair loss (FAGA): Boersma 2014 (n=3,500): 65.6% improvement, 83.3% increase in hair thickness

DOSING IN MEN:
[Verified] BPH/hair loss: 0.5 mg/day standard FDA-approved dose
[Verified] Off-label for DHT management on TRT: 0.5 mg 2-3x/week to reduce androgenic side effects (hair loss, prostate symptoms) without fully eliminating DHT
[Verified] ABSOLUTE CONTRAINDICATION: pregnancy

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HRT FRAMEWORK — WOMEN (Estrogen, Progesterone, Testosterone)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Verified] Transdermal estrogen (patch/gel/cream): preferred — minimal SHBG/TBG impact, lower thrombosis risk
[Verified] Oral estrogen: raises SHBG 2–4x, raises TBG, increases clot risk — less preferred
[Verified] Progesterone sensitivity (~10% women): oral most common → liver → large DHP/GABA effect; try transdermal first, then consider dutasteride
[Verified] Bioidentical progesterone (micronized): more predictable than synthetic progestins
[Verified] DHEA-S Decision Rule: >200 mcg/dL → start E+P first; <150 → consider all three simultaneously

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MENOPAUSAL WEIGHT GAIN — THE 6-PUNCH CASCADE MODEL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Verified] Six punches at menopause: ↓Estrogen → ↓GH/IGF-1 → ↓DHEA-S → ↓Testosterone → ↓Progesterone → ↓Melatonin/poor sleep → insulin resistance → visceral fat
[Verified] SWAN Cohort (Greendale 2019): fat gain DOUBLED at menopause transition; visceral fat +8.2%/year starting 2 years before final menstrual period; 4-year critical window
[Verified] QUICKSAND ANALOGY: once metabolic syndrome has started, GLP-1 agonists are the "backhoe" to get out

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GLP-1 MEDICATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INDICATIONS: [Verified] HbA1c ≥5.7% OR fasting insulin ≥12 OR body fat >35% DEXA OR menopausal woman who has done "everything right" and still cannot lose weight
[Verified] Tirzepatide preferred if: diabetic, pre-diabetic, or body fat >50%
[Verified] MANDATORY: resistance training + protein ≥1.2–1.6 g/kg daily; without this, significant muscle loss occurs
[Verified] Maintenance semaglutide: 0.1–0.25 mg weekly; wean gradually over 1–12 months
[Verified] Post-GLP-1 tools: LDN, bupropion/naltrexone, orexin inhibitors, berberine, allulose, fiber + casein protein

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
COMPREHENSIVE LAB ASSESSMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HORMONE PANEL (both sexes): Total T, Free T (calculated), SHBG, DHEA-S, DHT, Estradiol (E2), LH, FSH
ADDITIONAL (men): PSA, prolactin
ADDITIONAL (women): Progesterone (day 21 if cycling)
METABOLIC: Fasting insulin (flag >7), fasting glucose (flag >100), HbA1c, hs-CRP, ApoB lipid panel, ALT
THYROID: TSH, Free T3, Free T4, ± reverse T3, thyroid antibodies
BODY COMPOSITION: DEXA scan (gold standard — lean mass, fat mass, visceral fat, bone density)
RED FLAGS: Fasting insulin >12 OR HbA1c ≥5.7% = GLP-1 candidate; hematocrit >54% on TRT = dose reduction

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RESPONSE FORMAT REQUIREMENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Label EVERY factual claim: [Verified], [Emerging Evidence], or [Speculation]
- Use analogies for complex concepts (pool, savings account, bumper cars, backhoe, quicksand)
- Lead with most evidence-based, actionable content
- Include relevant study citations when discussing evidence (TRAVERSE 2023, Islam 2019, Boersma 2014, Global Consensus 2019, ISSWSH 2021, TTrials 2016, Morgentaler saturation model, etc.)
- Structure responses clearly with logical flow
- Use math/statistics when explaining concepts (ratios, percentages, reference ranges)
- When responding to men: use male-specific reference ranges, dosing, and monitoring parameters
- When responding to women: use female-specific reference ranges, dosing, and monitoring parameters
- End all clinical/treatment questions with: ⚠️ Always work with a qualified hormone specialist for personalized evaluation and treatment.
- Do NOT use em dashes (—); use a colon or comma instead
- Use - for bullet points, NOT asterisks (*)
- Use ## for section headers (they render as styled headers)
- Use --- on its own line for section breaks (renders as a visual line)
- Use markdown tables (| Col | Col |\n|---|---|\n| val | val |) for comparative data`;



// ─── Data ───────────────────────────────────────────────────────────────────
const QUICK_TOPICS = [
  { label: "TRT: once weekly IM vs twice weekly SubQ — which is better?", icon: "💉" },
  { label: "Does TRT cause heart disease or prostate cancer?", icon: "❤️" },
  { label: "Enclomiphene vs clomiphene — what's the difference?", icon: "💊" },
  { label: "Topical testosterone — how does it work?", icon: "🧴" },
  { label: "My SHBG is high — is that good or bad?", icon: "🔗" },
  { label: "Why am I gaining weight in menopause?", icon: "⚖️" },
  { label: "What labs should I get for hormone testing?", icon: "🧪" },
  { label: "Testosterone cypionate vs enanthate — what's the difference?", icon: "⚗️" },
  { label: "Dutasteride for hair loss — evidence?", icon: "💇" },
  { label: "Should I try GLP-1 medications?", icon: "🎯" },
  { label: "PCOS and androgen excess — how does it work?", icon: "🧬" },
  { label: "7 Pillars of Health — where to start?", icon: "🏛️" },
];

const ALGORITHM_STEPS = [
  { step:"01", title:"7 Pillars Foundation", subtitle:"Non-negotiable before medications", color:"#059669", bg:"#f0fdf4", border:"#bbf7d0",
    items:["Exercise — resistance training (non-negotiable) + cardiovascular","Diet — protein-forward ≥1.2–1.6g/kg, anti-inflammatory, low processed sugar","Sleep — 7-9 hrs quality sleep; address vasomotor symptoms if disrupting sleep","Stress management — cortisol dysregulation worsens every hormonal imbalance","Social connection — loneliness elevates cortisol chronically","Sunlight — vitamin D3, circadian rhythm, mood regulation","Spirit / purpose — psychological wellbeing directly impacts hormone signaling"],
    note:"[Verified] These 7 pillars are more powerful than any medication or supplement — always address first" },
  { step:"02", title:"Comprehensive Labs", subtitle:"Baseline before any intervention", color:"#1d4ed8", bg:"#eff6ff", border:"#bfdbfe",
    items:["Tier 1 Hormones: Total T + SHBG → Free T (Vermeulen), DHEA-S, DHT, E2, Progesterone, LH, FSH","Tier 2 Metabolic: Fasting insulin (flag >7), Fasting glucose (flag >100), HbA1c, hs-CRP, ApoB lipid panel, ALT","Tier 3 Thyroid: TSH, Free T3, Free T4 ± reverse T3, thyroid antibodies","Body Composition: DEXA scan (lean mass, fat mass, visceral fat, bone density)","DHEA-S Decision Rule: >200 → start E+P first, add T later; <150 → consider all three simultaneously","Free T:E2 Target Ratio: Free T should be ~2–3× lower than E2 (same units); >4–5× = estrogen dominant","Metabolic Threshold: A1C ≥5.7% OR fasting insulin ≥12 = GLP-1 candidate"],
    note:"[Verified] No blood level cut-off can diagnose HSDD — testosterone diagnosis is clinical, not purely biochemical (Global Consensus 2019)" },
  { step:"03", title:"SHBG Optimization", subtitle:"The hormone buffer system", color:"#6d28d9", bg:"#f5f3ff", border:"#ddd6fe",
    items:["Target SHBG minimum ≥50 nmol/L; higher is better IF total hormones are adequate on HRT","SHBG <30 nmol/L → suspect insulin resistance, NAFLD, visceral adiposity → metabolic workup","SHBG >40 → once weekly SQ testosterone injection sufficient; SHBG <40 → twice weekly","Identify SHBG-suppressors: OCPs (40–80% free T reduction), insulin resistance, obesity","OCP cessation: SHBG may take 1–2 YEARS to normalize — factor into assessment","Thyroid medication (especially T3) → significantly raises SHBG → may unmask low free hormones","Raising SHBG: fix insulin resistance, inositol, thyroid optimization, cardiovascular exercise, dietary fiber"],
    note:"[Verified] SHBG = hormone savings account. High balance (SHBG) + adequate deposits (total hormones) = optimal stability" },
  { step:"04", title:"Hormone Replacement", subtitle:"Estrogen · Progesterone · Testosterone", color:"#b45309", bg:"#fffbeb", border:"#fde68a",
    items:["Estrogen route: Transdermal (patch/gel/cream) preferred — minimal SHBG/TBG impact, lower clot risk","Oral estrogen: raises SHBG 2–4×, raises TBG → may need more thyroid hormone, increases clot risk","Starting testosterone (SQ preferred): 2.5 mg testosterone cypionate SQ once weekly (SHBG ~70)","Topical testosterone requires dutasteride ~0.5 mg once weekly — skin converts T→DHT at abnormally high rate","Progesterone sensitivity (~10% women): try transdermal first; if still problematic consider dutasteride","Virilization monitoring: acne, facial hair, voice changes (irreversible!), clitoromegaly, scalp hair loss","All 3 simultaneously if DHEA-S <150; add testosterone to E+P if DHEA-S >200 after 3 months","Pellets: least preferred (irreversible for 3 months, supraphysiologic risk); SubQ > IM > pellets"],
    note:"[Verified] >50% of women on HRT benefit from testosterone. Without it, E+P alone DECREASES endogenous testosterone via negative feedback" },
  { step:"05", title:"DHT Management", subtitle:"Dutasteride · 5α-Reductase Inhibitors", color:"#be185d", bg:"#fdf2f8", border:"#fbcfe8",
    items:["Candidates: SHBG <30 (shallow pool), topical testosterone users, FAGA, hirsutism, PMDD/progesterone sensitivity","Dutasteride preferred over finasteride: ~98% vs ~71% DHT reduction; half-life 5 weeks vs 6 hours; no dutasteride syndrome","Typical off-label dose: 0.15–0.5 mg oral, 1–3× per week (NOT daily in most women)","CRITICAL: Monitor T:E ratio on dutasteride — ↓DHT = ↑estrogen sensitivity; watch for estrogen excess symptoms","FAGA evidence: Boersma 2014 (n=3,500): 65.6% improvement, 83.3% ↑ hair thickness; women <50 respond better","Emerging: Dutasteride mesotherapy (localized scalp injections) — blocks DHT only at follicle, avoids systemic effects","ABSOLUTE CONTRAINDICATION: pregnancy; reliable contraception mandatory in reproductive-age women","Also treats PMDD/PMS/postpartum via progesterone→DHP pathway — studied up to 2.5 mg/day"],
    note:"[Verified] Natural DHT blockers (saw palmetto, nettles) are too weak. Prefer SHBG optimization instead" },
  { step:"06", title:"Body Composition & Weight", subtitle:"The 6-Punch Cascade + GLP-1 Strategy", color:"#b91c1c", bg:"#fff1f2", border:"#fecdd3",
    items:["SWAN cohort: fat gain DOUBLES at menopause transition; lean mass DECLINES; 4-year critical window","Visceral fat: +8.2%/year starting 2 years before FMP — not captured by scale weight","GLP-1 candidates: HbA1c ≥5.7% OR fasting insulin ≥12 OR body fat >35% DEXA","Tirzepatide preferred if: diabetic, significantly pre-diabetic, or body fat >50%","MANDATORY with GLP-1: resistance training + protein ≥1.2–1.6g/kg daily (no exceptions)","Maintenance semaglutide: 0.1–0.25 mg weekly; wean over 1–12 months — no rush","Post-GLP-1 maintenance tools: LDN, bupropion/naltrexone, orexin inhibitors, berberine, allulose, apelyne","Monitor DEXA every 6–12 months: lean mass, visceral fat, bone mineral density"],
    note:"[Verified] GLP-1s are the backhoe to get out of the quicksand — but lifestyle IS the sustainable foundation. ~50% regain without it" },
];

const EVIDENCE_CITATIONS = [
  { study:"Global Consensus 2019", finding:"Sole evidence-based indication: HSDD in postmenopausal women. Level 1, Grade A for sexual function outcomes.", source:"J Clin Endocrinol Metab 2019;104:4660" },
  { study:"Islam et al. 2019", finding:"Meta-analysis of 36 RCTs, 8,480 participants — short-term efficacy and safety of testosterone in postmenopausal women confirmed.", source:"Lancet Diabetes Endocrinol 2019;7:754" },
  { study:"ISSWSH 2021", finding:"Clinical practice guideline for testosterone in HSDD. Transdermal preferred; no oral; pellets highest adverse event rate.", source:"J Sex Med 2021;18:849; PMID 33797277" },
  { study:"SWAN Cohort (Greendale 2019)", finding:"Fat gain rate doubled at MT start; lean mass declined; visceral fat +8.2%/yr 2 years before FMP; 4-year critical window.", source:"JCI Insight 2019;4:e124864 — PMC6483504" },
  { study:"Boersma et al. 2014", finding:"Retrospective n=3,500 women: dutasteride improved FAGA in 65.6%; 83.3% increase in hair thickness; women <50 responded better.", source:"Indian J Dermatol Venereol Leprol 2014;80:521" },
  { study:"Ding et al. 2009 (NEJM)", finding:"Mendelian randomization: SHBG genetic variants causally linked to T2D risk — not just a marker of insulin resistance.", source:"N Engl J Med 2009;361:1152" },
  { study:"STEP 1 / SURMOUNT-1", finding:"Semaglutide: 15–22% body weight reduction. Tirzepatide starting dose 2.5 mg ≈ semaglutide 1.5 mg in potency.", source:"NEJM 2021;384:989 / NEJM 2022;387:205" },
  { study:"Topical Dutasteride RCT 2024", finding:"Phase II RCT: 0.05% topical dutasteride solution superior to finasteride 1mg oral at week 24; no serious adverse events.", source:"PMC12405733" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function toBase64(file) {
  return new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result.split(',')[1]);r.onerror=()=>rej(new Error('Read failed'));r.readAsDataURL(file);});
}

function MessageBubble({ msg }) {
  const isUser = msg.role === "user";
  function formatContent(text) {
  if (!text) return '';
  // Normalize line endings, remove em dashes
  let t = text.replace(/\r\n/g,'\n').replace(/\r/g,'\n')
              .replace(/ — /g,': ').replace(/—/g,'-');

  // Process tables
  const tableRegex = /(\|.+\|\n)([ \t]*\|[\s\-|:]+\|\n)((?:\|.+\|\n?)*)/gm;
  t = t.replace(tableRegex, (match, headerRow, sepRow, bodyRows) => {
    const parseRow = r => r.trim().replace(/^\||\|$/g,'').split('|').map(c=>c.trim());
    const headers = parseRow(headerRow);
    const rows = bodyRows.trim().split('\n').filter(Boolean).map(parseRow);
    const ths = headers.map(h=>`<th style="padding:8px 12px;text-align:left;background:#1e293b;color:#fff;font-size:12px;font-weight:600">${h}</th>`).join('');
    const trs = rows.map(r=>`<tr>${r.map((c,i)=>`<td style="padding:8px 12px;font-size:12px;border-bottom:1px solid #e2e8f0;${i===0?'font-weight:600;color:#0f172a':'color:#334155'}">${c}</td>`).join('')}</tr>`).join('');
    return `<table style="width:100%;border-collapse:collapse;margin:12px 0;border-radius:8px;overflow:hidden;border:1px solid #e2e8f0"><thead><tr>${ths}</tr></thead><tbody>${trs}</tbody></table>`;
  });
  // Strip orphan table separator rows
  t = t.replace(/^\|[\s\-|:]+\|$/gm,'');

  // Process line by line for block elements
  const lines = t.split('\n');
  const out = [];
  let bulletBuffer = [];
  const flushBullets = () => {
    if (bulletBuffer.length) {
      out.push(`<ul style="margin:6px 0;padding-left:0;list-style:none">${bulletBuffer.join('')}</ul>`);
      bulletBuffer = [];
    }
  };
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // HR
    if (/^[ \t]*[\-\*_]{3,}[ \t]*$/.test(line)) {
      flushBullets();
      out.push('<div style="height:1px;background:#e2e8f0;margin:14px 0"></div>');
    // H1-H4
    } else if (/^#{1,4}\s/.test(line)) {
      flushBullets();
      const text = line.replace(/^#{1,4}\s+/, '');
      const level = line.match(/^(#{1,4})/)[1].length;
      const sz = level <= 2 ? '15px' : '13px';
      const wt = level <= 2 ? '700' : '600';
      out.push(`<div style="font-size:${sz};font-weight:${wt};color:#0f172a;margin:14px 0 6px;padding-bottom:5px;border-bottom:1px solid #e2e8f0">${text}</div>`);
    // Bullet - or *
    } else if (/^[\-\*]\s+/.test(line)) {
      const text = line.replace(/^[\-\*]\s+/, '');
      bulletBuffer.push(`<li style="display:flex;gap:7px;align-items:flex-start;margin:3px 0;font-size:13px;line-height:1.55;color:#1e293b"><span style="color:#4f46e5;font-weight:700;flex-shrink:0;margin-top:1px">•</span><span>${text}</span></li>`);
    // Numbered list
    } else if (/^\d+\.\s+/.test(line)) {
      flushBullets();
      const num = line.match(/^(\d+)/)[1];
      const text = line.replace(/^\d+\.\s+/, '');
      out.push(`<div style="display:flex;gap:8px;align-items:flex-start;margin:3px 0;font-size:13px;line-height:1.55"><span style="color:#94a3b8;font-weight:600;flex-shrink:0;min-width:18px">${num}.</span><span style="color:#1e293b">${text}</span></div>`);
    // Table (already processed, pass through)
    } else if (line.includes('<table')) {
      flushBullets();
      out.push(line);
    // Blank line
    } else if (line.trim() === '') {
      flushBullets();
      out.push('<div style="height:6px"></div>');
    // Normal paragraph
    } else {
      flushBullets();
      out.push(`<p style="margin:0 0 4px;font-size:14px;line-height:1.55;color:#1e293b">${line}</p>`);
    }
  }
  flushBullets();
  let html = out.join('\n');

  // Inline: bold, italic, grade badges, disclaimer, bullets char, links
  html = html
    .replace(/\*\*(.*?)\*\*/g,'<strong style="color:#0f172a;font-weight:700">$1</strong>')
    .replace(/\[Verified\s*[-—]\s*High\]/g,'<span style="display:inline-flex;align-items:center;background:#f0fdf4;color:#15803d;padding:1px 7px;border-radius:4px;font-size:10px;font-weight:700;border:1px solid #bbf7d0">✓ Verified High</span>')
    .replace(/\[Verified\s*[-—]\s*Moderate\]/g,'<span style="display:inline-flex;align-items:center;background:#dbeafe;color:#1e40af;padding:1px 7px;border-radius:4px;font-size:10px;font-weight:700;border:1px solid #bfdbfe">✓ Verified Mod</span>')
    .replace(/\[Verified\s*[-—]\s*Low\]/g,'<span style="display:inline-flex;align-items:center;background:#fef9c3;color:#854d0e;padding:1px 7px;border-radius:4px;font-size:10px;font-weight:700;border:1px solid #fde68a">✓ Verified Low</span>')
    .replace(/\[Verified\]/g,'<span style="display:inline-flex;align-items:center;background:#f0fdf4;color:#15803d;padding:1px 7px;border-radius:4px;font-size:10px;font-weight:700;border:1px solid #bbf7d0">✓ Verified</span>')
    .replace(/\[Emerging Evidence\]/g,'<span style="display:inline-flex;align-items:center;background:#fffbeb;color:#92400e;padding:1px 7px;border-radius:4px;font-size:10px;font-weight:700;border:1px solid #fde68a">⚡ Emerging</span>')
    .replace(/\[Speculation\]/g,'<span style="display:inline-flex;align-items:center;background:#f5f3ff;color:#6d28d9;padding:1px 7px;border-radius:4px;font-size:10px;font-weight:700;border:1px solid #ddd6fe">? Speculation</span>')
    .replace(/⚠️([^\n<]*)/g,'<div style="margin-top:8px;padding:9px 13px;background:#fff7ed;border:1px solid #fed7aa;border-left:3px solid #ea580c;border-radius:6px;color:#9a3412;font-size:12px;line-height:1.5">⚠️$1</div>')
    .replace(/•/g,'<span style="color:#4f46e5;font-weight:bold;margin-right:3px">•</span>');
  return html;
}

  return (
    <div style={{display:"flex",justifyContent:isUser?"flex-end":"flex-start",marginBottom:"14px",gap:"8px",alignItems:"flex-start"}}>
      {!isUser && <div style={{width:"30px",height:"30px",borderRadius:"50%",background:"linear-gradient(135deg,#4f46e5,#7c3aed)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"13px",flexShrink:0,marginTop:"2px"}}>🧬</div>}
      <div style={{maxWidth:"85%",background:isUser?"linear-gradient(135deg,#4f46e5,#6d28d9)":"#ffffff",border:isUser?"none":"1px solid #e2e8f0",borderRadius:isUser?"16px 16px 4px 16px":"4px 16px 16px 16px",padding:"11px 14px",color:isUser?"#fff":"#1e293b",fontSize:"14px",lineHeight:"1.65",boxShadow:isUser?"0 2px 10px rgba(79,70,229,0.2)":"0 1px 4px rgba(0,0,0,0.06)"}}>
        {isUser ? msg.content : <div dangerouslySetInnerHTML={{__html:formatContent(msg.content)}}/>}
      </div>
      {isUser && <div style={{width:"30px",height:"30px",borderRadius:"50%",background:"linear-gradient(135deg,#0284c7,#0369a1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"13px",flexShrink:0,marginTop:"2px"}}>👤</div>}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function HormoneAIConsultant() {
  const [messages, setMessages] = useState([{
    role:"assistant",
    content:"Welcome to the **Hormone AI Consultant** — a complete clinical framework for both men's and women's hormone optimization, built on peer-reviewed evidence and clinical practice guidelines.\n\n**For women I cover:**\n• HRT framework — estrogen, progesterone, testosterone routes and sequencing\n• SHBG optimization — the hormone buffer system with specific lab targets\n• Dutasteride — protocols for FAGA, hirsutism, and progesterone sensitivity\n• Menopausal weight gain — the 6-punch cascade model with SWAN cohort data\n\n**For men I cover:**\n• TRT protocols — once weekly IM vs twice weekly SubQ testosterone cypionate/enanthate\n• Topical testosterone — dosing, DHT conversion, absorption variables\n• Enclomiphene & clomiphene — fertility-preserving testosterone optimization\n• Debunking myths — the real evidence on TRT, heart disease, and prostate cancer\n\n[Verified] All responses label evidence level clearly.\n\n⚠️ Educational information only — always partner with a qualified hormone specialist."
  }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeView, setActiveView] = useState("chat");
  const [activeStep, setActiveStep] = useState(0);
  const [uploadedDocs, setUploadedDocs] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showTopics, setShowTopics] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({behavior:"smooth"}); }, [messages]);

  // Build system prompt with uploaded doc context
  const buildSystemPrompt = () => {
    if (!uploadedDocs.length) return SYSTEM_PROMPT;
    const docContext = uploadedDocs.map((d,i) =>
      `[Uploaded Document ${i+1}: ${d.name}]\n${d.text || '(Binary file — see content below)'}`
    ).join('\n\n');
    return SYSTEM_PROMPT + `\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\nPATIENT-UPLOADED DOCUMENTS (use these to personalize responses):\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n${docContext}\n\nIMPORTANT: Reference the patient's uploaded documents when answering. Personalize all recommendations based on their actual lab values, history, and clinical data shown above.`;
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 20 * 1024 * 1024) { alert("File too large — max 20MB"); return; }
    setUploading(true);
    try {
      const isPDF = file.type === "application/pdf";
      const isImage = file.type.startsWith("image/");
      const isText = file.type === "text/plain" || file.name.endsWith(".txt") || file.name.endsWith(".md");

      if (isText) {
        const text = await file.text();
        setUploadedDocs(prev => [...prev, { name:file.name, type:"text", text:text.slice(0,12000) }]);
      } else if (isPDF || isImage) {
        const b64 = await toBase64(file);
        // For PDFs/images, use Claude to extract text via the API
        const resp = await fetch("/api/chat", {
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({
            model:"claude-sonnet-4-6",
            max_tokens:2000,
            messages:[{
              role:"user",
              content:[
                isPDF ? {type:"document",source:{type:"base64",media_type:"application/pdf",data:b64}}
                      : {type:"image",source:{type:"base64",media_type:file.type,data:b64}},
                {type:"text",text:"Extract all text and key clinical values from this document. Include lab values with their reference ranges, dates, provider names, diagnoses, medications, and any other clinically relevant information. Format clearly."}
              ]
            }]
          })
        });
        const data = await resp.json();
        const extracted = data.mergedText || data.content?.[0]?.text || "Could not extract text.";
        setUploadedDocs(prev => [...prev, { name:file.name, type:isPDF?"pdf":"image", text:extracted }]);
      }
    } catch (err) {
      alert("Upload failed — please try again.");
    }
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeDoc = (i) => setUploadedDocs(prev => prev.filter((_,j) => j !== i));

  const sendMessage = async (text) => {
    const userMsg = text || input;
    if (!userMsg.trim() || loading) return;
    setInput("");
    setShowTopics(false);
    if (activeView !== "chat") setActiveView("chat");
    const newMessages = [...messages, {role:"user", content:userMsg}];
    setMessages(newMessages);
    setLoading(true);
    try {
      const response = await fetch("/api/chat", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          model:"claude-sonnet-4-6",
          max_tokens:1000,
          system:buildSystemPrompt(),
          messages:newMessages.map(m=>({role:m.role,content:m.content}))
        })
      });
      const data = await response.json();
      const reply = data.mergedText || data.content?.[0]?.text || "Connection error — please try again.";
      setMessages([...newMessages, {role:"assistant",content:reply}]);
    } catch {
      setMessages([...newMessages, {role:"assistant",content:"Connection error — please try again."}]);
    }
    setLoading(false);
  };

  const step = ALGORITHM_STEPS[activeStep];

  // ── NAV TABS ──────────────────────────────────────────────────────────────
  const navTabs = [
    {k:"chat", label:"💬 Consult", short:"💬"},
    {k:"algorithm", label:"📋 Algorithm", short:"📋"},
    {k:"evidence", label:"📚 Evidence", short:"📚"},
  ];

  // ── RENDER ────────────────────────────────────────────────────────────────
  return (
    <div style={{minHeight:"100%",background:"#f1f5f9",fontFamily:"'Georgia','Times New Roman',serif",color:"#1e293b",display:"flex",flexDirection:"column",height:"100%"}}>

      {/* ── HEADER ── */}
      <div style={{background:"#ffffff",borderBottom:"1px solid #e2e8f0",padding:isMobile?"0 12px":"0 24px",display:"flex",alignItems:"center",justifyContent:"space-between",boxShadow:"0 1px 4px rgba(0,0,0,0.06)",position:"sticky",top:0,zIndex:100,height:isMobile?"52px":"60px",flexShrink:0}}>
        <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
          <div style={{width:isMobile?"32px":"38px",height:isMobile?"32px":"38px",background:"linear-gradient(135deg,#4f46e5,#7c3aed)",borderRadius:"9px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:isMobile?"15px":"18px"}}>🧬</div>
          <div>
            <div style={{fontSize:isMobile?"13px":"15px",fontWeight:"700",color:"#0f172a"}}>
              Hormone AI Consultant
            </div>
            {!isMobile && (
              <div style={{fontSize:"10px",color:"#94a3b8",letterSpacing:"0.05em",textTransform:"uppercase",marginTop:"1px"}}>
                Evidenced Based Women's Hormone Optimization
              </div>
            )}
          </div>
        </div>
        <div style={{display:"flex",gap:"4px"}}>
          {navTabs.map(v=>(
            <button key={v.k} onClick={()=>setActiveView(v.k)} style={{
              padding:isMobile?"6px 10px":"7px 14px",borderRadius:"7px",cursor:"pointer",fontFamily:"inherit",
              fontSize:isMobile?"11px":"12px",fontWeight:"600",transition:"all 0.15s",
              border:activeView===v.k?"1px solid #c7d2fe":"1px solid #e2e8f0",
              background:activeView===v.k?"#eef2ff":"#f8fafc",
              color:activeView===v.k?"#4338ca":"#64748b",
            }}>{isMobile ? v.short : v.label}</button>
          ))}
        </div>
      </div>

      {/* ── BODY ── */}
      <div style={{flex:1,display:"flex",overflow:"hidden",minHeight:0}}>

        {/* ══ CHAT VIEW ══ */}
        {activeView === "chat" && (
          <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>

            {/* Desktop sidebar + chat split */}
            {!isMobile && (
              <div style={{flex:1,display:"flex",overflow:"hidden"}}>
                {/* Sidebar */}
                <div style={{width:"200px",borderRight:"1px solid #e2e8f0",padding:"14px 10px",overflowY:"auto",background:"#ffffff",flexShrink:0}}>
                  <p style={{fontSize:"10px",color:"#94a3b8",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:"10px",fontWeight:"700"}}>Quick Topics</p>
                  {QUICK_TOPICS.map(t=>(
                    <button key={t.label} onClick={()=>sendMessage(t.label)} style={{width:"100%",textAlign:"left",padding:"7px 9px",background:"#f8fafc",border:"1px solid #f1f5f9",borderRadius:"7px",color:"#475569",fontSize:"11px",cursor:"pointer",marginBottom:"4px",lineHeight:"1.4",fontFamily:"inherit",transition:"all 0.15s",display:"flex",gap:"6px",alignItems:"flex-start"}}
                      onMouseEnter={e=>{e.currentTarget.style.background="#eef2ff";e.currentTarget.style.borderColor="#c7d2fe";e.currentTarget.style.color="#4338ca";}}
                      onMouseLeave={e=>{e.currentTarget.style.background="#f8fafc";e.currentTarget.style.borderColor="#f1f5f9";e.currentTarget.style.color="#475569";}}>
                      <span style={{flexShrink:0}}>{t.icon}</span><span>{t.label}</span>
                    </button>
                  ))}
                  {/* Desktop doc upload */}
                  <div style={{marginTop:"16px",paddingTop:"14px",borderTop:"1px solid #e2e8f0"}}>
                    <p style={{fontSize:"10px",color:"#94a3b8",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:"8px",fontWeight:"700"}}>My Documents</p>
                    <label style={{display:"flex",alignItems:"center",gap:"5px",padding:"7px 10px",background:"#eef2ff",border:"1px solid #c7d2fe",borderRadius:"7px",cursor:uploading?"not-allowed":"pointer",fontSize:"11px",color:"#4338ca",fontWeight:"600",fontFamily:"inherit",width:"100%",boxSizing:"border-box"}}>
                      {uploading ? "⏳ Reading..." : "📎 Upload Lab / Note"}
                      <input ref={fileInputRef} type="file" accept=".pdf,.txt,.md,image/*" style={{display:"none"}} onChange={handleFileUpload} disabled={uploading}/>
                    </label>
                    <div style={{fontSize:"10px",color:"#94a3b8",marginTop:"5px",lineHeight:"1.4"}}>PDF · Images · Text files</div>
                    {uploadedDocs.map((d,i)=>(
                      <div key={i} style={{display:"flex",alignItems:"center",gap:"6px",marginTop:"6px",padding:"6px 8px",background:"#f0fdf4",border:"1px solid #bbf7d0",borderRadius:"6px"}}>
                        <span style={{fontSize:"12px"}}>📄</span>
                        <span style={{fontSize:"11px",color:"#15803d",flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{d.name}</span>
                        <button onClick={()=>removeDoc(i)} style={{background:"none",border:"none",cursor:"pointer",color:"#94a3b8",fontSize:"13px",padding:0,lineHeight:1}}>✕</button>
                      </div>
                    ))}
                    {uploadedDocs.length > 0 && <div style={{fontSize:"10px",color:"#059669",marginTop:"5px"}}>✓ AI will reference these</div>}
                  </div>
                </div>

                {/* Chat messages + input */}
                <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden",background:"#f8fafc"}}>
                  <div style={{flex:1,overflowY:"auto",padding:"20px 24px"}}>
                    {messages.map((msg,i)=><MessageBubble key={i} msg={msg}/>)}
                    {loading && (
                      <div style={{display:"flex",gap:"8px",alignItems:"center",marginBottom:"14px"}}>
                        <div style={{width:"30px",height:"30px",borderRadius:"50%",background:"linear-gradient(135deg,#4f46e5,#7c3aed)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"13px"}}>🧬</div>
                        <div style={{background:"#ffffff",border:"1px solid #e2e8f0",borderRadius:"4px 14px 14px 14px",padding:"10px 14px",display:"flex",gap:"4px",alignItems:"center"}}>
                          {[0,1,2].map(i=><div key={i} style={{width:"5px",height:"5px",borderRadius:"50%",background:"#6366f1",animation:`pulse 1.2s ease-in-out ${i*0.2}s infinite`}}/>)}
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef}/>
                  </div>
                  <div style={{padding:"12px 20px 14px",borderTop:"1px solid #e2e8f0",background:"#ffffff"}}>
                    <div style={{display:"flex",gap:"8px"}}>
                      <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&!e.shiftKey&&sendMessage()}
                        placeholder="Ask about testosterone dosing, SHBG targets, dutasteride protocols..."
                        style={{flex:1,padding:"10px 14px",background:"#f8fafc",border:"1px solid #e2e8f0",borderRadius:"10px",color:"#1e293b",fontSize:"13px",outline:"none",fontFamily:"inherit"}}
                        onFocus={e=>e.target.style.borderColor="#a5b4fc"} onBlur={e=>e.target.style.borderColor="#e2e8f0"}/>
                      <button onClick={()=>sendMessage()} disabled={loading||!input.trim()} style={{padding:"10px 18px",background:loading||!input.trim()?"#e2e8f0":"linear-gradient(135deg,#4f46e5,#7c3aed)",border:"none",borderRadius:"10px",color:loading||!input.trim()?"#94a3b8":"#fff",fontSize:"13px",cursor:loading||!input.trim()?"not-allowed":"pointer",fontFamily:"inherit",fontWeight:"700"}}>
                        {loading?"...":"Send →"}
                      </button>
                    </div>
                    <p style={{color:"#cbd5e1",fontSize:"10px",marginTop:"6px",textAlign:"center"}}>Educational only · Not medical advice · Always consult a qualified hormone specialist</p>
                  </div>
                </div>
              </div>
            )}

            {/* ── MOBILE CHAT ── */}
            {isMobile && (
              <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
                {/* Mobile doc banner if docs uploaded */}
                {uploadedDocs.length > 0 && (
                  <div style={{background:"#f0fdf4",borderBottom:"1px solid #bbf7d0",padding:"6px 14px",display:"flex",alignItems:"center",gap:"6px",flexShrink:0}}>
                    <span style={{fontSize:"11px"}}>📄</span>
                    <span style={{fontSize:"11px",color:"#15803d",fontWeight:"600"}}>{uploadedDocs.length} document{uploadedDocs.length>1?"s":""} uploaded — AI is referencing</span>
                    <button onClick={()=>setUploadedDocs([])} style={{marginLeft:"auto",background:"none",border:"none",cursor:"pointer",color:"#94a3b8",fontSize:"12px"}}>✕</button>
                  </div>
                )}

                {/* Messages */}
                <div style={{flex:1,overflowY:"auto",padding:"14px"}}>
                  {messages.map((msg,i)=><MessageBubble key={i} msg={msg}/>)}
                  {loading && (
                    <div style={{display:"flex",gap:"8px",alignItems:"center",marginBottom:"14px"}}>
                      <div style={{width:"28px",height:"28px",borderRadius:"50%",background:"linear-gradient(135deg,#4f46e5,#7c3aed)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"12px"}}>🧬</div>
                      <div style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:"4px 12px 12px 12px",padding:"9px 12px",display:"flex",gap:"4px",alignItems:"center"}}>
                        {[0,1,2].map(i=><div key={i} style={{width:"5px",height:"5px",borderRadius:"50%",background:"#6366f1",animation:`pulse 1.2s ease-in-out ${i*0.2}s infinite`}}/>)}
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef}/>
                </div>

                {/* Mobile quick topics collapsible */}
                {showTopics && (
                  <div style={{background:"#ffffff",borderTop:"1px solid #e2e8f0",padding:"10px 12px",flexShrink:0}}>
                    <div style={{display:"flex",flexWrap:"wrap",gap:"6px"}}>
                      {QUICK_TOPICS.map(t=>(
                        <button key={t.label} onClick={()=>sendMessage(t.label)} style={{padding:"6px 11px",background:"#f8fafc",border:"1px solid #e2e8f0",borderRadius:"20px",fontSize:"11px",color:"#4338ca",cursor:"pointer",fontFamily:"inherit",display:"flex",gap:"4px",alignItems:"center",whiteSpace:"nowrap"}}>
                          <span>{t.icon}</span><span>{t.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Mobile input bar */}
                <div style={{padding:"10px 12px 12px",borderTop:"1px solid #e2e8f0",background:"#ffffff",flexShrink:0}}>
                  <div style={{display:"flex",gap:"6px",alignItems:"center"}}>
                    {/* Topics toggle */}
                    <button onClick={()=>setShowTopics(v=>!v)} style={{width:"38px",height:"38px",borderRadius:"9px",background:showTopics?"#eef2ff":"#f8fafc",border:`1px solid ${showTopics?"#c7d2fe":"#e2e8f0"}`,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"16px",flexShrink:0}}>
                      💡
                    </button>
                    {/* Upload button */}
                    <label style={{width:"38px",height:"38px",borderRadius:"9px",background:"#f8fafc",border:"1px solid #e2e8f0",cursor:uploading?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"16px",flexShrink:0}}>
                      {uploading?"⏳":"📎"}
                      <input type="file" accept=".pdf,.txt,.md,image/*" style={{display:"none"}} onChange={handleFileUpload} disabled={uploading}/>
                    </label>
                    {/* Text input */}
                    <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&!e.shiftKey&&sendMessage()}
                      placeholder="Ask a hormone question..."
                      style={{flex:1,padding:"10px 12px",background:"#f8fafc",border:"1px solid #e2e8f0",borderRadius:"10px",color:"#1e293b",fontSize:"13px",outline:"none",fontFamily:"inherit",minWidth:0}}
                      onFocus={e=>e.target.style.borderColor="#a5b4fc"} onBlur={e=>e.target.style.borderColor="#e2e8f0"}/>
                    {/* Send */}
                    <button onClick={()=>sendMessage()} disabled={loading||!input.trim()} style={{width:"38px",height:"38px",background:loading||!input.trim()?"#e2e8f0":"linear-gradient(135deg,#4f46e5,#7c3aed)",border:"none",borderRadius:"10px",color:loading||!input.trim()?"#94a3b8":"#fff",cursor:loading||!input.trim()?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"16px",flexShrink:0}}>
                      →
                    </button>
                  </div>
                  {uploadedDocs.length > 0 && (
                    <div style={{display:"flex",gap:"5px",marginTop:"7px",flexWrap:"wrap"}}>
                      {uploadedDocs.map((d,i)=>(
                        <div key={i} style={{display:"flex",alignItems:"center",gap:"4px",padding:"3px 8px",background:"#f0fdf4",border:"1px solid #bbf7d0",borderRadius:"20px"}}>
                          <span style={{fontSize:"10px"}}>📄</span>
                          <span style={{fontSize:"10px",color:"#15803d",maxWidth:"80px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{d.name}</span>
                          <button onClick={()=>removeDoc(i)} style={{background:"none",border:"none",cursor:"pointer",color:"#94a3b8",fontSize:"11px",padding:0}}>✕</button>
                        </div>
                      ))}
                    </div>
                  )}
                  <p style={{color:"#cbd5e1",fontSize:"10px",marginTop:"6px",textAlign:"center"}}>Educational only · Not medical advice</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ══ ALGORITHM VIEW ══ */}
        {activeView === "algorithm" && (
          <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
            {isMobile ? (
              // Mobile algorithm — vertical scrollable list
              <div style={{flex:1,overflowY:"auto",padding:"14px"}}>
                {ALGORITHM_STEPS.map((s,i)=>(
                  <div key={i} style={{background:"#ffffff",border:`1px solid ${s.border}`,borderRadius:"12px",padding:"16px",marginBottom:"12px"}}>
                    <div style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"12px"}}>
                      <div style={{width:"36px",height:"36px",background:s.bg,border:`1px solid ${s.border}`,borderRadius:"8px",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                        <span style={{fontSize:"14px",fontWeight:"900",color:s.color,fontFamily:"monospace"}}>{s.step}</span>
                      </div>
                      <div>
                        <div style={{fontSize:"15px",color:"#0f172a",fontWeight:"700"}}>{s.title}</div>
                        <div style={{color:s.color,fontSize:"11px",fontWeight:"600"}}>{s.subtitle}</div>
                      </div>
                    </div>
                    {s.items.map((item,j)=>(
                      <div key={j} style={{display:"flex",alignItems:"flex-start",gap:"8px",padding:"8px 10px",background:s.bg,borderRadius:"7px",border:`1px solid ${s.border}`,marginBottom:"6px"}}>
                        <div style={{width:"4px",height:"4px",borderRadius:"50%",background:s.color,flexShrink:0,marginTop:"7px"}}/>
                        <span style={{color:"#334155",fontSize:"12px",lineHeight:"1.5"}}>{item}</span>
                      </div>
                    ))}
                    <div style={{marginTop:"10px",padding:"9px 12px",background:"#f8fafc",borderLeft:`3px solid ${s.color}`,borderRadius:"5px",fontSize:"11px",color:"#475569",fontStyle:"italic"}}>💡 {s.note}</div>
                    <button onClick={()=>{setActiveView("chat");setTimeout(()=>sendMessage(`Tell me more about Step ${s.step}: ${s.title} — specific protocols, dosing, and clinical pearls`),100)}} style={{marginTop:"10px",width:"100%",padding:"9px",background:s.bg,border:`1px solid ${s.border}`,borderRadius:"8px",color:s.color,cursor:"pointer",fontFamily:"inherit",fontSize:"12px",fontWeight:"700"}}>Ask AI About This Step →</button>
                  </div>
                ))}
              </div>
            ) : (
              // Desktop algorithm — sidebar + detail
              <div style={{flex:1,display:"flex",overflow:"hidden"}}>
                <div style={{width:"195px",borderRight:"1px solid #e2e8f0",padding:"16px 12px",background:"#ffffff",overflowY:"auto"}}>
                  <p style={{fontSize:"10px",color:"#94a3b8",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:"14px",fontWeight:"700"}}>6-Step Algorithm</p>
                  {ALGORITHM_STEPS.map((s,i)=>(
                    <button key={i} onClick={()=>setActiveStep(i)} style={{width:"100%",textAlign:"left",padding:"10px 12px",marginBottom:"4px",cursor:"pointer",fontFamily:"inherit",transition:"all 0.15s",borderRadius:"8px",background:activeStep===i?s.bg:"transparent",border:activeStep===i?`1px solid ${s.border}`:"1px solid transparent"}}>
                      <div style={{fontSize:"9px",color:activeStep===i?s.color:"#94a3b8",fontWeight:"800",marginBottom:"2px",fontFamily:"monospace",letterSpacing:"0.05em"}}>STEP {s.step}</div>
                      <div style={{fontSize:"12px",color:activeStep===i?"#0f172a":"#64748b",fontWeight:activeStep===i?"600":"400",lineHeight:"1.3"}}>{s.title}</div>
                    </button>
                  ))}
                </div>
                <div style={{flex:1,padding:"28px 32px",overflowY:"auto",background:"#f8fafc"}}>
                  <div style={{background:"#ffffff",border:`1px solid ${step.border}`,borderRadius:"14px",padding:"26px",marginBottom:"16px"}}>
                    <div style={{display:"flex",alignItems:"center",gap:"16px",marginBottom:"22px",paddingBottom:"18px",borderBottom:`1px solid ${step.border}`}}>
                      <div style={{width:"52px",height:"52px",background:step.bg,border:`1px solid ${step.border}`,borderRadius:"12px",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                        <span style={{fontSize:"20px",fontWeight:"900",color:step.color,fontFamily:"monospace"}}>{step.step}</span>
                      </div>
                      <div>
                        <h2 style={{fontSize:"20px",color:"#0f172a",margin:"0 0 4px",fontWeight:"700"}}>{step.title}</h2>
                        <p style={{color:step.color,fontSize:"13px",margin:0,fontWeight:"600"}}>{step.subtitle}</p>
                      </div>
                    </div>
                    <div style={{display:"grid",gap:"8px"}}>
                      {step.items.map((item,i)=>(
                        <div key={i} style={{display:"flex",alignItems:"flex-start",gap:"10px",padding:"10px 14px",background:step.bg,borderRadius:"8px",border:`1px solid ${step.border}`}}>
                          <div style={{width:"5px",height:"5px",borderRadius:"50%",background:step.color,flexShrink:0,marginTop:"8px"}}/>
                          <span style={{color:"#334155",fontSize:"13px",lineHeight:"1.6"}}>{item}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{marginTop:"16px",padding:"12px 14px",background:"#f8fafc",border:"1px solid #e2e8f0",borderLeft:`3px solid ${step.color}`,borderRadius:"6px",fontSize:"12px",color:"#475569",fontStyle:"italic",lineHeight:"1.5"}}>💡 {step.note}</div>
                  </div>
                  <div style={{display:"flex",gap:"10px",justifyContent:"space-between"}}>
                    <button onClick={()=>setActiveStep(Math.max(0,activeStep-1))} disabled={activeStep===0} style={{padding:"9px 18px",background:"#ffffff",border:"1px solid #e2e8f0",borderRadius:"8px",color:activeStep===0?"#cbd5e1":"#475569",cursor:activeStep===0?"not-allowed":"pointer",fontFamily:"inherit",fontSize:"13px",fontWeight:"600"}}>← Previous</button>
                    <button onClick={()=>{setActiveView("chat");setTimeout(()=>sendMessage(`Tell me more about Step ${step.step}: ${step.title} — specific protocols, dosing, and clinical pearls`),100)}} style={{padding:"9px 18px",background:step.bg,border:`1px solid ${step.border}`,borderRadius:"8px",color:step.color,cursor:"pointer",fontFamily:"inherit",fontSize:"13px",fontWeight:"700"}}>Ask AI About This Step →</button>
                    <button onClick={()=>setActiveStep(Math.min(ALGORITHM_STEPS.length-1,activeStep+1))} disabled={activeStep===ALGORITHM_STEPS.length-1} style={{padding:"9px 18px",background:"#ffffff",border:"1px solid #e2e8f0",borderRadius:"8px",color:activeStep===ALGORITHM_STEPS.length-1?"#cbd5e1":"#475569",cursor:activeStep===ALGORITHM_STEPS.length-1?"not-allowed":"pointer",fontFamily:"inherit",fontSize:"13px",fontWeight:"600"}}>Next →</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ══ EVIDENCE VIEW ══ */}
        {activeView === "evidence" && (
          <div style={{flex:1,overflowY:"auto",padding:isMobile?"14px":"28px 32px",background:"#f8fafc"}}>
            <div style={{marginBottom:"20px"}}>
              <h2 style={{color:"#0f172a",fontSize:isMobile?"16px":"18px",fontWeight:"700",marginBottom:"4px"}}>Evidence Base</h2>
              <p style={{color:"#64748b",fontSize:"13px"}}>Key studies powering this consultant's treatment algorithm</p>
            </div>
            <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr",gap:"12px",marginBottom:"20px"}}>
              {EVIDENCE_CITATIONS.map((c,i)=>(
                <div key={i} style={{background:"#ffffff",border:"1px solid #e2e8f0",borderRadius:"10px",padding:"14px"}}>
                  <div style={{color:"#4338ca",fontSize:"13px",fontWeight:"700",marginBottom:"6px"}}>{c.study}</div>
                  <div style={{color:"#475569",fontSize:"12px",lineHeight:"1.6",marginBottom:"8px"}}>{c.finding}</div>
                  <div style={{color:"#94a3b8",fontSize:"10px",fontFamily:"monospace",background:"#f8fafc",padding:"3px 7px",borderRadius:"4px",border:"1px solid #e2e8f0"}}>{c.source}</div>
                </div>
              ))}
            </div>
            <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr 1fr",gap:"12px"}}>
              {[
                {title:"SHBG Reference Ranges",color:"#6d28d9",bg:"#f5f3ff",border:"#ddd6fe",items:["Premenopausal: 40–120 nmol/L","Postmenopausal: 30–100 nmol/L","Dr. Gillett minimum target: ≥50","OCP effect: 2–4× increase","Free T reduction on OCP: 40–80%","SHBG half-life: ~7 days"]},
                {title:"Metabolic Red Flags",color:"#b91c1c",bg:"#fff1f2",border:"#fecdd3",items:["Fasting glucose >100 mg/dL","Fasting insulin >7 μIU/mL","Fasting insulin >12 = GLP-1 Rx","HbA1c ≥5.7% = GLP-1 Rx","Body fat >35% DEXA = GLP-1 Rx","hs-CRP >1.0 mg/L = cardiometabolic risk"]},
                {title:"Dutasteride vs Finasteride",color:"#b45309",bg:"#fffbeb",border:"#fde68a",items:["DHT reduction: ~98% vs ~71%","Type I inhibition: 100× stronger","Type II inhibition: 3× stronger","Half-life: 5 weeks vs 6 hours","No dutasteride syndrome","FAGA: 65.6% improvement (n=3,500)"]},
              ].map(col=>(
                <div key={col.title} style={{background:"#ffffff",border:`1px solid ${col.border}`,borderRadius:"10px",padding:"14px"}}>
                  <h4 style={{color:col.color,fontSize:"13px",marginBottom:"10px",fontWeight:"700",paddingBottom:"7px",borderBottom:`1px solid ${col.border}`}}>{col.title}</h4>
                  {col.items.map(item=>(
                    <div key={item} style={{color:"#475569",fontSize:"12px",padding:"4px 0",borderBottom:`1px solid ${col.border}`,display:"flex",gap:"6px",alignItems:"flex-start"}}>
                      <span style={{color:col.color,fontWeight:"700",fontSize:"10px",marginTop:"2px",flexShrink:0}}>▸</span><span>{item}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:0.3;transform:scale(0.8)} 50%{opacity:1;transform:scale(1.2)} }
        * { box-sizing:border-box; margin:0; padding:0; }
        input::placeholder { color:#94a3b8; }
        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-track { background:#f1f5f9; }
        ::-webkit-scrollbar-thumb { background:#cbd5e1; border-radius:4px; }
      `}</style>
    </div>
  );
}
