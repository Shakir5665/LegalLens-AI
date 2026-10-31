import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

export const FinalCTA: React.FC = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div
          className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] blur-[140px] rounded-full opacity-60 ${
            isDark ? 'bg-emerald-500/15' : 'bg-[#10B981]/15'
          }`}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`rounded-3xl p-8 sm:p-12 md:p-16 border text-center max-w-4xl mx-auto relative overflow-hidden shadow-2xl transition-all duration-300 ${
            isDark
              ? 'bg-gradient-to-b from-[#0D1914] via-[#08120D] to-[#060D0A] border-emerald-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.8)]'
              : 'bg-gradient-to-b from-white via-[#F4F8F6] to-[#E8F4EE] border-[rgba(5,150,105,0.25)] shadow-[0_20px_50px_rgba(5,150,105,0.1)]'
          }`}
        >
          {/* Subtle decorative top border */}
          <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#10B981] to-transparent" />

          {/* Eyebrow */}
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-mono font-semibold uppercase tracking-widest border mb-6 ${
              isDark
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
                : 'bg-white border-[rgba(5,150,105,0.2)] text-[#064E3B]'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" />
            <span>COMMENCE RESEARCH</span>
          </div>

          {/* Heading */}
          <h2
            className={`text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-headline mb-6 leading-tight ${
              isDark ? 'text-white' : 'text-[#0F172A]'
            }`}
          >
            Look closer.
            <br />
            <span className="bg-gradient-to-r from-emerald-500 via-teal-400 to-[#10B981] bg-clip-text text-transparent">
              Know your sources.
            </span>
          </h2>

          {/* Description */}
          <p
            className={`text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed ${
              isDark ? 'text-[#9BB8AC]' : 'text-[#475569]'
            }`}
          >
            Bring structure, context, and traceable evidence to your next legal investigation.
            Experience jurisdiction-aware intelligence crafted for legal practitioners.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate('/research/new')}
              className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-[14px] tracking-tight transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-lg ${
                isDark
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-[#041F16] shadow-[0_0_24px_rgba(16,185,129,0.4)] hover:shadow-[0_0_36px_rgba(16,185,129,0.6)]'
                  : 'bg-[#059669] hover:bg-[#047857] text-white shadow-[0_4px_16px_rgba(5,150,105,0.3)] hover:shadow-[0_6px_20px_rgba(5,150,105,0.4)]'
              }`}
            >
              <span>Start Researching</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>

            <button
              onClick={() => navigate('/auth/register')}
              className={`w-full sm:w-auto px-7 py-3.5 rounded-xl font-medium text-[14px] border transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 ${
                isDark
                  ? 'bg-[#0D1914] border-emerald-500/25 text-[#F3FBF7] hover:bg-[#13251E] hover:border-emerald-500/40'
                  : 'bg-white border-[rgba(5,150,105,0.22)] text-[#0F172A] hover:bg-[#E8F4EE] hover:border-[#059669]'
              }`}
            >
              <span>Create Account</span>
            </button>
          </div>

          {/* Micro text */}
          <p
            className={`mt-6 text-xs font-mono ${
              isDark ? 'text-[#7E9F90]' : 'text-[#64748B]'
            }`}
          >
            Initial benchmark jurisdiction: Sri Lankan Labour Law • No credit card required
          </p>
        </div>
      </div>
    </section>
  );
};
