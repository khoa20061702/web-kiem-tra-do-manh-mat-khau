/**
 * Password Security Analysis Engine & Cryptographic Generator
 * 
 * Chú ý bảo mật:
 * 1. Hoàn toàn chạy trên Client / Trình duyệt.
 * 2. Không lưu trữ vào LocalStorage, SessionStorage, Cookie hay Database.
 * 3. Không gửi đi bất kỳ Endpoint, Server hoặc AI model nào.
 * 4. Không ghi log thông tin mật khẩu vào console.
 */

export interface SecurityCriteria {
  id: string;
  label: string;
  description: string;
  passed: boolean;
}

export type StrengthLevel = 'empty' | 'very_weak' | 'weak' | 'medium' | 'strong' | 'very_strong';

export interface PasswordAnalysisResult {
  score: number; // 0 - 100
  level: StrengthLevel;
  levelLabel: string;
  color: string;
  badgeBg: string;
  borderColor: string;
  criteria: SecurityCriteria[];
  passedCount: number;
  totalCriteria: number;
  entropyBits: number;
  estimatedCrackTimeOnline: string;
  estimatedCrackTimeOffline: string;
  suggestions: string[];
  detectedPatterns: string[];
  isCommonPassword: boolean;
  characterPoolSize: number;
}

export interface GeneratorOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  excludeSimilar?: boolean;
}

// Danh sách mẫu tích hợp sẵn các mật khẩu phổ biến nhất thế giới (RockYou / HaveIBeenPwned top leaks)
// Phục vụ mục đích giáo dục cho môn An toàn thông tin
export const COMMON_PASSWORDS_SAMPLE: Set<string> = new Set([
  '123456', 'password', '12345678', 'qwerty', '123456789', '12345', '1234', '111111',
  '1234567', 'dragon', 'welcome', 'ninja', 'administrator', 'admin', 'iloveyou', 'sunshine',
  'princess', 'football', 'monkey', 'charlie', 'donald', 'master', 'shadow', 'michael',
  'superman', 'batman', 'trustno1', 'starwars', 'killer', 'solo', 'jordan', 'secret',
  'test', 'demo', 'guest', 'changeme', 'passcode', 'toor', 'root', 'login', 'access',
  'freedom', 'flower', 'coffee', 'computer', 'apple', 'google', 'matrix', 'letmein',
  'hello', 'hacker', 'liverpool', 'arsenal', 'chelsea', 'manchester', 'barcelona',
  '123123', '654321', '666666', '888888', '987654321', 'password1', 'password123',
  'abc123', 'qwerty123', 'iloveyou1', 'admin123', 'admin888', 'matkhau', 'matkhau123',
  'khongbiet', 'yeuvan', 'anhyeuem', 'emyeuanh', 'vietnam', 'saigon', 'hanoi', 'thanhpho',
  '123456a@', '1234567a', '12345678a', '123456789a', 'Aa123456', 'P@ssw0rd', 'Pass@123',
  'P@ssword', 'P@ssword1', 'Welcome1', 'Welcome@1', 'Temp1234', 'Default123', 'ChangeMe123'
]);

// Danh sách chuỗi con phổ biến hoặc dãy bàn phím dễ đoán
export const COMMON_SUBSTRINGS: string[] = [
  '123456', 'password', 'qwerty', 'admin', 'iloveyou', 'welcome', 'letmein',
  'login', 'monkey', 'dragon', 'master', 'shadow', 'secret', 'passcode',
  'matkhau', 'anhyeuem', 'emyeuanh', '111111', '000000', '123123', 'abc123'
];

