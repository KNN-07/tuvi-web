// Thiên Can (10 Heavenly Stems)
export const THIEN_CAN = [
  null,
  { id: 1, tenCan: 'Giáp', nguHanh: 'M', vitriDiaBan: 3, amDuong: 1 },
  { id: 2, tenCan: 'Ất', nguHanh: 'M', vitriDiaBan: 4, amDuong: -1 },
  { id: 3, tenCan: 'Bính', nguHanh: 'H', vitriDiaBan: 6, amDuong: 1 },
  { id: 4, tenCan: 'Đinh', nguHanh: 'H', vitriDiaBan: 7, amDuong: -1 },
  { id: 5, tenCan: 'Mậu', nguHanh: 'O', vitriDiaBan: 6, amDuong: 1 },
  { id: 6, tenCan: 'Kỷ', nguHanh: 'O', vitriDiaBan: 7, amDuong: -1 },
  { id: 7, tenCan: 'Canh', nguHanh: 'K', vitriDiaBan: 9, amDuong: 1 },
  { id: 8, tenCan: 'Tân', nguHanh: 'K', vitriDiaBan: 10, amDuong: -1 },
  { id: 9, tenCan: 'Nhâm', nguHanh: 'T', vitriDiaBan: 12, amDuong: 1 },
  { id: 10, tenCan: 'Quý', nguHanh: 'T', vitriDiaBan: 1, amDuong: -1 },
];

// Địa Chi (12 Earthly Branches)
export const DIA_CHI = [
  null,
  { id: 1, tenChi: 'Tý', tenHanh: 'T', menhChu: 'Tham Lang', thanChu: 'Linh Tinh', amDuong: 1 },
  { id: 2, tenChi: 'Sửu', tenHanh: 'O', menhChu: 'Cự Môn', thanChu: 'Thiên Tướng', amDuong: -1 },
  { id: 3, tenChi: 'Dần', tenHanh: 'M', menhChu: 'Lộc Tồn', thanChu: 'Thiên Lương', amDuong: 1 },
  { id: 4, tenChi: 'Mão', tenHanh: 'M', menhChu: 'Văn Khúc', thanChu: 'Thiên Đồng', amDuong: -1 },
  { id: 5, tenChi: 'Thìn', tenHanh: 'O', menhChu: 'Liêm Trinh', thanChu: 'Văn Xương', amDuong: 1 },
  { id: 6, tenChi: 'Tỵ', tenHanh: 'H', menhChu: 'Vũ Khúc', thanChu: 'Thiên Cơ', amDuong: -1 },
  { id: 7, tenChi: 'Ngọ', tenHanh: 'H', menhChu: 'Phá Quân', thanChu: 'Hỏa Tinh', amDuong: 1 },
  { id: 8, tenChi: 'Mùi', tenHanh: 'O', menhChu: 'Vũ Khúc', thanChu: 'Thiên Tướng', amDuong: -1 },
  { id: 9, tenChi: 'Thân', tenHanh: 'K', menhChu: 'Liêm Trinh', thanChu: 'Thiên Lương', amDuong: 1 },
  { id: 10, tenChi: 'Dậu', tenHanh: 'K', menhChu: 'Văn Khúc', thanChu: 'Thiên Đồng', amDuong: -1 },
  { id: 11, tenChi: 'Tuất', tenHanh: 'O', menhChu: 'Lộc Tồn', thanChu: 'Văn Xương', amDuong: 1 },
  { id: 12, tenChi: 'Hợi', tenHanh: 'T', menhChu: 'Cự Môn', thanChu: 'Thiên Cơ', amDuong: -1 },
];

// Hành Cung (Element of each palace)
export const HANH_CUNG = [null, 'Thủy', 'Thổ', 'Mộc', 'Mộc', 'Thổ', 'Hỏa', 'Hỏa', 'Thổ', 'Kim', 'Kim', 'Thổ', 'Thủy'];

// Giờ Sinh labels
export const GIO_SINH_OPTIONS = [
  { value: 1, label: 'Tý (23h - 1h)' },
  { value: 2, label: 'Sửu (1h - 3h)' },
  { value: 3, label: 'Dần (3h - 5h)' },
  { value: 4, label: 'Mão (5h - 7h)' },
  { value: 5, label: 'Thìn (7h - 9h)' },
  { value: 6, label: 'Tỵ (9h - 11h)' },
  { value: 7, label: 'Ngọ (11h - 13h)' },
  { value: 8, label: 'Mùi (13h - 15h)' },
  { value: 9, label: 'Thân (15h - 17h)' },
  { value: 10, label: 'Dậu (17h - 19h)' },
  { value: 11, label: 'Tuất (19h - 21h)' },
  { value: 12, label: 'Hợi (21h - 23h)' },
];

// Ngũ Hành colors for CSS
export const NGU_HANH_COLORS: Record<string, string> = {
  hanhKim: 'text-gray-500',
  hanhMoc: 'text-green-600',
  hanhThuy: 'text-black',
  hanhHoa: 'text-red-700',
  hanhTho: 'text-yellow-600',
};

// Cung Chủ names (12 palaces)
export const CUNG_CHU_NAMES = [
  'Mệnh', 'Phụ Mẫu', 'Phúc Đức', 'Điền Trạch', 'Quan Lộc', 'Nô Bộc',
  'Thiên Di', 'Tật Ách', 'Tài Bạch', 'Tử Tức', 'Phu Thê', 'Huynh Đệ'
];

// Bản Mệnh lookup (Nạp Âm Ngũ Hành)
export const BAN_MENH: Record<string, string> = {
  'K1': 'Hải Trung Kim', 'T1': 'Giản Hạ Thủy', 'H1': 'Tích Lịch Hỏa', 'O1': 'Bích Thượng Thổ', 'M1': 'Tang Đố Mộc',
  'T2': 'Đại Khê Thủy', 'H2': 'Lô Trung Hỏa', 'O2': 'Thành Đầu Thổ', 'M2': 'Tùng Bách Mộc', 'K2': 'Kim Bạch Kim',
  'H3': 'Phú Đăng Hỏa', 'O3': 'Sa Trung Thổ', 'M3': 'Đại Lâm Mộc', 'K3': 'Bạch Lạp Kim', 'T3': 'Trường Lưu Thủy',
  'K4': 'Sa Trung Kim', 'T4': 'Thiên Hà Thủy', 'H4': 'Thiên Thượng Hỏa', 'O4': 'Lộ Bàng Thổ', 'M4': 'Dương Liễu Mộc',
  'T5': 'Tuyền Trung Thủy', 'H5': 'Sơn Hạ Hỏa', 'O5': 'Đại Trạch Thổ', 'M5': 'Thạch Lựu Mộc', 'K5': 'Kiếm Phong Kim',
  'H6': 'Sơn Đầu Hỏa', 'O6': 'Ốc Thượng Thổ', 'M6': 'Bình Địa Mộc', 'K6': 'Thoa Xuyến Kim', 'T6': 'Đại Hải Thủy',
};
