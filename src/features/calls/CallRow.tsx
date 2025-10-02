import React from "react";
import CallIcon from "../../shared/ui/CallIcon";
import Avatar from "../../shared/ui/Avatar";
import Badge from "../../shared/ui/Badge";

interface CallRowProps {
  type: "incoming" | "outgoing" | "missed" | "missed-outgoing";
  time: string;
  avatar?: string;
  initials?: string;
  phone: string;
  source?: string;
  grade?: "excellent" | "good" | "bad";
  duration: string;
  hasRecord?: boolean;
}

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
}) => {
  return (
    <div className="flex items-center px-10 py-0 h-[65px] border-b border-border hover:bg-gray-50 transition-colors">
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

      {/* Оценка */}
      <div className="w-[461px] flex items-center gap-2">
        {grade && (
          <Badge variant={grade}>
            {grade === "excellent"
              ? "Отлично"
              : grade === "good"
              ? "Хорошо"
              : "Плохо"}
          </Badge>
        )}
        {hasRecord && (
          <div className="w-4 h-4 text-icon">
            {/* Иконка записи - добавим позже */}
          </div>
        )}
      </div>

      {/* Длительность */}
      <div className="w-[110px] text-right">
        <span className="font-sf-pro text-[15px] leading-[140%] tracking-[0.01em] text-text-primary">
          {duration}
        </span>
      </div>
    </div>
  );
};

export default CallRow;
