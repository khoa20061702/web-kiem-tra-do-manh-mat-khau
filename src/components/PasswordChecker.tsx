import React, { useState, useId } from 'react';
import {
  Eye,
  EyeOff,
  X,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  Info,
  ShieldAlert,
  Flame,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import {
  analyzePassword,
  PasswordAnalysisResult,
  SecurityCriteria
} from '../utils/passwordAnalysis';

interface PasswordCheckerProps {
  initialPassword?: string;
  onPasswordChange?: (password: string) => void;
  onNavigateToGenerator?: () => void;
}

// Mẫu mật khẩu thử nghiệm để sinh viên dễ dàng quan sát các trường hợp
const SAMPLE_PRESETS = [
  { label: '123456', tag: 'Cực yếu / Bị rò rỉ', value: '123456' },
  { label: 'password123', tag: 'Từ điển + số', value: 'password123' },
  { label: 'nguyenvana1998', tag: 'Tên + năm sinh', value: 'nguyenvana1998' },
  { label: 'K#9x!mP2@wL8$qR', tag: 'Độ phức tạp cao', value: 'K#9x!mP2@wL8$qR' },
  { label: 'ConMeo-NhayQua-CauVong#99', tag: 'Cụm mật khẩu Passphrase', value: 'ConMeo-NhayQua-CauVong#99' },
];

export const PasswordChecker: React.FC<PasswordCheckerProps> = ({
  initialPassword = '',
  onPasswordChange,
  onNavigateToGenerator
}) => {
  const [password, setPassword] = useState<string>(initialPassword);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const inputId = useId();

  React.useEffect(() => {
    if (initialPassword !== undefined && initialPassword !== password) {
      setPassword(initialPassword);
    }
  }, [initialPassword]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPassword(val);
    if (onPasswordChange) {
      onPasswordChange(val);
    }
  };

  const handleClear = () => {
    setPassword('');
    if (onPasswordChange) {
      onPasswordChange('');
    }
  };

  const handleSelectPreset = (presetVal: string) => {
    setPassword(presetVal);
    if (onPasswordChange) {
      onPasswordChange(presetVal);
    }
  };

  // Phân tích mật khẩu phía client
  const analysis: PasswordAnalysisResult = analyzePassword(password);
  const isEmpty = password.length === 0;

  // Lấy màu nền progress bar theo điểm số
  const getProgressColor = (score: number) => {
    if (score <= 24) return 'bg-rose-500';
    if (score <= 49) return 'bg-orange-500';
    if (score <= 69) return 'bg-amber-500';
    if (score <= 84) return 'bg-blue-600';
    return 'bg-emerald-600';
  };

  return (
    <section id="checker" className="py-2 scroll-mt-20">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-8 shadow-sm transition-colors">
        {/* Header khu vực */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-blue-400" />
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                Kiểm tra độ mạnh mật khẩu
              </h2>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Nhập mật khẩu để hệ thống phân tích theo 8 tiêu chí an toàn thông tin tiêu chuẩn.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 dark:text-slate-400">Độ dài hiện tại:</span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
              <span className="font-mono">{password.length}</span> ký tự
            </span>
          </div>
        </div>

        {/* Ô nhập mật khẩu */}
        <div className="mb-4">
          <label htmlFor={inputId} className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
            Mật khẩu cần kiểm tra
          </label>
          <div className="relative group">
            <input
              id={inputId}
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={handleInputChange}
              placeholder="Nhập mật khẩu mẫu để kiểm tra..."
              autoComplete="off"
              spellCheck="false"
              className={`w-full pl-4 pr-24 py-3.5 sm:py-4 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all ${
                password ? 'font-mono' : 'font-sans'
              }`}
            />

            {/* Các nút điều khiển trong ô input */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {password && (
                <button
                  type="button"
                  onClick={handleClear}
                  aria-label="Xóa nội dung mật khẩu"
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                  title="Xóa mật khẩu"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                title={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Thông báo bảo mật bắt buộc ngay bên dưới ô nhập */}
          <div className="mt-2.5 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>
              Mật khẩu được phân tích ngay trên thiết bị của bạn. Website không gửi hoặc lưu mật khẩu.
            </span>
          </div>
        </div>

        {/* Mẫu thử nhanh (Presets) */}
        <div className="mb-6 pt-1 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-blue-500" /> Mẫu thử nhanh:
          </span>
          {SAMPLE_PRESETS.map((preset) => (
            <button
              key={preset.value}
              type="button"
              onClick={() => handleSelectPreset(preset.value)}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 transition-all text-xs flex items-center gap-1.5"
            >
              <span className="font-mono font-medium">{preset.label}</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">({preset.tag})</span>
            </button>
          ))}
        </div>

        {/* Trạng thái ban đầu khi ô nhập trống */}
        {isEmpty ? (
          <div className="border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 text-center bg-slate-50/50 dark:bg-slate-950/40 my-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center mx-auto text-slate-600 dark:text-slate-300 mb-3">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mb-1">
              Sẵn sàng phân tích bảo mật
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto mb-4">
              Hãy nhập mật khẩu bất kỳ hoặc chọn mẫu thử ở trên. Hệ thống sẽ tự động chấm điểm độ phức tạp, tính toán entropy và kiểm tra các điểm yếu dễ bị tấn công.
            </p>
            {onNavigateToGenerator && (
              <button
                type="button"
                onClick={onNavigateToGenerator}
                className="inline-flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 transition-all"
              >
                Chưa có ý tưởng? Tạo mật khẩu an toàn ngẫu nhiên
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        ) : (
          /* Trạng thái có dữ liệu phân tích */
          <div className="space-y-6">
            {/* Thanh đánh giá độ mạnh (Progress Bar & Score) */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3.5">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center font-bold font-mono text-xl border shadow-xs"
                    style={{
                      borderColor: analysis.color,
                      color: analysis.color,
                      backgroundColor: `${analysis.color}15`,
                    }}
                  >
                    {analysis.score}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Đánh giá độ mạnh:
                      </span>
                      <span
                        className="px-2.5 py-0.5 rounded-full text-xs font-bold border"
                        style={{
                          backgroundColor: `${analysis.color}15`,
                          color: analysis.color,
                          borderColor: `${analysis.color}35`,
                        }}
                      >
                        {analysis.levelLabel}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                      Đạt <span className="text-slate-900 dark:text-white font-semibold">{analysis.passedCount}</span> trên{' '}
                      <span className="text-slate-900 dark:text-white font-semibold">{analysis.totalCriteria}</span> tiêu chí bảo mật
                    </p>
                  </div>
                </div>

                {/* Thống kê Entropy & Kích thước bảng ký tự */}
                <div className="flex items-center gap-3 text-xs">
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Entropy:</span>
                    <span className="font-mono font-semibold text-slate-800 dark:text-slate-200 text-sm">
                      ~{analysis.entropyBits} bits
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Bảng ký tự:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200 text-sm">
                      <span className="font-mono">{analysis.characterPoolSize}</span> ký tự
                    </span>
                  </div>
                </div>
              </div>

              {/* Thanh tiến trình */}
              <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
                <div
                  className={`h-full rounded-full ${getProgressColor(analysis.score)} transition-all duration-300 ease-out`}
                  style={{ width: `${analysis.score}%` }}
                />
              </div>

              {/* Thang đo nhãn */}
              <div className="grid grid-cols-5 gap-1 text-[10px] text-slate-500 dark:text-slate-400 mt-2 text-center font-medium">
                <span className={analysis.score <= 24 ? 'text-rose-600 dark:text-rose-400 font-bold' : ''}>0–24: Rất yếu</span>
                <span className={analysis.score >= 25 && analysis.score <= 49 ? 'text-orange-600 dark:text-orange-400 font-bold' : ''}>25–49: Yếu</span>
                <span className={analysis.score >= 50 && analysis.score <= 69 ? 'text-amber-600 dark:text-amber-400 font-bold' : ''}>50–69: Trung bình</span>
                <span className={analysis.score >= 70 && analysis.score <= 84 ? 'text-blue-600 dark:text-blue-400 font-bold' : ''}>70–84: Mạnh</span>
                <span className={analysis.score >= 85 ? 'text-emerald-600 dark:text-emerald-400 font-bold' : ''}>85–100: Rất mạnh</span>
              </div>
            </div>

            {/* Thời gian ước lượng bẻ khóa (Educational Crack Time) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
                <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-amber-600 dark:text-amber-400 shrink-0">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Tấn công Offline (Cụm GPU Hashcat)
                    </h4>
                    <span className="text-[10px] text-slate-400">(10 tỷ hash/s)</span>
                  </div>
                  <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 mt-1">
                    {analysis.estimatedCrackTimeOffline}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                    Tốc độ kẻ tấn công đã có file băm mật khẩu và dùng phần cứng chuyên dụng.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
                <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-blue-600 dark:text-blue-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Tấn công Online (Đoán qua Form)
                    </h4>
                    <span className="text-[10px] text-slate-400">(Có Rate Limit)</span>
                  </div>
                  <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 mt-1">
                    {analysis.estimatedCrackTimeOnline}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                    Tốc độ khi dò mật khẩu trực tiếp qua giao diện web có cơ chế khóa tạm thời.
                  </p>
                </div>
              </div>
            </div>

            {/* Cảnh báo mẫu nếu có */}
            {analysis.detectedPatterns.length > 0 && (
              <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-rose-800 dark:text-rose-300 uppercase tracking-wider">
                    Điểm yếu bảo mật được phát hiện:
                  </h4>
                  <ul className="mt-1 space-y-1 text-xs text-rose-700 dark:text-rose-200/90 list-disc list-inside">
                    {analysis.detectedPatterns.map((pat, idx) => (
                      <li key={idx}>{pat}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Danh sách 8 tiêu chí bảo mật */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                  Phân tích 8 tiêu chí bảo mật
                </h3>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {analysis.passedCount === 8 ? (
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Hoàn hảo 8/8
                    </span>
                  ) : (
                    `Cần cải thiện ${8 - analysis.passedCount} tiêu chí`
                  )}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {analysis.criteria.map((item: SecurityCriteria) => (
                  <div
                    key={item.id}
                    className={`p-3.5 rounded-xl border transition-colors flex items-start gap-3 ${
                      item.passed
                        ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/40 text-slate-900 dark:text-slate-200'
                        : 'bg-slate-50 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {item.passed ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <XCircle className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-xs font-semibold ${item.passed ? 'text-slate-900 dark:text-slate-100' : 'text-slate-600 dark:text-slate-400'}`}>
                          {item.label}
                        </span>
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                            item.passed
                              ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60'
                              : 'bg-slate-200 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-300 dark:border-slate-800'
                          }`}
                        >
                          {item.passed ? 'Đạt' : 'Chưa đạt'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gợi ý cải thiện */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2 mb-2 text-slate-800 dark:text-slate-200">
                <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <h4 className="text-xs font-bold uppercase tracking-wider">
                  Gợi ý cải thiện từ chuyên gia An toàn thông tin
                </h4>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                {analysis.suggestions.map((sug, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-blue-600 dark:text-blue-400 font-bold shrink-0">•</span>
                    <span>{sug}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Lưu ý học thuật quan trọng */}
            <div className="p-4 rounded-xl bg-slate-100/70 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 flex items-start gap-2.5 leading-relaxed">
              <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-800 dark:text-slate-300 font-semibold">Lưu ý học thuật & Giới hạn phân tích:</strong> Việc đáp ứng toàn bộ các tiêu chí trên không phải là bằng chứng chắc chắn mật khẩu không thể bị tấn công. Mật khẩu vẫn có thể bị chiếm đoạt thông qua tấn công phi kỹ thuật (Phishing), mã độc đánh cắp phím bấm (Keylogger) hoặc các sự cố rò rỉ cơ sở dữ liệu từ nhà cung cấp dịch vụ. Danh sách kiểm tra rò rỉ là danh sách mẫu cục bộ đại diện phục vụ mục đích học tập.
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
