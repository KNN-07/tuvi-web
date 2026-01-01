// Lưu (Transit/Current Year) Stars Calculation
// These stars move every year based on the Heavenly Stem and Earthly Branch of the transit year

import type { Sao, NguHanh } from '../types/chart';
import { nguHanh } from './amduong';

// Helper to create Lưu star with "L." prefix indicator
function createLuuSao(
  saoID: number,
  saoTen: string,
  saoNguHanh: NguHanh,
  saoLoai: number = 2
): Sao {
  return {
    saoID,
    saoTen,
    saoNguHanh,
    saoLoai,
    cssSao: nguHanh(saoNguHanh).css,
    saoDacTinh: null,
    vongTrangSinh: 0,
  };
}

// Lưu Star Definitions (IDs 200+ to avoid collision with main stars)
export const saoLuuThaiTue = () => createLuuSao(201, 'L.Thái Tuế', 'H', 15);
export const saoLuuLocTon = () => createLuuSao(202, 'L.Lộc Tồn', 'O', 3);
export const saoLuuKinhDuong = () => createLuuSao(203, 'L.Kình Dương', 'K', 11);
export const saoLuuDaLa = () => createLuuSao(204, 'L.Đà La', 'K', 11);
export const saoLuuThienMa = () => createLuuSao(205, 'L.Thiên Mã', 'H', 3);
export const saoLuuTangMon = () => createLuuSao(206, 'L.Tang Môn', 'M', 12);
export const saoLuuBachHo = () => createLuuSao(207, 'L.Bạch Hổ', 'K', 12);
export const saoLuuThienKhoc = () => createLuuSao(208, 'L.Thiên Khốc', 'T', 12);
export const saoLuuThienHu = () => createLuuSao(209, 'L.Thiên Hư', 'T', 12);

// Lưu Tứ Hóa
export const saoLuuHoaLoc = () => createLuuSao(210, 'L.Hóa Lộc', 'M', 3);
export const saoLuuHoaQuyen = () => createLuuSao(211, 'L.Hóa Quyền', 'T', 4);
export const saoLuuHoaKhoa = () => createLuuSao(212, 'L.Hóa Khoa', 'T', 5);
export const saoLuuHoaKy = () => createLuuSao(213, 'L.Hóa Kỵ', 'T', 13);

// Lưu Thiên Khôi & Thiên Việt
export const saoLuuThienKhoi = () => createLuuSao(214, 'L.Thiên Khôi', 'H', 6);
export const saoLuuThienViet = () => createLuuSao(215, 'L.Thiên Việt', 'H', 6);

// ==================== LOOKUP TABLES ====================

// Lưu Lộc Tồn positions by Thiên Can (1-based index: Giáp=1...Quý=10)
// Returns palace index (1-12 where 1=Tý, 2=Sửu, ..., 12=Hợi)
const LUU_LOC_TON_TABLE: Record<number, number> = {
  1: 3,   // Giáp -> Dần (3)
  2: 4,   // Ất -> Mão (4)
  3: 6,   // Bính -> Tỵ (6)
  4: 7,   // Đinh -> Ngọ (7)
  5: 6,   // Mậu -> Tỵ (6)
  6: 7,   // Kỷ -> Ngọ (7)
  7: 9,   // Canh -> Thân (9)
  8: 10,  // Tân -> Dậu (10)
  9: 12,  // Nhâm -> Hợi (12)
  10: 1,  // Quý -> Tý (1)
};

// Lưu Thiên Mã by Địa Chi groups
// Thân(9), Tý(1), Thìn(5) -> Dần(3)
// Dần(3), Ngọ(7), Tuất(11) -> Thân(9)
// Tỵ(6), Dậu(10), Sửu(2) -> Hợi(12)
// Hợi(12), Mão(4), Mùi(8) -> Tỵ(6)
const LUU_THIEN_MA_TABLE: Record<number, number> = {
  1: 3,   // Tý -> Dần
  2: 12,  // Sửu -> Hợi
  3: 9,   // Dần -> Thân
  4: 6,   // Mão -> Tỵ
  5: 3,   // Thìn -> Dần
  6: 12,  // Tỵ -> Hợi
  7: 9,   // Ngọ -> Thân
  8: 6,   // Mùi -> Tỵ
  9: 3,   // Thân -> Dần
  10: 12, // Dậu -> Hợi
  11: 9,  // Tuất -> Thân
  12: 6,  // Hợi -> Tỵ
};

