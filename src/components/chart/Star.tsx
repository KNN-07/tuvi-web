import type { Sao } from '../../types/chart';

interface Props {
  sao: Sao;
  isChinhTinh?: boolean;
}

export function Star({ sao, isChinhTinh }: Props) {
  return (
    <span className={`${sao.cssSao} ${isChinhTinh ? 'font-bold uppercase' : ''}`}>
      {sao.saoTen}
      {sao.saoDacTinh && ` (${sao.saoDacTinh})`}
    </span>
  );
}