// Các dãy ký tự tuần tự bàn phím / bảng chữ cái
export const SEQUENTIAL_PATTERNS: string[] = [
  '0123', '1234', '2345', '3456', '4567', '5678', '6789', '7890',
  'abcd', 'bcde', 'cdef', 'defg', 'efgh', 'fghi', 'ghij', 'hijk', 'ijkl', 'jklm',
  'klmn', 'lmno', 'mnop', 'nopq', 'opqr', 'pqrs', 'qrst', 'rstu', 'stuv', 'tuvw', 'uvwx', 'vwxy', 'wxyz',
  'qwer', 'wert', 'erty', 'rtyu', 'tyui', 'yuio', 'uiop', 'asdf', 'sdfg', 'dfgh', 'fghj', 'ghjk', 'hjkl',
  'zxcv', 'xcvb', 'cvbn', 'vbnm',
  'dcba', 'edcb', 'fedc', 'gfed', 'hgfe', 'ihgf', 'jihg', 'kjih', 'lkji', 'mlkj',
  'nmlk', 'onml', 'ponm', 'qpon', 'rqpo', 'srqp', 'tsrq', 'utsr', 'vuts', 'wvut', 'xwvu', 'yxwv', 'zyxw',
  '9876', '8765', '7654', '6543', '5432', '4321', '3210'
];

/**
 * Kiểm tra chuỗi lặp (ví dụ: "aaa", "1111")
 */
export function hasExcessiveRepetition(str: string): boolean {
  if (str.length < 3) return false;
  // 3 ký tự liên tiếp giống nhau
  for (let i = 0; i < str.length - 2; i++) {
    if (str[i] === str[i + 1] && str[i] === str[i + 2]) {
      return true;
    }
  }
  // hoặc 2 ký tự lặp lại dạng ababab
  if (str.length >= 6) {
    const doubleRepeat = /(..)\1\1/;
    if (doubleRepeat.test(str)) return true;
  }
  return false;
}

/**
 * Kiểm tra mẫu tuần tự trên bàn phím hoặc bảng chữ cái
 */
export function hasSequentialPattern(str: string): boolean {
  const lower = str.toLowerCase();
  for (const pattern of SEQUENTIAL_PATTERNS) {
    if (lower.includes(pattern)) {
      return true;
    }
  }
  return false;
}

/**
 * Kiểm tra xem có chứa chuỗi phổ biến không
 */
export function findCommonSubstrings(str: string): string[] {
  const lower = str.toLowerCase();
  const found: string[] = [];
  for (const word of COMMON_SUBSTRINGS) {
    if (lower.includes(word)) {
      found.push(word);
    }
  }
  return found;
}

/**
 * Tính toán kích thước không gian ký tự (Character Pool Size)
 */
export function calculatePoolSize(str: string): {
  poolSize: number;
  hasLower: boolean;
  hasUpper: boolean;
  hasDigit: boolean;
  hasSpecial: boolean;
} {
  let poolSize = 0;
  const hasLower = /[a-z]/.test(str);
  const hasUpper = /[A-Z]/.test(str);
  const hasDigit = /[0-9]/.test(str);
  const hasSpecial = /[^a-zA-Z0-9\s]/.test(str);

  if (hasLower) poolSize += 26;
  if (hasUpper) poolSize += 26;
  if (hasDigit) poolSize += 10;
  if (hasSpecial) poolSize += 33; // Các ký tự đặc biệt tiêu chuẩn ASCII

  return { poolSize, hasLower, hasUpper, hasDigit, hasSpecial };
}

/**
 * Ước lượng thời gian bẻ khóa dựa trên Entropy và tốc độ dò
 * Tốc độ thử nghiệm:
 * - Online: 100 lần thử / phút (có rate limit)
 * - Offline GPU Hashcat: 10 tỷ (10^10) hash / giây (tấn công hash MD5/SHA-256 trên cụm GPU)
 */
