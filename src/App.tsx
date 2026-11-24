import { useCallback, useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { BRAND } from './data/constants';
import { Loader } from './components/Loader';
import { Navbar } from './components/Navbar';
import { CommandMenu } from './components/CommandMenu';
import { Cursor } from './components/Cursor';
import { Hero } from './components/Hero';
import { SelectedWork } from './components/SelectedWork';
import { ServicesAndWhyFramer } from './components/ServicesAndWhyFramer';
import { ProcessSection } from './components/ProcessSection';
import { AboutSection } from './components/AboutSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { PricingSection } from './components/PricingSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingContactWidget } from './components/FloatingContactWidget';
import { ToastContainer, ToastMessage } from './components/Toast';

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(true);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const [loaderDone, setLoaderDone] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [prefillNote, setPrefillNote] = useState('');
  const [contactTabSignal, setContactTabSignal] = useState<'brief' | 'call' | undefined>(undefined);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 260, damping: 32, restDelta: 0.001 });

  const addToast = useCallback((title: string, description?: string) => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, title, description }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4200);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const applyThemeClass = (nextDark: boolean) => {
    const root = document.documentElement;
    if (nextDark) root.classList.add('dark');
    else root.classList.remove('dark');
    try {
      localStorage.setItem('scs-theme', nextDark ? 'dark' : 'light');
    } catch {
      // ignore storage failure
    }
    setIsDark(nextDark);
  };

  const handleToggleTheme = (e?: React.MouseEvent<HTMLButtonElement>) => {
    const nextDark = !isDark;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const docWithTransition = document as Document & {
      startViewTransition?: (cb: () => void) => { ready: Promise<void> };
    };

    if (!docWithTransition.startViewTransition || prefersReducedMotion) {
      applyThemeClass(nextDark);
      return;
    }

    const x = e ? e.clientX : window.innerWidth / 2;
    const y = e ? e.clientY : 40;
    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = docWithTransition.startViewTransition(() => {
      applyThemeClass(nextDark);
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${maxRadius}px at ${x}px ${y}px)`],
        },
        {
          duration: 520,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
          pseudoElement: '::view-transition-new(root)',
        }
      );
    });
  };

  // Ctrl / Cmd + K shortcut
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const jumpToContact = (tab: 'brief' | 'call', note?: string) => {
    if (note) setPrefillNote(note);
    setContactTabSignal(tab);
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(BRAND.email);
    addToast('Email copied', `${BRAND.email} copied to clipboard.`);
  };

  return (
    <div className="min-h-screen bg-[#F6F9FB] dark:bg-[#07131F] text-[#0B1620] dark:text-[#EAF2F7] transition-colors duration-300">
      {/* Top Scroll Progress Bar */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX, transformOrigin: 'left' }}
        className="fixed top-0 inset-x-0 z-[70] h-[3px] bg-gradient-to-r from-[#0B3A5B] via-[#3CC4D6] to-[#7FE3EE]"
      />

      {!loaderDone && <Loader onComplete={() => setLoaderDone(true)} />}

      <Cursor />

      <Navbar
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
        onOpenCommand={() => setCommandOpen(true)}
        onBookCall={() => jumpToContact('call')}
        onToast={addToast}
      />

      <CommandMenu
        open={commandOpen}
        onClose={() => setCommandOpen(false)}
        isDark={isDark}
        onToggleTheme={() => handleToggleTheme()}
        onBookCall={() => jumpToContact('call')}
        onCopyEmail={handleCopyEmail}
      />

      <main>
        <Hero onBookCall={() => jumpToContact('call')} />
        <SelectedWork
          onStartSimilar={(projectTitle) =>
            jumpToContact(
              'brief',
              `Hi Zubair, I'd like to build a Framer website inspired by your "${projectTitle}" case study.`
            )
          }
        />
        <ServicesAndWhyFramer />
        <ProcessSection />
        <AboutSection onToast={addToast} />
        <TestimonialsSection />
        <PricingSection
          onSelectTier={(tierName, priceText) =>
            jumpToContact(
              'brief',
              `Hi Zubair, I'm interested in the ${tierName} plan (${priceText}). Here are my project goals:`
            )
          }
        />
        <FaqSection />
        <ContactSection
          prefillNote={prefillNote}
          activeTabSignal={contactTabSignal}
          onToast={addToast}
        />
      </main>

      <Footer onToast={addToast} />

      <FloatingContactWidget onCustomerAction={() => jumpToContact('brief')} />

      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
