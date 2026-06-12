import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CRM_API } from './bookingApi';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

// "Today" in America/Chicago (the CRM's booking timezone) without date-fns.
function todayCT() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Chicago', year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(new Date());
  const get = (type) => Number(parts.find((p) => p.type === type).value);
  return { year: get('year'), month: get('month'), day: get('day') };
}

function padDate(year, month, day) {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

export default function CalendarStep({ onSelect }) {
  const today = todayCT();
  const [viewYear, setViewYear] = useState(today.year);
  const [viewMonth, setViewMonth] = useState(today.month);
  const [availableDates, setAvailableDates] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    setLoading(true);
    const monthStr = `${viewYear}-${String(viewMonth).padStart(2, '0')}`;
    fetch(`${CRM_API}/api/availability?month=${monthStr}`)
      .then((r) => r.json())
      .then((data) => {
        setAvailableDates(new Set(data.availableDates ?? []));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [viewYear, viewMonth]);

  const monthOffset = (viewYear - today.year) * 12 + (viewMonth - today.month);
  const canGoPrev = monthOffset > 0;
  const canGoNext = monthOffset < 2;

  function prevMonth() {
    if (!canGoPrev) return;
    if (viewMonth === 1) { setViewYear((y) => y - 1); setViewMonth(12); }
    else setViewMonth((m) => m - 1);
  }

  function nextMonth() {
    if (!canGoNext) return;
    if (viewMonth === 12) { setViewYear((y) => y + 1); setViewMonth(1); }
    else setViewMonth((m) => m + 1);
  }

  const numDays = new Date(viewYear, viewMonth, 0).getDate();
  const startDow = new Date(viewYear, viewMonth - 1, 1).getDay();
  const cells = [
    ...Array(startDow).fill(null),
    ...Array.from({ length: numDays }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Step 1 of 4</p>
      <h3 className="text-gray-900 text-xl font-semibold mb-6">Pick a date</h3>

      {/* Month nav */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={prevMonth}
          disabled={!canGoPrev}
          className="p-2 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="text-gray-900 font-medium text-sm">
          {MONTHS[viewMonth - 1]} {viewYear}
        </span>
        <button
          type="button"
          onClick={nextMonth}
          disabled={!canGoNext}
          className="p-2 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Day-of-week labels */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS.map((d) => (
          <div key={d} className="text-center text-xs text-gray-400 font-medium py-1">{d}</div>
        ))}
      </div>

      {/* Calendar grid */}
      {loading ? (
        <div className="grid grid-cols-7 gap-1">
          {Array(35).fill(null).map((_, i) => (
            <div key={i} className="h-10 rounded-lg bg-gray-100 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-7 gap-1">
          {cells.map((day, i) => {
            if (day === null) return <div key={`e${i}`} />;

            const dateStr = padDate(viewYear, viewMonth, day);
            const todayStr = padDate(today.year, today.month, today.day);
            const isAvailable = availableDates.has(dateStr) && dateStr > todayStr;
            const isHov = hovered === dateStr;

            return (
              <button
                key={dateStr}
                type="button"
                disabled={!isAvailable}
                onClick={() => isAvailable && onSelect(dateStr)}
                onMouseEnter={() => isAvailable && setHovered(dateStr)}
                onMouseLeave={() => setHovered(null)}
                className={[
                  'h-10 rounded-lg text-sm font-medium transition-all duration-150 flex items-center justify-center',
                  isAvailable
                    ? isHov
                      ? 'bg-primary text-white cursor-pointer'
                      : 'bg-gray-50 text-gray-700 hover:bg-primary/10 hover:text-primary cursor-pointer'
                    : 'text-gray-300 cursor-not-allowed',
                ].join(' ')}
              >
                {day}
              </button>
            );
          })}
        </div>
      )}

      <p className="text-gray-400 text-xs mt-5 text-center">
        Highlighted dates have open slots — weekends and blocked times are grayed out.
      </p>
    </div>
  );
}
