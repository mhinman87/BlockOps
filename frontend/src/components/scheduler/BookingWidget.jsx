import React, { useState } from 'react';
import CalendarStep from './CalendarStep';
import PreferencesStep from './PreferencesStep';
import TimeSlotsStep from './TimeSlotsStep';
import DetailsForm from './DetailsForm';
import ConfirmationStep from './ConfirmationStep';

// Multi-step discovery-call booking flow for the Block Ops contact page.
// Ported from the CRM scheduler; talks to the CRM booking API (see bookingApi.js).
export default function BookingWidget() {
  const [state, setState] = useState({
    step: 1,
    date: null,
    format: null,
    period: null,
    slot: null,
    confirmation: null,
  });

  const patch = (updates) => setState((prev) => ({ ...prev, ...updates }));

  return (
    <div className="flex flex-col items-center">
      {/* Progress dots (steps 1–4) */}
      {state.step < 5 && (
        <div className="flex gap-2 mb-6">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className={`h-1 rounded-full transition-all duration-300 ${
                n <= state.step ? 'w-8 bg-primary' : 'w-4 bg-gray-200'
              }`}
            />
          ))}
        </div>
      )}

      <div className="w-full">
        {state.step === 1 && (
          <CalendarStep onSelect={(date) => patch({ date, step: 2 })} />
        )}

        {state.step === 2 && (
          <PreferencesStep
            onBack={() => patch({ step: 1 })}
            onNext={(format, period) => patch({ format, period, step: 3 })}
          />
        )}

        {state.step === 3 && state.date && state.period && (
          <TimeSlotsStep
            date={state.date}
            period={state.period}
            onBack={() => patch({ step: 2 })}
            onSelect={(slot) => patch({ slot, step: 4 })}
          />
        )}

        {state.step === 4 && state.date && state.slot && state.format && state.period && (
          <DetailsForm
            date={state.date}
            slot={state.slot}
            format={state.format}
            period={state.period}
            onBack={() => patch({ step: 3 })}
            onSubmit={(details, code, meetLink) =>
              patch({
                step: 5,
                confirmation: {
                  confirmationCode: code,
                  date: state.date,
                  slot: state.slot,
                  format: state.format,
                  meetLink,
                  businessAddress: details.businessAddress || undefined,
                  name: details.name,
                  email: details.email,
                },
              })
            }
          />
        )}

        {state.step === 5 && state.confirmation && (
          <ConfirmationStep confirmation={state.confirmation} />
        )}
      </div>
    </div>
  );
}
