import React, { useState } from 'react';
import { mockUser } from '../../services/mockData';
import { useTheme } from '../../context/ThemeContext';

export const ProfileSettingsPage: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const [name, setName] = useState(mockUser.name);
  const [organization, setOrganization] = useState(mockUser.organization);
  const [role, setRole] = useState(mockUser.userType);
  const [email, setEmail] = useState(mockUser.email);
  const [requireHumanReviewOnAmbiguity, setRequireHumanReviewOnAmbiguity] = useState(true);
  const [flagUnverifiedPassages, setFlagUnverifiedPassages] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="flex flex-col w-full pb-16">
      <div className="px-6 md:px-10 py-8 max-w-4xl mx-auto w-full flex flex-col gap-6">
        
        {/* Header Breadcrumb */}
        <div
          className={`pb-6 border-b flex flex-col gap-1 ${
            isDark ? 'border-emerald-500/15' : 'border-[rgba(5,150,105,0.12)]'
          }`}
        >
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-mono text-[11px] uppercase tracking-wider font-semibold">
            <span className="material-symbols-outlined text-[16px]">settings</span>
            <span>User Preferences & Evidence Controls</span>
          </div>
          <h1
            className={`text-[28px] font-extrabold tracking-tight font-headline ${
              isDark ? 'text-white' : 'text-[#0F172A]'
            }`}
          >
            Chambers Preferences
          </h1>
        </div>

        {saved && (
          <div
            className={`p-4 rounded-xl border text-[13px] font-mono font-bold flex items-center gap-2 transition-all ${
              isDark
                ? 'bg-[#13251E] border-emerald-500/40 text-emerald-300'
                : 'bg-[#E8F4EE] border-[#059669]/30 text-[#064E3B]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            <span>Configuration and evidence grounding policies successfully updated.</span>
          </div>
        )}

        {/* Profile Card */}
        <form
          onSubmit={handleSave}
          className={`p-6 md:p-8 rounded-2xl border flex flex-col gap-6 transition-all ${
            isDark
              ? 'bg-[#0D1914] border-emerald-500/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
              : 'bg-white border-[rgba(5,150,105,0.15)] shadow-[0_4px_25px_rgba(15,23,42,0.04)]'
          }`}
        >
          <div className="pb-5 border-b border-inherit flex items-center justify-between">
            <div>
              <h2 className="text-[18px] font-bold font-headline">Research Identity</h2>
              <p className={`text-[13px] ${isDark ? 'text-[#94A79E]' : 'text-[#52796F]'}`}>
                Your credentials, institutional affiliation, and citation inspection rules.
              </p>
            </div>
            
            <div
              className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-[16px] ${
                isDark
                  ? 'bg-gradient-to-br from-emerald-400 to-teal-700 text-[#041F16]'
                  : 'bg-[#059669] text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">person</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-mono uppercase tracking-wider font-bold text-[#52796F] dark:text-[#A3C2B6]">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-xl text-[13px] transition-all focus:outline-none focus:ring-1 border ${
                  isDark
                    ? 'bg-[#060D0A] border-emerald-500/20 text-white focus:border-emerald-400 focus:ring-emerald-400/30'
                    : 'bg-[#F4F8F6] border border-[rgba(5,150,105,0.15)] text-[#0F172A] focus:border-[#059669] focus:ring-[#059669]/20'
                }`}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-mono uppercase tracking-wider font-bold text-[#52796F] dark:text-[#A3C2B6]">
                University or Organization
              </label>
              <input
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-xl text-[13px] transition-all focus:outline-none focus:ring-1 border ${
                  isDark
                    ? 'bg-[#060D0A] border-emerald-500/20 text-white focus:border-emerald-400 focus:ring-emerald-400/30'
                    : 'bg-[#F4F8F6] border border-[rgba(5,150,105,0.15)] text-[#0F172A] focus:border-[#059669] focus:ring-[#059669]/20'
                }`}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-mono uppercase tracking-wider font-bold text-[#52796F] dark:text-[#A3C2B6]">
                Primary Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as any)}
                className={`w-full px-4 py-2.5 rounded-xl text-[13px] transition-all focus:outline-none focus:ring-1 border ${
                  isDark
                    ? 'bg-[#060D0A] border-emerald-500/20 text-white focus:border-emerald-400 focus:ring-emerald-400/30'
                    : 'bg-[#F4F8F6] border border-[rgba(5,150,105,0.15)] text-[#0F172A] focus:border-[#059669] focus:ring-[#059669]/20'
                }`}
              >
                <option value="Researcher">Legal Researcher</option>
                <option value="Student">Law Student</option>
                <option value="Lawyer">Lawyer / Legal Practitioner</option>
                <option value="Academic">Academic / Scholar</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-mono uppercase tracking-wider font-bold text-[#52796F] dark:text-[#A3C2B6]">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-xl text-[13px] transition-all focus:outline-none focus:ring-1 border ${
                  isDark
                    ? 'bg-[#060D0A] border-emerald-500/20 text-white focus:border-emerald-400 focus:ring-emerald-400/30'
                    : 'bg-[#F4F8F6] border border-[rgba(5,150,105,0.15)] text-[#0F172A] focus:border-[#059669] focus:ring-[#059669]/20'
                }`}
              />
            </div>

            {/* Color Appearance Control */}
            <div className="md:col-span-2 pt-4 border-t border-inherit flex items-center justify-between">
              <div>
                <span className="text-[14px] font-bold font-headline block">Display Appearance</span>
                <span className={`text-[12px] ${isDark ? 'text-[#94A79E]' : 'text-[#52796F]'}`}>
                  Toggle between the Modern Emerald Light Theme and Obsidian Dark Theme.
                </span>
              </div>

              <button
                type="button"
                onClick={toggleTheme}
                className={`px-4 py-2 rounded-xl text-[13px] font-mono font-bold border transition-all cursor-pointer flex items-center gap-2 ${
                  isDark
                    ? 'bg-[#13251E] border-emerald-500/30 text-emerald-300'
                    : 'bg-[#E8F4EE] border-[#059669]/25 text-[#059669]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {isDark ? 'light_mode' : 'dark_mode'}
                </span>
                <span>{isDark ? 'Switch to Light' : 'Switch to Dark'}</span>
              </button>
            </div>

            {/* Evidence Verification Policies */}
            <div className="md:col-span-2 pt-4 border-t border-inherit flex flex-col gap-3">
              <span className="text-[14px] font-bold font-headline">
                Evidence Verification & Grounding Policy
              </span>
              <p className={`text-[13px] ${isDark ? 'text-[#94A79E]' : 'text-[#52796F]'}`}>
                Configure deterministic rules for flagging unsupported assertions and requiring verbatim passage alignment (Section 12.4).
              </p>

              <div className="flex flex-col gap-2 pt-1">
                <label className="flex items-center gap-3 cursor-pointer text-[13px]">
                  <input
                    type="checkbox"
                    checked={requireHumanReviewOnAmbiguity}
                    onChange={(e) => setRequireHumanReviewOnAmbiguity(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-gray-300 dark:border-emerald-500/30"
                  />
                  <span>
                    Flag report for human review whenever statutory ambiguity or conflicting precedents are detected
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer text-[13px]">
                  <input
                    type="checkbox"
                    checked={flagUnverifiedPassages}
                    onChange={(e) => setFlagUnverifiedPassages(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-gray-300 dark:border-emerald-500/30"
                  />
                  <span>
                    Require exact verbatim passage match before marking a case citation as supported
                  </span>
                </label>
              </div>
            </div>

          </div>

          <div className="flex justify-end pt-4 border-t border-inherit">
            <button
              type="submit"
              className={`px-6 py-2.5 rounded-xl font-bold text-[13px] transition-all cursor-pointer ${
                isDark
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-[#041F16] shadow-[0_0_18px_rgba(16,185,129,0.35)]'
                  : 'bg-[#059669] hover:bg-[#047857] text-white shadow-[0_2px_12px_rgba(5,150,105,0.25)]'
              }`}
            >
              Save Configuration
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
