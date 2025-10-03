import { useState, useMemo } from "react";
import { useGetCallsQuery } from "../app/api/skillaApi";
import CallsTable from "../features/calls/CallsTable";
import CallsFilters from "../features/calls/CallsFilters";
import type { Call } from "../shared/types/api.types";

// Утилита для форматирования времени из timestamp
const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Утилита для форматирования длительности из секунд
const formatDuration = (seconds: number): string => {
  if (!seconds) return "";
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
};

// Определение типа звонка
const getCallType = (
  call: Call
): "incoming" | "outgoing" | "missed" | "missed-outgoing" => {
  const isMissed = call.status === "Не дозвонился";

  if (call.in_out === 1) {
    // Входящий
    return isMissed ? "missed" : "incoming";
  } else {
    // Исходящий
    return isMissed ? "missed-outgoing" : "outgoing";
  }
};

// Определение даты (сегодня/вчера)
const getDateLabel = (dateString: string): "today" | "yesterday" => {
  const callDate = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const isSameDay = (d1: Date, d2: Date) =>
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear();

  if (isSameDay(callDate, today)) return "today";
  if (isSameDay(callDate, yesterday)) return "yesterday";
  return "yesterday"; // для простоты все остальное - вчера
};

// Генерация случайной оценки (так как в API её нет)
const getRandomGrade = (): "excellent" | "good" | "bad" | undefined => {
  const rand = Math.random();
  if (rand > 0.7) return "excellent";
  if (rand > 0.4) return "good";
  if (rand > 0.2) return "bad";
  return undefined;
};

const CallsPage = () => {
  const [selectedFilter, setSelectedFilter] = useState("Все типы");
  const [selectedDays, setSelectedDays] = useState(3);

  // Вычисляем даты для запроса
  const dateEnd = new Date();
  const dateStart = new Date();
  dateStart.setDate(dateStart.getDate() - selectedDays);

  const formatDate = (date: Date) => date.toISOString().split("T")[0];

  // Параметры для API
  const params = {
    date_start: formatDate(dateStart),
    date_end: formatDate(dateEnd),
    in_out:
      selectedFilter === "Входящие"
        ? ("1" as const)
        : selectedFilter === "Исходящие"
        ? ("0" as const)
        : ("" as const),
  };

  // Запрос к API
  const { data, isLoading, error } = useGetCallsQuery(params);
  // Трансформация данных для таблицы
  const transformedCalls = useMemo(() => {
    if (!data?.results) return [];

    return data.results.map((call) => ({
      id: call.id,
      type: getCallType(call),
      time: formatTime(call.date),
      avatar: call.person_avatar.includes("noavatar")
        ? undefined
        : call.person_avatar,
      initials: call.person_avatar.includes("noavatar")
        ? `${call.person_name[0] || ""}${
            call.person_surname[0] || ""
          }`.toUpperCase()
        : undefined,
      phone: call.from_number,
      source: call.source || call.line_name,
      grade: getRandomGrade(),
      duration: formatDuration(call.time),
      hasRecord: !!call.record,
      date: getDateLabel(call.date),
    }));
  }, [data]);

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
  };

  const handleDateChange = (days: number) => {
    setSelectedDays(days);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-text-secondary">Загрузка...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-call-missed">Ошибка загрузки данных</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-20">
      <div className="max-w-[1440px] mx-auto">
        <CallsFilters
          onFilterChange={handleFilterChange}
          onDateChange={handleDateChange}
        />
        <CallsTable calls={transformedCalls} />
      </div>
    </div>
  );
};

export default CallsPage;
