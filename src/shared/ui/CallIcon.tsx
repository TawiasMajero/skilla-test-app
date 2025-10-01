import React from "react";

type CallType = "incoming" | "outgoing" | "missed" | "missed-outgoing";

interface CallIconProps {
  type: CallType;
  size?: number;
}

const CallIcon: React.FC<CallIconProps> = ({ type, size = 24 }) => {
  const getStyles = () => {
    switch (type) {
      case "incoming":
        return "text-[#002CFB] rotate-180";
      case "outgoing":
        return "text-call-outgoing rotate-[0deg]";
      case "missed":
        return "text-call-missed rotate-180";
      case "missed-outgoing":
        return "text-call-missed rotate-[0deg]";
      default:
        return "";
    }
  };

  const arrowSize = 12.52;

  return (
    <div
      className={`flex items-center justify-center ${getStyles()}`}
      style={{ width: size, height: size }}
    >
      <svg width={arrowSize} height={arrowSize} viewBox="0 0 13 13">
        <path
          d="M1 12L12 1M12 1H4M12 1V9"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default CallIcon;
