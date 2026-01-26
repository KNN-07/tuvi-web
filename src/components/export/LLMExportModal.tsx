import { useState } from 'react';
import type { ChartData, Cung, Sao } from '../../types/chart';

interface Props {
  chartData: ChartData;
  isOpen: boolean;
  onClose: () => void;
  showLuuStars?: boolean;
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

function formatCung(cung: Cung, includeLuuStars: boolean = true): string {
  const lines: string[] = [];
  
  const regularStars = cung.cungSao.filter(s => !s.isLuu);
  const luuStars = includeLuuStars ? cung.cungSao.filter(s => s.isLuu) : [];
  
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

  const chinhTinh = regularStars.filter(s => s.saoLoai === 1);
  const phuTinhTot = regularStars.filter(s => s.vongTrangSinh === 0 && s.saoLoai !== 1 && s.saoLoai < 10);
  const phuTinhXau = regularStars.filter(s => s.vongTrangSinh === 0 && s.saoLoai !== 1 && s.saoLoai >= 10);
  const trangSinh = regularStars.filter(s => s.vongTrangSinh === 1);

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
  if (luuStars.length > 0) {
    lines.push(`  🔴 Lưu niên: ${luuStars.map(s => s.saoTen).join(', ')}`);
  }

  return lines.join('\n');
}

export function generateLLMPrompt(chartData: ChartData, includeLuuStars: boolean = true): string {
  const { thienBan, thapNhiCung, luuNien } = chartData;
  const showLuuNien = includeLuuStars && !!luuNien;

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
  
  if (showLuuNien) {
    lines.push('');
    lines.push('## LƯU NIÊN (Năm xem vận hạn)');
    lines.push(`- Năm: ${luuNien!.nam} (${luuNien!.canTen} ${luuNien!.chiTen})`);
    lines.push('- Các sao Lưu niên được đánh dấu 🔴 trong từng cung bên dưới');
  }
  
  lines.push('');
  lines.push('## THẬP NHỊ CUNG');
  lines.push('');

  // Order palaces by importance: Mệnh first, then by cungSo
  const menhCung = thapNhiCung.find(c => c.cungChu === 'Mệnh');
  const thanCung = thapNhiCung.find(c => c.cungThan);
  const otherCungs = thapNhiCung.filter(c => c !== menhCung && c !== thanCung);

  if (menhCung) {
    lines.push(formatCung(menhCung, includeLuuStars));
    lines.push('');
  }
  if (thanCung && thanCung !== menhCung) {
    lines.push(formatCung(thanCung, includeLuuStars));
    lines.push('');
  }

  for (const cung of otherCungs) {
    lines.push(formatCung(cung, includeLuuStars));
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
  
  if (showLuuNien) {
    lines.push(`9. **Vận hạn năm ${luuNien!.nam} (${luuNien!.canTen} ${luuNien!.chiTen})** (X/10): Phân tích các sao Lưu niên (đánh dấu 🔴), dự báo sự kiện, cơ hội và thách thức trong năm.`);
  }
  
  lines.push('');
  lines.push('**Lưu ý đặc biệt**: Các cách cục đặc biệt (nếu có), Tuần Trung, Triệt Lộ, Tam Hợp, Xung Chiếu.');
  
  if (showLuuNien) {
    lines.push(`**Sao Lưu niên quan trọng**: L.Thái Tuế, L.Lộc Tồn, L.Kình Dương, L.Đà La, L.Thiên Mã, L.Tang Môn, L.Bạch Hổ, L.Tứ Hóa.`);
  }
  
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
  
  if (showLuuNien) {
    lines.push(`| Vận hạn ${luuNien!.nam} | X/10 |`);
  }
  
  lines.push('| **TỔNG ĐIỂM TRUNG BÌNH** | **X/10** |');
  lines.push('');
  lines.push('Xin trình bày rõ ràng, dễ hiểu, và đưa ra những lời khuyên thiết thực.');

  return lines.join('\n');
}

export function LLMExportModal({ chartData, isOpen, onClose, showLuuStars = true }: Props) {
  const [copied, setCopied] = useState(false);
  
  if (!isOpen) return null;

  const prompt = generateLLMPrompt(chartData, showLuuStars);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
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
    <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="card-paper max-w-4xl w-full max-h-[90vh] flex flex-col transform transition-all scale-100 overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-stone-100 bg-stone-50">
          <h2 className="text-xl font-bold text-red-900 flex items-center gap-2">
            <span>🤖</span> Xuất Prompt cho AI
          </h2>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-red-600 transition-colors text-2xl leading-none w-8 h-8 flex items-center justify-center rounded-full hover:bg-stone-200"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-0">
          <div className="p-6 bg-stone-50/50">
             <div className="bg-stone-900 text-stone-100 p-4 rounded-lg font-mono text-xs md:text-sm whitespace-pre-wrap overflow-x-auto border border-stone-800 shadow-inner leading-relaxed">
               {prompt}
             </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-5 border-t border-stone-100 bg-white">
          <button
            onClick={handleDownload}
            className="btn-secondary flex items-center gap-2"
          >
            <span>⬇️</span> Tải .txt
          </button>
          <button
            onClick={handleCopy}
            className={`px-6 py-2 rounded font-medium text-white transition-all shadow-sm flex items-center gap-2 ${
              copied ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
             {copied ? <span>✓ Đã sao chép!</span> : <span>📋 Sao chép</span>}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded text-stone-500 hover:bg-stone-100 transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
