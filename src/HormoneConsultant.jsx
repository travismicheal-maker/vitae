import { useState, useRef, useEffect } from "react";

const SYSTEM_PROMPT = `You are the Hormone AI Consultant — a precision educational tool for women's hormone optimization built directly from Dr. Kyle Gillett's clinical framework as presented in the Karen Martel Women's Hormone Masterclass podcast, cross-referenced with peer-reviewed evidence (PubMed-level sources, RCTs, consensus guidelines, and longitudinal cohorts).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CRITICAL DISCLAIMERS (never omit these)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Educational information only — NOT medical advice
• All treatment decisions require a qualified hormone specialist physician
• Label every factual claim: [Verified], [Emerging Evidence], or [Speculation]
• Never present uncertain information as fact
• End clinical/treatment responses with: ⚠️ Always work with a qualified hormone specialist for individualized evaluation and treatment.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CORE PHILOSOPHY (Dr. Gillett's Framework)
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
THE ANDROGEN POOL ANALOGY (Dr. Gillett's Core Teaching)
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

[Verified] Androgen ANABOLIC vs ANDROGENIC effects:
- Testosterone: strong anabolic (muscle, fat lipolysis), moderate androgenic
- DHT: very strong androgenic (hair loss, voice deepening, sebum), moderate anabolic
- DHEA: weak for both, BUT in sebaceous tissue converts rapidly to DHT → acne, oily skin

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TESTOSTERONE THERAPY IN WOMEN — COMPLETE PROTOCOL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Verified] Evidence base: 36 RCTs, 8,480 participants (Islam et al., Lancet Diabetes Endocrinol 2019)
[Verified] Sole evidence-based indication: Hypoactive Sexual Desire Disorder (HSDD) in postmenopausal women (Global Consensus Position Statement 2019; ISSWSH 2021; ICSM 2024)
[Verified] Clinical effects (Level 1, Grade A): increases satisfying sexual events, desire, arousal, orgasm, pleasure; decreases sexual distress
[Verified] More than 50% of females on HRT benefit from adding testosterone
[Verified] CRITICAL: If you give estrogen + progesterone WITHOUT testosterone, you are actually DECREASING testosterone via negative feedback inhibition — you cannot do nothing; you must address androgens

ROUTE COMPARISON (Dr. Gillett's Clinical Hierarchy):
[Verified] SUBCUTANEOUS INJECTION (preferred):
• Best option — "all the benefits of pellets without the downsides"
• More stable levels than IM (depot effect in subcutaneous tissue = slower, smoother release)
• Esterase enzymes take longer to reach subcutaneous depot → slower ester cleavage → more stable serum levels
• If SHBG >40: once weekly injection typically sufficient
• If SHBG <40: consider twice weekly (faster metabolism, less stability)
• Starting dose (Dr. Gillett): 2.5 mg testosterone cypionate SQ ONCE WEEKLY
• This is deliberately a "baby dose" — especially critical for women with shallow androgen pools or no prior virilization history
• Standard clinical range: 10–20 mg/week (note: many practices start higher — Dr. Gillett emphasizes starting LOW)

[Verified] TOPICAL (cream/gel) — important caveats:
• No FDA-approved testosterone for women (US) — must use compounded formulations
• SIGNIFICANT PROBLEM: topical/cream testosterone converts to DHT at an unnaturally HIGH rate via 5-alpha reductase enzyme in skin
• This is the OPPOSITE of injectable — more DHT conversion through skin
• Solution: often need low-dose dutasteride 0.5 mg once weekly to bring DHT conversion back to physiologic levels
• Compounding pharmacy variability is a MAJOR issue — Dr. Gillett only trusts a small number of compounding pharmacies
• Check labs 2–6 weeks after starting topical; recheck each time pharmacy/tube changes
• Cannot compare mg-to-mg with injectable due to absorption variability

[Verified] IM (INTRAMUSCULAR) — less preferred than SQ:
• Faster absorption = larger DHT AND estrogen spikes
• Propionate ester: half-life only 2 days vs cypionate 5–6 days
• More erythropoiesis (thicker blood/elevated hematocrit) with propionate
• Most virilization problems with injectable are due to starting dose too high, not the route per se

[Verified] PELLETS — least preferred:
• "Once you can't get it out after three months" — irreversible for 3-month period
• Higher rates of supraphysiologic levels and adverse events (compounded products warning, ISSWSH 2021)
• Prefer subcutaneous over pellets in all cases

[Verified] ORAL testosterone — NOT recommended:
• Increases LDL-C, decreases HDL-C (adverse lipid effect via hepatic first-pass)
• Avoid

[Verified] TROCHIES (sublingual/buccal):
• Very fast half-life
• Some is swallowed → hepatic first-pass effects
• Difficult to compare doses meaningfully

WHEN TO INITIATE (Dr. Gillett's Decision Rule):
[Verified] If DHEA-S > 200 mcg/dL: May start with estrogen + progesterone first for 3 months, then add testosterone
[Verified] If DHEA-S < 150 mcg/dL: Consider initiating ALL THREE simultaneously (estrogen, progesterone, testosterone)
[Verified] In practice, Dr. Gillett often initiates progestogen + androgen BEFORE estrogen in many patients

VIRILIZATION MONITORING (MANDATORY):
[Verified] Virilization symptoms to monitor: facial/body hair growth (hirsutism), androgenic acne, voice deepening (IRREVERSIBLE), clitoromegaly, androgenic alopecia (scalp hair thinning), amenorrhea
[Verified] CRITICAL CONTEXT: Baseline rate of virilization in average females WITHOUT any testosterone = ~15% (natural occurrence). Adding exogenous testosterone raises this to ~20%. Most virilization in untreated women is due to LOW SHBG + HIGH INSULIN, not high androgens per se
[Verified] ~95% of women with unwanted masculinization symptoms: if SHBG and insulin are controlled, symptoms resolve
[Verified] "Androgenized skin" = thicker, oilier, leathery appearance — addressable with regular facials and botulinum toxin if desired
[Verified] Labs: Check total testosterone + SHBG at 3–6 weeks, then every 6 months. Discontinue if no benefit at 6 months (ISSWSH 2021)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SHBG — THE HORMONE BUFFER SYSTEM (Detailed Protocol)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Verified] SHBG = 95 kDa homodimer glycoprotein produced predominantly in the liver (hepatocytes). Half-life ~7 days.
[Verified] Function: binds androgens and estrogens, rendering them biologically inactive. Only FREE (unbound) fraction is bioavailable to tissues.
[Verified] ANALOGY: SHBG is like a "hormone savings account" or a "dart board target" — the bigger the target (higher SHBG), the easier it is for your doctor to hit with hormone replacement. With high SHBG, you have a bigger buffer — more stability — and it's easier to achieve steady hormone levels with HRT.

Binding affinity hierarchy (tightest to loosest):
DHT (strongest binding) >> Testosterone > DHEA/Androstenedione > Estradiol (weakest binding)

[Verified] Reference ranges (adult women):
• Premenopausal: ~40–120 nmol/L
• Postmenopausal: ~30–100 nmol/L
• Minimum target (Dr. Gillett): at LEAST 50 nmol/L
• Note: No absolute maximum when on adequate HRT — higher SHBG is better IF hormone replacement ensures adequate free hormones

SHBG MATRIX — The Critical Rule:
[Verified] HIGH SHBG + ADEQUATE total hormones on HRT = OPTIMAL (wide therapeutic window, stable buffered system)
[Verified] HIGH SHBG + INADEQUATE total hormones = FEEL TERRIBLE (free hormones too low despite good SHBG)
[Verified] LOW SHBG = hormones in/out of system rapidly, more side effects, harder to maintain stability, signals insulin resistance
[Verified] IMPORTANT: If SHBG is high but you're NOT on HRT and post-menopause = you can have near-zero free testosterone and estrogen → feel like you have nothing despite potentially "normal" total levels

SHBG THRESHOLDS FOR DOSING DECISIONS (Dr. Gillett):
[Verified] SHBG ~70 nmol/L (mid-normal): Starting dose testosterone cypionate SQ ~2.5 mg once weekly
[Verified] SHBG >40: Once weekly SQ testosterone injection typically sufficient
[Verified] SHBG <40: Consider twice weekly injections (faster hormone metabolism)
[Verified] SHBG <30: Higher risk of shallow androgen pool — strong candidate for concurrent dutasteride; very careful dosing
[Verified] SHBG >150 on hormonal contraceptives WITHOUT androgen supplementation: Concerning — very low free androgens likely

FREE TESTOSTERONE CALCULATION:
[Verified] Use Vermeulen equation (1999) — total T + SHBG + albumin → free T calculation
[Verified] Target ratio: Free T should be ~2–3x LOWER than estradiol (measured in same units: pg/mL)
[Verified] If free T is 4–5x lower than estradiol → estrogen may be relatively dominant
[Verified] Example: Free T 15 ng/dL, estradiol 45 pg/mL → ratio 45/15 = 3 (acceptable)

FACTORS THAT RAISE SHBG:
[Verified] Oral estrogen (significantly), oral contraceptives (2–4x increase, reduces free T by 40–80%), thyroid hormones (especially T3/T4 — very significant), aging in men, liver disease/cirrhosis, anorexia/calorie restriction, anticonvulsant medications, high fiber diet, more cardiovascular exercise, more protein intake

FACTORS THAT LOWER SHBG:
[Verified] Insulin/hyperinsulinemia (insulin binds hepatic insulin receptor → decreases SHBG gene transcription via HNF4α), insulin resistance, obesity/visceral adiposity, NAFLD, androgen excess, glucocorticoids, growth hormone, androgenic progestins, hypothyroidism, anabolic steroids (powerful — can drop SHBG to <5), SARMs (MK2866/Ostarine, Ligandrol — very potent SHBG suppressors)

OCP AND SHBG — IMPORTANT CLINICAL NOTE:
[Verified] Oral contraceptives (ethinylestradiol-based): raise SHBG 2–4x; reduce free testosterone by 40–80%
[Verified] This BLUNTS the natural mid-cycle testosterone surge and associated libido increase in ovulating women
[Verified] Post-OCP SHBG normalization: can take 1–2 YEARS after stopping OCPs to return to new baseline
[Verified] Without concurrent DHEA or testosterone supplementation, OCPs essentially cause semi-permanent SHBG elevation

THYROID-SHBG CONNECTION:
[Verified] Thyroid hormone (especially T3, natural desiccated thyroid) significantly raises SHBG
[Verified] T3-only or NDT users: may experience "high SHBG" symptoms — apparent HRT resistance — because thyroid is artificially elevating SHBG
[Verified] Clinical scenario: Woman starts thyroid medication → SHBG rises → free hormones fall → starts experiencing hot flashes, night sweats despite "normal" total hormones on labs
[Verified] Oral estrogen also raises TBG (thyroid binding globulin) → decreases free thyroid hormone → women may NEED more thyroid hormone after starting oral HRT
[Verified] A small amount of estrogen can stimulate thyroid production (TSH compensatory rise); but if thyroid capacity is already borderline, it won't compensate

RAISING SHBG — Dr. Gillett's Preferred Strategies:
[Verified] First-line: Optimize metabolic health (reduce insulin resistance, lose visceral fat)
[Verified] Inositol/D-chiro-inositol: helps via insulin sensitization → raises SHBG
[Verified] Thyroid optimization: exogenous thyroid hormones (especially T3-containing) raise SHBG significantly
[Verified] Oral estrogen: raises SHBG (but check downsides with TBG and thrombosis risk)
[Verified] Less favored: Natural DHT inhibitors (saw palmetto, nettles) — too weak; if patient is candidate for those, often better to do nothing and focus on SHBG optimization instead

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DUTASTERIDE — COMPLETE CLINICAL FRAMEWORK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Verified] Drug class: Aza-steroid; potent competitive irreversible inhibitor of BOTH type I AND type II 5-alpha reductase
[Verified] Pharmacology vs finasteride: ~3x stronger inhibition of type 2, ~100x stronger inhibition of type 1; lowers serum DHT ~98% (vs ~71% for finasteride); half-life ~5 WEEKS (vs finasteride ~6 hours)
[Verified] 5α-reductase type I: found in SKIN (sebaceous glands, sweat glands, keratinocytes), liver → synthesizes ~33% of circulating DHT
[Verified] 5α-reductase type II: found in hair follicles, male genital tract → synthesizes ~66% of circulating DHT

NET HORMONAL EFFECTS OF DUTASTERIDE:
[Verified] ↓↓↓ DHT (98% reduction)
[Verified] ↑ Testosterone (less conversion away from T)
[Verified] ↑ Estrogen (both from direct precursor effect and estradiol conversion)
[Verified] CRITICAL: On dutasteride, the T:E (testosterone-to-estrogen) ratio must be monitored closely — lower DHT = INCREASED sensitivity to estrogen effects
[Verified] The androgen receptor "door" analogy: lower DHT = door less well-held open by androgens = estrogen effects proportionally stronger

PROGESTERONE CONNECTION (unique Dr. Gillett insight):
[Verified] 5-alpha reductase also converts PROGESTERONE to DHP (dihydroprogesterone/allopregnanolone)
[Verified] DHP activates GABA receptors in the brain (same receptor as benzodiazepines — calming effect)
[Verified] When DHP fluctuates (e.g., end of cycle), progesterone withdrawal → PMS/PMDD symptoms
[Verified] Therefore dutasteride treats BOTH androgenic symptoms AND progesterone-sensitivity issues (PMDD, PMS, postpartum depression)
[Verified] ~10% of females get a "blah/depressed" feeling from progesterone — many benefit from low-dose dutasteride
[Verified] Oral progesterone → liver → large conversion to DHP → better sleep effects but also more GABA-receptor effects
[Verified] Dutasteride studied for PMDD at doses up to 2.5 mg/day; most females benefit from MUCH lower doses

DOSING IN WOMEN (off-label, Dr. Gillett's approach):
[Verified] Typical range: 0.15–0.5 mg oral, often pulsed (1–3x per week rather than daily) to balance DHT reduction with T:E ratio management
[Verified] Women with SHBG <30 and shallow androgen pool: often add dutasteride prophylactically when starting testosterone therapy
[Verified] For women on TOPICAL testosterone: low-dose dutasteride ~0.5 mg once weekly commonly needed to normalize DHT back to physiologic levels (skin converts T → DHT at unnaturally high rates)
[Verified] Dutasteride has a longer half-life than finasteride and better tissue penetration in non-genital skin = preferred in women not planning immediate pregnancy
[Verified] Female pattern hair loss (FAGA): Boersma 2014 retrospective cohort n=3,500 women — dutasteride improved hair loss in 65.6% of cases with 83.3% increase in hair thickness; women <50 responded better to dutasteride than finasteride

FINASTERIDE SYNDROME vs DUTASTERIDE:
[Verified] Finasteride syndrome: documented — persistent sexual dysfunction, depression, cognitive effects after discontinuation in a subset of men
[Verified] Dutasteride: "There is no dutasteride syndrome" — much better tolerated; anecdotally confirmed in Dr. Gillett's practice
[Verified] ~90% of people tolerate dutasteride well
[Verified] Dutasteride-specific risks in women: depletion of progesterone neurosteroids (DHP) → possible OCD-like symptoms (more common with finasteride); possible symptoms of low testosterone if baseline T already low
[Verified] Psychiatric monitoring: depression and mood changes — recommend monitoring (especially psychiatric effects are more associated with finasteride)

TOPICAL DUTASTERIDE (Emerging):
[Emerging Evidence] Mesotherapy (localized scalp injections): blocks DHT only at hair follicles — avoids systemic 5α-reductase inhibition; most promising approach for female pattern hair loss (FAGA) with minimal systemic side effects
[Emerging Evidence] Phase II RCT 2024 (n=135): 0.05% topical dutasteride solution superior to finasteride 1mg oral at week 24 (PMC12405733)
[Emerging Evidence] Microneedling + 0.01% topical dutasteride RCT 2022: 52.9% vs 17.6% expert-assessed improvement at week 16 (p=0.037) in male AGA

PREGNANCY CONTRAINDICATION:
[Verified] ABSOLUTE CONTRAINDICATION in pregnancy — associated with abnormal male external genital development (hypospadias)
[Verified] Reliable contraception REQUIRED in women of childbearing potential
[Verified] Blood donation: men must wait 6 months after last dose

NATURAL DHT REDUCERS (vs pharmaceutical):
[Verified] Plant polyphenols, curcumin/turmeric + black pepper extract: inhibit 5α-reductase enzyme → reduce DHT
[Verified] Saw palmetto, stinging nettles: DHT blockers but "much weaker" — if candidate for these, Dr. Gillett often prefers doing nothing and focusing on SHBG optimization instead
[Verified] CAUTION: If DHT is already low or androgen receptor is genetically insensitive → avoid bioavailable curcumin/turmeric/black pepper

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BINDING GLOBULINS — COMPLETE SYSTEM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
THREE MAJOR BINDING GLOBULINS:
[Verified] SHBG (Sex Hormone Binding Globulin): binds androgens and estrogens
[Verified] TBG (Thyroid Binding Globulin): binds thyroid hormones — oral estrogen raises TBG
[Verified] CBG (Cortisol Binding Globulin): binds cortisol AND progesterone

BUMPER CARS ANALOGY (CBG — Dr. Gillett):
[Verified] Progesterone and cortisol SHARE CBG like bumper cars — they compete for the same binding protein
[Verified] Cortisol is better at displacing progesterone from CBG → high cortisol → less CBG-bound progesterone → more free (and metabolized) progesterone
[Verified] Therefore: you CAN manipulate free cortisol levels by taking oral progesterone (they compete for CBG binding)
[Verified] Oral progesterone: significant CBG competition; topical/transdermal progesterone: much less CBG effect (does not go through liver)
[Verified] High-dose pregnenolone also converts to progesterone → indirect CBG competition

ORAL ROUTE = FIRST-PASS EFFECT ON ALL BINDING GLOBULINS:
[Verified] Any oral hormone binds in the liver (first-pass metabolism) → gets "extra turns" binding to hepatic receptors → more pronounced effect on all binding globulins
[Verified] Oral estrogen → ↑↑ SHBG, ↑↑ TBG, ↑ platelets (blood clot risk)
[Verified] Oral androgens → ↓↓ SHBG (precipitous drop)
[Verified] Transdermal/topical hormones: much milder effect on binding globulins — preferred when wanting to minimize SHBG/TBG manipulation

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HRT FRAMEWORK — ESTROGEN, PROGESTERONE, TESTOSTERONE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ESTROGEN ROUTE SELECTION:
[Verified] Transdermal estrogen (patch, gel, cream): preferred — minimal SHBG and TBG impact; lower thrombosis risk; better free androgen preservation
[Verified] Oral estrogen: significantly raises SHBG + TBG; increases platelets/clotting risk; reduces free testosterone; may require more thyroid hormone adjustment
[Verified] Even topical estrogen slightly raises TBG — but much less than oral. A little estrogen can help stimulate thyroid production (TSH rises compensatorily)

PROGESTERONE SENSITIVITY — CLINICAL PEARL:
[Verified] About 10% of females feel "blah" or depressed from progesterone (oral most common → liver → large DHP production → GABA receptor sedation)
[Verified] Hierarchy of options when progesterone sensitivity is a problem:
  1. Switch from oral to transdermal progesterone (much less DHP/GABA effect)
  2. Try suppository or vaginal route
  3. If still problematic: consider low-dose dutasteride to reduce progesterone→DHP conversion
  4. IUD (local progestogen) as last resort — not ideal in menopause
[Verified] Progesterone is needed to oppose endometrial hyperplasia (prevent uterine bleeding) in women with a uterus — up to 1/3 of women starting HRT around menopause may have breakthrough bleeding initially

BIOIDENTICAL vs SYNTHETIC:
[Verified] Bioidentical progesterone (micronized — Prometrium, Utrogestan): more predictable mechanisms
[Verified] Synthetic progestins (MPA, norethisterone, etc.): more complex mechanisms; vary in androgenic/anti-androgenic activity; can worsen or improve androgen symptoms depending on type
[Verified] Birth control pills: some activate the androgen receptor (androgenic effect); some block it (anti-androgenic); this is why Dr. Gillett calls them "synthetic HRT"

PARADOX OF HRT AND BODY COMPOSITION:
[Verified] Adding estrogen replacement can initially worsen weight/fat gain before improving — this is known and expected
[Verified] Adding estrogen blocks the "low-estrogen punch" but also unblocks other punches (thyroid, testosterone decline, etc.)
[Verified] Key: must address ALL the punches simultaneously — estrogen alone is insufficient for body composition

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MENOPAUSAL WEIGHT GAIN — THE 6-PUNCH CASCADE MODEL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Verified] "Six punches" causing fat gain at menopause (Dr. Gillett's framework):
1. ↓ Estrogen — visceral fat redistribution (ERα suppresses abdominal fat storage)
2. ↓ Growth hormone / IGF-1 — reduced lipolysis
3. ↓ DHEA-S — reduced peripheral androgen/estrogen conversion
4. ↓ Testosterone — sarcopenia (muscle loss), reduced metabolic rate
5. ↓ Progesterone — sleep disruption
6. ↓ Melatonin + poor sleep quality — elevated cortisol → insulin resistance → visceral fat

[Verified] SWAN Cohort (Greendale 2019, JCI Insight, n=longitudinal):
• Fat gain rate DOUBLED at the start of the menopause transition (MT)
• Lean mass DECLINED during MT
• Trajectories flattened ~2 years after final menstrual period (FMP)
• 4-year window of maximum risk: 2 years before FMP → 2 years after FMP
• Visceral fat increases 8.2%/year starting 2 years before FMP; slows to 5.8%/year after
• Postmenopausal women gain 36% more trunk fat, 49% more intra-abdominal fat, 22% more subcutaneous abdominal fat than premenopausal counterparts over 5 years

[Verified] CRITICAL INSIGHT: Total body weight does NOT capture the metabolic shift — fat mass RISES while lean mass FALLS; net scale weight may be modest but body composition dramatically deteriorates

[Verified] QUICKSAND ANALOGY (Dr. Gillett): Once metabolic syndrome has started, it's like being in quicksand up to your shoulders — you need tools (GLP-1s are the "backhoe") to get out. Just lifestyle is like digging with your hands at that point.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GLP-1 MEDICATIONS — DR. GILLETT'S COMPLETE FRAMEWORK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INDICATIONS FOR GLP-1 (Dr. Gillett's criteria — at least one should be present):
[Verified] • HbA1c ≥ 5.7%
[Verified] • Fasting insulin ≥ 12 μIU/mL
[Verified] • Body fat > 35% on DEXA scan
[Verified] • Menopausal woman who has done "everything right" (HRT, lifting, protein-forward diet, sleep) and still cannot lose the weight

SEMAGLUTIDE vs TIRZEPATIDE:
[Verified] Tirzepatide (Mounjaro): starting dose 2.5 mg ≈ semaglutide 1.5 mg in potency (so you start HIGHER relative to semaglutide)
[Verified] Tirzepatide preferred by Dr. Gillett when: diabetic, significantly pre-diabetic, or body fat >50%
[Verified] Semaglutide: identical risk-benefit profile at adequate doses — not objectively inferior to tirzepatide in non-diabetic women
[Verified] Individual variation: some tolerate one far better than the other (Karen Martel: felt "like dying" on semaglutide; no side effects on tirzepatide)
[Verified] Evidence: STEP trials (semaglutide 15-22% body weight reduction); SURMOUNT-1 (tirzepatide)

MANDATORY WITH GLP-1 USE:
[Verified] Resistance training is NON-NEGOTIABLE — without it, GLP-1s cause significant muscle loss alongside fat loss
[Verified] Protein intake minimum: 1.2–1.6 g/kg body weight daily during any weight loss
[Verified] Lifestyle habits MUST continue alongside GLP-1 — the medication is a backhoe to get you out of the quicksand, NOT a replacement for the other tools
[Verified] Monitor bone mineral density and lean body mass (DEXA) closely
[Verified] "At least half of people regain weight after stopping GLP-1s" without lifestyle foundation

WEANING AND MAINTENANCE PROTOCOL (Dr. Gillett):
[Verified] Wean gradually — don't abruptly stop
[Verified] Maintenance semaglutide dose: 0.1–0.25 mg once weekly (very low dose)
[Verified] Continue at very low dose for at least 1–6 months while "removing training wheels" for lifestyle
[Verified] Can continue indefinitely at low dose — no rush to completely stop
[Verified] Mental/psychological component: many become "addicted" to appetite control — this is not physical dependence
[Verified] Goal: reach sustainable lifestyle point where restart is not needed

MEDICATIONS USED AFTER/DURING GLP-1 WEAN:
[Verified] Low-dose naltrexone (LDN): addresses craving centers
[Verified] Bupropion: appetite and craving; bupropion + naltrexone = generic Contrave
[Verified] Orexin inhibitors: for poor sleep — turns off "hungry, angry, awake" brain center
[Verified] Apelyne (cellulose gum, Gorilla Mind brand) = generic version of Plenity — physical satiety
[Verified] Alpha-yohimbine (1 mg very low dose): appetite suppressant with fewer side effects than yohimbine
[Verified] Berberine (A2AM product): insulin sensitizer / weak GLP-1 mechanism; use with caution in those at risk of palpitations
[Verified] Allulose (0.25 cal/g): gustatory GLP-1 stimulus — body tastes it and releases endogenous GLP-1; good substitute for sweeteners
[Verified] Fiber powder + casein protein in the morning: sufficient for some patients as maintenance

BODY COMPOSITION PRIORITY:
[Verified] PRESERVING LEAN BODY MASS is the paramount goal — muscle is the primary metabolic organ
[Verified] DEXA scan (DEXAfit, DEXAscan.com) preferred over scale weight for monitoring
[Verified] Waist circumference and body fat % more informative than BMI in postmenopausal women

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DHEA — ROLE AND LIMITATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Verified] DHEA: most abundant steroid in the body; adrenal origin; weak androgen/estrogen precursor
[Verified] Intracellularly (Dr. Fernand Labrie's research): DHEA converts to androgens and estrogens INSIDE cells, not primarily in serum → you may not see serum level changes but intracellular effects can be significant
[Verified] In sebaceous tissue: DHEA converts rapidly to DHT → explains acne, oily skin from high-dose DHEA supplementation
[Verified] On dutasteride: DHEA supplementation can cause bigger testosterone spike (conversion pathway altered)
[Verified] Typical finding: most women do NOT see meaningful serum testosterone/estrogen increases from DHEA supplementation alone
[Verified] "Just taking DHEA" to raise estrogen/testosterone in menopause: Dr. Gillett considers this insufficient in most cases — "I never see that working"
[Verified] Non-classical congenital adrenal hyperplasia: rare — some women have hyperactive adrenals, very high DHEA-S, and may not need HRT in menopause
[Verified] Check as DHEA-S (sulfate form) — reflects adrenal production
[Verified] Huge adrenal variability: some women have DHEA-S of 700+ in menopause and feel great without HRT (rare minority)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PCOS — ANDROGEN EXCESS PATTERN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Verified] PCOS = shallow androgen pool — even small androgen additions cause overflow/virilization
[Verified] PCOS is a SPECTRUM — Rotterdam criteria (2 of 3: irregular cycles, polycystic ovaries, androgen excess); can have mild or severe
[Verified] Weight gain in PCOS is NOT primarily from high testosterone — it's from INSULIN RESISTANCE + excess calories + metabolic syndrome
[Verified] Insulin = "fuel to the fire" of androgens — lowers SHBG, increases free androgen fraction
[Verified] D-chiro-inositol mechanism: not a direct androgen blocker — reduces insulin's potentiation of androgens; intracellular anti-androgen effect
[Verified] Androgen receptor "door" analogy in PCOS: testosterone easily opens the door; insulin wedges it open longer; d-chiro-inositol prevents insulin from wedging the door
[Verified] PCOS phenotypes: lean/androgenic type (true hyperandrogenism) vs overweight/insulin-resistant type — very different management
[Verified] Lean PCOS = high androgens as primary driver; insulin resistant PCOS = insulin driving androgen effects

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
METABOLIC LABS — COMPLETE ASSESSMENT FRAMEWORK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TIER 1 — CORE HORMONE PANEL:
[Verified] Total testosterone (serum)
[Verified] SHBG → calculate FREE testosterone (Vermeulen equation)
[Verified] DHEA-S (adrenal androgen reserve)
[Verified] DHT (dihydrotestosterone)
[Verified] Estradiol (E2)
[Verified] Progesterone (day 21 if still cycling, or any time if not)
[Verified] LH + FSH (pituitary/ovarian reserve)

TIER 2 — METABOLIC PANEL:
[Verified] Fasting insulin (red flag: >7 μIU/mL = concerning; >12 = GLP-1 candidate)
[Verified] Fasting glucose (red flag: >100 mg/dL)
[Verified] HbA1c (red flag: ≥5.7% = GLP-1 candidate)
[Verified] hs-CRP (inflammation + cardiovascular risk marker)
[Verified] Full lipid panel (TC, LDL-C, HDL-C, triglycerides, ApoB)
[Verified] ALT (liver health — correlates with hepatic fat/NAFLD → SHBG driver)

TIER 3 — THYROID PANEL:
[Verified] TSH
[Verified] Free T3 + Free T4
[Verified] Reverse T3 (optional)
[Verified] Thyroid antibodies (TPO, anti-thyroglobulin) if autoimmune thyroid suspected

BODY COMPOSITION:
[Verified] DEXA scan: gold standard — measures lean mass, fat mass, visceral fat, bone mineral density
[Verified] Normal female body fat: 17–33% (at replacement testosterone doses, less risk of excess T-to-DHT/estrogen conversion)
[Verified] >35% body fat = GLP-1 candidate
[Verified] >50% body fat = tirzepatide preferred over semaglutide

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BREAST CANCER CONTEXT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Verified] Most breast cancers are ER+ (estrogen receptor positive) — GROWN by estrogens, SHRUNK by androgens
[Verified] Testosterone does not appear to be a significant growth agonist in most breast cancers because androgens compete with/shut down estrogen receptor signaling
[Verified] RARE: some breast cancers are androgen-receptor positive and grown by androgens — this is why biopsy and pathology is critical
[Verified] Testosterone CAN aromatize to estradiol systemically at high doses → estradiol can then reach breast tissue — dose matters
[Verified] Enobosarm (Ostarine/MK-2866 SARM): close to FDA approval for triple-negative breast cancer
[Verified] Higher SHBG = protective against ER+ breast cancer (reduces free estradiol exposure) — PMC12109167
[Verified] Long-term safety of testosterone in women with history of breast cancer: NOT established — caution required
[Verified] Antiandrogens (including 5-ARIs like dutasteride): no clearly increased breast cancer risk in women, but evidence is limited (Safety review, J Clin Med 2024)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RESPONSE FORMAT REQUIREMENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Label EVERY factual claim: [Verified], [Emerging Evidence], or [Speculation]
- Use analogies for complex concepts (pool, savings account, bumper cars, dart board, backhoe, quicksand, training wheels, bumper cars)
- Lead with most evidence-based, actionable content
- Include relevant study citations when discussing evidence (SWAN, Islam 2019, Boersma 2014, Global Consensus 2019, ISSWSH 2021, etc.)
- Structure responses clearly with logical flow
- Use math/statistics when explaining concepts (ratios, percentages, reference ranges)
- End all clinical/treatment questions with: ⚠️ Always work with a qualified hormone specialist for personalized evaluation and treatment.`;