export function formatCrackTime(seconds: number): string {
  if (seconds < 1) return 'Ngay lập tức (< 1 giây)';
  if (seconds < 60) return `${Math.round(seconds)} giây`;
  const minutes = seconds / 60;
  if (minutes < 60) return `${Math.round(minutes)} phút`;
  const hours = minutes / 60;
  if (hours < 24) return `${Math.round(hours)} giờ`;
  const days = hours / 24;
  if (days < 30) return `${Math.round(days)} ngày`;
  const months = days / 30;
  if (months < 12) return `${Math.round(months)} tháng`;
  const years = days / 365.25;
  if (years < 100) return `${Math.round(years)} năm`;
  if (years < 1000) return `${Math.round(years)} năm`;
  if (years < 1_000_000) return `${Math.round(years / 1000)} nghìn năm`;
  if (years < 1_000_000_000) return `${Math.round(years / 1_000_000)} triệu năm`;
  return 'Hàng tỷ năm';
}

/**
 * Hàm phân tích và đánh giá mật khẩu toàn diện
 */
export function analyzePassword(password: string): PasswordAnalysisResult {
  if (!password || password.length === 0) {
    return {
      score: 0,
      level: 'empty',
      levelLabel: 'Chưa nhập mật khẩu',
      color: '#94a3b8', // slate-400
      badgeBg: 'bg-slate-800 text-slate-300 border-slate-700',
      borderColor: 'border-slate-700',
      criteria: [
        { id: 'length', label: 'Độ dài tối thiểu 12 ký tự', description: 'Mật khẩu cần đủ dài để chống tấn công vét cạn', passed: false },
        { id: 'lowercase', label: 'Chứa chữ cái thường (a-z)', description: 'Tăng kích thước không gian tìm kiếm ký tự', passed: false },
        { id: 'uppercase', label: 'Chứa chữ cái in hoa (A-Z)', description: 'Phân biệt chữ hoa và thường làm tăng độ phức tạp', passed: false },
        { id: 'number', label: 'Chứa ít nhất một chữ số (0-9)', description: 'Bổ sung chữ số giúp ngăn ngừa đoán từ vựng', passed: false },
        { id: 'special', label: 'Chứa ký tự đặc biệt (!@#$%...)', description: 'Mở rộng bảng ký tự lên 94 ký tự ASCII', passed: false },
        { id: 'noCommonPatterns', label: 'Không chứa chuỗi phổ biến ("123456", "password", "qwerty")', description: 'Không dùng các từ khóa có sẵn trong từ điển hacker', passed: false },
        { id: 'noRepetitionOrSequence', label: 'Không có chuỗi lặp hoặc mẫu tuần tự ("aaa", "123", "abc")', description: 'Tránh các phím gõ liên tiếp hoặc ký tự trùng nhau', passed: false },
        { id: 'notInCommonList', label: 'Không thuộc danh sách mật khẩu phổ biến đã biết', description: 'Kiểm tra với danh sách mẫu top mật khẩu bị rò rỉ toàn cầu', passed: false },
      ],
      passedCount: 0,
      totalCriteria: 8,
      entropyBits: 0,
      estimatedCrackTimeOnline: '---',
      estimatedCrackTimeOffline: '---',
      suggestions: [
        'Nhập mật khẩu để hệ thống phân tích các tiêu chí bảo mật theo thời gian thực.',
        'Mẹo: Bạn có thể sử dụng công cụ "Tạo mật khẩu an toàn" bên dưới nếu cần một mật khẩu mạnh ngẫu nhiên.'
      ],
      detectedPatterns: [],
      isCommonPassword: false,
      characterPoolSize: 0,
    };
  }

  const length = password.length;
  const { poolSize, hasLower, hasUpper, hasDigit, hasSpecial } = calculatePoolSize(password);

  const foundCommonWords = findCommonSubstrings(password);
  const isCommon = COMMON_PASSWORDS_SAMPLE.has(password.toLowerCase()) || COMMON_PASSWORDS_SAMPLE.has(password);
  const hasRepetition = hasExcessiveRepetition(password);
  const hasSequence = hasSequentialPattern(password);

  // Đánh giá 8 tiêu chí chuẩn
  const criteria: SecurityCriteria[] = [
    {
      id: 'length',
      label: 'Độ dài tối thiểu 12 ký tự',
      description: `Hiện tại: ${length} ký tự (Khuyến nghị từ 12–16 ký tự trở lên)`,
      passed: length >= 12,
    },
    {
      id: 'lowercase',
      label: 'Chứa chữ cái thường (a-z)',
      description: hasLower ? 'Đã có chữ cái thường' : 'Chưa có chữ cái thường',
      passed: hasLower,
    },
    {
      id: 'uppercase',
      label: 'Chứa chữ cái in hoa (A-Z)',
      description: hasUpper ? 'Đã có chữ cái hoa' : 'Chưa có chữ cái in hoa',
      passed: hasUpper,
    },
    {
      id: 'number',
      label: 'Chứa ít nhất một chữ số (0-9)',
      description: hasDigit ? 'Đã có chữ số' : 'Chưa có chữ số',
      passed: hasDigit,
    },
    {
      id: 'special',
      label: 'Chứa ký tự đặc biệt (!@#$%...)',
      description: hasSpecial ? 'Đã có ký tự đặc biệt' : 'Chưa có ký tự đặc biệt',
      passed: hasSpecial,
    },
    {
      id: 'noCommonPatterns',
      label: 'Không chứa chuỗi phổ biến ("123456", "password", "qwerty")',
      description: foundCommonWords.length === 0
        ? 'Không phát hiện từ khóa phổ biến'
        : `Phát hiện chuỗi dễ đoán: "${foundCommonWords.join('", "')}"`,
      passed: foundCommonWords.length === 0,
    },
    {
      id: 'noRepetitionOrSequence',
      label: 'Không có chuỗi lặp hoặc mẫu tuần tự ("aaa", "123", "abc")',
      description: (!hasRepetition && !hasSequence)
        ? 'Không có chuỗi lặp hay dãy phím tuần tự'
        : (hasRepetition ? 'Phát hiện ký tự lặp liên tục' : 'Phát hiện mẫu phím/ký tự tuần tự'),
      passed: !hasRepetition && !hasSequence,
    },
    {
      id: 'notInCommonList',
      label: 'Không thuộc danh sách mật khẩu phổ biến đã biết',
      description: !isCommon
        ? 'Không trùng với danh sách mẫu mật khẩu rò rỉ'
        : 'CẢNH BÁO: Mật khẩu này nằm trong top danh sách rò rỉ phổ biến nhất!',
      passed: !isCommon,
    },
  ];

  const passedCount = criteria.filter(c => c.passed).length;

  // Tính toán Entropy E = L * log2(PoolSize)
  const safePoolSize = Math.max(poolSize, 1);
  const entropyBits = Math.round(length * Math.log2(safePoolSize) * 10) / 10;

  // Tính điểm số (0 - 100) theo nguyên tắc kỹ thuật thực tế:
  // - Ưu tiên độ dài & tính khó đoán hơn chỉ là đủ nhóm ký tự
  // - Phạt nặng nếu là mật khẩu phổ biến hoặc có chuỗi dễ đoán
  let score = 0;

  // Điểm nền từ độ dài
  if (length < 6) {
    score = length * 3; // tối đa 15
  } else if (length < 8) {
    score = 15 + (length - 5) * 5; // 20 - 25
  } else if (length < 12) {
    score = 25 + (length - 7) * 5; // 30 - 45
  } else if (length < 16) {
    score = 45 + (length - 11) * 6; // 51 - 69
  } else if (length < 20) {
    score = 69 + (length - 15) * 3; // 72 - 81
  } else {
    score = Math.min(88, 81 + (length - 19) * 1.5); // lên đến 88
  }

  // Điểm cộng đa dạng nhóm ký tự
  let varietyCount = 0;
  if (hasLower) varietyCount++;
  if (hasUpper) varietyCount++;
  if (hasDigit) varietyCount++;
  if (hasSpecial) varietyCount++;

  if (varietyCount >= 2) score += 4;
  if (varietyCount >= 3) score += 6;
  if (varietyCount >= 4) score += 8;

  // Thưởng thêm nếu mật khẩu vừa dài vừa có ký tự đặc biệt
  if (length >= 14 && hasSpecial) score += 4;

  // Điểm phạt các yếu tố nguy cơ
  if (foundCommonWords.length > 0) {
    score -= (foundCommonWords.length * 15);
  }
  if (hasSequence) {
    score -= 15;
  }
  if (hasRepetition) {
    score -= 15;
  }
  if (varietyCount === 1) {
    score -= 12; // chỉ toàn chữ thường hoặc toàn số
  }

  // Nếu nằm trong top danh sách rò rỉ phổ biến đã biết: Ép điểm dưới 20 (Rất yếu)
  if (isCommon) {
    score = Math.min(score, 18);
  }

  // Khống chế điểm từ 0 đến 100
  score = Math.max(5, Math.min(100, Math.round(score)));

  // Phân loại cấp độ
  let level: StrengthLevel = 'very_weak';
  let levelLabel = 'Rất yếu';
  let color = '#ef4444'; // Đỏ
  let badgeBg = 'bg-rose-500/10 text-rose-400 border-rose-500/30';
  let borderColor = 'border-rose-500/50';

  if (score >= 85) {
    level = 'very_strong';
    levelLabel = 'Rất mạnh';
    color = '#10b981'; // Xanh lá
    badgeBg = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    borderColor = 'border-emerald-500/50';
  } else if (score >= 70) {
    level = 'strong';
    levelLabel = 'Mạnh';
    color = '#06b6d4'; // Xanh cyan
    badgeBg = 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
    borderColor = 'border-cyan-500/50';
  } else if (score >= 50) {
    level = 'medium';
    levelLabel = 'Trung bình';
    color = '#eab308'; // Vàng/cam
    badgeBg = 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    borderColor = 'border-amber-500/50';
  } else if (score >= 25) {
    level = 'weak';
    levelLabel = 'Yếu';
    color = '#f97316'; // Cam
    badgeBg = 'bg-orange-500/10 text-orange-400 border-orange-500/30';
    borderColor = 'border-orange-500/50';
  }

  // Tính thời gian bẻ khóa (minh họa lý thuyết):
  // Tổng khả năng tổ hợp N^L (2^entropy)
  // Offline: 10 tỷ lần thử/s (10^10)
  // Giả sử kẻ tấn công cần trung bình 50% không gian tìm kiếm
  const combinations = Math.pow(2, Math.min(entropyBits, 120)); // Giới hạn float
  let crackSecOffline = (combinations / 2) / 10_000_000_000;
  let crackSecOnline = (combinations / 2) / 1.666; // ~100 lần / phút

  if (isCommon || foundCommonWords.length > 0) {
    crackSecOffline = 0.001; // Bị dò ra ngay trong từ điển dictionary attack
    crackSecOnline = 2;
  }

  const estimatedCrackTimeOffline = formatCrackTime(crackSecOffline);
  const estimatedCrackTimeOnline = formatCrackTime(crackSecOnline);

  // Tạo gợi ý cải thiện thông minh dựa trên kết quả phân tích
  const suggestions: string[] = [];

  if (isCommon) {
    suggestions.push('Cảnh báo nguy hiểm: Mật khẩu này đã từng bị lộ và có mặt trong hầu hết từ điển bẻ khóa. Hãy đổi sang mật khẩu hoàn toàn khác ngay lập tức.');
  }

  if (length < 12) {
    suggestions.push(`Hãy tăng độ dài mật khẩu lên ít nhất 12–16 ký tự. Độ dài là yếu tố quan trọng nhất giúp tăng hàm mũ thời gian dò vét cạn.`);
  }

  if (foundCommonWords.length > 0) {
    suggestions.push(`Không sử dụng các chuỗi phổ biến như "${foundCommonWords.join('", "')}". Hacker luôn ưu tiên thử các từ này đầu tiên.`);
  }

  if (hasSequence || hasRepetition) {
    suggestions.push('Tránh các ký tự lặp liên tục ("aaa") hoặc các dãy phím kề nhau trên bàn phím ("123", "abc", "qwerty").');
  }

  if (!hasSpecial) {
    suggestions.push('Thêm các ký tự đặc biệt (ví dụ: ! @ # $ % ^ & *) để tăng kích thước không gian tìm kiếm lên 94 ký tự.');
  }

  if (!hasUpper || !hasDigit) {
    suggestions.push('Kết hợp chữ in hoa (A-Z) và chữ số (0-9) ngẫu nhiên, không nên chỉ đặt số hoặc chữ hoa ở ký tự đầu/cuối.');
  }

  // Lời khuyên nâng cao
  suggestions.push('Tránh sử dụng ngày sinh, số điện thoại, tên người thân hay thú cưng vì dễ bị tấn công xã hội (Social Engineering).');
  suggestions.push('Hãy sử dụng một mật khẩu riêng biệt cho mỗi tài khoản và bật xác thực 2 bước (2FA) để tăng cường bảo vệ.');

  if (score >= 70) {
    suggestions.unshift('Mật khẩu của bạn có cấu trúc rất tốt! Bạn cũng có thể áp dụng phương pháp Cụm mật khẩu (Passphrase) gồm 4-5 từ ngẫu nhiên để dễ nhớ hơn.');
  }

  const detectedPatterns: string[] = [];
  if (isCommon) detectedPatterns.push('Mật khẩu phổ biến toàn cầu');
  if (foundCommonWords.length > 0) detectedPatterns.push(`Chứa chuỗi phổ biến: ${foundCommonWords.join(', ')}`);
  if (hasSequence) detectedPatterns.push('Chứa mẫu tuần tự trên bàn phím/bảng chữ cái');
  if (hasRepetition) detectedPatterns.push('Chứa ký tự lặp liên tiếp');

  return {
    score,
    level,
    levelLabel,
    color,
    badgeBg,
    borderColor,
    criteria,
    passedCount,
    totalCriteria: 8,
    entropyBits,
    estimatedCrackTimeOnline,
    estimatedCrackTimeOffline,
    suggestions,
    detectedPatterns,
    isCommonPassword: isCommon,
    characterPoolSize: poolSize,
  };
}

