import React from 'react';
import { ShieldCheck, Lock, KeyRound, BookOpen, CheckCircle2, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigate,
  activeSection,
  isDark,
  onToggleTheme,
}) => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/90 dark:bg-black/90 border-b border-neutral-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div
            onClick={() => onNavigate('hero')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center border border-black dark:border-white group-hover:bg-neutral-800 dark:group-hover:bg-neutral-200 transition-colors">
              <ShieldCheck className="w-5 h-5 text-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base sm:text-lg tracking-tight text-black dark:text-white transition-colors">
                  Password Security Checker
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800">
                  Bài tập ATTT
                </span>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 hidden sm:block">
                Kiểm tra độ mạnh mật khẩu – 100% Client-side
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5">
            <button
              onClick={() => onNavigate('checker')}
              className={`px-3.5 py-1.5 rounded-lg text-sm transition-colors flex items-center gap-1.5 ${
                activeSection === 'checker'
                  ? 'bg-black text-white dark:bg-white dark:text-black font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 font-medium'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-current" />
              Kiểm tra mật khẩu
            </button>

            <button
              onClick={() => onNavigate('generator')}
              className={`px-3.5 py-1.5 rounded-lg text-sm transition-colors flex items-center gap-1.5 ${
                activeSection === 'generator'
                  ? 'bg-black text-white dark:bg-white dark:text-black font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 font-medium'
              }`}
            >
              <KeyRound className="w-4 h-4 text-current" />
              Tạo mật khẩu
            </button>

            <button
              onClick={() => onNavigate('knowledge')}
              className={`px-3.5 py-1.5 rounded-lg text-sm transition-colors flex items-center gap-1.5 ${
                activeSection === 'knowledge'
                  ? 'bg-black text-white dark:bg-white dark:text-black font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 font-medium'
              }`}
            >
              <BookOpen className="w-4 h-4 text-current" />
              Kiến thức bảo mật
            </button>
          </nav>

          {/* Right Controls: Theme Toggle & Privacy Status */}
          <div className="flex items-center gap-2.5">
            {/* Nút chuyển đổi Giao diện Sáng / Tối */}
            <button
              type="button"
              onClick={onToggleTheme}
              className="p-2 rounded-xl border border-neutral-300 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors flex items-center gap-1.5 text-xs font-medium"
              title={isDark ? 'Chuyển sang giao diện Sáng' : 'Chuyển sang giao diện Tối'}
              aria-label={isDark ? 'Chuyển sang giao diện Sáng' : 'Chuyển sang giao diện Tối'}
            >
              {isDark ? (
                <>
                  <Sun className="w-4 h-4 text-white" />
                  <span className="hidden sm:inline">Giao diện Sáng</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-black" />
                  <span className="hidden sm:inline">Giao diện Tối</span>
                </>
              )}
            </button>

            {/* Privacy Trust Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-medium">
              <Lock className="w-3.5 h-3.5 text-black dark:text-white" />
              <span className="hidden xs:inline">100% Cục bộ</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
