import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

export const LandingNavbar: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navLinks = [
    { label: 'Platform', href: '#platform', id: 'platform' },
    { label: 'Capabilities', href: '#capabilities', id: 'capabilities' },
    { label: 'How It Works', href: '#how-it-works', id: 'how-it-works' },
    { label: 'Technology', href: '#technology', id: 'technology' },
    { label: 'Trust & Verification', href: '#trust', id: 'trust' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? isDark
            ? 'bg-[#060D0A]/90 backdrop-blur-md border-b border-emerald-500/15 shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
            : 'bg-[#F4F8F6]/90 backdrop-blur-md border-b border-[rgba(5,150,105,0.14)] shadow-[0_4px_24px_rgba(5,150,105,0.06)]'
          : isDark
            ? 'bg-transparent border-b border-emerald-500/5'
            : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg">
          <div
            className={`w-9 h-9 rounded-xl p-[1px] transition-transform duration-200 group-hover:scale-105 ${
              isDark
                ? 'bg-gradient-to-br from-emerald-400 to-teal-700 shadow-[0_0_14px_rgba(16,185,129,0.35)]'
                : 'bg-gradient-to-br from-[#059669] to-[#10B981] shadow-[0_2px_10px_rgba(5,150,105,0.25)]'
            }`}
          >
            <div
              className={`w-full h-full rounded-[10px] flex items-center justify-center transition-colors ${
                isDark ? 'bg-[#081510] text-emerald-400' : 'bg-white text-[#059669]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">balance</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span
              className={`font-extrabold text-[17px] tracking-tight font-headline transition-colors ${
                isDark ? 'text-[#F3FBF7]' : 'text-[#0F172A]'
              }`}
            >
              LegalLens AI
            </span>
            <span
              className={`text-[10px] font-mono uppercase tracking-widest font-semibold transition-colors ${
                isDark ? 'text-[#7E9F90]' : 'text-[#52796F]'
              }`}
            >
              Judicial Intelligence
            </span>
          </div>
        </Link>

        {/* Center: Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.id)}
              className={`px-3.5 py-1.5 rounded-lg text-[13px] font-medium transition-all ${
                isDark
                  ? 'text-[#A3C2B6] hover:text-white hover:bg-emerald-500/10'
                  : 'text-[#475569] hover:text-[#0F172A] hover:bg-[#E8F4EE]'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: Actions & Theme Toggle */}
        <div className="hidden md:flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            className={`p-2 rounded-xl border transition-all cursor-pointer flex items-center justify-center ${
              isDark
                ? 'bg-[#0D1914] border-emerald-500/20 text-emerald-400 hover:bg-[#13251E] hover:border-emerald-400/40'
                : 'bg-white border-[rgba(5,150,105,0.2)] text-[#059669] hover:bg-[#E8F4EE]'
            }`}
          >
            <span className="material-symbols-outlined text-[19px]">
              {isDark ? 'light_mode' : 'dark_mode'}
            </span>
          </button>

          {/* Sign In */}
          <Link
            to="/auth/login"
            className={`px-4 py-2 rounded-xl text-[13px] font-medium transition-all ${
              isDark
                ? 'text-[#F3FBF7] hover:text-emerald-300 hover:bg-[#0D1914]'
                : 'text-[#0F172A] hover:text-[#059669] hover:bg-[#E8F4EE]'
            }`}
          >
            Sign In
          </Link>

          {/* Get Started CTA */}
          <button
            onClick={() => navigate('/research/new')}
            className={`px-4.5 py-2 rounded-xl text-[13px] font-semibold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer ${
              isDark
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-[#041F16] font-bold shadow-[0_0_16px_rgba(16,185,129,0.3)] hover:shadow-[0_0_24px_rgba(16,185,129,0.5)] hover:from-emerald-400 hover:to-teal-500'
                : 'bg-[#059669] hover:bg-[#047857] text-white shadow-[0_2px_10px_rgba(5,150,105,0.25)]'
            }`}
          >
            <span>Get Started</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>

        {/* Mobile Hamburger & Theme Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={`p-2 rounded-lg border transition-all ${
              isDark
                ? 'bg-[#0D1914] border-emerald-500/20 text-emerald-400'
                : 'bg-white border-[rgba(5,150,105,0.2)] text-[#059669]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {isDark ? 'light_mode' : 'dark_mode'}
            </span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Open navigation menu"
            className={`p-2 rounded-lg border transition-all ${
              isDark
                ? 'bg-[#0D1914] border-emerald-500/20 text-[#A3C2B6]'
                : 'bg-white border-[rgba(5,150,105,0.2)] text-[#475569]'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden px-4 pt-3 pb-6 border-b transition-colors ${
            isDark
              ? 'bg-[#08120D] border-emerald-500/20 text-white'
              : 'bg-white border-[rgba(5,150,105,0.14)] text-[#0F172A]'
          }`}
        >
          <div className="flex flex-col gap-1.5">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.id)}
                className={`px-3 py-2.5 rounded-lg text-[14px] font-medium transition-all ${
                  isDark
                    ? 'text-[#A3C2B6] hover:bg-emerald-500/10 hover:text-white'
                    : 'text-[#475569] hover:bg-[#E8F4EE] hover:text-[#0F172A]'
                }`}
              >
                {link.label}
              </a>
            ))}
            <div
              className={`h-[1px] my-2 ${
                isDark ? 'bg-emerald-500/15' : 'bg-[rgba(5,150,105,0.12)]'
              }`}
            />
            <div className="flex flex-col gap-2 pt-1">
              <Link
                to="/auth/login"
                onClick={() => setMobileMenuOpen(false)}
                className={`w-full py-2.5 text-center rounded-xl text-[14px] font-medium border ${
                  isDark
                    ? 'border-emerald-500/20 text-white hover:bg-[#13251E]'
                    : 'border-[rgba(5,150,105,0.2)] text-[#0F172A] hover:bg-[#E8F4EE]'
                }`}
              >
                Sign In
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/research/new');
                }}
                className={`w-full py-2.5 text-center rounded-xl text-[14px] font-semibold flex items-center justify-center gap-1.5 ${
                  isDark
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-[#041F16] font-bold shadow-[0_0_16px_rgba(16,185,129,0.3)]'
                    : 'bg-[#059669] text-white shadow-[0_2px_10px_rgba(5,150,105,0.25)]'
                }`}
              >
                <span>Get Started</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