// Lưu Thiên Khôi & Thiên Việt by Thiên Can
// Returns [Khôi palace index, Việt palace index]
const LUU_KHOI_VIET_TABLE: Record<number, [number, number]> = {
  1: [2, 8],   // Giáp: Khôi at Sửu(2), Việt at Mùi(8)
  2: [1, 9],   // Ất: Khôi at Tý(1), Việt at Thân(9)
  3: [12, 10], // Bính: Khôi at Hợi(12), Việt at Dậu(10)
  4: [12, 10], // Đinh: Khôi at Hợi(12), Việt at Dậu(10)
  5: [1, 9],   // Mậu: same as Ất, Kỷ
  6: [1, 9],   // Kỷ: Khôi at Tý(1), Việt at Thân(9)
  7: [7, 3],   // Canh: Khôi at Ngọ(7), Việt at Dần(3)
  8: [7, 3],   // Tân: Khôi at Ngọ(7), Việt at Dần(3)
  9: [4, 6],   // Nhâm: Khôi at Mão(4), Việt at Tỵ(6)
  10: [4, 6],  // Quý: Khôi at Mão(4), Việt at Tỵ(6)
};

// Lưu Tứ Hóa by Thiên Can
// Returns star names that receive each transformation
// Format: { hóa lộc, hóa quyền, hóa khoa, hóa kỵ }
export const LUU_TU_HOA_TABLE: Record<number, { loc: string; quyen: string; khoa: string; ky: string }> = {
  1: { loc: 'Liêm Trinh', quyen: 'Phá Quân', khoa: 'Vũ Khúc', ky: 'Thái Dương' },
  2: { loc: 'Thiên Cơ', quyen: 'Thiên Lương', khoa: 'Tử Vi', ky: 'Thái Âm' },
  3: { loc: 'Thiên Đồng', quyen: 'Thiên Cơ', khoa: 'Văn Xương', ky: 'Liêm Trinh' },
  4: { loc: 'Thái Âm', quyen: 'Thiên Đồng', khoa: 'Thiên Cơ', ky: 'Cự Môn' },
  5: { loc: 'Tham Lang', quyen: 'Thái Âm', khoa: 'Hữu Bật', ky: 'Thiên Cơ' },
  6: { loc: 'Vũ Khúc', quyen: 'Tham Lang', khoa: 'Thiên Lương', ky: 'Văn Khúc' },
  7: { loc: 'Thái Dương', quyen: 'Vũ Khúc', khoa: 'Thiên Phủ', ky: 'Thiên Đồng' },
  8: { loc: 'Cự Môn', quyen: 'Thái Dương', khoa: 'Văn Khúc', ky: 'Văn Xương' },
  9: { loc: 'Thiên Lương', quyen: 'Tử Vi', khoa: 'Tả Phù', ky: 'Vũ Khúc' },
  10: { loc: 'Phá Quân', quyen: 'Cự Môn', khoa: 'Thái Âm', ky: 'Tham Lang' },
};

// ==================== CALCULATION FUNCTIONS ====================

/**
 * Helper function to adjust palace index (keeps in 1-12 range)
 */
function dichCung(start: number, offset: number): number {
  let result = (start - 1 + offset) % 12;
  if (result < 0) result += 12;
  return result + 1;
}

/**
 * Calculate position of Lưu Thái Tuế
 * Same position as the Year's Địa Chi
 */
export function timLuuThaiTue(chiNam: number): number {
  return chiNam; // 1-12
}

/**
 * Calculate position of Lưu Lộc Tồn based on Thiên Can
 */
export function timLuuLocTon(canNam: number): number {
  return LUU_LOC_TON_TABLE[canNam] || 1;
}

/**
 * Calculate position of Lưu Kình Dương
 * (Lưu Lộc Tồn index + 1) % 12
 */
export function timLuuKinhDuong(canNam: number): number {
  const locTon = timLuuLocTon(canNam);
  return dichCung(locTon, 1);
}

/**
 * Calculate position of Lưu Đà La
 * (Lưu Lộc Tồn index - 1) % 12
 */
export function timLuuDaLa(canNam: number): number {
  const locTon = timLuuLocTon(canNam);
  return dichCung(locTon, -1);
}

/**
 * Calculate position of Lưu Thiên Mã based on Địa Chi
 */
export function timLuuThienMa(chiNam: number): number {
  return LUU_THIEN_MA_TABLE[chiNam] || 1;
}

/**
 * Calculate position of Lưu Tang Môn
 * (Lưu Thái Tuế index + 2) % 12
 */
export function timLuuTangMon(chiNam: number): number {
  const thaiTue = timLuuThaiTue(chiNam);
  return dichCung(thaiTue, 2);
}

