import { useState } from "react";
import CallsTable from "./features/calls/CallsTable";
import CallsFilters from "./features/calls/CallsFilters";
import avatar1 from "./assets/avatar/avatar1.png";
import avatar2 from "./assets/avatar/avatar2.png";

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
  timestamp: Date;
}

function App() {
  const [selectedFilter, setSelectedFilter] = useState("Все типы");

  // Все звонки с timestamp
  const allCalls: Call[] = [
    // Сегодня
    {
      id: 1,
      type: "incoming",
      time: "19:00",
      avatar: avatar1,
      phone: "+7 (987) 567-17-12",
      source: "Rabota.ru",
      grade: "excellent",
      duration: "12:06",
      hasRecord: true,
      date: "today",
      timestamp: new Date(),
    },
    {
      id: 2,
      type: "outgoing",
      time: "18:00",
      initials: "КУ",
      phone: "+7 (987) 555-12-82",
      grade: "good",
      duration: "12:06",
      date: "today",
      timestamp: new Date(),
    },
    {
      id: 3,
      type: "outgoing",
      time: "17:50",
      avatar: avatar2,
      phone: "+7 (987) 567-17-12",
      grade: "excellent",
      duration: "12:06",
      date: "today",
      timestamp: new Date(),
    },
    {
      id: 4,
      type: "missed",
      time: "17:07",
      avatar: avatar1,
      phone: "+7 (987) 556-12-18",
      duration: "",
      date: "today",
      timestamp: new Date(),
    },
    {
      id: 5,
      type: "incoming",
      time: "16:33",
      avatar: avatar2,
      phone: "+7 (987) 587-16-18",
      source: "Rabota.ru",
      grade: "good",
      duration: "12:06",
      date: "today",
      timestamp: new Date(),
    },

    // Вчера
    {
      id: 6,
      type: "incoming",
      time: "19:00",
      avatar: avatar1,
      phone: "+7 (987) 567-17-12",
      source: "Rabota.ru",
      grade: "excellent",
      duration: "0:06",
      hasRecord: true,
      date: "yesterday",
      timestamp: new Date(Date.now() - 86400000),
    },
    {
      id: 7,
      type: "missed-outgoing",
      time: "18:00",
      avatar: avatar2,
      phone: "+7 (987) 567-17-12",
      duration: "",
      date: "yesterday",
      timestamp: new Date(Date.now() - 86400000),
    },
    {
      id: 8,
      type: "outgoing",
      time: "18:00",
      avatar: avatar1,
      phone: "+7 (987) 567-17-12",
      duration: "12:06",
      date: "yesterday",
      timestamp: new Date(Date.now() - 86400000),
    },
    {
      id: 9,
      type: "missed",
      time: "16:45",
      avatar: avatar2,
      phone: "+7 (987) 345-17-12",
      duration: "",
      date: "yesterday",
      timestamp: new Date(Date.now() - 86400000),
    },
    {
      id: 10,
      type: "incoming",
      time: "15:21",
      avatar: avatar1,
      phone: "+7 (913) 866-69-96",
      source: "Google",
      grade: "excellent",
      duration: "4:06",
      date: "yesterday",
      timestamp: new Date(Date.now() - 86400000),
    },
  ];

  // Фильтрация звонков
  let filteredCalls = allCalls;

  // Фильтр по типу
  if (selectedFilter === "Входящие") {
    filteredCalls = filteredCalls.filter((call) => call.type === "incoming");
  } else if (selectedFilter === "Исходящие") {
    filteredCalls = filteredCalls.filter(
      (call) => call.type === "outgoing" || call.type === "missed-outgoing"
    );
  }

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
  };

  return (
    <div className="min-h-screen bg-background p-20">
      <div className="max-w-[1440px] mx-auto">
        <CallsFilters onFilterChange={handleFilterChange} />
        <CallsTable calls={filteredCalls} />
      </div>
    </div>
  );
}

export default App;
