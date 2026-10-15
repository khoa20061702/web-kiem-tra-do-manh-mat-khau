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

// Mẫu mật khẩu thử nghiệm để người dùng quan sát các trường hợp
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

  // Thanh tiến trình đen trắng đơn sắc (Monochrome Progress Bar)
  const getProgressColor = (score: number) => {
    if (score <= 24) return 'bg-neutral-400 dark:bg-neutral-600';
    if (score <= 49) return 'bg-neutral-500 dark:bg-neutral-500';
    if (score <= 69) return 'bg-neutral-700 dark:bg-neutral-400';
    if (score <= 84) return 'bg-neutral-900 dark:bg-neutral-200';
    return 'bg-black dark:bg-white';
  };

  return (
    <section id="checker" className="py-2 scroll-mt-20">
      <div className="bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-3xl p-5 sm:p-8 shadow-xs transition-colors">
        {/* Header khu vực */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-black dark:bg-white" />
              <h2 className="text-xl sm:text-2xl font-bold text-black dark:text-white tracking-tight">
                Kiểm tra độ mạnh mật khẩu
              </h2>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Nhập mật khẩu để hệ thống phân tích theo 8 tiêu chí an toàn thông tin tiêu chuẩn.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-500 dark:text-neutral-400">Độ dài hiện tại:</span>
            <span className="px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-900 text-xs font-semibold text-neutral-900 dark:text-neutral-100 border border-neutral-200 dark:border-neutral-800">
              <span className="font-mono">{password.length}</span> ký tự
            </span>
          </div>
        </div>

        {/* Ô nhập mật khẩu */}
        <div className="mb-4">
          <label htmlFor={inputId} className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
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
              className={`w-full pl-4 pr-24 py-3.5 sm:py-4 bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-2xl text-black dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 focus:border-black dark:focus:border-white transition-all ${
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
                  className="p-2 rounded-xl text-neutral-400 hover:text-black dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
                  title="Xóa mật khẩu"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                className="p-2 rounded-xl text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
                title={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Thông báo bảo mật bắt buộc ngay bên dưới ô nhập */}
          <div className="mt-2.5 flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400">
            <ShieldCheck className="w-4 h-4 text-black dark:text-white shrink-0" />
            <span>
              Mật khẩu được phân tích ngay trên thiết bị của bạn. Website không gửi hoặc lưu mật khẩu.
            </span>
          </div>
        </div>

        {/* Mẫu thử nhanh (Presets) */}
        <div className="mb-6 pt-1 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-neutral-600 dark:text-neutral-400 flex items-center gap-1 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-black dark:text-white" /> Mẫu thử nhanh:
          </span>
          {SAMPLE_PRESETS.map((preset) => (
            <button
              key={preset.value}
              type="button"
              onClick={() => handleSelectPreset(preset.value)}
              className="px-2.5 py-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white border border-neutral-200 dark:border-neutral-800 transition-all text-xs flex items-center gap-1.5"
            >
              <span className="font-mono font-medium">{preset.label}</span>
              <span className="text-[10px] text-neutral-500 dark:text-neutral-400">({preset.tag})</span>
            </button>
          ))}
        </div>

        {/* Trạng thái ban đầu khi ô nhập trống */}
        {isEmpty ? (
          <div className="border border-dashed border-neutral-300 dark:border-neutral-800 rounded-2xl p-6 sm:p-8 text-center bg-neutral-50/50 dark:bg-neutral-950/40 my-4">
            <div className="w-12 h-12 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center mx-auto text-black dark:text-white mb-3">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="text-base font-semibold text-black dark:text-white mb-1">
              Sẵn sàng phân tích bảo mật
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-lg mx-auto mb-4">
              Hãy nhập mật khẩu bất kỳ hoặc chọn mẫu thử ở trên. Hệ thống sẽ tự động chấm điểm độ phức tạp, tính toán entropy và kiểm tra các điểm yếu dễ bị tấn công.
            </p>
            {onNavigateToGenerator && (
              <button
                type="button"
                onClick={onNavigateToGenerator}
                className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl bg-black hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-black border border-black dark:border-white transition-all shadow-xs"
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
            <div className="p-5 sm:p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center font-bold font-mono text-xl border border-black dark:border-white text-black dark:text-white bg-black/5 dark:bg-white/10 shadow-xs">
                    {analysis.score}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                        Đánh giá độ mạnh:
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold border border-black dark:border-white text-black dark:text-white bg-black/5 dark:bg-white/10">
                        {analysis.levelLabel}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">
                      Đạt <span className="text-black dark:text-white font-semibold">{analysis.passedCount}</span> trên{' '}
                      <span className="text-black dark:text-white font-semibold">{analysis.totalCriteria}</span> tiêu chí bảo mật
                    </p>
                  </div>
                </div>

                {/* Thống kê Entropy & Kích thước bảng ký tự */}
                <div className="flex items-center gap-3 text-xs">
                  <div className="p-2.5 rounded-xl bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800">
                    <span className="text-neutral-500 dark:text-neutral-400 block text-[11px]">Entropy:</span>
                    <span className="font-mono font-semibold text-black dark:text-white text-sm">
                      ~{analysis.entropyBits} bits
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800">
                    <span className="text-neutral-500 dark:text-neutral-400 block text-[11px]">Bảng ký tự:</span>
                    <span className="font-semibold text-black dark:text-white text-sm">
                      <span className="font-mono">{analysis.characterPoolSize}</span> ký tự
                    </span>
                  </div>
                </div>
              </div>

              {/* Thanh tiến trình */}
              <div className="w-full bg-neutral-200 dark:bg-neutral-800 rounded-full h-2.5 overflow-hidden">
                <div
                  className={`h-full rounded-full ${getProgressColor(analysis.score)} transition-all duration-300 ease-out`}
                  style={{ width: `${analysis.score}%` }}
                />
              </div>

              {/* Thang đo nhãn */}
              <div className="grid grid-cols-5 gap-1 text-[10px] text-neutral-500 dark:text-neutral-400 mt-2 text-center font-medium">
                <span className={analysis.score <= 24 ? 'text-black dark:text-white font-bold underline underline-offset-4' : ''}>0–24: Rất yếu</span>
                <span className={analysis.score >= 25 && analysis.score <= 49 ? 'text-black dark:text-white font-bold underline underline-offset-4' : ''}>25–49: Yếu</span>
                <span className={analysis.score >= 50 && analysis.score <= 69 ? 'text-black dark:text-white font-bold underline underline-offset-4' : ''}>50–69: Trung bình</span>
                <span className={analysis.score >= 70 && analysis.score <= 84 ? 'text-black dark:text-white font-bold underline underline-offset-4' : ''}>70–84: Mạnh</span>
                <span className={analysis.score >= 85 ? 'text-black dark:text-white font-bold underline underline-offset-4' : ''}>85–100: Rất mạnh</span>
              </div>
            </div>

            {/* Thời gian ước lượng bẻ khóa (Educational Crack Time) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 flex items-start gap-3">
                <div className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-black dark:text-white shrink-0">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                      Tấn công Offline (Cụm GPU Hashcat)
                    </h4>
                    <span className="text-[10px] text-neutral-500">(10 tỷ hash/s)</span>
                  </div>
                  <div className="text-sm sm:text-base font-bold text-black dark:text-white mt-1">
                    {analysis.estimatedCrackTimeOffline}
                  </div>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 leading-snug">
                    Tốc độ kẻ tấn công đã có file băm mật khẩu và dùng phần cứng chuyên dụng.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 flex items-start gap-3">
                <div className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-black dark:text-white shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                      Tấn công Online (Đoán qua Form)
                    </h4>
                    <span className="text-[10px] text-neutral-500">(Có Rate Limit)</span>
                  </div>
                  <div className="text-sm sm:text-base font-bold text-black dark:text-white mt-1">
                    {analysis.estimatedCrackTimeOnline}
                  </div>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 leading-snug">
                    Tốc độ khi dò mật khẩu trực tiếp qua giao diện web có cơ chế khóa tạm thời.
                  </p>
                </div>
              </div>
            </div>

            {/* Cảnh báo mẫu nếu có */}
            {analysis.detectedPatterns.length > 0 && (
              <div className="p-4 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border-2 border-black dark:border-white flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-black dark:text-white shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-black dark:text-white uppercase tracking-wider">
                    Điểm yếu bảo mật được phát hiện:
                  </h4>
                  <ul className="mt-1 space-y-1 text-xs text-neutral-800 dark:text-neutral-200 list-disc list-inside">
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
                <h3 className="text-sm font-semibold text-black dark:text-white uppercase tracking-wider">
                  Phân tích 8 tiêu chí bảo mật
                </h3>
                <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                  {analysis.passedCount === 8 ? (
                    <span className="text-black dark:text-white font-semibold flex items-center gap-1">
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
                        ? 'bg-neutral-100 dark:bg-neutral-900 border-neutral-400 dark:border-neutral-700 text-black dark:text-white'
                        : 'bg-neutral-50/50 dark:bg-neutral-950/60 border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {item.passed ? (
                        <CheckCircle2 className="w-5 h-5 text-black dark:text-white" />
                      ) : (
                        <XCircle className="w-5 h-5 text-neutral-400 dark:text-neutral-600" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-xs font-semibold ${item.passed ? 'text-black dark:text-white' : 'text-neutral-600 dark:text-neutral-400'}`}>
                          {item.label}
                        </span>
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                            item.passed
                              ? 'bg-black text-white dark:bg-white dark:text-black border border-black dark:border-white'
                              : 'bg-neutral-200 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border border-neutral-300 dark:border-neutral-800'
                          }`}
                        >
                          {item.passed ? 'Đạt' : 'Chưa đạt'}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gợi ý cải thiện */}
            <div className="p-4 sm:p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center gap-2 mb-2 text-black dark:text-white">
                <Sparkles className="w-4 h-4 text-black dark:text-white" />
                <h4 className="text-xs font-bold uppercase tracking-wider">
                  Gợi ý cải thiện từ chuyên gia An toàn thông tin
                </h4>
              </div>
              <ul className="space-y-1.5 text-xs text-neutral-700 dark:text-neutral-300">
                {analysis.suggestions.map((sug, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-black dark:text-white font-bold shrink-0">•</span>
                    <span>{sug}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Lưu ý học thuật quan trọng */}
            <div className="p-4 rounded-xl bg-neutral-100/70 dark:bg-neutral-950/80 border border-neutral-200 dark:border-neutral-800 text-[11px] text-neutral-600 dark:text-neutral-400 flex items-start gap-2.5 leading-relaxed">
              <Info className="w-4 h-4 text-black dark:text-white shrink-0 mt-0.5" />
              <div>
                <strong className="text-black dark:text-white font-semibold">Lưu ý học thuật & Giới hạn phân tích:</strong> Việc đáp ứng toàn bộ các tiêu chí trên không phải là bằng chứng chắc chắn mật khẩu không thể bị tấn công. Mật khẩu vẫn có thể bị chiếm đoạt thông qua tấn công phi kỹ thuật (Phishing), mã độc đánh cắp phím bấm (Keylogger) hoặc các sự cố rò rỉ cơ sở dữ liệu từ nhà cung cấp dịch vụ. Danh sách kiểm tra rò rỉ là danh sách mẫu cục bộ đại diện phục vụ mục đích học tập.
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
