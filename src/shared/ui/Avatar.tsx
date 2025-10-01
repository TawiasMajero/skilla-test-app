import React from "react";
import noAvatar from "../../assets/avatar/no-avatar.svg";
import initialsAvatar from "../../assets/avatar/initials-avatar.svg";

interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  size?: number;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = "Avatar",
  initials,
  size = 32,
}) => {
  if (initials) {
    return (
      <div
        className="relative flex items-center justify-center rounded-full overflow-hidden"
        style={{ width: size, height: size }}
      >
        <img
          src={initialsAvatar}
          alt="Initials background"
          className="absolute inset-0 w-full h-full"
        />
        <span
          className="relative z-10 font-sf-pro font-medium text-icon"
          style={{ fontSize: size * 0.4 }}
        >
          {initials.toUpperCase()}
        </span>
      </div>
    );
  }

  if (!src || src.includes("noavatar")) {
    return (
      <img
        src={noAvatar}
        alt="No avatar"
        className="rounded-full"
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="rounded-full object-cover"
      style={{ width: size, height: size }}
    />
  );
};

export default Avatar;
