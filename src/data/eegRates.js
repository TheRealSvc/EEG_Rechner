/**
 * EEG Einspeisevergütungssätze für Photovoltaikanlagen (2012–2027)
 *
 * Quellen:
 *  - Bundesnetzagentur: https://www.bundesnetzagentur.de/DE/Fachthemen/ElektrizitaetundGas/ErneuerbareEnergien/EEG_Foerderung/start.html
 *  - Archiv: https://www.bundesnetzagentur.de/DE/Fachthemen/ElektrizitaetundGas/ErneuerbareEnergien/EEG_Foerderung/Archiv_VergSaetze/start.html
 *
 * Struktur je Eintrag:
 *  - from / to:       Gültigkeitszeitraum (ISO-Datum, inklusiv)
 *  - law:             Gesetzliche Grundlage
 *  - approx:          true = Näherungswert (interpoliert), bitte beim Netzbetreiber bestätigen
 *  - gebaeude:        Gebäudeanlagen und Lärmschutzwände (§ 48 Abs. 2/2a EEG)
 *  - sonstige:        Sonstige Anlagen / Freiflächenanlagen (§ 48 Abs. 1 EEG)
 *
 * Vergütungssätze in ct/kWh:
 *  - partial:  Überschusseinspeisung (Einspeisung des nicht selbstverbrauchten Stroms)
 *  - full:     Volleinspeisung (100 % Einspeisung, erst ab Osterpaket 2022 möglich)
 *              null = Volleinspeisung-Zuschlag existierte in diesem Zeitraum nicht
 *
 * Tierstaffelung (marginal, nicht stufenweise):
 *  - maxKwp 10  → gilt für installierte Leistung von 0 bis 10 kWp
 *  - maxKwp 40  → gilt für den Leistungsanteil zwischen 10 und 40 kWp
 *  - maxKwp 100 → gilt für den Leistungsanteil zwischen 40 und 100 kWp
 *
 * Anlagen > 100 kWp: Marktprämienmodell / Ausschreibung, nicht hier abgebildet.
 */

