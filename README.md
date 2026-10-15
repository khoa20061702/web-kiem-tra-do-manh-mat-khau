# 🛡️ Password Security Checker & Generator
> **Công cụ Kiểm Tra Độ Mạnh Mật Khẩu & Tạo Mật Khẩu An Toàn Chuẩn Mật Mã**  
> *Dự án phục vụ học tập và nghiên cứu môn An toàn thông tin và bảo mật*

[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-purple?logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/Privacy-100%25_Client--side-success)](#-cam-kết-bảo-mật)

---

## 🌟 Giới thiệu

**Password Security Checker** là ứng dụng web tương tác giúp người dùng đánh giá mức độ an toàn của mật khẩu, thấu hiểu cơ chế tấn công mật mã và cách thiết lập mật khẩu chuẩn an toàn. Ứng dụng cung cấp các công cụ phân tích thời gian thực dựa trên entropy thông tin, đối chiếu từ điển rò rỉ phổ biến (RockYou / HaveIBeenPwned), cùng bộ sinh mật khẩu ngẫu nhiên an toàn chuẩn mã hóa.

---

## 🔒 Cam kết bảo mật (100% Client-Side)

Bảo mật và quyền riêng tư là ưu tiên cao nhất của ứng dụng:

- 🛡️ **100% Xử lý nội bộ tại trình duyệt (Client-side Browser):** Toàn bộ thuật toán kiểm tra và tạo mật khẩu đều chạy trực tiếp trên thiết bị của bạn.
- 🚫 **Không lưu trữ:** Tuyệt đối không lưu mật khẩu vào `LocalStorage`, `SessionStorage`, `Cookie` hay bất kỳ cơ sở dữ liệu nào.
- 🌐 **Zero Network Requests:** Không gửi mật khẩu tới bất kỳ máy chủ (server), API bên ngoài hay mô hình AI nào.
- ⚡ **Web Crypto API:** Sử dụng CSPRNG (`window.crypto.getRandomValues`) cho việc sinh số ngẫu nhiên an toàn mật mã học, tránh điểm yếu giả ngẫu nhiên của `Math.random()`.

---

## ✨ Tính năng chính

### 1. Phân tích độ mạnh mật khẩu (Password Checker)
- **Thang điểm & Cấp độ:** Đánh giá điểm từ 0 – 100 với 5 cấp độ (Rất yếu, Yếu, Trung bình, Mạnh, Rất mạnh).
- **Phân tích Entropy:** Tính toán độ hỗn loạn thông tin $E = L \times \log_2(R)$ (với $L$ là độ dài chuỗi, $R$ là không gian ký tự).
- **Ước tính thời gian bẻ khóa (Crack Time Estimation):**
  - *Tấn công trực tuyến (Online Attack):* Giả định hệ thống giới hạn tốc độ (100 thử nghiệm/giây).
  - *Tấn công ngoại tuyến (Offline Fast GPU Attack):* Giả định hacker có file băm mật khẩu và sử dụng dàn GPU chuyên dụng ($10^{11}$ hash/giây).
- **Kiểm tra tiêu chuẩn an toàn:**
  - Độ dài tối thiểu (8+, 12+, 16+ ký tự).
  - Kết hợp chữ hoa, chữ thường, chữ số và ký tự đặc biệt.
- **Phát hiện mẫu yếu & Từ điển rò rỉ:**
  - Nhận diện chuỗi liên tiếp (`12345`, `qwerty`, `abc`).
  - Nhận diện ký tự lặp lại (`aaaa`, `1111`).
  - Đối chiếu danh sách top mật khẩu bị lộ phổ biến nhất thế giới và mật khẩu tiếng Việt phổ biến.
- **Gợi ý cải thiện:** Đưa ra lời khuyên cụ thể, trực quan để tăng cường bảo mật.

### 2. Trình tạo mật khẩu ngẫu nhiên (Password Generator)
- Tùy chỉnh độ dài từ 8 đến 64 ký tự.
- Tùy chọn thành phần: Chữ in hoa (`A-Z`), chữ thường (`a-z`), số (`0-9`), ký tự đặc biệt (`!@#$%^&*...`).
- Tùy chọn **loại trừ ký tự dễ nhầm lẫn** (như `l, 1, I, O, 0`).
- Tính năng **sử dụng ngay mật khẩu vừa tạo** để đưa vào bộ kiểm tra phân tích.

### 3. Cẩm nang an toàn thông tin (Security Knowledge)
- Giải thích chi tiết các phương thức tấn công phổ biến:
  - **Brute Force Attack** (Vét cạn).
  - **Dictionary Attack** (Tấn công từ điển).
  - **Credential Stuffing** (Nhồi nhét thông tin xác thực).
  - **Rainbow Table** (Bảng cầu vồng / bẻ khóa hàm băm).
- Hướng dẫn thực hành tốt nhất: Quản lý mật khẩu bằng Password Manager, kích hoạt xác thực hai yếu tố (2FA/MFA), nhận biết tấn công lừa đảo (Phishing).

### 4. Trải nghiệm người dùng
- Thiết kế tối giản tinh tế theo phong cách **Monochrome thuần Đen & Trắng (Black & White)**, tập trung tối đa vào thông tin bảo mật và loại bỏ hoàn toàn các màu sắc gây xao nhãng.
- Hỗ trợ đầy đủ chế độ giao diện **Sáng / Tối (Dark / Light Mode)** với độ tương phản cao.
- Giao diện mượt mà, phản hồi tức thì và tương thích hoàn toàn trên Desktop, Tablet và Mobile.

---

## 🛠️ Công nghệ sử dụng

- **Frontend Core:** [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Build Tool:** [Vite 8](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Cryptography:** Native Web Crypto API (`window.crypto`)

---

## 🚀 Hướng dẫn cài đặt & Khởi chạy

### Yêu cầu tiên quyết
- Đã cài đặt [Node.js](https://nodejs.org/) (khuyến nghị phiên bản 18+ hoặc 20+ trở lên).
- Trình quản lý gói `npm` (đi kèm sẵn với Node.js).

### Các bước thực hiện

1. **Clone repository (hoặc tải mã nguồn):**
   ```bash
   git clone https://github.com/khoa20061702/web-kiem-tra-do-manh-mat-khau.git
   cd web-kiem-tra-do-manh-mat-khau
   ```

2. **Cài đặt thư viện:**
   ```bash
   npm install
   ```

3. **Khởi chạy ứng dụng ở chế độ phát triển (Dev Mode):**
   ```bash
   npm run dev
   ```
   Ứng dụng sẽ khả dụng tại: **[http://localhost:3000](http://localhost:3000)**

4. **Đóng gói dự án (Production Build):**
   ```bash
   npm run build
   ```
   Các tệp tối ưu sẽ được tạo trong thư mục `dist/`.

5. **Xem thử bản đóng gói (Preview):**
   ```bash
   npm run preview
   ```

---

## 📁 Cấu trúc thư mục

```text
web-kiem-tra-do-manh-mat-khau/
├── src/
│   ├── components/            # Các thành phần giao diện người dùng
│   │   ├── Navbar.tsx         # Thanh điều hướng & nút đổi Dark/Light mode
│   │   ├── PasswordChecker.tsx    # Giao diện kiểm tra & phân tích mật khẩu
│   │   ├── PasswordGenerator.tsx  # Giao diện tạo mật khẩu ngẫu nhiên
│   │   ├── SecurityKnowledge.tsx  # Cẩm nang kiến thức an toàn thông tin
│   │   ├── PrivacyBanner.tsx  # Băng thông báo cam kết bảo mật client-side
│   │   └── Footer.tsx         # Chân trang & liên kết bản quyền
│   ├── utils/
│   │   ├── passwordAnalysis.ts      # Engine tính toán entropy, phân tích & sinh mật khẩu
│   │   └── passwordAnalysis.test.ts # Bộ kiểm thử các trường hợp phân tích
│   ├── App.tsx                # Trang chính liên kết các component
│   ├── index.css              # Tùy biến CSS & hiệu ứng lưới nền
│   └── main.tsx               # Điểm khởi chạy của React
├── index.html                 # HTML template với thẻ SEO & OpenGraph
├── vite.config.ts             # Cấu hình Vite & Tailwind v4 plugin
├── tsconfig.json              # Cấu hình TypeScript
└── package.json               # Danh sách dependencies và npm scripts
```

---

## 📜 Giấy phép & Tuyên bố miễn trừ

- Dự án được phát triển nhằm mục đích **học tập, nghiên cứu và nâng cao nhận thức về an toàn thông tin**.
- Mọi dữ liệu phân tích chỉ mang tính chất tham khảo giáo dục dựa trên các mô hình tính toán entropy lý thuyết.
