import CallsTable from "./features/calls/CallsTable";
import CallsFilters from "./features/calls/CallsFilters";
import avatar1 from "./assets/avatar/avatar1.png";
import avatar2 from "./assets/avatar/avatar2.png";

function App() {
  const mockCalls = [
    // Сегодня
    {
      id: 1,
      type: "incoming" as const,
      time: "19:00",
      avatar: avatar1,
      phone: "+7 (987) 567-17-12",
      source: "Rabota.ru",
      grade: "excellent" as const,
      duration: "12:06",
      hasRecord: true,
      date: "today" as const,
    },
    {
      id: 2,
      type: "outgoing" as const,
      time: "18:00",
      initials: "КУ",
      phone: "+7 (987) 555-12-82",
      grade: "good" as const,
      duration: "12:06",
      date: "today" as const,
    },
    {
      id: 3,
      type: "outgoing" as const,
      time: "17:50",
      avatar: avatar2,
      phone: "+7 (987) 567-17-12",
      grade: "excellent" as const,
      duration: "12:06",
      date: "today" as const,
    },
    {
      id: 4,
      type: "missed" as const,
      time: "17:07",
      avatar: avatar1,
      phone: "+7 (987) 556-12-18",
      duration: "",
      date: "today" as const,
    },

    // Вчера
    {
      id: 5,
      type: "incoming" as const,
      time: "19:00",
      avatar: avatar1,
      phone: "+7 (987) 567-17-12",
      source: "Rabota.ru",
      grade: "excellent" as const,
      duration: "0:06",
      hasRecord: true,
      date: "yesterday" as const,
    },
    {
      id: 6,
      type: "missed-outgoing" as const,
      time: "18:00",
      avatar: avatar2,
      phone: "+7 (987) 567-17-12",
      duration: "",
      date: "yesterday" as const,
    },
    {
      id: 7,
      type: "outgoing" as const,
      time: "18:00",
      avatar: avatar1,
      phone: "+7 (987) 567-17-12",
      duration: "12:06",
      date: "yesterday" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-background p-20">
      <div className="max-w-[1440px] mx-auto">
        <CallsFilters />
        <CallsTable calls={mockCalls} />
      </div>
    </div>
  );
}

export default App;
