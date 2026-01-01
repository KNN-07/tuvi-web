import type { ThienBan } from '../../types/chart';

interface Props {
  thienBan: ThienBan;
  onClear: () => void;
}

export function CenterPanel({ thienBan, onClear }: Props) {
  return (
    <div onClick={onClear} className="p-3 h-full bg-white border border-gray-400 text-sm cursor-pointer">
      <div className="text-center font-bold mb-2">Ngày xem: {thienBan.today}</div>
      
      <div className="grid grid-cols-3 gap-1 mb-1">
        <span className="font-bold">Họ tên</span>
        <span className="col-span-2">{thienBan.ten}</span>
      </div>
      
      <div className="grid grid-cols-3 gap-1 mb-1">
        <span className="font-bold">Bát tự</span>
        <span className="col-span-2">
          Năm {thienBan.canNamTen} {thienBan.chiNamTen}, tháng {thienBan.canThang} {thienBan.chiThang}, 
          ngày {thienBan.canNgay} {thienBan.chiNgay}, giờ {thienBan.gioSinh}
        </span>
      </div>
      
      <div className="grid grid-cols-3 gap-1 mb-1">
        <span className="font-bold">Tuổi</span>
        <span className="col-span-2">{thienBan.amDuongNamSinh} {thienBan.namNu} ({thienBan.amDuongMenh})</span>
      </div>
      
      <div className="grid grid-cols-3 gap-1 mb-1">
        <span className="font-bold">Ngày sinh</span>
        <span className="col-span-2">
          <div>{thienBan.ngayAm}/{thienBan.thangAm}/{thienBan.canNamTen} {thienBan.chiNamTen} (Âm lịch)</div>
          <div>{thienBan.ngayDuong}/{thienBan.thangDuong}/{thienBan.namDuong} (Dương lịch)</div>
        </span>
      </div>
      
      <div className="grid grid-cols-3 gap-1 mb-1">
        <span className="font-bold">Bản mệnh</span>
        <span className="col-span-2">{thienBan.banMenh}</span>
      </div>
      
      <div className="grid grid-cols-3 gap-1 mb-1">
        <span className="font-bold">Cục</span>
        <span className="col-span-2">{thienBan.tenCuc}</span>
      </div>
      
      <div className="grid grid-cols-3 gap-1 mb-1">
        <span className="font-bold">Mệnh chủ</span>
        <span className="col-span-2">{thienBan.menhChu}</span>
      </div>
      
      <div className="grid grid-cols-3 gap-1 mb-1">
        <span className="font-bold">Thân chủ</span>
        <span className="col-span-2">{thienBan.thanChu}</span>
      </div>
      
      <div className="text-center font-bold mt-2">{thienBan.sinhKhac}</div>
      
      <div className="mt-3 text-xs">
        <div className="flex justify-center gap-3">
          <span>Màu sắc:</span>
          <span className="hanhKim font-bold">Kim</span>
          <span className="hanhThuy font-bold">Thủy</span>
          <span className="hanhHoa font-bold">Hỏa</span>
          <span className="hanhTho font-bold">Thổ</span>
          <span className="hanhMoc font-bold">Mộc</span>
        </div>
      </div>
    </div>
  );
}
