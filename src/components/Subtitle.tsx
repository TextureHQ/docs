import React from "react";

interface SubtitleProps {
  children: React.ReactNode;
}

export const Subtitle: React.FC<SubtitleProps> = ({ children }) => {
  return <p className="page-subtitle">{children}</p>;
};
