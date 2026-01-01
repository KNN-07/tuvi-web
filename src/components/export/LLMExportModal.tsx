import { useState } from 'react';
import type { ChartData, Cung, Sao } from '../../types/chart';

interface Props {
  chartData: ChartData;
  isOpen: boolean;
  onClose: () => void;
}

// Map element codes to Vietnamese names
const HANH_NAMES: Record<string, string> = {
  K: 'Kim',
  M: 'Mộc',
  T: 'Thủy',
  H: 'Hỏa',
  O: 'Thổ',
};

// Map star quality to Vietnamese
const DAC_TINH_NAMES: Record<string, string> = {
  V: 'Vượng',
  M: 'Miếu',
  D: 'Đắc',
  B: 'Bình',
  H: 'Hãm',
};

function formatSao(sao: Sao): string {
  const hanh = HANH_NAMES[sao.saoNguHanh] || sao.saoNguHanh;
  const dacTinh = sao.saoDacTinh ? ` (${DAC_TINH_NAMES[sao.saoDacTinh] || sao.saoDacTinh})` : '';
  const loai = sao.saoLoai === 1 ? ' [Chính tinh]' : sao.saoLoai < 10 ? ' [Cát tinh]' : ' [Hung tinh]';
  return `${sao.saoTen} - ${hanh}${dacTinh}${loai}`;
}

function formatCung(cung: Cung): string {
  const lines: string[] = [];
  
  // Palace header
  const cungHeader = cung.cungChu ? `【${cung.cungChu}】- Cung ${cung.cungTen}` : `Cung ${cung.cungTen}`;
  lines.push(cungHeader);
  lines.push(`  Hành: ${cung.hanhCung}, Âm Dương: ${cung.cungAmDuong === 1 ? 'Dương' : 'Âm'}`);
  lines.push(`  Đại hạn: ${cung.cungDaiHan}, Tiểu hạn: ${cung.cungTieuHan}`);
  
  if (cung.cungThan) {
    lines.push(`  ⭐ Cung THÂN`);
  }
  if (cung.tuanTrung) {
    lines.push(`  ⚠ Tuần Trung`);
  }
  if (cung.trietLo) {
    lines.push(`  ⚠ Triệt Lộ`);
  }

  // Stars
  const chinhTinh = cung.cungSao.filter(s => s.saoLoai === 1);
  const phuTinhTot = cung.cungSao.filter(s => s.vongTrangSinh === 0 && s.saoLoai !== 1 && s.saoLoai < 10);
  const phuTinhXau = cung.cungSao.filter(s => s.vongTrangSinh === 0 && s.saoLoai !== 1 && s.saoLoai >= 10);
  const trangSinh = cung.cungSao.filter(s => s.vongTrangSinh === 1);

  if (chinhTinh.length > 0) {
    lines.push(`  Chính tinh: ${chinhTinh.map(s => formatSao(s)).join(', ')}`);
  }
  if (phuTinhTot.length > 0) {
    lines.push(`  Cát tinh: ${phuTinhTot.map(s => s.saoTen).join(', ')}`);
  }
  if (phuTinhXau.length > 0) {
    lines.push(`  Hung tinh: ${phuTinhXau.map(s => s.saoTen).join(', ')}`);
  }
  if (trangSinh.length > 0) {
    lines.push(`  Vòng Tràng Sinh: ${trangSinh.map(s => s.saoTen).join(', ')}`);
  }

  return lines.join('\n');
}