/**
 * Trình tạo mật khẩu ngẫu nhiên an toàn bằng Web Crypto API
 * Không sử dụng Math.random()
 */
export function generateSecurePassword(options: GeneratorOptions): {
  password?: string;
  error?: string;
} {
  const { length, includeUppercase, includeLowercase, includeNumbers, includeSymbols, excludeSimilar } = options;

  if (typeof window === 'undefined' || !window.crypto || !window.crypto.getRandomValues) {
    return {
      error: 'Trình duyệt của bạn không hỗ trợ Web Crypto API (crypto.getRandomValues). Để đảm bảo an toàn mật mã, hệ thống không sử dụng thuật toán ngẫu nhiên yếu.'
    };
  }

  if (length < 12 || length > 32) {
    return { error: 'Độ dài mật khẩu hợp lệ phải từ 12 đến 32 ký tự.' };
  }

  let uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  let numberChars = '0123456789';
  let symbolChars = '!@#$%^&*()_+-=[]{};:,.<>?/~';

  // Tùy chọn loại bỏ các ký tự dễ nhầm lẫn (i, l, 1, L, o, 0, O)
  if (excludeSimilar) {
    uppercaseChars = uppercaseChars.replace(/[IO]/g, '');
    lowercaseChars = lowercaseChars.replace(/[ilo]/g, '');
    numberChars = numberChars.replace(/[01]/g, '');
  }

  let charPool = '';
  const guaranteedChars: string[] = [];

  if (includeUppercase) {
    charPool += uppercaseChars;
    guaranteedChars.push(getRandomCharFromSet(uppercaseChars));
  }
  if (includeLowercase) {
    charPool += lowercaseChars;
    guaranteedChars.push(getRandomCharFromSet(lowercaseChars));
  }
  if (includeNumbers) {
    charPool += numberChars;
    guaranteedChars.push(getRandomCharFromSet(numberChars));
  }
  if (includeSymbols) {
    charPool += symbolChars;
    guaranteedChars.push(getRandomCharFromSet(symbolChars));
  }

  if (charPool.length === 0) {
    return { error: 'Vui lòng chọn ít nhất một nhóm ký tự (Chữ hoa, Chữ thường, Chữ số hoặc Ký tự đặc biệt).' };
  }

  const remainingLength = length - guaranteedChars.length;
  const passwordChars: string[] = [...guaranteedChars];

  // Sinh các ký tự còn lại bằng Web Crypto
  const randomBuffer = new Uint32Array(remainingLength);
  window.crypto.getRandomValues(randomBuffer);

  for (let i = 0; i < remainingLength; i++) {
    const randomIndex = randomBuffer[i] % charPool.length;
    passwordChars.push(charPool[randomIndex]);
  }

  // Tráo đổi ngẫu nhiên các ký tự bằng Fisher-Yates shuffle với Web Crypto
  shuffleArrayCrypto(passwordChars);

  return { password: passwordChars.join('') };
}

