import React, { useState } from 'react';
import { MapPin, Video } from 'lucide-react';
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

const inputClass =
  'w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition';
const labelClass = 'block text-gray-600 text-xs font-medium mb-1.5';
const errorClass = 'text-red-500 text-xs mt-1';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function DetailsForm({ date, slot, format, period, onBack, onSubmit }) {
  const [form, setForm] = useState({
    name: '', businessName: '', email: '', phone: '', businessAddress: '', projectDescription: '',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const update = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const emailOk = EMAIL_RE.test(form.email);
  const isValid =
    form.name.trim() && form.businessName.trim() && emailOk && form.phone.trim() &&
    form.projectDescription.trim() && (format !== 'in-person' || form.businessAddress.trim());

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!form.businessName.trim()) e.businessName = 'Required';
    if (!form.email.trim()) e.email = 'Required';
    else if (!emailOk) e.email = 'Invalid email';
    if (!form.phone.trim()) e.phone = 'Required';
    if (format === 'in-person' && !form.businessAddress.trim()) e.businessAddress = 'Required for in-person meetings';
    if (!form.projectDescription.trim()) e.projectDescription = 'Required';
    return e;
  }

  async function onBook(ev) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch(`${CRM_API}/api/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date,
          startTime: slot.start,
          endTime: slot.end,
          period,
          format,
          name: form.name,
          businessName: form.businessName,
          email: form.email,
          phone: form.phone,
          businessAddress: form.businessAddress || undefined,
          projectDescription: form.projectDescription,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setSubmitError(json.error ?? 'Something went wrong. Please try again.');
        setSubmitting(false);
        return;
      }
      onSubmit({ ...form }, json.confirmationCode, json.meetLink ?? undefined);
    } catch {
      setSubmitError('Network error. Please check your connection and try again.');
      setSubmitting(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Step 4 of 4</p>
      <h3 className="text-gray-900 text-xl font-semibold mb-1">Your details</h3>

      {/* Booking summary */}
      <div className="flex flex-wrap gap-2 mt-3 mb-6">
        <span className="text-xs bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600">
          {formatDateDisplay(date)}
        </span>
        <span className="text-xs bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600">
          {formatTime(slot.start)} – {formatTime(slot.end)}
        </span>
        <span className="flex items-center gap-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600">
          {format === 'in-person'
            ? (<><MapPin size={12} className="text-primary" /> In Person</>)
            : (<><Video size={12} className="text-primary" /> Google Meet</>)}
        </span>
      </div>

      <form onSubmit={onBook} className="space-y-4" noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Full Name *</label>
            <input value={form.name} onChange={update('name')} placeholder="Your name" className={inputClass} />
            {errors.name && <p className={errorClass}>{errors.name}</p>}
          </div>
          <div>
            <label className={labelClass}>Business Name *</label>
            <input value={form.businessName} onChange={update('businessName')} placeholder="Your company" className={inputClass} />
            {errors.businessName && <p className={errorClass}>{errors.businessName}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Email Address *</label>
            <input value={form.email} onChange={update('email')} type="email" placeholder="you@company.com" className={inputClass} />
            {errors.email && <p className={errorClass}>{errors.email}</p>}
          </div>
          <div>
            <label className={labelClass}>Phone Number *</label>
            <input value={form.phone} onChange={update('phone')} type="tel" placeholder="(555) 000-0000" className={inputClass} />
            <p className="text-gray-400 text-xs mt-1">In case we have trouble connecting</p>
            {errors.phone && <p className={errorClass}>{errors.phone}</p>}
          </div>
        </div>

        {/* Business address — only for in-person */}
        {format === 'in-person' && (
          <div>
            <label className={labelClass}>Business Address *</label>
            <input value={form.businessAddress} onChange={update('businessAddress')} placeholder="123 Main St, City, State ZIP" className={inputClass} />
            {errors.businessAddress && <p className={errorClass}>{errors.businessAddress}</p>}
          </div>
        )}

        <div>
          <label className={labelClass}>What are you looking to build? *</label>
          <textarea
            value={form.projectDescription}
            onChange={update('projectDescription')}
            rows={4}
            placeholder="Brief description of what you need — the more detail the better"
            className={`${inputClass} resize-none leading-relaxed`}
          />
          {errors.projectDescription && <p className={errorClass}>{errors.projectDescription}</p>}
        </div>

        {submitError && (
          <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">{submitError}</p>
        )}

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-500 text-sm font-medium hover:text-gray-900 hover:border-gray-300 transition-colors cursor-pointer"
          >
            ← Back
          </button>
          <button
            type="submit"
            disabled={!isValid || submitting}
            className={[
              'flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-150',
              isValid && !submitting
                ? 'bg-primary text-white hover:opacity-90 cursor-pointer'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed',
            ].join(' ')}
          >
            {submitting ? 'Booking…' : 'Book My Call →'}
          </button>
        </div>
      </form>
    </div>
  );
}
