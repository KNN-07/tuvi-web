// Main Tu Vi chart calculation engine (ported from App.py)
import type { BirthInfo, ChartData, Cung, Sao, ThienBan } from '../types/chart';
import { THIEN_CAN, DIA_CHI, HANH_CUNG } from '../utils/constants';
import { solarToLunar, jdFromDate } from './calendar';
import {
  dichCung, khoangCachCung, nguHanh, nguHanhNapAm, timCuc, timTuVi,
  timTrangSinh, timHoaLinh, timThienKhoi, timThienQuanThienPhuc,
  timCoThan, timThienMa, timPhaToai, timTriet, timLuuTru,
  ngayThangNamCanChi, canChiNgay, sinhKhac
} from './amduong';
import * as SAO from './sao';

// Create empty palace
function createCung(cungSo: number): Cung {
  const diaChi = DIA_CHI[cungSo];
  return {
    cungSo,
    cungTen: diaChi?.tenChi || '',
    hanhCung: HANH_CUNG[cungSo] || '',
    cungAmDuong: cungSo % 2 === 0 ? -1 : 1,
    cungThan: false,
    cungDaiHan: 0,
    cungTieuHan: '',
    cungSao: [],
  };
}

// Add star to palace
function addSao(cungs: Cung[], cungSo: number, ...saos: Sao[]): void {
  for (const sao of saos) {
    const saoWithDacTinh = SAO.applyDacTinh(sao, cungSo);
    cungs[cungSo].cungSao.push(saoWithDacTinh);
  }
}

