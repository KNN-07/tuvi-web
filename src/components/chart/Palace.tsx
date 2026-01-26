import type { Cung } from '../../types/chart';
import { Star } from './Star';

interface Props {
  cung: Cung;
  isHighlighted: boolean;
  onClick: () => void;
  showLuuStars?: boolean;
}

export function Palace({ cung, isHighlighted, onClick, showLuuStars = true }: Props) {
  const regularStars = cung.cungSao.filter(s => !s.isLuu);
  const luuStars = showLuuStars ? cung.cungSao.filter(s => s.isLuu) : [];
  
  const chinhTinh = regularStars.filter(s => s.saoLoai === 1);
  const phuTinhTot = regularStars.filter(s => s.vongTrangSinh === 0 && s.saoLoai !== 1 && s.saoLoai < 10);
  const phuTinhXau = regularStars.filter(s => s.vongTrangSinh === 0 && s.saoLoai !== 1 && s.saoLoai >= 10);
  const trangSinh = regularStars.find(s => s.vongTrangSinh === 1);

  // Background color logic based on state
  const bgClass = isHighlighted 
    ? 'bg-amber-50 ring-2 ring-inset ring-amber-400' 
    : 'bg-white hover:bg-stone-50';

  return (
    <div
      onClick={onClick}
      className={`h-full flex flex-col p-2 cursor-pointer transition-colors duration-200 select-none ${bgClass}`}
    >
      {/* Header: Name & Dai Han */}
      <div className="flex justify-between items-start border-b border-stone-100 pb-1 mb-1">
        <div className="flex flex-col items-center min-w-[30px]">
           <span className="font-bold text-lg leading-none font-serif text-stone-800">{cung.cungTen}</span>
           {/* Cung Than Badge */}
           {cung.cungThan && (
             <span className="mt-0.5 bg-red-800 text-white text-[9px] px-1.5 py-[1px] rounded-full uppercase tracking-wider font-bold shadow-sm">
               Thân
             </span>
           )}
        </div>
        
        {/* Cung Chu (Can Chi of Palace) */}
        {cung.cungChu && (
           <div className="flex-1 text-center opacity-20 font-serif font-bold text-3xl pointer-events-none select-none">
              {cung.cungChu}
           </div>
        )}
        
        <div className="font-mono font-bold text-stone-400 text-lg leading-none">{cung.cungDaiHan}</div>
      </div>

      {/* Main Content - Stars */}
      <div className="flex-1 overflow-hidden flex flex-col gap-1">
        
        {/* Chinh Tinh */}
        <div className="flex flex-wrap gap-x-2 gap-y-0.5 min-h-[24px]">
          {chinhTinh.map((sao, i) => (
            <div key={i}><Star sao={sao} isChinhTinh /></div>
          ))}
          {chinhTinh.length === 0 && (
             <span className="text-stone-300 italic text-xs w-full text-center py-1">Vô Chính Diệu</span>
          )}
        </div>

        {/* Phu Tinh - Tot & Xau split or mixed? Traditional is often mixed or split L/R */}
        <div className="flex gap-2 text-[11px] leading-tight flex-1">
          {/* Left Column: Good Stars */}
          <div className="flex-1 flex flex-col gap-0.5">
            {phuTinhTot.slice(0, 8).map((sao, i) => (
              <div key={i}><Star sao={sao} /></div>
            ))}
            {phuTinhTot.length > 8 && <span className="text-stone-400 text-[9px]">+...</span>}
          </div>
          
          {/* Right Column: Bad Stars */}
          <div className="flex-1 flex flex-col gap-0.5 items-end text-right">
            {phuTinhXau.slice(0, 8).map((sao, i) => (
              <div key={i}><Star sao={sao} /></div>
            ))}
            {phuTinhXau.length > 8 && <span className="text-stone-400 text-[9px]">+...</span>}
          </div>
        </div>

        {/* Luu Stars Section */}
        {luuStars.length > 0 && (
          <div className="pt-1 border-t border-dashed border-red-100 mt-auto">
            <div className="flex flex-wrap justify-center gap-x-2 gap-y-0.5 text-[10px]">
              {luuStars.map((sao, i) => (
                <span key={i}><Star sao={sao} /></span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer info: Tieu Han, Trang Sinh, Am Duong */}
      <div className="mt-1 pt-1 border-t border-stone-100 flex justify-between items-end text-[10px] text-stone-500 font-medium relative">
         {/* Tuan/Triet Overlay Badges - positioned absolutely or strictly? 
             Let's put them absolute near bottom corners or inline if space permits.
             Using absolute for distinct look.
         */}
         <div className="absolute bottom-4 right-0 flex flex-col items-end pointer-events-none opacity-90">
            {cung.trietLo && <span className="bg-stone-800 text-white px-1.5 py-[1px] rounded text-[9px] uppercase font-bold mb-0.5 shadow-sm">Triệt</span>}
            {cung.tuanTrung && <span className="bg-stone-500 text-white px-1.5 py-[1px] rounded text-[9px] uppercase font-bold shadow-sm">Tuần</span>}
         </div>

         <div className="font-mono text-stone-600">{cung.cungTieuHan}</div>
         
         <div className={`${trangSinh?.cssSao} uppercase font-bold tracking-tight text-[9px]`}>
            {trangSinh?.saoTen}
         </div>

         <div className="flex flex-col items-end leading-none">
            <span className="text-[9px] opacity-70">{cung.cungAmDuong === -1 ? '(-)' : '(+)'}</span>
            <span className="font-bold">{cung.hanhCung}</span>
         </div>
      </div>
    </div>
  );
}
