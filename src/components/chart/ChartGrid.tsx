import type { ChartData } from '../../types/chart';
import { Palace } from './Palace';
import { CenterPanel } from './CenterPanel';
import { useHighlight } from '../../hooks/useHighlight';

interface Props {
  chartData: ChartData;
  onExport: () => void;
  showLuuStars: boolean;
  onToggleLuuStars: () => void;
}

/**
 * Traditional 12-Palace Grid Layout (4x4 with center 2x2)
 */
export function ChartGrid({ chartData, onExport, showLuuStars, onToggleLuuStars }: Props) {
  const { isHighlighted, handlePalaceClick, clearHighlight } = useHighlight();
  
  const getCung = (cungSo: number) => {
    return chartData.thapNhiCung.find(c => c.cungSo === cungSo)!;
  };

  // Grid positions mapping
  const gridPositions: { cungSo: number; gridArea: string }[] = [
    // Top row: Tỵ, Ngọ, Mùi, Thân
    { cungSo: 6, gridArea: '1 / 1 / 2 / 2' },
    { cungSo: 7, gridArea: '1 / 2 / 2 / 3' },
    { cungSo: 8, gridArea: '1 / 3 / 2 / 4' },
    { cungSo: 9, gridArea: '1 / 4 / 2 / 5' },
    // Left column: Thìn, Mão
    { cungSo: 5, gridArea: '2 / 1 / 3 / 2' },
    { cungSo: 4, gridArea: '3 / 1 / 4 / 2' },
    // Right column: Dậu, Tuất
    { cungSo: 10, gridArea: '2 / 4 / 3 / 5' },
    { cungSo: 11, gridArea: '3 / 4 / 4 / 5' },
    // Bottom row: Dần, Sửu, Tý, Hợi
    { cungSo: 3, gridArea: '4 / 1 / 5 / 2' },
    { cungSo: 2, gridArea: '4 / 2 / 5 / 3' },
    { cungSo: 1, gridArea: '4 / 3 / 5 / 4' },
    { cungSo: 12, gridArea: '4 / 4 / 5 / 5' },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-4">
      {/* Action buttons */}
      <div className="flex justify-end gap-3 print:hidden">
        {chartData.luuNien && (
          <button
            onClick={() => onToggleLuuStars()}
            className={`btn-secondary text-sm ${showLuuStars ? 'bg-red-50 text-red-800 border-red-200' : ''}`}
          >
            {showLuuStars ? '👁️ Đang hiện' : '👁️‍🗨️ Đang ẩn'} sao Lưu {chartData.luuNien.nam}
          </button>
        )}
        <button
          onClick={onExport}
          className="btn-primary text-sm flex items-center gap-2"
        >
          <span>🤖</span> Luận giải AI
        </button>
      </div>

      {/* Grid Container */}
      <div className="relative p-1 bg-stone-300 rounded-lg shadow-xl overflow-hidden border border-stone-400">
        <div
          className="grid gap-[1px] bg-stone-300"
          style={{
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridTemplateRows: 'repeat(4, minmax(200px, auto))',
          }}
        >
          {/* 12 Palaces */}
          {gridPositions.map(({ cungSo, gridArea }) => {
            const cung = getCung(cungSo);
            return (
              <div key={cungSo} style={{ gridArea }} className="bg-white h-full relative group overflow-hidden">
                <Palace
                  cung={cung}
                  isHighlighted={isHighlighted(cungSo)}
                  onClick={() => handlePalaceClick(cungSo)}
                  showLuuStars={showLuuStars}
                />
              </div>
            );
          })}

          {/* Center Panel (spans 2x2) */}
          <div style={{ gridArea: '2 / 2 / 4 / 4' }} className="bg-stone-50 z-10 shadow-inner">
            <CenterPanel thienBan={chartData.thienBan} luuNien={chartData.luuNien} onClear={clearHighlight} />
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="text-center text-sm text-stone-500 italic mt-2 print:hidden">
        * Nhấn vào từng cung để xem Tam Hợp, Xung Chiếu. Nhấn vào trung tâm để bỏ chọn.
      </div>
    </div>
  );
}
