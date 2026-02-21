import dayjs from 'dayjs';
import { EEG_RATES, MIN_DATE, VOLLEINSPEISUNGAB } from '../data/eegRates';

/**
 * Findet den passenden Vergütungszeitraum für ein gegebenes Inbetriebnahmedatum.
 * @param {number} year  - Jahr der Inbetriebnahme
 * @param {number} month - Monat der Inbetriebnahme (1-12)
 * @returns {object|null} - Passendes Rate-Objekt oder null wenn außerhalb des Bereichs
 */
export function findPeriod(year, month) {
  const date = dayjs(`${year}-${String(month).padStart(2, '0')}-01`);
  return (
    EEG_RATES.find((p) => {
      const from = dayjs(p.from);
      const to = dayjs(p.to);
      return !date.isBefore(from) && !date.isAfter(to);
    }) ?? null
  );
}

/**
 * Berechnet den gewichteten Vergütungssatz für eine Anlage.
 * Die Staffelung ist marginal: Jedes kWp-Segment wird mit seinem Tarif gewichtet.
 *
 * Beispiel: 15 kWp Anlage
 *  → 10 kWp × Tarif1 + 5 kWp × Tarif2
 *  → Gewichteter Durchschnitt = (10×T1 + 5×T2) / 15
 *
 * @param {number} kwp         - Installierte Leistung in kWp
 * @param {Array}  tiers       - Tarifstufen aus dem Rate-Objekt
 * @param {'partial'|'full'} feedinType - Einspeiseart
 * @returns {{ weightedRate: number, breakdown: Array, totalKwp: number }}
 */
export function calcWeightedRate(kwp, tiers, feedinType) {
  let remaining = kwp;
  let prevMax = 0;
  const breakdown = [];

  for (const tier of tiers) {
    if (remaining <= 0) break;

    const tierKwp = Math.min(remaining, tier.maxKwp - prevMax);
    if (tierKwp <= 0) {
      prevMax = tier.maxKwp;
      continue;
    }

    const rate = feedinType === 'full' && tier.full !== null ? tier.full : tier.partial;

    breakdown.push({
      fromKwp: prevMax,
      toKwp: prevMax + tierKwp,
      kwp: tierKwp,
      rate,
      revenue: tierKwp * rate, // ct·kWp (für die Gewichtungsberechnung)
    });

    remaining -= tierKwp;
    prevMax = tier.maxKwp;
  }

  const totalRevenueCt = breakdown.reduce((sum, b) => sum + b.revenue, 0);
  const weightedRate = breakdown.length > 0 ? totalRevenueCt / kwp : 0;

  return { weightedRate, breakdown, totalKwp: kwp };
}

/**
 * Berechnet den jährlichen Einnahmen aus der Einspeisung.
 *
 * @param {number} annualKwh   - Jährlich eingespeiste kWh
 * @param {number} kwp         - Installierte Leistung in kWp
 * @param {Array}  tiers       - Tarifstufen
 * @param {'partial'|'full'} feedinType - Einspeiseart
 * @returns {{ annualEur: number, monthlyEur: number, breakdown: Array }}
 */
export function calcRevenue(annualKwh, kwp, tiers, feedinType) {
  // Verteile die eingespeiste Energie proportional auf die kWp-Segmente
  const { breakdown, totalKwp } = calcWeightedRate(kwp, tiers, feedinType);

  const revenueBreakdown = breakdown.map((b) => {
    const segmentKwh = annualKwh * (b.kwp / totalKwp);
    const segmentEur = (segmentKwh * b.rate) / 100;
    return {
      ...b,
      segmentKwh: Math.round(segmentKwh),
      segmentEur,
    };
  });

  const annualEur = revenueBreakdown.reduce((sum, b) => sum + b.segmentEur, 0);

  return {
    annualEur,
    monthlyEur: annualEur / 12,
    breakdown: revenueBreakdown,
  };
}

/**
 * Schätzt die jährlich eingespeiste Strommenge (Überschusseinspeisung).
 * Faustregel: ~950 kWh Gesamtertrag pro kWp in Deutschland,
 * davon ca. 70% eingespeist bei typischem Eigenverbrauch.
 *
 * Bei Volleinspeisung: 100% wird eingespeist → ~950 kWh/kWp.
 *
 * @param {number} kwp        - Installierte Leistung in kWp
 * @param {'partial'|'full'} feedinType
 * @returns {number} Geschätzte kWh/Jahr
 */
export function estimateAnnualKwh(kwp, feedinType) {
  const factor = feedinType === 'full' ? 950 : 665; // 950 × 0,70 ≈ 665
  return Math.round(kwp * factor);
}

/**
 * Gibt das Enddatum des 20-jährigen Förderzeitraums zurück.
 * @param {number} year  - Inbetriebnahmejahr
 * @param {number} month - Inbetriebnahmemonat (1-12)
 * @returns {string} Formatiertes Datum "MM/YYYY"
 */
export function calcEndDate(year, month) {
  return dayjs(`${year}-${String(month).padStart(2, '0')}-01`)
    .add(20, 'year')
    .format('MM/YYYY');
}

/**
 * Prüft, ob für das Inbetriebnahmedatum Volleinspeisung wählbar ist.
 * @param {number} year
 * @param {number} month
 * @returns {boolean}
 */
export function isVolleinspeisungAvailable(year, month) {
  const date = dayjs(`${year}-${String(month).padStart(2, '0')}-01`);
  return !date.isBefore(dayjs(VOLLEINSPEISUNGAB));
}

/**
 * Prüft, ob das Solarspitzengesetz gilt (keine Vergütung bei Negativpreisen).
 * @param {number} year
 * @param {number} month
 * @returns {boolean}
 */
export function isSolarspitzengesetz(year, month) {
  const date = dayjs(`${year}-${String(month).padStart(2, '0')}-01`);
  return !date.isBefore(dayjs('2025-02-01'));
}
