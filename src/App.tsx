import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { PrivacyBanner } from './components/PrivacyBanner';
import { PasswordChecker } from './components/PasswordChecker';
import { PasswordGenerator } from './components/PasswordGenerator';
import { SecurityKnowledge } from './components/SecurityKnowledge';
import { Footer } from './components/Footer';
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  Cpu,
  Sparkles,
  KeyRound,
  BookOpen
} from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('checker');
  const [checkerPassword, setCheckerPassword] = useState<string>('');
  const [isDark, setIsDark] = useState<boolean>(true);

  // Đồng bộ class "dark" trên thẻ <html> để kích hoạt Tailwind dark mode
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleUsePasswordInChecker = (pwd: string) => {
    setCheckerPassword(pwd);
    scrollToSection('checker');
  };

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors ${isDark ? 'subtle-grid-dark' : 'subtle-grid-light'}`}>
      {/* Thanh điều hướng cố định có chuyển đổi Sáng / Tối */}
      <Navbar
        onNavigate={scrollToSection}
        activeSection={activeSection}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-6 sm:py-8 space-y-6">
        {/* Hero Section – Giản dị, tinh tế, không màu mè */}
        <section id="hero" className="text-center pt-4 pb-2 sm:pt-8 sm:pb-4 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Bài tập môn An toàn thông tin và bảo mật</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-3xl mx-auto leading-tight">
            Mật khẩu của bạn <span className="text-blue-600 dark:text-blue-400">an toàn đến mức nào?</span>
          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
            Kiểm tra độ mạnh mật khẩu – Học cách bảo vệ tài khoản của bạn. Đánh giá tính phức tạp, entropy và phòng ngừa các kỹ thuật tấn công mật mã hiện đại.
          </p>

          {/* 3 cam kết tinh gọn */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>100% Client-side Browser</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <Lock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Không gửi & Không lưu mật khẩu</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <Cpu className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
              <span>Web Crypto API</span>
            </div>
          </div>

          {/* Nút hành động */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => scrollToSection('checker')}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs sm:text-sm shadow-xs flex items-center gap-2 transition-colors"
            >
              <ShieldCheck className="w-4 h-4" />
              Kiểm tra mật khẩu
            </button>
            <button
              onClick={() => scrollToSection('generator')}
              className="px-5 py-2.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium text-xs sm:text-sm border border-slate-200 dark:border-slate-800 flex items-center gap-2 transition-colors shadow-xs"
            >
              <KeyRound className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              Tạo mật khẩu an toàn
            </button>
            <button
              onClick={() => scrollToSection('knowledge')}
              className="px-5 py-2.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium text-xs sm:text-sm border border-slate-200 dark:border-slate-800 flex items-center gap-2 transition-colors shadow-xs"
            >
              <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              Kiến thức an toàn
            </button>
          </div>
        </section>

        {/* Cam kết bảo mật */}
        <PrivacyBanner />

        {/* Khu vực Kiểm tra mật khẩu (Trung tâm) */}
        <PasswordChecker
          initialPassword={checkerPassword}
          onPasswordChange={(pwd) => setCheckerPassword(pwd)}
          onNavigateToGenerator={() => scrollToSection('generator')}
        />

        {/* Khu vực Tạo mật khẩu an toàn */}
        <PasswordGenerator
          onUsePasswordInChecker={handleUsePasswordInChecker}
        />

        {/* Khu vực Kiến thức an toàn thông tin */}
        <SecurityKnowledge />
      </main>

      {/* Chân trang thông tin học thuật */}
      <Footer />
    </div>
  );
}
