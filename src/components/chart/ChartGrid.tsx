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
 * 
 * Layout:
 *   Tỵ(6)   Ngọ(7)   Mùi(8)   Thân(9)
 *   Thìn(5) [CENTER PANEL]    Dậu(10)
 *   Mão(4)  [SPANS 2x2  ]     Tuất(11)
 *   Dần(3)  Sửu(2)   Tý(1)    Hợi(12)
 * 
 * Note: cungSo is 1-based, maps to Địa Chi:
 * 1=Tý, 2=Sửu, 3=Dần, 4=Mão, 5=Thìn, 6=Tỵ, 7=Ngọ, 8=Mùi, 9=Thân, 10=Dậu, 11=Tuất, 12=Hợi
 */
export function ChartGrid({ chartData, onExport, showLuuStars, onToggleLuuStars }: Props) {
  const { isHighlighted, handlePalaceClick, clearHighlight } = useHighlight();
  
  const getCung = (cungSo: number) => {
    return chartData.thapNhiCung.find(c => c.cungSo === cungSo)!;
  };

  // Grid positions mapping
  // CSS Grid uses row-start/col-start positioning
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
    <div className="w-full max-w-5xl mx-auto">
      {/* Action buttons */}
      <div className="flex justify-end gap-2 mb-2">
        {chartData.luuNien && (
          <button
            onClick={() => onToggleLuuStars()}
            className={`px-4 py-2 rounded font-medium ${
              showLuuStars
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-gray-300 hover:bg-gray-400 text-gray-700'
            }`}
          >
            {showLuuStars ? 'Ẩn' : 'Hiện'} sao Lưu {chartData.luuNien.nam}
          </button>
        )}
        <button
          onClick={onExport}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium"
        >
          Xuất cho AI
        </button>
      </div>

      {/* Grid Container */}
      <div
        className="grid border-2 border-gray-600"
        style={{
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridTemplateRows: 'repeat(4, minmax(180px, auto))',
        }}
      >
        {/* 12 Palaces */}
        {gridPositions.map(({ cungSo, gridArea }) => {
          const cung = getCung(cungSo);
          return (
            <div key={cungSo} style={{ gridArea }}>
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
        <div style={{ gridArea: '2 / 2 / 4 / 4' }}>
          <CenterPanel thienBan={chartData.thienBan} luuNien={chartData.luuNien} onClear={clearHighlight} />
        </div>
      </div>

      {/* Instructions */}
      <div className="text-center text-sm text-gray-600 mt-2">
        Nhấn vào cung để xem Tam Hợp/Xung Chiếu. Nhấn vào trung tâm để bỏ chọn.
      </div>
    </div>
  );
}
