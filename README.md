# Lá Số Tử Vi - Static Web Application

Ứng dụng web tĩnh lập lá số Tử Vi, chạy hoàn toàn trên trình duyệt, không cần backend.
Dựa trên: Repo https://github.com/doanguyen/lasotuvi/

## Tính năng

- Lập lá số Tử Vi đầy đủ 12 cung với 108+ sao
- Hỗ trợ nhập ngày sinh Âm lịch hoặc Dương lịch
- Hiển thị Tam Hợp, Xung Chiếu khi click vào cung
- Xuất prompt cho AI (ChatGPT, Claude...) để luận giải lá số
- Giao diện hoàn toàn bằng tiếng Việt

## Công nghệ

- React 18 + TypeScript
- Vite
- Tailwind CSS

## Cài đặt

```bash
npm install
```

## Phát triển

```bash
npm run dev
```

Truy cập http://localhost:5173

## Build

```bash
npm run build
```

Output trong thư mục `dist/`, có thể deploy lên bất kỳ static hosting nào.

## Deploy

### GitHub Pages

Repository đã được cấu hình tự động deploy khi push lên branch `main`.

1. Vào **Settings → Pages**
2. Chọn **Source: GitHub Actions**
3. Push code lên `main`

### Các nền tảng khác

Upload thư mục `dist/` lên:
- Netlify
- Vercel  
- Cloudflare Pages
- Firebase Hosting

## Cấu trúc dự án

```
tuvi-web/
├── src/
│   ├── components/
│   │   ├── chart/        # Hiển thị lá số
│   │   ├── export/       # Xuất prompt AI
│   │   └── form/         # Form nhập thông tin
│   ├── lib/              # Logic tính toán Tử Vi
│   ├── types/            # TypeScript types
│   └── utils/            # Hằng số, tiện ích
├── .github/workflows/    # GitHub Actions
└── dist/                 # Build output
```

## Giấy phép

MIT
