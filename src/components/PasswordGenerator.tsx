import React, { useState, useEffect, useId } from 'react';
import {
  KeyRound,
  Copy,
  Check,
  RefreshCw,
  Sliders,
  AlertCircle,
  ArrowUpRight,
  Sparkles,
  BookOpen
} from 'lucide-react';
import {
  generateSecurePassword,
  generatePassphrase,
  analyzePassword,
  GeneratorOptions
} from '../utils/passwordAnalysis';

interface PasswordGeneratorProps {
  onUsePasswordInChecker: (password: string) => void;
}

export const PasswordGenerator: React.FC<PasswordGeneratorProps> = ({
  onUsePasswordInChecker,
}) => {
  const [mode, setMode] = useState<'random' | 'passphrase'>('random');
  const [length, setLength] = useState<number>(16);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [excludeSimilar, setExcludeSimilar] = useState<boolean>(false);
  const [passphraseWords, setPassphraseWords] = useState<number>(4);

  const [generatedPassword, setGeneratedPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [copyFeedback, setCopyFeedback] = useState<string>('');
  const lengthInputId = useId();
  const wordCountInputId = useId();

  // Tạo mật khẩu mới
  const handleGenerate = () => {
    setError(null);
    if (mode === 'random') {
      const options: GeneratorOptions = {
        length,
        includeUppercase,
        includeLowercase,
        includeNumbers,
        includeSymbols,
        excludeSimilar,
      };

      const res = generateSecurePassword(options);
      if (res.error) {
        setError(res.error);
        setGeneratedPassword('');
      } else if (res.password) {
        setGeneratedPassword(res.password);
      }
    } else {
      const res = generatePassphrase(passphraseWords);
      if (res.error) {
        setError(res.error);
        setGeneratedPassword('');
      } else if (res.passphrase) {
        setGeneratedPassword(res.passphrase);
      }
    }
  };

  useEffect(() => {
    handleGenerate();
  }, [mode, length, includeUppercase, includeLowercase, includeNumbers, includeSymbols, excludeSimilar, passphraseWords]);

  const handleCopy = async () => {
    if (!generatedPassword) return;

    let success = false;
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(generatedPassword);
        success = true;
      } catch (err) {
        success = false;
      }
    }

    if (!success) {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = generatedPassword;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        if (successful) success = true;
      } catch (fallbackErr) {
        success = false;
      }
    }

    if (success) {
      setCopied(true);
      setCopyFeedback('Đã sao chép mật khẩu an toàn vào bộ nhớ đệm!');
      setTimeout(() => {
        setCopied(false);
        setCopyFeedback('');
      }, 2500);
    } else {
      setCopyFeedback('Không thể sao chép tự động. Vui lòng chọn và sao chép thủ công.');
      setTimeout(() => setCopyFeedback(''), 4000);
    }
  };

  const previewAnalysis = generatedPassword ? analyzePassword(generatedPassword) : null;

  return (
    <section id="generator" className="py-2 scroll-mt-20">
      <div className="bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-3xl p-5 sm:p-8 shadow-xs transition-colors">
        {/* Tiêu đề & Chọn chế độ */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-black dark:text-white">
              <KeyRound className="w-5 h-5 text-black dark:text-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-black dark:text-white tracking-tight">
                Tạo mật khẩu an toàn
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                Sử dụng thuật toán ngẫu nhiên mật mã <code>crypto.getRandomValues()</code>
              </p>
            </div>
          </div>

          {/* Tab chọn hình thức tạo */}
          <div className="flex p-1 bg-neutral-100 dark:bg-neutral-950 rounded-xl border border-neutral-200 dark:border-neutral-800 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setMode('random')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                mode === 'random'
                  ? 'bg-black text-white dark:bg-white dark:text-black shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
              }`}
            >
              Ký tự ngẫu nhiên
            </button>
            <button
              type="button"
              onClick={() => setMode('passphrase')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                mode === 'passphrase'
                  ? 'bg-black text-white dark:bg-white dark:text-black shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
              }`}
            >
              Cụm từ (Passphrase)
            </button>
          </div>
        </div>

        {/* Khung hiển thị mật khẩu tạo ra */}
        <div className="mb-6">
          <div className="p-4 sm:p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
            {error ? (
              <div className="flex items-center gap-2 text-black dark:text-white text-sm py-2">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{error}</span>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="overflow-x-auto py-1">
                  <span className="font-mono text-lg sm:text-xl font-bold tracking-wider text-black dark:text-white select-all">
                    {generatedPassword}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleGenerate}
                    className="p-2.5 rounded-xl bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-black dark:text-white border border-neutral-200 dark:border-neutral-700 transition-colors"
                    title="Tạo lại mật khẩu ngẫu nhiên"
                    aria-label="Tạo lại mật khẩu ngẫu nhiên"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={handleCopy}
                    className={`px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm flex items-center gap-1.5 border transition-all ${
                      copied
                        ? 'bg-neutral-200 dark:bg-neutral-800 text-black dark:text-white border-neutral-400 dark:border-neutral-600'
                        : 'bg-black hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-black border-black dark:border-white shadow-xs'
                    }`}
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'Đã sao chép' : 'Sao chép'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Toast phản hồi sao chép */}
          {copyFeedback && (
            <div className="mt-2 text-xs text-black dark:text-white flex items-center gap-1.5 font-medium">
              <Check className="w-3.5 h-3.5" />
              <span>{copyFeedback}</span>
            </div>
          )}

          {/* Xem nhanh kết quả phân tích của mật khẩu được tạo */}
          {previewAnalysis && !error && (
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200 dark:border-neutral-800 text-xs">
              <div className="flex items-center gap-3">
                <span className="text-neutral-500 dark:text-neutral-400">Đánh giá mật khẩu này:</span>
                <span className="font-bold px-2 py-0.5 rounded border border-black dark:border-white text-black dark:text-white bg-black/5 dark:bg-white/10 text-[11px]">
                  {previewAnalysis.score}/100 – {previewAnalysis.levelLabel}
                </span>
                <span className="text-neutral-500 dark:text-neutral-400 hidden sm:inline">
                  (Entropy: ~{previewAnalysis.entropyBits} bits)
                </span>
              </div>

              <button
                type="button"
                onClick={() => onUsePasswordInChecker(generatedPassword)}
                className="text-black dark:text-white underline font-semibold flex items-center gap-1 text-xs"
              >
                Đưa vào bộ kiểm tra
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Tùy chỉnh tham số tạo mật khẩu */}
        {mode === 'random' ? (
          <div className="space-y-5 pt-1">
            {/* Thanh trượt độ dài */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor={lengthInputId} className="text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 flex items-center gap-2">
                  <Sliders className="w-3.5 h-3.5 text-black dark:text-white" />
                  Độ dài mật khẩu:
                </label>
                <span className="text-sm font-bold text-black dark:text-white bg-neutral-100 dark:bg-neutral-950 px-2.5 py-1 rounded-lg border border-neutral-200 dark:border-neutral-800">
                  <span className="font-mono">{length}</span> ký tự
                </span>
              </div>
              <input
                id={lengthInputId}
                type="range"
                min="12"
                max="32"
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value, 10))}
                className="w-full accent-black dark:accent-white cursor-pointer bg-neutral-200 dark:bg-neutral-800 h-2 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-neutral-500 dark:text-neutral-400 mt-1">
                <span>12 ký tự (Tối thiểu khuyên dùng)</span>
                <span>20 ký tự (Rất mạnh)</span>
                <span>32 ký tự (Cực đại)</span>
              </div>
            </div>

            {/* Các nhóm ký tự lựa chọn */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <label className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={includeUppercase}
                  onChange={(e) => setIncludeUppercase(e.target.checked)}
                  className="w-4 h-4 rounded accent-black dark:accent-white bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700"
                />
                <div>
                  <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 block">Chữ hoa (A-Z)</span>
                  <span className="text-[10px] text-neutral-500 dark:text-neutral-400">ABC...</span>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={includeLowercase}
                  onChange={(e) => setIncludeLowercase(e.target.checked)}
                  className="w-4 h-4 rounded accent-black dark:accent-white bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700"
                />
                <div>
                  <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 block">Chữ thường (a-z)</span>
                  <span className="text-[10px] text-neutral-500 dark:text-neutral-400">abc...</span>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={includeNumbers}
                  onChange={(e) => setIncludeNumbers(e.target.checked)}
                  className="w-4 h-4 rounded accent-black dark:accent-white bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700"
                />
                <div>
                  <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 block">Chữ số (0-9)</span>
                  <span className="text-[10px] text-neutral-500 dark:text-neutral-400">0123...</span>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={includeSymbols}
                  onChange={(e) => setIncludeSymbols(e.target.checked)}
                  className="w-4 h-4 rounded accent-black dark:accent-white bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700"
                />
                <div>
                  <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 block">Ký tự đặc biệt</span>
                  <span className="text-[10px] text-neutral-500 dark:text-neutral-400">!@#$%^&*</span>
                </div>
              </label>
            </div>

            {/* Loại trừ ký tự gây nhầm lẫn */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={excludeSimilar}
                  onChange={(e) => setExcludeSimilar(e.target.checked)}
                  className="w-4 h-4 rounded accent-black dark:accent-white bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700"
                />
                <div>
                  <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                    Loại trừ các ký tự dễ nhầm lẫn
                  </span>
                  <span className="text-[11px] text-neutral-500 dark:text-neutral-400 block">
                    Bỏ qua các ký tự như <code>i, l, 1, L, o, 0, O</code> để thuận tiện khi cần đọc hoặc gõ thủ công.
                  </span>
                </div>
              </label>
            </div>
          </div>
        ) : (
          /* Chế độ Passphrase */
          <div className="space-y-4 pt-1">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor={wordCountInputId} className="text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-black dark:text-white" />
                  Số lượng từ trong Passphrase:
                </label>
                <span className="text-sm font-bold text-black dark:text-white bg-neutral-100 dark:bg-neutral-950 px-2.5 py-1 rounded-lg border border-neutral-200 dark:border-neutral-800">
                  <span className="font-mono">{passphraseWords}</span> từ
                </span>
              </div>
              <input
                id={wordCountInputId}
                type="range"
                min="3"
                max="6"
                value={passphraseWords}
                onChange={(e) => setPassphraseWords(parseInt(e.target.value, 10))}
                className="w-full accent-black dark:accent-white cursor-pointer bg-neutral-200 dark:bg-neutral-800 h-2 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-neutral-500 dark:text-neutral-400 mt-1">
                <span>3 từ (~40 bits entropy)</span>
                <span>4 từ (~60 bits entropy - Đề xuất)</span>
                <span>6 từ (&gt;80 bits entropy)</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-400 space-y-1.5 leading-relaxed">
              <span className="font-semibold text-black dark:text-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-black dark:text-white" /> Khái niệm Cụm mật khẩu (Passphrase):
              </span>
              <p>
                Thay vì dùng chuỗi ký tự khó nhớ như <code>Xk#9mP$2vL</code>, phương pháp Passphrase ghép nhiều từ ngẫu nhiên lại với nhau. Độ dài lớn (trên 20 ký tự) ngăn chặn hiệu quả các cuộc tấn công vét cạn, đồng thời người dùng rất dễ nhớ và gõ lại.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
