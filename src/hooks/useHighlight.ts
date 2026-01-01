import { useState, useCallback } from 'react';

function dichCung(base: number, offset: number): number {
  const result = (base + offset) % 12;
  return result <= 0 ? result + 12 : result;
}

export function useHighlight() {
  const [selectedCung, setSelectedCung] = useState<number | null>(null);

  const getHighlightedCungs = useCallback((cungId: number): number[] => {
    const xungChieu = dichCung(cungId, 6);
    const tamHop1 = dichCung(cungId, 4);
    const tamHop2 = dichCung(cungId, 8);
    return [cungId, xungChieu, tamHop1, tamHop2];
  }, []);

  const isHighlighted = useCallback((cungId: number): boolean => {
    if (selectedCung === null) return false;
    return getHighlightedCungs(selectedCung).includes(cungId);
  }, [selectedCung, getHighlightedCungs]);

  const handlePalaceClick = useCallback((cungId: number) => {
    setSelectedCung(prev => prev === cungId ? null : cungId);
  }, []);

  const clearHighlight = useCallback(() => {
    setSelectedCung(null);
  }, []);

  return { selectedCung, isHighlighted, handlePalaceClick, clearHighlight };
}
