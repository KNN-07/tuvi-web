import type { Sao } from '../../types/chart';

interface Props {
  sao: Sao;
  isChinhTinh?: boolean;
}

export function Star({ sao, isChinhTinh }: Props) {
  const luuStyle = sao.isLuu ? 'text-red-600 font-medium' : '';
  const baseStyle = sao.isLuu ? '' : sao.cssSao;
  
  return (
    <span className={`${baseStyle} ${luuStyle} ${isChinhTinh ? 'font-bold uppercase' : ''}`}>
      {sao.saoTen}
      {sao.saoDacTinh && ` (${sao.saoDacTinh})`}
    </span>
  );
}