/**
 * Calculate position of Lưu Bạch Hổ
 * (Lưu Thái Tuế index - 2) % 12 (Opposite of Tang Môn)
 */
export function timLuuBachHo(chiNam: number): number {
  const thaiTue = timLuuThaiTue(chiNam);
  return dichCung(thaiTue, -2);
}

/**
 * Calculate position of Lưu Thiên Khốc
 * Start at Ngọ (7), count counter-clockwise to Year Branch
 * Counter-clockwise means subtract
 */
export function timLuuThienKhoc(chiNam: number): number {
  // From Ngọ(7), count counter-clockwise by (chiNam - 1)
  // Counter-clockwise = negative direction
  return dichCung(7, -(chiNam - 1));
}

/**
 * Calculate position of Lưu Thiên Hư
 * Start at Ngọ (7), count clockwise to Year Branch
 * Clockwise means add
 */
export function timLuuThienHu(chiNam: number): number {
  // From Ngọ(7), count clockwise by (chiNam - 1)
  return dichCung(7, chiNam - 1);
}

/**
 * Calculate positions of Lưu Thiên Khôi & Thiên Việt
 */
export function timLuuKhoiViet(canNam: number): [number, number] {
  return LUU_KHOI_VIET_TABLE[canNam] || [1, 1];
}

/**
 * Main interface for Lưu star positions
 */
export interface LuuStarPositions {
  thaiTue: number;
  locTon: number;
  kinhDuong: number;
  daLa: number;
  thienMa: number;
  tangMon: number;
  bachHo: number;
  thienKhoc: number;
  thienHu: number;
  thienKhoi: number;
  thienViet: number;
  // Tứ Hóa info (star names, not positions - needs to be resolved against chart)
  tuHoa: { loc: string; quyen: string; khoa: string; ky: string };
}

/**
 * Calculate all Lưu star positions for a given year
 * @param canNam - Thiên Can of the year (1-10)
 * @param chiNam - Địa Chi of the year (1-12)
 */
export function calculateLuuStars(canNam: number, chiNam: number): LuuStarPositions {
  const [thienKhoi, thienViet] = timLuuKhoiViet(canNam);
  
  return {
    thaiTue: timLuuThaiTue(chiNam),
    locTon: timLuuLocTon(canNam),
    kinhDuong: timLuuKinhDuong(canNam),
    daLa: timLuuDaLa(canNam),
    thienMa: timLuuThienMa(chiNam),
    tangMon: timLuuTangMon(chiNam),
    bachHo: timLuuBachHo(chiNam),
    thienKhoc: timLuuThienKhoc(chiNam),
    thienHu: timLuuThienHu(chiNam),
    thienKhoi,
    thienViet,
    tuHoa: LUU_TU_HOA_TABLE[canNam] || LUU_TU_HOA_TABLE[1],
  };
}

/**
 * Get Can Chi of any year (for transit year calculation)
 * @param year - Gregorian year (e.g., 2026)
 * @returns [canNam, chiNam] both 1-based
 */
export function getYearCanChi(year: number): [number, number] {
  // Calculation based on reference point
  // 1984 = Giáp Tý (Can=1, Chi=1)
  const baseYear = 1984;
  const diff = year - baseYear;
  
  let canNam = ((diff % 10) + 10) % 10 + 1;
  let chiNam = ((diff % 12) + 12) % 12 + 1;
  
  return [canNam, chiNam];
}

/**
 * Get Lưu stars as Sao array for a specific palace
 */
export function getLuuStarsForPalace(
  luuPositions: LuuStarPositions,
  cungSo: number
): Sao[] {
  const stars: Sao[] = [];
  
  if (luuPositions.thaiTue === cungSo) stars.push(saoLuuThaiTue());
  if (luuPositions.locTon === cungSo) stars.push(saoLuuLocTon());
  if (luuPositions.kinhDuong === cungSo) stars.push(saoLuuKinhDuong());
  if (luuPositions.daLa === cungSo) stars.push(saoLuuDaLa());
  if (luuPositions.thienMa === cungSo) stars.push(saoLuuThienMa());
  if (luuPositions.tangMon === cungSo) stars.push(saoLuuTangMon());
  if (luuPositions.bachHo === cungSo) stars.push(saoLuuBachHo());
  if (luuPositions.thienKhoc === cungSo) stars.push(saoLuuThienKhoc());
  if (luuPositions.thienHu === cungSo) stars.push(saoLuuThienHu());
  if (luuPositions.thienKhoi === cungSo) stars.push(saoLuuThienKhoi());
  if (luuPositions.thienViet === cungSo) stars.push(saoLuuThienViet());
  
  return stars;
}
