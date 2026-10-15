import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, EyeOff, Cpu, ChevronDown, ChevronUp } from 'lucide-react';

export const PrivacyBanner: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm transition-colors">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 shrink-0 mt-0.5 sm:mt-0">
            <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Cam kết quyền riêng tư & An toàn mật mã
              </h3>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60">
                Client-Side Only
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              Mật khẩu được phân tích ngay trên thiết bị của bạn. Website không gửi hoặc lưu mật khẩu.
            </p>
          </div>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="self-end sm:self-center text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700/80 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors"
        >
          {expanded ? 'Thu gọn chi tiết' : 'Xem chi tiết bảo mật'}
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {expanded && (
        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 text-slate-900 dark:text-slate-200 font-semibold mb-1">
              <EyeOff className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Không gửi dữ liệu</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Không có bất kỳ gói tin HTTP/API nào chứa mật khẩu được gửi ra ngoài mạng. Không sử dụng API AI để chấm điểm.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 text-slate-900 dark:text-slate-200 font-semibold mb-1">
              <ShieldAlert className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Không lưu trữ</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Không lưu vào LocalStorage, SessionStorage, Cookie hay IndexedDB. Khi nhấn xóa hoặc tải lại trang, dữ liệu lập tức biến mất.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 text-slate-900 dark:text-slate-200 font-semibold mb-1">
              <Cpu className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Web Crypto API</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Chức năng tạo mật khẩu sử dụng hàm ngẫu nhiên mật mã <code>crypto.getRandomValues()</code>, không dùng Math.random().
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
