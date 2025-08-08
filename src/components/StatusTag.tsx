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

  // Dark mode colors for better contrast
  const supportLevelColorsDark = {
    production: "#10b981", // emerald-500
    development: "#f59e0b", // amber-500
    planned: "#8b5cf6", // violet-500
    blocked: "#ef4444", // red-500
  };

  const supportLevelBgColorsDark = {
    production: "#064e3b", // emerald-900
    development: "#78350f", // amber-900
    planned: "#4c1d95", // violet-900
    blocked: "#7f1d1d", // red-900
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

  // Dark mode colors for grid services
  const gridServicesColorsDark = {
    true: "#10b981", // emerald-500
    false: "#ef4444", // red-500
  };

  const gridServicesBgColorsDark = {
    true: "#064e3b", // emerald-900
    false: "#7f1d1d", // red-900
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
    // Determine dark mode colors based on support level
    let darkBgColor = bgColor;
    let darkTextColor = color;

    if (type === "support") {
      if (supportLevel === "production") {
        darkBgColor = "#022c22";
        darkTextColor = "#34d399";
      } else if (supportLevel === "development") {
        darkBgColor = "#451a03";
        darkTextColor = "#fbbf24";
      } else if (supportLevel === "planned") {
        darkBgColor = "#2e1065";
        darkTextColor = "#a78bfa";
      } else if (supportLevel === "blocked") {
        darkBgColor = "#450a0a";
        darkTextColor = "#f87171";
      }
    } else if (type === "grid-services") {
      if (gridServices === true) {
        darkBgColor = "#022c22";
        darkTextColor = "#34d399";
      } else if (gridServices === false) {
        darkBgColor = "#450a0a";
        darkTextColor = "#f87171";
      }
    }

    return (
      <span
        className={`support-level-badge ${className}`}
        style={
          {
            backgroundColor: bgColor,
            color: color,
            padding: "4px 8px",
            borderRadius: "4px",
            fontSize: "12px",
            fontWeight: "500",
            "--dark-bg-color": darkBgColor,
            "--dark-text-color": darkTextColor,
          } as React.CSSProperties & { [key: string]: string }
        }
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