// Main chart calculation
export function calculateChart(input: BirthInfo): ChartData {
  const { hoTen, ngaySinh, thangSinh, namSinh, gioSinh, gioiTinh, amLich, muiGio } = input;
  const gioiTinhNum = gioiTinh === 'nam' ? 1 : -1;
  
  // Convert to lunar if needed
  let ngayAm: number, thangAm: number, namAm: number;
  if (!amLich) {
    [ngayAm, thangAm, namAm] = solarToLunar(ngaySinh, thangSinh, namSinh, muiGio);
  } else {
    ngayAm = ngaySinh;
    thangAm = thangSinh;
    namAm = namSinh;
  }
  
  // Calculate Can Chi
  const { canThang, canNam, chiNam } = ngayThangNamCanChi(ngayAm, thangAm, namAm);
  const { canNgay, chiNgay } = canChiNgay(
    amLich ? ngaySinh : ngaySinh,
    amLich ? thangSinh : thangSinh,
    amLich ? namSinh : namSinh
  );
  
  const amDuongNamSinh = THIEN_CAN[canNam]?.amDuong || 1;
  const amDuongChiNamSinh = DIA_CHI[chiNam]?.amDuong || 1;
  
  // Initialize 12 palaces
  const thapNhiCung: Cung[] = Array(13).fill(null).map((_, i) => createCung(i));
  
  // Calculate Cung Menh and Cung Than
  const cungThan = dichCung(3, thangAm - 1, gioSinh - 1);
  const cungMenh = dichCung(3, thangAm - 1, -(gioSinh) + 1);
  thapNhiCung[cungThan].cungThan = true;
  
  // Set Cung Chu (palace names)
  const cungChuNames = ['Mệnh', 'Phụ Mẫu', 'Phúc Đức', 'Điền Trạch', 'Quan Lộc', 'Nô Bộc',
                        'Thiên Di', 'Tật Ách', 'Tài Bạch', 'Tử Tức', 'Phu Thê', 'Huynh Đệ'];
  for (let i = 0; i < 12; i++) {
    const cungSo = dichCung(cungMenh, i);
    thapNhiCung[cungSo].cungChu = cungChuNames[i];
  }
  
  // Calculate Cuc
  const hanhCuc = timCuc(cungMenh, canNam);
  const cuc = nguHanh(hanhCuc);
  const cucSo = cuc.cuc;
  
  // Nhap Dai Han
  const chieuDaiHan = gioiTinhNum * amDuongChiNamSinh;
  for (let i = 1; i <= 12; i++) {
    const khoangCach = khoangCachCung(i, cungMenh, chieuDaiHan);
    thapNhiCung[i].cungDaiHan = cucSo + khoangCach * 10;
  }
  
  // Nhap Tieu Han
  const khoiTieuHan = dichCung(11, -3 * (chiNam - 1));
  const viTriCungTy1 = dichCung(khoiTieuHan, -gioiTinhNum * (chiNam - 1));
  for (let i = 1; i <= 12; i++) {
    const khoangCach = khoangCachCung(i, viTriCungTy1, gioiTinhNum);
    thapNhiCung[i].cungTieuHan = DIA_CHI[khoangCach + 1]?.tenChi || '';
  }
  
  // An Tu Vi tinh he
  const viTriTuVi = timTuVi(cucSo, ngayAm);
  addSao(thapNhiCung, viTriTuVi, SAO.saoTuVi());
  
  const viTriLiemTrinh = dichCung(viTriTuVi, 4);
  addSao(thapNhiCung, viTriLiemTrinh, SAO.saoLiemTrinh());
  
  const viTriThienDong = dichCung(viTriTuVi, 7);
  addSao(thapNhiCung, viTriThienDong, SAO.saoThienDong());
  
  const viTriVuKhuc = dichCung(viTriTuVi, 8);
  addSao(thapNhiCung, viTriVuKhuc, SAO.saoVuKhuc());
  
  const viTriThaiDuong = dichCung(viTriTuVi, 9);
  addSao(thapNhiCung, viTriThaiDuong, SAO.saoThaiDuong());
  
  const viTriThienCo = dichCung(viTriTuVi, 11);
  addSao(thapNhiCung, viTriThienCo, SAO.saoThienCo());
  
  // Thien Phu tinh he
  const viTriThienPhu = dichCung(3, 3 - viTriTuVi);
  addSao(thapNhiCung, viTriThienPhu, SAO.saoThienPhu());
  
  const viTriThaiAm = dichCung(viTriThienPhu, 1);
  addSao(thapNhiCung, viTriThaiAm, SAO.saoThaiAm());
  
  const viTriThamLang = dichCung(viTriThienPhu, 2);
  addSao(thapNhiCung, viTriThamLang, SAO.saoThamLang());
  
  const viTriCuMon = dichCung(viTriThienPhu, 3);
  addSao(thapNhiCung, viTriCuMon, SAO.saoCuMon());
  
  const viTriThienTuong = dichCung(viTriThienPhu, 4);
  addSao(thapNhiCung, viTriThienTuong, SAO.saoThienTuong());
  
  const viTriThienLuong = dichCung(viTriThienPhu, 5);
  addSao(thapNhiCung, viTriThienLuong, SAO.saoThienLuong());
  
  const viTriThatSat = dichCung(viTriThienPhu, 6);
  addSao(thapNhiCung, viTriThatSat, SAO.saoThatSat());
  
  const viTriPhaQuan = dichCung(viTriThienPhu, 10);
  addSao(thapNhiCung, viTriPhaQuan, SAO.saoPhaQuan());
  
  // Vong Loc Ton
  const viTriLocTon = THIEN_CAN[canNam]?.vitriDiaBan || 3;
  addSao(thapNhiCung, viTriLocTon, SAO.saoLocTon(), SAO.saoBacSy());
  
  const amDuongNamNu = gioiTinhNum * amDuongNamSinh;
  addSao(thapNhiCung, dichCung(viTriLocTon, 1 * amDuongNamNu), SAO.saoLucSi());
  addSao(thapNhiCung, dichCung(viTriLocTon, 2 * amDuongNamNu), SAO.saoThanhLong());
  addSao(thapNhiCung, dichCung(viTriLocTon, 3 * amDuongNamNu), SAO.saoTieuHao());
  addSao(thapNhiCung, dichCung(viTriLocTon, 4 * amDuongNamNu), SAO.saoTuongQuan());
  addSao(thapNhiCung, dichCung(viTriLocTon, 5 * amDuongNamNu), SAO.saoTauThu());
  addSao(thapNhiCung, dichCung(viTriLocTon, 6 * amDuongNamNu), SAO.saoPhiLiem());
  addSao(thapNhiCung, dichCung(viTriLocTon, 7 * amDuongNamNu), SAO.saoHyThan());
  addSao(thapNhiCung, dichCung(viTriLocTon, 8 * amDuongNamNu), SAO.saoBenhPhu());
  addSao(thapNhiCung, dichCung(viTriLocTon, 9 * amDuongNamNu), SAO.saoDaiHao());
  addSao(thapNhiCung, dichCung(viTriLocTon, 10 * amDuongNamNu), SAO.saoPhucBinh());
  addSao(thapNhiCung, dichCung(viTriLocTon, 11 * amDuongNamNu), SAO.saoQuanPhu2());
  
  // Vong Thai Tue
  addSao(thapNhiCung, chiNam, SAO.saoThaiTue());
  addSao(thapNhiCung, dichCung(chiNam, 1), SAO.saoThieuDuong(), SAO.saoThienKhong());
  addSao(thapNhiCung, dichCung(chiNam, 2), SAO.saoTangMon());
  addSao(thapNhiCung, dichCung(chiNam, 3), SAO.saoThieuAm());
  addSao(thapNhiCung, dichCung(chiNam, 4), SAO.saoQuanPhu3());
  addSao(thapNhiCung, dichCung(chiNam, 5), SAO.saoTuPhu(), SAO.saoNguyetDuc());
  addSao(thapNhiCung, dichCung(chiNam, 6), SAO.saoTuePha());
  addSao(thapNhiCung, dichCung(chiNam, 7), SAO.saoLongDuc());
  addSao(thapNhiCung, dichCung(chiNam, 8), SAO.saoBachHo());
  addSao(thapNhiCung, dichCung(chiNam, 9), SAO.saoPhucDuc(), SAO.saoThienDuc());
  addSao(thapNhiCung, dichCung(chiNam, 10), SAO.saoDieuKhach());
  addSao(thapNhiCung, dichCung(chiNam, 11), SAO.saoTrucPhu());
  
  // Vong Trang Sinh
  const viTriTrangSinh = timTrangSinh(cucSo);
  addSao(thapNhiCung, viTriTrangSinh, SAO.saoTrangSinh());
  addSao(thapNhiCung, dichCung(viTriTrangSinh, amDuongNamNu * 1), SAO.saoMocDuc());
  addSao(thapNhiCung, dichCung(viTriTrangSinh, amDuongNamNu * 2), SAO.saoQuanDoi());
  addSao(thapNhiCung, dichCung(viTriTrangSinh, amDuongNamNu * 3), SAO.saoLamQuan());
  addSao(thapNhiCung, dichCung(viTriTrangSinh, amDuongNamNu * 4), SAO.saoDeVuong());
  addSao(thapNhiCung, dichCung(viTriTrangSinh, amDuongNamNu * 5), SAO.saoSuy());
  addSao(thapNhiCung, dichCung(viTriTrangSinh, amDuongNamNu * 6), SAO.saoBenh());
  addSao(thapNhiCung, dichCung(viTriTrangSinh, amDuongNamNu * 7), SAO.saoTu());
  addSao(thapNhiCung, dichCung(viTriTrangSinh, amDuongNamNu * 8), SAO.saoMo());
  addSao(thapNhiCung, dichCung(viTriTrangSinh, amDuongNamNu * 9), SAO.saoTuyet());
  addSao(thapNhiCung, dichCung(viTriTrangSinh, amDuongNamNu * -1), SAO.saoThai());
  addSao(thapNhiCung, dichCung(viTriTrangSinh, amDuongNamNu * -2), SAO.saoDuong());
  
  // Kinh Duong, Da La
  addSao(thapNhiCung, dichCung(viTriLocTon, -1), SAO.saoDaLa());
  const viTriKinhDuong = dichCung(viTriLocTon, 1);
  addSao(thapNhiCung, viTriKinhDuong, SAO.saoKinhDuong());
  
  // Dia Khong, Dia Kiep
  const viTriDiaKiep = dichCung(11, gioSinh);
  addSao(thapNhiCung, viTriDiaKiep, SAO.saoDiaKiep());
  addSao(thapNhiCung, dichCung(12, 12 - viTriDiaKiep), SAO.saoDiaKhong());
  
  // Hoa Tinh, Linh Tinh
  const [viTriHoaTinh, viTriLinhTinh] = timHoaLinh(chiNam, gioSinh, gioiTinhNum, amDuongNamSinh);
  addSao(thapNhiCung, viTriHoaTinh, SAO.saoHoaTinh());
  addSao(thapNhiCung, viTriLinhTinh, SAO.saoLinhTinh());
  
  // Long Tri, Phuong Cac
  const viTriLongTri = dichCung(5, chiNam - 1);
  addSao(thapNhiCung, viTriLongTri, SAO.saoLongTri());
  addSao(thapNhiCung, dichCung(2, 2 - viTriLongTri), SAO.saoPhuongCac(), SAO.saoGiaiThan());
  
  // Ta Phu, Huu Bat
  const viTriTaPhu = dichCung(5, thangAm - 1);
  addSao(thapNhiCung, viTriTaPhu, SAO.saoTaPhu());
  const viTriHuuBat = dichCung(2, 2 - viTriTaPhu);
  addSao(thapNhiCung, viTriHuuBat, SAO.saoHuuBat());
  
  // Van Khuc, Van Xuong
  const viTriVanKhuc = dichCung(5, gioSinh - 1);
  addSao(thapNhiCung, viTriVanKhuc, SAO.saoVanKhuc());
  const viTriVanXuong = dichCung(2, 2 - viTriVanKhuc);
  addSao(thapNhiCung, viTriVanXuong, SAO.saoVanXuong());
  
  // Tam Thai, Bat Toa
  const viTriTamThai = dichCung(5, thangAm + ngayAm - 2);
  addSao(thapNhiCung, viTriTamThai, SAO.saoTamThai());
  addSao(thapNhiCung, dichCung(2, 2 - viTriTamThai), SAO.saoBatToa());
  
  // An Quang, Thien Quy
  const viTriAnQuang = dichCung(viTriVanXuong, ngayAm - 2);
  addSao(thapNhiCung, viTriAnQuang, SAO.saoAnQuang());
  addSao(thapNhiCung, dichCung(2, 2 - viTriAnQuang), SAO.saoThienQuy());
  
  // Thien Khoi, Thien Viet
  const viTriThienKhoi = timThienKhoi(canNam);
  addSao(thapNhiCung, viTriThienKhoi, SAO.saoThienKhoi());
  addSao(thapNhiCung, dichCung(5, 5 - viTriThienKhoi), SAO.saoThienViet());
  
  // Thien Hu, Thien Khoc
  addSao(thapNhiCung, dichCung(7, chiNam - 1), SAO.saoThienHu());
  addSao(thapNhiCung, dichCung(7, -chiNam + 1), SAO.saoThienKhoc());
  
  // Thien Tai, Thien Tho
  addSao(thapNhiCung, dichCung(cungMenh, chiNam - 1), SAO.saoThienTai());
  addSao(thapNhiCung, dichCung(cungThan, chiNam - 1), SAO.saoThienTho());
  
  // Hong Loan, Thien Hy
  const viTriHongLoan = dichCung(4, -chiNam + 1);
  addSao(thapNhiCung, viTriHongLoan, SAO.saoHongLoan());
  addSao(thapNhiCung, dichCung(viTriHongLoan, 6), SAO.saoThienHy());
  
  // Thien Quan, Thien Phuc
  const [viTriThienQuan, viTriThienPhuc] = timThienQuanThienPhuc(canNam);
  addSao(thapNhiCung, viTriThienQuan, SAO.saoThienQuan());
  addSao(thapNhiCung, viTriThienPhuc, SAO.saoThienPhuc());
  
  // Thien Hinh, Thien Rieu, Thien Y
  const viTriThienHinh = dichCung(10, thangAm - 1);
  addSao(thapNhiCung, viTriThienHinh, SAO.saoThienHinh());
  addSao(thapNhiCung, dichCung(viTriThienHinh, 4), SAO.saoThienRieu(), SAO.saoThienY());
  
  // Co Than, Qua Tu
  const viTriCoThan = timCoThan(chiNam);
  addSao(thapNhiCung, viTriCoThan, SAO.saoCoThan());
  addSao(thapNhiCung, dichCung(viTriCoThan, -4), SAO.saoQuaTu());
  
  // Van Tinh, Duong Phu, Quoc An
  const viTriVanTinh = dichCung(viTriKinhDuong, 2);
  addSao(thapNhiCung, viTriVanTinh, SAO.saoVanTinh());
  const viTriDuongPhu = dichCung(viTriVanTinh, 2);
  addSao(thapNhiCung, viTriDuongPhu, SAO.saoDuongPhu());
  addSao(thapNhiCung, dichCung(viTriDuongPhu, 3), SAO.saoQuocAn());
  
  // Thai Phu, Phong Cao
  addSao(thapNhiCung, dichCung(viTriVanKhuc, 2), SAO.saoThaiPhu());
  addSao(thapNhiCung, dichCung(viTriVanKhuc, -2), SAO.saoPhongCao());
  
  // Thien Giai, Dia Giai
  addSao(thapNhiCung, dichCung(9, 2 * thangAm - 2), SAO.saoThienGiai());
  addSao(thapNhiCung, dichCung(viTriTaPhu, 3), SAO.saoDiaGiai());
  
  // Thien La, Dia Vong
  addSao(thapNhiCung, 5, SAO.saoThienLa());
  addSao(thapNhiCung, 11, SAO.saoDiaVong());
  
  // Thien Thuong, Thien Su
  const cungNoboc = dichCung(cungMenh, 5);
  const cungTatAch = dichCung(cungMenh, 7);
  addSao(thapNhiCung, cungNoboc, SAO.saoThienThuong());
  addSao(thapNhiCung, cungTatAch, SAO.saoThienSu());
  
  // Thien Ma, Hoa Cai, Kiep Sat, Dao Hoa
  const viTriThienMa = timThienMa(chiNam);
  addSao(thapNhiCung, viTriThienMa, SAO.saoThienMa());
  addSao(thapNhiCung, dichCung(viTriThienMa, 2), SAO.saoHoaCai());
  const viTriKiepSat = dichCung(viTriThienMa, 3);
  addSao(thapNhiCung, viTriKiepSat, SAO.saoKiepSat());
  addSao(thapNhiCung, dichCung(viTriKiepSat, 4), SAO.saoDaoHoa());
  
  // Pha Toai
  addSao(thapNhiCung, timPhaToai(chiNam), SAO.saoPhaToai());
  
  // Dau Quan
  addSao(thapNhiCung, dichCung(chiNam, -thangAm + gioSinh), SAO.saoDauQuan());
  
  // Tu Hoa
  const tuHoaMap: Record<number, { loc: number; quyen: number; khoa: number; ky: number }> = {
    1: { loc: viTriLiemTrinh, quyen: viTriPhaQuan, khoa: viTriVuKhuc, ky: viTriThaiDuong },
    2: { loc: viTriThienCo, quyen: viTriThienLuong, khoa: viTriTuVi, ky: viTriThaiAm },
    3: { loc: viTriThienDong, quyen: viTriThienCo, khoa: viTriVanXuong, ky: viTriLiemTrinh },
    4: { loc: viTriThaiAm, quyen: viTriThienDong, khoa: viTriThienCo, ky: viTriCuMon },
    5: { loc: viTriThamLang, quyen: viTriThaiAm, khoa: viTriHuuBat, ky: viTriThienCo },
    6: { loc: viTriVuKhuc, quyen: viTriThamLang, khoa: viTriThienLuong, ky: viTriVanKhuc },
    7: { loc: viTriThaiDuong, quyen: viTriVuKhuc, khoa: viTriThienDong, ky: viTriThaiAm },
    8: { loc: viTriCuMon, quyen: viTriThaiDuong, khoa: viTriVanKhuc, ky: viTriVanXuong },
    9: { loc: viTriThienLuong, quyen: viTriTuVi, khoa: viTriThienPhu, ky: viTriVuKhuc },
    10: { loc: viTriPhaQuan, quyen: viTriCuMon, khoa: viTriThaiAm, ky: viTriThamLang },
  };
  const tuHoa = tuHoaMap[canNam];
  if (tuHoa) {
    addSao(thapNhiCung, tuHoa.loc, SAO.saoHoaLoc());
    addSao(thapNhiCung, tuHoa.quyen, SAO.saoHoaQuyen());
    addSao(thapNhiCung, tuHoa.khoa, SAO.saoHoaKhoa());
    addSao(thapNhiCung, tuHoa.ky, SAO.saoHoaKy());
  }
  
  // Luu Ha, Thien Tru
  const [viTriLuuHa, viTriThienTru] = timLuuTru(canNam);
  addSao(thapNhiCung, viTriLuuHa, SAO.saoLuuHa());
  addSao(thapNhiCung, viTriThienTru, SAO.saoThienTru());
  
  // Tuan, Triet
  const ketThucTuan = dichCung(chiNam, 10 - canNam);
  const viTriTuan1 = dichCung(ketThucTuan, 1);
  const viTriTuan2 = dichCung(viTriTuan1, 1);
  thapNhiCung[viTriTuan1].tuanTrung = true;
  thapNhiCung[viTriTuan2].tuanTrung = true;
  
  const [viTriTriet1, viTriTriet2] = timTriet(canNam);
  thapNhiCung[viTriTriet1].trietLo = true;
  thapNhiCung[viTriTriet2].trietLo = true;
  
  // Build Thien Ban
  const canGioSinh = ((jdFromDate(ngaySinh, thangSinh, namSinh) - 1) * 2 % 10 + gioSinh) % 10 || 10;
  const cungAmDuong = cungMenh % 2 === 1 ? 1 : -1;
  const amDuongMenh = (cungAmDuong * gioiTinhNum === 1)
    ? 'Âm dương thuận lý'
    : 'Âm dương nghịch lý';
  
  const menhHanhId = nguHanh(nguHanhNapAm(chiNam, canNam)).id;
  const sinhKhacResult = sinhKhac(menhHanhId, cuc.id);
  
  const thienBan: ThienBan = {
    ten: hoTen,
    namNu: gioiTinh === 'nam' ? 'Nam' : 'Nữ',
    gioSinh: `${THIEN_CAN[canGioSinh]?.tenCan || ''} ${DIA_CHI[gioSinh]?.tenChi || ''}`,
    ngayAm,
    thangAm,
    namAm,
    ngayDuong: ngaySinh,
    thangDuong: thangSinh,
    namDuong: namSinh,
    canNamTen: THIEN_CAN[canNam]?.tenCan || '',
    chiNamTen: DIA_CHI[chiNam]?.tenChi || '',
    canThang: THIEN_CAN[canThang]?.tenCan || '',
    chiThang: DIA_CHI[thangAm]?.tenChi || '',
    canNgay: THIEN_CAN[canNgay]?.tenCan || '',
    chiNgay: DIA_CHI[chiNgay]?.tenChi || '',
    banMenh: nguHanhNapAm(chiNam, canNam, true),
    tenCuc: cuc.tenCuc,
    menhChu: DIA_CHI[canNam]?.menhChu || '',
    thanChu: DIA_CHI[canNam]?.thanChu || '',
    amDuongNamSinh: chiNam % 2 === 1 ? 'Dương' : 'Âm',
    amDuongMenh,
    sinhKhac: sinhKhacResult,
    today: new Date().toLocaleDateString('vi-VN'),
  };
  
  return {
    thienBan,
    thapNhiCung: thapNhiCung.slice(1), // Remove index 0
  };
}
