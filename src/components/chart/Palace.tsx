import type { Cung } from '../../types/chart';
import { Star } from './Star';

interface Props {
  cung: Cung;
  isHighlighted: boolean;
  onClick: () => void;
}

export function Palace({ cung, isHighlighted, onClick }: Props) {
  const chinhTinh = cung.cungSao.filter(s => s.saoLoai === 1);
  const phuTinhTot = cung.cungSao.filter(s => s.vongTrangSinh === 0 && s.saoLoai !== 1 && s.saoLoai < 10);
  const phuTinhXau = cung.cungSao.filter(s => s.vongTrangSinh === 0 && s.saoLoai !== 1 && s.saoLoai >= 10);
  const trangSinh = cung.cungSao.find(s => s.vongTrangSinh === 1);

  return (
    <div
      onClick={onClick}
      className={`border border-gray-400 p-1 cursor-pointer text-xs h-full flex flex-col
        ${isHighlighted ? 'bg-amber-100' : 'bg-white hover:bg-gray-50'}`}
    >
      {/* Top row */}
      <div className="flex justify-between border-b pb-1 mb-1">
        <span className="font-medium">{cung.cungTen}</span>
        <span className="text-center flex-1">
          {cung.cungChu && <span className="uppercase font-bold">{cung.cungChu}</span>}
          {cung.cungThan && <span className="ml-1 bg-red-800 text-white px-1 rounded text-[10px]">Thân</span>}
        </span>
        <span className="text-gray-600">{cung.cungDaiHan}</span>
      </div>

      {/* Middle - Stars */}
      <div className="flex-1 overflow-hidden">
        {/* Chinh Tinh */}
        <div className="mb-1 min-h-[20px]">
          {chinhTinh.map((sao, i) => (
            <div key={i}><Star sao={sao} isChinhTinh /></div>
          ))}
        </div>

        {/* Phu Tinh */}
        <div className="flex gap-1 text-[10px]">
          <div className="flex-1">
            {phuTinhTot.slice(0, 6).map((sao, i) => (
              <div key={i}><Star sao={sao} /></div>
            ))}
          </div>
          <div className="flex-1 text-right">
            {phuTinhXau.slice(0, 6).map((sao, i) => (
              <div key={i}><Star sao={sao} /></div>
            ))}
          </div>
        </div>
      </div>

      {/* Tuan/Triet badges */}
      {(cung.tuanTrung || cung.trietLo) && (
        <div className="text-center py-1">
          {cung.trietLo && <span className="bg-gray-800 text-white px-1 rounded text-[10px] mr-1">Triệt</span>}
          {cung.tuanTrung && <span className="bg-yellow-900 text-white px-1 rounded text-[10px]">Tuần</span>}
        </div>
      )}

      {/* Bottom row */}
      <div className="flex justify-between border-t pt-1 mt-1 text-[10px]">
        <span>{cung.cungTieuHan}</span>
        <span className={trangSinh?.cssSao}>{trangSinh?.saoTen}</span>
        <span>{cung.cungAmDuong === -1 ? '-' : '+'}{cung.hanhCung}</span>
      </div>
    </div>
  );
}
