import React from 'react';
import { Shield, Lock, GraduationCap } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black text-neutral-600 dark:text-neutral-400 py-10 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Cột 1: Thông tin dự án */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5 text-black dark:text-white font-bold text-base">
              <div className="p-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-900 text-black dark:text-white border border-neutral-200 dark:border-neutral-800">
                <Shield className="w-5 h-5" />
              </div>
              <span>Password Security Checker</span>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Dự án demo học tập phục vụ bài tập môn <strong>An toàn thông tin và bảo mật</strong> của sinh viên đại học. Nhằm nâng cao nhận thức về an ninh mạng, hiểu rõ cách thức hacker tấn công và cách thiết lập mật khẩu vững chắc.
            </p>
          </div>

          {/* Cột 2: Cam kết học thuật & An ninh */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-black dark:text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-black dark:text-white" />
              Bảo mật tuyệt đối
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Toàn bộ quá trình kiểm tra, phân tích độ mạnh và tạo mật khẩu được thực thi hoàn toàn trong môi trường JavaScript của trình duyệt. Ứng dụng không gửi mật khẩu ra ngoài máy chủ, không sử dụng AI đánh giá nội dung mật khẩu và không lưu vết.
            </p>
          </div>

          {/* Cột 3: Tiêu chuẩn an toàn tham khảo */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-black dark:text-white flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-black dark:text-white" />
              Tiêu chuẩn kỹ thuật
            </h4>
            <ul className="text-xs text-neutral-600 dark:text-neutral-400 space-y-1.5">
              <li>• NIST Special Publication 800-63B (Digital Identity Guidelines)</li>
              <li>• OWASP Password Storage & Complexity Cheat Sheet</li>
              <li>• Web Cryptography API (W3C Recommendation)</li>
              <li>• RFC 6238 (TOTP: Time-Based One-Time Password Algorithm)</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-neutral-200 dark:border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500 dark:text-neutral-500">
          <div>
            © {new Date().getFullYear()} Password Security Checker – Bài tập An toàn thông tin và bảo mật.
          </div>
          <div className="flex items-center gap-3">
            <span>Mục đích giáo dục & nghiên cứu</span>
            <span>•</span>
            <span className="text-black dark:text-white font-medium">Client-side Only</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
