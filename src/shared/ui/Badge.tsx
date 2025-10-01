import React from "react";

type BadgeVariant = "excellent" | "good" | "bad";

interface BadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({ variant, children }) => {
  const variantStyles = {
    excellent:
      "bg-status-excellent-bg border-status-excellent-border text-status-excellent-text",
    good: "bg-status-good-bg border-status-good-border text-status-good-text",
    bad: "bg-status-bad-bg border-status-bad-border text-status-bad-text",
  };

  return (
    <div
      className={`
        inline-flex items-start px-2 py-1.5 rounded border
        font-sf-pro text-sm leading-none
        ${variantStyles[variant]}
      `}
    >
      {children}
    </div>
  );
};

export default Badge;
