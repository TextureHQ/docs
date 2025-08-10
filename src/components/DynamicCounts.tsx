import React from "react";
import manufacturersData from "@site/src/data/manufacturers.json";
import appsData from "@site/src/data/apps.json";

interface DynamicCountsProps {
  type: "manufacturers" | "apps";
}

export function DynamicCounts({ type }: DynamicCountsProps) {
  const totalCount =
    type === "manufacturers" ? manufacturersData.length : appsData.length;
  const additionalCount = Math.max(0, totalCount - 4); // Subtract 4 since we show 4 icons

  return <span className="dynamic-count">+{additionalCount} more</span>;
}
