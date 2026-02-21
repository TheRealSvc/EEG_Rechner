export default function StepIndicator({ current, total }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {Array.from({ length: total }, (_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors
              ${i < current ? 'bg-amber-500 text-white' : ''}
              ${i === current ? 'bg-amber-400 text-white ring-2 ring-amber-300' : ''}
              ${i > current ? 'bg-gray-200 text-gray-500' : ''}
            `}
          >
            {i < current ? '✓' : i + 1}
          </div>
          {i < total - 1 && (
            <div className={`h-1 w-8 rounded ${i < current ? 'bg-amber-400' : 'bg-gray-200'}`} />
          )}
        </div>
      ))}
    </div>
  );
}
