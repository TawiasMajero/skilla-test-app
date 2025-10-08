import React from 'react';
import type { PlayPauseProps } from '../../../shared/types/component.types';

const PlayPauseButton: React.FC<PlayPauseProps> = ({ isPlaying, isLoading, disabled, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      disabled={isLoading || disabled}
      className="relative flex-shrink-0"
      style={{
        width: '24px',
        height: '24px',
        background: '#FFFFFF',
        borderRadius: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {isLoading ? (
        <div
          className="animate-spin"
          style={{
            width: '16px',
            height: '16px',
            border: '2px solid #002CFB',
            borderTopColor: 'transparent',
            borderRadius: '50%',
          }}
        />
      ) : isPlaying ? (
        <svg width="8" height="10" viewBox="0 0 8 10" fill="none">
          <rect x="0" y="0" width="3" height="10" fill="#002CFB" />
          <rect x="5" y="0" width="3" height="10" fill="#002CFB" />
        </svg>
      ) : (
        <svg width="8" height="10" viewBox="0 0 8 10" fill="none">
          <path d="M0 0L8 5L0 10V0Z" fill="#002CFB" />
        </svg>
      )}
    </button>
  );
};

export default PlayPauseButton;
