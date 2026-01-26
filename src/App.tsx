import { useState } from 'react';
import type { BirthInfo, ChartData } from './types/chart';
import { BirthInfoForm } from './components/form/BirthInfoForm';
import { ChartGrid } from './components/chart/ChartGrid';
import { LLMExportModal } from './components/export/LLMExportModal';
import { calculateChart } from './lib/tuvi';

export default function App() {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showLuuStars, setShowLuuStars] = useState(true);

  const handleSubmit = (birthInfo: BirthInfo) => {
    try {
      const data = calculateChart(birthInfo);
      setChartData(data);
    } catch (error) {
      console.error('Lỗi khi tính lá số:', error);
      alert('Có lỗi xảy ra khi tính lá số. Vui lòng kiểm tra lại thông tin.');
    }
  };

  const handleExport = () => {
    setShowExportModal(true);
  };

  const handleCloseModal = () => {
    setShowExportModal(false);
  };

  const handleReset = () => {
    setChartData(null);
    setShowExportModal(false);
  };

  return (
    <div className="min-h-screen py-8 px-4 flex flex-col items-center">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <header className="mb-10 text-center fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-red-900 mb-2 font-serif tracking-wide uppercase drop-shadow-sm">
            Lá Số Tử Vi
          </h1>
          <div className="h-1 w-24 bg-red-800 mx-auto rounded-full opacity-80 mb-2"></div>
          <p className="text-stone-600 italic">Luận giải vận mệnh - Khám phá huyền cơ</p>
        </header>

        <main className="fade-in" style={{ animationDelay: '0.1s' }}>
          {!chartData ? (
            <div className="max-w-2xl mx-auto transform transition-all hover:scale-[1.01] duration-500">
              <BirthInfoForm onSubmit={handleSubmit} />
            </div>
          ) : (
            <div className="animate-in fade-in zoom-in duration-500">
              {/* Reset button - Moved to top left or integrated better? Keeping simple for now but styled */}
              <div className="flex justify-between items-center mb-6 px-4 md:px-0">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 text-stone-600 hover:text-red-800 transition-colors font-medium group"
                >
                  <span className="group-hover:-translate-x-1 transition-transform">←</span> Lập lá số mới
                </button>
                
                {/* Mobile-friendly controls placeholder if needed */}
              </div>

              <ChartGrid
                chartData={chartData}
                onExport={handleExport}
                showLuuStars={showLuuStars}
                onToggleLuuStars={() => setShowLuuStars(!showLuuStars)}
              />

              <LLMExportModal
                chartData={chartData}
                isOpen={showExportModal}
                onClose={handleCloseModal}
                showLuuStars={showLuuStars}
              />
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="text-center text-stone-500 text-sm mt-16 pb-8 border-t border-stone-200 pt-8">
          <p>Tử Vi Web © {new Date().getFullYear()} • Phiên bản tĩnh</p>
          <p className="text-xs mt-1 text-stone-400">Kiến tạo với sự trân trọng văn hóa phương Đông</p>
        </footer>
      </div>
    </div>
  );
}
