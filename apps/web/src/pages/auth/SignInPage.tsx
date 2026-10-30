import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("researcher@legallens.local");
  const [password, setPassword] = useState("••••••••••••");
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
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
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">Legal Research Platform</span>
        </div>
      </Link>

      {/* Main Authentication Card */}
      <div className="w-full max-w-md bg-surface-container-lowest rounded-lg border border-outline-variant/40 p-space-xl shadow-[0_1px_8px_rgba(30,58,95,0.05)]">
        <div className="pb-space-md border-b border-outline-variant/20 mb-space-lg">
          <h1 className="font-serif text-headline-sm text-on-surface font-semibold">User Sign In</h1>
          <p className="font-sans text-body-sm text-on-surface-variant mt-1">
            Sign in to access your saved research projects, documents, and reports.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-space-md">
          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="font-title-sm text-title-sm text-on-surface">Email Address</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">
                mail
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-space-md py-space-xs rounded bg-surface border border-outline-variant/50 font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                placeholder="name@organization.lk"
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="font-title-sm text-title-sm text-on-surface">Password</label>
              <a href="#" className="font-label-sm text-label-sm text-primary hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">
                lock
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-space-md py-space-xs rounded bg-surface border border-outline-variant/50 font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>
          </div>

          {/* Remember Checkbox */}
          <div className="flex items-center gap-space-xs pt-1">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded text-primary focus:ring-primary border-outline-variant/50"
            />
            <label htmlFor="remember" className="font-body-sm text-body-sm text-on-surface-variant cursor-pointer">
              Remember me on this browser
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full mt-space-sm py-space-sm px-space-md rounded bg-primary-container text-on-primary font-title-sm text-title-sm shadow-[0_1px_3px_rgba(30,58,95,0.12)] hover:bg-primary transition-colors cursor-pointer flex items-center justify-center gap-space-xs"
          >
            <span>Sign In to Platform</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </form>

        <div className="mt-space-lg pt-space-md border-t border-outline-variant/20 text-center">
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            New user?{' '}
            <Link to="/auth/register" className="text-primary font-semibold hover:underline">
              Create an Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
