import React from 'react';
import { useScrollProgress } from '@/hooks/useScrollProgress';

export function ScrollProgressBar() {
  const progress = useScrollProgress();

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-[100] bg-transparent">
      <div 
        className="h-full bg-primary"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
