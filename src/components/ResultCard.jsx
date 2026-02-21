import { calcWeightedRate, calcEndDate, isSolarspitzengesetz } from '../utils/rateCalculator';
import RevenueCalculator from './RevenueCalculator';

const MONTHS_DE = [
  '', 'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember',
];

export default function ResultCard({ date, kwp, systemType, feedinType, period, onReset }) {
  const tiers = systemType === 'gebaeude' ? period.gebaeude : period.sonstige;
  const { weightedRate, breakdown } = calcWeightedRate(kwp, tiers, feedinType);
  const endDate = calcEndDate(date.year, date.month);
  const solarspitze = isSolarspitzengesetz(date.year, date.month);

  const feedinLabel = feedinType === 'full' ? 'Volleinspeisung' : 'Überschusseinspeisung';
  const systemLabel = systemType === 'gebaeude' ? 'Gebäudeanlage / Lärmschutzwand' : 'Sonstige Anlage';

  return (
    <div>
      {/* Zusammenfassung */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Ihr Vergütungssatz</h2>
          <p className="text-sm text-gray-500">
            Inbetriebnahme: {MONTHS_DE[date.month]} {date.year} · {kwp.toFixed(2).replace('.', ',')} kWp ·{' '}
            {systemLabel} · {feedinLabel}
          </p>
        </div>
        <button
          onClick={onReset}
          className="text-sm text-amber-600 hover:text-amber-700 font-medium"
        >
          Neu berechnen
        </button>
      </div>

      {/* Hauptkarte */}
      <div className="bg-gradient-to-br from-amber-400 to-amber-500 rounded-2xl p-6 text-white mb-4">
        <p className="text-sm font-medium text-amber-100 mb-1">Gewichteter Durchschnittssatz</p>
        <p className="text-5xl font-bold mb-1">
          {weightedRate.toFixed(2).replace('.', ',')}
          <span className="text-2xl font-semibold ml-1">ct/kWh</span>
        </p>
        <p className="text-amber-100 text-sm mt-3">
          Förderzeitraum: {MONTHS_DE[date.month]} {date.year} – {endDate}
        </p>
        <p className="text-amber-100 text-sm">
          Rechtsgrundlage: {period.law}
        </p>
      </div>

      {/* Staffeldetails */}
      {breakdown.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden mb-4 shadow-sm">
          <div className="px-5 py-3 bg-gray-50 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-700">Vergütungsstufen</p>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-400 text-xs uppercase tracking-wide">
                <th className="text-left px-5 py-2">Leistungssegment</th>
                <th className="text-right px-5 py-2">Anteil</th>
                <th className="text-right px-5 py-2">Vergütung</th>
              </tr>
            </thead>
            <tbody>
              {breakdown.map((b, i) => (
                <tr key={i} className="border-t border-gray-100">
                  <td className="px-5 py-3 text-gray-700">
                    {b.fromKwp}–{b.toKwp.toFixed(2).replace('.', ',')} kWp
                  </td>
                  <td className="px-5 py-3 text-right text-gray-700">
                    {b.kwp.toFixed(2).replace('.', ',')} kWp
                  </td>
                  <td className="px-5 py-3 text-right font-semibold text-gray-800">
                    {b.rate.toFixed(2).replace('.', ',')} ct/kWh
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Hinweise */}
      {period.approx && (
        <div className="flex gap-2.5 bg-amber-50 border border-amber-200 rounded-xl p-4 mb-3 text-sm text-amber-800">
          <span className="flex-shrink-0 text-lg">⚠️</span>
          <p>
            <strong>Näherungswert:</strong> Der Vergütungssatz für diesen Zeitraum wurde
            interpoliert. Bitte bestätigen Sie den genauen Satz bei Ihrem Netzbetreiber oder
            unter{' '}
            <a
              href="https://www.bundesnetzagentur.de/DE/Fachthemen/ElektrizitaetundGas/ErneuerbareEnergien/EEG_Foerderung/Archiv_VergSaetze/start.html"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              bundesnetzagentur.de
            </a>
            .
          </p>
        </div>
      )}

      {solarspitze && (
        <div className="flex gap-2.5 bg-blue-50 border border-blue-200 rounded-xl p-4 mb-3 text-sm text-blue-800">
          <span className="flex-shrink-0 text-lg">ℹ️</span>
          <p>
            <strong>Solarspitzengesetz (ab Februar 2025):</strong> Bei negativen
            Börsenstrompreisen entfällt die Vergütung. Die Förderzeit wird um diese
            Stunden verlängert. Für Anlagen ohne intelligentes Messsystem gilt eine
            60 %-Einspeisebegrenzung.
          </p>
        </div>
      )}

      {/* Jahresertrag */}
      <RevenueCalculator kwp={kwp} tiers={tiers} feedinType={feedinType} />

      {/* Footer */}
      <p className="text-xs text-gray-400 mt-6 text-center">
        Alle Angaben ohne Gewähr · Offizielle Quelle:{' '}
        <a
          href="https://www.bundesnetzagentur.de/DE/Fachthemen/ElektrizitaetundGas/ErneuerbareEnergien/EEG_Foerderung/start.html"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Bundesnetzagentur
        </a>
      </p>
    </div>
  );
}
