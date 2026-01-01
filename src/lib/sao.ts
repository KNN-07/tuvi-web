// Star definitions (ported from Sao.py)
import type { NguHanh, Sao } from '../types/chart';
import { nguHanh } from './amduong';

function createSao(
  saoID: number,
  saoTen: string,
  saoNguHanh: NguHanh,
  saoLoai: number = 2,
  vongTrangSinh: 0 | 1 = 0
): Sao {
  return {
    saoID,
    saoTen,
    saoNguHanh,
    saoLoai,
    cssSao: nguHanh(saoNguHanh).css,
    saoDacTinh: null,
    vongTrangSinh,
  };
}

// Tử Vi tinh hệ (14 chính tinh)
export const saoTuVi = () => createSao(1, 'Tử Vi', 'O', 1);
export const saoLiemTrinh = () => createSao(2, 'Liêm Trinh', 'H', 1);
export const saoThienDong = () => createSao(3, 'Thiên Đồng', 'T', 1);
export const saoVuKhuc = () => createSao(4, 'Vũ Khúc', 'K', 1);
export const saoThaiDuong = () => createSao(5, 'Thái Dương', 'H', 1);
export const saoThienCo = () => createSao(6, 'Thiên Cơ', 'M', 1);
export const saoThienPhu = () => createSao(7, 'Thiên Phủ', 'O', 1);
export const saoThaiAm = () => createSao(8, 'Thái Âm', 'T', 1);
export const saoThamLang = () => createSao(9, 'Tham Lang', 'T', 1);
export const saoCuMon = () => createSao(10, 'Cự Môn', 'T', 1);
export const saoThienTuong = () => createSao(11, 'Thiên Tướng', 'T', 1);
export const saoThienLuong = () => createSao(12, 'Thiên Lương', 'M', 1);
export const saoThatSat = () => createSao(13, 'Thất Sát', 'K', 1);
export const saoPhaQuan = () => createSao(14, 'Phá Quân', 'T', 1);

// Vòng Thái Tuế
export const saoThaiTue = () => createSao(15, 'Thái Tuế', 'H', 15);
export const saoThieuDuong = () => createSao(16, 'Thiếu Dương', 'H', 5);
export const saoTangMon = () => createSao(17, 'Tang Môn', 'M', 12);
export const saoThieuAm = () => createSao(18, 'Thiếu Âm', 'T', 5);
export const saoQuanPhu3 = () => createSao(19, 'Quan Phủ', 'H', 12);
export const saoTuPhu = () => createSao(20, 'Tử Phù', 'K', 12);
export const saoTuePha = () => createSao(21, 'Tuế Phá', 'H', 12);
export const saoLongDuc = () => createSao(22, 'Long Đức', 'T', 5);
export const saoBachHo = () => createSao(23, 'Bạch Hổ', 'K', 12);
export const saoPhucDuc = () => createSao(24, 'Phúc Đức', 'O', 5);
export const saoDieuKhach = () => createSao(25, 'Điếu Khách', 'H', 12);
export const saoTrucPhu = () => createSao(26, 'Trực Phù', 'K', 16);

// Vòng Lộc Tồn
export const saoLocTon = () => createSao(27, 'Lộc Tồn', 'O', 3);
export const saoBacSy = () => createSao(109, 'Bác Sĩ', 'T', 5);
export const saoLucSi = () => createSao(28, 'Lực Sĩ', 'H', 2);
export const saoThanhLong = () => createSao(29, 'Thanh Long', 'T', 5);
export const saoTieuHao = () => createSao(30, 'Tiểu Hao', 'H', 12);
export const saoTuongQuan = () => createSao(31, 'Tướng Quân', 'M', 4);
export const saoTauThu = () => createSao(32, 'Tấu Thư', 'K', 3);
export const saoPhiLiem = () => createSao(33, 'Phi Liêm', 'H', 2);
export const saoHyThan = () => createSao(34, 'Hỷ Thần', 'H', 5);
export const saoBenhPhu = () => createSao(35, 'Bệnh Phù', 'O', 12);
export const saoDaiHao = () => createSao(36, 'Đại Hao', 'H', 12);
export const saoPhucBinh = () => createSao(37, 'Phục Binh', 'H', 13);
export const saoQuanPhu2 = () => createSao(38, 'Quan Phủ', 'H', 12);

