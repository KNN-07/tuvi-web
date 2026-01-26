import type { Sao } from '../../types/chart';

interface Props {
  sao: Sao;
  isChinhTinh?: boolean;
}

export function Star({ sao, isChinhTinh }: Props) {
  // Enhanced styling for stars
  const luuStyle = sao.isLuu ? 'text-red-600 font-bold italic' : '';
  
  // We keep the original CSS class for color (hanhKim, hanhMoc, etc) but add font tweaks
  const baseStyle = sao.isLuu ? '' : sao.cssSao;
  
  // Chinh Tinh gets special treatment
  const chinhTinhStyle = isChinhTinh 
    ? 'text-sm font-bold uppercase tracking-tight drop-shadow-sm' 
    : 'font-medium';

  return (
    <span className={`${baseStyle} ${luuStyle} ${chinhTinhStyle} transition-colors hover:brightness-110`}>
      {sao.saoTen}
      {sao.saoDacTinh && (
        <sup className="ml-0.5 text-[8px] opacity-70 font-normal text-stone-500">
            {sao.saoDacTinh}
        </sup>
      )}
    </span>
  );
}
