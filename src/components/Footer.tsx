import { useState } from 'react';
import { ArrowUp, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { BRAND, NAV_LINKS } from '../data/constants';
import { BrandLogo } from './BrandLogo';
import { triggerConfetti } from '../utils/confetti';

interface FooterProps {
  onToast: (title: string, description?: string) => void;
}

export function Footer({ onToast }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      onToast('Enter a valid email', 'Please check your email address before subscribing.');
      return;
    }
    setSubscribed(true);
    setEmail('');
    onToast('Subscribed to Studio Notes', 'Monthly Framer & conversion teardown insights.');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#0B3A5B]/10 dark:border-[#7FE3EE]/12 bg-white dark:bg-[#07131F] pt-16 pb-8 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#0B3A5B]/10 dark:border-[#7FE3EE]/12">
          {/* Brand & Tagline */}
          <div className="md:col-span-5 space-y-4">
            <button
              type="button"
              onClick={(e) => {
                triggerConfetti(e.clientX, e.clientY);
                scrollToTop();
              }}
              aria-label="Site Craft Studio — scroll to top"
              className="cursor-pointer"
            >
              <BrandLogo />
            </button>
            <p className="max-w-sm text-sm text-[#4B5E6F] dark:text-[#93AABF] leading-relaxed">
              Conversion-focused Framer websites crafted by Zubair Akram for ambitious startups, agencies, and global brands.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              {BRAND.socials.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#0B3A5B] dark:text-[#7FE3EE] hover:text-[#3CC4D6] transition-colors"
                >
                  {s.name}
                  <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#4B5E6F] dark:text-[#93AABF]">
              Navigation
            </p>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm font-medium text-[#0B1620] dark:text-[#EAF2F7] hover:text-[#3CC4D6] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-4 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#4B5E6F] dark:text-[#93AABF]">
              Studio Dispatches
            </p>
            <p className="text-sm text-[#4B5E6F] dark:text-[#93AABF]">
              Occasional Framer motion tips and landing page teardowns. Zero spam.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 rounded-2xl border border-[#3CC4D6]/40 bg-[#3CC4D6]/10 px-4 py-3 text-xs font-semibold text-[#0B3A5B] dark:text-[#7FE3EE]">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>You&apos;re on the list.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                <label htmlFor="footer-newsletter" className="sr-only">
                  Email address
                </label>
                <input
                  id="footer-newsletter"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full min-w-0 rounded-full border border-[#0B3A5B]/15 dark:border-[#7FE3EE]/20 bg-[#F6F9FB] dark:bg-[#0D1E2E] px-4 py-2.5 text-sm text-[#0B1620] dark:text-[#EAF2F7] focus:border-[#3CC4D6] focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded-full bg-[#0B3A5B] dark:bg-[#3CC4D6] px-4 py-2.5 text-xs font-semibold text-white dark:text-[#07131F] hover:bg-[#0e4871] dark:hover:bg-[#7FE3EE] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Copyright + Back to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6 text-xs sm:text-sm text-[#4B5E6F] dark:text-[#93AABF]">
          <p>© 2026 Site Craft Studio. Crafted by Zubair Akram</p>
          <button
            type="button"
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 rounded-full border border-[#0B3A5B]/15 dark:border-[#7FE3EE]/20 px-4 py-2 text-xs font-semibold text-[#0B1620] dark:text-[#EAF2F7] hover:border-[#3CC4D6] transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#3CC4D6] transition-transform duration-300 group-hover:rotate-[360deg]" />
          </button>
        </div>

        {/* Giant Outlined Display Wordmark */}
        <div className="pt-4 text-center select-none">
          <p
            aria-hidden="true"
            className="footer-wordmark font-display font-extrabold uppercase tracking-tight leading-none cursor-default"
            style={{ fontSize: 'clamp(1.95rem, 8.8vw, 7.2rem)' }}
          >
            SITE CRAFT STUDIO
          </p>
        </div>
      </div>
    </footer>
  );
}
