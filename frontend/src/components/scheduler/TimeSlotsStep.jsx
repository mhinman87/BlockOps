import React, { useState, useEffect } from 'react';
import { CRM_API } from './bookingApi';

function formatDateDisplay(dateStr) {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric',
  });
}

function formatTime(time) {
  const [h, m] = time.split(':').map(Number);
  const suffix = h < 12 ? 'am' : 'pm';
  const hour = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${hour}:${String(m).padStart(2, '0')}${suffix}`;
}

export default function TimeSlotsStep({ date, period, onBack, onSelect }) {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setLoading(true);
    setSlots([]);
    setSelected(null);
    fetch(`${CRM_API}/api/availability?date=${date}&period=${period}`)
      .then((r) => r.json())
      .then((data) => {
        setSlots(data.slots ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [date, period]);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-6">
      <div>
        <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Step 3 of 4</p>
        <h3 className="text-gray-900 text-xl font-semibold">Pick a time</h3>
        <p className="text-gray-500 text-sm mt-1">
          {formatDateDisplay(date)} &middot; <span className="capitalize">{period}</span>
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-3 gap-2">
          {Array(6).fill(null).map((_, i) => (
            <div key={i} className="h-12 rounded-xl bg-gray-100 animate-pulse" />
          ))}
        </div>
      ) : slots.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-gray-600 text-sm">No slots available for this time.</p>
          <p className="text-gray-400 text-xs mt-1">Try a different date or time of day.</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {slots.map((slot) => {
            const isSelected = selected?.start === slot.start;
            return (
              <button
                key={slot.start}
                type="button"
                onClick={() => setSelected(slot)}
                className={[
                  'py-3 rounded-xl text-sm font-medium transition-all duration-150 border cursor-pointer',
                  isSelected
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:text-gray-900',
                ].join(' ')}
              >
                {formatTime(slot.start)}
              </button>
            );
          })}
        </div>
      )}

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
          disabled={!selected}
          onClick={() => selected && onSelect(selected)}
          className={[
            'flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-150',
            selected
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