// Vòng Tràng Sinh
export const saoTrangSinh = () => createSao(39, 'Tràng Sinh', 'T', 5, 1);
export const saoMocDuc = () => createSao(40, 'Mộc Dục', 'T', 14, 1);
export const saoQuanDoi = () => createSao(41, 'Quan Đới', 'K', 4, 1);
export const saoLamQuan = () => createSao(42, 'Lâm Quan', 'K', 7, 1);
export const saoDeVuong = () => createSao(43, 'Đế Vượng', 'K', 5, 1);
export const saoSuy = () => createSao(44, 'Suy', 'T', 12, 1);
export const saoBenh = () => createSao(45, 'Bệnh', 'H', 12, 1);
export const saoTu = () => createSao(46, 'Tử', 'H', 12, 1);
export const saoMo = () => createSao(47, 'Mộ', 'O', 2, 1);
export const saoTuyet = () => createSao(48, 'Tuyệt', 'O', 12, 1);
export const saoThai = () => createSao(49, 'Thai', 'O', 14, 1);
export const saoDuong = () => createSao(50, 'Dưỡng', 'M', 2, 1);

// Lục Sát
export const saoDaLa = () => createSao(51, 'Đà La', 'K', 11);
export const saoKinhDuong = () => createSao(52, 'Kình Dương', 'K', 11);
export const saoDiaKhong = () => createSao(53, 'Địa Không', 'H', 11);
export const saoDiaKiep = () => createSao(54, 'Địa Kiếp', 'H', 11);
export const saoLinhTinh = () => createSao(55, 'Linh Tinh', 'H', 11);
export const saoHoaTinh = () => createSao(56, 'Hỏa Tinh', 'H', 11);

// Văn tinh
export const saoVanXuong = () => createSao(57, 'Văn Xương', 'K', 6);
export const saoVanKhuc = () => createSao(58, 'Văn Khúc', 'T', 6);
export const saoThienKhoi = () => createSao(59, 'Thiên Khôi', 'H', 6);
export const saoThienViet = () => createSao(60, 'Thiên Việt', 'H', 6);
export const saoTaPhu = () => createSao(61, 'Tả Phù', 'O', 2);
export const saoHuuBat = () => createSao(62, 'Hữu Bật', 'O', 2);
export const saoLongTri = () => createSao(63, 'Long Trì', 'T', 3);
export const saoPhuongCac = () => createSao(64, 'Phượng Các', 'O', 3);
export const saoTamThai = () => createSao(65, 'Tam Thai', 'M', 7);
export const saoBatToa = () => createSao(66, 'Bát Tọa', 'T', 7);
export const saoAnQuang = () => createSao(67, 'Ân Quang', 'M', 3);
export const saoThienQuy = () => createSao(68, 'Thiên Quý', 'O', 3);

