import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [organization, setOrganization] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Researcher");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard/new');
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-center items-center px-gutter py-space-xl">
      {/* Brand Header */}
      <Link to="/" className="flex items-center gap-space-sm mb-space-lg group">
        <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center text-on-primary-container shadow-[0_1px_3px_rgba(30,58,95,0.08)]">
          <span className="material-symbols-outlined text-[24px]">balance</span>
        </div>
        <div className="flex flex-col">
          <span className="font-serif text-[22px] font-bold text-primary tracking-tight">LegalLens AI</span>
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">Create User Account</span>
        </div>
      </Link>

      {/* Registration Card */}
      <div className="w-full max-w-lg bg-surface-container-lowest rounded-lg border border-outline-variant/40 p-space-xl shadow-[0_1px_8px_rgba(30,58,95,0.05)]">
        <div className="pb-space-md border-b border-outline-variant/20 mb-space-lg">
          <h1 className="font-serif text-headline-sm text-on-surface font-semibold">Create Your Account</h1>
          <p className="font-sans text-body-sm text-on-surface-variant mt-1">
            Sign up as a law student, legal researcher, lawyer, or academic researcher.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-space-md">
          {/* Full Name */}
          <div className="flex flex-col gap-1.5">
            <label className="font-title-sm text-title-sm text-on-surface">Full Name</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g., A. Perera"
              className="w-full px-space-md py-space-xs rounded bg-surface border border-outline-variant/50 font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* User Role Type */}
          <div className="flex flex-col gap-1.5">
            <label className="font-title-sm text-title-sm text-on-surface">I am a</label>
            <div className="grid grid-cols-2 gap-space-xs">
              {["Law Student", "Legal Researcher", "Lawyer / Practitioner", "Academic / Scholar"].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`py-2 px-space-sm rounded text-body-sm font-medium border text-left transition-colors cursor-pointer ${
                    role === r
                      ? "bg-surface-container text-primary border-primary font-semibold"
                      : "bg-surface border-outline-variant/40 text-on-surface-variant hover:bg-surface-container-low"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Institution / Organization */}
          <div className="flex flex-col gap-1.5">
            <label className="font-title-sm text-title-sm text-on-surface">University or Organization</label>
            <input
              type="text"
              required
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              placeholder="e.g., Faculty of Law, University of Colombo"
              className="w-full px-space-md py-space-xs rounded bg-surface border border-outline-variant/50 font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="font-title-sm text-title-sm text-on-surface">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@institution.lk"
              className="w-full px-space-md py-space-xs rounded bg-surface border border-outline-variant/50 font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full mt-space-sm py-space-sm px-space-md rounded bg-primary-container text-on-primary font-title-sm text-title-sm shadow-[0_1px_3px_rgba(30,58,95,0.12)] hover:bg-primary transition-colors cursor-pointer flex items-center justify-center gap-space-xs"
          >
            <span>Complete Registration</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </form>

        <div className="mt-space-lg pt-space-md border-t border-outline-variant/20 text-center">
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Already have an account?{' '}
            <Link to="/auth/login" className="text-primary font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
