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
    <div className={`min-h-screen bg-white dark:bg-black text-neutral-900 dark:text-neutral-100 flex flex-col transition-colors ${isDark ? 'subtle-grid-dark' : 'subtle-grid-light'}`}>
      {/* Thanh điều hướng cố định có chuyển đổi Sáng / Tối */}
      <Navbar
        onNavigate={scrollToSection}
        activeSection={activeSection}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-6 sm:py-8 space-y-6">
        {/* Hero Section – Giản dị, tinh tế, 2 màu đen trắng */}
        <section id="hero" className="text-center pt-4 pb-2 sm:pt-8 sm:pb-4 relative">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5 text-black dark:text-white" />
            <span>Bài tập môn An toàn thông tin và bảo mật</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-black dark:text-white max-w-3xl mx-auto leading-tight">
            Mật khẩu của bạn <span className="underline decoration-neutral-400 dark:decoration-neutral-600 underline-offset-8">an toàn đến mức nào?</span>
          </h1>

          <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto font-normal leading-relaxed">
            Kiểm tra độ mạnh mật khẩu – Học cách bảo vệ tài khoản của bạn. Đánh giá tính phức tạp, entropy và phòng ngừa các kỹ thuật tấn công mật mã hiện đại.
          </p>

          {/* 3 cam kết tinh gọn */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs text-neutral-700 dark:text-neutral-300">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-black dark:text-white" />
              <span>100% Client-side Browser</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs">
              <Lock className="w-3.5 h-3.5 text-black dark:text-white" />
              <span>Không gửi & Không lưu mật khẩu</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs">
              <Cpu className="w-3.5 h-3.5 text-black dark:text-white" />
              <span>Web Crypto API</span>
            </div>
          </div>

          {/* Nút hành động */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => scrollToSection('checker')}
              className="px-5 py-2.5 rounded-xl bg-black hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-black font-semibold text-xs sm:text-sm shadow-xs flex items-center gap-2 transition-colors border border-black dark:border-white"
            >
              <ShieldCheck className="w-4 h-4" />
              Kiểm tra mật khẩu
            </button>
            <button
              onClick={() => scrollToSection('generator')}
              className="px-5 py-2.5 rounded-xl bg-white dark:bg-black hover:bg-neutral-100 dark:hover:bg-neutral-900 text-black dark:text-white font-medium text-xs sm:text-sm border border-neutral-300 dark:border-neutral-800 flex items-center gap-2 transition-colors shadow-xs"
            >
              <KeyRound className="w-4 h-4 text-black dark:text-white" />
              Tạo mật khẩu an toàn
            </button>
            <button
              onClick={() => scrollToSection('knowledge')}
              className="px-5 py-2.5 rounded-xl bg-white dark:bg-black hover:bg-neutral-100 dark:hover:bg-neutral-900 text-black dark:text-white font-medium text-xs sm:text-sm border border-neutral-300 dark:border-neutral-800 flex items-center gap-2 transition-colors shadow-xs"
            >
              <BookOpen className="w-4 h-4 text-black dark:text-white" />
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
