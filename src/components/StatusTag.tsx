import React from "react";

interface StatusTagProps {
  supportLevel?: string;
  gridServices?: boolean;
  type: "support" | "grid-services";
  variant?: "badge" | "text";
  className?: string;
}

export const StatusTag: React.FC<StatusTagProps> = ({
  supportLevel,
  gridServices,
  type,
  variant = "text",
  className = "",
}) => {
  // Support level configuration
  const supportLevelText = {
    production: "Production Ready",
    development: "In Development",
    planned: "Planned",
    blocked: "Blocked",
  };

  const supportLevelColors = {
    production: "#065f46", // emerald-800
    development: "#92400e", // amber-800
    planned: "#5b21b6", // violet-800
    blocked: "#991b1b", // red-800
  };

  const supportLevelBgColors = {
    production: "#ecfdf5", // emerald-50
    development: "#fffbeb", // amber-50
    planned: "#f5f3ff", // violet-50
    blocked: "#fef2f2", // red-50
  };

  const supportLevelEmojis = {
    production: "",
    development: "",
    planned: "",
    blocked: "",
  };

  // Grid services configuration
  const gridServicesText = {
    true: "Supported",
    false: "Not supported",
  };

  const gridServicesColors = {
    true: "#065f46", // emerald-800
    false: "#991b1b", // red-800
  };

  const gridServicesBgColors = {
    true: "#ecfdf5", // emerald-50
    false: "#fef2f2", // red-50
  };

  const gridServicesEmojis = {
    true: "",
    false: "❌",
  };

  let color, bgColor, text, emoji;

  if (type === "support") {
    color =
      supportLevelColors[supportLevel as keyof typeof supportLevelColors] ||
      "#6b7280";
    bgColor =
      supportLevelBgColors[supportLevel as keyof typeof supportLevelBgColors] ||
      "transparent";
    text =
      supportLevelText[supportLevel as keyof typeof supportLevelText] ||
      supportLevel;
    emoji =
      supportLevelEmojis[supportLevel as keyof typeof supportLevelEmojis] || "";
  } else if (type === "grid-services") {
    if (gridServices === undefined) {
      return <span className={className}>—</span>;
    }
    color = gridServicesColors[gridServices as keyof typeof gridServicesColors];
    bgColor =
      gridServicesBgColors[gridServices as keyof typeof gridServicesBgColors];
    text = gridServicesText[gridServices as keyof typeof gridServicesText];
    emoji = gridServicesEmojis[gridServices as keyof typeof gridServicesEmojis];
  }

  if (variant === "badge") {
    return (
      <span
        className={`support-level-badge ${className}`}
        style={{
          backgroundColor: bgColor,
          color: color,
          padding: "4px 8px",
          borderRadius: "4px",
          fontSize: "12px",
          fontWeight: "500",
        }}
      >
        {emoji} {text}
      </span>
    );
  }

  // Default text variant (for generated pages)
  return (
    <span
      className={className}
      style={{
        fontWeight: "600",
        color: color,
        fontSize: "14px",
      }}
    >
      {text}
    </span>
  );
};

export default StatusTag;
