import Badge from "./shared/ui/Badge";
import Avatar from "./shared/ui/Avatar";
import CallIcon from "./shared/ui/CallIcon";
import avatar1 from "./assets/avatar/avatar1.png";
import avatar2 from "./assets/avatar/avatar2.png";
import initialsAvatar from "./assets/avatar/initials-avatar.svg";

function App() {
  return (
    <div className="p-8 space-y-6">
      <div>
        <div>
          <div className="flex gap-4 items-center">
            <CallIcon type="incoming" />
            <CallIcon type="outgoing" />
            <CallIcon type="missed" />
            <CallIcon type="missed-outgoing" />
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <Avatar />
          <Avatar src={initialsAvatar} />
          <Avatar src={avatar1} />
          <Avatar src={avatar2} />
        </div>
      </div>

      <div>
        <div className="flex gap-4">
          <Badge variant="excellent">Отлично</Badge>
          <Badge variant="good">Хорошо</Badge>
          <Badge variant="bad">Плохо</Badge>
        </div>
      </div>
    </div>
  );
}

export default App;
