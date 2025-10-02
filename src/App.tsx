import CallRow from "./features/calls/CallRow";
import avatar1 from "./assets/avatar/avatar1.png";

function App() {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-[1440px] mx-auto bg-white rounded-lg shadow-[0px_4px_5px_#E9EDF3]">
        <div className="flex items-center px-10 h-[21px] border-b border-border">
          <div className="w-[54px] text-[14px] text-text-secondary opacity-87">
            Тип
          </div>
          <div className="w-[88px] text-[14px] text-text-secondary opacity-87">
            Время
          </div>
          <div className="w-[129px] text-[14px] text-text-secondary opacity-87">
            Сотрудник
          </div>
          <div className="w-[325px] text-[14px] text-text-secondary opacity-87">
            Звонок
          </div>
          <div className="w-[214px] text-[14px] text-text-secondary opacity-87">
            Источник
          </div>
          <div className="w-[461px] text-[14px] text-text-secondary opacity-87">
            Оценка
          </div>
          <div className="w-[110px] text-[14px] text-text-secondary opacity-87 text-right">
            Длительность
          </div>
        </div>

        {/* Строки */}
        <CallRow
          type="incoming"
          time="19:00"
          avatar={avatar1}
          phone="+7 (987) 567-17-12"
          source="Rabota.ru"
          grade="excellent"
          duration="12:06"
          hasRecord
        />
        <CallRow
          type="outgoing"
          time="18:00"
          initials="КУ"
          phone="+7 (987) 555-12-82"
          grade="good"
          duration="12:06"
        />
        <CallRow
          type="missed"
          time="17:07"
          avatar={avatar1}
          phone="+7 (987) 556-12-18"
          duration=""
        />
      </div>
    </div>
  );
}

export default App;
