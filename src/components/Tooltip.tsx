"use client";

import React, { ReactNode, useState, useId } from "react";

import styles from "@component/styles/tooltip.module.scss";

interface TooltipProps {
  children: ReactNode;
  text: string;
}

export const Tooltip = ({ children, text }: TooltipProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipId = useId();

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleTouchStart = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const handleTouchEnd = () => {
    setShowTooltip(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      setShowTooltip(false);
    }
  };

  return (
    <div
      className={styles.tooltip_container}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
      aria-describedby={showTooltip ? tooltipId : undefined}
    >
      {children}
      {showTooltip && (
        <div
          id={tooltipId}
          className={styles.tooltip}
          role="tooltip"
          aria-live="polite"
        >
          {text}
        </div>
      )}
    </div>
  );
};
