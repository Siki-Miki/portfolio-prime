import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const currentLang = i18n.language;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeLang = (lang: string) => {
    i18n.changeLanguage(lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  const navLinks = [
    { key: 'about', href: '#about' },
    { key: 'projects', href: '#projects' },
    { key: 'contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-black/5'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full section-padding">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a
            href="#"
            className="text-xl lg:text-2xl font-bold tracking-tight text-foreground hover:text-[#1D4ED8] transition-colors"
          >
            &lt;Dev/&gt;
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.key}
                onClick={() => handleNavClick(link.href)}
                className="text-sm font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                {t(`nav.${link.key}`)}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#1D4ED8] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="hidden sm:flex items-center gap-1 bg-secondary/50 rounded-full p-1">
              {(['en', 'ar', 'ru', 'jp'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => changeLang(lang)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-full transition-all ${
                    currentLang === lang
                      ? 'bg-[#1D4ED8] text-white'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {t(`lang.${lang}`)}
                </button>
              ))}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-secondary/50 text-foreground hover:bg-secondary transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-full bg-secondary/50 text-foreground hover:bg-secondary transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="section-padding pb-6 bg-background/95 backdrop-blur-xl border-b border-border/50">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.key}
                onClick={() => handleNavClick(link.href)}
                className="text-sm font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors text-left"
              >
                {t(`nav.${link.key}`)}
              </button>
            ))}
            {/* Mobile Language */}
            <div className="flex items-center gap-2 mt-2">
              {(['en', 'ar', 'ru', 'jp'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => changeLang(lang)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all ${
                    currentLang === lang
                      ? 'bg-[#1D4ED8] text-white'
                      : 'bg-secondary text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {t(`lang.${lang}`)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
