import React from 'react';
import { Shield, Lock, GraduationCap } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 py-10 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Cột 1: Thông tin dự án */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5 text-slate-900 dark:text-white font-bold text-base">
              <div className="p-1.5 rounded-lg bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-slate-700">
                <Shield className="w-5 h-5" />
              </div>
              <span>Password Security Checker</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Dự án demo học tập phục vụ bài tập môn <strong>An toàn thông tin và bảo mật</strong> của sinh viên đại học. Nhằm nâng cao nhận thức về an ninh mạng, hiểu rõ cách thức hacker tấn công và cách thiết lập mật khẩu vững chắc.
            </p>
          </div>

          {/* Cột 2: Cam kết học thuật & An ninh */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Bảo mật tuyệt đối
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Toàn bộ quá trình kiểm tra, phân tích độ mạnh và tạo mật khẩu được thực thi hoàn toàn trong môi trường JavaScript của trình duyệt. Ứng dụng không gửi mật khẩu ra ngoài máy chủ, không sử dụng AI đánh giá nội dung mật khẩu và không lưu vết.
            </p>
          </div>

          {/* Cột 3: Tiêu chuẩn an toàn tham khảo */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              Tiêu chuẩn kỹ thuật
            </h4>
            <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5">
              <li>• NIST Special Publication 800-63B (Digital Identity Guidelines)</li>
              <li>• OWASP Password Storage & Complexity Cheat Sheet</li>
              <li>• Web Cryptography API (W3C Recommendation)</li>
              <li>• RFC 6238 (TOTP: Time-Based One-Time Password Algorithm)</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200 dark:border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-500">
          <div>
            © {new Date().getFullYear()} Password Security Checker – Bài tập An toàn thông tin và bảo mật.
          </div>
          <div className="flex items-center gap-3">
            <span>Mục đích giáo dục & nghiên cứu</span>
            <span>•</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">Client-side Only</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
