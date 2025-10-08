import React from "react";
import type { AvatarProps } from "../types/component.types";

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = "Avatar",
  initials,
  size = 32,
}) => {
  const isString = (v: unknown): v is string => typeof v === "string";

  if (initials) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="relative flex items-center justify-center rounded-full overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200"
        style={{ width: size, height: size }}
      >
        <span
          className="relative z-10 font-sf-pro font-medium text-[#122945]"
          style={{ fontSize: size * 0.4 }}
        >
          {initials.toUpperCase()}
        </span>
      </div>
    );
  }

  const avatarStr = isString(src) ? src : String(src ?? "");
  const hasAvatarSrc =
    avatarStr &&
    avatarStr !== "null" &&
    avatarStr !== "undefined" &&
    (avatarStr.startsWith("http") || avatarStr.startsWith("//") || avatarStr.startsWith("/") || avatarStr.startsWith("data:"));

  if (hasAvatarSrc) {
    return (
      <img
        src={avatarStr}
        alt={alt}
        className="rounded-full object-cover"
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label="No avatar"
      className="flex items-center justify-center rounded-full bg-[#E6EEF7]"
      style={{ width: size, height: size }}
    >
      <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5z" fill="#ADBFDF" />
        <path d="M2 22c0-3.866 3.582-7 10-7s10 3.134 10 7v1H2v-1z" fill="#ADBFDF" />
      </svg>
    </div>
  );
};

export default Avatar;
