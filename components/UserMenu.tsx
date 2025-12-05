'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';

interface UserMenuProps {
  onShowAuth: () => void;
}

export default function UserMenu({ onShowAuth }: UserMenuProps) {
  const { user, signOut } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    setShowDropdown(false);
  };

  if (!user) {
    return (
      <button
        onClick={onShowAuth}
        className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-500/40 transition-all text-sm"
      >
        Sign In
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-3 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
          {user.email?.[0].toUpperCase()}
        </div>
        <span className="text-slate-300 text-sm hidden md:block max-w-[150px] truncate">
          {user.email}
        </span>
        <svg
          className={`w-4 h-4 text-slate-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {showDropdown && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowDropdown(false)}
          />
          <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-white/10 rounded-xl shadow-xl z-20 overflow-hidden">
            <div className="p-4 border-b border-white/10">
              <p className="text-xs text-slate-500 mb-1">Signed in as</p>
              <p className="text-sm text-slate-200 font-medium truncate">{user.email}</p>
            </div>

            <div className="p-2">
              <button
                onClick={handleSignOut}
                className="w-full px-4 py-2.5 text-left text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-all flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sign Out
              </button>
            </div>

            <div className="p-4 bg-blue-500/10 border-t border-white/10">
              <p className="text-xs text-slate-400">
                ✨ Your progress syncs across all devices
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
