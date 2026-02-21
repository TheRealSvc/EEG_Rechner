const OPTIONS = [
  {
    value: 'gebaeude',
    label: 'Gebäudeanlage / Lärmschutzwand',
    description:
      'Anlage, die auf, an oder in einem Gebäude installiert ist, oder an einer Lärmschutzwand (§ 48 Abs. 2/2a EEG 2023)',
    icon: '🏠',
  },
  {
    value: 'sonstige',
    label: 'Sonstige Anlage',
    description:
      'Freiflächenanlage oder sonstige nicht gebäudegebundene Anlage (§ 48 Abs. 1 EEG 2023)',
    icon: '🌿',
  },
];

export default function StepSystemType({ value, onChange, onNext, onBack }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-1">
        Anlagentyp
      </h2>
      <p className="text-gray-500 text-sm mb-6">
        Wo ist Ihre Anlage installiert? Dies beeinflusst die Höhe der Vergütung.
      </p>

      <div className="flex flex-col gap-3 mb-8">
        {OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`text-left p-4 rounded-xl border-2 transition-all
              ${value === opt.value
                ? 'border-amber-400 bg-amber-50'
                : 'border-gray-200 hover:border-amber-200 bg-white'
              }`}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl mt-0.5">{opt.icon}</span>
              <div>
                <p className={`font-semibold ${value === opt.value ? 'text-amber-700' : 'text-gray-800'}`}>
                  {opt.label}
                </p>
                <p className="text-sm text-gray-500 mt-0.5">{opt.description}</p>
              </div>
              <div className={`ml-auto mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0
                ${value === opt.value ? 'border-amber-500 bg-amber-500' : 'border-gray-300'}`}
              >
                {value === opt.value && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
            </div>
          </button>
        ))}
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
          disabled={!value}
          className="flex-1 py-3 px-6 rounded-lg font-semibold text-white transition-colors
            bg-amber-500 hover:bg-amber-600 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          Weiter
        </button>
      </div>
    </div>
  );
}
