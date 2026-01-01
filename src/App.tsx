import { useState } from 'react';
import type { BirthInfo, ChartData } from './types/chart';
import { BirthInfoForm } from './components/form/BirthInfoForm';
import { ChartGrid } from './components/chart/ChartGrid';
import { LLMExportModal } from './components/export/LLMExportModal';
import { calculateChart } from './lib/tuvi';

export default function App() {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [showExportModal, setShowExportModal] = useState(false);

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
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center mb-6 text-red-800">
          Lá Số Tử Vi
        </h1>

        {!chartData ? (
          /* Birth Info Form */
          <div className="max-w-2xl mx-auto">
            <BirthInfoForm onSubmit={handleSubmit} />
          </div>
        ) : (
          /* Chart Display */
          <div>
            {/* Reset button */}
            <div className="flex justify-center mb-4">
              <button
                onClick={handleReset}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
              >
                Lập lá số mới
              </button>
            </div>

            {/* Chart Grid */}
            <ChartGrid chartData={chartData} onExport={handleExport} />

            {/* Export Modal */}
            <LLMExportModal
              chartData={chartData}
              isOpen={showExportModal}
              onClose={handleCloseModal}
            />
          </div>
        )}

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 mt-8">
          Tử Vi Web - Phiên bản tĩnh
        </div>
      </div>
    </div>
  );
}
