import { useState } from 'react';
import StepIndicator from './components/StepIndicator';
import StepCommissionDate from './components/StepCommissionDate';
import StepSystemSize from './components/StepSystemSize';
import StepSystemType from './components/StepSystemType';
import StepFeedinType from './components/StepFeedinType';
import ResultCard from './components/ResultCard';
import { findPeriod, isVolleinspeisungAvailable } from './utils/rateCalculator';

const INITIAL_STATE = {
  date: { year: null, month: null },
  kwp: null,
  systemType: null,
  feedinType: null,
};

export default function App() {
  const [step, setStep] = useState(0); // 0–3 (or 0–2 if no Volleinspeisung step)
  const [form, setForm] = useState(INITIAL_STATE);
  const [result, setResult] = useState(null);

  const showFeedinStep = form.date.year && form.date.month
    ? isVolleinspeisungAvailable(form.date.year, form.date.month)
    : false;

  const totalSteps = showFeedinStep ? 4 : 3;

  function handleNext() {
    if (step === 0) {
      setStep(1);
    } else if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      if (showFeedinStep) {
        setStep(3);
      } else {
        // Kein Volleinspeisung-Step: automatisch 'partial' setzen und Ergebnis berechnen
        finalize('partial');
      }
    } else if (step === 3) {
      finalize(form.feedinType);
    }
  }

  function finalize(feedinType) {
    const period = findPeriod(form.date.year, form.date.month);
    if (period) {
      setResult({ period, feedinType });
      setStep('result');
    }
  }

  function handleReset() {
    setForm(INITIAL_STATE);
    setResult(null);
    setStep(0);
  }

  // Wenn Datum geändert wird und Volleinspeisung nicht mehr verfügbar ist,
  // Feedin-Typ zurücksetzen.
  function handleDateChange(newDate) {
    const vollfeed = newDate.year && newDate.month
      ? isVolleinspeisungAvailable(newDate.year, newDate.month)
      : false;
    setForm((f) => ({
      ...f,
      date: newDate,
      feedinType: vollfeed ? f.feedinType : null,
    }));
  }

  const period = result?.period;
  const feedinType = result?.feedinType;

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">
          <span className="text-3xl">☀️</span>
          <div>
            <h1 className="text-lg font-bold text-gray-900 leading-tight">
              EEG-Vergütungsrechner
            </h1>
            <p className="text-xs text-gray-500">
              Einspeisevergütung für Photovoltaikanlagen
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        {step === 'result' ? (
          <ResultCard
            date={form.date}
            kwp={form.kwp}
            systemType={form.systemType}
            feedinType={feedinType}
            period={period}
            onReset={handleReset}
          />
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <StepIndicator current={step} total={totalSteps} />

            {step === 0 && (
              <StepCommissionDate
                value={form.date}
                onChange={handleDateChange}
                onNext={handleNext}
              />
            )}
            {step === 1 && (
              <StepSystemSize
                value={form.kwp}
                onChange={(kwp) => setForm((f) => ({ ...f, kwp }))}
                onNext={handleNext}
                onBack={() => setStep(0)}
              />
            )}
            {step === 2 && (
              <StepSystemType
                value={form.systemType}
                onChange={(t) => setForm((f) => ({ ...f, systemType: t }))}
                onNext={handleNext}
                onBack={() => setStep(1)}
              />
            )}
            {step === 3 && (
              <StepFeedinType
                value={form.feedinType}
                onChange={(t) => setForm((f) => ({ ...f, feedinType: t }))}
                onNext={() => finalize(form.feedinType)}
                onBack={() => setStep(2)}
              />
            )}
          </div>
        )}
      </main>

      <footer className="border-t border-gray-100 mt-4 py-8 px-4">
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row justify-between gap-6 text-xs text-gray-400">
          <p className="flex-1">
            Kein Rechtsanspruch auf Richtigkeit oder Vollständigkeit der Angaben.
            Verbindliche Auskunft erteilt Ihr Netzbetreiber oder die{' '}
            <a
              href="https://www.bundesnetzagentur.de"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Bundesnetzagentur
            </a>
            .
          </p>
          <div className="sm:text-right shrink-0">
            <p className="font-semibold text-gray-500 mb-1">Impressum</p>
            <p>Privates, nicht-kommerzielles Angebot</p>
            <a
              href="mailto:svcoelln@gmail.com"
              className="underline hover:text-gray-600"
            >
              svcoelln@gmail.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
