# Hướng Dẫn Deploy Ứng Dụng Lên Vercel

Tài liệu này hướng dẫn cách đưa ứng dụng "Đuổi hình bắt chữ - Nhóm 1" lên Vercel để mọi người có thể truy cập.

## 1. Chuẩn bị

Đảm bảo bạn đã cài đặt NodeJS và có tài khoản Vercel.

## 2. Đăng nhập Vercel

Mở terminal (PowerShell hoặc Command Prompt) tại thư mục dự án và chạy:

```bash
npx vercel login
```

- Chọn phương thức đăng nhập (Github, Email, v.v.) và làm theo hướng dẫn trên trình duyệt.
- Sau khi đăng nhập thành công, quay lại terminal.

## 3. Deploy (Triển khai)

Để deploy ứng dụng với tên miền mong muốn, chạy lệnh sau:

```bash
npx vercel --prod
```

Hệ thống sẽ hỏi một vài câu hỏi để cấu hình:

1.  **Set up and deploy “D:\chip”?** -> Chọn `Y` (Yes).
2.  **Which scope should contain your project?** -> Chọn tài khoản của bạn.
3.  **Link to existing project?** -> Chọn `N` (No) nếu đây là lần đầu.
4.  **What’s your project’s name?** -> Nhập chính xác: `duoi-hinh-bat-chu-nhom-1`
    *(Việc này sẽ giúp tạo ra đường dẫn là `https://duoi-hinh-bat-chu-nhom-1.vercel.app` nếu chưa ai dùng)*.
5.  **In which directory is your code located?** -> Nhấn Enter (để mặc định là `./`).
6.  **Want to modify these settings?** -> Chọn `N` (No) (Vercel sẽ tự động nhận diện Vite).

## 4. Kiểm tra kết quả

Sau khi chạy xong, Vercel sẽ cung cấp một đường dẫn `Production: https://...`.
Bạn có thể truy cập đường dẫn đó để chơi game.

Chúc bạn thành công!
