// Core Tu Vi calculations (ported from AmDuong.py)
import { BAN_MENH } from '../utils/constants';
import { jdFromDate } from './calendar';

// Dich Cung (shift palace position)
export function dichCung(cungBanDau: number, ...args: number[]): number {
  let cungSauKhiDich = Math.floor(cungBanDau);
  for (const soCungDich of args) {
    cungSauKhiDich += Math.floor(soCungDich);
  }
  const result = cungSauKhiDich % 12;
  return result === 0 ? 12 : (result < 0 ? result + 12 : result);
}

// Khoang cach cung
export function khoangCachCung(cung1: number, cung2: number, chieu: number = 1): number {
  if (chieu === 1) {
    return (cung1 - cung2 + 12) % 12;
  } else {
    return (cung2 - cung1 + 12) % 12;
  }
}

// Ngũ Hành properties
export function nguHanh(tenHanh: string): { id: number; tenHanh: string; cuc: number; tenCuc: string; css: string } {
  const hanhMap: Record<string, { id: number; tenHanh: string; cuc: number; tenCuc: string; css: string }> = {
    'K': { id: 1, tenHanh: 'Kim', cuc: 4, tenCuc: 'Kim Tứ Cục', css: 'hanhKim' },
    'Kim': { id: 1, tenHanh: 'Kim', cuc: 4, tenCuc: 'Kim Tứ Cục', css: 'hanhKim' },
    'M': { id: 2, tenHanh: 'Mộc', cuc: 3, tenCuc: 'Mộc Tam Cục', css: 'hanhMoc' },
    'Moc': { id: 2, tenHanh: 'Mộc', cuc: 3, tenCuc: 'Mộc Tam Cục', css: 'hanhMoc' },
    'T': { id: 3, tenHanh: 'Thủy', cuc: 2, tenCuc: 'Thủy Nhị Cục', css: 'hanhThuy' },
    'Thuy': { id: 3, tenHanh: 'Thủy', cuc: 2, tenCuc: 'Thủy Nhị Cục', css: 'hanhThuy' },
    'H': { id: 4, tenHanh: 'Hỏa', cuc: 6, tenCuc: 'Hỏa Lục Cục', css: 'hanhHoa' },
    'Hoa': { id: 4, tenHanh: 'Hỏa', cuc: 6, tenCuc: 'Hỏa Lục Cục', css: 'hanhHoa' },
    'O': { id: 5, tenHanh: 'Thổ', cuc: 5, tenCuc: 'Thổ Ngũ Cục', css: 'hanhTho' },
    'Tho': { id: 5, tenHanh: 'Thổ', cuc: 5, tenCuc: 'Thổ Ngũ Cục', css: 'hanhTho' },
  };
  return hanhMap[tenHanh] || hanhMap['O'];
}

// Ngu Hanh Nap Am matrix
const MA_TRAN_NAP_AM: (string | false | number)[][] = [
  [0, 'G', 'At', 'Binh', 'Dinh', 'Mau', 'Ky', 'Canh', 'Tan', 'N', 'Q'],
  [1, 'K1', false, 'T1', false, 'H1', false, 'O1', false, 'M1', false],
  [2, false, 'K1', false, 'T1', false, 'H1', false, 'O1', false, 'M1'],
  [3, 'T2', false, 'H2', false, 'O2', false, 'M2', false, 'K2', false],
  [4, false, 'T2', false, 'H2', false, 'O2', false, 'M2', false, 'K2'],
  [5, 'H3', false, 'O3', false, 'M3', false, 'K3', false, 'T3', false],
  [6, false, 'H3', false, 'O3', false, 'M3', false, 'K3', false, 'T3'],
  [7, 'K4', false, 'T4', false, 'H4', false, 'O4', false, 'M4', false],
  [8, false, 'K4', false, 'T4', false, 'H4', false, 'O4', false, 'M4'],
  [9, 'T5', false, 'H5', false, 'O5', false, 'M5', false, 'K5', false],
  [10, false, 'T5', false, 'H5', false, 'O5', false, 'M5', false, 'K5'],
  [11, 'H6', false, 'O6', false, 'M6', false, 'K6', false, 'T6', false],
  [12, false, 'H6', false, 'O6', false, 'M6', false, 'K6', false, 'T6'],
];

export function nguHanhNapAm(diaChi: number, thienCan: number, xuatBanMenh: boolean = false): string {
  const nh = MA_TRAN_NAP_AM[diaChi]?.[thienCan];
  if (typeof nh === 'string' && nh.length >= 2) {
    if (xuatBanMenh) {
      return BAN_MENH[nh] || nh;
    }
    return nh[0];
  }
  return 'O';
}

// Tim Cuc
export function timCuc(viTriCungMenh: number, canNamSinh: number): string {
  const canThangGieng = (canNamSinh * 2 + 1) % 10;
  let canThangMenh = ((viTriCungMenh - 3) % 12 + canThangGieng) % 10;
  if (canThangMenh === 0) canThangMenh = 10;
  return nguHanhNapAm(viTriCungMenh, canThangMenh);
}

// Tim Tu Vi position
export function timTuVi(cuc: number, ngaySinhAmLich: number): number {
  const cungDanBanDau = 3;
  let cucValue = cuc;
  const cucBanDau = cuc;
  let cungDan = cungDanBanDau;
  
  while (cucValue < ngaySinhAmLich) {
    cucValue += cucBanDau;
    cungDan++;
  }
  
  let saiLech = cucValue - ngaySinhAmLich;
  if (saiLech % 2 === 1) {
    saiLech = -saiLech;
  }
  return dichCung(cungDan, saiLech);
}

