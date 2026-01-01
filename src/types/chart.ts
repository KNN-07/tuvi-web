// Ngu Hanh (Five Elements)
export type NguHanh = 'K' | 'M' | 'T' | 'H' | 'O'; // Kim, Moc, Thuy, Hoa, Tho

// Dac Tinh (Star Position Quality)
export type DacTinh = 'V' | 'M' | 'D' | 'B' | 'H' | null; // Vuong, Mieu, Dac, Binh, Ham

// Star definition
export interface Sao {
  saoID: number;
  saoTen: string;
  saoNguHanh: NguHanh;
  saoLoai: number; // 1=Chinh tinh, <10=tot, >10=xau
  cssSao: string;
  saoDacTinh: DacTinh;
  vongTrangSinh: 0 | 1;
}

// Palace (Cung)
export interface Cung {
  cungSo: number;  // 1-12
  cungTen: string; // Ty, Suu, Dan, etc.
  hanhCung: string;
  cungChu?: string; // Menh, Phu Mau, Phuc Duc, etc.
  cungAmDuong: -1 | 1;
  cungThan: boolean;
  cungDaiHan: number;
  cungTieuHan: string;
  cungSao: Sao[];
  tuanTrung?: boolean;
  trietLo?: boolean;
}

// Thien Ban (Personal Info)
export interface ThienBan {
  ten: string;
  namNu: string;
  gioSinh: string;
  ngayAm: number;
  thangAm: number;
  namAm: number;
  ngayDuong: number;
  thangDuong: number;
  namDuong: number;
  canNamTen: string;
  chiNamTen: string;
  canThang: string;
  chiThang: string;
  canNgay: string;
  chiNgay: string;
  banMenh: string;
  tenCuc: string;
  menhChu: string;
  thanChu: string;
  amDuongNamSinh: string;
  amDuongMenh: string;
  sinhKhac: string;
  today: string;
}

// Complete Chart Data
export interface ChartData {
  thienBan: ThienBan;
  thapNhiCung: Cung[];
}

// Form Input
export interface BirthInfo {
  hoTen: string;
  ngaySinh: number;
  thangSinh: number;
  namSinh: number;
  gioSinh: number; // 1-12
  gioiTinh: 'nam' | 'nu';
  amLich: boolean;
  muiGio: number;
}
