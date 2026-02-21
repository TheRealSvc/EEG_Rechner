import { useState } from 'react';

export default function StepSystemSize({ value, onChange, onNext, onBack }) {
  const [raw, setRaw] = useState(value ? String(value).replace('.', ',') : '');
  const [error, setError] = useState('');

  function handleChange(e) {
    const input = e.target.value.replace(',', '.');
    setRaw(e.target.value);
    const num = parseFloat(input);
    if (isNaN(num) || num <= 0) {
      setError('Bitte eine gültige Leistung eingeben.');
      onChange(null);
    } else if (num > 100) {
      setError(
        'Anlagen über 100 kWp fallen unter das Ausschreibungsverfahren und sind hier nicht abgebildet.',
      );
      onChange(null);
    } else {
      setError('');
      onChange(num);
    }
  }

  const canProceed = value && value > 0 && value <= 100;

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-1">
        Anlagenleistung
      </h2>
      <p className="text-gray-500 text-sm mb-6">
        Wie groß ist Ihre Anlage in Kilowatt-Peak (kWp)?
        Die Leistung bestimmt, welche Vergütungsstufen gelten.
      </p>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Installierte Leistung (kWp)
        </label>
        <div className="relative">
          <input
            type="text"
            inputMode="decimal"
            value={raw}
            onChange={handleChange}
            placeholder="z. B. 9,8"
            className={`w-full border rounded-lg px-3 py-2.5 pr-14 text-gray-800 focus:outline-none focus:ring-2
              ${error ? 'border-red-400 focus:ring-red-300' : 'border-gray-300 focus:ring-amber-400'}`}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
            kWp
          </span>
        </div>
        {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
        {!error && value && value <= 0.8 && (
          <p className="mt-1.5 text-sm text-amber-600">
            Hinweis: Bei Balkonkraftwerken (Steckersolargeräten) bis 0,8 kWp
            gelten vereinfachte Regelungen — die Vergütung kann sich unterscheiden.
          </p>
        )}
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-8 text-sm text-amber-800">
        <p className="font-medium mb-1">Staffelungsprinzip</p>
        <p>
          Die Vergütung wird stufenweise berechnet: Die ersten 10 kWp erhalten
          den höchsten Satz, Leistung zwischen 10 und 40 kWp den zweiten Satz usw.
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-3 px-6 rounded-lg font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          Zurück
        </button>
        <button
          onClick={onNext}
          disabled={!canProceed}
          className="flex-1 py-3 px-6 rounded-lg font-semibold text-white transition-colors
            bg-amber-500 hover:bg-amber-600 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          Weiter
        </button>
      </div>
    </div>
  );
}