export function generateLLMPrompt(chartData: ChartData): string {
  const { thienBan, thapNhiCung } = chartData;

  const lines: string[] = [];

  lines.push('# LÁ SỐ TỬ VI');
  lines.push('');
  lines.push('## THÔNG TIN CƠ BẢN');
  lines.push(`- Họ tên: ${thienBan.ten}`);
  lines.push(`- Giới tính: ${thienBan.namNu}`);
  lines.push(`- Ngày sinh Âm lịch: ${thienBan.ngayAm}/${thienBan.thangAm}/${thienBan.canNamTen} ${thienBan.chiNamTen}`);
  lines.push(`- Ngày sinh Dương lịch: ${thienBan.ngayDuong}/${thienBan.thangDuong}/${thienBan.namDuong}`);
  lines.push(`- Giờ sinh: ${thienBan.gioSinh}`);
  lines.push(`- Bát tự: Năm ${thienBan.canNamTen} ${thienBan.chiNamTen}, Tháng ${thienBan.canThang} ${thienBan.chiThang}, Ngày ${thienBan.canNgay} ${thienBan.chiNgay}`);
  lines.push('');
  lines.push('## NGŨ HÀNH & CỤC');
  lines.push(`- Bản mệnh: ${thienBan.banMenh}`);
  lines.push(`- Cục: ${thienBan.tenCuc}`);
  lines.push(`- Mệnh chủ: ${thienBan.menhChu}`);
  lines.push(`- Thân chủ: ${thienBan.thanChu}`);
  lines.push(`- Âm Dương năm sinh: ${thienBan.amDuongNamSinh}`);
  lines.push(`- Âm Dương mệnh: ${thienBan.amDuongMenh}`);
  lines.push(`- Sinh khắc: ${thienBan.sinhKhac}`);
  lines.push('');
  lines.push('## THẬP NHỊ CUNG');
  lines.push('');

  // Order palaces by importance: Mệnh first, then by cungSo
  const menhCung = thapNhiCung.find(c => c.cungChu === 'Mệnh');
  const thanCung = thapNhiCung.find(c => c.cungThan);
  const otherCungs = thapNhiCung.filter(c => c !== menhCung && c !== thanCung);

  if (menhCung) {
    lines.push(formatCung(menhCung));
    lines.push('');
  }
  if (thanCung && thanCung !== menhCung) {
    lines.push(formatCung(thanCung));
    lines.push('');
  }

  for (const cung of otherCungs) {
    lines.push(formatCung(cung));
    lines.push('');
  }

  lines.push('---');
  lines.push('');
  lines.push('## YÊU CẦU LUẬN GIẢI');
  lines.push('');
  lines.push('Dựa trên lá số Tử Vi ở trên, xin hãy phân tích chi tiết và **ĐÁNH GIÁ ĐIỂM SỐ TRÊN THANG 10** cho từng mục:');
  lines.push('');
  lines.push('1. **Tổng quan vận mệnh** (X/10): Đánh giá chung về lá số, điểm mạnh và điểm yếu.');
  lines.push('2. **Cung Mệnh** (X/10): Phân tích tính cách, năng lực bản thân dựa trên các sao trong cung Mệnh.');
  lines.push('3. **Cung Thân** (X/10): Vận mệnh nửa đời sau, xu hướng phát triển.');
  lines.push('4. **Sự nghiệp - Quan Lộc** (X/10): Phân tích con đường sự nghiệp, nghề nghiệp phù hợp.');
  lines.push('5. **Tài lộc - Tài Bạch** (X/10): Khả năng tài chính, cách kiếm tiền.');
  lines.push('6. **Tình duyên - Phu Thê** (X/10): Vận đào hoa, hôn nhân.');
  lines.push('7. **Sức khỏe - Tật Ách** (X/10): Những vấn đề sức khỏe cần lưu ý.');
  lines.push('8. **Gia đạo - Phụ Mẫu, Huynh Đệ, Tử Tức** (X/10): Quan hệ gia đình.');
  lines.push('');
  lines.push('**Lưu ý đặc biệt**: Các cách cục đặc biệt (nếu có), Tuần Trung, Triệt Lộ, Tam Hợp, Xung Chiếu.');
  lines.push('');
  lines.push('## ĐỊNH DẠNG KẾT QUẢ');
  lines.push('');
  lines.push('Cuối mỗi phần phân tích, hãy đưa ra điểm số theo format: **📊 Điểm: X/10**');
  lines.push('');
  lines.push('Cuối cùng, tổng hợp bảng điểm dạng markdown table:');
  lines.push('');
  lines.push('| Hạng mục | Điểm |');
  lines.push('|----------|------|');
  lines.push('| Tổng quan vận mệnh | X/10 |');
  lines.push('| Cung Mệnh | X/10 |');
  lines.push('| Cung Thân | X/10 |');
  lines.push('| Sự nghiệp | X/10 |');
  lines.push('| Tài lộc | X/10 |');
  lines.push('| Tình duyên | X/10 |');
  lines.push('| Sức khỏe | X/10 |');
  lines.push('| Gia đạo | X/10 |');
  lines.push('| **TỔNG ĐIỂM TRUNG BÌNH** | **X/10** |');
  lines.push('');
  lines.push('Xin trình bày rõ ràng, dễ hiểu, và đưa ra những lời khuyên thiết thực.');

  return lines.join('\n');
}

export function LLMExportModal({ chartData, isOpen, onClose }: Props) {
  const [copied, setCopied] = useState(false);
  
  if (!isOpen) return null;

  const prompt = generateLLMPrompt(chartData);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = prompt;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([prompt], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tuvi-${chartData.thienBan.ten.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Xuất Prompt cho AI</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4">
          <div className="bg-gray-100 p-4 rounded font-mono text-sm whitespace-pre-wrap">
            {prompt}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 p-4 border-t">
          <button
            onClick={handleDownload}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
          >
            Tải xuống .txt
          </button>
          <button
            onClick={handleCopy}
            className={`px-4 py-2 rounded text-white ${
              copied ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {copied ? 'Đã sao chép!' : 'Sao chép'}
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
