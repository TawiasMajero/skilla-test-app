import React from "react";
import CallRow from "./CallRow";

interface Call {
  id: number;
  type: "incoming" | "outgoing" | "missed" | "missed-outgoing";
  time: string;
  avatar?: string;
  initials?: string;
  phone: string;
  source?: string;
  grade?: "excellent" | "good" | "bad";
  duration: string;
  hasRecord?: boolean;
  date: "today" | "yesterday";
}

interface CallsTableProps {
  calls: Call[];
}

const CallsTable: React.FC<CallsTableProps> = ({ calls }) => {
  // Группируем звонки по датам
  const todayCalls = calls.filter((call) => call.date === "today");
  const yesterdayCalls = calls.filter((call) => call.date === "yesterday");

  return (
    <div className="w-full bg-white rounded-lg shadow-[0px_4px_5px_#E9EDF3]">
      {/* Заголовки таблицы */}
      <div className="flex items-center px-10 h-[65px]">
        <div className="w-[54px] font-sf-pro text-[14px] leading-[148%] text-text-secondary opacity-87">
          Тип
        </div>
        <div className="w-[88px] font-sf-pro text-[14px] leading-[148%] text-text-secondary opacity-87">
          Время
        </div>
        <div className="w-[129px] font-sf-pro text-[14px] leading-[148%] text-text-secondary opacity-87">
          Сотрудник
        </div>
        <div className="w-[325px] font-sf-pro text-[14px] leading-[148%] text-text-secondary opacity-87">
          Звонок
        </div>
        <div className="w-[214px] font-sf-pro text-[14px] leading-[148%] text-text-secondary opacity-87">
          Источник
        </div>
        <div className="w-[461px] font-sf-pro text-[14px] leading-[148%] text-text-secondary opacity-87">
          Оценка
        </div>
        <div className="w-[110px] font-sf-pro text-[14px] leading-[148%] text-text-secondary opacity-87 text-right">
          Длительность
        </div>
      </div>

      {/* Сегодня */}
      {todayCalls.length > 0 && (
        <ul>
          {todayCalls.map((call) => (
            <li key={call.id}>
              <CallRow
                type={call.type}
                time={call.time}
                avatar={call.avatar}
                initials={call.initials}
                phone={call.phone}
                source={call.source}
                grade={call.grade}
                duration={call.duration}
                hasRecord={call.hasRecord}
              />
            </li>
          ))}
        </ul>
      )}

      {/* Разделитель "Вчера" */}
      {yesterdayCalls.length > 0 && (
        <>
          <div className="px-10 py-4 mt-5">
            <div className="flex items-center gap-2">
              <span className="font-sf-pro text-[15px] leading-[145%] tracking-[0.01em] text-text-primary">
                Вчера
              </span>
              <span className="font-sf-pro text-[12px] leading-[100%] text-text-header">
                {yesterdayCalls.length}
              </span>
            </div>
          </div>

          <ul>
            {yesterdayCalls.map((call) => (
              <li key={call.id}>
                <CallRow
                  type={call.type}
                  time={call.time}
                  avatar={call.avatar}
                  initials={call.initials}
                  phone={call.phone}
                  source={call.source}
                  grade={call.grade}
                  duration={call.duration}
                  hasRecord={call.hasRecord}
                />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default CallsTable;