/**
 * Lấy ký tự ngẫu nhiên từ một tập bằng crypto
 */
function getRandomCharFromSet(set: string): string {
  const buf = new Uint32Array(1);
  window.crypto.getRandomValues(buf);
  return set[buf[0] % set.length];
}

/**
 * Fisher-Yates Shuffle an toàn mật mã
 */
function shuffleArrayCrypto<T>(array: T[]): void {
  const buf = new Uint32Array(array.length);
  window.crypto.getRandomValues(buf);

  for (let i = array.length - 1; i > 0; i--) {
    const j = buf[i] % (i + 1);
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

/**
 * Danh sách từ ngữ cho Passphrase Diceware kiểu Việt/Anh an toàn
 */
const PASSPHRASE_WORDS = [
  'duong', 'song', 'nui', 'may', 'gio', 'nang', 'mua', 'bien', 'dao', 'canh',
  'rung', 'lua', 'da', 'cat', 'sao', 'trang', 'troi', 'den', 'trang', 'vang',
  'xanh', 'do', 'tim', 'cam', 'hong', 'ngoc', 'sen', 'truc', 'mai', 'lan',
  'chim', 'ca', 'cop', 'rong', 'ho', 'bao', 'dai', 'bang', 'khi', 'ngua',
  'shield', 'cyber', 'guard', 'secure', 'crypto', 'kernel', 'socket', 'vector',
  'token', 'beacon', 'matrix', 'nexus', 'prism', 'vortex', 'falcon', 'titan'
];

/**
 * Tạo Passphrase (cụm mật khẩu gồm nhiều từ ngẫu nhiên)
 */
export function generatePassphrase(wordCount: number = 4): { passphrase?: string; error?: string } {
  if (typeof window === 'undefined' || !window.crypto || !window.crypto.getRandomValues) {
    return { error: 'Không hỗ trợ Web Crypto API.' };
  }

  const randomIndices = new Uint32Array(wordCount);
  window.crypto.getRandomValues(randomIndices);

  const selectedWords: string[] = [];
  for (let i = 0; i < wordCount; i++) {
    const word = PASSPHRASE_WORDS[randomIndices[i] % PASSPHRASE_WORDS.length];
    // Viết hoa chữ cái đầu
    selectedWords.push(word.charAt(0).toUpperCase() + word.slice(1));
  }

  // Thêm một số ngẫu nhiên và ký tự đặc biệt
  const numBuf = new Uint32Array(1);
  window.crypto.getRandomValues(numBuf);
  const randomNum = (numBuf[0] % 90) + 10; // 10 - 99
  const separators = ['-', '_', '#', '$', '.'];
  const sep = separators[numBuf[0] % separators.length];

  return { passphrase: selectedWords.join(sep) + randomNum };
}