// Other stars
export const saoThienKhoc = () => createSao(69, 'Thiên Khốc', 'T', 12);
export const saoThienHu = () => createSao(70, 'Thiên Hư', 'T', 12);
export const saoThienDuc = () => createSao(71, 'Thiên Đức', 'H', 5);
export const saoNguyetDuc = () => createSao(72, 'Nguyệt Đức', 'H', 5);
export const saoThienHinh = () => createSao(73, 'Thiên Hình', 'H', 15);
export const saoThienRieu = () => createSao(74, 'Thiên Riêu', 'T', 13);
export const saoThienY = () => createSao(75, 'Thiên Y', 'T', 5);
export const saoQuocAn = () => createSao(76, 'Quốc Ấn', 'O', 6);
export const saoDuongPhu = () => createSao(77, 'Đường Phù', 'M', 4);
export const saoDaoHoa = () => createSao(78, 'Đào Hoa', 'M', 8);
export const saoHongLoan = () => createSao(79, 'Hồng Loan', 'T', 8);
export const saoThienHy = () => createSao(80, 'Thiên Hỷ', 'T', 5);
export const saoThienGiai = () => createSao(81, 'Thiên Giải', 'H', 5);
export const saoDiaGiai = () => createSao(82, 'Địa Giải', 'O', 5);
export const saoGiaiThan = () => createSao(83, 'Giải Thần', 'M', 5);
export const saoThaiPhu = () => createSao(84, 'Thai Phụ', 'K', 6);
export const saoPhongCao = () => createSao(85, 'Phong Cáo', 'O', 4);
export const saoThienTai = () => createSao(86, 'Thiên Tài', 'O', 2);
export const saoThienTho = () => createSao(87, 'Thiên Thọ', 'O', 5);
export const saoThienThuong = () => createSao(88, 'Thiên Thương', 'O', 12);
export const saoThienSu = () => createSao(89, 'Thiên Sứ', 'T', 12);
export const saoThienLa = () => createSao(90, 'Thiên La', 'O', 12);
export const saoDiaVong = () => createSao(91, 'Địa Võng', 'O', 12);
export const saoHoaKhoa = () => createSao(92, 'Hóa Khoa', 'T', 5);
export const saoHoaQuyen = () => createSao(93, 'Hóa Quyền', 'T', 4);
export const saoHoaLoc = () => createSao(94, 'Hóa Lộc', 'M', 3);
export const saoHoaKy = () => createSao(95, 'Hóa Kỵ', 'T', 13);
export const saoCoThan = () => createSao(96, 'Cô Thần', 'O', 13);
export const saoQuaTu = () => createSao(97, 'Quả Tú', 'O', 13);
export const saoThienMa = () => createSao(98, 'Thiên Mã', 'H', 3);
export const saoPhaToai = () => createSao(99, 'Phá Toái', 'H', 12);
export const saoThienQuan = () => createSao(100, 'Thiên Quan', 'H', 5);
export const saoThienPhuc = () => createSao(101, 'Thiên Phúc', 'H', 5);
export const saoLuuHa = () => createSao(102, 'Lưu Hà', 'T', 12);
export const saoThienTru = () => createSao(103, 'Thiên Trù', 'O', 5);
export const saoKiepSat = () => createSao(104, 'Kiếp Sát', 'H', 11);
export const saoHoaCai = () => createSao(105, 'Hoa Cái', 'K', 14);
export const saoVanTinh = () => createSao(106, 'Văn Tinh', 'H', 6);
export const saoDauQuan = () => createSao(107, 'Đẩu Quân', 'H', 5);
export const saoThienKhong = () => createSao(108, 'Thiên Không', 'T', 11);

// Đắc Tính matrix for stars
const DAC_TINH_MATRIX: Record<number, (string | null)[]> = {
  1: [null, 'B', 'D', 'M', 'B', 'V', 'M', 'M', 'D', 'M', 'B', 'V', 'B'],
  2: [null, 'V', 'D', 'V', 'H', 'M', 'H', 'V', 'D', 'V', 'H', 'M', 'H'],
  3: [null, 'V', 'H', 'M', 'D', 'H', 'D', 'H', 'H', 'M', 'H', 'H', 'D'],
  4: [null, 'V', 'M', 'V', 'D', 'M', 'H', 'V', 'M', 'V', 'D', 'M', 'H'],
  5: [null, 'H', 'D', 'V', 'V', 'V', 'M', 'M', 'D', 'H', 'H', 'H', 'H'],
  6: [null, 'D', 'D', 'H', 'M', 'M', 'V', 'D', 'D', 'V', 'M', 'M', 'H'],
  8: [null, 'V', 'D', 'H', 'H', 'H', 'H', 'H', 'D', 'V', 'M', 'M', 'M'],
  9: [null, 'H', 'M', 'D', 'H', 'V', 'H', 'H', 'M', 'D', 'H', 'V', 'H'],
  10: [null, 'V', 'H', 'V', 'M', 'H', 'H', 'V', 'H', 'D', 'M', 'H', 'D'],
  11: [null, 'V', 'D', 'M', 'H', 'V', 'D', 'V', 'D', 'M', 'H', 'V', 'D'],
  12: [null, 'V', 'D', 'V', 'V', 'M', 'H', 'M', 'D', 'V', 'H', 'M', 'H'],
  13: [null, 'M', 'D', 'M', 'H', 'H', 'V', 'M', 'D', 'M', 'H', 'H', 'V'],
  14: [null, 'M', 'V', 'H', 'H', 'D', 'H', 'M', 'V', 'H', 'H', 'D', 'H'],
};

export function applyDacTinh(sao: Sao, cungSo: number): Sao {
  const matrix = DAC_TINH_MATRIX[sao.saoID];
  if (matrix && matrix[cungSo]) {
    return { ...sao, saoDacTinh: matrix[cungSo] as Sao['saoDacTinh'] };
  }
  return sao;
}
