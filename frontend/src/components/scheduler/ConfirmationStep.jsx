import React from 'react';
import { MapPin, Video, CheckCircle } from 'lucide-react';

function formatDateDisplay(dateStr) {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
  });
}

function formatTime(time) {
  const [h, m] = time.split(':').map(Number);
  const suffix = h < 12 ? 'am' : 'pm';
  const hour = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${hour}:${String(m).padStart(2, '0')}${suffix}`;
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between items-start gap-4 py-3 border-b border-gray-100 last:border-0">
      <span className="text-gray-400 text-sm shrink-0">{label}</span>
      <span className="text-gray-800 text-sm text-right">{value}</span>
    </div>
  );
}

export default function ConfirmationStep({ confirmation }) {
  const { confirmationCode, date, slot, format, meetLink, businessAddress, name, email } = confirmation;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-6">
      {/* Success header */}
      <div className="flex flex-col items-center pt-2 text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
          <CheckCircle size={30} className="text-primary" />
        </div>
        <h3 className="text-gray-900 text-2xl font-semibold">You&apos;re booked.</h3>
        <p className="text-gray-500 text-sm mt-1">
          A confirmation email is on its way to <span className="text-gray-700">{email}</span>
        </p>
      </div>

      {/* Booking details */}
      <div className="bg-gray-50 rounded-xl border border-gray-100 px-4 py-1">
        <Row label="Confirmation" value={<span className="font-mono text-primary font-medium">{confirmationCode}</span>} />
        <Row label="Date" value={formatDateDisplay(date)} />
        <Row label="Time" value={`${formatTime(slot.start)} – ${formatTime(slot.end)} CT`} />
        <Row
          label="Format"
          value={
            format === 'in-person'
              ? (<span className="flex items-center gap-1.5"><MapPin size={13} className="text-primary" /> In Person</span>)
              : (<span className="flex items-center gap-1.5"><Video size={13} className="text-primary" /> Google Meet</span>)
          }
        />
        {format === 'virtual' && meetLink && (
          <Row
            label="Meet Link"
            value={
              <a href={meetLink} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 break-all">
                {meetLink}
              </a>
            }
          />
        )}
        {format === 'in-person' && businessAddress && (
          <Row label="Address" value={`We'll come to you at ${businessAddress}`} />
        )}
        <Row label="Name" value={name} />
      </div>

      {/* Footer note */}
      <div className="text-center space-y-1 pb-2">
        <p className="text-gray-400 text-xs leading-relaxed">
          30 minutes. No pitch deck. Just a real conversation about what you need built.
        </p>
        <p className="text-gray-400 text-xs">
          Questions? Reach out at{' '}
          <a href="mailto:support@blockops.consulting" className="text-gray-600 hover:text-gray-900 transition-colors">
            support@blockops.consulting
          </a>
        </p>
      </div>
    </div>
  );
}
