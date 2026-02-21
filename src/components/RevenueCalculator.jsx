import { useState } from 'react';
import { calcRevenue, estimateAnnualKwh } from '../utils/rateCalculator';

function fmt(num) {
  return num.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function RevenueCalculator({ kwp, tiers, feedinType }) {
  const [kwh, setKwh] = useState('');
  const [result, setResult] = useState(null);

  function handleEstimate() {
    const estimated = estimateAnnualKwh(kwp, feedinType);
    setKwh(String(estimated));
    compute(estimated);
  }

  function handleChange(e) {
    const val = e.target.value.replace(',', '.');
    setKwh(e.target.value);
    const num = parseFloat(val);
    if (!isNaN(num) && num > 0) {
      compute(num);
    } else {
      setResult(null);
    }
  }

  function compute(kwhVal) {
    setResult(calcRevenue(kwhVal, kwp, tiers, feedinType));
  }

  return (
    <div className="mt-8 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-1">
        Jahresertrag berechnen
      </h3>
      <p className="text-sm text-gray-500 mb-5">
        Geben Sie Ihre jährlich eingespeiste Strommenge ein oder lassen Sie
        einen Schätzwert berechnen.
      </p>

      <div className="flex gap-3 mb-4">
        <div className="flex-1 relative">
          <input
            type="text"
            inputMode="decimal"
            value={kwh}
            onChange={handleChange}
            placeholder="z. B. 5.000"
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 pr-16 text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
            kWh/Jahr
          </span>
        </div>
        <button
          onClick={handleEstimate}
          className="px-4 py-2.5 rounded-lg text-sm font-medium text-amber-700 bg-amber-100 hover:bg-amber-200 transition-colors whitespace-nowrap"
        >
          Schätzen
        </button>
      </div>

      {result && (
        <div className="mt-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-amber-50 rounded-xl p-4 text-center">
              <p className="text-xs text-amber-700 font-medium uppercase tracking-wide mb-1">
                Jahreseinnahmen
              </p>
              <p className="text-3xl font-bold text-amber-600">
                {fmt(result.annualEur)} €
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">
                Monatlich
              </p>
              <p className="text-3xl font-bold text-gray-700">
                {fmt(result.monthlyEur)} €
              </p>
            </div>
          </div>

          {result.breakdown.length > 1 && (
            <div className="border border-gray-100 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
                    <th className="text-left px-4 py-2">Leistungssegment</th>
                    <th className="text-right px-4 py-2">Eingespeist</th>
                    <th className="text-right px-4 py-2">Satz</th>
                    <th className="text-right px-4 py-2">Einnahmen</th>
                  </tr>
                </thead>
                <tbody>
                  {result.breakdown.map((b, i) => (
                    <tr key={i} className="border-t border-gray-100">
                      <td className="px-4 py-2 text-gray-700">
                        {b.fromKwp}–{b.toKwp} kWp
                      </td>
                      <td className="px-4 py-2 text-right text-gray-700">
                        {b.segmentKwh.toLocaleString('de-DE')} kWh
                      </td>
                      <td className="px-4 py-2 text-right text-gray-700">
                        {b.rate.toFixed(2).replace('.', ',')} ct/kWh
                      </td>
                      <td className="px-4 py-2 text-right font-medium text-gray-800">
                        {fmt(b.segmentEur)} €
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
