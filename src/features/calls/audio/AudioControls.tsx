import React from 'react';
import type { AudioControlsProps } from '../../../shared/types/component.types';

const AudioControls: React.FC<AudioControlsProps> = ({ audioUrl, onDownload, onClose }) => {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onDownload}
        disabled={!audioUrl}
        className="flex-shrink-0 hover:opacity-70 transition-opacity"
        style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <svg width="13" height="16" viewBox="0 0 13 16" fill="none">
          <path d="M6.5 0.5V10.5M6.5 10.5L11 6M6.5 10.5L2 6" stroke="#ADBFDF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M0.5 15H12.5" stroke="#ADBFDF" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="flex-shrink-0 hover:opacity-70 transition-opacity"
        style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M0.5 0.5L13.5 13.5M13.5 0.5L0.5 13.5" stroke="#ADBFDF" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
};

export default AudioControls;
