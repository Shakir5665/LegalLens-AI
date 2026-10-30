import React, { useState } from 'react';
import { mockUser } from '../../services/mockData';

export const ProfileSettingsPage: React.FC = () => {
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
    <div className="flex flex-col w-full">
      <div className="px-margin py-space-xl max-w-4xl mx-auto w-full flex flex-col gap-space-xl">
        {/* Header Breadcrumb */}
        <div className="pb-space-md border-b border-outline-variant/30">
          <div className="flex items-center gap-space-xs text-primary font-label-sm uppercase tracking-wider font-semibold">
            <span className="material-symbols-outlined text-[16px]">settings</span>
            <span>User Preferences & Evidence Controls</span>
          </div>
          <h1 className="font-serif text-headline-lg text-on-surface font-semibold">
            Profile & Settings
          </h1>
        </div>

        {saved && (
          <div className="p-space-md rounded bg-surface-container border border-primary/40 text-primary font-body-sm font-semibold flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            <span>Settings and verification preferences successfully updated.</span>
          </div>
        )}

        {/* Profile Card */}
        <form onSubmit={handleSave} className="p-space-xl bg-surface-container-lowest rounded-md border border-outline-variant/30 shadow-[0_1px_3px_rgba(30,58,95,0.04)] flex flex-col gap-space-lg">
          <div className="pb-space-md border-b border-outline-variant/20 flex items-center justify-between">
            <div>
              <h2 className="font-serif text-title-lg text-on-surface font-semibold">User Profile</h2>
              <p className="font-sans text-body-sm text-on-surface-variant">
                Your research identity, academic affiliation, and citation inspection rules.
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-on-primary">
              <span className="material-symbols-outlined text-[24px]">person</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            <div className="flex flex-col gap-1">
              <label className="font-title-sm text-title-sm text-on-surface">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="px-space-md py-space-xs rounded bg-surface border border-outline-variant/50 font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-title-sm text-title-sm text-on-surface">University or Organization</label>
              <input
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                className="px-space-md py-space-xs rounded bg-surface border border-outline-variant/50 font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-title-sm text-title-sm text-on-surface">Primary Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as any)}
                className="px-space-md py-space-xs rounded bg-surface border border-outline-variant/50 font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              >
                <option value="Researcher">Legal Researcher</option>
                <option value="Student">Law Student</option>
                <option value="Lawyer">Lawyer / Legal Practitioner</option>
                <option value="Academic">Academic / Scholar</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-title-sm text-title-sm text-on-surface">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-space-md py-space-xs rounded bg-surface border border-outline-variant/50 font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Discrete Evidence Verification Rules (Replaces subjective confidence probability slider) */}
            <div className="md:col-span-2 pt-space-sm border-t border-outline-variant/20 flex flex-col gap-space-sm">
              <span className="font-title-sm text-title-sm text-on-surface font-semibold">
                Evidence Verification & Human Review Policy
              </span>
              <p className="font-sans text-body-sm text-on-surface-variant">
                Configure explicit rules for flagging unsupported statements and triggering human review (Section 12.4).
              </p>

              <div className="flex flex-col gap-space-xs pt-1">
                <label className="flex items-center gap-space-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={requireHumanReviewOnAmbiguity}
                    onChange={(e) => setRequireHumanReviewOnAmbiguity(e.target.checked)}
                    className="w-4 h-4 rounded text-primary focus:ring-primary border-outline-variant/50"
                  />
                  <span className="font-body-sm text-body-sm text-on-surface">
                    Flag report for human review whenever statutory ambiguity or conflicting precedents are detected
                  </span>
                </label>

                <label className="flex items-center gap-space-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={flagUnverifiedPassages}
                    onChange={(e) => setFlagUnverifiedPassages(e.target.checked)}
                    className="w-4 h-4 rounded text-primary focus:ring-primary border-outline-variant/50"
                  />
                  <span className="font-body-sm text-body-sm text-on-surface">
                    Require exact verbatim passage match before marking a case citation as supported
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-space-md border-t border-outline-variant/20">
            <button
              type="submit"
              className="px-space-xl py-space-sm rounded bg-primary-container text-on-primary font-title-sm text-title-sm font-semibold shadow-[0_1px_3px_rgba(30,58,95,0.12)] hover:bg-primary transition-colors cursor-pointer"
            >
              Save Configuration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
