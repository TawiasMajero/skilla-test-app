import React, { useState, useRef, useEffect } from "react";
import type { CallsFiltersProps } from "../../shared/types/component.types";

const CallsFilters: React.FC<CallsFiltersProps> = ({
  onFilterChange,
  onDateChange,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("Все типы");
  const [dateIndex, setDateIndex] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const dateOptions = [
    { label: "3 дня", days: 3 },
    { label: "Неделя", days: 7 },
    { label: "Месяц", days: 30 },
    { label: "Год", days: 365 },
  ];

  // Закрытие дропдауна при клике вне его
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
    setIsDropdownOpen(false);
    onFilterChange?.(filter);
  };

  const handleDatePrev = () => {
    const newIndex = Math.max(0, dateIndex - 1);
    setDateIndex(newIndex);
    onDateChange?.(dateOptions[newIndex].days);
  };

  const handleDateNext = () => {
    const newIndex = Math.min(dateOptions.length - 1, dateIndex + 1);
    setDateIndex(newIndex);
    onDateChange?.(dateOptions[newIndex].days);
  };

  return (
    <div className="flex justify-between items-center mb-4">
      {/* Фильтр по типу */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-1 font-sf-pro text-[14px] leading-[100%] text-text-primary hover:opacity-70 transition-opacity"
        >
          <span>{selectedFilter}</span>
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            className={`transition-transform ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
          >
            <path
              d="M1 1L5 5L9 1"
              stroke={isDropdownOpen ? "#002CFB" : "#ADBFDF"}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Выпадающий список */}
        {isDropdownOpen && (
          <div className="absolute top-full left-0 mt-3 bg-white shadow-[0px_4px_20px_rgba(0,0,0,0.08)] rounded-lg py-1 z-10 w-[133px]">
            <button
              onClick={() => handleFilterSelect("Все типы")}
              className={`w-full px-3 py-[7px] text-left hover:bg-[#DEE4FF] transition-colors font-['SF_Compact_Display'] text-[12px] leading-[18px] ${
                selectedFilter === "Все типы"
                  ? "text-[#015EF5]"
                  : "text-[#2B2D33]"
              }`}
            >
              Все типы
            </button>
            <button
              onClick={() => handleFilterSelect("Входящие")}
              className={`w-full px-3 py-[7px] text-left hover:bg-[#DEE4FF] transition-colors font-['SF_Compact_Display'] text-[12px] leading-[18px] ${
                selectedFilter === "Входящие"
                  ? "text-[#015EF5]"
                  : "text-[#2B2D33]"
              }`}
            >
              Входящие
            </button>
            <button
              onClick={() => handleFilterSelect("Исходящие")}
              className={`w-full px-3 py-[7px] text-left hover:bg-[#DEE4FF] transition-colors font-['SF_Compact_Display'] text-[12px] leading-[18px] ${
                selectedFilter === "Исходящие"
                  ? "text-[#015EF5]"
                  : "text-[#2B2D33]"
              }`}
            >
              Исходящие
            </button>
          </div>
        )}
      </div>

      {/* Выбор даты */}
      <div className="flex items-center gap-3">
        {/* Стрелка влево */}
        <button
          onClick={handleDatePrev}
          disabled={dateIndex === 0}
          className="group w-4 h-6 flex items-center justify-center transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
            <path
              d="M10 17L5 12L10 7"
              className="stroke-icon group-hover:stroke-[#002CFB] group-disabled:stroke-icon transition-colors"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Кнопка с календарем и датой */}
        <button className="group flex items-center gap-2 transition-all">
          <svg
            width="16"
            height="18"
            viewBox="0 0 16 18"
            fill="none"
            className="transition-colors"
          >
            <rect
              x="1"
              y="3"
              width="14"
              height="14"
              rx="2"
              className="stroke-icon group-hover:stroke-[#002CFB] transition-colors"
              strokeWidth="2"
            />
            <line
              x1="4"
              y1="1"
              x2="4"
              y2="5"
              className="stroke-icon group-hover:stroke-[#002CFB] transition-colors"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="12"
              y1="1"
              x2="12"
              y2="5"
              className="stroke-icon group-hover:stroke-[#002CFB] transition-colors"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="1"
              y1="7"
              x2="15"
              y2="7"
              className="stroke-icon group-hover:stroke-[#002CFB] transition-colors"
              strokeWidth="2"
            />
          </svg>
          <span className="font-sf-pro text-[14px] leading-[16px] text-[#002CFB]">
            {dateOptions[dateIndex].label}
          </span>
        </button>

        {/* Стрелка вправо */}
        <button
          onClick={handleDateNext}
          disabled={dateIndex === dateOptions.length - 1}
          className="group w-[17px] h-6 flex items-center justify-center transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <svg width="17" height="24" viewBox="0 0 17 24" fill="none">
            <path
              d="M7 7L12 12L7 17"
              className="stroke-icon group-hover:stroke-[#002CFB] group-disabled:stroke-icon transition-colors"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CallsFilters;
