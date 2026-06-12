import React, { useState } from 'react';
import { MapPin, Video } from 'lucide-react';

const formatOptions = [
  { value: 'in-person', label: 'In Person', icon: MapPin, desc: 'We come to you' },
  { value: 'virtual', label: 'Google Meet', icon: Video, desc: 'Video call' },
];

const periodOptions = [
  { value: 'morning', label: 'Morning', sub: '9am – 12pm' },
  { value: 'afternoon', label: 'Afternoon', sub: '1pm – 4pm' },
];

export default function PreferencesStep({ onBack, onNext }) {
  const [format, setFormat] = useState(null);
  const [period, setPeriod] = useState(null);

  const ready = format !== null && period !== null;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-7">
      <div>
        <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Step 2 of 4</p>
        <h3 className="text-gray-900 text-xl font-semibold">How would you like to meet?</h3>
      </div>

      {/* Format */}
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          {formatOptions.map((opt) => {
            const Icon = opt.icon;
            const active = format === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => setFormat(opt.value)}
                className={[
                  'flex flex-col items-center justify-center py-5 px-4 rounded-xl border transition-all duration-150 cursor-pointer',
                  active
                    ? 'border-primary bg-primary/5 text-gray-900'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50',
                ].join(' ')}
              >
                <Icon size={22} className="mb-2 text-primary" />
                <span className="text-sm font-medium">{opt.label}</span>
                <span className={`text-xs mt-0.5 ${active ? 'text-gray-500' : 'text-gray-400'}`}>{opt.desc}</span>
              </button>
            );
          })}
        </div>
        <p className="text-gray-400 text-xs text-center px-2 leading-relaxed">
          We prefer meeting in person whenever possible — there&apos;s nothing better than a real conversation.
        </p>
      </div>

      {/* Period */}
      <div className="space-y-3">
        <p className="text-gray-900 text-sm font-medium">What time works best?</p>
        <div className="grid grid-cols-2 gap-3">
          {periodOptions.map((opt) => {
            const active = period === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => setPeriod(opt.value)}
                className={[
                  'flex flex-col items-center justify-center py-5 px-4 rounded-xl border transition-all duration-150 cursor-pointer',
                  active
                    ? 'border-primary bg-primary/5 text-gray-900'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50',
                ].join(' ')}
              >
                <span className="text-sm font-medium">{opt.label}</span>
                <span className={`text-xs mt-1 ${active ? 'text-gray-500' : 'text-gray-400'}`}>{opt.sub}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Nav */}
      <div className="flex gap-3 pt-1">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-500 text-sm font-medium hover:text-gray-900 hover:border-gray-300 transition-colors cursor-pointer"
        >
          ← Back
        </button>
        <button
          type="button"
          disabled={!ready}
          onClick={() => ready && onNext(format, period)}
          className={[
            'flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-150',
            ready
              ? 'bg-primary text-white hover:opacity-90 cursor-pointer'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed',
          ].join(' ')}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
