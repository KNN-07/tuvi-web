import React, { useState } from 'react';
import type { BirthInfo } from '../../types/chart';
import { GIO_SINH_OPTIONS } from '../../utils/constants';

interface Props {
  onSubmit: (data: BirthInfo) => void;
}

export function BirthInfoForm({ onSubmit }: Props) {
  const today = new Date();
  const [formData, setFormData] = useState<BirthInfo>({
    hoTen: '',
    ngaySinh: today.getDate(),
    thangSinh: today.getMonth() + 1,
    namSinh: today.getFullYear(),
    gioSinh: 1,
    gioiTinh: 'nam',
    amLich: false,
    muiGio: 7,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: keyof BirthInfo, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

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
        <div className="col-span-2 flex gap-2">
          <select
            value={formData.ngaySinh}
            onChange={(e) => handleChange('ngaySinh', parseInt(e.target.value))}
            className="border rounded px-2 py-2"
          >
            {Array.from({ length: 31 }, (_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
          <span className="pt-2">/</span>
          <select
            value={formData.thangSinh}
            onChange={(e) => handleChange('thangSinh', parseInt(e.target.value))}
            className="border rounded px-2 py-2"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
          <span className="pt-2">/</span>
          <input
            type="number"
            value={formData.namSinh}
            onChange={(e) => handleChange('namSinh', parseInt(e.target.value))}
            className="border rounded px-2 py-2 w-24"
            min="1900"
            max="2100"
          />
        </div>
        <div className="col-span-1 flex items-center">
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
