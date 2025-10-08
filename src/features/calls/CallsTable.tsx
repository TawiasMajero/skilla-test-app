import React, { useMemo, useState } from "react";
import CallRow from "./CallRow";
import type { CallsTableProps, TableCall } from "../../shared/types/component.types";

const CallsTable: React.FC<CallsTableProps> = ({ calls }) => {
  const [sortBy, setSortBy] = useState<"" | "time" | "duration">("");
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  // Преобразуем и сортируем звонки клиентски перед группировкой
  const sortedCalls = useMemo<TableCall[]>(() => {
    if (!calls || calls.length === 0) return [] as TableCall[];

    const copy = [...calls];
    const parseDuration = (d: string) => {
      const parts = d.split(":").map((p) => Number(p));
      if (parts.length === 2) return parts[0] * 60 + parts[1];
      if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
      return 0;
    };

    copy.sort((a, b) => {
      if (sortBy === "time") {
        const ta = a.time;
        const tb = b.time;
        if (ta === tb) return 0;
        const cmp = ta < tb ? -1 : 1;
        return order === "asc" ? cmp : -cmp;
      }

      if (sortBy === "duration") {
        const da = parseDuration(a.duration || "0:00");
        const db = parseDuration(b.duration || "0:00");
        if (da === db) return 0;
        const cmp = da < db ? -1 : 1;
        return order === "asc" ? cmp : -cmp;
      }

      return 0;
    });

    return copy;
  }, [calls, sortBy, order]);

  // Группируем звонки по датам
  const todayCalls = sortedCalls.filter((call) => call.date === "today");
  const yesterdayCalls = sortedCalls.filter((call) => call.date === "yesterday");

  return (
    <div className="w-full bg-white rounded-lg shadow-[0px_4px_5px_#E9EDF3]">
      {/* Заголовки таблицы */}
      <div className="flex items-center px-10 h-[65px]">
        <div className="w-[54px] font-sf-pro text-[14px] leading-[148%] text-text-secondary opacity-87">
          Тип
        </div>
        <button
          onClick={() => {
            if (sortBy === "time") setOrder((o) => (o === "asc" ? "desc" : "asc"));
            else {
              setSortBy("time");
              setOrder("desc");
            }
          }}
          className="w-[88px] font-sf-pro text-[14px] leading-[148%] text-text-secondary opacity-87 flex items-center gap-2"
        >
          <span>Время</span>
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            className={`transition-transform ${sortBy === "time" && order === "asc" ? "rotate-180" : ""}`}
          >
            <path
              d="M1 1L5 5L9 1"
              stroke={sortBy === "time" ? "#002CFB" : "#ADBFDF"}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
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
        <button
          onClick={() => {
            if (sortBy === "duration") setOrder((o) => (o === "asc" ? "desc" : "asc"));
            else {
              setSortBy("duration");
              setOrder("desc");
            }
          }}
          className="w-[110px] font-sf-pro text-[14px] leading-[148%] text-text-secondary opacity-87 text-right flex items-center justify-end gap-2"
        >
          <span>Длительность</span>
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            className={`transition-transform ${sortBy === "duration" && order === "asc" ? "rotate-180" : ""}`}
          >
            <path
              d="M1 1L5 5L9 1"
              stroke={sortBy === "duration" ? "#002CFB" : "#ADBFDF"}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
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
                recordId={call.recordId}
                partnershipId={call.partnershipId}
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
