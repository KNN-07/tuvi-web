import type { ThienBan, LuuNien } from '../../types/chart';

interface Props {
  thienBan: ThienBan;
  luuNien?: LuuNien;
  onClear: () => void;
}

export function CenterPanel({ thienBan, luuNien, onClear }: Props) {
  return (
    <div onClick={onClear} className="h-full flex flex-col items-center justify-center p-6 cursor-pointer relative overflow-hidden group">
      {/* Background Decor - Yin Yang suggestion */}
      <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
         <div className="w-64 h-64 border-8 border-stone-900 rounded-full"></div>
      </div>
      
      {/* Title */}
      <h3 className="text-xl font-bold text-red-900 uppercase tracking-widest mb-4 border-b-2 border-red-800/20 pb-1">
        Thiên Bàn
      </h3>

      <div className="w-full max-w-md space-y-3 text-sm text-stone-800">
        {/* Name & Date */}
        <div className="text-center mb-4">
          <div className="text-2xl font-bold text-stone-900 mb-1 font-serif">{thienBan.ten}</div>
          <div className="text-stone-500 text-xs uppercase tracking-wide">Ngày lập: {thienBan.today}</div>
        </div>

        {/* Info Grid */}
        <div className="bg-white/60 p-4 rounded-lg border border-stone-200 shadow-sm backdrop-blur-sm">
           <div className="grid grid-cols-2 gap-x-6 gap-y-2">
              <div className="flex justify-between border-b border-stone-100 pb-1">
                 <span className="text-stone-500">Giới tính</span>
                 <span className="font-medium">{thienBan.namNu}</span>
              </div>
              <div className="flex justify-between border-b border-stone-100 pb-1">
                 <span className="text-stone-500">Bản mệnh</span>
                 <span className="font-medium text-red-800">{thienBan.banMenh}</span>
              </div>
              <div className="flex justify-between border-b border-stone-100 pb-1">
                 <span className="text-stone-500">Cục</span>
                 <span className="font-medium text-red-800">{thienBan.tenCuc}</span>
              </div>
              <div className="flex justify-between border-b border-stone-100 pb-1">
                 <span className="text-stone-500">Mệnh chủ</span>
                 <span className="font-medium">{thienBan.menhChu}</span>
              </div>
              <div className="flex justify-between border-b border-stone-100 pb-1">
                 <span className="text-stone-500">Thân chủ</span>
                 <span className="font-medium">{thienBan.thanChu}</span>
              </div>
               <div className="flex justify-between border-b border-stone-100 pb-1">
                 <span className="text-stone-500">Âm Dương</span>
                 <span className="font-medium">{thienBan.amDuongNamSinh}</span>
              </div>
           </div>
        </div>

        {/* Date Details */}
        <div className="text-center space-y-1 py-2">
            <div className="font-medium">
               <span className="text-stone-500">Âm lịch: </span>
               {thienBan.ngayAm}/{thienBan.thangAm}/{thienBan.canNamTen} {thienBan.chiNamTen}
            </div>
            <div className="text-xs text-stone-500">
              (Dương lịch: {thienBan.ngayDuong}/{thienBan.thangDuong}/{thienBan.namDuong} - {thienBan.gioSinh})
            </div>
        </div>

        {/* Bát Tự */}
        <div className="flex justify-center gap-2 text-xs font-mono bg-stone-100 py-2 rounded border border-stone-200">
           <div className="px-2 border-r border-stone-300">
             <div className="text-stone-400 text-[10px] uppercase">Năm</div>
             <div className="font-bold">{thienBan.canNamTen} {thienBan.chiNamTen}</div>
           </div>
           <div className="px-2 border-r border-stone-300">
             <div className="text-stone-400 text-[10px] uppercase">Tháng</div>
             <div className="font-bold">{thienBan.canThang} {thienBan.chiThang}</div>
           </div>
           <div className="px-2 border-r border-stone-300">
             <div className="text-stone-400 text-[10px] uppercase">Ngày</div>
             <div className="font-bold">{thienBan.canNgay} {thienBan.chiNgay}</div>
           </div>
           <div className="px-2">
             <div className="text-stone-400 text-[10px] uppercase">Giờ</div>
             <div className="font-bold">{thienBan.gioSinh}</div>
           </div>
        </div>

        {/* Sinh Khac & Colors */}
        <div className="text-center pt-2">
           <div className="font-bold text-red-700 mb-2">{thienBan.sinhKhac}</div>
           
           {/* Wu Xing Colors Legend */}
           <div className="flex justify-center gap-3 text-xs bg-white/50 py-1 px-3 rounded-full inline-flex border border-stone-100">
            <span className="hanhKim font-bold flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-current opacity-70"></span>Kim</span>
            <span className="hanhMoc font-bold flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-current opacity-70"></span>Mộc</span>
            <span className="hanhThuy font-bold flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-current opacity-70"></span>Thủy</span>
            <span className="hanhHoa font-bold flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-current opacity-70"></span>Hỏa</span>
            <span className="hanhTho font-bold flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-current opacity-70"></span>Thổ</span>
          </div>
        </div>

        {luuNien && (
          <div className="mt-3 text-center animate-pulse">
            <div className="inline-block bg-red-100 text-red-800 px-4 py-1 rounded-full text-sm font-bold border border-red-200">
               Lưu Niên: Năm {luuNien.nam} ({luuNien.canTen} {luuNien.chiTen})
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
