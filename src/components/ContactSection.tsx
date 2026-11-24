import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowUpRight,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  Copy,
  Loader2,
  Mail,
  MessageCircle,
  Phone,
  Send,
} from 'lucide-react';
import { BRAND } from '../data/constants';
import { MagneticButton } from './MagneticButton';
import { triggerConfetti } from '../utils/confetti';

interface ContactSectionProps {
  prefillNote?: string;
  activeTabSignal?: 'brief' | 'call';
  onToast: (title: string, description?: string) => void;
}

const CALL_DAYS = ['Mon, Nov 18', 'Tue, Nov 19', 'Wed, Nov 20', 'Thu, Nov 21'];
const CALL_TIMES = ['10:00 AM GMT', '01:30 PM GMT', '04:00 PM GMT', '06:30 PM GMT'];

export function ContactSection({
  prefillNote = '',
  activeTabSignal,
  onToast,
}: ContactSectionProps) {
  const [mode, setMode] = useState<'brief' | 'call'>('brief');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [budget, setBudget] = useState('$1,500 – $3,000');
  const [projectType, setProjectType] = useState('Full Framer Website');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  // Interactive Calendly-style call scheduler state
  const [selectedDay, setSelectedDay] = useState(CALL_DAYS[0]);
  const [selectedTime, setSelectedTime] = useState(CALL_TIMES[1]);
  const [callEmail, setCallEmail] = useState('');
  const [callBooked, setCallBooked] = useState(false);

  useEffect(() => {
    if (prefillNote) {
      setMessage(prefillNote);
      setSubmitted(false);
    }
  }, [prefillNote]);

  useEffect(() => {
    if (activeTabSignal) {
      setMode(activeTabSignal);
    }
  }, [activeTabSignal]);

  const validateField = (field: 'name' | 'email' | 'message', val: string) => {
    setErrors((prev) => {
      const next = { ...prev };
      if (field === 'name') {
        if (!val.trim()) next.name = 'Please enter your name.';
        else delete next.name;
      }
      if (field === 'email') {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim())) {
          next.email = 'Enter a valid email address.';
        } else {
          delete next.email;
        }
      }
      if (field === 'message') {
        if (val.trim().length < 12) next.message = 'Share at least a short sentence about your project.';
        else delete next.message;
      }
      return next;
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nextErrors: { name?: string; email?: string; message?: string } = {};
    if (!name.trim()) nextErrors.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = 'Enter a valid email address.';
    }
    if (message.trim().length < 12) {
      nextErrors.message = 'Share at least a short sentence about your project.';
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      triggerConfetti();
      onToast('Project brief received', `Thanks ${name}! Zubair will reply within 24 hours.`);
    }, 750);
  };

  const handleBookCall = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(callEmail.trim())) {
      onToast('Valid email required', 'Please enter your email so we can send the calendar invite.');
      return;
    }
    setCallBooked(true);
    triggerConfetti();
    onToast('Discovery call reserved', `${selectedDay} at ${selectedTime} confirmed for ${callEmail}.`);
  };

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(BRAND.email);
    setCopied(true);
    onToast('Email copied', `${BRAND.email} copied to clipboard.`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-20 sm:py-24 scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-3xl mb-10 sm:mb-12">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#3CC4D6]">
            Contact
          </p>
          <h2
            className="mt-2 font-display font-bold text-[#0B1620] dark:text-[#EAF2F7]"
            style={{ fontSize: 'clamp(2rem, 3.8vw, 3.1rem)', textWrap: 'balance' }}
          >
            Have a project in mind? Let&apos;s build something great.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Form or Call Scheduler */}
          <div className="lg:col-span-7 rounded-[28px] border border-[#0B3A5B]/12 dark:border-[#7FE3EE]/15 bg-white dark:bg-[#0D1E2E] p-4 sm:p-8 shadow-sm min-w-0">
            {/* Mode switcher */}
            <div className="grid grid-cols-2 sm:inline-flex w-full sm:w-auto items-center rounded-2xl border border-[#0B3A5B]/12 dark:border-[#7FE3EE]/15 bg-[#F6F9FB] dark:bg-[#07131F] p-1 mb-7">
              <button
                type="button"
                onClick={() => setMode('brief')}
                className={`relative flex items-center justify-center rounded-xl px-2.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  mode === 'brief'
                    ? 'text-white dark:text-[#07131F]'
                    : 'text-[#4B5E6F] dark:text-[#93AABF]'
                }`}
              >
                {mode === 'brief' && (
                  <motion.span
                    layoutId="contact-mode-pill"
                    className="absolute inset-0 rounded-xl bg-[#0B3A5B] dark:bg-[#3CC4D6]"
                  />
                )}
                <span className="relative z-10 inline-flex items-center gap-1.5">
                  <Send className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>Project Brief</span>
                </span>
              </button>

              <button
                type="button"
                onClick={() => setMode('call')}
                className={`relative flex items-center justify-center rounded-xl px-2.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  mode === 'call'
                    ? 'text-white dark:text-[#07131F]'
                    : 'text-[#4B5E6F] dark:text-[#93AABF]'
                }`}
              >
                {mode === 'call' && (
                  <motion.span
                    layoutId="contact-mode-pill"
                    className="absolute inset-0 rounded-xl bg-[#0B3A5B] dark:bg-[#3CC4D6]"
                  />
                )}
                <span className="relative z-10 inline-flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>Book a Call</span>
                </span>
              </button>
            </div>

            {mode === 'brief' ? (
              submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-10 text-center space-y-4"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#3CC4D6]/15 text-[#0B3A5B] dark:text-[#3CC4D6]">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-[#0B1620] dark:text-[#EAF2F7]">
                    Brief received, {name}!
                  </h3>
                  <p className="max-w-md mx-auto text-sm sm:text-base text-[#4B5E6F] dark:text-[#93AABF]">
                    I&apos;ve logged your details for a <strong className="text-[#0B1620] dark:text-white">{projectType}</strong> ({budget}). Expect a personal Loom &amp; reply within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setMessage('');
                    }}
                    className="mt-2 inline-flex items-center justify-center rounded-full border border-[#0B3A5B]/20 dark:border-[#7FE3EE]/25 px-5 py-2.5 text-sm font-semibold text-[#0B1620] dark:text-[#EAF2F7] hover:border-[#3CC4D6] transition-colors cursor-pointer"
                  >
                    Send another inquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Floating label Name */}
                    <div>
                      <div className="relative">
                        <input
                          id="contact-name"
                          type="text"
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                            if (errors.name) validateField('name', e.target.value);
                          }}
                          onBlur={(e) => validateField('name', e.target.value)}
                          placeholder=" "
                          className="peer w-full rounded-2xl border border-[#0B3A5B]/15 dark:border-[#7FE3EE]/20 bg-[#F6F9FB]/60 dark:bg-[#07131F]/60 px-4 pt-6 pb-2.5 text-sm text-[#0B1620] dark:text-[#EAF2F7] focus:border-[#3CC4D6] focus:outline-none"
                        />
                        <label
                          htmlFor="contact-name"
                          className="pointer-events-none absolute left-4 top-2 text-[11px] font-medium text-[#4B5E6F] dark:text-[#93AABF] transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-[#3CC4D6]"
                        >
                          Your Name
                        </label>
                      </div>
                      {errors.name && (
                        <p className="mt-1.5 text-xs text-rose-600 dark:text-rose-400">{errors.name}</p>
                      )}
                    </div>

                    {/* Floating label Email */}
                    <div>
                      <div className="relative">
                        <input
                          id="contact-email"
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (errors.email) validateField('email', e.target.value);
                          }}
                          onBlur={(e) => validateField('email', e.target.value)}
                          placeholder=" "
                          className="peer w-full rounded-2xl border border-[#0B3A5B]/15 dark:border-[#7FE3EE]/20 bg-[#F6F9FB]/60 dark:bg-[#07131F]/60 px-4 pt-6 pb-2.5 text-sm text-[#0B1620] dark:text-[#EAF2F7] focus:border-[#3CC4D6] focus:outline-none"
                        />
                        <label
                          htmlFor="contact-email"
                          className="pointer-events-none absolute left-4 top-2 text-[11px] font-medium text-[#4B5E6F] dark:text-[#93AABF] transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-[#3CC4D6]"
                        >
                          Work Email
                        </label>
                      </div>
                      {errors.email && (
                        <p className="mt-1.5 text-xs text-rose-600 dark:text-rose-400">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="contact-budget"
                        className="block text-xs font-medium text-[#4B5E6F] dark:text-[#93AABF] mb-1.5"
                      >
                        Estimated Budget
                      </label>
                      <select
                        id="contact-budget"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full rounded-2xl border border-[#0B3A5B]/15 dark:border-[#7FE3EE]/20 bg-[#F6F9FB]/60 dark:bg-[#07131F]/60 px-4 py-3 text-sm text-[#0B1620] dark:text-[#EAF2F7] focus:border-[#3CC4D6] focus:outline-none"
                      >
                        <option value="$750 – $1,500">$750 – $1,500</option>
                        <option value="$1,500 – $3,000">$1,500 – $3,000</option>
                        <option value="$3,000+">$3,000+ (Custom Studio)</option>
                        <option value="PKR 200k – 500k">PKR 200k – 500k</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-type"
                        className="block text-xs font-medium text-[#4B5E6F] dark:text-[#93AABF] mb-1.5"
                      >
                        Project Type
                      </label>
                      <select
                        id="contact-type"
                        value={projectType}
                        onChange={(e) => setProjectType(e.target.value)}
                        className="w-full rounded-2xl border border-[#0B3A5B]/15 dark:border-[#7FE3EE]/20 bg-[#F6F9FB]/60 dark:bg-[#07131F]/60 px-4 py-3 text-sm text-[#0B1620] dark:text-[#EAF2F7] focus:border-[#3CC4D6] focus:outline-none"
                      >
                        <option value="Full Framer Website">Full Framer Website</option>
                        <option value="SaaS Landing Page">SaaS Landing Page</option>
                        <option value="Website Redesign / Migration">Website Redesign / Migration</option>
                        <option value="Custom Framer Components">Custom Framer Components</option>
                      </select>
                    </div>
                  </div>

                  {/* Floating label Message */}
                  <div>
                    <div className="relative">
                      <textarea
                        id="contact-message"
                        rows={4}
                        value={message}
                        onChange={(e) => {
                          setMessage(e.target.value);
                          if (errors.message) validateField('message', e.target.value);
                        }}
                        onBlur={(e) => validateField('message', e.target.value)}
                        placeholder=" "
                        className="peer w-full rounded-2xl border border-[#0B3A5B]/15 dark:border-[#7FE3EE]/20 bg-[#F6F9FB]/60 dark:bg-[#07131F]/60 px-4 pt-6 pb-3 text-sm text-[#0B1620] dark:text-[#EAF2F7] focus:border-[#3CC4D6] focus:outline-none resize-none"
                      />
                      <label
                        htmlFor="contact-message"
                        className="pointer-events-none absolute left-4 top-2 text-[11px] font-medium text-[#4B5E6F] dark:text-[#93AABF] transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-[#3CC4D6]"
                      >
                        Tell me about your goals, timeline, and reference links
                      </label>
                    </div>
                    {errors.message && (
                      <p className="mt-1.5 text-xs text-rose-600 dark:text-rose-400">{errors.message}</p>
                    )}
                  </div>

                  <MagneticButton
                    type="submit"
                    disabled={submitting}
                    cursorLabel="Send"
                    className="w-full sm:w-auto rounded-full bg-[#0B3A5B] dark:bg-[#3CC4D6] px-7 py-3.5 text-sm font-semibold text-white dark:text-[#07131F] hover:bg-[#0e4871] dark:hover:bg-[#7FE3EE] transition-colors disabled:opacity-60"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending brief...
                      </>
                    ) : (
                      <>
                        Send Project Brief
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </MagneticButton>
                </form>
              )
            ) : callBooked ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10 text-center space-y-4"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#3CC4D6]/15 text-[#0B3A5B] dark:text-[#3CC4D6]">
                  <Calendar className="w-7 h-7" />
                </div>
                <h3 className="font-display text-2xl font-bold text-[#0B1620] dark:text-[#EAF2F7]">
                  Discovery Call Confirmed
                </h3>
                <p className="text-sm sm:text-base text-[#4B5E6F] dark:text-[#93AABF]">
                  Reserved for <strong className="text-[#0B1620] dark:text-white">{selectedDay}</strong> at{' '}
                  <strong className="text-[#0B1620] dark:text-white">{selectedTime}</strong>. Invite sent to{' '}
                  {callEmail}.
                </p>
                <button
                  type="button"
                  onClick={() => setCallBooked(false)}
                  className="rounded-full border border-[#0B3A5B]/20 dark:border-[#7FE3EE]/25 px-5 py-2.5 text-sm font-semibold text-[#0B1620] dark:text-[#EAF2F7] cursor-pointer"
                >
                  Change time slot
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleBookCall} className="space-y-5">
                <div className="flex items-center justify-between border-b border-[#0B3A5B]/10 dark:border-[#7FE3EE]/12 pb-4">
                  <div>
                    <h3 className="font-display text-lg font-bold text-[#0B1620] dark:text-[#EAF2F7]">
                      30-Min Framer Strategy Call
                    </h3>
                    <p className="text-xs text-[#4B5E6F] dark:text-[#93AABF]">
                      With Zubair Akram · Google Meet link generated on confirmation
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono-num text-[#3CC4D6]">
                    <Clock className="w-3.5 h-3.5" />
                    30 min
                  </span>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#4B5E6F] dark:text-[#93AABF] mb-2.5">
                    Select a Day
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {CALL_DAYS.map((day) => (
                      <button
                        key={day}
                        type="button"
                        onClick={() => setSelectedDay(day)}
                        className={`rounded-xl border px-3 py-2.5 text-xs font-semibold transition-colors cursor-pointer ${
                          selectedDay === day
                            ? 'border-[#3CC4D6] bg-[#0B3A5B] text-white dark:bg-[#3CC4D6] dark:text-[#07131F]'
                            : 'border-[#0B3A5B]/15 dark:border-[#7FE3EE]/15 text-[#0B1620] dark:text-[#EAF2F7] hover:border-[#3CC4D6]'
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#4B5E6F] dark:text-[#93AABF] mb-2.5">
                    Select a Time
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {CALL_TIMES.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`rounded-xl border px-3 py-2.5 text-xs font-mono-num font-semibold transition-colors cursor-pointer ${
                          selectedTime === time
                            ? 'border-[#3CC4D6] bg-[#0B3A5B] text-white dark:bg-[#3CC4D6] dark:text-[#07131F]'
                            : 'border-[#0B3A5B]/15 dark:border-[#7FE3EE]/15 text-[#0B1620] dark:text-[#EAF2F7] hover:border-[#3CC4D6]'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="call-email"
                    className="block text-xs font-medium text-[#4B5E6F] dark:text-[#93AABF] mb-1.5"
                  >
                    Your Email for Calendar Invite
                  </label>
                  <input
                    id="call-email"
                    type="email"
                    required
                    value={callEmail}
                    onChange={(e) => setCallEmail(e.target.value)}
                    placeholder="founder@company.com"
                    className="w-full rounded-2xl border border-[#0B3A5B]/15 dark:border-[#7FE3EE]/20 bg-[#F6F9FB]/60 dark:bg-[#07131F]/60 px-4 py-3 text-sm text-[#0B1620] dark:text-[#EAF2F7] focus:border-[#3CC4D6] focus:outline-none"
                  />
                </div>

                <MagneticButton
                  type="submit"
                  cursorLabel="Reserve"
                  className="w-full sm:w-auto rounded-full bg-[#0B3A5B] dark:bg-[#3CC4D6] px-7 py-3.5 text-sm font-semibold text-white dark:text-[#07131F] hover:bg-[#0e4871] dark:hover:bg-[#7FE3EE] transition-colors"
                >
                  Confirm {selectedDay} · {selectedTime}
                </MagneticButton>
              </form>
            )}
          </div>

          {/* Right: Direct Contact Cards & Socials */}
          <div className="lg:col-span-5 space-y-4">
            {/* Email Card */}
            <div className="rounded-[24px] border border-[#0B3A5B]/12 dark:border-[#7FE3EE]/15 bg-white dark:bg-[#0D1E2E] p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EEF4F8] dark:bg-[#11263A] text-[#0B3A5B] dark:text-[#3CC4D6]">
                    <Mail className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-[#4B5E6F] dark:text-[#93AABF]">Direct Email</p>
                    <a
                      href={`mailto:${BRAND.email}`}
                      className="block truncate font-display text-sm sm:text-base font-bold text-[#0B1620] dark:text-[#EAF2F7] hover:text-[#3CC4D6] transition-colors"
                    >
                      {BRAND.email}
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label="Copy email address"
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#0B3A5B]/15 dark:border-[#7FE3EE]/20 px-3 py-1.5 text-xs font-medium text-[#0B1620] dark:text-[#EAF2F7] hover:border-[#3CC4D6] transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[#3CC4D6]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Direct Phone Card */}
            <a
              href={`tel:${BRAND.phoneTel}`}
              data-cursor="Call"
              className="flex items-center justify-between rounded-[24px] border border-[#0B3A5B]/12 dark:border-[#7FE3EE]/15 bg-white dark:bg-[#0D1E2E] p-5 sm:p-6 hover:border-[#3CC4D6] transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF4F8] dark:bg-[#11263A] text-[#0B3A5B] dark:text-[#3CC4D6]">
                  <Phone className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs text-[#4B5E6F] dark:text-[#93AABF]">Contact Number</p>
                  <p className="font-display text-sm sm:text-base font-bold text-[#0B1620] dark:text-[#EAF2F7] font-mono-num">
                    {BRAND.whatsappDisplay}
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#4B5E6F] group-hover:text-[#3CC4D6] transition-colors" />
            </a>

            {/* WhatsApp Card */}
            <a
              href={`https://wa.me/${BRAND.whatsappNumber}?text=${encodeURIComponent(
                'Hi Zubair, I visited Site Craft Studio and would like to discuss a Framer website project.'
              )}`}
              target="_blank"
              rel="noreferrer"
              data-cursor="Chat"
              className="flex items-center justify-between rounded-[24px] border border-[#0B3A5B]/12 dark:border-[#7FE3EE]/15 bg-white dark:bg-[#0D1E2E] p-5 sm:p-6 hover:border-[#3CC4D6] transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <MessageCircle className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs text-[#4B5E6F] dark:text-[#93AABF]">WhatsApp Quick Chat</p>
                  <p className="font-display text-sm sm:text-base font-bold text-[#0B1620] dark:text-[#EAF2F7] font-mono-num">
                    {BRAND.whatsappDisplay}
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#4B5E6F] group-hover:text-[#3CC4D6] transition-colors" />
            </a>

            {/* Social Links Grid */}
            <div className="rounded-[24px] border border-[#0B3A5B]/12 dark:border-[#7FE3EE]/15 bg-white dark:bg-[#0D1E2E] p-5 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#4B5E6F] dark:text-[#93AABF] mb-4">
                Connect Across Platforms
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {BRAND.socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between gap-2 rounded-xl border border-[#0B3A5B]/10 dark:border-[#7FE3EE]/12 px-3.5 py-2.5 text-sm hover:border-[#3CC4D6] hover:bg-[#F6F9FB] dark:hover:bg-[#11263A]/60 transition-colors min-w-0"
                  >
                    <div className="min-w-0">
                      <p className="font-semibold text-[#0B1620] dark:text-[#EAF2F7]">{social.name}</p>
                      <p className="text-[11px] text-[#4B5E6F] dark:text-[#93AABF] truncate">
                        {social.handle}
                      </p>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 shrink-0 text-[#3CC4D6]" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
