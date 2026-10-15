import React, { useState } from 'react';
import {
  Cpu,
  ShieldCheck,
  AlertOctagon,
  Key,
  Smartphone,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Zap,
  Lock,
  Layers
} from 'lucide-react';

interface KnowledgeTopic {
  id: string;
  badge: string;
  title: string;
  icon: React.ReactNode;
  summary: string;
  deepDive: {
    mechanism: string;
    defense: string;
    academicTip: string;
  };
}

export const SecurityKnowledge: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>('brute-force');

  const topics: KnowledgeTopic[] = [
    {
      id: 'brute-force',
      badge: 'Hình thức tấn công',
      title: '1. Tấn công dò mật khẩu (Brute Force & Dictionary Attack)',
      icon: <Cpu className="w-5 h-5 text-rose-600 dark:text-rose-400" />,
      summary:
        'Tấn công vét cạn (Brute Force) là phương pháp thử tất cả các tổ hợp ký tự có thể xảy ra cho đến khi tìm được mật khẩu chính xác. Tấn công từ điển (Dictionary Attack) tối ưu hơn bằng cách thử hàng triệu mật khẩu phổ biến đã biết trước.',
      deepDive: {
        mechanism:
          'Với sự phát triển của cụm GPU đồ họa hiện đại (ví dụ Hashcat chạy trên RTX 4090), kẻ tấn công có thể thử hàng chục tỷ hàm băm (hash) mỗi giây đối với các thuật toán băm yếu như MD5, SHA-1 hoặc NTLM. Nếu mật khẩu ngắn (dưới 8 ký tự), toàn bộ không gian tìm kiếm sẽ bị quét sạch trong vài giây.',
        defense:
          'Quy tắc vàng: Tăng độ dài của mật khẩu. Thời gian vét cạn tăng theo hàm mũ O(N^L), trong đó N là tập ký tự và L là độ dài. Mỗi ký tự bổ sung sẽ nhân độ khó lên N lần, biến thời gian giải mã từ vài ngày thành hàng triệu năm.',
        academicTip:
          'Khái niệm Entropy mật mã học (Shannon Entropy): Đo lường độ bất định của mật khẩu bằng công thức H = L × log2(N). Mật khẩu có entropy trên 60–80 bits được coi là an toàn trước các cuộc tấn công ngoại tuyến thông thường.',
      },
    },
    {
      id: 'password-security',
      badge: 'Nguyên tắc bảo vệ',
      title: '2. Nguyên tắc bảo mật mật khẩu & Cụm mật khẩu (Passphrase)',
      icon: <Key className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
      summary:
        'Vì sao nên sử dụng mật khẩu dài, khó đoán và độc nhất cho từng tài khoản? Rủi ro lớn nhất trong thực tế không phải là mật khẩu bị bẻ khóa trực tiếp, mà là việc tái sử dụng một mật khẩu trên nhiều nền tảng.',
      deepDive: {
        mechanism:
          'Tấn công nhồi thông tin xác thực (Credential Stuffing): Khi một diễn đàn nhỏ bạn từng đăng ký bị hack lộ cơ sở dữ liệu, kẻ tấn công sẽ tự động dùng cặp Email/Mật khẩu đó thử đăng nhập vào Facebook, Google, Ngân hàng, v.v. Nếu dùng chung mật khẩu, toàn bộ tài khoản khác của bạn sẽ bị sụp đổ dây chuyền.',
        defense:
          'Giải pháp: 1) Không bao giờ dùng lại mật khẩu. 2) Sử dụng Trình quản lý mật khẩu (Password Manager mã nguồn mở như Bitwarden hoặc KeePass) để tạo và lưu trữ an toàn. 3) Với mật khẩu chủ (Master Password), hãy áp dụng phương pháp Passphrase (ghép 4–5 từ ngẫu nhiên).',
        academicTip:
          'Độ dài đánh bại độ phức tạp: Một mật khẩu 8 ký tự dù phức tạp "Tr@4#" chỉ có entropy ~45 bits, trong khi một cụm mật khẩu 4 từ ngẫu nhiên "song-nui-may-gio-88" có độ dài 20 ký tự và entropy đạt trên 60 bits nhưng con người lại dễ nhớ hơn rất nhiều.',
      },
    },
    {
      id: 'phishing',
      badge: 'Tấn công lừa đảo',
      title: '3. Tấn công giả mạo (Phishing & Social Engineering)',
      icon: <AlertOctagon className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
      summary:
        'Dù mật khẩu của bạn có mạnh đến đâu, nó cũng trở nên vô dụng nếu bạn tự tay nhập nó vào một website giả mạo do kẻ tấn công thiết kế.',
      deepDive: {
        mechanism:
          'Phishing là hình thức tấn công phi kỹ thuật (Social Engineering) phổ biến nhất hiện nay. Kẻ tấn công gửi email, tin nhắn thông báo tài khoản bị khóa hoặc trúng thưởng, đính kèm đường link dẫn tới trang đăng nhập giả mạo có giao diện y hệt Google, Microsoft hay ngân hàng.',
        defense:
          'Cách phòng tránh: Luôn kiểm tra kỹ tên miền (Domain Name) trên thanh địa chỉ trình duyệt trước khi gõ mật khẩu (chú ý tấn công ký tự đồng hình Punycode/Homograph attack). Sử dụng các trình duyệt hiện đại có tính năng chống lừa đảo tích hợp.',
        academicTip:
          'Khái niệm Zero Trust & FIDO2: Tiêu chuẩn WebAuthn/FIDO2 (Passkeys) được thiết kế có khả năng chống Phishing tuyệt đối (Cryptographic Phishing Resistance) vì chữ ký số được gắn liền theo tên miền gốc.',
      },
    },
    {
      id: 'two-factor-auth',
      badge: 'Lớp bảo vệ nâng cao',
      title: '4. Xác thực hai yếu tố (Two-Factor Authentication - 2FA)',
      icon: <Smartphone className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      summary:
        'Xác thực 2 yếu tố (2FA / MFA) bổ sung một lớp bảo vệ thứ hai ngoài mật khẩu. Ngay cả khi kẻ tấn công biết được mật khẩu của bạn, chúng vẫn không thể đăng nhập thành công.',
      deepDive: {
        mechanism:
          'Mô hình xác thực bảo mật dựa trên 3 trụ cột cơ bản: 1) Điều bạn biết (Mật khẩu/PIN), 2) Điều bạn có (Điện thoại, Khóa bảo mật phần cứng), 3) Điều bạn là (Sinh trắc học: Vân tay, Khuôn mặt). 2FA bắt buộc người dùng phải chứng minh ít nhất 2 trong 3 yếu tố này.',
        defense:
          'Xếp hạng an toàn các phương thức 2FA: SMS OTP (Kém an toàn nhất vì rủi ro SIM Swap và chặn sóng SS7) -> Ứng dụng TOTP như Google Authenticator / Aegis (An toàn tốt, mã đổi 30 giây một lần) -> Khóa bảo mật phần cứng FIDO2 / YubiKey (An toàn cao nhất).',
        academicTip:
          'Thuật toán TOTP (Time-based One-Time Password - RFC 6238): Tạo mã OTP dựa trên hàm băm mật mã HMAC kết hợp giữa một khóa bí mật chia sẻ (Secret Key) và dấu thời gian hiện tại của hệ thống.',
      },
    },
  ];

  return (
    <section id="knowledge" className="py-4 scroll-mt-20">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-8 shadow-sm transition-colors">
        <div className="max-w-3xl mb-6">
          <div className="flex items-center gap-2 mb-1.5">
            <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Tài liệu học tập
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Kiến thức an toàn thông tin & bảo mật mật khẩu
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
            Nội dung tổng hợp cốt lõi dành cho sinh viên đại học môn An toàn thông tin, giải thích các cơ chế toán học, kỹ thuật tấn công và biện pháp phòng ngừa chuẩn công nghiệp.
          </p>
        </div>

        {/* 4 Thẻ kiến thức tương tác */}
        <div className="space-y-3">
          {topics.map((topic) => {
            const isExpanded = expandedId === topic.id;
            return (
              <div
                key={topic.id}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/60 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? null : topic.id)}
                  className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-4 hover:bg-slate-100/60 dark:hover:bg-slate-900/60 transition-colors"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shrink-0 mt-0.5">
                      {topic.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700">
                          {topic.badge}
                        </span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
                        {topic.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                        {topic.summary}
                      </p>
                    </div>
                  </div>

                  <div className="p-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 shrink-0 mt-1">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 pt-2 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs sm:text-sm space-y-3">
                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <div className="flex items-center gap-2 font-semibold text-rose-700 dark:text-rose-400 mb-1 text-xs">
                        <Zap className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                        <span>Cơ chế tấn công kỹ thuật:</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-xs">
                        {topic.deepDive.mechanism}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <div className="flex items-center gap-2 font-semibold text-emerald-700 dark:text-emerald-400 mb-1 text-xs">
                        <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <span>Chiến lược phòng ngự khuyến nghị:</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-xs">
                        {topic.deepDive.defense}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <div className="flex items-center gap-2 font-semibold text-blue-700 dark:text-blue-400 mb-1 text-xs">
                        <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span>Góc nhìn học thuật & Chuẩn an toàn (RFC / NIST):</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-xs">
                        {topic.deepDive.academicTip}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bảng so sánh lý thuyết thời gian bẻ khóa */}
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 mb-2">
            <Lock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Bảng tra cứu độ phức tạp mật mã học (Minh họa thực nghiệm)
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
            Ước lượng thời gian cần thiết để giải mã toàn bộ không gian tìm kiếm với hệ thống GPU hiện đại đạt tốc độ ~10 tỷ hash/giây:
          </p>

          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-3">Ví dụ mật khẩu</th>
                  <th className="p-3">Độ dài & Nhóm ký tự</th>
                  <th className="p-3">Entropy xấp xỉ</th>
                  <th className="p-3">Thời gian bẻ khóa GPU (Offline)</th>
                  <th className="p-3">Kết luận học thuật</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-950/40 text-slate-700 dark:text-slate-300">
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/40">
                  <td className="p-3 font-mono font-bold text-rose-600 dark:text-rose-400">123456</td>
                  <td className="p-3">6 ký tự (Chỉ số)</td>
                  <td className="p-3 font-mono">&lt; 20 bits</td>
                  <td className="p-3 font-bold text-rose-600 dark:text-rose-400">&lt; 1 mili-giây</td>
                  <td className="p-3 text-rose-600 dark:text-rose-400 text-[11px]">Bị dò ra ngay trong từ điển</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/40">
                  <td className="p-3 font-mono font-bold text-rose-600 dark:text-rose-400">matkhau123</td>
                  <td className="p-3">10 ký tự (Chữ thường + số)</td>
                  <td className="p-3 font-mono">~25 bits</td>
                  <td className="p-3 font-bold text-rose-600 dark:text-rose-400">Vài giây</td>
                  <td className="p-3 text-rose-600 dark:text-rose-400 text-[11px]">Dễ đoán, nằm trong từ điển Việt</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/40">
                  <td className="p-3 font-mono font-bold text-amber-600 dark:text-amber-400">P@ssw0rd!</td>
                  <td className="p-3">9 ký tự (Đủ 4 nhóm)</td>
                  <td className="p-3 font-mono">~45 bits</td>
                  <td className="p-3 font-bold text-amber-600 dark:text-amber-400">Vài giờ</td>
                  <td className="p-3 text-amber-600 dark:text-amber-400 text-[11px]">Ngụy trang Leetspeak phổ biến</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/40">
                  <td className="p-3 font-mono font-bold text-blue-600 dark:text-blue-400">K#9x!mP2@wL8$qR</td>
                  <td className="p-3">15 ký tự (Ngẫu nhiên 4 nhóm)</td>
                  <td className="p-3 font-mono">&gt; 90 bits</td>
                  <td className="p-3 font-bold text-emerald-600 dark:text-emerald-400">Hàng triệu năm</td>
                  <td className="p-3 text-emerald-600 dark:text-emerald-400 text-[11px]">Không thể bẻ khóa vét cạn</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/40">
                  <td className="p-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">Nui-Song-May-Troi#88</td>
                  <td className="p-3">20 ký tự (Cụm từ Diceware)</td>
                  <td className="p-3 font-mono">&gt; 80 bits</td>
                  <td className="p-3 font-bold text-emerald-600 dark:text-emerald-400">Hàng triệu năm</td>
                  <td className="p-3 text-emerald-600 dark:text-emerald-400 text-[11px]">Cực kỳ an toàn & Rất dễ nhớ</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