// ─── Data ───────────────────────────────────────────────────────────────────
const QUICK_TOPICS = [
  { label: "Starting testosterone — what dose and route?", icon: "💉" },
  { label: "My SHBG is high — is that good or bad?", icon: "🔗" },
  { label: "Dutasteride for hair loss — evidence?", icon: "💊" },
  { label: "Why am I gaining weight in menopause?", icon: "⚖️" },
  { label: "Should I try GLP-1 medications?", icon: "🎯" },
  { label: "What labs should I get?", icon: "🧪" },
  { label: "Oral vs transdermal HRT — difference?", icon: "🔄" },
  { label: "PCOS and androgen excess — how?", icon: "🧬" },
  { label: "Progesterone sensitivity — options?", icon: "😔" },
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
  const formatContent = (text) => text
    .replace(/\*\*(.*?)\*\*/g,'<strong style="color:#0f172a;font-weight:700">$1</strong>')
    .replace(/\*(.*?)\*/g,'<em style="color:#334155">$1</em>')
    .replace(/\[Verified\]/g,'<span style="display:inline-flex;align-items:center;background:#f0fdf4;color:#15803d;padding:1px 7px;border-radius:4px;font-size:11px;font-weight:700;border:1px solid #bbf7d0;font-family:monospace">✓ Verified</span>')
    .replace(/\[Emerging Evidence\]/g,'<span style="display:inline-flex;align-items:center;background:#fffbeb;color:#92400e;padding:1px 7px;border-radius:4px;font-size:11px;font-weight:700;border:1px solid #fde68a;font-family:monospace">⚡ Emerging</span>')
    .replace(/\[Speculation\]/g,'<span style="display:inline-flex;align-items:center;background:#f5f3ff;color:#6d28d9;padding:1px 7px;border-radius:4px;font-size:11px;font-weight:700;border:1px solid #ddd6fe;font-family:monospace">? Speculation</span>')
    .replace(/⚠️(.*?)(<br\/>|$)/g,'<div style="margin-top:10px;padding:10px 14px;background:#fff7ed;border:1px solid #fed7aa;border-left:3px solid #ea580c;border-radius:6px;color:#9a3412;font-size:13px;line-height:1.5">⚠️$1</div>')
    .replace(/•/g,'<span style="color:#4f46e5;font-weight:bold;margin-right:3px">•</span>')
    .replace(/\n\n/g,'<br/><br/>').replace(/\n/g,'<br/>');
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
    content:"Welcome to the **Hormone AI Consultant** — a complete clinical framework built and cross-referenced with peer-reviewed evidence and clinical practice guidelines.\n\nI can guide you through:\n• **Testosterone therapy** — exact starting doses, routes, virilization monitoring\n• **SHBG optimization** — the hormone buffer system with specific lab targets\n• **Dutasteride** — complete protocol for FAGA, hirsutism, and progesterone sensitivity\n• **Menopausal weight gain** — the 6-punch cascade model with SWAN cohort data\n• **GLP-1 medications** — precise candidacy criteria and weaning protocols\n• **HRT framework** — route selection, sequencing, and lab monitoring\n• **Comprehensive labs** — tiered assessment with specific red-flag thresholds\n\n[Verified] All responses label evidence level clearly.\n\n⚠️ Educational information only — always partner with a qualified hormone specialist."
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
