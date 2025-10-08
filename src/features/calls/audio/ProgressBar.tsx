import React from 'react';
import type { ProgressBarProps } from '../../../shared/types/component.types';

const ProgressBar: React.FC<ProgressBarProps> = ({ value, onSeek }) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    onSeek(percentage);
  };

  return (
    <div
      className="flex-1 relative cursor-pointer"
      onClick={handleClick}
      style={{ height: '4px', minWidth: '164px' }}
    >
      <div className="absolute inset-0" style={{ background: '#ADBFDF', borderRadius: '50px' }} />
      <div className="absolute left-0 top-0 h-full" style={{ width: `${value}%`, background: '#002CFB', borderRadius: '50px' }} />
      <div
        className="absolute top-1/2"
        style={{
          left: `${value}%`,
          transform: 'translate(-50%, -50%)',
          width: '8px',
          height: '8px',
          background: '#FFFFFF',
          border: '2px solid #002CFB',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

export default ProgressBar;
