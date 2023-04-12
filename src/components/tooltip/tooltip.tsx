import React, { ReactNode, useState } from 'react';
import tooltipStyles from "./tooltip.module.scss";

interface TooltipProps {
    children: ReactNode;
    text: string;
  }

export const Tooltip = ({ children, text }: TooltipProps) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div className={tooltipStyles.tooltip_container}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {showTooltip && <div className={tooltipStyles.tooltip}>{text}</div>}
    </div>
  );
};