export const EEG_RATES = [
  // ─── 2012 (EEG 2012, monatliche Degression) ────────────────────────────────
  // Ankerwert Q1 2012 (bestätigt)
  {
    from: '2012-01-01', to: '2012-03-31', law: 'EEG 2012', approx: false,
    gebaeude: [
      { maxKwp: 10,  partial: 19.50, full: null },
      { maxKwp: 40,  partial: 16.50, full: null },
      { maxKwp: 100, partial: 13.50, full: null },
    ],
    sonstige: [{ maxKwp: 100, partial: 11.00, full: null }],
  },
  {
    from: '2012-04-01', to: '2012-06-30', law: 'EEG 2012', approx: true,
    gebaeude: [
      { maxKwp: 10,  partial: 18.90, full: null },
      { maxKwp: 40,  partial: 16.00, full: null },
      { maxKwp: 100, partial: 13.10, full: null },
    ],
    sonstige: [{ maxKwp: 100, partial: 10.70, full: null }],
  },
  {
    from: '2012-07-01', to: '2012-09-30', law: 'EEG 2012', approx: true,
    gebaeude: [
      { maxKwp: 10,  partial: 18.30, full: null },
      { maxKwp: 40,  partial: 15.50, full: null },
      { maxKwp: 100, partial: 12.70, full: null },
    ],
    sonstige: [{ maxKwp: 100, partial: 10.40, full: null }],
  },
  {
    from: '2012-10-01', to: '2012-12-31', law: 'EEG 2012', approx: true,
    gebaeude: [
      { maxKwp: 10,  partial: 17.70, full: null },
      { maxKwp: 40,  partial: 15.00, full: null },
      { maxKwp: 100, partial: 12.30, full: null },
    ],
    sonstige: [{ maxKwp: 100, partial: 10.10, full: null }],
  },

  // ─── 2013 ──────────────────────────────────────────────────────────────────
  // Ankerwert Jan 2013: ≤10 kWp = 17,02 ct (bestätigt)
  {
    from: '2013-01-01', to: '2013-03-31', law: 'EEG 2012', approx: false,
    gebaeude: [
      { maxKwp: 10,  partial: 17.02, full: null },
      { maxKwp: 40,  partial: 14.40, full: null },
      { maxKwp: 100, partial: 11.80, full: null },
    ],
    sonstige: [{ maxKwp: 100, partial: 9.80, full: null }],
  },
  {
    from: '2013-04-01', to: '2013-06-30', law: 'EEG 2012', approx: true,
    gebaeude: [
      { maxKwp: 10,  partial: 16.50, full: null },
      { maxKwp: 40,  partial: 13.95, full: null },
      { maxKwp: 100, partial: 11.45, full: null },
    ],
    sonstige: [{ maxKwp: 100, partial: 9.55, full: null }],
  },
  {
    from: '2013-07-01', to: '2013-09-30', law: 'EEG 2012', approx: true,
    gebaeude: [
      { maxKwp: 10,  partial: 16.00, full: null },
      { maxKwp: 40,  partial: 13.50, full: null },
      { maxKwp: 100, partial: 11.10, full: null },
    ],
    sonstige: [{ maxKwp: 100, partial: 9.25, full: null }],
  },
  {
    from: '2013-10-01', to: '2013-12-31', law: 'EEG 2012', approx: true,
    gebaeude: [
      { maxKwp: 10,  partial: 15.50, full: null },
      { maxKwp: 40,  partial: 13.10, full: null },
      { maxKwp: 100, partial: 10.75, full: null },
    ],
    sonstige: [{ maxKwp: 100, partial: 9.00, full: null }],
  },

  // ─── 2014 ──────────────────────────────────────────────────────────────────
  // Ankerwert Jan 2014: ≤10 kWp = 13,68 ct (bestätigt)
  // Ankerwert Jul 2014: 12,88 / 12,22 / 10,90 ct (bestätigt)
  {
    from: '2014-01-01', to: '2014-03-31', law: 'EEG 2012', approx: false,
    gebaeude: [
      { maxKwp: 10,  partial: 13.68, full: null },
      { maxKwp: 40,  partial: 12.96, full: null },
      { maxKwp: 100, partial: 11.60, full: null },
    ],
    sonstige: [{ maxKwp: 100, partial: 8.80, full: null }],
  },
  {
    from: '2014-04-01', to: '2014-06-30', law: 'EEG 2012', approx: true,
    gebaeude: [
      { maxKwp: 10,  partial: 13.28, full: null },
      { maxKwp: 40,  partial: 12.59, full: null },
      { maxKwp: 100, partial: 11.25, full: null },
    ],
    sonstige: [{ maxKwp: 100, partial: 8.55, full: null }],
  },
  {
    from: '2014-07-01', to: '2014-09-30', law: 'EEG 2014', approx: false,
    gebaeude: [
      { maxKwp: 10,  partial: 12.88, full: null },
      { maxKwp: 40,  partial: 12.22, full: null },
      { maxKwp: 100, partial: 10.90, full: null },
    ],
    sonstige: [{ maxKwp: 100, partial: 8.30, full: null }],
  },
  {
    from: '2014-10-01', to: '2014-12-31', law: 'EEG 2014', approx: true,
    gebaeude: [
      { maxKwp: 10,  partial: 12.72, full: null },
      { maxKwp: 40,  partial: 12.06, full: null },
      { maxKwp: 100, partial: 10.77, full: null },
    ],
    sonstige: [{ maxKwp: 100, partial: 8.20, full: null }],
  },

  // ─── 2015 ──────────────────────────────────────────────────────────────────
  // Ankerwert Jan 2015: 12,56 / 11,90 / 10,63 ct (bestätigt)
  {
    from: '2015-01-01', to: '2015-03-31', law: 'EEG 2014', approx: false,
    gebaeude: [
      { maxKwp: 10,  partial: 12.56, full: null },
      { maxKwp: 40,  partial: 11.90, full: null },
      { maxKwp: 100, partial: 10.63, full: null },
    ],
    sonstige: [{ maxKwp: 100, partial: 8.10, full: null }],
  },
  {
    from: '2015-04-01', to: '2015-06-30', law: 'EEG 2014', approx: true,
    gebaeude: [
      { maxKwp: 10,  partial: 12.40, full: null },
      { maxKwp: 40,  partial: 11.76, full: null },
      { maxKwp: 100, partial: 10.50, full: null },
    ],
    sonstige: [{ maxKwp: 100, partial: 8.00, full: null }],
  },
  {
    from: '2015-07-01', to: '2015-09-30', law: 'EEG 2014', approx: true,
    gebaeude: [
      { maxKwp: 10,  partial: 12.25, full: null },
      { maxKwp: 40,  partial: 11.62, full: null },
      { maxKwp: 100, partial: 10.37, full: null },
    ],
    sonstige: [{ maxKwp: 100, partial: 7.90, full: null }],
  },
  {
    from: '2015-10-01', to: '2015-12-31', law: 'EEG 2014', approx: true,
    gebaeude: [
      { maxKwp: 10,  partial: 12.10, full: null },
      { maxKwp: 40,  partial: 11.48, full: null },
      { maxKwp: 100, partial: 10.24, full: null },
    ],
    sonstige: [{ maxKwp: 100, partial: 7.80, full: null }],
  },

  // ─── 2016 ──────────────────────────────────────────────────────────────────
  {
    from: '2016-01-01', to: '2016-03-31', law: 'EEG 2014', approx: true,
    gebaeude: [
      { maxKwp: 10,  partial: 11.95, full: null },
      { maxKwp: 40,  partial: 11.33, full: null },
      { maxKwp: 100, partial: 10.11, full: null },
    ],
    sonstige: [{ maxKwp: 100, partial: 7.70, full: null }],
  },
  {
    from: '2016-04-01', to: '2016-06-30', law: 'EEG 2014', approx: true,
    gebaeude: [
      { maxKwp: 10,  partial: 11.78, full: null },
      { maxKwp: 40,  partial: 11.17, full: null },
      { maxKwp: 100, partial: 9.97,  full: null },
    ],
    sonstige: [{ maxKwp: 100, partial: 7.58, full: null }],
  },
  {
    from: '2016-07-01', to: '2016-09-30', law: 'EEG 2017', approx: true,
    gebaeude: [
      { maxKwp: 10,  partial: 11.62, full: null },
      { maxKwp: 40,  partial: 11.02, full: null },
      { maxKwp: 100, partial: 9.83,  full: null },
    ],
    sonstige: [{ maxKwp: 100, partial: 7.47, full: null }],
  },
  {
    from: '2016-10-01', to: '2016-12-31', law: 'EEG 2017', approx: true,
    gebaeude: [
      { maxKwp: 10,  partial: 11.46, full: null },
      { maxKwp: 40,  partial: 10.87, full: null },
      { maxKwp: 100, partial: 9.70,  full: null },
    ],
    sonstige: [{ maxKwp: 100, partial: 7.36, full: null }],
  },

  // ─── 2017 ──────────────────────────────────────────────────────────────────
  {
    from: '2017-01-01', to: '2017-03-31', law: 'EEG 2017', approx: true,
    gebaeude: [
      { maxKwp: 10,  partial: 11.30, full: null },
      { maxKwp: 40,  partial: 10.72, full: null },
      { maxKwp: 100, partial: 9.57,  full: null },
    ],
    sonstige: [{ maxKwp: 100, partial: 7.25, full: null }],
  },
  {
    from: '2017-04-01', to: '2017-06-30', law: 'EEG 2017', approx: true,
    gebaeude: [
      { maxKwp: 10,  partial: 11.15, full: null },
      { maxKwp: 40,  partial: 10.58, full: null },
      { maxKwp: 100, partial: 9.44,  full: null },
    ],
    sonstige: [{ maxKwp: 100, partial: 7.15, full: null }],
  },
  {
    from: '2017-07-01', to: '2017-09-30', law: 'EEG 2017', approx: true,
    gebaeude: [
      { maxKwp: 10,  partial: 11.01, full: null },
      { maxKwp: 40,  partial: 10.45, full: null },
      { maxKwp: 100, partial: 9.32,  full: null },
    ],
    sonstige: [{ maxKwp: 100, partial: 7.05, full: null }],
  },
  {
    from: '2017-10-01', to: '2017-12-31', law: 'EEG 2017', approx: true,
    gebaeude: [
      { maxKwp: 10,  partial: 10.86, full: null },
      { maxKwp: 40,  partial: 10.31, full: null },
      { maxKwp: 100, partial: 9.20,  full: null },
    ],
    sonstige: [{ maxKwp: 100, partial: 6.96, full: null }],
  },

  // ─── 2018 ──────────────────────────────────────────────────────────────────
  {
    from: '2018-01-01', to: '2018-03-31', law: 'EEG 2017', approx: true,
    gebaeude: [
      { maxKwp: 10,  partial: 10.71, full: null },
      { maxKwp: 40,  partial: 10.17, full: null },
      { maxKwp: 100, partial: 9.08,  full: null },
    ],
    sonstige: [{ maxKwp: 100, partial: 6.86, full: null }],
  },
  {
    from: '2018-04-01', to: '2018-06-30', law: 'EEG 2017', approx: true,
    gebaeude: [
      { maxKwp: 10,  partial: 10.57, full: null },
      { maxKwp: 40,  partial: 10.03, full: null },
      { maxKwp: 100, partial: 8.96,  full: null },
    ],
    sonstige: [{ maxKwp: 100, partial: 6.77, full: null }],
  },
  {
    from: '2018-07-01', to: '2018-09-30', law: 'EEG 2017', approx: true,
    gebaeude: [
      { maxKwp: 10,  partial: 10.43, full: null },
      { maxKwp: 40,  partial: 9.90,  full: null },
      { maxKwp: 100, partial: 8.84,  full: null },
    ],
    sonstige: [{ maxKwp: 100, partial: 6.68, full: null }],
  },
  {
    from: '2018-10-01', to: '2018-12-31', law: 'EEG 2017', approx: true,
    gebaeude: [
      { maxKwp: 10,  partial: 10.29, full: null },
      { maxKwp: 40,  partial: 9.77,  full: null },
      { maxKwp: 100, partial: 8.72,  full: null },
    ],
    sonstige: [{ maxKwp: 100, partial: 6.59, full: null }],
  },

  // ─── 2019 ──────────────────────────────────────────────────────────────────
  {
    from: '2019-01-01', to: '2019-03-31', law: 'EEG 2017', approx: true,
    gebaeude: [
      { maxKwp: 10,  partial: 10.16, full: null },
      { maxKwp: 40,  partial: 9.64,  full: null },
      { maxKwp: 100, partial: 8.60,  full: null },
    ],
    sonstige: [{ maxKwp: 100, partial: 6.50, full: null }],
  },
  {
    from: '2019-04-01', to: '2019-06-30', law: 'EEG 2017', approx: true,
    gebaeude: [
      { maxKwp: 10,  partial: 10.03, full: null },
      { maxKwp: 40,  partial: 9.52,  full: null },
      { maxKwp: 100, partial: 8.49,  full: null },
    ],
    sonstige: [{ maxKwp: 100, partial: 6.41, full: null }],
  },
  {
    from: '2019-07-01', to: '2019-09-30', law: 'EEG 2017', approx: true,
    gebaeude: [
      { maxKwp: 10,  partial: 9.87, full: null },
      { maxKwp: 40,  partial: 9.37, full: null },
      { maxKwp: 100, partial: 8.36, full: null },
    ],
    sonstige: [{ maxKwp: 100, partial: 6.32, full: null }],
  },
  {
    from: '2019-10-01', to: '2019-12-31', law: 'EEG 2017', approx: true,
    gebaeude: [
      { maxKwp: 10,  partial: 9.74, full: null },
      { maxKwp: 40,  partial: 9.24, full: null },
      { maxKwp: 100, partial: 8.25, full: null },
    ],
    sonstige: [{ maxKwp: 100, partial: 6.23, full: null }],
  },

  // ─── 2020 ──────────────────────────────────────────────────────────────────
  {
    from: '2020-01-01', to: '2020-03-31', law: 'EEG 2017', approx: true,
    gebaeude: [
      { maxKwp: 10,  partial: 9.61, full: null },
      { maxKwp: 40,  partial: 9.12, full: null },
      { maxKwp: 100, partial: 8.14, full: null },
    ],
    sonstige: [{ maxKwp: 100, partial: 6.14, full: null }],
  },
  {
    from: '2020-04-01', to: '2020-06-30', law: 'EEG 2017', approx: true,
    gebaeude: [
      { maxKwp: 10,  partial: 9.49, full: null },
      { maxKwp: 40,  partial: 9.01, full: null },
      { maxKwp: 100, partial: 8.04, full: null },
    ],
    sonstige: [{ maxKwp: 100, partial: 6.07, full: null }],
  },
  {
    from: '2020-07-01', to: '2020-09-30', law: 'EEG 2017', approx: true,
    gebaeude: [
      { maxKwp: 10,  partial: 9.38, full: null },
      { maxKwp: 40,  partial: 8.90, full: null },
      { maxKwp: 100, partial: 7.95, full: null },
    ],
    sonstige: [{ maxKwp: 100, partial: 6.00, full: null }],
  },
  {
    from: '2020-10-01', to: '2020-12-31', law: 'EEG 2017', approx: true,
    gebaeude: [
      { maxKwp: 10,  partial: 9.27, full: null },
      { maxKwp: 40,  partial: 8.80, full: null },
      { maxKwp: 100, partial: 7.86, full: null },
    ],
    sonstige: [{ maxKwp: 100, partial: 5.93, full: null }],
  },

  // ─── 2021 (EEG 2021) ───────────────────────────────────────────────────────
  // Ankerwert Jan 2021: 8,16 / 7,93 / 6,22 ct (bestätigt)
  // Ankerwert Apr 2021: 7,81 / 7,59 / 5,95 ct (bestätigt)
  {
    from: '2021-01-01', to: '2021-03-31', law: 'EEG 2021', approx: false,
    gebaeude: [
      { maxKwp: 10,  partial: 8.16, full: null },
      { maxKwp: 40,  partial: 7.93, full: null },
      { maxKwp: 100, partial: 6.22, full: null },
    ],
    sonstige: [{ maxKwp: 100, partial: 5.80, full: null }],
  },
  {
    from: '2021-04-01', to: '2021-06-30', law: 'EEG 2021', approx: false,
    gebaeude: [
      { maxKwp: 10,  partial: 7.81, full: null },
      { maxKwp: 40,  partial: 7.59, full: null },
      { maxKwp: 100, partial: 5.95, full: null },
    ],
    sonstige: [{ maxKwp: 100, partial: 5.59, full: null }],
  },
  {
    from: '2021-07-01', to: '2021-09-30', law: 'EEG 2021', approx: true,
    gebaeude: [
      { maxKwp: 10,  partial: 7.60, full: null },
      { maxKwp: 40,  partial: 7.39, full: null },
      { maxKwp: 100, partial: 5.80, full: null },
    ],
    sonstige: [{ maxKwp: 100, partial: 5.45, full: null }],
  },
  {
    from: '2021-10-01', to: '2021-12-31', law: 'EEG 2021', approx: true,
    gebaeude: [
      { maxKwp: 10,  partial: 7.40, full: null },
      { maxKwp: 40,  partial: 7.20, full: null },
      { maxKwp: 100, partial: 5.66, full: null },
    ],
    sonstige: [{ maxKwp: 100, partial: 5.31, full: null }],
  },

  // ─── 2022 (bis Jul: EEG 2021; ab Aug: Osterpaket / EEG 2023) ──────────────
  // Ab August 2022 (Osterpaket, 30.07.2022): Volleinspeisung-Zuschlag eingeführt
  {
    from: '2022-01-01', to: '2022-03-31', law: 'EEG 2021', approx: true,
    gebaeude: [
      { maxKwp: 10,  partial: 7.20, full: null },
      { maxKwp: 40,  partial: 7.01, full: null },
      { maxKwp: 100, partial: 5.51, full: null },
    ],
    sonstige: [{ maxKwp: 100, partial: 5.18, full: null }],
  },
  {
    from: '2022-04-01', to: '2022-07-31', law: 'EEG 2021', approx: true,
    gebaeude: [
      { maxKwp: 10,  partial: 7.02, full: null },
      { maxKwp: 40,  partial: 6.83, full: null },
      { maxKwp: 100, partial: 5.37, full: null },
    ],
    sonstige: [{ maxKwp: 100, partial: 5.06, full: null }],
  },
  // Ab 30. Juli 2022: Osterpaket in Kraft — deutliche Erhöhung + Volleinspeisung
  {
    from: '2022-08-01', to: '2023-01-31', law: 'EEG 2023 (Osterpaket)', approx: true,
    gebaeude: [
      { maxKwp: 10,  partial: 8.20, full: 13.00 },
      { maxKwp: 40,  partial: 7.10, full: 10.89 },
      { maxKwp: 100, partial: 5.95, full: 10.89 },
    ],
    sonstige: [{ maxKwp: 100, partial: 6.00, full: 6.00 }],
  },

  // ─── 2023 (EEG 2023, Halbjahressätze) ─────────────────────────────────────
  {
    from: '2023-02-01', to: '2023-07-31', law: 'EEG 2023', approx: true,
    gebaeude: [
      { maxKwp: 10,  partial: 8.60, full: 13.00 },
      { maxKwp: 40,  partial: 7.50, full: 10.89 },
      { maxKwp: 100, partial: 6.20, full: 10.89 },
    ],
    sonstige: [{ maxKwp: 100, partial: 6.20, full: 6.20 }],
  },
  {
    from: '2023-08-01', to: '2024-01-31', law: 'EEG 2023', approx: true,
    gebaeude: [
      { maxKwp: 10,  partial: 8.20, full: 13.00 },
      { maxKwp: 40,  partial: 7.10, full: 10.68 },
      { maxKwp: 100, partial: 5.80, full: 10.68 },
    ],
    sonstige: [{ maxKwp: 100, partial: 6.10, full: 6.10 }],
  },

  // ─── 2024 ──────────────────────────────────────────────────────────────────
  {
    from: '2024-02-01', to: '2024-07-31', law: 'EEG 2023', approx: true,
    gebaeude: [
      { maxKwp: 10,  partial: 8.11, full: 12.87 },
      { maxKwp: 40,  partial: 7.03, full: 10.57 },
      { maxKwp: 100, partial: 5.74, full: 10.57 },
    ],
    sonstige: [{ maxKwp: 100, partial: 6.03, full: 6.03 }],
  },
  {
    from: '2024-08-01', to: '2025-01-31', law: 'EEG 2023', approx: true,
    gebaeude: [
      { maxKwp: 10,  partial: 8.03, full: 12.74 },
      { maxKwp: 40,  partial: 6.95, full: 10.46 },
      { maxKwp: 100, partial: 5.68, full: 10.46 },
    ],
    sonstige: [{ maxKwp: 100, partial: 5.95, full: 5.95 }],
  },

  // ─── 2025 (BNetzA bestätigt) ───────────────────────────────────────────────
  {
    from: '2025-02-01', to: '2025-07-31', law: 'EEG 2023', approx: false,
    gebaeude: [
      { maxKwp: 10,  partial: 7.96, full: 12.60 },
      { maxKwp: 40,  partial: 6.88, full: 10.56 },
      { maxKwp: 100, partial: 5.62, full: 10.56 },
    ],
    sonstige: [{ maxKwp: 100, partial: 5.88, full: 5.88 }],
  },
  {
    from: '2025-08-01', to: '2026-01-31', law: 'EEG 2023', approx: false,
    gebaeude: [
      { maxKwp: 10,  partial: 7.86, full: 12.47 },
      { maxKwp: 40,  partial: 6.80, full: 10.45 },
      { maxKwp: 100, partial: 5.56, full: 10.45 },
    ],
    sonstige: [{ maxKwp: 100, partial: 5.82, full: 5.82 }],
  },

  // ─── 2026 (BNetzA bestätigt) ───────────────────────────────────────────────
  {
    from: '2026-02-01', to: '2026-07-31', law: 'EEG 2023', approx: false,
    gebaeude: [
      { maxKwp: 10,  partial: 7.78, full: 12.34 },
      { maxKwp: 40,  partial: 6.73, full: 10.35 },
      { maxKwp: 100, partial: 5.50, full: 10.35 },
    ],
    sonstige: [{ maxKwp: 100, partial: 6.26, full: 6.26 }],
  },
  // Prognostiziert (BNetzA)
  {
    from: '2026-08-01', to: '2027-01-31', law: 'EEG 2023', approx: false,
    gebaeude: [
      { maxKwp: 10,  partial: 7.71, full: 12.23 },
      { maxKwp: 40,  partial: 6.67, full: 10.25 },
      { maxKwp: 100, partial: 5.45, full: 10.25 },
    ],
    sonstige: [{ maxKwp: 100, partial: 6.20, full: 6.20 }],
  },
];

/** Minimum supported commissioning date */
export const MIN_DATE = '2012-01-01';

/** Date from which Volleinspeisung option is available */
export const VOLLEINSPEISUNGAB = '2022-08-01';

/** Date from which Solarspitzengesetz applies (no payment at negative prices) */
export const SOLARSPITZENGESETZ_AB = '2025-02-01';