// Tim Trang Sinh
export function timTrangSinh(cucSo: number): number {
  if (cucSo === 6) return 3; // Hoa - Dan
  if (cucSo === 4) return 6; // Kim - Ty
  if (cucSo === 2 || cucSo === 5) return 9; // Thuy/Tho - Than
  if (cucSo === 3) return 12; // Moc - Hoi
  return 3;
}

// Tim Hoa Linh
export function timHoaLinh(chiNam: number, gioSinh: number, gioiTinh: number, amDuongNamSinh: number): [number, number] {
  let khoiCungHoaTinh: number, khoiCungLinhTinh: number;
  
  if ([3, 7, 11].includes(chiNam)) {
    khoiCungHoaTinh = 2; khoiCungLinhTinh = 4;
  } else if ([1, 5, 9].includes(chiNam)) {
    khoiCungHoaTinh = 3; khoiCungLinhTinh = 11;
  } else if ([6, 10, 2].includes(chiNam)) {
    khoiCungHoaTinh = 11; khoiCungLinhTinh = 4;
  } else {
    khoiCungHoaTinh = 10; khoiCungLinhTinh = 11;
  }
  
  let viTriHoaTinh: number, viTriLinhTinh: number;
  if (gioiTinh * amDuongNamSinh === -1) {
    viTriHoaTinh = dichCung(khoiCungHoaTinh + 1, -gioSinh);
    viTriLinhTinh = dichCung(khoiCungLinhTinh - 1, gioSinh);
  } else {
    viTriHoaTinh = dichCung(khoiCungHoaTinh - 1, gioSinh);
    viTriLinhTinh = dichCung(khoiCungLinhTinh + 1, -gioSinh);
  }
  return [viTriHoaTinh, viTriLinhTinh];
}

// Tim Thien Khoi
export function timThienKhoi(canNam: number): number {
  const khoiViet = [0, 2, 1, 12, 10, 8, 1, 8, 7, 6, 4];
  return khoiViet[canNam] || 1;
}

// Tim Thien Quan Thien Phuc
export function timThienQuanThienPhuc(canNam: number): [number, number] {
  const thienQuan = [0, 8, 5, 6, 3, 4, 10, 12, 10, 11, 7];
  const thienPhuc = [0, 10, 9, 1, 12, 4, 3, 7, 6, 7, 6];
  return [thienQuan[canNam] || 1, thienPhuc[canNam] || 1];
}

// Tim Co Than
export function timCoThan(chiNam: number): number {
  if ([12, 1, 2].includes(chiNam)) return 3;
  if ([3, 4, 5].includes(chiNam)) return 6;
  if ([6, 7, 8].includes(chiNam)) return 9;
  return 12;
}

// Tim Thien Ma
export function timThienMa(chiNam: number): number {
  const demNghich = chiNam % 4;
  if (demNghich === 1) return 3;
  if (demNghich === 2) return 12;
  if (demNghich === 3) return 9;
  return 6;
}

// Tim Pha Toai
export function timPhaToai(chiNam: number): number {
  const demNghich = chiNam % 3;
  if (demNghich === 0) return 6;
  if (demNghich === 1) return 10;
  return 2;
}

// Tim Triet
export function timTriet(canNam: number): [number, number] {
  if ([1, 6].includes(canNam)) return [9, 10];
  if ([2, 7].includes(canNam)) return [7, 8];
  if ([3, 8].includes(canNam)) return [5, 6];
  if ([4, 9].includes(canNam)) return [3, 4];
  return [1, 2];
}

// Tim Luu Tru
export function timLuuTru(canNam: number): [number, number] {
  const maTranLuuHa = [0, 10, 11, 8, 5, 6, 7, 9, 4, 12, 3];
  const maTranThienTru = [0, 6, 7, 1, 6, 7, 9, 3, 7, 10, 11];
  return [maTranLuuHa[canNam] || 1, maTranThienTru[canNam] || 1];
}

// Sinh Khắc relationship
export function sinhKhac(hanh1: number, hanh2: number): string {
  const matrix = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, -1, 1, -2, 2],
    [0, 2, 0, 2, 1, -1],
    [0, 2, 1, 0, 1, -2],
    [0, -1, 2, -2, 0, 1],
    [0, 1, -2, -1, 2, 0],
  ];
  const val = matrix[hanh1]?.[hanh2] || 0;
  if (val === 1) return 'Bản Mệnh sinh Cục';
  if (val === -1) return 'Bản Mệnh khắc Cục';
  if (val === -2) return 'Cục khắc Bản Mệnh';
  if (val === 2) return 'Cục sinh Bản Mệnh';
  return 'Cục hòa Bản Mệnh';
}

// Can Chi calculations
export function ngayThangNamCanChi(_nn: number, tt: number, nnnn: number): { canThang: number; canNam: number; chiNam: number } {
  const canThang = (nnnn * 12 + tt + 3) % 10 + 1;
  const canNam = (nnnn + 6) % 10 + 1;
  const chiNam = (nnnn + 8) % 12 + 1;
  return { canThang: canThang > 10 ? canThang - 10 : canThang, canNam, chiNam };
}

export function canChiNgay(nn: number, tt: number, nnnn: number): { canNgay: number; chiNgay: number } {
  const jd = jdFromDate(nn, tt, nnnn);
  const canNgay = (jd + 9) % 10 + 1;
  const chiNgay = (jd + 1) % 12 + 1;
  return { canNgay, chiNgay };
}
