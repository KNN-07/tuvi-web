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
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md border border-red-600">
      <h2 className="text-xl font-bold text-center mb-4">Chương trình lập Lá Số Tử Vi</h2>
      
      <div className="grid grid-cols-4 gap-4 mb-4">
        <label className="col-span-1 text-right pt-2">Họ tên</label>
        <input
          type="text"
          value={formData.hoTen}
          onChange={(e) => handleChange('hoTen', e.target.value)}
          className="col-span-3 border rounded px-3 py-2"
          placeholder="Nhập họ tên..."
        />
      </div>

      <div className="grid grid-cols-4 gap-4 mb-4">
        <label className="col-span-1 text-right pt-2">Giới tính</label>
        <select
          value={formData.gioiTinh}
          onChange={(e) => handleChange('gioiTinh', e.target.value)}
          className="col-span-3 border rounded px-3 py-2"
        >
          <option value="nam">Nam</option>
          <option value="nu">Nữ</option>
        </select>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-4">
        <label className="col-span-1 text-right pt-2">Ngày tháng năm sinh</label>
        <div className="col-span-3">
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
            className="border rounded px-3 py-2 w-full"
            min="1900-01-01"
            max="2100-12-31"
          />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-4">
        <label className="col-span-1"></label>
        <div className="col-span-3">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.amLich}
              onChange={(e) => handleChange('amLich', e.target.checked)}
            />
            Âm lịch?
          </label>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-4">
        <label className="col-span-1 text-right pt-2">Giờ sinh</label>
        <select
          value={formData.gioSinh}
          onChange={(e) => handleChange('gioSinh', parseInt(e.target.value))}
          className="col-span-1 border rounded px-2 py-2"
        >
          {GIO_SINH_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <label className="text-right pt-2">Múi giờ:</label>
        <select
          value={formData.muiGio}
          onChange={(e) => handleChange('muiGio', parseInt(e.target.value))}
          className="border rounded px-2 py-2"
        >
          {Array.from({ length: 25 }, (_, i) => i - 12).map(tz => (
            <option key={tz} value={tz}>{tz >= 0 ? `+${tz}` : tz}{tz === 7 ? ' (Vietnam)' : ''}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-4">
        <label className="col-span-1 text-right pt-2">Lưu Niên</label>
        <select
          value={formData.luuNienNam}
          onChange={(e) => handleChange('luuNienNam', parseInt(e.target.value))}
          className="col-span-2 border rounded px-2 py-2"
        >
          {luuNienYears.map(year => (
            <option key={year} value={year}>{getLuuNienLabel(year)}</option>
          ))}
        </select>
        <div className="text-xs text-gray-500 pt-2">Năm xem vận hạn</div>
      </div>

      <div className="text-center">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 font-bold"
        >
          Lập lá số
        </button>
      </div>
    </form>
  );
}
