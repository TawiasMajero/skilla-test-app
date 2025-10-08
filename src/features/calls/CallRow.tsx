import React, { useState } from 'react';
import CallIcon from '../../shared/ui/CallIcon';
import Avatar from '../../shared/ui/Avatar';
import Badge from '../../shared/ui/Badge';
import AudioPlayer from './audio/AudioPlayer';
import type { CallRowProps } from '../../shared/types/component.types';

const CallRow: React.FC<CallRowProps> = ({
  type,
  time,
  avatar,
  initials,
  phone,
  source,
  grade,
  duration,
  hasRecord,
  recordId,
  partnershipId,
}) => {
  const [showPlayer, setShowPlayer] = useState(false);

  const handleRowClick = () => {
    if (hasRecord && recordId && partnershipId) {
      setShowPlayer(!showPlayer);
    }
  };

  return (
    <div 
      className={`relative flex items-center px-10 h-[65px] border-b transition-colors ${
        showPlayer 
          ? 'bg-[rgba(212,223,243,0.17)] border-[rgba(234,240,250,0.99)]' 
          : 'border-border hover:bg-gray-50 cursor-pointer'
      }`}
      onClick={handleRowClick}
    >
      {/* Тип звонка */}
      <div className="w-[54px]">
        <CallIcon type={type} />
      </div>

      {/* Время */}
      <div className="w-[88px]">
        <span className="font-sf-pro text-[15px] leading-[140%] text-text-primary">
          {time}
        </span>
      </div>

      {/* Сотрудник */}
      <div className="w-[129px]">
        <Avatar src={avatar} initials={initials} size={32} />
      </div>

      {/* Звонок (телефон) */}
      <div className="w-[325px]">
        <span className="font-sf-pro text-[15px] leading-[140%] text-text-primary">
          {phone}
        </span>
      </div>

      {/* Источник */}
      <div className="w-[214px]">
        {source && (
          <span className="font-sf-pro text-[15px] leading-[140%] text-text-secondary">
            {source}
          </span>
        )}
      </div>

      {/* Оценка и плеер */}
      <div className="w-[461px] flex items-center gap-2">
        {grade && (
          <Badge variant={grade}>
            {grade === 'excellent' ? 'Отлично' : grade === 'good' ? 'Хорошо' : 'Плохо'}
          </Badge>
        )}
      </div>

      {/* Длительность или плеер */}
<div className="w-[110px] flex justify-end items-center">
  {showPlayer && recordId && partnershipId ? (
    <div 
      className="absolute right-10 flex items-center bg-[rgba(234,240,250,0.99)] rounded-[48px] px-4 py-2"
      onClick={(e) => e.stopPropagation()}
    >
      <AudioPlayer recordId={recordId} partnershipId={partnershipId} onClose={() => setShowPlayer(false)}/>
    </div>
  ) : (
    <span className="font-sf-pro text-[15px] leading-[140%] tracking-[0.01em] text-text-primary text-right">
      {duration}
    </span>
  )}
</div>
    </div>
  );
};

export default CallRow;
