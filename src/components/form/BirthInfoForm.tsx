import React, { useState } from 'react';
import type { BirthInfo } from '../../types/chart';
import { GIO_SINH_OPTIONS, THIEN_CAN, DIA_CHI } from '../../utils/constants';
import { getYearCanChi } from '../../lib/luu';

interface Props {
  onSubmit: (data: BirthInfo) => void;
}

export function BirthInfoForm({ onSubmit }: Props) {
  const today = new Date();
  const currentYear = today.getFullYear();
  const [formData, setFormData] = useState<BirthInfo>({
    hoTen: '',
    ngaySinh: today.getDate(),
    thangSinh: today.getMonth() + 1,
    namSinh: currentYear,
    gioSinh: 1,
    gioiTinh: 'nam',
    amLich: false,
    muiGio: 7,
    luuNienNam: currentYear,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: keyof BirthInfo, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getLuuNienLabel = (year: number): string => {
    const [can, chi] = getYearCanChi(year);
    const canTen = THIEN_CAN[can]?.tenCan || '';
    const chiTen = DIA_CHI[chi]?.tenChi || '';
    return `${year} (${canTen} ${chiTen})`;
  };

  const luuNienYears = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);

  return (
    <div className="card-paper p-8 relative overflow-hidden">
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-red-800 rounded-tl-xl opacity-20"></div>
      <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-red-800 rounded-tr-xl opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-red-800 rounded-bl-xl opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-red-800 rounded-br-xl opacity-20"></div>

      <h2 className="text-2xl font-bold text-center mb-8 text-red-900 uppercase tracking-widest border-b border-red-100 pb-4">
        Nhập Thông Tin
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Input */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <label className="md:col-span-1 font-semibold text-stone-700 md:text-right">Họ và Tên</label>
          <div className="md:col-span-3">
            <input
              type="text"
              value={formData.hoTen}
              onChange={(e) => handleChange('hoTen', e.target.value)}
              className="input-field px-4 py-2"
              placeholder="Ví dụ: Nguyễn Văn A..."
              autoFocus
            />
          </div>
        </div>

        {/* Gender Selection */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <label className="md:col-span-1 font-semibold text-stone-700 md:text-right">Giới tính</label>
          <div className="md:col-span-3 flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="gioiTinh"
                value="nam"
                checked={formData.gioiTinh === 'nam'}
                onChange={(e) => handleChange('gioiTinh', e.target.value)}
                className="w-4 h-4 text-red-800 border-stone-300 focus:ring-red-800"
              />
              <span className="text-stone-700 group-hover:text-red-900 transition-colors">Nam</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="gioiTinh"
                value="nu"
                checked={formData.gioiTinh === 'nu'}
                onChange={(e) => handleChange('gioiTinh', e.target.value)}
                className="w-4 h-4 text-red-800 border-stone-300 focus:ring-red-800"
              />
              <span className="text-stone-700 group-hover:text-red-900 transition-colors">Nữ</span>
            </label>
          </div>
        </div>

        {/* Date of Birth */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <label className="md:col-span-1 font-semibold text-stone-700 md:text-right">Ngày sinh</label>
          <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="date"
              value={`${formData.namSinh}-${String(formData.thangSinh).padStart(2, '0')}-${String(formData.ngaySinh).padStart(2, '0')}`}
              onChange={(e) => {
                const date = new Date(e.target.value);
                if (!isNaN(date.getTime())) {
                  setFormData(prev => ({
                    ...prev,
                    ngaySinh: date.getDate(),
                    thangSinh: date.getMonth() + 1,
                    namSinh: date.getFullYear(),
                  }));
                }
              }}
              className="input-field px-4 py-2"
              min="1900-01-01"
              max="2100-12-31"
            />
            <label className="flex items-center gap-2 cursor-pointer select-none bg-stone-50 px-4 py-2 rounded border border-stone-200 hover:bg-stone-100 transition-colors">
              <input
                type="checkbox"
                checked={formData.amLich}
                onChange={(e) => handleChange('amLich', e.target.checked)}
                className="w-4 h-4 rounded text-red-800 focus:ring-red-800"
              />
              <span className="text-stone-700 font-medium">Đây là ngày Âm lịch</span>
            </label>
          </div>
        </div>

        {/* Time and Timezone */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <label className="md:col-span-1 font-semibold text-stone-700 md:text-right">Giờ sinh</label>
          <div className="md:col-span-3 grid grid-cols-2 gap-4">
            <select
              value={formData.gioSinh}
              onChange={(e) => handleChange('gioSinh', parseInt(e.target.value))}
              className="input-field px-4 py-2"
            >
              {GIO_SINH_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <div className="flex items-center gap-2">
               <span className="text-sm text-stone-500 whitespace-nowrap">Múi giờ:</span>
               <select
                value={formData.muiGio}
                onChange={(e) => handleChange('muiGio', parseInt(e.target.value))}
                className="input-field px-2 py-2 text-sm"
              >
                {Array.from({ length: 25 }, (_, i) => i - 12).map(tz => (
                  <option key={tz} value={tz}>{tz >= 0 ? `+${tz}` : tz}{tz === 7 ? ' (VN)' : ''}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Luu Nien */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <label className="md:col-span-1 font-semibold text-stone-700 md:text-right">Xem hạn năm</label>
          <div className="md:col-span-3">
            <select
              value={formData.luuNienNam}
              onChange={(e) => handleChange('luuNienNam', parseInt(e.target.value))}
              className="input-field w-full px-4 py-2 bg-yellow-50/50"
            >
              {luuNienYears.map(year => (
                <option key={year} value={year}>{getLuuNienLabel(year)}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-6 text-center">
          <button
            type="submit"
            className="btn-primary text-lg px-8 py-3 w-full md:w-auto"
          >
            <span className="mr-2">❖</span> LẬP LÁ SỐ <span className="ml-2">❖</span>
          </button>
        </div>
      </form>
    </div>
  );
}
