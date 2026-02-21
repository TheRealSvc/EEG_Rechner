import dayjs from 'dayjs';

const START_YEAR = 2012;
const currentDate = dayjs();

const MONTHS = [
  'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember',
];

export default function StepCommissionDate({ value, onChange, onNext }) {
  const currentYear = currentDate.year();
  const currentMonth = currentDate.month() + 1;

  const years = Array.from(
    { length: currentYear - START_YEAR + 1 },
    (_, i) => START_YEAR + i,
  );

  const maxMonth = value.year === currentYear ? currentMonth : 12;

  function handleYearChange(e) {
    const year = Number(e.target.value);
    const month = year === currentYear ? Math.min(value.month, currentMonth) : value.month;
    onChange({ year, month });
  }

  function handleMonthChange(e) {
    onChange({ ...value, month: Number(e.target.value) });
  }

  const canProceed = value.year && value.month;

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-1">
        Inbetriebnahmedatum
      </h2>
      <p className="text-gray-500 text-sm mb-6">
        Wann wurde Ihre Photovoltaikanlage in Betrieb genommen?
        Das Datum bestimmt Ihren gesetzlichen Vergütungssatz für 20 Jahre.
      </p>

      <div className="flex gap-4 mb-8">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Monat
          </label>
          <select
            value={value.month ?? ''}
            onChange={handleMonthChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            <option value="">Monat wählen</option>
            {MONTHS.slice(0, maxMonth).map((m, i) => (
              <option key={i + 1} value={i + 1}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Jahr
          </label>
          <select
            value={value.year ?? ''}
            onChange={handleYearChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            <option value="">Jahr wählen</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={onNext}
        disabled={!canProceed}
        className="w-full py-3 px-6 rounded-lg font-semibold text-white transition-colors
          bg-amber-500 hover:bg-amber-600 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
      >
        Weiter
      </button>
    </div>
  );
}
